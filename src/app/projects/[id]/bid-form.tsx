"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { solToLamports } from "@/lib/solana/utils";
import { toast } from "sonner";

interface BidFormProps {
  projectId: string;
}

export function BidForm({ projectId }: BidFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [amount, setAmount] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please log in to place a bid");
        return;
      }

      const bidAmount = parseFloat(amount);
      if (bidAmount <= 0) {
        toast.error("Please enter a valid bid amount");
        return;
      }

      const { error } = await supabase.from("bids").insert({
        project_id: projectId,
        bidder_id: user.id,
        amount: solToLamports(bidAmount),
        estimated_time: estimatedTime,
        message,
        status: "pending" as const,
      } as any);

      if (error) throw error;

      toast.success("Bid placed successfully!");
      setAmount("");
      setEstimatedTime("");
      setMessage("");
      router.refresh();
    } catch (error: any) {
      console.error("Error placing bid:", error);
      toast.error(error.message || "Failed to place bid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glow>
      <CardHeader>
        <CardTitle className="text-lg">Place Your Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Your Bid (SOL)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.25"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Estimated Time</Label>
              <Input
                id="time"
                placeholder="e.g., 2-3 hours"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Explain your approach and why you're a good fit for this project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Submit Bid
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
