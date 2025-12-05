import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPost, BlogFilters, Author } from "@/types/blog";
import * as blogService from "@/services/blogService";

// Query keys
export const blogKeys = {
  all: ["blog"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters?: BlogFilters) => [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
  related: (postId: string) => [...blogKeys.all, "related", postId] as const,
  authors: () => [...blogKeys.all, "authors"] as const,
  author: (authorId: string) => [...blogKeys.authors(), authorId] as const,
  featured: () => [...blogKeys.all, "featured"] as const,
  search: (query: string) => [...blogKeys.all, "search", query] as const,
};

// Fetch blog posts with filters
export const useBlogPosts = (filters?: BlogFilters) => {
  return useQuery({
    queryKey: blogKeys.list(filters),
    queryFn: () => blogService.fetchBlogPosts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch single blog post by slug
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => blogService.fetchBlogPostBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!slug,
  });
};

// Fetch related posts
export const useRelatedPosts = (postId: string, limit: number = 3) => {
  return useQuery({
    queryKey: blogKeys.related(postId),
    queryFn: () => blogService.fetchRelatedPosts(postId, limit),
    staleTime: 10 * 60 * 1000,
    enabled: !!postId,
  });
};

// Fetch author
export const useAuthor = (authorId: string) => {
  return useQuery({
    queryKey: blogKeys.author(authorId),
    queryFn: () => blogService.fetchAuthorById(authorId),
    staleTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!authorId,
  });
};

// Fetch all authors
export const useAuthors = () => {
  return useQuery({
    queryKey: blogKeys.authors(),
    queryFn: () => blogService.fetchAllAuthors(),
    staleTime: 30 * 60 * 1000,
  });
};

// Fetch featured posts
export const useFeaturedPosts = (limit: number = 3) => {
  return useQuery({
    queryKey: blogKeys.featured(),
    queryFn: () => blogService.fetchFeaturedPosts(limit),
    staleTime: 10 * 60 * 1000,
  });
};

// Search blog posts
export const useSearchBlogPosts = (query: string) => {
  return useQuery({
    queryKey: blogKeys.search(query),
    queryFn: () => blogService.searchBlogPosts(query),
    staleTime: 5 * 60 * 1000,
    enabled: query.length > 2, // Only search when query is at least 3 characters
  });
};

// Like blog post mutation
export const useLikeBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => blogService.likeBlogPost(postId),
    onSuccess: (data, postId) => {
      // Invalidate related queries to refetch with updated like count
      queryClient.invalidateQueries({ queryKey: blogKeys.details() });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
};

// Fetch posts by category
export const usePostsByCategory = (category: BlogPost["category"], limit?: number) => {
  return useQuery({
    queryKey: [...blogKeys.all, "category", category],
    queryFn: () => blogService.fetchPostsByCategory(category, limit),
    staleTime: 10 * 60 * 1000,
    enabled: !!category,
  });
};

// Fetch posts by author
export const usePostsByAuthor = (authorId: string, limit?: number) => {
  return useQuery({
    queryKey: [...blogKeys.all, "author-posts", authorId],
    queryFn: () => blogService.fetchPostsByAuthorId(authorId, limit),
    staleTime: 10 * 60 * 1000,
    enabled: !!authorId,
  });
};

// Fetch posts by tag
export const usePostsByTag = (tag: string, limit?: number) => {
  return useQuery({
    queryKey: [...blogKeys.all, "tag", tag],
    queryFn: () => blogService.fetchPostsByTag(tag, limit),
    staleTime: 10 * 60 * 1000,
    enabled: !!tag,
  });
};
