/**
 * Environment configuration management
 * Handles missing environment variables gracefully and logs warnings only once
 */

import { logger } from '@/lib/safe-logger';

interface ServiceConfig {
  name: string;
  envVars: {
    key: string;
    required?: boolean;
    description?: string;
  }[];
  onMissing?: 'warn' | 'error' | 'silent';
}

class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private loggedWarnings = new Set<string>();
  private serviceStatuses = new Map<string, boolean>();

  private constructor() {}

  static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  /**
   * Check service configuration and log warnings only once
   */
  checkService(config: ServiceConfig): boolean {
    const missingVars: string[] = [];
    const missingRequired: string[] = [];

    // Check each environment variable
    config.envVars.forEach(envVar => {
      const value = process.env[envVar.key];
      const isEmpty =
        !value ||
        value === '' ||
        value === 'placeholder' ||
        value === 'your-' + envVar.key.toLowerCase().replace(/_/g, '-');

      if (isEmpty) {
        missingVars.push(envVar.key);
        if (envVar.required) {
          missingRequired.push(envVar.key);
        }
      }
    });

    // Determine service status
    const isConfigured = missingRequired.length === 0;
    const serviceKey = config.name.toLowerCase();

    // Only log if status changed or first check
    const previousStatus = this.serviceStatuses.get(serviceKey);
    if (previousStatus === undefined || previousStatus !== isConfigured) {
      this.serviceStatuses.set(serviceKey, isConfigured);

      if (!isConfigured && config.onMissing !== 'silent') {
        const warningKey = `${serviceKey}-config`;

        if (!this.loggedWarnings.has(warningKey)) {
          this.loggedWarnings.add(warningKey);

          if (config.onMissing === 'error' && missingRequired.length > 0) {
            logger.error(`${config.name} service is missing required configuration`, {
              missing: missingRequired,
              service: config.name,
            });
          } else if (missingVars.length > 0) {
            logger.info(`${config.name} service not configured (operating in mock mode)`, {
              missing: missingVars,
              service: config.name,
              message: 'Service will use mock responses in development',
            });
          }
        }
      }
    }

    return isConfigured;
  }

  /**
   * Get service configuration status without logging
   */
  isServiceConfigured(serviceName: string): boolean {
    return this.serviceStatuses.get(serviceName.toLowerCase()) ?? false;
  }

  /**
   * Log environment summary (useful for startup)
   */
  logEnvironmentSummary(): void {
    const configured: string[] = [];
    const notConfigured: string[] = [];

    this.serviceStatuses.forEach((isConfigured, service) => {
      if (isConfigured) {
        configured.push(service);
      } else {
        notConfigured.push(service);
      }
    });

    if (configured.length > 0) {
      logger.info('Configured services', { services: configured });
    }

    if (notConfigured.length > 0) {
      logger.info('Services operating in mock mode', {
        services: notConfigured,
        note: 'This is normal for development. Configure environment variables to enable these services.',
      });
    }
  }

  /**
   * Reset warnings (useful for testing)
   */
  reset(): void {
    this.loggedWarnings.clear();
    this.serviceStatuses.clear();
  }
}

// Export singleton instance
export const envConfig = EnvironmentConfig.getInstance();

// Service configurations aligned with env-validation.ts
export const SERVICE_CONFIGS = {
  CORE: {
    name: 'Core Configuration',
    envVars: [
      { key: 'NODE_ENV', required: true, description: 'Environment (development/production)' },
      { key: 'NEXT_PUBLIC_APP_URL', required: true, description: 'Application URL' },
    ],
    onMissing: 'error' as const,
  },
  DATABASE: {
    name: 'Database',
    envVars: [{ key: 'DATABASE_URL', required: true, description: 'PostgreSQL connection string' }],
    onMissing: 'error' as const,
  },
  AUTHENTICATION: {
    name: 'Authentication',
    envVars: [
      { key: 'NEXTAUTH_URL', required: true, description: 'NextAuth callback URL' },
      { key: 'NEXTAUTH_SECRET', required: true, description: 'NextAuth secret key (min 32 chars)' },
    ],
    onMissing: 'error' as const,
  },
  OPENAI: {
    name: 'OpenAI',
    envVars: [{ key: 'OPENAI_API_KEY', required: true, description: 'OpenAI API Key for chatbot' }],
    onMissing: 'error' as const,
  },
  GOHIGHLEVEL: {
    name: 'GoHighLevel',
    envVars: [
      { key: 'GHL_API_KEY', required: false, description: 'GoHighLevel API Key' },
      { key: 'GHL_LOCATION_ID', required: false, description: 'GoHighLevel Location ID' },
      { key: 'GHL_WEBHOOK_SECRET', required: false, description: 'Webhook verification secret' },
    ],
    onMissing: 'warn' as const,
  },
  EMAIL: {
    name: 'Email',
    envVars: [
      { key: 'SMTP_HOST', required: false, description: 'SMTP Host' },
      { key: 'SMTP_PORT', required: false, description: 'SMTP Port' },
      { key: 'SMTP_USER', required: false, description: 'SMTP Username' },
      { key: 'SMTP_PASSWORD', required: false, description: 'SMTP Password' },
      { key: 'EMAIL_FROM', required: false, description: 'Default sender email' },
    ],
    onMissing: 'warn' as const,
  },
  REDIS: {
    name: 'Redis',
    envVars: [{ key: 'REDIS_URL', required: false, description: 'Redis connection URL' }],
    onMissing: 'silent' as const, // Already handled by MOCK_REDIS flag
  },
  VOICE_SERVICES: {
    name: 'Voice Services (Retell)',
    envVars: [
      { key: 'RETELL_API_KEY', required: false, description: 'Retell AI API key' },
      { key: 'RETELL_WEBHOOK_SECRET', required: false, description: 'Retell webhook secret' },
    ],
    onMissing: 'warn' as const,
  },
  PAYMENT: {
    name: 'Payment Processing',
    envVars: [
      { key: 'LAWPAY_PUBLIC_KEY', required: false, description: 'LawPay public key' },
      { key: 'LAWPAY_SECRET_KEY', required: false, description: 'LawPay secret key' },
    ],
    onMissing: 'warn' as const,
  },
  GOOGLE_MAPS: {
    name: 'Google Maps',
    envVars: [
      {
        key: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
        required: false,
        description: 'Google Maps JavaScript API key',
      },
    ],
    onMissing: 'warn' as const,
  },
  GOOGLE_PLACES: {
    name: 'Google Places',
    envVars: [
      {
        key: 'GOOGLE_PLACES_API_KEY',
        required: false,
        description: 'Google Places API key for reviews',
      },
    ],
    onMissing: 'warn' as const,
  },
  ANALYTICS: {
    name: 'Analytics',
    envVars: [
      { key: 'GOOGLE_ANALYTICS_ID', required: false, description: 'Google Analytics tracking ID' },
    ],
    onMissing: 'silent' as const,
  },
  MONITORING: {
    name: 'Error Monitoring',
    envVars: [{ key: 'SENTRY_DSN', required: false, description: 'Sentry error tracking DSN' }],
    onMissing: 'warn' as const,
  },
};
