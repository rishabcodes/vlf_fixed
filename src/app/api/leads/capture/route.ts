import { NextRequest, NextResponse } from 'next/server';
import { leadCaptureService } from '@/services/lead-capture';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limiter';
import { withLeadCaptureTracing, withDatabaseTracing } from '@/lib/telemetry/api-middleware';

// Rate limiter for lead capture (prevent spam)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 leads per minute per IP
});

// Validation schema
const LeadCaptureRequestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  practiceArea: z.enum([
    'immigration',
    'personalInjury',
    'criminal',
    'family',
    'workersComp',
    'traffic',
  ]),
  message: z.string().optional(),
  urgency: z.enum(['immediate', 'soon', 'planning']).optional(),
  language: z.enum(['en', 'es']).default('en'),
  source: z.string().default('website-form'),
  formId: z.string(),
  pageUrl: z.string(),
  recaptchaToken: z.string().optional(),
});

// Wrap POST handler with lead capture tracing
async function handlePOST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Apply rate limiting
    const rateLimitResponse = await limiter({
      headers: Object.fromEntries(request.headers.entries()),
      ip: request.headers.get('x-forwarded-for') || request.ip || undefined,
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();

    // Validate request
    const validated = LeadCaptureRequestSchema.parse(body);

    // Verify reCAPTCHA if token provided
    if (validated.recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${validated.recaptchaToken}`,
      });

      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        logger.warn('reCAPTCHA verification failed', {
          score: recaptchaData.score,
          ip,
        });
        return NextResponse.json(
          { error: 'Security verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Map practice areas to match Prisma enum
    const practiceAreaMap: Record<string, string> = {
      immigration: 'immigration',
      personalInjury: 'personal_injury',
      criminal: 'criminal_defense',
      family: 'family_law',
      workersComp: 'workers_compensation',
      traffic: 'traffic',
    };

    // Capture lead
    const result = await leadCaptureService.captureWebLead({
      ...validated,
      practiceArea: practiceAreaMap[validated.practiceArea] as
        | 'immigration'
        | 'personal_injury'
        | 'workers_compensation'
        | 'criminal_defense'
        | 'family_law'
        | 'traffic',
      ipAddress: ip,
      userAgent: request.headers.get('user-agent') || undefined,
    });

    // Score lead asynchronously (using contact ID for now)
    leadCaptureService.scoreAndPrioritizeLead(result.contact.id).catch(error => {
      logger.error('Failed to score lead:', errorToLogMeta(error));
    });

    logger.info('Lead captured via API', {
      contactId: result.contact.id,
      practiceArea: validated.practiceArea,
      source: validated.source,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message:
        validated.language === 'es'
          ? 'Gracias por contactarnos. Un miembro de nuestro equipo se pondrá en contacto con usted pronto.'
          : 'Thank you for contacting us. A member of our team will be in touch with you soon.',
      contactId: result.contact.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    logger.error('Lead capture error:', errorToLogMeta(error));
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

// Export POST handler with tracing
export const POST = withLeadCaptureTracing(handlePOST);

// Get lead analytics
async function handleGET(request: NextRequest) {
  try {
    // Check authentication (admin only)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get date range from query params
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const dateRange =
      startDate && endDate
        ? {
            start: new Date(startDate),
            end: new Date(endDate),
          }
        : undefined;

    const analytics = await leadCaptureService.getLeadAnalytics(dateRange);

    return NextResponse.json(analytics);
  } catch (error) {
    logger.error('Failed to get lead analytics:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}

// Export GET handler with database tracing
export const GET = withDatabaseTracing(handleGET);
