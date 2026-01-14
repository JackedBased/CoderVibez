"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  ArrowLeft,
  Upload,
  Loader2,
  Wallet,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { createEscrowTransaction, solToLamports } from "@/lib/solana/utils";
import { MIN_BOUNTY_SOL, ESCROW_WALLET_PUBKEY } from "@/lib/solana/config";
import { toast } from "sonner";

const tools = [
  "Cursor",
  "v0",
  "Bolt",
  "Claude",
  "Lovable",
  "Replit Agent",
  "ChatGPT",
  "Copilot",
  "Other",
];

const categories = [
  { value: "react-bugs", label: "React Bugs" },
  { value: "supabase-issues", label: "Supabase Issues" },
  { value: "ai-hallucination", label: "AI Hallucination Fixes" },
  { value: "ui-fixes", label: "UI/UX Fixes" },
  { value: "full-stack", label: "Full Stack Debug" },
  { value: "mobile-tweaks", label: "Mobile Tweaks" },
  { value: "other", label: "Other" },
];

export default function PostProjectPage() {
  const router = useRouter();
  const supabase = createClient();
  const { connected, publicKey, signTransaction } = useWallet();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [bountyAmount, setBountyAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const [loading, setLoading] = useState(false);
  const [escrowStep, setEscrowStep] = useState<
    "idle" | "creating" | "confirming" | "success" | "error"
  >("idle");

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected || !publicKey || !signTransaction) {
      toast.error("Please connect your Phantom wallet first");
      return;
    }

    if (!ESCROW_WALLET_PUBKEY) {
      toast.error("Escrow wallet not configured. Please contact support.");
      return;
    }

    const bounty = parseFloat(bountyAmount);
    if (bounty < MIN_BOUNTY_SOL) {
      toast.error(`Minimum bounty is ${MIN_BOUNTY_SOL} SOL`);
      return;
    }

    if (selectedTools.length === 0) {
      toast.error("Please select at least one tool");
      return;
    }

    setLoading(true);
    setEscrowStep("creating");

    try {
      // Step 1: Create escrow transaction
      const lamports = solToLamports(bounty);
      const transaction = await createEscrowTransaction({
        fromPubkey: publicKey,
        amountInLamports: lamports,
      });

      setEscrowStep("confirming");
      toast.info("Please confirm the transaction in your wallet");

      // Step 2: Sign transaction with wallet
      const signedTransaction = await signTransaction(transaction);
      
      // Step 3: Send transaction
      const { Connection } = await import("@solana/web3.js");
      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com"
      );
      
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      
      // Step 4: Confirm transaction
      await connection.confirmTransaction(signature, "confirmed");

      setEscrowStep("success");
      toast.success("Escrow transaction confirmed!");

      // Step 5: Create project in database
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Not authenticated");
      }

      const { data: project, error } = await supabase
        .from("projects")
        .insert({
          owner_id: user.id,
          title,
          description,
          tools_used: selectedTools,
          category,
          code_snippet: codeSnippet || null,
          github_url: githubUrl || null,
          bounty_amount: lamports,
          deadline: deadline || null,
          status: "open" as const,
          escrow_tx_signature: signature,
        } as any)
        .select()
        .single();

      if (error) throw error;
      if (!project) throw new Error("Failed to create project");

      toast.success("Project posted successfully!");
      router.push(`/projects/${(project as any).id}`);
    } catch (error: any) {
      console.error("Error posting project:", error);
      setEscrowStep("error");
      
      if (error.message?.includes("User rejected")) {
        toast.error("Transaction cancelled by user");
      } else {
        toast.error(error.message || "Failed to post project");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Post a New Project</h1>
        <p className="text-muted-foreground">
          Describe your buggy project and set a bounty to attract developers
        </p>
      </div>

      {/* Wallet Connection Warning */}
      {!connected && (
        <Card className="mb-6 border-yellow-500/30 bg-yellow-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="font-medium text-yellow-400">Wallet Not Connected</p>
              <p className="text-sm text-muted-foreground">
                You need to connect your Phantom wallet to create an escrow and
                post a project.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Details */}
        <Card glow>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Describe what's broken and what you need fixed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="e.g., React auth component breaking on mobile"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail. What were you trying to build? What's not working? What have you tried?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tools Used</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Select all AI tools you used to generate this code
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant={selectedTools.includes(tool) ? "default" : "outline"}
                    className="cursor-pointer transition-all"
                    onClick={() => toggleTool(tool)}
                  >
                    {selectedTools.includes(tool) && (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    )}
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Code & Links */}
        <Card glow>
          <CardHeader>
            <CardTitle>Code & Links</CardTitle>
            <CardDescription>
              Share your code so developers can understand the issue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Code Snippet (optional)</Label>
              <Textarea
                id="code"
                placeholder="Paste the problematic code here..."
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub Repository URL (optional)</Label>
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/username/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bounty */}
        <Card glow>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-purple-400" />
              Bounty
            </CardTitle>
            <CardDescription>
              Set the SOL amount you're willing to pay for a fix
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bounty">Bounty Amount (SOL)</Label>
              <div className="relative">
                <Input
                  id="bounty"
                  type="number"
                  step="0.01"
                  min={MIN_BOUNTY_SOL}
                  placeholder="0.5"
                  value={bountyAmount}
                  onChange={(e) => setBountyAmount(e.target.value)}
                  className="pr-16"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-400 font-medium">
                  SOL
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum bounty: {MIN_BOUNTY_SOL} SOL. This will be locked in
                escrow until the job is completed.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Escrow Status */}
        {escrowStep !== "idle" && (
          <Card
            className={
              escrowStep === "success"
                ? "border-green-500/30 bg-green-500/5"
                : escrowStep === "error"
                ? "border-red-500/30 bg-red-500/5"
                : "border-purple-500/30 bg-purple-500/5"
            }
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {escrowStep === "creating" && (
                  <>
                    <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                    <span>Creating escrow transaction...</span>
                  </>
                )}
                {escrowStep === "confirming" && (
                  <>
                    <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                    <span>Waiting for wallet confirmation...</span>
                  </>
                )}
                {escrowStep === "success" && (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-green-400">
                      Escrow transaction confirmed!
                    </span>
                  </>
                )}
                {escrowStep === "error" && (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <span className="text-red-400">
                      Transaction failed. Please try again.
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading || !connected}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Post Project & Lock Bounty
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
