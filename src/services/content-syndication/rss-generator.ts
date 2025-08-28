import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import RSS from 'rss';
import { z } from 'zod';

export class RSSFeedGenerator {
  private feeds: Map<string, RSSFeedConfig> = new Map();

  constructor() {
    this.initializeFeeds();
  }

  private initializeFeeds(): void {
    // Main blog feed
    this.registerFeed({
      id: 'main-blog',
      title: 'Vasquez Law Firm - Legal Insights & Updates',
      description:
        'Expert legal advice and updates on immigration, criminal defense, family law, and personal injury from Vasquez Law Firm',
      feedUrl: 'https://vasquezlawfirm.com/feed',
      siteUrl: 'https://vasquezlawfirm.com',
      language: 'en',
      categories: ['Legal', 'Law', 'Immigration', 'Criminal Defense'],
      ttl: 60, // 60 minutes
    });

    // Spanish blog feed
    this.registerFeed({
      id: 'spanish-blog',
      title: 'Vasquez Law Firm - Información Legal en Español',
      description:
        'Asesoramiento legal experto y actualizaciones sobre inmigración, defensa criminal, derecho familiar y lesiones personales',
      feedUrl: 'https://vasquezlawfirm.com/es/feed',
      siteUrl: 'https://vasquezlawfirm.com/es',
      language: 'es',
      categories: ['Legal', 'Derecho', 'Inmigración', 'Defensa Criminal'],
      ttl: 60,
    });

    // Practice area specific feeds
    this.registerFeed({
      id: 'immigration',
      title: 'Immigration Law Updates - Vasquez Law Firm',
      description: 'Latest immigration law updates, policy changes, and legal guidance',
      feedUrl: 'https://vasquezlawfirm.com/immigration/feed',
      siteUrl: 'https://vasquezlawfirm.com/immigration',
      language: 'en',
      categories: ['Immigration Law', 'Legal'],
      contentFilter: { practiceArea: 'immigration' },
      ttl: 60,
    });

    this.registerFeed({
      id: 'criminal-defense',
      title: 'Criminal Defense Law Updates - Vasquez Law Firm',
      description: 'Criminal defense strategies, case law updates, and legal rights information',
      feedUrl: 'https://vasquezlawfirm.com/criminal-defense/feed',
      siteUrl: 'https://vasquezlawfirm.com/criminal-defense',
      language: 'en',
      categories: ['Criminal Law', 'Legal'],
      contentFilter: { practiceArea: 'criminal-defense' },
      ttl: 60,
    });

    this.registerFeed({
      id: 'family-law',
      title: 'Family Law Updates - Vasquez Law Firm',
      description: 'Family law guidance on divorce, custody, and domestic matters',
      feedUrl: 'https://vasquezlawfirm.com/family-law/feed',
      siteUrl: 'https://vasquezlawfirm.com/family-law',
      language: 'en',
      categories: ['Family Law', 'Legal'],
      contentFilter: { practiceArea: 'family-law' },
      ttl: 60,
    });

    // News feed
    this.registerFeed({
      id: 'news',
      title: 'Legal News - Vasquez Law Firm',
      description: 'Breaking legal news and updates affecting North Carolina and nationwide',
      feedUrl: 'https://vasquezlawfirm.com/news/feed',
      siteUrl: 'https://vasquezlawfirm.com/news',
      language: 'en',
      categories: ['Legal News', 'Law Updates'],
      contentFilter: { type: 'news' },
      ttl: 30, // 30 minutes for news
    });

    // Podcast feed
    this.registerFeed({
      id: 'podcast',
      title: 'Legal Matters Podcast - Vasquez Law Firm',
      description: 'Weekly discussions on legal topics, client stories, and expert interviews',
      feedUrl: 'https://vasquezlawfirm.com/podcast/feed',
      siteUrl: 'https://vasquezlawfirm.com/podcast',
      language: 'en',
      categories: ['Legal', 'Podcast'],
      contentFilter: { type: 'podcast' },
      ttl: 1440, // 24 hours
      isPodcast: true,
      podcastConfig: {
        author: 'Vasquez Law Firm',
        subtitle: 'Legal insights and advice from experienced attorneys',
        summary:
          'Join the attorneys at Vasquez Law Firm for weekly discussions on immigration, criminal defense, family law, and personal injury topics.',
        owner: {
          name: 'Vasquez Law Firm',
          email: 'podcast@vasquezlawfirm.com',
        },
        image: 'https://vasquezlawfirm.com/images/podcast-cover.jpg',
        category: 'News',
        subcategory: 'Politics',
        explicit: false,
      },
    });
  }

  private registerFeed(config: RSSFeedConfig): void {
    this.feeds.set(config.id, config);
  }

  async generateFeed(feedId: string): Promise<string> {
    const feedConfig = this.feeds.get(feedId);
    if (!feedConfig) {
      throw new Error(`Feed not found: ${feedId}`);
    }

    try {
      // Create RSS feed instance
      const feed = new RSS({
        title: feedConfig.title,
        description: feedConfig.description,
        feed_url: feedConfig.feedUrl,
        site_url: feedConfig.siteUrl,
        image_url: feedConfig.imageUrl || 'https://vasquezlawfirm.com/images/logo.png',
        copyright: `© ${new Date().getFullYear()} Vasquez Law Firm, PLLC`,
        language: feedConfig.language,
        categories: feedConfig.categories,
        ttl: feedConfig.ttl,
        pubDate: new Date(),
        generator: 'VLF RSS Generator',
        ...(feedConfig.isPodcast && {
          custom_namespaces: {
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
          },
          custom_elements: [
            { 'itunes:author': feedConfig.podcastConfig?.author },
            { 'itunes:subtitle': feedConfig.podcastConfig?.subtitle },
            { 'itunes:summary': feedConfig.podcastConfig?.summary },
            {
              'itunes:owner': [
                { 'itunes:name': feedConfig.podcastConfig?.owner.name },
                { 'itunes:email': feedConfig.podcastConfig?.owner.email },
              ],
            },
            { 'itunes:image': { _attr: { href: feedConfig.podcastConfig?.image } } },
            {
              'itunes:category': [
                {
                  _attr: { text: feedConfig.podcastConfig?.category },
                },
                feedConfig.podcastConfig?.subcategory && {
                  'itunes:category': {
                    _attr: { text: feedConfig.podcastConfig.subcategory },
                  },
                },
              ].filter(Boolean),
            },
            { 'itunes:explicit': feedConfig.podcastConfig?.explicit ? 'yes' : 'no' },
          ],
        }),
      });

      // Fetch content based on filter
      const content = await this.fetchContent(feedConfig);

      // Add items to feed
      for (const item of content) {
        const feedItem: any = {
          title: item.title,
          description: item.excerpt || item.description,
          url: item.url,
          guid: item.id,
          categories: item.categories || [],
          date: item.publishedAt,
          author: item.author?.name || 'Vasquez Law Firm',
        };

        // Add custom content for different types
        if (item.content) {
          feedItem.custom_elements = [{ 'content:encoded': { _cdata: item.content } }];
        }

        // Add media enclosures
        if (item.featuredImage) {
          feedItem.enclosure = {
            url: item.featuredImage.url,
            type: item.featuredImage.mimeType || 'image/jpeg',
          };
        }

        // Podcast-specific elements
        if (feedConfig.isPodcast && item.audioUrl) {
          feedItem.enclosure = {
            url: item.audioUrl,
            type: 'audio/mpeg',
            length: item.audioSize || 0,
          };

          feedItem.custom_elements = [
            ...(feedItem.custom_elements || []),
            { 'itunes:duration': item.duration || '00:00' },
            { 'itunes:episode': item.episodeNumber },
            { 'itunes:season': item.seasonNumber || 1 },
            { 'itunes:episodeType': item.episodeType || 'full' },
            { 'itunes:explicit': item.explicit ? 'yes' : 'no' },
          ];
        }

        feed.item(feedItem);
      }

      return feed.xml({ indent: true });
    } catch (error) {
      logger.error(`Failed to generate RSS feed ${feedId}:`, errorToLogMeta(error));
      throw error;
    }
  }

  private async fetchContent(feedConfig: RSSFeedConfig): Promise<any[]> {
    const where: any = {
      status: 'published',
      publishedAt: { not: null },
    };

    // Apply content filters
    if (feedConfig.contentFilter) {
      if (feedConfig.contentFilter.practiceArea) {
        where.practiceArea = feedConfig.contentFilter.practiceArea;
      }
      if (feedConfig.contentFilter.type) {
        where.type = feedConfig.contentFilter.type;
      }
      if (feedConfig.contentFilter.language) {
        where.language = feedConfig.contentFilter.language;
      }
    }

    // Apply language filter
    if (feedConfig.language) {
      where.language = feedConfig.language;
    }

    // Fetch content from appropriate table
    const contentType = feedConfig.contentFilter?.type || 'blog';
    let content: any[] = [];

    switch (contentType) {
      case 'blog':
        content = await prisma.blogPost.findMany({
          where,
          orderBy: { publishedAt: 'desc' },
          take: 20,
          include: {},
        });
        break;

      case 'news':
        // TODO: Implement newsArticle model
        // content = await prisma.newsArticle.findMany({
        /*
          where,
          orderBy: { publishedAt: 'desc' },
          take: 20,
          include: {
            author: true,
          },
        });
        */
        content = [];
        break;

      case 'podcast':
        // TODO: Implement podcastEpisode model
        // content = await prisma.podcastEpisode.findMany({
        content = [];
        break;
      /*
          where,
          orderBy: { publishedAt: 'desc' },
          take: 20,
          include: {
            show: true,
            guests: true,
          },
        });
        */
    }

    // Transform content to standard format
    return content.map(item => this.transformContentForFeed(item, contentType));
  }

  private transformContentForFeed(item: any, type: string): any {
    const baseUrl = 'https://vasquezlawfirm.com';

    switch (type) {
      case 'blog':
        return {
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          url: `${baseUrl}/blog/${item.slug}`,
          publishedAt: item.publishedAt,
          author: item.author,
          categories: item.categories?.map((c: any) => c.name) || [],
          featuredImage: item.featuredImage
            ? {
                url: item.featuredImage,
                mimeType: 'image/jpeg',
              }
            : null,
        };

      case 'news':
        return {
          id: item.id,
          title: item.title,
          description: item.summary,
          content: item.content,
          url: `${baseUrl}/news/${item.slug}`,
          publishedAt: item.publishedAt,
          author: item.author,
          categories: ['News'],
        };

      case 'podcast':
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          content: item.showNotes,
          url: `${baseUrl}/podcast/${item.show.slug}/${item.slug}`,
          publishedAt: item.publishedAt,
          author: { name: item.show.host },
          categories: ['Podcast'],
          audioUrl: item.audioUrl,
          audioSize: item.audioSize,
          duration: item.duration,
          episodeNumber: item.episodeNumber,
          seasonNumber: item.seasonNumber,
          explicit: false,
        };

      default:
        return item;
    }
  }

  // Generate all feeds
  async generateAllFeeds(): Promise<Map<string, string>> {
    const generatedFeeds = new Map<string, string>();

    for (const [feedId, config] of this.feeds) {
      if (!config.enabled) continue;

      try {
        const feedXml = await this.generateFeed(feedId);
        generatedFeeds.set(feedId, feedXml);
        logger.info(`Generated RSS feed: ${feedId}`);
      } catch (error) {
        logger.error(`Failed to generate feed ${feedId}:`, errorToLogMeta(error));
      }
    }

    return generatedFeeds;
  }

  // Save feeds to storage
  async saveFeeds(feeds: Map<string, string>): Promise<void> {
    for (const [feedId, feedXml] of feeds) {
      const config = this.feeds.get(feedId);
      if (!config) continue;

      try {
        // TODO: Implement rssFeed model in Prisma schema
        // await prisma.rssFeed.upsert({
        //   where: { feedId },
        //   update: {
        //     content: feedXml,
        //     updatedAt: new Date(),
        //   },
        //   create: {
        //     feedId,
        //     title: config.title,
        //     url: config.feedUrl,
        //     content: feedXml,
        //   },
        // });

        // Also save to file system for direct serving
        // Implementation would save to public directory
        logger.info(`Saved RSS feed: ${feedId}`);
      } catch (error) {
        logger.error(`Failed to save feed ${feedId}:`, errorToLogMeta(error));
      }
    }
  }

  // Get feed configuration
  getFeedConfig(feedId: string): RSSFeedConfig | undefined {
    return this.feeds.get(feedId);
  }

  // List all available feeds
  listFeeds(): Array<{ id: string; title: string; url: string; enabled: boolean }> {
    return Array.from(this.feeds.entries()).map(([id, config]) => ({
      id,
      title: config.title,
      url: config.feedUrl,
      enabled: config.enabled !== false,
    }));
  }

  // Enable/disable feed
  setFeedEnabled(feedId: string, enabled: boolean): void {
    const config = this.feeds.get(feedId);
    if (config) {
      config.enabled = enabled;
      logger.info(`Feed ${feedId} ${enabled ? 'enabled' : 'disabled'}`);
    }
  }

  // Update feed on content changes
  async updateFeedForContent(contentType: string, contentId: string): Promise<void> {
    const affectedFeeds = Array.from(this.feeds.entries())
      .filter(([_, config]) => {
        if (!config.enabled) return false;
        if (!config.contentFilter) return true; // Main feed includes all
        return config.contentFilter.type === contentType;
      })
      .map(([id]) => id);

    for (const feedId of affectedFeeds) {
      try {
        const feedXml = await this.generateFeed(feedId);
        await this.saveFeeds(new Map([[feedId, feedXml]]));
        logger.info(`Updated feed ${feedId} for new ${contentType} content`);
      } catch (error) {
        logger.error(`Failed to update feed ${feedId}:`, errorToLogMeta(error));
      }
    }
  }
}

// RSS Feed Configuration
interface RSSFeedConfig {
  id: string;
  title: string;
  description: string;
  feedUrl: string;
  siteUrl: string;
  imageUrl?: string;
  language: string;
  categories: string[];
  ttl: number; // Time to live in minutes
  enabled?: boolean;
  contentFilter?: {
    type?: string;
    practiceArea?: string;
    language?: string;
  };
  isPodcast?: boolean;
  podcastConfig?: {
    author: string;
    subtitle: string;
    summary: string;
    owner: {
      name: string;
      email: string;
    };
    image: string;
    category: string;
    subcategory?: string;
    explicit: boolean;
  };
}

export const rssGenerator = new RSSFeedGenerator();
