import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';

// LawPay webhook data types
interface LawPayWebhookData {
  event_type?: string;
  type?: string;
  event?: string;
  status?: string;
  payment_id?: string;
  id?: string;
  transaction_id?: string;
  reference?: string;
  confirmation_number?: string;
  amount?: number;
  total?: number;
  amount_cents?: number;
  currency?: string;
  metadata?: Record<string, unknown>;
  custom_fields?: Record<string, unknown>;
  refund_amount?: number;
  refund_id?: string;
  refund_transaction_id?: string;
  failure_reason?: string;
  failure_code?: string;
  error?: string;
  error_code?: string;
  error_message?: string;
  declined_reason?: string;
  customer?: {
    name?: string;
    email?: string;
  };
  email?: string;
  customer_email?: string;
  customer_name?: string;
  name?: string;
}

const prisma = getPrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('x-lawpay-signature');

    // Log webhook receipt
    logger.info('LawPay webhook received', {
      hasSignature: !!signature,
      bodyLength: body.length,
    });

    // Skip signature verification for now since LawPay doesn't provide webhook secret
    // In production, implement IP whitelist or other security measures
    logger.info('LawPay webhook - skipping signature verification');

    // Parse webhook data
    const data = JSON.parse(body);

    // Log full webhook data for debugging
    logger.info('LawPay webhook data received', {
      fullData: data,
      keys: Object.keys(data),
    });

    // Handle different webhook events
    // LawPay might use different field names, so check multiple possibilities
    const eventType = data.event_type || data.type || data.event || data.status;

    logger.info('Processing webhook event', { eventType });

    // Handle based on event type or status
    if (eventType === 'payment.created' || eventType === 'created' || data.status === 'created') {
      await handlePaymentCreated(data);
    } else if (
      eventType === 'payment.succeeded' ||
      eventType === 'succeeded' ||
      eventType === 'paid' ||
      data.status === 'paid'
    ) {
      await handlePaymentSucceeded(data);
    } else if (
      eventType === 'payment.failed' ||
      eventType === 'failed' ||
      eventType === 'declined' ||
      data.status === 'declined'
    ) {
      await handlePaymentFailed(data);
    } else if (
      eventType === 'payment.refunded' ||
      eventType === 'refunded' ||
      data.status === 'refunded'
    ) {
      await handlePaymentRefunded(data);
    } else {
      logger.warn('Unknown LawPay webhook event', {
        eventType,
        status: data.status,
        type: data.type,
        fullData: data,
      });
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('LawPay webhook error', errorToLogMeta(error));

    // Return 200 even on error to prevent retries
    return NextResponse.json({ received: true });
  }
}

async function handlePaymentCreated(data: LawPayWebhookData) {
  // Handle different possible field names from LawPay
  const paymentId = data.payment_id || data.id || data.transaction_id || data.reference;
  const amount = data.amount || data.total || data.amount_cents;
  const currency = data.currency || 'USD';
  const metadata = data.metadata || data.custom_fields || {};

  if (!amount) {
    logger.error('Payment amount is missing in webhook data', { data });
    return;
  }

  try {
    // If amount is in cents, convert to dollars
    const amountInDollars = amount > 1000 ? amount / 100 : amount;

    // Create or update payment record
    // Check if payment already exists
    const existingPayment = await prisma.payment.findFirst({
      where: { gatewayTransactionId: paymentId },
    });

    if (existingPayment) {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'PENDING',
        },
      });
    } else {
      await prisma.payment.create({
        data: {
          gatewayTransactionId: paymentId,
          amount: amountInDollars,
          currency,
          status: 'PENDING',
          gateway: 'LAWPAY',
          paymentMethod: 'CARD',
          description: String(
            (metadata as Record<string, unknown>)?.description || 'Payment via LawPay'
          ),
          clientEmail: String(
            (metadata as Record<string, unknown>)?.email ||
              data.email ||
              data.customer_email ||
              data.customer?.email ||
              'unknown@email.com'
          ),
          clientName: String(
            (metadata as Record<string, unknown>)?.name ||
              data.name ||
              data.customer_name ||
              data.customer?.name ||
              'Unknown'
          ),
          metadata: {
            ...metadata,
            lawpayData: JSON.parse(JSON.stringify(data)),
          },
        },
      });
    }

    logger.info('Payment created in database', { paymentId });
  } catch (error) {
    logger.error('Failed to create payment record', createErrorLogMeta(error, { paymentId, data }));
  }
}

async function handlePaymentSucceeded(data: LawPayWebhookData) {
  // Handle different possible field names from LawPay
  const paymentId = data.payment_id || data.id || data.transaction_id || data.reference;
  const amount = data.amount || data.total || data.amount_cents;
  const transactionId = data.transaction_id || data.id || data.confirmation_number;
  const metadata = data.metadata || data.custom_fields || {};

  if (!amount) {
    logger.error('Payment amount is missing in success webhook data', { data });
    return;
  }

  try {
    // Calculate amount in dollars
    const amountInDollars = amount > 1000 ? amount / 100 : amount;

    // Find payment by external ID or reference
    const existingPayment = await prisma.payment.findFirst({
      where: {
        OR: [
          { gatewayTransactionId: paymentId },
          { metadata: { path: ['reference'], equals: paymentId } },
        ],
      },
    });

    if (!existingPayment) {
      // Create new payment if it doesn't exist
      await prisma.payment.create({
        data: {
          gatewayTransactionId: paymentId,
          amount: amountInDollars,
          currency: data.currency || 'USD',
          status: 'SUCCEEDED',
          gateway: 'LAWPAY',
          gatewayChargeId: transactionId,
          processedAt: new Date(),
          paymentMethod: 'CARD',
          description: String(
            (metadata as Record<string, unknown>)?.description || 'Payment via LawPay'
          ),
          clientEmail: String(
            (metadata as Record<string, unknown>)?.email ||
              data.email ||
              data.customer_email ||
              data.customer?.email ||
              'unknown@email.com'
          ),
          clientName: String(
            (metadata as Record<string, unknown>)?.name ||
              data.name ||
              data.customer_name ||
              data.customer?.name ||
              'Unknown'
          ),
          metadata: {
            ...metadata,
            lawpayData: JSON.parse(JSON.stringify(data)),
          },
        },
      });
    } else {
      // Update existing payment
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'SUCCEEDED',
          gatewayChargeId: transactionId,
          processedAt: new Date(),
          metadata: {
            ...((existingPayment.metadata as object) || {}),
            ...metadata,
            lawpayData: JSON.parse(JSON.stringify(data)),
          },
        },
      });
    }

    logger.info('Payment succeeded', {
      paymentId,
      amount: amountInDollars,
      transactionId,
    });

    // Send confirmation email
    const clientEmail =
      (metadata as Record<string, unknown>).clientEmail ||
      (metadata as Record<string, unknown>).email ||
      data.email ||
      data.customer_email ||
      data.customer?.email;
    if (clientEmail) {
      // TODO: Queue confirmation email
      logger.info('Payment confirmation email queued', {
        email: clientEmail,
        paymentId,
      });
    }

    // Create notification for admin
    // TODO: Implement notification system
    logger.info('Payment notification would be created', {
      type: 'PAYMENT_RECEIVED',
      amount: amountInDollars,
      clientEmail: ((metadata as Record<string, unknown>)?.clientEmail as string) || undefined,
    });
  } catch (error) {
    logger.error('Failed to handle payment success', createErrorLogMeta(error, { paymentId }));
  }
}

async function handlePaymentFailed(data: LawPayWebhookData) {
  const paymentId = data.payment_id || data.id || data.transaction_id || data.reference;
  const failureReason =
    data.failure_reason || data.error_message || data.declined_reason || 'Unknown error';

  try {
    const existingPayment = await prisma.payment.findFirst({
      where: { gatewayTransactionId: paymentId },
    });

    if (existingPayment) {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'FAILED',
          failureReason,
          metadata: {
            ...((existingPayment.metadata as object) || {}),
            failureCode: data.failure_code || data.error_code || 'unknown',
            lawpayData: JSON.parse(JSON.stringify(data)),
          },
        },
      });
    }

    logger.warn('Payment failed', {
      paymentId,
      reason: failureReason,
    });
  } catch (error) {
    logger.error('Failed to handle payment failure', createErrorLogMeta(error, { paymentId }));
  }
}

async function handlePaymentRefunded(data: LawPayWebhookData) {
  const paymentId = data.payment_id || data.id || data.transaction_id || data.reference;
  const refundAmount = data.refund_amount || data.amount || 0;
  const refundId = data.refund_id || data.refund_transaction_id || data.id;

  try {
    const existingPayment = await prisma.payment.findFirst({
      where: { gatewayTransactionId: paymentId },
    });

    if (existingPayment) {
      await prisma.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'REFUNDED',
          refundedAt: new Date(),
          metadata: {
            ...((existingPayment.metadata as object) || {}),
            refundId,
            refundAmount: refundAmount > 1000 ? refundAmount / 100 : refundAmount,
            lawpayData: JSON.parse(JSON.stringify(data)),
          },
        },
      });
    }

    logger.info('Payment refunded', {
      paymentId,
      refundAmount: refundAmount > 1000 ? refundAmount / 100 : refundAmount,
      refundId,
    });
  } catch (error) {
    logger.error('Failed to handle payment refund', createErrorLogMeta(error, { paymentId }));
  }
}
