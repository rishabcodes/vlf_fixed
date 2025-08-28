/**
 * CrewAI Type Definitions
 */

export interface TrainingData {
  affirmative?: {
    topics: string[];
    keywords: string[];
    regulations: string[];
    procedures: Record<string, unknown>;
  };
  humanitarian?: {
    topics: string[];
    keywords: string[];
    regulations: string[];
    procedures: Record<string, unknown>;
  };
  business?: {
    topics: string[];
    keywords: string[];
    regulations: string[];
    procedures: Record<string, unknown>;
  };
  removal?: {
    topics: string[];
    keywords: string[];
    regulations: string[];
    procedures: Record<string, unknown>;
  };
  criminal?: {
    topics: string[];
    keywords: string[];
    regulations: string[];
    procedures: Record<string, unknown>;
  };
}

export interface QueryContext {
  userId?: string;
  sessionId?: string;
  language?: string;
  previousQueries?: string[];
  userProfile?: {
    caseType?: string;
    country?: string;
    status?: string;
  };
}

export interface AnalysisResult {
  caseType: string;
  eligibility: boolean;
  requirements: string[];
  timeline: string;
  costs: number;
  risks: string[];
  recommendations: string[];
  nextSteps: string[];
}

export interface AgentParams {
  caseType?: string;
  country?: string;
  currentStatus?: string;
  criminalHistory?: boolean;
  familyInUS?: boolean;
  employmentHistory?: boolean;
  query?: string;
  context?: QueryContext;
}

export interface CrewMember {
  name: string;
  role: string;
  tools: string[];
  backstory: string;
  goal: string;
  verbose: boolean;
  allowDelegation: boolean;
  maxIter: number;
}

export interface CrewTask {
  description: string;
  agent: CrewMember;
  tools?: string[];
  expectedOutput: string;
  context?: string[];
}

export interface CrewResult {
  output: string;
  tasks: Array<{
    description: string;
    output: string;
    agent: string;
  }>;
  tokens: number;
}

export interface SocialMediaPost {
  platform: string;
  content: string;
  hashtags: string[];
  mediaUrls?: string[];
  scheduledTime?: Date;
}

export interface GoogleMyBusinessUpdate {
  type: 'post' | 'offer' | 'event';
  title: string;
  description: string;
  callToAction?: {
    type: string;
    url: string;
  };
  mediaUrl?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CompetitorAnalysis {
  competitorName: string;
  website: string;
  strengths: string[];
  weaknesses: string[];
  keywords: string[];
  backlinks: number;
  socialPresence: Record<string, number>;
  contentStrategy: string;
}

export interface BlogContentPlan {
  title: string;
  topic: string;
  keywords: string[];
  outline: string[];
  targetLength: number;
  seoScore: number;
  competitorGaps: string[];
}

export interface ReviewHarvestingResult {
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  date: Date;
  response?: string;
}

export interface SEODominationMetrics {
  organicTraffic: number;
  keywordRankings: Record<string, number>;
  backlinks: number;
  domainAuthority: number;
  localPackPosition: number;
  reviewScore: number;
  socialEngagement: number;
}

export interface GMBReview {
  reviewId: string;
  author: string;
  rating: number;
  text: string;
  createTime: Date;
  updateTime?: Date;
  replyTime?: Date;
  replyText?: string;
}

export interface GMBLocation {
  locationId: string;
  name: string;
  address: {
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  phoneNumber?: string;
  websiteUrl?: string;
  categories?: string[];
  businessHours?: Record<string, string>;
}

export interface GMBPost {
  postId?: string;
  summary: string;
  callToAction?: {
    actionType: string;
    url: string;
  };
  media?: Array<{
    mediaFormat: string;
    sourceUrl: string;
  }>;
  event?: {
    title: string;
    schedule: {
      startDate: Date;
      endDate?: Date;
    };
  };
}

export interface GMBPhoto {
  category: string;
  sourceUrl: string;
  description?: string;
}

export interface CompetitorGMBData {
  businessName: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  posts: number;
  photos: number;
  respondTime?: string;
  attributes?: string[];
}

export interface ReviewResponse {
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  includesKeywords: boolean;
  promotesServices: boolean;
}

export interface LocalSEOOptimization {
  businessName?: string;
  businessDescription?: string;
  categories?: string[];
  attributes?: string[];
  serviceArea?: Array<{
    locality: string;
    region: string;
  }>;
}
