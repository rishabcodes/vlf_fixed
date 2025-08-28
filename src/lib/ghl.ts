// axios removed - using native fetch;

import { logger } from '@/lib/safe-logger';
// GHL API Configuration
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_API_URL = process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1';

// Validate required environment variables
if (!GHL_API_KEY || !GHL_LOCATION_ID) {
  logger.warn(
    'GHL integration disabled: Missing GHL_API_KEY or GHL_LOCATION_ID environment variables'
  );
}

// Error type for axios errors
interface AxiosError extends Error {
  response?: {
    status?: number;
    data?: unknown;
  };
}

// GHL Contact Interface
export interface GHLContact {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  website?: string;
  timezone?: string;
  dnd?: boolean;
  tags?: string[];
  customFields?: Record<string, string>;
  source?: string;
  locationId?: string;
  contactType?: string;
}

// GHL Opportunity Interface
export interface GHLOpportunity {
  title: string;
  status: string;
  stageId: string;
  pipelineId: string;
  contactId: string;
  monetaryValue?: number;
  assignedTo?: string;
  notes?: string;
}

// GHL Response Types
export interface GHLContactResponse {
  success: boolean;
  contact?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    locationId: string;
    [key: string]: unknown;
  };
  contactId?: string;
  error?: string;
  status?: number;
}

export interface GHLOpportunityResponse {
  success: boolean;
  opportunity?: {
    id: string;
    title: string;
    status: string;
    stageId: string;
    pipelineId: string;
    contactId: string;
    [key: string]: unknown;
  };
  opportunityId?: string;
  error?: string;
  status?: number;
}

export interface GHLSearchResponse {
  success: boolean;
  contacts?: Array<{
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    [key: string]: unknown;
  }>;
  total?: number;
  error?: string;
  status?: number;
}

export interface GHLSMSResponse {
  success: boolean;
  message?: {
    id: string;
    status: string;
    [key: string]: unknown;
  };
  messageId?: string;
  error?: string;
  status?: number;
}

export interface GHLCallResponse {
  success: boolean;
  call?: {
    id: string;
    status: string;
    [key: string]: unknown;
  };
  error?: string;
  status?: number;
}

export interface GHLTagResponse {
  success: boolean;
  result?: unknown;
  error?: string;
  status?: number;
}

export interface GHLConnectionResponse {
  success: boolean;
  location?: unknown;
  message?: string;
  error?: string;
  status?: number;
}

// GHL SMS Interface
export interface GHLSMSMessage {
  contactId: string;
  message: string;
  mediaUrl?: string;
}

// GHL Call Interface
export interface GHLCall {
  contactId: string;
  phoneNumber: string;
  agentId?: string;
}

/**
 * Create a contact in GoHighLevel
 */
export async function createGHLContact(data: GHLContact): Promise<GHLContactResponse> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    logger.warn('GHL API not configured, skipping contact creation');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const contactData = {
      ...data,
      locationId: data.locationId || GHL_LOCATION_ID,
    };

    const response = await fetch(`${GHL_API_URL}/contacts/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contactData, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    }) }).then(res => res.json());

    logger.info('Successfully created GHL contact:', response.data?.contact?.id);
    return {
      success: true,
      contact: response.data,
      contactId: response.data?.contact?.id,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { message: String(error) };

    logger.error('Error creating contact in GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Update a contact in GoHighLevel
 */
export async function updateGHLContact(
  contactId: string,
  data: Partial<GHLContact>
): Promise<GHLContactResponse> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping contact update');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await fetch(`${GHL_API_URL}/contacts/${contactId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    }) }).then(res => res.json());

    logger.info('Successfully updated GHL contact:', contactId);
    return {
      success: true,
      contact: response.data,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            contactId,
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { contactId, message: String(error) };

    logger.error('Error updating contact in GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Search for contacts in GoHighLevel
 */
export async function searchGHLContacts(query: string): Promise<GHLSearchResponse> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping contact search');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await fetch(`${GHL_API_URL}/contacts/`, {
      params: {
        locationId: GHL_LOCATION_ID,
        query,
      },
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      timeout: 10000,
    }).then(res => res.json());

    return {
      success: true,
      contacts: response.data.contacts || [],
      total: response.data.total || 0,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            query,
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { query, message: String(error) };

    logger.error('Error searching contacts in GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Create an opportunity in GoHighLevel
 */
export async function createGHLOpportunity(data: GHLOpportunity): Promise<GHLOpportunityResponse> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping opportunity creation');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await fetch(`${GHL_API_URL}/opportunities/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    }) }).then(res => res.json());

    logger.info('Successfully created GHL opportunity:', response.data?.opportunity?.id);
    return {
      success: true,
      opportunity: response.data,
      opportunityId: response.data?.opportunity?.id,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { message: String(error) };

    logger.error('Error creating opportunity in GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Send SMS through GoHighLevel
 */
export async function sendGHLSMS(data: GHLSMSMessage): Promise<GHLSMSResponse> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping SMS send');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await fetch(
      `${GHL_API_URL}/conversations/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        type: 'SMS',
        contactId: data.contactId,
        message: data.message,
        mediaUrl: data.mediaUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    ) }).then(res => res.json());

    logger.info('Successfully sent GHL SMS to contact:', data.contactId);
    return {
      success: true,
      message: response.data,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            contactId: data.contactId,
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { contactId: data.contactId, message: String(error) };

    logger.error('Error sending SMS in GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Trigger a phone call through GoHighLevel
 */
export async function triggerGHLCall(data: GHLCall): Promise<GHLCallResponse> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping call trigger');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    // Note: This endpoint may vary based on your GHL setup and phone system integration
    const response = await fetch(
      `${GHL_API_URL}/phone/outbound`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        contactId: data.contactId,
        phoneNumber: data.phoneNumber,
        agentId: data.agentId,
      },
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    ) }).then(res => res.json());

    logger.info('Successfully triggered GHL call to contact:', data.contactId);
    return {
      success: true,
      call: response.data,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            contactId: data.contactId,
            phoneNumber: data.phoneNumber,
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { contactId: data.contactId, phoneNumber: data.phoneNumber, message: String(error) };

    logger.error('Error triggering call in GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Get contact by ID from GoHighLevel
 */
export async function getGHLContact(contactId: string): Promise<GHLContactResponse> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping contact retrieval');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await fetch(`${GHL_API_URL}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      timeout: 10000,
    }).then(res => res.json());

    return {
      success: true,
      contact: response.data.contact,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            contactId,
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { contactId, message: String(error) };

    logger.error('Error getting contact from GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Add tags to a contact in GoHighLevel
 */
export async function addGHLContactTags(
  contactId: string,
  tags: string[]
): Promise<GHLTagResponse> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping tag addition');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await fetch(
      `${GHL_API_URL}/contacts/${contactId}/tags`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tags },
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    ) }).then(res => res.json());

    logger.info('Successfully added tags to GHL contact:', contactId);
    return {
      success: true,
      result: response.data,
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            contactId,
            tags,
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { contactId, tags, message: String(error) };

    logger.error('Error adding tags to contact in GHL:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}

/**
 * Helper function to determine practice area tags based on form data
 */
export function getPracticeAreaTags(practiceArea?: string, additionalInfo?: string): string[] {
  const tags = ['Website Lead'];

  if (practiceArea) {
    const area = practiceArea.toLowerCase();

    if (area.includes('immigration')) {
      tags.push('Immigration Lead');
    } else if (area.includes('personal injury') || area.includes('accident')) {
      tags.push('Personal Injury Lead');
    } else if (area.includes('workers comp') || area.includes('workplace')) {
      tags.push('Workers Compensation Lead');
    } else if (area.includes('criminal') || area.includes('dui') || area.includes('dwi')) {
      tags.push('Criminal Defense Lead');
    } else if (area.includes('family') || area.includes('divorce')) {
      tags.push('Family Law Lead');
    } else if (area.includes('traffic') || area.includes('ticket')) {
      tags.push('Traffic Law Lead');
    } else {
      tags.push('General Legal Lead');
    }
  }

  // Check for urgency indicators
  if (additionalInfo) {
    const info = additionalInfo.toLowerCase();
    if (info.includes('urgent') || info.includes('emergency') || info.includes('asap')) {
      tags.push('Urgent Lead');
    }
  }

  return tags;
}

/**
 * Test GHL connection and configuration
 */
export async function testGHLConnection(): Promise<GHLConnectionResponse> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return {
      success: false,
      error: 'Missing GHL_API_KEY or GHL_LOCATION_ID environment variables',
    };
  }

  try {
    const response = await fetch(`${GHL_API_URL}/locations/${GHL_LOCATION_ID}`, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      timeout: 10000,
    }).then(res => res.json());

    return {
      success: true,
      location: response.data,
      message: 'GHL connection successful',
    };
  } catch (error) {
    const errorDetails =
      error instanceof Error
        ? {
            status: (error as AxiosError).response?.status,
            data: (error as AxiosError).response?.data,
            message: error.message,
          }
        : { message: String(error) };

    logger.error('Error testing GHL connection:', errorDetails);

    return {
      success: false,
      error:
        error instanceof Error
          ? String((error as AxiosError).response?.data) || error.message
          : String(error),
      status: error instanceof Error ? (error as AxiosError).response?.status : undefined,
    };
  }
}
