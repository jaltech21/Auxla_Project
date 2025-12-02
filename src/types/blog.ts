// Blog and article types

export type BlogCategory = 
  | 'wellness-tips'
  | 'mental-health'
  | 'community'
  | 'personal-stories'
  | 'research'
  | 'treatment'
  | 'prevention';

export interface Author {
  id: string;
  name: string;
  title: string;
  bio?: string;
  avatar: string;
  credentials?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // in minutes
  featured: boolean;
  viewCount: number;
  likeCount: number;
  relatedPosts?: BlogPost[];
}

export interface BlogFilters {
  category?: BlogCategory;
  author?: string;
  tags?: string[];
  search?: string;
  featured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
  parentId?: string; // for nested comments
  likes: number;
}
