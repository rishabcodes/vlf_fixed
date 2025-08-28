import { NextRequest, NextResponse } from 'next/server';
import { ghlMCPClient } from '@/new-chatbot-ghl/services/ghl-mcp-client';
import { logger } from '@/lib/safe-logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      contactId,
      calendarId,
      date,
      startTime,
      endTime,
      title,
      description,
      contactName,
      contactPhone,
      legalMatter
    } = body;

    // Validate required fields
    if (!contactId || !date || !startTime) {
      return NextResponse.json(
        { error: 'Missing required fields: contactId, date, startTime' },
        { status: 400 }
      );
    }

    // Calculate end time if not provided (default 1 hour)
    let appointmentEndTime = endTime;
    if (!appointmentEndTime) {
      const start = new Date(`${date}T${startTime}`);
      start.setHours(start.getHours() + 1);
      appointmentEndTime = start.toTimeString().slice(0, 5);
    }

    // Format date-time for GHL
    const startDateTime = new Date(`${date}T${startTime}`).toISOString();
    const endDateTime = new Date(`${date}T${appointmentEndTime}`).toISOString();

    // Create appointment title
    const appointmentTitle = title || 
      `Legal Consultation - ${legalMatter || 'General'}` +
      (contactName ? ` - ${contactName}` : '');

    // Create appointment description
    const appointmentDescription = description || 
      `Legal consultation appointment\n` +
      `Contact: ${contactName || 'Client'}\n` +
      `Phone: ${contactPhone || 'Not provided'}\n` +
      `Matter: ${legalMatter || 'To be discussed'}\n` +
      `Scheduled via website chat`;

    // Use default calendar if not specified
    const targetCalendarId = calendarId || 'default-calendar';

    // First check availability one more time
    const availability = await ghlMCPClient.checkCalendarAvailability(
      targetCalendarId,
      date,
      date
    );

    // Check if the requested slot is still available
    const isSlotAvailable = availability.slots.some((slot: any) => {
      const slotStartTime = slot.startTime?.replace(':', '');
      const requestedStartTime = startTime.replace(':', '');
      return slotStartTime === requestedStartTime;
    });

    if (!isSlotAvailable && availability.available) {
      // Slot no longer available, return alternative times
      return NextResponse.json({
        success: false,
        error: 'The requested time is no longer available',
        alternativeSlots: availability.slots.slice(0, 3)
      });
    }

    // Book the appointment
    const bookingResult = await ghlMCPClient.bookAppointment(
      contactId,
      targetCalendarId,
      startDateTime,
      endDateTime,
      appointmentTitle,
      appointmentDescription
    );

    if (bookingResult.success) {
      // Add a note to the contact about the appointment
      const noteContent = 
        `Appointment booked:\n` +
        `Date: ${new Date(startDateTime).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'America/New_York'
        })}\n` +
        `Type: ${legalMatter || 'Legal consultation'}\n` +
        `Duration: 1 hour\n` +
        `Booked via: Website chat`;

      await ghlMCPClient.createContactNote(contactId, noteContent);

      return NextResponse.json({
        success: true,
        appointmentId: bookingResult.appointmentId,
        message: 'Appointment successfully booked',
        details: {
          date: date,
          time: startTime,
          duration: '1 hour',
          type: legalMatter || 'Legal consultation'
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: bookingResult.error || 'Failed to book appointment',
        alternativeSlots: availability.slots.slice(0, 3)
      });
    }

  } catch (error) {
    logger.error('Appointment booking error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to book appointment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check availability
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const calendarId = searchParams.get('calendarId') || 'default-calendar';

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Check availability for the specified date
    const availability = await ghlMCPClient.checkCalendarAvailability(
      calendarId,
      date,
      date
    );

    return NextResponse.json({
      date: date,
      available: availability.available,
      slots: availability.slots,
      calendarId: calendarId
    });

  } catch (error) {
    logger.error('Availability check error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check availability',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}