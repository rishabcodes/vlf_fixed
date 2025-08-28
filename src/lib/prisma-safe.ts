import { PrismaClient } from '@prisma/client';

import { logger } from '@/lib/safe-logger';
// Mock Prisma client that returns safe defaults when database is unavailable
class SafePrismaClient {
  private realClient: PrismaClient | null = null;
  private isAvailable = false;

  constructor() {
    this.checkAvailability();
  }

  private async checkAvailability() {
    try {
      const dbUrl = process.env.DATABASE_URL || '';
      if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
        logger.warn('⚠️  Local database URL detected - running without database');
        this.isAvailable = false;
        return;
      }

      // Try to create real client
      this.realClient = new PrismaClient();
      await this.realClient.$connect();
      this.isAvailable = true;
      logger.info('✅ Database connected successfully');
    } catch (error) {
      logger.warn('⚠️  Database not available - running in mock mode');
      this.isAvailable = false;
    }
  }

  // Proxy all properties to either real client or mock implementations
  get user() {
    if (this.isAvailable && this.realClient) {
      return this.realClient.user;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-id', ...args.data }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get blogPost() {
    if (this.isAvailable && this.realClient) {
      return this.realClient.blogPost;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-id', ...args.data }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get case() {
    if (this.isAvailable && this.realClient) {
      return this.realClient.case;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-id', ...args.data }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get message() {
    if (this.isAvailable && this.realClient) {
      return this.realClient.message;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-id', ...args.data }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        ...args.data,
      }),
      updateMany: async () => ({ count: 0 }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get userActivity() {
    if (this.isAvailable && this.realClient) {
      return this.realClient.userActivity;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ id: 'mock-id', ...args.data }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get scheduledSyndication() {
    if (this.isAvailable && this.realClient) {
      return (this.realClient as any).scheduledSyndication;
    }
    const { scheduledSyndicationStubs } = require('./prisma-model-stubs');
    return scheduledSyndicationStubs;
  }

  get syndicationHistory() {
    if (this.isAvailable && this.realClient) {
      return (this.realClient as any).syndicationHistory;
    }
    const { syndicationHistoryStubs } = require('./prisma-model-stubs');
    return syndicationHistoryStubs;
  }

  get syndicationReport() {
    if (this.isAvailable && this.realClient) {
      return (this.realClient as any).syndicationReport;
    }
    const { syndicationReportStubs } = require('./prisma-model-stubs');
    return syndicationReportStubs;
  }

  get aBTest() {
    if (this.isAvailable && this.realClient) {
      return (this.realClient as any).aBTest;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ 
        id: 'mock-test-id', 
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data 
      }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get aBTestVariant() {
    if (this.isAvailable && this.realClient) {
      return (this.realClient as any).aBTestVariant;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ 
        id: 'mock-variant-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data 
      }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get aBTestParticipant() {
    if (this.isAvailable && this.realClient) {
      return (this.realClient as any).aBTestParticipant;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ 
        id: 'mock-participant-id',
        assignedAt: new Date(),
        ...args.data 
      }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        assignedAt: new Date(),
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  get aBTestEvent() {
    if (this.isAvailable && this.realClient) {
      return (this.realClient as any).aBTestEvent;
    }
    return {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: { data: Record<string, unknown> }) => ({ 
        id: 'mock-event-id',
        timestamp: new Date(),
        ...args.data 
      }),
      update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
        id: args.where.id,
        timestamp: new Date(),
        ...args.data,
      }),
      delete: async () => ({ id: 'deleted' }),
      count: async () => 0,
    };
  }

  // Add other models as needed
  async $connect() {
    if (this.realClient) {
      return this.realClient.$connect();
    }
  }

  async $disconnect() {
    if (this.realClient) {
      return this.realClient.$disconnect();
    }
  }

  async $transaction<T>(fn: (client: PrismaClient) => Promise<T>): Promise<T> {
    if (this.realClient) {
      return this.realClient.$transaction(fn as any) as Promise<T>;
    }
    // Mock transaction
    return fn(this as unknown as PrismaClient);
  }
}

// Export a safe instance
export const safePrisma = new SafePrismaClient() as unknown as PrismaClient;
export const prisma = safePrisma;
