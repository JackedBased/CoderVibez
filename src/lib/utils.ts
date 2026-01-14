import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSol(lamports: number): string {
  return (lamports / 1e9).toFixed(4);
}

export function solToLamports(sol: number): number {
  return Math.round(sol * 1e9);
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date);
}

export function getToolColor(tool: string): string {
  const colors: Record<string, string> = {
    cursor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    v0: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    bolt: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    claude: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    lovable: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "replit-agent": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };
  return colors[tool.toLowerCase()] || colors.default;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "react-bugs": "bg-cyan-500/20 text-cyan-400",
    "supabase-issues": "bg-green-500/20 text-green-400",
    "ai-hallucination": "bg-red-500/20 text-red-400",
    "ui-fixes": "bg-purple-500/20 text-purple-400",
    "full-stack": "bg-blue-500/20 text-blue-400",
    "mobile-tweaks": "bg-orange-500/20 text-orange-400",
    default: "bg-gray-500/20 text-gray-400",
  };
  return colors[category.toLowerCase()] || colors.default;
}
