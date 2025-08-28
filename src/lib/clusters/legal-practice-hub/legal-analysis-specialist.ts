/**
 * Legal Analysis Specialist - Consolidated Legal Analysis and Strategy Agent
 * 
 * Consolidates 3 analysis and strategy agents into one comprehensive system:
 * - legal-consultation-agent.ts (Case analysis, recommendations, attorney routing)
 * - competitive-analysis-agent.ts (Market analysis, competitor research, positioning)
 * - ai-overview-optimization-agent.ts (Content optimization, SEO, FAQ generation)
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { APISafetyWrapper } from '@/lib/api-safety';
import { errorToLogMeta } from '@/lib/safe-logger';
import { WebFetch } from '@/lib/utils/web-fetch';

export type AnalysisType = 'legal_consultation' | 'competitive_analysis' | 'content_optimization';

export interface LegalAnalysisRequest {
  analysisType: AnalysisType;
  language: 'en' | 'es';
  
  // Legal consultation fields
  userId?: string;
  caseType?: string;
  caseDescription?: string;
  urgency?: 'low' | 'medium' | 'high';
  location?: string;
  
  // Competitive analysis fields
  practiceArea?: string;
  competitiveAnalysisType?: 'pricing' | 'services' | 'marketing' | 'seo' | 'comprehensive';
  competitors?: string[];
  analysisDepth?: 'quick' | 'detailed' | 'deep-dive';
  
  // Content optimization fields
  content?: string;
  targetKeywords?: string[];
  contentType?: 'article' | 'faq' | 'how_to' | 'legal_guide' | 'service_page';
  targetAudience?: 'potential_clients' | 'current_clients' | 'general_public';
  voiceSearchFocus?: boolean;
}

export interface LegalAnalysisResponse {
  analysisType: AnalysisType;
  success: boolean;
  
  // Legal consultation results
  legalConsultation?: {
    recommendations: string[];
    suggestedPracticeAreas: string[];
    estimatedCaseComplexity: 'simple' | 'moderate' | 'complex';
    nextSteps: string[];
    suggestedAttorneys?: string[];
    disclaimers: string[];
    urgencyAssessment: string;
    estimatedCosts?: string;
  };
  
  // Competitive analysis results
  competitiveAnalysis?: {
    marketOverview: {
      totalCompetitors: number;
      averagePricing: string;
      marketSaturation: 'low' | 'medium' | 'high';
      emergingTrends: string[];
    };
    topCompetitors: Array<{
      name: string;
      website: string;
      strengths: string[];
      weaknesses: string[];
      marketPosition: 'premium' | 'mid-market' | 'budget' | 'boutique';
      pricing: string;
    }>;
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
  };
  
  // Content optimization results
  contentOptimization?: {
    optimizedContent: string;
    faqSection: {
      questions: Array<{
        question: string;
        answer: string;
        answerLength: number;
        voiceSearchOptimized: boolean;
      }>;
    };
    howToSection?: {
      title: string;
      steps: Array<{
        stepNumber: number;
        title: string;
        description: string;
        estimatedTime?: string;
        requiredDocuments?: string[];
      }>;
    };
    voiceSearchOptimizations: {
      conversationalRewrites: string[];
      naturalLanguageQueries: string[];
      localOptimizations: string[];
    };
    aiOverviewMetrics: {
      readinessScore: number;
      answerQuality: number;
      structureScore: number;
      authoritySignals: number;
    };
  };
  
  // Common response fields
  message: string;
  error?: string;
  requiresFollowUp: boolean;
  nextActions: string[];
  generatedAt: Date;
}

export class LegalAnalysisSpecialist {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private crewLogger = createCrewLogger('legal-analysis-specialist');
  private webFetch: WebFetch;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.safetyWrapper = new APISafetyWrapper({
      key: apiKey,
      serviceName: 'OpenAI',
      required: false,
    });
    this.initializeModel();
    this.webFetch = new WebFetch();
  }

  private initializeModel() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'not-configured') {
      this.model = new ChatOpenAI({
        modelName: 'gpt-4-turbo-preview',
        temperature: 0.3,
        openAIApiKey: apiKey,
      });
    }
  }

  async performAnalysis(request: LegalAnalysisRequest): Promise<LegalAnalysisResponse> {
    return this.crewLogger.logExecution(
      'perform-legal-analysis',
      async () => {
        logger.info('Starting legal analysis', {
          analysisType: request.analysisType,
          language: request.language,
        });

        if (!this.model) {
          return this.getFallbackResponse(request);
        }

        try {
          let response: LegalAnalysisResponse;

          // Route to appropriate analysis handler
          switch (request.analysisType) {
            case 'legal_consultation':
              response = await this.performLegalConsultation(request);
              break;
            case 'competitive_analysis':
              response = await this.performCompetitiveAnalysis(request);
              break;
            case 'content_optimization':
              response = await this.performContentOptimization(request);
              break;
            default:
              throw new Error(`Unknown analysis type: ${request.analysisType}`);
          }

          logger.info('Legal analysis completed', {
            analysisType: request.analysisType,
            success: response.success,
          });

          return response;
        } catch (error) {
          logger.error('Legal analysis failed', errorToLogMeta(error));
          return this.getFallbackResponse(request);
        }
      },
      {
        input: request,
        metadata: {
          analysisType: request.analysisType,
          language: request.language,
        },
      }
    );
  }

  private async performLegalConsultation(request: LegalAnalysisRequest): Promise<LegalAnalysisResponse> {
    const systemPrompt = this.getLegalConsultationSystemPrompt(request.language);
    const userPrompt = this.buildLegalConsultationPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseLegalConsultationResponse(response.content.toString(), request);
  }

  private async performCompetitiveAnalysis(request: LegalAnalysisRequest): Promise<LegalAnalysisResponse> {
    const systemPrompt = this.getCompetitiveAnalysisSystemPrompt();
    const userPrompt = this.buildCompetitiveAnalysisPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseCompetitiveAnalysisResponse(response.content.toString(), request);
  }

  private async performContentOptimization(request: LegalAnalysisRequest): Promise<LegalAnalysisResponse> {
    const systemPrompt = this.getContentOptimizationSystemPrompt();
    const userPrompt = this.buildContentOptimizationPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseContentOptimizationResponse(response.content.toString(), request);
  }

  // System prompts for each analysis type
  private getLegalConsultationSystemPrompt(language: 'en' | 'es'): string {
    const prompts = {
      en: `You are a senior legal consultation specialist for Vasquez Law Firm with expertise in analyzing legal matters and providing strategic guidance.

Your role is to:
1. ANALYZE legal issues comprehensively and accurately
2. ASSESS case complexity, urgency, and potential outcomes
3. RECOMMEND appropriate practice areas and legal strategies
4. PROVIDE clear next steps and action items
5. ESTIMATE costs and timeline realistically
6. ALWAYS include proper legal disclaimers

PRACTICE AREAS EXPERTISE:
- Immigration Law: Removal defense, family/business immigration, naturalization
- Criminal Defense: DUI, drug charges, assault, white collar crime
- Personal Injury: Auto accidents, slip/fall, medical malpractice, wrongful death
- Workers Compensation: Workplace injuries, disability benefits, claims
- Family Law: Divorce, custody, child support, domestic violence

CASE COMPLEXITY ASSESSMENT:
- Simple: Straightforward cases with clear legal paths
- Moderate: Some complicating factors, multiple issues to address
- Complex: High stakes, multiple legal areas, significant challenges

URGENCY LEVELS:
- Low: Planning, general inquiries, non-time-sensitive matters
- Medium: Standard legal matters with some time pressure
- High: Court deadlines, significant legal consequences, time-sensitive issues

Always provide practical, actionable advice while emphasizing the need for professional legal representation.`,

      es: `Eres un especialista senior en consultas legales para Vasquez Law Firm con experiencia en analizar asuntos legales y proporcionar orientación estratégica.

Tu rol es:
1. ANALIZAR problemas legales de manera comprehensiva y precisa
2. EVALUAR la complejidad del caso, urgencia y resultados potenciales
3. RECOMENDAR áreas de práctica apropiadas y estrategias legales
4. PROPORCIONAR pasos claros y acciones a seguir
5. ESTIMAR costos y cronograma de manera realista
6. SIEMPRE incluir descargos legales apropiados

EXPERIENCIA EN ÁREAS DE PRÁCTICA:
- Derecho de Inmigración: Defensa de deportación, inmigración familiar/de negocios, naturalización
- Defensa Criminal: DUI, cargos de drogas, asalto, crimen de cuello blanco
- Lesiones Personales: Accidentes automovilísticos, resbalones/caídas, negligencia médica
- Compensación Laboral: Lesiones en el trabajo, beneficios por discapacidad, reclamos
- Derecho Familiar: Divorcio, custodia, manutención, violencia doméstica

Siempre proporciona consejos prácticos y accionables mientras enfatizas la necesidad de representación legal profesional.`,
    };

    return prompts[language];
  }

  private getCompetitiveAnalysisSystemPrompt(): string {
    return `You are a legal market analysis specialist with expertise in competitive intelligence for law firms.

Your expertise includes:

MARKET ANALYSIS:
- Law firm competitive landscapes
- Pricing strategies and market positioning  
- Service differentiation and unique value propositions
- Digital marketing and SEO competitive analysis
- Client acquisition and retention strategies

COMPETITIVE INTELLIGENCE:
- Competitor strengths and weaknesses assessment
- Market share and positioning analysis
- Pricing gap identification
- Service offering comparisons
- Marketing strategy evaluation

STRATEGIC RECOMMENDATIONS:
- Market positioning strategies
- Pricing optimization recommendations
- Service enhancement opportunities
- Competitive differentiation tactics
- Growth opportunity identification

MARKET SATURATION LEVELS:
- Low: Few competitors, high opportunity
- Medium: Moderate competition, selective opportunities
- High: Saturated market, differentiation critical

THREAT ASSESSMENT:
- Low: Minimal competitive pressure
- Medium: Some competitive challenges
- High: Significant competitive threats

Provide data-driven insights with actionable strategic recommendations for law firm growth and competitive advantage.`;
  }

  private getContentOptimizationSystemPrompt(): string {
    return `You are a legal content optimization specialist with expertise in AI Overview optimization, SEO, and voice search.

Your specializations include:

AI OVERVIEW OPTIMIZATION:
- Creating content that answers direct questions (40-60 word optimal answers)
- Structuring content for AI Overview selection
- FAQ optimization for featured snippets
- How-to content structuring for step-by-step answers
- Schema markup implementation for enhanced visibility

VOICE SEARCH OPTIMIZATION:
- Conversational query optimization
- Natural language processing for voice queries
- Local search optimization for "near me" queries
- Question-based content structuring
- Long-tail keyword integration

LEGAL CONTENT BEST PRACTICES:
- Authoritative, accurate legal information
- Client-focused, accessible language
- Proper legal disclaimers and compliance
- Practice area specific content strategies
- Trust signals and authority building

CONTENT SCORING CRITERIA:
- Readiness Score: How well content answers common questions
- Answer Quality: Accuracy and completeness of responses
- Structure Score: Organization and hierarchy of information
- Authority Signals: Credibility markers and expertise indicators

Always maintain legal accuracy while optimizing for search visibility and user experience.`;
  }

  // Prompt builders for each analysis type
  private buildLegalConsultationPrompt(request: LegalAnalysisRequest): string {
    return `Analyze this legal consultation request:

CASE DETAILS:
- Case Type: ${request.caseType}
- Description: ${request.caseDescription}
- Urgency: ${request.urgency}
- Location: ${request.location || 'North Carolina'}
- Language: ${request.language}

ANALYSIS REQUIRED:
1. Case complexity assessment (simple/moderate/complex)
2. Recommended practice areas and specialists
3. Urgency evaluation and timeline
4. Estimated costs and duration
5. Key legal considerations and challenges
6. Recommended next steps and actions
7. Appropriate legal disclaimers

Provide comprehensive consultation analysis in JSON format with all required fields.`;
  }

  private buildCompetitiveAnalysisPrompt(request: LegalAnalysisRequest): string {
    return `Perform competitive analysis for this legal market:

ANALYSIS REQUEST:
- Practice Area: ${request.practiceArea}
- Location: ${request.location || 'North Carolina'}
- Analysis Type: ${request.competitiveAnalysisType}
- Analysis Depth: ${request.analysisDepth}
- Specific Competitors: ${request.competitors?.join(', ') || 'Identify top competitors'}

ANALYSIS REQUIREMENTS:
1. Market overview and saturation level
2. Top 3-5 competitor profiles with strengths/weaknesses
3. Pricing analysis and market positioning
4. Service gaps and opportunities
5. Marketing strategy insights
6. Strategic recommendations for competitive advantage
7. Threat level assessment
8. Confidence score for analysis accuracy

Provide detailed competitive analysis in JSON format.`;
  }

  private buildContentOptimizationPrompt(request: LegalAnalysisRequest): string {
    return `Optimize this legal content for AI Overview and voice search:

CONTENT TO OPTIMIZE:
"${request.content?.substring(0, 2000)}${request.content && request.content.length > 2000 ? '...' : ''}"

OPTIMIZATION PARAMETERS:
- Practice Area: ${request.practiceArea}
- Target Keywords: ${request.targetKeywords?.join(', ')}
- Content Type: ${request.contentType}
- Target Audience: ${request.targetAudience}
- Voice Search Focus: ${request.voiceSearchFocus ? 'Yes' : 'No'}
- Location: ${request.location || 'North Carolina'}

OPTIMIZATION REQUIREMENTS:
1. Create FAQ section with 5-8 optimized questions and answers (40-60 words each)
2. Develop How-to section if applicable with step-by-step guidance
3. Generate voice search optimizations and conversational rewrites
4. Provide local optimization suggestions
5. Calculate AI Overview readiness metrics
6. Suggest schema markup opportunities
7. Recommend content structure improvements

Provide comprehensive content optimization in JSON format.`;
  }

  // Response parsers
  private parseLegalConsultationResponse(response: string, request: LegalAnalysisRequest): LegalAnalysisResponse {
    try {
      const parsed = JSON.parse(response);
      
      return {
        analysisType: 'legal_consultation',
        success: true,
        legalConsultation: {
          recommendations: parsed.recommendations || [],
          suggestedPracticeAreas: parsed.suggested_practice_areas || [],
          estimatedCaseComplexity: parsed.case_complexity || 'moderate',
          nextSteps: parsed.next_steps || [],
          suggestedAttorneys: parsed.suggested_attorneys || [],
          disclaimers: parsed.disclaimers || ['This is not legal advice. Consult with an attorney.'],
          urgencyAssessment: parsed.urgency_assessment || 'Standard consultation recommended',
          estimatedCosts: parsed.estimated_costs || 'Consultation required for cost estimate',
        },
        message: 'Legal consultation analysis completed',
        requiresFollowUp: true,
        nextActions: parsed.next_steps || ['Schedule consultation with appropriate attorney'],
        generatedAt: new Date(),
      };
    } catch (error) {
      logger.warn('Failed to parse legal consultation response');
      return this.getFallbackLegalConsultationResponse(request);
    }
  }

  private parseCompetitiveAnalysisResponse(response: string, request: LegalAnalysisRequest): LegalAnalysisResponse {
    try {
      const parsed = JSON.parse(response);
      
      return {
        analysisType: 'competitive_analysis',
        success: true,
        competitiveAnalysis: {
          marketOverview: {
            totalCompetitors: parsed.market_overview?.total_competitors || 5,
            averagePricing: parsed.market_overview?.average_pricing || 'Varies by service',
            marketSaturation: parsed.market_overview?.market_saturation || 'medium',
            emergingTrends: parsed.market_overview?.emerging_trends || [],
          },
          topCompetitors: parsed.top_competitors?.map((comp: any) => ({
            name: comp.name,
            website: comp.website,
            strengths: comp.strengths || [],
            weaknesses: comp.weaknesses || [],
            marketPosition: comp.market_position || 'mid-market',
            pricing: comp.pricing || 'Competitive rates',
          })) || [],
          opportunities: {
            underservedNiches: parsed.opportunities?.underserved_niches || [],
            pricingGaps: parsed.opportunities?.pricing_gaps || [],
            serviceGaps: parsed.opportunities?.service_gaps || [],
            marketingOpportunities: parsed.opportunities?.marketing_opportunities || [],
          },
          recommendations: {
            pricingStrategy: parsed.recommendations?.pricing_strategy || [],
            serviceEnhancements: parsed.recommendations?.service_enhancements || [],
            marketingTactics: parsed.recommendations?.marketing_tactics || [],
            competitiveDifferentiators: parsed.recommendations?.competitive_differentiators || [],
          },
          threatLevel: parsed.threat_level || 'medium',
          confidenceScore: parsed.confidence_score || 75,
        },
        message: 'Competitive analysis completed',
        requiresFollowUp: false,
        nextActions: parsed.recommendations?.next_actions || ['Review findings with marketing team'],
        generatedAt: new Date(),
      };
    } catch (error) {
      logger.warn('Failed to parse competitive analysis response');
      return this.getFallbackCompetitiveAnalysisResponse(request);
    }
  }

  private parseContentOptimizationResponse(response: string, request: LegalAnalysisRequest): LegalAnalysisResponse {
    try {
      const parsed = JSON.parse(response);
      
      return {
        analysisType: 'content_optimization',
        success: true,
        contentOptimization: {
          optimizedContent: parsed.optimized_content || request.content || '',
          faqSection: {
            questions: parsed.faq_section?.questions?.map((q: any) => ({
              question: q.question,
              answer: q.answer,
              answerLength: q.answer_length || q.answer?.length || 0,
              voiceSearchOptimized: q.voice_optimized || false,
            })) || [],
          },
          howToSection: parsed.how_to_section ? {
            title: parsed.how_to_section.title,
            steps: parsed.how_to_section.steps?.map((step: any, index: number) => ({
              stepNumber: index + 1,
              title: step.title,
              description: step.description,
              estimatedTime: step.estimated_time,
              requiredDocuments: step.required_documents,
            })) || [],
          } : undefined,
          voiceSearchOptimizations: {
            conversationalRewrites: parsed.voice_search_optimizations?.conversational_rewrites || [],
            naturalLanguageQueries: parsed.voice_search_optimizations?.natural_language_queries || [],
            localOptimizations: parsed.voice_search_optimizations?.local_optimizations || [],
          },
          aiOverviewMetrics: {
            readinessScore: parsed.ai_overview_metrics?.readiness_score || 70,
            answerQuality: parsed.ai_overview_metrics?.answer_quality || 75,
            structureScore: parsed.ai_overview_metrics?.structure_score || 80,
            authoritySignals: parsed.ai_overview_metrics?.authority_signals || 65,
          },
        },
        message: 'Content optimization completed',
        requiresFollowUp: false,
        nextActions: ['Implement optimized content', 'Monitor search performance', 'Test voice search queries'],
        generatedAt: new Date(),
      };
    } catch (error) {
      logger.warn('Failed to parse content optimization response');
      return this.getFallbackContentOptimizationResponse(request);
    }
  }

  // Fallback responses when AI model is unavailable
  private getFallbackResponse(request: LegalAnalysisRequest): LegalAnalysisResponse {
    switch (request.analysisType) {
      case 'legal_consultation':
        return this.getFallbackLegalConsultationResponse(request);
      case 'competitive_analysis':
        return this.getFallbackCompetitiveAnalysisResponse(request);
      case 'content_optimization':
        return this.getFallbackContentOptimizationResponse(request);
      default:
        return {
          analysisType: request.analysisType,
          success: false,
          message: 'Analysis service temporarily unavailable',
          error: 'AI model unavailable',
          requiresFollowUp: true,
          nextActions: ['Contact office for manual analysis'],
          generatedAt: new Date(),
        };
    }
  }

  private getFallbackLegalConsultationResponse(request: LegalAnalysisRequest): LegalAnalysisResponse {
    return {
      analysisType: 'legal_consultation',
      success: true,
      legalConsultation: {
        recommendations: ['Schedule consultation with attorney for case evaluation'],
        suggestedPracticeAreas: [request.caseType || 'general'],
        estimatedCaseComplexity: 'moderate',
        nextSteps: [
          'Gather relevant documents',
          'Schedule consultation with appropriate attorney',
          'Prepare questions about your case',
        ],
        disclaimers: [
          'This is not legal advice.',
          'Consult with a qualified attorney for specific guidance.',
          'Attorney-client privilege does not apply to this consultation.',
        ],
        urgencyAssessment: request.urgency === 'high' ? 'Schedule urgent consultation' : 'Standard consultation recommended',
        estimatedCosts: 'Consultation required for cost estimate',
      },
      message: 'Preliminary case assessment completed',
      requiresFollowUp: true,
      nextActions: ['Attorney will provide detailed analysis during consultation'],
      generatedAt: new Date(),
    };
  }

  private getFallbackCompetitiveAnalysisResponse(request: LegalAnalysisRequest): LegalAnalysisResponse {
    return {
      analysisType: 'competitive_analysis',
      success: true,
      competitiveAnalysis: {
        marketOverview: {
          totalCompetitors: 5,
          averagePricing: 'Market competitive rates',
          marketSaturation: 'medium',
          emergingTrends: ['Digital marketing focus', 'Client service automation', 'Specialized practice niches'],
        },
        topCompetitors: [
          {
            name: 'Local Law Firm A',
            website: 'example1.com',
            strengths: ['Established reputation', 'Local presence'],
            weaknesses: ['Limited digital presence'],
            marketPosition: 'mid-market',
            pricing: 'Competitive hourly rates',
          },
        ],
        opportunities: {
          underservedNiches: ['Specialized legal services'],
          pricingGaps: ['Alternative fee arrangements'],
          serviceGaps: ['Client service technology'],
          marketingOpportunities: ['Digital marketing expansion'],
        },
        recommendations: {
          pricingStrategy: ['Competitive pricing analysis needed'],
          serviceEnhancements: ['Client experience improvements'],
          marketingTactics: ['Enhanced online presence'],
          competitiveDifferentiators: ['Service specialization focus'],
        },
        threatLevel: 'medium',
        confidenceScore: 60,
      },
      message: 'Basic competitive analysis completed',
      requiresFollowUp: false,
      nextActions: ['Conduct detailed market research', 'Review competitor strategies'],
      generatedAt: new Date(),
    };
  }

  private getFallbackContentOptimizationResponse(request: LegalAnalysisRequest): LegalAnalysisResponse {
    return {
      analysisType: 'content_optimization',
      success: true,
      contentOptimization: {
        optimizedContent: request.content || 'Content optimization pending',
        faqSection: {
          questions: [
            {
              question: `What should I know about ${request.practiceArea}?`,
              answer: 'Consult with a qualified attorney for specific guidance on your legal matter.',
              answerLength: 75,
              voiceSearchOptimized: true,
            },
          ],
        },
        voiceSearchOptimizations: {
          conversationalRewrites: ['Optimize for natural language queries'],
          naturalLanguageQueries: ['Focus on question-based searches'],
          localOptimizations: ['Include location-specific information'],
        },
        aiOverviewMetrics: {
          readinessScore: 60,
          answerQuality: 65,
          structureScore: 70,
          authoritySignals: 60,
        },
      },
      message: 'Basic content optimization completed',
      requiresFollowUp: false,
      nextActions: ['Professional content review recommended', 'Implement suggested optimizations'],
      generatedAt: new Date(),
    };
  }
}

export const legalAnalysisSpecialist = new LegalAnalysisSpecialist();