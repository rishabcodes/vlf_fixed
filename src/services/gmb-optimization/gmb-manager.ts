import { logger } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { EventEmitter } from 'events';
import { z } from 'zod';

// Additional type definitions for GMB operations
interface LocationUpdates {
  description?: string;
  services?: string[];
  specialHours?: SpecialHour[];
  [key: string]: unknown;
}

interface SpecialHour {
  date: Date;
  type: 'holiday' | 'special_event' | 'closed';
  hours?: {
    open?: string;
    close?: string;
  };
}

interface GMBPost {
  type: 'update' | 'event' | 'offer' | 'product' | 'covid19';
  title: string;
  content: string;
  media?: Array<{
    type: 'image' | 'video';
    url: string;
    altText?: string;
  }>;
  callToAction?: {
    type: 'book' | 'order' | 'shop' | 'learn_more' | 'sign_up' | 'call';
    url?: string;
  };
  event?: {
    title: string;
    startDate: Date;
    endDate: Date;
  };
  offer?: {
    title: string;
    description: string;
    terms: string;
    startDate: Date;
    endDate: Date;
    couponCode?: string;
  };
}

interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  responded: boolean;
}

interface AnalyticsPeriod {
  startDate: Date;
  endDate: Date;
}

interface GMBAnalytics {
  period: AnalyticsPeriod;
  metrics: {
    views: {
      search: number;
      maps: number;
      total: number;
    };
    actions: {
      website: number;
      directions: number;
      phone: number;
      total: number;
    };
    queries: Array<{
      query: string;
      impressions: number;
      clicks: number;
    }>;
    photos: {
      views: number;
      posted: number;
    };
    reviews: {
      count: number;
      averageRating: number;
      newReviews: number;
    };
  };
}

interface LocationAnalyticsResult {
  analytics: GMBAnalytics;
  insights: string[];
  recommendations: string[];
}

interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  category: string;
  coordinates: { lat: number; lng: number };
  services: string[];
  description?: string;
  hours?: Record<
    string,
    {
      open?: string;
      close?: string;
      closed?: boolean;
    }
  >;
}

// GMB Business Location Schema
const GMBLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  website: z.string().url(),
  category: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  hours: z.record(
    z.object({
      open: z.string(),
      close: z.string(),
      closed: z.boolean().default(false),
    })
  ),
  services: z.array(z.string()),
  specialHours: z
    .array(
      z.object({
        date: z.date(),
        type: z.enum(['holiday', 'special_event', 'closed']),
        hours: z
          .object({
            open: z.string().optional(),
            close: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),
});

// GMB Post Schema
const GMBPostSchema = z.object({
  type: z.enum(['update', 'event', 'offer', 'product', 'covid19']),
  title: z.string().max(300),
  content: z.string().max(1500),
  media: z
    .array(
      z.object({
        type: z.enum(['image', 'video']),
        url: z.string().url(),
        altText: z.string().optional(),
      })
    )
    .optional(),
  callToAction: z
    .object({
      type: z.enum(['book', 'order', 'shop', 'learn_more', 'sign_up', 'call']),
      url: z.string().url().optional(),
    })
    .optional(),
  event: z
    .object({
      title: z.string(),
      startDate: z.date(),
      endDate: z.date(),
    })
    .optional(),
  offer: z
    .object({
      title: z.string(),
      description: z.string(),
      terms: z.string(),
      startDate: z.date(),
      endDate: z.date(),
      couponCode: z.string().optional(),
    })
    .optional(),
});

// GMB Analytics Schema
const GMBAnalyticsSchema = z.object({
  period: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  metrics: z.object({
    views: z.object({
      search: z.number(),
      maps: z.number(),
      total: z.number(),
    }),
    actions: z.object({
      website: z.number(),
      directions: z.number(),
      phone: z.number(),
      total: z.number(),
    }),
    queries: z.array(
      z.object({
        query: z.string(),
        impressions: z.number(),
        clicks: z.number(),
      })
    ),
    photos: z.object({
      views: z.number(),
      posted: z.number(),
    }),
    reviews: z.object({
      count: z.number(),
      averageRating: z.number(),
      newReviews: z.number(),
    }),
  }),
  insights: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export class GMBManager extends EventEmitter {
  private locations: Map<string, GMBLocation> = new Map();
  private automationEnabled: boolean = true;
  private optimizationSchedule: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.initializeLocations();
  }

  private async initializeLocations(): Promise<void> {
    // Initialize VLF locations
    const vlfLocations = [
      {
        id: 'raleigh-nc',
        name: 'Vasquez Law Firm - Raleigh',
        address: '123 Main St, Raleigh, NC 27601',
        phone: '(919) 555-0123',
        website: 'https://vasquezlawfirm.com',
        category: 'Immigration Attorney',
        coordinates: { lat: 35.7796, lng: -78.6382 },
        services: [
          'Immigration Law',
          'Personal Injury',
          'Criminal Defense',
          'Workers Compensation',
          'Family Law',
        ],
      },
      {
        id: 'charlotte-nc',
        name: 'Vasquez Law Firm - Charlotte',
        address: '456 Business Blvd, Charlotte, NC 28202',
        phone: '(704) 555-0123',
        website: 'https://vasquezlawfirm.com',
        category: 'Immigration Attorney',
        coordinates: { lat: 35.2271, lng: -80.8431 },
        services: [
          'Immigration Law',
          'Personal Injury',
          'Criminal Defense',
          'Workers Compensation',
        ],
      },
      {
        id: 'orlando-fl',
        name: 'Vasquez Law Firm - Orlando',
        address: '789 Orange Ave, Orlando, FL 32801',
        phone: '(407) 555-0123',
        website: 'https://vasquezlawfirm.com',
        category: 'Immigration Attorney',
        coordinates: { lat: 28.5383, lng: -81.3792 },
        services: ['Immigration Law', 'Personal Injury', 'Workers Compensation'],
      },
    ];

    for (const locationData of vlfLocations) {
      const location = new GMBLocation(locationData);
      this.locations.set(location.id, location);
    }

    logger.info('GMB locations initialized', {
      locationCount: this.locations.size,
    });
  }

  async startAutomation(): Promise<void> {
    if (!this.automationEnabled) return;

    // Schedule optimization tasks
    this.optimizationSchedule = setInterval(
      async () => {
        await this.runOptimizationCycle();
      },
      24 * 60 * 60 * 1000
    ); // Daily

    // Run initial optimization
    await this.runOptimizationCycle();

    this.emit('automation-started');
    logger.info('GMB automation started');
  }

  async stopAutomation(): Promise<void> {
    if (this.optimizationSchedule) {
      clearInterval(this.optimizationSchedule);
      this.optimizationSchedule = null;
    }

    this.emit('automation-stopped');
    logger.info('GMB automation stopped');
  }

  private async runOptimizationCycle(): Promise<void> {
    logger.info('Running GMB optimization cycle');

    for (const [locationId, location] of this.locations) {
      try {
        // Update business information
        await this.optimizeBusinessInfo(location);

        // Generate and post content
        await this.generateAutomatedPosts(location);

        // Optimize photos
        await this.optimizePhotos(location);

        // Monitor reviews
        await this.monitorReviews(location);

        // Analyze performance
        await this.analyzePerformance(location);

        // Update Q&A
        await this.optimizeQAndA(location);

        await this.delay(5000); // Rate limiting
      } catch (error) {
        logger.error('GMB optimization failed for location', {
          locationId,
          error: String(error),
        });
      }
    }

    this.emit('optimization-completed');
  }

  private async optimizeBusinessInfo(location: GMBLocation): Promise<void> {
    const updates: LocationUpdates = {};
    let hasUpdates = false;

    // Optimize business description
    const optimizedDescription = await this.generateOptimizedDescription(location);
    if (optimizedDescription !== location.description) {
      updates.description = optimizedDescription;
      hasUpdates = true;
    }

    // Update services based on practice areas
    const currentServices = location.services;
    const optimizedServices = await this.getOptimizedServices(location);

    if (JSON.stringify(currentServices.sort()) !== JSON.stringify(optimizedServices.sort())) {
      updates.services = optimizedServices;
      hasUpdates = true;
    }

    // Update special hours for holidays
    const specialHours = await this.generateSpecialHours(location);
    if (specialHours.length > 0) {
      updates.specialHours = specialHours;
      hasUpdates = true;
    }

    if (hasUpdates) {
      await this.updateLocationInfo(location.id, updates);
      logger.info('Updated GMB business info', { locationId: location.id, updates });
    }
  }

  private async generateAutomatedPosts(location: GMBLocation): Promise<void> {
    const postTypes = ['update', 'event', 'offer'] as const;
    const randomType = postTypes[Math.floor(Math.random() * postTypes.length)];

    let post: GMBPost | null = null;

    switch (randomType) {
      case 'update':
        post = await this.generateUpdatePost(location);
        break;
      case 'event':
        post = await this.generateEventPost(location);
        break;
      case 'offer':
        post = await this.generateOfferPost(location);
        break;
    }

    if (post) {
      await this.publishPost(location.id, post);
      logger.info('Published GMB post', {
        locationId: location.id,
        type: randomType,
      });
    }
  }

  private async generateUpdatePost(location: GMBLocation): Promise<GMBPost> {
    const updateTemplates = [
      {
        type: 'update' as const,
        title: 'Free Legal Consultation Available',
        content: `Need legal help? Our experienced attorneys at ${location.name} are here for you. We offer free consultations for immigration, personal injury, and criminal defense cases. Contact us today to discuss your legal needs.`,
        callToAction: { type: 'book' as const, url: `${location.website}/contact` },
      },
      {
        type: 'update' as const,
        title: 'Serving the Community with Excellence',
        content: `At ${location.name}, we\'re committed to providing exceptional legal services to our community. With years of experience in immigration law, personal injury, and more, we\'re here to protect your rights and fight for your future.`,
        callToAction: { type: 'learn_more' as const, url: location.website },
      },
      {
        type: 'update' as const,
        title: "Your Rights Matter - We're Here to Help",
        content: `Don\'t navigate complex legal matters alone. Our dedicated team at ${location.name} specializes in immigration, workers\' compensation, and personal injury cases. We speak both English and Spanish to better serve our diverse community.`,
        callToAction: { type: 'call' as const },
      },
    ];

    const index = Math.floor(Math.random() * updateTemplates.length);
    return updateTemplates[index] || updateTemplates[0] || {
      type: 'update' as const,
      title: 'Legal Services Available',
      content: `Visit ${location.name} for professional legal assistance.`,
      callToAction: { type: 'call' as const },
    };
  }

  private async generateEventPost(location: GMBLocation): Promise<GMBPost> {
    const events = [
      {
        type: 'event' as const,
        title: 'Free Immigration Workshop',
        content: `Join us for a free immigration workshop where our experienced attorneys will discuss pathways to legal status, family reunification, and citizenship. Refreshments will be provided.`,
        event: {
          title: 'Free Immigration Workshop',
          startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        },
        callToAction: { type: 'sign_up' as const, url: `${location.website}/events` },
      },
      {
        type: 'event' as const,
        title: "Workers' Rights Seminar",
        content: `Learn about your rights as a worker in this free seminar. We\'ll cover workers\' compensation, workplace injuries, and how to protect yourself on the job.`,
        event: {
          title: "Workers' Rights Seminar",
          startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000),
        },
        callToAction: { type: 'sign_up' as const, url: `${location.website}/events` },
      },
    ];

    const index = Math.floor(Math.random() * events.length);
    return events[index] || events[0] || {
      type: 'event' as const,
      title: 'Legal Event',
      content: `Join us at ${location.name} for an upcoming event.`,
      event: {
        title: 'Legal Information Session',
        startDate: new Date(),
        endDate: new Date(),
      },
      callToAction: { type: 'sign_up' as const, url: `${location.website}/events` },
    };
  }

  private async generateOfferPost(location: GMBLocation): Promise<GMBPost> {
    const offers = [
      {
        type: 'offer' as const,
        title: 'No Fee Unless We Win',
        content: `Personal injury cases are handled on a contingency basis - you don\'t pay attorney fees unless we win your case. Free consultations available.`,
        offer: {
          title: 'Contingency Fee Representation',
          description: 'No attorney fees unless we win your case',
          terms: 'Applies to personal injury cases only. Court costs and expenses may apply.',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
        callToAction: { type: 'book' as const, url: `${location.website}/contact` },
      },
      {
        type: 'offer' as const,
        title: 'Free Case Evaluation',
        content: `Unsure if you have a case? Get a free evaluation from our experienced legal team. We\'ll review your situation and explain your options at no cost.`,
        offer: {
          title: 'Free Case Evaluation',
          description: 'Complimentary consultation and case review',
          terms: 'Free consultation applies to new clients only. Some restrictions may apply.',
          startDate: new Date(),
          endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        },
        callToAction: { type: 'book' as const, url: `${location.website}/free-consultation` },
      },
    ];

    const index = Math.floor(Math.random() * offers.length);
    return offers[index] || offers[0] || {
      type: 'offer' as const,
      title: 'Special Offer',
      content: `Take advantage of our special offer at ${location.name}.`,
      offer: {
        title: 'Free Consultation',
        description: 'Get a free legal consultation',
        terms: 'Limited time offer',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      callToAction: { type: 'book' as const, url: `${location.website}/contact` },
    };
  }

  private async optimizePhotos(location: GMBLocation): Promise<void> {
    // Simulate photo optimization
    const photoCategories = ['exterior', 'interior', 'team', 'at_work', 'additional'];

    for (const category of photoCategories) {
      // Check if photos need updating
      const needsUpdate = Math.random() < 0.1; // 10% chance

      if (needsUpdate) {
        await this.uploadOptimizedPhoto(location.id, category);
        logger.info('Uploaded optimized photo', {
          locationId: location.id,
          category,
        });
      }
    }
  }

  private async monitorReviews(location: GMBLocation): Promise<void> {
    // Get recent reviews (simulated)
    const recentReviews = await this.getRecentReviews(location.id);

    for (const review of recentReviews) {
      if (!review.responded && review.rating <= 3) {
        // Generate appropriate response
        const response = await this.generateReviewResponse(review);
        await this.respondToReview(location.id, review.id, response);

        logger.info('Responded to review', {
          locationId: location.id,
          reviewId: review.id,
          rating: review.rating,
        });
      }
    }
  }

  private async analyzePerformance(location: GMBLocation): Promise<void> {
    const analytics = await this.getAnalytics(location.id, {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });

    // Generate insights
    const insights = await this.generateInsights(analytics);

    // Store analytics
    await this.storeAnalytics(location.id, analytics);

    // Create optimization recommendations
    const recommendations = await this.generateRecommendations(analytics);

    this.emit('analytics-updated', {
      locationId: location.id,
      analytics,
      insights,
      recommendations,
    });
  }

  private async optimizeQAndA(location: GMBLocation): Promise<void> {
    // Common legal questions for Q&A optimization
    const commonQuestions = [
      {
        question: 'Do you offer free consultations?',
        answer:
          'Yes, we offer free consultations for most legal matters. Contact us to schedule your appointment.',
      },
      {
        question: 'What languages do you speak?',
        answer:
          'Our team is fluent in both English and Spanish to better serve our diverse community.',
      },
      {
        question: 'What types of cases do you handle?',
        answer: `We specialize in ${location.services.join(', ')}. Contact us to discuss your specific legal needs.`,
      },
      {
        question: 'How much do you charge?',
        answer:
          'Our fees vary depending on the type of case. Many services are offered on a contingency basis. Contact us for a free consultation to discuss pricing.',
      },
      {
        question: 'How long do cases typically take?',
        answer:
          "Case duration varies significantly depending on the type and complexity. We'll provide estimated timelines during your consultation.",
      },
    ];

    // Add/update Q&A if needed
    for (const qa of commonQuestions) {
      const exists = await this.checkQAExists(location.id, qa.question);
      if (!exists) {
        await this.addQA(location.id, qa.question, qa.answer);
        logger.info('Added Q&A', {
          locationId: location.id,
          question: qa.question,
        });
      }
    }
  }

  // Helper methods for API integration (simulated)
  private async updateLocationInfo(locationId: string, updates: LocationUpdates): Promise<void> {
    // Simulate GMB API call
    logger.info('Updating GMB location info', { locationId, updates });
  }

  private async publishPost(locationId: string, post: GMBPost): Promise<void> {
    // Simulate GMB post creation
    await this.storePost(locationId, post);
  }

  private async uploadOptimizedPhoto(locationId: string, category: string): Promise<void> {
    // Simulate photo upload
    logger.info('Uploading photo', { locationId, category });
  }

  private async getRecentReviews(locationId: string): Promise<Review[]> {
    // Simulate getting recent reviews
    return [
      {
        id: 'review-1',
        rating: 2,
        text: 'Service was slow',
        author: 'Anonymous',
        responded: false,
      },
      {
        id: 'review-2',
        rating: 5,
        text: 'Excellent attorneys, very helpful',
        author: 'Happy Client',
        responded: false,
      },
    ];
  }

  private async generateReviewResponse(review: Review): Promise<string> {
    const responses = {
      negative: [
        `Thank you for your feedback. We're sorry to hear about your experience. We'd like to address your concerns directly. Please contact our office so we can discuss this matter further and work to resolve any issues.`,
        `We appreciate you taking the time to leave a review. We take all feedback seriously and would welcome the opportunity to discuss your experience. Please reach out to us at your convenience.`,
      ],
      positive: [
        `Thank you so much for your kind words! We're thrilled that we could help you with your legal matter. It's always our goal to provide excellent service to our clients.`,
        `We're grateful for your positive review! Thank you for trusting us with your legal needs. We're here if you need any assistance in the future.`,
      ],
    };

    const category = review.rating <= 3 ? 'negative' : 'positive';
    const templates = responses[category];
    const index = Math.floor(Math.random() * templates.length);
    return templates[index] || templates[0] || 'Thank you for your feedback.';
  }

  private async respondToReview(
    locationId: string,
    reviewId: string,
    response: string
  ): Promise<void> {
    // Simulate review response
    logger.info('Responding to review', { locationId, reviewId });
  }

  private async getAnalytics(locationId: string, period: AnalyticsPeriod): Promise<GMBAnalytics> {
    // Simulate analytics data
    return {
      period,
      metrics: {
        views: {
          search: Math.floor(Math.random() * 1000) + 500,
          maps: Math.floor(Math.random() * 500) + 200,
          total: 0,
        },
        actions: {
          website: Math.floor(Math.random() * 100) + 50,
          directions: Math.floor(Math.random() * 200) + 100,
          phone: Math.floor(Math.random() * 80) + 40,
          total: 0,
        },
        queries: [
          { query: 'immigration lawyer', impressions: 150, clicks: 12 },
          { query: 'personal injury attorney', impressions: 120, clicks: 8 },
          { query: 'workers compensation lawyer', impressions: 90, clicks: 6 },
        ],
        photos: {
          views: Math.floor(Math.random() * 300) + 100,
          posted: 5,
        },
        reviews: {
          count: 45,
          averageRating: 4.7,
          newReviews: 3,
        },
      },
    };
  }

  private async generateInsights(analytics: GMBAnalytics): Promise<string[]> {
    const insights: string[] = [];

    if (analytics.metrics.views.search > analytics.metrics.views.maps) {
      insights.push('More customers find you through search than maps');
    }

    if (analytics.metrics.actions.phone > analytics.metrics.actions.website) {
      insights.push('Customers prefer calling over visiting your website');
    }

    if (analytics.metrics.reviews.averageRating >= 4.5) {
      insights.push('Excellent review rating helps with local search visibility');
    }

    return insights;
  }

  private async generateRecommendations(analytics: GMBAnalytics): Promise<string[]> {
    const recommendations: string[] = [];

    if (analytics.metrics.photos.views < 100) {
      recommendations.push('Add more high-quality photos to increase engagement');
    }

    if (analytics.metrics.reviews.newReviews < 2) {
      recommendations.push('Encourage satisfied clients to leave reviews');
    }

    if (analytics.metrics.actions.website < analytics.metrics.actions.phone * 0.5) {
      recommendations.push('Optimize website conversion to capture more online leads');
    }

    return recommendations;
  }

  private async checkQAExists(locationId: string, question: string): Promise<boolean> {
    // Simulate Q&A check
    return Math.random() > 0.7; // 30% chance it doesn't exist
  }

  private async addQA(locationId: string, question: string, answer: string): Promise<void> {
    // Simulate Q&A addition
    logger.info('Adding Q&A', { locationId, question });
  }

  private async storePost(locationId: string, post: GMBPost): Promise<void> {
    try {
      await prisma.gMBPost.create({
        data: {
          locationId,
          type: post.type,
          title: post.title,
          content: post.content,
          media: JSON.stringify(post.media || []),
          callToAction: JSON.stringify(post.callToAction || {}),
          event: JSON.stringify(post.event || {}),
          offer: JSON.stringify(post.offer || {}),
          publishedAt: new Date(),
        },
      });
    } catch (error) {
      logger.error('Failed to store GMB post', { error: String(error) });
    }
  }

  private async storeAnalytics(locationId: string, analytics: GMBAnalytics): Promise<void> {
    try {
      // TODO: Implement gmbAnalytics model
      // await prisma.gmbAnalytics.create({
      logger.info('GMB analytics recorded', {
        locationId,
        metrics: analytics.metrics,
        period: analytics.period,
        date: new Date(),
      });
      //   data: {
      //     locationId,
      //     period: JSON.stringify(analytics.period),
      //     metrics: JSON.stringify(analytics.metrics),
      //     insights: JSON.stringify(analytics.insights || []),
      //     recommendations: JSON.stringify(analytics.recommendations || []),
      //     createdAt: new Date(),
      //   },
      // });
    } catch (error) {
      logger.error('Failed to store GMB analytics', { error: String(error) });
    }
  }

  private async generateOptimizedDescription(location: GMBLocation): Promise<string> {
    return `${location.name} provides comprehensive legal services including ${location.services.join(', ')}. Our experienced attorneys serve clients with dedication and expertise. We offer free consultations and speak both English and Spanish. Contact us today for professional legal representation.`;
  }

  private async getOptimizedServices(location: GMBLocation): Promise<string[]> {
    // Optimize services based on local search trends
    const baseServices = location.services;
    const optimizedServices = [
      ...baseServices,
      'Free Consultation',
      'Bilingual Service',
      'Emergency Legal Help',
    ];

    return [...new Set(optimizedServices)]; // Remove duplicates
  }

  private async generateSpecialHours(location: GMBLocation): Promise<SpecialHour[]> {
    const holidays = [
      { date: new Date('2024-12-25'), type: 'holiday' as const }, // Christmas
      { date: new Date('2024-01-01'), type: 'holiday' as const }, // New Year
      { date: new Date('2024-07-04'), type: 'holiday' as const }, // July 4th
    ];

    return holidays
      .filter(h => h.date > new Date())
      .map(holiday => ({
        date: holiday.date,
        type: holiday.type,
        hours: undefined, // Closed
      }));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Public methods for external access
  async getLocationAnalytics(locationId: string): Promise<LocationAnalyticsResult> {
    const analytics = await this.getAnalytics(locationId, {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });

    const insights = await this.generateInsights(analytics);
    const recommendations = await this.generateRecommendations(analytics);

    return {
      analytics,
      insights,
      recommendations,
    };
  }

  async getAllLocations(): Promise<GMBLocation[]> {
    return Array.from(this.locations.values());
  }

  async updateLocation(locationId: string, updates: LocationUpdates): Promise<void> {
    const location = this.locations.get(locationId);
    if (location) {
      Object.assign(location, updates);
      await this.updateLocationInfo(locationId, updates);
    }
  }

  async createCustomPost(locationId: string, postData: unknown): Promise<void> {
    const validatedPost = GMBPostSchema.parse(postData);
    await this.publishPost(locationId, validatedPost);
  }
}

// GMB Location class
class GMBLocation {
  public id: string;
  public name: string;
  public address: string;
  public phone: string;
  public website: string;
  public category: string;
  public coordinates: { lat: number; lng: number };
  public services: string[];
  public description?: string;
  public hours?: Record<
    string,
    {
      open?: string;
      close?: string;
      closed?: boolean;
    }
  >;

  constructor(data: LocationData) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.website = data.website;
    this.category = data.category;
    this.coordinates = data.coordinates;
    this.services = data.services;
    this.description = data.description;
    this.hours = data.hours || {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { closed: true },
      sunday: { closed: true },
    };
  }
}

// Export types
export type { GMBLocation };
export { GMBLocationSchema, GMBPostSchema, GMBAnalyticsSchema };

// Export singleton instance
export const gmbManager = new GMBManager();
