import { BlogPost, BlogFilters, Author } from "@/types/blog";
import { sanityClient } from "@/lib/sanity";
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  FEATURED_POSTS_QUERY,
  AUTHORS_QUERY,
  AUTHOR_BY_ID_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  POSTS_BY_TAG_QUERY,
  SEARCH_POSTS_QUERY,
} from "@/lib/sanity-queries";

// Check if Sanity is configured
const isSanityConfigured = () => {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  return projectId && projectId !== "your-project-id";
};

// Transform Sanity data to our BlogPost type
const transformSanityPost = (sanityPost: any): BlogPost => {
  return {
    id: sanityPost._id,
    slug: sanityPost.slug.current,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    content: sanityPost.content, // Will need rich text rendering
    coverImage: sanityPost.coverImage,
    author: {
      id: sanityPost.author._id,
      name: sanityPost.author.name,
      title: sanityPost.author.title,
      bio: sanityPost.author.bio,
      avatar: sanityPost.author.avatar,
      credentials: sanityPost.author.credentials || [],
      socialLinks: sanityPost.author.socialLinks,
    },
    category: sanityPost.category.slug.current,
    tags: sanityPost.tags?.map((tag: any) => tag.slug.current) || [],
    publishedAt: sanityPost.publishedAt,
    updatedAt: sanityPost.updatedAt,
    readTime: sanityPost.readTime,
    featured: sanityPost.featured || false,
    viewCount: sanityPost.viewCount || 0,
    likeCount: sanityPost.likeCount || 0,
  };
};

// Fetch blog posts from Sanity
export const fetchBlogPostsFromSanity = async (filters?: BlogFilters) => {
  try {
    let query = BLOG_POSTS_QUERY;
    const params: any = {};

    // Apply filters
    if (filters?.category) {
      query = POSTS_BY_CATEGORY_QUERY;
      params.categorySlug = filters.category;
    } else if (filters?.search) {
      query = SEARCH_POSTS_QUERY;
      params.searchQuery = `*${filters.search}*`;
    } else if (filters?.featured) {
      query = FEATURED_POSTS_QUERY;
      params.limit = 999;
    }

    const posts = await sanityClient.fetch(query, params);
    const transformedPosts = posts.map(transformSanityPost);

    // Client-side filtering for additional filters
    let filteredPosts = transformedPosts;

    if (filters?.author) {
      filteredPosts = filteredPosts.filter(
        (post) => post.author.name === filters.author
      );
    }

    if (filters?.tags && filters.tags.length > 0) {
      filteredPosts = filteredPosts.filter((post) =>
        filters.tags!.some((tag) => post.tags.includes(tag))
      );
    }

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
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    throw error;
  }
};

// Fetch single post from Sanity
export const fetchBlogPostBySlugFromSanity = async (slug: string) => {
  try {
    const post = await sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
    return post ? transformSanityPost(post) : null;
  } catch (error) {
    console.error("Error fetching post from Sanity:", error);
    throw error;
  }
};

// Fetch related posts from Sanity
export const fetchRelatedPostsFromSanity = async (
  postId: string,
  limit: number = 3
) => {
  try {
    // First get the current post to find its category and tags
    const currentPost = await sanityClient.fetch(
      `*[_type == "blogPost" && _id == $postId][0] {
        category->{_id},
        tags[]->{_id}
      }`,
      { postId }
    );

    if (!currentPost) return [];

    const params = {
      postId,
      categoryId: currentPost.category._id,
      tagIds: currentPost.tags?.map((tag: any) => tag._id) || [],
      limit,
    };

    const posts = await sanityClient.fetch(RELATED_POSTS_QUERY, params);
    return posts.map(transformSanityPost);
  } catch (error) {
    console.error("Error fetching related posts from Sanity:", error);
    return [];
  }
};

// Fetch author from Sanity
export const fetchAuthorByIdFromSanity = async (authorId: string) => {
  try {
    const author = await sanityClient.fetch(AUTHOR_BY_ID_QUERY, { authorId });
    return author;
  } catch (error) {
    console.error("Error fetching author from Sanity:", error);
    return null;
  }
};

// Fetch all authors from Sanity
export const fetchAllAuthorsFromSanity = async () => {
  try {
    const authors = await sanityClient.fetch(AUTHORS_QUERY);
    return authors;
  } catch (error) {
    console.error("Error fetching authors from Sanity:", error);
    return [];
  }
};

// Fetch featured posts from Sanity
export const fetchFeaturedPostsFromSanity = async (limit: number = 3) => {
  try {
    const posts = await sanityClient.fetch(FEATURED_POSTS_QUERY, { limit });
    return posts.map(transformSanityPost);
  } catch (error) {
    console.error("Error fetching featured posts from Sanity:", error);
    return [];
  }
};

// Like a blog post (update in Sanity)
export const likeBlogPostInSanity = async (postId: string) => {
  try {
    // Increment like count in Sanity
    await sanityClient
      .patch(postId)
      .setIfMissing({ likeCount: 0 })
      .inc({ likeCount: 1 })
      .commit();

    // Fetch updated post to get new count
    const post = await sanityClient.fetch(
      `*[_type == "blogPost" && _id == $postId][0] { likeCount }`,
      { postId }
    );

    return {
      success: true,
      likes: post.likeCount,
    };
  } catch (error) {
    console.error("Error liking post in Sanity:", error);
    throw error;
  }
};

// Increment view count in Sanity
export const incrementViewCountInSanity = async (postId: string) => {
  try {
    await sanityClient
      .patch(postId)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 })
      .commit();
  } catch (error) {
    console.error("Error incrementing view count in Sanity:", error);
  }
};

// Export flag to check if using Sanity
export const isUsingSanity = isSanityConfigured();
