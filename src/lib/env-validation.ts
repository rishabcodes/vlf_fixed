/**
 * Environment Variable Validation
 * This file validates all required environment variables at build time
 * and provides helpful error messages when variables are missing.
 */

import { z } from 'zod';

import { securityLogger } from '@/lib/safe-logger';
// Define the schema for our environment variables
const envSchema = z.object({
  // Core Configuration
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .optional()
    .default('https://www.vasquezlawnc.com')
    .refine(val => z.string().url().safeParse(val).success, {
      message: 'NEXT_PUBLIC_APP_URL must be a valid URL',
    }),

  // Database (Required)
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required for database connection')
    .refine(val => val.includes('postgresql://') || val.includes('postgres://'), {
      message: 'DATABASE_URL must be a valid PostgreSQL connection string',
    }),

  // Authentication (Required)
  NEXTAUTH_URL: z.string().url().min(1, 'NEXTAUTH_URL is required for authentication'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters long'),

  // Redis/Caching (Optional with defaults)
  REDIS_URL: z.string().optional(),
  MOCK_REDIS: z
    .string()
    .optional()
    .transform(val => val?.trim())
    .pipe(z.enum(['true', 'false']).optional().default('true')),

  // AI Services (Optional - will use simple chatbot if not provided)
  OPENAI_API_KEY: z
    .string()
    .optional()
    .transform(val => {
      // Allow empty, placeholder, or valid key
      if (!val || val === '' || val === 'your-openai-api-key-here') {
        return undefined;
      }
      return val;
    })
    .refine(val => !val || val.startsWith('sk-'), {
      message: 'OPENAI_API_KEY must start with "sk-" if provided',
    }),

  // GoHighLevel Integration (Optional but warned)
  GHL_API_KEY: z.string().optional(),
  GHL_LOCATION_ID: z.string().optional(),
  GHL_API_URL: z.string().url().optional().default('https://rest.gohighlevel.com/v1'),
  GHL_WEBHOOK_SECRET: z.string().optional(),

  // Voice Services (Optional)
  RETELL_API_KEY: z.string().optional(),
  RETELL_WEBHOOK_SECRET: z.string().optional(),

  // Email Configuration (Optional with defaults)
  EMAIL_FROM: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .optional()
    .default('info@vasquezlawnc.com'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_PASS: z.string().optional(), // Alias for SMTP_PASSWORD
  SMTP_SECURE: z
    .string()
    .optional()
    .transform(val => val?.trim())
    .pipe(z.enum(['true', 'false']).optional().default('false')),

  // Office 365 specific
  OFFICE365_EMAIL: z.string().optional(),
  OFFICE365_PASSWORD: z.string().optional(),

  // Email routing
  CONTACT_EMAIL: z.string().email().optional().default('leads@vasquezlawfirm.com'),
  ATTORNEY_EMAIL: z.string().email().optional().default('attorneys@vasquezlawnc.com'),
  URGENT_LEAD_EMAILS: z.string().optional(), // Comma-separated list

  // Development flags
  MOCK_EMAIL: z
    .string()
    .optional()
    .transform(val => val?.trim())
    .pipe(z.enum(['true', 'false']).optional().default('true')),
  MOCK_SMS: z
    .string()
    .optional()
    .transform(val => val?.trim())
    .pipe(z.enum(['true', 'false']).optional().default('true')),
  DISABLE_EMAIL_SERVICE: z
    .string()
    .optional()
    .transform(val => val?.trim())
    .pipe(z.enum(['true', 'false']).optional().default('false')),

  // Payment Processing (Optional)
  LAWPAY_PUBLIC_KEY: z.string().optional(),
  LAWPAY_SECRET_KEY: z.string().optional(),

  // Google Services (Optional but recommended)
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
  GOOGLE_PLACES_API_KEY: z.string().optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),

  // Monitoring (Optional but recommended)
  SENTRY_DSN: z.string().url().optional(),

  // Development Flags
  SKIP_ENV_VALIDATION: z
    .string()
    .optional()
    .transform(val => {
      const trimmed = val?.trim();
      // Convert '1' to 'true' and '0' to 'false' for compatibility
      if (trimmed === '1') return 'true';
      if (trimmed === '0') return 'false';
      return trimmed;
    })
    .pipe(z.enum(['true', 'false']).optional().default('false')),
});

// Type for validated environment
export type ValidatedEnv = z.infer<typeof envSchema>;

// Validation function with detailed error reporting
function validateEnv(): ValidatedEnv {
  // Skip validation if explicitly disabled (use with caution)
  // Trim the value to handle newlines from Vercel environment variables
  const skipValidation = process.env.SKIP_ENV_VALIDATION?.trim();
  if (skipValidation === 'true' || skipValidation === '1') {
    securityLogger.warn(
      '⚠️  Environment variable validation is skipped. This is not recommended for production.'
    );
    return process.env as ValidatedEnv;
  }

  try {
    // Parse and validate environment variables
    const validated = envSchema.parse(process.env);

    // Log successful validation in development
    if (process.env.NODE_ENV === 'development') {
      securityLogger.info('✅ Environment variables validated successfully');
    }

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format error messages for better readability
      securityLogger.error('\n❌ Environment Variable Validation Failed:\n');

      const missingVars: string[] = [];
      const invalidVars: string[] = [];

      error.errors.forEach(err => {
        const varName = err.path.join('.');
        const message = err.message;

        if (message.includes('required')) {
          missingVars.push(`  • ${varName}: ${message}`);
        } else {
          invalidVars.push(`  • ${varName}: ${message}`);
        }
      });

      if (missingVars.length > 0) {
        securityLogger.error('🚫 Missing Required Variables:');
        missingVars.forEach(msg => securityLogger.error(msg));
      }

      if (invalidVars.length > 0) {
        securityLogger.error('\n⚠️  Invalid Variables:');
        invalidVars.forEach(msg => securityLogger.error(msg));
      }

      securityLogger.error('\n📋 Quick Setup Instructions:');
      securityLogger.error('1. Copy .env.example to .env.local');
      securityLogger.error('2. Fill in the required values');
      securityLogger.error('3. See VERCEL-ENV-SETUP.md for production deployment\n');

      // Provide specific setup help based on missing variables
      if (missingVars.some(v => v.includes('DATABASE_URL'))) {
        securityLogger.error('💡 Database Setup:');
        securityLogger.error('   - For local dev: Use Docker or install PostgreSQL');
        securityLogger.error('   - For production: Use Vercel Postgres or Neon.tech');
        securityLogger.error('   - Format: postgresql://user:password@host:5432/database\n');
      }

      if (missingVars.some(v => v.includes('NEXTAUTH_SECRET'))) {
        securityLogger.error('💡 Generate NEXTAUTH_SECRET:');
        securityLogger.error('   Run: openssl rand -base64 32\n');
      }

      if (missingVars.some(v => v.includes('OPENAI_API_KEY'))) {
        securityLogger.error('💡 OpenAI Setup:');
        securityLogger.error('   1. Go to https://platform.openai.com/api-keys');
        securityLogger.error('   2. Create a new API key');
        securityLogger.error('   3. Add it to your .env.local file\n');
      }

      // Exit with error code
      process.exit(1);
    }

    // Re-throw if not a Zod error
    throw error;
  }
}

// Export validated environment variables
export const validatedEnv = validateEnv();

// Export helper to check if a service is configured
export function isServiceConfigured(
  service: 'ghl' | 'email' | 'redis' | 'stripe' | 'google_maps'
): boolean {
  switch (service) {
    case 'ghl':
      return !!(validatedEnv.GHL_API_KEY && validatedEnv.GHL_LOCATION_ID);
    case 'email':
      return !!(validatedEnv.SMTP_HOST && validatedEnv.SMTP_USER && validatedEnv.SMTP_PASSWORD);
    case 'redis':
      return !!(validatedEnv.REDIS_URL && validatedEnv.MOCK_REDIS !== 'true');
    case 'stripe':
      return false; // Stripe removed
    case 'google_maps':
      return !!validatedEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    default:
      return false;
  }
}

// Export environment summary for logging
export function getEnvironmentSummary(): Record<string, boolean> {
  return {
    database: !!validatedEnv.DATABASE_URL,
    authentication: !!(validatedEnv.NEXTAUTH_URL && validatedEnv.NEXTAUTH_SECRET),
    openai: !!validatedEnv.OPENAI_API_KEY,
    gohighlevel: isServiceConfigured('ghl'),
    email: isServiceConfigured('email'),
    redis: isServiceConfigured('redis'),
    stripe: isServiceConfigured('stripe'),
    googleMaps: isServiceConfigured('google_maps'),
    monitoring: !!validatedEnv.SENTRY_DSN,
  };
}
