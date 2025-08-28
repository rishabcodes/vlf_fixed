import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { rssGenerator } from '@/services/content-syndication/rss-generator';

// GET /api/rss/[feed] - Serve RSS feed
export async function GET(
  request: NextRequest,
  { params }: { params: { feed: string } }
) {
  try {
    const feedId = params.feed;

    // Check if feed exists
    const feedConfig = rssGenerator.getFeedConfig(feedId);
    if (!feedConfig) {
      return NextResponse.json(
        { error: 'Feed not found' },
        { status: 404 }
      );
    }

    // Generate feed
    const feedXml = await rssGenerator.generateFeed(feedId);

    // Return XML with proper headers
    return new NextResponse(feedXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': `public, max-age=${feedConfig.ttl * 60}`, // TTL in seconds
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    logger.error(`Failed to generate RSS feed ${params.feed}:`, error);
    
    // Return error as XML
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Error</title>
    <description>Failed to generate RSS feed</description>
    <link>https://vasquezlawfirm.com</link>
  </channel>
</rss>`;

    return new NextResponse(errorXml, {
      status: 500,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    });
  }
}
