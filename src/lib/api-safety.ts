import { logger } from '@/lib/safe-logger';

/**
 * API Safety utilities to handle missing API keys gracefully
 */

export interface APIConfig {
  key: string | undefined;
  serviceName: string;
  required?: boolean;
}

export class APISafetyWrapper {
  private config: APIConfig;
  private isConfigured: boolean;

  constructor(config: APIConfig) {
    this.config = config;
    this.isConfigured = Boolean(config.key && config.key !== 'placeholder' && config.key !== '');
  }

  /**
   * Check if the API is properly configured
   */
  isAvailable(): boolean {
    return this.isConfigured;
  }

  /**
   * Execute a function only if the API is configured
   */
  async execute<T>(fn: () => Promise<T>, fallback?: T): Promise<T> {
    if (!this.isConfigured) {
      if (this.config.required) {
        throw new Error(`${this.config.serviceName} API key is required but not configured`);
      }

      logger.warn(`${this.config.serviceName} API is not configured - using fallback`);

      if (fallback !== undefined) {
        return fallback;
      }

      throw new Error(`${this.config.serviceName} API is not configured and no fallback provided`);
    }

    try {
      return await fn();
    } catch (error) {
      logger.error(`${this.config.serviceName} API error:`, error);
      throw error;
    }
  }

  /**
   * Get a mock response for development/demo purposes
   */
  getMockResponse<T>(mockData: T): T {
    logger.info(`${this.config.serviceName}: Using mock data (API not configured)`);
    return mockData;
  }
}

// Convenience function to check multiple APIs
export function checkRequiredAPIs(apis: APIConfig[]): {
  missing: string[];
  configured: string[];
} {
  const missing: string[] = [];
  const configured: string[] = [];

  apis.forEach(api => {
    const wrapper = new APISafetyWrapper(api);
    if (wrapper.isAvailable()) {
      configured.push(api.serviceName);
    } else if (api.required) {
      missing.push(api.serviceName);
    }
  });

  return { missing, configured };
}
