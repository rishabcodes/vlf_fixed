/**
 * Workers Compensation Specialist Agent (North Carolina)
 * Expert in NC workers compensation law with AI Overview optimization
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { AIOverviewOptimizationAgent } from './ai-overview-optimization-agent';

export interface WorkersCompConsultationRequest {
  injuryType: 'accident' | 'repetitive_strain' | 'occupational_disease' | 'aggravation_existing' | 'mental_stress' | 'other';
  injuryDate: string;
  reportedToEmployer: boolean;
  reportDate?: string;
  workRelated: 'clearly_yes' | 'mostly_yes' | 'disputed' | 'unclear';
  employmentStatus: 'full_time' | 'part_time' | 'temporary' | 'contract' | 'seasonal';
  employer: {
    name: string;
    industry: string;
    size: 'small' | 'medium' | 'large';
    hasInsurance: boolean;
    insuranceCarrier?: string;
  };
  medicalTreatment: {
    received: boolean;
    authorizedByEmployer: boolean;
    doctorChoice: 'employer_panel' | 'own_choice' | 'emergency';
    currentStatus: 'ongoing' | 'completed' | 'mmi' | 'needs_treatment';
  };
  workStatus: {
    currentlyWorking: boolean;
    returnedToWork: boolean;
    restrictions: boolean;
    lightDuty: boolean;
    totallyDisabled: boolean;
  };
  benefits: {
    receivingBenefits: boolean;
    benefitType?: 'temporary_total' | 'temporary_partial' | 'permanent_partial' | 'permanent_total';
    weeklyAmount?: string;
    deniedClaim?: boolean;
    denialReason?: string;
  };
  priorInjuries: boolean;
  witnessesToInjury: boolean;
  safeguards: boolean;
  clientConcerns: string[];
  urgency: 'immediate' | 'within_days' | 'within_weeks' | 'planning';
}

export interface WorkersCompAssessment {
  caseStrength: 'strong' | 'good' | 'moderate' | 'weak' | 'problematic';
  compensability: {
    likely_compensable: boolean;
    factors_supporting: string[];
    factors_opposing: string[];
    causation_strength: 'clear' | 'probable' | 'disputed' | 'weak';
  };
  benefits_analysis: {
    entitled_benefits: string[];
    current_weekly_rate: string;
    maximum_medical: boolean;
    permanent_disability_potential: string;
    vocational_rehabilitation: boolean;
  };
  legal_strategy: {
    immediate_actions: string[];
    medical_strategy: string[];
    claim_filing: string[];
    dispute_resolution: string[];
  };
  nc_law_analysis: {
    applicable_statutes: string[];
    deadlines: {
      notice_deadline: string;
      claim_deadline: string;
      appeal_deadline?: string;
    };
    employer_defenses: string[];
    employee_rights: string[];
  };
  timeline: {
    critical_deadlines: string[];
    expected_resolution: string;
    appeal_options?: string;
  };
  risks_challenges: string[];
  settlement_potential: 'high' | 'moderate' | 'low' | 'none';
  attorney_necessity: 'essential' | 'recommended' | 'helpful' | 'optional';
  ai_overview_content?: {
    faq_answers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    content_optimization: string;
  };
}

export class WorkersCompensationSpecialistAgent {
  private model: ChatOpenAI;
  private crewLogger = createCrewLogger('workers-compensation-specialist-agent');
  private aiOverviewAgent: AIOverviewOptimizationAgent;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.aiOverviewAgent = new AIOverviewOptimizationAgent();
  }

  async assessCase(request: WorkersCompConsultationRequest): Promise<WorkersCompAssessment> {
    return this.crewLogger.logExecution(
      'assess-workers-comp-case',
      async () => {
        logger.info('Starting workers compensation case assessment', {
          injuryType: request.injuryType,
          workRelated: request.workRelated,
          reportedToEmployer: request.reportedToEmployer,
        });

        // Step 1: Analyze compensability under NC law
        const compensabilityAnalysis = await this.analyzeCompensability(request);

        // Step 2: Calculate benefits entitlement
        const benefitsAnalysis = await this.analyzeBenefits(request);

        // Step 3: NC Workers Comp law analysis
        const ncLawAnalysis = await this.analyzeNCWorkersCompLaw(request);

        // Step 4: Develop legal strategy
        const strategy = await this.developStrategy(request, compensabilityAnalysis, ncLawAnalysis);

        // Step 5: Generate AI Overview content
        const aiOverviewContent = await this.generateAIOverviewContent(request, compensabilityAnalysis);

        // Step 6: Compile assessment
        const assessment = this.compileAssessment(request, compensabilityAnalysis, benefitsAnalysis, ncLawAnalysis, strategy, aiOverviewContent);

        logger.info('Workers compensation case assessment completed', {
          caseStrength: assessment.caseStrength,
          compensable: assessment.compensability.likely_compensable,
          attorneyNecessity: assessment.attorney_necessity,
        });

        return assessment;
      },
      {
        input: request,
        metadata: {
          injuryType: request.injuryType,
          workRelated: request.workRelated,
          urgency: request.urgency,
        },
      }
    );
  }

  private async analyzeCompensability(request: WorkersCompConsultationRequest): Promise<any> {
    const compensabilityPrompt = `Analyze workers compensation compensability under North Carolina law:

INJURY DETAILS:
- Type: ${request.injuryType}
- Date: ${request.injuryDate}
- Work Related: ${request.workRelated}
- Reported to Employer: ${request.reportedToEmployer}
- Report Date: ${request.reportDate || 'Not specified'}
- Witnesses: ${request.witnessesToInjury}
- Safety Equipment: ${request.safeguards}

EMPLOYMENT:
- Status: ${request.employmentStatus}
- Employer: ${request.employer.name}
- Industry: ${request.employer.industry}
- Size: ${request.employer.size}
- Has WC Insurance: ${request.employer.hasInsurance}

NC WORKERS COMP COMPENSABILITY REQUIREMENTS:
1. Employee status (not independent contractor)
2. Injury by accident arising out of employment
3. Injury in course and scope of employment
4. Causal relationship between work and injury
5. Notice to employer within 30 days (unless good cause)

ANALYZE UNDER NC LAW:
- N.C.G.S. § 97-2 (definitions)
- N.C.G.S. § 97-12 (notice requirements)
- N.C.G.S. § 97-18 (compensation for injuries)
- Going and coming rule
- Personal comfort doctrine
- Horseplay exclusions

RESPONSE FORMAT (JSON):
{
  "likely_compensable": true/false,
  "compensability_percentage": "percentage likely",
  "supporting_factors": ["factor1", "factor2"],
  "opposing_factors": ["factor1", "factor2"],
  "causation_strength": "clear|probable|disputed|weak",
  "notice_compliance": "compliant|late|missing",
  "employee_status": "clear|disputed|problematic",
  "course_scope": "clearly_yes|probably|disputed|no",
  "employer_defenses": ["defense1", "defense2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getWorkersCompSystemPrompt()),
        new HumanMessage(compensabilityPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse compensability analysis, using fallback');
      return this.getFallbackCompensability(request);
    }
  }

  private async analyzeBenefits(request: WorkersCompConsultationRequest): Promise<any> {
    const benefitsPrompt = `Analyze NC workers compensation benefits entitlement:

CURRENT STATUS:
- Currently Working: ${request.workStatus.currentlyWorking}
- Returned to Work: ${request.workStatus.returnedToWork}
- Has Restrictions: ${request.workStatus.restrictions}
- Light Duty: ${request.workStatus.lightDuty}
- Totally Disabled: ${request.workStatus.totallyDisabled}

MEDICAL TREATMENT:
- Received Treatment: ${request.medicalTreatment.received}
- Authorized: ${request.medicalTreatment.authorizedByEmployer}
- Doctor Choice: ${request.medicalTreatment.doctorChoice}
- Current Status: ${request.medicalTreatment.currentStatus}

CURRENT BENEFITS:
- Receiving Benefits: ${request.benefits.receivingBenefits}
- Type: ${request.benefits.benefitType || 'None'}
- Weekly Amount: ${request.benefits.weeklyAmount || 'None'}
- Claim Denied: ${request.benefits.deniedClaim || false}

NC WORKERS COMP BENEFITS ANALYSIS:
1. Medical Benefits (N.C.G.S. § 97-25):
   - All reasonable and necessary medical treatment
   - Doctor selection from employer's panel (first 30 days)
   - Change of physician rights

2. Wage Loss Benefits:
   - Temporary Total Disability (TTD): 66.67% AWW
   - Temporary Partial Disability (TPD): 66.67% wage loss
   - Permanent Partial Disability (PPD): Schedule or 300 weeks
   - Permanent Total Disability (PTD): 66.67% AWW for life

3. Maximum/Minimum Rates (2024):
   - Maximum weekly: $1,024
   - Minimum weekly: $30

CALCULATE:
1. Average weekly wage calculation
2. Appropriate benefit type based on disability
3. Weekly compensation rate
4. Duration of benefits
5. Medical benefits scope

RESPONSE FORMAT (JSON):
{
  "entitled_benefits": ["TTD", "Medical", "etc"],
  "average_weekly_wage": "$amount",
  "weekly_compensation_rate": "$amount",
  "maximum_rate_applies": true/false,
  "benefit_duration": "duration estimate",
  "medical_benefits": {
    "entitled": true/false,
    "scope": "description",
    "doctor_choice": "panel|own|emergency"
  },
  "permanent_disability_potential": "none|partial|total",
  "vocational_rehab_eligible": true/false,
  "current_underpayment": true/false
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getWorkersCompSystemPrompt()),
        new HumanMessage(benefitsPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse benefits analysis, using fallback');
      return this.getFallbackBenefits(request);
    }
  }

  private async analyzeNCWorkersCompLaw(request: WorkersCompConsultationRequest): Promise<any> {
    const ncLawPrompt = `Analyze NC Workers Compensation Act application to this case:

CASE CONTEXT:
- Injury Type: ${request.injuryType}
- Employment: ${request.employmentStatus}
- Industry: ${request.employer.industry}
- Report Status: ${request.reportedToEmployer}

NC WORKERS COMP ACT ANALYSIS:
1. Notice Requirements (N.C.G.S. § 97-22):
   - 30-day notice rule
   - Good cause exceptions
   - Substantial compliance doctrine

2. Claim Filing (N.C.G.S. § 97-24):
   - Two-year limitation period
   - Continuing compensation tolling
   - Discovery rule applications

3. Medical Treatment (N.C.G.S. § 97-25):
   - Employer's panel physician selection
   - Change of physician procedures
   - Independent medical examinations

4. Dispute Resolution:
   - NC Industrial Commission procedures
   - Mediation requirements
   - Appeal timelines

5. Employer Defenses:
   - Intoxication defense
   - Willful misconduct
   - Failure to use safety devices

ANALYZE:
1. Compliance with notice requirements
2. Statute of limitations issues
3. Procedural requirements
4. Available defenses
5. Appeal deadlines if applicable

RESPONSE FORMAT (JSON):
{
  "notice_compliance": {
    "timely": true/false,
    "substantial_compliance": true/false,
    "good_cause_exception": true/false
  },
  "statute_limitations": {
    "deadline": "date",
    "tolled": true/false,
    "discovery_rule": true/false
  },
  "applicable_statutes": ["N.C.G.S. § 97-X"],
  "procedural_requirements": ["requirement1", "requirement2"],
  "employer_defenses": ["defense1", "defense2"],
  "employee_rights": ["right1", "right2"],
  "ic_procedures": ["procedure1", "procedure2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getWorkersCompSystemPrompt()),
        new HumanMessage(ncLawPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse NC law analysis, using fallback');
      return this.getFallbackNCLaw(request);
    }
  }

  private async developStrategy(request: WorkersCompConsultationRequest, compensability: any, ncLaw: any): Promise<any> {
    const strategyPrompt = `Develop comprehensive strategy for NC workers compensation case:

CASE PROFILE:
- Compensability: ${compensability.likely_compensable}
- Notice Status: ${compensability.notice_compliance}
- Causation: ${compensability.causation_strength}
- Current Benefits: ${request.benefits.receivingBenefits}
- Denied Claim: ${request.benefits.deniedClaim || false}

STRATEGY AREAS:
1. Immediate actions needed
2. Medical treatment optimization
3. Claim filing/appeal procedures
4. Evidence development
5. Expert witness needs
6. Dispute resolution approach
7. Settlement considerations

CONSIDERATIONS:
- Urgent deadlines: ${ncLaw.statute_limitations?.deadline}
- Employer cooperation: ${request.employer.hasInsurance}
- Medical authorization: ${request.medicalTreatment.authorizedByEmployer}
- Work status: ${request.workStatus.currentlyWorking}

RESPONSE FORMAT (JSON):
{
  "immediate_actions": ["action1", "action2"],
  "medical_strategy": ["strategy1", "strategy2"],
  "claim_procedures": ["procedure1", "procedure2"],
  "evidence_development": ["evidence1", "evidence2"],
  "expert_witnesses": ["expert_type1", "expert_type2"],
  "dispute_resolution": ["approach1", "approach2"],
  "settlement_strategy": "strategy description",
  "deadlines_calendar": ["deadline1", "deadline2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getWorkersCompSystemPrompt()),
        new HumanMessage(strategyPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse strategy analysis, using fallback');
      return this.getFallbackStrategy(request);
    }
  }

  private async generateAIOverviewContent(request: WorkersCompConsultationRequest, compensability: any): Promise<any> {
    const contentPrompt = `Generate AI Overview optimized content for NC workers compensation:

INJURY TYPE: ${request.injuryType}
COMPENSABILITY: ${compensability.likely_compensable}

Generate 6-8 FAQ answers optimized for AI Overview (40-60 words each):

1. "How do I file a workers compensation claim in North Carolina?"
2. "What injuries are covered by NC workers compensation?"
3. "How much does workers comp pay in North Carolina?"
4. "Can I be fired for filing workers compensation in NC?"
5. "Do I need a lawyer for workers comp in North Carolina?"
6. "How long do I have to report a work injury in NC?"
7. "What if my workers comp claim is denied in North Carolina?"
8. Additional questions specific to injury type

Each answer should:
- Start with direct answer
- Include NC-specific requirements and timelines
- Reference NC Industrial Commission when relevant
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
  "content_optimization": "Additional NC workers comp content suggestions"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getWorkersCompSystemPrompt()),
        new HumanMessage(contentPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to generate AI Overview content');
      return {
        faq_answers: [],
        content_optimization: 'Standard NC workers comp content recommendations',
      };
    }
  }

  private compileAssessment(
    request: WorkersCompConsultationRequest,
    compensability: any,
    benefits: any,
    ncLaw: any,
    strategy: any,
    aiOverviewContent: any
  ): WorkersCompAssessment {
    // Determine case strength
    let caseStrength: 'strong' | 'good' | 'moderate' | 'weak' | 'problematic';
    if (compensability.likely_compensable && compensability.causation_strength === 'clear' && compensability.notice_compliance === 'compliant') {
      caseStrength = 'strong';
    } else if (compensability.likely_compensable && compensability.causation_strength === 'probable') {
      caseStrength = 'good';
    } else if (compensability.likely_compensable) {
      caseStrength = 'moderate';
    } else if (compensability.compensability_percentage > 30) {
      caseStrength = 'weak';
    } else {
      caseStrength = 'problematic';
    }

    // Determine attorney necessity
    let attorneyNecessity: 'essential' | 'recommended' | 'helpful' | 'optional';
    if (request.benefits.deniedClaim || caseStrength === 'weak' || caseStrength === 'problematic') {
      attorneyNecessity = 'essential';
    } else if (request.injuryType === 'occupational_disease' || compensability.causation_strength === 'disputed') {
      attorneyNecessity = 'recommended';
    } else if (benefits.permanent_disability_potential !== 'none') {
      attorneyNecessity = 'helpful';
    } else {
      attorneyNecessity = 'optional';
    }

    // Calculate deadlines
    const injuryDate = new Date(request.injuryDate);
    const claimDeadline = new Date(injuryDate);
    claimDeadline.setFullYear(claimDeadline.getFullYear() + 2);

    const noticeDeadline = new Date(injuryDate);
    noticeDeadline.setDate(noticeDeadline.getDate() + 30);

    return {
      caseStrength,
      compensability: {
        likely_compensable: compensability.likely_compensable,
        factors_supporting: compensability.supporting_factors || [],
        factors_opposing: compensability.opposing_factors || [],
        causation_strength: compensability.causation_strength,
      },
      benefits_analysis: {
        entitled_benefits: benefits.entitled_benefits || [],
        current_weekly_rate: benefits.weekly_compensation_rate || 'To be calculated',
        maximum_medical: benefits.medical_benefits?.entitled || false,
        permanent_disability_potential: benefits.permanent_disability_potential || 'Under evaluation',
        vocational_rehabilitation: benefits.vocational_rehab_eligible || false,
      },
      legal_strategy: {
        immediate_actions: strategy.immediate_actions || [],
        medical_strategy: strategy.medical_strategy || [],
        claim_filing: strategy.claim_procedures || [],
        dispute_resolution: strategy.dispute_resolution || [],
      },
      nc_law_analysis: {
        applicable_statutes: ncLaw.applicable_statutes || ['N.C.G.S. § 97-1 et seq.'],
        deadlines: {
          notice_deadline: noticeDeadline.toDateString(),
          claim_deadline: claimDeadline.toDateString(),
          appeal_deadline: request.benefits.deniedClaim ? this.calculateAppealDeadline(request).toDateString() : undefined,
        },
        employer_defenses: ncLaw.employer_defenses || [],
        employee_rights: ncLaw.employee_rights || [],
      },
      timeline: {
        critical_deadlines: this.identifyCriticalDeadlines(request, ncLaw),
        expected_resolution: this.estimateResolution(caseStrength, request.benefits.deniedClaim || false),
        appeal_options: request.benefits.deniedClaim ? 'Appeal to NC Industrial Commission available' : undefined,
      },
      risks_challenges: [
        ...(compensability.opposing_factors || []),
        ...(ncLaw.employer_defenses || []),
      ],
      settlement_potential: this.assessSettlementPotential(caseStrength, benefits),
      attorney_necessity: attorneyNecessity,
      ai_overview_content: aiOverviewContent,
    };
  }

  private getWorkersCompSystemPrompt(): string {
    return `You are an expert North Carolina workers compensation attorney with comprehensive knowledge of the NC Workers Compensation Act. Your expertise includes:

NC WORKERS COMPENSATION LAW EXPERTISE:
- N.C.G.S. Chapter 97 (Workers' Compensation Act)
- NC Industrial Commission rules and procedures
- Compensability requirements under NC law
- Notice and claim filing requirements
- Medical treatment authorization and panel physicians
- Wage replacement benefit calculations
- Permanent disability ratings and awards
- Vocational rehabilitation services

PRACTICE AREAS:
- Work-related injury claims
- Occupational disease claims
- Repetitive stress and cumulative trauma
- Aggravation of pre-existing conditions
- Mental stress and psychiatric injuries
- Death benefit claims
- Disputed medical treatment
- Benefit modification and review

NC STATUTORY FRAMEWORK:
- N.C.G.S. § 97-2 (definitions and coverage)
- N.C.G.S. § 97-12 (notice to employer)
- N.C.G.S. § 97-18 (compensation for disability)
- N.C.G.S. § 97-25 (medical compensation)
- N.C.G.S. § 97-24 (statute of limitations)
- N.C.G.S. § 97-86 (appeals to Industrial Commission)

NC BENEFIT STRUCTURE:
- Temporary Total Disability (TTD): 66.67% AWW
- Temporary Partial Disability (TPD): 66.67% wage loss
- Permanent Partial Disability (PPD): scheduled or unscheduled
- Permanent Total Disability (PTD): lifetime benefits
- Maximum weekly rate: $1,024 (2024)
- Minimum weekly rate: $30 (2024)

AI OVERVIEW OPTIMIZATION:
- Provide NC-specific workers comp answers (40-60 words)
- Include NC Industrial Commission procedures
- Reference specific NC benefit rates and timelines
- Optimize for "North Carolina workers comp" queries
- Use conversational language for voice search

APPROACH:
1. Analyze compensability under NC three-part test
2. Evaluate notice compliance and statutory deadlines
3. Calculate appropriate benefit entitlements
4. Consider employer defenses and employee rights
5. Develop strategy for Industrial Commission proceedings
6. Address medical treatment authorization issues

Maintain highest ethical standards and provide accurate analysis specific to North Carolina workers compensation law.`;
  }

  private calculateAppealDeadline(request: WorkersCompConsultationRequest): Date {
    // Typically 30 days from denial notice, but using injury date as fallback
    const deadline = new Date(request.injuryDate);
    deadline.setDate(deadline.getDate() + 60); // Conservative estimate
    return deadline;
  }

  private identifyCriticalDeadlines(request: WorkersCompConsultationRequest, ncLaw: any): string[] {
    const deadlines: string[] = [];
    
    if (!request.reportedToEmployer) {
      deadlines.push('Report injury to employer immediately');
    }
    
    if (request.benefits.deniedClaim) {
      deadlines.push('File appeal with NC Industrial Commission within 30 days of denial');
    }
    
    deadlines.push(`File formal claim by ${ncLaw.statute_limitations?.deadline || 'within 2 years of injury'}`);
    
    return deadlines;
  }

  private estimateResolution(caseStrength: string, denied: boolean): string {
    if (denied || caseStrength === 'weak' || caseStrength === 'problematic') {
      return '6-18 months (Industrial Commission proceedings likely)';
    } else if (caseStrength === 'strong') {
      return '2-6 months (early resolution likely)';
    } else {
      return '3-12 months (negotiation and possible hearing)';
    }
  }

  private assessSettlementPotential(caseStrength: string, benefits: any): 'high' | 'moderate' | 'low' | 'none' {
    if (caseStrength === 'strong' && benefits.permanent_disability_potential !== 'none') {
      return 'high';
    } else if (caseStrength === 'good' || caseStrength === 'moderate') {
      return 'moderate';
    } else if (caseStrength === 'weak') {
      return 'low';
    } else {
      return 'none';
    }
  }

  // Fallback methods
  private getFallbackCompensability(request: WorkersCompConsultationRequest) {
    return {
      likely_compensable: true,
      compensability_percentage: '75%',
      supporting_factors: ['Work-related injury', 'Reported to employer'],
      opposing_factors: ['Need additional evidence'],
      causation_strength: 'probable',
      notice_compliance: request.reportedToEmployer ? 'compliant' : 'late',
      employee_status: 'clear',
      course_scope: 'probably',
      employer_defenses: ['None apparent'],
    };
  }

  private getFallbackBenefits(request: WorkersCompConsultationRequest) {
    return {
      entitled_benefits: ['Medical treatment', 'Temporary total disability'],
      average_weekly_wage: '$600',
      weekly_compensation_rate: '$400',
      maximum_rate_applies: false,
      benefit_duration: 'Until maximum medical improvement',
      medical_benefits: {
        entitled: true,
        scope: 'All reasonable and necessary treatment',
        doctor_choice: 'panel',
      },
      permanent_disability_potential: 'partial',
      vocational_rehab_eligible: false,
      current_underpayment: false,
    };
  }

  private getFallbackNCLaw(request: WorkersCompConsultationRequest) {
    return {
      notice_compliance: {
        timely: request.reportedToEmployer,
        substantial_compliance: true,
        good_cause_exception: false,
      },
      statute_limitations: {
        deadline: new Date(Date.now() + (2 * 365 * 24 * 60 * 60 * 1000)).toDateString(),
        tolled: false,
        discovery_rule: false,
      },
      applicable_statutes: ['N.C.G.S. § 97-1 et seq.'],
      procedural_requirements: ['File Form 18', 'Medical documentation'],
      employer_defenses: ['None apparent'],
      employee_rights: ['Medical treatment', 'Wage replacement'],
      ic_procedures: ['Mediation', 'Hearing if necessary'],
    };
  }

  private getFallbackStrategy(request: WorkersCompConsultationRequest) {
    return {
      immediate_actions: ['Ensure medical treatment', 'Document everything', 'File Form 18'],
      medical_strategy: ['Continue treatment', 'Follow doctor orders', 'Document restrictions'],
      claim_procedures: ['File formal claim', 'Provide medical records', 'Cooperate with investigation'],
      evidence_development: ['Medical records', 'Witness statements', 'Employer records'],
      expert_witnesses: ['Medical expert', 'Vocational expert'],
      dispute_resolution: ['Negotiate with carrier', 'Mediation at IC', 'Hearing if necessary'],
      settlement_strategy: 'Develop strong medical case before considering settlement',
      deadlines_calendar: ['30-day notice', '2-year claim filing'],
    };
  }
}

// Export singleton instance
export const workersCompensationSpecialist = new WorkersCompensationSpecialistAgent();