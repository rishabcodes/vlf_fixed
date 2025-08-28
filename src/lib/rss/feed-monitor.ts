import RssParser from 'rss-parser';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getEnabledFeeds, type RSSFeed } from './feeds-config';

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
  guid?: string;
  categories?: string[];
  author?: string;
  creator?: string; // Dublin Core creator field
  feedName: string;
  feedCategory: string;
}

export interface FeedResult {
  feed: RSSFeed;
  status: 'success' | 'error';
  items?: FeedItem[];
  error?: string;
  fetchTime: number;
}

export class RSSFeedMonitor {
  private parser: RssParser;
  private fetchCache = new Map<string, { items: FeedItem[]; timestamp: number }>();
  private cacheTimeout = 15 * 60 * 1000; // 15 minutes

  constructor() {
    this.parser = new RssParser({
      timeout: 5000, // Default 5 second timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Vasquez Law Firm News Monitor/2.0)',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      customFields: {
        item: [
          ['media:content', 'mediaContent'],
          ['dc:creator', 'creator'],
        ],
      },
    });
  }

  /**
   * Fetch items from a single RSS feed with error handling
   */
  async fetchFeed(feed: RSSFeed): Promise<FeedResult> {
    const startTime = Date.now();

    // Check cache first
    const cached = this.fetchCache.get(feed.url);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      logger.debug(`Using cached feed data for ${feed.name}`);
      return {
        feed,
        status: 'success',
        items: cached.items,
        fetchTime: 0,
      };
    }

    try {
      const timeout = feed.timeout || 5000;
      const feedData = await Promise.race([
        this.parser.parseURL(feed.url),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout)
        ),
      ]);

      const items: FeedItem[] = (feedData.items || []).map(item => ({
        title: item.title || 'Untitled',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: item.contentSnippet,
        content: item.content,
        guid: item.guid,
        categories: item.categories,
        author: item.author || (item as any).creator,
        creator: (item as any).creator,
        feedName: feed.name,
        feedCategory: feed.category,
      }));

      // Update cache
      this.fetchCache.set(feed.url, { items, timestamp: Date.now() });

      logger.info(`Successfully fetched ${items.length} items from ${feed.name}`);

      return {
        feed,
        status: 'success',
        items,
        fetchTime: Date.now() - startTime,
      };
    } catch (error: any) {
      const errorMessage = error.message || 'Unknown error';

      // Log different error types appropriately
      if (errorMessage.includes('403')) {
        logger.warn(`Access forbidden for ${feed.name}: ${feed.url}`);
      } else if (errorMessage.includes('404')) {
        logger.warn(`Feed not found for ${feed.name}: ${feed.url}`);
      } else if (errorMessage.includes('Timeout')) {
        logger.warn(`Feed timeout for ${feed.name}: ${feed.url}`);
      } else {
        logger.error(`Feed error for ${feed.name}:`, errorToLogMeta(error));
      }

      return {
        feed,
        status: 'error',
        error: errorMessage,
        fetchTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Fetch items from multiple feeds in parallel
   */
  async fetchFeeds(feeds: RSSFeed[]): Promise<FeedResult[]> {
    const batchSize = 5; // Process feeds in batches to avoid overwhelming
    const results: FeedResult[] = [];

    for (let i = 0; i < feeds.length; i += batchSize) {
      const batch = feeds.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(feed => this.fetchFeed(feed)));
      results.push(...batchResults);
    }

    return results;
  }

  /**
   * Fetch all enabled feeds for a category
   */
  async fetchByCategory(category?: string): Promise<FeedItem[]> {
    const feeds = getEnabledFeeds(category);
    const results = await this.fetchFeeds(feeds);

    // Aggregate all successful items
    const allItems: FeedItem[] = [];
    results.forEach(result => {
      if (result.status === 'success' && result.items) {
        allItems.push(...result.items);
      }
    });

    // Sort by date (newest first)
    allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    return allItems;
  }

  /**
   * Get feed health statistics
   */
  async checkFeedHealth(): Promise<{
    total: number;
    working: number;
    failing: number;
    results: FeedResult[];
  }> {
    const feeds = getEnabledFeeds();
    const results = await this.fetchFeeds(feeds);

    const working = results.filter(r => r.status === 'success').length;
    const failing = results.filter(r => r.status === 'error').length;

    return {
      total: feeds.length,
      working,
      failing,
      results,
    };
  }

  /**
   * Clear the cache for a specific feed or all feeds
   */
  clearCache(feedUrl?: string) {
    if (feedUrl) {
      this.fetchCache.delete(feedUrl);
    } else {
      this.fetchCache.clear();
    }
  }
}

// Singleton instance
export const rssFeedMonitor = new RSSFeedMonitor();
