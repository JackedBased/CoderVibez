import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  FolderOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { formatLamports } from "@/lib/solana/utils";
import { formatRelativeTime, getToolColor } from "@/lib/utils";
import type { Project, Bid } from "@/types/database";

// Extended types for dashboard queries
type ProjectWithBidCount = Project & { bids: { count: number }[] };
type BidWithProject = Bid & { project: Project };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's projects
  const { data: projectsData } = await supabase
    .from("projects")
    .select("*, bids(count)")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });
  
  const projects = projectsData as ProjectWithBidCount[] | null;

  // Fetch user's bids
  const { data: bidsData } = await supabase
    .from("bids")
    .select("*, project:projects(*)")
    .eq("bidder_id", user.id)
    .order("created_at", { ascending: false });
  
  const bids = bidsData as BidWithProject[] | null;

  // Calculate stats
  const openProjects = projects?.filter((p) => p.status === "open").length || 0;
  const inProgressProjects =
    projects?.filter((p) => p.status === "in_progress").length || 0;
  const completedProjects =
    projects?.filter((p) => p.status === "completed").length || 0;
  const totalBountyPosted =
    projects?.reduce((acc, p) => acc + p.bounty_amount, 0) || 0;

  const pendingBids = bids?.filter((b) => b.status === "pending").length || 0;
  const acceptedBids = bids?.filter((b) => b.status === "accepted").length || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects and track your bids
          </p>
        </div>
        <Button asChild>
          <Link href="/post-project">
            <Plus className="mr-2 h-4 w-4" />
            Post New Project
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card glow>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Projects</p>
                <p className="text-2xl font-bold">{openProjects}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card glow>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressProjects}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card glow>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedProjects}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card glow>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bounties</p>
                <p className="text-2xl font-bold text-purple-400">
                  {formatLamports(totalBountyPosted, 2)} SOL
                </p>
              </div>
              <Wallet className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Projects and Bids */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="bids">My Bids</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          {projects && projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} glow>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            href={`/projects/${project.id}`}
                            className="text-lg font-semibold hover:text-purple-400 transition-colors"
                          >
                            {project.title}
                          </Link>
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
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools_used.slice(0, 3).map((tool: string) => (
                            <Badge
                              key={tool}
                              variant="outline"
                              className={getToolColor(tool)}
                            >
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-400">
                            {formatLamports(project.bounty_amount, 2)}
                          </p>
                          <p className="text-xs text-muted-foreground">SOL</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {project.bids?.[0]?.count || 0}
                          </p>
                          <p className="text-xs text-muted-foreground">Bids</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/projects/${project.id}`}>
                            View
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card glow>
              <CardContent className="py-12 text-center">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">
                  Post your first project to get help from experienced developers
                </p>
                <Button asChild>
                  <Link href="/post-project">
                    <Plus className="mr-2 h-4 w-4" />
                    Post Your First Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bids">
          {bids && bids.length > 0 ? (
            <div className="space-y-4">
              {bids.map((bid) => (
                <Card key={bid.id} glow>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            href={`/projects/${bid.project.id}`}
                            className="text-lg font-semibold hover:text-purple-400 transition-colors"
                          >
                            {bid.project.title}
                          </Link>
                          <Badge
                            variant={
                              bid.status === "pending"
                                ? "warning"
                                : bid.status === "accepted"
                                ? "success"
                                : "secondary"
                            }
                          >
                            {bid.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {bid.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Submitted {formatRelativeTime(bid.created_at)}
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-400">
                            {formatLamports(bid.amount, 2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Your Bid (SOL)
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold">
                            {bid.estimated_time}
                          </p>
                          <p className="text-xs text-muted-foreground">Est. Time</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/projects/${bid.project.id}`}>
                            View Project
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card glow>
              <CardContent className="py-12 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No bids yet</h3>
                <p className="text-muted-foreground mb-6">
                  Browse the marketplace and place bids on projects you can help
                  with
                </p>
                <Button asChild>
                  <Link href="/marketplace">Browse Projects</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
