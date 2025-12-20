import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchResources,
  fetchResourceById,
  fetchRelatedResources,
  fetchFeaturedResources,
  fetchResourceTags,
  markResourceHelpful,
  incrementResourceViews,
} from '@/services/serviceService';
import { ResourceFilters, PaginationParams } from '@/types';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from '@/constants';

// Query keys
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (params: PaginationParams & { filters?: ResourceFilters }) =>
    [...serviceKeys.lists(), params] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
  related: (id: string) => [...serviceKeys.all, 'related', id] as const,
  featured: () => [...serviceKeys.all, 'featured'] as const,
  tags: () => [...serviceKeys.all, 'tags'] as const,
};

/**
 * Hook to fetch paginated services with filters
 */
export const useServices = (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PAGE_SIZE,
  filters?: ResourceFilters
) => {
  return useQuery({
    queryKey: serviceKeys.list({ page, limit, filters }),
    queryFn: () => fetchResources({ page, limit, filters }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (previousData) => previousData, // Keep previous data while loading
  });
};

/**
 * Hook to fetch a single service by ID
 */
export const useService = (id: string) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => fetchResourceById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch related services
 */
export const useRelatedServices = (id: string, limit: number = 3) => {
  return useQuery({
    queryKey: serviceKeys.related(id),
    queryFn: () => fetchRelatedResources(id, limit),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to fetch featured services
 */
export const useFeaturedServices = (limit: number = 6) => {
  return useQuery({
    queryKey: serviceKeys.featured(),
    queryFn: () => fetchFeaturedResources(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Hook to fetch all service tags
 */
export const useServiceTags = () => {
  return useQuery({
    queryKey: serviceKeys.tags(),
    queryFn: fetchResourceTags,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook to mark a service as helpful
 */
export const useMarkServiceHelpful = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markResourceHelpful(id),
    onSuccess: (_, id) => {
      // Invalidate service detail query to refetch updated count
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
    },
  });
};

/**
 * Hook to increment service view count
 */
export const useIncrementServiceViews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => incrementResourceViews(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(id) });
    },
  });
};
