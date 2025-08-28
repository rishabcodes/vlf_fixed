/**
 * Immigration Law Specialist - Consolidated Immigration Agent
 * 
 * Consolidates 7 immigration agents into one intelligent system:
 * - immigration-specialist-agent.ts (General + AI Overview)
 * - business-immigration-agent.ts (Basic business visas)
 * - enhanced-business-immigration-agent.ts (Advanced business + AILA)
 * - enhanced-affirmative-immigration-agent.ts (Family-based)
 * - enhanced-humanitarian-agent.ts (Asylum/humanitarian)
 * - aila-trained-removal-agent.ts (Deportation defense)
 * - removal-defense-agent.ts (Basic removal defense)
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { APISafetyWrapper } from '@/lib/api-safety';
import { errorToLogMeta } from '@/lib/safe-logger';

export type ImmigrationSpecialty = 
  | 'general'
  | 'business'
  | 'family'
  | 'humanitarian'
  | 'removal_defense'
  | 'naturalization';

export interface ImmigrationConsultationRequest {
  clientType: 'individual' | 'family' | 'business' | 'employer';
  specialty: ImmigrationSpecialty;
  immigrationGoal:
    | 'green_card'
    | 'citizenship' 
    | 'visa'
    | 'work_authorization'
    | 'family_reunification'
    | 'asylum'
    | 'business_investment'
    | 'deportation_defense';
  currentStatus:
    | 'visitor'
    | 'student'
    | 'worker'
    | 'refugee'
    | 'asylee'
    | 'green_card_holder'
    | 'undocumented'
    | 'detained'
    | 'removal_proceedings'
    | 'other';
  countryOfOrigin: string;
  timeInUS?: string;
  familyTies?: 'spouse' | 'parent' | 'child' | 'sibling' | 'none';
  employmentBased?: boolean;
  urgency: 'immediate' | 'within_months' | 'within_year' | 'planning';
  priorDenials?: boolean;
  criminalHistory?: boolean;
  detainedLocation?: string;
  courtDate?: string;
  specificQuestions?: string[];
  preferredLanguage: 'en' | 'es';
}

export interface ImmigrationAnalysis {
  caseComplexity: 'simple' | 'moderate' | 'complex' | 'extremely_complex';
  specialty: ImmigrationSpecialty;
  eligibility: {
    primaryPathway: string;
    likelihood: 'high' | 'moderate' | 'low' | 'needs_evaluation';
    requirements: string[];
    timeframe: string;
    costs: {
      governmentFees: string;
      attorneyFees: string;
      totalEstimated: string;
    };
    alternativePathways?: string[];
  };
  legalAnalysis: {
    applicableLaws: string[];
    recentChanges: string[];
    precedentCases?: string[];
    successFactors: string[];
    riskFactors: string[];
    strategies: string[];
  };
  recommendations: {
    immediateActions: string[];
    requiredDocuments: string[];
    potentialChallenges: string[];
    timeline: Array<{
      phase: string;
      duration: string;
      actions: string[];
    }>;
  };
  consultationSummary: string;
  nextSteps: string[];
  aiOverviewContent?: {
    faqAnswers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    contentOptimization: string;
  };
}

export class ImmigrationLawSpecialist {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private crewLogger = createCrewLogger('immigration-law-specialist');

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

  async analyzeCase(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    return this.crewLogger.logExecution(
      'analyze-immigration-case',
      async () => {
        logger.info('Starting immigration case analysis', {
          specialty: request.specialty,
          immigrationGoal: request.immigrationGoal,
          currentStatus: request.currentStatus,
          urgency: request.urgency,
        });

        if (!this.model) {
          return this.getFallbackAnalysis(request);
        }

        try {
          // Route to appropriate specialty handler
          const analysis = await this.routeToSpecialty(request);
          
          // Add AI Overview content if requested
          if (request.specialty === 'general') {
            analysis.aiOverviewContent = await this.generateAIOverviewContent(request, analysis);
          }

          logger.info('Immigration case analysis completed', {
            specialty: request.specialty,
            complexity: analysis.caseComplexity,
            likelihood: analysis.eligibility.likelihood,
          });

          return analysis;
        } catch (error) {
          logger.error('Immigration case analysis failed', errorToLogMeta(error));
          return this.getFallbackAnalysis(request);
        }
      },
      {
        input: request,
        metadata: {
          specialty: request.specialty,
          immigrationGoal: request.immigrationGoal,
          urgency: request.urgency,
        },
      }
    );
  }

  private async routeToSpecialty(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    switch (request.specialty) {
      case 'business':
        return this.analyzeBusinessImmigration(request);
      case 'family':
        return this.analyzeAffirmativeImmigration(request);
      case 'humanitarian':
        return this.analyzeHumanitarianProtection(request);
      case 'removal_defense':
        return this.analyzeRemovalDefense(request);
      case 'naturalization':
        return this.analyzeCitizenship(request);
      case 'general':
      default:
        return this.analyzeGeneralImmigration(request);
    }
  }

  private async analyzeBusinessImmigration(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    const systemPrompt = this.getBusinessImmigrationSystemPrompt();
    const userPrompt = this.buildBusinessImmigrationPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request, 'business');
  }

  private async analyzeAffirmativeImmigration(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    const systemPrompt = this.getFamilyImmigrationSystemPrompt();
    const userPrompt = this.buildFamilyImmigrationPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request, 'family');
  }

  private async analyzeHumanitarianProtection(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    const systemPrompt = this.getHumanitarianSystemPrompt();
    const userPrompt = this.buildHumanitarianPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request, 'humanitarian');
  }

  private async analyzeRemovalDefense(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    const systemPrompt = this.getRemovalDefenseSystemPrompt();
    const userPrompt = this.buildRemovalDefensePrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request, 'removal_defense');
  }

  private async analyzeCitizenship(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    const systemPrompt = this.getCitizenshipSystemPrompt();
    const userPrompt = this.buildCitizenshipPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request, 'naturalization');
  }

  private async analyzeGeneralImmigration(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    const systemPrompt = this.getGeneralImmigrationSystemPrompt();
    const userPrompt = this.buildGeneralImmigrationPrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseAnalysisResponse(response.content.toString(), request, 'general');
  }

  private async generateAIOverviewContent(
    request: ImmigrationConsultationRequest,
    analysis: ImmigrationAnalysis
  ): Promise<{
    faqAnswers: Array<{
      question: string;
      answer: string;
      voiceOptimized: boolean;
    }>;
    contentOptimization: string;
  }> {
    const contentPrompt = `Generate AI Overview optimized content for this immigration case:

CASE TYPE: ${request.immigrationGoal}
PATHWAY: ${analysis.eligibility.primaryPathway}

Generate 5-8 FAQ answers optimized for AI Overview (40-60 words each):

1. "How long does ${analysis.eligibility.primaryPathway} take?"
2. "What documents do I need for ${request.immigrationGoal}?"
3. "How much does ${analysis.eligibility.primaryPathway} cost?"
4. "What are the requirements for ${request.immigrationGoal}?"
5. "Can I work while ${analysis.eligibility.primaryPathway} is pending?"
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
      "voice_optimized": true
    }
  ],
  "content_optimization": "Additional content suggestions for AI Overview"
}`;

    try {
      const response = await this.model!.invoke([
        new SystemMessage(this.getGeneralImmigrationSystemPrompt()),
        new HumanMessage(contentPrompt),
      ]);

      const parsed = JSON.parse(response.content.toString());
      return {
        faqAnswers: parsed.faq_answers.map((faq: any) => ({
          question: faq.question,
          answer: faq.answer,
          voiceOptimized: faq.voice_optimized,
        })),
        contentOptimization: parsed.content_optimization,
      };
    } catch (error) {
      logger.warn('Failed to generate AI Overview content');
      return {
        faqAnswers: [],
        contentOptimization: 'Standard immigration content recommendations',
      };
    }
  }

  // System prompts for each specialty
  private getBusinessImmigrationSystemPrompt(): string {
    return `You are an expert Employment-based immigration attorney trained on the AILA Cookbook of Essential Practice Materials.

Your specialized knowledge includes:

BUSINESS VISA CATEGORIES:
H-1B: Specialty occupation, bachelor's degree required, LCA filing, premium processing available
L-1: Intracompany transfers, 1 year employment abroad, executive/managerial (L-1A) or specialized knowledge (L-1B)
O-1: Extraordinary ability in sciences/arts/business/athletics, meet 3 of 8 criteria
E-1/E-2: Treaty traders/investors, substantial trade/investment, treaty country nationals
TN: NAFTA professionals, specific occupations listed
R-1: Religious workers, 2+ years experience

PERMANENT RESIDENCE:
EB-1: Extraordinary ability, outstanding professors/researchers, multinational executives
EB-2: Advanced degree professionals, national interest waivers
EB-3: Skilled workers, professionals, other workers
EB-5: Investor visas, $900K/$1.8M investment, job creation
PERM: Labor certification, prevailing wage determination, recruitment requirements

PROCESSING TIMES:
H-1B: 4-6 months regular, 15 days premium
L-1: 2-4 months regular, 15 days premium
O-1: 2-3 months regular, 15 days premium
PERM: 11-15 months total (PWD + recruitment + processing)
EB categories: 8-12 months

Always provide specific forms, timelines, and requirements. Consider cap limitations, premium processing, and potential RFE issues.`;
  }

  private getFamilyImmigrationSystemPrompt(): string {
    return `You are an expert family-based immigration attorney with comprehensive knowledge of affirmative immigration processes.

FAMILY CATEGORIES:
IR: Immediate relatives (spouses, parents, unmarried children under 21 of US citizens) - no cap
F1: Unmarried children of US citizens - capped, wait times vary
F2: Spouses and children of LPRs - capped, priority dates apply
F3: Married children of US citizens - capped, longer wait times
F4: Siblings of US citizens - capped, longest wait times

PROCESSES:
I-130: Family petition, establishes relationship
I-485: Adjustment of status (if in US)
Consular processing: Interview at US consulate
I-864: Affidavit of support, income requirements

SPECIAL CASES:
K-1: Fiancé visas, 90 days to marry
K-3: Spouse visas for pending I-130
V visas: For long-waiting F2 spouses/children
VAWA: Self-petitions for abused spouses/children

Focus on eligibility requirements, priority dates, public charge considerations, and documentation needs.`;
  }

  private getHumanitarianSystemPrompt(): string {
    return `You are an expert humanitarian immigration attorney specializing in protection cases.

PROTECTION CATEGORIES:
Asylum: Persecution in home country, must apply within 1 year (exceptions exist)
Withholding of removal: Higher standard than asylum, no time limit
CAT: Convention Against Torture, protection from torture
Refugee: Outside US, referred by UNHCR or similar
TPS: Temporary protected status for designated countries

ASYLUM GROUNDS:
- Race, religion, nationality, political opinion, particular social group
- Past persecution or well-founded fear
- Government involvement or inability to protect
- Internal relocation not reasonable

SPECIAL PROGRAMS:
VAWA: Self-petitions for abuse victims
U-Visa: Crime victims who assist law enforcement
T-Visa: Human trafficking victims
Special Immigrant Juvenile Status (SIJS)

EVIDENCE NEEDS:
Country condition evidence, medical records, psychological evaluations, witness statements, expert testimony

Always consider trauma-informed approaches, interpreter needs, and safety concerns.`;
  }

  private getRemovalDefenseSystemPrompt(): string {
    return `You are an AILA-trained deportation defense attorney with expertise in removal proceedings.

REMOVAL DEFENSE STRATEGIES:
Cancellation of removal: 10+ years presence, exceptional hardship to qualifying relatives
Adjustment of status: Eligible family/employment petition
Asylum: Protection from persecution
Withholding of removal: Clear probability standard
CAT protection: More likely than not tortured

BOND CONSIDERATIONS:
- Mandatory detention categories
- Bond factors: community ties, flight risk, danger to community
- Joseph hearing: Prolonged detention challenges

COURT PROCEDURES:
Master calendar hearing: Pleadings and scheduling
Individual hearing: Merits and evidence presentation
Motion practice: Continuances, severance, termination
Appeals: BIA, circuit courts, deadlines

COMMON ISSUES:
- Criminal history and immigration consequences
- Document authenticity and fraud
- Credibility determinations
- Statute of limitations
- In absentia orders and motions to reopen

URGENT PRIORITIES:
1. Court dates - never miss without prior approval
2. Bond hearings for detained individuals
3. Asylum one-year deadline (if applicable)
4. Appeal deadlines (30 days to BIA)

Focus on immediate relief options, court deadlines, and strategic case planning.`;
  }

  private getCitizenshipSystemPrompt(): string {
    return `You are an expert naturalization attorney with comprehensive knowledge of citizenship law.

NATURALIZATION REQUIREMENTS:
- Lawful permanent resident for 5+ years (3 if married to USC)
- Physical presence: 30+ months in 5 years (18 months if married to USC)
- Continuous residence: No trips 6+ months (with exceptions)
- English proficiency: Speaking, reading, writing
- Civics knowledge: US history and government
- Good moral character: Background check, no disqualifying crimes
- Oath of allegiance

SPECIAL CASES:
Military naturalization: Expedited process, overseas service
Disabled applicants: Medical disability exceptions
Children: Automatic citizenship, certificate of citizenship
Derived citizenship: Parents' naturalization

COMMON ISSUES:
- Tax compliance and filing requirements
- Criminal history analysis
- Extended absences from US
- Selective service registration
- Name changes and documentation

FORMS AND PROCESS:
N-400: Application for naturalization
Biometrics appointment
Interview and tests
Oath ceremony

Focus on eligibility requirements, potential obstacles, and preparation strategies.`;
  }

  private getGeneralImmigrationSystemPrompt(): string {
    return `You are an expert immigration attorney with comprehensive knowledge of U.S. immigration law and AI Overview optimization.

IMMIGRATION LAW EXPERTISE:
- Immigration and Nationality Act (INA) and implementing regulations
- Family-based, employment-based, and humanitarian immigration
- Nonimmigrant visas and status changes
- Removal proceedings and deportation defense
- Naturalization and citizenship
- USCIS policies and procedures

SPECIALIZATIONS:
- Comprehensive case assessment and pathway analysis
- Multi-option strategies for complex cases
- Integration of different immigration benefits
- Timing and sequencing of applications
- Risk assessment and mitigation strategies

AI OVERVIEW OPTIMIZATION:
- Provide direct, authoritative answers (40-60 words)
- Use question-based analysis for common immigration questions
- Include specific forms, timelines, and costs
- Optimize content for voice search and AI Overview selection
- Maintain legal accuracy while being accessible

Always analyze all available options, consider case-specific factors, and provide clear next steps.`;
  }

  // Prompt builders for each specialty
  private buildBusinessImmigrationPrompt(request: ImmigrationConsultationRequest): string {
    return `Analyze this business immigration case:

CLIENT PROFILE:
- Client Type: ${request.clientType}
- Immigration Goal: ${request.immigrationGoal}
- Current Status: ${request.currentStatus}
- Country of Origin: ${request.countryOfOrigin}
- Time in US: ${request.timeInUS || 'Not specified'}
- Employment Based: ${request.employmentBased ? 'Yes' : 'No'}
- Urgency: ${request.urgency}
- Prior Denials: ${request.priorDenials ? 'Yes' : 'No'}
- Criminal History: ${request.criminalHistory ? 'Yes' : 'No'}

ANALYSIS REQUIRED:
1. Primary business immigration pathway
2. Eligibility assessment with likelihood
3. Required documentation and evidence
4. Processing timeframes and costs
5. Alternative pathways if applicable
6. Potential challenges and strategies
7. PERM requirements if applicable

Provide comprehensive analysis in JSON format with all required fields.`;
  }

  private buildFamilyImmigrationPrompt(request: ImmigrationConsultationRequest): string {
    return `Analyze this family-based immigration case:

CLIENT PROFILE:
- Immigration Goal: ${request.immigrationGoal}
- Current Status: ${request.currentStatus}
- Country of Origin: ${request.countryOfOrigin}
- Family Ties: ${request.familyTies || 'None specified'}
- Time in US: ${request.timeInUS || 'Not specified'}
- Urgency: ${request.urgency}
- Prior Denials: ${request.priorDenials ? 'Yes' : 'No'}

ANALYSIS REQUIRED:
1. Family-based petition category (IR, F1-F4)
2. Priority date considerations
3. Adjustment vs consular processing
4. Affidavit of support requirements
5. Public charge considerations
6. Timeline and cost analysis
7. Required documentation

Provide detailed family immigration analysis in JSON format.`;
  }

  private buildHumanitarianPrompt(request: ImmigrationConsultationRequest): string {
    return `Analyze this humanitarian protection case:

CLIENT PROFILE:
- Immigration Goal: ${request.immigrationGoal}
- Current Status: ${request.currentStatus}
- Country of Origin: ${request.countryOfOrigin}
- Time in US: ${request.timeInUS || 'Not specified'}
- Urgency: ${request.urgency}
- Criminal History: ${request.criminalHistory ? 'Yes' : 'No'}

PROTECTION ANALYSIS:
1. Asylum eligibility and one-year deadline
2. Withholding of removal prospects
3. CAT protection assessment
4. TPS availability for country
5. Special programs (VAWA, U-visa, T-visa)
6. Evidence requirements
7. Country condition considerations

Provide trauma-informed humanitarian protection analysis in JSON format.`;
  }

  private buildRemovalDefensePrompt(request: ImmigrationConsultationRequest): string {
    return `Analyze this removal defense case:

CLIENT PROFILE:
- Current Status: ${request.currentStatus}
- Country of Origin: ${request.countryOfOrigin}
- Time in US: ${request.timeInUS || 'Not specified'}
- Detained: ${request.detainedLocation || 'No'}
- Court Date: ${request.courtDate || 'Not scheduled'}
- Family Ties: ${request.familyTies || 'None'}
- Criminal History: ${request.criminalHistory ? 'Yes' : 'No'}
- Urgency: ${request.urgency}

DEFENSE ANALYSIS:
1. Cancellation of removal eligibility
2. Adjustment of status possibilities
3. Asylum/withholding/CAT protection
4. Bond eligibility and factors
5. Court procedure and deadlines
6. Appeal options and strategies
7. Immediate actions required

URGENT CONSIDERATIONS:
- Court dates and deadlines
- Detention status
- Available relief options
- Evidence needs

Provide comprehensive removal defense analysis in JSON format.`;
  }

  private buildCitizenshipPrompt(request: ImmigrationConsultationRequest): string {
    return `Analyze this naturalization case:

CLIENT PROFILE:
- Current Status: ${request.currentStatus}
- Time as LPR: ${request.timeInUS || 'Not specified'}
- Country of Origin: ${request.countryOfOrigin}
- Family Ties: ${request.familyTies || 'None'}
- Criminal History: ${request.criminalHistory ? 'Yes' : 'No'}

NATURALIZATION ANALYSIS:
1. Basic eligibility requirements (5/3 year rule)
2. Physical presence calculation
3. Continuous residence issues
4. English and civics requirements
5. Good moral character assessment
6. Tax compliance considerations
7. Timeline and preparation needs

Provide detailed naturalization eligibility analysis in JSON format.`;
  }

  private buildGeneralImmigrationPrompt(request: ImmigrationConsultationRequest): string {
    return `Analyze this immigration case comprehensively:

CLIENT PROFILE:
- Client Type: ${request.clientType}
- Immigration Goal: ${request.immigrationGoal}
- Current Status: ${request.currentStatus}
- Country of Origin: ${request.countryOfOrigin}
- Time in US: ${request.timeInUS || 'Not specified'}
- Family Ties: ${request.familyTies || 'None'}
- Employment Based: ${request.employmentBased ? 'Yes' : 'No'}
- Urgency: ${request.urgency}
- Prior Denials: ${request.priorDenials ? 'Yes' : 'No'}
- Criminal History: ${request.criminalHistory ? 'Yes' : 'No'}

COMPREHENSIVE ANALYSIS REQUIRED:
1. All available immigration pathways
2. Primary recommendation with likelihood
3. Alternative options and strategies
4. Timeline and cost analysis
5. Potential challenges and solutions
6. Required documentation
7. Next steps and priorities

Provide complete immigration analysis in JSON format.`;
  }

  private parseAnalysisResponse(response: string, request: ImmigrationConsultationRequest, specialty: ImmigrationSpecialty): ImmigrationAnalysis {
    try {
      const parsed = JSON.parse(response);
      
      return {
        caseComplexity: this.determineCaseComplexity(request),
        specialty: specialty,
        eligibility: {
          primaryPathway: parsed.primary_pathway || parsed.primaryPathway || `${request.immigrationGoal} application`,
          likelihood: parsed.likelihood || 'needs_evaluation',
          requirements: parsed.requirements || [],
          timeframe: parsed.timeframe || '6-12 months',
          costs: {
            governmentFees: parsed.government_fees || '$1,000-$3,000',
            attorneyFees: this.estimateAttorneyFees(request.immigrationGoal, this.determineCaseComplexity(request)),
            totalEstimated: parsed.total_estimated || '$4,000-$8,000',
          },
          alternativePathways: parsed.alternative_pathways || [],
        },
        legalAnalysis: {
          applicableLaws: parsed.applicable_laws || [],
          recentChanges: parsed.recent_changes || [],
          precedentCases: parsed.precedent_cases || [],
          successFactors: parsed.success_factors || [],
          riskFactors: parsed.risk_factors || [],
          strategies: parsed.strategies || [],
        },
        recommendations: {
          immediateActions: parsed.immediate_actions || [],
          requiredDocuments: parsed.required_documents || [],
          potentialChallenges: parsed.potential_challenges || [],
          timeline: parsed.timeline || [],
        },
        consultationSummary: parsed.consultation_summary || this.generateSummary(request),
        nextSteps: parsed.next_steps || ['Consult with immigration attorney', 'Gather required documents'],
      };
    } catch (error) {
      logger.warn('Failed to parse immigration analysis response');
      return this.getFallbackAnalysis(request);
    }
  }

  private determineCaseComplexity(request: ImmigrationConsultationRequest): 'simple' | 'moderate' | 'complex' | 'extremely_complex' {
    const complexityFactors = [
      request.priorDenials,
      request.criminalHistory,
      request.currentStatus === 'undocumented',
      request.currentStatus === 'detained',
      request.currentStatus === 'removal_proceedings',
      request.urgency === 'immediate',
      request.specialty === 'humanitarian',
      request.specialty === 'removal_defense',
    ].filter(Boolean).length;

    if (complexityFactors === 0) return 'simple';
    if (complexityFactors <= 1) return 'moderate';
    if (complexityFactors <= 3) return 'complex';
    return 'extremely_complex';
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
        deportation_defense: '$5,000-$15,000',
      },
      extremely_complex: {
        green_card: '$10,000-$20,000',
        citizenship: '$7,000-$15,000',
        visa: '$6,000-$12,000',
        work_authorization: '$4,000-$8,000',
        family_reunification: '$8,000-$15,000',
        asylum: '$12,000-$25,000',
        deportation_defense: '$15,000-$35,000',
        business_investment: '$15,000-$30,000',
      },
    };

    const complexityFees = (feeRanges as any)[complexity];
    if (!complexityFees) return '$3,000-$8,000';

    return complexityFees[goal] || '$3,000-$8,000';
  }

  private generateSummary(request: ImmigrationConsultationRequest): string {
    return `Based on your ${request.immigrationGoal} goal and ${request.currentStatus} status, we have analyzed your immigration options. This case has been classified as ${this.determineCaseComplexity(request)} complexity. Professional legal representation is recommended for your specific situation.`;
  }

  private getFallbackAnalysis(request: ImmigrationConsultationRequest): ImmigrationAnalysis {
    return {
      caseComplexity: this.determineCaseComplexity(request),
      specialty: request.specialty,
      eligibility: {
        primaryPathway: `${request.immigrationGoal.replace('_', ' ')} application`,
        likelihood: 'needs_evaluation',
        requirements: ['Valid passport', 'Completed forms', 'Supporting evidence'],
        timeframe: '6-18 months',
        costs: {
          governmentFees: '$1,000-$3,000',
          attorneyFees: this.estimateAttorneyFees(request.immigrationGoal, this.determineCaseComplexity(request)),
          totalEstimated: '$4,000-$11,000',
        },
      },
      legalAnalysis: {
        applicableLaws: ['Immigration and Nationality Act', '8 CFR Immigration Regulations'],
        recentChanges: ['Processing time updates', 'Fee adjustments'],
        successFactors: ['Complete documentation', 'Professional representation'],
        riskFactors: ['Missing documents', 'Eligibility questions'],
        strategies: ['Thorough preparation', 'Legal consultation'],
      },
      recommendations: {
        immediateActions: ['Consult immigration attorney', 'Gather documents', 'Review requirements'],
        requiredDocuments: ['Passport', 'Birth certificate', 'Supporting evidence'],
        potentialChallenges: ['Document requirements', 'Processing delays'],
        timeline: [
          {
            phase: 'Document preparation',
            duration: '1-2 months',
            actions: ['Gather required documents', 'Complete forms'],
          },
          {
            phase: 'Application processing',
            duration: '6-12 months',
            actions: ['Submit application', 'Respond to requests'],
          },
        ],
      },
      consultationSummary: this.generateSummary(request),
      nextSteps: ['Schedule consultation with immigration attorney', 'Begin gathering required documentation'],
    };
  }
}

export const immigrationLawSpecialist = new ImmigrationLawSpecialist();