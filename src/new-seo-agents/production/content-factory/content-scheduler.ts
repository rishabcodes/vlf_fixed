import { componentLogger as logger } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import { AnalyticsService } from '@/lib/external-apis/analytics';

export interface ScheduleOptions {
  contentId: string;
  contentType: string;
  publishAt: Date;
  platforms: string[];
}

export class ContentScheduler {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  /**
   * Get optimal publishing times based on analytics
   */
  async getOptimalPublishingTimes(): Promise<Date[]> {
    logger.info('Calculating optimal publishing times');

    try {
      // Get historical performance data
      const performanceData = await this.getHistoricalPerformance();

      // Analyze best performing times
      const optimalHours = this.analyzeOptimalHours(performanceData);

      // Generate schedule for next 7 days
      const schedule = this.generatePublishingSchedule(optimalHours);

      return schedule;
    } catch (error) {
      logger.error('Error calculating optimal times', { error });
      return this.getDefaultSchedule();
    }
  }

  /**
   * Schedule content publication
   */
  async schedulePublication(options: ScheduleOptions) {
    logger.info('Scheduling content publication', {
      contentId: options.contentId,
      publishAt: options.publishAt,
      platforms: options.platforms,
    });

    const prisma = getPrismaClient();

    try {
      // Create schedule entry
      const schedule = await prisma.contentSchedule.create({
        data: {
          contentId: options.contentId,
          contentType: options.contentType,
          scheduledFor: options.publishAt,
          platforms: options.platforms,
          status: 'scheduled',
          metadata: {
            createdAt: new Date().toISOString(),
            timezone: 'America/New_York',
          },
        },
      });

      // Schedule platform-specific publications
      for (const platform of options.platforms) {
        await this.schedulePlatformPublication(
          options.contentId,
          options.contentType,
          platform,
          options.publishAt
        );
      }

      logger.info('Content scheduled successfully', { scheduleId: schedule.id });

      return schedule;
    } catch (error) {
      logger.error('Error scheduling content', { error });
      throw error;
    }
  }

  /**
   * Process scheduled publications
   */
  async processScheduledPublications() {
    logger.info('Processing scheduled publications');

    const prisma = getPrismaClient();

    try {
      // Get due publications
      const duePublications = await prisma.contentSchedule.findMany({
        where: {
          scheduledFor: {
            lte: new Date(),
          },
          status: 'scheduled',
        },
      });

      logger.info(`Found ${duePublications.length} publications due`);

      for (const publication of duePublications) {
        await this.publishContent(publication);
      }
    } catch (error) {
      logger.error('Error processing scheduled publications', { error });
    }
  }

  /**
   * Reschedule content based on performance
   */
  async optimizeSchedule(contentId: string) {
    logger.info('Optimizing content schedule', { contentId });

    const prisma = getPrismaClient();

    try {
      // Get content performance
      const performance = await this.getContentPerformance(contentId);

      // Check if rescheduling would help
      if ((performance as any).viewsPerHour < 10) {
        // Find better time slot
        const betterTime = await this.findBetterTimeSlot(contentId);

        if (betterTime) {
          // Update schedule
          await prisma.contentSchedule.updateMany({
            where: {
              contentId,
              status: 'scheduled',
            },
            data: {
              scheduledFor: betterTime,
              metadata: {
                rescheduled: true,
                originalTime: performance.publishedAt,
                reason: 'performance_optimization',
              },
            },
          });

          logger.info('Content rescheduled for better performance', {
            contentId,
            newTime: betterTime,
          });
        }
      }
    } catch (error) {
      logger.error('Error optimizing schedule', { error });
    }
  }

  /**
   * Get publishing calendar
   */
  async getPublishingCalendar(startDate: Date, endDate: Date) {
    logger.info('Getting publishing calendar', { startDate, endDate });

    const prisma = getPrismaClient();

    const scheduled = await prisma.contentSchedule.findMany({
      where: {
        scheduledFor: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        scheduledFor: 'asc',
      },
    });

    // Group by date and platform
    const calendar = new Map<string, any[]>();

    for (const item of scheduled) {
      const dateKey = item.scheduledFor.toISOString().split('T')[0] || '';

      if (!calendar.has(dateKey)) {
        calendar.set(dateKey, []);
      }

      const dayItems = calendar.get(dateKey);
      if (dayItems) {
        dayItems.push({
          ...item,
          content: await this.getContentDetails(item.contentId, item.contentType),
        });
      }
    }

    return Object.fromEntries(calendar);
  }

  /**
   * Private helper methods
   */
  private async getHistoricalPerformance() {
    const prisma = getPrismaClient();

    // Get performance data from last 90 days
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const performanceData = await prisma.contentPerformance.findMany({
      where: {
        publishedAt: {
          gte: ninetyDaysAgo,
        },
      },
      select: {
        publishedAt: true,
        viewsFirstHour: true,
        viewsFirstDay: true,
        viewsFirstWeek: true,
        engagementRate: true,
        platform: true,
      },
    });

    return performanceData;
  }

  private analyzeOptimalHours(performanceData: unknown[]): number[] {
    // Group by hour of day
    const hourlyPerformance = new Map<number, number[]>();

    performanceData.forEach(data => {
      const perfData = data as any;
      const hour = new Date(perfData.publishedAt).getHours();

      if (!hourlyPerformance.has(hour)) {
        hourlyPerformance.set(hour, []);
      }

      // Score based on first hour views and engagement
      const score = perfData.viewsFirstHour * (1 + perfData.engagementRate);
      hourlyPerformance.get(hour)!.push(score);
    });

    // Calculate average scores
    const hourlyScores = Array.from(hourlyPerformance.entries()).map(([hour, scores]) => ({
      hour,
      avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
    }));

    // Sort by score and get top hours
    hourlyScores.sort((a, b) => b.avgScore - a.avgScore);

    // Return top 5 hours
    return hourlyScores.slice(0, 5).map(item => item.hour);
  }

  private generatePublishingSchedule(optimalHours: number[]): Date[] {
    const schedule: Date[] = [];
    const now = new Date();

    // Generate schedule for next 7 days
    for (let day = 0; day < 7; day++) {
      for (const hour of optimalHours) {
        const publishDate = new Date(now);
        publishDate.setDate(publishDate.getDate() + day);
        publishDate.setHours(hour, 0, 0, 0);

        // Skip if in the past
        if (publishDate > now) {
          schedule.push(publishDate);
        }
      }
    }

    // Sort chronologically
    schedule.sort((a, b) => a.getTime() - b.getTime());

    return schedule;
  }

  private getDefaultSchedule(): Date[] {
    const schedule: Date[] = [];
    const now = new Date();

    // Default times: 9 AM, 12 PM, 3 PM, 6 PM EST
    const defaultHours = [9, 12, 15, 18];

    for (let day = 0; day < 7; day++) {
      for (const hour of defaultHours) {
        const publishDate = new Date(now);
        publishDate.setDate(publishDate.getDate() + day);
        publishDate.setHours(hour, 0, 0, 0);

        if (publishDate > now) {
          schedule.push(publishDate);
        }
      }
    }

    return schedule;
  }

  private async schedulePlatformPublication(
    contentId: string,
    contentType: string,
    platform: string,
    publishAt: Date
  ) {
    // Platform-specific scheduling logic
    switch (platform) {
      case 'website':
        await this.scheduleWebsitePublication(contentId, contentType, publishAt);
        break;
      case 'facebook':
        await this.scheduleFacebookPost(contentId, publishAt);
        break;
      case 'twitter':
        await this.scheduleTwitterPost(contentId, publishAt);
        break;
      case 'linkedin':
        await this.scheduleLinkedInPost(contentId, publishAt);
        break;
      case 'medium':
        await this.scheduleMediumPost(contentId, publishAt);
        break;
      default:
        logger.warn(`Unknown platform: ${platform}`);
    }
  }

  private async scheduleWebsitePublication(
    contentId: string,
    contentType: string,
    publishAt: Date
  ) {
    const prisma = getPrismaClient();

    // Update content status to scheduled
    if (contentType === 'BlogPost') {
      await prisma.blogPost.update({
        where: { id: contentId },
        data: {
          status: 'scheduled',
          publishedAt: publishAt,
        },
      });
    } else if (contentType === 'LandingPage') {
      await prisma.landingPage.update({
        where: { id: contentId },
        data: {
          status: 'scheduled',
          publishedAt: publishAt,
        },
      });
    }
  }

  private async scheduleFacebookPost(contentId: string, publishAt: Date) {
    // Would integrate with Facebook API
    logger.info('Scheduling Facebook post', { contentId, publishAt });
  }

  private async scheduleTwitterPost(contentId: string, publishAt: Date) {
    // Would integrate with Twitter API
    logger.info('Scheduling Twitter post', { contentId, publishAt });
  }

  private async scheduleLinkedInPost(contentId: string, publishAt: Date) {
    // Would integrate with LinkedIn API
    logger.info('Scheduling LinkedIn post', { contentId, publishAt });
  }

  private async scheduleMediumPost(contentId: string, publishAt: Date) {
    // Would integrate with Medium API
    logger.info('Scheduling Medium post', { contentId, publishAt });
  }

  private async publishContent(publication: {
    id: string;
    contentId: string;
    contentType: string;
    platforms: string[];
    scheduledFor: Date;
    status: string;
  }) {
    logger.info('Publishing scheduled content', {
      contentId: publication.contentId,
      platforms: publication.platforms,
    });

    const prisma = getPrismaClient();

    try {
      // Update content status
      await this.updateContentStatus(publication.contentId, publication.contentType, 'published');

      // Publish to each platform
      for (const platform of publication.platforms) {
        try {
          await this.publishToPlatform(publication.contentId, publication.contentType, platform);
        } catch (error) {
          logger.error(`Failed to publish to ${platform}`, { error });
        }
      }

      // Update schedule status
      await prisma.contentSchedule.update({
        where: { id: publication.id },
        data: {
          status: 'published',
          publishedAt: new Date(),
        },
      });

      // Track publication
      await this.trackPublication(publication);
    } catch (error) {
      logger.error('Error publishing content', { error });

      // Update schedule status to failed
      await prisma.contentSchedule.update({
        where: { id: publication.id },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  }

  private async updateContentStatus(contentId: string, contentType: string, status: string) {
    const prisma = getPrismaClient();

    if (contentType === 'BlogPost') {
      await prisma.blogPost.update({
        where: { id: contentId },
        data: {
          status,
          publishedAt: status === 'published' ? new Date() : undefined,
        },
      });
    } else if (contentType === 'LandingPage') {
      await prisma.landingPage.update({
        where: { id: contentId },
        data: {
          status,
          publishedAt: status === 'published' ? new Date() : undefined,
        },
      });
    }
  }

  private async publishToPlatform(contentId: string, contentType: string, platform: string) {
    // Get content syndicator
    const syndicator = await import('./content-syndicator').then(m => new m.ContentSyndicator());

    // Get content
    const content = await this.getContentDetails(contentId, contentType);

    if (!content) {
      logger.warn('Content not found for publication', { contentId, contentType });
      return;
    }

    switch (platform) {
      case 'website':
        // Already published via status update
        break;
      case 'facebook':
        await this.publishToFacebook({
          id: content.id,
          title: content.title,
          content: content.content || '',
          excerpt: (content as any).excerpt || undefined,
          featuredImage: (content as any).featuredImage || undefined,
        });
        break;
      case 'twitter':
        await this.publishToTwitter({
          id: content.id,
          title: content.title,
          content: content.content || '',
          excerpt: (content as any).excerpt || undefined,
        });
        break;
      case 'linkedin':
        await syndicator.postToLinkedIn(content as any);
        break;
      case 'medium':
        await syndicator.postToMedium(content as any);
        break;
    }
  }

  private async publishToFacebook(content: {
    id: string;
    title?: string;
    content?: string;
    excerpt?: string;
    featuredImage?: string | null;
  }) {
    // Facebook publishing logic
    logger.info('Publishing to Facebook', { contentId: content.id });
  }

  private async publishToTwitter(content: {
    id: string;
    title?: string;
    content?: string;
    excerpt?: string;
  }) {
    // Twitter publishing logic
    logger.info('Publishing to Twitter', { contentId: content.id });
  }

  private async getContentDetails(contentId: string, contentType: string) {
    const prisma = getPrismaClient();

    if (contentType === 'BlogPost') {
      return await prisma.blogPost.findUnique({
        where: { id: contentId },
      });
    } else if (contentType === 'LandingPage') {
      return await prisma.landingPage.findUnique({
        where: { id: contentId },
      });
    }

    return null;
  }

  private async trackPublication(publication: {
    id: string;
    contentId: string;
    contentType: string;
    platforms: string[];
    scheduledFor?: Date;
  }) {
    const prisma = getPrismaClient();

    await prisma.contentPublicationLog.create({
      data: {
        contentId: publication.contentId,
        contentType: publication.contentType,
        platforms: publication.platforms,
        scheduledFor: publication.scheduledFor || new Date(),
        publishedAt: new Date(),
        metadata: {
          scheduleId: publication.id,
        },
      },
    });
  }

  private async getContentPerformance(contentId: string) {
    const prisma = getPrismaClient();

    const performance = await prisma.contentPerformance.findFirst({
      where: { contentId },
      orderBy: { createdAt: 'desc' },
    });

    return (
      performance || {
        viewsPerHour: 0,
        publishedAt: new Date(),
      }
    );
  }

  private async findBetterTimeSlot(contentId: string): Promise<Date | null> {
    // Get optimal times
    const optimalTimes = await this.getOptimalPublishingTimes();

    // Find next available optimal time
    const now = new Date();

    for (const time of optimalTimes) {
      if (time > now) {
        // Check if slot is available
        const isAvailable = await this.isTimeSlotAvailable(time);
        if (isAvailable) {
          return time;
        }
      }
    }

    return null;
  }

  private async isTimeSlotAvailable(time: Date): Promise<boolean> {
    const prisma = getPrismaClient();

    // Check if there are already too many items scheduled for this time
    const oneHourBefore = new Date(time);
    oneHourBefore.setHours(oneHourBefore.getHours() - 1);

    const oneHourAfter = new Date(time);
    oneHourAfter.setHours(oneHourAfter.getHours() + 1);

    const scheduled = await prisma.contentSchedule.count({
      where: {
        scheduledFor: {
          gte: oneHourBefore,
          lte: oneHourAfter,
        },
        status: 'scheduled',
      },
    });

    // Allow max 3 items per hour window
    return scheduled < 3;
  }
}
