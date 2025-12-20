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
import { supabase } from "@/lib/supabase";

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch paginated blog posts with filters
export const fetchBlogPosts = async (filters?: BlogFilters): Promise<{
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  // Use Sanity if configured
  if (isUsingSanity) {
    return await fetchBlogPostsFromSanity(filters);
  }

  try {
    // Build the query
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(id, name, slug, avatar_url, title),
        category:categories(id, name, slug),
        post_tags(tag:tags(id, name, slug))
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Apply search filter
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }

    // Apply category filter
    if (filters?.category) {
      query = query.eq('category.slug', filters.category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    // Transform data to match BlogPost type
    const posts: BlogPost[] = (data || []).map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      coverImage: post.cover_image || '/placeholder.svg',
      category: post.category?.name || 'Uncategorized',
      tags: post.post_tags?.map((pt: any) => pt.tag?.name).filter(Boolean) || [],
      author: {
        id: post.author?.id || '',
        name: post.author?.name || 'Anonymous',
        title: post.author?.title || 'Contributor',
        avatar: post.author?.avatar_url || '/placeholder.svg',
        bio: ''
      },
      publishedAt: post.published_at || post.created_at,
      readTime: Math.ceil(post.content.split(' ').length / 200),
      viewCount: 0,
      likeCount: 0,
      featured: false
    }));

    // Pagination
    const page = 1;
    const limit = 9;
    const total = count || posts.length;
    const totalPages = Math.ceil(total / limit);

    return {
      posts,
      total,
      page,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching blog posts from Supabase:', error);
    // Fallback to mock data on error
    await delay(300);
    const filteredPosts = [...mockBlogPosts];
    return {
      posts: filteredPosts.slice(0, 9),
      total: filteredPosts.length,
      page: 1,
      totalPages: Math.ceil(filteredPosts.length / 9),
    };
  }
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

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(id, name, slug, avatar_url, title),
        category:categories(id, name, slug),
        post_tags(tag:tags(id, name, slug)),
        post_views(id)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    if (!data) return null;

    // Increment view count in background
    supabase
      .from('post_views')
      .insert([{ post_id: data.id, viewer_ip: 'web' }])
      .then(() => {});

    // Transform to BlogPost type
    const post: BlogPost = {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || '',
      content: data.content,
      coverImage: data.cover_image || '/placeholder.svg',
      category: data.category?.name || 'Uncategorized',
      tags: data.post_tags?.map((pt: any) => pt.tag?.name).filter(Boolean) || [],
      author: {
        id: data.author?.id || '',
        name: data.author?.name || 'Anonymous',
        title: data.author?.title || 'Contributor',
        avatar: data.author?.avatar_url || '/placeholder.svg',
        bio: ''
      },
      publishedAt: data.published_at || data.created_at,
      readTime: Math.ceil(data.content.split(' ').length / 200),
      viewCount: data.post_views?.length || 0,
      likeCount: 0,
      featured: false
    };

    return post;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    // Fallback to mock data
    await delay(200);
    const post = mockBlogPosts.find((p) => p.slug === slug);
    return post || null;
  }
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

  try {
    // For now, just return the most recent published posts
    // You can add a 'featured' boolean column later if needed
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(id, name, slug, avatar_url, title),
        category:categories(id, name, slug),
        post_tags(tag:tags(id, name, slug))
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      coverImage: post.cover_image || '/placeholder.svg',
      category: post.category?.name || 'Uncategorized',
      tags: post.post_tags?.map((pt: any) => pt.tag?.name).filter(Boolean) || [],
      author: {
        id: post.author?.id || '',
        name: post.author?.name || 'Anonymous',
        title: post.author?.title || 'Contributor',
        avatar: post.author?.avatar_url || '/placeholder.svg',
        bio: ''
      },
      publishedAt: post.published_at || post.created_at,
      readTime: Math.ceil(post.content.split(' ').length / 200),
      viewCount: 0,
      likeCount: 0,
      featured: true
    }));
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    await delay(200);
    return getFeaturedPosts().slice(0, limit);
  }
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
