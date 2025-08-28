/**
 * Content Factory Type Definitions
 */

export interface BlogContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  practiceArea: PracticeArea;
  keywords: string[];
  author?: string;
  featuredImage: string;
  publishedAt?: Date;
  updatedAt?: Date;
}

export type PracticeArea =
  | 'immigration'
  | 'personal-injury'
  | 'workers-compensation'
  | 'criminal-defense'
  | 'family-law'
  | 'traffic-violations';

export interface DirectorySubmissionFormat {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    credentials: string;
  };
  url?: string;
  headline?: string;
  body?: string;
  practiceArea?: string;
  jurisdiction?: string;
  keywords?: string[];
  summary?: string;
  fullText?: string;
  location?: string;
}

export interface MediumPost {
  title: string;
  content: string;
  tags: string[];
  canonicalUrl: string;
  publishStatus: 'public' | 'draft' | 'unlisted';
  license:
    | 'all-rights-reserved'
    | 'cc-40-by'
    | 'cc-40-by-sa'
    | 'cc-40-by-nd'
    | 'cc-40-by-nc'
    | 'cc-40-by-nc-nd'
    | 'cc-40-by-nc-sa'
    | 'cc-40-zero'
    | 'public-domain';
}

export interface LinkedInShare {
  author: string;
  lifecycleState: 'PUBLISHED' | 'DRAFT';
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: 'NONE' | 'ARTICLE' | 'IMAGE' | 'VIDEO' | 'LIVE_VIDEO';
      media?: Array<{
        status: 'READY' | 'PROCESSING';
        originalUrl: string;
        title?: {
          text: string;
        };
        description?: {
          text: string;
        };
      }>;
    };
  };
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' | 'CONNECTIONS';
  };
}

export interface PRRelease {
  headline: string;
  subheadline?: string;
  dateline: string;
  body: string;
  boilerplate: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  categories: string[];
  tags: string[];
  multimedia?: Array<{
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    caption?: string;
  }>;
}

export interface CitationSource {
  name: string;
  type: 'local' | 'trust' | 'niche' | 'professional';
  submit: () => Promise<CitationResult>;
}

export interface CitationResult {
  postId?: string;
  status?: string;
  listingId?: string;
  placeId?: string;
  accreditationId?: string;
  chambers?: string[];
  urls?: string[];
  directories?: string[];
  associations?: string[];
}

export interface SyndicationResult {
  directory?: string;
  platform?: string;
  source?: string;
  type?: string;
  success: boolean;
  url?: string;
  backlink?: string;
  error?: string;
  postId?: string;
  shareId?: string;
  releaseId?: string;
  distributionList?: string[];
  estimatedReach?: number;
  submitted?: number;
  sites?: string[];
  responded?: number;
  category?: string;
  pitched?: number;
  topic?: string;
  partnerships?: number;
}

export interface ContentSyndicationMetrics {
  contentId: string;
  platform: string;
  status: 'success' | 'failed';
  url?: string;
  externalId?: string;
  metrics: unknown;
  syndicatedAt: Date;
}

// Landing Page Generator Types
export interface LocalData {
  population: number;
  demographics: {
    hispanicPopulation: number;
    medianIncome: number;
    averageAge: number;
  };
  localCourts: Array<{
    name: string;
    address: string;
    type: string;
  }>;
  stats: {
    personalInjuryCases?: number;
    workersCompCases?: number;
    immigrationCases?: number;
    criminalCases?: number;
    familyLawCases?: number;
    trafficCases?: number;
  };
  landmarks: string[];
  majorEmployers: string[];
  nearbyOffices: Array<{
    name: string;
    distance: number;
  }>;
}

export interface PageSection {
  type: string;
  title: string;
  content: string;
  order: number;
  metadata?: Record<string, unknown>;
}

export interface LocalSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  areaServed?: Array<{
    '@type': string;
    name: string;
  }>;
  priceRange?: string;
  telephone?: string;
  url?: string;
}

export interface ConversionElements {
  ctaButtons: Array<{
    text: string;
    url: string;
    style: string;
    trackingId: string;
  }>;
  forms: Array<{
    type: string;
    fields: string[];
    submitUrl: string;
    trackingId: string;
  }>;
  chatWidget: {
    enabled: boolean;
    position: string;
    welcomeMessage: string;
  };
  popups: Array<{
    type: string;
    trigger: string;
    content: string;
    delay?: number;
  }>;
}

// Schema Types
export interface FAQ {
  question: string;
  answer: string;
}

export interface Education {
  '@type': string;
  name: string;
  school?: string;
  degree?: string;
  year?: string;
}

export interface Award {
  name: string;
  year?: string;
  organization?: string;
}

export interface Speaker {
  name: string;
  role?: string;
  title?: string;
  organization?: string;
}

export interface Event {
  name: string;
  title: string;
  description: string;
  location: string;
  locationName?: string;
  address?: string;
  startDate: string;
  endDate?: string;
  speakers?: Speaker[];
  offers?: Array<{
    '@type': string;
    price: string | number;
    priceCurrency: string;
    url: string;
  }>;
  slug: string;
  isOnline?: boolean;
  url?: string;
  registrationUrl?: string;
  capacity?: number;
}

export interface Attorney {
  name: string;
  image?: string;
  jobTitle: string;
  title?: string;
  bio?: string;
  description?: string;
  telephone?: string;
  email?: string;
  education?: Education[];
  awards?: Award[];
  languages?: string[];
  practiceAreas?: string[];
  slug?: string;
  barAssociations?: string[];
}

export interface ServiceVariation {
  name: string;
  description: string;
  provider: string;
  category: string;
  practiceArea: string;
  slug: string;
  url: string;
  variationType?: string;
}

export interface SchemaContent {
  id?: string;
  title?: string;
  content?: string;
  faqSection?: FAQ[];
  questions?: FAQ[];
  name?: string;
  description?: string;
  metaDescription?: string;
  featuredImage?: string;
  practiceArea?: string;
  city?: string;
  slug?: string;
  type?: string;
}

export interface SEOContent extends BlogContent {
  headings?: Array<{
    level: number;
    text: string;
  }>;
  images?: Array<{
    src: string;
    alt?: string;
    title?: string;
  }>;
  internalLinks?: Array<{
    href: string;
    text: string;
  }>;
  schema?: Record<string, unknown>;
  mobileOptimized?: boolean;
  wordCount?: number;
  faqSection?: FAQ[];
  schemaType?: string;
  // Additional properties for flexibility
  additionalProperties?: Record<string, unknown>;
}
