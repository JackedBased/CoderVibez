import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Github,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";
import { formatLamports } from "@/lib/solana/utils";
import { formatDate, formatRelativeTime, getToolColor } from "@/lib/utils";
import { BidForm } from "./bid-form";
import { BidsList } from "./bids-list";
import { ProjectActions } from "./project-actions";
import type { ProjectWithBids, User as DbUser } from "@/types/database";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch project with owner and bids
  const { data: projectData, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      owner:users(*),
      bids(*, bidder:users(*))
    `
    )
    .eq("id", id)
    .single();

  if (error || !projectData) {
    notFound();
  }
  
  const project = projectData as any;

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === project.owner_id;
  const hasBid = project.bids.some(
    (bid: any) => bid.bidder_id === user?.id
  );

  const ownerInitials = project.owner.full_name
    ? project.owner.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : project.owner.email.slice(0, 2).toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/marketplace">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant={
                  project.status === "open"
                    ? "success"
                    : project.status === "in_progress"
                    ? "warning"
                    : project.status === "completed"
                    ? "info"
                    : "secondary"
                }
              >
                {project.status.replace("_", " ")}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Posted {formatRelativeTime(project.created_at)}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tools_used.map((tool: string) => (
                <Badge key={tool} variant="outline" className={getToolColor(tool)}>
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <Card glow>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {project.description}
              </p>
            </CardContent>
          </Card>

          {/* Code Snippet */}
          {project.code_snippet && (
            <Card glow>
              <CardHeader>
                <CardTitle>Code Snippet</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-lg border border-purple-500/20 bg-black/50">
                  <pre className="p-4 text-sm font-mono text-gray-300">
                    <code>{project.code_snippet}</code>
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* GitHub Link */}
          {project.github_url && (
            <Card glow>
              <CardContent className="p-4">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>View on GitHub</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              </CardContent>
            </Card>
          )}

          {/* Bids Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Bids ({project.bids.length})
            </h2>

            {project.status === "open" && user && !isOwner && !hasBid && (
              <BidForm projectId={project.id} />
            )}

            <BidsList
              bids={project.bids}
              projectId={project.id}
              isOwner={isOwner}
              projectStatus={project.status}
              acceptedBidId={project.accepted_bid_id}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Bounty Card */}
          <Card glow className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">Bounty</p>
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-lg blur-xl opacity-30" />
                  <p className="relative text-4xl font-bold text-gradient">
                    {formatLamports(project.bounty_amount, 2)} SOL
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Project Owner */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage
                    src={project.owner.avatar_url || undefined}
                    alt={project.owner.full_name || "Owner"}
                  />
                  <AvatarFallback>{ownerInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {project.owner.full_name || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground">Project Owner</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted {formatDate(project.created_at)}</span>
                </div>
                {project.deadline && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Deadline: {formatDate(project.deadline)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{project.bids.length} bids received</span>
                </div>
              </div>

              {/* Actions */}
              {isOwner && project.status !== "completed" && (
                <>
                  <Separator className="my-6" />
                  <ProjectActions
                    projectId={project.id}
                    projectStatus={project.status}
                    acceptedBidId={project.accepted_bid_id}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
