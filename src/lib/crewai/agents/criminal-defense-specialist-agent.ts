/**
 * Criminal Defense Specialist Agent (North Carolina)
 * Expert in NC criminal law with AI Overview optimization
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { AIOverviewOptimizationAgent } from './ai-overview-optimization-agent';

export interface CriminalDefenseConsultationRequest {
  chargeType: 'dui_dwi' | 'drug_charges' | 'assault' | 'domestic_violence' | 'theft' | 'white_collar' | 'traffic_violations' | 'probation_violation' | 'expungement' | 'other';
  chargeLevel: 'infraction' | 'misdemeanor' | 'felony' | 'federal';
  chargeDate: string;
  arrestDate?: string;
  currentStatus: 'arrested' | 'charged' | 'released_on_bond' | 'in_custody' | 'awaiting_trial' | 'post_conviction';
  priorRecord: boolean;
  priorConvictions?: string[];
  bondStatus: 'not_set' | 'cash_bond' | 'secured_bond' | 'unsecured_bond' | 'released_or' | 'denied_bond';
  bondAmount?: string;
  courtDate?: string;
  courtLocation: string; // NC county
  circumstances: {
    alcoholInvolved: boolean;
    drugsInvolved: boolean;
    weaponInvolved: boolean;
    injuryOccurred: boolean;
    propertyDamage: boolean;
    cooperatedWithPolice: boolean;
    hasWitnesses: boolean;
  };
  evidence: {
    policeReport: boolean;
    breathalyzer: boolean;
    bloodTest: boolean;
    fieldSobrietyTest: boolean;
    videofootage: boolean;
    photographs: boolean;
    searchConducted: boolean;
  };
  employmentConcerns: boolean;
  licenseConcerns: boolean;
  immigrationConcerns: boolean;
  clientGoals: string[];
  urgency: 'immediate' | 'within_days' | 'within_weeks' | 'planning';
}

export interface CriminalDefenseAssessment {
  caseStrength: 'strong_defense' | 'good_defense' | 'moderate_defense' | 'challenging' | 'very_difficult';
  charge_analysis: {
    formal_charges: string[];
    potential_penalties: {
      fine_range: string;
      jail_time: string;
      probation_length: string;
      license_impact: string;
      other_consequences: string[];
    };
    enhancement_factors: string[];
    mitigating_factors: string[];
  };
  defense_strategy: {
    primary_defenses: string[];
    evidence_challenges: string[];
    procedural_issues: string[];
    plea_options: string[];
    trial_strategy: string[];
  };
  nc_law_analysis: {
    applicable_statutes: string[];
    sentencing_guidelines: string[];
    court_procedures: string[];
    appeal_options: string[];
  };
  timeline: {
    next_court_date: string;
    pretrial_deadlines: string[];
    trial_timeline: string;
    resolution_estimate: string;
  };
  consequences: {
    criminal_penalties: string[];
    collateral_consequences: string[];
    employment_impact: string[];
    license_impact: string[];
    immigration_impact?: string[];
  };
  recommendations: {
    immediate_actions: string[];
    evidence_preservation: string[];
    court_preparation: string[];
    mitigation_strategies: string[];
  };
  expungement_eligibility?: {
    eligible: boolean;
    waiting_period: string;
    requirements: string[];
  };
  attorney_necessity: 'essential' | 'strongly_recommended' | 'recommended' | 'helpful';
  ai_overview_content?: {
    faq_answers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    content_optimization: string;
  };
}

export class CriminalDefenseSpecialistAgent {
  private model: ChatOpenAI;
  private crewLogger = createCrewLogger('criminal-defense-specialist-agent');
  private aiOverviewAgent: AIOverviewOptimizationAgent;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.aiOverviewAgent = new AIOverviewOptimizationAgent();
  }

  async assessCase(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAssessment> {
    return this.crewLogger.logExecution(
      'assess-criminal-defense-case',
      async () => {
        logger.info('Starting criminal defense case assessment', {
          chargeType: request.chargeType,
          chargeLevel: request.chargeLevel,
          currentStatus: request.currentStatus,
          courtLocation: request.courtLocation,
        });

        // Step 1: Analyze charges and potential penalties
        const chargeAnalysis = await this.analyzeCharges(request);

        // Step 2: Develop defense strategy
        const defenseStrategy = await this.developDefenseStrategy(request, chargeAnalysis);

        // Step 3: NC law analysis
        const ncLawAnalysis = await this.analyzeNCCriminalLaw(request);

        // Step 4: Assess consequences and collateral effects
        const consequenceAnalysis = await this.assessConsequences(request, chargeAnalysis);

        // Step 5: Generate AI Overview content
        const aiOverviewContent = await this.generateAIOverviewContent(request, chargeAnalysis);

        // Step 6: Compile assessment
        const assessment = this.compileAssessment(request, chargeAnalysis, defenseStrategy, ncLawAnalysis, consequenceAnalysis, aiOverviewContent);

        logger.info('Criminal defense case assessment completed', {
          caseStrength: assessment.caseStrength,
          chargeLevel: request.chargeLevel,
          attorneyNecessity: assessment.attorney_necessity,
        });

        return assessment;
      },
      {
        input: request,
        metadata: {
          chargeType: request.chargeType,
          chargeLevel: request.chargeLevel,
          urgency: request.urgency,
        },
      }
    );
  }

  private async analyzeCharges(request: CriminalDefenseConsultationRequest): Promise<any> {
    const chargePrompt = `Analyze NC criminal charges and potential penalties:

CHARGE DETAILS:
- Type: ${request.chargeType}
- Level: ${request.chargeLevel}
- Date: ${request.chargeDate}
- Court: ${request.courtLocation}
- Prior Record: ${request.priorRecord}
- Prior Convictions: ${request.priorConvictions?.join(', ') || 'None'}

CIRCUMSTANCES:
- Alcohol: ${request.circumstances.alcoholInvolved}
- Drugs: ${request.circumstances.drugsInvolved}
- Weapon: ${request.circumstances.weaponInvolved}
- Injury: ${request.circumstances.injuryOccurred}
- Property Damage: ${request.circumstances.propertyDamage}

NC CRIMINAL LAW ANALYSIS:
1. Formal charges likely to be filed
2. Penalty ranges under NC General Statutes
3. Enhancement factors (habitual felony, etc.)
4. Mitigating factors available
5. Sentencing considerations

CHARGE-SPECIFIC ANALYSIS:
- DUI/DWI: N.C.G.S. § 20-138.1, sentencing levels, license implications
- Drug charges: N.C.G.S. § 90-95, trafficking thresholds, drug treatment court
- Assault: N.C.G.S. § 14-33, degrees of assault, domestic violence enhancements
- Theft: N.C.G.S. § 14-72, value thresholds, habitual larceny
- White collar: Embezzlement, fraud, obtaining property by false pretenses

RESPONSE FORMAT (JSON):
{
  "formal_charges": ["N.C.G.S. § X", "charge description"],
  "charge_classification": "misdemeanor|felony class",
  "penalty_ranges": {
    "fine_min": "$amount",
    "fine_max": "$amount", 
    "jail_min": "time",
    "jail_max": "time"
  },
  "enhancement_factors": ["factor1", "factor2"],
  "mitigating_factors": ["factor1", "factor2"],
  "license_implications": "description",
  "prior_record_impact": "impact description"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getCriminalDefenseSystemPrompt()),
        new HumanMessage(chargePrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse charge analysis, using fallback');
      return this.getFallbackChargeAnalysis(request);
    }
  }

  private async developDefenseStrategy(request: CriminalDefenseConsultationRequest, chargeAnalysis: any): Promise<any> {
    const strategyPrompt = `Develop comprehensive defense strategy for NC criminal case:

CASE PROFILE:
- Charges: ${chargeAnalysis.formal_charges?.join(', ') || request.chargeType}
- Level: ${request.chargeLevel}
- Status: ${request.currentStatus}
- Bond: ${request.bondStatus}

EVIDENCE SITUATION:
- Police Report: ${request.evidence.policeReport}
- Breathalyzer: ${request.evidence.breathalyzer}
- Blood Test: ${request.evidence.bloodTest}
- Field Sobriety: ${request.evidence.fieldSobrietyTest}
- Video: ${request.evidence.videofootage}
- Search Conducted: ${request.evidence.searchConducted}
- Cooperated: ${request.circumstances.cooperatedWithPolice}

NC CRIMINAL DEFENSE STRATEGIES:
1. Constitutional challenges (4th, 5th, 6th Amendment)
2. Procedural defenses (Miranda, illegal search/seizure)
3. Substantive defenses (self-defense, necessity, duress)
4. Evidence suppression motions
5. Plea negotiations and alternatives
6. Trial strategies

CASE-SPECIFIC DEFENSES:
- DUI: Field sobriety reliability, breathalyzer calibration, rising BAC
- Drug cases: Search and seizure, possession vs. intent, constructive possession
- Assault: Self-defense, defense of others, lack of intent
- Theft: Lack of intent to steal, ownership claims, value disputes

DEVELOP STRATEGY:
1. Primary defense theories
2. Evidence challenges and suppression motions
3. Procedural issues to raise
4. Plea negotiation approach
5. Trial strategy if needed

RESPONSE FORMAT (JSON):
{
  "primary_defenses": ["defense1", "defense2"],
  "evidence_challenges": ["challenge1", "challenge2"],
  "suppression_motions": ["motion1", "motion2"],
  "constitutional_issues": ["issue1", "issue2"],
  "plea_strategies": ["strategy1", "strategy2"],
  "trial_approach": ["approach1", "approach2"],
  "expert_witnesses": ["expert_type1", "expert_type2"],
  "investigation_needs": ["need1", "need2"]
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getCriminalDefenseSystemPrompt()),
        new HumanMessage(strategyPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse defense strategy, using fallback');
      return this.getFallbackDefenseStrategy(request);
    }
  }

  private async analyzeNCCriminalLaw(request: CriminalDefenseConsultationRequest): Promise<any> {
    const ncLawPrompt = `Analyze NC criminal law and procedures for this case:

CASE TYPE: ${request.chargeType}
CHARGE LEVEL: ${request.chargeLevel}
COURT LOCATION: ${request.courtLocation}

NC CRIMINAL LAW ANALYSIS:
1. Applicable NC General Statutes
2. Sentencing guidelines and structured sentencing
3. Court procedures and deadlines
4. Appeal options and standards
5. Expungement eligibility

KEY NC CRIMINAL LAW AREAS:
- N.C.G.S. Chapter 14 (Criminal Law)
- N.C.G.S. Chapter 15A (Criminal Procedure)
- N.C.G.S. Chapter 20 (Motor Vehicle Law for DWI)
- Structured Sentencing Act (N.C.G.S. § 15A-1340)
- Habitual Felon Act (N.C.G.S. § 14-7.1)

PROCEDURAL REQUIREMENTS:
- Discovery deadlines
- Motion filing requirements
- Jury trial rights
- Appeal timelines
- Bond modification procedures

SENTENCING CONSIDERATIONS:
- Prior Record Level (PRL) calculation
- Offense Class determination
- Mitigating and aggravating factors
- Community service and probation options
- Alternative sentencing programs

RESPONSE FORMAT (JSON):
{
  "applicable_statutes": ["N.C.G.S. § X"],
  "offense_class": "class description",
  "sentencing_range": "range based on PRL",
  "court_procedures": ["procedure1", "procedure2"],
  "key_deadlines": ["deadline1", "deadline2"],
  "appeal_options": ["option1", "option2"],
  "alternative_programs": ["program1", "program2"],
  "expungement_potential": "analysis"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getCriminalDefenseSystemPrompt()),
        new HumanMessage(ncLawPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse NC law analysis, using fallback');
      return this.getFallbackNCLaw(request);
    }
  }

  private async assessConsequences(request: CriminalDefenseConsultationRequest, chargeAnalysis: any): Promise<any> {
    const consequencePrompt = `Assess all consequences of NC criminal charges:

CHARGES: ${chargeAnalysis.formal_charges?.join(', ') || request.chargeType}
CLIENT CONCERNS:
- Employment: ${request.employmentConcerns}
- License: ${request.licenseConcerns}
- Immigration: ${request.immigrationConcerns}

NC CRIMINAL CONSEQUENCES ANALYSIS:
1. Direct criminal penalties
2. Collateral consequences
3. Professional license impacts
4. Employment consequences
5. Immigration implications
6. Civil consequences

SPECIFIC CONSEQUENCES:
- DUI: License suspension, ignition interlock, insurance impacts
- Drug charges: Federal aid eligibility, professional licenses
- Assault: Firearms restrictions, protective orders
- Theft: Professional licenses, employment screening
- Domestic violence: Firearms restrictions, custody impacts

LONG-TERM IMPACTS:
- Background check implications
- Professional licensing effects
- Federal consequences (immigration, federal employment)
- Civil liability exposure
- Expungement possibilities

RESPONSE FORMAT (JSON):
{
  "criminal_penalties": ["penalty1", "penalty2"],
  "license_suspension": "duration if applicable",
  "employment_impacts": ["impact1", "impact2"],
  "professional_licenses": ["effect1", "effect2"],
  "immigration_consequences": ["consequence1", "consequence2"],
  "civil_consequences": ["consequence1", "consequence2"],
  "federal_implications": ["implication1", "implication2"],
  "expungement_eligible": true/false,
  "expungement_timeline": "timeframe"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getCriminalDefenseSystemPrompt()),
        new HumanMessage(consequencePrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to parse consequence analysis, using fallback');
      return this.getFallbackConsequenceAnalysis(request);
    }
  }

  private async generateAIOverviewContent(request: CriminalDefenseConsultationRequest, chargeAnalysis: any): Promise<any> {
    const contentPrompt = `Generate AI Overview optimized content for NC criminal defense:

CHARGE TYPE: ${request.chargeType}
CHARGE LEVEL: ${request.chargeLevel}
LOCATION: ${request.courtLocation}

Generate 6-8 FAQ answers optimized for AI Overview (40-60 words each):

1. "What should I do if arrested for [charge type] in NC?"
2. "How much does a criminal defense lawyer cost in North Carolina?"
3. "What are the penalties for [charge type] in NC?"
4. "Can I get my [charge type] expunged in North Carolina?"
5. "Do I need a lawyer for [charge type] charges in NC?"
6. "How long does a criminal case take in North Carolina?"
7. "What happens at arraignment in NC?"
8. Additional questions specific to charge type

Each answer should:
- Start with direct answer
- Include NC-specific law and procedures
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
  "content_optimization": "Additional NC criminal defense content suggestions"
}`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.getCriminalDefenseSystemPrompt()),
        new HumanMessage(contentPrompt),
      ]);

      return JSON.parse(response.content.toString());
    } catch (error) {
      logger.warn('Failed to generate AI Overview content');
      return {
        faq_answers: [],
        content_optimization: 'Standard NC criminal defense content recommendations',
      };
    }
  }

  private compileAssessment(
    request: CriminalDefenseConsultationRequest,
    chargeAnalysis: any,
    defenseStrategy: any,
    ncLaw: any,
    consequences: any,
    aiOverviewContent: any
  ): CriminalDefenseAssessment {
    // Determine case strength
    const strengthFactors = [
      defenseStrategy.primary_defenses?.length > 2,
      defenseStrategy.evidence_challenges?.length > 1,
      !request.priorRecord,
      request.circumstances.cooperatedWithPolice,
      !request.circumstances.weaponInvolved,
      !request.circumstances.injuryOccurred,
    ].filter(Boolean).length;

    let caseStrength: 'strong_defense' | 'good_defense' | 'moderate_defense' | 'challenging' | 'very_difficult';
    if (strengthFactors >= 5) caseStrength = 'strong_defense';
    else if (strengthFactors >= 4) caseStrength = 'good_defense';
    else if (strengthFactors >= 3) caseStrength = 'moderate_defense';
    else if (strengthFactors >= 2) caseStrength = 'challenging';
    else caseStrength = 'very_difficult';

    // Determine attorney necessity
    let attorneyNecessity: 'essential' | 'strongly_recommended' | 'recommended' | 'helpful';
    if (request.chargeLevel === 'felony' || request.currentStatus === 'in_custody') {
      attorneyNecessity = 'essential';
    } else if (request.chargeLevel === 'misdemeanor' && request.priorRecord) {
      attorneyNecessity = 'strongly_recommended';
    } else if (request.chargeLevel === 'misdemeanor') {
      attorneyNecessity = 'recommended';
    } else {
      attorneyNecessity = 'helpful';
    }

    // Calculate timeline
    const chargeDate = new Date(request.chargeDate);
    const nextCourtDate = request.courtDate || this.estimateNextCourtDate(chargeDate).toDateString();

    return {
      caseStrength,
      charge_analysis: {
        formal_charges: chargeAnalysis.formal_charges || [request.chargeType],
        potential_penalties: {
          fine_range: `${chargeAnalysis.penalty_ranges?.fine_min || '$0'} - ${chargeAnalysis.penalty_ranges?.fine_max || '$1,000'}`,
          jail_time: `${chargeAnalysis.penalty_ranges?.jail_min || '0 days'} - ${chargeAnalysis.penalty_ranges?.jail_max || '60 days'}`,
          probation_length: this.estimateProbationLength(request.chargeLevel),
          license_impact: chargeAnalysis.license_implications || 'Potential impact depending on charge',
          other_consequences: consequences.criminal_penalties || [],
        },
        enhancement_factors: chargeAnalysis.enhancement_factors || [],
        mitigating_factors: chargeAnalysis.mitigating_factors || [],
      },
      defense_strategy: {
        primary_defenses: defenseStrategy.primary_defenses || [],
        evidence_challenges: defenseStrategy.evidence_challenges || [],
        procedural_issues: defenseStrategy.constitutional_issues || [],
        plea_options: defenseStrategy.plea_strategies || [],
        trial_strategy: defenseStrategy.trial_approach || [],
      },
      nc_law_analysis: {
        applicable_statutes: ncLaw.applicable_statutes || [],
        sentencing_guidelines: [ncLaw.sentencing_range || 'Standard NC sentencing'],
        court_procedures: ncLaw.court_procedures || [],
        appeal_options: ncLaw.appeal_options || [],
      },
      timeline: {
        next_court_date: nextCourtDate,
        pretrial_deadlines: this.identifyPretrialDeadlines(request),
        trial_timeline: this.estimateTrialTimeline(request.chargeLevel),
        resolution_estimate: this.estimateResolution(caseStrength),
      },
      consequences: {
        criminal_penalties: consequences.criminal_penalties || [],
        collateral_consequences: consequences.civil_consequences || [],
        employment_impact: consequences.employment_impacts || [],
        license_impact: consequences.professional_licenses || [],
        immigration_impact: request.immigrationConcerns ? consequences.immigration_consequences : undefined,
      },
      recommendations: {
        immediate_actions: this.generateImmediateActions(request, caseStrength),
        evidence_preservation: defenseStrategy.investigation_needs || [],
        court_preparation: this.generateCourtPreparation(request),
        mitigation_strategies: this.generateMitigationStrategies(request, chargeAnalysis),
      },
      expungement_eligibility: consequences.expungement_eligible ? {
        eligible: true,
        waiting_period: consequences.expungement_timeline || 'Varies by charge',
        requirements: this.getExpungementRequirements(request.chargeType),
      } : undefined,
      attorney_necessity: attorneyNecessity,
      ai_overview_content: aiOverviewContent,
    };
  }

  private getCriminalDefenseSystemPrompt(): string {
    return `You are an expert North Carolina criminal defense attorney with comprehensive knowledge of NC criminal law. Your expertise includes:

NC CRIMINAL LAW EXPERTISE:
- N.C.G.S. Chapter 14 (Criminal Law)
- N.C.G.S. Chapter 15A (Criminal Procedure Act)
- N.C.G.S. Chapter 20 (Motor Vehicle Law)
- NC Structured Sentencing Act
- Habitual Felon Act and enhancement statutes
- Constitutional criminal procedure (4th, 5th, 6th Amendments)
- NC Rules of Evidence in criminal cases

PRACTICE AREAS:
- DWI/DUI defense (all levels and enhancements)
- Drug crimes (possession, trafficking, conspiracy)
- Violent crimes (assault, robbery, homicide)
- Property crimes (larceny, burglary, fraud)
- White collar crimes (embezzlement, forgery)
- Domestic violence and protective orders
- Traffic violations and license issues
- Juvenile defense and transfers
- Expungements and record clearing
- Appeals and post-conviction relief

NC CRIMINAL PROCEDURE:
- Arrest and detention procedures
- Bond and pretrial release
- Discovery and motion practice
- Plea negotiations and agreements
- Jury selection and trial procedure
- Sentencing and structured sentencing
- Probation and community corrections
- Appeals and post-conviction motions

NC SENTENCING FRAMEWORK:
- Prior Record Level (PRL) calculation
- Offense Class determination (A1-Class 3 misdemeanors)
- Mitigating and aggravating factors
- Active, intermediate, and community punishment ranges
- Habitual felon and repeat offender enhancements
- Drug Treatment Court and other alternatives

AI OVERVIEW OPTIMIZATION:
- Provide NC-specific criminal defense answers (40-60 words)
- Include relevant NC statutes and court procedures
- Address common criminal defense questions
- Optimize for "North Carolina criminal lawyer" queries
- Use conversational language for voice search

APPROACH:
1. Analyze charges under current NC criminal statutes
2. Identify all available defenses and constitutional issues
3. Assess evidence for suppression motions and challenges
4. Consider plea negotiations and alternative sentencing
5. Prepare comprehensive trial strategy if needed
6. Address all collateral consequences and long-term impacts

Maintain highest ethical standards and provide accurate analysis specific to North Carolina criminal law.`;
  }

  private estimateNextCourtDate(chargeDate: Date): Date {
    const nextDate = new Date(chargeDate);
    nextDate.setDate(nextDate.getDate() + 30); // Typical 30-day arraignment
    return nextDate;
  }

  private estimateProbationLength(chargeLevel: string): string {
    switch (chargeLevel) {
      case 'felony':
        return '12-60 months supervised probation';
      case 'misdemeanor':
        return '6-24 months unsupervised probation';
      case 'infraction':
        return 'No probation typical';
      default:
        return '6-24 months';
    }
  }

  private identifyPretrialDeadlines(request: CriminalDefenseConsultationRequest): string[] {
    const deadlines: string[] = [];
    
    if (request.currentStatus === 'arrested' || request.currentStatus === 'in_custody') {
      deadlines.push('Request bond hearing if not set');
    }
    
    if (request.bondStatus === 'denied_bond') {
      deadlines.push('File bond modification motion');
    }
    
    deadlines.push('File discovery motions within 30 days');
    deadlines.push('File suppression motions if applicable');
    
    return deadlines;
  }

  private estimateTrialTimeline(chargeLevel: string): string {
    switch (chargeLevel) {
      case 'felony':
        return '6-12 months from indictment';
      case 'misdemeanor':
        return '2-6 months from filing';
      case 'infraction':
        return '30-90 days';
      default:
        return '3-9 months';
    }
  }

  private estimateResolution(caseStrength: string): string {
    switch (caseStrength) {
      case 'strong_defense':
        return '2-6 months (dismissal or favorable plea likely)';
      case 'good_defense':
        return '3-9 months (good plea options available)';
      case 'moderate_defense':
        return '6-12 months (negotiation and possible trial)';
      case 'challenging':
        return '9-18 months (extensive preparation needed)';
      case 'very_difficult':
        return '12-24 months (complex defense required)';
      default:
        return '6-12 months';
    }
  }

  private generateImmediateActions(request: CriminalDefenseConsultationRequest, caseStrength: string): string[] {
    const actions: string[] = [];
    
    if (request.currentStatus === 'in_custody') {
      actions.push('Contact attorney immediately for bond hearing');
    }
    
    if (request.bondStatus === 'not_set') {
      actions.push('Prepare for bond hearing');
    }
    
    actions.push('Do not discuss case with anyone except attorney');
    actions.push('Preserve all evidence and documentation');
    actions.push('Avoid contact with alleged victims or witnesses');
    
    if (request.licenseConcerns) {
      actions.push('Contact DMV about license implications');
    }
    
    return actions;
  }

  private generateCourtPreparation(request: CriminalDefenseConsultationRequest): string[] {
    const prep: string[] = [];
    
    prep.push('Dress professionally for all court appearances');
    prep.push('Arrive early and bring identification');
    prep.push('Turn off cell phone in courthouse');
    prep.push('Only speak when addressed by judge');
    prep.push('Let attorney handle all legal arguments');
    
    if (request.bondStatus === 'cash_bond' || request.bondStatus === 'secured_bond') {
      prep.push('Comply with all bond conditions');
    }
    
    return prep;
  }

  private generateMitigationStrategies(request: CriminalDefenseConsultationRequest, chargeAnalysis: any): string[] {
    const strategies: string[] = [];
    
    strategies.push('Gather character references and employment records');
    strategies.push('Complete any relevant counseling or treatment programs');
    strategies.push('Document community service or volunteer work');
    
    if (request.chargeType === 'dui_dwi') {
      strategies.push('Complete alcohol assessment and any recommended treatment');
    }
    
    if (request.chargeType === 'drug_charges') {
      strategies.push('Consider drug treatment program enrollment');
    }
    
    if (request.circumstances.alcoholInvolved || request.circumstances.drugsInvolved) {
      strategies.push('Obtain substance abuse evaluation');
    }
    
    return strategies;
  }

  private getExpungementRequirements(chargeType: string): string[] {
    const baseRequirements = [
      'No subsequent convictions',
      'Complete all court obligations',
      'Pay all fines and costs',
      'Wait required time period',
    ];
    
    switch (chargeType) {
      case 'dui_dwi':
        return [...baseRequirements, 'Complete DWI education program'];
      case 'drug_charges':
        return [...baseRequirements, 'Complete substance abuse treatment if ordered'];
      default:
        return baseRequirements;
    }
  }

  // Fallback methods
  private getFallbackChargeAnalysis(request: CriminalDefenseConsultationRequest) {
    return {
      formal_charges: [request.chargeType],
      charge_classification: request.chargeLevel,
      penalty_ranges: {
        fine_min: '$0',
        fine_max: '$1,000',
        jail_min: '0 days',
        jail_max: '60 days',
      },
      enhancement_factors: request.priorRecord ? ['Prior record'] : [],
      mitigating_factors: ['First offense', 'Cooperation with police'],
      license_implications: 'Potential impact depending on charge',
      prior_record_impact: request.priorRecord ? 'May increase penalties' : 'No impact',
    };
  }

  private getFallbackDefenseStrategy(request: CriminalDefenseConsultationRequest) {
    return {
      primary_defenses: ['Challenge evidence', 'Constitutional violations'],
      evidence_challenges: ['Police procedure review', 'Evidence chain of custody'],
      suppression_motions: ['Fourth Amendment violations'],
      constitutional_issues: ['Miranda rights', 'Illegal search and seizure'],
      plea_strategies: ['Negotiate reduced charges', 'Alternative sentencing'],
      trial_approach: ['Challenge prosecution case', 'Present mitigation evidence'],
      expert_witnesses: ['Forensic expert', 'Character witnesses'],
      investigation_needs: ['Police reports', 'Witness statements', 'Video evidence'],
    };
  }

  private getFallbackNCLaw(request: CriminalDefenseConsultationRequest) {
    return {
      applicable_statutes: ['N.C.G.S. Chapter 14', 'N.C.G.S. Chapter 15A'],
      offense_class: `${request.chargeLevel} under NC law`,
      sentencing_range: 'Community to active punishment depending on prior record',
      court_procedures: ['Arraignment', 'Discovery', 'Motions', 'Trial'],
      key_deadlines: ['30 days for motions', '10 days for appeals'],
      appeal_options: ['Superior Court appeal', 'Court of Appeals'],
      alternative_programs: ['Community service', 'Probation', 'Drug court'],
      expungement_potential: 'May be eligible after waiting period',
    };
  }

  private getFallbackConsequenceAnalysis(request: CriminalDefenseConsultationRequest) {
    return {
      criminal_penalties: ['Fines', 'Possible jail time', 'Probation'],
      license_suspension: request.chargeType === 'dui_dwi' ? '30 days to 1 year' : 'Not applicable',
      employment_impacts: ['Background check issues', 'Professional license review'],
      professional_licenses: ['May require disclosure', 'Possible disciplinary action'],
      immigration_consequences: request.immigrationConcerns ? ['Deportability', 'Inadmissibility'] : [],
      civil_consequences: ['Civil liability', 'Protective orders'],
      federal_implications: ['Federal employment restrictions'],
      expungement_eligible: true,
      expungement_timeline: '3-15 years depending on charge',
    };
  }
}

// Export singleton instance
export const criminalDefenseSpecialist = new CriminalDefenseSpecialistAgent();