import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { emailService } from '@/services/email';
import { z } from 'zod';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { withTracing } from '@/lib/telemetry/api-middleware';

export const runtime = 'nodejs';
// Validation schema
const sendEmailSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  cc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  bcc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().optional(),
  text: z.string().optional(),
  template: z.string().optional(),
  templateData: z.record(z.unknown()).optional(),
  replyTo: z.string().email().optional(),
  priority: z.enum(['high', 'normal', 'low']).optional(),
});

async function handlePOST(request: NextRequest) {
  try {
    // Check authentication - only authenticated users can send emails
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = sendEmailSchema.parse(body);

    // Additional security checks
    if (!validatedData.html && !validatedData.text && !validatedData.template) {
      return NextResponse.json(
        { error: 'Email must have content (html, text, or template)' },
        { status: 400 }
      );
    }

    // Log email request
    logger.info('Email send request', {
      userId: session.user.id,
      to: Array.isArray(validatedData.to) ? validatedData.to.length : 1,
      subject: validatedData.subject,
      template: validatedData.template,
    });

    // Send email
    const result = await emailService.send(validatedData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: 'Email sent successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send email',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error('Email API error:', errorToLogMeta(error));

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Queue email endpoint
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { delay, ...emailData } = body;

    // Validate email data
    const validatedData = sendEmailSchema.parse(emailData);

    // Queue email
    await emailService.queue(validatedData, delay);

    return NextResponse.json({
      success: true,
      message: 'Email queued successfully',
    });
  } catch (error) {
    logger.error('Email queue error:', errorToLogMeta(error));

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Export with telemetry wrapper
export const POST = withTracing(handlePOST, {
  spanName: 'email.send',
  attributes: { 'vlf.operation': 'email_send' },
});
