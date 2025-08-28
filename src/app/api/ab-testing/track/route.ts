import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';
import { z } from 'zod';

const TrackEventSchema = z.object({
  testId: z.string(),
  variantId: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  event: z.string(),
  value: z.number().optional(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.string(),
});

// POST /api/ab-testing/track - Track A/B test conversion event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventData = TrackEventSchema.parse(body);

    await abTestEngine.trackEvent({
      testId: eventData.testId,
      variantId: eventData.variantId,
      userId: eventData.userId,
      sessionId: eventData.sessionId,
      event: eventData.event,
      value: eventData.value,
      metadata: eventData.metadata,
      timestamp: new Date(eventData.timestamp),
    });

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully',
    });
  } catch (error) {
    logger.error('Failed to track A/B test event:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid event data', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
