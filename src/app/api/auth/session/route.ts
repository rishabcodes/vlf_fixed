import { getServerSession } from 'next-auth';
import { securityLogger } from '@/lib/safe-logger';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { isDatabaseConnected } from '@/lib/prisma';

// Force Node.js runtime for this route as NextAuth requires it
export const runtime = 'nodejs';
// Mark this route as dynamic to prevent static generation
export async function GET() {
  try {
    // Check database connection status
    const dbConnected = await isDatabaseConnected();

    if (!dbConnected) {
      securityLogger.warn('[Session] Database not connected, returning empty session');
      // Return empty session when database is unavailable
      return NextResponse.json({
        user: null,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      // Return a valid but empty session response
      return NextResponse.json({
        user: null,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
    }

    return NextResponse.json(session);
  } catch (error) {
    securityLogger.error('[Session] Endpoint error:', error);

    // Check if it's a database connection error
    if (
      error instanceof Error &&
      (error.message.includes('connect') ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('DATABASE_URL'))
    ) {
      securityLogger.warn('[Session] Database connection error, returning empty session');
    }

    // Return a valid session structure even on error
    return NextResponse.json(
      {
        user: null,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      { status: 200 }
    ); // Return 200 to prevent client errors
  }
}
