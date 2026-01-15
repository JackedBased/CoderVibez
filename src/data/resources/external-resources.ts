import {
  BookOpen,
  Video,
  FileText,
  Github,
  Globe,
  type LucideIcon,
} from "lucide-react";

export interface ExternalResource {
  title: string;
  url: string;
  description: string;
  category: string;
  type: "documentation" | "video" | "tutorial" | "tool" | "community";
  icon: LucideIcon;
}

export const externalResources: ExternalResource[] = [
  // AI Coding Tools
  {
    title: "Cursor Documentation",
    url: "https://docs.cursor.com/",
    description: "Official documentation for Cursor AI code editor",
    category: "AI Tools",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Anthropic Claude Docs",
    url: "https://docs.anthropic.com/",
    description: "Claude AI documentation and prompt engineering guides",
    category: "AI Tools",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "v0 by Vercel",
    url: "https://v0.dev/",
    description: "Generate UI components with AI using shadcn/ui",
    category: "AI Tools",
    type: "tool",
    icon: Globe,
  },
  {
    title: "OpenAI Prompt Engineering",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    description: "Best practices for writing effective prompts",
    category: "AI Tools",
    type: "documentation",
    icon: FileText,
  },

  // Frontend
  {
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Official Next.js framework documentation",
    category: "Frontend",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    description: "Utility-first CSS framework documentation",
    category: "Frontend",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "shadcn/ui",
    url: "https://ui.shadcn.com/",
    description: "Beautifully designed components built with Radix and Tailwind",
    category: "Frontend",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "React Documentation",
    url: "https://react.dev/",
    description: "Official React documentation with interactive examples",
    category: "Frontend",
    type: "documentation",
    icon: BookOpen,
  },

  // Backend
  {
    title: "Supabase Documentation",
    url: "https://supabase.com/docs",
    description: "Complete guide to Supabase features and APIs",
    category: "Backend",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Supabase YouTube",
    url: "https://www.youtube.com/@Supabase",
    description: "Video tutorials and feature walkthroughs",
    category: "Backend",
    type: "video",
    icon: Video,
  },
  {
    title: "Supabase GitHub",
    url: "https://github.com/supabase/supabase",
    description: "Source code, issues, and community discussions",
    category: "Backend",
    type: "community",
    icon: Github,
  },

  // Solana & Web3
  {
    title: "Solana Documentation",
    url: "https://solana.com/docs",
    description: "Official Solana blockchain documentation",
    category: "Solana",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Solana Cookbook",
    url: "https://solanacookbook.com/",
    description: "Recipes and code snippets for Solana development",
    category: "Solana",
    type: "tutorial",
    icon: FileText,
  },
  {
    title: "Phantom Wallet Docs",
    url: "https://docs.phantom.app/",
    description: "Integration guide for Phantom wallet",
    category: "Solana",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Solana Stack Exchange",
    url: "https://solana.stackexchange.com/",
    description: "Q&A community for Solana developers",
    category: "Solana",
    type: "community",
    icon: Globe,
  },

  // Deployment
  {
    title: "Vercel Documentation",
    url: "https://vercel.com/docs",
    description: "Deploy Next.js and frontend applications",
    category: "Deployment",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Render Documentation",
    url: "https://render.com/docs",
    description: "Full-stack deployment platform documentation",
    category: "Deployment",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Railway",
    url: "https://railway.app/",
    description: "Simple deployment platform for full-stack apps",
    category: "Deployment",
    type: "tool",
    icon: Globe,
  },

  // Testing
  {
    title: "Vitest",
    url: "https://vitest.dev/",
    description: "Fast unit testing framework for Vite projects",
    category: "Testing",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Testing Library",
    url: "https://testing-library.com/",
    description: "Simple testing utilities for React and DOM",
    category: "Testing",
    type: "documentation",
    icon: BookOpen,
  },
  {
    title: "Playwright",
    url: "https://playwright.dev/",
    description: "End-to-end testing framework for web apps",
    category: "Testing",
    type: "documentation",
    icon: BookOpen,
  },

  // Learning
  {
    title: "Fireship",
    url: "https://www.youtube.com/@Fireship",
    description: "Quick, high-quality web development tutorials",
    category: "Learning",
    type: "video",
    icon: Video,
  },
  {
    title: "Theo - t3.gg",
    url: "https://www.youtube.com/@t3dotgg",
    description: "Modern web development insights and opinions",
    category: "Learning",
    type: "video",
    icon: Video,
  },
  {
    title: "Learn Prompting",
    url: "https://learnprompting.org/",
    description: "Free course on prompt engineering",
    category: "Learning",
    type: "tutorial",
    icon: FileText,
  },

  // Community
  {
    title: "Indie Hackers",
    url: "https://www.indiehackers.com/",
    description: "Community for independent builders and makers",
    category: "Community",
    type: "community",
    icon: Globe,
  },
  {
    title: "Product Hunt",
    url: "https://www.producthunt.com/",
    description: "Launch and discover new products",
    category: "Community",
    type: "community",
    icon: Globe,
  },
  {
    title: "Hacker News",
    url: "https://news.ycombinator.com/",
    description: "Tech news and discussion community",
    category: "Community",
    type: "community",
    icon: Globe,
  },
];

export const resourceCategories = [
  "AI Tools",
  "Frontend",
  "Backend",
  "Solana",
  "Deployment",
  "Testing",
  "Learning",
  "Community",
];

export function getResourcesByCategory(category: string): ExternalResource[] {
  return externalResources.filter(r => r.category === category);
}
