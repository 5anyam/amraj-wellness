
// Utility functions for handling product slugs
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

export const extractIdFromSlug = (slug: string): number | null => {
  // If the slug ends with a number (like WordPress does), extract it
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1]) : null;
};

export const createProductSlug = (product: { id: number; name: string }): string => {
  // Just return the product name as slug without ID
  return generateSlug(product.name);
};
