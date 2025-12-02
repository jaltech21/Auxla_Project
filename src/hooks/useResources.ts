import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchResources,
  fetchResourceById,
  fetchRelatedResources,
  fetchFeaturedResources,
  fetchResourceTags,
  markResourceHelpful,
  incrementResourceViews,
} from '@/services/resourceService';
import { ResourceFilters, PaginationParams } from '@/types';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from '@/constants';

// Query keys
export const resourceKeys = {
  all: ['resources'] as const,
  lists: () => [...resourceKeys.all, 'list'] as const,
  list: (params: PaginationParams & { filters?: ResourceFilters }) =>
    [...resourceKeys.lists(), params] as const,
  details: () => [...resourceKeys.all, 'detail'] as const,
  detail: (id: string) => [...resourceKeys.details(), id] as const,
  related: (id: string) => [...resourceKeys.all, 'related', id] as const,
  featured: () => [...resourceKeys.all, 'featured'] as const,
  tags: () => [...resourceKeys.all, 'tags'] as const,
};

/**
 * Hook to fetch paginated resources with filters
 */
export const useResources = (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PAGE_SIZE,
  filters?: ResourceFilters
) => {
  return useQuery({
    queryKey: resourceKeys.list({ page, limit, filters }),
    queryFn: () => fetchResources({ page, limit, filters }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData, // Keep previous data while loading
  });
};

/**
 * Hook to fetch a single resource by ID
 */
export const useResource = (id: string) => {
  return useQuery({
    queryKey: resourceKeys.detail(id),
    queryFn: () => fetchResourceById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch related resources
 */
export const useRelatedResources = (id: string, limit: number = 3) => {
  return useQuery({
    queryKey: resourceKeys.related(id),
    queryFn: () => fetchRelatedResources(id, limit),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to fetch featured resources
 */
export const useFeaturedResources = (limit: number = 6) => {
  return useQuery({
    queryKey: resourceKeys.featured(),
    queryFn: () => fetchFeaturedResources(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Hook to fetch all resource tags
 */
export const useResourceTags = () => {
  return useQuery({
    queryKey: resourceKeys.tags(),
    queryFn: fetchResourceTags,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook to mark a resource as helpful
 */
export const useMarkResourceHelpful = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markResourceHelpful(id),
    onSuccess: (_, id) => {
      // Invalidate resource detail query to refetch updated count
      queryClient.invalidateQueries({ queryKey: resourceKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: resourceKeys.lists() });
    },
  });
};

/**
 * Hook to increment resource view count
 */
export const useIncrementResourceViews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => incrementResourceViews(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.detail(id) });
    },
  });
};
