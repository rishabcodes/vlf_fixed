// Blog-related type definitions

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: BlogImage;
  practiceArea: string;
  language: 'en' | 'es';
  publishedAt: Date;
  readTime: number;
  author: BlogAuthor;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  views?: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  role?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface BlogImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface BlogSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: BlogImage;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  parentId?: string;
  language: 'en' | 'es';
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  language: 'en' | 'es';
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    website?: string;
  };
  content: string;
  createdAt: string | Date;
  approved: boolean;
  parentId?: string; // For nested comments
}

export interface BlogSearchParams {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  page?: number;
  limit?: number;
  sortBy?: 'publishedAt' | 'title' | 'views';
  sortOrder?: 'asc' | 'desc';
  language?: 'en' | 'es';
  status?: 'draft' | 'published' | 'archived';
}

export interface BlogSearchResult {
  posts: BlogPost[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  popularPosts: BlogPost[];
  recentPosts: BlogPost[];
  topCategories: (BlogCategory & { postCount: number })[];
  topTags: (BlogTag & { postCount: number })[];
}

export interface BlogMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  publishedAt: string;
  modifiedAt: string;
  canonicalUrl: string;
  ogImage: string;
  structuredData: Record<string, unknown>;
}

// Blog content blocks for rich content
export interface BlogContentBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code' | 'embed';
  content: string;
  metadata?: Record<string, unknown>;
}

export interface BlogTemplate {
  id: string;
  name: string;
  description: string;
  content: BlogContentBlock[];
  category: string;
  language: 'en' | 'es';
}

// Blog analytics
export interface BlogAnalytics {
  postId: string;
  views: number;
  uniqueViews: number;
  readingTime: number;
  avgSessionDuration: number;
  bounceRate: number;
  socialShares: {
    facebook: number;
    twitter: number;
    linkedin: number;
    email: number;
  };
  topReferrers: {
    source: string;
    visits: number;
  }[];
  userEngagement: {
    likes: number;
    comments: number;
    bookmarks: number;
  };
}

// Blog syndication
export interface BlogRSSFeed {
  title: string;
  description: string;
  link: string;
  language: string;
  lastBuildDate: string;
  items: BlogRSSItem[];
}

export interface BlogRSSItem {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: string;
  author: string;
  categories: string[];
  enclosure?: {
    url: string;
    type: string;
    length: number;
  };
}

// Blog content creation and editing
export interface BlogDraft {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  authorId: string;
  tags: string[];
  categories: string[];
  featuredImage?: BlogImage;
  seo: Partial<BlogSEO>;
  language: 'en' | 'es';
  scheduledAt?: string | Date;
  autoSave?: boolean;
}

export interface BlogPublishOptions {
  publishNow: boolean;
  scheduledAt?: string | Date;
  notifySubscribers: boolean;
  socialMediaPost: boolean;
  seoOptimization: boolean;
  generateSummary: boolean;
}
