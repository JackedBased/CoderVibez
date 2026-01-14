"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatLamports } from "@/lib/solana/utils";
import { formatRelativeTime } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { BidWithBidder, ProjectStatus } from "@/types/database";

interface BidsListProps {
  bids: BidWithBidder[];
  projectId: string;
  isOwner: boolean;
  projectStatus: ProjectStatus;
  acceptedBidId: string | null;
}

export function BidsList({
  bids,
  projectId,
  isOwner,
  projectStatus,
  acceptedBidId,
}: BidsListProps) {
  const router = useRouter();
  const supabase = createClient();
  const [acceptingBidId, setAcceptingBidId] = useState<string | null>(null);

  const handleAcceptBid = async (bidId: string) => {
    setAcceptingBidId(bidId);

    try {
      // Update bid status
      const { error: bidError } = await (supabase
        .from("bids") as any)
        .update({ status: "accepted" })
        .eq("id", bidId);

      if (bidError) throw bidError;

      // Reject other bids
      await (supabase
        .from("bids") as any)
        .update({ status: "rejected" })
        .eq("project_id", projectId)
        .neq("id", bidId);

      // Update project status
      const { error: projectError } = await (supabase
        .from("projects") as any)
        .update({
          status: "in_progress",
          accepted_bid_id: bidId,
        })
        .eq("id", projectId);

      if (projectError) throw projectError;

      toast.success("Bid accepted! The developer has been notified.");
      router.refresh();
    } catch (error: any) {
      console.error("Error accepting bid:", error);
      toast.error(error.message || "Failed to accept bid");
    } finally {
      setAcceptingBidId(null);
    }
  };

  if (bids.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center">
          <User className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">
            No bids yet. Be the first to bid on this project!
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort bids: accepted first, then by amount (lowest first)
  const sortedBids = [...bids].sort((a, b) => {
    if (a.id === acceptedBidId) return -1;
    if (b.id === acceptedBidId) return 1;
    return a.amount - b.amount;
  });

  return (
    <div className="space-y-4">
      {sortedBids.map((bid) => {
        const isAccepted = bid.id === acceptedBidId;
        const bidderInitials = bid.bidder.full_name
          ? bid.bidder.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          : bid.bidder.email.slice(0, 2).toUpperCase();

        return (
          <Card
            key={bid.id}
            glow={isAccepted}
            className={isAccepted ? "border-green-500/30 bg-green-500/5" : ""}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Avatar>
                    <AvatarImage
                      src={bid.bidder.avatar_url || undefined}
                      alt={bid.bidder.full_name || "Bidder"}
                    />
                    <AvatarFallback>{bidderInitials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {bid.bidder.full_name || "Anonymous Developer"}
                      </span>
                      {isAccepted && (
                        <Badge variant="success">
                          <Check className="mr-1 h-3 w-3" />
                          Accepted
                        </Badge>
                      )}
                      {bid.status === "rejected" && (
                        <Badge variant="secondary">Rejected</Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {bid.message}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{bid.estimated_time}</span>
                      </div>
                      <span>{formatRelativeTime(bid.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-cyan-400">
                    {formatLamports(bid.amount, 2)}
                  </p>
                  <p className="text-xs text-muted-foreground">SOL</p>

                  {isOwner &&
                    projectStatus === "open" &&
                    bid.status === "pending" && (
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => handleAcceptBid(bid.id)}
                        disabled={acceptingBidId !== null}
                      >
                        {acceptingBidId === bid.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            Accept
                          </>
                        )}
                      </Button>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
