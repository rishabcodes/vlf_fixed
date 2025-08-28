/**
 * Environment variable configuration with validation
 * This file re-exports the validated environment variables
 * from our validation module for backward compatibility
 */

import { validatedEnv, isServiceConfigured, getEnvironmentSummary } from './env-validation';

// Export validated environment variables with the same interface
export const env = {
  // Core
  NODE_ENV: validatedEnv.NODE_ENV,
  NEXT_PUBLIC_APP_URL: validatedEnv.NEXT_PUBLIC_APP_URL,

  // Database
  DATABASE_URL: validatedEnv.DATABASE_URL,

  // Auth
  NEXTAUTH_URL: validatedEnv.NEXTAUTH_URL,
  NEXTAUTH_SECRET: validatedEnv.NEXTAUTH_SECRET,

  // Redis
  MOCK_REDIS: validatedEnv.MOCK_REDIS === 'true',
  REDIS_URL: validatedEnv.REDIS_URL || '',

  // Email
  MOCK_EMAIL: validatedEnv.MOCK_EMAIL === 'true',
  MOCK_SMS: validatedEnv.MOCK_SMS === 'true',
  EMAIL_FROM: validatedEnv.EMAIL_FROM,
  SMTP_HOST: validatedEnv.SMTP_HOST || '',
  SMTP_PORT: validatedEnv.SMTP_PORT || '',
  SMTP_USER: validatedEnv.SMTP_USER || '',
  SMTP_PASSWORD: validatedEnv.SMTP_PASSWORD || '',

  // APIs
  OPENAI_API_KEY: validatedEnv.OPENAI_API_KEY,
  GHL_API_KEY: validatedEnv.GHL_API_KEY || '',
  GHL_LOCATION_ID: validatedEnv.GHL_LOCATION_ID || '',
  GHL_API_URL: validatedEnv.GHL_API_URL || 'https://rest.gohighlevel.com/v1',
  GHL_WEBHOOK_SECRET: validatedEnv.GHL_WEBHOOK_SECRET || '',

  // Voice Services
  RETELL_API_KEY: validatedEnv.RETELL_API_KEY || '',
  RETELL_WEBHOOK_SECRET: validatedEnv.RETELL_WEBHOOK_SECRET || '',

  // Payment
  LAWPAY_PUBLIC_KEY: validatedEnv.LAWPAY_PUBLIC_KEY || '',
  LAWPAY_SECRET_KEY: validatedEnv.LAWPAY_SECRET_KEY || '',

  // Google Services
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: validatedEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  GOOGLE_PLACES_API_KEY: validatedEnv.GOOGLE_PLACES_API_KEY || '',
  GOOGLE_ANALYTICS_ID: validatedEnv.GOOGLE_ANALYTICS_ID || '',

  // Monitoring
  SENTRY_DSN: validatedEnv.SENTRY_DSN || '',

  // Feature flags
  SKIP_ENV_VALIDATION: validatedEnv.SKIP_ENV_VALIDATION === 'true',
};

// Type-safe env access
export type Env = typeof env;

// Re-export utility functions
export { isServiceConfigured, getEnvironmentSummary };
