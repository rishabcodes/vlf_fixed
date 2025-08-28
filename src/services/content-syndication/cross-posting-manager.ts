import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { syndicationEngine } from './syndication-engine';
import { z } from 'zod';

const componentLogger = logger;

export class CrossPostingManager {
  private strategies: Map<string, CrossPostingStrategy> = new Map();

  constructor() {
    this.initializeStrategies();
  }

  private initializeStrategies(): void {
    // Blog to Social Media Strategy
    this.registerStrategy({
      id: 'blog-to-social',
      name: 'Blog to Social Media',
      sourceType: 'blog',
      targetPlatforms: ['linkedin', 'facebook', 'twitter'],
      rules: [
        {
          condition: { minWordCount: 500 },
          action: 'create-summary-post',
          config: {
            includeLink: true,
            includeImage: true,
            hashtags: true,
          },
        },
        {
          condition: { categories: ['news', 'legal-update'] },
          action: 'create-breaking-news-post',
          config: {
            urgency: 'high',
            crossPostImmediately: true,
          },
        },
      ],
      schedule: {
        delay: 30, // 30 minutes after blog publish
        stagger: 15, // 15 minutes between platforms
      },
    });

    // Blog to Legal Directories Strategy
    this.registerStrategy({
      id: 'blog-to-directories',
      name: 'Blog to Legal Directories',
      sourceType: 'blog',
      targetPlatforms: ['avvo', 'justia', 'findlaw'],
      rules: [
        {
          condition: {
            categories: ['guide', 'how-to'],
            minWordCount: 1000,
          },
          action: 'submit-as-guide',
          config: {
            addAuthorBio: true,
            includeCTA: true,
          },
        },
      ],
      schedule: {
        delay: 1440, // 24 hours after blog publish
        requiresApproval: true,
      },
    });

    // Video to Multiple Platforms Strategy
    this.registerStrategy({
      id: 'video-distribution',
      name: 'Video Multi-Platform Distribution',
      sourceType: 'video',
      targetPlatforms: ['youtube', 'facebook', 'linkedin'],
      rules: [
        {
          condition: { duration: { min: 60, max: 600 } }, // 1-10 minutes
          action: 'full-video-upload',
          config: {
            generateThumbnail: true,
            addCaptions: true,
          },
        },
        {
          condition: { duration: { max: 60 } }, // Under 1 minute
          action: 'create-shorts',
          config: {
            platforms: ['youtube-shorts', 'facebook-reels', 'instagram-reels'],
          },
        },
      ],
      schedule: {
        simultaneous: true,
      },
    });

    // News to Twitter Thread Strategy
    this.registerStrategy({
      id: 'news-twitter-thread',
      name: 'News to Twitter Thread',
      sourceType: 'news',
      targetPlatforms: ['twitter'],
      rules: [
        {
          condition: {
            importance: 'high',
            categories: ['breaking-news', 'legal-update'],
          },
          action: 'create-thread',
          config: {
            maxTweets: 5,
            includeImages: true,
            addThreadNumber: true,
          },
        },
      ],
      schedule: {
        immediate: true,
      },
    });

    // Case Study to LinkedIn Article Strategy
    this.registerStrategy({
      id: 'case-study-linkedin',
      name: 'Case Study to LinkedIn Article',
      sourceType: 'case_study',
      targetPlatforms: ['linkedin', 'medium'],
      rules: [
        {
          condition: {
            outcome: 'successful',
            clientConsent: true,
          },
          action: 'create-professional-article',
          config: {
            anonymizeClient: true,
            focusOnLessons: true,
            addExpertCommentary: true,
          },
        },
      ],
      schedule: {
        delay: 2880, // 48 hours
        requiresApproval: true,
      },
    });

    // Multi-Language Cross-Posting Strategy
    this.registerStrategy({
      id: 'multilingual-posting',
      name: 'Multi-Language Cross-Posting',
      sourceType: 'blog',
      targetPlatforms: ['facebook', 'linkedin'],
      rules: [
        {
          condition: { language: 'en' },
          action: 'translate-and-post',
          config: {
            targetLanguages: ['es'],
            preserveFormatting: true,
            culturalAdaptation: true,
          },
        },
      ],
      schedule: {
        delay: 60,
      },
    });
  }

  private registerStrategy(strategy: CrossPostingStrategy): void {
    this.strategies.set(strategy.id, strategy);
  }

  async executeStrategy(strategyId: string, content: any): Promise<CrossPostingResult> {
    const strategy = this.strategies.get(strategyId);
    if (!strategy) {
      throw new Error(`Strategy not found: ${strategyId}`);
    }

    try {
      logger.info(`Executing cross-posting strategy: ${strategyId}`);

      // Check if content matches strategy source type
      if (content.type !== strategy.sourceType) {
        throw new Error(
          `Content type mismatch. Expected ${strategy.sourceType}, got ${content.type}`
        );
      }

      // Evaluate rules to determine actions
      const applicableRules = this.evaluateRules(strategy.rules, content);
      if (applicableRules.length === 0) {
        logger.info('No applicable rules for content');
        return { success: true, executed: false, reason: 'No matching rules' };
      }

      // Execute actions for each applicable rule
      const results: any[] = [];
      for (const rule of applicableRules) {
        const actionResult = await this.executeAction(
          rule.action,
          content,
          strategy.targetPlatforms,
          rule.config,
          strategy.schedule
        );
        results.push(actionResult);
      }

      // Record cross-posting execution
      await this.recordExecution({
        strategyId,
        contentId: content.id,
        contentType: content.type,
        results,
      });

      return {
        success: true,
        executed: true,
        results,
        platforms: strategy.targetPlatforms,
      };
    } catch (error) {
      logger.error(`Cross-posting strategy failed:`, errorToLogMeta(error));
      return {
        success: false,
        executed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private evaluateRules(rules: CrossPostingRule[], content: any): CrossPostingRule[] {
    return rules.filter(rule => {
      const condition = rule.condition;

      // Check word count
      if (condition.minWordCount && content.wordCount < condition.minWordCount) {
        return false;
      }

      // Check categories
      if (condition.categories) {
        const contentCategories = content.categories?.map((c: any) => c.slug || c) || [];
        const hasCategory = condition.categories.some(cat => contentCategories.includes(cat));
        if (!hasCategory) return false;
      }

      // Check duration (for videos)
      if (condition.duration) {
        if (condition.duration.min && content.duration < condition.duration.min) {
          return false;
        }
        if (condition.duration.max && content.duration > condition.duration.max) {
          return false;
        }
      }

      // Check importance
      if (condition.importance && content.importance !== condition.importance) {
        return false;
      }

      // Check language
      if (condition.language && content.language !== condition.language) {
        return false;
      }

      // Check custom conditions
      if (condition.outcome && content.outcome !== condition.outcome) {
        return false;
      }
      if (condition.clientConsent && !content.clientConsent) {
        return false;
      }

      return true;
    });
  }

  private async executeAction(
    action: string,
    content: any,
    platforms: string[],
    config: any,
    schedule: any
  ): Promise<any> {
    switch (action) {
      case 'create-summary-post':
        return await this.createSummaryPost(content, platforms, config, schedule);

      case 'create-breaking-news-post':
        return await this.createBreakingNewsPost(content, platforms, config, schedule);

      case 'submit-as-guide':
        return await this.submitAsGuide(content, platforms, config, schedule);

      case 'full-video-upload':
        // TODO: Implement video upload functionality
        throw new Error('Video upload not yet implemented');

      case 'create-shorts':
        // TODO: Implement shorts creation functionality
        throw new Error('Shorts creation not yet implemented');

      case 'create-thread':
        return await this.createThread(content, platforms, config, schedule);

      case 'create-professional-article':
        // TODO: Implement professional article functionality
        throw new Error('Professional article creation not yet implemented');

      case 'translate-and-post':
        return await this.translateAndPost(content, platforms, config, schedule);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  private async createSummaryPost(
    content: any,
    platforms: string[],
    config: any,
    schedule: any
  ): Promise<any> {
    // Generate summary for social media
    const summary = await this.generateSocialSummary(content);

    // Add hashtags
    const hashtags: string[] = config.hashtags ? this.generateHashtags(content) : [];

    // Create transformed content
    const socialContent = {
      title: content.title,
      content: `${summary}\n\n${hashtags.join(' ')}`,
      link: config.includeLink ? content.url : undefined,
      image: config.includeImage ? content.featuredImage : undefined,
    };

    // Schedule syndication
    const publishTime = this.calculatePublishTime(schedule);

    return await syndicationEngine.syndicateContent({
      contentId: content.id,
      contentType: 'blog',
      platforms,
      scheduleTime: publishTime,
    });
  }

  private async createBreakingNewsPost(
    content: any,
    platforms: string[],
    config: any,
    schedule: any
  ): Promise<any> {
    // Create urgency-focused content
    const urgentContent = {
      title: `🚨 ${content.title}`,
      content: this.createUrgentSummary(content),
      priority: 'high',
    };

    // Immediate cross-posting if configured
    const publishTime = config.crossPostImmediately
      ? new Date()
      : this.calculatePublishTime(schedule);

    return await syndicationEngine.syndicateContent({
      contentId: content.id,
      contentType: 'news',
      platforms,
      scheduleTime: publishTime,
    });
  }

  private async submitAsGuide(
    content: any,
    platforms: string[],
    config: any,
    schedule: any
  ): Promise<any> {
    // Transform blog post into legal guide format
    const guide = {
      title: content.title,
      content: content.content,
      summary: content.excerpt,
      authorBio: config.addAuthorBio ? await this.getAuthorBio(content.authorId) : undefined,
      cta: config.includeCTA ? this.generateCTA(content) : undefined,
      practiceArea: this.mapToPracticeArea(content.categories),
    };

    // Legal directories often require approval
    if (schedule.requiresApproval) {
      return await this.queueForApproval({
        type: 'legal-guide',
        content: guide,
        platforms,
        originalContent: content,
      });
    }

    const publishTime = this.calculatePublishTime(schedule);

    return await syndicationEngine.syndicateContent({
      contentId: content.id,
      contentType: 'guide',
      platforms,
      scheduleTime: publishTime,
    });
  }

  private async createThread(
    content: any,
    platforms: string[],
    config: any,
    schedule: any
  ): Promise<any> {
    // Break content into thread
    const thread = this.breakIntoThread(content, config.maxTweets);

    // Add thread numbering
    if (config.addThreadNumber) {
      thread.tweets = thread.tweets.map(
        (tweet: string, index: number) => `${index + 1}/${thread.tweets.length} ${tweet}`
      );
    }

    // Create thread content
    const threadContent = {
      type: 'thread',
      tweets: thread.tweets,
      images: config.includeImages ? thread.images : undefined,
    };

    return await this.publishThread(threadContent, platforms[0] || '', schedule);
  }

  private async translateAndPost(
    content: any,
    platforms: string[],
    config: any,
    schedule: any
  ): Promise<any> {
    const results: any[] = [];

    for (const targetLanguage of config.targetLanguages) {
      // Translate content
      const translatedContent = await this.translateContent(content, targetLanguage, {
        preserveFormatting: config.preserveFormatting,
        culturalAdaptation: config.culturalAdaptation,
      });

      // Syndicate translated content
      const result = await syndicationEngine.syndicateContent({
        contentId: translatedContent.id,
        contentType: content.type,
        platforms,
        scheduleTime: this.calculatePublishTime(schedule),
      });

      results.push({
        language: targetLanguage,
        result,
      });
    }

    return results;
  }

  // Helper methods
  private async generateSocialSummary(content: any): Promise<string> {
    // Extract key points from content
    const keyPoints = this.extractKeyPoints(content.content);

    // Create engaging summary
    const summary = keyPoints.slice(0, 3).join('\n\n');

    return summary.length > 200 ? summary.substring(0, 197) + '...' : summary;
  }

  private generateHashtags(content: any): string[] {
    const hashtags: string[] = [];

    // Add practice area hashtags
    if (content.practiceArea) {
      hashtags.push(`#${content.practiceArea.replace(/-/g, '')}`);
    }

    // Add category hashtags
    content.categories?.forEach((cat: any) => {
      const tag = `#${(cat.name || cat).replace(/\s+/g, '')}`;
      if (!hashtags.includes(tag)) {
        hashtags.push(tag);
      }
    });

    // Add trending legal hashtags
    hashtags.push('#LegalAdvice', '#VasquezLawFirm');

    return hashtags.slice(0, 5); // Limit to 5 hashtags
  }

  private calculatePublishTime(schedule: any): Date {
    const now = new Date();

    if (schedule.immediate) {
      return now;
    }

    if (schedule.delay) {
      const publishTime = new Date(now);
      publishTime.setMinutes(publishTime.getMinutes() + schedule.delay);
      return publishTime;
    }

    if (schedule.simultaneous) {
      return now;
    }

    return now;
  }

  private createUrgentSummary(content: any): string {
    return `BREAKING: ${content.summary || content.excerpt}\n\nRead more: ${content.url}`;
  }

  private async getAuthorBio(authorId: string): Promise<string> {
    const author = await prisma.user.findUnique({
      where: { id: authorId },
      select: { name: true },
    });

    return `${author?.name || 'Attorney'} at Vasquez Law Firm`;
  }

  private generateCTA(content: any): string {
    const ctas = [
      'Contact us for a free consultation',
      'Get expert legal advice today',
      'Schedule your appointment now',
      'Learn how we can help with your case',
    ];

    return ctas[Math.floor(Math.random() * ctas.length)] || '';
  }

  private mapToPracticeArea(categories: any[]): string {
    const categoryMap: Record<string, string> = {
      immigration: 'immigration',
      'criminal-defense': 'criminal-defense',
      'family-law': 'family-law',
      'personal-injury': 'personal-injury',
      'workers-compensation': 'workers-compensation',
    };

    for (const cat of categories) {
      const slug = cat.slug || cat;
      if (categoryMap[slug]) {
        return categoryMap[slug];
      }
    }

    return 'general';
  }

  private breakIntoThread(content: any, maxTweets: number): any {
    const sentences = content.content
      .replace(/<[^>]*>/g, '')
      .split(/[.!?]+/)
      .filter((s: string) => s.trim().length > 0);

    const tweets: string[] = [];
    let currentTweet = '';

    for (const sentence of sentences) {
      if (currentTweet.length + sentence.length > 250) {
        tweets.push(currentTweet.trim());
        currentTweet = sentence;
      } else {
        currentTweet += ' ' + sentence;
      }

      if (tweets.length >= maxTweets - 1) {
        break;
      }
    }

    if (currentTweet.trim()) {
      tweets.push(currentTweet.trim());
    }

    // Add link to last tweet
    tweets[tweets.length - 1] += `\n\nRead more: ${content.url}`;

    return { tweets, images: [content.featuredImage] };
  }

  private async publishThread(thread: any, platform: string, schedule: any): Promise<any> {
    // Implementation would handle thread posting
    // For Twitter, this would use reply chains
    return {
      success: true,
      platform,
      threadId: `thread-${Date.now()}`,
      tweetCount: thread.tweets.length,
    };
  }

  private async translateContent(content: any, targetLanguage: string, options: any): Promise<any> {
    // Implementation would use translation service
    // For now, return mock translated content
    return {
      ...content,
      id: `${content.id}-${targetLanguage}`,
      language: targetLanguage,
      title: `[${targetLanguage.toUpperCase()}] ${content.title}`,
      content: `[Translated to ${targetLanguage}] ${content.content}`,
    };
  }

  private extractKeyPoints(content: string): string[] {
    // Simple extraction - in production would use NLP
    const points = content
      .replace(/<[^>]*>/g, '')
      .split(/\n\n+/)
      .filter(p => p.length > 50 && p.length < 200)
      .slice(0, 5);

    return points.map(p => `✓ ${p.trim()}`);
  }

  private async queueForApproval(params: any): Promise<any> {
    // TODO: Implement crossPostingQueue model in Prisma schema
    // await prisma.crossPostingQueue.create({
    //   data: {
    //     type: params.type,
    //     content: params.content,
    //     platforms: params.platforms,
    //     originalContentId: params.originalContent.id,
    //     status: 'pending_approval',
    //   },
    // });

    componentLogger.info('Cross-posting queued for approval', {
      type: params.type,
      platforms: params.platforms,
      contentId: params.originalContent.id,
    });

    return {
      success: true,
      status: 'queued_for_approval',
      queueId: `queue-${Date.now()}`,
    };
  }

  private async recordExecution(params: any): Promise<void> {
    // TODO: Implement crossPostingHistory model in Prisma schema
    // await prisma.crossPostingHistory.create({
    //   data: {
    //     strategyId: params.strategyId,
    //     contentId: params.contentId,
    //     contentType: params.contentType,
    //     results: params.results,
    //     executedAt: new Date(),
    //   },

    componentLogger.info('Cross-posting execution recorded', {
      strategyId: params.strategyId,
      contentId: params.contentId,
      contentType: params.contentType,
      timestamp: new Date().toISOString(),
    });
  }

  // Get applicable strategies for content
  async getApplicableStrategies(content: any): Promise<string[]> {
    const applicable: string[] = [];

    for (const [id, strategy] of this.strategies) {
      if (strategy.sourceType === content.type) {
        const rules = this.evaluateRules(strategy.rules, content);
        if (rules.length > 0) {
          applicable.push(id);
        }
      }
    }

    return applicable;
  }

  // Execute all applicable strategies
  async executeAllStrategies(content: any): Promise<Map<string, CrossPostingResult>> {
    const strategies = await this.getApplicableStrategies(content);
    const results = new Map<string, CrossPostingResult>();

    for (const strategyId of strategies) {
      const result = await this.executeStrategy(strategyId, content);
      results.set(strategyId, result);
    }

    return results;
  }
}

// Types
interface CrossPostingStrategy {
  id: string;
  name: string;
  sourceType: string;
  targetPlatforms: string[];
  rules: CrossPostingRule[];
  schedule: {
    delay?: number; // minutes
    stagger?: number; // minutes between platforms
    simultaneous?: boolean;
    immediate?: boolean;
    requiresApproval?: boolean;
  };
}

interface CrossPostingRule {
  condition: {
    minWordCount?: number;
    categories?: string[];
    duration?: { min?: number; max?: number };
    importance?: string;
    language?: string;
    outcome?: string;
    clientConsent?: boolean;
  };
  action: string;
  config: any;
}

interface CrossPostingResult {
  success: boolean;
  executed: boolean;
  results?: any[];
  platforms?: string[];
  reason?: string;
  error?: string;
}

export const crossPostingManager = new CrossPostingManager();
