import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { logger } from '@/lib/safe-logger';

// Mock available time slots - in production this would check attorney availability
const generateTimeSlots = () => {
  const slots: Array<{ time: string; available: boolean }> = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  for (let hour = startHour; hour < endHour; hour++) {
    // Morning slots
    slots.push({
      time: `${hour}:00 AM`,
      available: Math.random() > 0.3, // Random availability for demo
    });
    slots.push({
      time: `${hour}:30 AM`,
      available: Math.random() > 0.3,
    });
  }

  // Afternoon slots
  for (let hour = 1; hour <= 5; hour++) {
    if (hour + 12 >= endHour) break;

    slots.push({
      time: `${hour}:00 PM`,
      available: Math.random() > 0.3,
    });
    slots.push({
      time: `${hour}:30 PM`,
      available: Math.random() > 0.3,
    });
  }

  return slots;
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const attorneyId = searchParams.get('attorneyId');

    if (!date || !attorneyId) {
      return NextResponse.json(
        { error: 'Missing required parameters: date and attorneyId' },
        { status: 400 }
      );
    }

    // In a real implementation:
    // 1. Check attorney's calendar for the specified date
    // 2. Get existing appointments
    // 3. Calculate available slots based on attorney's schedule and preferences
    // 4. Consider business hours, lunch breaks, etc.

    const slots = generateTimeSlots();

    return NextResponse.json({
      success: true,
      date,
      attorneyId,
      slots,
    });
  } catch (error) {
    logger.error('Error fetching available slots:', error);
    return NextResponse.json({ error: 'Failed to fetch available slots' }, { status: 500 });
  }
}
