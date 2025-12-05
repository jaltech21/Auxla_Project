import { BlogPost, BlogFilters, Author } from "@/types/blog";
import {
  mockBlogPosts,
  blogAuthors,
  getPostsByCategory,
  getFeaturedPosts,
  getPostsByAuthor,
  getPostsByTag,
} from "@/data/mockBlogPosts";
import {
  isUsingSanity,
  fetchBlogPostsFromSanity,
  fetchBlogPostBySlugFromSanity,
  fetchRelatedPostsFromSanity,
  fetchAuthorByIdFromSanity,
  fetchAllAuthorsFromSanity,
  fetchFeaturedPostsFromSanity,
  likeBlogPostInSanity,
  incrementViewCountInSanity,
} from "./sanityBlogService";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch paginated blog posts with filters
export const fetchBlogPosts = async (filters?: BlogFilters): Promise<{
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  // Use Sanity if configured, otherwise use mock data
  if (isUsingSanity) {
    return await fetchBlogPostsFromSanity(filters);
  }

  await delay(300); // Simulate network delay

  let filteredPosts = [...mockBlogPosts];

  // Apply search filter
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  // Apply category filter
  if (filters?.category) {
    filteredPosts = filteredPosts.filter((post) => post.category === filters.category);
  }

  // Apply author filter
  if (filters?.author) {
    filteredPosts = filteredPosts.filter((post) => post.author.name === filters.author);
  }

  // Apply tag filter
  if (filters?.tags && filters.tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      filters.tags!.some((tag) => post.tags.includes(tag))
    );
  }

  // Apply featured filter
  if (filters?.featured !== undefined) {
    filteredPosts = filteredPosts.filter((post) => post.featured === filters.featured);
  }

  // Sort posts - default to most recent first
  filteredPosts.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA; // Most recent first
  });

  // Pagination
  const page = 1;
  const limit = 9;
  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    total,
    page,
    totalPages,
  };
};

// Fetch single blog post by slug
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  // Use Sanity if configured
  if (isUsingSanity) {
    const post = await fetchBlogPostBySlugFromSanity(slug);
    if (post) {
      // Increment view count in background
      incrementViewCountInSanity(post.id).catch(console.error);
    }
    return post;
  }

  await delay(200);

  const post = mockBlogPosts.find((p) => p.slug === slug);
  
  if (post) {
    // Increment view count (simulated)
    post.viewCount += 1;
  }

  return post || null;
};

// Fetch single blog post by ID
export const fetchBlogPostById = async (id: string): Promise<BlogPost | null> => {
  await delay(200);

  const post = mockBlogPosts.find((p) => p.id === id);
  return post || null;
};

// Fetch related posts (by category and tags)
export const fetchRelatedPosts = async (
  postId: string,
  limit: number = 3
): Promise<BlogPost[]> => {
  // Use Sanity if configured
  if (isUsingSanity) {
    return await fetchRelatedPostsFromSanity(postId, limit);
  }

  await delay(200);

  const currentPost = mockBlogPosts.find((p) => p.id === postId);
  if (!currentPost) return [];

  // Find posts with same category or overlapping tags
  const relatedPosts = mockBlogPosts
    .filter((post) => {
      if (post.id === postId) return false;

      const sameCategory = post.category === currentPost.category;
      const sharedTags = post.tags.some((tag) => currentPost.tags.includes(tag));

      return sameCategory || sharedTags;
    })
    .sort((a, b) => {
      // Prioritize posts with same category
      const aScore =
        (a.category === currentPost.category ? 2 : 0) +
        a.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      const bScore =
        (b.category === currentPost.category ? 2 : 0) +
        b.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);

  return relatedPosts;
};

// Fetch author by ID
export const fetchAuthorById = async (authorId: string): Promise<Author | null> => {
  // Use Sanity if configured
  if (isUsingSanity) {
    return await fetchAuthorByIdFromSanity(authorId);
  }

  await delay(150);

  const author = blogAuthors.find((a) => a.id === authorId);
  return author || null;
};

// Fetch all authors
export const fetchAllAuthors = async (): Promise<Author[]> => {
  // Use Sanity if configured
  if (isUsingSanity) {
    return await fetchAllAuthorsFromSanity();
  }

  await delay(150);
  return blogAuthors;
};

// Fetch featured posts
export const fetchFeaturedPosts = async (limit: number = 3): Promise<BlogPost[]> => {
  // Use Sanity if configured
  if (isUsingSanity) {
    return await fetchFeaturedPostsFromSanity(limit);
  }

  await delay(200);

  return getFeaturedPosts().slice(0, limit);
};

// Fetch posts by category
export const fetchPostsByCategory = async (
  category: BlogPost["category"],
  limit?: number
): Promise<BlogPost[]> => {
  await delay(200);

  const posts = getPostsByCategory(category);
  return limit ? posts.slice(0, limit) : posts;
};

// Fetch posts by author
export const fetchPostsByAuthorId = async (
  authorId: string,
  limit?: number
): Promise<BlogPost[]> => {
  await delay(200);

  const posts = getPostsByAuthor(authorId);
  return limit ? posts.slice(0, limit) : posts;
};

// Fetch posts by tag
export const fetchPostsByTag = async (tag: string, limit?: number): Promise<BlogPost[]> => {
  await delay(200);

  const posts = getPostsByTag(tag);
  return limit ? posts.slice(0, limit) : posts;
};

// Like a blog post
export const likeBlogPost = async (postId: string): Promise<{ success: boolean; likes: number }> => {
  // Use Sanity if configured
  if (isUsingSanity) {
    return await likeBlogPostInSanity(postId);
  }

  await delay(300);

  const post = mockBlogPosts.find((p) => p.id === postId);
  if (!post) {
    throw new Error("Post not found");
  }

  post.likeCount += 1;

  return {
    success: true,
    likes: post.likeCount,
  };
};

// Search blog posts
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  await delay(250);

  if (!query.trim()) return [];

  const searchLower = query.toLowerCase();
  return mockBlogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
      post.author.name.toLowerCase().includes(searchLower)
  );
};
