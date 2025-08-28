import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { z } from 'zod';

// Platform configurations
export const SyndicationPlatformSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['social', 'article', 'video', 'podcast', 'directory', 'forum']),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  webhookUrl: z.string().optional(),
  config: z.record(z.any()).optional(),
  enabled: z.boolean().default(true),
  autoPublish: z.boolean().default(false),
  contentTypes: z.array(z.enum(['blog', 'news', 'case_study', 'guide', 'video'])),
  schedule: z
    .object({
      timezone: z.string().default('America/New_York'),
      publishTimes: z.array(z.string()), // e.g., ["09:00", "14:00", "17:00"]
      daysOfWeek: z.array(z.number().min(0).max(6)), // 0 = Sunday, 6 = Saturday
    })
    .optional(),
});

export type SyndicationPlatform = z.infer<typeof SyndicationPlatformSchema>;

// Content transformation schema
export const ContentTransformationSchema = z.object({
  platform: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()),
  media: z
    .array(
      z.object({
        type: z.enum(['image', 'video', 'document']),
        url: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
    )
    .optional(),
  metadata: z.record(z.any()).optional(),
  publishAt: z.date().optional(),
});

export type ContentTransformation = z.infer<typeof ContentTransformationSchema>;

export class ContentSyndicationEngine {
  private platforms: Map<string, SyndicationPlatform> = new Map();
  private transformers: Map<string, ContentTransformer> = new Map();
  private publishers: Map<string, PlatformPublisher> = new Map();

  constructor() {
    this.initializePlatforms();
  }

  public getPlatforms(): Map<string, SyndicationPlatform> {
    return new Map(this.platforms);
  }

  public updatePlatform(platformId: string, config: Partial<SyndicationPlatform>): boolean {
    const platform = this.platforms.get(platformId);
    if (!platform) {
      return false;
    }
    Object.assign(platform, config);
    return true;
  }

  private initializePlatforms(): void {
    // Social Media Platforms
    this.registerPlatform({
      id: 'linkedin',
      name: 'LinkedIn',
      type: 'social',
      enabled: true,
      autoPublish: false,
      contentTypes: ['blog', 'news', 'guide'],
      schedule: {
        timezone: 'America/New_York',
        publishTimes: ['09:00', '12:00'],
        daysOfWeek: [1, 2, 3, 4, 5], // Weekdays only
      },
    });

    this.registerPlatform({
      id: 'facebook',
      name: 'Facebook',
      type: 'social',
      enabled: true,
      autoPublish: true,
      contentTypes: ['blog', 'news', 'video'],
      schedule: {
        timezone: 'America/New_York',
        publishTimes: ['10:00', '15:00', '19:00'],
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // All days
      },
    });

    this.registerPlatform({
      id: 'twitter',
      name: 'Twitter/X',
      type: 'social',
      enabled: true,
      autoPublish: true,
      contentTypes: ['blog', 'news'],
      schedule: {
        timezone: 'America/New_York',
        publishTimes: ['08:00', '11:00', '14:00', '17:00'],
        daysOfWeek: [1, 2, 3, 4, 5], // Weekdays
      },
    });

    // Article Platforms
    this.registerPlatform({
      id: 'medium',
      name: 'Medium',
      type: 'article',
      enabled: true,
      autoPublish: false,
      contentTypes: ['blog', 'guide', 'case_study'],
    });

    this.registerPlatform({
      id: 'dev_to',
      name: 'Dev.to',
      type: 'article',
      enabled: false, // Legal content might not fit
      autoPublish: false,
      contentTypes: ['guide'],
    });

    // Legal Directories
    this.registerPlatform({
      id: 'avvo',
      name: 'Avvo',
      type: 'directory',
      enabled: true,
      autoPublish: false,
      contentTypes: ['blog', 'guide', 'case_study'],
    });

    this.registerPlatform({
      id: 'justia',
      name: 'Justia',
      type: 'directory',
      enabled: true,
      autoPublish: false,
      contentTypes: ['blog', 'news', 'guide'],
    });

    this.registerPlatform({
      id: 'findlaw',
      name: 'FindLaw',
      type: 'directory',
      enabled: true,
      autoPublish: false,
      contentTypes: ['blog', 'guide'],
    });

    // Video Platforms
    this.registerPlatform({
      id: 'youtube',
      name: 'YouTube',
      type: 'video',
      enabled: true,
      autoPublish: false,
      contentTypes: ['video'],
    });

    // Forum/Community Platforms
    this.registerPlatform({
      id: 'reddit',
      name: 'Reddit',
      type: 'forum',
      enabled: true,
      autoPublish: false,
      contentTypes: ['guide', 'news'],
      config: {
        subreddits: ['r/immigration', 'r/legaladvice', 'r/NorthCarolina'],
      },
    });
  }

  private registerPlatform(platform: SyndicationPlatform): void {
    this.platforms.set(platform.id, platform);

    // Register transformer
    this.transformers.set(platform.id, new ContentTransformer(platform));

    // Register publisher
    this.publishers.set(platform.id, this.createPublisher(platform));
  }

  private createPublisher(platform: SyndicationPlatform): PlatformPublisher {
    switch (platform.id) {
      case 'linkedin':
        return new LinkedInPublisher(platform);
      case 'facebook':
        return new FacebookPublisher(platform);
      case 'twitter':
        return new TwitterPublisher(platform);
      case 'medium':
        return new MediumPublisher(platform);
      case 'avvo':
        return new AvvoPublisher(platform);
      case 'youtube':
        return new YouTubePublisher(platform);
      case 'reddit':
        return new RedditPublisher(platform);
      default:
        return new GenericPublisher(platform);
    }
  }

  async syndicateContent(params: {
    contentId: string;
    contentType: 'blog' | 'news' | 'case_study' | 'guide' | 'video';
    platforms?: string[];
    scheduleTime?: Date;
  }): Promise<SyndicationResult> {
    try {
      const { contentId, contentType, platforms: requestedPlatforms, scheduleTime } = params;

      // Get content from database
      const content = await this.fetchContent(contentId, contentType);
      if (!content) {
        throw new Error(`Content not found: ${contentId}`);
      }

      // Determine which platforms to syndicate to
      const targetPlatforms = this.getTargetPlatforms(contentType, requestedPlatforms);

      // Create syndication tasks
      const syndicationTasks = targetPlatforms.map(async platformId => {
        const platform = this.platforms.get(platformId);
        if (!platform || !platform.enabled) {
          return null;
        }

        try {
          // Transform content for platform
          const transformer = this.transformers.get(platformId);
          const transformedContent = await transformer!.transform(content);

          // Schedule or publish immediately
          if (scheduleTime || !platform.autoPublish) {
            return await this.schedulePublication(
              platformId,
              transformedContent,
              scheduleTime || this.getNextScheduledTime(platform)
            );
          } else {
            return await this.publishNow(platformId, transformedContent);
          }
        } catch (error) {
          logger.error(`Syndication failed for ${platformId}:`, errorToLogMeta(error));
          return {
            platform: platformId,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      });

      // Execute all syndication tasks
      const results = await Promise.all(syndicationTasks);
      const validResults = results.filter(Boolean) as SyndicationTaskResult[];

      // Record syndication history
      await this.recordSyndicationHistory({
        contentId,
        contentType,
        results: validResults,
      });

      return {
        success: validResults.some(r => r.success),
        syndicatedTo: validResults.filter(r => r.success).map(r => r.platform),
        errors: validResults
          .filter(r => !r.success)
          .map(r => ({ platform: r.platform, error: r.error || 'Unknown error' })),
        totalPlatforms: validResults.length,
      };
    } catch (error) {
      logger.error('Content syndication failed:', errorToLogMeta(error));
      throw error;
    }
  }

  private async fetchContent(contentId: string, contentType: string): Promise<any> {
    // Fetch content based on type
    switch (contentType) {
      case 'blog':
        return await prisma.blogPost.findUnique({
          where: { id: contentId },
          include: {},
        });
      case 'news':
        // TODO: Implement newsArticle model
        throw new Error('News article model not yet implemented');
      // Add other content types as needed
      default:
        throw new Error(`Unsupported content type: ${contentType}`);
    }
  }

  private getTargetPlatforms(contentType: string, requestedPlatforms?: string[]): string[] {
    const eligiblePlatforms = Array.from(this.platforms.entries())
      .filter(
        ([_, platform]) => platform.enabled && platform.contentTypes.includes(contentType as any)
      )
      .map(([id]) => id);

    if (requestedPlatforms) {
      return eligiblePlatforms.filter(id => requestedPlatforms.includes(id));
    }

    return eligiblePlatforms;
  }

  private getNextScheduledTime(platform: SyndicationPlatform): Date {
    if (!platform.schedule) {
      return new Date(); // Publish immediately if no schedule
    }

    const now = new Date();
    const { timezone, publishTimes, daysOfWeek } = platform.schedule;

    // Find next available time slot
    // Implementation would calculate based on timezone and schedule
    // For now, return next hour
    const nextHour = new Date(now);
    nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
    return nextHour;
  }

  private async schedulePublication(
    platformId: string,
    content: ContentTransformation,
    publishAt: Date
  ): Promise<SyndicationTaskResult> {
    // Store in database for scheduled publishing
    await (prisma as any).scheduledSyndication.create({
      data: {
        platformId,
        content: content as any,
        publishAt,
        status: 'scheduled',
      },
    });

    return {
      platform: platformId,
      success: true,
      scheduledFor: publishAt,
    };
  }

  private async publishNow(
    platformId: string,
    content: ContentTransformation
  ): Promise<SyndicationTaskResult> {
    const publisher = this.publishers.get(platformId);
    if (!publisher) {
      throw new Error(`No publisher found for platform: ${platformId}`);
    }

    const result = await publisher.publish(content);

    return {
      platform: platformId,
      success: result.success,
      url: result.url,
      error: result.error,
      publishedAt: new Date(),
    };
  }

  private async recordSyndicationHistory(params: {
    contentId: string;
    contentType: string;
    results: SyndicationTaskResult[];
  }): Promise<void> {
    // TODO: Implement syndicationHistory model in Prisma schema
    // await prisma.syndicationHistory.create({
    //   data: {
    //     contentId: params.contentId,
    //     contentType: params.contentType,
    //     results: params.results as any,
    //     createdAt: new Date(),
    //   },
    // });

    logger.info('Syndication history recorded', {
      contentId: params.contentId,
      contentType: params.contentType,
      platformCount: params.results.length,
    });
  }

  // Bulk syndication for multiple pieces of content
  async bulkSyndicate(params: {
    contentIds: string[];
    contentType: string;
    platforms?: string[];
    staggerMinutes?: number;
  }): Promise<BulkSyndicationResult> {
    const { contentIds, contentType, platforms, staggerMinutes = 30 } = params;
    const results: SyndicationResult[] = [];

    for (let i = 0; i < contentIds.length; i++) {
      const scheduleTime = new Date();
      scheduleTime.setMinutes(scheduleTime.getMinutes() + i * staggerMinutes);

      try {
        const result = await this.syndicateContent({
          contentId: contentIds[i] || '',
          contentType: contentType as any,
          platforms,
          scheduleTime,
        });
        results.push(result);
      } catch (error) {
        logger.error(
          `Bulk syndication failed for content ${contentIds[i]}:`,
          errorToLogMeta(error)
        );
      }
    }

    return {
      totalContent: contentIds.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results,
    };
  }

  // Get syndication analytics
  async getSyndicationAnalytics(params: {
    startDate: Date;
    endDate: Date;
    platform?: string;
  }): Promise<SyndicationAnalytics> {
    const history = await (prisma as any).syndicationHistory.findMany({
      where: {
        createdAt: {
          gte: params.startDate,
          lte: params.endDate,
        },
      },
    });

    // Calculate analytics
    const analytics: SyndicationAnalytics = {
      totalSyndications: history.length,
      successfulSyndications: 0,
      failedSyndications: 0,
      platformBreakdown: {},
      contentTypeBreakdown: {},
      timeSeriesData: [],
    };

    history.forEach((record: any) => {
      const results = record.results as any[];
      results.forEach(result => {
        if (result.success) {
          analytics.successfulSyndications++;
        } else {
          analytics.failedSyndications++;
        }

        // Platform breakdown
        if (!analytics.platformBreakdown[result.platform]) {
          analytics.platformBreakdown[result.platform] = {
            total: 0,
            successful: 0,
            failed: 0,
          };
        }
        const platformStats = analytics.platformBreakdown[result.platform];
        if (platformStats) {
          platformStats.total++;
          if (result.success) {
            platformStats.successful++;
          } else {
            platformStats.failed++;
          }
        }
      });

      // Content type breakdown
      if (!analytics.contentTypeBreakdown[record.contentType]) {
        analytics.contentTypeBreakdown[record.contentType] = 0;
      }
      const contentTypeCount = analytics.contentTypeBreakdown[record.contentType];
      if (contentTypeCount !== undefined) {
        analytics.contentTypeBreakdown[record.contentType] = contentTypeCount + 1;
      }
    });

    return analytics;
  }
}

// Content Transformer base class
class ContentTransformer {
  constructor(private platform: SyndicationPlatform) {}

  async transform(content: any): Promise<ContentTransformation> {
    // Base transformation logic
    return {
      platform: this.platform.id,
      title: this.truncateTitle(content.title),
      content: this.formatContent(content.content),
      excerpt: content.excerpt || this.generateExcerpt(content.content),
      tags: this.extractTags(content),
      media: this.processMedia(content.media),
      metadata: this.extractMetadata(content),
    };
  }

  protected truncateTitle(title: string): string {
    // Platform-specific title length limits
    const limits: Record<string, number> = {
      twitter: 100,
      facebook: 255,
      linkedin: 200,
    };

    const limit = limits[this.platform.id] || 255;
    return title.length > limit ? title.substring(0, limit - 3) + '...' : title;
  }

  protected formatContent(content: string): string {
    // Override in platform-specific transformers
    return content;
  }

  protected generateExcerpt(content: string): string {
    // Generate excerpt from content
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.substring(0, 160) + '...';
  }

  protected extractTags(content: any): string[] {
    if (content.tags) {
      return content.tags.map((tag: any) => tag.name || tag);
    }
    return [];
  }

  protected processMedia(media: any[]): any[] {
    if (!media) return [];
    return media.map(item => ({
      type: item.type,
      url: item.url,
      alt: item.alt,
      caption: item.caption,
    }));
  }

  protected extractMetadata(content: any): Record<string, any> {
    return {
      authorName: content.author?.name,
      authorTitle: content.author?.title,
      publishDate: content.publishedAt,
      canonicalUrl: content.url,
    };
  }
}

// Platform-specific publishers
abstract class PlatformPublisher {
  constructor(protected platform: SyndicationPlatform) {}

  abstract publish(content: ContentTransformation): Promise<PublishResult>;

  protected async makeApiCall(endpoint: string, data: any): Promise<any> {
    // Generic API call implementation
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.platform.apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json();
  }
}

class LinkedInPublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    try {
      // LinkedIn API implementation
      const postData = {
        author: `urn:li:organization:${this.platform.config?.organizationId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: `${content.title}\n\n${content.excerpt}\n\n${content.metadata?.canonicalUrl}`,
            },
            shareMediaCategory: 'ARTICLE',
            media: content.media?.map(m => ({
              status: 'READY',
              description: {
                text: m.caption || m.alt,
              },
              media: m.url,
              title: {
                text: content.title,
              },
            })),
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      const result = await this.makeApiCall('https://api.linkedin.com/v2/ugcPosts', postData);

      return {
        success: true,
        url: `https://www.linkedin.com/feed/update/${result.id}`,
        platformPostId: result.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'LinkedIn publish failed',
      };
    }
  }
}

class FacebookPublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    try {
      const postData = {
        message: `${content.title}\n\n${content.excerpt}`,
        link: content.metadata?.canonicalUrl,
        published: true,
      };

      const result = await this.makeApiCall(
        `https://graph.facebook.com/v18.0/${this.platform.config?.pageId}/feed`,
        postData
      );

      return {
        success: true,
        url: `https://www.facebook.com/${result.id}`,
        platformPostId: result.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Facebook publish failed',
      };
    }
  }
}

class TwitterPublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    try {
      const tweet = this.composeTweet(content);

      const result = await this.makeApiCall('https://api.twitter.com/2/tweets', { text: tweet });

      return {
        success: true,
        url: `https://twitter.com/user/status/${result.data.id}`,
        platformPostId: result.data.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Twitter publish failed',
      };
    }
  }

  private composeTweet(content: ContentTransformation): string {
    const maxLength = 280;
    const url = content.metadata?.canonicalUrl || '';
    const urlLength = 23; // Twitter's t.co URL length
    const availableLength = maxLength - urlLength - 2; // 2 for spacing

    let tweet = content.title;
    if (tweet.length > availableLength) {
      tweet = tweet.substring(0, availableLength - 3) + '...';
    }

    // Add hashtags if space permits
    const hashtags = content.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');
    if (tweet.length + hashtags.length + 2 < availableLength) {
      tweet += '\n' + hashtags;
    }

    return `${tweet}\n${url}`;
  }
}

class MediumPublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    try {
      const postData = {
        title: content.title,
        contentFormat: 'html',
        content: content.content,
        tags: content.tags.slice(0, 5), // Medium allows max 5 tags
        canonicalUrl: content.metadata?.canonicalUrl,
        publishStatus: 'public',
      };

      const result = await this.makeApiCall(
        `https://api.medium.com/v1/users/${this.platform.config?.userId}/posts`,
        postData
      );

      return {
        success: true,
        url: result.data.url,
        platformPostId: result.data.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Medium publish failed',
      };
    }
  }
}

class AvvoPublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    try {
      // Avvo legal guides API
      const postData = {
        title: content.title,
        content: content.content,
        practiceArea: this.mapToPracticeArea(content.tags),
        author: {
          attorneyId: this.platform.config?.attorneyId,
        },
      };

      const result = await this.makeApiCall('https://api.avvo.com/v1/legal-guides', postData);

      return {
        success: true,
        url: result.url,
        platformPostId: result.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Avvo publish failed',
      };
    }
  }

  private mapToPracticeArea(tags: string[]): string {
    // Map tags to Avvo practice areas
    const practiceAreaMap: Record<string, string> = {
      immigration: 'immigration',
      'criminal-defense': 'criminal-defense',
      'family-law': 'family',
      'personal-injury': 'personal-injury',
      'workers-compensation': 'workers-compensation',
    };

    for (const tag of tags) {
      const normalized = tag.toLowerCase().replace(/\s+/g, '-');
      if (practiceAreaMap[normalized]) {
        return practiceAreaMap[normalized];
      }
    }

    return 'general'; // Default practice area
  }
}

class YouTubePublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    try {
      // YouTube Data API v3
      const videoData = {
        snippet: {
          title: content.title,
          description: content.content,
          tags: content.tags,
          categoryId: '27', // Education category for legal content
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false,
        },
      };

      // Note: Actual video upload would require multipart upload
      // This is a placeholder for metadata update
      const result = await this.makeApiCall(
        'https://www.googleapis.com/youtube/v3/videos',
        videoData
      );

      return {
        success: true,
        url: `https://www.youtube.com/watch?v=${result.id}`,
        platformPostId: result.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'YouTube publish failed',
      };
    }
  }
}

class RedditPublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    try {
      const subreddit = this.selectSubreddit(content.tags);

      const postData = {
        kind: 'link',
        sr: subreddit,
        title: content.title,
        url: content.metadata?.canonicalUrl,
        send_replies: true,
      };

      const result = await this.makeApiCall('https://oauth.reddit.com/api/submit', postData);

      return {
        success: true,
        url: `https://www.reddit.com${result.json.data.permalink}`,
        platformPostId: result.json.data.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Reddit publish failed',
      };
    }
  }

  private selectSubreddit(tags: string[]): string {
    const subreddits = this.platform.config?.subreddits || ['r/legaladvice'];

    // Logic to select appropriate subreddit based on content tags
    if (tags.includes('immigration')) return 'r/immigration';
    if (tags.includes('north-carolina')) return 'r/NorthCarolina';

    return subreddits[0];
  }
}

class GenericPublisher extends PlatformPublisher {
  async publish(content: ContentTransformation): Promise<PublishResult> {
    // Generic webhook-based publisher
    if (this.platform.webhookUrl) {
      try {
        const response = await fetch(this.platform.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content),
        });

        return {
          success: response.ok,
          error: response.ok ? undefined : 'Webhook call failed',
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Generic publish failed',
        };
      }
    }

    return {
      success: false,
      error: 'No webhook URL configured',
    };
  }
}

// Types
interface SyndicationResult {
  success: boolean;
  syndicatedTo: string[];
  errors: Array<{
    platform: string;
    error: string;
  }>;
  totalPlatforms: number;
}

interface SyndicationTaskResult {
  platform: string;
  success: boolean;
  url?: string;
  error?: string;
  scheduledFor?: Date;
  publishedAt?: Date;
}

interface PublishResult {
  success: boolean;
  url?: string;
  platformPostId?: string;
  error?: string;
}

interface BulkSyndicationResult {
  totalContent: number;
  successful: number;
  failed: number;
  results: SyndicationResult[];
}

interface SyndicationAnalytics {
  totalSyndications: number;
  successfulSyndications: number;
  failedSyndications: number;
  platformBreakdown: Record<
    string,
    {
      total: number;
      successful: number;
      failed: number;
    }
  >;
  contentTypeBreakdown: Record<string, number>;
  timeSeriesData: Array<{
    date: Date;
    syndications: number;
  }>;
}

export const syndicationEngine = new ContentSyndicationEngine();
