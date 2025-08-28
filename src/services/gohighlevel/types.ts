// GHL Service Types
export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  tags?: string[];
  source?: string;
  customFields?: Record<string, unknown>;
}

export interface GHLContactUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customFields?: Record<string, unknown>;
}

export interface GHLSMSOptions {
  contactId: string;
  message: string;
  templateId?: string;
}

export interface GHLCampaignTriggerOptions {
  contactId: string;
  campaignId: string;
}

export interface GHLTaskOptions {
  title: string;
  description?: string;
  contactId?: string;
  assignedTo?: string;
  dueDate?: Date;
  priority?: 'high' | 'medium' | 'low';
  metadata?: Record<string, unknown>;
}

export interface GHLNoteOptions {
  contactId: string;
  body: string;
  userId?: string;
}

export interface GHLCallRecordingOptions {
  contactId: string;
  recordingUrl: string;
  duration: number;
  transcript?: string;
  sentiment?: string;
  summary?: string;
}

export interface GHLCallOutcomeOptions {
  contactId: string;
  outcome: string;
  notes?: string;
  nextSteps?: string;
  tags?: string[];
}
