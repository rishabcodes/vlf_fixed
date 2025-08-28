/**
 * AI-Powered Client Intake and Case Assessment System
 * Intelligent routing and comprehensive case evaluation using specialized legal agents
 */

import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { immigrationSpecialist } from './agents/immigration-specialist-agent';
import { personalInjurySpecialist } from './agents/personal-injury-specialist-agent';
import { workersCompensationSpecialist } from './agents/workers-compensation-specialist-agent';
import { familyLawSpecialist } from './agents/family-law-specialist-agent';
import { criminalDefenseSpecialist } from './agents/criminal-defense-specialist-agent';

export interface ClientIntakeRequest {
  // Client Information
  clientId?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredLanguage: 'en' | 'es';
    location: {
      city: string;
      state: string;
      zipCode: string;
    };
  };
  
  // Legal Issue Information
  legalIssue: {
    primaryArea: 'immigration' | 'personal_injury' | 'workers_compensation' | 'family_law' | 'criminal_defense' | 'unknown';
    description: string;
    urgency: 'immediate' | 'within_days' | 'within_weeks' | 'within_months' | 'planning';
    estimatedValue?: string;
    hasDeadlines: boolean;
    deadlineDate?: string;
  };
  
  // Previous Legal Experience
  priorLegalExperience: {
    hasAttorney: boolean;
    priorAttorneyName?: string;
    priorCases: boolean;
    priorDenials: boolean;
    priorConvictions?: boolean;
  };
  
  // Financial Information
  financialSituation: {
    employmentStatus: 'employed' | 'unemployed' | 'self_employed' | 'retired' | 'student';
    monthlyIncome?: string;
    hasInsurance: boolean;
    insuranceType?: string;
    abilityToPay: 'full_payment' | 'payment_plan' | 'limited_budget' | 'seeking_pro_bono';
  };
  
  // Specific Questions and Goals
  clientGoals: string[];
  specificQuestions: string[];
  additionalInfo?: string;
  
  // Intake Source
  source: 'website' | 'referral' | 'advertisement' | 'social_media' | 'search' | 'walk_in' | 'phone';
  referralSource?: string;
}

export interface CaseAssessmentResult {
  assessmentId: string;
  clientId: string;
  timestamp: Date;
  
  // Routing Results
  practiceArea: string;
  jurisdiction: 'nationwide' | 'north_carolina';
  agentUsed: string;
  confidence: number;
  
  // Case Analysis
  caseAnalysis: {
    viability: 'strong' | 'good' | 'moderate' | 'weak' | 'not_viable';
    complexity: 'simple' | 'moderate' | 'complex' | 'extremely_complex';
    likelihood: 'high' | 'moderate' | 'low' | 'needs_evaluation';
    timeframe: string;
    jurisdiction: string;
  };
  
  // Financial Analysis
  costAnalysis: {
    estimatedCosts: {
      government_fees: string;
      attorney_fees: string;
      total_estimated: string;
    };
    paymentOptions: string[];
    financialViability: 'excellent' | 'good' | 'challenging' | 'problematic';
  };
  
  // Recommendations
  recommendations: {
    immediate_actions: string[];
    required_documents: string[];
    next_steps: string[];
    attorney_necessity: 'essential' | 'strongly_recommended' | 'recommended' | 'optional';
    timeline: string[];
  };
  
  // Risk Assessment
  riskFactors: string[];
  challenges: string[];
  opportunities: string[];
  
  // Specialized Assessment
  specializedAssessment: any; // Detailed assessment from the specific agent
  
  // AI Overview Content
  aiOverviewContent?: {
    faq_answers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    content_optimization: string;
  };
  
  // Follow-up Strategy
  followUpStrategy: {
    priority: 'urgent' | 'high' | 'medium' | 'low';
    recommendedContact: 'immediate' | 'within_24h' | 'within_week' | 'standard';
    followUpActions: string[];
    schedulingRecommendations: string[];
  };
}

export interface RoutingDecision {
  practiceArea: string;
  confidence: number;
  reasoning: string[];
  jurisdiction: 'nationwide' | 'north_carolina';
  alternativeAreas?: string[];
}

export class AIClientIntakeSystem {
  private crewLogger = createCrewLogger('ai-client-intake-system');

  constructor() {
    logger.info('AI Client Intake System initialized');
  }

  /**
   * Main intake and assessment workflow
   */
  async processClientIntake(request: ClientIntakeRequest): Promise<CaseAssessmentResult> {
    return this.crewLogger.logExecution(
      'process-client-intake',
      async () => {
        logger.info('Starting AI-powered client intake process', {
          clientLocation: `${request.personalInfo.location.city}, ${request.personalInfo.location.state}`,
          primaryArea: request.legalIssue.primaryArea,
          urgency: request.legalIssue.urgency,
        });

        // Step 1: Intelligent routing to appropriate specialist
        const routingDecision = await this.intelligentRouting(request);
        
        // Step 2: Conduct specialized assessment
        const specializedAssessment = await this.conductSpecializedAssessment(request, routingDecision);
        
        // Step 3: Financial viability analysis
        const financialAnalysis = await this.analyzeFinancialViability(request, specializedAssessment);
        
        // Step 4: Generate comprehensive recommendations
        const recommendations = await this.generateRecommendations(request, specializedAssessment, financialAnalysis);
        
        // Step 5: Risk assessment and opportunity identification
        const riskAnalysis = await this.assessRisksAndOpportunities(request, specializedAssessment);
        
        // Step 6: Develop follow-up strategy
        const followUpStrategy = await this.developFollowUpStrategy(request, specializedAssessment, recommendations);
        
        // Step 7: Compile comprehensive assessment
        const assessment = this.compileAssessment(
          request,
          routingDecision,
          specializedAssessment,
          financialAnalysis,
          recommendations,
          riskAnalysis,
          followUpStrategy
        );

        logger.info('AI client intake assessment completed', {
          assessmentId: assessment.assessmentId,
          practiceArea: assessment.practiceArea,
          viability: assessment.caseAnalysis.viability,
          attorneyNecessity: assessment.recommendations.attorney_necessity,
        });

        return assessment;
      },
      {
        input: request,
        metadata: {
          primaryArea: request.legalIssue.primaryArea,
          urgency: request.legalIssue.urgency,
          location: request.personalInfo.location.state,
        },
      }
    );
  }

  /**
   * Intelligent routing to appropriate specialist agent
   */
  private async intelligentRouting(request: ClientIntakeRequest): Promise<RoutingDecision> {
    logger.info('Performing intelligent routing analysis');

    // Extract routing signals
    const signals = this.extractRoutingSignals(request);
    
    // Apply routing logic
    const decision = this.applyRoutingLogic(signals, request);
    
    // Validate jurisdiction
    const validatedDecision = this.validateJurisdiction(decision, request);

    logger.info('Routing decision made', {
      practiceArea: validatedDecision.practiceArea,
      confidence: validatedDecision.confidence,
      jurisdiction: validatedDecision.jurisdiction,
    });

    return validatedDecision;
  }

  /**
   * Extract signals for routing decision
   */
  private extractRoutingSignals(request: ClientIntakeRequest): any {
    const description = request.legalIssue.description.toLowerCase();
    const goals = request.clientGoals.join(' ').toLowerCase();
    const questions = request.specificQuestions.join(' ').toLowerCase();
    const combinedText = `${description} ${goals} ${questions}`;

    // Immigration signals
    const immigrationSignals = [
      'green card', 'citizenship', 'visa', 'immigration', 'deportation', 'asylum',
      'naturalization', 'permanent resident', 'work authorization', 'family petition',
      'adjustment of status', 'consular processing', 'removal proceedings'
    ];

    // Personal injury signals
    const personalInjurySignals = [
      'car accident', 'truck accident', 'motorcycle accident', 'slip and fall',
      'medical malpractice', 'personal injury', 'injured', 'negligence',
      'wrongful death', 'product liability', 'premises liability'
    ];

    // Workers compensation signals
    const workersCompSignals = [
      'work injury', 'workers compensation', 'workplace accident', 'injured at work',
      'work comp', 'industrial accident', 'occupational disease', 'repetitive strain'
    ];

    // Family law signals
    const familyLawSignals = [
      'divorce', 'separation', 'custody', 'child support', 'alimony', 'spousal support',
      'domestic violence', 'adoption', 'paternity', 'family law', 'marriage'
    ];

    // Criminal defense signals
    const criminalSignals = [
      'arrested', 'charged', 'criminal', 'dui', 'dwi', 'assault', 'theft',
      'drug charges', 'domestic violence', 'traffic ticket', 'expungement',
      'criminal defense', 'felony', 'misdemeanor'
    ];

    return {
      immigration: this.countSignals(combinedText, immigrationSignals),
      personalInjury: this.countSignals(combinedText, personalInjurySignals),
      workersComp: this.countSignals(combinedText, workersCompSignals),
      familyLaw: this.countSignals(combinedText, familyLawSignals),
      criminal: this.countSignals(combinedText, criminalSignals),
      primaryArea: request.legalIssue.primaryArea,
      location: request.personalInfo.location.state,
    };
  }

  /**
   * Count signal matches in text
   */
  private countSignals(text: string, signals: string[]): number {
    return signals.reduce((count, signal) => {
      return count + (text.includes(signal) ? 1 : 0);
    }, 0);
  }

  /**
   * Apply routing logic based on signals
   */
  private applyRoutingLogic(signals: any, request: ClientIntakeRequest): RoutingDecision {
    // If primary area is specified and has supporting signals, use it
    if (request.legalIssue.primaryArea !== 'unknown') {
      const signalStrength = signals[this.mapPrimaryArea(request.legalIssue.primaryArea)] || 0;
      if (signalStrength > 0) {
        return {
          practiceArea: request.legalIssue.primaryArea,
          confidence: Math.min(90, 60 + (signalStrength * 10)),
          reasoning: [`Client specified ${request.legalIssue.primaryArea}`, `${signalStrength} supporting signals found`],
          jurisdiction: this.determineJurisdiction(request.legalIssue.primaryArea, request.personalInfo.location.state),
        };
      }
    }

    // Find highest signal count
    const signalCounts = [
      { area: 'immigration', count: signals.immigration, jurisdiction: 'nationwide' },
      { area: 'personal_injury', count: signals.personalInjury, jurisdiction: 'north_carolina' },
      { area: 'workers_compensation', count: signals.workersComp, jurisdiction: 'north_carolina' },
      { area: 'family_law', count: signals.familyLaw, jurisdiction: 'north_carolina' },
      { area: 'criminal_defense', count: signals.criminal, jurisdiction: 'north_carolina' },
    ];

    const topSignal = signalCounts.reduce((max, current) => 
      current.count > max.count ? current : max
    );

    // If no strong signals, default based on location
    if (topSignal.count === 0) {
      return {
        practiceArea: 'immigration', // Default to immigration as it's nationwide
        confidence: 30,
        reasoning: ['No specific signals detected', 'Defaulting to immigration consultation'],
        jurisdiction: 'nationwide',
        alternativeAreas: ['personal_injury', 'family_law', 'criminal_defense'],
      };
    }

    return {
      practiceArea: topSignal.area,
      confidence: Math.min(95, 40 + (topSignal.count * 15)),
      reasoning: [`${topSignal.count} signals detected for ${topSignal.area}`],
      jurisdiction: topSignal.jurisdiction as 'nationwide' | 'north_carolina',
    };
  }

  /**
   * Map primary area to signal key
   */
  private mapPrimaryArea(primaryArea: string): string {
    const mapping: Record<string, string> = {
      'immigration': 'immigration',
      'personal_injury': 'personalInjury',
      'workers_compensation': 'workersComp',
      'family_law': 'familyLaw',
      'criminal_defense': 'criminal',
    };
    return mapping[primaryArea] || primaryArea;
  }

  /**
   * Determine jurisdiction for practice area
   */
  private determineJurisdiction(practiceArea: string, state: string): 'nationwide' | 'north_carolina' {
    if (practiceArea === 'immigration') {
      return 'nationwide';
    }
    
    // For NC-specific practice areas, check if client is in NC
    if (state.toLowerCase() === 'north carolina' || state.toLowerCase() === 'nc') {
      return 'north_carolina';
    }
    
    // If outside NC, default to immigration
    return 'nationwide';
  }

  /**
   * Validate jurisdiction based on client location
   */
  private validateJurisdiction(decision: RoutingDecision, request: ClientIntakeRequest): RoutingDecision {
    const clientState = request.personalInfo.location.state.toLowerCase();
    const isInNC = clientState === 'north carolina' || clientState === 'nc';

    // If routed to NC-specific practice area but client is outside NC
    if (decision.jurisdiction === 'north_carolina' && !isInNC) {
      logger.warn('Client outside NC routed to NC-specific practice area', {
        practiceArea: decision.practiceArea,
        clientState: clientState,
      });

      // Redirect to immigration or suggest referral
      return {
        practiceArea: 'immigration',
        confidence: Math.max(40, decision.confidence - 30),
        reasoning: [
          ...decision.reasoning,
          `Client located in ${request.personalInfo.location.state}`,
          'VLF practices NC law for non-immigration matters',
          'Routing to immigration or referral needed',
        ],
        jurisdiction: 'nationwide',
        alternativeAreas: [decision.practiceArea],
      };
    }

    return decision;
  }

  /**
   * Conduct specialized assessment using appropriate agent
   */
  private async conductSpecializedAssessment(
    request: ClientIntakeRequest,
    routing: RoutingDecision
  ): Promise<any> {
    logger.info('Conducting specialized assessment', {
      practiceArea: routing.practiceArea,
      jurisdiction: routing.jurisdiction,
    });

    try {
      switch (routing.practiceArea) {
        case 'immigration':
          return await this.assessImmigrationCase(request, routing);
        
        case 'personal_injury':
          return await this.assessPersonalInjuryCase(request, routing);
        
        case 'workers_compensation':
          return await this.assessWorkersCompCase(request, routing);
        
        case 'family_law':
          return await this.assessFamilyLawCase(request, routing);
        
        case 'criminal_defense':
          return await this.assessCriminalDefenseCase(request, routing);
        
        default:
          return await this.assessGeneralCase(request, routing);
      }
    } catch (error) {
      logger.error('Specialized assessment failed', { error, practiceArea: routing.practiceArea });
      return this.getFallbackAssessment(request, routing);
    }
  }

  /**
   * Immigration case assessment
   */
  private async assessImmigrationCase(request: ClientIntakeRequest, routing: RoutingDecision): Promise<any> {
    // Convert intake request to immigration consultation format
    const immigrationRequest = this.convertToImmigrationRequest(request);
    
    // Use immigration specialist
    const assessment = await immigrationSpecialist.assessCase(immigrationRequest);
    
    return {
      type: 'immigration',
      agent: 'immigration-specialist',
      assessment,
      routing,
    };
  }

  /**
   * Personal injury case assessment
   */
  private async assessPersonalInjuryCase(request: ClientIntakeRequest, routing: RoutingDecision): Promise<any> {
    // Convert intake request to personal injury consultation format
    const piRequest = this.convertToPersonalInjuryRequest(request);
    
    // Use personal injury specialist
    const assessment = await personalInjurySpecialist.assessCase(piRequest);
    
    return {
      type: 'personal_injury',
      agent: 'personal-injury-specialist',
      assessment,
      routing,
    };
  }

  /**
   * Workers compensation case assessment
   */
  private async assessWorkersCompCase(request: ClientIntakeRequest, routing: RoutingDecision): Promise<any> {
    // Convert intake request to workers comp consultation format
    const wcRequest = this.convertToWorkersCompRequest(request);
    
    // Use workers compensation specialist
    const assessment = await workersCompensationSpecialist.assessCase(wcRequest);
    
    return {
      type: 'workers_compensation',
      agent: 'workers-compensation-specialist',
      assessment,
      routing,
    };
  }

  /**
   * Family law case assessment
   */
  private async assessFamilyLawCase(request: ClientIntakeRequest, routing: RoutingDecision): Promise<any> {
    // Convert intake request to family law consultation format
    const familyRequest = this.convertToFamilyLawRequest(request);
    
    // Use family law specialist
    const assessment = await familyLawSpecialist.assessCase(familyRequest);
    
    return {
      type: 'family_law',
      agent: 'family-law-specialist',
      assessment,
      routing,
    };
  }

  /**
   * Criminal defense case assessment
   */
  private async assessCriminalDefenseCase(request: ClientIntakeRequest, routing: RoutingDecision): Promise<any> {
    // Convert intake request to criminal defense consultation format
    const criminalRequest = this.convertToCriminalDefenseRequest(request);
    
    // Use criminal defense specialist
    const assessment = await criminalDefenseSpecialist.assessCase(criminalRequest);
    
    return {
      type: 'criminal_defense',
      agent: 'criminal-defense-specialist',
      assessment,
      routing,
    };
  }

  /**
   * General case assessment fallback
   */
  private async assessGeneralCase(request: ClientIntakeRequest, routing: RoutingDecision): Promise<any> {
    return {
      type: 'general',
      agent: 'general-assessment',
      assessment: {
        caseComplexity: 'moderate',
        eligibility: {
          pathway: 'General legal consultation',
          likelihood: 'needs_evaluation',
          requirements: ['Initial consultation', 'Document review'],
          timeframe: '1-2 weeks',
          costs: {
            government_fees: 'Varies',
            attorney_fees: '$150-$500/hour',
            total_estimated: '$500-$2,000',
          },
        },
        recommendations: {
          immediate_actions: ['Schedule consultation', 'Gather relevant documents'],
          required_documents: ['Relevant legal documents', 'Correspondence', 'Evidence'],
          potential_challenges: ['Need more information to assess'],
          alternative_pathways: ['Specialized consultation after initial review'],
        },
        legal_analysis: {
          applicable_laws: ['To be determined'],
          success_factors: ['Complete information gathering'],
          risk_factors: ['Insufficient initial information'],
        },
        consultation_summary: 'General legal matter requiring specialized assessment after initial consultation.',
        next_steps: ['Schedule consultation', 'Provide detailed case information'],
      },
      routing,
    };
  }

  /**
   * Conversion methods for different practice areas
   */
  private convertToImmigrationRequest(request: ClientIntakeRequest): any {
    const description = request.legalIssue.description.toLowerCase();
    
    // Determine immigration goal based on description
    let immigrationGoal: string = 'green_card';
    if (description.includes('citizenship') || description.includes('naturalization')) {
      immigrationGoal = 'citizenship';
    } else if (description.includes('visa')) {
      immigrationGoal = 'visa';
    } else if (description.includes('asylum')) {
      immigrationGoal = 'asylum';
    } else if (description.includes('work')) {
      immigrationGoal = 'work_authorization';
    } else if (description.includes('family')) {
      immigrationGoal = 'family_reunification';
    }

    return {
      clientType: 'individual',
      immigrationGoal,
      currentStatus: 'other',
      countryOfOrigin: 'Unknown',
      urgency: request.legalIssue.urgency,
      priorDenials: request.priorLegalExperience.priorDenials,
      previousAttorney: request.priorLegalExperience.hasAttorney,
      specificQuestions: request.specificQuestions,
      preferredLanguage: request.personalInfo.preferredLanguage,
    };
  }

  private convertToPersonalInjuryRequest(request: ClientIntakeRequest): any {
    const description = request.legalIssue.description.toLowerCase();
    
    // Determine incident type
    let incidentType = 'other';
    if (description.includes('car') || description.includes('auto')) {
      incidentType = 'car_accident';
    } else if (description.includes('slip') || description.includes('fall')) {
      incidentType = 'slip_fall';
    } else if (description.includes('medical')) {
      incidentType = 'medical_malpractice';
    } else if (description.includes('work')) {
      incidentType = 'workplace_accident';
    }

    return {
      incidentType,
      incidentDate: new Date().toISOString().split('T')[0], // Today as placeholder
      incidentLocation: `${request.personalInfo.location.city}, ${request.personalInfo.location.state}`,
      injuryType: 'moderate',
      medicalTreatment: 'ongoing',
      liabilityClarity: 'disputed',
      insuranceCoverage: {
        hasInsurance: request.financialSituation.hasInsurance,
        otherPartyInsured: false,
        uninsuredMotorist: false,
        medicalPayments: false,
      },
      economicDamages: {
        medicalExpenses: 'Unknown',
        lostWages: 'Unknown',
        propertyDamage: 'Unknown',
        ongoingExpenses: true,
      },
      priorAttorney: request.priorLegalExperience.hasAttorney,
      policeReport: false,
      witnesses: false,
      photos: false,
      clientQuestions: request.specificQuestions,
      urgency: request.legalIssue.urgency,
    };
  }

  private convertToWorkersCompRequest(request: ClientIntakeRequest): any {
    const description = request.legalIssue.description.toLowerCase();
    
    let injuryType = 'other';
    if (description.includes('accident')) {
      injuryType = 'accident';
    } else if (description.includes('repetitive') || description.includes('strain')) {
      injuryType = 'repetitive_strain';
    } else if (description.includes('disease')) {
      injuryType = 'occupational_disease';
    }

    return {
      injuryType,
      injuryDate: new Date().toISOString().split('T')[0],
      reportedToEmployer: false,
      workRelated: 'disputed',
      employmentStatus: request.financialSituation.employmentStatus === 'employed' ? 'full_time' : 'other',
      employer: {
        name: 'Unknown',
        industry: 'Unknown',
        size: 'medium',
        hasInsurance: true,
      },
      medicalTreatment: {
        received: true,
        authorizedByEmployer: false,
        doctorChoice: 'own_choice',
        currentStatus: 'ongoing',
      },
      workStatus: {
        currentlyWorking: request.financialSituation.employmentStatus === 'employed',
        returnedToWork: false,
        restrictions: true,
        lightDuty: false,
        totallyDisabled: false,
      },
      benefits: {
        receivingBenefits: false,
        deniedClaim: false,
      },
      priorInjuries: false,
      witnessesToInjury: false,
      safeguards: true,
      clientConcerns: request.clientGoals,
      urgency: request.legalIssue.urgency,
    };
  }

  private convertToFamilyLawRequest(request: ClientIntakeRequest): any {
    const description = request.legalIssue.description.toLowerCase();
    
    let caseType = 'other';
    if (description.includes('divorce')) {
      caseType = 'divorce';
    } else if (description.includes('custody')) {
      caseType = 'custody';
    } else if (description.includes('support')) {
      caseType = 'child_support';
    } else if (description.includes('alimony')) {
      caseType = 'alimony';
    }

    return {
      caseType,
      maritalStatus: 'married',
      hasChildren: description.includes('child') || description.includes('custody'),
      financialSituation: {
        petitionerIncome: request.financialSituation.monthlyIncome || 'Unknown',
        respondentIncome: 'Unknown',
        sharedAssets: true,
        sharedDebts: true,
        realEstate: false,
        retirement: false,
        businessOwnership: false,
      },
      issues: {
        custody: description.includes('custody'),
        childSupport: description.includes('support'),
        alimony: description.includes('alimony'),
        propertyDivision: description.includes('property') || description.includes('asset'),
        domesticViolence: description.includes('violence') || description.includes('abuse'),
        relocation: description.includes('move') || description.includes('relocat'),
      },
      cooperation: 'some_disagreement',
      priorOrders: false,
      pendingCharges: false,
      substanceAbuse: false,
      mentalHealth: false,
      clientGoals: request.clientGoals,
      urgency: request.legalIssue.urgency,
      preferredResolution: 'mediation',
    };
  }

  private convertToCriminalDefenseRequest(request: ClientIntakeRequest): any {
    const description = request.legalIssue.description.toLowerCase();
    
    let chargeType = 'other';
    let chargeLevel = 'misdemeanor';
    
    if (description.includes('dui') || description.includes('dwi')) {
      chargeType = 'dui_dwi';
    } else if (description.includes('drug')) {
      chargeType = 'drug_charges';
    } else if (description.includes('assault')) {
      chargeType = 'assault';
    } else if (description.includes('theft') || description.includes('steal')) {
      chargeType = 'theft';
    } else if (description.includes('domestic')) {
      chargeType = 'domestic_violence';
    }

    if (description.includes('felony')) {
      chargeLevel = 'felony';
    } else if (description.includes('traffic')) {
      chargeLevel = 'infraction';
    }

    return {
      chargeType,
      chargeLevel,
      chargeDate: new Date().toISOString().split('T')[0],
      currentStatus: 'charged',
      priorRecord: request.priorLegalExperience.priorCases || request.priorLegalExperience.priorConvictions || false,
      priorConvictions: request.priorLegalExperience.priorConvictions ? ['Unknown'] : undefined,
      bondStatus: 'not_set',
      courtLocation: `${request.personalInfo.location.city}, ${request.personalInfo.location.state}`,
      circumstances: {
        alcoholInvolved: description.includes('alcohol') || description.includes('dui') || description.includes('dwi'),
        drugsInvolved: description.includes('drug'),
        weaponInvolved: description.includes('weapon') || description.includes('gun'),
        injuryOccurred: description.includes('injury') || description.includes('hurt'),
        propertyDamage: description.includes('damage'),
        cooperatedWithPolice: false,
        hasWitnesses: false,
      },
      evidence: {
        policeReport: true,
        breathalyzer: description.includes('dui') || description.includes('dwi'),
        bloodTest: false,
        fieldSobrietyTest: description.includes('dui') || description.includes('dwi'),
        videofootage: false,
        photographs: false,
        searchConducted: description.includes('search'),
      },
      employmentConcerns: request.financialSituation.employmentStatus === 'employed',
      licenseConcerns: description.includes('dui') || description.includes('dwi') || description.includes('license'),
      immigrationConcerns: request.legalIssue.primaryArea === 'immigration',
      clientGoals: request.clientGoals,
      urgency: request.legalIssue.urgency,
    };
  }

  /**
   * Analyze financial viability
   */
  private async analyzeFinancialViability(request: ClientIntakeRequest, specializedAssessment: any): Promise<any> {
    logger.info('Analyzing financial viability');

    const assessment = specializedAssessment.assessment;
    const costs = assessment.eligibility?.costs || assessment.caseValue || assessment.legal_strategy || {};

    // Extract cost information
    const governmentFees = costs.government_fees || costs.estimated_cost || '$0-$1,000';
    const attorneyFees = costs.attorney_fees || costs.attorney_fees || '$2,000-$8,000';
    const totalEstimated = costs.total_estimated || costs.total_estimated || '$3,000-$10,000';

    // Analyze client's ability to pay
    const abilityToPay = request.financialSituation.abilityToPay;
    const hasInsurance = request.financialSituation.hasInsurance;
    const employmentStatus = request.financialSituation.employmentStatus;

    let financialViability: 'excellent' | 'good' | 'challenging' | 'problematic';
    const paymentOptions: string[] = [];

    // Determine financial viability
    if (abilityToPay === 'full_payment') {
      financialViability = 'excellent';
      paymentOptions.push('Full upfront payment', 'Retainer with balance due');
    } else if (abilityToPay === 'payment_plan') {
      financialViability = 'good';
      paymentOptions.push('Monthly payment plan', 'Phased payment schedule');
    } else if (abilityToPay === 'limited_budget') {
      financialViability = 'challenging';
      paymentOptions.push('Extended payment plan', 'Reduced scope representation', 'Unbundled services');
    } else {
      financialViability = 'problematic';
      paymentOptions.push('Pro bono referral', 'Legal aid referral', 'Self-help resources');
    }

    // Add insurance-based options if applicable
    if (hasInsurance && specializedAssessment.type === 'personal_injury') {
      paymentOptions.unshift('Contingency fee arrangement');
      if (financialViability === 'challenging' || financialViability === 'problematic') {
        financialViability = 'good';
      }
    }

    return {
      estimatedCosts: {
        government_fees: governmentFees,
        attorney_fees: attorneyFees,
        total_estimated: totalEstimated,
      },
      paymentOptions,
      financialViability,
      clientAbility: abilityToPay,
      hasInsurance,
      employmentStatus,
    };
  }

  /**
   * Generate comprehensive recommendations
   */
  private async generateRecommendations(
    request: ClientIntakeRequest,
    specializedAssessment: any,
    financialAnalysis: any
  ): Promise<any> {
    logger.info('Generating comprehensive recommendations');

    const assessment = specializedAssessment.assessment;
    
    // Extract recommendations from specialized assessment
    const immediateActions = assessment.recommendations?.immediate_actions || 
                           assessment.strategy?.immediate_actions || 
                           assessment.legal_strategy?.immediate_actions || 
                           ['Schedule consultation', 'Gather relevant documents'];

    const requiredDocuments = assessment.recommendations?.required_documents || 
                            assessment.recommendations?.required_documents ||
                            ['Government-issued ID', 'Relevant legal documents'];

    const nextSteps = assessment.next_steps || 
                     assessment.timeline?.critical_deadlines ||
                     ['Initial consultation', 'Case evaluation', 'Strategy development'];

    // Determine attorney necessity
    const attorneyNecessity = assessment.attorney_necessity || 
                            assessment.attorney_recommendation ||
                            'recommended';

    // Create timeline based on urgency and case type
    const timeline = this.createTimeline(request, specializedAssessment, financialAnalysis);

    return {
      immediate_actions: immediateActions,
      required_documents: requiredDocuments,
      next_steps: nextSteps,
      attorney_necessity: attorneyNecessity,
      timeline,
      financial_recommendations: this.createFinancialRecommendations(financialAnalysis),
      urgency_assessment: this.assessUrgency(request, specializedAssessment),
    };
  }

  /**
   * Create timeline based on case specifics
   */
  private createTimeline(
    request: ClientIntakeRequest,
    specializedAssessment: any,
    financialAnalysis: any
  ): string[] {
    const timeline: string[] = [];
    const urgency = request.legalIssue.urgency;
    
    // Immediate phase
    if (urgency === 'immediate') {
      timeline.push('Day 1-2: Emergency consultation and immediate actions');
      timeline.push('Day 3-7: Document gathering and strategy development');
    } else {
      timeline.push('Week 1: Initial consultation and case assessment');
      timeline.push('Week 2-3: Document collection and analysis');
    }

    // Short-term phase
    if (specializedAssessment.type === 'criminal_defense') {
      timeline.push('Week 2-4: Court appearances and motion filing');
      timeline.push('Month 2-3: Discovery and plea negotiations');
    } else if (specializedAssessment.type === 'immigration') {
      timeline.push('Month 1-2: Application preparation and filing');
      timeline.push('Month 3-6: Processing and follow-up');
    } else {
      timeline.push('Month 1-2: Case development and filing');
      timeline.push('Month 3-6: Discovery and negotiations');
    }

    // Long-term phase
    const timeframe = specializedAssessment.assessment.eligibility?.timeframe || 
                     specializedAssessment.assessment.timeline?.estimated_resolution ||
                     '6-12 months';
    timeline.push(`Final resolution: ${timeframe}`);

    return timeline;
  }

  /**
   * Create financial recommendations
   */
  private createFinancialRecommendations(financialAnalysis: any): string[] {
    const recommendations: string[] = [];
    
    recommendations.push(`Total estimated cost: ${financialAnalysis.estimatedCosts.total_estimated}`);
    recommendations.push(`Payment options: ${financialAnalysis.paymentOptions.join(', ')}`);
    
    if (financialAnalysis.financialViability === 'challenging' || financialAnalysis.financialViability === 'problematic') {
      recommendations.push('Consider limited scope representation to reduce costs');
      recommendations.push('Explore payment plan options');
    }
    
    if (financialAnalysis.hasInsurance) {
      recommendations.push('Review insurance coverage for potential cost coverage');
    }

    return recommendations;
  }

  /**
   * Assess urgency level
   */
  private assessUrgency(request: ClientIntakeRequest, specializedAssessment: any): string {
    const baseUrgency = request.legalIssue.urgency;
    const hasDeadlines = request.legalIssue.hasDeadlines;
    const assessmentType = specializedAssessment.type;
    
    if (baseUrgency === 'immediate') {
      return 'Critical - requires immediate attention within 24-48 hours';
    }
    
    if (hasDeadlines || assessmentType === 'criminal_defense') {
      return 'High - requires attention within 1 week';
    }
    
    if (baseUrgency === 'within_days') {
      return 'Medium-High - requires attention within 2 weeks';
    }
    
    return 'Standard - consultation within 1 month recommended';
  }

  /**
   * Assess risks and opportunities
   */
  private async assessRisksAndOpportunities(
    request: ClientIntakeRequest,
    specializedAssessment: any
  ): Promise<any> {
    logger.info('Assessing risks and opportunities');

    const assessment = specializedAssessment.assessment;
    
    // Extract risk factors
    const riskFactors = assessment.risks_challenges || 
                       assessment.risk_factors ||
                       assessment.consequences?.collateral_consequences ||
                       ['Case requires detailed evaluation'];

    // Extract challenges
    const challenges = assessment.potential_challenges ||
                      assessment.recommendations?.potential_challenges ||
                      assessment.legal_analysis?.risk_factors ||
                      ['Standard legal complexity'];

    // Identify opportunities
    const opportunities = this.identifyOpportunities(request, specializedAssessment);

    return {
      riskFactors,
      challenges,
      opportunities,
      riskLevel: this.assessRiskLevel(riskFactors, challenges),
      opportunityLevel: this.assessOpportunityLevel(opportunities, specializedAssessment),
    };
  }

  /**
   * Identify opportunities
   */
  private identifyOpportunities(request: ClientIntakeRequest, specializedAssessment: any): string[] {
    const opportunities: string[] = [];
    const assessment = specializedAssessment.assessment;
    
    // General opportunities
    if (assessment.caseViability === 'strong' || assessment.caseStrength === 'strong' || 
        assessment.eligibility?.likelihood === 'high') {
      opportunities.push('Strong case with high likelihood of success');
    }
    
    if (!request.priorLegalExperience.priorCases) {
      opportunities.push('Clean legal history strengthens position');
    }
    
    // Practice area specific opportunities
    if (specializedAssessment.type === 'immigration' && 
        request.personalInfo.preferredLanguage === 'es') {
      opportunities.push('Spanish-speaking legal team available');
    }
    
    if (specializedAssessment.type === 'personal_injury' && 
        request.financialSituation.hasInsurance) {
      opportunities.push('Insurance coverage may provide additional recovery options');
    }
    
    if (specializedAssessment.type === 'criminal_defense' && 
        !request.priorLegalExperience.priorConvictions) {
      opportunities.push('First offense may qualify for favorable plea options');
    }
    
    // Location-based opportunities
    if (request.personalInfo.location.state.toLowerCase() === 'north carolina' ||
        request.personalInfo.location.state.toLowerCase() === 'nc') {
      opportunities.push('Case falls within VLF primary jurisdiction');
    }
    
    return opportunities;
  }

  /**
   * Assess risk level
   */
  private assessRiskLevel(riskFactors: string[], challenges: string[]): 'low' | 'medium' | 'high' {
    const totalRisks = riskFactors.length + challenges.length;
    
    if (totalRisks <= 2) return 'low';
    if (totalRisks <= 4) return 'medium';
    return 'high';
  }

  /**
   * Assess opportunity level
   */
  private assessOpportunityLevel(opportunities: string[], specializedAssessment: any): 'low' | 'medium' | 'high' {
    const assessment = specializedAssessment.assessment;
    let score = opportunities.length;
    
    // Boost for strong cases
    if (assessment.caseViability === 'strong' || assessment.caseStrength === 'strong') {
      score += 2;
    }
    
    if (score <= 2) return 'low';
    if (score <= 4) return 'medium';
    return 'high';
  }

  /**
   * Develop follow-up strategy
   */
  private async developFollowUpStrategy(
    request: ClientIntakeRequest,
    specializedAssessment: any,
    recommendations: any
  ): Promise<any> {
    logger.info('Developing follow-up strategy');

    const urgency = request.legalIssue.urgency;
    const attorneyNecessity = recommendations.attorney_necessity;
    const caseViability = specializedAssessment.assessment.caseViability || 
                         specializedAssessment.assessment.caseStrength ||
                         'moderate';

    // Determine priority
    let priority: 'urgent' | 'high' | 'medium' | 'low';
    if (urgency === 'immediate' || attorneyNecessity === 'essential') {
      priority = 'urgent';
    } else if (urgency === 'within_days' || attorneyNecessity === 'strongly_recommended') {
      priority = 'high';
    } else if (urgency === 'within_weeks' || attorneyNecessity === 'recommended') {
      priority = 'medium';
    } else {
      priority = 'low';
    }

    // Determine recommended contact timeline
    let recommendedContact: 'immediate' | 'within_24h' | 'within_week' | 'standard';
    if (priority === 'urgent') {
      recommendedContact = 'immediate';
    } else if (priority === 'high') {
      recommendedContact = 'within_24h';
    } else if (priority === 'medium') {
      recommendedContact = 'within_week';
    } else {
      recommendedContact = 'standard';
    }

    // Create follow-up actions
    const followUpActions = this.createFollowUpActions(request, specializedAssessment, priority);
    
    // Create scheduling recommendations
    const schedulingRecommendations = this.createSchedulingRecommendations(
      request,
      specializedAssessment,
      priority
    );

    return {
      priority,
      recommendedContact,
      followUpActions,
      schedulingRecommendations,
      clientCommunication: this.createClientCommunication(request, specializedAssessment),
    };
  }

  /**
   * Create follow-up actions
   */
  private createFollowUpActions(
    request: ClientIntakeRequest,
    specializedAssessment: any,
    priority: string
  ): string[] {
    const actions: string[] = [];
    
    // Priority-based actions
    if (priority === 'urgent') {
      actions.push('Schedule emergency consultation within 24 hours');
      actions.push('Send immediate acknowledgment and next steps');
    } else {
      actions.push('Send detailed assessment summary');
      actions.push('Schedule consultation within appropriate timeframe');
    }
    
    // Practice area specific actions
    if (specializedAssessment.type === 'criminal_defense') {
      actions.push('Provide court date reminders if applicable');
      actions.push('Send pre-consultation checklist');
    } else if (specializedAssessment.type === 'immigration') {
      actions.push('Provide document checklist specific to case type');
      actions.push('Send timeline expectations');
    }
    
    // Always include
    actions.push('Confirm preferred communication method');
    actions.push('Send intake confirmation and case number');
    
    return actions;
  }

  /**
   * Create scheduling recommendations
   */
  private createSchedulingRecommendations(
    request: ClientIntakeRequest,
    specializedAssessment: any,
    priority: string
  ): string[] {
    const recommendations: string[] = [];
    
    // Language preferences
    if (request.personalInfo.preferredLanguage === 'es') {
      recommendations.push('Schedule with Spanish-speaking attorney');
    }
    
    // Priority-based scheduling
    if (priority === 'urgent') {
      recommendations.push('Emergency slot - same day or next business day');
    } else if (priority === 'high') {
      recommendations.push('Priority scheduling within 48-72 hours');
    } else {
      recommendations.push('Standard scheduling within 1-2 weeks');
    }
    
    // Practice area considerations
    if (specializedAssessment.type === 'criminal_defense') {
      recommendations.push('Schedule before any court dates');
      recommendations.push('Allow extra time for criminal defense consultation');
    }
    
    // Location considerations
    if (request.personalInfo.location.state.toLowerCase() !== 'north carolina' &&
        request.personalInfo.location.state.toLowerCase() !== 'nc' &&
        specializedAssessment.type !== 'immigration') {
      recommendations.push('Virtual consultation or referral discussion');
    }
    
    return recommendations;
  }

  /**
   * Create client communication strategy
   */
  private createClientCommunication(request: ClientIntakeRequest, specializedAssessment: any): any {
    return {
      preferredLanguage: request.personalInfo.preferredLanguage,
      communicationMethods: ['email', 'phone'],
      messageTemplates: {
        acknowledgment: 'Thank you for contacting Vasquez Law Firm. We have received your consultation request.',
        nextSteps: 'Based on our initial assessment, here are your recommended next steps...',
        scheduling: 'We would like to schedule a consultation to discuss your case in detail.',
      },
      documentDelivery: 'Secure client portal or encrypted email',
      followUpSchedule: 'Initial contact within 24 hours, follow-up as needed',
    };
  }

  /**
   * Compile comprehensive assessment
   */
  private compileAssessment(
    request: ClientIntakeRequest,
    routing: RoutingDecision,
    specializedAssessment: any,
    financialAnalysis: any,
    recommendations: any,
    riskAnalysis: any,
    followUpStrategy: any
  ): CaseAssessmentResult {
    const assessmentId = `VLF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const clientId = request.clientId || `CLIENT-${Date.now()}`;

    // Extract case analysis from specialized assessment
    const assessment = specializedAssessment.assessment;
    const viability = assessment.caseViability || assessment.caseStrength || 'moderate';
    const complexity = assessment.caseComplexity || assessment.case_complexity || 'moderate';
    const likelihood = assessment.eligibility?.likelihood || assessment.compensability?.likely_compensable || 'needs_evaluation';
    const timeframe = assessment.eligibility?.timeframe || assessment.timeline?.estimated_resolution || '3-6 months';

    return {
      assessmentId,
      clientId,
      timestamp: new Date(),
      
      // Routing results
      practiceArea: routing.practiceArea,
      jurisdiction: routing.jurisdiction,
      agentUsed: specializedAssessment.agent,
      confidence: routing.confidence,
      
      // Case analysis
      caseAnalysis: {
        viability: this.normalizeViability(viability),
        complexity: this.normalizeComplexity(complexity),
        likelihood: this.normalizeLikelihood(likelihood),
        timeframe,
        jurisdiction: routing.jurisdiction,
      },
      
      // Financial analysis
      costAnalysis: {
        estimatedCosts: financialAnalysis.estimatedCosts,
        paymentOptions: financialAnalysis.paymentOptions,
        financialViability: financialAnalysis.financialViability,
      },
      
      // Recommendations
      recommendations: {
        immediate_actions: recommendations.immediate_actions,
        required_documents: recommendations.required_documents,
        next_steps: recommendations.next_steps,
        attorney_necessity: recommendations.attorney_necessity,
        timeline: recommendations.timeline,
      },
      
      // Risk assessment
      riskFactors: riskAnalysis.riskFactors,
      challenges: riskAnalysis.challenges,
      opportunities: riskAnalysis.opportunities,
      
      // Specialized assessment (full details)
      specializedAssessment: specializedAssessment,
      
      // AI Overview content
      aiOverviewContent: assessment.ai_overview_content,
      
      // Follow-up strategy
      followUpStrategy: {
        priority: followUpStrategy.priority,
        recommendedContact: followUpStrategy.recommendedContact,
        followUpActions: followUpStrategy.followUpActions,
        schedulingRecommendations: followUpStrategy.schedulingRecommendations,
      },
    };
  }

  /**
   * Normalization helpers
   */
  private normalizeViability(viability: any): 'strong' | 'good' | 'moderate' | 'weak' | 'not_viable' {
    if (typeof viability === 'boolean') {
      return viability ? 'good' : 'weak';
    }
    
    const v = String(viability).toLowerCase();
    if (v.includes('strong') || v.includes('excellent')) return 'strong';
    if (v.includes('good') || v.includes('likely')) return 'good';
    if (v.includes('weak') || v.includes('poor') || v.includes('problematic')) return 'weak';
    if (v.includes('not') || v.includes('no')) return 'not_viable';
    return 'moderate';
  }

  private normalizeComplexity(complexity: any): 'simple' | 'moderate' | 'complex' | 'extremely_complex' {
    const c = String(complexity).toLowerCase();
    if (c.includes('simple') || c.includes('basic')) return 'simple';
    if (c.includes('complex') || c.includes('difficult')) {
      if (c.includes('extremely') || c.includes('very')) return 'extremely_complex';
      return 'complex';
    }
    return 'moderate';
  }

  private normalizeLikelihood(likelihood: any): 'high' | 'moderate' | 'low' | 'needs_evaluation' {
    if (typeof likelihood === 'boolean') {
      return likelihood ? 'high' : 'low';
    }
    
    const l = String(likelihood).toLowerCase();
    if (l.includes('high') || l.includes('strong') || l.includes('likely')) return 'high';
    if (l.includes('low') || l.includes('weak') || l.includes('unlikely')) return 'low';
    if (l.includes('evaluation') || l.includes('review') || l.includes('assessment')) return 'needs_evaluation';
    return 'moderate';
  }

  /**
   * Fallback assessment for errors
   */
  private getFallbackAssessment(request: ClientIntakeRequest, routing: RoutingDecision): any {
    return {
      type: 'fallback',
      agent: 'fallback-assessment',
      assessment: {
        caseComplexity: 'moderate',
        caseViability: 'needs_evaluation',
        recommendations: {
          immediate_actions: ['Schedule consultation', 'Gather documents'],
          required_documents: ['Identification', 'Relevant legal documents'],
          attorney_necessity: 'recommended',
        },
        timeline: {
          estimated_resolution: '3-6 months',
        },
        eligibility: {
          costs: {
            government_fees: '$500-$2,000',
            attorney_fees: '$2,000-$8,000',
            total_estimated: '$3,000-$10,000',
          },
        },
      },
      routing,
    };
  }
}

// Export singleton instance
export const aiClientIntakeSystem = new AIClientIntakeSystem();