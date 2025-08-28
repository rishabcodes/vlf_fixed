import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { syndicationEngine } from '@/services/content-syndication/syndication-engine';
// import { syndicationScheduler } from '@/services/content-syndication/syndication-scheduler';
import { crossPostingManager } from '@/services/content-syndication/cross-posting-manager';
import { z } from 'zod';

// POST /api/syndication - Syndicate content to platforms
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const schema = z.object({
      contentId: z.string(),
      contentType: z.enum(['blog', 'news', 'case_study', 'guide', 'video']),
      platforms: z.array(z.string()).optional(),
      scheduleTime: z.string().optional(),
      strategy: z.string().optional(),
    });

    const validatedData = schema.parse(body);

    let result;

    if (validatedData.strategy) {
      // Execute specific cross-posting strategy
      result = await crossPostingManager.executeStrategy(validatedData.strategy, {
        id: validatedData.contentId,
        type: validatedData.contentType,
        // Additional content data would be fetched here
      });
    } else {
      // Direct syndication
      result = await syndicationEngine.syndicateContent({
        contentId: validatedData.contentId,
        contentType: validatedData.contentType,
        platforms: validatedData.platforms,
        scheduleTime: validatedData.scheduleTime ? new Date(validatedData.scheduleTime) : undefined,
      });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    logger.error('Syndication failed:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Syndication failed' }, { status: 500 });
  }
}

// GET /api/syndication - Get syndication analytics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const platform = searchParams.get('platform');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Start date and end date are required' }, { status: 400 });
    }

    const analytics = await syndicationEngine.getSyndicationAnalytics({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      platform: platform || undefined,
    });

    return NextResponse.json({ success: true, analytics });
  } catch (error) {
    logger.error('Failed to get syndication analytics:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}
