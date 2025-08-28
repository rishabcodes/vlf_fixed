import { CronJob } from 'cron';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { syndicationEngine } from './syndication-engine';
import { z } from 'zod';

export class SyndicationScheduler {
  private jobs: Map<string, CronJob> = new Map();
  private isRunning: boolean = false;

  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Syndication scheduler is already running');
      return;
    }

    try {
      logger.info('Starting syndication scheduler...');

      // Process scheduled syndications every minute
      const processJob = new CronJob(
        '* * * * *', // Every minute
        async () => {
          await this.processScheduledSyndications();
        },
        null,
        true,
        'America/New_York'
      );
      this.jobs.set('process-scheduled', processJob);

      // Check for new content to syndicate every 30 minutes
      const autoSyndicateJob = new CronJob(
        '*/30 * * * *', // Every 30 minutes
        async () => {
          await this.autoSyndicateNewContent();
        },
        null,
        true,
        'America/New_York'
      );
      this.jobs.set('auto-syndicate', autoSyndicateJob);

      // Generate syndication reports daily at 9 AM
      const reportJob = new CronJob(
        '0 9 * * *', // Daily at 9 AM
        async () => {
          await this.generateDailySyndicationReport();
        },
        null,
        true,
        'America/New_York'
      );
      this.jobs.set('daily-report', reportJob);

      // Clean up old syndication history monthly
      const cleanupJob = new CronJob(
        '0 2 1 * *', // Monthly at 2 AM on the 1st
        async () => {
          await this.cleanupOldHistory();
        },
        null,
        true,
        'America/New_York'
      );
      this.jobs.set('cleanup', cleanupJob);

      this.isRunning = true;
      logger.info('Syndication scheduler started successfully');
    } catch (error) {
      logger.error('Failed to start syndication scheduler:', errorToLogMeta(error));
      throw error;
    }
  }

  async stop(): Promise<void> {
    logger.info('Stopping syndication scheduler...');

    for (const [name, job] of this.jobs) {
      job.stop();
      logger.info(`Stopped job: ${name}`);
    }

    this.jobs.clear();
    this.isRunning = false;

    logger.info('Syndication scheduler stopped');
  }

  private async processScheduledSyndications(): Promise<void> {
    try {
      const now = new Date();

      // Find all syndications due for publishing
      // TODO: Implement scheduledSyndication model
      // const dueSyndications = await prisma.scheduledSyndication.findMany({
      //   where: {
      //     publishAt: { lte: now },
      //     status: 'scheduled',
      //   },
      //   take: 10, // Process in batches
      // });
      const dueSyndications: any[] = [];

      if (dueSyndications.length === 0) {
        return;
      }

      logger.info(`Processing ${dueSyndications.length} scheduled syndications`);

      for (const scheduled of dueSyndications) {
        try {
          // Mark as processing
          await (prisma as any).scheduledSyndication.update({
            where: { id: scheduled.id },
            data: { status: 'processing' },
          });

          // Publish content
          const content = scheduled.content as any;
          const result = await this.publishContent(scheduled.platformId, content);

          // Update status based on result
          await (prisma as any).scheduledSyndication.update({
            where: { id: scheduled.id },
            data: {
              status: result.success ? 'published' : 'failed',
              publishedAt: result.success ? new Date() : null,
              error: result.error,
              platformUrl: result.url,
            },
          });

          logger.info(
            `Published to ${scheduled.platformId}: ${result.success ? 'Success' : 'Failed'}`
          );
        } catch (error) {
          logger.error(
            `Failed to process scheduled syndication ${scheduled.id}:`,
            errorToLogMeta(error)
          );

          // TODO: Update scheduled syndication record
          // await prisma.scheduledSyndication.update({
          //   where: { id: scheduled.id },
          //   data: {
          //     status: 'failed',
          //     error: error instanceof Error ? error.message : 'Unknown error',
          //   },
          // });
        }
      }
    } catch (error) {
      logger.error('Error processing scheduled syndications:', errorToLogMeta(error));
    }
  }

  private async publishContent(platformId: string, content: any): Promise<any> {
    // Get publisher from syndication engine
    const publisher = (syndicationEngine as any).publishers.get(platformId);
    if (!publisher) {
      throw new Error(`No publisher found for platform: ${platformId}`);
    }

    return await publisher.publish(content);
  }

  private async autoSyndicateNewContent(): Promise<void> {
    try {
      const thirtyMinutesAgo = new Date();
      thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

      // Find new content that hasn't been syndicated
      const newContent = await prisma.blogPost.findMany({
        where: {
          publishedAt: { gte: thirtyMinutesAgo },
          // TODO: Add syndicationHistory relation check
          // syndicationHistory: {
          //   none: {}, // No syndication history
          // },
          status: 'published',
        },
        take: 5,
      });

      if (newContent.length === 0) {
        return;
      }

      logger.info(`Found ${newContent.length} new content items to syndicate`);

      for (const content of newContent) {
        try {
          // Determine content type based on categories/tags
          const contentType = this.determineContentType(content);

          // Auto-syndicate to platforms with autoPublish enabled
          await syndicationEngine.syndicateContent({
            contentId: content.id,
            contentType,
            // Only syndicate to auto-publish platforms
            platforms: this.getAutoPublishPlatforms(),
          });

          logger.info(`Auto-syndicated content: ${content.title}`);
        } catch (error) {
          logger.error(`Failed to auto-syndicate content ${content.id}:`, errorToLogMeta(error));
        }
      }
    } catch (error) {
      logger.error('Error in auto-syndication:', errorToLogMeta(error));
    }
  }

  private determineContentType(content: any): 'blog' | 'news' | 'guide' | 'case_study' {
    // Logic to determine content type based on categories, tags, or content structure
    if (content.categories?.includes('news')) return 'news';
    if (content.categories?.includes('guide') || content.title.toLowerCase().includes('how to'))
      return 'guide';
    if (content.categories?.includes('case-study')) return 'case_study';
    return 'blog';
  }

  private getAutoPublishPlatforms(): string[] {
    // Get list of platforms with autoPublish enabled from syndication engine
    const platforms = (syndicationEngine as any).platforms as Map<string, any>;
    const entries = Array.from(platforms.entries());

    return entries
      .filter(([_, platform]) => platform.autoPublish && platform.enabled)
      .map(([id]) => id);
  }

  private async generateDailySyndicationReport(): Promise<void> {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const analytics = await syndicationEngine.getSyndicationAnalytics({
        startDate: yesterday,
        endDate: today,
      });

      // Generate report
      const report = {
        date: yesterday,
        totalSyndications: analytics.totalSyndications,
        successRate:
          analytics.totalSyndications > 0
            ? ((analytics.successfulSyndications / analytics.totalSyndications) * 100).toFixed(2) +
              '%'
            : '0%',
        platformBreakdown: analytics.platformBreakdown,
        contentTypeBreakdown: analytics.contentTypeBreakdown,
        topPerformingPlatforms: this.getTopPerformingPlatforms(analytics.platformBreakdown),
        recommendations: this.generateRecommendations(analytics),
      };

      // Save report
      await (prisma as any).syndicationReport.create({
        data: {
          date: yesterday,
          report: report as any,
          type: 'daily',
        },
      });

      // Send report via email or notification
      await this.sendSyndicationReport(report);

      logger.info('Daily syndication report generated successfully');
    } catch (error) {
      logger.error('Failed to generate daily syndication report:', errorToLogMeta(error));
    }
  }

  private getTopPerformingPlatforms(platformBreakdown: any): any[] {
    return Object.entries(platformBreakdown as Record<string, any>)
      .map(([platform, stats]) => ({
        platform,
        successRate: stats.total > 0 ? (stats.successful / stats.total) * 100 : 0,
        total: stats.total,
      }))
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);
  }

  private generateRecommendations(analytics: any): string[] {
    const recommendations: string[] = [];

    // Check overall success rate
    const overallSuccessRate =
      analytics.totalSyndications > 0
        ? (analytics.successfulSyndications / analytics.totalSyndications) * 100
        : 0;

    if (overallSuccessRate < 80) {
      recommendations.push('Consider reviewing API configurations as success rate is below 80%');
    }

    // Check platform-specific issues
    Object.entries(analytics.platformBreakdown as Record<string, any>).forEach(
      ([platform, stats]) => {
        const successRate = stats.total > 0 ? (stats.successful / stats.total) * 100 : 0;
        if (successRate < 70 && stats.total > 5) {
          recommendations.push(
            `${platform} has a low success rate (${successRate.toFixed(0)}%). Check API credentials and rate limits.`
          );
        }
      }
    );

    // Content type recommendations
    const contentTypes = Object.entries(analytics.contentTypeBreakdown);
    if (contentTypes.length === 1) {
      recommendations.push('Consider diversifying content types for better reach');
    }

    return recommendations;
  }

  private async sendSyndicationReport(report: any): Promise<void> {
    // Implementation would send report via email or internal notification system
    logger.info('Syndication report sent', { date: report.date });
  }

  private async cleanupOldHistory(): Promise<void> {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      // Delete old syndication history
      const deleted = await (prisma as any).syndicationHistory.deleteMany({
        where: {
          createdAt: { lt: sixMonthsAgo },
        },
      });

      logger.info(`Cleaned up ${deleted.count} old syndication history records`);

      // Delete old scheduled syndications that failed
      const deletedScheduled = await (prisma as any).scheduledSyndication.deleteMany({
        where: {
          createdAt: { lt: sixMonthsAgo },
          status: { in: ['failed', 'cancelled'] },
        },
      });

      logger.info(`Cleaned up ${deletedScheduled.count} old failed scheduled syndications`);
    } catch (error) {
      logger.error('Failed to cleanup old syndication history:', errorToLogMeta(error));
    }
  }

  // Manual syndication trigger
  async triggerManualSyndication(params: {
    contentId: string;
    contentType: string;
    platforms: string[];
    scheduleTime?: Date;
  }): Promise<any> {
    try {
      logger.info('Triggering manual syndication', params);

      return await syndicationEngine.syndicateContent({
        contentId: params.contentId,
        contentType: params.contentType as any,
        platforms: params.platforms,
        scheduleTime: params.scheduleTime,
      });
    } catch (error) {
      logger.error('Manual syndication failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Retry failed syndications
  async retryFailedSyndications(since?: Date): Promise<void> {
    try {
      const failedSyndications = await (prisma as any).scheduledSyndication.findMany({
        where: {
          status: 'failed',
          createdAt: since ? { gte: since } : undefined,
        },
        take: 20,
      });

      logger.info(`Retrying ${failedSyndications.length} failed syndications`);

      for (const failed of failedSyndications) {
        try {
          // Reset to scheduled status
          await (prisma as any).scheduledSyndication.update({
            where: { id: failed.id },
            data: {
              status: 'scheduled',
              publishAt: new Date(), // Retry immediately
              error: null,
            },
          });
        } catch (error) {
          logger.error(`Failed to retry syndication ${failed.id}:`, errorToLogMeta(error));
        }
      }
    } catch (error) {
      logger.error('Error retrying failed syndications:', errorToLogMeta(error));
    }
  }

  // Get scheduler status
  getStatus(): {
    isRunning: boolean;
    jobs: Array<{ name: string; running: boolean; nextRun?: Date }>;
  } {
    const jobStatus = Array.from(this.jobs.entries()).map(([name, job]) => ({
      name,
      running: job.running,
      nextRun: job.nextDates(1)[0]?.toJSDate(),
    }));

    return {
      isRunning: this.isRunning,
      jobs: jobStatus,
    };
  }
}

export const syndicationScheduler = new SyndicationScheduler();
