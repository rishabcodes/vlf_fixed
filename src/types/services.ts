// Service-related type definitions

// Case Management Types
export interface CaseNote {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  attachments?: string[];
}

export interface CaseFinancials {
  retainerAmount?: number;
  retainerPaid?: number;
  totalBilled?: number;
  totalPaid?: number;
  outstandingBalance?: number;
  lastPaymentDate?: Date;
  paymentHistory?: Array<{
    date: Date;
    amount: number;
    method: string;
    description: string;
  }>;
}

export interface CaseMetadata {
  notes?: CaseNote[];
  financials?: CaseFinancials;
  tags?: string[];
  customFields?: Record<string, string | number | boolean>;
  lastActivityDate?: Date;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

// Payment Types
export interface PaymentMetadata {
  invoiceNumber?: string;
  description?: string;
  items?: Array<{
    description: string;
    amount: number;
    quantity?: number;
  }>;
  tax?: number;
  discount?: number;
  legalService?: boolean;
  paymentPlanId?: string;
  installmentNumber?: number;
  customFields?: Record<string, string | number | boolean>;
}

// Email Types
export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  practiceArea: string;
  score: number;
  source: string;
  language: string;
  createdAt: Date;
  courtDate?: Date;
  message?: string;
  preferredContactTime?: string;
  id?: string;
  status?: string;
}

export interface EmailTemplateData {
  // Common fields
  email?: string;
  name?: string; // Used for client-notification, user-welcome, password-reset
  firstName?: string;
  lastName?: string;
  phone?: string;
  caseType?: string;
  message?: string;
  location?: string;
  sourceUrl?: string;
  preferredContact?: string;
  attorneyName?: string;
  clientName?: string; // Used for case-update, document-ready, payment-receipt, consultation-followup
  clientEmail?: string; // Used for case-update, document-ready, payment-receipt, consultation-followup
  subject?: string; // Used for bulk emails

  // Appointment related
  appointmentDate?: Date;
  appointmentTime?: string;
  appointmentType?: string;
  meetingType?: 'virtual' | 'in-person';
  meetingLink?: string;
  notes?: string;
  appointmentId?: string;

  // Case Evaluation related
  preferredLanguage?: string;
  incidentDate?: Date;
  urgency?: 'Immediate' | 'This Week' | 'Normal';
  previousAttorney?: boolean;
  courtDate?: Date;
  documentsAvailable?: boolean;
  description?: string;
  preferredTime?: string;
  leadScore?: number;

  // Newsletter related
  unsubscribeToken?: string;

  // Attorney Notification related
  formType?: string;
  priority?: 'High' | 'Medium' | 'Normal';
  summary?: string;
  assignedTo?: string;
  id?: string; // For attorney-notification to link to submission

  // Urgent Lead Notification related
  lead?: LeadData;
  leadId?: string; // Fallback for urgent-lead-notification

  // Password Reset related
  resetLink?: string;

  // Case Update related
  updateTitle?: string;
  caseNumber?: string;
  updateContent?: string;
  nextSteps?: string[];
  documentsNeeded?: string[];
  caseId?: string;

  // Document Ready related
  documentName?: string;
  documentType?: string;
  preparedBy?: string;
  actionRequired?: string;
  deadline?: Date;
  documentId?: string;

  // Payment Receipt related
  receiptNumber?: string;
  transactionId?: string;
  date?: Date; // For payment date
  amount?: number;
  paymentMethod?: string;
  balance?: number;
  nextPaymentDue?: Date;

  // Consultation Follow-up related
  consultationDate?: Date;
  practiceArea?: string;
  recommendations?: string[];
  quote?: string;

  // Generic custom data
  customData?: Record<string, unknown>;
}

// Agent Types
export interface AgentContext {
  userId?: string;
  sessionId?: string;
  conversationHistory?: Array<{
    role: string;
    content: string;
    timestamp: Date;
  }>;
  userProfile?: {
    name?: string;
    email?: string;
    phone?: string;
    preferredLanguage?: string;
    caseType?: string;
  };
  extractedInfo?: Record<string, string | number | boolean>;
  metadata?: Record<string, unknown>;
}

// SEO Types
export interface SchemaOrgPerson {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  email?: string;
  telephone?: string;
  alumniOf?: Array<{
    '@type': 'Organization';
    name: string;
  }>;
  memberOf?: Array<{
    '@type': 'Organization';
    name: string;
  }>;
  knowsAbout?: string[];
  url?: string;
}

export interface SchemaOrgOrganization {
  '@type': 'Organization' | 'LegalService' | 'Attorney';
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  telephone?: string;
  email?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

export interface SchemaOrgFAQ {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

// Generic Schema.org markup type
export type SchemaMarkup = 
  | SchemaOrgFAQ
  | SchemaOrgOrganization
  | SchemaOrgPerson
  | {
      '@context'?: string;
      '@type': 'WebPage' | 'LegalService' | 'Attorney' | 'LocalBusiness' | 'Review' | 'Service' | 'HowTo' | 'BlogPosting' | 'Article' | 'NewsArticle';
      [key: string]: unknown;
    };

// Document Generator Types
export interface DocumentTemplateData {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  caseNumber?: string;
  caseType?: string;
  attorneyName?: string;
  attorneyBarNumber?: string;
  date?: Date;
  customFields?: Record<string, unknown>;
}

// Notification Types
export interface NotificationMetadata {
  urgency?: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  actionUrl?: string;
  actionLabel?: string;
  expiresAt?: Date;
  customData?: Record<string, unknown>;
}

// GoHighLevel Types
export interface GHLContactData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customFields?: Record<string, string | number | boolean>;
}

export interface GHLTaskData {
  contactId: string;
  title: string;
  body: string;
  dueDate: Date;
  assignedTo?: string;
  priority?: 'low' | 'normal' | 'high';
}

export interface GHLOpportunityData {
  contactId: string;
  pipelineId: string;
  stageId: string;
  name: string;
  value: number;
  source?: string;
  customFields?: Record<string, unknown>;
}

// Retell Types
export interface RetellCallData {
  phoneNumber: string;
  agentId?: string;
  metadata?: Record<string, unknown>;
  transferNumber?: string;
  variables?: Record<string, string>;
}

export interface RetellAgentConfig {
  name: string;
  voiceId: string;
  language: string;
  prompt: string;
  responseDelaySeconds?: number;
  interruptionThreshold?: number;
  voiceSpeed?: number;
  voiceTemperature?: number;
  webhookUrl?: string;
  endCallAfterSilenceSeconds?: number;
  maxCallDurationSeconds?: number;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  pageUrl?: string;
}

export interface MetricsData {
  totalCalls?: number;
  successfulCalls?: number;
  failedCalls?: number;
  averageDuration?: number;
  totalCost?: number;
  conversionRate?: number;
  satisfactionScore?: number;
  customMetrics?: Record<string, number>;
}
