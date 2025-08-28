import { logger } from '@/lib/safe-logger';

/**
 * Environment Check Module
 * This module is imported at build time to validate environment variables
 * It's imported in next.config.js to ensure validation happens early
 */

// Only run validation in non-test environments
if (process.env.NODE_ENV !== 'test') {
  // Import will trigger validation
  require('./env-validation');

  // Log validation success
  if (process.env.NODE_ENV === 'development') {
    logger.info('✅ Environment variables validated at build time');
  }
}

// Export a marker to indicate the check has run
export const ENV_VALIDATED = true;
