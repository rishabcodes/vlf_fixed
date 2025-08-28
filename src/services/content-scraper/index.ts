import { componentLogger, performanceLogger } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
// Puppeteer removed - use @react-pdf/renderer instead;
// Lazy load YouTube API to prevent loading during build
let youtube_v3: any = null;
const getYoutubeApi = async () => {
  if (!youtube_v3) {
    const googleapis = await import('googleapis');
    youtube_v3 = googleapis.youtube_v3;
  }
  return youtube_v3;
};
// axios removed - using native fetch;

export interface ScraperConfig {
  youtube: {
    apiKey: string;
    channelIds: string[];
  };
  tiktok: {
    sessionId: string;
    hashtags: string[];
  };
  instagram: {
    accessToken: string;
    hashtags: string[];
  };
  facebook: {
    accessToken: string;
    pageIds: string[];
  };
}

export interface ScrapedContent {
  platform: string;
  url: string;
  title: string;
  description: string;
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  publishedAt: Date;
  author: string;
  hashtags: string[];
  practiceArea?: string;
  relevanceScore: number;
}

export class ContentScraper {
  private config: ScraperConfig;
  private youtube: any = null;
  // Puppeteer browser removed - web scraping functionality disabled

  constructor(config: ScraperConfig) {
    this.config = config;
    // YouTube API will be initialized on first use
  }

  private async ensureYoutubeInitialized() {
    if (!this.youtube) {
      const YT = await getYoutubeApi();
      this.youtube = new YT.Youtube({
        auth: this.config.youtube.apiKey,
      });
    }
  }

  async initialize() {
    // Puppeteer initialization removed - web scraping functionality disabled
    componentLogger.info('ContentScraper.initialize - Puppeteer removed, web scraping disabled');
  }

  async scrapeYouTube(query: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeYouTube', { query });

    if (!this.youtube) {
      throw new Error('YouTube service not initialized');
    }

    try {
      // Search for videos
      await this.ensureYoutubeInitialized();
      const searchResponse = await this.youtube.search.list({
        part: ['snippet'],
        q: query,
        type: ['video'],
        maxResults: 50,
        order: 'viewCount',
        publishedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
      });

      const videoIds =
        (searchResponse.data.items
          ?.map((item: any) => item.id?.videoId)
          .filter(Boolean) as string[]) || [];

      if (videoIds.length === 0) {
        return [];
      }

      // Get video statistics
      await this.ensureYoutubeInitialized();
      const statsResponse = await this.youtube.videos.list({
        part: ['statistics', 'snippet'],
        id: videoIds,
      });

      const content: ScrapedContent[] = [];

      // Handle the response properly
      for (const video of statsResponse.data.items || []) {
        const stats = video.statistics;
        const snippet = video.snippet;

        if (
          stats &&
          snippet &&
          snippet.title &&
          snippet.description &&
          snippet.publishedAt &&
          snippet.channelTitle
        ) {
          // Calculate engagement rate
          const views = parseInt(stats.viewCount || '0');
          const likes = parseInt(stats.likeCount || '0');
          const comments = parseInt(stats.commentCount || '0');
          const engagementRate = views > 0 ? ((likes + comments) / views) * 100 : 0;

          // Determine relevance
          const relevanceScore = await this.calculateRelevance(
            snippet.title,
            snippet.description,
            query
          );

          if (relevanceScore > 0.7 || engagementRate > 5) {
            content.push({
              platform: 'youtube',
              url: `https://youtube.com/watch?v=${video.id}`,
              title: snippet.title,
              description: snippet.description,
              engagement: {
                views,
                likes,
                comments,
                shares: 0, // YouTube doesn't provide share count
              },
              publishedAt: new Date(snippet.publishedAt),
              author: snippet.channelTitle,
              hashtags: this.extractHashtags(snippet.description),
              relevanceScore,
              practiceArea: await this.detectPracticeArea(
                snippet.title + ' ' + snippet.description
              ),
            });
          }
        }
      }

      // Save to database
      await this.saveScrapedContent(content);

      return content;
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeYouTube failed', { error, query });
      throw error;
    }
  }

  async scrapeTikTok(hashtag: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeTikTok - Disabled (Puppeteer removed)', { hashtag });
    // TikTok scraping functionality removed with Puppeteer
    // This would need to be reimplemented using TikTok's official API or another solution
    return [];
  }

  async scrapeInstagram(hashtag: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeInstagram', { hashtag });

    try {
      // Instagram Graph API
      const response = await fetch(`https://graph.instagram.com/v17.0/ig_hashtag_search`, {
        params: {
          user_id: 'self',
          q: hashtag,
          access_token: this.config.instagram.accessToken,
        },
      }).then(res => res.json());

      const hashtagId = response.data.data[0]?.id;

      if (!hashtagId) {
        throw new Error('Hashtag not found');
      }

      // Get recent media
      const mediaResponse = await fetch(
        `https://graph.instagram.com/v17.0/${hashtagId}/recent_media`,
        {
          params: {
            user_id: 'self',
            fields: 'id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count',
            access_token: this.config.instagram.accessToken,
          },
        }
      ).then(res => res.json());

      const content: ScrapedContent[] = [];

      for (const post of mediaResponse.data.data) {
        const relevanceScore = await this.calculateRelevance(post.caption || '', '', hashtag);

        content.push({
          platform: 'instagram',
          url: post.permalink,
          title: post.caption?.substring(0, 100) || '',
          description: post.caption || '',
          engagement: {
            views: 0, // Instagram doesn't provide view count for posts
            likes: post.like_count || 0,
            comments: post.comments_count || 0,
            shares: 0, // Instagram doesn't provide share count
          },
          publishedAt: new Date(post.timestamp),
          author: 'Unknown', // Would need additional API call
          hashtags: this.extractHashtags(post.caption || ''),
          relevanceScore,
          practiceArea: await this.detectPracticeArea(post.caption || ''),
        });
      }

      await this.saveScrapedContent(content);
      return content;
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeInstagram failed', { error, hashtag });
      throw error;
    }
  }

  async scrapeFacebook(pageId: string): Promise<ScrapedContent[]> {
    componentLogger.info('ContentScraper.scrapeFacebook', { pageId });

    try {
      // Facebook Graph API
      const response = await fetch(`https://graph.facebook.com/v17.0/${pageId}/posts`, {
        params: {
          fields:
            'message,created_time,permalink_url,shares,reactions.summary(true).then(res => res.json()),comments.summary(true)',
          access_token: this.config.facebook.accessToken,
          limit: 50,
        },
      });

      const content: ScrapedContent[] = [];

      for (const post of response.data.data) {
        if (!post.message) continue;

        const relevanceScore = await this.calculateRelevance(post.message, '', '');

        content.push({
          platform: 'facebook',
          url: post.permalink_url,
          title: post.message.substring(0, 100),
          description: post.message,
          engagement: {
            views: 0, // Facebook doesn't provide view count
            likes: post.reactions?.summary?.total_count || 0,
            comments: post.comments?.summary?.total_count || 0,
            shares: post.shares?.count || 0,
          },
          publishedAt: new Date(post.created_time),
          author: pageId,
          hashtags: this.extractHashtags(post.message),
          relevanceScore,
          practiceArea: await this.detectPracticeArea(post.message),
        });
      }

      await this.saveScrapedContent(content);
      return content;
    } catch (error) {
      componentLogger.error('ContentScraper.scrapeFacebook failed', { error, pageId });
      throw error;
    }
  }

  async scrapeCompetitorWebsite(url: string): Promise<{
    url: string;
    title: string;
    description: string;
    keywords: string[];
    headings: { h1: string[]; h2: string[]; h3: string[] };
    images: Array<{ src: string; alt: string }>;
    links: Array<{ href: string; text: string }>;
    structuredData: Record<string, unknown>;
    blogPosts: Array<{
      title: string;
      url: string;
      excerpt: string;
      publishDate: string;
    }>;
    seoData: {
      title?: string;
      metaDescription?: string;
      metaKeywords?: string;
      canonical?: string;
      ogTitle?: string;
      ogDescription?: string;
      schemas: unknown[];
    };
    totalPosts: number;
  }> {
    componentLogger.info('ContentScraper.scrapeCompetitorWebsite - Disabled (Puppeteer removed)', { url });
    // Competitor website scraping functionality removed with Puppeteer
    // This would need to be reimplemented using alternative methods
    return {
      url,
      title: '',
      description: '',
      keywords: [],
      headings: { h1: [], h2: [], h3: [] },
      images: [],
      links: [],
      structuredData: {},
      blogPosts: [],
      seoData: {
        schemas: [],
      },
      totalPosts: 0,
    };
  }

  private async calculateRelevance(
    title: string,
    description: string,
    query: string
  ): Promise<number> {
    // Simple relevance calculation - can be enhanced with ML
    const text = `${title} ${description}`.toLowerCase();
    const queryTerms = query.toLowerCase().split(' ');

    let matches = 0;
    for (const term of queryTerms) {
      if (text.includes(term)) {
        matches++;
      }
    }

    // Legal keywords boost
    const legalKeywords = [
      'law',
      'legal',
      'attorney',
      'lawyer',
      'court',
      'case',
      'rights',
      'ley',
      'legal',
      'abogado',
      'corte',
      'caso',
      'derechos',
    ];

    const legalMatches = legalKeywords.filter(keyword => text.includes(keyword)).length;

    return Math.min(1, matches / queryTerms.length + legalMatches * 0.1);
  }

  private extractHashtags(text: string): string[] {
    const hashtags = text.match(/#[a-zA-Z0-9_]+/g) || [];
    return hashtags.map(tag => tag.substring(1));
  }

  private async detectPracticeArea(text: string): Promise<string | undefined> {
    const practiceAreaKeywords = {
      immigration: [
        'immigration',
        'visa',
        'green card',
        'citizenship',
        'inmigración',
        'ciudadanía',
      ],
      'personal-injury': [
        'accident',
        'injury',
        'compensation',
        'accidente',
        'lesión',
        'compensación',
      ],
      'workers-compensation': [
        'workers comp',
        'workplace injury',
        'compensación laboral',
        'lesión laboral',
      ],
      'criminal-defense': ['criminal', 'arrest', 'dui', 'dwi', 'criminal', 'arresto'],
      'family-law': ['divorce', 'custody', 'child support', 'divorcio', 'custodia', 'manutención'],
      'traffic-violations': ['traffic', 'speeding', 'ticket', 'tráfico', 'multa', 'velocidad'],
    };

    const lowercaseText = text.toLowerCase();

    for (const [area, keywords] of Object.entries(practiceAreaKeywords)) {
      if (keywords.some(keyword => lowercaseText.includes(keyword))) {
        return area;
      }
    }

    return undefined;
  }

  private async saveScrapedContent(content: ScrapedContent[]) {
    for (const item of content) {
      try {
        await getPrismaClient().scrapedContent.upsert({
          where: { url: item.url },
          update: {
            engagement: item.engagement,
            relevanceScore: item.relevanceScore,
            updatedAt: new Date(),
          },
          create: {
            platform: item.platform,
            url: item.url,
            title: item.title,
            description: item.description,
            engagement: item.engagement,
            publishedAt: item.publishedAt,
            author: item.author,
            hashtags: item.hashtags,
            practiceArea: item.practiceArea,
            relevanceScore: item.relevanceScore,
          },
        });
      } catch (error) {
        componentLogger.error('ContentScraper.saveScrapedContent failed', { error, url: item.url });
      }
    }

    performanceLogger.measure('content-scraped', Date.now() - Date.now(), {
      count: content.length,
    });
  }

  async close() {
    // Puppeteer browser close removed - no longer needed
    componentLogger.info('ContentScraper.close - No browser to close (Puppeteer removed)');
  }
}
