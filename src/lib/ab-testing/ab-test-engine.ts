import { EventEmitter } from 'events';
import { prisma } from '@/lib/prisma-safe';
import { logger } from '@/lib/safe-logger';
import { z } from 'zod';

// Define ABTestStatus locally to avoid dependency on Prisma client
enum ABTestStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED'
}

// Schema definitions
export const ABTestVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  weight: z.number().min(0).max(100),
  content: z.record(z.any()),
  metadata: z.record(z.any()).optional(),
});

export const ABTestConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'paused', 'completed']),
  variants: z.array(ABTestVariantSchema).min(2),
  targetingRules: z.object({
    traffic: z.number().min(0).max(100).default(100),
    userSegments: z.array(z.string()).optional(),
    geoTargeting: z.array(z.string()).optional(),
    deviceTypes: z.array(z.enum(['desktop', 'mobile', 'tablet'])).optional(),
    timeWindows: z
      .array(
        z.object({
          start: z.string(),
          end: z.string(),
          timezone: z.string().optional(),
        })
      )
      .optional(),
  }),
  metrics: z.object({
    primary: z.string(),
    secondary: z.array(z.string()).optional(),
    conversionGoals: z.array(
      z.object({
        name: z.string(),
        event: z.string(),
        value: z.number().optional(),
      })
    ),
  }),
  duration: z.object({
    startDate: z.date(),
    endDate: z.date().optional(),
    minSampleSize: z.number().default(1000),
    maxDuration: z.number().default(30), // days
  }),
  settings: z.object({
    confidenceLevel: z.number().min(0.8).max(0.99).default(0.95),
    minDetectableEffect: z.number().min(0.01).max(0.5).default(0.05),
    cookieDuration: z.number().default(30), // days
    excludeBots: z.boolean().default(true),
    stickyVariants: z.boolean().default(true),
  }),
});

export const ABTestResultSchema = z.object({
  testId: z.string(),
  variant: z.string(),
  metric: z.string(),
  value: z.number(),
  sampleSize: z.number(),
  conversionRate: z.number(),
  confidenceInterval: z.object({
    lower: z.number(),
    upper: z.number(),
  }),
  statisticalSignificance: z.boolean(),
  pValue: z.number(),
  uplift: z.number(),
});

export type ABTestVariant = z.infer<typeof ABTestVariantSchema>;
export type ABTestConfig = z.infer<typeof ABTestConfigSchema>;
export type ABTestResult = z.infer<typeof ABTestResultSchema>;

export interface ABTestParticipant {
  userId: string;
  sessionId: string;
  testId: string;
  variantId: string;
  assignedAt: Date;
  userAgent?: string;
  ipAddress?: string;
  geoLocation?: string;
  deviceType?: string;
}

export interface ABTestEvent {
  testId: string;
  variantId: string;
  userId: string;
  sessionId: string;
  event: string;
  value?: number;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export class ABTestEngine extends EventEmitter {
  private activeTests: Map<string, ABTestConfig> = new Map();
  private participantCache: Map<string, Map<string, string>> = new Map(); // userId -> testId -> variantId
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  constructor() {
    super();
    // Don't block initialization on database loading
    this.loadActiveTests().catch(error => {
      logger.error('Failed to load active tests during initialization', { error });
    });
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.on('test:started', (testId: string) => {
      logger.info('A/B test started', { testId });
    });

    this.on('test:completed', (testId: string) => {
      logger.info('A/B test completed', { testId });
    });

    this.on(
      'participant:assigned',
      (data: { testId: string; userId: string; variantId: string }) => {
        logger.info('User assigned to A/B test variant', data);
      }
    );
  }

  private async loadActiveTests(): Promise<void> {
    try {
      // Check if prisma client is available
      if (!prisma || !prisma.aBTest) {
        logger.warn('Prisma client not available, skipping active tests loading');
        return;
      }

      const activeTests = await prisma.aBTest.findMany({
        where: {
          status: ABTestStatus.ACTIVE,
          startDate: { lte: new Date() },
          OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
        },
        include: {
          variants: true,
        },
      });

      if (!activeTests || !Array.isArray(activeTests)) {
        logger.warn('No active tests found or invalid response');
        return;
      }

      for (const test of activeTests) {
        try {
          const config = this.dbTestToConfig(test);
          this.activeTests.set(test.id, config);
        } catch (configError) {
          logger.error('Failed to convert test to config', { error: configError, testId: test.id });
        }
      }

      logger.info('Active A/B tests loaded', { count: activeTests.length });
    } catch (error) {
      logger.error('Failed to load active A/B tests', { error });
      // Don't throw - allow the engine to continue working without pre-loaded tests
    }
  }

  async createTest(config: ABTestConfig): Promise<string> {
    try {
      const validatedConfig = ABTestConfigSchema.parse(config);

      // Validate variant weights sum to 100
      const totalWeight = validatedConfig.variants.reduce((sum, v) => sum + v.weight, 0);
      if (Math.abs(totalWeight - 100) > 0.01) {
        throw new Error('Variant weights must sum to 100%');
      }

      // Create test in database
      const test = await prisma.aBTest.create({
        data: {
          id: validatedConfig.id,
          name: validatedConfig.name,
          description: validatedConfig.description,
          status: validatedConfig.status.toUpperCase() as ABTestStatus,
          targetingRules: JSON.stringify(validatedConfig.targetingRules),
          metrics: JSON.stringify(validatedConfig.metrics),
          startDate: validatedConfig.duration.startDate,
          endDate: validatedConfig.duration.endDate,
          minSampleSize: validatedConfig.duration.minSampleSize,
          maxDuration: validatedConfig.duration.maxDuration,
          settings: JSON.stringify(validatedConfig.settings),
          variants: {
            create: validatedConfig.variants.map(variant => ({
              id: variant.id,
              name: variant.name,
              weight: variant.weight,
              content: JSON.stringify(variant.content),
              metadata: JSON.stringify(variant.metadata || {}),
            })),
          },
        },
      });

      if (validatedConfig.status === 'active') {
        this.activeTests.set(test.id, validatedConfig);
      }

      this.emit('test:created', test.id);
      logger.info('A/B test created', { testId: test.id, name: test.name });

      return test.id;
    } catch (error) {
      logger.error('Failed to create A/B test', { error, config });
      throw error;
    }
  }

  async startTest(testId: string): Promise<void> {
    try {
      const test = await prisma.aBTest.update({
        where: { id: testId },
        data: {
          status: ABTestStatus.ACTIVE,
          startDate: new Date(),
        },
        include: { variants: true },
      });

      const config = this.dbTestToConfig(test);
      this.activeTests.set(testId, config);

      this.emit('test:started', testId);
      logger.info('A/B test started', { testId });
    } catch (error) {
      logger.error('Failed to start A/B test', { error, testId });
      throw error;
    }
  }

  async pauseTest(testId: string): Promise<void> {
    try {
      await prisma.aBTest.update({
        where: { id: testId },
        data: { status: ABTestStatus.PAUSED },
      });

      this.activeTests.delete(testId);

      this.emit('test:paused', testId);
      logger.info('A/B test paused', { testId });
    } catch (error) {
      logger.error('Failed to pause A/B test', { error, testId });
      throw error;
    }
  }

  async completeTest(testId: string): Promise<void> {
    try {
      await prisma.aBTest.update({
        where: { id: testId },
        data: {
          status: ABTestStatus.COMPLETED,
          endDate: new Date(),
        },
      });

      this.activeTests.delete(testId);

      this.emit('test:completed', testId);
      logger.info('A/B test completed', { testId });
    } catch (error) {
      logger.error('Failed to complete A/B test', { error, testId });
      throw error;
    }
  }

  async assignVariant(
    testId: string,
    userId: string,
    sessionId: string,
    userContext?: {
      userAgent?: string;
      ipAddress?: string;
      geoLocation?: string;
      deviceType?: string;
    }
  ): Promise<string | null> {
    try {
      const test = this.activeTests.get(testId);
      if (!test) {
        return null;
      }

      // Check if user is already assigned
      const existingAssignment = await this.getExistingAssignment(testId, userId);
      if (existingAssignment) {
        return existingAssignment;
      }

      // Check targeting rules
      if (!this.matchesTargetingRules(test, userContext)) {
        return null;
      }

      // Assign variant based on weights
      const variantId = this.selectVariantByWeight(test.variants, userId);

      // Store assignment
      await this.storeAssignment({
        userId,
        sessionId,
        testId,
        variantId,
        assignedAt: new Date(),
        ...userContext,
      });

      // Cache assignment
      if (!this.participantCache.has(userId)) {
        this.participantCache.set(userId, new Map());
      }
      this.participantCache.get(userId)!.set(testId, variantId);

      this.emit('participant:assigned', { testId, userId, variantId });

      return variantId;
    } catch (error) {
      logger.error('Failed to assign A/B test variant', { error, testId, userId });
      return null;
    }
  }

  async trackEvent(event: ABTestEvent): Promise<void> {
    try {
      await prisma.aBTestEvent.create({
        data: {
          testId: event.testId,
          variantId: event.variantId,
          userId: event.userId,
          sessionId: event.sessionId,
          event: event.event,
          value: event.value,
          metadata: JSON.stringify(event.metadata || {}),
          timestamp: event.timestamp,
        },
      });

      this.emit('event:tracked', event);
    } catch (error) {
      logger.error('Failed to track A/B test event', { error, event });
    }
  }

  async getVariantContent(testId: string, variantId: string): Promise<Record<string, any> | null> {
    const test = this.activeTests.get(testId);
    if (!test) return null;

    const variant = test.variants.find(v => v.id === variantId);
    return variant?.content || null;
  }

  async getTestResults(testId: string): Promise<ABTestResult[]> {
    try {
      const test = await prisma.aBTest.findUnique({
        where: { id: testId },
        include: {
          variants: true,
          participants: true,
          events: true,
        },
      });

      if (!test) {
        throw new Error(`Test ${testId} not found`);
      }

      const results: ABTestResult[] = [];

      for (const variant of test.variants) {
        const variantParticipants = test.participants.filter(p => p.variantId === variant.id);
        const variantEvents = test.events.filter(e => e.variantId === variant.id);

        // Calculate conversion rate for primary metric
        const conversionEvents = variantEvents.filter(
          e => e.event === JSON.parse(test.metrics as string).primary
        );

        const sampleSize = variantParticipants.length;
        const conversions = conversionEvents.length;
        const conversionRate = sampleSize > 0 ? conversions / sampleSize : 0;

        // Calculate statistical significance (simplified)
        const { confidenceInterval, pValue, isSignificant } = this.calculateStatistics(
          conversions,
          sampleSize,
          0.95 // confidence level
        );

        // Calculate uplift compared to control (first variant)
        const controlVariant = test.variants[0];
        let uplift = 0;
        if (controlVariant && variant.id !== controlVariant.id) {
          const controlParticipants = test.participants.filter(
            p => p.variantId === controlVariant.id
          );
          const controlEvents = test.events.filter(
            e =>
              e.variantId === controlVariant.id &&
              e.event === JSON.parse(test.metrics as string).primary
          );
          const controlConversionRate =
            controlParticipants.length > 0 ? controlEvents.length / controlParticipants.length : 0;

          uplift =
            controlConversionRate > 0
              ? ((conversionRate - controlConversionRate) / controlConversionRate) * 100
              : 0;
        }

        results.push({
          testId,
          variant: variant.id,
          metric: JSON.parse(test.metrics as string).primary,
          value: conversions,
          sampleSize,
          conversionRate,
          confidenceInterval,
          statisticalSignificance: isSignificant,
          pValue,
          uplift,
        });
      }

      return results;
    } catch (error) {
      logger.error('Failed to get A/B test results', { error, testId });
      throw error;
    }
  }

  private async getExistingAssignment(testId: string, userId: string): Promise<string | null> {
    // Check cache first
    const userCache = this.participantCache.get(userId);
    if (userCache?.has(testId)) {
      return userCache.get(testId)!;
    }

    // Check database
    const participant = await prisma.aBTestParticipant.findFirst({
      where: { testId, userId },
    });

    if (participant) {
      // Update cache
      if (!this.participantCache.has(userId)) {
        this.participantCache.set(userId, new Map());
      }
      this.participantCache.get(userId)!.set(testId, participant.variantId);
      return participant.variantId;
    }

    return null;
  }

  private matchesTargetingRules(test: ABTestConfig, userContext?: any): boolean {
    const rules = test.targetingRules;

    // Traffic percentage
    if (Math.random() * 100 > rules.traffic) {
      return false;
    }

    // Device type targeting
    if (rules.deviceTypes && userContext?.deviceType) {
      if (!rules.deviceTypes.includes(userContext.deviceType)) {
        return false;
      }
    }

    // Geo targeting
    if (rules.geoTargeting && userContext?.geoLocation) {
      if (!rules.geoTargeting.includes(userContext.geoLocation)) {
        return false;
      }
    }

    // Time window targeting
    if (rules.timeWindows && rules.timeWindows.length > 0) {
      const now = new Date();
      const inTimeWindow = rules.timeWindows.some(window => {
        const start = new Date(window.start);
        const end = new Date(window.end);
        return now >= start && now <= end;
      });
      if (!inTimeWindow) {
        return false;
      }
    }

    return true;
  }

  private selectVariantByWeight(variants: ABTestVariant[], userId: string): string {
    // Use deterministic hash of userId for consistent assignment
    const hash = this.hashString(userId);
    const random = (hash % 10000) / 100; // 0-99.99

    let cumulativeWeight = 0;
    for (const variant of variants) {
      cumulativeWeight += variant.weight;
      if (random < cumulativeWeight) {
        return variant.id;
      }
    }

    // Fallback to first variant
    return variants[0]?.id || '';
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private async storeAssignment(participant: ABTestParticipant): Promise<void> {
    await prisma.aBTestParticipant.create({
      data: {
        userId: participant.userId,
        sessionId: participant.sessionId,
        testId: participant.testId,
        variantId: participant.variantId,
        assignedAt: participant.assignedAt,
        userAgent: participant.userAgent,
        ipAddress: participant.ipAddress,
        geoLocation: participant.geoLocation,
        deviceType: participant.deviceType,
      },
    });
  }

  private calculateStatistics(conversions: number, sampleSize: number, confidenceLevel: number) {
    const conversionRate = sampleSize > 0 ? conversions / sampleSize : 0;
    const z = confidenceLevel === 0.95 ? 1.96 : confidenceLevel === 0.99 ? 2.58 : 1.645;

    const standardError = Math.sqrt((conversionRate * (1 - conversionRate)) / sampleSize);
    const marginOfError = z * standardError;

    const confidenceInterval = {
      lower: Math.max(0, conversionRate - marginOfError),
      upper: Math.min(1, conversionRate + marginOfError),
    };

    // Simplified p-value calculation (would use proper statistical test in production)
    const pValue = sampleSize < 30 ? 1 : Math.max(0.001, 1 - confidenceLevel);
    const isSignificant = pValue < 1 - confidenceLevel;

    return { confidenceInterval, pValue, isSignificant };
  }

  private dbTestToConfig(dbTest: any): ABTestConfig {
    if (!dbTest) {
      throw new Error('Invalid test data: test is null or undefined');
    }

    // Helper function to safely parse JSON
    const safeJsonParse = (str: any, defaultValue: any = {}) => {
      if (!str) return defaultValue;
      if (typeof str !== 'string') return str;
      try {
        return JSON.parse(str);
      } catch (e) {
        logger.warn('Failed to parse JSON', { value: str, error: e });
        return defaultValue;
        }
};

    return {
      id: dbTest.id || '',
      name: dbTest.name || '',
      description: dbTest.description || '',
      status: (dbTest.status || 'DRAFT').toLowerCase() as 'draft' | 'active' | 'paused' | 'completed',
      variants: (dbTest.variants || []).map((v: any) => ({
        id: v.id || '',
        name: v.name || '',
        weight: v.weight || 0,
        content: safeJsonParse(v.content, {}),
        metadata: safeJsonParse(v.metadata, {}),
      })),
      targetingRules: safeJsonParse(dbTest.targetingRules, {
        traffic: 100,
        userSegments: [],
        geoTargeting: [],
        deviceTypes: [],
        timeWindows: [],
      }),
      metrics: safeJsonParse(dbTest.metrics, {
        primary: '',
        secondary: [],
        conversionGoals: [],
      }),
      duration: {
        startDate: dbTest.startDate || new Date(),
        endDate: dbTest.endDate || null,
        minSampleSize: dbTest.minSampleSize || 1000,
        maxDuration: dbTest.maxDuration || 30,
      },
      settings: safeJsonParse(dbTest.settings, {
        confidenceLevel: 0.95,
        minDetectableEffect: 0.05,
        cookieDuration: 30,
        excludeBots: true,
        stickyVariants: true,
      }),
    };
  }

  async getAllTests(): Promise<ABTestConfig[]> {
    try {
      if (!prisma || !prisma.aBTest) {
        logger.warn('Prisma client not available for getAllTests');
        return [];
      }

      const tests = await prisma.aBTest.findMany({
        include: { variants: true },
        orderBy: { createdAt: 'desc' },
      });

      if (!tests || !Array.isArray(tests)) {
        return [];
      }

      return tests
        .map(test => {
          try {
            return this.dbTestToConfig(test);
          } catch (error) {
            logger.error('Failed to convert test to config in getAllTests', { error, testId: test.id });
            return null;
          }
        })
        .filter((test): test is ABTestConfig => test !== null);
    } catch (error) {
      logger.error('Failed to get all tests', { error });
      return [];
    }
  }

  async getActiveTests(): Promise<ABTestConfig[]> {
    return Array.from(this.activeTests.values());
  }
}

export const abTestEngine = new ABTestEngine();
