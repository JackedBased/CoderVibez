// Re-export all resource data
export * from "./guides";
export * from "./new-guides";
export * from "./external-resources";

import { guides as baseGuides, type Guide } from "./guides";
import { newGuides } from "./new-guides";

// Combined guides list
export const allGuides: Guide[] = [...baseGuides, ...newGuides];

// Get guide by slug from all guides
export function getGuideBySlug(slug: string): Guide | undefined {
  return allGuides.find(g => g.slug === slug);
}

// Get featured guide
export function getFeaturedGuide(): Guide | undefined {
  return allGuides.find(g => g.featured);
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set(allGuides.map(g => g.category));
  return Array.from(categories);
}

// Get guides by category
export function getGuidesByCategory(category: string): Guide[] {
  return allGuides.filter(g => g.category === category);
}

// Get non-featured guides for the grid
export function getGridGuides(): Guide[] {
  return allGuides.filter(g => !g.featured);
}
