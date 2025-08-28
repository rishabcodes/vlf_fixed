import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { cache, redis } from '@/lib/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const action = request.nextUrl.searchParams.get('action');

    switch (action) {
      case 'info':
        const info = await cache.info();
        return NextResponse.json({ info });

      case 'keys':
        const pattern = request.nextUrl.searchParams.get('pattern') || '*';
        const keys = await redis.keys(pattern);
        return NextResponse.json({ keys, count: keys.length });

      case 'stats':
        const stats = await getDetailedStats();
        return NextResponse.json(stats);

      default:
        return NextResponse.json({
          endpoints: {
            info: '/api/admin/cache?action=info',
            keys: '/api/admin/cache?action=keys&pattern=*',
            stats: '/api/admin/cache?action=stats',
          },
        });
    }
  } catch (error) {
    apiLogger.error('Cache API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, key, pattern } = body;

    switch (action) {
      case 'flush':
        await cache.flush();
        return NextResponse.json({ message: 'Cache flushed successfully' });

      case 'delete':
        if (key) {
          await cache.delete(key);
          return NextResponse.json({ message: `Key ${key} deleted` });
        }
        break;

      case 'deletePattern':
        if (pattern) {
          await cache.deletePattern(pattern);
          return NextResponse.json({ message: `Pattern ${pattern} deleted` });
        }
        break;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    apiLogger.error('Cache DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getDetailedStats() {
  const info = await cache.info();
  const dbSize = await redis.dbsize();

  // Get key distribution by type
  const keyPatterns = [
    { pattern: 'user:*', type: 'Users' },
    { pattern: 'case:*', type: 'Cases' },
    { pattern: 'blog:*', type: 'Blog Posts' },
    { pattern: 'session:*', type: 'Sessions' },
    { pattern: 'api:*', type: 'API Responses' },
    { pattern: 'ratelimit:*', type: 'Rate Limits' },
    { pattern: 'call:*', type: 'Voice Calls' },
    { pattern: 'conversation:*', type: 'Chat Conversations' },
  ];

  const distribution: Record<string, number> = {};

  for (const { pattern, type } of keyPatterns) {
    const keys = await redis.keys(pattern);
    distribution[type] = keys.length;
  }

  // Get memory usage by key pattern (sample)
  const memorySample: Record<string, number> = {};
  for (const { pattern, type } of keyPatterns) {
    const keys = await redis.keys(pattern);
    const sampleKeys = keys.slice(0, 10); // Sample first 10 keys

    let totalMemory = 0;
    for (const key of sampleKeys) {
      try {
        const memory = await redis.memory('USAGE', key);
        totalMemory += memory || 0;
      } catch (e) {
        // Memory command might not be available
      }
    }

    memorySample[type] = keys.length > 0 ? Math.round(totalMemory / sampleKeys.length) : 0;
  }

  return {
    info,
    totalKeys: dbSize,
    distribution,
    memorySample,
    timestamp: new Date().toISOString(),
  };
}
