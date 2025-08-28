import { NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientId = session.user.id;

    // Get billing summary
    const [invoices, payments, paymentMethods] = await Promise.all([
      prisma.invoice.findMany({
        where: { clientId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          invoiceNumber: true,
          total: true,
          dueDate: true,
          status: true,
        },
      }),
      prisma.payment.findMany({
        where: { clientEmail: session.user.email! },
        orderBy: { createdAt: 'desc' },
        select: {
          amount: true,
          createdAt: true,
        },
      }),
      prisma.paymentSource.findMany({
        where: { clientId },
        select: {
          id: true,
          type: true,
          last4: true,
          isDefault: true,
        },
      }),
    ]);

    // Calculate totals
    const totalBilled = invoices.reduce((sum: number, inv) => sum + inv.total, 0);
    const totalPaid = payments.reduce((sum: number, pay) => sum + pay.amount, 0);
    const outstandingBalance = totalBilled - totalPaid;

    // Find next payment due
    const nextInvoice = invoices.find(inv => inv.status === 'SENT' || inv.status === 'OVERDUE');

    const summary = {
      totalBilled,
      totalPaid,
      outstandingBalance,
      lastPaymentDate: payments[0]?.createdAt,
      lastPaymentAmount: payments[0]?.amount,
      nextPaymentDue: nextInvoice
        ? {
            date: nextInvoice.dueDate,
            amount: nextInvoice.total,
          }
        : null,
      recentInvoices: invoices,
      paymentMethods,
    };

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    logger.error('Failed to fetch billing summary:', error);
    return NextResponse.json({ error: 'Failed to fetch billing summary' }, { status: 500 });
  }
}
