// API-related type definitions

// Webhook types
export interface RetellCallAnalysis {
  summary?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  intent?: string;
  case_type?: string;
  requires_follow_up?: boolean;
}

export interface RetellCallMetadata {
  ghl_contact_id?: string;
  requires_callback?: boolean;
  ghl_opportunity_id?: string;
  callback_phone?: string;
  callback_time?: string;
  caller_name?: string;
  caller_email?: string;
  case_details?: string;
  priority?: 'high' | 'medium' | 'low';
  tags?: string[];
  custom_fields?: Record<string, string | number | boolean>;
}

export interface PaymentPlanMetadata {
  failedAttempts?: number;
  lastFailedAttempt?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  retryCount?: number;
  nextRetryDate?: string;
  errorMessage?: string;
  paymentMethod?: string;
  planType?: string;
  billingCycle?: 'monthly' | 'quarterly' | 'annual';
  customFields?: Record<string, string | number | boolean>;
}

// Contact form types
export interface ContactFormMetadata {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  message: string;
  preferredLanguage?: string;
  referralSource?: string;
  hearAboutUs?: string;
  acceptedTerms: boolean;
  newsletter?: boolean;
  timestamp: string;
  ipAddress?: string;
}

// Dashboard metrics types
export interface ExtractedInfo {
  nextCourtDate?: string;
  caseStatus?: string;
  alienNumber?: string;
  receiptNumber?: string;
  urgency?: 'high' | 'medium' | 'low';
  documentIds?: string[];
  appointmentDate?: string;
  estimatedValue?: number;
  referenceNumber?: string;
  additionalNotes?: string;
  customData?: Record<string, string | number | boolean>;
}

// Admin Socket API types
export interface AdminAuthResult {
  user: {
    id: string;
    email: string;
  };
  role: string;
}

export interface AdminAuthError {
  error: string;
  status: number;
}

export interface AdminActionRequest {
  action: string;
  data?: Record<string, unknown>;
}

export interface AdminActionResult {
  success: boolean;
  message?: string;
  data?: unknown;
  timestamp?: number;
}

export interface AdminConfigRequest {
  config: {
    alerts?: Array<{
      metric: string;
      threshold: number;
      comparison: 'gt' | 'lt' | 'eq';
      duration: number;
      enabled: boolean;
    }>;
    maintenance?: {
      enabled: boolean;
      message?: string;
    };
    rateLimits?: Array<{
      userId?: string;
      socketId?: string;
      maxMessages: number;
      windowMs: number;
    }>;
  };
}

// AI Health API types
export interface AIHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  services?: Record<string, unknown>;
  diagnostics?: Record<string, unknown>;
  summary: {
    chatService: boolean;
    translationService: boolean;
    agentOrchestrator: boolean;
    openaiConfigured: boolean;
    agentCount: number;
  };
}

export interface AITestRequest {
  message: string;
  language?: string;
  testType?: 'all' | 'chat' | 'translation' | 'agents';
}

export interface AITestResult {
  timestamp: string;
  testMessage: string;
  language: string;
  testType: string;
  results: Record<
    string,
    {
      success: boolean;
      responseTime?: number;
      error?: string;
      [key: string]: unknown;
    }
  >;
  overallSuccess: boolean;
  successRate: number;
}

// Blog API types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  metaDescription?: string | null;
  practiceArea?: string | null;
  language: string;
  publishedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  readTime?: number;
  author: string | null;
  keywords?: string[];
  metaKeywords?: string[];
  featuredImage?: string | null;
  images: string[];
  viewCount: number;
  seoScore: number;
  faqSection: unknown;
  translations: Array<{
    id: string;
    slug: string;
    language: string;
  }>;
  status: string;
  originalId?: string;
  [key: string]: unknown; // Allow additional properties for SEO schema generation
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: Date | null;
  category?: string;
  featuredImage?: string | null;
}

export interface BlogPostResponse {
  post: BlogPost;
  relatedPosts: RelatedPost[];
  structuredData: Record<string, unknown> | null;
}

// GMB Posts API types
export interface GMBPostMedia {
  type: 'image' | 'video';
  url: string;
  altText?: string;
}

export interface GMBPostCallToAction {
  type: 'book' | 'order' | 'shop' | 'learn_more' | 'sign_up' | 'call';
  url?: string;
}

export interface GMBPostEvent {
  title: string;
  startDate: Date;
  endDate: Date;
}

export interface GMBPostOffer {
  title: string;
  description: string;
  terms: string;
  startDate: Date;
  endDate: Date;
  couponCode?: string;
}

export interface GMBPostRequest {
  locationId: string;
  type: 'update' | 'event' | 'offer' | 'product' | 'covid19';
  title: string;
  content: string;
  media?: GMBPostMedia[];
  callToAction?: GMBPostCallToAction;
  event?: GMBPostEvent;
  offer?: GMBPostOffer;
}

export interface GMBPostResponse {
  id: string;
  locationId: string;
  type: string;
  title: string;
  content: string;
  media: GMBPostMedia[];
  callToAction: GMBPostCallToAction;
  event: GMBPostEvent;
  offer: GMBPostOffer;
  publishedAt: Date | null;
}

export interface GMBPostsListResponse {
  success: boolean;
  posts: GMBPostResponse[];
}

// Socket Health API types
export interface SocketHealthCheck {
  socket_server: 'pass' | 'fail' | 'warn';
  response_time: 'pass' | 'fail' | 'warn';
  memory_usage: 'pass' | 'fail' | 'warn' | 'unknown';
  circuit_breakers: 'pass' | 'fail' | 'warn' | 'unknown';
}

export interface SocketHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  endpoint: string;
  version: string;
  environment: string;
  checks: SocketHealthCheck;
  timestamp?: number;
  details?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface AdminSocketHealthResponse extends SocketHealthResponse {
  requestedBy: string;
  connections: {
    summary: unknown;
    detailed: unknown;
  };
  metrics: {
    current: unknown;
    history: unknown;
  };
  admin: {
    commandHistory: unknown[];
    alertConfigs: Array<[string, unknown]>;
  };
  performance: {
    errorRate: number;
    uptime: number;
    performanceMetrics: Record<string, unknown>;
  };
}
