import { PrismaClient } from '@prisma/client';
import { dbLogger } from './safe-logger';

// Database logging helpers
const dbLog = {
  query: (query: string, params?: unknown[], duration?: number) => {
    if (process.env.NODE_ENV === 'development') {
      dbLogger.query(query, params as any[], duration);
    }
  },
  error: (operation: string, error: unknown) => {
    dbLogger.error(`Database error in ${operation}`, error);
  },
  transaction: (id: string, status: string) => {
    dbLogger.transaction(id, status);
  },
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null;
  prismaConnectionChecked: boolean | undefined;
};

// In-memory storage for mock data
const mockStorage = {
  conversations: new Map<string, any>(),
  messages: new Map<string, any[]>(),
};

// Mock Prisma client for when database is unavailable
class MockPrismaClient {
  user = {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
      id: args.where.id || 'mock',
      ...args.data,
      updatedAt: new Date(),
    }),
    delete: async () => ({ id: 'deleted' }),
    count: async () => 0,
  };

  userActivity = {
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
    }),
  };

  account = {
    findUnique: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
    }),
  };

  session = {
    findUnique: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
    }),
    delete: async () => ({ id: 'deleted' }),
  };

  async $connect() {
    dbLogger.debug('MockPrisma connect called (no-op)');
  }

  async $disconnect() {
    dbLogger.debug('MockPrisma disconnect called (no-op)');
  }

  conversation = {
    findUnique: async (args: { where: { id: string }; include?: any }) => {
      const conv = mockStorage.conversations.get(args.where.id);
      if (!conv) return null;
      
      if (args.include?.messages) {
        const messages = mockStorage.messages.get(conv.id) || [];
        return { ...conv, messages };
      }
      return conv;
    },
    findFirst: async (args: { where?: any; include?: any }) => {
      // Find first matching conversation
      const conversations = Array.from(mockStorage.conversations.values());
      const conv = conversations.find(c => {
        // If looking by ID, match exactly
        if (args.where?.id) {
          return c.id === args.where.id;
        }
        // Otherwise match by userId
        return !args.where?.userId || c.userId === args.where.userId;
      });
      
      if (!conv) return null;
      
      if (args.include?.messages) {
        const messages = mockStorage.messages.get(conv.id) || [];
        // Return last 40 messages as per the take: 40 parameter (20 exchanges)
        const limitedMessages = messages.slice(-40);
        return { ...conv, messages: limitedMessages };
      }
      return conv;
    },
    findMany: async () => Array.from(mockStorage.conversations.values()),
    create: async (args: { data: Record<string, unknown>; include?: any }) => {
      const id = 'mock-conv-' + Date.now();
      const conversation = {
        id,
        ...args.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockStorage.conversations.set(id, conversation);
      mockStorage.messages.set(id, []);
      
      if (args.include?.messages) {
        return { ...conversation, messages: [] };
      }
      return conversation;
    },
    update: async (args: { where: any; data: Record<string, unknown>; include?: any }) => {
      const id = args.where.id;
      const existing = mockStorage.conversations.get(id);
      if (!existing) {
        throw new Error('Conversation not found');
      }
      
      const updated = {
        ...existing,
        ...args.data,
        updatedAt: new Date(),
      };
      mockStorage.conversations.set(id, updated);
      
      if (args.include?.messages) {
        const messages = mockStorage.messages.get(id) || [];
        return { ...updated, messages };
      }
      return updated;
    },
  };

  message = {
    create: async (args: { data: Record<string, unknown> }) => {
      const message = {
        id: 'mock-msg-' + Date.now(),
        ...args.data,
        createdAt: new Date(),
      };
      
      // Add message to the conversation's messages
      const conversationId = args.data.conversationId as string;
      if (conversationId) {
        const messages = mockStorage.messages.get(conversationId) || [];
        messages.push(message);
        mockStorage.messages.set(conversationId, messages);
      }
      
      return message;
    },
    update: async (args: { where: any; data: Record<string, unknown> }) => ({
      id: args.where.id || 'mock-' + Date.now(),
      ...args.data,
      updatedAt: new Date(),
    }),
    findMany: async (args: { where?: any; orderBy?: any; take?: number }) => {
      if (args?.where?.conversationId) {
        const messages = mockStorage.messages.get(args.where.conversationId) || [];
        if (args.take) {
          return messages.slice(-args.take);
        }
        return messages;
      }
      return [];
    },
  };

  callAnalysis = {
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
    }),
  };

  blogPost = {
    findMany: async () => [],
    findUnique: async () => null,
    findFirst: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    count: async () => 0,
    update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
      id: args.where.id || 'mock',
      ...args.data,
      updatedAt: new Date(),
    }),
  };

  image = {
    findMany: async () => [],
    findUnique: async () => null,
    findFirst: async () => null,
    create: async (args: { data: Record<string, unknown> }) => ({
      id: 'mock-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    count: async () => 0,
    update: async (args: { where: { id: string }; data: Record<string, unknown> }) => ({
      id: args.where.id || 'mock',
      ...args.data,
      updatedAt: new Date(),
    }),
    groupBy: async () => [],
  };

  async $transaction(fn: (client: MockPrismaClient) => Promise<unknown>) {
    return fn(this);
  }

  $on() {
    // No-op for mock
  }

  $queryRaw = async () => [];
}

const prismaClientSingleton = () => {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    dbLogger.warn('DATABASE_URL not found, using mock Prisma client', {
      databaseUrl: process.env.DATABASE_URL
    });
    return new MockPrismaClient() as unknown as PrismaClient;
  }

  // Only use mock client if we're explicitly in a test environment or have no URL
  const dbUrl = process.env.DATABASE_URL;
  if (process.env.USE_MOCK_PRISMA === 'true') {
    dbLogger.warn('Mock Prisma client explicitly requested');
    return new MockPrismaClient() as unknown as PrismaClient;
  }

  try {
    const prisma = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });

    // Log queries
    prisma.$on('query', e => {
      dbLog.query(e.query, e.params.split(','), e.duration);
    });

    // Log errors
    prisma.$on('error', e => {
      dbLog.error(e.message, e);
    });

    // Log warnings
    prisma.$on('warn', e => {
      dbLogger.warn('Prisma warning', { message: e.message });
    });

    return prisma;
  } catch (error) {
    dbLogger.error('Failed to create Prisma client', error);
    return new MockPrismaClient() as unknown as PrismaClient;
  }
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Helper to ensure prisma is available with better error handling
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    dbLogger.warn('Prisma client not available, returning mock client');
    return new MockPrismaClient() as unknown as PrismaClient;
  }
  return prisma;
}

// Check if database is actually connected
export async function isDatabaseConnected(): Promise<boolean> {
  if (globalForPrisma.prismaConnectionChecked !== undefined) {
    return globalForPrisma.prismaConnectionChecked;
  }

  try {
    if (!process.env.DATABASE_URL) {
      globalForPrisma.prismaConnectionChecked = false;
      return false;
    }

    // Skip connection check only if explicitly using mock
    if (process.env.USE_MOCK_PRISMA === 'true') {
      globalForPrisma.prismaConnectionChecked = false;
      return false;
    }

    // Try a simple query to check connection
    const client = getPrismaClient();
    if (client instanceof MockPrismaClient) {
      globalForPrisma.prismaConnectionChecked = false;
      return false;
    }

    await client.$queryRaw`SELECT 1`;
    globalForPrisma.prismaConnectionChecked = true;
    return true;
  } catch (error) {
    dbLogger.warn('Database connection check failed', error);
    globalForPrisma.prismaConnectionChecked = false;
    return false;
  }
}

// Transaction helper with logging and fallback
export async function withTransaction<T>(fn: (tx: PrismaClient) => Promise<T>): Promise<T> {
  const client = getPrismaClient();

  const transactionId = `tx_${Date.now()}`;

  dbLog.transaction(transactionId, 'start');

  try {
    if (client instanceof MockPrismaClient) {
      // For mock client, just run the function directly
      const result = await fn(client as unknown as PrismaClient);
      dbLog.transaction(transactionId, 'commit (mock)');
      return result;
    }

    const result = await client.$transaction(async tx => {
      return await fn(tx as PrismaClient);
    });

    dbLog.transaction(transactionId, 'commit');
    return result;
  } catch (error) {
    dbLog.transaction(transactionId, 'rollback');
    throw error;
  }
}

// Safe database operation wrapper
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string = 'database operation'
): Promise<T> {
  try {
    const isConnected = await isDatabaseConnected();
    if (!isConnected) {
      dbLogger.warn('Database not connected, returning fallback', { operationName });
      return fallback;
    }
    return await operation();
  } catch (error) {
    dbLogger.error('Database operation failed', error, { operationName });
    return fallback;
  }
}
