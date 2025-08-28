import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/safe-logger';
import { WebFetch } from '@/lib/utils/web-fetch';
import { getPrismaClient } from '@/lib/prisma';

export interface SocialMediaMonitoringRequest {
  practiceAreas: string[];
  platforms: ('twitter' | 'linkedin' | 'facebook' | 'instagram' | 'tiktok' | 'reddit')[];
  keywords: string[];
  location?: string;
  timeframe: 'last24h' | 'last7days' | 'last30days';
  language: 'en' | 'es';
  sentimentFilter?: 'positive' | 'negative' | 'neutral' | 'all';
  engagementThreshold?: number; // Minimum engagement (likes, shares, comments)
}

export interface TrendingTopic {
  id: string;
  topic: string;
  keywords: string[];
  platform: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
  };
  posts: SocialMediaPost[];
  trendScore: number;
  practiceAreaRelevance: Array<{
    area: string;
    relevanceScore: number;
  }>;
  emergencyLevel: 'low' | 'medium' | 'high' | 'urgent';
  actionable: boolean;
}

export interface SocialMediaPost {
  id: string;
  platform: string;
  author: string;
  content: string;
  url: string;
  publishedAt: Date;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
  };
  sentiment: 'positive' | 'negative' | 'neutral';
  relevanceScore: number;
  extractedTopics: string[];
  legalImplications?: string[];
}

export interface SocialMediaMonitoringResult {
  analysisDate: Date;
  monitoringPeriod: string;
  platforms: string[];
  trendingTopics: TrendingTopic[];
  insights: {
    mostEngagedTopics: string[];
    sentimentBreakdown: Record<string, number>;
    platformPerformance: Record<string, number>;
    emergingLegalTrends: string[];
    contentOpportunities: string[];
  };
  recommendations: {
    immediateActions: string[];
    contentStrategy: string[];
    engagementTactics: string[];
    riskAlerts: string[];
  };
  confidenceScore: number;
}

export class SocialMediaMonitoringAgent {
  private model: ChatOpenAI;
  private webFetch: WebFetch;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.3,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.webFetch = new WebFetch();
  }

  async monitorTrendingTopics(
    request: SocialMediaMonitoringRequest
  ): Promise<SocialMediaMonitoringResult> {
    try {
      logger.info('Starting social media monitoring', {
        practiceAreas: request.practiceAreas,
        platforms: request.platforms,
      });

      // Step 1: Collect social media data
      const socialMediaData = await this.collectSocialMediaData(request);

      // Step 2: Analyze trending topics
      const trendingTopics = await this.analyzeTrendingTopics(socialMediaData, request);

      // Step 3: Generate insights and recommendations
      const insights = await this.generateInsights(trendingTopics, request);
      const recommendations = await this.generateRecommendations(trendingTopics, insights, request);

      // Step 4: Store monitoring results
      await this.storeMonitoringResults(trendingTopics, insights, request);

      return {
        analysisDate: new Date(),
        monitoringPeriod: request.timeframe,
        platforms: request.platforms,
        trendingTopics,
        insights,
        recommendations,
        confidenceScore: this.calculateConfidenceScore(socialMediaData, request),
      };
    } catch (error) {
      logger.error('Social media monitoring error:', errorToLogMeta(error));
      throw new Error('Failed to complete social media monitoring');
    }
  }

  private async collectSocialMediaData(
    request: SocialMediaMonitoringRequest
  ): Promise<SocialMediaPost[]> {
    const allPosts: SocialMediaPost[] = [];

    for (const platform of request.platforms) {
      try {
        const posts = await this.fetchPlatformData(platform, request);
        allPosts.push(...posts);
      } catch (error) {
        logger.warn(`Failed to fetch data from ${platform}`, errorToLogMeta(error));
      }
    }

    // Filter and sort by relevance
    return allPosts
      .filter(post => this.isRelevantPost(post, request))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 200); // Top 200 most relevant posts
  }

  private async fetchPlatformData(
    platform: string,
    request: SocialMediaMonitoringRequest
  ): Promise<SocialMediaPost[]> {
    // In a real implementation, this would use platform-specific APIs
    // For now, we'll simulate with mock data based on search
    const searchQueries = this.buildSearchQueries(request);
    const posts: SocialMediaPost[] = [];

    for (const query of searchQueries.slice(0, 3)) {
      // Limit to 3 queries per platform
      try {
        const searchResults = await this.searchPlatform(platform, query, request);
        const analyzedPosts = await this.analyzePosts(searchResults, request);
        posts.push(...analyzedPosts);
      } catch (error) {
        logger.warn(`Failed to search ${platform} for query: ${query}`, errorToLogMeta(error));
      }
    }

    return posts;
  }

  private buildSearchQueries(request: SocialMediaMonitoringRequest): string[] {
    const { practiceAreas, keywords, location } = request;
    const queries: string[] = [];

    // Practice area specific queries
    practiceAreas.forEach(area => {
      queries.push(`${area} law trends`);
      queries.push(`${area} legal advice`);
      queries.push(`${area} attorney help`);
      if (location) {
        queries.push(`${area} lawyer ${location}`);
      }
    });

    // Keyword-based queries
    keywords.forEach(keyword => {
      queries.push(keyword);
      queries.push(`${keyword} legal`);
    });

    // General legal trending topics
    queries.push('legal news trending');
    queries.push('law firm marketing');
    queries.push('attorney client reviews');

    return queries;
  }

  private async searchPlatform(
    platform: string,
    query: string,
    request: SocialMediaMonitoringRequest
  ): Promise<
    Array<{ content: string; url: string; engagement: any; author: string; publishedAt: string }>
  > {
    // Mock implementation - in production would use platform APIs
    // Twitter API, LinkedIn API, Facebook Graph API, etc.

    const mockResults = [
      {
        content: `Trending legal topic: ${query}. New developments in ${request.practiceAreas[0]} law affecting clients nationwide.`,
        url: `https://${platform}.com/post/123`,
        engagement: { likes: 45, shares: 12, comments: 8 },
        author: `legal_expert_${platform}`,
        publishedAt: new Date().toISOString(),
      },
      {
        content: `Breaking: Important changes in ${query} that every lawyer should know about.`,
        url: `https://${platform}.com/post/124`,
        engagement: { likes: 23, shares: 5, comments: 15 },
        author: `law_updates_${platform}`,
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ];

    return mockResults;
  }

  private async analyzePosts(
    rawPosts: Array<{
      content: string;
      url: string;
      engagement: any;
      author: string;
      publishedAt: string;
    }>,
    request: SocialMediaMonitoringRequest
  ): Promise<SocialMediaPost[]> {
    const analyzedPosts: SocialMediaPost[] = [];

    for (const post of rawPosts) {
      try {
        const analysis = await this.analyzePost(post, request);
        if (analysis) {
          analyzedPosts.push(analysis);
        }
      } catch (error) {
        logger.warn('Failed to analyze post', createErrorLogMeta(error, { url: post.url }));
      }
    }

    return analyzedPosts;
  }

  private async analyzePost(
    post: { content: string; url: string; engagement: any; author: string; publishedAt: string },
    request: SocialMediaMonitoringRequest
  ): Promise<SocialMediaPost | null> {
    const analysisPrompt = this.buildPostAnalysisPrompt(post, request);

    const response = await this.model.invoke([
      new SystemMessage(this.getPostAnalysisSystemPrompt(request.language)),
      new HumanMessage(analysisPrompt),
    ]);

    const analysis = this.parsePostAnalysis(response.content.toString());

    if (!analysis || analysis.relevanceScore < 0.3) {
      return null; // Filter out irrelevant posts
    }

    return {
      id: post.url,
      platform: this.extractPlatformFromUrl(post.url),
      author: post.author,
      content: post.content,
      url: post.url,
      publishedAt: new Date(post.publishedAt),
      engagement: post.engagement,
      sentiment: analysis.sentiment,
      relevanceScore: analysis.relevanceScore,
      extractedTopics: analysis.extractedTopics,
      legalImplications: analysis.legalImplications,
    };
  }

  private buildPostAnalysisPrompt(
    post: { content: string; url: string; engagement: any; author: string; publishedAt: string },
    request: SocialMediaMonitoringRequest
  ): string {
    return `
Analyze this social media post for legal trend monitoring:

Content: ${post.content}
Platform: ${this.extractPlatformFromUrl(post.url)}
Engagement: ${JSON.stringify(post.engagement)}
Practice Areas of Interest: ${request.practiceAreas.join(', ')}
Keywords: ${request.keywords.join(', ')}

Provide analysis in this JSON format:
{
  "sentiment": "positive|negative|neutral",
  "relevanceScore": 0.0-1.0,
  "extractedTopics": ["topic1", "topic2"],
  "legalImplications": ["implication1", "implication2"],
  "practiceAreaRelevance": [
    {"area": "immigration", "score": 0.8}
  ],
  "emergencyLevel": "low|medium|high|urgent",
  "actionable": true|false
}
`;
  }

  private getPostAnalysisSystemPrompt(language: 'en' | 'es'): string {
    const prompts = {
      en: `You are a legal trend analyst monitoring social media for emerging topics and client concerns. Your role is to:
1. Assess the relevance of posts to legal practice areas
2. Identify trending topics that could impact legal services
3. Determine sentiment and urgency levels
4. Extract actionable insights for law firm marketing and client service
5. Spot potential crisis or opportunity indicators

Focus on factual analysis and practical implications for legal practitioners.`,

      es: `Eres un analista de tendencias legales que monitorea redes sociales para temas emergentes y preocupaciones de clientes. Tu rol es:
1. Evaluar la relevancia de publicaciones para áreas de práctica legal
2. Identificar temas tendencia que podrían impactar servicios legales
3. Determinar sentimiento y niveles de urgencia
4. Extraer ideas accionables para marketing de bufetes y servicio al cliente
5. Detectar indicadores de crisis o oportunidades potenciales

Enfócate en análisis factual e implicaciones prácticas para profesionales legales.`,
    };

    return prompts[language];
  }

  private parsePostAnalysis(content: string): {
    sentiment: 'positive' | 'negative' | 'neutral';
    relevanceScore: number;
    extractedTopics: string[];
    legalImplications: string[];
    practiceAreaRelevance: Array<{ area: string; score: number }>;
    emergencyLevel: 'low' | 'medium' | 'high' | 'urgent';
    actionable: boolean;
  } | null {
    try {
      return JSON.parse(content);
    } catch (error) {
      logger.warn('Failed to parse post analysis, using fallback');
      return {
        sentiment: 'neutral',
        relevanceScore: 0.1,
        extractedTopics: [],
        legalImplications: [],
        practiceAreaRelevance: [],
        emergencyLevel: 'low',
        actionable: false,
      };
    }
  }

  private extractPlatformFromUrl(url: string): string {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    if (url.includes('linkedin.com')) return 'linkedin';
    if (url.includes('facebook.com')) return 'facebook';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('reddit.com')) return 'reddit';
    return 'unknown';
  }

  private isRelevantPost(post: SocialMediaPost, request: SocialMediaMonitoringRequest): boolean {
    // Filter by engagement threshold
    if (request.engagementThreshold) {
      const totalEngagement =
        post.engagement.likes + post.engagement.shares + post.engagement.comments;
      if (totalEngagement < request.engagementThreshold) {
        return false;
      }
    }

    // Filter by sentiment
    if (request.sentimentFilter && request.sentimentFilter !== 'all') {
      if (post.sentiment !== request.sentimentFilter) {
        return false;
      }
    }

    // Filter by relevance score
    return post.relevanceScore >= 0.3;
  }

  private async analyzeTrendingTopics(
    posts: SocialMediaPost[],
    request: SocialMediaMonitoringRequest
  ): Promise<TrendingTopic[]> {
    // Group posts by topics
    const topicGroups = new Map<string, SocialMediaPost[]>();

    posts.forEach(post => {
      post.extractedTopics.forEach(topic => {
        if (!topicGroups.has(topic)) {
          topicGroups.set(topic, []);
        }
        topicGroups.get(topic)!.push(post);
      });
    });

    const trendingTopics: TrendingTopic[] = [];

    for (const [topic, topicPosts] of topicGroups.entries()) {
      if (topicPosts.length >= 2) {
        // Minimum 2 posts to be considered trending
        const trendingTopic = await this.createTrendingTopic(topic, topicPosts, request);
        if (trendingTopic) {
          trendingTopics.push(trendingTopic);
        }
      }
    }

    // Sort by trend score and return top 20
    return trendingTopics.sort((a, b) => b.trendScore - a.trendScore).slice(0, 20);
  }

  private async createTrendingTopic(
    topic: string,
    posts: SocialMediaPost[],
    request: SocialMediaMonitoringRequest
  ): Promise<TrendingTopic | null> {
    const totalEngagement = posts.reduce(
      (sum, post) =>
        sum + post.engagement.likes + post.engagement.shares + post.engagement.comments,
      0
    );

    const averageSentiment = this.calculateAverageSentiment(posts);
    const platforms = [...new Set(posts.map(post => post.platform))];
    const keywords = [...new Set(posts.flatMap(post => post.extractedTopics))];

    // Calculate practice area relevance
    const practiceAreaRelevance = await this.calculatePracticeAreaRelevance(topic, posts, request);

    const trendScore = this.calculateTrendScore(posts, totalEngagement, practiceAreaRelevance);

    if (trendScore < 0.4) {
      return null; // Filter out low-scoring trends
    }

    const emergencyLevel = this.assessEmergencyLevel(posts, practiceAreaRelevance);
    const actionable = this.isActionableTrend(posts, practiceAreaRelevance);

    return {
      id: `trend_${Date.now()}_${topic.replace(/\s+/g, '_')}`,
      topic,
      keywords,
      platform: platforms.join(', '),
      sentiment: averageSentiment,
      engagement: {
        likes: posts.reduce((sum, p) => sum + p.engagement.likes, 0),
        shares: posts.reduce((sum, p) => sum + p.engagement.shares, 0),
        comments: posts.reduce((sum, p) => sum + p.engagement.comments, 0),
        views: posts.reduce((sum, p) => sum + (p.engagement.views || 0), 0),
      },
      posts,
      trendScore,
      practiceAreaRelevance,
      emergencyLevel,
      actionable,
    };
  }

  private calculateAverageSentiment(posts: SocialMediaPost[]): 'positive' | 'negative' | 'neutral' {
    const sentimentCounts = posts.reduce(
      (counts, post) => {
        counts[post.sentiment]++;
        return counts;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );

    if (
      sentimentCounts.positive > sentimentCounts.negative &&
      sentimentCounts.positive > sentimentCounts.neutral
    ) {
      return 'positive';
    } else if (
      sentimentCounts.negative > sentimentCounts.positive &&
      sentimentCounts.negative > sentimentCounts.neutral
    ) {
      return 'negative';
    }
    return 'neutral';
  }

  private async calculatePracticeAreaRelevance(
    topic: string,
    posts: SocialMediaPost[],
    request: SocialMediaMonitoringRequest
  ): Promise<Array<{ area: string; relevanceScore: number }>> {
    const relevanceScores: Array<{ area: string; relevanceScore: number }> = [];

    for (const area of request.practiceAreas) {
      const scores = posts.flatMap(post =>
        post.extractedTopics.filter(t => t.toLowerCase().includes(area.toLowerCase()))
      );

      const relevanceScore = Math.min(scores.length / posts.length + 0.1, 1.0);
      relevanceScores.push({ area, relevanceScore });
    }

    return relevanceScores.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private calculateTrendScore(
    posts: SocialMediaPost[],
    totalEngagement: number,
    practiceAreaRelevance: Array<{ area: string; relevanceScore: number }>
  ): number {
    let score = 0;

    // Post frequency score (0-0.3)
    score += Math.min(posts.length * 0.05, 0.3);

    // Engagement score (0-0.4)
    score += Math.min(totalEngagement * 0.001, 0.4);

    // Practice area relevance score (0-0.3)
    const maxRelevance = practiceAreaRelevance[0]?.relevanceScore || 0;
    score += maxRelevance * 0.3;

    return Math.min(score, 1.0);
  }

  private assessEmergencyLevel(
    posts: SocialMediaPost[],
    practiceAreaRelevance: Array<{ area: string; relevanceScore: number }>
  ): 'low' | 'medium' | 'high' | 'urgent' {
    const urgentKeywords = ['crisis', 'urgent', 'emergency', 'breaking', 'alert'];
    const hasUrgentContent = posts.some(post =>
      urgentKeywords.some(keyword => post.content.toLowerCase().includes(keyword))
    );

    const highEngagement = posts.some(
      post => post.engagement.likes + post.engagement.shares + post.engagement.comments > 100
    );

    const highRelevance = (practiceAreaRelevance[0]?.relevanceScore ?? 0) > 0.8;

    if (hasUrgentContent && highEngagement) return 'urgent';
    if (hasUrgentContent || (highEngagement && highRelevance)) return 'high';
    if (highRelevance || highEngagement) return 'medium';
    return 'low';
  }

  private isActionableTrend(
    posts: SocialMediaPost[],
    practiceAreaRelevance: Array<{ area: string; relevanceScore: number }>
  ): boolean {
    const actionableKeywords = ['advice', 'help', 'question', 'how to', 'need', 'looking for'];
    const hasActionableContent = posts.some(post =>
      actionableKeywords.some(keyword => post.content.toLowerCase().includes(keyword))
    );

    const sufficientRelevance = (practiceAreaRelevance[0]?.relevanceScore ?? 0) > 0.5;
    const sufficientEngagement = posts.length >= 3;

    return hasActionableContent && sufficientRelevance && sufficientEngagement;
  }

  private async generateInsights(
    trendingTopics: TrendingTopic[],
    request: SocialMediaMonitoringRequest
  ) {
    const mostEngagedTopics = trendingTopics
      .sort(
        (a, b) =>
          b.engagement.likes +
          b.engagement.shares +
          b.engagement.comments -
          (a.engagement.likes + a.engagement.shares + a.engagement.comments)
      )
      .slice(0, 5)
      .map(topic => topic.topic);

    const sentimentBreakdown = trendingTopics.reduce(
      (breakdown, topic) => {
        breakdown[topic.sentiment] = (breakdown[topic.sentiment] || 0) + 1;
        return breakdown;
      },
      {} as Record<string, number>
    );

    const platformPerformance = trendingTopics.reduce(
      (performance, topic) => {
        const platforms = topic.platform.split(', ');
        platforms.forEach(platform => {
          performance[platform] = (performance[platform] || 0) + topic.trendScore;
        });
        return performance;
      },
      {} as Record<string, number>
    );

    const emergingLegalTrends = trendingTopics
      .filter(topic => topic.emergencyLevel === 'high' || topic.emergencyLevel === 'urgent')
      .map(topic => topic.topic)
      .slice(0, 10);

    const contentOpportunities = trendingTopics
      .filter(topic => topic.actionable && topic.sentiment === 'positive')
      .map(topic => topic.topic)
      .slice(0, 8);

    return {
      mostEngagedTopics,
      sentimentBreakdown,
      platformPerformance,
      emergingLegalTrends,
      contentOpportunities,
    };
  }

  private async generateRecommendations(
    trendingTopics: TrendingTopic[],
    insights: any,
    request: SocialMediaMonitoringRequest
  ) {
    const urgentTopics = trendingTopics.filter(topic => topic.emergencyLevel === 'urgent');
    const actionableTopics = trendingTopics.filter(topic => topic.actionable);
    const negativeTopics = trendingTopics.filter(topic => topic.sentiment === 'negative');

    const immediateActions = [
      ...urgentTopics.map(topic => `Address urgent topic: ${topic.topic}`),
      ...negativeTopics.slice(0, 3).map(topic => `Monitor negative sentiment: ${topic.topic}`),
    ].slice(0, 5);

    const contentStrategy = [
      ...actionableTopics.slice(0, 3).map(topic => `Create content around: ${topic.topic}`),
      ...insights.contentOpportunities
        .slice(0, 2)
        .map((opp: string) => `Content opportunity: ${opp}`),
    ].slice(0, 5);

    const engagementTactics = [
      'Respond to high-engagement posts in your practice areas',
      'Share expert insights on trending topics',
      'Engage with potential clients asking legal questions',
    ];

    const riskAlerts = negativeTopics
      .filter(topic => (topic.practiceAreaRelevance[0]?.relevanceScore ?? 0) > 0.6)
      .map(topic => `Risk alert: ${topic.topic}`)
      .slice(0, 3);

    return {
      immediateActions,
      contentStrategy,
      engagementTactics,
      riskAlerts,
    };
  }

  private calculateConfidenceScore(
    data: SocialMediaPost[],
    request: SocialMediaMonitoringRequest
  ): number {
    let score = 0.4; // Base score

    // Data volume score (0-0.3)
    score += Math.min(data.length * 0.01, 0.3);

    // Platform coverage score (0-0.2)
    score += (request.platforms.length / 6) * 0.2;

    // Data quality score (0-0.1)
    const qualityPosts = data.filter(post => post.relevanceScore > 0.5).length;
    score += (qualityPosts / data.length) * 0.1;

    return Math.min(score, 0.95);
  }

  private async storeMonitoringResults(
    trendingTopics: TrendingTopic[],
    insights: any,
    request: SocialMediaMonitoringRequest
  ) {
    try {
      // Store each trending topic as scraped content
      for (const topic of trendingTopics.slice(0, 10)) {
        // Store top 10 topics
        try {
          await getPrismaClient().scrapedContent.create({
            data: {
              platform: topic.platform,
              url: `monitoring-${topic.platform}-${Date.now()}-${topic.topic.replace(/\s+/g, '-')}`,
              title: topic.topic,
              description: `Trending topic: ${topic.topic} - ${topic.keywords.join(', ')}`,
              engagement: {
                views: topic.engagement.views || 0,
                likes: topic.engagement.likes,
                comments: topic.engagement.comments,
                shares: topic.engagement.shares,
              },
              publishedAt: new Date(),
              author: 'Social Media Monitor',
              hashtags: topic.keywords,
              practiceArea: request.practiceAreas[0] || null,
              relevanceScore: this.calculateRelevanceScore(topic),
            },
          });
        } catch (itemError) {
          logger.warn(`Failed to store trending topic: ${topic.topic}`, errorToLogMeta(itemError));
        }
      }
    } catch (error) {
      logger.warn('Failed to store social media monitoring results', errorToLogMeta(error));
    }
  }

  private calculateRelevanceScore(topic: TrendingTopic): number {
    let score = 0.5; // Base score

    // Increase based on trend score
    score += topic.trendScore * 0.3;

    // Increase based on engagement
    const totalEngagement =
      topic.engagement.likes + topic.engagement.shares + topic.engagement.comments;
    if (totalEngagement > 10000) score += 0.2;
    else if (totalEngagement > 1000) score += 0.1;

    // Cap at 1.0
    return Math.min(score, 1.0);
  }
}
