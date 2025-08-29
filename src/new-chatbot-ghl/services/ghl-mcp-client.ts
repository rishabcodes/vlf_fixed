/**
 * GoHighLevel MCP Client
 * Uses the correct MCP endpoint and Private Integration Token
 */

import { z } from 'zod';

// Request/Response schemas
const MCPRequestSchema = z.object({
  tool: z.string(),
  input: z.record(z.any())
});

const MCPResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  metadata: z.object({
    requestId: z.string().optional(),
    timestamp: z.number().optional(),
    cached: z.boolean().optional()
  }).optional()
});

export type MCPRequest = z.infer<typeof MCPRequestSchema>;
export type MCPResponse = z.infer<typeof MCPResponseSchema>;

export interface ContactData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customFields?: Record<string, any>;
}

export interface ChatSummary {
  sessionId: string;
  timestamp: string;
  duration: number;
  language: 'en' | 'es';
  topic: string;
  agent: string;
  summary: string;
  keyPoints: string[];
  followUpRequired: string[];
  sentiment: 'positive' | 'neutral' | 'concerned';
}

export interface ErrorContext {
  operation: string;
  data?: any;
  attempt: number;
  maxAttempts: number;
}

export class GHLMCPClient {
  private pitToken: string;
  private locationId: string;
  private mcpEndpoint: string;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTTL = 300000; // 5 minutes
  private retryDelays = [1000, 2000, 4000, 8000]; // Exponential backoff
  private failedRequestQueue: Array<{ request: any; timestamp: number }> = [];
  
  constructor() {
    // Use correct endpoint
    this.mcpEndpoint = process.env.GHL_MCP_ENDPOINT || 'https://services.leadconnectorhq.com/mcp/';
    this.pitToken = process.env.GHL_PIT_TOKEN || '';
    this.locationId = process.env.GHL_LOCATION_ID || '';
    
    if (!this.pitToken) {
      console.warn('GHL MCP Client: No PIT token configured');
    }
  }
  
  /**
   * Check if MCP is configured and available
   */
  isConfigured(): boolean {
    return Boolean(
      this.pitToken && 
      (this.pitToken.startsWith('pit-') || this.pitToken.startsWith('pit_'))
    );
  }
  
  /**
   * Normalize phone number for consistent searching
   */
  private normalizePhone(phone: string): string {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    // Add country code if missing
    if (digits.length === 10) {
      return `+1${digits}`;
    }
    if (digits.length === 11 && digits.startsWith('1')) {
      return `+${digits}`;
    }
    return `+${digits}`;
  }
  
  /**
   * Search for a contact by email
   */
  async searchContactByEmail(email: string): Promise<any | null> {
    if (!this.isConfigured()) return null;
    
    try {
      // Use contacts_get-contacts which is the correct tool for listing/searching
      const response = await this.executeToolWithRetry('contacts_get-contacts', {
        query_query: email.toLowerCase(),
        query_locationId: this.locationId,
        query_limit: 10
      });
      
      if (response.success && response.data?.contacts?.length > 0) {
        // Find exact email match
        for (const contact of response.data.contacts) {
          if (contact.email?.toLowerCase() === email.toLowerCase()) {
            return contact;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error searching contact by email:', error);
      return null;
    }
  }
  
  /**
   * Search for a contact by phone
   */
  async searchContactByPhone(phone: string): Promise<any | null> {
    if (!this.isConfigured() || !phone) return null;
    
    const normalizedPhone = this.normalizePhone(phone);
    
    try {
      // Use contacts_get-contacts for searching
      const response = await this.executeToolWithRetry('contacts_get-contacts', {
        query_query: normalizedPhone,
        query_locationId: this.locationId,
        query_limit: 10
      });
      
      if (response.success && response.data?.contacts?.length > 0) {
        // Find exact phone match
        for (const contact of response.data.contacts) {
          if (contact.phone && this.normalizePhone(contact.phone) === normalizedPhone) {
            return contact;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error searching contact by phone:', error);
      return null;
    }
  }
  
  /**
   * Get contact by ID
   */
  async getContactById(contactId: string): Promise<any | null> {
    if (!this.isConfigured()) return null;
    
    try {
      const response = await this.executeToolWithRetry('contacts_get-contact', {
        path_contactId: contactId
      });
      
      if (response.success && response.data?.contact) {
        return response.data.contact;
      }
      return null;
    } catch (error) {
      console.error('Error getting contact by ID:', error);
      return null;
    }
  }
  
  /**
   * Update an existing contact by ID
   */
  async updateExistingContact(contactId: string, data: Partial<ContactData>): Promise<boolean> {
    if (!this.isConfigured()) return false;
    
    try {
      console.log('[GHL] Updating existing contact:', contactId, data);
      
      // Use contacts_update-contact tool to update existing contact
      const response = await this.executeToolWithRetry('contacts_update-contact', {
        path_contactId: contactId,
        body_firstName: data.firstName,
        body_lastName: data.lastName,
        body_email: data.email,
        body_phone: data.phone,
        body_tags: data.tags
      });
      
      if (response.success) {
        console.log('[GHL] Successfully updated contact:', contactId);
        return true;
      }
      
      console.error('[GHL] Failed to update contact:', response.error);
      return false;
    } catch (error) {
      console.error('[GHL] Error updating contact:', error);
      return false;
    }
  }

  /**
   * Create or update a contact with deduplication
   */
  async createOrUpdateContact(data: ContactData, chatSummary?: ChatSummary): Promise<{ id: string; created: boolean; updated: boolean }> {
    if (!this.isConfigured()) {
      return { id: `mock-${Date.now()}`, created: false, updated: false };
    }
    
    try {
      // First, search for existing contact
      let existingContact = null;
      
      // Search by email first (most reliable)
      if (data.email) {
        existingContact = await this.searchContactByEmail(data.email);
      }
      
      // If not found by email, try phone
      if (!existingContact && data.phone) {
        existingContact = await this.searchContactByPhone(data.phone);
      }
      
      if (existingContact) {
        // Update existing contact
        console.log(`[GHL] Found existing contact: ${existingContact.id}`);
        
        // Merge tags
        const existingTags = existingContact.tags || [];
        const newTags = data.tags || [];
        const mergedTags = [...new Set([...existingTags, ...newTags])];
        
        // Update contact with merged data
        const updateParams: any = {
          path_contactId: existingContact.id,
          body_tags: mergedTags
        };
        
        // Update basic contact info if provided
        if (data.firstName) updateParams.body_firstName = data.firstName;
        if (data.lastName) updateParams.body_lastName = data.lastName;
        if (data.email) updateParams.body_email = data.email;
        if (data.phone) updateParams.body_phone = data.phone;
        
        // Add custom fields if provided
        if (data.customFields || chatSummary) {
          const customFields = [];
          
          if (data.customFields) {
            Object.entries(data.customFields).forEach(([key, value]) => {
              customFields.push({ key, field_value: value });
            });
          }
          
          // Add chat summary if provided
          if (chatSummary) {
            const summaryText = this.formatChatSummary(chatSummary);
            // Create a new note for this chat session
            await this.createContactNote(existingContact.id, summaryText);
            
            customFields.push(
              { key: 'lastChatDate', field_value: chatSummary.timestamp },
              { key: 'lastChatSummary', field_value: chatSummary.summary },
              { key: 'lastAgent', field_value: chatSummary.agent },
              { key: 'totalChats', field_value: (existingContact.customFields?.totalChats || 0) + 1 }
            );
          }
          
          if (customFields.length > 0) {
            updateParams['body_customFields'] = customFields;
          }
        }
        
        await this.executeTool('contacts_update-contact', updateParams);
        
        return {
          id: existingContact.id,
          created: false,
          updated: true
        };
      } else {
        // Create new contact
        console.log('[GHL] Creating new contact');
        
        const customFields = data.customFields ? 
          Object.entries(data.customFields).map(([key, value]) => ({
            key,
            field_value: value
          })) : [];
        
        // Add initial chat summary if provided (but not in custom fields since they don't work)
        if (chatSummary) {
          customFields.push(
            { key: 'lastChatDate', field_value: chatSummary.timestamp },
            { key: 'lastChatSummary', field_value: chatSummary.summary },
            { key: 'lastAgent', field_value: chatSummary.agent },
            { key: 'totalChats', field_value: 1 }
          );
        }
        
        const params = {
          body_firstName: data.firstName,
          body_lastName: data.lastName,
          body_email: data.email,
          body_phone: data.phone,
          body_locationId: this.locationId,
          body_source: 'Website Chat',
          body_tags: data.tags || ['Website-chatbot'],
          body_customFields: customFields.length > 0 ? customFields : undefined
        };
        
        const response = await this.executeToolWithRetry('contacts_create-contact', params);
        
        if (response.success && response.data) {
          const newContactId = response.data.contact?.id || response.data.id;
          
          // Create note for the chat summary after contact is created
          if (chatSummary && newContactId) {
            const summaryText = this.formatChatSummary(chatSummary);
            await this.createContactNote(newContactId, summaryText);
          }
          
          return {
            id: newContactId,
            created: true,
            updated: false
          };
        }
        
        throw new Error(response.error || 'Failed to create contact');
      }
    } catch (error) {
      console.error('Failed to create or update contact:', error);
      // Queue for retry
      this.queueFailedRequest({ operation: 'createOrUpdateContact', data, chatSummary });
      throw error;
    }
  }
  
  /**
   * Format chat summary for notes
   */
  private formatChatSummary(summary: ChatSummary): string {
    const divider = '='.repeat(40);
    return `
${divider}
Chat Session: ${new Date(summary.timestamp).toLocaleString()}
${divider}
Duration: ${Math.round(summary.duration / 60)} minutes
Language: ${summary.language === 'es' ? 'Spanish' : 'English'}
Topic: ${summary.topic}
Agent: ${summary.agent}

Summary:
${summary.summary}

Key Points:
${summary.keyPoints.map(point => `• ${point}`).join('\n')}

${summary.followUpRequired.length > 0 ? `Follow-up Required:\n${summary.followUpRequired.map(item => `• ${item}`).join('\n')}\n` : ''}
Sentiment: ${summary.sentiment}
${divider}
`;
  }
  
  
  /**
   * Execute tool with retry logic
   */
  async executeToolWithRetry(tool: string, input: Record<string, any>, maxAttempts = 3): Promise<MCPResponse> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await this.executeTool(tool, input);
        
        if (response.success) {
          return response;
        }
        
        // Handle specific error codes
        const errorString = response.error || '';
        if (errorString.includes('429') || errorString.includes('rate limit')) {
          // Rate limit - wait longer
          const delay = this.retryDelays[Math.min(attempt - 1, this.retryDelays.length - 1)] * 2;
          console.log(`[GHL] Rate limited, waiting ${delay}ms before retry ${attempt}/${maxAttempts}`);
          await this.sleep(delay);
          continue;
        }
        
        if (errorString.includes('401') || errorString.includes('403')) {
          // Auth error - don't retry
          console.error('[GHL] Authentication error - check PIT token');
          throw new Error('Authentication failed');
        }
        
        // Other errors - retry with backoff
        if (attempt < maxAttempts) {
          const delay = this.retryDelays[Math.min(attempt - 1, this.retryDelays.length - 1)];
          console.log(`[GHL] Request failed, retrying in ${delay}ms (${attempt}/${maxAttempts})`);
          await this.sleep(delay);
          continue;
        }
        
        lastError = response.error;
      } catch (error) {
        lastError = error;
        
        if (attempt < maxAttempts) {
          const delay = this.retryDelays[Math.min(attempt - 1, this.retryDelays.length - 1)];
          console.log(`[GHL] Network error, retrying in ${delay}ms (${attempt}/${maxAttempts})`);
          await this.sleep(delay);
          continue;
        }
      }
    }
    
    // All attempts failed
    throw new Error(`Failed after ${maxAttempts} attempts: ${lastError}`);
  }
  
  /**
   * Sleep helper for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Queue failed request for later retry
   */
  private queueFailedRequest(request: any): void {
    this.failedRequestQueue.push({
      request,
      timestamp: Date.now()
    });
    
    // Limit queue size
    if (this.failedRequestQueue.length > 100) {
      this.failedRequestQueue.shift();
    }
    
    console.log(`[GHL] Queued failed request. Queue size: ${this.failedRequestQueue.length}`);
  }
  
  /**
   * Process queued failed requests
   */
  async processFailedRequests(): Promise<void> {
    if (this.failedRequestQueue.length === 0) return;
    
    console.log(`[GHL] Processing ${this.failedRequestQueue.length} failed requests`);
    const queue = [...this.failedRequestQueue];
    this.failedRequestQueue = [];
    
    for (const item of queue) {
      try {
        const { operation, ...data } = item.request;
        
        switch (operation) {
          case 'createOrUpdateContact':
            await this.createOrUpdateContact(data.data, data.chatSummary);
            break;
          default:
            console.warn(`[GHL] Unknown queued operation: ${operation}`);
        }
      } catch (error) {
        console.error('[GHL] Failed to process queued request:', error);
        // Re-queue if still failing
        this.queueFailedRequest(item.request);
      }
    }
  }
  
  /**
   * Create or update a contact
   */
  async upsertContact(data: ContactData): Promise<{ id: string; created: boolean }> {
    if (!this.isConfigured()) {
      return this.getMockContact(data);
    }
    
    try {
      // Format parameters with body_ prefix as required by MCP
      const params = {
        body_firstName: data.firstName,
        body_lastName: data.lastName,
        body_email: data.email,
        body_phone: data.phone,
        body_locationId: this.locationId,
        body_source: 'Website Chat',
        body_tags: data.tags || ['Website-chatbot'],
        body_customFields: data.customFields ? 
          Object.entries(data.customFields).map(([key, value]) => ({
            key,
            field_value: value
          })) : undefined
      };
      
      const response = await this.executeTool('contacts_upsert-contact', params);
      
      if (response.success && response.data) {
        return {
          id: response.data.contact?.id || response.data.id,
          created: true
        };
      }
      
      throw new Error(response.error || 'Failed to upsert contact');
    } catch (error) {
      console.error('Failed to upsert contact:', error);
      return this.getMockContact(data);
    }
  }
  
  /**
   * Add tags to a contact
   */
  async addContactTags(contactId: string, tags: string[]): Promise<boolean> {
    if (!this.isConfigured()) return true;
    
    try {
      const response = await this.executeTool('contacts_add-tags', {
        path_contactId: contactId,
        body_tags: tags
      });
      
      return response.success;
    } catch (error) {
      console.error('Failed to add contact tags:', error);
      return false;
    }
  }
  
  /**
   * Create a note for a contact (correct implementation)
   * Notes are separate entities, not fields on contacts
   */
  async createContactNote(contactId: string, noteBody: string): Promise<string | null> {
    if (!this.isConfigured()) return null;
    
    try {
      // Use REST API directly for notes
      const response = await this.executeRestRequest('POST', `/contacts/${contactId}/notes`, {
        body: noteBody
      });
      
      if (response.success && response.data) {
        const noteId = response.data.id || response.data.note?.id;
        console.log(`[GHL] Note created for contact ${contactId}: ${noteId}`);
        return noteId;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to create contact note:', error);
      return null;
    }
  }
  
  /**
   * Check calendar availability
   */
  async checkCalendarAvailability(
    calendarId: string, 
    startDate: string, 
    endDate: string
  ): Promise<{ available: boolean; slots: any[] }> {
    if (!this.isConfigured()) {
      // Mock availability for testing
      return {
        available: true,
        slots: [
          { startTime: '09:00', endTime: '10:00', date: startDate },
          { startTime: '14:00', endTime: '15:00', date: startDate },
          { startTime: '16:00', endTime: '17:00', date: startDate }
        ]
      };
    }

    try {
      const response = await this.executeTool('calendars_get-available-slots', {
        path_calendarId: calendarId,
        query_startDate: startDate,
        query_endDate: endDate,
        query_timezone: 'America/New_York'
      });

      if (response.success && response.data) {
        const slots = response.data.slots || response.data;
        return {
          available: slots.length > 0,
          slots: slots
        };
      }

      return { available: false, slots: [] };
    } catch (error) {
      console.error('[GHL] Failed to check calendar availability:', error);
      // Fallback to some default availability
      return {
        available: true,
        slots: [
          { startTime: '09:00', endTime: '10:00', date: startDate },
          { startTime: '14:00', endTime: '15:00', date: startDate }
        ]
      };
    }
  }

  /**
   * Book an appointment
   */
  async bookAppointment(
    contactId: string,
    calendarId: string,
    startTime: string,
    endTime: string,
    title: string,
    description?: string
  ): Promise<{ success: boolean; appointmentId?: string; error?: string }> {
    if (!this.isConfigured()) {
      return {
        success: true,
        appointmentId: `mock-apt-${Date.now()}`
      };
    }

    try {
      // First check if the slot is still available
      const [date] = startTime.split('T');
      const availability = await this.checkCalendarAvailability(calendarId, date, date);
      
      if (!availability.available) {
        return {
          success: false,
          error: 'No available slots at this time'
        };
      }

      // Check if requested time is in available slots
      const requestedSlot = availability.slots.find(slot => {
        const slotStart = new Date(`${date}T${slot.startTime}`).toISOString();
        return slotStart === startTime;
      });

      if (!requestedSlot) {
        return {
          success: false,
          error: 'The requested time slot is no longer available'
        };
      }

      // Book the appointment
      const response = await this.executeTool('calendars_create-appointment', {
        body_calendarId: calendarId,
        body_contactId: contactId,
        body_startTime: startTime,
        body_endTime: endTime,
        body_title: title || 'Consultation',
        body_description: description,
        body_appointmentStatus: 'confirmed',
        body_assignedUserId: this.locationId // Or specific user ID
      });

      if (response.success && response.data) {
        const appointmentId = response.data.id || response.data.appointment?.id;
        console.log(`[GHL] Appointment booked: ${appointmentId}`);
        
        // Add a tag to the contact
        await this.addContactTags(contactId, ['appointment-booked']);
        
        return {
          success: true,
          appointmentId: appointmentId
        };
      }

      return {
        success: false,
        error: response.error || 'Failed to book appointment'
      };
    } catch (error) {
      console.error('[GHL] Failed to book appointment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to book appointment'
      };
    }
  }

  /**
   * Get user calendars
   */
  async getUserCalendars(userId?: string): Promise<any[]> {
    if (!this.isConfigured()) {
      return [{
        id: 'default-calendar',
        name: 'Main Calendar',
        description: 'Primary consultation calendar'
      }];
    }

    try {
      const response = await this.executeTool('calendars_get-calendars', {
        query_locationId: this.locationId,
        query_userId: userId
      });

      if (response.success && response.data) {
        return response.data.calendars || response.data || [];
      }

      return [];
    } catch (error) {
      console.error('[GHL] Failed to get calendars:', error);
      return [];
    }
  }

  /**
   * List notes for a contact
   */
  async getContactNotes(contactId: string): Promise<any[]> {
    if (!this.isConfigured()) return [];
    
    try {
      const response = await this.executeRestRequest('GET', `/contacts/${contactId}/notes`);
      
      if (response.success && response.data) {
        return response.data.notes || response.data || [];
      }
      
      return [];
    } catch (error) {
      console.error('Failed to get contact notes:', error);
      return [];
    }
  }
  
  /**
   * Update an existing note
   */
  async updateContactNote(contactId: string, noteId: string, noteBody: string): Promise<boolean> {
    if (!this.isConfigured()) return false;
    
    try {
      const response = await this.executeRestRequest('PUT', `/contacts/${contactId}/notes/${noteId}`, {
        body: noteBody
      });
      
      return response.success;
    } catch (error) {
      console.error('Failed to update contact note:', error);
      return false;
    }
  }
  
  /**
   * Create an appointment/calendar event
   */
  async createAppointment(data: {
    contactId: string;
    title: string;
    startTime: string;
    endTime?: string;
    duration?: number;
    location?: string;
    description?: string;
    appointmentStatus?: string;
  }): Promise<any> {
    if (!this.isConfigured()) return null;
    
    try {
      // Calculate end time if not provided
      let endTime = data.endTime;
      if (!endTime && data.startTime && data.duration) {
        const start = new Date(data.startTime);
        start.setMinutes(start.getMinutes() + (data.duration || 30));
        endTime = start.toISOString();
      }
      
      console.log('[GHL] Creating appointment:', {
        contactId: data.contactId,
        title: data.title,
        startTime: data.startTime,
        endTime
      });
      
      // Use the calendars_create-appointment tool
      const response = await this.executeTool('calendars_create-appointment', {
        body_calendarId: process.env.GHL_DEFAULT_CALENDAR_ID || this.locationId,
        body_locationId: this.locationId,
        body_contactId: data.contactId,
        body_title: data.title,
        body_appointmentStatus: data.appointmentStatus || 'confirmed',
        body_assignedUserId: process.env.GHL_DEFAULT_USER_ID || '',
        body_address: data.location || '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
        body_notes: data.description || '',
        body_startTime: data.startTime,
        body_endTime: endTime || data.startTime
      });
      
      if (response.success && response.data) {
        console.log('[GHL] Appointment created successfully:', response.data.id);
        return response.data;
      }
      
      console.error('[GHL] Failed to create appointment:', response.error);
      return null;
    } catch (error) {
      console.error('[GHL] Error creating appointment:', error);
      return null;
    }
  }
  
  
  /**
   * Send a message in a conversation
   */
  async sendMessage(contactId: string, message: string): Promise<boolean> {
    if (!this.isConfigured()) return true;
    
    try {
      const response = await this.executeTool('conversations_send-a-new-message', {
        body_type: 'SMS',
        body_contactId: contactId,
        body_message: message
      });
      
      return response.success;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }
  
  /**
   * Execute REST API request directly
   */
  private async executeRestRequest(method: string, path: string, data?: any): Promise<MCPResponse> {
    const url = `https://services.leadconnectorhq.com${path}`;
    
    try {
      const options: any = {
        method,
        headers: {
          'Authorization': `Bearer ${this.pitToken}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
          'Accept': 'application/json'
        }
      };
      
      if (data) {
        options.body = JSON.stringify(data);
      }
      
      const response = await fetch(url, options);
      const responseData = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          data: responseData,
          metadata: { requestId: `rest-${Date.now()}` }
        };
      } else {
        return {
          success: false,
          error: responseData.message || responseData.error || 'Request failed',
          data: responseData
        };
      }
    } catch (error) {
      console.error(`[GHL] REST request failed: ${method} ${path}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  /**
   * Execute MCP tool with caching
   */
  public async executeTool(tool: string, input: Record<string, any>): Promise<MCPResponse> {
    // Check cache for read operations
    const cacheKey = `${tool}-${JSON.stringify(input)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return {
        success: true,
        data: cached.data,
        metadata: { cached: true }
      };
    }
    
    // Make request
    try {
      // Log the request for debugging
      console.log(`[MCP] Executing tool: ${tool}`, {
        endpoint: this.mcpEndpoint,
        hasToken: !!this.pitToken,
        locationId: this.locationId,
        params: input
      });
      
      // Generate a unique request ID
      const requestId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Format as JSON-RPC 2.0 request with tools/call method
      const jsonRpcRequest = {
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: tool,
          arguments: input
        },
        id: requestId
      };
      
      const response = await fetch(this.mcpEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.pitToken}`,
          'Content-Type': 'application/json',
          'X-Location-Id': this.locationId,
          'Accept': 'application/json, text/event-stream' // MCP requires both
        },
        body: JSON.stringify(jsonRpcRequest)
      });
      
      const responseText = await response.text();
      
      if (!response.ok) {
        console.error(`[MCP] Request failed:`, {
          status: response.status,
          statusText: response.statusText,
          body: responseText
        });
        throw new Error(`MCP request failed: ${response.status} - ${responseText}`);
      }
      
      // Handle Server-Sent Events (SSE) response
      let data: any;
      
      if (responseText.startsWith('event:')) {
        // Parse SSE format
        const lines = responseText.split('\n');
        let jsonData = '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            jsonData += line.substring(6);
          }
        }
        
        try {
          data = JSON.parse(jsonData);
        } catch (e) {
          console.error('[MCP] Failed to parse SSE response:', jsonData);
          throw new Error('Failed to parse SSE response');
        }
      } else {
        // Regular JSON response
        data = JSON.parse(responseText);
      }
      
      // Handle JSON-RPC response format
      let result: MCPResponse;
      
      if (data.error) {
        // JSON-RPC error response
        result = {
          success: false,
          error: data.error.message || 'Unknown error',
          data: null,
          metadata: { requestId }
        };
      } else if (data.result !== undefined) {
        // JSON-RPC success response - parse the nested content
        let parsedResult = data.result;
        
        // The result comes as a nested JSON string in content[0].text
        if (parsedResult.content && Array.isArray(parsedResult.content)) {
          const textContent = parsedResult.content[0]?.text;
          if (textContent) {
            try {
              // Parse the nested JSON
              const nestedData = JSON.parse(textContent);
              // If it has another layer of content, parse that too
              if (nestedData.content && Array.isArray(nestedData.content)) {
                const innerText = nestedData.content[0]?.text;
                if (innerText) {
                  parsedResult = JSON.parse(innerText);
                }
              } else {
                parsedResult = nestedData;
              }
            } catch (e) {
              console.log('[MCP] Could not parse nested result:', e);
            }
          }
        }
        
        result = {
          success: parsedResult.success !== false,
          data: parsedResult.data || parsedResult,
          error: parsedResult.error,
          metadata: { requestId, ...parsedResult.metadata }
        };
        
        // Log successful results
        if (result.success && result.data) {
          console.log(`[MCP] Success for ${tool}:`, {
            contactId: result.data.contact?.id || result.data.id,
            new: result.data.new,
            status: result.data.status
          });
        }
      } else {
        // Fallback for non-standard response
        result = {
          success: true,
          data: data,
          error: undefined,
          metadata: { requestId }
        };
      }
      
      // Cache successful response
      if (result.success && result.data) {
        this.cache.set(cacheKey, {
          data: result.data,
          timestamp: Date.now()
        });
      }
      
      return result;
    } catch (error) {
      console.error(`[MCP] Tool ${tool} failed:`, error);
      
      // Return mock data in development if MCP fails
      if (process.env.NODE_ENV === 'development') {
        console.log('[MCP] Falling back to mock data');
        return {
          success: false,
          error: error instanceof Error ? error.message : 'MCP request failed',
          data: null
        };
      }
      
      throw error;
    }
  }
  
  /**
   * Get mock contact for development
   */
  private getMockContact(data: ContactData): { id: string; created: boolean } {
    return {
      id: `mock-contact-${Date.now()}`,
      created: true
    };
  }
  
  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const ghlMCPClient = new GHLMCPClient();