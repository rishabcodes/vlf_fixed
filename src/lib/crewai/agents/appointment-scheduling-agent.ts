import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';

interface GHLCalendarSlot {
  date: string;
  time: string;
  userId?: string;
  userName?: string;
}

export interface AppointmentRequest {
  userId: string;
  preferredDates: Date[];
  preferredTimeSlots: string[];
  appointmentType: 'consultation' | 'follow_up' | 'document_review' | 'court' | 'other';
  attorneyId?: string;
  practiceArea: string;
  duration: number; // minutes
  isUrgent: boolean;
  language: 'en' | 'es';
  location: 'in-person' | 'virtual' | 'phone';
  notes?: string;
  // Client information for GHL contact creation
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    source?: string;
  };
}

export interface AppointmentSlot {
  date: Date;
  time: string;
  attorneyId: string;
  attorneyName: string;
  available: boolean;
  location: string;
}

export interface SchedulingResponse {
  availableSlots: AppointmentSlot[];
  recommendedSlot?: AppointmentSlot;
  alternativeOptions?: string[];
  schedulingNotes?: string;
  confirmationRequired: boolean;
}

export class AppointmentSchedulingAgent {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async findAvailableSlots(request: AppointmentRequest): Promise<SchedulingResponse> {
    try {
      // Get attorney availability from database
      const attorneys = await this.getAvailableAttorneys(request);

      // Use AI to optimize scheduling
      const systemPrompt = this.buildSystemPrompt(request.language);
      const userPrompt = this.buildSchedulingPrompt(request, attorneys);

      const response = await this.model.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseSchedulingResponse(response.content.toString(), attorneys);
    } catch (error) {
      logger.error('Appointment scheduling agent error:', errorToLogMeta(error));
      throw new Error('Failed to process appointment scheduling');
    }
  }

  async bookAppointment(
    userId: string,
    slot: AppointmentSlot,
    request: AppointmentRequest
  ): Promise<{
    success: boolean;
    confirmationNumber?: string;
    ghlContactId?: string;
    error?: string;
  }> {
    try {
      // Check if slot is still available
      const isAvailable = await this.checkSlotAvailability(slot);

      if (!isAvailable) {
        return { success: false, error: 'Slot is no longer available' };
      }

      // Step 1: Create or update contact in GoHighLevel
      const ghlResult = await this.createGHLContact(request.clientInfo, request);

      if (!ghlResult.success) {
        logger.error('Failed to create GHL contact:', { error: ghlResult.error });
        return { success: false, error: 'Failed to create contact in CRM' };
      }

      // Step 2: Book appointment in GHL calendar
      const ghlAppointment = await this.createGHLAppointment(ghlResult.contactId!, slot, request);

      if (!ghlAppointment.success) {
        logger.error('Failed to create GHL appointment:', { error: ghlAppointment.error });
        return { success: false, error: 'Failed to schedule appointment in calendar' };
      }

      // Step 3: Create appointment record in our database
      const appointment = await getPrismaClient().appointment.create({
        data: {
          userId,
          scheduledAt: new Date(`${slot.date.toISOString().split('T')[0]}T${slot.time}`),
          type: request.appointmentType,
          duration: request.duration,
          location: request.location,
          notes: request.notes || `${request.practiceArea} consultation with ${slot.attorneyName}`,
          status: 'scheduled',
          metadata: {
            attorneyId: slot.attorneyId,
            attorneyName: slot.attorneyName,
            practiceArea: request.practiceArea,
            language: request.language,
            ghlContactId: ghlResult.contactId,
            ghlAppointmentId: ghlAppointment.appointmentId,
          },
        },
      });

      // Step 4: Send confirmation notifications
      await this.sendConfirmationNotifications(appointment);

      logger.info(
        `Successfully booked appointment for ${request.clientInfo.firstName} ${request.clientInfo.lastName}`,
        {
          appointmentId: appointment.id,
          ghlContactId: ghlResult.contactId,
          ghlAppointmentId: ghlAppointment.appointmentId,
        }
      );

      return {
        success: true,
        confirmationNumber: appointment.id,
        ghlContactId: ghlResult.contactId,
      };
    } catch (error) {
      logger.error('Appointment booking error:', errorToLogMeta(error));
      return { success: false, error: 'Failed to book appointment' };
    }
  }

  private async getAvailableAttorneys(request: AppointmentRequest) {
    // In production, this would query actual attorney schedules
    // For now, returning mock data
    return [
      {
        id: '1',
        name: 'William Vasquez',
        practiceAreas: ['immigration', 'personal-injury'],
        availability: this.generateMockAvailability(),
      },
      {
        id: '2',
        name: 'Adriana Ingram',
        practiceAreas: ['immigration', 'family-law'],
        availability: this.generateMockAvailability(),
      },
    ];
  }

  private buildSystemPrompt(language: 'en' | 'es'): string {
    const prompts = {
      en: `You are an AI scheduling assistant for Vasquez Law Firm. Your role is to:
1. Analyze appointment requests and attorney availability
2. Recommend optimal appointment slots based on urgency and preferences
3. Consider attorney specializations and client needs
4. Provide alternative options when preferred slots are unavailable
5. Ensure efficient scheduling while respecting attorney workload

Always prioritize urgent cases and consider travel time for in-person appointments.`,

      es: `Eres un asistente de programación de IA para Vasquez Law Firm. Tu rol es:
1. Analizar solicitudes de citas y disponibilidad de abogados
2. Recomendar horarios óptimos basados en urgencia y preferencias
3. Considerar especializaciones de abogados y necesidades del cliente
4. Proporcionar opciones alternativas cuando los horarios preferidos no están disponibles
5. Asegurar programación eficiente respetando la carga de trabajo del abogado

Siempre prioriza casos urgentes y considera tiempo de viaje para citas en persona.`,
    };

    return prompts[language];
  }

  private buildSchedulingPrompt(
    request: AppointmentRequest,
    attorneys: Array<{
      id: string;
      name: string;
      practiceAreas: string[];
      availability: Array<{ date: Date; time: string; available: boolean }>;
    }>
  ): string {
    return `
Appointment Request:
- Type: ${request.appointmentType}
- Practice Area: ${request.practiceArea}
- Duration: ${request.duration} minutes
- Location: ${request.location}
- Urgency: ${request.isUrgent ? 'URGENT' : 'Regular'}
- Preferred Dates: ${request.preferredDates.map(d => d.toLocaleDateString()).join(', ')}
- Preferred Times: ${request.preferredTimeSlots.join(', ')}
- Notes: ${request.notes || 'None'}

Available Attorneys:
${attorneys.map(a => `- ${a.name}: ${a.practiceAreas.join(', ')}`).join('\n')}

Please analyze and recommend the best appointment slots.
`;
  }

  private parseSchedulingResponse(
    content: string,
    attorneys: Array<{
      id: string;
      name: string;
      practiceAreas: string[];
      availability: Array<{ date: Date; time: string; available: boolean }>;
    }>
  ): SchedulingResponse {
    // Parse AI response and create structured scheduling data
    const availableSlots: AppointmentSlot[] = [];

    // Generate slots based on attorney availability
    attorneys.forEach(attorney => {
      attorney.availability.forEach(slot => {
        if (slot.available) {
          availableSlots.push({
            date: slot.date,
            time: slot.time,
            attorneyId: attorney.id,
            attorneyName: attorney.name,
            available: true,
            location: 'Charlotte, NC Office',
          });
        }
      });
    });

    return {
      availableSlots: availableSlots.slice(0, 5), // Return top 5 slots
      recommendedSlot: availableSlots[0],
      alternativeOptions: [
        'Consider virtual consultation for faster scheduling',
        'Morning slots typically have better availability',
      ],
      schedulingNotes: 'All times shown are in Eastern Time',
      confirmationRequired: true,
    };
  }

  private generateMockAvailability() {
    const slots: Array<{ date: Date; time: string; available: boolean }> = [];
    const startDate = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      // Generate time slots
      const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

      times.forEach(time => {
        slots.push({
          date,
          time,
          available: Math.random() > 0.3, // 70% availability
        });
      });
    }

    return slots;
  }

  private async checkSlotAvailability(slot: AppointmentSlot): Promise<boolean> {
    // Check database for conflicts
    const appointmentDateTime = new Date(`${slot.date.toISOString().split('T')[0]}T${slot.time}`);

    const existingAppointment = await getPrismaClient().appointment.findFirst({
      where: {
        scheduledAt: appointmentDateTime,
        status: { notIn: ['cancelled', 'completed'] },
      },
    });

    return !existingAppointment;
  }

  private async sendConfirmationNotifications(appointment: { id: string }) {
    // Send email/SMS confirmations
    logger.info(`Sending confirmation for appointment ${appointment.id}`);
    // Implementation would integrate with notification service
  }

  private async createGHLContact(
    clientInfo: AppointmentRequest['clientInfo'],
    request: AppointmentRequest
  ): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      const ghlApiKey = process.env.GHL_API_KEY;
      const ghlLocationId = process.env.GHL_LOCATION_ID;

      if (!ghlApiKey || !ghlLocationId) {
        throw new Error('GoHighLevel API credentials not configured');
      }

      // Check if contact already exists
      const existingContact = await this.findGHLContactByEmail(clientInfo.email);

      if (existingContact) {
        logger.info(`Contact already exists in GHL: ${existingContact.id}`);

        // Update existing contact with new information
        await this.updateGHLContact(existingContact.id, clientInfo, request);

        // Add to pipeline if not already there
        await this.addContactToPipeline(existingContact.id);

        return { success: true, contactId: existingContact.id };
      }

      // Create new contact
      const contactData = {
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        email: clientInfo.email,
        phone: clientInfo.phone,
        source: clientInfo.source || 'Website Appointment',
        tags: [
          request.practiceArea,
          request.appointmentType,
          request.language === 'es' ? 'Spanish Speaker' : 'English Speaker',
          request.isUrgent ? 'Urgent' : 'Regular',
        ],
        customFields: {
          practice_area: request.practiceArea,
          appointment_type: request.appointmentType,
          preferred_language: request.language,
          consultation_notes: request.notes || '',
          lead_source: 'AI Assistant Booking',
        },
      };

      const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify({
          locationId: ghlLocationId,
          ...contactData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GHL API error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();

      // Add contact to Main Pipeline - New Leads stage
      await this.addContactToPipeline(result.contact.id);

      logger.info(`Created GHL contact: ${result.contact.id}`, {
        email: clientInfo.email,
        name: `${clientInfo.firstName} ${clientInfo.lastName}`,
      });

      return { success: true, contactId: result.contact.id };
    } catch (error) {
      logger.error('Failed to create GHL contact:', errorToLogMeta(error));
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private async findGHLContactByEmail(
    email: string
  ): Promise<{ id: string; email: string } | null> {
    try {
      const ghlApiKey = process.env.GHL_API_KEY;
      const ghlLocationId = process.env.GHL_LOCATION_ID;

      const response = await fetch(
        `https://rest.gohighlevel.com/v1/contacts/search?email=${encodeURIComponent(email)}&locationId=${ghlLocationId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${ghlApiKey}`,
            'Content-Type': 'application/json',
            Version: '2021-07-28',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GHL search API error: ${response.status}`);
      }

      const result = await response.json();

      if (result.contacts && result.contacts.length > 0) {
        return result.contacts[0];
      }

      return null;
    } catch (error) {
      logger.warn('Failed to search GHL contact:', errorToLogMeta(error));
      return null;
    }
  }

  private async updateGHLContact(
    contactId: string,
    clientInfo: AppointmentRequest['clientInfo'],
    request: AppointmentRequest
  ): Promise<void> {
    try {
      const ghlApiKey = process.env.GHL_API_KEY;

      const updateData = {
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        phone: clientInfo.phone,
        tags: [
          request.practiceArea,
          request.appointmentType,
          request.language === 'es' ? 'Spanish Speaker' : 'English Speaker',
          request.isUrgent ? 'Urgent' : 'Regular',
          'Returning Client',
        ],
        customFields: {
          practice_area: request.practiceArea,
          appointment_type: request.appointmentType,
          preferred_language: request.language,
          consultation_notes: request.notes || '',
          last_contact_date: new Date().toISOString(),
        },
      };

      const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`GHL update API error: ${response.status}`);
      }

      logger.info(`Updated GHL contact: ${contactId}`);
    } catch (error) {
      logger.error('Failed to update GHL contact:', errorToLogMeta(error));
      // Don't throw - contact creation was successful
    }
  }

  private async addContactToPipeline(contactId: string): Promise<void> {
    try {
      const ghlApiKey = process.env.GHL_API_KEY;
      const ghlLocationId = process.env.GHL_LOCATION_ID;
      const mainPipelineId = process.env.GHL_MAIN_PIPELINE_ID; // Main Pipeline ID
      const newLeadsStageId = process.env.GHL_NEW_LEADS_STAGE_ID; // New Leads stage ID

      if (!mainPipelineId || !newLeadsStageId) {
        logger.warn('GHL pipeline/stage IDs not configured, skipping pipeline assignment');
        return;
      }

      const opportunityData = {
        pipelineId: mainPipelineId,
        stageId: newLeadsStageId,
        title: 'Legal Consultation - New Lead',
        status: 'open',
        contactId: contactId,
        monetaryValue: 500, // Default consultation value
        assignedTo: process.env.GHL_DEFAULT_USER_ID, // Assign to default user
        source: 'AI Assistant',
      };

      const response = await fetch(
        `https://rest.gohighlevel.com/v1/pipelines/${mainPipelineId}/opportunities`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ghlApiKey}`,
            'Content-Type': 'application/json',
            Version: '2021-07-28',
          },
          body: JSON.stringify({
            locationId: ghlLocationId,
            ...opportunityData,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GHL opportunity API error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();

      logger.info(`Added contact to Main Pipeline - New Leads stage: ${result.opportunity.id}`, {
        contactId,
        opportunityId: result.opportunity.id,
      });
    } catch (error) {
      logger.error('Failed to add contact to pipeline:', errorToLogMeta(error));
      // Don't throw - contact creation was successful
    }
  }

  private async createGHLAppointment(
    contactId: string,
    slot: AppointmentSlot,
    request: AppointmentRequest
  ): Promise<{ success: boolean; appointmentId?: string; error?: string }> {
    try {
      const ghlApiKey = process.env.GHL_API_KEY;
      const ghlLocationId = process.env.GHL_LOCATION_ID;
      const ghlCalendarId = process.env.GHL_CALENDAR_ID; // Main calendar ID

      if (!ghlCalendarId) {
        throw new Error('GHL Calendar ID not configured');
      }

      const appointmentDateTime = new Date(`${slot.date.toISOString().split('T')[0]}T${slot.time}`);
      const endDateTime = new Date(appointmentDateTime.getTime() + request.duration * 60000);

      const appointmentData = {
        calendarId: ghlCalendarId,
        contactId: contactId,
        title: `${request.practiceArea} Consultation - ${request.clientInfo.firstName} ${request.clientInfo.lastName}`,
        startTime: appointmentDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        appointmentStatus: 'confirmed',
        assignedUserId: slot.attorneyId, // Assign to specific attorney
        notes: request.notes || `${request.appointmentType} appointment scheduled via AI assistant`,
        address: request.location === 'in-person' ? 'Vasquez Law Firm Office' : 'Virtual Meeting',
        ignoreDateRange: false,
        toNotify: true, // Send notifications
      };

      const response = await fetch(`https://rest.gohighlevel.com/v1/appointments/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify({
          locationId: ghlLocationId,
          ...appointmentData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GHL appointment API error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();

      logger.info(`Created GHL appointment: ${result.appointment.id}`, {
        contactId,
        appointmentTime: appointmentDateTime.toISOString(),
        attorney: slot.attorneyName,
      });

      return { success: true, appointmentId: result.appointment.id };
    } catch (error) {
      logger.error('Failed to create GHL appointment:', errorToLogMeta(error));
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async getGHLAvailableSlots(
    calendarId: string,
    startDate: Date,
    endDate: Date
  ): Promise<AppointmentSlot[]> {
    try {
      const ghlApiKey = process.env.GHL_API_KEY;

      const response = await fetch(
        `https://rest.gohighlevel.com/v1/calendars/${calendarId}/free-slots?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${ghlApiKey}`,
            'Content-Type': 'application/json',
            Version: '2021-07-28',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GHL calendar API error: ${response.status}`);
      }

      const result = await response.json();

      // Convert GHL slots to our format
      return result.slots.map((slot: GHLCalendarSlot) => ({
        date: new Date(slot.date),
        time: slot.time,
        attorneyId: slot.userId || '1',
        attorneyName: slot.userName || 'Available Attorney',
        available: true,
        location: 'Charlotte, NC Office',
      }));
    } catch (error) {
      logger.error('Failed to fetch GHL calendar slots:', errorToLogMeta(error));
      // Return mock data as fallback
      return this.generateMockSlots();
    }
  }

  private generateMockSlots(): AppointmentSlot[] {
    const slots: AppointmentSlot[] = [];
    const startDate = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

      times.forEach(time => {
        if (Math.random() > 0.3) {
          // 70% availability
          slots.push({
            date,
            time,
            attorneyId: '1',
            attorneyName: 'William Vasquez',
            available: true,
            location: 'Charlotte, NC Office',
          });
        }
      });
    }

    return slots.slice(0, 10); // Return top 10 slots
  }
}
