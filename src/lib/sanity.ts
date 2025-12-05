import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity Project Configuration
// TODO: Replace these with your actual Sanity project credentials
// Get these from https://sanity.io/manage after creating a project
export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-12-05", // Use current date
  useCdn: true, // Set to false for real-time preview
};

// Create Sanity client
export const sanityClient = createClient(sanityConfig);

// Image URL builder for optimizing images
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper to get optimized image URL
export function getImageUrl(source: any, width?: number, height?: number) {
  let url = urlFor(source).auto("format").fit("max");

  if (width) {
    url = url.width(width);
  }
  if (height) {
    url = url.height(height);
  }

  return url.url();
}
