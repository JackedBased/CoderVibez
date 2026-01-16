import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import { createClient } from "@/lib/supabase/server";
import { connection } from "@/lib/solana/config";
import { createAndSignReleaseTransaction } from "@/lib/solana/server";

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch project with accepted bid
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select(
        `
        *,
        bids!inner(*, bidder:users(*))
      `
      )
      .eq("id", projectId)
      .eq("bids.status", "accepted")
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Project not found or no accepted bid" },
        { status: 404 }
      );
    }

    // Verify user is the project owner
    if (project.owner_id !== user.id) {
      return NextResponse.json(
        { error: "Only project owner can release escrow" },
        { status: 403 }
      );
    }

    // Verify project is in progress
    if (project.status !== "in_progress") {
      return NextResponse.json(
        { error: "Project must be in progress to release escrow" },
        { status: 400 }
      );
    }

    const acceptedBid = project.bids[0];
    if (!acceptedBid || !acceptedBid.bidder?.wallet_address) {
      return NextResponse.json(
        { error: "Accepted bid or developer wallet address not found" },
        { status: 400 }
      );
    }

    // Create and sign release transaction
    const developerPubkey = new PublicKey(acceptedBid.bidder.wallet_address);
    const transaction = await createAndSignReleaseTransaction(
      developerPubkey,
      project.bounty_amount
    );

    // Send transaction
    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );

    // Confirm transaction
    await connection.confirmTransaction(signature, "confirmed");

    // Update project status
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        status: "completed",
        completion_tx_signature: signature,
      })
      .eq("id", projectId);

    if (updateError) {
      console.error("Error updating project:", updateError);
      return NextResponse.json(
        {
          error: "Transaction sent but failed to update database",
          signature,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      signature,
      message: "Escrow released successfully",
    });
  } catch (error: any) {
    console.error("Error releasing escrow:", error);
    return NextResponse.json(
      { error: error.message || "Failed to release escrow" },
      { status: 500 }
    );
  }
}
