import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';

// Cache third-party scripts for better performance
const CACHE_DURATION = 3600; // 1 hour

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    // Validate URL is from allowed domains
    const parsedUrl = new URL(url);
    const allowedHosts = [
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'vitals.vercel-insights.com',
      'www.googleadservices.com',
    ];

    if (!allowedHosts.includes(parsedUrl.hostname)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Fetch the script
    const response = await fetch(url, {
      headers: {
        'User-Agent': request.headers.get('User-Agent') || '',
      },
    });

    if (!response.ok) {
      return new NextResponse('Failed to fetch script', { status: response.status });
    }

    const content = await response.text();

    // Return the script with appropriate headers
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': `public, max-age=${CACHE_DURATION}`,
        'Access-Control-Allow-Origin': '*',
        // Remove X-Frame-Options to allow Partytown to load scripts
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    logger.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
