import { redirect } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Wallet,
  Github,
  Calendar,
  Edit,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatRelativeTime, getToolColor, shortenAddress } from "@/lib/utils";
import { formatLamports } from "@/lib/solana/utils";
import type { Project, Bid, User as UserType } from "@/types/database";

type BidWithProject = Bid & { project: Project };

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  // Fetch user profile
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();
  
  const user = userData as UserType | null;

  if (!user) {
    redirect("/login");
  }

  // Fetch user's projects
  const { data: projectsData } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);
  
  const projects = projectsData as Project[] | null;

  // Fetch user's bids
  const { data: bidsData } = await supabase
    .from("bids")
    .select("*, project:projects(*)")
    .eq("bidder_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);
  
  const bids = bidsData as BidWithProject[] | null;

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  const roleLabels: Record<string, string> = {
    vibe_coder: "Vibe Coder",
    developer: "Developer",
    both: "Vibe Coder & Developer",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card glow className="sticky top-24">
            <CardContent className="p-6">
              {/* Avatar & Name */}
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-purple-500/30">
                  <AvatarImage
                    src={user.avatar_url || undefined}
                    alt={user.full_name || "User"}
                  />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mb-1">
                  {user.full_name || "Anonymous User"}
                </h1>
                <Badge variant="purple">{roleLabels[user.role]}</Badge>
              </div>

              <Separator className="my-6" />

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>

                {user.wallet_address && (
                  <div className="flex items-center gap-3 text-sm">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-purple-400 font-mono">
                      {shortenAddress(user.wallet_address, 6)}
                    </span>
                  </div>
                )}

                {user.github_url && (
                  <a
                    href={user.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                )}

                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Joined {formatDate(user.created_at)}
                  </span>
                </div>
              </div>

              {user.bio && (
                <>
                  <Separator className="my-6" />
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </>
              )}

              <Separator className="my-6" />

              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activity */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projects">Posted Projects</TabsTrigger>
              <TabsTrigger value="bids">My Bids</TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              {projects && projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card key={project.id} glow>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Link
                                href={`/projects/${project.id}`}
                                className="font-semibold hover:text-purple-400 transition-colors"
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
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {project.tools_used.slice(0, 3).map((tool: string) => (
                                <Badge
                                  key={tool}
                                  variant="outline"
                                  className={`text-xs ${getToolColor(tool)}`}
                                >
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-400">
                              {formatLamports(project.bounty_amount, 2)} SOL
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatRelativeTime(project.created_at)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">View All Projects</Link>
                  </Button>
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No projects yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Post your first project to get help from developers
                    </p>
                    <Button asChild>
                      <Link href="/post-project">Post a Project</Link>
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
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Link
                                href={`/projects/${bid.project.id}`}
                                className="font-semibold hover:text-purple-400 transition-colors"
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
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {bid.message}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-cyan-400">
                              {formatLamports(bid.amount, 2)} SOL
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {bid.estimated_time}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">View All Bids</Link>
                  </Button>
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No bids yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse projects and place bids to start earning
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
      </div>
    </div>
  );
}
