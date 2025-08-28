/**
 * Family Law Specialist Agent (North Carolina)
 * Expert in NC family law with AI Overview optimization
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { AIOverviewOptimizationAgent } from './ai-overview-optimization-agent';

export interface FamilyLawConsultationRequest {
  caseType:
    | 'divorce'
    | 'custody'
    | 'child_support'
    | 'alimony'
    | 'adoption'
    | 'domestic_violence'
    | 'paternity'
    | 'modification'
    | 'contempt'
    | 'other';
  maritalStatus: 'married' | 'separated' | 'divorced' | 'never_married';
  separationDate?: string;
  separationLength?: string;
  hasChildren: boolean;
  childrenAges?: number[];
  currentCustody?: 'joint' | 'primary_petitioner' | 'primary_respondent' | 'none_established';
  financialSituation: {
    petitionerIncome: string;
    respondentIncome: string;
    sharedAssets: boolean;
    sharedDebts: boolean;
    realEstate: boolean;
    retirement: boolean;
    businessOwnership: boolean;
  };
  issues: {
    custody: boolean;
    childSupport: boolean;
    alimony: boolean;
    propertyDivision: boolean;
    domesticViolence: boolean;
    relocation: boolean;
  };
  cooperation: 'amicable' | 'some_disagreement' | 'high_conflict' | 'hostile';
  priorOrders: boolean;
  pendingCharges: boolean;
  substanceAbuse: boolean;
  mentalHealth: boolean;
  clientGoals: string[];
  urgency: 'immediate' | 'within_weeks' | 'within_months' | 'planning';
  preferredResolution: 'settlement' | 'mediation' | 'collaborative' | 'litigation' | 'open';
}

export interface FamilyLawAssessment {
  caseComplexity: 'simple' | 'moderate' | 'complex' | 'highly_complex';
  strategy: {
    recommended_approach: 'settlement' | 'mediation' | 'collaborative' | 'litigation';
    timeline: string;
    estimated_cost: string;
    key_priorities: string[];
  };
  custody_analysis?: {
    best_interests_factors: string[];
    likely_outcome: string;
    custody_schedule: string;
    relocation_issues: boolean;
  };
  financial_analysis: {
    alimony_likelihood: 'high' | 'moderate' | 'low' | 'none';
    property_division: string;
    child_support_estimate: string;
    financial_disclosure_needed: string[];
  };
  nc_law_analysis: {
    applicable_statutes: string[];
    separation_requirements: string;
    grounds_for_divorce: string[];
    procedural_requirements: string[];
    court_jurisdiction: string;
  };
  timeline: {
    separation_completion: string;
    earliest_divorce: string;
    estimated_resolution: string;
    critical_deadlines: string[];
  };
  risks_challenges: string[];
  alternative_dispute_resolution: string[];
  attorney_necessity: 'essential' | 'recommended' | 'helpful' | 'optional';
  immediate_actions: string[];
  ai_overview_content?: {
    faq_answers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    content_optimization: string;
  };
}

export class FamilyLawSpecialistAgent {
  private model: ChatOpenAI;
  private crewLogger = createCrewLogger('family-law-specialist-agent');
  private aiOverviewAgent: AIOverviewOptimizationAgent;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.aiOverviewAgent = new AIOverviewOptimizationAgent();
  }

  async assessCase(request: FamilyLawConsultationRequest): Promise<FamilyLawAssessment> {
    return this.crewLogger.logExecution(
      'assess-family-law-case',
      async () => {
        logger.info('Starting family law case assessment', {
          caseType: request.caseType,
          maritalStatus: request.maritalStatus,
          hasChildren: request.hasChildren,
          cooperation: request.cooperation,
        });

        // Step 1: Analyze case under NC family law
        const ncLawAnalysis = await this.analyzeNCFamilyLaw(request);

        // Step 2: Custody analysis if children involved
        const custodyAnalysis = request.hasChildren ? await this.analyzeCustody(request) : null;

        // Step 3: Financial analysis
        const financialAnalysis = await this.analyzeFinancials(request);

        // Step 4: Strategy development
        const strategy = await this.developStrategy(
          request,
          ncLawAnalysis,
          custodyAnalysis,
          financialAnalysis
        );

        // Step 5: Generate AI Overview content
        const aiOverviewContent = await this.generateAIOverviewContent(request, ncLawAnalysis);

        // Step 6: Compile assessment
        const assessment = this.compileAssessment(
          request,
          ncLawAnalysis,
          custodyAnalysis,
          financialAnalysis,
          strategy,
          aiOverviewContent
        );

        logger.info('Family law case assessment completed', {
          caseComplexity: assessment.caseComplexity,
          recommendedApproach: assessment.strategy.recommended_approach,
          attorneyNecessity: assessment.attorney_necessity,
        });

        return assessment;
      },
      {
        input: request,
        metadata: {
          caseType: request.caseType,
          cooperation: request.cooperation,
          urgency: request.urgency,
        },
      }
    );
  }

  private async analyzeNCFamilyLaw(request: FamilyLawConsultationRequest): Promise<any> {
    const ncLawPrompt = `Analyze NC family law requirements for this case:

CASE DETAILS:
- Type: ${request.caseType}
- Marital Status: ${request.maritalStatus}
- Separation Date: ${request.separationDate || 'Not specified'}
- Separation Length: ${request.separationLength || 'Not specified'}
- Has Children: ${request.hasChildren}
- Cooperation Level: ${request.cooperation}

ISSUES INVOLVED:
- Custody: ${request.issues.custody}
- Child Support: ${request.issues.childSupport}
- Alimony: ${request.issues.alimony}
- Property Division: ${request.issues.propertyDivision}
- Domestic Violence: ${request.issues.domesticViolence}
- Relocation: ${request.issues.relocation}

NC FAMILY LAW ANALYSIS:
1. Divorce Requirements (N.C.G.S. § 50-6):
   - One-year separation requirement
   - No-fault vs. fault-based grounds
   - Residency requirements (6 months)

2. Child Custody (N.C.G.S. § 50-13.1):
   - Best interests of child standard
   - Joint vs. sole custody factors
   - Custody modification standards

3. Child Support (N.C.G.S. § 50-13.4):
   - NC Child Support Guidelines
   - Deviation factors
   - Modification requirements

4. Alimony (N.C.G.S. § 50-16.3A):
   - Supporting spouse/dependent spouse
   - Marital misconduct considerations
   - Duration and amount factors

5. Property Division (N.C.G.S. § 50-20):
   - Equitable distribution
   - Marital vs. separate property
   - Distribution factors

ANALYZE:
1. Separation requirement compliance
2. Grounds for divorce available
3. Jurisdiction and venue
4. Procedural requirements
5. Applicable statutes

RESPONSE FORMAT (JSON):
{
  "separation_compliant": true/false,
  "separation_date_needed": "date or N/A",
  "grounds_available": ["no-fault", "adultery", etc],
  "jurisdiction_proper": true/false,
  "applicable_statutes": ["N.C.G.S. § X"],
  "procedural_requirements": ["requirement1", "requirement2"],
  "court_venue": "county court",
  "estimated_timeline": "timeline estimate"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getFamilyLawSystemPrompt()),
        new HumanMessage(ncLawPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse NC family law analysis, using fallback');
      return this.getFallbackNCLaw(request);
    }
  }

  private async analyzeCustody(request: FamilyLawConsultationRequest): Promise<any> {
    const custodyPrompt = `Analyze child custody under NC law:

CUSTODY SITUATION:
- Children Ages: ${request.childrenAges?.join(', ') || 'Not specified'}
- Current Custody: ${request.currentCustody || 'Not established'}
- Cooperation Level: ${request.cooperation}
- Domestic Violence: ${request.issues.domesticViolence}
- Relocation Issue: ${request.issues.relocation}
- Substance Abuse: ${request.substanceAbuse}
- Mental Health: ${request.mentalHealth}

NC CHILD CUSTODY LAW:
1. Best Interests Standard (N.C.G.S. § 50-13.2):
   - Child's safety and welfare
   - Parental fitness and stability
   - Child's relationship with each parent
   - Child's preference (if appropriate age)
   - Domestic violence history
   - Substance abuse issues

2. Custody Types:
   - Joint legal custody (decision-making)
   - Joint physical custody (residence)
   - Primary physical custody
   - Sole custody (rare)

3. Parenting Time Factors:
   - Age-appropriate schedules
   - Geographic distance
   - Work schedules
   - School considerations

ANALYZE:
1. Best interests factors present
2. Likely custody outcome
3. Recommended parenting schedule
4. Relocation restrictions
5. Risk factors

RESPONSE FORMAT (JSON):
{
  "best_interests_factors": {
    "favorable_to_petitioner": ["factor1", "factor2"],
    "favorable_to_respondent": ["factor1", "factor2"],
    "neutral": ["factor1", "factor2"]
  },
  "likely_outcome": "joint|primary_petitioner|primary_respondent",
  "recommended_schedule": "schedule description",
  "relocation_analysis": "analysis if applicable",
  "risk_factors": ["risk1", "risk2"],
  "child_preferences": "relevant if age appropriate"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getFamilyLawSystemPrompt()),
        new HumanMessage(custodyPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse custody analysis, using fallback');
      return this.getFallbackCustody(request);
    }
  }

  private async analyzeFinancials(request: FamilyLawConsultationRequest): Promise<any> {
    const financialPrompt = `Analyze financial aspects under NC family law:

FINANCIAL SITUATION:
- Petitioner Income: ${request.financialSituation.petitionerIncome}
- Respondent Income: ${request.financialSituation.respondentIncome}
- Shared Assets: ${request.financialSituation.sharedAssets}
- Shared Debts: ${request.financialSituation.sharedDebts}
- Real Estate: ${request.financialSituation.realEstate}
- Retirement: ${request.financialSituation.retirement}
- Business: ${request.financialSituation.businessOwnership}

NC FINANCIAL ANALYSIS:
1. Alimony (N.C.G.S. § 50-16.3A):
   - Supporting vs. dependent spouse
   - Marital misconduct considerations
   - Duration of marriage
   - Standard of living during marriage
   - Income disparity

2. Child Support (NC Guidelines):
   - Combined gross income
   - Number of children
   - Custody schedule
   - Extraordinary expenses
   - Deviation factors

3. Equitable Distribution (N.C.G.S. § 50-20):
   - Marital vs. separate property
   - Distribution factors
   - Valuation requirements
   - Business valuation

ANALYZE:
1. Alimony entitlement and amount
2. Child support calculation
3. Property division approach
4. Required financial disclosures

RESPONSE FORMAT (JSON):
{
  "alimony_analysis": {
    "entitlement": "high|moderate|low|none",
    "estimated_amount": "$amount range",
    "estimated_duration": "duration",
    "factors": ["factor1", "factor2"]
  },
  "child_support": {
    "estimated_amount": "$amount",
    "calculation_factors": ["factor1", "factor2"],
    "deviation_likely": true/false
  },
  "property_division": {
    "marital_assets": ["asset1", "asset2"],
    "separate_property": ["asset1", "asset2"],
    "valuation_needed": ["item1", "item2"],
    "distribution_factors": ["factor1", "factor2"]
  },
  "financial_disclosures": ["disclosure1", "disclosure2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getFamilyLawSystemPrompt()),
        new HumanMessage(financialPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse financial analysis, using fallback');
      return this.getFallbackFinancial(request);
    }
  }

  private async developStrategy(
    request: FamilyLawConsultationRequest,
    ncLaw: any,
    custody: any,
    financial: any
  ): Promise<any> {
    const strategyPrompt = `Develop comprehensive strategy for NC family law case:

CASE PROFILE:
- Case Type: ${request.caseType}
- Cooperation: ${request.cooperation}
- Complexity Indicators: Children (${request.hasChildren}), Assets (${request.financialSituation.sharedAssets}), DV (${request.issues.domesticViolence})
- Client Goals: ${request.clientGoals.join(', ')}
- Preferred Resolution: ${request.preferredResolution}

STRATEGIC CONSIDERATIONS:
1. Resolution Methods:
   - Settlement negotiation
   - Mediation (required in NC)
   - Collaborative divorce
   - Litigation

2. Timing Factors:
   - Separation requirement: ${ncLaw.separation_compliant}
   - Urgency level: ${request.urgency}
   - Financial disclosure timeline

3. Risk Management:
   - Custody risks: ${custody?.risk_factors?.join(', ') || 'None'}
   - Financial risks
   - Emotional/conflict management

DEVELOP STRATEGY:
1. Recommended approach based on cooperation level
2. Timeline and cost estimates
3. Priority order for issues
4. Risk mitigation strategies

RESPONSE FORMAT (JSON):
{
  "recommended_approach": "settlement|mediation|collaborative|litigation",
  "approach_rationale": "explanation",
  "timeline": "estimated duration",
  "cost_estimate": "$range",
  "priorities": ["priority1", "priority2"],
  "immediate_actions": ["action1", "action2"],
  "risk_mitigation": ["strategy1", "strategy2"],
  "alternative_options": ["option1", "option2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getFamilyLawSystemPrompt()),
        new HumanMessage(strategyPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse strategy analysis, using fallback');
      return this.getFallbackStrategy(request);
    }
  }

  private async generateAIOverviewContent(
    request: FamilyLawConsultationRequest,
    ncLaw: any
  ): Promise<any> {
    const contentPrompt = `Generate AI Overview optimized content for NC family law:

CASE TYPE: ${request.caseType}
ISSUES: ${Object.entries(request.issues)
      .filter(([k, v]) => v)
      .map(([k]) => k)
      .join(', ')}

Generate 6-8 FAQ answers optimized for AI Overview (40-60 words each):

1. "How long does divorce take in North Carolina?"
2. "What are the grounds for divorce in NC?"
3. "How is child custody determined in North Carolina?"
4. "How much does divorce cost in NC?"
5. "Do I need to be separated for one year in North Carolina?"
6. "How is child support calculated in NC?"
7. "What is alimony in North Carolina?"
8. Additional questions specific to case type

Each answer should:
- Start with direct answer
- Include NC-specific requirements (1-year separation, etc.)
- Reference relevant NC statutes when appropriate
- Use conversational language for voice search
- Be exactly 40-60 words
- Include appropriate legal disclaimers

RESPONSE FORMAT (JSON):
{
  "faq_answers": [
    {
      "question": "question text",
      "answer": "40-60 word answer with NC specifics",
      "word_count": number,
      "voice_optimized": true
    }
  ],
  "content_optimization": "Additional NC family law content suggestions"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getFamilyLawSystemPrompt()),
        new HumanMessage(contentPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to generate AI Overview content');
      return {
        faq_answers: [],
        content_optimization: 'Standard NC family law content recommendations',
      };
    }
  }

  private compileAssessment(
    request: FamilyLawConsultationRequest,
    ncLaw: any,
    custody: any,
    financial: any,
    strategy: any,
    aiOverviewContent: any
  ): FamilyLawAssessment {
    // Determine case complexity
    const complexityFactors = [
      request.hasChildren,
      request.financialSituation.sharedAssets,
      request.financialSituation.businessOwnership,
      request.issues.domesticViolence,
      request.cooperation === 'high_conflict' || request.cooperation === 'hostile',
      request.issues.relocation,
    ].filter(Boolean).length;

    let caseComplexity: 'simple' | 'moderate' | 'complex' | 'highly_complex';
    if (complexityFactors <= 1) caseComplexity = 'simple';
    else if (complexityFactors <= 2) caseComplexity = 'moderate';
    else if (complexityFactors <= 4) caseComplexity = 'complex';
    else caseComplexity = 'highly_complex';

    // Determine attorney necessity
    let attorneyNecessity: 'essential' | 'recommended' | 'helpful' | 'optional';
    if (
      request.issues.domesticViolence ||
      request.cooperation === 'hostile' ||
      caseComplexity === 'highly_complex'
    ) {
      attorneyNecessity = 'essential';
    } else if (request.hasChildren || caseComplexity === 'complex') {
      attorneyNecessity = 'recommended';
    } else if (caseComplexity === 'moderate') {
      attorneyNecessity = 'helpful';
    } else {
      attorneyNecessity = 'optional';
    }

    // Calculate timelines
    const separationDate = request.separationDate ? new Date(request.separationDate) : new Date();
    const earliestDivorce = new Date(separationDate);
    earliestDivorce.setFullYear(earliestDivorce.getFullYear() + 1);

    return {
      caseComplexity,
      strategy: {
        recommended_approach: strategy.recommended_approach,
        timeline: strategy.timeline,
        estimated_cost: strategy.cost_estimate,
        key_priorities: strategy.priorities || [],
      },
      custody_analysis: custody
        ? {
            best_interests_factors: Object.values(custody.best_interests_factors || {})
              .flat()
              .filter((f): f is string => typeof f === 'string'),
            likely_outcome: custody.likely_outcome || '',
            custody_schedule: custody.recommended_schedule || '',
            relocation_issues: request.issues.relocation,
          }
        : undefined,
      financial_analysis: {
        alimony_likelihood: financial.alimony_analysis?.entitlement || 'none',
        property_division:
          financial.property_division?.distribution_factors?.join(', ') ||
          'Standard equitable distribution',
        child_support_estimate: financial.child_support?.estimated_amount || 'N/A',
        financial_disclosure_needed: financial.financial_disclosures || [],
      },
      nc_law_analysis: {
        applicable_statutes: ncLaw.applicable_statutes || [],
        separation_requirements: ncLaw.separation_compliant
          ? 'Met'
          : 'One year separation required',
        grounds_for_divorce: ncLaw.grounds_available || ['No-fault after one year separation'],
        procedural_requirements: ncLaw.procedural_requirements || [],
        court_jurisdiction: ncLaw.court_venue || 'County where parties last resided',
      },
      timeline: {
        separation_completion: request.separationDate || 'Needs to begin separation',
        earliest_divorce: earliestDivorce.toDateString(),
        estimated_resolution: strategy.timeline,
        critical_deadlines: this.identifyCriticalDeadlines(request, ncLaw),
      },
      risks_challenges: [...(strategy.risk_mitigation || []), ...(custody?.risk_factors || [])],
      alternative_dispute_resolution: this.identifyADROptions(request, strategy),
      attorney_necessity: attorneyNecessity,
      immediate_actions: strategy.immediate_actions || [],
      ai_overview_content: aiOverviewContent,
    };
  }

  private getFamilyLawSystemPrompt(): string {
    return `You are an expert North Carolina family law attorney with comprehensive knowledge of NC domestic relations law. Your expertise includes:

NC FAMILY LAW EXPERTISE:
- N.C.G.S. Chapter 50 (Divorce and Alimony)
- N.C.G.S. Chapter 50A (Child Custody Jurisdiction and Enforcement)
- NC Child Support Guidelines
- Equitable distribution statutes and case law
- Domestic violence protective orders
- Adoption and paternity proceedings

PRACTICE AREAS:
- Divorce and separation (absolute and bed and board)
- Child custody and visitation
- Child support establishment and modification
- Alimony (spousal support)
- Equitable distribution of marital property
- Domestic violence and protective orders
- Adoption and guardianship
- Paternity establishment
- Contempt and enforcement proceedings

NC FAMILY LAW REQUIREMENTS:
- One-year separation requirement for no-fault divorce
- Six-month residency requirement
- Mandatory mediation for contested custody
- Best interests of the child standard
- Equitable distribution factors (N.C.G.S. § 50-20)
- Alimony factors (N.C.G.S. § 50-16.3A)

NC CHILD SUPPORT GUIDELINES:
- Income shares model
- Combined gross income calculation
- Worksheet A (primary custody) vs. Worksheet B (shared custody)
- Deviation factors and extraordinary expenses
- Modification standards (substantial change in circumstances)

AI OVERVIEW OPTIMIZATION:
- Provide NC-specific family law answers (40-60 words)
- Include one-year separation requirement in relevant responses
- Reference specific NC statutes and procedures
- Optimize for "North Carolina family law" queries
- Use conversational language for voice search

APPROACH:
1. Always consider NC's one-year separation requirement first
2. Analyze best interests factors for any custody issues
3. Apply NC equitable distribution factors for property
4. Consider alternative dispute resolution options
5. Address domestic violence safety concerns immediately
6. Provide realistic timelines based on NC procedures

Maintain highest ethical standards and provide accurate analysis specific to North Carolina family law.`;
  }

  private identifyCriticalDeadlines(request: FamilyLawConsultationRequest, ncLaw: any): string[] {
    const deadlines: string[] = [];

    if (!request.separationDate && request.caseType === 'divorce') {
      deadlines.push('Begin separation to start one-year requirement');
    }

    if (request.issues.domesticViolence) {
      deadlines.push('File for protective order if needed (immediately)');
    }

    if (request.hasChildren && !request.currentCustody) {
      deadlines.push('Establish temporary custody arrangements');
    }

    return deadlines;
  }

  private identifyADROptions(request: FamilyLawConsultationRequest, strategy: any): string[] {
    const options: string[] = [];

    if (request.cooperation !== 'hostile') {
      options.push('Mediation (required for contested custody in NC)');
    }

    if (request.cooperation === 'amicable' || request.cooperation === 'some_disagreement') {
      options.push('Collaborative divorce');
      options.push('Settlement negotiation');
    }

    if (request.caseType === 'divorce' && !request.issues.domesticViolence) {
      options.push('Uncontested divorce');
    }

    return options;
  }

  // Fallback methods
  private getFallbackNCLaw(request: FamilyLawConsultationRequest) {
    const separationCompliant =
      request.separationLength === 'over_one_year' ||
      (request.separationDate &&
        new Date().getTime() - new Date(request.separationDate).getTime() >
          365 * 24 * 60 * 60 * 1000);

    return {
      separation_compliant: separationCompliant,
      separation_date_needed: separationCompliant ? 'N/A' : 'Must complete one year separation',
      grounds_available: ['No-fault after one year separation'],
      jurisdiction_proper: true,
      applicable_statutes: ['N.C.G.S. § 50-6', 'N.C.G.S. § 50-13.1'],
      procedural_requirements: [
        'File complaint',
        'Serve defendant',
        'Complete mediation if custody disputed',
      ],
      court_venue: 'District Court',
      estimated_timeline: '3-12 months after separation completed',
    };
  }

  private getFallbackCustody(request: FamilyLawConsultationRequest) {
    return {
      best_interests_factors: {
        favorable_to_petitioner: ['Stable housing', 'Consistent caregiving'],
        favorable_to_respondent: ['Equal parenting time'],
        neutral: ['Both parents fit'],
      },
      likely_outcome: 'joint',
      recommended_schedule: 'Joint custody with shared parenting time',
      relocation_analysis: 'Standard relocation restrictions apply',
      risk_factors: [],
      child_preferences: 'Consider if age 12 or older',
    };
  }

  private getFallbackFinancial(request: FamilyLawConsultationRequest) {
    return {
      alimony_analysis: {
        entitlement: 'moderate',
        estimated_amount: '$500-$1,500/month',
        estimated_duration: '1-5 years',
        factors: ['Income disparity', 'Length of marriage'],
      },
      child_support: {
        estimated_amount: '$400-$800/month',
        calculation_factors: ['Combined income', 'Number of children'],
        deviation_likely: false,
      },
      property_division: {
        marital_assets: ['Marital home', 'Retirement accounts'],
        separate_property: ['Pre-marital assets'],
        valuation_needed: ['Real estate', 'Business interests'],
        distribution_factors: ['Length of marriage', 'Contributions'],
      },
      financial_disclosures: ['Income verification', 'Asset statements', 'Debt documentation'],
    };
  }

  private getFallbackStrategy(request: FamilyLawConsultationRequest) {
    return {
      recommended_approach: request.cooperation === 'amicable' ? 'settlement' : 'mediation',
      approach_rationale: 'Based on cooperation level and case complexity',
      timeline: '6-12 months',
      cost_estimate: '$3,000-$15,000',
      priorities: ['Child welfare', 'Financial stability', 'Efficient resolution'],
      immediate_actions: [
        'Begin separation if needed',
        'Gather financial documents',
        'Consider temporary arrangements',
      ],
      risk_mitigation: [
        'Document everything',
        'Maintain stability for children',
        'Avoid conflict escalation',
      ],
      alternative_options: ['Mediation', 'Collaborative process'],
    };
  }
}

// Export singleton instance
export const familyLawSpecialist = new FamilyLawSpecialistAgent();
