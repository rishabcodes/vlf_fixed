import { EventEmitter } from 'events';
import { prisma } from '@/lib/prisma-safe';
import { logger } from '@/lib/safe-logger';
import { z } from 'zod';

// Schema definitions
export const TimeRangeSchema = z.object({
  start: z.date(),
  end: z.date(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day'),
});

export const DashboardMetricsSchema = z.object({
  timestamp: z.date(),
  overview: z.object({
    totalVisitors: z.number(),
    totalLeads: z.number(),
    conversionRate: z.number(),
    averageResponseTime: z.number(),
    systemHealth: z.number().min(0).max(100),
  }),
  voiceAgents: z.object({
    totalCalls: z.number(),
    averageCallDuration: z.number(),
    satisfactionScore: z.number().min(0).max(5),
    conversionRate: z.number(),
    topIntents: z.array(
      z.object({
        intent: z.string(),
        count: z.number(),
      })
    ),
  }),
  seo: z.object({
    organicTraffic: z.number(),
    averagePosition: z.number(),
    topKeywords: z.array(
      z.object({
        keyword: z.string(),
        position: z.number(),
        traffic: z.number(),
      })
    ),
    contentPerformance: z.number(),
  }),
  content: z.object({
    totalViews: z.number(),
    engagementRate: z.number(),
    averageTimeOnPage: z.number(),
    topContent: z.array(
      z.object({
        title: z.string(),
        views: z.number(),
        engagement: z.number(),
      })
    ),
  }),
  security: z.object({
    threatsDetected: z.number(),
    threatsBlocked: z.number(),
    riskScore: z.number().min(0).max(100),
    complianceScore: z.number().min(0).max(100),
  }),
  performance: z.object({
    averageApiResponseTime: z.number(),
    errorRate: z.number(),
    uptime: z.number().min(0).max(100),
    coreWebVitals: z.object({
      lcp: z.number(),
      fid: z.number(),
      cls: z.number(),
    }),
  }),
  gmb: z.object({
    totalViews: z.number(),
    totalActions: z.number(),
    averageRating: z.number().min(0).max(5),
    reviewCount: z.number(),
  }),
});

export type TimeRange = z.infer<typeof TimeRangeSchema>;
export type DashboardMetrics = z.infer<typeof DashboardMetricsSchema>;

export class AnalyticsEngine extends EventEmitter {
  private cache: Map<string, { data: DashboardMetrics; timestamp: Date }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    super();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Listen for real-time events to invalidate cache
    this.on('metrics:invalidate', (source: string) => {
      logger.info('Invalidating analytics cache', { source });
      this.cache.clear();
    });
  }

  async getDashboardMetrics(timeRange: TimeRange): Promise<DashboardMetrics> {
    const cacheKey = this.getCacheKey(timeRange);
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp.getTime() < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const metrics = await this.aggregateMetrics(timeRange);
      this.cache.set(cacheKey, { data: metrics, timestamp: new Date() });
      return metrics;
    } catch (error) {
      logger.error('Failed to get dashboard metrics', { error, timeRange });
      throw error;
    }
  }

  private async aggregateMetrics(timeRange: TimeRange): Promise<DashboardMetrics> {
    const startTime = Date.now();

    // Fetch all metrics in parallel for performance
    const [
      overviewMetrics,
      voiceMetrics,
      seoMetrics,
      contentMetrics,
      securityMetrics,
      performanceMetrics,
      gmbMetrics,
    ] = await Promise.all([
      this.getOverviewMetrics(timeRange),
      this.getVoiceAgentMetrics(timeRange),
      this.getSEOMetrics(timeRange),
      this.getContentMetrics(timeRange),
      this.getSecurityMetrics(timeRange),
      this.getPerformanceMetrics(timeRange),
      this.getGMBMetrics(timeRange),
    ]);

    const metrics: DashboardMetrics = {
      timestamp: new Date(),
      overview: overviewMetrics,
      voiceAgents: voiceMetrics,
      seo: seoMetrics,
      content: contentMetrics,
      security: securityMetrics,
      performance: performanceMetrics,
      gmb: gmbMetrics,
    };

    const duration = Date.now() - startTime;
    logger.info('Analytics metrics aggregated', { duration, timeRange });

    return DashboardMetricsSchema.parse(metrics);
  }

  private async getOverviewMetrics(timeRange: TimeRange) {
    // Aggregate high-level overview metrics
    const [visitorCount, leadCount, responseTimeData] = await Promise.all([
      this.getVisitorCount(timeRange),
      this.getLeadCount(timeRange),
      this.getAverageResponseTime(timeRange),
    ]);

    const conversionRate = leadCount > 0 ? (leadCount / visitorCount) * 100 : 0;
    const systemHealth = await this.calculateSystemHealth();

    return {
      totalVisitors: visitorCount,
      totalLeads: leadCount,
      conversionRate: Math.round(conversionRate * 100) / 100,
      averageResponseTime: responseTimeData,
      systemHealth: Math.round(systemHealth * 100) / 100,
    };
  }

  private async getVoiceAgentMetrics(timeRange: TimeRange) {
    const callData = await prisma.callAnalysis.findMany({
      where: {
        createdAt: {
          gte: timeRange.start,
          lte: timeRange.end,
        },
      },
      // Include related data if needed
    });

    const totalCalls = callData.length;
    // Duration would need to be calculated from call data
    const averageCallDuration = 0; // Placeholder - need to implement duration calculation

    // Satisfaction score would need to be extracted from sentiment or extractedInfo
    const satisfactionScore = 0; // Placeholder - need to implement satisfaction calculation

    const conversions = callData.filter(call =>
      call.actionItems?.some(
        item =>
          item.toLowerCase().includes('appointment') || item.toLowerCase().includes('consultation')
      )
    ).length;

    const conversionRate = totalCalls > 0 ? (conversions / totalCalls) * 100 : 0;

    // Get top intents from extractedInfo
    const intentCounts = new Map<string, number>();
    callData.forEach(call => {
      // Extract intent from extractedInfo JSON if available
      const extractedInfo = call.extractedInfo as any;
      if (extractedInfo?.intent) {
        const intent = extractedInfo.intent;
        intentCounts.set(intent, (intentCounts.get(intent) || 0) + 1);
      }
    });

    const topIntents = Array.from(intentCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([intent, count]) => ({ intent, count }));

    return {
      totalCalls,
      averageCallDuration: Math.round(averageCallDuration),
      satisfactionScore: Math.round(satisfactionScore * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
      topIntents,
    };
  }

  private async getSEOMetrics(_timeRange: TimeRange) {
    // Mock SEO data - would integrate with actual SEO APIs
    return {
      organicTraffic: Math.floor(Math.random() * 10000) + 5000,
      averagePosition: Math.round((Math.random() * 10 + 5) * 100) / 100,
      topKeywords: [
        { keyword: 'immigration lawyer charlotte', position: 3, traffic: 1250 },
        { keyword: 'personal injury attorney nc', position: 5, traffic: 980 },
        { keyword: 'criminal defense lawyer', position: 7, traffic: 750 },
        { keyword: 'workers compensation nc', position: 4, traffic: 650 },
        { keyword: 'family law attorney', position: 8, traffic: 520 },
      ],
      contentPerformance: Math.round((Math.random() * 40 + 60) * 100) / 100,
    };
  }

  private async getContentMetrics(timeRange: TimeRange) {
    const blogViews = await prisma.userActivity.count({
      where: {
        type: 'blog_view',
        createdAt: {
          gte: timeRange.start,
          lte: timeRange.end,
        },
      },
    });

    const engagementData = await prisma.userActivity.findMany({
      where: {
        type: { in: ['blog_view', 'download', 'contact_form'] },
        createdAt: {
          gte: timeRange.start,
          lte: timeRange.end,
        },
      },
    });

    const engagements = engagementData.filter(activity => activity.type !== 'blog_view').length;

    const engagementRate = blogViews > 0 ? (engagements / blogViews) * 100 : 0;

    return {
      totalViews: blogViews,
      engagementRate: Math.round(engagementRate * 100) / 100,
      averageTimeOnPage: Math.round((Math.random() * 120 + 60) * 100) / 100,
      topContent: [
        { title: 'Immigration Process Guide', views: 2500, engagement: 15.2 },
        { title: 'Personal Injury Claims', views: 1800, engagement: 12.8 },
        { title: 'Criminal Defense Rights', views: 1600, engagement: 18.5 },
        { title: 'Workers Comp Benefits', views: 1200, engagement: 10.4 },
        { title: 'Family Law Basics', views: 950, engagement: 14.1 },
      ],
    };
  }

  private async getSecurityMetrics(_timeRange: TimeRange) {
    // Would integrate with security monitoring system
    return {
      threatsDetected: Math.floor(Math.random() * 50) + 10,
      threatsBlocked: Math.floor(Math.random() * 45) + 8,
      riskScore: Math.round((Math.random() * 30 + 10) * 100) / 100,
      complianceScore: Math.round((Math.random() * 10 + 85) * 100) / 100,
    };
  }

  private async getPerformanceMetrics(timeRange: TimeRange) {
    const apiResponseTimes = await this.getApiResponseTimes(timeRange);
    const errorRate = await this.getErrorRate(timeRange);

    return {
      averageApiResponseTime: apiResponseTimes,
      errorRate: errorRate,
      uptime: Math.round((Math.random() * 2 + 98) * 100) / 100,
      coreWebVitals: {
        lcp: Math.round((Math.random() * 1000 + 1500) * 100) / 100,
        fid: Math.round((Math.random() * 50 + 10) * 100) / 100,
        cls: Math.round((Math.random() * 0.1 + 0.05) * 1000) / 1000,
      },
    };
  }

  private async getGMBMetrics(_timeRange: TimeRange) {
    // Would integrate with GMB API
    return {
      totalViews: Math.floor(Math.random() * 5000) + 2000,
      totalActions: Math.floor(Math.random() * 500) + 200,
      averageRating: Math.round((Math.random() * 1 + 4) * 100) / 100,
      reviewCount: Math.floor(Math.random() * 100) + 50,
    };
  }

  private async getVisitorCount(timeRange: TimeRange): Promise<number> {
    return await prisma.userActivity.count({
      where: {
        type: 'page_view',
        createdAt: {
          gte: timeRange.start,
          lte: timeRange.end,
        },
      },
    });
  }

  private async getLeadCount(timeRange: TimeRange): Promise<number> {
    return await prisma.userActivity.count({
      where: {
        type: { in: ['contact_form', 'phone_call', 'appointment_book'] },
        createdAt: {
          gte: timeRange.start,
          lte: timeRange.end,
        },
      },
    });
  }

  private async getAverageResponseTime(_timeRange: TimeRange): Promise<number> {
    // Mock data - would integrate with actual monitoring
    return Math.round((Math.random() * 200 + 50) * 100) / 100;
  }

  private async calculateSystemHealth(): Promise<number> {
    // Composite health score based on multiple factors
    const factors = {
      apiHealth: 95,
      databaseHealth: 98,
      securityHealth: 92,
      performanceHealth: 88,
    };

    const weights = {
      apiHealth: 0.3,
      databaseHealth: 0.25,
      securityHealth: 0.25,
      performanceHealth: 0.2,
    };

    return Object.entries(factors).reduce((score, [key, value]) => {
      return score + value * weights[key as keyof typeof weights];
    }, 0);
  }

  private async getApiResponseTimes(_timeRange: TimeRange): Promise<number> {
    // Mock data - would integrate with actual monitoring
    return Math.round((Math.random() * 100 + 50) * 100) / 100;
  }

  private async getErrorRate(_timeRange: TimeRange): Promise<number> {
    // Mock data - would integrate with actual monitoring
    return Math.round((Math.random() * 2 + 0.5) * 100) / 100;
  }

  private getCacheKey(timeRange: TimeRange): string {
    return `${timeRange.start.getTime()}-${timeRange.end.getTime()}-${timeRange.granularity}`;
  }

  async getRealTimeMetrics(): Promise<Partial<DashboardMetrics>> {
    // Return subset of metrics for real-time updates
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const timeRange: TimeRange = {
      start: oneHourAgo,
      end: now,
      granularity: 'hour',
    };

    const overviewMetrics = await this.getOverviewMetrics(timeRange);
    const securityMetrics = await this.getSecurityMetrics(timeRange);

    return {
      timestamp: new Date(),
      overview: overviewMetrics,
      security: securityMetrics,
    };
  }

  async exportMetrics(timeRange: TimeRange, format: 'csv' | 'json'): Promise<string> {
    const metrics = await this.getDashboardMetrics(timeRange);

    if (format === 'json') {
      return JSON.stringify(metrics, null, 2);
    }

    // CSV export logic would go here
    throw new Error('CSV export not yet implemented');
  }
}

export const analyticsEngine = new AnalyticsEngine();
