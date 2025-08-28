/**
 * Client Portal - Billing & Payments System
 * Handles invoicing, payment processing, and financial tracking
 */

import { logger } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { sendEmail } from '@/lib/email';
import { createNotification } from '@/lib/notifications';
import {
  PaymentStatus as PrismaPaymentStatus,
  InvoiceStatus as PrismaInvoiceStatus,
  PaymentPlanStatus,
  PaymentGateway,
  PaymentMethod as PrismaPaymentMethod,
  AccountType,
  RefundStatus,
  TrustTransactionType,
  Prisma,
} from '@prisma/client';

type JsonValue = Prisma.JsonValue;

export interface Invoice {
  id: string;
  caseId: string;
  clientId: string;
  invoiceNumber: string;

  // Billing Details
  billingPeriod: {
    start: Date;
    end: Date;
  };
  dueDate: Date;
  status: InvoiceStatus;

  // Line Items
  lineItems: Array<{
    id: string;
    description: string;
    category: 'legal_services' | 'expenses' | 'filing_fees' | 'other';
    quantity: number;
    rate: number;
    amount: number;
    date: Date;
    attorney?: string;
    isBillable: boolean;
  }>;

  // Financial Summary
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;

  // Payment Terms
  paymentTerms: string;
  lateFeePercentage: number;
  acceptedPaymentMethods: PaymentMethod[];

  // Timestamps
  issuedDate: Date;
  sentDate?: Date;
  viewedDate?: Date;
  paidDate?: Date;

  // Metadata
  notes?: string;
  internalNotes?: string;
  attachments?: string[];
}

export interface Payment {
  id: string;
  clientId: string;
  caseId?: string;
  invoiceId?: string;

  // Payment Details
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;

  // Transaction Info
  transactionId?: string;
  checkNumber?: string;

  // Processing
  processedDate?: Date;
  processingFee?: number;
  netAmount?: number;

  // Refund Info
  isRefunded: boolean;
  refundedAmount?: number;
  refundReason?: string;

  // Metadata
  description?: string;
  receiptUrl?: string;
  createdAt: Date;
}

export interface PaymentPlan {
  id: string;
  clientId: string;
  caseId: string;

  // Plan Details
  totalAmount: number;
  downPayment: number;
  remainingBalance: number;
  monthlyPayment: number;
  numberOfPayments: number;

  // Schedule
  startDate: Date;
  endDate: Date;
  nextPaymentDate: Date;
  paymentSchedule: Array<{
    dueDate: Date;
    amount: number;
    status: 'pending' | 'paid' | 'late' | 'waived';
    paidDate?: Date;
    paymentId?: string;
  }>;

  // Status
  status: 'active' | 'completed' | 'defaulted' | 'cancelled';
  completedPayments: number;
  missedPayments: number;

  // Terms
  lateFeeAmount: number;
  gracePeriodDays: number;
  autoPayEnabled: boolean;

  // Metadata
  agreementSignedDate?: Date;
  notes?: string;
}

export interface TrustAccount {
  id: string;
  clientId: string;
  caseId: string;

  // Account Details
  accountNumber: string;
  currentBalance: number;
  availableBalance: number;
  heldAmount: number;

  // Transactions
  transactions: Array<{
    id: string;
    date: Date;
    type: 'deposit' | 'withdrawal' | 'transfer' | 'hold' | 'release';
    amount: number;
    balance: number;
    description: string;
    reference?: string;
    approvedBy?: string;
  }>;

  // Metadata
  openedDate: Date;
  lastActivityDate: Date;
  status: 'active' | 'closed';
}

// Use Prisma's InvoiceStatus enum
export type InvoiceStatus = PrismaInvoiceStatus;

// Use Prisma's PaymentStatus enum
export type PaymentStatus = PrismaPaymentStatus;

// Use Prisma's PaymentMethod enum
export type PaymentMethod = PrismaPaymentMethod;

export class ClientPortalBillingPayments {
  /**
   * Create invoice for a case
   */
  async createInvoice(params: {
    caseId: string;
    clientId: string;
    clientEmail?: string;
    clientName?: string;
    lineItems: Invoice['lineItems'];
    dueDate?: Date;
    notes?: string;
    sendImmediately?: boolean;
  }): Promise<Invoice> {
    logger.info('Creating invoice', { caseId: params.caseId, clientId: params.clientId });

    try {
      // Generate invoice number
      const invoiceNumber = await this.generateInvoiceNumber();

      // Calculate totals
      const subtotal = params.lineItems.reduce((sum, item) => sum + item.amount, 0);
      const taxRate = await this.getApplicableTaxRate(params.clientId);
      const taxAmount = subtotal * taxRate;
      const totalAmount = subtotal + taxAmount;

      // Default due date is 30 days
      const dueDate = params.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      // Create invoice
      const invoice = await prisma.invoice.create({
        data: {
          caseId: params.caseId,
          clientId: params.clientId,
          invoiceNumber,
          dueDate,
          status: 'DRAFT' as InvoiceStatus,
          lineItems: params.lineItems,
          subtotal,
          tax: taxAmount,
          total: totalAmount,
          amountPaid: 0,
          amountDue: totalAmount,
          metadata: JSON.parse(
            JSON.stringify({
              billingPeriod: {
                start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                end: new Date(),
              },
              taxRate,
              discountAmount: 0,
              paymentTerms: 'Net 30',
              lateFeePercentage: 1.5,
              acceptedPaymentMethods: ['CARD', 'ACH', 'CHECK'],
              issuedDate: new Date(),
              notes: params.notes,
            })
          ),
        },
      });

      // Send immediately if requested
      if (params.sendImmediately) {
        await this.sendInvoice(invoice.id);
      }

      return this.mapToInvoice(invoice);
    } catch (error) {
      logger.error('Failed to create invoice', { error, params });
      throw error;
    }
  }

  /**
   * Send invoice to client
   */
  async sendInvoice(invoiceId: string): Promise<void> {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { client: true },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (!invoice.client.email) {
      throw new Error('Client email not found');
    }

    // Generate PDF (simplified - would use actual PDF generation)
    const pdfUrl = await this.generateInvoicePDF(invoice);

    // Send email
    const viewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/portal/invoices/${invoice.id}`;
    await sendEmail({
      to: invoice.client.email,
      subject: `Invoice ${invoice.invoiceNumber} from Vasquez Law Firm`,
      html: `
        <h2>Invoice ${invoice.invoiceNumber}</h2>
        <p>Dear ${invoice.client.name},</p>
        <p>Your invoice for $${invoice.total} is ready. Payment is due by ${invoice.dueDate}.</p>
        <p><a href="${viewUrl}">View Invoice</a></p>
        <p>Thank you for your business.</p>
      `,
      text: `Invoice ${invoice.invoiceNumber}\n\nDear ${invoice.client.name},\n\nYour invoice for $${invoice.total} is ready. Payment is due by ${invoice.dueDate}.\n\nView invoice at: ${viewUrl}\n\nThank you for your business.`,
    });

    // Update invoice status
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: 'SENT' as InvoiceStatus,
        metadata: JSON.parse(
          JSON.stringify({
            ...((invoice.metadata as Record<string, unknown>) || {}),
            sentDate: new Date(),
          })
        ),
      },
    });

    // Create notification
    await createNotification({
      userId: invoice.client.id,
      type: 'info' as const,
      title: 'Invoice Sent',
      message: `Invoice ${invoice.invoiceNumber} sent to ${invoice.client.name}`,
      metadata: {
        invoiceId,
        clientId: invoice.clientId,
      },
    });
  }

  /**
   * Process payment for invoice
   */
  async processPayment(params: {
    clientId: string;
    clientEmail?: string;
    clientName?: string;
    clientPhone?: string | null;
    invoiceId?: string;
    caseId?: string;
    amount: number;
    paymentMethod: PaymentMethod;
    paymentMethodId?: string; // Stripe payment method ID
    checkNumber?: string;
  }): Promise<Payment> {
    logger.info('Processing payment', {
      clientId: params.clientId,
      amount: params.amount,
      method: params.paymentMethod,
    });

    try {
      let transactionId: string | undefined;
      let status: PaymentStatus = 'PENDING';
      let processedDate: Date | undefined;
      const processingFee = 0;

      // Process based on payment method
      if (params.paymentMethod === 'CARD' && params.paymentMethodId) {
        // Card payment processing removed - use alternative gateway
        throw new Error(
          'Card payment processing temporarily unavailable. Please use ACH or check payment.'
        );

        // TODO: Integrate with LawPay or Authorize.Net for card processing
        // transactionId = `CARD-${Date.now()}`;
        // status = 'PENDING';
        // processedDate = new Date();
        // processingFee = params.amount * 0.029 + 30; // Standard processing fees
      } else if (params.paymentMethod === 'ACH') {
        // Process ACH payment
        // In practice, would integrate with ACH processor
        transactionId = `ACH-${Date.now()}`;
        status = 'PROCESSING'; // ACH takes time
      } else if (params.paymentMethod === 'CHECK') {
        // Record check payment
        transactionId = params.checkNumber || `CHK-${Date.now()}`;
        status = 'PENDING'; // Needs manual processing
      }

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          clientEmail: params.clientEmail || '',
          clientName: params.clientName || '',
          clientPhone: params.clientPhone,
          caseId: params.caseId,
          invoiceId: params.invoiceId,
          amount: params.amount,
          currency: 'USD',
          paymentMethod: params.paymentMethod,
          status,
          gateway: 'STRIPE',
          gatewayTransactionId: transactionId,
          gatewayChargeId: transactionId,
          processedAt: processedDate,
          description: params.invoiceId
            ? `Payment for Invoice ${params.invoiceId}`
            : 'Account payment',
          metadata: JSON.parse(
            JSON.stringify({
              checkNumber: params.checkNumber,
              processingFee,
              netAmount: params.amount - processingFee,
              isRefunded: false,
            })
          ),
        },
      });

      // Update invoice if payment is created (will be marked as paid when processed)
      if (params.invoiceId) {
        await this.applyPaymentToInvoice(payment.id, params.invoiceId);
      }

      // Update payment plan if applicable
      if (params.caseId) {
        await this.updatePaymentPlanProgress(params.caseId, payment.id);
      }

      // Send confirmation
      await this.sendPaymentConfirmation(payment);

      return this.mapToPayment(payment);
    } catch (error) {
      logger.error('Failed to process payment', { error, params });
      throw error;
    }
  }

  /**
   * Create payment plan
   */
  async createPaymentPlan(params: {
    clientId: string;
    clientEmail?: string;
    clientName?: string;
    caseId: string;
    totalAmount: number;
    downPayment: number;
    numberOfPayments: number;
    startDate?: Date;
    autoPayEnabled?: boolean;
  }): Promise<PaymentPlan> {
    logger.info('Creating payment plan', {
      clientId: params.clientId,
      totalAmount: params.totalAmount,
      payments: params.numberOfPayments,
    });

    try {
      const remainingBalance = params.totalAmount - params.downPayment;
      const monthlyPayment = remainingBalance / params.numberOfPayments;
      const startDate = params.startDate || new Date();

      // Generate payment schedule
      const paymentSchedule: Array<{ dueDate: Date; amount: number; status: 'pending' }> = [];
      for (let i = 0; i < params.numberOfPayments; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + i + 1);

        paymentSchedule.push({
          dueDate,
          amount: monthlyPayment,
          status: 'pending' as const,
        });
      }

      const endDate = paymentSchedule[paymentSchedule.length - 1]?.dueDate || new Date();

      // Create payment plan
      const plan = await prisma.paymentPlan.create({
        data: {
          clientEmail: params.clientEmail || '',
          clientName: params.clientName || '',
          caseId: params.caseId,
          totalAmount: params.totalAmount,
          installments: params.numberOfPayments,
          monthlyAmount: monthlyPayment,
          startDate,
          nextPaymentDate: paymentSchedule[0]?.dueDate || new Date(),
          status: 'ACTIVE',
          paidAmount: params.downPayment,
          remainingAmount: remainingBalance,
          metadata: JSON.parse(
            JSON.stringify({
              downPayment: params.downPayment,
              endDate,
              paymentSchedule,
              completedPayments: 0,
              missedPayments: 0,
              lateFeeAmount: 25,
              gracePeriodDays: 5,
              autoPayEnabled: params.autoPayEnabled || false,
            })
          ),
        },
      });

      // Process down payment if provided
      if (params.downPayment > 0) {
        await this.processPayment({
          clientId: params.clientId,
          caseId: params.caseId,
          amount: params.downPayment,
          paymentMethod: 'CARD', // Default, should be specified
        });
      }

      // Send agreement for signature
      await this.sendPaymentPlanAgreement(plan);

      return this.mapToPaymentPlan(plan);
    } catch (error) {
      logger.error('Failed to create payment plan', { error, params });
      throw error;
    }
  }

  /**
   * Get client billing summary
   */
  async getClientBillingSummary(
    clientId: string,
    clientEmail: string
  ): Promise<{
    totalBilled: number;
    totalPaid: number;
    outstandingBalance: number;
    overdueAmount: number;
    recentPayments: Payment[];
    activePaymentPlans: PaymentPlan[];
    upcomingPayments: Array<{
      date: Date;
      amount: number;
      description: string;
    }>;
  }> {
    // Get all invoices
    const invoices = await prisma.invoice.findMany({
      where: { clientId },
    });

    // Get recent payments
    const payments = await prisma.payment.findMany({
      where: {
        clientEmail: clientEmail,
        createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }, // 90 days
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Get active payment plans
    const paymentPlans = await prisma.paymentPlan.findMany({
      where: {
        clientEmail: clientEmail,
        status: 'ACTIVE',
      },
    });

    // Calculate totals
    const totalBilled = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const totalPaid = invoices.reduce((sum, inv) => sum + inv.amountPaid, 0);
    const outstandingBalance = totalBilled - totalPaid;

    // Calculate overdue amount
    const now = new Date();
    const overdueAmount = invoices
      .filter(
        inv => inv.status === 'OVERDUE' || (inv.status !== 'PAID' && new Date(inv.dueDate) < now)
      )
      .reduce((sum, inv) => sum + inv.amountDue, 0);

    // Get upcoming payments
    const upcomingPayments: Array<{ date: Date; amount: number; description: string }> = [];

    // From payment plans
    for (const plan of paymentPlans) {
      const metadata = plan.metadata as Record<string, unknown>;
      const schedule =
        (metadata?.paymentSchedule as Array<{
          dueDate: string | Date;
          amount: number;
          status: string;
        }>) || [];
      const nextPayment = schedule.find(p => p.status === 'pending' && new Date(p.dueDate) > now);

      if (nextPayment) {
        upcomingPayments.push({
          date: new Date(nextPayment.dueDate),
          amount: nextPayment.amount,
          description: `Payment plan installment`,
        });
      }
    }

    // Sort upcoming payments by date
    upcomingPayments.sort((a, b) => a.date.getTime() - b.date.getTime());

    return {
      totalBilled,
      totalPaid,
      outstandingBalance,
      overdueAmount,
      recentPayments: payments.map(p => this.mapToPayment(p)),
      activePaymentPlans: paymentPlans.map(p => this.mapToPaymentPlan(p)),
      upcomingPayments: upcomingPayments.slice(0, 5),
    };
  }

  /**
   * Process trust account transaction
   */
  async processTrustTransaction(params: {
    clientId: string;
    clientName: string;
    clientEmail: string;
    caseId: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    description: string;
    reference?: string;
    paymentId?: string;
    notes?: string;
    approvedBy: string;
  }): Promise<void> {
    logger.info('Processing trust account transaction', {
      clientId: params.clientId,
      type: params.type,
      amount: params.amount,
    });

    try {
      // Get latest trust ledger entry for the client
      const latestEntry = await prisma.trustLedger.findFirst({
        where: {
          clientEmail: params.clientEmail,
          caseId: params.caseId,
        },
        orderBy: { createdAt: 'desc' },
      });

      const currentBalance = latestEntry?.balance || 0;
      let newBalance = currentBalance;

      if (params.type === 'deposit') {
        newBalance += params.amount;
      } else if (params.type === 'withdrawal') {
        if (params.amount > currentBalance) {
          throw new Error('Insufficient funds in trust account');
        }
        newBalance -= params.amount;
      }

      // Create trust ledger entry
      const trustEntry = await prisma.trustLedger.create({
        data: {
          transactionType: params.type.toUpperCase() as TrustTransactionType,
          amount: params.amount,
          balance: newBalance,
          clientName: params.clientName,
          clientEmail: params.clientEmail,
          caseId: params.caseId,
          paymentId: params.paymentId,
          reference: params.reference || `TRUST-${Date.now()}`,
          description: params.description,
          recordedBy: params.approvedBy || 'system',
          approvedBy: params.approvedBy,
          metadata: JSON.parse(
            JSON.stringify({
              notes: params.notes || '',
            })
          ),
        },
      });

      // Create notification
      await createNotification({
        userId: params.clientId,
        type: 'info',
        title: 'Trust Account Activity',
        message: `Trust account ${params.type}: $${params.amount}`,
        metadata: {
          trustEntryId: trustEntry.id,
          transactionType: params.type,
          amount: params.amount,
        },
      });

      // Send notification
      await createNotification({
        userId: params.clientId,
        type: 'info',
        title: 'Trust Account Transaction',
        message: `${params.type} of $${params.amount} processed`,
        metadata: {
          clientId: params.clientId,
          caseId: params.caseId,
          transactionType: params.type,
          amount: params.amount,
        },
      });
    } catch (error) {
      logger.error('Failed to process trust transaction', { error, params });
      throw error;
    }
  }

  /**
   * Generate financial report
   */
  async generateFinancialReport(params: {
    clientId: string;
    clientEmail?: string;
    caseId?: string;
    startDate: Date;
    endDate: Date;
    includeDetails?: boolean;
  }): Promise<{
    summary: {
      totalBilled: number;
      totalPaid: number;
      totalExpenses: number;
      netAmount: number;
    };
    invoices: Invoice[];
    payments: Payment[];
    trustActivity?: any[];
  }> {
    // Get invoices in date range
    const invoices = await prisma.invoice.findMany({
      where: {
        clientId: params.clientId,
        ...(params.caseId && { caseId: params.caseId }),
        createdAt: {
          gte: params.startDate,
          lte: params.endDate,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Get payments in date range
    const payments = await prisma.payment.findMany({
      where: {
        clientEmail: params.clientEmail || '',
        ...(params.caseId && { caseId: params.caseId }),
        createdAt: {
          gte: params.startDate,
          lte: params.endDate,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Calculate summary
    const totalBilled = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const totalPaid = payments
      .filter(p => p.status === 'SUCCEEDED')
      .reduce((sum, p) => sum + p.amount, 0);

    // Calculate expenses from line items
    const totalExpenses = invoices.reduce((sum, inv) => {
      const lineItems = JSON.parse(inv.lineItems as string) as Array<{
        category: string;
        amount: number;
      }>;
      return (
        sum +
        lineItems
          .filter(item => item.category === 'expenses' || item.category === 'filing_fees')
          .reduce((itemSum, item) => itemSum + item.amount, 0)
      );
    }, 0);

    const report = {
      summary: {
        totalBilled,
        totalPaid,
        totalExpenses,
        netAmount: totalBilled - totalExpenses,
      },
      invoices: invoices.map(i => this.mapToInvoice(i)),
      payments: payments.map(p => this.mapToPayment(p)),
    };

    // Include trust account activity if requested
    if (params.includeDetails && params.caseId) {
      const trustTransactions = await prisma.trustLedger.findMany({
        where: {
          caseId: params.caseId,
          createdAt: {
            gte: params.startDate,
            lte: params.endDate,
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      Object.assign(report, { trustActivity: trustTransactions });
    }

    return report;
  }

  // Helper methods

  private async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastInvoice = await prisma.invoice.findFirst({
      where: {
        invoiceNumber: { startsWith: `INV-${year}-` },
      },
      orderBy: { createdAt: 'desc' },
    });

    let sequence = 1;
    if (lastInvoice) {
      const lastSequence = parseInt(lastInvoice.invoiceNumber.split('-')[2] || '0');
      sequence = lastSequence + 1;
    }

    return `INV-${year}-${sequence.toString().padStart(5, '0')}`;
  }

  private async generateTrustAccountNumber(): Promise<string> {
    const random = Math.floor(Math.random() * 1000000);
    return `TRUST-${Date.now()}-${random}`;
  }

  private async getApplicableTaxRate(clientId: string): Promise<number> {
    // In practice, would determine based on client location
    // For now, use NC sales tax rate
    return 0.0475; // 4.75%
  }

  private async generateInvoicePDF(invoice: any): Promise<string> {
    // In practice, would generate actual PDF
    return `${process.env.NEXT_PUBLIC_APP_URL}/api/invoices/${invoice.id}/pdf`;
  }

  private async applyPaymentToInvoice(paymentId: string, invoiceId: string): Promise<void> {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!payment || !invoice) return;

    const newPaidAmount = invoice.amountPaid + payment.amount;
    const newBalanceDue = invoice.total - newPaidAmount;
    const newStatus = newBalanceDue <= 0 ? 'PAID' : 'PARTIALLY_PAID';

    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        amountPaid: newPaidAmount,
        amountDue: newBalanceDue,
        status: newStatus,
        paidAt: newStatus === 'PAID' ? new Date() : undefined,
      },
    });
  }

  private async updatePaymentPlanProgress(caseId: string, paymentId: string): Promise<void> {
    const plan = await prisma.paymentPlan.findFirst({
      where: {
        caseId,
        status: 'ACTIVE',
      },
    });

    if (!plan) return;

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.status !== 'SUCCEEDED') return;

    // Update payment schedule
    const metadata = plan.metadata as Record<string, unknown>;
    const schedule =
      (metadata?.paymentSchedule as Array<{
        dueDate: string | Date;
        amount: number;
        status: string;
        paidDate?: Date;
        paymentId?: string;
      }>) || [];
    const nextPending = schedule.find(p => p.status === 'pending');

    if (nextPending) {
      nextPending.status = 'paid';
      nextPending.paidDate = new Date();
      nextPending.paymentId = paymentId;
    }

    // Update plan statistics
    const completedPayments = schedule.filter(p => p.status === 'paid').length;
    const nextPayment = schedule.find(p => p.status === 'pending');
    const numberOfPayments = plan.installments || 12; // Use installments field
    const status =
      completedPayments === numberOfPayments
        ? PaymentPlanStatus.COMPLETED
        : PaymentPlanStatus.ACTIVE;

    await prisma.paymentPlan.update({
      where: { id: plan.id },
      data: {
        metadata: JSON.parse(
          JSON.stringify({
            ...(metadata || {}),
            paymentSchedule: schedule,
            completedPayments,
          })
        ),
        nextPaymentDate: nextPayment ? new Date(nextPayment.dueDate) : undefined,
        status,
      },
    });
  }

  private async sendPaymentConfirmation(payment: any): Promise<void> {
    const client = await prisma.user.findUnique({
      where: { id: payment.clientId },
    });

    if (!client?.email || payment.status !== 'SUCCEEDED') return;

    await sendEmail({
      to: client.email,
      subject: 'Payment Confirmation - Vasquez Law Firm',
      html: `
        <h2>Payment Confirmation</h2>
        <p>Dear ${client.name},</p>
        <p>Your payment of $${payment.amount} has been successfully processed.</p>
        <p>Transaction ID: ${payment.transactionId}</p>
        <p>Date: ${payment.processedDate}</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/payments/${payment.id}">View Receipt</a></p>
        <p>Thank you for your payment.</p>
      `,
      text: `Payment Confirmation\n\nDear ${client.name},\n\nYour payment of $${payment.amount} has been successfully processed.\n\nTransaction ID: ${payment.transactionId}\nDate: ${payment.processedDate}\n\nView receipt at: ${process.env.NEXT_PUBLIC_APP_URL}/portal/payments/${payment.id}\n\nThank you for your payment.`,
    });
  }

  private async sendPaymentPlanAgreement(plan: any): Promise<void> {
    const client = await prisma.user.findUnique({
      where: { id: plan.clientId },
    });

    if (!client?.email) return;

    await sendEmail({
      to: client.email,
      subject: 'Payment Plan Agreement - Vasquez Law Firm',
      html: `
        <h2>Payment Plan Agreement</h2>
        <p>Dear ${client.name},</p>
        <p>Your payment plan has been created:</p>
        <ul>
          <li>Total Amount: $${plan.totalAmount}</li>
          <li>Monthly Payment: $${plan.monthlyPayment}</li>
          <li>Number of Payments: ${plan.numberOfPayments}</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/payment-plans/${plan.id}">View Agreement</a></p>
      `,
      text: `Payment Plan Agreement\n\nDear ${client.name},\n\nYour payment plan has been created:\n\nTotal Amount: $${plan.totalAmount}\nMonthly Payment: $${plan.monthlyPayment}\nNumber of Payments: ${plan.numberOfPayments}\n\nView agreement at: ${process.env.NEXT_PUBLIC_APP_URL}/portal/payment-plans/${plan.id}`,
    });
  }

  private async createTrustAccountAuditLog(params: any): Promise<void> {
    // TODO: Implement audit log when AuditLog model is added to schema
    logger.info('Trust account audit log', {
      entityType: 'trust_account',
      entityId: params.accountId,
      action: params.action,
      performedBy: params.performedBy,
      amount: params.amount,
      description: params.details,
    });
  }

  // Mapping methods

  private mapToInvoice(data: {
    id: string;
    caseId: string | null;
    clientId: string;
    invoiceNumber: string;
    dueDate: Date;
    status: InvoiceStatus;
    lineItems: string | JsonValue;
    subtotal: number;
    tax: number;
    total: number;
    amountPaid: number;
    amountDue: number;
    metadata: unknown;
    createdAt: Date;
    paidAt?: Date | null;
  }): Invoice {
    const metadata = data.metadata as Record<string, unknown>;
    return {
      id: data.id,
      caseId: data.caseId || '',
      clientId: data.clientId,
      invoiceNumber: data.invoiceNumber,
      billingPeriod: metadata?.billingPeriod as { start: Date; end: Date },
      dueDate: data.dueDate,
      status: data.status,
      lineItems: typeof data.lineItems === 'string' ? JSON.parse(data.lineItems) : data.lineItems,
      subtotal: data.subtotal,
      taxRate: (metadata?.taxRate as number) || 0,
      taxAmount: data.tax,
      discountAmount: (metadata?.discountAmount as number) || 0,
      totalAmount: data.total,
      paidAmount: data.amountPaid,
      balanceDue: data.amountDue,
      paymentTerms: (metadata?.paymentTerms as string) || 'Net 30',
      lateFeePercentage: (metadata?.lateFeePercentage as number) || 0,
      acceptedPaymentMethods: (metadata?.acceptedPaymentMethods as PaymentMethod[]) || [],
      issuedDate: (metadata?.issuedDate as Date) || data.createdAt,
      sentDate: metadata?.sentDate as Date,
      viewedDate: metadata?.viewedDate as Date,
      paidDate: data.paidAt || undefined,
      notes: metadata?.notes as string,
      internalNotes: metadata?.internalNotes as string,
      attachments: (metadata?.attachments as string[]) || [],
    };
  }

  private mapToPayment(data: {
    id: string;
    clientEmail: string;
    clientName: string;
    clientPhone?: string | null;
    caseId?: string | null;
    invoiceId?: string | null;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    gatewayTransactionId?: string | null;
    gatewayChargeId?: string | null;
    processedAt?: Date | null;
    description?: string | null;
    metadata: unknown;
    createdAt: Date;
  }): Payment {
    const metadata = data.metadata as Record<string, unknown>;
    return {
      id: data.id,
      clientId: data.clientEmail, // Using email as clientId for compatibility
      caseId: data.caseId || undefined,
      invoiceId: data.invoiceId || undefined,
      amount: data.amount,
      currency: data.currency,
      paymentMethod: data.paymentMethod,
      status: data.status,
      transactionId: data.gatewayTransactionId || undefined,
      checkNumber: metadata?.checkNumber as string,
      processedDate: data.processedAt || undefined,
      processingFee: metadata?.processingFee as number,
      netAmount: metadata?.netAmount as number,
      isRefunded: (metadata?.isRefunded as boolean) || false,
      refundedAmount: metadata?.refundedAmount as number,
      refundReason: metadata?.refundReason as string,
      description: data.description || undefined,
      receiptUrl: metadata?.receiptUrl as string,
      createdAt: data.createdAt,
    };
  }

  private mapToPaymentPlan(data: {
    id: string;
    clientEmail: string;
    clientName: string;
    caseId: string | null;
    totalAmount: number;
    installments: number;
    monthlyAmount: number;
    startDate: Date;
    nextPaymentDate?: Date | null;
    status: PaymentPlanStatus;
    paidAmount: number;
    remainingAmount: number;
    metadata: unknown;
    createdAt: Date;
  }): PaymentPlan {
    const metadata = data.metadata as Record<string, unknown>;
    return {
      id: data.id,
      clientId: data.clientEmail, // Using email as clientId for compatibility
      caseId: data.caseId || '',
      totalAmount: data.totalAmount,
      downPayment: (metadata?.downPayment as number) || 0,
      remainingBalance: data.remainingAmount,
      monthlyPayment: data.monthlyAmount,
      numberOfPayments: data.installments,
      startDate: data.startDate,
      endDate: (metadata?.endDate as Date) || new Date(),
      nextPaymentDate: data.nextPaymentDate || new Date(),
      paymentSchedule: (metadata?.paymentSchedule as PaymentPlan['paymentSchedule']) || [],
      status:
        data.status === 'ACTIVE'
          ? 'active'
          : data.status === 'COMPLETED'
            ? 'completed'
            : 'cancelled',
      completedPayments: (metadata?.completedPayments as number) || 0,
      missedPayments: (metadata?.missedPayments as number) || 0,
      lateFeeAmount: (metadata?.lateFeeAmount as number) || 0,
      gracePeriodDays: (metadata?.gracePeriodDays as number) || 0,
      autoPayEnabled: (metadata?.autoPayEnabled as boolean) || false,
      agreementSignedDate: metadata?.agreementSignedDate as Date,
      notes: metadata?.notes as string,
    };
  }
}

// Export singleton instance
export const clientPortalBillingPayments = new ClientPortalBillingPayments();
