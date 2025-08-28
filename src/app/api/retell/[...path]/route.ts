import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { handleRetellMockRequest, isMockEnvironment } from '@/lib/mocks';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const pathname = `/api/retell/${params.path.join('/')}`;

  // Use mock in development or when configured
  if (isMockEnvironment()) {
    try {
      const result = await handleRetellMockRequest(req, pathname);
      if (result) {
        return NextResponse.json(result);
      }
    } catch (error) {
      logger.error('[Retell Mock] Error:', error);
      return NextResponse.json({ error: 'Mock service error' }, { status: 500 });
    }
  }

  // In production, forward to real Retell API
  const retellApiUrl = `https://api.retellai.com${pathname.replace('/api/retell', '')}`;

  try {
    const response = await fetch(retellApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    logger.error('[Retell API] Error:', error);
    return NextResponse.json({ error: 'API request failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const pathname = `/api/retell/${params.path.join('/')}`;

  // Use mock in development or when configured
  if (isMockEnvironment()) {
    try {
      const result = await handleRetellMockRequest(req, pathname);
      if (result) {
        return NextResponse.json(result);
      }
    } catch (error) {
      logger.error('[Retell Mock] Error:', error);
      return NextResponse.json({ error: 'Mock service error' }, { status: 500 });
    }
  }

  // In production, forward to real Retell API
  const retellApiUrl = `https://api.retellai.com${pathname.replace('/api/retell', '')}`;
  const body = await req.json();

  try {
    const response = await fetch(retellApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    logger.error('[Retell API] Error:', error);
    return NextResponse.json({ error: 'API request failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  const pathname = `/api/retell/${params.path.join('/')}`;

  // Use mock in development or when configured
  if (isMockEnvironment()) {
    try {
      const result = await handleRetellMockRequest(req, pathname);
      if (result) {
        return NextResponse.json(result);
      }
    } catch (error) {
      logger.error('[Retell Mock] Error:', error);
      return NextResponse.json({ error: 'Mock service error' }, { status: 500 });
    }
  }

  // In production, forward to real Retell API
  const retellApiUrl = `https://api.retellai.com${pathname.replace('/api/retell', '')}`;
  const body = await req.json();

  try {
    const response = await fetch(retellApiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    logger.error('[Retell API] Error:', error);
    return NextResponse.json({ error: 'API request failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  const pathname = `/api/retell/${params.path.join('/')}`;

  // Use mock in development or when configured
  if (isMockEnvironment()) {
    try {
      const result = await handleRetellMockRequest(req, pathname);
      if (result) {
        return NextResponse.json({ success: true });
      }
    } catch (error) {
      logger.error('[Retell Mock] Error:', error);
      return NextResponse.json({ error: 'Mock service error' }, { status: 500 });
    }
  }

  // In production, forward to real Retell API
  const retellApiUrl = `https://api.retellai.com${pathname.replace('/api/retell', '')}`;

  try {
    const response = await fetch(retellApiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    logger.error('[Retell API] Error:', error);
    return NextResponse.json({ error: 'API request failed' }, { status: 500 });
  }
}
