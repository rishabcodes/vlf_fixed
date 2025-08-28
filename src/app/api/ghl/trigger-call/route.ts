import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { triggerGHLCall } from '@/lib/ghl';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactId, phoneNumber, agentId } = body;

    // Validate required fields
    if (!contactId || !phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          error: 'contactId and phoneNumber are required',
        },
        { status: 400 }
      );
    }

    // Trigger call through GHL
    const result = await triggerGHLCall({
      contactId,
      phoneNumber,
      agentId,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    apiLogger.error('Error triggering call:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to trigger call',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
