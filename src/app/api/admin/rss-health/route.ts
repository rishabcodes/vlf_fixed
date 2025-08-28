import { NextRequest, NextResponse } from 'next/server';
import { rssFeedMonitor } from '@/lib/rss/feed-monitor';
import { getEnabledFeeds, DISABLED_FEEDS, FEED_CATEGORIES } from '@/lib/rss/feeds-config';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const checkDisabled = searchParams.get('checkDisabled') === 'true';

    logger.info('RSS health check requested', { category, checkDisabled });

    // Get feed health
    const health = await rssFeedMonitor.checkFeedHealth();

    // Optionally check disabled feeds
    let disabledResults: Awaited<ReturnType<typeof rssFeedMonitor.fetchFeeds>> | null = null;
    if (checkDisabled) {
      disabledResults = await rssFeedMonitor.fetchFeeds(DISABLED_FEEDS);
    }

    // Get category breakdown
    const categoryBreakdown: Record<string, { total: number; working: number; failing: number }> =
      {};
    for (const cat of FEED_CATEGORIES) {
      const categoryFeeds = getEnabledFeeds(cat);
      if (categoryFeeds.length === 0) continue;

      const categoryResults = health.results.filter(r => r.feed.category === cat);
      categoryBreakdown[cat] = {
        total: categoryFeeds.length,
        working: categoryResults.filter(r => r.status === 'success').length,
        failing: categoryResults.filter(r => r.status === 'error').length,
      };
    }

    // Get latest items
    const latestItems = category
      ? await rssFeedMonitor.fetchByCategory(category)
      : await rssFeedMonitor.fetchByCategory();

    const response = {
      timestamp: new Date().toISOString(),
      overall: {
        total: health.total,
        working: health.working,
        failing: health.failing,
        healthPercentage: Math.round((health.working / health.total) * 100),
      },
      categoryBreakdown,
      failingFeeds: health.results
        .filter(r => r.status === 'error')
        .map(r => ({
          name: r.feed.name,
          url: r.feed.url,
          category: r.feed.category,
          error: r.error,
          fetchTime: r.fetchTime,
        })),
      slowFeeds: health.results
        .filter(r => r.status === 'success' && r.fetchTime > 3000)
        .map(r => ({
          name: r.feed.name,
          url: r.feed.url,
          category: r.feed.category,
          fetchTime: r.fetchTime,
          itemCount: r.items?.length || 0,
        }))
        .sort((a, b) => b.fetchTime - a.fetchTime),
      latestItems: latestItems.slice(0, 10).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: item.feedName,
        category: item.feedCategory,
        excerpt: item.contentSnippet?.substring(0, 100) + '...',
      })),
      disabledFeeds: disabledResults
        ? {
            total: DISABLED_FEEDS.length,
            nowWorking: disabledResults
              .filter(r => r.status === 'success')
              .map(r => ({
                name: r.feed.name,
                url: r.feed.url,
                category: r.feed.category,
                itemCount: r.items?.length || 0,
              })),
            stillFailing: disabledResults
              .filter(r => r.status === 'error')
              .map(r => ({
                name: r.feed.name,
                url: r.feed.url,
                category: r.feed.category,
                error: r.error,
              })),
          }
        : null,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    logger.error('Error checking RSS health:', errorToLogMeta(error));

    return NextResponse.json(
      {
        error: 'Failed to check RSS feed health',
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
      }
    );
  }
}

// Clear RSS cache
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { feedUrl } = body;

    if (feedUrl) {
      rssFeedMonitor.clearCache(feedUrl);
      logger.info(`Cleared cache for feed: ${feedUrl}`);
    } else {
      rssFeedMonitor.clearCache();
      logger.info('Cleared all RSS feed cache');
    }

    return NextResponse.json({
      success: true,
      message: feedUrl ? `Cache cleared for ${feedUrl}` : 'All cache cleared',
    });
  } catch (error) {
    logger.error('Error clearing RSS cache:', errorToLogMeta(error));

    return NextResponse.json(
      {
        error: 'Failed to clear RSS cache',
      },
      {
        status: 500,
      }
    );
  }
}
