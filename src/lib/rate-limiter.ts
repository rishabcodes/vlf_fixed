import { NextResponse } from 'next/server';

// Simple rate limiter for launch
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  constructor(
    private maxAttempts: number,
    private windowMs: number
  ) {}

  async checkLimit(key: string): Promise<{ allowed: boolean; retryAfter?: number }> {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];

    // Clean old attempts
    const validAttempts = attempts.filter(time => now - time < this.windowMs);

    if (validAttempts.length >= this.maxAttempts && validAttempts.length > 0) {
      const oldestAttempt = validAttempts[0];
      if (oldestAttempt !== undefined) {
        const retryAfter = Math.ceil((oldestAttempt + this.windowMs - now) / 1000);
        return { allowed: false, retryAfter };
      }
      return { allowed: false, retryAfter: 60 }; // Default retry after 60 seconds
    }

    validAttempts.push(now);
    this.attempts.set(key, validAttempts);

    return { allowed: true };
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

// Export a default rate limiter function for API routes
export function rateLimit(options: { windowMs?: number; max?: number } = {}) {
  const limiter = new RateLimiter(options.max || 10, options.windowMs || 60000);

  return async (req: { headers?: Record<string, string>; ip?: string }) => {
    const key = req.headers?.['x-forwarded-for'] || req.ip || 'anonymous';
    const result = await limiter.checkLimit(key);

    if (!result.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'Retry-After': result.retryAfter?.toString() || '60',
          },
        }
      );
    }

    return null;
  };
}

// Specific rate limiters for different endpoints
export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
});

// Default rate limiter instance for general use
export const rateLimiter = {
  limit: async (key: string) => {
    const limiter = new RateLimiter(10, 60000); // 10 requests per minute
    const result = await limiter.checkLimit(key);
    return { success: result.allowed, retryAfter: result.retryAfter };
  },
};
