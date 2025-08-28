import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/safe-logger';
import { WebFetch } from '@/lib/utils/web-fetch';
import { getPrismaClient } from '@/lib/prisma';

export interface CompetitorAnalysisRequest {
  practiceArea: string;
  location: string;
  analysisType: 'pricing' | 'services' | 'marketing' | 'seo' | 'comprehensive';
  competitors?: string[]; // URLs or firm names
  language: 'en' | 'es';
  depth: 'quick' | 'detailed' | 'deep-dive';
}

export interface CompetitorProfile {
  name: string;
  website: string;
  practiceAreas: string[];
  pricing: {
    consultationFee?: number;
    hourlyRate?: number;
    packageDeals?: Array<{
      name: string;
      price: number;
      description: string;
    }>;
  };
  marketingStrategy: {
    seoKeywords: string[];
    contentTopics: string[];
    socialMediaPresence: string[];
    advertisingChannels: string[];
  };
  strengths: string[];
  weaknesses: string[];
  marketPosition: 'premium' | 'mid-market' | 'budget' | 'boutique';
  clientReviews: {
    averageRating: number;
    reviewCount: number;
    commonPraises: string[];
    commonComplaints: string[];
  };
}

export interface CompetitiveAnalysisResult {
  analysisDate: Date;
  practiceArea: string;
  location: string;
  marketOverview: {
    totalCompetitors: number;
    averagePricing: number;
    marketSaturation: 'low' | 'medium' | 'high';
    emergingTrends: string[];
  };
  competitors: CompetitorProfile[];
  opportunities: {
    underservedNiches: string[];
    pricingGaps: string[];
    serviceGaps: string[];
    marketingOpportunities: string[];
  };
  recommendations: {
    pricingStrategy: string[];
    serviceEnhancements: string[];
    marketingTactics: string[];
    competitiveDifferentiators: string[];
  };
  threatLevel: 'low' | 'medium' | 'high';
  confidenceScore: number;
}

export class CompetitiveAnalysisAgent {
  private model: ChatOpenAI;
  private webFetch: WebFetch;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.webFetch = new WebFetch();
  }

  async analyzeCompetition(request: CompetitorAnalysisRequest): Promise<CompetitiveAnalysisResult> {
    try {
      logger.info('Starting competitive analysis', {
        practiceArea: request.practiceArea,
        location: request.location,
      });

      // Step 1: Discover competitors if not provided
      const competitors = request.competitors || (await this.discoverCompetitors(request));

      // Step 2: Analyze each competitor
      const competitorProfiles = await this.analyzeCompetitors(competitors, request);

      // Step 3: Perform market analysis
      const marketAnalysis = await this.performMarketAnalysis(competitorProfiles, request);

      // Step 4: Generate recommendations
      const recommendations = await this.generateRecommendations(
        competitorProfiles,
        marketAnalysis,
        request
      );

      // Step 5: Store analysis in database
      await this.storeAnalysis(
        marketAnalysis,
        competitorProfiles,
        {
          immediate: recommendations.strategies.marketingTactics,
          shortTerm: recommendations.strategies.serviceEnhancements,
          longTerm: recommendations.strategies.competitiveDifferentiators,
          riskFactors: ['Market saturation', 'Competitive pressure'],
        },
        request
      );

      return {
        analysisDate: new Date(),
        practiceArea: request.practiceArea,
        location: request.location,
        marketOverview: marketAnalysis,
        competitors: competitorProfiles,
        opportunities: recommendations.opportunities,
        recommendations: recommendations.strategies,
        threatLevel: this.assessThreatLevel(competitorProfiles),
        confidenceScore: this.calculateConfidenceScore(competitorProfiles, request.depth),
      };
    } catch (error) {
      logger.error('Competitive analysis error:', errorToLogMeta(error));
      throw new Error('Failed to complete competitive analysis');
    }
  }

  private async discoverCompetitors(request: CompetitorAnalysisRequest): Promise<string[]> {
    const searchQueries = [
      `${request.practiceArea} lawyer ${request.location}`,
      `${request.practiceArea} attorney ${request.location}`,
      `best ${request.practiceArea} law firm ${request.location}`,
      `top ${request.practiceArea} lawyers near ${request.location}`,
    ];

    const competitors: string[] = [];

    for (const query of searchQueries.slice(0, 2)) {
      // Limit to 2 queries for performance
      try {
        const searchResults = await this.webFetch.searchGoogle(query, 10);

        const lawFirmUrls = searchResults
          .filter(result => this.isLawFirmWebsite(result.url))
          .map(result => result.url)
          .slice(0, 5); // Top 5 results per query

        competitors.push(...lawFirmUrls);
      } catch (error) {
        logger.warn('Failed to search for competitors', createErrorLogMeta(error, { query }));
      }
    }

    // Remove duplicates and return top 10
    return [...new Set(competitors)].slice(0, 10);
  }

  private isLawFirmWebsite(url: string): boolean {
    const lawFirmIndicators = [
      'law',
      'attorney',
      'legal',
      'counsel',
      'firm',
      'esquire',
      'associates',
      'partners',
      'pllc',
      'llc',
      'pc',
    ];

    const lowerUrl = url.toLowerCase();
    return lawFirmIndicators.some(indicator => lowerUrl.includes(indicator));
  }

  private async analyzeCompetitors(
    competitors: string[],
    request: CompetitorAnalysisRequest
  ): Promise<CompetitorProfile[]> {
    const profiles: CompetitorProfile[] = [];

    for (const competitorUrl of competitors) {
      try {
        const profile = await this.analyzeCompetitor(competitorUrl, request);
        if (profile) {
          profiles.push(profile);
        }
      } catch (error) {
        logger.warn(
          'Failed to analyze competitor',
          createErrorLogMeta(error, { url: competitorUrl })
        );
      }
    }

    return profiles;
  }

  private async analyzeCompetitor(
    url: string,
    request: CompetitorAnalysisRequest
  ): Promise<CompetitorProfile | null> {
    try {
      // Fetch competitor website content
      const websiteContent = await this.webFetch.fetchContent(url);

      // Analyze with AI
      const analysisPrompt = this.buildCompetitorAnalysisPrompt(request, websiteContent, url);

      const response = await this.model.invoke([
        new SystemMessage(this.getCompetitorAnalysisSystemPrompt(request.language)),
        new HumanMessage(analysisPrompt),
      ]);

      return this.parseCompetitorProfile(response.content.toString(), url);
    } catch (error) {
      logger.warn('Failed to analyze competitor website', createErrorLogMeta(error, { url }));
      return null;
    }
  }

  private buildCompetitorAnalysisPrompt(
    request: CompetitorAnalysisRequest,
    content: string,
    url: string
  ): string {
    return `
Analyze this law firm website for competitive intelligence:

URL: ${url}
Focus Practice Area: ${request.practiceArea}
Target Location: ${request.location}
Analysis Depth: ${request.depth}

Website Content (first 5000 chars):
${content.substring(0, 5000)}

Provide analysis in this JSON format:
{
  "name": "Firm Name",
  "practiceAreas": ["area1", "area2"],
  "pricing": {
    "consultationFee": 0,
    "hourlyRate": 0,
    "packageDeals": []
  },
  "marketingStrategy": {
    "seoKeywords": [],
    "contentTopics": [],
    "socialMediaPresence": [],
    "advertisingChannels": []
  },
  "strengths": [],
  "weaknesses": [],
  "marketPosition": "premium|mid-market|budget|boutique",
  "clientReviews": {
    "averageRating": 0,
    "reviewCount": 0,
    "commonPraises": [],
    "commonComplaints": []
  }
}
`;
  }

  private getCompetitorAnalysisSystemPrompt(language: 'en' | 'es'): string {
    const prompts = {
      en: `You are a competitive intelligence analyst specializing in legal services. Your role is to:
1. Extract key information about law firms from their websites
2. Identify their market positioning and pricing strategies
3. Analyze their marketing approaches and content strategies
4. Assess their strengths and weaknesses objectively
5. Provide actionable competitive insights

Focus on factual information and reasonable inferences. Avoid speculation.`,

      es: `Eres un analista de inteligencia competitiva especializado en servicios legales. Tu rol es:
1. Extraer información clave sobre bufetes de abogados de sus sitios web
2. Identificar su posicionamiento en el mercado y estrategias de precios
3. Analizar sus enfoques de marketing y estrategias de contenido
4. Evaluar sus fortalezas y debilidades objetivamente
5. Proporcionar ideas competitivas accionables

Enfócate en información factual e inferencias razonables. Evita especulaciones.`,
    };

    return prompts[language];
  }

  private parseCompetitorProfile(content: string, url: string): CompetitorProfile {
    try {
      const parsed = JSON.parse(content);
      return {
        ...parsed,
        website: url,
      };
    } catch (error) {
      logger.warn('Failed to parse competitor profile, using fallback', { url });
      return {
        name: 'Unknown Firm',
        website: url,
        practiceAreas: [],
        pricing: {},
        marketingStrategy: {
          seoKeywords: [],
          contentTopics: [],
          socialMediaPresence: [],
          advertisingChannels: [],
        },
        strengths: [],
        weaknesses: [],
        marketPosition: 'mid-market',
        clientReviews: {
          averageRating: 0,
          reviewCount: 0,
          commonPraises: [],
          commonComplaints: [],
        },
      };
    }
  }

  private async performMarketAnalysis(
    competitors: CompetitorProfile[],
    request: CompetitorAnalysisRequest
  ) {
    const totalCompetitors = competitors.length;

    // Calculate average pricing
    const pricingData = competitors
      .map(c => c.pricing.hourlyRate || c.pricing.consultationFee || 0)
      .filter(p => p > 0);

    const averagePricing =
      pricingData.length > 0
        ? pricingData.reduce((sum, price) => sum + price, 0) / pricingData.length
        : 0;

    // Assess market saturation
    const marketSaturation: 'low' | 'medium' | 'high' =
      totalCompetitors > 15 ? 'high' : totalCompetitors > 8 ? 'medium' : 'low';

    // Identify emerging trends
    const allTopics = competitors.flatMap(c => c.marketingStrategy.contentTopics);
    const trendMap = new Map<string, number>();
    allTopics.forEach(topic => {
      trendMap.set(topic, (trendMap.get(topic) || 0) + 1);
    });

    const emergingTrends = Array.from(trendMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([trend]) => trend);

    return {
      totalCompetitors,
      averagePricing,
      marketSaturation,
      emergingTrends,
    };
  }

  private async generateRecommendations(
    competitors: CompetitorProfile[],
    marketAnalysis: {
      totalCompetitors: number;
      averagePricing: number;
      marketSaturation: string;
      emergingTrends: string[];
    },
    request: CompetitorAnalysisRequest
  ) {
    const prompt = `
Based on this competitive analysis, generate strategic recommendations:

Market Overview:
- Total Competitors: ${marketAnalysis.totalCompetitors}
- Average Pricing: $${marketAnalysis.averagePricing}
- Market Saturation: ${marketAnalysis.marketSaturation}
- Emerging Trends: ${marketAnalysis.emergingTrends.join(', ')}

Practice Area: ${request.practiceArea}
Location: ${request.location}

Competitor Strengths: ${competitors.flatMap(c => c.strengths).join(', ')}
Competitor Weaknesses: ${competitors.flatMap(c => c.weaknesses).join(', ')}

Provide recommendations for:
1. Underserved market niches
2. Pricing gaps and opportunities
3. Service enhancement opportunities
4. Marketing and differentiation strategies
`;

    const response = await this.model.invoke([
      new SystemMessage(
        'You are a legal marketing strategist providing actionable competitive recommendations.'
      ),
      new HumanMessage(prompt),
    ]);

    return this.parseRecommendations(response.content.toString());
  }

  private parseRecommendations(content: string) {
    // Parse AI recommendations into structured format
    return {
      opportunities: {
        underservedNiches: this.extractListFromContent(content, 'niche'),
        pricingGaps: this.extractListFromContent(content, 'pricing'),
        serviceGaps: this.extractListFromContent(content, 'service'),
        marketingOpportunities: this.extractListFromContent(content, 'marketing'),
      },
      strategies: {
        pricingStrategy: this.extractListFromContent(content, 'pricing strategy'),
        serviceEnhancements: this.extractListFromContent(content, 'enhancement'),
        marketingTactics: this.extractListFromContent(content, 'tactic'),
        competitiveDifferentiators: this.extractListFromContent(content, 'differentiator'),
      },
    };
  }

  private extractListFromContent(content: string, keyword: string): string[] {
    const lines = content.split('\n');
    const relevantLines = lines.filter(
      line =>
        line.toLowerCase().includes(keyword) &&
        (line.includes('-') || line.includes('•') || line.includes('*'))
    );

    return relevantLines
      .map(line => line.replace(/^[-•*]\s*/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 5); // Top 5 recommendations per category
  }

  private assessThreatLevel(competitors: CompetitorProfile[]): 'low' | 'medium' | 'high' {
    const premiumCompetitors = competitors.filter(c => c.marketPosition === 'premium').length;
    const strongCompetitors = competitors.filter(c => c.clientReviews.averageRating > 4.0).length;

    if (premiumCompetitors > 3 || strongCompetitors > 5) return 'high';
    if (premiumCompetitors > 1 || strongCompetitors > 2) return 'medium';
    return 'low';
  }

  private calculateConfidenceScore(competitors: CompetitorProfile[], depth: string): number {
    let score = 0.5; // Base score

    // Increase based on data quality
    score += Math.min(competitors.length * 0.05, 0.3); // Up to +0.3 for competitor count

    // Increase based on analysis depth
    if (depth === 'deep-dive') score += 0.15;
    else if (depth === 'detailed') score += 0.1;

    // Increase based on data completeness
    const dataCompleteness =
      competitors.reduce((acc, c) => {
        let completeness = 0;
        if (c.pricing.hourlyRate || c.pricing.consultationFee) completeness += 0.25;
        if (c.practiceAreas.length > 0) completeness += 0.25;
        if (c.strengths.length > 0) completeness += 0.25;
        if (c.clientReviews.reviewCount > 0) completeness += 0.25;
        return acc + completeness;
      }, 0) / competitors.length;

    score += dataCompleteness * 0.2;

    return Math.min(score, 0.95); // Cap at 95%
  }

  private async storeAnalysis(
    marketAnalysis: {
      totalCompetitors: number;
      averagePricing: number;
      marketSaturation: string;
      emergingTrends: string[];
    },
    competitors: CompetitorProfile[],
    recommendations: {
      immediate: string[];
      shortTerm: string[];
      longTerm: string[];
      riskFactors: string[];
    },
    request: CompetitorAnalysisRequest
  ) {
    try {
      // Store each competitor analysis separately
      for (const competitor of competitors) {
        if (!competitor.website) continue;

        // First, create or find the competitor
        const competitorRecord = await getPrismaClient().competitor.upsert({
          where: { website: competitor.website },
          update: {
            name: competitor.name,
            lastChecked: new Date(),
            practiceAreas: [request.practiceArea],
            locations: [request.location],
            metadata: {
              marketPosition: competitor.marketPosition,
              strengths: competitor.strengths,
              weaknesses: competitor.weaknesses,
              clientReviews: competitor.clientReviews,
            },
          },
          create: {
            name: competitor.name,
            website: competitor.website,
            domain: new URL(competitor.website).hostname,
            practiceAreas: [request.practiceArea],
            locations: [request.location],
            metadata: {
              marketPosition: competitor.marketPosition,
              strengths: competitor.strengths,
              weaknesses: competitor.weaknesses,
              clientReviews: competitor.clientReviews,
            },
          },
        });

        // Then store the analysis
        await getPrismaClient().competitorAnalysis.create({
          data: {
            competitorId: competitorRecord.id,
            url: competitor.website,
            domain: competitorRecord.domain,
            blogPosts: competitor.marketingStrategy.contentTopics,
            seoData: {
              practiceArea: request.practiceArea,
              location: request.location,
              analysisType: request.analysisType,
              marketingStrategy: competitor.marketingStrategy,
              pricing: competitor.pricing,
            },
            keywords: competitor.marketingStrategy.seoKeywords,
            contentGaps: {
              marketOverview: marketAnalysis,
              immediate: recommendations.immediate,
              shortTerm: recommendations.shortTerm,
              longTerm: recommendations.longTerm,
              riskFactors: recommendations.riskFactors,
            },
          },
        });
      }
    } catch (error) {
      logger.warn('Failed to store competitive analysis in database', errorToLogMeta(error));
    }
  }
}
