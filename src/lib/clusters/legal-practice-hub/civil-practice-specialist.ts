/**
 * Civil Practice Specialist - Consolidated Civil Law Agent
 * 
 * Consolidates 3 civil practice agents into one comprehensive system:
 * - personal-injury-specialist-agent.ts (PI, car accidents, slip/fall, medical malpractice)
 * - family-law-specialist-agent.ts (Divorce, custody, support, adoption)
 * - workers-compensation-specialist-agent.ts (Work injuries, benefits, claims)
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { APISafetyWrapper } from '@/lib/api-safety';
import { errorToLogMeta } from '@/lib/safe-logger';

export type CivilPracticeArea = 'personal_injury' | 'family_law' | 'workers_compensation';

export interface CivilPracticeConsultationRequest {
  practiceArea: CivilPracticeArea;
  
  // Personal Injury fields
  incidentType?: 'car_accident' | 'motorcycle_accident' | 'truck_accident' | 'slip_fall' | 'medical_malpractice' | 'product_liability' | 'workplace_accident' | 'wrongful_death' | 'other';
  incidentDate?: string;
  incidentLocation?: string;
  injuryType?: 'minor' | 'moderate' | 'severe' | 'catastrophic' | 'wrongful_death';
  liabilityClarity?: 'clear_other_fault' | 'mostly_other_fault' | 'disputed' | 'shared_fault' | 'unclear';
  
  // Family Law fields
  familyCaseType?: 'divorce' | 'custody' | 'child_support' | 'alimony' | 'adoption' | 'domestic_violence' | 'paternity' | 'modification' | 'contempt' | 'other';
  maritalStatus?: 'married' | 'separated' | 'divorced' | 'never_married';
  separationDate?: string;
  hasChildren?: boolean;
  childrenAges?: number[];
  cooperation?: 'amicable' | 'some_disagreement' | 'high_conflict' | 'hostile';
  
  // Workers Compensation fields
  workInjuryType?: 'accident' | 'repetitive_strain' | 'occupational_disease' | 'aggravation_existing' | 'mental_stress' | 'other';
  workInjuryDate?: string;
  reportedToEmployer?: boolean;
  workRelated?: 'clearly_yes' | 'mostly_yes' | 'disputed' | 'unclear';
  employerSize?: 'small' | 'medium' | 'large';
  
  // Common fields
  medicalTreatment: 'none' | 'emergency_only' | 'ongoing' | 'surgery_required' | 'long_term_care';
  insuranceCoverage?: {
    hasInsurance: boolean;
    otherPartyInsured?: boolean;
    workersCompInsurance?: boolean;
    medicalPayments?: boolean;
  };
  economicDamages?: {
    medicalExpenses: string;
    lostWages: string;
    ongoingExpenses: boolean;
    propertyDamage?: string;
  };
  priorAttorney: boolean;
  policeReport?: boolean;
  witnesses?: boolean;
  clientGoals: string[];
  urgency: 'immediate' | 'within_days' | 'within_weeks' | 'within_months' | 'planning';
  preferredResolution?: 'settlement' | 'mediation' | 'collaborative' | 'litigation' | 'open';
}

export interface CivilPracticeAnalysis {
  practiceArea: CivilPracticeArea;
  caseStrength: 'strong' | 'good' | 'moderate' | 'weak' | 'not_viable';
  caseComplexity: 'simple' | 'moderate' | 'complex' | 'highly_complex';
  
  legalAnalysis: {
    applicableStatutes: string[];
    keyLegalIssues: string[];
    strengthFactors: string[];
    weaknessFactors: string[];
    deadlines: Array<{
      type: string;
      date: string;
      critical: boolean;
    }>;
    venueConsiderations?: string;
  };
  
  financialAnalysis: {
    economicDamages?: {
      medicalCurrent: string;
      medicalFuture: string;
      lostWages: string;
      totalEconomic: string;
    };
    nonEconomicDamages?: {
      painSuffering: string;
      totalNonEconomic: string;
    };
    totalValueRange?: string;
    settlementRange?: string;
    childSupportEstimate?: string;
    alimonyLikelihood?: 'high' | 'moderate' | 'low' | 'none';
    workersCompBenefits?: {
      weeklyRate: string;
      permanentDisability: string;
      medicalBenefits: boolean;
    };
  };
  
  strategy: {
    recommendedApproach: 'settlement' | 'mediation' | 'collaborative' | 'litigation' | 'administrative';
    timeline: string;
    estimatedCost: string;
    keyPriorities: string[];
    negotiationLeverage?: string[];
    litigationRecommendation?: 'avoid' | 'consider' | 'recommend';
  };
  
  specificAnalysis?: {
    // Personal Injury specific
    contributoryNegligenceRisk?: 'low' | 'moderate' | 'high';
    contributoryNegligenceAnalysis?: string;
    
    // Family Law specific
    custodyAnalysis?: {
      bestInterestsFactors: string[];
      likelyOutcome: string;
      custodySchedule: string;
    };
    propertyDivision?: string;
    
    // Workers Comp specific
    compensabilityAnalysis?: {
      likelyCompensable: boolean;
      causationStrength: 'clear' | 'probable' | 'disputed' | 'weak';
      factorsSupporting: string[];
      factorsOpposing: string[];
    };
  };
  
  recommendations: {
    immediateActions: string[];
    evidencePreservation: string[];
    medicalRecommendations?: string[];
    documentationNeeded: string[];
    courtPreparation?: string[];
    mitigationStrategies: string[];
  };
  
  attorneyNecessity: 'essential' | 'strongly_recommended' | 'recommended' | 'helpful';
  consultationSummary: string;
  nextSteps: string[];
}

export class CivilPracticeSpecialist {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private crewLogger = createCrewLogger('civil-practice-specialist');

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.safetyWrapper = new APISafetyWrapper({
      key: apiKey,
      serviceName: 'OpenAI',
      required: false,
    });
    this.initializeModel();
  }

  private initializeModel() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'not-configured') {
      this.model = new ChatOpenAI({
        modelName: 'gpt-4-turbo-preview',
        temperature: 0.2,
        openAIApiKey: apiKey,
      });
    }
  }

  async analyzeCase(request: CivilPracticeConsultationRequest): Promise<CivilPracticeAnalysis> {
    return this.crewLogger.logExecution(
      'analyze-civil-case',
      async () => {
        logger.info('Starting civil practice case analysis', {
          practiceArea: request.practiceArea,
          urgency: request.urgency,
        });

        if (!this.model) {
          return this.getFallbackAnalysis(request);
        }

        try {
          let analysis: CivilPracticeAnalysis;

          // Route to appropriate practice area
          switch (request.practiceArea) {
            case 'personal_injury':
              analysis = await this.analyzePersonalInjury(request);
              break;
            case 'family_law':
              analysis = await this.analyzeFamilyLaw(request);
              break;
            case 'workers_compensation':
              analysis = await this.analyzeWorkersCompensation(request);
              break;
            default:
              throw new Error(`Unknown practice area: ${request.practiceArea}`);
          }

          logger.info('Civil practice case analysis completed', {
            practiceArea: request.practiceArea,
            caseStrength: analysis.caseStrength,
            attorneyNecessity: analysis.attorneyNecessity,
          });

          return analysis;
        } catch (error) {
          logger.error('Civil practice case analysis failed', errorToLogMeta(error));
          return this.getFallbackAnalysis(request);
        }
      },
      {
        input: request,
        metadata: {
          practiceArea: request.practiceArea,
          urgency: request.urgency,
        },
      }
    );
  }

  private async analyzePersonalInjury(request: CivilPracticeConsultationRequest): Promise<CivilPracticeAnalysis> {
    const systemPrompt = this.getPersonalInjurySystemPrompt();
    const userPrompt = this.buildPersonalInjuryPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  private async analyzeFamilyLaw(request: CivilPracticeConsultationRequest): Promise<CivilPracticeAnalysis> {
    const systemPrompt = this.getFamilyLawSystemPrompt();
    const userPrompt = this.buildFamilyLawPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  private async analyzeWorkersCompensation(request: CivilPracticeConsultationRequest): Promise<CivilPracticeAnalysis> {
    const systemPrompt = this.getWorkersCompSystemPrompt();
    const userPrompt = this.buildWorkersCompPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  // System prompts for each practice area
  private getPersonalInjurySystemPrompt(): string {
    return `You are an expert North Carolina personal injury attorney with comprehensive knowledge of NC tort law.

PERSONAL INJURY EXPERTISE:
- Motor vehicle accidents (cars, motorcycles, trucks)
- Premises liability (slip and fall, dangerous conditions)
- Medical malpractice and professional negligence
- Product liability and defective products
- Wrongful death and survival actions
- Insurance law and bad faith claims

NC CONTRIBUTORY NEGLIGENCE:
- Pure contributory negligence rule (harsh but important)
- Any contributory negligence bars recovery entirely
- Last clear chance doctrine as exception
- Gross negligence exception
- Willful or wanton conduct exception

DAMAGE CALCULATIONS:
- Economic damages: Medical expenses, lost wages, property damage
- Non-economic damages: Pain and suffering, loss of enjoyment
- No statutory caps on damages (except medical malpractice)
- Collateral source rule applications
- Future damages and present value calculations

COMMON ISSUES:
- Contributory negligence assessment
- Insurance coverage limits
- Subrogation and liens
- Statute of limitations (3 years general rule)
- Expert witness requirements

Focus on case viability, contributory negligence risks, and realistic damage assessments.`;
  }

  private getFamilyLawSystemPrompt(): string {
    return `You are an expert North Carolina family law attorney with comprehensive knowledge of NC domestic relations law.

FAMILY LAW EXPERTISE:
- Divorce and separation (absolute divorce requirements)
- Child custody and visitation (best interests standard)
- Child support (NC guidelines and deviations)
- Alimony and spousal support
- Equitable distribution of property
- Domestic violence and protective orders
- Adoption and paternity
- Post-divorce modifications

NC SPECIFIC REQUIREMENTS:
- One year separation required for no-fault divorce
- Equitable distribution (not community property)
- Best interests of child standard for custody
- Child support guidelines with deviation factors
- Alimony factors in NC Gen. Stat. § 50-16.3A

CUSTODY FACTORS:
- Child's safety, welfare, and best interests
- Parental fitness and stability
- Child's relationship with each parent
- Geographic considerations
- Child's preferences (if age appropriate)

FINANCIAL CONSIDERATIONS:
- Equitable distribution of marital property
- Separate vs marital property distinctions
- Business valuation and complex assets
- Retirement and pension benefits
- Tax consequences of support and property division

Emphasize child welfare, realistic financial expectations, and cost-effective resolution methods.`;
  }

  private getWorkersCompSystemPrompt(): string {
    return `You are an expert North Carolina workers' compensation attorney with knowledge of the NC Industrial Commission system.

WORKERS COMPENSATION EXPERTISE:
- Coverage requirements (3+ employees)
- Compensable injury standards
- Medical treatment and authorized physicians
- Temporary and permanent disability benefits
- Vocational rehabilitation services
- Third-party liability claims
- Industrial Commission procedures

COMPENSABILITY REQUIREMENTS:
- Injury by accident arising out of and in the course of employment
- Causal relationship between work and injury
- Notice requirements (30 days to employer, 2 years to Commission)
- Medical evidence and causation proof

BENEFIT TYPES:
- Temporary total disability (TTD)
- Temporary partial disability (TPD)
- Permanent partial disability (PPD)
- Permanent total disability (PTD)
- Medical compensation
- Vocational rehabilitation

DEADLINES:
- 30 days written notice to employer
- 2 years to file claim with Industrial Commission
- Various deadlines for appeals and hearings

STRATEGIC CONSIDERATIONS:
- Maximum medical improvement (MMI) determinations
- Impairment ratings and return to work
- Employer's duty to provide suitable employment
- Third-party recovery coordination

Focus on compensability analysis, benefit entitlements, and procedural requirements.`;
  }

  // Prompt builders for each practice area
  private buildPersonalInjuryPrompt(request: CivilPracticeConsultationRequest): string {
    return `Analyze this North Carolina personal injury case:

INCIDENT DETAILS:
- Type: ${request.incidentType}
- Date: ${request.incidentDate}
- Location: ${request.incidentLocation}
- Injury Type: ${request.injuryType}
- Liability: ${request.liabilityClarity}

MEDICAL TREATMENT: ${request.medicalTreatment}
ECONOMIC DAMAGES:
- Medical expenses: ${request.economicDamages?.medicalExpenses || 'Unknown'}
- Lost wages: ${request.economicDamages?.lostWages || 'Unknown'}
- Property damage: ${request.economicDamages?.propertyDamage || 'None'}
- Ongoing expenses: ${request.economicDamages?.ongoingExpenses ? 'Yes' : 'No'}

EVIDENCE:
- Police report: ${request.policeReport ? 'Yes' : 'No'}
- Witnesses: ${request.witnesses ? 'Yes' : 'No'}

INSURANCE:
- Client insured: ${request.insuranceCoverage?.hasInsurance ? 'Yes' : 'No'}
- Other party insured: ${request.insuranceCoverage?.otherPartyInsured ? 'Yes' : 'No'}

ANALYSIS REQUIRED:
1. Case viability and contributory negligence risk
2. Damage valuation (economic and non-economic)
3. Settlement vs litigation strategy
4. NC-specific legal considerations
5. Evidence preservation needs

Provide comprehensive personal injury analysis in JSON format.`;
  }

  private buildFamilyLawPrompt(request: CivilPracticeConsultationRequest): string {
    return `Analyze this North Carolina family law case:

CASE TYPE: ${request.familyCaseType}
MARITAL STATUS: ${request.maritalStatus}
SEPARATION DATE: ${request.separationDate || 'Not applicable'}
CHILDREN: ${request.hasChildren ? 'Yes' : 'No'}
${request.childrenAges ? `Ages: ${request.childrenAges.join(', ')}` : ''}
COOPERATION LEVEL: ${request.cooperation}
URGENCY: ${request.urgency}
PREFERRED RESOLUTION: ${request.preferredResolution || 'Open'}

CLIENT GOALS: ${request.clientGoals.join(', ')}

ANALYSIS REQUIRED:
1. Case complexity and strategy recommendations
2. Custody analysis (if children involved)
3. Financial analysis (support, property division)
4. NC family law requirements and procedures
5. Timeline and cost estimates
6. Alternative dispute resolution options

Provide comprehensive family law analysis in JSON format.`;
  }

  private buildWorkersCompPrompt(request: CivilPracticeConsultationRequest): string {
    return `Analyze this North Carolina workers' compensation case:

INJURY DETAILS:
- Type: ${request.workInjuryType}
- Date: ${request.workInjuryDate}
- Reported to employer: ${request.reportedToEmployer ? 'Yes' : 'No'}
- Work-related: ${request.workRelated}
- Employer size: ${request.employerSize}

MEDICAL TREATMENT: ${request.medicalTreatment}
INSURANCE: Workers comp insurance ${request.insuranceCoverage?.workersCompInsurance ? 'available' : 'unknown'}

ANALYSIS REQUIRED:
1. Compensability analysis
2. Benefit entitlements and calculations
3. Deadlines and procedural requirements
4. Medical treatment strategies
5. Return to work considerations
6. Third-party liability potential

Provide comprehensive workers compensation analysis in JSON format.`;
  }

  private parseAnalysisResponse(response: string, request: CivilPracticeConsultationRequest): CivilPracticeAnalysis {
    try {
      const parsed = JSON.parse(response);
      
      return {
        practiceArea: request.practiceArea,
        caseStrength: parsed.case_strength || this.assessCaseStrength(request),
        caseComplexity: parsed.case_complexity || this.assessComplexity(request),
        legalAnalysis: {
          applicableStatutes: parsed.applicable_statutes || [],
          keyLegalIssues: parsed.key_legal_issues || [],
          strengthFactors: parsed.strength_factors || [],
          weaknessFactors: parsed.weakness_factors || [],
          deadlines: parsed.deadlines || [],
          venueConsiderations: parsed.venue_considerations,
        },
        financialAnalysis: {
          economicDamages: parsed.economic_damages,
          nonEconomicDamages: parsed.non_economic_damages,
          totalValueRange: parsed.total_value_range,
          settlementRange: parsed.settlement_range,
          childSupportEstimate: parsed.child_support_estimate,
          alimonyLikelihood: parsed.alimony_likelihood,
          workersCompBenefits: parsed.workers_comp_benefits,
        },
        strategy: {
          recommendedApproach: parsed.recommended_approach || 'settlement',
          timeline: parsed.timeline || '6-12 months',
          estimatedCost: parsed.estimated_cost || '$5,000-$15,000',
          keyPriorities: parsed.key_priorities || [],
          negotiationLeverage: parsed.negotiation_leverage,
          litigationRecommendation: parsed.litigation_recommendation,
        },
        specificAnalysis: {
          contributoryNegligenceRisk: parsed.contributory_negligence_risk,
          contributoryNegligenceAnalysis: parsed.contributory_negligence_analysis,
          custodyAnalysis: parsed.custody_analysis,
          propertyDivision: parsed.property_division,
          compensabilityAnalysis: parsed.compensability_analysis,
        },
        recommendations: {
          immediateActions: parsed.immediate_actions || [],
          evidencePreservation: parsed.evidence_preservation || [],
          medicalRecommendations: parsed.medical_recommendations || [],
          documentationNeeded: parsed.documentation_needed || [],
          courtPreparation: parsed.court_preparation || [],
          mitigationStrategies: parsed.mitigation_strategies || [],
        },
        attorneyNecessity: parsed.attorney_necessity || this.assessAttorneyNecessity(request),
        consultationSummary: parsed.consultation_summary || this.generateSummary(request),
        nextSteps: parsed.next_steps || [],
      };
    } catch (error) {
      logger.warn('Failed to parse civil practice analysis response');
      return this.getFallbackAnalysis(request);
    }
  }

  private assessCaseStrength(request: CivilPracticeConsultationRequest): 'strong' | 'good' | 'moderate' | 'weak' | 'not_viable' {
    // Basic assessment logic
    if (request.practiceArea === 'personal_injury') {
      if (request.liabilityClarity === 'clear_other_fault' && request.injuryType === 'severe') return 'strong';
      if (request.liabilityClarity === 'shared_fault') return 'weak';
    }
    
    if (request.practiceArea === 'workers_compensation') {
      if (request.workRelated === 'clearly_yes') return 'strong';
      if (request.workRelated === 'disputed') return 'moderate';
    }

    return 'moderate';
  }

  private assessComplexity(request: CivilPracticeConsultationRequest): 'simple' | 'moderate' | 'complex' | 'highly_complex' {
    const complexityFactors = [
      request.priorAttorney,
      request.economicDamages?.ongoingExpenses,
      request.cooperation === 'high_conflict' || request.cooperation === 'hostile',
      request.urgency === 'immediate',
      request.hasChildren && request.practiceArea === 'family_law',
    ].filter(Boolean).length;

    if (complexityFactors >= 3) return 'highly_complex';
    if (complexityFactors >= 2) return 'complex';
    if (complexityFactors >= 1) return 'moderate';
    return 'simple';
  }

  private assessAttorneyNecessity(request: CivilPracticeConsultationRequest): 'essential' | 'strongly_recommended' | 'recommended' | 'helpful' {
    if (request.injuryType === 'severe' || request.injuryType === 'catastrophic' || request.injuryType === 'wrongful_death') {
      return 'essential';
    }
    
    if (request.cooperation === 'hostile' || request.practiceArea === 'workers_compensation') {
      return 'strongly_recommended';
    }
    
    return 'recommended';
  }

  private generateSummary(request: CivilPracticeConsultationRequest): string {
    const area = request.practiceArea.replace('_', ' ');
    return `This ${area} case has been assessed with ${this.assessCaseStrength(request)} case strength and ${this.assessComplexity(request)} complexity. Professional legal representation is ${this.assessAttorneyNecessity(request)} for this matter.`;
  }

  private getFallbackAnalysis(request: CivilPracticeConsultationRequest): CivilPracticeAnalysis {
    return {
      practiceArea: request.practiceArea,
      caseStrength: this.assessCaseStrength(request),
      caseComplexity: this.assessComplexity(request),
      legalAnalysis: {
        applicableStatutes: [`North Carolina General Statutes - ${request.practiceArea.replace('_', ' ')} law`],
        keyLegalIssues: ['Case assessment needed', 'Legal strategy development'],
        strengthFactors: ['Professional legal analysis required'],
        weaknessFactors: ['Detailed case review needed'],
        deadlines: [
          {
            type: 'Statute of limitations',
            date: 'Varies by case type',
            critical: true,
          },
        ],
      },
      financialAnalysis: {
        economicDamages: request.economicDamages ? {
          medicalCurrent: request.economicDamages.medicalExpenses,
          medicalFuture: 'To be determined',
          lostWages: request.economicDamages.lostWages,
          totalEconomic: 'Requires detailed analysis',
        } : undefined,
      },
      strategy: {
        recommendedApproach: 'settlement',
        timeline: '6-12 months',
        estimatedCost: '$5,000-$15,000',
        keyPriorities: ['Protect client interests', 'Gather evidence', 'Assess all options'],
      },
      recommendations: {
        immediateActions: ['Retain attorney', 'Preserve evidence', 'Follow medical treatment'],
        evidencePreservation: ['Document everything', 'Collect witness information'],
        medicalRecommendations: ['Continue prescribed treatment', 'Keep medical records'],
        documentationNeeded: ['Medical records', 'Financial documents', 'Correspondence'],
        mitigationStrategies: ['Professional legal guidance', 'Timely action'],
      },
      attorneyNecessity: this.assessAttorneyNecessity(request),
      consultationSummary: this.generateSummary(request),
      nextSteps: [
        'Schedule consultation with attorney',
        'Gather relevant documentation',
        'Follow all medical and legal advice',
      ],
    };
  }
}

export const civilPracticeSpecialist = new CivilPracticeSpecialist();