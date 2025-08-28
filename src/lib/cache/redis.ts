// Note: Using MockRedis instead of ioredis for this project
// import Redis from 'ioredis';
import { securityLogger } from '@/lib/safe-logger';
import { performanceLogger, logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

// Redis connection configuration (DEPRECATED - Always use MockRedis)
// This project no longer uses Redis. All caching is handled at the application level.
const redisConfig = {
  host: 'localhost',
  port: 6379,
  password: undefined,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableOfflineQueue: true,
  lazyConnect: true,
};

// Mock Redis for local testing
class MockRedis {
  private store = new Map<string, unknown>();

  async get(key: string) {
    return this.store.get(key) || null;
  }

  async set(key: string, value: unknown, mode?: string, duration?: number) {
    this.store.set(key, value);
    if (mode === 'EX' && duration) {
      setTimeout(() => this.store.delete(key), duration * 1000);
    }
    return 'OK';
  }

  async del(key: string) {
    return this.store.delete(key) ? 1 : 0;
  }

  async expire(key: string, seconds: number) {
    setTimeout(() => this.store.delete(key), seconds * 1000);
    return 1;
  }

  async ttl(key: string) {
    return this.store.has(key) ? 3600 : -1;
  }

  async ping() {
    return 'PONG';
  }

  on(_event: string, _handler: (...args: unknown[]) => void) {
    // Mock event handling
  }

  disconnect() {
    // Mock disconnect
  }

  async connect() {
    // Mock connect - immediately ready
    return this;
  }

  async quit() {
    // Mock quit - just close connection
    return 'OK';
  }

  async keys(pattern: string) {
    const keys: string[] = [];
    const regex = new RegExp(pattern.replace('*', '.*'));
    for (const key of this.store.keys()) {
      if (regex.test(key)) {
        keys.push(key);
      }
    }
    return keys;
  }

  async setex(key: string, seconds: number, value: unknown) {
    return this.set(key, value, 'EX', seconds);
  }

  async exists(key: string) {
    return this.store.has(key) ? 1 : 0;
  }

  async flushdb() {
    this.store.clear();
    return 'OK';
  }

  async info() {
    return 'mock_redis_info';
  }

  async dbsize() {
    return this.store.size;
  }

  async memory(_cmd: string, _key: string) {
    return 1024; // Mock memory usage
  }
}

// Create Redis client instances
let _redis: MockRedis | null = null;
let _bullRedis: MockRedis | null = null;

function getRedis() {
  if (!_redis) {
    // Always use MockRedis - this project no longer uses Redis
    _redis = new MockRedis() as MockRedis;
    logger.info('Using in-memory cache (MockRedis)');
  }
  return _redis;
}

function getBullRedis() {
  if (!_bullRedis) {
    // Always use MockRedis for Bull queues
    _bullRedis = new MockRedis() as MockRedis;
    logger.info('Using in-memory cache for Bull queues (MockRedis)');
  }
  return _bullRedis;
}

// Lazy initialization - don't connect until first use
let _exportRedis: MockRedis | null = null;
let _exportBullRedis: MockRedis | null = null;

export const redis = new Proxy({} as MockRedis, {
  get(_, prop) {
    if (!_exportRedis) {
      _exportRedis = getRedis() as MockRedis;
    }
    return (_exportRedis as any)[prop];
  },
});

export const bullRedis = new Proxy({} as MockRedis, {
  get(_, prop) {
    if (!_exportBullRedis) {
      _exportBullRedis = getBullRedis() as MockRedis;
    }
    return (_exportBullRedis as any)[prop];
  },
});

class CacheManager {
  private redis: MockRedis;
  private defaultTTL = 300; // 5 minutes
  private isConnected = false;

  constructor() {
    this.redis = getRedis() as MockRedis;

    // MockRedis doesn't have event handlers, so we just mark it as connected
    this.isConnected = true;
  }

  async get<T>(key: string): Promise<T | null> {
    const start = Date.now();
    try {
      const value = await this.redis.get(key);
      performanceLogger.measure('cache-get', Date.now() - start, { key, hit: !!value });

      return value && typeof value === 'string' ? JSON.parse(value) : null;
    } catch (error) {
      securityLogger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttl = this.defaultTTL): Promise<void> {
    const start = Date.now();
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
      performanceLogger.measure('cache-set', Date.now() - start, { key, ttl });
    } catch (error) {
      securityLogger.error('Cache set error:', error);
    }
  }

  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await Promise.all(keys.map((key: string) => this.redis.del(key)));
    }
  }

  // Cache wrapper for expensive operations
  async remember<T>(key: string, factory: () => Promise<T>, ttl = this.defaultTTL): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await factory();
    await this.set(key, value, ttl);
    return value;
  }

  // Multi-level caching with memory + Redis
  private memoryCache = new Map<string, { value: unknown; expires: number }>();

  async getWithMemory<T>(key: string): Promise<T | null> {
    // Check memory first
    const memCached = this.memoryCache.get(key);
    if (memCached && memCached.expires > Date.now()) {
      return memCached.value as T;
    }

    // Then check Redis
    const value = await this.get<T>(key);
    if (value !== null) {
      // Store in memory for 60 seconds
      this.memoryCache.set(key, {
        value,
        expires: Date.now() + 60000,
      });
    }

    return value;
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      this.memoryCache.delete(key);
    } catch (error) {
      logger.error(`Cache delete error for key ${key}:`, errorToLogMeta(error));
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await Promise.all(keys.map(key => this.redis.del(key)));
        // Clear matching keys from memory cache
        for (const [key] of this.memoryCache) {
          if (key.match(pattern.replace('*', '.*'))) {
            this.memoryCache.delete(key);
          }
        }
      }
    } catch (error) {
      logger.error(`Cache delete pattern error for ${pattern}:`, errorToLogMeta(error));
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Cache exists error for key ${key}:`, errorToLogMeta(error));
      return false;
    }
  }

  async getTTL(key: string): Promise<number> {
    try {
      return await this.redis.ttl(key);
    } catch (error) {
      logger.error(`Cache TTL error for key ${key}:`, errorToLogMeta(error));
      return -1;
    }
  }

  async flush(): Promise<void> {
    try {
      await this.redis.flushdb();
      this.memoryCache.clear();
      logger.info('Cache flushed successfully');
    } catch (error) {
      logger.error('Cache flush error:', errorToLogMeta(error));
    }
  }

  async info(): Promise<{
    used_memory: string;
    used_memory_human: string;
    connected_clients: string;
    total_connections_received: string;
    total_commands_processed: string;
  } | null> {
    try {
      const info = await this.redis.info();
      const lines = info.split('\r\n');
      const stats: Record<string, unknown> = {};

      lines.forEach((line: string) => {
        const [key, value] = line.split(':');
        if (key && value) {
          stats[key] = value;
        }
      });

      return {
        used_memory: (stats.used_memory as string) || 'N/A',
        used_memory_human: (stats.used_memory_human as string) || 'N/A',
        connected_clients: (stats.connected_clients as string) || 'N/A',
        total_connections_received: (stats.total_connections_received as string) || 'N/A',
        total_commands_processed: (stats.total_commands_processed as string) || 'N/A',
      };
    } catch (error) {
      logger.error('Cache info error:', errorToLogMeta(error));
      return null;
    }
  }
}

export const cache = new CacheManager();

// Cache key generators
export const cacheKeys = {
  // User cache keys
  user: (id: string) => `user:${id}`,
  userByEmail: (email: string) => `user:email:${email}`,
  userSessions: (userId: string) => `user:${userId}:sessions`,

  // Case cache keys
  case: (id: string) => `case:${id}`,
  casesByUser: (userId: string) => `cases:user:${userId}`,
  casesByAttorney: (attorneyId: string) => `cases:attorney:${attorneyId}`,

  // Blog cache keys
  blogPost: (id: string) => `blog:${id}`,
  blogPostBySlug: (slug: string) => `blog:slug:${slug}`,
  blogPostsByPracticeArea: (area: string, lang: string) => `blog:area:${area}:${lang}`,
  blogPostsList: (page: number, limit: number) => `blog:list:${page}:${limit}`,

  // SEO cache keys
  seoAnalysis: (postId: string) => `seo:analysis:${postId}`,
  keywords: (practiceArea: string, lang: string) => `keywords:${practiceArea}:${lang}`,
  competitorAnalysis: (domain: string) => `competitor:${domain}`,

  // API response cache keys
  apiResponse: (endpoint: string, params: string) => `api:${endpoint}:${params}`,

  // Session cache keys
  session: (sessionId: string) => `session:${sessionId}`,

  // Rate limiting keys
  rateLimit: (ip: string, endpoint: string) => `ratelimit:${ip}:${endpoint}`,

  // Temporary data keys
  tempData: (key: string) => `temp:${key}`,

  // Voice call cache keys
  call: (callId: string) => `call:${callId}`,
  callTranscript: (callId: string) => `call:${callId}:transcript`,

  // Chat cache keys
  conversation: (id: string) => `conversation:${id}`,
  chatHistory: (userId: string) => `chat:history:${userId}`,

  // Payment cache keys
  paymentSession: (sessionId: string) => `payment:session:${sessionId}`,
  paymentIntent: (intentId: string) => `payment:intent:${intentId}`,
};

// Decorator for caching method results
export function Cacheable(ttl = 300) {
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const cacheKey = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;

      return cache.remember(
        cacheKey,
        async () => {
          return originalMethod.apply(this, args);
        },
        ttl
      );
    };

    return descriptor;
  };
}

// Cache TTL presets
export const CacheTTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  EXTRA_LONG: 86400, // 24 hours
};

export default cache;
