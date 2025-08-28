import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/safe-logger';

// Mock appointments data - replace with actual database queries
const mockAppointments = [
  {
    id: '1',
    title: 'Initial Consultation',
    type: 'consultation',
    date: '2025-02-15',
    time: '10:00 AM',
    duration: 60,
    attorney: {
      name: 'John Smith, Esq.',
      email: 'john.smith@vasquezlawfirm.com',
      phone: '(919) 423-4755',
    },
    location: '123 Main St, Raleigh, NC 27601',
    notes: 'Discuss immigration case details',
    status: 'confirmed',
    reminder: true,
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-01-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Document Review',
    type: 'video',
    date: '2025-02-20',
    time: '2:00 PM',
    duration: 30,
    attorney: {
      name: 'Sarah Johnson, Esq.',
      email: 'sarah.johnson@vasquezlawfirm.com',
    },
    videoLink: 'https://meet.vasquezlawfirm.com/document-review',
    notes: 'Review submitted documents for visa application',
    status: 'scheduled',
    reminder: true,
    createdAt: '2025-01-18T14:00:00Z',
    updatedAt: '2025-01-18T14:00:00Z',
  },
  {
    id: '3',
    title: 'Court Hearing Preparation',
    type: 'meeting',
    date: '2025-01-10',
    time: '11:00 AM',
    duration: 90,
    attorney: {
      name: 'Michael Davis, Esq.',
      email: 'michael.davis@vasquezlawfirm.com',
    },
    location: '456 Court St, Charlotte, NC 28202',
    status: 'completed',
    reminder: false,
    createdAt: '2025-01-05T09:00:00Z',
    updatedAt: '2025-01-10T12:30:00Z',
  },
  {
    id: '4',
    title: 'Follow-up Call',
    type: 'phone',
    date: '2025-01-25',
    time: '3:30 PM',
    duration: 15,
    attorney: {
      name: 'John Smith, Esq.',
      email: 'john.smith@vasquezlawfirm.com',
      phone: '(919) 423-4755',
    },
    phoneNumber: '(919) 423-4755',
    status: 'cancelled',
    reminder: false,
    notes: 'Client cancelled due to scheduling conflict',
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-01-24T16:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In a real implementation, fetch appointments from database
    // filtered by the user's ID
    const appointments = mockAppointments;

    return NextResponse.json({
      success: true,
      appointments,
    });
  } catch (error) {
    logger.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { type, attorneyId, date, time, duration, notes } = body;
    
    if (!type || !attorneyId || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real implementation, create appointment in database
    const newAppointment = {
      id: Date.now().toString(),
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Appointment`,
      type,
      date,
      time,
      duration: duration || 60,
      attorney: {
        name: 'John Smith, Esq.', // Would fetch from attorneyId
        email: 'john.smith@vasquezlawfirm.com',
      },
      notes,
      status: 'scheduled',
      reminder: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      appointment: newAppointment,
    });
  } catch (error) {
    logger.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
