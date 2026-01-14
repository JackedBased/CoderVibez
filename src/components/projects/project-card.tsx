import Link from "next/link";
import { Clock, Users, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatLamports } from "@/lib/solana/utils";
import { formatRelativeTime, getToolColor } from "@/lib/utils";
import type { ProjectWithOwner } from "@/types/database";

interface ProjectCardProps {
  project: ProjectWithOwner;
  bidCount?: number;
}

export function ProjectCard({ project, bidCount = 0 }: ProjectCardProps) {
  return (
    <Card glow className="flex flex-col h-full group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/projects/${project.id}`}
              className="text-lg font-semibold text-white hover:text-purple-400 transition-colors line-clamp-2 block"
            >
              {project.title}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              by {project.owner.full_name || "Anonymous"}
            </p>
          </div>
          <div className="shrink-0">
            <Badge variant={project.status === "open" ? "success" : "secondary"}>
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {project.tools_used.slice(0, 3).map((tool) => (
            <Badge
              key={tool}
              variant="outline"
              className={getToolColor(tool)}
            >
              {tool}
            </Badge>
          ))}
          {project.tools_used.length > 3 && (
            <Badge variant="outline" className="text-gray-400">
              +{project.tools_used.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-purple-500/10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-50" />
                <span className="relative text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {formatLamports(project.bounty_amount, 2)}
                </span>
              </div>
              <span className="text-purple-400 font-medium">SOL</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{bidCount} bids</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatRelativeTime(project.created_at)}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
