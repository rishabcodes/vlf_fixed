export interface SearchResult {
  id: string;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  url: string;
  type: 'page' | 'blog' | 'attorney' | 'practice-area' | 'location';
  category?: string;
  tags?: string[];
  lastModified?: string;
  priority?: number;
  metadata?: {
    author?: string;
    readTime?: string;
    expertise?: string[];
    location?: string;
    phone?: string;
    email?: string;
    practiceAreas?: string[];
    languages?: string[];
    availability?: string;
    certifications?: string[];
    rating?: number;
    reviewCount?: number;
    yearsOfExperience?: number;
    barNumber?: string;
    customFields?: Record<string, string | number | boolean>;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  suggestions?: string[];
}

export interface SearchFilters {
  types?: string[];
  category?: string[];
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
}
