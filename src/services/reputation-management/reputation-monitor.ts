import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import {
  reviewStubs,
  reputationTaskStubs,
  reviewResponseStubs,
  reviewEscalationStubs,
  dailyReputationMetricsStubs,
  reputationAlertStubs,
  reviewPlatformStubs,
} from '@/lib/prisma-model-stubs';
import { reviewHarvester } from './review-harvester';
import { responseGenerator } from './response-generator';
import { EventEmitter } from 'events';
import { z } from 'zod';
import type { LogMeta } from '@/types/logger';

export class ReputationMonitor extends EventEmitter {
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private alertThresholds!: AlertThresholds;
  private responseRules: ResponseRule[] = [];

  constructor() {
    super();
    this.initializeAlertThresholds();
    this.initializeResponseRules();
    this.setupEventListeners();
  }

  private initializeAlertThresholds(): void {
    this.alertThresholds = {
      negativeReviewThreshold: 2, // Alert if 2+ negative reviews in 24 hours
      ratingDropThreshold: 0.5, // Alert if average rating drops by 0.5
      responseTimeTarget: 240, // Target response time in minutes (4 hours)
      criticalKeywords: [
        'lawsuit',
        'sue',
        'fraud',
        'scam',
        'unethical',
        'malpractice',
        'complaint',
        'bar association',
      ],
    };
  }

  private initializeResponseRules(): void {
    // Auto-response rules
    this.responseRules = [
      {
        id: 'positive-auto-response',
        condition: {
          sentiment: 'positive',
          rating: { min: 4 },
          platforms: ['google', 'facebook', 'avvo'],
        },
        action: 'auto-respond',
        delay: 60, // 1 hour delay
        requiresApproval: false,
      },
      {
        id: 'negative-urgent',
        condition: {
          sentiment: 'negative',
          rating: { max: 2 },
        },
        action: 'notify-urgent',
        delay: 0,
        requiresApproval: true,
      },
      {
        id: 'critical-keywords',
        condition: {
          containsKeywords: this.alertThresholds.criticalKeywords,
        },
        action: 'escalate',
        delay: 0,
        requiresApproval: true,
      },
    ];
  }

  private setupEventListeners(): void {
    // Listen to review harvester events
    reviewHarvester.on('newReviews', async data => {
      await this.processNewReviews(data);
    });

    reviewHarvester.on('urgentReview', async data => {
      await this.handleUrgentReview(data);
    });
  }

  async start(): Promise<void> {
    if (this.isMonitoring) {
      logger.warn('Reputation monitor is already running');
      return;
    }

    try {
      logger.info('Starting reputation monitor...');
      this.isMonitoring = true;

      // Start review harvester
      await reviewHarvester.start();

      // Set up monitoring interval
      this.monitoringInterval = setInterval(
        async () => {
          await this.performMonitoringCheck();
        },
        30 * 60 * 1000
      ); // Every 30 minutes

      // Perform initial check
      await this.performMonitoringCheck();

      this.emit('started');
      logger.info('Reputation monitor started successfully');
    } catch (error) {
      this.isMonitoring = false;
      logger.error('Failed to start reputation monitor', errorToLogMeta(error));
      throw error;
    }
  }

  async stop(): Promise<void> {
    logger.info('Stopping reputation monitor...');

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    await reviewHarvester.stop();
    this.isMonitoring = false;
    this.emit('stopped');

    logger.info('Reputation monitor stopped');
  }

  private async performMonitoringCheck(): Promise<void> {
    try {
      logger.info('Performing reputation monitoring check...');

      // Check for unanswered reviews
      await this.checkUnansweredReviews();

      // Check reputation metrics
      await this.checkReputationMetrics();

      // Check for rating trends
      await this.checkRatingTrends();

      // Generate reputation report
      const report = await this.generateReputationReport();
      this.emit('reportGenerated', report);

      logger.info('Monitoring check completed');
    } catch (error) {
      logger.error('Monitoring check failed', errorToLogMeta(error));
      this.emit('error', error);
    }
  }

  private async processNewReviews(data: any): Promise<void> {
    const { reviews, platformId, platform } = data;

    logger.info(`Processing ${reviews.length} new reviews from ${platform}`);

    for (const review of reviews) {
      try {
        // Apply response rules
        const applicableRules = this.getApplicableRules(review);

        for (const rule of applicableRules) {
          await this.applyRule(rule, review);
        }

        // Track metrics
        await this.updateReviewMetrics(review);

        // Check for alerts
        await this.checkAlertConditions(review);
      } catch (error) {
        logger.error(`Failed to process review ${review.id}`, errorToLogMeta(error));
      }
    }
  }

  private async handleUrgentReview(data: any): Promise<void> {
    const { review, reason } = data;

    logger.warn(`Urgent review alert: ${reason}`);

    // Send immediate notification
    await this.sendUrgentNotification({
      type: 'urgent_review',
      review,
      reason,
      platform: review.platformId,
      requiredAction: 'Review and respond immediately',
    });

    // Create high-priority task
    await reputationTaskStubs.create({
      data: {
        type: 'respond_to_review',
        priority: 'urgent',
        reviewId: review.id,
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // Due in 2 hours
        assignedTo: 'admin',
        status: 'pending',
        metadata: { reason },
      },
    });
  }

  private getApplicableRules(review: any): ResponseRule[] {
    return this.responseRules.filter(rule => {
      const condition = rule.condition;

      // Check sentiment
      if (condition.sentiment && review.sentiment !== condition.sentiment) {
        return false;
      }

      // Check rating
      if (condition.rating) {
        if (condition.rating.min && review.rating < condition.rating.min) return false;
        if (condition.rating.max && review.rating > condition.rating.max) return false;
      }

      // Check platforms
      if (condition.platforms && !condition.platforms.includes(review.platformId)) {
        return false;
      }

      // Check keywords
      if (condition.containsKeywords) {
        const hasKeyword = condition.containsKeywords.some(keyword =>
          review.content.toLowerCase().includes(keyword.toLowerCase())
        );
        if (!hasKeyword) return false;
      }

      return true;
    });
  }

  private async applyRule(rule: ResponseRule, review: any): Promise<void> {
    logger.info(`Applying rule ${rule.id} to review ${review.id}`);

    switch (rule.action) {
      case 'auto-respond':
        await this.scheduleAutoResponse(review, rule);
        break;

      case 'notify-urgent':
        await this.sendUrgentNotification({
          type: 'negative_review',
          review,
          rule: rule.id,
        });
        break;

      case 'escalate':
        await this.escalateReview(review, rule);
        break;

      default:
        logger.warn(`Unknown rule action: ${rule.action}`);
    }
  }

  private async scheduleAutoResponse(review: any, rule: ResponseRule): Promise<void> {
    const responseTime = new Date(Date.now() + rule.delay * 60 * 1000);

    // Generate response
    const generatedResponse = await responseGenerator.generateResponse(review, {
      useAI: true,
    });

    if (!generatedResponse.success) {
      logger.error('Failed to generate response', { error: generatedResponse.error });
      return;
    }

    // Create response task
    await reviewResponseStubs.create({
      data: {
        reviewId: review.id,
        responseText: generatedResponse.response!,
        status: rule.requiresApproval ? 'pending_approval' : 'scheduled',
        scheduledFor: responseTime,
        generatedBy: 'ai',
        metadata: {
          rule: rule.id,
          template: generatedResponse.template,
          tone: generatedResponse.tone,
        },
      },
    });

    logger.info(`Scheduled auto-response for review ${review.id} at ${responseTime}`);
  }

  private async escalateReview(review: any, rule: ResponseRule): Promise<void> {
    // Create escalation
    await reviewEscalationStubs.create({
      data: {
        reviewId: review.id,
        reason: `Triggered rule: ${rule.id}`,
        priority: 'high',
        assignedTo: 'legal_team',
        status: 'open',
        createdAt: new Date(),
      },
    });

    // Send notification to legal team
    await this.sendNotification({
      type: 'review_escalation',
      recipients: ['legal@vasquezlawfirm.com'],
      subject: 'Review Requires Legal Team Attention',
      data: {
        review,
        rule: rule.id,
        platform: review.platformId,
      },
    });
  }

  private async checkUnansweredReviews(): Promise<void> {
    const targetResponseTime = this.alertThresholds.responseTimeTarget;
    const cutoffTime = new Date(Date.now() - targetResponseTime * 60 * 1000);

    const unansweredReviews = await reviewStubs.findMany({
      where: {
        responded: false,
        publishedAt: { lte: cutoffTime },
        sentiment: { in: ['negative', 'neutral'] },
      },
      include: {
        platform: true,
      },
    });

    if (unansweredReviews.length > 0) {
      logger.warn(
        `Found ${unansweredReviews.length} unanswered reviews exceeding response time target`
      );

      for (const review of unansweredReviews) {
        await this.createResponseReminder(review);
      }
    }
  }

  private async createResponseReminder(review: any): Promise<void> {
    // Check if reminder already exists
    const existingReminder = await reputationTaskStubs.findFirst({
      where: {
        reviewId: review.id,
        type: 'response_reminder',
        status: { not: 'completed' },
      },
    });

    if (!existingReminder) {
      await reputationTaskStubs.create({
        data: {
          type: 'response_reminder',
          priority: review.sentiment === 'negative' ? 'high' : 'medium',
          reviewId: review.id,
          dueDate: new Date(Date.now() + 60 * 60 * 1000), // Due in 1 hour
          assignedTo: 'admin',
          status: 'pending',
          metadata: {
            platform: review.platform.name,
            daysSinceReview: Math.floor(
              (Date.now() - review.publishedAt.getTime()) / (1000 * 60 * 60 * 24)
            ),
          },
        },
      });
    }
  }

  private async checkReputationMetrics(): Promise<void> {
    // Get current metrics
    const metrics = await this.calculateReputationMetrics();

    // Check against thresholds
    if (metrics.averageRating < 4.0) {
      await this.createAlert({
        type: 'low_average_rating',
        severity: 'high',
        message: `Average rating has dropped to ${metrics.averageRating.toFixed(1)}`,
        data: metrics,
      });
    }

    if (metrics.responseRate < 0.8) {
      await this.createAlert({
        type: 'low_response_rate',
        severity: 'medium',
        message: `Response rate is ${(metrics.responseRate * 100).toFixed(0)}%`,
        data: metrics,
      });
    }
  }

  private async checkRatingTrends(): Promise<void> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentReviews: any[] = await reviewStubs.findMany({
      where: {
        publishedAt: { gte: thirtyDaysAgo },
      },
      orderBy: { publishedAt: 'desc' },
    });

    // Calculate weekly averages
    const weeklyAverages = this.calculateWeeklyAverages(recentReviews);

    // Check for downward trend
    if (this.detectDownwardTrend(weeklyAverages)) {
      await this.createAlert({
        type: 'rating_downtrend',
        severity: 'high',
        message: 'Detected downward trend in ratings over past weeks',
        data: { weeklyAverages },
      });
    }

    // Check for spike in negative reviews
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentNegative = recentReviews.filter(
      r => r.sentiment === 'negative' && r.publishedAt >= last24Hours
    );

    if (recentNegative.length >= this.alertThresholds.negativeReviewThreshold) {
      await this.createAlert({
        type: 'negative_review_spike',
        severity: 'urgent',
        message: `${recentNegative.length} negative reviews in last 24 hours`,
        data: { reviews: recentNegative },
      });
    }
  }

  private async calculateReputationMetrics(): Promise<ReputationMetrics> {
    const [totalReviews, respondedReviews, avgRating, platformStats]: [number, number, any, any[]] =
      await Promise.all([
        reviewStubs.count(),
        reviewStubs.count({ where: { responded: true } }),
        reviewStubs.aggregate({ _avg: { rating: true } }),
        reviewStubs.groupBy({
          by: ['platformId'],
          _count: true,
          _avg: { rating: true },
        }),
      ]);

    const responseRate = totalReviews > 0 ? respondedReviews / totalReviews : 0;

    return {
      totalReviews,
      respondedReviews,
      responseRate,
      averageRating: avgRating._avg.rating || 0,
      platformBreakdown: platformStats.map(stat => ({
        platformId: stat.platformId,
        count: stat._count,
        averageRating: stat._avg.rating || 0,
      })),
    };
  }

  private calculateWeeklyAverages(reviews: any[]): number[] {
    const weeks: Map<number, number[]> = new Map();
    const now = Date.now();

    reviews.forEach(review => {
      const weekNumber = Math.floor(
        (now - review.publishedAt.getTime()) / (7 * 24 * 60 * 60 * 1000)
      );
      if (!weeks.has(weekNumber)) {
        weeks.set(weekNumber, []);
      }
      weeks.get(weekNumber)!.push(review.rating);
    });

    const averages: number[] = [];
    for (let i = 0; i < 4; i++) {
      const weekRatings = weeks.get(i) || [];
      if (weekRatings.length > 0) {
        const avg = weekRatings.reduce((sum, r) => sum + r, 0) / weekRatings.length;
        averages.push(avg);
      }
    }

    return averages.reverse(); // Oldest to newest
  }

  private detectDownwardTrend(averages: number[]): boolean {
    if (averages.length < 3) return false;

    // Check if each week is lower than the previous
    let downwardCount = 0;
    for (let i = 1; i < averages.length; i++) {
      const current = averages[i];
      const previous = averages[i - 1];
      if (current !== undefined && previous !== undefined && current < previous) {
        downwardCount++;
      }
    }

    return downwardCount >= 2;
  }

  private async updateReviewMetrics(review: any): Promise<void> {
    // Update daily metrics
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await dailyReputationMetricsStubs.upsert({
      where: {
        date_platformId: {
          date: today,
          platformId: review.platformId,
        },
      },
      create: {
        date: today,
        platformId: review.platformId,
        newReviews: 1,
        totalRating: review.rating,
        positiveCount: review.sentiment === 'positive' ? 1 : 0,
        neutralCount: review.sentiment === 'neutral' ? 1 : 0,
        negativeCount: review.sentiment === 'negative' ? 1 : 0,
      },
      update: {
        newReviews: { increment: 1 },
        totalRating: { increment: review.rating },
        positiveCount: review.sentiment === 'positive' ? { increment: 1 } : undefined,
        neutralCount: review.sentiment === 'neutral' ? { increment: 1 } : undefined,
        negativeCount: review.sentiment === 'negative' ? { increment: 1 } : undefined,
      },
    });
  }

  private async checkAlertConditions(review: any): Promise<void> {
    // Check for critical keywords
    const containsCritical = this.alertThresholds.criticalKeywords.some(keyword =>
      review.content.toLowerCase().includes(keyword.toLowerCase())
    );

    if (containsCritical) {
      await this.createAlert({
        type: 'critical_keyword_detected',
        severity: 'urgent',
        message: 'Review contains critical keywords requiring immediate attention',
        data: { review },
      });
    }
  }

  private async createAlert(alert: ReputationAlert): Promise<void> {
    await reputationAlertStubs.create({
      data: {
        type: alert.type,
        severity: alert.severity,
        message: alert.message,
        data: alert.data,
        status: 'active',
        createdAt: new Date(),
      },
    });

    // Send notification based on severity
    if (alert.severity === 'urgent' || alert.severity === 'high') {
      await this.sendUrgentNotification(alert);
    }

    this.emit('alertCreated', alert);
  }

  private async sendNotification(notification: any): Promise<void> {
    // Implementation would send email/SMS/push notification
    logger.info('Sending notification:', notification);
  }

  private async sendUrgentNotification(data: any): Promise<void> {
    // Implementation would send urgent notifications via multiple channels
    logger.warn('Sending urgent notification:', data);

    // Send email
    await this.sendNotification({
      ...data,
      priority: 'high',
      channels: ['email', 'sms', 'push'],
    });
  }

  async generateReputationReport(): Promise<ReputationReport> {
    const metrics = await this.calculateReputationMetrics();
    const recentAlerts = await reputationAlertStubs.findMany({
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      orderBy: { createdAt: 'desc' },
    });

    const platformPerformance = await this.calculatePlatformPerformance();
    const responsePerformance = await this.calculateResponsePerformance();

    return {
      generatedAt: new Date(),
      metrics,
      recentAlerts,
      platformPerformance,
      responsePerformance,
      recommendations: this.generateRecommendations(metrics, platformPerformance),
    };
  }

  private async calculatePlatformPerformance(): Promise<any[]> {
    const platforms: any[] = await reviewPlatformStubs.findMany();
    const performance: Array<{
      platformId: string;
      platformName: string;
      totalReviews: number;
      averageRating: number;
      responseRate?: number;
    }> = [];

    for (const platform of platforms) {
      const stats = await reviewStubs.aggregate({
        where: { platformId: platform.id },
        _count: true,
        _avg: { rating: true },
      });

      const responseStats = await reviewStubs.aggregate({
        where: {
          platformId: platform.id,
          responded: true,
        },
        _count: true,
      });

      performance.push({
        platformId: platform.id,
        platformName: platform.name,
        totalReviews: stats._count,
        averageRating: stats._avg.rating || 0,
        responseRate: stats._count > 0 ? responseStats._count / stats._count : 0,
      });
    }

    return performance;
  }

  private async calculateResponsePerformance(): Promise<any> {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const responses: any[] = await reviewResponseStubs.findMany({
      where: {
        createdAt: { gte: last30Days },
      },
      include: {
        review: true,
      },
    });

    const avgResponseTime =
      responses.reduce((sum: number, response: any) => {
        const responseTime = response.createdAt.getTime() - response.review.publishedAt.getTime();
        return sum + responseTime;
      }, 0) / responses.length;

    return {
      totalResponses: responses.length,
      averageResponseTime: avgResponseTime / (1000 * 60), // Convert to minutes
      autoResponseRate:
        responses.filter((r: any) => r.generatedBy === 'ai').length / responses.length,
    };
  }

  private generateRecommendations(metrics: any, platformPerformance: any[]): string[] {
    const recommendations: string[] = [];

    // Overall rating recommendations
    if (metrics.averageRating < 4.5) {
      recommendations.push(
        'Focus on improving service quality to increase average rating above 4.5 stars'
      );
    }

    // Response rate recommendations
    if (metrics.responseRate < 0.9) {
      recommendations.push(
        `Increase response rate from ${(metrics.responseRate * 100).toFixed(0)}% to 90%+ by implementing auto-response for positive reviews`
      );
    }

    // Platform-specific recommendations
    platformPerformance.forEach(platform => {
      if (platform.responseRate < 0.8) {
        recommendations.push(
          `Improve response rate on ${platform.platformName} (currently ${(platform.responseRate * 100).toFixed(0)}%)`
        );
      }
      if (platform.averageRating < 4.0) {
        recommendations.push(
          `Address service issues on ${platform.platformName} (rating: ${platform.averageRating.toFixed(1)})`
        );
      }
    });

    return recommendations;
  }
}

// Types
interface AlertThresholds {
  negativeReviewThreshold: number;
  ratingDropThreshold: number;
  responseTimeTarget: number;
  criticalKeywords: string[];
}

interface ResponseRule {
  id: string;
  condition: {
    sentiment?: string;
    rating?: { min?: number; max?: number };
    platforms?: string[];
    containsKeywords?: string[];
  };
  action: 'auto-respond' | 'notify-urgent' | 'escalate';
  delay: number; // minutes
  requiresApproval: boolean;
}

interface ReputationMetrics {
  totalReviews: number;
  respondedReviews: number;
  responseRate: number;
  averageRating: number;
  platformBreakdown: any[];
}

interface ReputationAlert {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'urgent';
  message: string;
  data?: any;
}

interface ReputationReport {
  generatedAt: Date;
  metrics: ReputationMetrics;
  recentAlerts: any[];
  platformPerformance: any[];
  responsePerformance: any;
  recommendations: string[];
}

export const reputationMonitor = new ReputationMonitor();
