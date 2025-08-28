/**
 * Appointment Agent
 * Handles appointment scheduling and calendar management using GHL MCP
 */

import { BaseAgent, AgentContext, AgentResponse } from '../agents/base-agent';

interface AppointmentOperation {
  action: 'check_availability' | 'book' | 'reschedule' | 'cancel' | 'get_slots';
  data?: any;
}

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
  duration?: number;
}

interface AppointmentData {
  contactId?: string;
  calendarId?: string;
  date?: string;
  time?: string;
  duration?: number;
  type?: string;
  notes?: string;
}

export class AppointmentAgent extends BaseAgent {
  private defaultCalendarId: string;
  private appointmentTypes: Map<string, any>;
  
  constructor() {
    super({
      name: 'AppointmentAgent',
      description: 'Manages appointment scheduling and calendar operations',
      capabilities: [
        'check_availability',
        'book_appointment',
        'reschedule_appointment',
        'cancel_appointment',
        'get_available_slots'
      ],
      priority: 3
    });
    
    this.defaultCalendarId = process.env.GHL_DEFAULT_CALENDAR_ID || '';
    this.appointmentTypes = new Map([
      ['consultation', { duration: 30, name: 'Legal Consultation' }],
      ['follow_up', { duration: 15, name: 'Follow-up Call' }],
      ['intake', { duration: 60, name: 'Case Intake' }]
    ]);
  }
  
  async execute(context: AgentContext, input: AppointmentOperation): Promise<AgentResponse> {
    try {
      switch (input.action) {
        case 'check_availability':
          return await this.checkAvailability(context, input.data);
        case 'book':
          return await this.bookAppointment(context, input.data);
        case 'reschedule':
          return await this.rescheduleAppointment(context, input.data);
        case 'cancel':
          return await this.cancelAppointment(context, input.data);
        case 'get_slots':
          return await this.getAvailableSlots(context, input.data);
        default:
          return this.handleError(new Error(`Unknown action: ${input.action}`));
      }
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Check availability for a specific date/time
   */
  private async checkAvailability(context: AgentContext, data: AppointmentData): Promise<AgentResponse> {
    this.log('Checking availability', data);
    
    const checkData = {
      calendarId: data?.calendarId || this.defaultCalendarId,
      date: data?.date || this.getNextBusinessDay(),
      duration: data?.duration || 30
    };
    
    // Check cache first
    const cacheKey = `availability:${checkData.date}:${checkData.duration}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      return {
        success: true,
        data: cached,
        metadata: { fromCache: true   }
};
    }
    
    try {
      const result = await this.mcp.executeTool('calendars_get-available-slots', checkData);
      
      // Cache for 5 minutes
      this.setCache(cacheKey, result.data, 300);
      
      return {
        success: true,
        data: {
          available: result.data?.slots?.length > 0,
          slots: result.data?.slots || [],
          date: checkData.date
          }
};
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Book an appointment
   */
  private async bookAppointment(context: AgentContext, data: AppointmentData): Promise<AgentResponse> {
    const validation = this.validateContext(context, ['email']);
    if (validation) {
      return { success: false, error: validation };
    }
    
    this.log('Booking appointment', data);
    
    // Ensure we have a contact ID
    if (!data?.contactId && !context.metadata?.ghlContactId) {
      return {
        success: false,
        error: 'Contact ID required to book appointment'
      };
    }
    
    const appointmentType = this.appointmentTypes.get(data?.type || 'consultation');
    
    const appointmentData = {
      calendarId: data?.calendarId || this.defaultCalendarId,
      contactId: data?.contactId || context.metadata?.ghlContactId,
      title: appointmentType?.name || 'Legal Consultation',
      startTime: this.buildDateTime(data?.date, data?.time),
      endTime: this.buildEndTime(data?.date, data?.time, appointmentType?.duration || 30),
      description: data?.notes || `Appointment booked via chatbot. Language: ${context.language}`,
      metadata: {
        sessionId: context.sessionId,
        language: context.language,
        type: data?.type || 'consultation',
        bookedAt: Date.now()
        }
};
    
    try {
      const result = await this.mcp.executeTool('calendars_create-event', appointmentData);
      
      // Send confirmation details
      const confirmationData = {
        appointmentId: result.data?.id,
        date: data?.date,
        time: data?.time,
        type: appointmentType?.name,
        duration: appointmentType?.duration
      };
      
      this.log('Appointment booked successfully', result.data?.id);
      
      return {
        success: true,
        data: confirmationData,
        metadata: {
          appointmentId: result.data?.id,
          confirmationSent: true
        },
        nextAction: 'send_confirmation'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Reschedule an existing appointment
   */
  private async rescheduleAppointment(context: AgentContext, data: any): Promise<AgentResponse> {
    if (!data?.appointmentId) {
      return {
        success: false,
        error: 'Appointment ID required for rescheduling'
      };
    }
    
    this.log('Rescheduling appointment', data.appointmentId);
    
    const updateData = {
      eventId: data.appointmentId,
      startTime: this.buildDateTime(data.newDate, data.newTime),
      endTime: this.buildEndTime(data.newDate, data.newTime, data.duration || 30),
      metadata: {
        rescheduledAt: Date.now(),
        reason: data.reason || 'Client requested reschedule'
        }
};
    
    try {
      const result = await this.mcp.executeTool('calendars_update-event', updateData);
      
      return {
        success: true,
        data: {
          appointmentId: data.appointmentId,
          newDate: data.newDate,
          newTime: data.newTime,
          rescheduled: true
        },
        nextAction: 'send_reschedule_confirmation'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Cancel an appointment
   */
  private async cancelAppointment(context: AgentContext, data: any): Promise<AgentResponse> {
    if (!data?.appointmentId) {
      return {
        success: false,
        error: 'Appointment ID required for cancellation'
      };
    }
    
    this.log('Cancelling appointment', data.appointmentId);
    
    const cancelData = {
      eventId: data.appointmentId,
      status: 'cancelled',
      metadata: {
        cancelledAt: Date.now(),
        reason: data.reason || 'Client requested cancellation',
        cancelledBy: context.sessionId
        }
};
    
    try {
      const result = await this.mcp.executeTool('calendars_update-event', cancelData);
      
      return {
        success: true,
        data: {
          appointmentId: data.appointmentId,
          cancelled: true,
          reason: data.reason
        },
        nextAction: 'send_cancellation_confirmation'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Get available time slots
   */
  private async getAvailableSlots(context: AgentContext, data: any): Promise<AgentResponse> {
    this.log('Getting available slots', data);
    
    const slotsData = {
      calendarId: data?.calendarId || this.defaultCalendarId,
      startDate: data?.startDate || this.getToday(),
      endDate: data?.endDate || this.getDatePlusDays(7),
      duration: data?.duration || 30,
      timezone: data?.timezone || 'America/New_York'
    };
    
    // Check cache
    const cacheKey = `slots:${slotsData.startDate}:${slotsData.endDate}`;
    const cached = this.getCache(cacheKey);
    if (cached) {
      return {
        success: true,
        data: cached,
        metadata: { fromCache: true   }
};
    }
    
    try {
      const result = await this.mcp.executeTool('calendars_get-available-slots', slotsData);
      
      // Process and format slots
      const formattedSlots = this.formatSlots(result.data?.slots || []);
      
      // Cache for 10 minutes
      this.setCache(cacheKey, formattedSlots, 600);
      
      return {
        success: true,
        data: {
          slots: formattedSlots,
          dateRange: {
            start: slotsData.startDate,
            end: slotsData.endDate
          },
          totalAvailable: formattedSlots.length
          }
};
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Helper: Format time slots for display
   */
  private formatSlots(slots: any[]): TimeSlot[] {
    return slots.map(slot => ({
      date: this.formatDate(slot.startTime),
      time: this.formatTime(slot.startTime),
      available: true,
      duration: slot.duration || 30
    }));
  }
  
  /**
   * Helper: Build ISO datetime string
   */
  private buildDateTime(date?: string, time?: string): string {
    const dateStr = date || this.getToday();
    const timeStr = time || '09:00';
    return `${dateStr}T${timeStr}:00.000Z`;
  }
  
  /**
   * Helper: Build end time based on start and duration
   */
  private buildEndTime(date?: string, time?: string, duration: number = 30): string {
    const start = new Date(this.buildDateTime(date, time));
    start.setMinutes(start.getMinutes() + duration);
    return start.toISOString();
  }
  
  /**
   * Helper: Get today's date in YYYY-MM-DD format
   */
  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  /**
   * Helper: Get next business day
   */
  private getNextBusinessDay(): string {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    
    // Skip weekends
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }
    
    return date.toISOString().split('T')[0];
  }
  
  /**
   * Helper: Get date plus N days
   */
  private getDatePlusDays(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }
  
  /**
   * Helper: Format date for display
   */
  private formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
  
  /**
   * Helper: Format time for display
   */
  private formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}
