import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';

export interface AIOverviewOptimizationRequest {
  content: string;
  practiceArea: string;
  targetKeywords: string[];
  contentType: 'article' | 'faq' | 'how_to' | 'legal_guide' | 'service_page';
  targetAudience: 'potential_clients' | 'current_clients' | 'general_public';
  location?: string;
  voiceSearchFocus: boolean;
  competitorAnalysis?: boolean;
}

export interface AIOverviewOptimization {
  optimizedContent: string;
  faqSection: {
    questions: Array<{
      question: string;
      answer: string;
      answerLength: number;
      voiceSearchOptimized: boolean;
    }>;
    schema: object;
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
    schema: object;
  };
  voiceSearchOptimizations: {
    conversationalRewrites: string[];
    naturalLanguageQueries: string[];
    localOptimizations: string[];
  };
  schemaMarkup: {
    faqSchema: object;
    howToSchema?: object;
    legalServiceSchema?: object;
    breadcrumbSchema?: object;
  };
  aiOverviewMetrics: {
    readinessScore: number;
    answerQuality: number;
    structureScore: number;
    authoritySignals: number;
  };
}

export interface ContentAnalysis {
  currentStructure: {
    headingHierarchy: string[];
    questionBasedHeadings: number;
    listStructures: number;
    answerPatterns: number;
  };
  aiOverviewOpportunities: {
    missingFAQs: string[];
    improvableAnswers: string[];
    schemaOpportunities: string[];
    voiceSearchGaps: string[];
  };
  competitiveInsights?: {
    competitorFAQs: string[];
    gapOpportunities: string[];
    differentiationStrategies: string[];
  };
}

export class AIOverviewOptimizationAgent {
  private model: ChatOpenAI;
  private crewLogger = createCrewLogger('ai-overview-optimization-agent');

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.3, // Lower temperature for more consistent, factual responses
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async optimizeForAIOverview(
    request: AIOverviewOptimizationRequest
  ): Promise<AIOverviewOptimization> {
    return this.crewLogger.logExecution(
      'optimize-for-ai-overview',
      async () => {
        logger.info('Starting AI Overview optimization', {
          practiceArea: request.practiceArea,
          contentType: request.contentType,
          voiceSearchFocus: request.voiceSearchFocus,
        });

        // Step 1: Analyze current content structure
        const contentAnalysis = await this.analyzeContentStructure(request);

        // Step 2: Generate FAQ section optimized for AI Overview
        const faqSection = await this.generateAIOverviewFAQs(request, contentAnalysis);

        // Step 3: Generate How-To section if applicable
        const howToSection = await this.generateHowToContent(request);

        // Step 4: Optimize content for voice search
        const voiceSearchOptimizations = await this.optimizeForVoiceSearch(request);

        // Step 5: Generate comprehensive schema markup
        const schemaMarkup = await this.generateSchemaMarkup(request, faqSection, howToSection);

        // Step 6: Rewrite content for AI Overview optimization
        const optimizedContent = await this.optimizeContentStructure(request, contentAnalysis);

        // Step 7: Calculate AI Overview readiness metrics
        const aiOverviewMetrics = await this.calculateAIOverviewMetrics(
          optimizedContent,
          faqSection,
          howToSection
        );

        return {
          optimizedContent,
          faqSection,
          howToSection,
          voiceSearchOptimizations,
          schemaMarkup,
          aiOverviewMetrics,
        };
      },
      {
        input: request,
        metadata: {
          practiceArea: request.practiceArea,
          contentType: request.contentType,
          targetKeywords: request.targetKeywords,
          voiceSearchFocus: request.voiceSearchFocus,
        },
      }
    );
  }

  private async analyzeContentStructure(
    request: AIOverviewOptimizationRequest
  ): Promise<ContentAnalysis> {
    const analysisPrompt = `Analyze this legal content for AI Overview optimization potential:

CONTENT TO ANALYZE:
${request.content}

PRACTICE AREA: ${request.practiceArea}
TARGET KEYWORDS: ${request.targetKeywords.join(', ')}

Analyze and identify:
1. Current heading structure and hierarchy
2. Number of question-based headings
3. List structures (numbered, bulleted)
4. Answer patterns for common questions
5. Missing FAQ opportunities
6. Areas that could benefit from How-To structure
7. Voice search optimization opportunities
8. Schema markup opportunities

Respond in JSON format:
{
  "currentStructure": {
    "headingHierarchy": ["H1 text", "H2 text"],
    "questionBasedHeadings": number,
    "listStructures": number,
    "answerPatterns": number
  },
  "aiOverviewOpportunities": {
    "missingFAQs": ["question1", "question2"],
    "improvableAnswers": ["area1", "area2"], 
    "schemaOpportunities": ["FAQ", "HowTo"],
    "voiceSearchGaps": ["opportunity1", "opportunity2"]
  }
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getAIOverviewSystemPrompt()),
        new HumanMessage(analysisPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to analyze content structure, using fallback');
      return this.getFallbackContentAnalysis(request);
    }
  }

  private async generateAIOverviewFAQs(
    request: AIOverviewOptimizationRequest,
    analysis: ContentAnalysis
  ): Promise<{
    questions: Array<{
      question: string;
      answer: string;
      answerLength: number;
      voiceSearchOptimized: boolean;
    }>;
    schema: object;
  }> {
    const faqPrompt = `Generate AI Overview optimized FAQ content for ${request.practiceArea}:

TARGET KEYWORDS: ${request.targetKeywords.join(', ')}
LOCATION: ${request.location || 'General'}
VOICE SEARCH FOCUS: ${request.voiceSearchFocus ? 'Yes' : 'No'}

MISSING FAQs IDENTIFIED: ${analysis.aiOverviewOpportunities.missingFAQs.join(', ')}

Generate 8-12 frequently asked questions with answers optimized for:
1. AI Overview selection (40-60 word answers)
2. Voice search queries (natural language)
3. Featured snippets (clear, direct answers)
4. Local search relevance (if location provided)

ANSWER REQUIREMENTS:
- Start with direct answer in first sentence
- Include specific details (forms, timelines, costs)
- Use conversational language for voice search
- Maintain legal accuracy and authority
- Include relevant legal disclaimers

Format as JSON:
{
  "questions": [
    {
      "question": "Natural language question",
      "answer": "Direct, authoritative answer with specific details",
      "answerLength": number,
      "voiceSearchOptimized": boolean
    }
  ]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getAIOverviewSystemPrompt()),
        new HumanMessage(faqPrompt),
      ]);

      const faqData = JSON.parse(response.content.toString());
      const schema = this.generateFAQSchema(faqData.questions);

      return {
        questions: faqData.questions,
        schema,
      };
    } catch (error) {
      logger.warn('Failed to generate FAQ content, using fallback');
      return this.getFallbackFAQContent(request);
    }
  }

  private async generateHowToContent(request: AIOverviewOptimizationRequest): Promise<
    | {
        title: string;
        steps: Array<{
          stepNumber: number;
          title: string;
          description: string;
          estimatedTime?: string;
          requiredDocuments?: string[];
        }>;
        schema: object;
      }
    | undefined
  > {
    // Only generate How-To content for procedural topics
    const proceduralKeywords = ['file', 'apply', 'process', 'steps', 'how to', 'procedure'];
    const hasProceduralIntent = request.targetKeywords.some(keyword =>
      proceduralKeywords.some(proc => keyword.toLowerCase().includes(proc))
    );

    if (!hasProceduralIntent && request.contentType !== 'how_to') {
      return undefined;
    }

    const howToPrompt = `Create a step-by-step How-To guide for ${request.practiceArea}:

TARGET KEYWORDS: ${request.targetKeywords.join(', ')}
PRACTICE AREA: ${request.practiceArea}
LOCATION: ${request.location || 'General'}

Generate a comprehensive How-To guide with:
1. Clear, actionable title
2. 5-10 logical steps
3. Estimated timeframes for each step
4. Required documents for each step
5. Specific forms and procedures
6. Common pitfalls to avoid

REQUIREMENTS:
- Each step must be actionable
- Include specific legal forms where applicable
- Provide realistic timeframes
- Include cost information where relevant
- Add important warnings or notes

Format as JSON:
{
  "title": "How to [Process] in [Location]",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step Title",
      "description": "Detailed description with specific actions",
      "estimatedTime": "X days/weeks",
      "requiredDocuments": ["Document 1", "Document 2"]
    }
  ]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getAIOverviewSystemPrompt()),
        new HumanMessage(howToPrompt),
      ]);

      const howToData = JSON.parse(response.content.toString());
      const schema = this.generateHowToSchema(howToData);

      return {
        title: howToData.title,
        steps: howToData.steps,
        schema,
      };
    } catch (error) {
      logger.warn('Failed to generate How-To content');
      return undefined;
    }
  }

  private async optimizeForVoiceSearch(request: AIOverviewOptimizationRequest): Promise<{
    conversationalRewrites: string[];
    naturalLanguageQueries: string[];
    localOptimizations: string[];
  }> {
    const voiceSearchPrompt = `Optimize content for voice search queries related to ${request.practiceArea}:

TARGET KEYWORDS: ${request.targetKeywords.join(', ')}
LOCATION: ${request.location || 'General'}

Generate voice search optimizations:

1. CONVERSATIONAL REWRITES:
Transform formal legal language into natural conversational patterns while maintaining accuracy:
- Use "you" instead of "one" or "the individual"
- Use active voice instead of passive
- Break complex sentences into conversational chunks
- Add natural transition phrases

2. NATURAL LANGUAGE QUERIES:
Generate 10-15 questions people actually ask verbally:
- Complete sentence questions
- Local variations (if location provided)
- Various question starters (What, How, When, Where, Why, Can I, Should I)

3. LOCAL OPTIMIZATIONS:
If location provided, generate local-specific content:
- "near me" variations
- Local court references
- State-specific requirements
- Local office mentions

Format as JSON:
{
  "conversationalRewrites": ["rewrite1", "rewrite2"],
  "naturalLanguageQueries": ["question1", "question2"],
  "localOptimizations": ["optimization1", "optimization2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getVoiceSearchSystemPrompt()),
        new HumanMessage(voiceSearchPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to generate voice search optimizations, using fallback');
      return this.getFallbackVoiceSearchOptimizations(request);
    }
  }

  private async generateSchemaMarkup(
    request: AIOverviewOptimizationRequest,
    faqSection: {
      questions: Array<{
        question: string;
        answer: string;
        answerLength: number;
        voiceSearchOptimized: boolean;
      }>;
      schema: object;
    },
    howToSection?: {
      title: string;
      steps: Array<{
        stepNumber: number;
        title: string;
        description: string;
        estimatedTime?: string;
        requiredDocuments?: string[];
      }>;
      schema: object;
    }
  ): Promise<{
    faqSchema: object;
    howToSchema?: object;
    legalServiceSchema?: object;
    breadcrumbSchema?: object;
  }> {
    const schemaMarkup = {
      faqSchema: faqSection.schema,
      howToSchema: howToSection?.schema,
      legalServiceSchema: this.generateLegalServiceSchema(request),
      breadcrumbSchema: this.generateBreadcrumbSchema(request),
    };

    return schemaMarkup;
  }

  private async optimizeContentStructure(
    request: AIOverviewOptimizationRequest,
    analysis: ContentAnalysis
  ): Promise<string> {
    const optimizationPrompt = `Rewrite this legal content for optimal AI Overview performance:

ORIGINAL CONTENT:
${request.content}

PRACTICE AREA: ${request.practiceArea}
TARGET KEYWORDS: ${request.targetKeywords.join(', ')}
ANALYSIS INSIGHTS: ${JSON.stringify(analysis.aiOverviewOpportunities)}

OPTIMIZATION REQUIREMENTS:
1. Start with clear, concise introduction (AI Overview snippet ready)
2. Use question-based H2 headings where appropriate
3. Provide direct answers to common questions
4. Use numbered lists for procedures
5. Use bullet points for requirements/benefits
6. Optimize for voice search with conversational language
7. Include specific legal citations and forms
8. Maintain legal accuracy and authority

STRUCTURE GUIDELINES:
- H1: Primary topic with main keyword
- H2: Question-based headings ("What is...", "How do...", "When should...")
- H3: Specific subtopics
- Lists: Use for procedures, requirements, documents
- Paragraphs: Keep to 2-3 sentences max for readability

VOICE SEARCH OPTIMIZATION:
- Use natural language patterns
- Include complete question/answer pairs
- Add location-specific information if provided
- Use "you" and direct address

Rewrite the content maintaining all important legal information while optimizing for AI Overview selection.`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getContentOptimizationSystemPrompt()),
        new HumanMessage(optimizationPrompt),
      ]);

      return response.content.toString();
    } catch (error) {
      logger.warn('Failed to optimize content structure, returning original');
      return request.content;
    }
  }

  private async calculateAIOverviewMetrics(
    optimizedContent: string,
    faqSection: any,
    howToSection?: any
  ): Promise<{
    readinessScore: number;
    answerQuality: number;
    structureScore: number;
    authoritySignals: number;
  }> {
    let readinessScore = 0;
    let answerQuality = 0;
    let structureScore = 0;
    let authoritySignals = 0;

    // Readiness Score (0-100)
    if (faqSection.questions.length >= 5) readinessScore += 25;
    if (howToSection) readinessScore += 25;
    if (this.hasQuestionBasedHeadings(optimizedContent)) readinessScore += 25;
    if (this.hasListStructures(optimizedContent)) readinessScore += 25;

    // Answer Quality Score (0-100)
    const avgAnswerLength =
      faqSection.questions.reduce((acc: number, q: any) => acc + q.answerLength, 0) /
      faqSection.questions.length;
    if (avgAnswerLength >= 40 && avgAnswerLength <= 60) answerQuality += 30;
    if (faqSection.questions.every((q: any) => q.voiceSearchOptimized)) answerQuality += 30;
    if (this.hasDirectAnswers(optimizedContent)) answerQuality += 40;

    // Structure Score (0-100)
    if (this.hasProperHeadingHierarchy(optimizedContent)) structureScore += 25;
    if (this.hasListStructures(optimizedContent)) structureScore += 25;
    if (this.hasConversationalLanguage(optimizedContent)) structureScore += 25;
    if (this.hasLogicalFlow(optimizedContent)) structureScore += 25;

    // Authority Signals (0-100)
    if (this.hasLegalCitations(optimizedContent)) authoritySignals += 25;
    if (this.hasSpecificForms(optimizedContent)) authoritySignals += 25;
    if (this.hasExpertLanguage(optimizedContent)) authoritySignals += 25;
    if (this.hasDisclaimers(optimizedContent)) authoritySignals += 25;

    return {
      readinessScore: Math.min(100, readinessScore),
      answerQuality: Math.min(100, answerQuality),
      structureScore: Math.min(100, structureScore),
      authoritySignals: Math.min(100, authoritySignals),
    };
  }

  // Helper methods for content analysis
  private hasQuestionBasedHeadings(content: string): boolean {
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'can', 'should', 'will', 'do'];
    const headings = content.match(/^#{1,3}\s+(.+)$/gm) || [];
    return headings.some(heading =>
      questionWords.some(word => heading.toLowerCase().includes(word))
    );
  }

  private hasListStructures(content: string): boolean {
    const numberedLists = content.match(/^\d+\.\s/gm) || [];
    const bulletLists = content.match(/^[-*+]\s/gm) || [];
    return numberedLists.length >= 3 || bulletLists.length >= 3;
  }

  private hasDirectAnswers(content: string): boolean {
    const answerPatterns = [
      /^(Yes|No),/m,
      /^The answer is/m,
      /^You (can|should|will|need to)/m,
      /^To .+, you/m,
    ];
    return answerPatterns.some(pattern => pattern.test(content));
  }

  private hasProperHeadingHierarchy(content: string): boolean {
    const headings = content.match(/^(#{1,6})\s/gm) || [];
    return headings.length >= 3;
  }

  private hasConversationalLanguage(content: string): boolean {
    const conversationalPatterns = [/\byou\b/gi, /\byour\b/gi, /let's/gi, /here's/gi, /what's/gi];
    return conversationalPatterns.some(pattern => pattern.test(content));
  }

  private hasLogicalFlow(content: string): boolean {
    const transitionWords = [
      'first',
      'next',
      'then',
      'finally',
      'however',
      'therefore',
      'additionally',
    ];
    return transitionWords.some(word => content.toLowerCase().includes(word));
  }

  private hasLegalCitations(content: string): boolean {
    const citationPatterns = [
      /\b\d+\s+U\.?S\.?C\.?\s+§?\s*\d+/g,
      /\bCFR\b/g,
      /Form\s+[A-Z]-?\d+/g,
      /\d+\s+F\.\d+d?\s+\d+/g,
    ];
    return citationPatterns.some(pattern => pattern.test(content));
  }

  private hasSpecificForms(content: string): boolean {
    const formPatterns = [/Form\s+[A-Z]-?\d+/g, /I-\d+/g, /N-\d+/g, /AR-\d+/g];
    return formPatterns.some(pattern => pattern.test(content));
  }

  private hasExpertLanguage(content: string): boolean {
    const expertTerms = ['pursuant to', 'in accordance with', 'subject to', 'as provided by'];
    return expertTerms.some(term => content.toLowerCase().includes(term));
  }

  private hasDisclaimers(content: string): boolean {
    const disclaimerPatterns = [
      /attorney-client/gi,
      /legal advice/gi,
      /consult.*attorney/gi,
      /this information.*not.*legal advice/gi,
    ];
    return disclaimerPatterns.some(pattern => pattern.test(content));
  }

  // Schema generation methods
  private generateFAQSchema(questions: Array<{ question: string; answer: string }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    };
  }

  private generateHowToSchema(howToData: { title: string; steps: any[] }): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howToData.title,
      step: howToData.steps.map(step => ({
        '@type': 'HowToStep',
        name: step.title,
        text: step.description,
        ...(step.estimatedTime && {
          estimatedCost: { '@type': 'MonetaryAmount', value: step.estimatedTime },
        }),
      })),
    };
  }

  private generateLegalServiceSchema(request: AIOverviewOptimizationRequest): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: `${request.practiceArea} Legal Services`,
      description: `Professional ${request.practiceArea.toLowerCase()} legal services`,
      serviceType: request.practiceArea,
      areaServed: request.location ? [request.location] : ['North Carolina'],
      provider: {
        '@type': 'Organization',
        name: 'Vasquez Law Firm',
        url: 'https://vasquezlawfirm.com',
      },
    };
  }

  private generateBreadcrumbSchema(request: AIOverviewOptimizationRequest): object {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Practice Areas', url: '/practice-areas' },
      {
        name: request.practiceArea,
        url: `/${request.practiceArea.toLowerCase().replace(/\s+/g, '-')}`,
      },
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
  }

  // System prompts for different optimization tasks
  private getAIOverviewSystemPrompt(): string {
    return `You are an expert legal content strategist specializing in Google AI Overview optimization. Your role is to:

1. Analyze legal content for AI Overview readiness
2. Identify opportunities for featured snippet optimization
3. Generate FAQ content optimized for AI Overview selection
4. Structure content for maximum AI visibility
5. Ensure all recommendations maintain legal accuracy and authority

Key principles:
- Prioritize direct, authoritative answers
- Use conversational language while maintaining professionalism
- Structure content for easy AI parsing and citation
- Include specific legal references and procedures
- Optimize for voice search and natural language queries

Always maintain legal accuracy and include appropriate disclaimers.`;
  }

  private getVoiceSearchSystemPrompt(): string {
    return `You are a voice search optimization expert for legal content. Your role is to:

1. Transform formal legal language into natural, conversational patterns
2. Generate questions people actually ask verbally about legal topics
3. Optimize content for voice assistant responses
4. Maintain legal accuracy while improving accessibility
5. Create location-specific optimizations for local search

Focus on:
- Natural speech patterns and rhythm
- Complete sentence answers suitable for voice playback
- Local search optimization with "near me" variations
- Conversational keywords and phrases
- Question-answer formats that work well for voice assistants`;
  }

  private getContentOptimizationSystemPrompt(): string {
    return `You are a legal content optimization specialist focused on AI Overview performance. Your expertise includes:

1. Restructuring legal content for maximum AI Overview selection
2. Creating question-based headings that match search intent
3. Writing direct answers optimized for AI citation
4. Balancing SEO optimization with legal accuracy
5. Structuring content for voice search and featured snippets

Guidelines:
- Start with the most direct answer to the main question
- Use clear, logical heading hierarchy
- Include specific legal procedures, forms, and timelines
- Maintain authoritative legal tone while being accessible
- Optimize for both human readers and AI parsing
- Include relevant legal disclaimers and limitations`;
  }

  // Fallback methods for error handling
  private getFallbackContentAnalysis(request: AIOverviewOptimizationRequest): ContentAnalysis {
    return {
      currentStructure: {
        headingHierarchy: ['Main Topic'],
        questionBasedHeadings: 0,
        listStructures: 0,
        answerPatterns: 0,
      },
      aiOverviewOpportunities: {
        missingFAQs: [
          `What is ${request.practiceArea.toLowerCase()}?`,
          `How much does ${request.practiceArea.toLowerCase()} cost?`,
          `How long does ${request.practiceArea.toLowerCase()} take?`,
        ],
        improvableAnswers: ['Process explanation', 'Requirements section'],
        schemaOpportunities: ['FAQ', 'LegalService'],
        voiceSearchGaps: ['Conversational language', 'Question-based headings'],
      },
    };
  }

  private getFallbackFAQContent(request: AIOverviewOptimizationRequest): {
    questions: Array<{
      question: string;
      answer: string;
      answerLength: number;
      voiceSearchOptimized: boolean;
    }>;
    schema: object;
  } {
    const questions = [
      {
        question: `What is ${request.practiceArea.toLowerCase()}?`,
        answer: `${request.practiceArea} involves legal procedures and requirements that must be followed according to current law. Consult with an attorney for specific advice about your situation.`,
        answerLength: 50,
        voiceSearchOptimized: true,
      },
      {
        question: `How much does ${request.practiceArea.toLowerCase()} cost?`,
        answer: `The cost of ${request.practiceArea.toLowerCase()} varies depending on case complexity, government fees, and attorney fees. Contact our office for a consultation and fee estimate.`,
        answerLength: 45,
        voiceSearchOptimized: true,
      },
    ];

    return {
      questions,
      schema: this.generateFAQSchema(questions),
    };
  }

  private getFallbackVoiceSearchOptimizations(request: AIOverviewOptimizationRequest): {
    conversationalRewrites: string[];
    naturalLanguageQueries: string[];
    localOptimizations: string[];
  } {
    return {
      conversationalRewrites: [
        'Use "you" instead of "one" when giving advice',
        'Break down complex legal concepts into simple terms',
        'Add conversational transitions between sections',
      ],
      naturalLanguageQueries: [
        `What do I need to know about ${request.practiceArea.toLowerCase()}?`,
        `How can I get help with ${request.practiceArea.toLowerCase()}?`,
        `What should I do if I need ${request.practiceArea.toLowerCase()} help?`,
      ],
      localOptimizations: request.location
        ? [
            `${request.practiceArea} lawyer near me in ${request.location}`,
            `${request.practiceArea} attorney ${request.location}`,
            `Best ${request.practiceArea.toLowerCase()} help in ${request.location}`,
          ]
        : [],
    };
  }
}

// Export singleton instance
export const aiOverviewAgent = new AIOverviewOptimizationAgent();
