// Resource types for mental health resources

export type ResourceCategory = 
  | 'anxiety' 
  | 'depression' 
  | 'stress' 
  | 'support' 
  | 'crisis'
  | 'therapy'
  | 'medication'
  | 'self-help'
  | 'general';

export type ResourceType = 
  | 'article' 
  | 'video' 
  | 'podcast' 
  | 'worksheet'
  | 'guide'
  | 'tool'
  | 'helpline';

export interface Resource {
  id: string;
  title: string;
  description: string;
  content?: string;
  category: ResourceCategory;
  type: ResourceType;
  tags: string[];
  featured: boolean;
  helpfulCount: number;
  viewCount: number;
  thumbnail?: string;
  url?: string;
  downloadUrl?: string;
  duration?: number; // in minutes
  createdAt: string;
  updatedAt: string;
}

export interface ResourceFilters {
  category?: ResourceCategory;
  type?: ResourceType;
  tags?: string[];
  search?: string;
  featured?: boolean;
}

export interface ResourceStats {
  totalResources: number;
  resourcesByCategory: Record<ResourceCategory, number>;
  resourcesByType: Record<ResourceType, number>;
  mostViewed: Resource[];
  mostHelpful: Resource[];
}
