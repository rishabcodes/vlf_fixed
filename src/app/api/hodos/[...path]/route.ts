import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/safe-logger';

export const runtime = 'nodejs';
const HODOS_API_URL = process.env.HODOS_API_URL || 'http://localhost:3001';
const HODOS_API_KEY = process.env.HODOS_API_KEY || '';

/**
 * Proxy handler for HODOS API requests
 * Allows VLF Website to securely communicate with HODOS platform
 */
async function handler(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract path from catch-all route
    const path = req.nextUrl.pathname.replace('/api/hodos/', '');

    // Build HODOS URL
    const hodosUrl = `${HODOS_API_URL}/api/${path}${req.nextUrl.search}`;

    // Forward the request to HODOS
    const hodosResponse = await fetch(hodosUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HODOS_API_KEY}`,
        'X-Source': 'vlf-website',
        'X-User-Id': session.user.id,
        'X-User-Email': session.user.email || '',
      },
      body: req.body ? await req.text() : undefined,
    });

    // Parse response
    const data = await hodosResponse.json();

    // Log the interaction
    logger.info('HODOS API proxy request', {
      path,
      method: req.method,
      userId: session.user.id,
      status: hodosResponse.status,
    });

    // Return the response
    return NextResponse.json(data, {
      status: hodosResponse.status,
      headers: {
        'X-HODOS-Request-Id': hodosResponse.headers.get('X-Request-Id') || '',
      },
    });
  } catch (error) {
    logger.error('HODOS API proxy error', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
