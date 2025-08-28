import { NextResponse } from 'next/server';
import { getPrismaClient, isDatabaseConnected } from '@/lib/prisma';

export async function GET() {
  const startTime = Date.now();

  try {
    // Check if database URL is configured
    const hasDbUrl = !!process.env.DATABASE_URL;
    const isLocalDb =
      process.env.DATABASE_URL?.includes('localhost') ||
      process.env.DATABASE_URL?.includes('127.0.0.1');

    // Check if database is connected
    const isConnected = await isDatabaseConnected();

    // Try to perform a simple query if connected
    let querySuccess = false;
    let queryError: string | null = null;
    let tableCount = 0;

    if (isConnected) {
      try {
        const prisma = getPrismaClient();
        // Try to query the database
        const result = await prisma.$queryRaw<
          [{ count: bigint }]
        >`SELECT COUNT(*) as count FROM pg_tables WHERE schemaname = 'public'`;
        tableCount = Number(result[0].count);
        querySuccess = true;
      } catch (error) {
        queryError = error instanceof Error ? error.message : 'Unknown error';
      }
    }

    const responseTime = Date.now() - startTime;

    return NextResponse.json({
      status: isConnected ? 'healthy' : 'unhealthy',
      database: {
        configured: hasDbUrl,
        isLocal: isLocalDb,
        connected: isConnected,
        querySuccess,
        tableCount,
        queryError,
        responseTime: `${responseTime}ms`,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nextAuthUrl: process.env.NEXTAUTH_URL,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        database: {
          configured: !!process.env.DATABASE_URL,
          connected: false,
          responseTime: `${responseTime}ms`,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
