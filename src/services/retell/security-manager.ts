import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import crypto from 'crypto';
import type { Prisma } from '@prisma/client';

interface SecurityConfig {
  webhookSecret: string;
  apiKey: string;
  rateLimits: {
    callsPerMinute: number;
    callsPerHour: number;
    callsPerDay: number;
  };
  allowedOrigins: string[];
  ipWhitelist?: string[];
}

interface SecurityValidation {
  isValid: boolean;
  reason?: string;
  riskLevel: 'low' | 'medium' | 'high';
  shouldBlock: boolean;
}

interface RateLimitStatus {
  isLimited: boolean;
  remainingCalls: number;
  resetTime: Date;
  period: 'minute' | 'hour' | 'day';
}

export class SecurityManager {
  private static instance: SecurityManager;
  private config: SecurityConfig;
  private rateLimitCache: Map<string, { count: number; resetTime: number }> = new Map();

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  constructor() {
    this.config = {
      webhookSecret: process.env.RETELL_WEBHOOK_SECRET || '',
      apiKey: process.env.RETELL_API_KEY || '',
      rateLimits: {
        callsPerMinute: parseInt(process.env.RETELL_CALLS_PER_MINUTE || '10', 10),
        callsPerHour: parseInt(process.env.RETELL_CALLS_PER_HOUR || '100', 10),
        callsPerDay: parseInt(process.env.RETELL_CALLS_PER_DAY || '500', 10),
      },
      allowedOrigins: [
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'https://api.retellai.com',
        'https://retellai.com',
      ],
      ipWhitelist: process.env.RETELL_IP_WHITELIST?.split(',').map(ip => ip.trim()),
    };
  }

  // Verify webhook signature
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      if (!this.config.webhookSecret) {
        logger.warn('Webhook secret not configured - skipping verification');
        return true; // Allow in development
      }

      // Remove any prefix like "sha256="
      const cleanSignature = signature.replace(/^sha256=/, '');

      // Create expected signature
      const expectedSignature = crypto
        .createHmac('sha256', this.config.webhookSecret)
        .update(payload, 'utf8')
        .digest('hex');

      // Use timing-safe comparison
      return crypto.timingSafeEqual(
        Buffer.from(cleanSignature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      );
    } catch (error) {
      logger.error('Error verifying webhook signature:', errorToLogMeta(error));
      return false;
    }
  }

  // Validate API request
  async validateAPIRequest(
    apiKey: string,
    origin?: string,
    userAgent?: string,
    ip?: string
  ): Promise<SecurityValidation> {
    try {
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      const reasons: string[] = [];

      // Check API key
      if (!apiKey || apiKey !== this.config.apiKey) {
        return {
          isValid: false,
          reason: 'Invalid API key',
          riskLevel: 'high',
          shouldBlock: true,
        };
      }

      // Check origin if provided
      if (origin && !this.config.allowedOrigins.includes(origin)) {
        reasons.push('Unauthorized origin');
        riskLevel = 'medium';
      }

      // Check IP whitelist if configured
      if (this.config.ipWhitelist && ip && !this.config.ipWhitelist.includes(ip)) {
        reasons.push('IP not whitelisted');
        riskLevel = 'high';
      }

      // Check user agent for suspicious patterns
      if (userAgent) {
        const suspiciousPatterns = [
          /bot/i,
          /crawler/i,
          /spider/i,
          /scraper/i,
          /hack/i,
          /curl/i,
          /wget/i,
        ];

        if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
          reasons.push('Suspicious user agent');
          riskLevel = 'medium';
        }
      }

      // Log security event if medium or high risk
      if (riskLevel !== 'low') {
        await this.logSecurityEvent({
          type: 'api_request_validation',
          riskLevel,
          details: {
            origin: origin || '',
            userAgent: userAgent || '',
            ip: ip || '',
            reasons,
          },
        });
      }

      return {
        isValid: riskLevel !== 'high',
        reason: reasons.join(', '),
        riskLevel,
        shouldBlock: riskLevel === 'high',
      };
    } catch (error) {
      logger.error('Error validating API request:', errorToLogMeta(error));
      return {
        isValid: false,
        reason: 'Validation error',
        riskLevel: 'high',
        shouldBlock: true,
      };
    }
  }

  // Check rate limits
  async checkRateLimit(
    identifier: string,
    period: 'minute' | 'hour' | 'day' = 'minute'
  ): Promise<RateLimitStatus> {
    try {
      const now = Date.now();
      const key = `${identifier}:${period}`;

      // Determine period duration and limit
      let periodMs: number;
      let limit: number;

      switch (period) {
        case 'minute':
          periodMs = 60 * 1000;
          limit = this.config.rateLimits.callsPerMinute;
          break;
        case 'hour':
          periodMs = 60 * 60 * 1000;
          limit = this.config.rateLimits.callsPerHour;
          break;
        case 'day':
          periodMs = 24 * 60 * 60 * 1000;
          limit = this.config.rateLimits.callsPerDay;
          break;
        default:
          throw new Error(`Invalid period: ${period}`);
      }

      // Get or initialize rate limit data
      let rateLimitData = this.rateLimitCache.get(key);
      const resetTime = Math.floor(now / periodMs) * periodMs + periodMs;

      if (!rateLimitData || now >= rateLimitData.resetTime) {
        // Reset or initialize
        rateLimitData = {
          count: 0,
          resetTime,
        };
      }

      // Check if limit exceeded
      if (rateLimitData.count >= limit) {
        await this.logSecurityEvent({
          type: 'rate_limit_exceeded',
          riskLevel: 'medium',
          details: {
            identifier,
            period,
            count: rateLimitData.count,
            limit,
          },
        });

        return {
          isLimited: true,
          remainingCalls: 0,
          resetTime: new Date(rateLimitData.resetTime),
          period,
        };
      }

      // Increment counter
      rateLimitData.count++;
      this.rateLimitCache.set(key, rateLimitData);

      return {
        isLimited: false,
        remainingCalls: limit - rateLimitData.count,
        resetTime: new Date(rateLimitData.resetTime),
        period,
      };
    } catch (error) {
      logger.error('Error checking rate limit:', errorToLogMeta(error));
      // Default to allowing the request on error
      return {
        isLimited: false,
        remainingCalls: 0,
        resetTime: new Date(),
        period,
      };
    }
  }

  // Validate phone number for security
  validatePhoneNumber(phoneNumber: string): SecurityValidation {
    try {
      // Remove common formatting
      const cleanPhone = phoneNumber.replace(/[\s\-\(\)\+]/g, '');

      // Check length (10-15 digits is typical for international numbers)
      if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        return {
          isValid: false,
          reason: 'Invalid phone number length',
          riskLevel: 'medium',
          shouldBlock: true,
        };
      }

      // Check if all digits
      if (!/^\d+$/.test(cleanPhone)) {
        return {
          isValid: false,
          reason: 'Phone number contains non-numeric characters',
          riskLevel: 'medium',
          shouldBlock: true,
        };
      }

      // Check for suspicious patterns
      const suspiciousPatterns = [
        /^0+$/, // All zeros
        /^1+$/, // All ones
        /^(.)\1{9,}$/, // Repeated digit (10+ times)
        /^1234567890$/, // Sequential
        /^911$/, // Emergency number
        /^411$/, // Information
      ];

      if (suspiciousPatterns.some(pattern => pattern.test(cleanPhone))) {
        return {
          isValid: false,
          reason: 'Suspicious phone number pattern',
          riskLevel: 'high',
          shouldBlock: true,
        };
      }

      return {
        isValid: true,
        riskLevel: 'low',
        shouldBlock: false,
      };
    } catch (error) {
      logger.error('Error validating phone number:', errorToLogMeta(error));
      return {
        isValid: false,
        reason: 'Validation error',
        riskLevel: 'high',
        shouldBlock: true,
      };
    }
  }

  // Sanitize call metadata
  sanitizeMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(metadata)) {
      // Skip sensitive keys
      const sensitiveKeys = [
        'password',
        'secret',
        'token',
        'key',
        'ssn',
        'social',
        'credit',
        'bank',
        'account',
      ];

      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        logger.warn('Skipping sensitive metadata key', { key });
        continue;
      }

      // Sanitize string values
      if (typeof value === 'string') {
        // Remove potential XSS
        sanitized[key] = value
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '')
          .substring(0, 1000); // Limit length
      } else if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
        sanitized[key] = value;
      } else if (typeof value === 'boolean') {
        sanitized[key] = value;
      } else if (Array.isArray(value)) {
        // Recursively sanitize arrays
        sanitized[key] = value
          .slice(0, 100)
          .map(item => (typeof item === 'string' ? item.substring(0, 100) : item));
      } else if (value && typeof value === 'object') {
        // Recursively sanitize objects (limited depth)
        sanitized[key] = this.sanitizeMetadata(value as Record<string, unknown>);
      }
    }

    return sanitized;
  }

  // Log security events
  private async logSecurityEvent(event: {
    type: string;
    riskLevel: 'low' | 'medium' | 'high';
    details: Record<string, unknown>;
  }): Promise<void> {
    try {
      logger.warn('Security event detected', {
        type: event.type,
        riskLevel: event.riskLevel,
        details: event.details,
        timestamp: new Date().toISOString(),
      });

      // Store in database for analysis
      const prisma = getPrismaClient();
      await prisma.securityEvent.create({
        data: {
          type: event.type,
          riskLevel: event.riskLevel,
          details: event.details as Prisma.InputJsonValue,
          service: 'retell',
          timestamp: new Date(),
        },
      });

      // Alert on high-risk events
      if (event.riskLevel === 'high') {
        await this.sendSecurityAlert(event);
      }
    } catch (error) {
      logger.error('Failed to log security event:', errorToLogMeta(error));
    }
  }

  // Send security alerts
  private async sendSecurityAlert(event: {
    type: string;
    riskLevel: string;
    details: Record<string, unknown>;
  }): Promise<void> {
    try {
      // Send email alert if configured
      if (process.env.SECURITY_ALERT_EMAIL) {
        const { emailService } = await import('@/services/email');

        await emailService.send({
          to: process.env.SECURITY_ALERT_EMAIL,
          subject: `High-Risk Security Event: ${event.type}`,
          text: `
            High-risk security event detected in Retell integration:
            
            Type: ${event.type}
            Risk Level: ${event.riskLevel}
            Time: ${new Date().toLocaleString()}
            
            Details:
            ${JSON.stringify(event.details, null, 2)}
            
            Please investigate immediately.
          `,
        });
      }

      // Create urgent admin task
      const prisma = getPrismaClient();
      const adminUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });

      if (adminUser) {
        await prisma.task.create({
          data: {
            title: `SECURITY ALERT: ${event.type}`,
            description: `High-risk security event requires immediate attention. Details: ${JSON.stringify(event.details)}`,
            type: 'security_alert',
            priority: 'urgent',
            status: 'pending',
            createdById: adminUser.id,
            assignedToId: adminUser.id,
            dueDate: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
            metadata: {
              securityEvent: event,
              autoGenerated: true,
            } as Prisma.InputJsonValue,
          },
        });
      }
    } catch (error) {
      logger.error('Failed to send security alert:', errorToLogMeta(error));
    }
  }

  // Get security statistics
  async getSecurityStats(timeRange?: { start: Date; end: Date }) {
    try {
      const prisma = getPrismaClient();

      const where: Prisma.SecurityEventWhereInput = { service: 'retell' };
      if (timeRange) {
        where.timestamp = {
          gte: timeRange.start,
          lte: timeRange.end,
        };
      }

      const events = await prisma.securityEvent.findMany({
        where,
        select: {
          type: true,
          riskLevel: true,
          timestamp: true,
        },
      });

      const stats = {
        total: events.length,
        byRiskLevel: {
          low: 0,
          medium: 0,
          high: 0,
        },
        byType: {} as Record<string, number>,
        trendsOverTime: [] as unknown[],
      };

      events.forEach(event => {
        stats.byRiskLevel[event.riskLevel as keyof typeof stats.byRiskLevel]++;
        stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;
      });

      return stats;
    } catch (error) {
      logger.error('Failed to get security stats:', errorToLogMeta(error));
      throw error;
    }
  }

  // Validate call configuration for security
  validateCallConfig(config: {
    phoneNumber: string;
    agentId: string;
    metadata?: Record<string, unknown>;
  }): SecurityValidation {
    try {
      const issues: string[] = [];
      let riskLevel: 'low' | 'medium' | 'high' = 'low';

      // Validate phone number
      const phoneValidation = this.validatePhoneNumber(config.phoneNumber);
      if (!phoneValidation.isValid) {
        return phoneValidation;
      }

      // Check agent ID format
      if (!config.agentId || typeof config.agentId !== 'string' || config.agentId.length < 5) {
        issues.push('Invalid agent ID');
        riskLevel = 'high';
      }

      // Check metadata size
      if (config.metadata) {
        const metadataString = JSON.stringify(config.metadata);
        if (metadataString.length > 10000) {
          // 10KB limit
          issues.push('Metadata too large');
          riskLevel = 'medium';
        }
      }

      return {
        isValid: riskLevel !== 'high',
        reason: issues.join(', '),
        riskLevel,
        shouldBlock: riskLevel === 'high',
      };
    } catch (error) {
      logger.error('Error validating call config:', errorToLogMeta(error));
      return {
        isValid: false,
        reason: 'Validation error',
        riskLevel: 'high',
        shouldBlock: true,
      };
    }
  }

  // Clean up old security data
  async cleanupSecurityData(daysToKeep: number = 90) {
    try {
      const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

      const prisma = getPrismaClient();
      const deletedCount = await prisma.securityEvent.deleteMany({
        where: {
          timestamp: {
            lt: cutoffDate,
          },
        },
      });

      // Clean up rate limit cache
      const now = Date.now();
      for (const [key, data] of this.rateLimitCache.entries()) {
        if (now >= data.resetTime) {
          this.rateLimitCache.delete(key);
        }
      }

      logger.info('Security data cleaned up', {
        deletedCount: deletedCount.count,
        cutoffDate,
      });

      return deletedCount.count;
    } catch (error) {
      logger.error('Failed to cleanup security data:', errorToLogMeta(error));
      throw error;
    }
  }

  // Update security configuration
  updateConfig(newConfig: Partial<SecurityConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig,
    };

    logger.info('Security configuration updated', {
      updatedFields: Object.keys(newConfig),
    });
  }

  // Get current security configuration (sanitized)
  getConfig(): Omit<SecurityConfig, 'webhookSecret' | 'apiKey'> {
    return {
      rateLimits: this.config.rateLimits,
      allowedOrigins: this.config.allowedOrigins,
      ipWhitelist: this.config.ipWhitelist,
    };
  }
}

// Export singleton instance
export const securityManager = SecurityManager.getInstance();
