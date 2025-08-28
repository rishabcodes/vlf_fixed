import { componentLogger as logger } from '@/lib/safe-logger';

interface AppointmentParams {
  contactId: string;
  title: string;
  startTime: Date;
  duration: number; // in minutes
  appointmentStatus: 'pending' | 'confirmed' | 'cancelled';
  calendarId?: string;
  locationId?: string;
}

export async function scheduleGHLAppointment(params: AppointmentParams) {
  try {
    const response = await fetch('/api/ghl/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactId: params.contactId,
        title: params.title,
        startTime: params.startTime.toISOString(),
        endTime: new Date(params.startTime.getTime() + params.duration * 60000).toISOString(),
        appointmentStatus: params.appointmentStatus,
        calendarId: params.calendarId || process.env.NEXT_PUBLIC_GHL_CALENDAR_ID,
        locationId: params.locationId || process.env.NEXT_PUBLIC_GHL_LOCATION_ID,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to schedule appointment');
    }

    return await response.json();
  } catch (error) {
    logger.error('GHL appointment error:', error);
    throw error;
  }
}
