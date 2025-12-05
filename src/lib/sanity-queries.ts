// Sanity GROQ Queries for Blog System

// Fetch all blog posts with filters
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && published == true] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    "content": content,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug,
      description
    },
    tags[]->{
      _id,
      name,
      slug
    },
    author->{
      _id,
      name,
      title,
      bio,
      "avatar": avatar.asset->url,
      credentials,
      socialLinks
    },
    publishedAt,
    updatedAt,
    readTime,
    featured,
    viewCount,
    likeCount
  }
`;

// Fetch single blog post by slug
export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && published == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    "content": content,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug,
      description
    },
    tags[]->{
      _id,
      name,
      slug
    },
    author->{
      _id,
      name,
      title,
      bio,
      "avatar": avatar.asset->url,
      credentials,
      socialLinks
    },
    publishedAt,
    updatedAt,
    readTime,
    featured,
    viewCount,
    likeCount,
    commentsCount
  }
`;

// Fetch related posts (same category or tags)
export const RELATED_POSTS_QUERY = `
  *[_type == "blogPost" && _id != $postId && published == true && (
    category._ref == $categoryId || 
    count((tags[]._ref)[@ in $tagIds]) > 0
  )] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug
    },
    tags[]->{
      _id,
      name
    },
    author->{
      _id,
      name,
      title,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    featured,
    viewCount,
    likeCount
  }
`;

// Fetch featured posts
export const FEATURED_POSTS_QUERY = `
  *[_type == "blogPost" && featured == true && published == true] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug
    },
    tags[]->{
      _id,
      name
    },
    author->{
      _id,
      name,
      title,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    featured,
    viewCount,
    likeCount
  }
`;

// Fetch all authors
export const AUTHORS_QUERY = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    title,
    bio,
    "avatar": avatar.asset->url,
    credentials,
    socialLinks,
    "postCount": count(*[_type == "blogPost" && author._ref == ^._id && published == true])
  }
`;

// Fetch single author
export const AUTHOR_BY_ID_QUERY = `
  *[_type == "author" && _id == $authorId][0] {
    _id,
    name,
    title,
    bio,
    "avatar": avatar.asset->url,
    credentials,
    socialLinks
  }
`;

// Fetch posts by category
export const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "blogPost" && category->slug.current == $categorySlug && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug
    },
    tags[]->{
      _id,
      name
    },
    author->{
      _id,
      name,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    viewCount
  }
`;

// Fetch posts by author
export const POSTS_BY_AUTHOR_QUERY = `
  *[_type == "blogPost" && author._ref == $authorId && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug
    },
    tags[]->{
      _id,
      name
    },
    publishedAt,
    readTime,
    viewCount
  }
`;

// Fetch posts by tag
export const POSTS_BY_TAG_QUERY = `
  *[_type == "blogPost" && $tagSlug in tags[]->slug.current && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug
    },
    tags[]->{
      _id,
      name
    },
    author->{
      _id,
      name,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    viewCount
  }
`;

// Search posts
export const SEARCH_POSTS_QUERY = `
  *[_type == "blogPost" && published == true && (
    title match $searchQuery || 
    excerpt match $searchQuery || 
    content match $searchQuery
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    category->{
      _id,
      name,
      slug
    },
    tags[]->{
      _id,
      name
    },
    author->{
      _id,
      name,
      "avatar": avatar.asset->url
    },
    publishedAt,
    readTime,
    viewCount
  }
`;

// Fetch all categories
export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    "postCount": count(*[_type == "blogPost" && category._ref == ^._id && published == true])
  }
`;

// Fetch all tags
export const TAGS_QUERY = `
  *[_type == "tag"] | order(name asc) {
    _id,
    name,
    slug,
    "postCount": count(*[_type == "blogPost" && references(^._id) && published == true])
  }
`;
