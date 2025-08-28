import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { crossPostingManager } from '@/services/content-syndication/cross-posting-manager';

// GET /api/syndication/strategies - List cross-posting strategies
export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all strategies
    const strategies = (crossPostingManager as any).strategies;
    const strategyList = Array.from(strategies.entries()).map(
      (
        entry
      ): {
        id: string;
        name: string;
        sourceType: string;
        targetPlatforms: string[];
        ruleCount: number;
        schedule: any;
      } => {
        const [id, strategy] = entry as [string, any];
        return {
          id,
          name: strategy.name,
          sourceType: strategy.sourceType,
          targetPlatforms: strategy.targetPlatforms,
          ruleCount: strategy.rules.length,
          schedule: strategy.schedule,
        };
      }
    );

    return NextResponse.json({ success: true, strategies: strategyList });
  } catch (error) {
    logger.error('Failed to get strategies:', error);
    return NextResponse.json({ error: 'Failed to get strategies' }, { status: 500 });
  }
}

// POST /api/syndication/strategies/test - Test which strategies apply to content
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contentId, contentType } = body;

    if (!contentId || !contentType) {
      return NextResponse.json({ error: 'Content ID and type are required' }, { status: 400 });
    }

    // Mock content object for testing
    // In production, would fetch actual content
    const content = {
      id: contentId,
      type: contentType,
      // Additional properties would be fetched from database
    };

    const applicableStrategies = await crossPostingManager.getApplicableStrategies(content);

    return NextResponse.json({
      success: true,
      applicableStrategies,
      count: applicableStrategies.length,
    });
  } catch (error) {
    logger.error('Failed to test strategies:', error);
    return NextResponse.json({ error: 'Failed to test strategies' }, { status: 500 });
  }
}
