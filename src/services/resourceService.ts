import { Resource, ResourceFilters, PaginatedResponse, PaginationParams } from '@/types';
import { mockResources, delay } from '@/data/mockResources';

// Simulate API call delay
const API_DELAY = 500;

/**
 * Fetch paginated resources with optional filters
 */
export const fetchResources = async (
  params: PaginationParams & { filters?: ResourceFilters }
): Promise<PaginatedResponse<Resource>> => {
  await delay(API_DELAY);

  let filteredResources = [...mockResources];

  // Apply filters
  if (params.filters) {
    const { category, type, tags, search, featured } = params.filters;

    if (category) {
      filteredResources = filteredResources.filter(
        (resource) => resource.category === category
      );
    }

    if (type) {
      filteredResources = filteredResources.filter(
        (resource) => resource.type === type
      );
    }

    if (tags && tags.length > 0) {
      filteredResources = filteredResources.filter((resource) =>
        tags.some((tag) => resource.tags.includes(tag))
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredResources = filteredResources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (featured !== undefined) {
      filteredResources = filteredResources.filter(
        (resource) => resource.featured === featured
      );
    }
  }

  // Sort by date (newest first)
  filteredResources.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Pagination
  const { page, limit } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredResources.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(filteredResources.length / limit),
      totalItems: filteredResources.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < filteredResources.length,
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Fetch a single resource by ID
 */
export const fetchResourceById = async (id: string): Promise<Resource | null> => {
  await delay(API_DELAY);

  const resource = mockResources.find((r) => r.id === id);
  return resource || null;
};

/**
 * Fetch related resources based on category and tags
 */
export const fetchRelatedResources = async (
  resourceId: string,
  limit: number = 3
): Promise<Resource[]> => {
  await delay(API_DELAY);

  const currentResource = mockResources.find((r) => r.id === resourceId);
  if (!currentResource) return [];

  // Find resources with matching category or tags
  const related = mockResources
    .filter((r) => r.id !== resourceId)
    .map((r) => {
      let score = 0;
      if (r.category === currentResource.category) score += 3;
      const commonTags = r.tags.filter((tag) =>
        currentResource.tags.includes(tag)
      ).length;
      score += commonTags;
      return { resource: r, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.resource);

  return related;
};

/**
 * Fetch featured resources
 */
export const fetchFeaturedResources = async (limit: number = 6): Promise<Resource[]> => {
  await delay(API_DELAY);

  return mockResources
    .filter((r) => r.featured)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
};

/**
 * Get all unique tags from resources
 */
export const fetchResourceTags = async (): Promise<string[]> => {
  await delay(300);

  const allTags = mockResources.flatMap((r) => r.tags);
  const uniqueTags = Array.from(new Set(allTags)).sort();
  return uniqueTags;
};

/**
 * Mark resource as helpful (increment count)
 */
export const markResourceHelpful = async (id: string): Promise<void> => {
  await delay(300);
  
  const resource = mockResources.find((r) => r.id === id);
  if (resource) {
    resource.helpfulCount += 1;
  }
};

/**
 * Increment resource view count
 */
export const incrementResourceViews = async (id: string): Promise<void> => {
  await delay(200);
  
  const resource = mockResources.find((r) => r.id === id);
  if (resource) {
    resource.viewCount += 1;
  }
};
