import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { sendGHLSMS } from '@/lib/ghl';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactId, message, mediaUrl } = body;

    // Validate required fields
    if (!contactId || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'contactId and message are required',
        },
        { status: 400 }
      );
    }

    // Send SMS through GHL
    const result = await sendGHLSMS({
      contactId,
      message,
      mediaUrl,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    apiLogger.error('Error sending SMS:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send SMS',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
