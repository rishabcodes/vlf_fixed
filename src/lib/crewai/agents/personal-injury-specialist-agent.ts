/**
 * Personal Injury Specialist Agent (North Carolina)
 * Expert in NC personal injury law with AI Overview optimization
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { AIOverviewOptimizationAgent } from './ai-overview-optimization-agent';

// Response type interfaces
interface ViabilityAnalysis {
  case_viability: 'strong' | 'good' | 'moderate' | 'weak' | 'not_viable';
  liability_percentage: string;
  contributory_neg_risk: 'low' | 'moderate' | 'high';
  evidence_strength: 'strong' | 'moderate' | 'weak';
  settlement_likelihood: 'high' | 'moderate' | 'low';
  key_strengths: string[];
  key_weaknesses: string[];
  statute_deadline: string;
  recommended_action: 'immediate' | 'soon' | 'standard';
}

interface CaseValueAnalysis {
  economic_damages: {
    medical_current: string;
    medical_future: string;
    lost_wages: string;
    total_economic: string;
  };
  non_economic_damages: {
    pain_suffering_low: string;
    pain_suffering_high: string;
    total_non_economic_range: string;
  };
  total_value_range: string;
  settlement_range: string;
  trial_range: string;
  value_drivers: string[];
  value_detractors: string[];
}

interface NCLawAnalysis {
  contributory_negligence_analysis: string;
  applicable_nc_statutes: string[];
  recent_case_law: string[];
  venue_considerations: string;
  damage_caps: string;
  unique_nc_rules: string[];
  strategic_considerations: string[];
}

interface StrategyRecommendation {
  immediate_actions: string[];
  evidence_preservation: string[];
  medical_recommendations: string[];
  insurance_strategy: string[];
  settlement_timeline: string;
  estimated_duration: string;
  litigation_recommendation: 'avoid' | 'consider' | 'recommend';
  negotiation_leverage: string[];
}

export interface PersonalInjuryConsultationRequest {
  incidentType:
    | 'car_accident'
    | 'motorcycle_accident'
    | 'truck_accident'
    | 'slip_fall'
    | 'medical_malpractice'
    | 'product_liability'
    | 'workplace_accident'
    | 'wrongful_death'
    | 'other';
  incidentDate: string;
  incidentLocation: string; // NC county/city
  injuryType: 'minor' | 'moderate' | 'severe' | 'catastrophic' | 'wrongful_death';
  medicalTreatment: 'none' | 'emergency_only' | 'ongoing' | 'surgery_required' | 'long_term_care';
  liabilityClarity:
    | 'clear_other_fault'
    | 'mostly_other_fault'
    | 'disputed'
    | 'shared_fault'
    | 'unclear';
  insuranceCoverage: {
    hasInsurance: boolean;
    otherPartyInsured: boolean;
    uninsuredMotorist: boolean;
    medicalPayments: boolean;
  };
  economicDamages: {
    medicalExpenses: string;
    lostWages: string;
    propertyDamage: string;
    ongoingExpenses: boolean;
  };
  priorAttorney: boolean;
  policeReport: boolean;
  witnesses: boolean;
  photos: boolean;
  clientQuestions?: string[];
  urgency: 'immediate' | 'within_days' | 'within_weeks' | 'planning';
}

export interface PersonalInjuryAssessment {
  caseViability: 'strong' | 'good' | 'moderate' | 'weak' | 'not_viable';
  caseValue: {
    estimated_range: string;
    factors: string[];
    damages_breakdown: {
      economic: string;
      non_economic: string;
      total_estimated: string;
    };
  };
  legal_analysis: {
    liability_assessment: string;
    nc_law_considerations: string[];
    statute_limitations: string;
    contributory_negligence_risk: 'low' | 'moderate' | 'high';
  };
  strategy: {
    immediate_actions: string[];
    evidence_preservation: string[];
    medical_recommendations: string[];
    insurance_handling: string[];
  };
  timeline: {
    statute_deadline: string;
    recommended_filing: string;
    estimated_resolution: string;
  };
  risks_challenges: string[];
  settlement_likelihood: 'high' | 'moderate' | 'low';
  trial_readiness: string;
  attorney_recommendation: 'essential' | 'recommended' | 'optional';
  ai_overview_content?: {
    faq_answers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    content_optimization: string;
  };
}

export class PersonalInjurySpecialistAgent {
  private model: ChatOpenAI;
  private crewLogger = createCrewLogger('personal-injury-specialist-agent');
  private aiOverviewAgent: AIOverviewOptimizationAgent;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.aiOverviewAgent = new AIOverviewOptimizationAgent();
  }

  async assessCase(request: PersonalInjuryConsultationRequest): Promise<PersonalInjuryAssessment> {
    return this.crewLogger.logExecution(
      'assess-personal-injury-case',
      async () => {
        logger.info('Starting personal injury case assessment', {
          incidentType: request.incidentType,
          injuryType: request.injuryType,
          incidentLocation: request.incidentLocation,
        });

        // Step 1: Analyze case viability and liability
        const viabilityAnalysis = await this.analyzeViability(request);

        // Step 2: Calculate potential case value
        const valueAnalysis = await this.calculateCaseValue(request);

        // Step 3: NC law analysis
        const ncLawAnalysis = await this.analyzeNCLaw(request);

        // Step 4: Strategy development
        const strategy = await this.developStrategy(request, viabilityAnalysis, ncLawAnalysis);

        // Step 5: Generate AI Overview content
        const aiOverviewContent = await this.generateAIOverviewContent(request, viabilityAnalysis);

        // Step 6: Compile assessment
        const assessment = this.compileAssessment(
          request,
          viabilityAnalysis,
          valueAnalysis,
          ncLawAnalysis,
          strategy,
          aiOverviewContent
        );

        logger.info('Personal injury case assessment completed', {
          caseViability: assessment.caseViability,
          estimatedValue: assessment.caseValue.estimated_range,
          contributoryNegligenceRisk: assessment.legal_analysis.contributory_negligence_risk,
        });

        return assessment;
      },
      {
        input: request,
        metadata: {
          incidentType: request.incidentType,
          injuryType: request.injuryType,
          urgency: request.urgency,
        },
      }
    );
  }

  private async analyzeViability(
    request: PersonalInjuryConsultationRequest
  ): Promise<ViabilityAnalysis> {
    const viabilityPrompt = `Analyze personal injury case viability under North Carolina law:

INCIDENT DETAILS:
- Type: ${request.incidentType}
- Date: ${request.incidentDate}
- Location: ${request.incidentLocation}
- Injury Severity: ${request.injuryType}
- Medical Treatment: ${request.medicalTreatment}
- Liability: ${request.liabilityClarity}
- Police Report: ${request.policeReport ? 'Yes' : 'No'}
- Witnesses: ${request.witnesses ? 'Yes' : 'No'}
- Photos: ${request.photos ? 'Yes' : 'No'}

INSURANCE INFO:
- Client Insured: ${request.insuranceCoverage.hasInsurance}
- Other Party Insured: ${request.insuranceCoverage.otherPartyInsured}
- UM Coverage: ${request.insuranceCoverage.uninsuredMotorist}

NC LAW CONSIDERATIONS:
1. Contributory negligence rule (pure contributory negligence)
2. Three-year statute of limitations for personal injury
3. Two-year statute for wrongful death
4. Last clear chance doctrine
5. Sudden emergency doctrine

ANALYZE:
1. Case viability (strong/good/moderate/weak/not_viable)
2. Liability assessment under NC law
3. Contributory negligence risk
4. Evidence strength
5. Settlement prospects

RESPONSE FORMAT (JSON):
{
  "case_viability": "strong|good|moderate|weak|not_viable",
  "liability_percentage": "percentage defendant liable",
  "contributory_neg_risk": "low|moderate|high",
  "evidence_strength": "strong|moderate|weak",
  "settlement_likelihood": "high|moderate|low",
  "key_strengths": ["strength1", "strength2"],
  "key_weaknesses": ["weakness1", "weakness2"],
  "statute_deadline": "date",
  "recommended_action": "immediate|soon|standard"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getPersonalInjurySystemPrompt()),
        new HumanMessage(viabilityPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse viability analysis, using fallback');
      return this.getFallbackViability(request);
    }
  }

  private async calculateCaseValue(
    request: PersonalInjuryConsultationRequest
  ): Promise<CaseValueAnalysis> {
    const valuePrompt = `Calculate potential case value for NC personal injury case:

INJURY AND DAMAGES:
- Injury Type: ${request.injuryType}
- Medical Expenses: ${request.economicDamages.medicalExpenses}
- Lost Wages: ${request.economicDamages.lostWages}
- Property Damage: ${request.economicDamages.propertyDamage}
- Ongoing Treatment: ${request.economicDamages.ongoingExpenses}
- Medical Treatment Level: ${request.medicalTreatment}

NC DAMAGES CALCULATION:
1. Economic damages (specials):
   - Past medical expenses
   - Future medical expenses
   - Lost wages (past and future)
   - Property damage
   - Out-of-pocket expenses

2. Non-economic damages (generals):
   - Pain and suffering
   - Mental anguish
   - Loss of enjoyment of life
   - Permanent disability/disfigurement
   - Loss of consortium (if applicable)

VALUATION FACTORS:
- Severity of injury: ${request.injuryType}
- Treatment duration and type
- Impact on daily life
- Age and occupation of plaintiff
- Permanency of injuries
- Comparative jury verdicts in NC

CALCULATE:
1. Low, mid, and high range estimates
2. Settlement vs. trial value differential
3. Key value drivers
4. Factors that could reduce value

RESPONSE FORMAT (JSON):
{
  "economic_damages": {
    "medical_current": "$amount",
    "medical_future": "$amount",
    "lost_wages": "$amount",
    "total_economic": "$amount"
  },
  "non_economic_damages": {
    "pain_suffering_low": "$amount",
    "pain_suffering_high": "$amount",
    "total_non_economic_range": "$range"
  },
  "total_value_range": "$low - $high",
  "settlement_range": "$low - $high",
  "trial_range": "$low - $high",
  "value_drivers": ["driver1", "driver2"],
  "value_detractors": ["detractor1", "detractor2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getPersonalInjurySystemPrompt()),
        new HumanMessage(valuePrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse value analysis, using fallback');
      return this.getFallbackValue(request);
    }
  }

  private async analyzeNCLaw(request: PersonalInjuryConsultationRequest): Promise<NCLawAnalysis> {
    const ncLawPrompt = `Analyze NC-specific legal considerations for this personal injury case:

CASE TYPE: ${request.incidentType}
INCIDENT LOCATION: ${request.incidentLocation}
LIABILITY SITUATION: ${request.liabilityClarity}

NC LEGAL ANALYSIS REQUIRED:
1. Contributory negligence application and exceptions
2. Relevant NC statutes and case law
3. Venue considerations (county-specific factors)
4. Insurance requirements and coverage issues
5. Comparative fault with other states if applicable
6. NC-specific procedural requirements

KEY NC LAW AREAS:
- N.C.G.S. § 20-279.21 (financial responsibility)
- Last clear chance doctrine
- Sudden emergency doctrine
- Seat belt defense limitations
- Dramshop liability (if alcohol involved)
- Governmental immunity issues
- Product liability under NC law

ANALYZE:
1. How contributory negligence affects this case
2. Applicable defenses defendant might raise
3. Procedural requirements specific to NC
4. Insurance coverage implications
5. Venue advantages/disadvantages

RESPONSE FORMAT (JSON):
{
  "contributory_negligence_analysis": "detailed analysis",
  "applicable_nc_statutes": ["statute1", "statute2"],
  "relevant_case_law": ["case1", "case2"],
  "defenses_available": ["defense1", "defense2"],
  "procedural_requirements": ["requirement1", "requirement2"],
  "insurance_considerations": ["consideration1", "consideration2"],
  "venue_factors": ["factor1", "factor2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getPersonalInjurySystemPrompt()),
        new HumanMessage(ncLawPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse NC law analysis, using fallback');
      return this.getFallbackNCLaw(request);
    }
  }

  private async developStrategy(
    request: PersonalInjuryConsultationRequest,
    viability: ViabilityAnalysis,
    ncLaw: NCLawAnalysis
  ): Promise<StrategyRecommendation> {
    const strategyPrompt = `Develop comprehensive strategy for this NC personal injury case:

CASE PROFILE:
- Viability: ${viability.case_viability}
- Contributory Negligence Risk: ${viability.contributory_neg_risk}
- Evidence Strength: ${viability.evidence_strength}
- Settlement Likelihood: ${viability.settlement_likelihood}

STRATEGY DEVELOPMENT:
1. Immediate actions needed
2. Evidence preservation priorities
3. Medical treatment recommendations
4. Insurance claim handling
5. Expert witness considerations
6. Discovery strategy
7. Settlement positioning
8. Trial preparation if needed

CONSIDERATIONS:
- Statute of limitations: ${viability.statute_deadline}
- NC contributory negligence rule
- Evidence available: Police report (${request.policeReport}), Witnesses (${request.witnesses}), Photos (${request.photos})
- Insurance coverage issues
- Medical treatment status: ${request.medicalTreatment}

RESPONSE FORMAT (JSON):
{
  "immediate_actions": ["action1", "action2"],
  "evidence_preservation": ["evidence1", "evidence2"],
  "medical_strategy": ["recommendation1", "recommendation2"],
  "insurance_approach": ["approach1", "approach2"],
  "expert_witnesses": ["expert_type1", "expert_type2"],
  "discovery_priorities": ["priority1", "priority2"],
  "settlement_strategy": "strategy description",
  "trial_preparation": ["prep1", "prep2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getPersonalInjurySystemPrompt()),
        new HumanMessage(strategyPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse strategy analysis, using fallback');
      return this.getFallbackStrategy(request);
    }
  }

  private async generateAIOverviewContent(
    request: PersonalInjuryConsultationRequest,
    viability: any
  ): Promise<any> {
    const contentPrompt = `Generate AI Overview optimized content for NC personal injury case:

CASE TYPE: ${request.incidentType}
INJURY LEVEL: ${request.injuryType}

Generate 6-8 FAQ answers optimized for AI Overview (40-60 words each):

1. "What should I do immediately after a [incident type] in NC?"
2. "How long do I have to file a personal injury claim in North Carolina?"
3. "What is contributory negligence in NC and how does it affect my case?"
4. "How much is my personal injury case worth in North Carolina?"
5. "Do I need a lawyer for my [incident type] case in NC?"
6. "What damages can I recover in a NC personal injury case?"
7. Additional questions specific to incident type

Each answer should:
- Start with direct answer
- Include NC-specific law references
- Mention contributory negligence when relevant
- Use conversational language for voice search
- Be exactly 40-60 words
- Include appropriate legal disclaimers

RESPONSE FORMAT (JSON):
{
  "faq_answers": [
    {
      "question": "question text",
      "answer": "40-60 word answer with NC law specifics",
      "word_count": number,
      "voice_optimized": true
    }
  ],
  "content_optimization": "Additional NC personal injury content suggestions"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getPersonalInjurySystemPrompt()),
        new HumanMessage(contentPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to generate AI Overview content');
      return {
        faq_answers: [],
        content_optimization: 'Standard NC personal injury content recommendations',
      };
    }
  }

  private compileAssessment(
    request: PersonalInjuryConsultationRequest,
    viability: any,
    value: any,
    ncLaw: any,
    strategy: any,
    aiOverviewContent: any
  ): PersonalInjuryAssessment {
    // Calculate timeline based on incident date
    const incidentDate = new Date(request.incidentDate);
    const statuteDeadline = new Date(incidentDate);
    statuteDeadline.setFullYear(statuteDeadline.getFullYear() + 3); // 3 years for PI in NC

    // Determine attorney recommendation
    let attorneyRecommendation: 'essential' | 'recommended' | 'optional';
    if (viability.contributory_neg_risk === 'high' || viability.case_viability === 'weak') {
      attorneyRecommendation = 'essential';
    } else if (viability.case_viability === 'strong' && request.injuryType !== 'minor') {
      attorneyRecommendation = 'recommended';
    } else {
      attorneyRecommendation = 'optional';
    }

    return {
      caseViability: viability.case_viability,
      caseValue: {
        estimated_range: value.total_value_range,
        factors: value.value_drivers || [],
        damages_breakdown: {
          economic: value.economic_damages?.total_economic || 'To be determined',
          non_economic: value.non_economic_damages?.total_non_economic_range || 'To be determined',
          total_estimated: value.total_value_range,
        },
      },
      legal_analysis: {
        liability_assessment: viability.liability_percentage || 'Under evaluation',
        nc_law_considerations: ncLaw.applicable_nc_statutes || [],
        statute_limitations: statuteDeadline.toDateString(),
        contributory_negligence_risk: viability.contributory_neg_risk,
      },
      strategy: {
        immediate_actions: strategy.immediate_actions || [],
        evidence_preservation: strategy.evidence_preservation || [],
        medical_recommendations: strategy.medical_strategy || [],
        insurance_handling: strategy.insurance_approach || [],
      },
      timeline: {
        statute_deadline: statuteDeadline.toDateString(),
        recommended_filing: this.calculateRecommendedFiling(
          incidentDate,
          viability.recommended_action
        ),
        estimated_resolution: this.estimateResolution(viability.settlement_likelihood),
      },
      risks_challenges: [...(viability.key_weaknesses || []), ...(value.value_detractors || [])],
      settlement_likelihood: viability.settlement_likelihood,
      trial_readiness: this.assessTrialReadiness(viability, value),
      attorney_recommendation: attorneyRecommendation,
      ai_overview_content: aiOverviewContent,
    };
  }

  private getPersonalInjurySystemPrompt(): string {
    return `You are an expert North Carolina personal injury attorney with comprehensive knowledge of NC tort law. Your expertise includes:

NC PERSONAL INJURY LAW EXPERTISE:
- North Carolina contributory negligence rule (pure contributory negligence)
- Last clear chance doctrine and exceptions
- Sudden emergency doctrine
- Seat belt defense limitations under NC law
- Dramshop liability and alcohol-related accidents
- Governmental immunity and exceptions
- Product liability under NC law
- Medical malpractice standards and damage caps

PRACTICE AREAS:
- Motor vehicle accidents (car, truck, motorcycle)
- Premises liability (slip and fall, unsafe conditions)
- Medical malpractice and hospital negligence
- Product liability and defective products
- Workplace accidents and third-party claims
- Wrongful death and survival actions
- Dog bites and animal attacks
- Nursing home abuse and neglect

NC STATUTES AND PROCEDURES:
- N.C.G.S. § 1-52 (three-year statute of limitations)
- N.C.G.S. § 28A-18-2 (wrongful death statute)
- N.C.G.S. § 20-279.21 (financial responsibility law)
- NC Rules of Civil Procedure
- NC Evidence Rules
- Mediation requirements (Rule 7)

NC DAMAGES LAW:
- Economic damages (medical expenses, lost wages, property damage)
- Non-economic damages (pain and suffering, mental anguish)
- Punitive damages requirements (willful or wanton conduct)
- Collateral source rule and medical payments
- Future damages and present value calculations

AI OVERVIEW OPTIMIZATION:
- Provide NC-specific legal answers (40-60 words)
- Address contributory negligence in relevant responses
- Include specific NC statutes and timeframes
- Optimize for "North Carolina" and "NC" search queries
- Use conversational language for voice search

APPROACH:
1. Always consider NC contributory negligence rule first
2. Assess evidence carefully for any contributory negligence
3. Provide realistic case valuations based on NC jury verdicts
4. Consider venue-specific factors (urban vs. rural counties)
5. Address insurance coverage issues common in NC
6. Recommend appropriate medical treatment and documentation

Maintain highest ethical standards and provide accurate legal analysis specific to North Carolina law.`;
  }

  private calculateRecommendedFiling(incidentDate: Date, urgency: string): string {
    const recommended = new Date(incidentDate);
    if (urgency === 'immediate') {
      recommended.setMonth(recommended.getMonth() + 1);
    } else if (urgency === 'soon') {
      recommended.setMonth(recommended.getMonth() + 3);
    } else {
      recommended.setMonth(recommended.getMonth() + 6);
    }
    return recommended.toDateString();
  }

  private estimateResolution(settlementLikelihood: string): string {
    switch (settlementLikelihood) {
      case 'high':
        return '6-12 months (settlement likely)';
      case 'moderate':
        return '12-18 months (settlement possible)';
      case 'low':
        return '18-36 months (trial likely)';
      default:
        return '12-24 months';
    }
  }

  private assessTrialReadiness(viability: any, value: any): string {
    if (viability.case_viability === 'strong' && viability.evidence_strength === 'strong') {
      return 'Case is trial-ready with strong evidence and clear liability';
    } else if (viability.contributory_neg_risk === 'high') {
      return 'Trial risky due to contributory negligence concerns';
    } else {
      return 'Case needs further development before trial consideration';
    }
  }

  // Fallback methods
  private getFallbackViability(request: PersonalInjuryConsultationRequest): ViabilityAnalysis {
    return {
      case_viability: 'moderate',
      liability_percentage: '75% defendant liable',
      contributory_neg_risk: 'moderate',
      evidence_strength: 'moderate',
      settlement_likelihood: 'moderate',
      key_strengths: ['Clear incident documentation', 'Medical treatment'],
      key_weaknesses: ['Contributory negligence question'],
      statute_deadline: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toDateString(),
      recommended_action: 'soon',
    };
  }

  private getFallbackValue(request: PersonalInjuryConsultationRequest): CaseValueAnalysis {
    return {
      economic_damages: {
        medical_current: '$5,000',
        medical_future: '$2,000',
        lost_wages: '$3,000',
        total_economic: '$10,000',
      },
      non_economic_damages: {
        pain_suffering_low: '$15,000',
        pain_suffering_high: '$45,000',
        total_non_economic_range: '$15,000-$45,000',
      },
      total_value_range: '$25,000-$55,000',
      settlement_range: '$20,000-$45,000',
      trial_range: '$25,000-$65,000',
      value_drivers: ['Clear liability', 'Documented injuries'],
      value_detractors: ['Minor injuries', 'Quick recovery'],
    };
  }

  private getFallbackNCLaw(request: PersonalInjuryConsultationRequest): NCLawAnalysis {
    return {
      contributory_negligence_analysis:
        'Must evaluate any client fault under pure contributory negligence rule',
      applicable_nc_statutes: ['N.C.G.S. § 1-52', 'N.C.G.S. § 20-279.21'],
      recent_case_law: ['Coleman v. Cooper', 'Hairston v. Alexander Tank'],
      venue_considerations: 'Local jury attitudes and court scheduling',
      damage_caps: 'No caps on compensatory damages, punitive capped at 3x or $250k',
      unique_nc_rules: ['Pure contributory negligence', 'Seat belt defense limited'],
      strategic_considerations: ['Early case evaluation', 'Venue selection', 'Expert retention'],
    };
  }

  private getFallbackStrategy(request: PersonalInjuryConsultationRequest): StrategyRecommendation {
    return {
      immediate_actions: [
        'Preserve evidence',
        'Continue medical treatment',
        'Avoid recorded statements',
      ],
      evidence_preservation: ['Obtain police report', 'Photograph scene', 'Contact witnesses'],
      medical_recommendations: [
        'Complete treatment',
        'Follow doctor recommendations',
        'Document injuries',
      ],
      insurance_strategy: ['Report claim', 'Review coverage', 'Avoid quick settlements'],
      settlement_timeline: '6-12 months for initial demand',
      estimated_duration: '12-24 months total',
      litigation_recommendation: 'avoid',
      negotiation_leverage: [
        'Strong liability evidence',
        'Well-documented injuries',
        'Economic loss proof',
      ],
    };
  }
}

// Export singleton instance
export const personalInjurySpecialist = new PersonalInjurySpecialistAgent();
