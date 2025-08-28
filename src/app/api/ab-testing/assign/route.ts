import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';
import { z } from 'zod';

// Force dynamic rendering since we need to access headers
const AssignRequestSchema = z.object({
  testId: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  userContext: z
    .object({
      userAgent: z.string().optional(),
      ipAddress: z.string().optional(),
      geoLocation: z.string().optional(),
      deviceType: z.enum(['desktop', 'mobile', 'tablet']).optional(),
      timestamp: z.string(),
    })
    .optional(),
});

// POST /api/ab-testing/assign - Assign user to A/B test variant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testId, userId, sessionId, userContext } = AssignRequestSchema.parse(body);

    // Get client IP if not provided
    const ipAddress =
      userContext?.ipAddress ||
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Get geo location from headers (if available)
    const geoLocation =
      request.headers.get('cf-ipcountry') ||
      request.headers.get('x-vercel-ip-country') ||
      undefined;

    const enhancedUserContext = {
      ...userContext,
      ipAddress,
      geoLocation,
    };

    const variantId = await abTestEngine.assignVariant(
      testId,
      userId,
      sessionId,
      enhancedUserContext
    );

    if (!variantId) {
      return NextResponse.json({
        success: false,
        message: 'User not eligible for test or test not active',
        variantId: null,
      });
    }

    return NextResponse.json({
      success: true,
      variantId,
      testId,
      userId,
    });
  } catch (error) {
    logger.error('Failed to assign A/B test variant:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to assign variant' }, { status: 500 });
  }
}
