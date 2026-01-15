"use client";

import { Search, Filter, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tools = [
  { value: "all", label: "All Tools" },
  { value: "cursor", label: "Cursor" },
  { value: "v0", label: "v0" },
  { value: "bolt", label: "Bolt" },
  { value: "claude", label: "Claude" },
  { value: "lovable", label: "Lovable" },
  { value: "replit-agent", label: "Replit Agent" },
  { value: "ideavo", label: "Ideavo" },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "react-bugs", label: "React Bugs" },
  { value: "supabase-issues", label: "Supabase Issues" },
  { value: "ai-hallucination", label: "AI Hallucination Fixes" },
  { value: "ui-fixes", label: "UI/UX Fixes" },
  { value: "full-stack", label: "Full Stack" },
  { value: "mobile-tweaks", label: "Mobile Tweaks" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "bounty-high", label: "Highest Bounty" },
  { value: "bounty-low", label: "Lowest Bounty" },
  { value: "most-bids", label: "Most Bids" },
];

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTool: string;
  onToolChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  selectedTool,
  onToolChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={selectedTool} onValueChange={onToolChange}>
          <SelectTrigger className="w-[160px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Tool" />
          </SelectTrigger>
          <SelectContent>
            {tools.map((tool) => (
              <SelectItem key={tool.value} value={tool.value}>
                {tool.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px]">
            <SortAsc className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(selectedTool !== "all" ||
          selectedCategory !== "all" ||
          searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange("");
              onToolChange("all");
              onCategoryChange("all");
            }}
            className="text-muted-foreground"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

export { tools, categories };
