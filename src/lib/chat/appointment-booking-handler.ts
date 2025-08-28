import { ghlService } from '@/services/gohighlevel';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export interface AppointmentBookingRequest {
  userId: string;
  language: 'en' | 'es';
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  preferences: {
    date?: string;
    time?: string;
    practiceArea?: string;
    urgency?: 'urgent' | 'normal';
    notes?: string;
  };
}

export interface AvailableSlot {
  date: string;
  time: string;
  calendarId: string;
  attorneyName?: string;
}

export interface BookingResponse {
  success: boolean;
  appointmentId?: string;
  confirmationNumber?: string;
  error?: string;
  availableSlots?: AvailableSlot[];
}

export class AppointmentBookingHandler {
  private static instance: AppointmentBookingHandler;

  private constructor() {}

  static getInstance(): AppointmentBookingHandler {
    if (!AppointmentBookingHandler.instance) {
      AppointmentBookingHandler.instance = new AppointmentBookingHandler();
    }
    return AppointmentBookingHandler.instance;
  }

  /**
   * Parse user message to extract appointment booking intent and details
   */
  async parseAppointmentIntent(
    message: string,
    language: 'en' | 'es'
  ): Promise<{
    hasAppointmentIntent: boolean;
    extractedInfo: {
      preferredDate?: string;
      preferredTime?: string;
      practiceArea?: string;
      urgency?: 'urgent' | 'normal';
    };
  }> {
    const lowerMessage = message.toLowerCase();

    // Check for appointment-related keywords
    const appointmentKeywords = {
      en: ['appointment', 'schedule', 'consultation', 'meeting', 'book', 'available', 'calendar'],
      es: ['cita', 'agendar', 'consulta', 'reunión', 'reservar', 'disponible', 'calendario'],
    };

    const hasAppointmentIntent = appointmentKeywords[language].some(keyword =>
      lowerMessage.includes(keyword)
    );

    if (!hasAppointmentIntent) {
      return { hasAppointmentIntent: false, extractedInfo: {  }
};
    }

    // Extract practice area
    const practiceAreaPatterns = {
      immigration: /(?:immigration|inmigración|visa|green card|ciudadanía|deportation)/i,
      personalInjury: /(?:injury|accident|injured|lesión|accidente|herido)/i,
      criminal: /(?:criminal|dui|dwi|arrest|crime|delito|arresto)/i,
      family: /(?:divorce|custody|family|divorcio|custodia|familia)/i,
      workers: /(?:workers?\s*comp|workplace|trabajo|compensación)/i,
    };

    let practiceArea: string | undefined;
    for (const [area, pattern] of Object.entries(practiceAreaPatterns)) {
      if (pattern.test(message)) {
        practiceArea = area;
        break;
      }
    }

    // Extract urgency
    const urgency = /(?:urgent|emergency|asap|immediately|urgente|emergencia|inmediato)/i.test(
      message
    )
      ? 'urgent'
      : 'normal';

    // Extract date preferences
    const datePatterns = {
      today: /(?:today|hoy)/i,
      tomorrow: /(?:tomorrow|mañana)/i,
      thisWeek: /(?:this week|esta semana)/i,
      nextWeek: /(?:next week|próxima semana)/i,
    };

    let preferredDate: string | undefined;
    const now = new Date();

    if (datePatterns.today.test(message)) {
      preferredDate = now.toISOString().split('T')[0];
    } else if (datePatterns.tomorrow.test(message)) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      preferredDate = tomorrow.toISOString().split('T')[0];
    } else if (datePatterns.thisWeek.test(message)) {
      preferredDate = 'this_week';
    } else if (datePatterns.nextWeek.test(message)) {
      preferredDate = 'next_week';
    }

    // Extract time preferences
    const timePatterns = {
      morning: /(?:morning|mañana)/i,
      afternoon: /(?:afternoon|tarde)/i,
      evening: /(?:evening|noche)/i,
    };

    let preferredTime: string | undefined;
    for (const [time, pattern] of Object.entries(timePatterns)) {
      if (pattern.test(message)) {
        preferredTime = time;
        break;
      }
    }

    return {
      hasAppointmentIntent: true,
      extractedInfo: {
        preferredDate,
        preferredTime,
        practiceArea,
        urgency,
      },
    };
  }

  /**
   * Get available appointment slots from GHL
   */
  async getAvailableSlots(
    startDate: Date,
    endDate: Date,
    calendarId?: string
  ): Promise<AvailableSlot[]> {
    try {
      // Use the default calendar if not specified
      const actualCalendarId = calendarId || process.env.GHL_CALENDAR_ID || '';

      if (!actualCalendarId) {
        logger.warn('No GHL calendar ID configured');
        return this.getMockAvailableSlots(startDate, endDate);
      }

      const slots = await ghlService.getAvailableSlots({
        calendarId: actualCalendarId,
        startDate,
        endDate,
        timezone: 'America/New_York',
      });

      // Transform GHL slots to our format
      return slots.map((slot: any) => ({
        date: slot.date,
        time: slot.time,
        calendarId: actualCalendarId,
        attorneyName: slot.userName || 'Available Attorney',
      }));
    } catch (error) {
      logger.error('Failed to fetch available slots:', errorToLogMeta(error));
      return this.getMockAvailableSlots(startDate, endDate);
    }
  }

  /**
   * Book an appointment through GHL
   */
  async bookAppointment(
    request: AppointmentBookingRequest,
    selectedSlot: AvailableSlot
  ): Promise<BookingResponse> {
    try {
      // Create or update contact in GHL
      const contact = await ghlService.getOrCreateContact({
        firstName: request.contactInfo.firstName,
        lastName: request.contactInfo.lastName,
        email: request.contactInfo.email,
        phone: request.contactInfo.phone,
        tags: ['chat-booking', request.preferences.practiceArea || 'general'],
        source: 'AI Chat Assistant',
        customFields: {
          preferredLanguage: request.language,
          practiceArea: request.preferences.practiceArea,
          urgency: request.preferences.urgency,
          bookingNotes: request.preferences.notes,
        },
      });

      if (!contact || !contact.id) {
        throw new Error('Failed to create contact in GHL');
      }

      // Parse the date and time
      const appointmentDateTime = new Date(`${selectedSlot.date}T${selectedSlot.time}`);
      const endDateTime = new Date(appointmentDateTime.getTime() + 60 * 60 * 1000); // 1 hour appointment

      // Schedule the appointment
      const appointment = await ghlService.scheduleMeeting({
        contactId: contact.id,
        title: `${request.preferences.practiceArea || 'Legal'} Consultation - ${request.contactInfo.firstName} ${request.contactInfo.lastName}`,
        startTime: appointmentDateTime,
        endTime: endDateTime,
        calendarId: selectedSlot.calendarId,
        appointmentStatus: 'confirmed',
        notes:
          request.preferences.notes ||
          `Appointment booked via AI chat assistant. Language preference: ${request.language}`,
        meetingLocation: 'Vasquez Law Firm Office',
      });

      if (!appointment || !appointment.id) {
        throw new Error('Failed to create appointment in GHL');
      }

      // Send confirmation via GHL
      await ghlService.sendSMS({
        contactId: contact.id,
        message: this.getConfirmationMessage(request.language, selectedSlot, appointment.id),
      });

      // Add to pipeline
      if (process.env.GHL_MAIN_PIPELINE_ID) {
        await ghlService.createOpportunity({
          contactId: contact.id,
          name: `${request.preferences.practiceArea || 'Legal'} Consultation`,
          pipelineId: process.env.GHL_MAIN_PIPELINE_ID,
          stageId: process.env.GHL_NEW_LEADS_STAGE_ID || '',
          value: 500, // Default consultation value
          customFields: {
            appointmentId: appointment.id,
            source: 'AI Chat Booking',
          },
        });
      }

      logger.info('Appointment booked successfully', {
        appointmentId: appointment.id,
        contactId: contact.id,
        date: selectedSlot.date,
        time: selectedSlot.time,
      });

      return {
        success: true,
        appointmentId: appointment.id,
        confirmationNumber: appointment.id.substring(0, 8).toUpperCase(),
      };
    } catch (error) {
      logger.error('Failed to book appointment:', errorToLogMeta(error));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to book appointment',
      };
    }
  }

  /**
   * Generate appointment suggestions based on preferences
   */
  async generateAppointmentSuggestions(
    preferences: AppointmentBookingRequest['preferences'],
    language: 'en' | 'es'
  ): Promise<string> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14); // Look 2 weeks ahead

    const availableSlots = await this.getAvailableSlots(startDate, endDate);

    if (availableSlots.length === 0) {
      return language === 'es'
        ? 'Lo siento, no hay citas disponibles en las próximas dos semanas. Por favor llame al 1-844-967-3536 para asistencia inmediata.'
        : "I'm sorry, there are no available appointments in the next two weeks. Please call 1-844-967-3536 for immediate assistance.";
    }

    // Filter slots based on preferences
    let filteredSlots = availableSlots;

    // Filter by time preference
    if (preferences.time) {
      filteredSlots = filteredSlots.filter(slot => {
        const hour = parseInt(slot.time.split(':')[0] || '0');
        if (preferences.time === 'morning' && hour >= 9 && hour < 12) return true;
        if (preferences.time === 'afternoon' && hour >= 12 && hour < 17) return true;
        if (preferences.time === 'evening' && hour >= 17 && hour < 20) return true;
        return false;
      });
    }

    // Take top 3 slots
    const topSlots = filteredSlots.slice(0, 3);

    let response =
      language === 'es'
        ? 'Tengo las siguientes citas disponibles:\n\n'
        : 'I have the following appointments available:\n\n';

    topSlots.forEach((slot, index) => {
      const date = new Date(slot.date);
      const formattedDate = date.toLocaleDateString(language === 'es' ? 'es-US' : 'en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });

      response += `${index + 1}. ${formattedDate} at ${slot.time}`;
      if (slot.attorneyName) {
        response += ` with ${slot.attorneyName}`;
      }
      response += '\n';
    });

    response +=
      language === 'es'
        ? '\n¿Cuál prefiere? También puedo buscar más opciones si ninguna de estas funciona para usted.'
        : '\nWhich would you prefer? I can also look for more options if none of these work for you.';

    return response;
  }

  /**
   * Get confirmation message
   */
  private getConfirmationMessage(
    language: 'en' | 'es',
    slot: AvailableSlot,
    appointmentId: string
  ): string {
    const date = new Date(slot.date);
    const formattedDate = date.toLocaleDateString(language === 'es' ? 'es-US' : 'en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    if (language === 'es') {
      return `Su cita ha sido confirmada para ${formattedDate} a las ${slot.time}. Su número de confirmación es: ${appointmentId.substring(0, 8).toUpperCase()}. Le enviaremos un recordatorio antes de su cita. Para cancelar o reprogramar, llame al 1-844-967-3536.`;
    } else {
      return `Your appointment has been confirmed for ${formattedDate} at ${slot.time}. Your confirmation number is: ${appointmentId.substring(0, 8).toUpperCase()}. We will send you a reminder before your appointment. To cancel or reschedule, please call 1-844-967-3536.`;
    }
  }

  /**
   * Get mock available slots for testing
   */
  private getMockAvailableSlots(startDate: Date, endDate: Date): AvailableSlot[] {
    const slots: AvailableSlot[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      // Skip weekends
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        const times = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

        times.forEach(time => {
          if (Math.random() > 0.3) {
            // 70% availability
            slots.push({
              date: current.toISOString().split('T')[0] || '',
              time,
              calendarId: 'mock-calendar',
              attorneyName: 'William Vasquez',
            });
          }
        });
      }

      current.setDate(current.getDate() + 1);
    }

    return slots;
  }

  /**
   * Handle appointment conversation flow
   */
  async handleAppointmentConversation(
    message: string,
    sessionData: any,
    language: 'en' | 'es'
  ): Promise<{
    response: string;
    requiresMoreInfo?: boolean;
    nextStep?: string;
    data?: any;
  }> {
    // Check if we're in the middle of an appointment booking flow
    const bookingFlow = sessionData.bookingFlow || {};

    // Process user response based on last step
    if (bookingFlow.lastStep) {
      switch (bookingFlow.lastStep) {
        case 'firstName':
          bookingFlow.firstName = message.trim();
          break;
        case 'lastName':
          bookingFlow.lastName = message.trim();
          break;
        case 'email':
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(message.trim())) {
            return {
              response:
                language === 'es'
                  ? 'Por favor proporcione un correo electrónico válido.'
                  : 'Please provide a valid email address.',
              requiresMoreInfo: true,
              nextStep: 'email',
              data: bookingFlow,
            };
          }
          bookingFlow.email = message.trim();
          break;
        case 'phone':
          // Remove non-numeric characters for validation
          const cleanPhone = message.replace(/\D/g, '');
          if (cleanPhone.length < 10) {
            return {
              response:
                language === 'es'
                  ? 'Por favor proporcione un número de teléfono válido (10 dígitos).'
                  : 'Please provide a valid phone number (10 digits).',
              requiresMoreInfo: true,
              nextStep: 'phone',
              data: bookingFlow,
            };
          }
          bookingFlow.phone = message.trim();
          break;
        case 'practiceArea':
          // Map user input to practice areas
          const practiceAreaMap: { [key: string]: string } = {
            immigration: 'immigration',
            inmigración: 'immigration',
            'personal injury': 'personalInjury',
            'lesiones personales': 'personalInjury',
            criminal: 'criminal',
            'criminal defense': 'criminal',
            'defensa criminal': 'criminal',
            family: 'family',
            'family law': 'family',
            'derecho familiar': 'family',
            workers: 'workers',
            'workers compensation': 'workers',
            'compensación laboral': 'workers',
          };

          const lowerMessage = message.toLowerCase();
          let matchedArea: string | undefined;

          for (const [key, value] of Object.entries(practiceAreaMap)) {
            if (lowerMessage.includes(key)) {
              matchedArea = value;
              break;
            }
          }

          if (!matchedArea) {
            return {
              response:
                language === 'es'
                  ? 'Por favor especifique el área legal: inmigración, lesiones personales, defensa criminal, derecho familiar, o compensación laboral.'
                  : 'Please specify the legal area: immigration, personal injury, criminal defense, family law, or workers compensation.',
              requiresMoreInfo: true,
              nextStep: 'practiceArea',
              data: bookingFlow,
            };
          }

          bookingFlow.practiceArea = matchedArea;
          break;
        case 'selectSlot':
          // Parse slot selection (e.g., "1", "first", "option 1")
          const slotNumber = parseInt(message.match(/\d+/)?.[0] || '0');
          if (
            slotNumber > 0 &&
            bookingFlow.availableSlots &&
            slotNumber <= bookingFlow.availableSlots.length
          ) {
            bookingFlow.selectedSlot = bookingFlow.availableSlots[slotNumber - 1];
          } else {
            return {
              response:
                language === 'es'
                  ? 'Por favor seleccione una opción válida (1, 2, o 3) o dígame si prefiere ver más opciones.'
                  : "Please select a valid option (1, 2, or 3) or let me know if you'd like to see more options.",
              requiresMoreInfo: true,
              nextStep: 'selectSlot',
              data: bookingFlow,
            };
          }
          break;
      }
    }

    // If we don't have contact info, ask for it
    if (!bookingFlow.hasContactInfo) {
      if (!bookingFlow.firstName) {
        return {
          response:
            language === 'es'
              ? 'Para agendar su cita, primero necesito algunos datos. ¿Cuál es su nombre?'
              : "To schedule your appointment, I'll need some information first. What is your first name?",
          requiresMoreInfo: true,
          nextStep: 'firstName',
        };
      }

      if (!bookingFlow.lastName) {
        return {
          response:
            language === 'es'
              ? `Gracias ${bookingFlow.firstName}. ¿Cuál es su apellido?`
              : `Thank you ${bookingFlow.firstName}. What is your last name?`,
          requiresMoreInfo: true,
          nextStep: 'lastName',
        };
      }

      if (!bookingFlow.email) {
        return {
          response:
            language === 'es' ? '¿Cuál es su correo electrónico?' : 'What is your email address?',
          requiresMoreInfo: true,
          nextStep: 'email',
        };
      }

      if (!bookingFlow.phone) {
        return {
          response:
            language === 'es' ? '¿Cuál es su número de teléfono?' : 'What is your phone number?',
          requiresMoreInfo: true,
          nextStep: 'phone',
        };
      }
    }

    // If we have contact info but no practice area, ask for it
    if (!bookingFlow.practiceArea) {
      return {
        response:
          language === 'es'
            ? '¿Para qué tipo de caso legal necesita ayuda? (inmigración, lesiones personales, defensa criminal, derecho familiar, compensación laboral)'
            : 'What type of legal matter do you need help with? (immigration, personal injury, criminal defense, family law, workers compensation)',
        requiresMoreInfo: true,
        nextStep: 'practiceArea',
        data: {
          hasContactInfo: true,
          ...bookingFlow,
        },
      };
    }

    // If we have all info, show available slots
    if (!bookingFlow.selectedSlot) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 14);

      const availableSlots = await this.getAvailableSlots(startDate, endDate);
      const topSlots = availableSlots.slice(0, 3);

      // Store available slots in booking flow
      bookingFlow.availableSlots = topSlots;

      const suggestions = await this.generateAppointmentSuggestions(
        { practiceArea: bookingFlow.practiceArea },
        language
      );

      return {
        response: suggestions,
        requiresMoreInfo: true,
        nextStep: 'selectSlot',
        data: bookingFlow,
      };
    }

    // If slot is selected, book the appointment
    const bookingResult = await this.bookAppointment(
      {
        userId: sessionData.userId,
        language,
        contactInfo: {
          firstName: bookingFlow.firstName,
          lastName: bookingFlow.lastName,
          email: bookingFlow.email,
          phone: bookingFlow.phone,
        },
        preferences: {
          practiceArea: bookingFlow.practiceArea,
          notes: bookingFlow.notes,
        },
      },
      bookingFlow.selectedSlot
    );

    if (bookingResult.success) {
      return {
        response:
          language === 'es'
            ? `¡Excelente! Su cita ha sido confirmada. Número de confirmación: ${bookingResult.confirmationNumber}. Le enviaremos un correo electrónico y SMS con los detalles.`
            : `Great! Your appointment has been confirmed. Confirmation number: ${bookingResult.confirmationNumber}. We'll send you an email and SMS with the details.`,
        requiresMoreInfo: false,
        data: {
          bookingComplete: true,
          confirmationNumber: bookingResult.confirmationNumber,
        },
      };
    } else {
      return {
        response:
          language === 'es'
            ? 'Lo siento, hubo un problema al agendar su cita. Por favor llame al 1-844-967-3536 para asistencia.'
            : "I'm sorry, there was an issue booking your appointment. Please call 1-844-967-3536 for assistance.",
        requiresMoreInfo: false,
        data: {
          bookingFailed: true,
          error: bookingResult.error,
        },
      };
    }
  }
}

export const appointmentBookingHandler = AppointmentBookingHandler.getInstance();
