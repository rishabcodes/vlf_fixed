import { NextRequest, NextResponse } from 'next/server';
import { ghlService } from '@/services/gohighlevel';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import crypto from 'crypto';
import { withTracing } from '@/lib/telemetry/api-middleware';

// Force dynamic rendering since we need to access headers and searchParams
// Verify GHL webhook signature
const verifyWebhookSignature = (request: NextRequest, body: string): boolean => {
  const signature = request.headers.get('x-ghl-signature');
  const secret = process.env.GHL_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return false;
  }

  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  return signature === expectedSignature;
};

async function handlePOST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // Verify signature in production
    if (process.env.NODE_ENV === 'production') {
      if (!verifyWebhookSignature(request, rawBody)) {
        logger.warn('Invalid GHL webhook signature');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);

    logger.info('GHL webhook received', {
      type: event.type,
      eventId: event.id,
    });

    // Process webhook asynchronously
    await ghlService.handleWebhook(event);

    // Respond quickly to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('GHL webhook error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Handle GET requests for webhook verification
export async function GET(request: NextRequest) {
  // GHL may send a verification request
  const challenge = request.nextUrl.searchParams.get('challenge');

  if (challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.json({
    status: 'ok',
    webhook: 'ghl',
    configured: !!process.env.GHL_API_KEY,
  });
}

export const POST = withTracing(handlePOST, {
  spanName: 'webhook.ghl',
  attributes: { 'vlf.operation': 'webhook_ghl' },
});
