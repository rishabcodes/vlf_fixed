/**
 * Criminal Defense Specialist - Consolidated Criminal Defense Agent
 * 
 * Consolidates 2 criminal defense agents into one comprehensive system:
 * - criminal-defense-agent.ts (Basic criminal case analysis)
 * - criminal-defense-specialist-agent.ts (Advanced NC-specific + AI Overview)
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { APISafetyWrapper } from '@/lib/api-safety';
import { errorToLogMeta } from '@/lib/safe-logger';

export interface CriminalDefenseConsultationRequest {
  clientName: string;
  chargeType: 'dui_dwi' | 'drug_charges' | 'assault' | 'domestic_violence' | 'theft' | 'white_collar' | 'traffic_violations' | 'probation_violation' | 'expungement' | 'other';
  charges: string;
  chargeLevel: 'infraction' | 'misdemeanor' | 'felony' | 'federal';
  chargeDate: string;
  arrestDate?: string;
  county: string;
  currentStatus: 'arrested' | 'charged' | 'released_on_bond' | 'in_custody' | 'awaiting_trial' | 'post_conviction';
  isDetained: boolean;
  bondStatus: 'not_set' | 'cash_bond' | 'secured_bond' | 'unsecured_bond' | 'released_or' | 'denied_bond';
  bondAmount?: string;
  courtDate?: string;
  priorRecord: boolean;
  priorConvictions?: string[];
  circumstances: {
    alcoholInvolved: boolean;
    drugsInvolved: boolean;
    weaponInvolved: boolean;
    injuryOccurred: boolean;
    propertyDamage: boolean;
    cooperatedWithPolice: boolean;
    hasWitnesses: boolean;
    accidentInvolved?: boolean;
    breathalyzerRefusal?: boolean;
  };
  evidence: {
    policeReport: boolean;
    breathalyzer: boolean;
    bloodTest: boolean;
    fieldSobrietyTest: boolean;
    videoFootage: boolean;
    photographs: boolean;
    searchConducted: boolean;
    evidenceDescription?: string;
    bacLevel?: string;
  };
  concerns: {
    employment: boolean;
    license: boolean;
    immigration: boolean;
    professionalLicense?: boolean;
    securityClearance?: boolean;
  };
  clientGoals: string[];
  urgency: 'immediate' | 'within_days' | 'within_weeks' | 'planning';
}

export interface CriminalDefenseAnalysis {
  caseStrength: 'strong_defense' | 'good_defense' | 'moderate_defense' | 'challenging' | 'very_difficult';
  chargeAnalysis: {
    formalCharges: string[];
    chargeElements: string[];
    potentialPenalties: {
      fineRange: string;
      jailTime: string;
      probationLength: string;
      licenseImpact: string;
      otherConsequences: string[];
    };
    enhancementFactors: string[];
    mitigatingFactors: string[];
    priorRecordImpact?: string;
  };
  defenseStrategy: {
    primaryDefenses: string[];
    evidenceChallenges: string[];
    proceduralIssues: string[];
    constitutionalChallenges: string[];
    pleaOptions: string[];
    trialStrategy: string[];
    duiSpecificDefenses?: string[];
  };
  ncLawAnalysis: {
    applicableStatutes: string[];
    sentencingGuidelines: string[];
    courtProcedures: string[];
    appealOptions: string[];
    recentChanges?: string[];
  };
  timeline: {
    nextCourtDate: string;
    pretrialDeadlines: string[];
    trialTimeline: string;
    resolutionEstimate: string;
    bondHearingOptions?: string;
  };
  consequences: {
    criminalPenalties: string[];
    collateralConsequences: string[];
    employmentImpact: string[];
    licenseImpact: string[];
    immigrationImpact?: string[];
    professionalConsequences?: string[];
  };
  recommendations: {
    immediateActions: string[];
    evidencePreservation: string[];
    courtPreparation: string[];
    mitigationStrategies: string[];
    investigationNeeds: string[];
  };
  expungementEligibility?: {
    eligible: boolean;
    waitingPeriod: string;
    requirements: string[];
    limitations?: string[];
  };
  attorneyNecessity: 'essential' | 'strongly_recommended' | 'recommended' | 'helpful';
  consultationSummary: string;
  nextSteps: string[];
}

export class CriminalDefenseSpecialist {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private crewLogger = createCrewLogger('criminal-defense-specialist');

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

  async analyzeCase(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    return this.crewLogger.logExecution(
      'analyze-criminal-case',
      async () => {
        logger.info('Starting criminal defense case analysis', {
          chargeType: request.chargeType,
          chargeLevel: request.chargeLevel,
          county: request.county,
          urgency: request.urgency,
        });

        if (!this.model) {
          return this.getFallbackAnalysis(request);
        }

        try {
          let analysis: CriminalDefenseAnalysis;

          // Route to specialized analysis based on charge type
          switch (request.chargeType) {
            case 'dui_dwi':
              analysis = await this.analyzeDUICase(request);
              break;
            case 'drug_charges':
              analysis = await this.analyzeDrugCase(request);
              break;
            case 'assault':
            case 'domestic_violence':
              analysis = await this.analyzeViolentCrime(request);
              break;
            case 'theft':
            case 'white_collar':
              analysis = await this.analyzePropertyCrime(request);
              break;
            case 'expungement':
              analysis = await this.analyzeExpungement(request);
              break;
            default:
              analysis = await this.analyzeGeneralCriminal(request);
          }

          logger.info('Criminal defense case analysis completed', {
            caseStrength: analysis.caseStrength,
            attorneyNecessity: analysis.attorneyNecessity,
          });

          return analysis;
        } catch (error) {
          logger.error('Criminal defense case analysis failed', errorToLogMeta(error));
          return this.getFallbackAnalysis(request);
        }
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

  private async analyzeDUICase(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    const systemPrompt = this.getDUISystemPrompt();
    const userPrompt = this.buildDUIPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  private async analyzeDrugCase(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    const systemPrompt = this.getDrugSystemPrompt();
    const userPrompt = this.buildDrugPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  private async analyzeViolentCrime(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    const systemPrompt = this.getViolentCrimeSystemPrompt();
    const userPrompt = this.buildViolentCrimePrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  private async analyzePropertyCrime(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    const systemPrompt = this.getPropertyCrimeSystemPrompt();
    const userPrompt = this.buildPropertyCrimePrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  private async analyzeExpungement(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    const systemPrompt = this.getExpungementSystemPrompt();
    const userPrompt = this.buildExpungementPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  private async analyzeGeneralCriminal(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    const systemPrompt = this.getGeneralCriminalSystemPrompt();
    const userPrompt = this.buildGeneralCriminalPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request);
  }

  // System prompts for different criminal law specialties
  private getDUISystemPrompt(): string {
    return `You are an expert North Carolina DUI/DWI defense attorney with comprehensive knowledge of NC impaired driving law.

DUI/DWI EXPERTISE:
- NC General Statutes § 20-138.1 (impaired driving)
- NC General Statutes § 20-16.2 (implied consent)
- Field sobriety test procedures and challenges
- Breathalyzer and blood test reliability
- Administrative license revocation (ALR)
- Ignition interlock requirements
- DWI sentencing levels and aggravating/mitigating factors

COMMON DEFENSES:
- Improper stop (reasonable suspicion lacking)
- Improper arrest (probable cause lacking)  
- Breathalyzer calibration and maintenance issues
- Blood test chain of custody problems
- Field sobriety test administration errors
- Medical conditions affecting tests
- Rising blood alcohol defense

NC DWI LEVELS:
- Level V: Fine up to $200, 24 hours to 60 days jail
- Level IV: Fine up to $500, 48 hours to 120 days jail
- Level III: Fine up to $1,000, 72 hours to 6 months jail
- Level II: Fine up to $2,000, 7 days to 1 year jail
- Level I: Fine up to $4,000, 30 days to 2 years jail
- Aggravated Level I: Fine up to $10,000, 12 months to 3 years jail

COLLATERAL CONSEQUENCES:
- License revocation (30 days to permanent)
- Insurance rate increases
- Employment impact (CDL holders, etc.)
- Immigration consequences for non-citizens
- Professional license implications

Provide specific NC law citations and practical defense strategies.`;
  }

  private getDrugSystemPrompt(): string {
    return `You are an expert North Carolina drug defense attorney with knowledge of state and federal drug laws.

DRUG OFFENSE EXPERTISE:
- NC Controlled Substances Act (NCCSA)
- Federal Controlled Substances Act
- Possession, trafficking, and distribution charges
- Drug paraphernalia offenses
- Prescription drug violations
- Marijuana possession and cultivation

COMMON DEFENSES:
- Fourth Amendment search and seizure violations
- Lack of knowledge or constructive possession
- Insufficient evidence of intent to distribute
- Chain of custody issues
- Lab testing reliability
- Entrapment or police misconduct

NC DRUG PENALTIES:
- Marijuana: Up to $1,000 fine, up to 120 days jail (first offense)
- Cocaine possession: Class I felony, 3-12 months
- Drug trafficking: Mandatory minimums based on weight
- Habitual offender enhancements possible

TRAFFICKING THRESHOLDS:
- Marijuana: 10+ pounds
- Cocaine: 28+ grams
- Heroin: 4+ grams
- Methamphetamine: 28+ grams

Focus on constitutional challenges, alternative sentencing, and treatment programs.`;
  }

  private getViolentCrimeSystemPrompt(): string {
    return `You are an expert North Carolina violent crime defense attorney.

VIOLENT CRIME EXPERTISE:
- Assault charges (simple, aggravated, deadly weapon)
- Domestic violence offenses (50B protective orders)
- Robbery and armed robbery
- Sexual assault and related charges
- Gun and weapon violations
- Self-defense claims

ASSAULT LEVELS:
- Simple assault: Class 2 misdemeanor
- Assault inflicting serious injury: Class A1 misdemeanor
- Assault with deadly weapon: Class E felony
- Assault on government official: Enhanced penalties

DOMESTIC VIOLENCE:
- 50B protective order implications
- Firearms restrictions
- Enhanced penalties for repeat offenses
- Mandatory arrest policies
- Victim cooperation issues

DEFENSES:
- Self-defense and defense of others
- Consent (where applicable)
- Lack of intent
- Identity issues
- Credibility challenges
- Constitutional violations

Consider victim impact, family relationships, and potential for restorative justice approaches.`;
  }

  private getPropertyCrimeSystemPrompt(): string {
    return `You are an expert North Carolina property crime defense attorney.

PROPERTY CRIME EXPERTISE:
- Larceny and theft charges
- Breaking and entering
- White collar crimes (embezzlement, fraud)
- Identity theft and cybercrime
- Forgery and uttering
- Damage to property

THEFT CLASSIFICATIONS:
- Misdemeanor larceny: Property value under $1,000
- Felony larceny: Property value $1,000 or more
- Organized retail theft
- Motor vehicle theft
- Theft of firearm (special penalties)

WHITE COLLAR DEFENSES:
- Lack of intent to defraud
- Good faith belief in authority
- Statute of limitations
- Insufficient evidence
- Entrapment
- Duress or coercion

RESTITUTION:
- Mandatory restitution to victims
- Payment plan options
- Insurance recoveries
- Community service alternatives

Focus on financial impact, restitution arrangements, and employment consequences.`;
  }

  private getExpungementSystemPrompt(): string {
    return `You are an expert North Carolina expungement attorney with knowledge of NC expungement laws.

EXPUNGEMENT EXPERTISE:
- NC General Statutes Chapter 15A (expunctions)
- Dismissed charges expungement
- Not guilty verdict expungement  
- First-time offender programs
- Juvenile record expungement
- Multiple conviction limitations

ELIGIBILITY REQUIREMENTS:
- Waiting periods (varies by offense type)
- No subsequent convictions
- Court costs and fees paid
- Victim notification requirements
- Fingerprint requirements

COMMON EXPUNGEMENTS:
- Dismissal/not guilty: Immediate eligibility
- First-time misdemeanor: 5 years + clean record
- First-time felony: 10 years + clean record
- Underage drinking: Special provisions
- Drug possession: Conditional discharge programs

LIMITATIONS:
- Violent felonies generally not eligible
- DWI convictions not expungeable
- Sex crimes typically excluded
- Commercial vehicle violations

Process involves petition filing, background check, court hearing, and multiple agency notifications.`;
  }

  private getGeneralCriminalSystemPrompt(): string {
    return `You are an experienced North Carolina criminal defense attorney with comprehensive knowledge of NC criminal law.

CRIMINAL LAW EXPERTISE:
- NC General Statutes criminal code
- Criminal procedure and evidence rules
- Constitutional criminal law
- Sentencing guidelines and alternatives
- Appellate practice
- Collateral consequences

PRACTICE AREAS:
- Misdemeanor and felony defense
- Traffic violations and license issues
- Probation violations and revocations
- Appeals and post-conviction relief
- Juvenile defense
- Mental health and competency issues

COMMON DEFENSES:
- Constitutional violations (4th, 5th, 6th Amendments)
- Insufficient evidence
- Mistaken identity
- Alibi defenses
- Mental health defenses
- Entrapment and duress

SENTENCING OPTIONS:
- Active imprisonment
- Intermediate punishment
- Community punishment
- Probation supervision
- Restitution and fines
- Community service

Focus on comprehensive case analysis, constitutional protections, and strategic defense planning.`;
  }

  // Prompt builders for different case types
  private buildDUIPrompt(request: CriminalDefenseConsultationRequest): string {
    return `Analyze this North Carolina DUI/DWI case:

CLIENT: ${request.clientName}
CHARGES: ${request.charges}
ARREST DATE: ${request.arrestDate}
COUNTY: ${request.county}
CURRENT STATUS: ${request.currentStatus}
BAC LEVEL: ${request.evidence.bacLevel || 'Unknown'}
PRIOR DWI: ${request.priorRecord ? 'Yes' : 'No'}

CIRCUMSTANCES:
- Alcohol involved: ${request.circumstances.alcoholInvolved ? 'Yes' : 'No'}
- Drugs involved: ${request.circumstances.drugsInvolved ? 'Yes' : 'No'}
- Accident: ${request.circumstances.accidentInvolved ? 'Yes' : 'No'}
- Injury: ${request.circumstances.injuryOccurred ? 'Yes' : 'No'}
- Breathalyzer refusal: ${request.circumstances.breathalyzerRefusal ? 'Yes' : 'No'}

EVIDENCE:
- Breathalyzer: ${request.evidence.breathalyzer ? 'Yes' : 'No'}
- Blood test: ${request.evidence.bloodTest ? 'Yes' : 'No'}
- Field sobriety tests: ${request.evidence.fieldSobrietyTest ? 'Yes' : 'No'}
- Video footage: ${request.evidence.videoFootage ? 'Yes' : 'No'}

CONCERNS:
- License: ${request.concerns.license ? 'Yes' : 'No'}
- Employment: ${request.concerns.employment ? 'Yes' : 'No'}
- Immigration: ${request.concerns.immigration ? 'Yes' : 'No'}

Provide comprehensive DWI analysis in JSON format with all required fields.`;
  }

  private buildDrugPrompt(request: CriminalDefenseConsultationRequest): string {
    return `Analyze this North Carolina drug case:

CLIENT: ${request.clientName}
CHARGES: ${request.charges}
COUNTY: ${request.county}
SEARCH CONDUCTED: ${request.evidence.searchConducted ? 'Yes' : 'No'}
PRIOR RECORD: ${request.priorRecord ? 'Yes' : 'No'}

Provide drug case analysis focusing on search and seizure issues, possession vs trafficking, and available defenses.`;
  }

  private buildViolentCrimePrompt(request: CriminalDefenseConsultationRequest): string {
    return `Analyze this North Carolina violent crime case:

CLIENT: ${request.clientName}
CHARGES: ${request.charges}
WEAPON INVOLVED: ${request.circumstances.weaponInvolved ? 'Yes' : 'No'}
INJURY: ${request.circumstances.injuryOccurred ? 'Yes' : 'No'}
WITNESSES: ${request.circumstances.hasWitnesses ? 'Yes' : 'No'}

Provide violent crime analysis focusing on self-defense, witness credibility, and potential defenses.`;
  }

  private buildPropertyCrimePrompt(request: CriminalDefenseConsultationRequest): string {
    return `Analyze this North Carolina property crime case:

CLIENT: ${request.clientName}
CHARGES: ${request.charges}
PROPERTY DAMAGE: ${request.circumstances.propertyDamage ? 'Yes' : 'No'}

Provide property crime analysis focusing on intent, value determinations, and restitution issues.`;
  }

  private buildExpungementPrompt(request: CriminalDefenseConsultationRequest): string {
    return `Analyze this North Carolina expungement case:

CLIENT: ${request.clientName}
CHARGES FOR EXPUNGEMENT: ${request.charges}
CHARGE DATE: ${request.chargeDate}
CURRENT STATUS: ${request.currentStatus}
PRIOR CONVICTIONS: ${request.priorConvictions?.join(', ') || 'None'}

Provide expungement eligibility analysis with waiting periods and requirements.`;
  }

  private buildGeneralCriminalPrompt(request: CriminalDefenseConsultationRequest): string {
    return `Analyze this North Carolina criminal case:

CLIENT: ${request.clientName}
CHARGES: ${request.charges}
CHARGE LEVEL: ${request.chargeLevel}
COUNTY: ${request.county}
CURRENT STATUS: ${request.currentStatus}
BOND STATUS: ${request.bondStatus}
COURT DATE: ${request.courtDate || 'Not set'}
PRIOR RECORD: ${request.priorRecord ? 'Yes' : 'No'}

EVIDENCE: ${request.evidence.evidenceDescription || 'See evidence checklist'}

CONCERNS:
- Employment: ${request.concerns.employment ? 'Yes' : 'No'}
- License: ${request.concerns.license ? 'Yes' : 'No'}
- Immigration: ${request.concerns.immigration ? 'Yes' : 'No'}

Provide comprehensive criminal defense analysis in JSON format.`;
  }

  private parseAnalysisResponse(response: string, request: CriminalDefenseConsultationRequest): CriminalDefenseAnalysis {
    try {
      const parsed = JSON.parse(response);
      
      return {
        caseStrength: parsed.case_strength || this.assessCaseStrength(request),
        chargeAnalysis: {
          formalCharges: parsed.formal_charges || [request.charges],
          chargeElements: parsed.charge_elements || [],
          potentialPenalties: {
            fineRange: parsed.fine_range || this.estimateFines(request.chargeLevel),
            jailTime: parsed.jail_time || this.estimateJailTime(request.chargeLevel),
            probationLength: parsed.probation_length || '12-24 months',
            licenseImpact: parsed.license_impact || 'Possible suspension',
            otherConsequences: parsed.other_consequences || [],
          },
          enhancementFactors: parsed.enhancement_factors || [],
          mitigatingFactors: parsed.mitigating_factors || [],
          priorRecordImpact: request.priorRecord ? parsed.prior_record_impact : undefined,
        },
        defenseStrategy: {
          primaryDefenses: parsed.primary_defenses || [],
          evidenceChallenges: parsed.evidence_challenges || [],
          proceduralIssues: parsed.procedural_issues || [],
          constitutionalChallenges: parsed.constitutional_challenges || [],
          pleaOptions: parsed.plea_options || [],
          trialStrategy: parsed.trial_strategy || [],
          duiSpecificDefenses: request.chargeType === 'dui_dwi' ? parsed.dui_defenses : undefined,
        },
        ncLawAnalysis: {
          applicableStatutes: parsed.applicable_statutes || [],
          sentencingGuidelines: parsed.sentencing_guidelines || [],
          courtProcedures: parsed.court_procedures || [],
          appealOptions: parsed.appeal_options || [],
          recentChanges: parsed.recent_changes || [],
        },
        timeline: {
          nextCourtDate: parsed.next_court_date || request.courtDate || 'To be scheduled',
          pretrialDeadlines: parsed.pretrial_deadlines || [],
          trialTimeline: parsed.trial_timeline || '3-6 months',
          resolutionEstimate: parsed.resolution_estimate || '2-4 months',
          bondHearingOptions: request.isDetained ? parsed.bond_options : undefined,
        },
        consequences: {
          criminalPenalties: parsed.criminal_penalties || [],
          collateralConsequences: parsed.collateral_consequences || [],
          employmentImpact: parsed.employment_impact || [],
          licenseImpact: parsed.license_impact || [],
          immigrationImpact: request.concerns.immigration ? parsed.immigration_impact : undefined,
          professionalConsequences: request.concerns.professionalLicense ? parsed.professional_consequences : undefined,
        },
        recommendations: {
          immediateActions: parsed.immediate_actions || [],
          evidencePreservation: parsed.evidence_preservation || [],
          courtPreparation: parsed.court_preparation || [],
          mitigationStrategies: parsed.mitigation_strategies || [],
          investigationNeeds: parsed.investigation_needs || [],
        },
        expungementEligibility: request.chargeType === 'expungement' ? {
          eligible: parsed.expungement_eligible || false,
          waitingPeriod: parsed.waiting_period || 'Varies by offense',
          requirements: parsed.expungement_requirements || [],
          limitations: parsed.expungement_limitations || [],
        } : undefined,
        attorneyNecessity: parsed.attorney_necessity || this.assessAttorneyNecessity(request),
        consultationSummary: parsed.consultation_summary || this.generateSummary(request),
        nextSteps: parsed.next_steps || ['Retain criminal defense attorney immediately'],
      };
    } catch (error) {
      logger.warn('Failed to parse criminal defense analysis response');
      return this.getFallbackAnalysis(request);
    }
  }

  private assessCaseStrength(request: CriminalDefenseConsultationRequest): 'strong_defense' | 'good_defense' | 'moderate_defense' | 'challenging' | 'very_difficult' {
    const strengthFactors = [
      !request.evidence.policeReport,
      !request.evidence.videoFootage,
      !request.circumstances.cooperatedWithPolice,
      request.circumstances.hasWitnesses,
      !request.priorRecord,
    ].filter(Boolean).length;

    if (strengthFactors >= 4) return 'strong_defense';
    if (strengthFactors >= 3) return 'good_defense';
    if (strengthFactors >= 2) return 'moderate_defense';
    if (strengthFactors >= 1) return 'challenging';
    return 'very_difficult';
  }

  private assessAttorneyNecessity(request: CriminalDefenseConsultationRequest): 'essential' | 'strongly_recommended' | 'recommended' | 'helpful' {
    if (request.chargeLevel === 'felony' || request.isDetained || request.concerns.immigration) {
      return 'essential';
    }
    if (request.chargeType === 'dui_dwi' || request.priorRecord || request.concerns.employment) {
      return 'strongly_recommended';
    }
    if (request.chargeLevel === 'misdemeanor') {
      return 'recommended';
    }
    return 'helpful';
  }

  private estimateFines(chargeLevel: string): string {
    switch (chargeLevel) {
      case 'infraction':
        return '$25-$200';
      case 'misdemeanor':
        return '$200-$1,000';
      case 'felony':
        return '$1,000-$25,000';
      case 'federal':
        return '$1,000-$250,000';
      default:
        return '$200-$5,000';
    }
  }

  private estimateJailTime(chargeLevel: string): string {
    switch (chargeLevel) {
      case 'infraction':
        return 'No jail time';
      case 'misdemeanor':
        return '0-120 days';
      case 'felony':
        return '3-120 months';
      case 'federal':
        return '0-20+ years';
      default:
        return '0-12 months';
    }
  }

  private generateSummary(request: CriminalDefenseConsultationRequest): string {
    return `${request.clientName} is facing ${request.chargeLevel} ${request.chargeType.replace('_', ' ')} charges in ${request.county} County, North Carolina. Based on the circumstances and evidence, this case requires ${this.assessAttorneyNecessity(request)} legal representation. The case strength is assessed as ${this.assessCaseStrength(request)}.`;
  }

  private getFallbackAnalysis(request: CriminalDefenseConsultationRequest): CriminalDefenseAnalysis {
    return {
      caseStrength: this.assessCaseStrength(request),
      chargeAnalysis: {
        formalCharges: [request.charges],
        chargeElements: ['Prosecution must prove all elements beyond reasonable doubt'],
        potentialPenalties: {
          fineRange: this.estimateFines(request.chargeLevel),
          jailTime: this.estimateJailTime(request.chargeLevel),
          probationLength: '12-24 months possible',
          licenseImpact: 'May affect driving privileges',
          otherConsequences: ['Criminal record', 'Background check issues'],
        },
        enhancementFactors: request.priorRecord ? ['Prior criminal history'] : [],
        mitigatingFactors: ['No prior record', 'Cooperation with investigation'].filter(factor => 
          factor === 'No prior record' ? !request.priorRecord : request.circumstances.cooperatedWithPolice
        ),
      },
      defenseStrategy: {
        primaryDefenses: ['Challenge evidence', 'Negotiate plea agreement'],
        evidenceChallenges: ['Evidence authenticity', 'Chain of custody'],
        proceduralIssues: ['Proper arrest procedures', 'Miranda rights'],
        constitutionalChallenges: ['Fourth Amendment search issues', 'Due process'],
        pleaOptions: ['Plea to lesser charge', 'Deferred prosecution'],
        trialStrategy: ['Jury selection', 'Cross-examination of witnesses'],
      },
      ncLawAnalysis: {
        applicableStatutes: ['North Carolina General Statutes'],
        sentencingGuidelines: ['NC structured sentencing'],
        courtProcedures: ['District court procedures'],
        appealOptions: ['Superior court appeal', 'Appellate court review'],
      },
      timeline: {
        nextCourtDate: request.courtDate || 'To be scheduled',
        pretrialDeadlines: ['Discovery requests', 'Motion filing deadlines'],
        trialTimeline: '3-6 months from arraignment',
        resolutionEstimate: '2-4 months typical',
      },
      consequences: {
        criminalPenalties: [this.estimateJailTime(request.chargeLevel), this.estimateFines(request.chargeLevel)],
        collateralConsequences: ['Criminal record', 'Employment screening issues'],
        employmentImpact: request.concerns.employment ? ['Job applications', 'Professional licensing'] : [],
        licenseImpact: request.concerns.license ? ['Driving privileges', 'Professional licenses'] : [],
        immigrationImpact: request.concerns.immigration ? ['Deportation risk', 'Naturalization impact'] : undefined,
      },
      recommendations: {
        immediateActions: ['Retain attorney immediately', 'Do not discuss case with anyone', 'Preserve evidence'],
        evidencePreservation: ['Witness contact information', 'Photos of scene', 'Medical records if injured'],
        courtPreparation: ['Court appearance requirements', 'Dress code', 'Arrive early'],
        mitigationStrategies: ['Character references', 'Employment verification', 'Community service'],
        investigationNeeds: ['Witness interviews', 'Expert consultation', 'Evidence analysis'],
      },
      attorneyNecessity: this.assessAttorneyNecessity(request),
      consultationSummary: this.generateSummary(request),
      nextSteps: [
        'Retain experienced criminal defense attorney immediately',
        'Do not speak to police without attorney present',
        'Begin gathering character references and documentation',
        'Comply with all bond conditions if released',
      ],
    };
  }
}

export const criminalDefenseSpecialist = new CriminalDefenseSpecialist();