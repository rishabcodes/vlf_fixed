/**
 * Immigration Specialist Agent (Nationwide)
 * Expert in all aspects of U.S. immigration law with AI Overview optimization
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { AIOverviewOptimizationAgent } from './ai-overview-optimization-agent';

// Response type interfaces
interface EligibilityAnalysis {
  primaryOption: {
    pathName: string;
    eligibility: 'eligible' | 'potentially_eligible' | 'not_eligible';
    requirements: string[];
    timeline: string;
    cost: string;
  };
  alternativeOptions: Array<{
    pathName: string;
    eligibility: string;
    notes: string;
  }>;
  bars?: string[];
  waivers?: string[];
  urgentActions?: string[];
  // Properties from parsed JSON responses
  primary_pathway?: string;
  likelihood?: 'high' | 'moderate' | 'low' | 'needs_evaluation';
  requirements?: string[];
  timeframe?: string;
  government_fees?: string;
  potential_challenges?: string[];
  alternative_pathways?: string[];
}

interface LegalAnalysis {
  applicableLaws: string[];
  recentChanges: string[];
  keyForms: string[];
  evidenceRequired: string[];
  potentialIssues: string[];
  remedies: string[];
  processingOffice: string;
  estimatedTimeline: string;
  // Properties from parsed JSON responses
  applicable_laws?: string[];
  recent_changes?: string[];
  precedent_cases?: string[];
  success_factors?: string[];
  risk_factors?: string[];
  strategies?: string[];
}

interface ImmigrationRecommendations {
  immediateActions: string[];
  documentationNeeded: string[];
  timeline: Array<{
    phase: string;
    duration: string;
    actions: string[];
  }>;
  costBreakdown: Array<{
    item: string;
    cost: string;
  }>;
  riskFactors: string[];
  successProbability: 'high' | 'moderate' | 'low';
  // Properties from parsed JSON responses
  immediate_actions?: string[];
  required_documents?: string[];
  interview_prep?: string[];
  challenge_mitigation?: string[];
  attorney_consultation?: string;
}

export interface ImmigrationConsultationRequest {
  clientType: 'individual' | 'family' | 'business' | 'employer';
  immigrationGoal:
    | 'green_card'
    | 'citizenship'
    | 'visa'
    | 'work_authorization'
    | 'family_reunification'
    | 'asylum'
    | 'business_investment';
  currentStatus:
    | 'visitor'
    | 'student'
    | 'worker'
    | 'refugee'
    | 'asylee'
    | 'green_card_holder'
    | 'undocumented'
    | 'other';
  countryOfOrigin: string;
  timeInUS?: string;
  familyTies?: 'spouse' | 'parent' | 'child' | 'sibling' | 'none';
  employmentBased?: boolean;
  urgency: 'immediate' | 'within_months' | 'within_year' | 'planning';
  priorDenials?: boolean;
  criminalHistory?: boolean;
  previousAttorney?: boolean;
  specificQuestions?: string[];
  preferredLanguage: 'en' | 'es';
}

export interface ImmigrationAssessment {
  caseComplexity: 'simple' | 'moderate' | 'complex' | 'extremely_complex';
  eligibility: {
    pathway: string;
    likelihood: 'high' | 'moderate' | 'low' | 'needs_evaluation';
    requirements: string[];
    timeframe: string;
    costs: {
      government_fees: string;
      attorney_fees: string;
      total_estimated: string;
    };
  };
  recommendations: {
    immediate_actions: string[];
    required_documents: string[];
    potential_challenges: string[];
    alternative_pathways?: string[];
  };
  legal_analysis: {
    applicable_laws: string[];
    precedent_cases?: string[];
    success_factors: string[];
    risk_factors: string[];
  };
  consultation_summary: string;
  next_steps: string[];
  ai_overview_content?: {
    faq_answers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    content_optimization: string;
  };
}

export class ImmigrationSpecialistAgent {
  private model: ChatOpenAI;
  private crewLogger = createCrewLogger('immigration-specialist-agent');
  private aiOverviewAgent: AIOverviewOptimizationAgent;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2, // Lower temperature for consistent legal advice
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.aiOverviewAgent = new AIOverviewOptimizationAgent();
  }

  async assessCase(request: ImmigrationConsultationRequest): Promise<ImmigrationAssessment> {
    return this.crewLogger.logExecution(
      'assess-immigration-case',
      async () => {
        logger.info('Starting immigration case assessment', {
          clientType: request.clientType,
          immigrationGoal: request.immigrationGoal,
          currentStatus: request.currentStatus,
        });

        // Step 1: Analyze eligibility and pathways
        const eligibilityAnalysis = await this.analyzeEligibility(request);

        // Step 2: Generate comprehensive legal analysis
        const legalAnalysis = await this.performLegalAnalysis(request, eligibilityAnalysis);

        // Step 3: Create recommendations and action plan
        const recommendations = await this.generateRecommendations(
          request,
          eligibilityAnalysis,
          legalAnalysis
        );

        // Step 4: Generate AI Overview optimized content
        const aiOverviewContent = await this.generateAIOverviewContent(
          request,
          eligibilityAnalysis
        );

        // Step 5: Compile assessment
        const assessment = this.compileAssessment(
          request,
          eligibilityAnalysis,
          legalAnalysis,
          recommendations,
          aiOverviewContent
        );

        logger.info('Immigration case assessment completed', {
          caseComplexity: assessment.caseComplexity,
          likelihood: assessment.eligibility.likelihood,
          pathway: assessment.eligibility.pathway,
        });

        return assessment;
      },
      {
        input: request,
        metadata: {
          clientType: request.clientType,
          immigrationGoal: request.immigrationGoal,
          urgency: request.urgency,
        },
      }
    );
  }

  private async analyzeEligibility(
    request: ImmigrationConsultationRequest
  ): Promise<EligibilityAnalysis> {
    const eligibilityPrompt = `Analyze immigration eligibility for this case:

CLIENT PROFILE:
- Client Type: ${request.clientType}
- Immigration Goal: ${request.immigrationGoal}
- Current Status: ${request.currentStatus}
- Country of Origin: ${request.countryOfOrigin}
- Time in US: ${request.timeInUS || 'Not specified'}
- Family Ties: ${request.familyTies || 'None specified'}
- Employment Based: ${request.employmentBased ? 'Yes' : 'No'}
- Prior Denials: ${request.priorDenials ? 'Yes' : 'No'}
- Criminal History: ${request.criminalHistory ? 'Yes' : 'No'}

ANALYSIS REQUIRED:
1. Primary immigration pathway eligibility
2. Alternative pathways if applicable
3. Likelihood of success (high/moderate/low)
4. Required documentation and evidence
5. Processing timeframes
6. Government fees and costs
7. Potential challenges or complications

RESPONSE FORMAT (JSON):
{
  "primary_pathway": "specific immigration category",
  "likelihood": "high|moderate|low|needs_evaluation",
  "requirements": ["requirement1", "requirement2"],
  "timeframe": "estimated processing time",
  "government_fees": "$amount range",
  "potential_challenges": ["challenge1", "challenge2"],
  "alternative_pathways": ["pathway1", "pathway2"]
}

Provide accurate, current information based on USCIS regulations and procedures.`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getImmigrationSystemPrompt()),
        new HumanMessage(eligibilityPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse eligibility analysis, using fallback');
      return this.getFallbackEligibility(request);
    }
  }

  private async performLegalAnalysis(
    request: ImmigrationConsultationRequest,
    eligibility: EligibilityAnalysis
  ): Promise<LegalAnalysis> {
    const legalPrompt = `Perform comprehensive legal analysis for this immigration case:

CASE DETAILS:
- Immigration Goal: ${request.immigrationGoal}
- Primary Pathway: ${eligibility.primaryOption.pathName}
- Current Status: ${request.currentStatus}
- Likelihood: ${eligibility.primaryOption.eligibility}

LEGAL ANALYSIS REQUIRED:
1. Applicable federal immigration statutes and regulations
2. Recent policy changes affecting this case type
3. Circuit court precedents if relevant
4. USCIS policy memoranda and guidance
5. Success factors that strengthen the case
6. Risk factors that could lead to denial
7. Strategies to overcome potential challenges

Focus on:
- INA sections and CFR regulations
- Current USCIS processing priorities
- Recent administrative changes
- Documentation requirements
- Interview preparation if applicable

RESPONSE FORMAT (JSON):
{
  "applicable_laws": ["INA Section X", "8 CFR Y"],
  "recent_changes": ["policy change 1", "policy change 2"],
  "precedent_cases": ["case name if relevant"],
  "success_factors": ["factor1", "factor2"],
  "risk_factors": ["risk1", "risk2"],
  "strategies": ["strategy1", "strategy2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getImmigrationSystemPrompt()),
        new HumanMessage(legalPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse legal analysis, using fallback');
      return this.getFallbackLegalAnalysis(request);
    }
  }

  private async generateRecommendations(
    request: ImmigrationConsultationRequest,
    eligibility: EligibilityAnalysis,
    _legalAnalysis: LegalAnalysis
  ): Promise<ImmigrationRecommendations> {
    const recommendationsPrompt = `Generate actionable recommendations for this immigration case:

CASE SUMMARY:
- Goal: ${request.immigrationGoal}
- Pathway: ${eligibility.primaryOption.pathName}
- Urgency: ${request.urgency}
- Challenges: ${eligibility.bars?.join(', ') || 'None identified'}

GENERATE RECOMMENDATIONS FOR:
1. Immediate actions client should take
2. Complete document checklist
3. Timeline with key milestones
4. Preparation strategies for interviews/applications
5. How to address potential challenges
6. When to seek legal representation

CONSIDERATIONS:
- Client's urgency level: ${request.urgency}
- Previous denials: ${request.priorDenials ? 'Yes' : 'No'}
- Complexity factors: ${eligibility.bars?.join(', ') || 'Standard case'}

RESPONSE FORMAT (JSON):
{
  "immediate_actions": ["action1", "action2"],
  "required_documents": ["document1", "document2"],
  "timeline": {
    "phase1": "timeframe - action",
    "phase2": "timeframe - action"
  },
  "interview_prep": ["tip1", "tip2"],
  "challenge_mitigation": ["strategy1", "strategy2"],
  "attorney_consultation": "recommended|optional|essential"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getImmigrationSystemPrompt()),
        new HumanMessage(recommendationsPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse recommendations, using fallback');
      return this.getFallbackRecommendations(request);
    }
  }

  private async generateAIOverviewContent(
    request: ImmigrationConsultationRequest,
    eligibility: EligibilityAnalysis
  ): Promise<{
    faq_answers: Array<{
      question: string;
      answer: string;
      word_count: number;
      voice_optimized: boolean;
    }>;
    content_optimization: string;
  }> {
    const contentPrompt = `Generate AI Overview optimized content for this immigration case:

CASE TYPE: ${request.immigrationGoal}
PATHWAY: ${eligibility.primary_pathway || eligibility.primaryOption.pathName}

Generate 5-8 FAQ answers optimized for AI Overview (40-60 words each):

1. "How long does [process] take?"
2. "What documents do I need for [process]?"
3. "How much does [process] cost?"
4. "What are the requirements for [process]?"
5. "Can I work while [process] is pending?"
6. Additional relevant questions for this case type

Each answer should:
- Start with direct answer
- Include specific details (forms, timelines, costs)
- Use conversational language for voice search
- Be exactly 40-60 words
- Include legal disclaimers where appropriate

RESPONSE FORMAT (JSON):
{
  "faq_answers": [
    {
      "question": "question text",
      "answer": "40-60 word answer",
      "word_count": number,
      "voice_optimized": true
    }
  ],
  "content_optimization": "Additional content suggestions for AI Overview"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getImmigrationSystemPrompt()),
        new HumanMessage(contentPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to generate AI Overview content');
      return {
        faq_answers: [],
        content_optimization: 'Standard immigration content recommendations',
      };
    }
  }

  private compileAssessment(
    request: ImmigrationConsultationRequest,
    eligibility: EligibilityAnalysis,
    legalAnalysis: LegalAnalysis,
    recommendations: ImmigrationRecommendations,
    aiOverviewContent: {
      faq_answers: Array<{
        question: string;
        answer: string;
        word_count: number;
        voice_optimized: boolean;
      }>;
      content_optimization: string;
    }
  ): ImmigrationAssessment {
    // Determine case complexity
    const complexityFactors = [
      request.priorDenials,
      request.criminalHistory,
      (eligibility.potential_challenges || eligibility.bars || []).length > 2,
      request.currentStatus === 'undocumented',
      (legalAnalysis.risk_factors || legalAnalysis.potentialIssues || []).length > 2,
    ].filter(Boolean).length;

    let caseComplexity: 'simple' | 'moderate' | 'complex' | 'extremely_complex';
    if (complexityFactors === 0) caseComplexity = 'simple';
    else if (complexityFactors <= 1) caseComplexity = 'moderate';
    else if (complexityFactors <= 3) caseComplexity = 'complex';
    else caseComplexity = 'extremely_complex';

    // Estimate attorney fees based on complexity
    const attorneyFees = this.estimateAttorneyFees(request.immigrationGoal, caseComplexity);

    return {
      caseComplexity,
      eligibility: {
        pathway: eligibility.primary_pathway || eligibility.primaryOption.pathName,
        likelihood:
          eligibility.likelihood ||
          this.mapEligibilityToLikelihood(eligibility.primaryOption.eligibility),
        requirements: eligibility.requirements || eligibility.primaryOption.requirements || [],
        timeframe: eligibility.timeframe || eligibility.primaryOption.timeline,
        costs: {
          government_fees: eligibility.government_fees || eligibility.primaryOption.cost,
          attorney_fees: attorneyFees,
          total_estimated: this.calculateTotalCosts(
            eligibility.government_fees || eligibility.primaryOption.cost,
            attorneyFees
          ),
        },
      },
      recommendations: {
        immediate_actions:
          recommendations.immediate_actions || recommendations.immediateActions || [],
        required_documents:
          recommendations.required_documents || recommendations.documentationNeeded || [],
        potential_challenges: eligibility.potential_challenges || eligibility.bars || [],
        alternative_pathways:
          eligibility.alternative_pathways ||
          eligibility.alternativeOptions?.map(opt => opt.pathName),
      },
      legal_analysis: {
        applicable_laws: legalAnalysis.applicable_laws || legalAnalysis.applicableLaws || [],
        precedent_cases: legalAnalysis.precedent_cases,
        success_factors: legalAnalysis.success_factors || [],
        risk_factors: legalAnalysis.risk_factors || legalAnalysis.potentialIssues || [],
      },
      consultation_summary: this.generateConsultationSummary(request, eligibility, caseComplexity),
      next_steps: this.generateNextSteps(request, recommendations, caseComplexity),
      ai_overview_content: {
        faq_answers: aiOverviewContent.faq_answers.map(faq => ({
          question: faq.question,
          answer: faq.answer,
          voiceOptimized: faq.voice_optimized,
        })),
        content_optimization: aiOverviewContent.content_optimization,
      },
    };
  }

  private getImmigrationSystemPrompt(): string {
    return `You are an expert immigration attorney with comprehensive knowledge of U.S. immigration law. Your expertise includes:

IMMIGRATION LAW EXPERTISE:
- Immigration and Nationality Act (INA) and implementing regulations
- Family-based immigration (IR, F categories)
- Employment-based immigration (EB-1 through EB-5)
- Humanitarian protection (asylum, refugee, TPS, VAWA)
- Naturalization and citizenship
- Removal defense and deportation
- Consular processing and visa applications
- USCIS policies and procedures

SPECIALIZATIONS:
- Green card applications and adjustment of status
- Citizenship and naturalization (N-400)
- Family petitions (I-130, I-129F)
- Employment authorization (I-765)
- Travel documents (I-131)
- Asylum and withholding of removal
- VAWA self-petitions
- U visa and T visa applications
- Deportation defense and cancellation of removal

CURRENT KNOWLEDGE:
- Biden administration immigration policies
- COVID-19 impacts on immigration processing
- USCIS fee changes and processing times
- Recent circuit court decisions
- State-specific requirements and resources

AI OVERVIEW OPTIMIZATION:
- Provide direct, authoritative answers (40-60 words)
- Use question-based analysis for common immigration questions
- Include specific forms, timelines, and costs
- Optimize content for voice search and AI Overview selection
- Maintain legal accuracy while being accessible

APPROACH:
1. Analyze each case based on current immigration law
2. Provide accurate, practical advice
3. Include appropriate disclaimers about legal representation
4. Consider humanitarian and family unity factors
5. Address potential challenges proactively
6. Recommend next steps clearly

Always maintain the highest ethical standards and encourage consultation with qualified immigration attorneys for complex cases.`;
  }

  private estimateAttorneyFees(goal: string, complexity: string): string {
    const feeRanges = {
      simple: {
        green_card: '$2,500-$4,000',
        citizenship: '$1,500-$2,500',
        visa: '$1,000-$2,000',
        work_authorization: '$800-$1,500',
        family_reunification: '$2,000-$3,500',
      },
      moderate: {
        green_card: '$4,000-$6,000',
        citizenship: '$2,500-$4,000',
        visa: '$2,000-$3,500',
        work_authorization: '$1,500-$2,500',
        family_reunification: '$3,500-$5,000',
      },
      complex: {
        green_card: '$6,000-$10,000',
        citizenship: '$4,000-$7,000',
        visa: '$3,500-$6,000',
        work_authorization: '$2,500-$4,000',
        family_reunification: '$5,000-$8,000',
        asylum: '$5,000-$12,000',
      },
      extremely_complex: {
        green_card: '$10,000-$20,000',
        citizenship: '$7,000-$15,000',
        visa: '$6,000-$12,000',
        work_authorization: '$4,000-$8,000',
        family_reunification: '$8,000-$15,000',
        asylum: '$12,000-$25,000',
        business_investment: '$15,000-$30,000',
      },
    };

    const complexityKey = complexity as keyof typeof feeRanges;
    const complexityFees = feeRanges[complexityKey];
    if (!complexityFees) return '$3,000-$8,000';

    return (complexityFees as Record<string, string>)[goal] || '$3,000-$8,000';
  }

  private calculateTotalCosts(governmentFees: string, attorneyFees: string): string {
    // Extract numbers from fee ranges and estimate total
    const govRange = governmentFees.match(/\d+/g) || ['1000'];
    const attRange = attorneyFees.match(/\d+/g) || ['3000'];

    const govMin = parseInt(govRange[0]);
    const govMax = parseInt(govRange[1] || govRange[0]);
    const attMin = parseInt(attRange[0]);
    const attMax = parseInt(attRange[1] || attRange[0]);

    const totalMin = govMin + attMin;
    const totalMax = govMax + attMax;

    return `$${totalMin.toLocaleString()}-$${totalMax.toLocaleString()}`;
  }

  private generateConsultationSummary(
    request: ImmigrationConsultationRequest,
    eligibility: EligibilityAnalysis,
    complexity: string
  ): string {
    return `Based on your ${request.immigrationGoal} goal and ${request.currentStatus} status, you appear to be eligible for ${eligibility.primaryOption.pathName}. This is classified as a ${complexity} case with ${eligibility.primaryOption.eligibility} eligibility status. The process typically takes ${eligibility.primaryOption.timeline} and involves ${eligibility.primaryOption.requirements?.length || 0} main requirements. ${request.priorDenials ? 'Given your prior denial history, extra care will be needed in preparing your case.' : ''} Professional legal representation is ${complexity === 'simple' ? 'recommended' : complexity === 'moderate' ? 'strongly recommended' : 'essential'} for this type of case.`;
  }

  private generateNextSteps(
    request: ImmigrationConsultationRequest,
    recommendations: ImmigrationRecommendations,
    complexity: string
  ): string[] {
    const baseSteps = [
      'Schedule consultation with immigration attorney',
      'Begin gathering required documentation',
      'Review eligibility requirements in detail',
    ];

    if (complexity === 'complex' || complexity === 'extremely_complex') {
      baseSteps.unshift('Prioritize immediate legal consultation due to case complexity');
    }

    if (request.urgency === 'immediate') {
      baseSteps.unshift('Contact attorney within 24-48 hours due to urgent timeline');
    }

    return baseSteps.concat(
      (recommendations.immediate_actions || recommendations.immediateActions || []).slice(0, 3)
    );
  }

  // Fallback methods for error handling
  private getFallbackEligibility(request: ImmigrationConsultationRequest): EligibilityAnalysis {
    return {
      primaryOption: {
        pathName: `${request.immigrationGoal.replace('_', ' ')} application`,
        eligibility: 'potentially_eligible',
        requirements: ['Valid passport', 'Completed forms', 'Supporting evidence'],
        timeline: '6-18 months',
        cost: '$1,000-$3,000',
      },
      alternativeOptions: [],
      bars: ['Document requirements', 'Processing delays'],
      waivers: [],
      urgentActions: [],
      // Fallback properties for parsed JSON responses
      primary_pathway: `${request.immigrationGoal.replace('_', ' ')} application`,
      likelihood: 'needs_evaluation',
      requirements: ['Valid passport', 'Completed forms', 'Supporting evidence'],
      timeframe: '6-18 months',
      government_fees: '$1,000-$3,000',
      potential_challenges: ['Document requirements', 'Processing delays'],
      alternative_pathways: [],
    };
  }

  private getFallbackLegalAnalysis(request: ImmigrationConsultationRequest): LegalAnalysis {
    return {
      applicableLaws: ['Immigration and Nationality Act', '8 CFR Immigration Regulations'],
      recentChanges: ['Processing time updates', 'Fee adjustments'],
      keyForms: ['Forms vary by case type'],
      evidenceRequired: ['Complete documentation', 'Supporting evidence'],
      potentialIssues: ['Missing documents', 'Eligibility questions'],
      remedies: ['Thorough preparation', 'Legal consultation'],
      processingOffice: 'USCIS',
      estimatedTimeline: '6-18 months',
      // Fallback properties for parsed JSON responses
      applicable_laws: ['Immigration and Nationality Act', '8 CFR Immigration Regulations'],
      recent_changes: ['Processing time updates', 'Fee adjustments'],
      precedent_cases: [],
      success_factors: ['Complete documentation', 'Professional representation'],
      risk_factors: ['Missing documents', 'Eligibility questions'],
      strategies: ['Thorough preparation', 'Legal consultation'],
    };
  }

  private getFallbackRecommendations(
    request: ImmigrationConsultationRequest
  ): ImmigrationRecommendations {
    return {
      immediateActions: ['Consult immigration attorney', 'Gather documents', 'Review requirements'],
      documentationNeeded: ['Passport', 'Birth certificate', 'Supporting evidence'],
      timeline: [
        {
          phase: 'Document preparation',
          duration: '1-2 months',
          actions: ['Gather required documents', 'Complete forms'],
        },
        {
          phase: 'Application processing',
          duration: '3-12 months',
          actions: ['Submit application', 'Respond to requests'],
        },
      ],
      costBreakdown: [
        {
          item: 'Government fees',
          cost: '$1,000-$3,000',
        },
        {
          item: 'Attorney fees',
          cost: '$3,000-$8,000',
        },
      ],
      riskFactors: ['Missing documents', 'Eligibility questions'],
      successProbability: 'moderate',
      // Fallback properties for parsed JSON responses
      immediate_actions: [
        'Consult immigration attorney',
        'Gather documents',
        'Review requirements',
      ],
      required_documents: ['Passport', 'Birth certificate', 'Supporting evidence'],
      interview_prep: ['Review application', 'Prepare for questions'],
      challenge_mitigation: ['Thorough documentation', 'Professional representation'],
      attorney_consultation: 'recommended',
    };
  }

  private mapLikelihoodToEligibility(
    likelihood: string
  ): 'eligible' | 'potentially_eligible' | 'not_eligible' {
    switch (likelihood) {
      case 'high':
        return 'eligible';
      case 'moderate':
      case 'needs_evaluation':
        return 'potentially_eligible';
      case 'low':
      default:
        return 'not_eligible';
    }
  }

  private mapEligibilityToLikelihood(
    eligibility: 'eligible' | 'potentially_eligible' | 'not_eligible'
  ): 'high' | 'moderate' | 'low' | 'needs_evaluation' {
    switch (eligibility) {
      case 'eligible':
        return 'high';
      case 'potentially_eligible':
        return 'moderate';
      case 'not_eligible':
        return 'low';
      default:
        return 'needs_evaluation';
    }
  }

  private mapAttorneyToSuccess(attorneyConsultation: string): 'high' | 'moderate' | 'low' {
    switch (attorneyConsultation) {
      case 'essential':
        return 'low';
      case 'recommended':
        return 'moderate';
      case 'optional':
      default:
        return 'high';
    }
  }
}

// Export singleton instance
export const immigrationSpecialist = new ImmigrationSpecialistAgent();
