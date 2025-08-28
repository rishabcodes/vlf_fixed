import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { paymentService } from '@/services/payment';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { z } from 'zod';
import { withPaymentTracing } from '@/lib/telemetry/api-middleware';

export const runtime = 'nodejs';
// Validation schemas
const processPaymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('USD'),
  description: z.string().min(1, 'Description is required'),
  clientEmail: z.string().email('Valid email required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientPhone: z.string().optional(),
  caseId: z.string().optional(),
  paymentMethod: z.object({
    type: z.enum(['card', 'ach']),
    cardNumber: z.string().optional(),
    expiryDate: z
      .string()
      .regex(/^\d{2}\/\d{2}$/)
      .optional(),
    cvv: z
      .string()
      .regex(/^\d{3,4}$/)
      .optional(),
    accountNumber: z.string().optional(),
    routingNumber: z.string().optional(),
  }),
  options: z
    .object({
      gateway: z.enum(['lawpay', 'authorize.net']).optional(),
      trustAccount: z.boolean().optional(),
    })
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});

const refundPaymentSchema = z.object({
  paymentId: z.string().min(1, 'Payment ID is required'),
  amount: z.number().positive().optional(),
  reason: z.string().optional(),
});

const paymentPlanSchema = z.object({
  clientEmail: z.string().email('Valid email required'),
  clientName: z.string().min(1, 'Client name is required'),
  totalAmount: z.number().positive('Amount must be positive'),
  installments: z.number().int().min(2, 'Minimum 2 installments'),
  startDate: z.string().transform(str => new Date(str)),
  caseId: z.string().optional(),
});

async function handlePOST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // For now, allow unauthenticated payments (for public payment forms)
    // In production, you might want to require authentication for certain operations

    const body = await request.json();
    const action = body.action;

    switch (action) {
      case 'process': {
        const validation = processPaymentSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid request data', details: validation.error.errors },
            { status: 400 }
          );
        }

        const {
          amount,
          currency,
          description,
          clientEmail,
          clientName,
          clientPhone,
          caseId,
          paymentMethod,
          options,
          metadata,
        } = validation.data;

        const result = await paymentService.processPayment(
          {
            amount,
            currency,
            description,
            clientEmail,
            clientName,
            clientPhone,
            caseId,
            metadata,
          },
          paymentMethod,
          options
        );

        if (result.success) {
          logger.info('Payment processed successfully', {
            paymentId: result.paymentId,
            amount,
            clientEmail,
          });

          return NextResponse.json({
            success: true,
            paymentId: result.paymentId,
            transactionId: result.transactionId,
            amount: result.amount,
            gateway: result.gateway,
          });
        } else {
          logger.error('Payment processing failed', {
            error: result.error,
            clientEmail,
          });

          return NextResponse.json(
            { error: result.error || 'Payment processing failed' },
            { status: 400 }
          );
        }
      }

      case 'refund': {
        // Require authentication for refunds
        if (!session || !['ADMIN', 'ATTORNEY'].includes(session.user.role)) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const validation = refundPaymentSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid request data', details: validation.error.errors },
            { status: 400 }
          );
        }

        const { paymentId, amount, reason } = validation.data;

        const result = await paymentService.refundPayment(
          paymentId,
          amount,
          reason,
          session.user.email || session.user.id
        );

        if (result.success) {
          return NextResponse.json({
            success: true,
            transactionId: result.transactionId,
            amount: result.amount,
          });
        } else {
          return NextResponse.json(
            { error: result.error || 'Refund processing failed' },
            { status: 400 }
          );
        }
      }

      case 'create-plan': {
        const validation = paymentPlanSchema.safeParse(body);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid request data', details: validation.error.errors },
            { status: 400 }
          );
        }

        const { clientEmail, clientName, totalAmount, installments, startDate, caseId } =
          validation.data;

        const plan = await paymentService.createPaymentPlan(
          clientEmail,
          clientName,
          totalAmount,
          installments,
          startDate,
          caseId
        );

        return NextResponse.json({
          success: true,
          planId: plan.id,
          monthlyAmount: plan.monthlyAmount,
          nextPaymentDate: plan.nextPaymentDate,
        });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    logger.error('Payment API error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleGET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const clientEmail = searchParams.get('clientEmail') || session.user.email;
    const caseId = searchParams.get('caseId');

    switch (action) {
      case 'history': {
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const payments = await paymentService.getPaymentHistory(clientEmail!, {
          caseId: caseId || undefined,
          limit,
          offset,
        });

        return NextResponse.json({
          success: true,
          payments,
          total: payments.length,
        });
      }

      case 'trust-balance': {
        const balance = await paymentService.getTrustAccountBalance(
          clientEmail!,
          caseId || undefined
        );

        return NextResponse.json({
          success: true,
          balance,
          clientEmail,
          caseId,
        });
      }

      case 'trust-transactions': {
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        const transactions = await paymentService.getTrustAccountTransactions(clientEmail!, {
          caseId: caseId || undefined,
          limit,
          offset,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
        });

        return NextResponse.json({
          success: true,
          transactions,
          total: transactions.length,
        });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    logger.error('Payment API GET error:', errorToLogMeta(error));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const POST = withPaymentTracing(handlePOST);
export const GET = withPaymentTracing(handleGET);
