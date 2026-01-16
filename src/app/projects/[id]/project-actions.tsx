"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { ProjectStatus } from "@/types/database";

interface ProjectActionsProps {
  projectId: string;
  projectStatus: ProjectStatus;
  acceptedBidId: string | null;
}

export function ProjectActions({
  projectId,
  projectStatus,
  acceptedBidId,
}: ProjectActionsProps) {
  const router = useRouter();
  const supabase = createClient();
  const { connected, publicKey } = useWallet();

  const [completing, setCompleting] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleComplete = async () => {
    if (!acceptedBidId) {
      toast.error("No accepted bid found");
      return;
    }

    setCompleting(true);

    try {
      const response = await fetch("/api/escrow/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to release escrow");
      }

      toast.success(
        `Project completed! Payment released. Transaction: ${data.signature.slice(0, 8)}...`
      );
      setShowCompleteDialog(false);
      router.refresh();
    } catch (error: any) {
      console.error("Error completing project:", error);
      toast.error(error.message || "Failed to complete project");
    } finally {
      setCompleting(false);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);

    try {
      const response = await fetch("/api/escrow/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to refund escrow");
      }

      toast.success(
        `Project cancelled. Escrow refunded. Transaction: ${data.signature.slice(0, 8)}...`
      );
      setShowCancelDialog(false);
      router.refresh();
    } catch (error: any) {
      console.error("Error cancelling project:", error);
      toast.error(error.message || "Failed to cancel project");
    } finally {
      setCancelling(false);
    }
  };

  if (projectStatus === "in_progress" && acceptedBidId) {
    return (
      <div className="space-y-3">
        <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="default">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as Complete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Project?</DialogTitle>
              <DialogDescription>
                This will release the bounty payment to the developer. Make sure
                you're satisfied with the work before confirming.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCompleteDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleComplete} disabled={completing}>
                {completing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                Confirm & Release Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full text-red-400">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Cancel Project?
              </DialogTitle>
              <DialogDescription>
                This will cancel the project and refund the escrow to your
                wallet. The developer's work will not be compensated.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCancelDialog(false)}
              >
                Keep Project
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="mr-2 h-4 w-4" />
                )}
                Cancel & Refund
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (projectStatus === "open") {
    return (
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full text-red-400">
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Cancel Project?
            </DialogTitle>
            <DialogDescription>
              This will cancel the project and refund the escrow to your wallet.
              All current bids will be rejected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Keep Project
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelling}
            >
              {cancelling ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Cancel & Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
