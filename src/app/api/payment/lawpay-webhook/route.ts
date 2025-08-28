import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
// import crypto from 'crypto';

const prisma = getPrismaClient();

// Schema for creating a payment session
const paymentSessionSchema = z.object({
  amount: z.number().positive(),
  description: z.string(),
  clientEmail: z.string().email(),
  clientName: z.string(),
  clientPhone: z.string().optional(),
  invoiceNumber: z.string().optional(),
  trustAccount: z.boolean().default(false),
});

// Create a payment session for LawPay hosted checkout
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = paymentSessionSchema.parse(body);

    // Check if we have at least the public key
    const publicKey = process.env.LAWPAY_PUBLIC_KEY;
    if (!publicKey) {
      return NextResponse.json({ error: 'Payment system not configured' }, { status: 503 });
    }

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        amount: validatedData.amount,
        currency: 'USD',
        status: 'PENDING',
        gateway: 'LAWPAY',
        description: validatedData.description,
        clientEmail: validatedData.clientEmail,
        clientName: validatedData.clientName,
        clientPhone: validatedData.clientPhone,
        accountType: validatedData.trustAccount ? 'TRUST' : 'OPERATING',
        paymentMethod: 'CARD', // Default to card for LawPay
        metadata: {
          invoiceNumber: validatedData.invoiceNumber,
        },
      },
    });

    logger.info('Payment session created', {
      paymentId: payment.id,
      amount: validatedData.amount,
      clientEmail: validatedData.clientEmail,
    });

    // Return payment session data
    // The client will use this to redirect to LawPay's hosted page
    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      publicKey,
      amount: validatedData.amount,
      // LawPay hosted checkout URL
      checkoutUrl: buildLawPayCheckoutUrl({
        publicKey,
        amount: validatedData.amount,
        description: validatedData.description,
        clientName: validatedData.clientName,
        clientEmail: validatedData.clientEmail,
        referenceId: payment.id,
        trustAccount: validatedData.trustAccount,
        webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vazquezlawfirm.com'}/api/webhooks/lawpay`,
      }),
    });
  } catch (error) {
    logger.error('Payment session creation failed', errorToLogMeta(error));

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid payment data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to create payment session' }, { status: 500 });
  }
}

// Get payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID required' }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        description: true,
        createdAt: true,
        processedAt: true,
        metadata: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json(payment);
  } catch (error) {
    logger.error('Payment status check failed', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to retrieve payment status' }, { status: 500 });
  }
}

// Build LawPay hosted checkout URL
function buildLawPayCheckoutUrl(params: {
  publicKey: string;
  amount: number;
  description: string;
  clientName: string;
  clientEmail: string;
  referenceId: string;
  trustAccount: boolean;
  webhookUrl: string;
}): string {
  // LawPay hosted payment page URL structure
  // Note: This is based on typical payment gateway patterns
  // You'll need to update with actual LawPay URL format from their documentation

  const baseUrl = 'https://secure.lawpay.com/checkout';

  const queryParams = new URLSearchParams({
    public_key: params.publicKey,
    amount: (params.amount * 100).toString(), // Convert to cents
    currency: 'USD',
    description: params.description,
    client_name: params.clientName,
    client_email: params.clientEmail,
    reference: params.referenceId,
    account_type: params.trustAccount ? 'trust' : 'operating',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vazquezlawfirm.com'}/payment/success?reference=${params.referenceId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vazquezlawfirm.com'}/payment/cancel?reference=${params.referenceId}`,
    webhook_url: params.webhookUrl,
  });

  return `${baseUrl}?${queryParams.toString()}`;
}
