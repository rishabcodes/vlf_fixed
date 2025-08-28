import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { logger } from '@/lib/safe-logger';

// Secret token for revalidation (should be set in environment variables)
const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN || 'your-secret-revalidation-token';

export async function POST(request: NextRequest) {
  try {
    // Check for secret token
    const token = request.headers.get('x-revalidation-token');

    if (token !== REVALIDATION_TOKEN) {
      return NextResponse.json({ error: 'Invalid revalidation token' }, { status: 401 });
    }

    // Get the path or tag to revalidate from the request body
    const body = await request.json();
    const { path, tag, type = 'path' } = body;

    if (!path && !tag) {
      return NextResponse.json({ error: 'Missing path or tag parameter' }, { status: 400 });
    }

    // Revalidate based on type
    if (type === 'tag' && tag) {
      revalidateTag(tag);
      logger.info(`Revalidated tag: ${tag}`);
    } else if (path) {
      // Revalidate the specified path
      revalidatePath(path);
      logger.info(`Revalidated path: ${path}`);

      // If it's a blog post, also revalidate the blog listing pages
      if (path.includes('/blog/')) {
        revalidatePath('/blog');
        revalidatePath('/es/blog');
        logger.info('Also revalidated blog listing pages');
      }

      // If it's an attorney page, also revalidate the attorneys listing
      if (path.includes('/attorneys/')) {
        revalidatePath('/attorneys');
        revalidatePath('/es/abogados');
        logger.info('Also revalidated attorneys listing pages');
      }
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      path: path || undefined,
      tag: tag || undefined,
    });
  } catch (error) {
    logger.error('Error in revalidation:', error);
    return NextResponse.json(
      {
        error: 'Error revalidating',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Also support GET for testing (in development only)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'GET method not allowed in production' }, { status: 405 });
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is working. Use POST method with x-revalidation-token header.',
    example: {
      headers: { 'x-revalidation-token': 'your-token' },
      body: { path: '/blog/some-post' },
    },
  });
}
