/**
 * SIMPLIFIED BLOG ORCHESTRATOR
 * Only handles blog generation and SEO - no social media, GMB, or other shit
 * Generates 2-3 posts per week automatically
 */

import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { contentFactory } from './content-factory';
import { CostTracker } from '@/new-seo-agents';
import { getPrismaClient } from '@/lib/prisma';
import { topicTracker } from './topic-tracker';
import * as cron from 'node-cron';
import type { PrismaClient } from '@prisma/client';

export class SimpleBlogOrchestrator {
  private prisma: PrismaClient;
  private isRunning: boolean = false;
  private scheduledJobs: cron.ScheduledTask[] = [];
  
  // Configuration
  private readonly POSTS_PER_WEEK = 3; // 2-3 posts per week
  private readonly PRACTICE_AREAS = [
    'immigration',
    'personal-injury', 
    'criminal-defense',
    'workers-compensation',
    'family-law'
  ];
  
  constructor() {
    this.prisma = getPrismaClient();
    logger.info('[SimpleBlogOrchestrator] Initialized - Blog generation only mode');
  }
  
  /**
   * Start the blog generation system
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('[SimpleBlogOrchestrator] Already running');
      return;
    }
    
    try {
      logger.info('[SimpleBlogOrchestrator] Starting blog generation system...');
      
      // Initialize content factory
      await contentFactory.initialize();
      
      // Schedule blog posts - Monday, Wednesday, Friday at 10 AM
      this.scheduleWeeklyPosts();
      
      this.isRunning = true;
      logger.info('[SimpleBlogOrchestrator] Blog generation system started successfully');
      
      // Don't generate immediately - let user trigger manually
      // await this.generateSinglePost();
      
    } catch (error) {
      logger.error('[SimpleBlogOrchestrator] Failed to start:', errorToLogMeta(error));
      throw error;
    }
  }
  
  /**
   * Stop the blog generation system
   */
  async stop(): Promise<void> {
    logger.info('[SimpleBlogOrchestrator] Stopping blog generation system...');
    
    // Cancel all scheduled jobs
    for (const job of this.scheduledJobs) {
      job.stop();
    }
    this.scheduledJobs = [];
    
    this.isRunning = false;
    logger.info('[SimpleBlogOrchestrator] Blog generation system stopped');
  }
  
  /**
   * Schedule weekly blog posts
   */
  private scheduleWeeklyPosts(): void {
    // Monday at 10 AM
    const mondayJob = cron.schedule('0 10 * * 1', async () => {
      logger.info('[SimpleBlogOrchestrator] Monday blog post generation started');
      await this.generateSinglePost();
    });
    
    // Wednesday at 10 AM
    const wednesdayJob = cron.schedule('0 10 * * 3', async () => {
      logger.info('[SimpleBlogOrchestrator] Wednesday blog post generation started');
      await this.generateSinglePost();
    });
    
    // Friday at 10 AM
    const fridayJob = cron.schedule('0 10 * * 5', async () => {
      logger.info('[SimpleBlogOrchestrator] Friday blog post generation started');
      await this.generateSinglePost();
    });
    
    this.scheduledJobs.push(mondayJob, wednesdayJob, fridayJob);
    
    logger.info('[SimpleBlogOrchestrator] Scheduled 3 posts per week (Mon/Wed/Fri at 10 AM)');
  }
  
  /**
   * Generate a single blog post
   */
  async generateSinglePost(): Promise<any> {
    try {
      logger.info('[SimpleBlogOrchestrator] Generating unique blog post...');
      
      // Get a unique topic from the tracker
      const topicData = await topicTracker.getNextUniqueTopic();
      
      logger.info(`[SimpleBlogOrchestrator] Topic selected: ${topicData.topic}`);
      logger.info(`[SimpleBlogOrchestrator] Type: ${topicData.contentType}, Location: ${topicData.location}`);
      
      // Get content generation prompt based on content type
      const contentPrompt = topicTracker.getContentPrompt(topicData.contentType);
      
      // Use content factory to generate a blog post
      const blogPost = await contentFactory.blogGenerator.generateBlogPost({
        topic: topicData.topic,
        practiceArea: topicData.practiceArea,
        language: 'en',
        targetKeywords: topicData.keywords,
        includeLocalCaseStudy: topicData.contentType === 'case-study',
        optimizeForVoiceSearch: topicData.contentType === 'faq',
        contentGuidance: contentPrompt,
        location: topicData.location
      });
      
      // Save to database
      const savedPost = await this.saveBlogPost(blogPost, topicData.practiceArea);
      
      // Track cost
      const costTracker = CostTracker.getInstance();
      await costTracker.track({
        agent: 'BlogContentDominationAgent',
        task: 'generate_blog_post',
        cost: 0.05, // Estimated cost per blog post
        model: 'gpt-4-turbo-preview',
        tokens: 2000,
        timestamp: new Date()
      });
      
      logger.info(`[SimpleBlogOrchestrator] Blog post generated and saved: ${savedPost.id}`);
      logger.info(`[SimpleBlogOrchestrator] Title: ${savedPost.title}`);
      
      return savedPost;
      
    } catch (error) {
      logger.error('[SimpleBlogOrchestrator] Failed to generate blog post:', errorToLogMeta(error));
      throw error;
    }
  }
  
  
  /**
   * Save blog post to database
   */
  private async saveBlogPost(blogPost: any, practiceArea: string): Promise<any> {
    try {
      // Create the blog post in database
      const saved = await this.prisma.blogPost.create({
        data: {
          title: blogPost.title,
          content: blogPost.content,
          excerpt: blogPost.excerpt || blogPost.content.substring(0, 200) + '...',
          slug: this.generateSlug(blogPost.title),
          practiceArea,
          author: 'Vasquez Law Firm',
          status: 'published',
          publishedAt: new Date(),
          metaDescription: blogPost.seoMetadata?.description || blogPost.metaDescription || blogPost.excerpt || '',
          metaKeywords: blogPost.seoMetadata?.keywords || blogPost.keywords || [],
          featuredImage: blogPost.featuredImage || null,
          readTime: Math.ceil(blogPost.content.split(' ').length / 200), // Estimate read time
          metadata: {
            generatedBy: 'SimpleBlogOrchestrator',
            model: 'gpt-4-turbo-preview',
            timestamp: new Date().toISOString(),
            schema: blogPost.schemaMarkup || {}
          }
        }
      });
      
      logger.info(`[SimpleBlogOrchestrator] Blog post saved to database: ${saved.id}`);
      return saved;
      
    } catch (error) {
      logger.error('[SimpleBlogOrchestrator] Failed to save blog post:', errorToLogMeta(error));
      throw error;
    }
  }
  
  /**
   * Generate URL-friendly slug from title
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);
  }
  
  /**
   * Get system status
   */
  getStatus(): any {
    return {
      isRunning: this.isRunning,
      scheduledJobs: this.scheduledJobs.length,
      postsPerWeek: this.POSTS_PER_WEEK,
      nextRun: this.getNextRunTime(),
      practiceAreas: this.PRACTICE_AREAS
    };
  }
  
  /**
   * Get next scheduled run time
   */
  private getNextRunTime(): string {
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    // Calculate next run day (1=Mon, 3=Wed, 5=Fri)
    const scheduleDays = [1, 3, 5];
    let nextDay = scheduleDays.find(d => d > dayOfWeek);
    
    if (!nextDay) {
      nextDay = scheduleDays[0]; // Next Monday
    }
    
    const daysUntilNext = (nextDay - dayOfWeek + 7) % 7 || 7;
    const nextRun = new Date(now);
    nextRun.setDate(now.getDate() + daysUntilNext);
    nextRun.setHours(10, 0, 0, 0);
    
    return nextRun.toISOString();
  }
  
  /**
   * Generate blog post on demand (for manual trigger)
   */
  async generateOnDemand(params: {
    topic?: string;
    practiceArea?: string;
    keywords?: string[];
  }): Promise<any> {
    try {
      logger.info('[SimpleBlogOrchestrator] Manual blog generation triggered');
      
      // If specific topic provided, use it directly
      if (params.topic && params.practiceArea) {
        const blogPost = await contentFactory.blogGenerator.generateBlogPost({
          topic: params.topic,
          practiceArea: params.practiceArea,
          language: 'en',
          targetKeywords: params.keywords || ['legal', params.practiceArea],
          includeLocalCaseStudy: false,
          optimizeForVoiceSearch: false
        });
        
        return await this.saveBlogPost(blogPost, params.practiceArea);
      }
      
      // Otherwise use the topic tracker for unique content
      return await this.generateSinglePost();
      
    } catch (error) {
      logger.error('[SimpleBlogOrchestrator] Manual generation failed:', errorToLogMeta(error));
      throw error;
    }
  }
}

// Export singleton instance
export const blogOrchestrator = new SimpleBlogOrchestrator();