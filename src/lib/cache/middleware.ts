import { NextRequest, NextResponse } from 'next/server';
import { cache, cacheKeys, CacheTTL } from './redis';
import { logger, errorToLogMeta } from '../safe-logger';

interface CacheOptions {
  ttl?: number;
  key?: string | ((req: NextRequest) => string);
  condition?: (req: NextRequest) => boolean;
  invalidatePatterns?: string[];
}

/**
 * Cache middleware for Next.js API routes
 *
 * @example
 * // In an API route
 * export const GET = withCache(async (request) => {
 *   // Your handler logic
 * }, { ttl: CacheTTL.MEDIUM });
 */
export function withCache(
  handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
  options: CacheOptions = {}
) {
  return async function cachedHandler(
    request: NextRequest,
    context?: unknown
  ): Promise<NextResponse> {
    const { ttl = CacheTTL.MEDIUM, key, condition = () => true, invalidatePatterns = [] } = options;

    // Check if caching should be applied
    if (!condition(request)) {
      return handler(request, context);
    }

    // Handle cache invalidation
    if (request.method !== 'GET' && invalidatePatterns.length > 0) {
      await Promise.all(invalidatePatterns.map(pattern => cache.deletePattern(pattern)));
    }

    // Only cache GET requests
    if (request.method !== 'GET') {
      return handler(request, context);
    }

    // Generate cache key
    const cacheKey = typeof key === 'function' ? key(request) : key || generateCacheKey(request);

    try {
      // Try to get from cache
      const cached = await cache.get<{
        body: unknown;
        headers: Record<string, string>;
        status: number;
      }>(cacheKey);

      if (cached) {
        logger.debug(`Cache hit for ${cacheKey}`);
        return NextResponse.json(cached.body, {
          status: cached.status,
          headers: {
            ...cached.headers,
            'X-Cache': 'HIT',
            'X-Cache-TTL': ttl.toString(),
          },
        });
      }

      // Execute handler
      const response = await handler(request, context);

      // Cache successful responses
      if (response.status >= 200 && response.status < 300) {
        const body = await response.json();
        const headers: Record<string, string> = {};

        response.headers.forEach((value, key) => {
          headers[key] = value;
        });

        await cache.set(
          cacheKey,
          {
            body,
            headers,
            status: response.status,
          },
          ttl
        );

        // Return new response with cache headers
        return NextResponse.json(body, {
          status: response.status,
          headers: {
            ...headers,
            'X-Cache': 'MISS',
            'X-Cache-TTL': ttl.toString(),
          },
        });
      }

      return response;
    } catch (error) {
      logger.error('Cache middleware error:', errorToLogMeta(error));
      // Fallback to handler on cache error
      return handler(request, context);
      }
};
}

/**
 * Generate a cache key from request
 */
function generateCacheKey(request: NextRequest): string {
  const url = new URL(request.url);
  const params = Array.from(url.searchParams.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return cacheKeys.apiResponse(url.pathname, params);
}

/**
 * Cache invalidation utility
 */
export class CacheInvalidator {
  static async invalidateUser(userId: string) {
    await cache.deletePattern(`user:${userId}*`);
    await cache.deletePattern(`cases:user:${userId}*`);
    await cache.deletePattern(`chat:history:${userId}*`);
  }

  static async invalidateCase(caseId: string) {
    await cache.deletePattern(`case:${caseId}*`);
  }

  static async invalidateBlog(postId?: string, slug?: string) {
    if (postId) {
      await cache.delete(cacheKeys.blogPost(postId));
    }
    if (slug) {
      await cache.delete(cacheKeys.blogPostBySlug(slug));
    }
    // Invalidate list caches
    await cache.deletePattern('blog:list:*');
    await cache.deletePattern('blog:area:*');
  }

  static async invalidateSEO() {
    await cache.deletePattern('seo:*');
    await cache.deletePattern('keywords:*');
    await cache.deletePattern('competitor:*');
  }

  static async invalidateAll() {
    await cache.flush();
  }
}

/**
 * Rate limiting with cache
 */
export async function checkRateLimit(
  ip: string,
  endpoint: string,
  limit: number = 100,
  window: number = 900 // 15 minutes
): Promise<{ allowed: boolean; remaining: number; reset: number }> {
  const key = cacheKeys.rateLimit(ip, endpoint);
  const current = (await cache.get<number>(key)) || 0;

  if (current >= limit) {
    const ttl = await cache.getTTL(key);
    return {
      allowed: false,
      remaining: 0,
      reset: Date.now() + ttl * 1000,
    };
  }

  await cache.set(key, current + 1, window);

  return {
    allowed: true,
    remaining: limit - current - 1,
    reset: Date.now() + window * 1000,
  };
}
