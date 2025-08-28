import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { reviewStubs } from '@/lib/prisma-model-stubs';
import { z } from 'zod';
import { EventEmitter } from 'events';

// Review platform configurations
export const ReviewPlatformSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['legal_directory', 'general', 'social', 'search']),
  url: z.string(),
  apiEndpoint: z.string().optional(),
  apiKey: z.string().optional(),
  scrapeConfig: z
    .object({
      reviewsSelector: z.string().optional(),
      ratingSelector: z.string().optional(),
      authorSelector: z.string().optional(),
      dateSelector: z.string().optional(),
      contentSelector: z.string().optional(),
      paginationSelector: z.string().optional(),
    })
    .optional(),
  importance: z.enum(['critical', 'high', 'medium', 'low']),
  checkFrequency: z.number().default(1440), // minutes
  enabled: z.boolean().default(true),
});

export type ReviewPlatform = z.infer<typeof ReviewPlatformSchema>;

// Review schema
export const ReviewSchema = z.object({
  platformId: z.string(),
  externalId: z.string(),
  rating: z.number().min(1).max(5),
  author: z.string(),
  authorAvatar: z.string().optional(),
  content: z.string(),
  publishedAt: z.date(),
  url: z.string(),
  verified: z.boolean().default(false),
  responded: z.boolean().default(false),
  sentiment: z.enum(['positive', 'neutral', 'negative']).optional(),
  keywords: z.array(z.string()).optional(),
  languageCode: z.string().default('en'),
  metadata: z.record(z.any()).optional(),
});

export type Review = z.infer<typeof ReviewSchema>;

export class ReviewHarvester extends EventEmitter {
  private platforms: Map<string, ReviewPlatform> = new Map();
  private harvesters: Map<string, PlatformHarvester> = new Map();
  private isRunning: boolean = false;
  private harvestInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.initializePlatforms();
  }

  private initializePlatforms(): void {
    // Google Business Profile (formerly Google My Business)
    this.registerPlatform({
      id: 'google',
      name: 'Google Business Profile',
      type: 'search',
      url: 'https://business.google.com',
      importance: 'critical',
      checkFrequency: 60, // Check every hour
      enabled: true,
    });

    // Legal Directories
    this.registerPlatform({
      id: 'avvo',
      name: 'Avvo',
      type: 'legal_directory',
      url: 'https://www.avvo.com',
      importance: 'critical',
      checkFrequency: 720, // Check twice daily
      enabled: true,
      scrapeConfig: {
        reviewsSelector: '.review-item',
        ratingSelector: '.rating-stars',
        authorSelector: '.reviewer-name',
        dateSelector: '.review-date',
        contentSelector: '.review-content',
      },
    });

    this.registerPlatform({
      id: 'martindale',
      name: 'Martindale-Hubbell',
      type: 'legal_directory',
      url: 'https://www.martindale.com',
      importance: 'high',
      checkFrequency: 1440, // Daily
      enabled: true,
    });

    this.registerPlatform({
      id: 'justia',
      name: 'Justia',
      type: 'legal_directory',
      url: 'https://www.justia.com',
      importance: 'high',
      checkFrequency: 1440,
      enabled: true,
    });

    this.registerPlatform({
      id: 'findlaw',
      name: 'FindLaw',
      type: 'legal_directory',
      url: 'https://www.findlaw.com',
      importance: 'high',
      checkFrequency: 1440,
      enabled: true,
    });

    this.registerPlatform({
      id: 'lawyers.com',
      name: 'Lawyers.com',
      type: 'legal_directory',
      url: 'https://www.lawyers.com',
      importance: 'medium',
      checkFrequency: 2880, // Every 2 days
      enabled: true,
    });

    // General Review Platforms
    this.registerPlatform({
      id: 'yelp',
      name: 'Yelp',
      type: 'general',
      url: 'https://www.yelp.com',
      importance: 'high',
      checkFrequency: 720,
      enabled: true,
    });

    this.registerPlatform({
      id: 'facebook',
      name: 'Facebook',
      type: 'social',
      url: 'https://www.facebook.com',
      importance: 'high',
      checkFrequency: 360, // Every 6 hours
      enabled: true,
    });

    this.registerPlatform({
      id: 'bbb',
      name: 'Better Business Bureau',
      type: 'general',
      url: 'https://www.bbb.org',
      importance: 'medium',
      checkFrequency: 2880,
      enabled: true,
    });
  }

  private registerPlatform(platform: ReviewPlatform): void {
    this.platforms.set(platform.id, platform);

    // Create platform-specific harvester
    const harvester = this.createHarvester(platform);
    this.harvesters.set(platform.id, harvester);

    logger.info(`Registered review platform: ${platform.name}`);
  }

  private createHarvester(platform: ReviewPlatform): PlatformHarvester {
    switch (platform.id) {
      case 'google':
        return new GoogleReviewHarvester(platform);
      case 'avvo':
        return new AvvoReviewHarvester(platform);
      case 'yelp':
        return new YelpReviewHarvester(platform);
      case 'facebook':
        return new FacebookReviewHarvester(platform);
      default:
        return new GenericReviewHarvester(platform);
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Review harvester is already running');
      return;
    }

    try {
      logger.info('Starting review harvester...');
      this.isRunning = true;

      // Initial harvest
      await this.harvestAllPlatforms();

      // Set up periodic harvesting
      this.harvestInterval = setInterval(
        async () => {
          await this.checkAndHarvestDuePlatforms();
        },
        30 * 60 * 1000
      ); // Check every 30 minutes

      this.emit('started');
      logger.info('Review harvester started successfully');
    } catch (error) {
      this.isRunning = false;
      logger.error('Failed to start review harvester:', errorToLogMeta(error));
      throw error;
    }
  }

  async stop(): Promise<void> {
    logger.info('Stopping review harvester...');

    if (this.harvestInterval) {
      clearInterval(this.harvestInterval);
      this.harvestInterval = null;
    }

    this.isRunning = false;
    this.emit('stopped');

    logger.info('Review harvester stopped');
  }

  private async harvestAllPlatforms(): Promise<void> {
    const enabledPlatforms = Array.from(this.platforms.entries()).filter(
      ([_, platform]) => platform.enabled
    );

    logger.info(`Harvesting reviews from ${enabledPlatforms.length} platforms`);

    const results = await Promise.allSettled(
      enabledPlatforms.map(([id, platform]) => this.harvestPlatform(id))
    );

    // Log results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    logger.info(`Harvest complete: ${successful} successful, ${failed} failed`);
  }

  private async checkAndHarvestDuePlatforms(): Promise<void> {
    const now = new Date();

    for (const [id, platform] of this.platforms) {
      if (!platform.enabled) continue;

      try {
        // Check if platform is due for harvesting
        const lastHarvest = await this.getLastHarvestTime(id);
        const minutesSinceLastHarvest = lastHarvest
          ? (now.getTime() - lastHarvest.getTime()) / (1000 * 60)
          : Infinity;

        if (minutesSinceLastHarvest >= platform.checkFrequency) {
          logger.info(`Platform ${platform.name} is due for harvesting`);
          await this.harvestPlatform(id);
        }
      } catch (error) {
        logger.error(`Error checking platform ${id}:`, errorToLogMeta(error));
      }
    }
  }

  async harvestPlatform(platformId: string): Promise<HarvestResult> {
    const platform = this.platforms.get(platformId);
    if (!platform) {
      throw new Error(`Platform not found: ${platformId}`);
    }

    const harvester = this.harvesters.get(platformId);
    if (!harvester) {
      throw new Error(`Harvester not found for platform: ${platformId}`);
    }

    try {
      logger.info(`Starting harvest for ${platform.name}`);
      const startTime = Date.now();

      // Harvest reviews
      const reviews = await harvester.harvest();

      // Process and store reviews
      const processedReviews = await this.processReviews(platformId, reviews);

      // Record harvest
      await this.recordHarvest({
        platformId,
        reviewsFound: reviews.length,
        reviewsNew: processedReviews.new,
        reviewsUpdated: processedReviews.updated,
        duration: Date.now() - startTime,
        success: true,
      });

      // Emit events for new reviews
      if (processedReviews.new > 0) {
        this.emit('newReviews', {
          platformId,
          platform: platform.name,
          count: processedReviews.new,
          reviews: processedReviews.newReviews,
        });
      }

      logger.info(
        `Harvest complete for ${platform.name}: ${processedReviews.new} new, ${processedReviews.updated} updated`
      );

      return {
        success: true,
        platformId,
        reviewsFound: reviews.length,
        reviewsNew: processedReviews.new,
        reviewsUpdated: processedReviews.updated,
      };
    } catch (error) {
      logger.error(`Harvest failed for ${platform.name}:`, errorToLogMeta(error));

      await this.recordHarvest({
        platformId,
        reviewsFound: 0,
        reviewsNew: 0,
        reviewsUpdated: 0,
        duration: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        platformId,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async processReviews(platformId: string, reviews: Review[]): Promise<ProcessedReviews> {
    let newCount = 0;
    let updatedCount = 0;
    const newReviews: any[] = [];

    for (const review of reviews) {
      try {
        // Check if review already exists
        const existing = await reviewStubs.findUnique({
          where: {
            platformId_externalId: {
              platformId,
              externalId: review.externalId,
            },
          },
        });

        if (!existing) {
          // Create new review
          const created = await reviewStubs.create({
            data: {
              ...review,
              sentiment: review.sentiment || this.analyzeSentiment(review),
              keywords: review.keywords || this.extractKeywords(review.content),
            },
          });

          newCount++;
          newReviews.push(created);

          // Check if review needs immediate attention
          if (this.needsImmediateAttention(review)) {
            this.emit('urgentReview', {
              platformId,
              review: created,
              reason: this.getAttentionReason(review),
            });
          }
        } else if (this.hasChanged(existing, review)) {
          // Update existing review
          await reviewStubs.update({
            where: { id: (existing as any).id },
            data: {
              rating: review.rating,
              content: review.content,
              updatedAt: new Date(),
            },
          });

          updatedCount++;
        }
      } catch (error) {
        logger.error(`Failed to process review ${review.externalId}:`, errorToLogMeta(error));
      }
    }

    return {
      new: newCount,
      updated: updatedCount,
      newReviews,
    };
  }

  private analyzeSentiment(review: Review): 'positive' | 'neutral' | 'negative' {
    // Simple sentiment analysis based on rating and keywords
    if (review.rating >= 4) return 'positive';
    if (review.rating <= 2) return 'negative';

    // For 3-star reviews, analyze content
    const positiveWords = ['excellent', 'great', 'amazing', 'professional', 'helpful', 'recommend'];
    const negativeWords = ['terrible', 'awful', 'unprofessional', 'disappointed', 'waste', 'avoid'];

    const content = review.content.toLowerCase();
    const positiveCount = positiveWords.filter(word => content.includes(word)).length;
    const negativeCount = negativeWords.filter(word => content.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private extractKeywords(content: string): string[] {
    // Extract important keywords from review content
    const stopWords = new Set([
      'the',
      'is',
      'at',
      'which',
      'on',
      'and',
      'a',
      'an',
      'as',
      'are',
      'was',
      'were',
      'been',
      'be',
      'have',
      'has',
      'had',
      'do',
      'does',
      'did',
      'will',
      'would',
      'should',
      'could',
      'may',
      'might',
      'must',
      'can',
      'to',
      'of',
      'in',
      'for',
      'with',
      'that',
      'this',
      'it',
      'they',
      'them',
      'their',
      'we',
      'our',
      'us',
      'he',
      'she',
      'him',
      'her',
      'my',
      'your',
    ]);

    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word));

    // Count word frequency
    const wordCount = new Map<string, number>();
    words.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });

    // Return top keywords
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  private needsImmediateAttention(review: Review): boolean {
    // Check if review requires immediate attention
    return (
      review.rating <= 2 ||
      review.sentiment === 'negative' ||
      this.containsUrgentKeywords(review.content)
    );
  }

  private containsUrgentKeywords(content: string): boolean {
    const urgentKeywords = [
      'lawsuit',
      'sue',
      'complaint',
      'bar association',
      'malpractice',
      'ethics violation',
      'disciplinary',
      'scam',
      'fraud',
      'stolen',
      'emergency',
      'urgent',
      'immediate',
    ];

    const lowerContent = content.toLowerCase();
    return urgentKeywords.some(keyword => lowerContent.includes(keyword));
  }

  private getAttentionReason(review: Review): string {
    if (review.rating <= 2) return 'Low rating';
    if (this.containsUrgentKeywords(review.content)) return 'Contains urgent keywords';
    if (review.sentiment === 'negative') return 'Negative sentiment';
    return 'Requires attention';
  }

  private hasChanged(existing: any, newReview: Review): boolean {
    return existing.rating !== newReview.rating || existing.content !== newReview.content;
  }

  private async getLastHarvestTime(platformId: string): Promise<Date | null> {
    const lastHarvest = await (prisma as any).reviewHarvest.findFirst({
      where: {
        platformId,
        success: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return lastHarvest?.createdAt || null;
  }

  private async recordHarvest(data: any): Promise<void> {
    await (prisma as any).reviewHarvest.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
    });
  }

  // Get review statistics
  async getStatistics(params?: {
    platformId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<ReviewStatistics> {
    const where: any = {};

    if (params?.platformId) {
      where.platformId = params.platformId;
    }

    if (params?.startDate || params?.endDate) {
      where.publishedAt = {};
      if (params.startDate) where.publishedAt.gte = params.startDate;
      if (params.endDate) where.publishedAt.lte = params.endDate;
    }

    const [total, byRating, bySentiment, byPlatform] = await Promise.all([
      reviewStubs.count({ where }),
      reviewStubs.groupBy({
        by: ['rating'],
        where,
        _count: true,
      }),
      reviewStubs.groupBy({
        by: ['sentiment'],
        where,
        _count: true,
      }),
      reviewStubs.groupBy({
        by: ['platformId'],
        where,
        _count: true,
      }),
    ]);

    const avgRating = await reviewStubs.aggregate({
      where,
      _avg: { rating: true },
    });

    return {
      total,
      averageRating: avgRating._avg.rating || 0,
      ratingDistribution: Object.fromEntries(byRating.map((r: any) => [r.rating, r._count])),
      sentimentDistribution: Object.fromEntries(
        bySentiment.map((s: { sentiment: string | null; _count: number }) => [
          s.sentiment || 'unknown',
          s._count,
        ])
      ),
      platformDistribution: Object.fromEntries(
        byPlatform.map((p: { platformId: string; _count: number }) => [p.platformId, p._count])
      ),
    };
  }

  // Get recent reviews
  async getRecentReviews(params: {
    limit?: number;
    platformId?: string;
    sentiment?: string;
    minRating?: number;
    maxRating?: number;
  }): Promise<any[]> {
    const where: any = {};

    if (params.platformId) where.platformId = params.platformId;
    if (params.sentiment) where.sentiment = params.sentiment;
    if (params.minRating || params.maxRating) {
      where.rating = {};
      if (params.minRating) where.rating.gte = params.minRating;
      if (params.maxRating) where.rating.lte = params.maxRating;
    }

    return await reviewStubs.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: params.limit || 20,
      include: {
        platform: true,
        response: true,
      },
    });
  }
}

// Platform-specific harvesters
abstract class PlatformHarvester {
  constructor(protected platform: ReviewPlatform) {}

  abstract harvest(): Promise<Review[]>;

  protected async makeApiCall(endpoint: string, params?: any): Promise<any> {
    // Generic API call implementation
    const url = new URL(endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.platform.apiKey}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json();
  }

  protected parseDate(dateString: string): Date {
    // Try multiple date formats
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;

    // Try other formats
    // Implementation would handle various date formats
    return new Date();
  }
}

class GoogleReviewHarvester extends PlatformHarvester {
  async harvest(): Promise<Review[]> {
    try {
      // Google My Business API implementation
      const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID;
      const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID;

      const response = await this.makeApiCall(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`
      );

      return response.reviews.map((review: any) => ({
        platformId: this.platform.id,
        externalId: review.reviewId,
        rating: review.starRating,
        author: review.reviewer.displayName,
        authorAvatar: review.reviewer.profilePhotoUrl,
        content: review.comment || '',
        publishedAt: new Date(review.createTime),
        url: review.reviewReply?.reviewUrl || '',
        verified: true,
        responded: !!review.reviewReply,
      }));
    } catch (error) {
      logger.error('Google review harvest failed:', errorToLogMeta(error));
      throw error;
    }
  }
}

class AvvoReviewHarvester extends PlatformHarvester {
  async harvest(): Promise<Review[]> {
    try {
      // Avvo provides RSS feeds for reviews
      const attorneyId = process.env.AVVO_ATTORNEY_ID;
      const feedUrl = `https://www.avvo.com/attorneys/${attorneyId}/reviews.rss`;

      const response = await fetch(feedUrl);
      const xmlText = await response.text();

      // Parse RSS feed
      // Implementation would use an XML parser
      const reviews: Review[] = [];

      // Mock implementation
      return reviews;
    } catch (error) {
      logger.error('Avvo review harvest failed:', errorToLogMeta(error));
      throw error;
    }
  }
}

class YelpReviewHarvester extends PlatformHarvester {
  async harvest(): Promise<Review[]> {
    try {
      // Yelp Fusion API
      const businessId = process.env.YELP_BUSINESS_ID;

      const response = await this.makeApiCall(
        `https://api.yelp.com/v3/businesses/${businessId}/reviews`,
        { limit: 50, sort_by: 'newest' }
      );

      return response.reviews.map((review: any) => ({
        platformId: this.platform.id,
        externalId: review.id,
        rating: review.rating,
        author: review.user.name,
        authorAvatar: review.user.image_url,
        content: review.text,
        publishedAt: new Date(review.time_created),
        url: review.url,
        verified: false,
        responded: false,
      }));
    } catch (error) {
      logger.error('Yelp review harvest failed:', errorToLogMeta(error));
      throw error;
    }
  }
}

class FacebookReviewHarvester extends PlatformHarvester {
  async harvest(): Promise<Review[]> {
    try {
      // Facebook Graph API
      const pageId = process.env.FACEBOOK_PAGE_ID;

      const response = await this.makeApiCall(
        `https://graph.facebook.com/v18.0/${pageId}/ratings`,
        {
          fields: 'reviewer,rating,review_text,created_time,recommendation_type',
          limit: 100,
        }
      );

      return response.data.map((review: any) => ({
        platformId: this.platform.id,
        externalId: review.id || `${review.reviewer.id}_${review.created_time}`,
        rating: this.convertFacebookRating(review.rating, review.recommendation_type),
        author: review.reviewer.name,
        content: review.review_text || '',
        publishedAt: new Date(review.created_time),
        url: `https://www.facebook.com/${pageId}/reviews`,
        verified: true,
        responded: false,
      }));
    } catch (error) {
      logger.error('Facebook review harvest failed:', errorToLogMeta(error));
      throw error;
    }
  }

  private convertFacebookRating(rating: number, recommendationType?: string): number {
    if (rating) return rating;

    // Convert recommendation to rating
    switch (recommendationType) {
      case 'positive':
        return 5;
      case 'negative':
        return 1;
      default:
        return 3;
    }
  }
}

class GenericReviewHarvester extends PlatformHarvester {
  async harvest(): Promise<Review[]> {
    // Generic scraping implementation
    logger.warn(`No specific harvester for ${this.platform.name}, using generic harvester`);

    // This would implement web scraping using the platform's scrapeConfig
    // For now, return empty array
    return [];
  }
}

// Types
interface HarvestResult {
  success: boolean;
  platformId: string;
  reviewsFound?: number;
  reviewsNew?: number;
  reviewsUpdated?: number;
  error?: string;
}

interface ProcessedReviews {
  new: number;
  updated: number;
  newReviews: any[];
}

interface ReviewStatistics {
  total: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  sentimentDistribution: Record<string, number>;
  platformDistribution: Record<string, number>;
}

export const reviewHarvester = new ReviewHarvester();
