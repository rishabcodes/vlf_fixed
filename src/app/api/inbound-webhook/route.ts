import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import * as crypto from 'crypto';

// Force dynamic rendering since we need to access headers
// Verify webhook signature if secret is provided
const verifyWebhookSignature = (request: NextRequest, body: string): boolean => {
  const signature = request.headers.get('x-webhook-signature');
  const secret = process.env.INBOUND_WEBHOOK_SECRET;

  if (!signature || !secret) {
    // No signature validation if secret not configured
    return !secret;
  }

  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  return signature === expectedSignature;
};

// POST /api/inbound-webhook - Handle inbound webhooks
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // Verify signature in production
    if (process.env.NODE_ENV === 'production') {
      if (!verifyWebhookSignature(request, rawBody)) {
        logger.warn('Invalid inbound webhook signature');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);

    logger.info('Inbound webhook received', {
      type: event.type || 'unknown',
      eventId: event.id,
      source: request.headers.get('x-webhook-source') || 'unknown',
    });

    // Process webhook based on type
    // TODO: Implement specific webhook handling logic

    // Respond quickly to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Inbound webhook error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// GET /api/inbound-webhook - Webhook verification endpoint
export async function GET(request: NextRequest) {
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
    webhook: 'inbound',
    configured: !!process.env.INBOUND_WEBHOOK_SECRET,
  });
}
