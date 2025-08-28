/**
 * GoHighLevel Type Definitions
 */

export interface GHLContact {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  tags?: string[];
  customFields?: Record<string, unknown>;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
  locationId?: string;
  assignedTo?: string;
}

export interface GHLAppointment {
  id: string;
  contactId: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'no-show';
  location?: string;
  notes?: string;
  assignedUserId?: string;
  calendarId?: string;
  createdAt?: string;
  updatedAt?: string;
  appointmentStatus?: 'new' | 'confirmed' | 'cancelled' | 'showed' | 'noshow';
  meetingLocation?: string;
}

export interface GHLOpportunity {
  id: string;
  contactId: string;
  name: string;
  pipelineId: string;
  pipelineStageId: string;
  status: 'open' | 'won' | 'lost' | 'abandoned';
  monetaryValue?: number;
  assignedTo?: string;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GHLWebhookEvent {
  type: string;
  locationId: string;
  contactId?: string;
  appointmentId?: string;
  opportunityId?: string;
  campaignId?: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export interface GHLInboundMessage {
  contactId: string;
  message: string;
  type: 'SMS' | 'Email' | 'FB' | 'GMB' | 'WebChat';
  direction: 'inbound' | 'outbound';
  conversationId?: string;
  timestamp: string;
}

export interface GHLCampaignEvent {
  campaignId: string;
  contactId: string;
  status: 'completed' | 'active' | 'paused' | 'failed';
  stats?: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
  };
}

export interface GHLActivity {
  id: string;
  contactId: string;
  type: string;
  description: string;
  createdAt: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface GHLCustomField {
  id: string;
  name: string;
  fieldKey: string;
  dataType:
    | 'TEXT'
    | 'TEXTAREA'
    | 'NUMBER'
    | 'PHONE'
    | 'EMAIL'
    | 'DATE'
    | 'CHECKBOX'
    | 'SINGLE_OPTIONS'
    | 'MULTIPLE_OPTIONS';
  options?: string[];
  position: number;
}

export interface GHLUpdateData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  customFields?: Record<string, unknown>;
  assignedTo?: string;
  source?: string;
}

export interface GHLSearchParams {
  query?: string;
  limit?: number;
  offset?: number;
  tags?: string[];
  customFields?: Record<string, unknown>;
  startDate?: string;
  endDate?: string;
  includeArchived?: boolean;
}

// Retell Error Types
export interface RetellContext {
  contactId?: string;
  callId?: string;
  agentId?: string;
  phoneNumber?: string;
  direction?: 'inbound' | 'outbound';
  duration?: number;
  timestamp?: string;
  operation?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, unknown>;
}

export interface RetellErrorInfo {
  message: string;
  timestamp: Date;
  retryCount: number;
  nextRetry?: Date;
  error?: unknown;
  reason?: string;
  retryAfter?: number;
  phoneNumber?: string;
}
