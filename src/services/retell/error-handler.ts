import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { securityLogger } from '@/lib/safe-logger';
// import { ghlService } from '@/services/gohighlevel';  // Removed - using GHL MCP instead
import { getPrismaClient } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import type { TaskType } from '@prisma/client';
import type { RetellContext, RetellErrorInfo } from '@/types/gohighlevel';
import type { AxiosError } from '@/types/axios';

export enum RetellErrorType {
  AUTHENTICATION = 'AUTHENTICATION',
  RATE_LIMIT = 'RATE_LIMIT',
  AGENT_UNAVAILABLE = 'AGENT_UNAVAILABLE',
  CALL_FAILED = 'CALL_FAILED',
  WEBHOOK_VERIFICATION = 'WEBHOOK_VERIFICATION',
  INVALID_PHONE = 'INVALID_PHONE',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN = 'UNKNOWN',
}

export interface RetellError {
  type: RetellErrorType;
  message: string;
  code?: string;
  details?: unknown;
  callId?: string;
  contactId?: string;
  timestamp: Date;
  recoverable: boolean;
  retryAfter?: number; // seconds
}

export class RetellErrorHandler {
  private static instance: RetellErrorHandler;

  static getInstance(): RetellErrorHandler {
    if (!RetellErrorHandler.instance) {
      RetellErrorHandler.instance = new RetellErrorHandler();
    }
    return RetellErrorHandler.instance;
  }

  // Main error handling method
  async handleError(
    error: unknown,
    context?: RetellContext & {
      callId?: string;
      contactId?: string;
      operation?: string;
      metadata?: Record<string, unknown>;
    }
  ): Promise<RetellError> {
    const retellError = this.classifyError(error, context);

    // Log the error
    await this.logError(retellError, context);

    // Handle specific error types
    await this.processErrorType(retellError, context);

    // Notify stakeholders if necessary
    await this.notifyIfRequired(retellError, context);

    return retellError;
  }

  // Classify error type based on error details
  private classifyError(error: unknown, context?: RetellContext): RetellError {
    let type = RetellErrorType.UNKNOWN;
    let recoverable = false;
    let retryAfter: number | undefined;

    // Check HTTP status codes
    const axiosError = error as AxiosError;
    if (axiosError.response?.status) {
      const status = axiosError.response.status;

      switch (status) {
        case 401:
        case 403:
          type = RetellErrorType.AUTHENTICATION;
          recoverable = false;
          break;
        case 429:
          type = RetellErrorType.RATE_LIMIT;
          recoverable = true;
          retryAfter = this.extractRetryAfter(axiosError.response?.headers);
          break;
        case 404:
          if (context?.operation?.includes('agent')) {
            type = RetellErrorType.AGENT_UNAVAILABLE;
            recoverable = true;
          }
          break;
        case 422:
          if ((axiosError.response?.data as { message?: string })?.message?.includes('phone')) {
            type = RetellErrorType.INVALID_PHONE;
            recoverable = false;
          }
          break;
        case 402:
          type = RetellErrorType.INSUFFICIENT_BALANCE;
          recoverable = false;
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          type = RetellErrorType.NETWORK_ERROR;
          recoverable = true;
          retryAfter = 30; // 30 seconds
          break;
      }
    }

    // Check error messages for specific patterns
    if ((error as Error).message) {
      const message = (error as Error).message.toLowerCase();

      if (message.includes('call failed') || message.includes('call ended')) {
        type = RetellErrorType.CALL_FAILED;
        recoverable = true;
      } else if (message.includes('webhook') || message.includes('signature')) {
        type = RetellErrorType.WEBHOOK_VERIFICATION;
        recoverable = false;
      } else if (message.includes('agent') && message.includes('not found')) {
        type = RetellErrorType.AGENT_UNAVAILABLE;
        recoverable = true;
      } else if (message.includes('phone') && message.includes('invalid')) {
        type = RetellErrorType.INVALID_PHONE;
        recoverable = false;
      }
    }

    return {
      type,
      message: (error as Error).message || 'Unknown error occurred',
      code: axiosError.code || (axiosError.response?.data as { code?: string })?.code,
      details: axiosError.response?.data || (error as Error & { details?: unknown }).details,
      callId: context?.callId,
      contactId: context?.contactId,
      timestamp: new Date(),
      recoverable,
      retryAfter,
    };
  }

  // Extract retry-after header
  private extractRetryAfter(headers?: Record<string, string>): number {
    if (!headers) {
      return 60; // Default 1 minute
    }
    const retryAfter = headers['retry-after'] || headers['x-ratelimit-reset'];
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      return isNaN(seconds) ? 60 : seconds;
    }
    return 60; // Default 1 minute
  }

  // Log error to database and external systems
  private async logError(retellError: RetellError, context?: RetellContext) {
    try {
      // Log to Winston/Pino
      logger.error('Retell service error', {
        type: retellError.type,
        message: retellError.message,
        code: retellError.code,
        callId: retellError.callId,
        contactId: retellError.contactId,
        recoverable: retellError.recoverable,
        retryAfter: retellError.retryAfter,
        context,
      });

      // Store in database for analytics
      const prisma = getPrismaClient();
      await prisma.errorLog.create({
        data: {
          service: 'retell',
          errorType: retellError.type,
          message: retellError.message,
          code: retellError.code,
          callId: retellError.callId,
          contactId: retellError.contactId,
          recoverable: retellError.recoverable,
          retryAfter: retellError.retryAfter,
          metadata: JSON.parse(
            JSON.stringify({
              details: retellError.details,
              context,
            })
          ) as Prisma.InputJsonValue,
        },
      });
    } catch (error) {
      // If logging fails, at least log to console
      securityLogger.error('Failed to log Retell error:', error);
      securityLogger.error('Original Retell error:', retellError);
    }
  }

  // Process specific error types
  private async processErrorType(retellError: RetellError, context?: RetellContext) {
    try {
      switch (retellError.type) {
        case RetellErrorType.AUTHENTICATION:
          await this.handleAuthenticationError(retellError, context);
          break;

        case RetellErrorType.RATE_LIMIT:
          await this.handleRateLimitError(retellError, context);
          break;

        case RetellErrorType.AGENT_UNAVAILABLE:
          await this.handleAgentUnavailableError(retellError, context);
          break;

        case RetellErrorType.CALL_FAILED:
          await this.handleCallFailedError(retellError, context);
          break;

        case RetellErrorType.INVALID_PHONE:
          await this.handleInvalidPhoneError(retellError, context);
          break;

        case RetellErrorType.INSUFFICIENT_BALANCE:
          await this.handleInsufficientBalanceError(retellError, context);
          break;

        default:
          // Generic error handling
          await this.handleGenericError(retellError, context);
      }
    } catch (error) {
      logger.error('Failed to process error type:', errorToLogMeta(error));
    }
  }

  // Handle authentication errors
  private async handleAuthenticationError(retellError: RetellError, context?: RetellContext) {
    logger.error('Retell authentication error - check API key', {
      callId: retellError.callId,
      context,
    });

    // Update contact in GHL with error status
    if (retellError.contactId) {
      await this.updateContactWithError(retellError.contactId, {
        message: 'Authentication failed',
        error: 'Authentication failed',
        timestamp: retellError.timestamp,
        retryCount: 0,
      });
    }

    // Create admin task to check configuration
    await this.createAdminTask({
      title: 'Retell Authentication Error',
      description: 'Retell API authentication failed. Please check API key configuration.',
      priority: 'high',
      type: 'system_error',
    });
  }

  // Handle rate limit errors
  private async handleRateLimitError(retellError: RetellError, context?: RetellContext) {
    logger.warn('Retell rate limit reached', {
      retryAfter: retellError.retryAfter,
      callId: retellError.callId,
    });

    // Schedule retry if possible
    if (retellError.recoverable && context?.operation) {
      await this.scheduleRetry(context.operation, retellError.retryAfter || 60, context);
    }

    // Update contact status
    if (retellError.contactId) {
      await this.updateContactWithError(retellError.contactId, {
        message: 'Rate limit reached - call will be retried',
        error: 'Rate limit reached - call will be retried',
        retryAfter: retellError.retryAfter,
        timestamp: retellError.timestamp,
        retryCount: 0,
      });
    }
  }

  // Handle agent unavailable errors
  private async handleAgentUnavailableError(retellError: RetellError, context?: RetellContext) {
    logger.warn('Retell agent unavailable', {
      callId: retellError.callId,
      context,
    });

    // Try to find alternative agent
    const alternativeAgent = await this.findAlternativeAgent(context);

    if (alternativeAgent) {
      logger.info('Found alternative agent', { agentId: alternativeAgent });

      // Schedule retry with alternative agent
      await this.scheduleRetry(
        context?.operation || 'create-call',
        5, // 5 seconds
        { ...context, agentId: alternativeAgent }
      );
    } else {
      // No alternative found - create callback task
      await this.createCallbackTask(retellError, context);
    }
  }

  // Handle call failed errors
  private async handleCallFailedError(retellError: RetellError, context?: RetellContext) {
    logger.warn('Retell call failed', {
      callId: retellError.callId,
      reason: retellError.message,
    });

    // Update call status in database
    if (retellError.callId) {
      const prisma = getPrismaClient();
      await prisma.voiceCall.updateMany({
        where: { retellCallId: retellError.callId },
        data: {
          status: 'failed',
          error: retellError.message,
          metadata: JSON.parse(
            JSON.stringify({
              errorDetails: retellError.details,
              failureTimestamp: retellError.timestamp,
            })
          ) as Prisma.InputJsonValue,
        },
      });
    }

    // Update GHL contact
    if (retellError.contactId) {
      await this.updateContactWithError(retellError.contactId, {
        message: retellError.message,
        error: 'Call failed',
        reason: retellError.message,
        timestamp: retellError.timestamp,
        retryCount: 0,
      });

      // Create follow-up task
      await ghlService.createTask({
        contactId: retellError.contactId,
        title: 'Call Failed - Manual Follow-up Required',
        body: `Automated call failed: ${retellError.message}. Please contact manually.`,
        dueDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      });
    }
  }

  // Handle invalid phone errors
  private async handleInvalidPhoneError(retellError: RetellError, context?: RetellContext) {
    logger.warn('Invalid phone number for call', {
      callId: retellError.callId,
      phone: context?.phoneNumber,
    });

    // Update contact with invalid phone flag
    if (retellError.contactId) {
      await this.updateContactWithError(retellError.contactId, {
        message: 'Invalid phone number',
        error: 'Invalid phone number',
        phoneNumber: context?.phoneNumber,
        timestamp: retellError.timestamp,
        retryCount: 0,
      });

      // Add tag for invalid phone
      await ghlService.updateContact(retellError.contactId, {
        tags: ['invalid-phone', 'needs-phone-update'],
      });

      // Create task to verify phone number
      await ghlService.createTask({
        contactId: retellError.contactId,
        title: 'Verify Phone Number',
        body: `Phone number ${context?.phoneNumber} is invalid. Please verify and update contact information.`,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });
    }
  }

  // Handle insufficient balance errors
  private async handleInsufficientBalanceError(retellError: RetellError, context?: RetellContext) {
    logger.error('Insufficient Retell account balance', {
      callId: retellError.callId,
    });

    // Create high-priority admin task
    await this.createAdminTask({
      title: 'Retell Account Balance Low',
      description:
        'Retell account has insufficient balance for calls. Please add funds immediately.',
      priority: 'urgent',
      type: 'billing_issue',
    });

    // Update contact with service unavailable message
    if (retellError.contactId) {
      await this.updateContactWithError(retellError.contactId, {
        message: 'Service temporarily unavailable',
        error: 'Service temporarily unavailable',
        timestamp: retellError.timestamp,
        retryCount: 0,
      });

      // Send SMS if possible
      try {
        await ghlService.sendSMS({
          contactId: retellError.contactId,
          message:
            'We apologize, but our voice service is temporarily unavailable. Please call us directly at 1-844-YO-PELEO or reply to this message.',
        });
      } catch (smsError) {
        logger.error('Failed to send SMS after balance error:', errorToLogMeta(smsError));
      }
    }
  }

  // Generic error handling
  private async handleGenericError(retellError: RetellError, context?: RetellContext) {
    logger.error('Generic Retell error', {
      type: retellError.type,
      message: retellError.message,
      callId: retellError.callId,
    });

    // If recoverable, schedule retry
    if (retellError.recoverable && context?.operation) {
      await this.scheduleRetry(context.operation, retellError.retryAfter || 30, context);
    } else if (retellError.contactId) {
      // Create manual follow-up task
      await this.createCallbackTask(retellError, context);
    }
  }

  // Update GHL contact with error information
  private async updateContactWithError(contactId: string, errorInfo: RetellErrorInfo) {
    try {
      const contact = await ghlService.getContact(contactId);
      if (contact) {
        await ghlService.updateContact(contactId, {
          customFields: {
            ...contact.customFields,
            lastCallError: errorInfo.error,
            lastCallErrorTime: errorInfo.timestamp.toISOString(),
            callErrors: JSON.stringify(
              [
                ...JSON.parse(
                  typeof contact.customFields?.callErrors === 'string'
                    ? contact.customFields.callErrors
                    : '[]'
                ),
                errorInfo,
              ].slice(-5)
            ), // Keep last 5 errors
          },
        });

        // Add note about the error
        await ghlService.addNote(
          contactId,
          `Call Error: ${errorInfo.error}. ${errorInfo.reason || ''} - ${errorInfo.timestamp.toLocaleString()}`
        );
      }
    } catch (error) {
      logger.error('Failed to update contact with error:', errorToLogMeta(error));
    }
  }

  // Create admin task for system issues
  private async createAdminTask(task: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    type: string;
  }) {
    try {
      const prisma = getPrismaClient();

      // Find admin user
      const adminUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });

      if (adminUser) {
        await prisma.task.create({
          data: {
            title: task.title,
            description: task.description,
            type: task.type as TaskType,
            priority: task.priority,
            status: 'pending',
            createdById: adminUser.id,
            assignedToId: adminUser.id,
            dueDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            metadata: {
              source: 'retell_error_handler',
              autoGenerated: true,
            },
          },
        });
      }
    } catch (error) {
      logger.error('Failed to create admin task:', errorToLogMeta(error));
    }
  }

  // Create callback task for failed calls
  private async createCallbackTask(retellError: RetellError, context?: RetellContext) {
    if (!retellError.contactId) return;

    try {
      await ghlService.createTask({
        contactId: retellError.contactId,
        title: 'Manual Callback Required',
        body: `Automated call failed: ${retellError.message}. Please contact manually to follow up.`,
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      });

      // Add urgent tag if high priority
      if (
        context?.priority === 'high' ||
        retellError.type === RetellErrorType.INSUFFICIENT_BALANCE
      ) {
        const contact = await ghlService.getContact(retellError.contactId);
        if (contact) {
          await ghlService.updateContact(retellError.contactId, {
            tags: [...(contact.tags || []), 'urgent-callback'],
          });
        }
      }
    } catch (error) {
      logger.error('Failed to create callback task:', errorToLogMeta(error));
    }
  }

  // Find alternative agent when primary agent fails
  private async findAlternativeAgent(context?: RetellContext): Promise<string | null> {
    try {
      // Try general agent as fallback
      const { RetellAgentManager } = await import('./agent-manager-v2');
      return await RetellAgentManager.getAgentForPracticeArea('general');
    } catch (error) {
      logger.error('Failed to find alternative agent:', errorToLogMeta(error));
      return null;
    }
  }

  // Schedule retry for failed operations
  private async scheduleRetry(operation: string, delaySeconds: number, context: RetellContext) {
    try {
      // Store retry information in database
      const prisma = getPrismaClient();
      await prisma.retryQueue.create({
        data: {
          operation,
          delaySeconds,
          context: JSON.parse(JSON.stringify(context)) as Prisma.InputJsonValue,
          scheduledFor: new Date(Date.now() + delaySeconds * 1000),
          attempts: 0,
          maxAttempts: 3,
        },
      });

      logger.info('Scheduled retry', {
        operation,
        delaySeconds,
        scheduledFor: new Date(Date.now() + delaySeconds * 1000),
      });
    } catch (error) {
      logger.error('Failed to schedule retry:', errorToLogMeta(error));
    }
  }

  // Get error statistics
  async getErrorStats(timeRange?: { start: Date; end: Date }) {
    try {
      const prisma = getPrismaClient();

      const where: Record<string, unknown> = { service: 'retell' };
      if (timeRange) {
        where.createdAt = {
          gte: timeRange.start,
          lte: timeRange.end,
        };
      }

      const errors = await prisma.errorLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      const stats = {
        total: errors.length,
        byType: {} as Record<string, number>,
        recoverable: 0,
        nonRecoverable: 0,
        mostCommon: '',
        errorRate: 0, // Will need total calls to calculate
      };

      errors.forEach(error => {
        stats.byType[error.errorType] = (stats.byType[error.errorType] || 0) + 1;

        if (error.recoverable) {
          stats.recoverable++;
        } else {
          stats.nonRecoverable++;
        }
      });

      // Find most common error type
      const sortedTypes = Object.entries(stats.byType).sort((a, b) => b[1] - a[1]);
      stats.mostCommon = sortedTypes[0]?.[0] || 'none';

      return stats;
    } catch (error) {
      logger.error('Failed to get error stats:', errorToLogMeta(error));
      throw error;
    }
  }

  // Notify stakeholders of critical errors
  private async notifyIfRequired(retellError: RetellError, context?: RetellContext) {
    // Only notify for critical, non-recoverable errors
    const criticalErrors = [RetellErrorType.AUTHENTICATION, RetellErrorType.INSUFFICIENT_BALANCE];

    if (criticalErrors.includes(retellError.type)) {
      try {
        // Send email notification if configured
        if (process.env.ADMIN_EMAIL) {
          // Import email service dynamically to avoid circular dependencies
          const { emailService } = await import('@/services/email.service');

          // Log critical error instead of sending email
          logger.error('Critical Retell Error - Email would be sent', {
            type: retellError.type,
            message: retellError.message,
            timestamp: retellError.timestamp.toLocaleString(),
            callId: retellError.callId || 'N/A',
            contactId: retellError.contactId || 'N/A',
          });
        }
      } catch (notificationError) {
        logger.error('Failed to send error notification:', errorToLogMeta(notificationError));
      }
    }
  }
}

// Export singleton instance
export const retellErrorHandler = RetellErrorHandler.getInstance();
