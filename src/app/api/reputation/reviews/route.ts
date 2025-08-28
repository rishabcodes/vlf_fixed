import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { reviewHarvester } from '@/services/reputation-management/review-harvester';
import { z } from 'zod';

// Force dynamic rendering since we need to access session and searchParams
// GET /api/reputation/reviews - Get reviews with filters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const platformId = searchParams.get('platformId');
    const sentiment = searchParams.get('sentiment');
    const minRating = searchParams.get('minRating');
    const maxRating = searchParams.get('maxRating');
    const limit = parseInt(searchParams.get('limit') || '20');

    const reviews = await reviewHarvester.getRecentReviews({
      limit,
      platformId: platformId || undefined,
      sentiment: sentiment || undefined,
      minRating: minRating ? parseInt(minRating) : undefined,
      maxRating: maxRating ? parseInt(maxRating) : undefined,
    });

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    logger.error('Failed to get reviews:', error);
    return NextResponse.json({ error: 'Failed to get reviews' }, { status: 500 });
  }
}

// POST /api/reputation/reviews/harvest - Trigger manual harvest
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const schema = z.object({
      platformId: z.string().optional(),
    });

    const validatedData = schema.parse(body);

    let result;
    if (validatedData.platformId) {
      // Harvest specific platform
      result = await reviewHarvester.harvestPlatform(validatedData.platformId);
    } else {
      // Harvest all platforms
      await reviewHarvester.start();
      result = { success: true, message: 'Harvest started for all platforms' };
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    logger.error('Failed to harvest reviews:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to harvest reviews' }, { status: 500 });
  }
}
