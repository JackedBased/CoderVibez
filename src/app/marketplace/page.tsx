"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import type { ProjectWithOwner } from "@/types/database";

// Extended type for projects with bid counts
type ProjectWithBidCount = ProjectWithOwner & {
  bids?: { id: string }[];
};

export default function MarketplacePage() {
  const supabase = createClient();
  const [projects, setProjects] = useState<ProjectWithBidCount[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProjects();
    
    // Set up real-time subscription
    const channel = supabase
      .channel("marketplace-projects")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Fetch projects with owner and bids (just IDs for counting)
      const { data, error } = await supabase
        .from("projects")
        .select("*, owner:users(*), bids(id)")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects((data as unknown as ProjectWithBidCount[]) || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !project.title.toLowerCase().includes(query) &&
          !project.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Tool filter
      if (selectedTool !== "all") {
        if (
          !project.tools_used.some(
            (tool) => tool.toLowerCase() === selectedTool.toLowerCase()
          )
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (project.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "bounty-high":
          return b.bounty_amount - a.bounty_amount;
        case "bounty-low":
          return a.bounty_amount - b.bounty_amount;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Projects</h1>
        <p className="text-muted-foreground">
          Find buggy projects to fix and earn SOL bounties
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <ProjectFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTool={selectedTool}
          onToolChange={setSelectedTool}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {loading ? (
          <Skeleton className="h-5 w-32" />
        ) : (
          <span>
            {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-[300px]">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex justify-between mt-auto">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              bidCount={project.bids?.length || 0}
            />
          ))}
        </div>
      ) : (
        <Card glow>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium mb-2">No projects found</p>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later for new projects
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
