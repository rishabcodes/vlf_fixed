import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { cache, cacheKeys, CacheTTL } from '@/lib/cache';
import { emailQueue } from '@/lib/queue/bull';
import { getPrismaClient } from '@/lib/prisma';
import type { PaymentMetadata } from '@/types/services';
import {
  PaymentGateway,
  PaymentStatus,
  PaymentMethod as PrismaPaymentMethod,
  AccountType,
  RefundStatus,
  PaymentPlanStatus,
  TrustTransactionType,
  Prisma,
  Payment,
  Case,
  PaymentRefund,
  TrustLedger,
} from '@prisma/client';

export interface PaymentIntent {
  amount: number;
  currency: string;
  description: string;
  clientEmail: string;
  clientName: string;
  clientPhone?: string;
  caseId?: string;
  metadata?: PaymentMetadata;
}

export interface PaymentMethod {
  type: 'card' | 'ach';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  accountNumber?: string;
  routingNumber?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  transactionId?: string;
  chargeId?: string;
  authCode?: string;
  reference?: string;
  amount?: number;
  error?: string;
  gateway?: 'authorize.net' | 'lawpay';
}

export interface TrustAccountTransaction {
  date: Date;
  transactionId: string;
  amount: number;
  clientName: string;
  clientEmail: string;
  caseId?: string;
  description: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  accountType: 'trust' | 'operating';
}

class PaymentService {
  private authorizeNetApiUrl: string;
  private lawPayApiUrl = 'https://api.lawpay.com/v1';

  constructor() {
    this.authorizeNetApiUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://api.authorize.net/xml/v1/request.api'
        : 'https://apitest.authorize.net/xml/v1/request.api';
  }

  /**
   * Process payment through the appropriate gateway
   */
  async processPayment(
    intent: PaymentIntent,
    method: PaymentMethod,
    options: {
      gateway?: 'authorize.net' | 'lawpay';
      trustAccount?: boolean;
    } = {}
  ): Promise<PaymentResult> {
    const prisma = getPrismaClient();

    try {
      // Validate payment amount
      if (intent.amount <= 0) {
        throw new Error('Invalid payment amount');
      }

      // Select gateway based on options or configuration
      const gateway = options.gateway || this.selectGateway(intent, options);

      logger.info('Processing payment', {
        gateway,
        amount: intent.amount,
        clientEmail: intent.clientEmail,
        trustAccount: options.trustAccount,
      });

      // Create payment record with PENDING status
      const payment = await prisma.payment.create({
        data: {
          amount: intent.amount,
          currency: intent.currency || 'USD',
          description: intent.description,
          gateway: this.mapGatewayToEnum(gateway),
          accountType: options.trustAccount ? AccountType.TRUST : AccountType.OPERATING,
          clientEmail: intent.clientEmail,
          clientName: intent.clientName,
          clientPhone: intent.clientPhone,
          caseId: intent.caseId,
          status: PaymentStatus.PENDING,
          paymentMethod: this.mapPaymentMethodToEnum(method.type),
          metadata: (intent.metadata as Prisma.InputJsonValue) || {},
        },
      });

      let result: PaymentResult;

      // Update status to PROCESSING
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.PROCESSING },
      });

      switch (gateway) {
        case 'lawpay':
          result = await this.processLawPayPayment(intent, method, options.trustAccount);
          break;
        case 'authorize.net':
          result = await this.processAuthorizeNetPayment(intent, method);
          break;
        default:
          throw new Error('Invalid payment gateway');
      }

      // Update payment record based on result
      if (result.success) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.SUCCEEDED,
            gatewayTransactionId: result.transactionId,
            gatewayChargeId: result.chargeId,
            gatewayReference: result.reference,
            authCode: result.authCode,
            processedAt: new Date(),
            last4: method.cardNumber
              ? method.cardNumber.slice(-4)
              : method.accountNumber?.slice(-4),
          },
        });

        // Log to trust ledger if trust account
        if (options.trustAccount) {
          await this.recordTrustTransaction(payment.id, intent, result);
        }

        // Send receipt email
        await this.sendReceipt(intent, result, payment.id);

        // Clear payment-related cache
        await cache.deletePattern(`payment:*:${intent.clientEmail}`);

        result.paymentId = payment.id;
      } else {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: PaymentStatus.FAILED,
            failureReason: result.error,
          },
        });
      }

      return result;
    } catch (error) {
      logger.error('Payment processing error:', errorToLogMeta(error));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  /**
   * Process payment through Authorize.Net
   */
  private async processAuthorizeNetPayment(
    intent: PaymentIntent,
    method: PaymentMethod
  ): Promise<PaymentResult> {
    if (method.type !== 'card') {
      throw new Error('Authorize.Net only supports card payments');
    }

    const apiLoginId = process.env.AUTHORIZENET_LOGIN_ID;
    const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY;

    if (!apiLoginId || !transactionKey) {
      throw new Error('Authorize.Net credentials not configured');
    }

    const chargeRequest = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: apiLoginId,
          transactionKey: transactionKey,
        },
        transactionRequest: {
          transactionType: 'authCaptureTransaction',
          amount: intent.amount.toFixed(2),
          payment: {
            creditCard: {
              cardNumber: method.cardNumber,
              expirationDate: method.expiryDate,
              cardCode: method.cvv,
            },
          },
          customer: {
            email: intent.clientEmail,
          },
          billTo: {
            firstName: intent.clientName.split(' ')[0] || intent.clientName,
            lastName: intent.clientName.split(' ').slice(1).join(' ') || '',
            email: intent.clientEmail,
          },
          order: {
            description: intent.description,
          },
          transactionSettings: {
            setting: [
              {
                settingName: 'emailCustomer',
                settingValue: 'true',
              },
            ],
          },
        },
      },
    };

    const response = await fetch(this.authorizeNetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chargeRequest),
    });

    const result = await response.json();

    if (result.messages?.resultCode === 'Ok') {
      return {
        success: true,
        transactionId: result.transactionResponse?.transId,
        authCode: result.transactionResponse?.authCode,
        amount: intent.amount,
        gateway: 'authorize.net',
      };
    } else {
      return {
        success: false,
        error: result.messages?.message?.[0]?.text || 'Payment failed',
        gateway: 'authorize.net',
      };
    }
  }

  /**
   * Process payment through LawPay
   */
  private async processLawPayPayment(
    intent: PaymentIntent,
    method: PaymentMethod,
    trustAccount?: boolean
  ): Promise<PaymentResult> {
    const publicKey = process.env.LAWPAY_PUBLIC_KEY;
    const secretKey = process.env.LAWPAY_SECRET_KEY;
    const trustAccountId = process.env.LAWPAY_TRUST_ACCOUNT_ID;
    const operatingAccountId = process.env.LAWPAY_OPERATING_ACCOUNT_ID;

    if (!publicKey || !secretKey) {
      throw new Error('LawPay credentials not configured');
    }

    const accountId = trustAccount ? trustAccountId : operatingAccountId;
    if (!accountId) {
      throw new Error('LawPay account ID not configured');
    }

    // Create payment token
    const tokenResponse = await fetch(`${this.lawPayApiUrl}/tokens`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${publicKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: {
          type: method.type,
          card_number: method.cardNumber,
          exp_month: method.expiryDate?.split('/')[0],
          exp_year: method.expiryDate?.split('/')[1],
          cvv: method.cvv,
          account_number: method.accountNumber,
          routing_number: method.routingNumber,
        },
        email: intent.clientEmail,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.id) {
      throw new Error('Failed to create payment token');
    }

    // Create charge
    const chargeResponse = await fetch(`${this.lawPayApiUrl}/charges`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(intent.amount * 100),
        currency: intent.currency || 'USD',
        description: intent.description,
        token_id: tokenData.id,
        account_id: accountId,
        reference: `VLF-${Date.now()}`,
        metadata: {
          client_email: intent.clientEmail,
          client_name: intent.clientName,
          case_id: intent.caseId,
          matter_description: intent.description,
          trust_account: trustAccount,
          ...intent.metadata,
        },
        email: {
          to: intent.clientEmail,
          subject: 'Payment Receipt - Vasquez Law Firm',
          receipt: true,
        },
      }),
    });

    const chargeData = await chargeResponse.json();

    if (chargeData.id && chargeData.status === 'succeeded') {
      return {
        success: true,
        chargeId: chargeData.id,
        reference: chargeData.reference,
        amount: chargeData.amount / 100,
        gateway: 'lawpay',
      };
    } else {
      return {
        success: false,
        error: chargeData.error?.message || 'Payment failed',
        gateway: 'lawpay',
      };
    }
  }

  /**
   * Select appropriate payment gateway based on rules
   */
  private selectGateway(
    intent: PaymentIntent,
    options: { trustAccount?: boolean }
  ): 'authorize.net' | 'lawpay' | 'stripe' {
    // LawPay for trust accounts
    if (options.trustAccount) {
      return 'lawpay';
    }

    // LawPay for legal-specific transactions
    if (intent.metadata?.legalService) {
      return 'lawpay';
    }

    // Default to Authorize.Net for general payments
    return 'authorize.net';
  }

  /**
   * Record trust account transaction
   */
  private async recordTrustTransaction(
    paymentId: string,
    intent: PaymentIntent,
    result: PaymentResult
  ): Promise<void> {
    const prisma = getPrismaClient();

    // Get current balance
    const lastLedgerEntry = await prisma.trustLedger.findFirst({
      where: {
        clientEmail: intent.clientEmail,
        caseId: intent.caseId,
      },
      orderBy: { createdAt: 'desc' },
    });

    const currentBalance = lastLedgerEntry?.balance || 0;
    const newBalance = currentBalance + (result.amount || intent.amount);

    await prisma.trustLedger.create({
      data: {
        transactionType: TrustTransactionType.DEPOSIT,
        amount: result.amount || intent.amount,
        balance: newBalance,
        clientName: intent.clientName,
        clientEmail: intent.clientEmail,
        caseId: intent.caseId,
        paymentId: paymentId,
        reference: result.reference || result.transactionId || '',
        description: intent.description,
        recordedBy: 'system',
        metadata: {
          gateway: result.gateway,
          chargeId: result.chargeId,
        },
      },
    });

    logger.info('Trust transaction recorded', {
      paymentId,
      clientEmail: intent.clientEmail,
      amount: result.amount,
      newBalance,
    });
  }

  /**
   * Send payment receipt email
   */
  private async sendReceipt(
    intent: PaymentIntent,
    result: PaymentResult,
    paymentId: string
  ): Promise<void> {
    await emailQueue.add('send-receipt', {
      to: intent.clientEmail,
      subject: 'Payment Receipt - Vasquez Law Firm',
      template: 'payment-receipt',
      data: {
        clientName: intent.clientName,
        amount: result.amount || intent.amount,
        transactionId: result.transactionId || result.chargeId,
        reference: result.reference,
        description: intent.description,
        date: new Date().toLocaleDateString(),
        gateway: result.gateway,
        paymentId,
      },
    });
  }

  /**
   * Get payment history for a client
   */
  async getPaymentHistory(
    clientEmail: string,
    options: {
      caseId?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<Array<Payment & { case: Case | null; refunds: PaymentRefund[] }>> {
    const cacheKey = cacheKeys.paymentSession(`history:${clientEmail}:${options.caseId || 'all'}`);

    return cache.remember(
      cacheKey,
      async () => {
        const prisma = getPrismaClient();

        const where: Prisma.PaymentWhereInput = {
          clientEmail,
          ...(options.caseId && { caseId: options.caseId }),
        };

        const payments = await prisma.payment.findMany({
          where,
          include: {
            case: true,
            refunds: true,
          },
          orderBy: { createdAt: 'desc' },
          take: options.limit || 50,
          skip: options.offset || 0,
        });

        return payments;
      },
      CacheTTL.LONG
    );
  }

  /**
   * Refund a payment
   */
  async refundPayment(
    paymentId: string,
    amount?: number,
    reason?: string,
    refundedBy: string = 'system'
  ): Promise<PaymentResult> {
    const prisma = getPrismaClient();

    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { refunds: true },
      });

      if (!payment) {
        throw new Error('Payment not found');
      }

      if (payment.status !== PaymentStatus.SUCCEEDED) {
        throw new Error('Only successful payments can be refunded');
      }

      // Calculate refund amount
      const refundAmount = amount || payment.amount;
      const totalRefunded = payment.refunds.reduce((sum, r) => sum + r.amount, 0);

      if (totalRefunded + refundAmount > payment.amount) {
        throw new Error('Refund amount exceeds payment amount');
      }

      // Create refund record
      const refund = await prisma.paymentRefund.create({
        data: {
          paymentId: payment.id,
          amount: refundAmount,
          reason: reason || 'Customer requested refund',
          status: RefundStatus.PENDING,
          createdBy: refundedBy,
        },
      });

      // Process refund based on gateway
      let result: PaymentResult = { success: false };

      switch (payment.gateway) {
        case PaymentGateway.LAWPAY:
          result = await this.processLawPayRefund(
            {
              id: payment.id,
              transactionId: payment.gatewayTransactionId || payment.id,
              gatewayChargeId: payment.gatewayChargeId || undefined,
              metadata: payment.metadata as Record<string, unknown>,
            },
            refundAmount
          );
          break;
        case PaymentGateway.AUTHORIZE_NET:
          result = await this.processAuthorizeNetRefund(
            {
              id: payment.id,
              transactionId: payment.gatewayTransactionId || payment.id,
              gatewayTransactionId: payment.gatewayTransactionId || undefined,
              last4: payment.last4 || undefined,
              metadata: payment.metadata as Record<string, unknown>,
            },
            refundAmount
          );
          break;
      }

      // Update refund status
      if (result.success) {
        await prisma.paymentRefund.update({
          where: { id: refund.id },
          data: {
            status: RefundStatus.COMPLETED,
            gatewayRefundId: result.transactionId,
            processedAt: new Date(),
          },
        });

        // Update payment status
        const isFullRefund = totalRefunded + refundAmount === payment.amount;
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: isFullRefund ? PaymentStatus.REFUNDED : PaymentStatus.PARTIALLY_REFUNDED,
            refundedAt: new Date(),
          },
        });

        // Record trust transaction if applicable
        if (payment.accountType === AccountType.TRUST) {
          await this.recordTrustRefund(
            {
              id: payment.id,
              clientName: payment.clientName,
              clientEmail: payment.clientEmail,
              amount: payment.amount,
              caseId: payment.caseId,
              gatewayTransactionId: payment.gatewayTransactionId || undefined,
            },
            refundAmount
          );
        }

        // Send refund notification
        await this.sendRefundNotification(
          {
            id: payment.id,
            clientName: payment.clientName,
            clientEmail: payment.clientEmail,
            amount: payment.amount,
            transactionId: payment.gatewayTransactionId || payment.id,
            gatewayTransactionId: payment.gatewayTransactionId,
          },
          refundAmount
        );
      } else {
        await prisma.paymentRefund.update({
          where: { id: refund.id },
          data: {
            status: RefundStatus.FAILED,
          },
        });
      }

      return result;
    } catch (error) {
      logger.error('Refund processing error:', errorToLogMeta(error));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Refund processing failed',
      };
    }
  }

  /**
   * Process LawPay refund
   */
  private async processLawPayRefund(
    payment: {
      id: string;
      transactionId: string;
      gatewayChargeId?: string;
      metadata?: Record<string, unknown>;
    },
    amount: number
  ): Promise<PaymentResult> {
    const secretKey = process.env.LAWPAY_SECRET_KEY;

    if (!secretKey) {
      throw new Error('LawPay credentials not configured');
    }

    const refundResponse = await fetch(`${this.lawPayApiUrl}/refunds`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        charge_id: payment.gatewayChargeId,
        amount: Math.round(amount * 100),
      }),
    });

    const refundData = await refundResponse.json();

    if (refundData.id && refundData.status === 'succeeded') {
      return {
        success: true,
        transactionId: refundData.id,
        amount: refundData.amount / 100,
        gateway: 'lawpay',
      };
    } else {
      return {
        success: false,
        error: refundData.error?.message || 'Refund failed',
        gateway: 'lawpay',
      };
    }
  }

  /**
   * Process Authorize.Net refund
   */
  private async processAuthorizeNetRefund(
    payment: {
      id: string;
      transactionId: string;
      gatewayTransactionId?: string;
      last4?: string;
      metadata?: Record<string, unknown>;
    },
    amount: number
  ): Promise<PaymentResult> {
    const apiLoginId = process.env.AUTHORIZENET_LOGIN_ID;
    const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY;

    if (!apiLoginId || !transactionKey) {
      throw new Error('Authorize.Net credentials not configured');
    }

    const refundRequest = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: apiLoginId,
          transactionKey: transactionKey,
        },
        transactionRequest: {
          transactionType: 'refundTransaction',
          amount: amount.toFixed(2),
          payment: {
            creditCard: {
              cardNumber: payment.last4 ? `XXXX${payment.last4}` : 'XXXX',
              expirationDate: 'XXXX',
            },
          },
          refTransId: payment.gatewayTransactionId,
        },
      },
    };

    const response = await fetch(this.authorizeNetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refundRequest),
    });

    const result = await response.json();

    if (result.messages?.resultCode === 'Ok') {
      return {
        success: true,
        transactionId: result.transactionResponse?.transId,
        amount: amount,
        gateway: 'authorize.net',
      };
    } else {
      return {
        success: false,
        error: result.messages?.message?.[0]?.text || 'Refund failed',
        gateway: 'authorize.net',
      };
    }
  }

  /**
   * Record trust account refund
   */
  private async recordTrustRefund(
    payment: {
      id: string;
      clientName?: string | null;
      clientEmail?: string | null;
      amount: number;
      caseId?: string | null;
      gatewayTransactionId?: string | null;
    },
    amount: number
  ): Promise<void> {
    const prisma = getPrismaClient();

    // Get current balance
    const lastLedgerEntry = await prisma.trustLedger.findFirst({
      where: {
        clientEmail: payment.clientEmail || undefined,
        caseId: payment.caseId || undefined,
      },
      orderBy: { createdAt: 'desc' },
    });

    const currentBalance = lastLedgerEntry?.balance || 0;
    const newBalance = currentBalance - amount;

    await prisma.trustLedger.create({
      data: {
        transactionType: TrustTransactionType.WITHDRAWAL,
        amount: amount,
        balance: newBalance,
        clientName: payment.clientName || '',
        clientEmail: payment.clientEmail || '',
        caseId: payment.caseId || undefined,
        paymentId: payment.id,
        reference: `REFUND-${payment.gatewayTransactionId}`,
        description: `Refund for payment ${payment.id}`,
        recordedBy: 'system',
      },
    });
  }

  /**
   * Send refund notification
   */
  private async sendRefundNotification(
    payment: {
      id: string;
      clientName?: string | null;
      clientEmail?: string | null;
      amount: number;
      transactionId: string;
      gatewayTransactionId?: string | null;
    },
    amount: number
  ): Promise<void> {
    await emailQueue.add('send-refund-notification', {
      to: payment.clientEmail,
      subject: 'Refund Processed - Vasquez Law Firm',
      template: 'payment-refund',
      data: {
        clientName: payment.clientName,
        amount: amount,
        originalAmount: payment.amount,
        transactionId: payment.gatewayTransactionId || payment.transactionId,
        date: new Date().toLocaleDateString(),
      },
    });
  }

  /**
   * Create payment plan
   */
  async createPaymentPlan(
    clientEmail: string,
    clientName: string,
    totalAmount: number,
    installments: number,
    startDate: Date,
    caseId?: string
  ): Promise<{
    id: string;
    monthlyAmount: number;
    nextPaymentDate: Date;
  }> {
    const prisma = getPrismaClient();

    try {
      const monthlyAmount = totalAmount / installments;

      const paymentPlan = await prisma.paymentPlan.create({
        data: {
          clientEmail,
          clientName,
          caseId,
          totalAmount,
          installments,
          monthlyAmount,
          startDate,
          nextPaymentDate: startDate,
          status: PaymentPlanStatus.ACTIVE,
          remainingAmount: totalAmount,
        },
      });

      logger.info('Payment plan created', {
        id: paymentPlan.id,
        clientEmail,
        totalAmount,
        installments,
      });

      // Send confirmation email
      await emailQueue.add('payment-plan-created', {
        to: clientEmail,
        subject: 'Payment Plan Confirmation - Vasquez Law Firm',
        template: 'payment-plan-confirmation',
        data: {
          clientName,
          totalAmount,
          installments,
          monthlyAmount,
          startDate: startDate.toLocaleDateString(),
          planId: paymentPlan.id,
        },
      });

      return {
        id: paymentPlan.id,
        monthlyAmount: paymentPlan.monthlyAmount,
        nextPaymentDate: paymentPlan.nextPaymentDate || new Date(),
      };
    } catch (error) {
      logger.error('Error creating payment plan:', errorToLogMeta(error));
      throw error;
    }
  }

  /**
   * Process payment plan installment
   */
  async processPaymentPlanInstallment(planId: string): Promise<PaymentResult> {
    const prisma = getPrismaClient();

    try {
      const plan = await prisma.paymentPlan.findUnique({
        where: { id: planId },
      });

      if (!plan) {
        throw new Error('Payment plan not found');
      }

      if (plan.status !== PaymentPlanStatus.ACTIVE) {
        throw new Error('Payment plan is not active');
      }

      // Process payment for the monthly amount
      // TODO: Implement stored payment method for payment plans
      // const paymentIntent: PaymentIntent = {
      //   amount: plan.monthlyAmount,
      //   currency: 'USD',
      //   description: `Payment plan installment - ${plan.id}`,
      //   clientEmail: plan.clientEmail,
      //   clientName: plan.clientName,
      //   caseId: plan.caseId || undefined,
      //   metadata: {
      //     paymentPlanId: plan.id,
      //     installmentNumber:
      //       Math.ceil((plan.totalAmount - plan.remainingAmount) / plan.monthlyAmount) + 1,
      //   },
      // };

      // This would need the stored payment method, which we'd add to the PaymentPlan model
      // For now, this is a placeholder
      const result: PaymentResult = {
        success: false,
        error: 'Payment method not implemented for plans',
      };

      if (result.success) {
        // Update payment plan
        const newPaidAmount = plan.paidAmount + plan.monthlyAmount;
        const newRemainingAmount = plan.totalAmount - newPaidAmount;
        const isComplete = newRemainingAmount <= 0;

        await prisma.paymentPlan.update({
          where: { id: planId },
          data: {
            paidAmount: newPaidAmount,
            remainingAmount: Math.max(0, newRemainingAmount),
            nextPaymentDate: isComplete
              ? null
              : plan.nextPaymentDate
                ? new Date(plan.nextPaymentDate.getTime() + 30 * 24 * 60 * 60 * 1000)
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: isComplete ? PaymentPlanStatus.COMPLETED : PaymentPlanStatus.ACTIVE,
          },
        });
      }

      return result;
    } catch (error) {
      logger.error('Error processing payment plan installment:', errorToLogMeta(error));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment plan processing failed',
      };
    }
  }

  /**
   * Get trust account balance
   */
  async getTrustAccountBalance(clientEmail: string, caseId?: string): Promise<number> {
    const prisma = getPrismaClient();

    const lastEntry = await prisma.trustLedger.findFirst({
      where: {
        clientEmail,
        ...(caseId && { caseId }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return lastEntry?.balance || 0;
  }

  /**
   * Get trust account transactions
   */
  async getTrustAccountTransactions(
    clientEmail: string,
    options: {
      caseId?: string;
      startDate?: Date;
      endDate?: Date;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<Array<TrustLedger & { case: Case | null }>> {
    const prisma = getPrismaClient();

    const where: Prisma.TrustLedgerWhereInput = {
      clientEmail,
      ...(options.caseId && { caseId: options.caseId }),
      ...((options.startDate || options.endDate) && {
        createdAt: {
          ...(options.startDate && { gte: options.startDate }),
          ...(options.endDate && { lte: options.endDate }),
        },
      }),
    };

    const transactions = await prisma.trustLedger.findMany({
      where,
      include: {
        case: true,
      },
      orderBy: { createdAt: 'desc' },
      take: options.limit || 50,
      skip: options.offset || 0,
    });

    return transactions;
  }

  /**
   * Helper to map gateway string to enum
   */
  private mapGatewayToEnum(gateway: string): PaymentGateway {
    switch (gateway) {
      case 'stripe':
        return PaymentGateway.STRIPE;
      case 'lawpay':
        return PaymentGateway.LAWPAY;
      case 'authorize.net':
        return PaymentGateway.AUTHORIZE_NET;
      default:
        throw new Error(`Invalid gateway: ${gateway}`);
    }
  }

  /**
   * Helper to map payment method to enum
   */
  private mapPaymentMethodToEnum(method: string): PrismaPaymentMethod {
    switch (method) {
      case 'card':
        return PrismaPaymentMethod.CARD;
      case 'ach':
        return PrismaPaymentMethod.ACH;
      default:
        return PrismaPaymentMethod.CARD;
    }
  }
}

export const paymentService = new PaymentService();
