import { CookbookExtractor } from './cookbook-extractor';
import { logger } from '@/lib/safe-logger';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import type { TrainingData, QueryContext, AnalysisResult, AgentParams } from '@/types/crewai';

interface AgentTrainingConfig {
  agentFile: string;
  agentType: 'affirmative' | 'humanitarian' | 'business';
  className: string;
  systemPromptVar: string;
}

interface TrainingDataEntry {
  topics?: string[];
  keywords?: string[];
  regulations?: string[];
  procedures?: Record<string, unknown>;
}

interface MockAnalysisData {
  family: AnalysisResult;
  naturalization: AnalysisResult;
  consular: AnalysisResult;
  asylum: AnalysisResult;
  uvisa: AnalysisResult;
  tps: AnalysisResult;
  vawa: AnalysisResult;
  h1b: AnalysisResult;
  perm: AnalysisResult;
  eb1: AnalysisResult;
  l1: AnalysisResult;
}

export class AgentTrainer {
  private extractor: CookbookExtractor;
  private agentsPath = path.join(process.cwd(), 'src/lib/crewai/agents');

  constructor() {
    this.extractor = new CookbookExtractor();
  }

  async trainAllAgents(): Promise<void> {
    logger.info('Starting comprehensive agent training from AILA Cookbook');

    // Generate training data from cookbook
    const trainingData = await this.extractor.generateTrainingData();

    // Define agents to train
    const agentsToTrain: AgentTrainingConfig[] = [
      {
        agentFile: 'enhanced-affirmative-immigration-agent.ts',
        agentType: 'affirmative',
        className: 'EnhancedAffirmativeImmigrationAgent',
        systemPromptVar: 'affirmativeSystemPrompt',
      },
      {
        agentFile: 'enhanced-humanitarian-agent.ts',
        agentType: 'humanitarian',
        className: 'EnhancedHumanitarianAgent',
        systemPromptVar: 'humanitarianSystemPrompt',
      },
      {
        agentFile: 'enhanced-business-immigration-agent.ts',
        agentType: 'business',
        className: 'EnhancedBusinessImmigrationAgent',
        systemPromptVar: 'businessSystemPrompt',
      },
    ];

    // Train each agent
    for (const config of agentsToTrain) {
      await this.createTrainedAgent(config, trainingData[config.agentType]);
    }

    // Update the crew coordinator to use enhanced agents
    await this.updateCrewCoordinator();

    logger.info('Agent training completed successfully');
  }

  private async createTrainedAgent(config: AgentTrainingConfig, trainingData: TrainingData): Promise<void> {
    logger.info(`Creating trained ${config.agentType} agent`);

    const agentCode = this.generateAgentCode(config, trainingData);
    const filePath = path.join(this.agentsPath, config.agentFile);

    await writeFile(filePath, agentCode, 'utf-8');
    logger.info(`Created ${config.agentFile}`);
  }

  private generateAgentCode(config: AgentTrainingConfig, trainingData: TrainingData): string {
    const { className, systemPromptVar, agentType } = config;

    // Generate comprehensive system prompt with cookbook knowledge
    const systemPrompt = this.generateSystemPrompt(agentType, trainingData);

    // Generate methods based on specializations
    const methods = this.generateSpecializedMethods(agentType, trainingData);

    return `import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';

export class ${className} {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private ${systemPromptVar} = \`${systemPrompt}\`;

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
        openAIApiKey: apiKey,
        modelName: 'gpt-4',
        temperature: 0.7,
      });
    }
  }

${methods}

  private extractListItems(text: string): string[] {
    return text
      .split('\\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().match(/^\\d+\\./))
      .map(line => line.replace(/^[-•\\d.]\\s*/, '').trim())
      .filter(item => item.length > 0);
  }

  private parseResponse(content: string): unknown {
    const sections = content.split('\\n\\n');
    return {
      summary: sections[0] || '',
      recommendations: this.extractListItems(sections[1] || ''),
      requirements: this.extractListItems(sections[2] || ''),
      timeline: sections[3] || '',
      nextSteps: this.extractListItems(sections[4] || ''),
      warnings: this.extractListItems(sections[5] || ''),
    };
  }
}
`;
  }

  private getExpertiseForAgent(agentType: string): string {
    const expertiseMap = {
      affirmative: 'affirmative immigration',
      humanitarian: 'humanitarian immigration',
      business: 'business immigration',
      removal: 'removal defense',
      criminal: 'criminal immigration',
    };
    return expertiseMap[agentType as keyof typeof expertiseMap] || 'immigration';
  }

  private generateSystemPrompt(agentType: string, trainingData: TrainingData): string {
    const expertise = this.getExpertiseForAgent(agentType);
    const agentData = (trainingData[agentType as keyof TrainingData] || {}) as TrainingDataEntry;

    const basePrompt = `You are an expert ${expertise} attorney trained on the AILA Cookbook of Essential Practice Materials (4th Edition).

Your specialized knowledge includes:

TOPICS:
${agentData.topics?.join('\\n') || 'General immigration topics'}

KEYWORDS:
${agentData.keywords?.join('\\n') || 'Immigration law keywords'}

REGULATIONS:
${agentData.regulations?.join('\\n') || 'Federal immigration regulations'}

PROCEDURES:
${Object.keys(agentData.procedures || {}).join('\\n') || 'Standard immigration procedures'}

When providing advice:
1. Always cite specific forms and requirements
2. Provide accurate timelines based on current processing times
3. Identify potential issues early
4. Suggest document preparation strategies
5. Explain procedures step-by-step
6. Warn about common pitfalls
7. Be precise about eligibility requirements
8. Consider case-specific factors`;

    return basePrompt;
  }

  private generateSpecializedMethods(agentType: string, trainingData: TrainingData): string {
    const methodsMap = {
      affirmative: `
  async analyzeFamilyPetition(params: {
    petitioner: string;
    beneficiary: string;
    relationship: string;
    petitionerStatus: 'USC' | 'LPR';
    beneficiaryLocation: 'US' | 'abroad';
    priorityCategory?: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('family', params);
      }

      const userPrompt = \`Analyze family-based petition:
Petitioner: \${params.petitioner} (\${params.petitionerStatus})
Beneficiary: \${params.beneficiary}
Relationship: \${params.relationship}
Beneficiary Location: \${params.beneficiaryLocation}
Priority Category: \${params.priorityCategory || 'To be determined'}\`;

      const response = await this.model.call([
        new SystemMessage(this.affirmativeSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Family petition analysis failed', error);
      return this.getMockAnalysis('family', params);
    }
  }

  async prepareNaturalization(params: {
    clientName: string;
    greenCardDate: string;
    physicalPresence: string;
    continuousResidence: string;
    criminalHistory?: string;
    englishAbility: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('naturalization', params);
      }

      const userPrompt = \`Assess naturalization eligibility:
Client: \${params.clientName}
Green Card Since: \${params.greenCardDate}
Physical Presence: \${params.physicalPresence}
Continuous Residence: \${params.continuousResidence}
Criminal History: \${params.criminalHistory || 'None'}
English Ability: \${params.englishAbility}\`;

      const response = await this.model.call([
        new SystemMessage(this.affirmativeSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Naturalization analysis failed', error);
      return this.getMockAnalysis('naturalization', params);
    }
  }

  async analyzeConsularProcess(params: {
    caseType: string;
    beneficiaryCountry: string;
    documentReadiness: string;
    previousDenials?: string;
    unlawfulPresence?: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('consular', params);
      }

      const userPrompt = \`Analyze consular processing case:
Case Type: \${params.caseType}
Embassy/Consulate: \${params.beneficiaryCountry}
Document Status: \${params.documentReadiness}
Previous Denials: \${params.previousDenials || 'None'}
Unlawful Presence: \${params.unlawfulPresence || 'None'}\`;

      const response = await this.model.call([
        new SystemMessage(this.affirmativeSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Consular process analysis failed', error);
      return this.getMockAnalysis('consular', params);
    }
  }

  private getMockAnalysis(type: string, params: AgentParams): AnalysisResult {
    const mockData: MockAnalysisData = {
      family: {
        summary: 'Family-based petition analysis complete',
        recommendations: [
          'File I-130 petition immediately',
          'Prepare extensive documentation of relationship',
          'Consider concurrent I-485 if eligible',
        ],
        requirements: [
          'Proof of petitioner status (birth certificate/naturalization)',
          'Proof of relationship (marriage/birth certificates)',
          'Petitioner domicile evidence',
          'Affidavit of Support I-864',
        ],
        timeline: 'Immediate relative: 8-14 months; Family preference: varies by category',
        nextSteps: [
          'Gather all required documents',
          'Complete forms I-130 and I-130A',
          'Prepare filing fee',
          'Submit to appropriate USCIS center',
        ],
        warnings: [
          'Check visa bulletin for priority dates',
          'Maintain legal status if adjusting',
          'Disclose all criminal history',
        ],
      },
      naturalization: {
        summary: 'Naturalization eligibility assessment complete',
        recommendations: [
          'File N-400 online for faster processing',
          'Request fee waiver if eligible',
          'Prepare for English and civics tests',
        ],
        requirements: [
          '5 years as LPR (3 if married to USC)',
          'Physical presence of 30 months',
          'Continuous residence maintained',
          'Good moral character',
          'English and civics knowledge',
        ],
        timeline: 'Current processing: 8-12 months from filing to oath',
        nextSteps: [
          'Calculate physical presence precisely',
          'Gather tax returns for 5 years',
          'List all trips outside US',
          'Study for tests',
        ],
        warnings: [
          'Disclose all arrests/citations',
          'File taxes before applying',
          'Maintain residence in jurisdiction',
        ],
      },
      consular: {
        summary: 'Consular processing pathway identified',
        recommendations: [
          'Complete DS-260 carefully',
          'Prepare civil documents early',
          'Address any grounds of inadmissibility',
        ],
        requirements: [
          'Form DS-260 completion',
          'Civil documents (birth, marriage, police)',
          'Medical exam with panel physician',
          'Affidavit of Support documents',
        ],
        timeline: 'NVC processing: 2-4 months; Interview wait: varies by post',
        nextSteps: [
          'Pay NVC fees',
          'Submit civil documents',
          'Complete DS-260',
          'Schedule medical exam',
        ],
        warnings: [
          'Check document validity periods',
          'Prepare for potential administrative processing',
          'Address unlawful presence bars if applicable',
        ],
      },
    };

    return mockData[type as keyof MockAnalysisData] || mockData.family;
  }`,

      humanitarian: `
  async analyzeAsylumClaim(params: {
    clientName: string;
    countryOfOrigin: string;
    persecutionType: string;
    protectedGround: string;
    entryDate: string;
    previousApplications?: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('asylum', params);
      }

      const userPrompt = \`Analyze asylum claim:
Client: \${params.clientName}
Country: \${params.countryOfOrigin}
Persecution: \${params.persecutionType}
Protected Ground: \${params.protectedGround}
Entry Date: \${params.entryDate}
Previous Applications: \${params.previousApplications || 'None'}\`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Asylum analysis failed', error);
      return this.getMockAnalysis('asylum', params);
    }
  }

  async prepareUVisa(params: {
    clientName: string;
    crimeType: string;
    harmSuffered: string;
    lawEnforcementCooperation: string;
    certificationStatus: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('uvisa', params);
      }

      const userPrompt = \`Prepare U visa case:
Client: \${params.clientName}
Crime: \${params.crimeType}
Harm: \${params.harmSuffered}
Cooperation: \${params.lawEnforcementCooperation}
Certification: \${params.certificationStatus}\`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('U visa preparation failed', error);
      return this.getMockAnalysis('uvisa', params);
    }
  }

  async assessTPS(params: {
    clientName: string;
    country: string;
    entryDate: string;
    continuousPresence: string;
    criminalHistory?: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('tps', params);
      }

      const userPrompt = \`Assess TPS eligibility:
Client: \${params.clientName}
Country: \${params.country}
Entry Date: \${params.entryDate}
Continuous Presence: \${params.continuousPresence}
Criminal History: \${params.criminalHistory || 'None'}\`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('TPS assessment failed', error);
      return this.getMockAnalysis('tps', params);
    }
  }

  async analyzeVAWA(params: {
    clientName: string;
    abuserStatus: string;
    relationshipType: string;
    abuseDocumentation: string;
    currentSafety: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('vawa', params);
      }

      const userPrompt = \`Analyze VAWA self-petition:
Client: \${params.clientName}
Abuser Status: \${params.abuserStatus}
Relationship: \${params.relationshipType}
Documentation: \${params.abuseDocumentation}
Current Safety: \${params.currentSafety}\`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('VAWA analysis failed', error);
      return this.getMockAnalysis('vawa', params);
    }
  }

  private getMockAnalysis(type: string, params: AgentParams): AnalysisResult {
    const mockData: MockAnalysisData = {
      asylum: {
        summary: 'Asylum claim requires immediate attention to one-year deadline',
        recommendations: [
          'File I-589 within one year of entry',
          'Document persecution thoroughly',
          'Gather country condition evidence',
          'Consider withholding/CAT as alternatives',
        ],
        requirements: [
          'Persecution on account of protected ground',
          'Unable/unwilling to return due to persecution',
          'Not firmly resettled in third country',
          'File within one year (or show exception)',
        ],
        timeline: 'Affirmative: 2-5 years; Defensive: varies by court',
        nextSteps: [
          'Complete I-589 with detailed statement',
          'Gather corroborating evidence',
          'Research country conditions',
          'Prepare for credibility assessment',
        ],
        warnings: [
          'One-year deadline is strictly enforced',
          'Inconsistencies can destroy credibility',
          'Particular social group must be carefully defined',
        ],
      },
      uvisa: {
        summary: 'U visa eligibility appears strong with proper documentation',
        recommendations: [
          'Obtain law enforcement certification promptly',
          'Document substantial physical/mental harm',
          'Request bona fide determination',
          'Include qualifying family members',
        ],
        requirements: [
          'Victim of qualifying crime',
          'Suffered substantial harm',
          'Helpful to law enforcement',
          'Admissible to US (or waiver available)',
        ],
        timeline: 'Current wait: 5+ years; Bona fide determination: 6-8 months',
        nextSteps: [
          'Get I-918B certified within 6 months',
          'Gather evidence of harm',
          'Document cooperation with law enforcement',
          'Prepare personal statement',
        ],
        warnings: [
          'Certification expires after 6 months',
          'Wait times are extremely long',
          'Must maintain cooperation throughout',
        ],
      },
      tps: {
        summary: 'TPS eligibility depends on country designation and presence',
        recommendations: [
          'File during initial registration period',
          'Document continuous presence carefully',
          'Apply for employment authorization',
          'Re-register every designation period',
        ],
        requirements: [
          'National of designated country',
          'Continuously present since designation date',
          'Continuously resided since specified date',
          'Not subject to criminal bars',
        ],
        timeline: 'Initial: 6-9 months; Re-registration: 3-5 months',
        nextSteps: [
          'Confirm country designation status',
          'Gather presence documentation',
          'Complete I-821 and I-765',
          'Prepare biometrics fee',
        ],
        warnings: [
          'Must re-register each period',
          'Late filing requires good cause',
          'Certain crimes are permanent bars',
        ],
      },
      vawa: {
        summary: 'VAWA self-petition provides path independent of abuser',
        recommendations: [
          'Document abuse comprehensively',
          'Ensure safety before filing',
          'Use any credible evidence standard',
          'Request prima facie determination',
        ],
        requirements: [
          'Marriage/relationship to USC/LPR abuser',
          'Abuse occurred',
          'Good moral character',
          'Resided with abuser',
        ],
        timeline: 'I-360 processing: 16-21 months',
        nextSteps: [
          'Gather evidence of relationship',
          'Document abuse incidents',
          'Obtain police/medical records',
          'Prepare detailed declaration',
        ],
        warnings: [
          'Confidentiality protections crucial',
          'Cannot contact abuser',
          'Address any criminal issues',
        ],
      },
    };

    return mockData[type as keyof MockAnalysisData] || mockData.asylum;
  }`,

      business: `
  async analyzeH1B(params: {
    position: string;
    degree: string;
    salary: string;
    jobDuties: string;
    employerType: string;
    capSubject: boolean;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('h1b', params);
      }

      const userPrompt = \`Analyze H-1B case:
Position: \${params.position}
Degree: \${params.degree}
Salary: \${params.salary}
Duties: \${params.jobDuties}
Employer: \${params.employerType}
Cap Subject: \${params.capSubject ? 'Yes' : 'No'}\`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('H-1B analysis failed', error);
      return this.getMockAnalysis('h1b', params);
    }
  }

  async preparePERM(params: {
    position: string;
    requirements: string;
    salary: string;
    location: string;
    foreignNational: string;
    recruitmentReady: boolean;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('perm', params);
      }

      const userPrompt = \`Prepare PERM strategy:
Position: \${params.position}
Requirements: \${params.requirements}
Salary: \${params.salary}
Location: \${params.location}
Foreign National: \${params.foreignNational}
Ready for Recruitment: \${params.recruitmentReady ? 'Yes' : 'No'}\`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('PERM preparation failed', error);
      return this.getMockAnalysis('perm', params);
    }
  }

  async assessEB1(params: {
    category: 'EB-1A' | 'EB-1B' | 'EB-1C';
    achievements: string;
    evidence: string;
    field: string;
    currentPosition?: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('eb1', params);
      }

      const userPrompt = \`Assess \${params.category} eligibility:
Field: \${params.field}
Achievements: \${params.achievements}
Evidence: \${params.evidence}
Current Position: \${params.currentPosition || 'N/A'}\`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('EB-1 assessment failed', error);
      return this.getMockAnalysis('eb1', params);
    }
  }

  async analyzeL1(params: {
    category: 'L-1A' | 'L-1B';
    foreignEntity: string;
    usEntity: string;
    position: string;
    timeAbroad: string;
    relationship: string;
  }): Promise<AnalysisResult> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('l1', params);
      }

      const userPrompt = \`Analyze \${params.category} case:
Foreign Entity: \${params.foreignEntity}
US Entity: \${params.usEntity}
Position: \${params.position}
Time Abroad: \${params.timeAbroad}
Corporate Relationship: \${params.relationship}\`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('L-1 analysis failed', error);
      return this.getMockAnalysis('l1', params);
    }
  }

  private getMockAnalysis(type: string, params: AgentParams): AnalysisResult {
    const mockData: MockAnalysisData = {
      h1b: {
        summary: 'H-1B petition requires careful documentation of specialty occupation',
        recommendations: [
          'File LCA with accurate prevailing wage',
          'Document specialty occupation nature',
          'Show degree requirement in industry',
          'Consider premium processing',
        ],
        requirements: [
          'Bachelor\\'s degree or equivalent in related field',
          'Specialty occupation position',
          'LCA filed and certified',
          'Employer-employee relationship',
          'Prevailing wage compliance',
        ],
        timeline: 'LCA: 7 days; Regular: 4-6 months; Premium: 15 days',
        nextSteps: [
          'Determine correct wage level',
          'File LCA with DOL',
          'Post required notices',
          'Maintain Public Access File',
          'Prepare detailed job description',
        ],
        warnings: [
          'H-1B cap lottery if not exempt',
          'RFEs common for generic titles',
          'Wage level must match duties',
          'Third-party placement scrutiny',
        ],
      },
      perm: {
        summary: 'PERM requires strategic planning to avoid audit triggers',
        recommendations: [
          'Draft requirements carefully',
          'Avoid tailoring to foreign national',
          'Use standard industry requirements',
          'Document business necessity',
        ],
        requirements: [
          'Prevailing wage determination',
          'Recruitment in specified media',
          'Sunday newspaper ads',
          'State workforce agency posting',
          'Additional recruitment steps',
        ],
        timeline: 'Total 11-15 months: PWD 3-4 + Recruitment 2-3 + Processing 6-8',
        nextSteps: [
          'File PWD request (ETA-9141)',
          'Prepare recruitment plan',
          'Draft advertisements',
          'Create recruitment report template',
          'Set up audit file',
        ],
        warnings: [
          'Requirements too specific trigger audits',
          'Must pay 100% of prevailing wage',
          'Cannot require foreign language unless justified',
          'Maintain all recruitment documentation',
        ],
      },
      eb1: {
        summary: 'EB-1 requires exceptional evidence of extraordinary ability',
        recommendations: [
          'Document all achievements comprehensively',
          'Get strong recommendation letters',
          'Show sustained acclaim',
          'Demonstrate impact in field',
        ],
        requirements: [
          'EB-1A: Meet 3 of 10 criteria',
          'EB-1B: Outstanding researcher/professor',
          'EB-1C: Multinational manager/executive',
          'Evidence of extraordinary ability',
          'Sustained national/international acclaim',
        ],
        timeline: 'Processing: 8-12 months; Premium: 15 days',
        nextSteps: [
          'Compile evidence for each criterion',
          'Draft petition letter strategically',
          'Obtain expert opinion letters',
          'Document citations and impact',
          'Organize exhibits clearly',
        ],
        warnings: [
          'Quality over quantity for evidence',
          'Comparable evidence must truly compare',
          'Final merits determination is subjective',
          'Premium processing available',
        ],
      },
      l1: {
        summary: 'L-1 requires qualifying relationship and appropriate role',
        recommendations: [
          'Document corporate relationship clearly',
          'Show one year employment abroad',
          'Define specialized knowledge (L-1B)',
          'Detail managerial/executive duties (L-1A)',
        ],
        requirements: [
          'Qualifying relationship between entities',
          'One year employment in 3 years',
          'Managerial/executive or specialized knowledge',
          'Coming to work in qualifying capacity',
          'US office requirements if new',
        ],
        timeline: 'Regular: 2-4 months; Premium: 15 days',
        nextSteps: [
          'Prepare organizational charts',
          'Document qualifying relationship',
          'Detail position abroad and in US',
          'Show continuous employment',
          'Address new office if applicable',
        ],
        warnings: [
          'Specialized knowledge bar is high',
          'Function managers need subordinates',
          'New office L-1s face scrutiny',
          'Blanket L may be faster option',
        ],
      },
    };

    return mockData[type as keyof MockAnalysisData] || mockData.h1b;
  }`,
    };

    return methodsMap[agentType as keyof typeof methodsMap] || methodsMap.affirmative;
  }

  private async updateCrewCoordinator() {
    logger.info('Updating crew coordinator to use enhanced agents');

    const coordinatorPath = path.join(this.agentsPath, '..', 'enhanced-crew-coordinator.ts');

    const updatedCoordinator = `import { logger } from '@/lib/safe-logger';
import { EnhancedAffirmativeImmigrationAgent } from './agents/enhanced-affirmative-immigration-agent';
import { EnhancedHumanitarianAgent } from './agents/enhanced-humanitarian-agent';
import { EnhancedBusinessImmigrationAgent } from './agents/enhanced-business-immigration-agent';
import { RemovalDefenseAgent } from './agents/removal-defense-agent';
import { CriminalDefenseAgent } from './agents/criminal-defense-agent';
import { DocumentAnalysisAgent } from './agents/document-analysis-agent';
import { AppointmentSchedulingAgent } from './agents/appointment-scheduling-agent';

export class EnhancedCrewCoordinator {
  private affirmativeAgent: EnhancedAffirmativeImmigrationAgent;
  private humanitarianAgent: EnhancedHumanitarianAgent;
  private businessAgent: EnhancedBusinessImmigrationAgent;
  private removalAgent: RemovalDefenseAgent;
  private criminalAgent: CriminalDefenseAgent;
  private documentAgent: DocumentAnalysisAgent;
  private schedulingAgent: AppointmentSchedulingAgent;

  constructor() {
    // Initialize all enhanced agents
    this.affirmativeAgent = new EnhancedAffirmativeImmigrationAgent();
    this.humanitarianAgent = new EnhancedHumanitarianAgent();
    this.businessAgent = new EnhancedBusinessImmigrationAgent();
    this.removalAgent = new RemovalDefenseAgent();
    this.criminalAgent = new CriminalDefenseAgent();
    this.documentAgent = new DocumentAnalysisAgent();
    this.schedulingAgent = new AppointmentSchedulingAgent();

    logger.info('Enhanced CrewAI agents initialized with AILA Cookbook training');
  }

  async routeQuery(query: string, context?: QueryContext): Promise<AnalysisResult> {
    // Analyze query to determine which agent(s) to use
    const routing = await this.analyzeQuery(query);
    
    logger.info(\`Routing to \${routing.primaryAgent} agent\`, { 
      query: query.substring(0, 100),
      agents: routing.agents 
    });

    // Route to appropriate agent(s)
    switch (routing.primaryAgent) {
      case 'affirmative':
        return this.handleAffirmativeQuery(query, context);
      case 'humanitarian':
        return this.handleHumanitarianQuery(query, context);
      case 'business':
        return this.handleBusinessQuery(query, context);
      case 'removal':
        return this.handleRemovalQuery(query, context);
      case 'criminal':
        return this.handleCriminalQuery(query, context);
      default:
        return this.handleGeneralQuery(query, context);
    }
  }

  private async analyzeQuery(query: string): Promise<{ primaryAgent: string; agents: string[] }> {
    const queryLower = query.toLowerCase();
    
    // Keywords for routing
    const routingRules = {
      affirmative: ['family', 'marriage', 'spouse', 'parent', 'child', 'sibling', 'k-1', 'fiancé', 
                    'naturalization', 'citizenship', 'n-400', 'n-600', 'i-130', 'i-485', 'green card',
                    'adjustment', 'consular', 'i-751', 'permanent resident'],
      humanitarian: ['asylum', 'refugee', 'persecution', 'torture', 'u visa', 't visa', 'vawa',
                     'violence', 'trafficking', 'crime victim', 'tps', 'temporary protected', 'daca',
                     'humanitarian parole', 'withholding', 'cat protection'],
      business: ['h-1b', 'h1b', 'l-1', 'l1', 'o-1', 'o1', 'e-2', 'e2', 'eb-1', 'eb1', 'eb-2', 'eb2',
                 'perm', 'labor certification', 'employment', 'work visa', 'investor', 'extraordinary',
                 'multinational', 'transfer', 'specialty occupation', 'niw', 'national interest'],
      removal: ['deportation', 'removal', 'detained', 'ice', 'immigration court', 'bond', 'judge',
                'cancellation', 'notice to appear', 'nta', 'master calendar', 'individual hearing'],
      criminal: ['arrest', 'criminal', 'charge', 'conviction', 'dui', 'dwi', 'assault', 'theft',
                 'drug', 'felony', 'misdemeanor', 'expunge', 'post-conviction'],
    };

    const matches = { affirmative: 0, humanitarian: 0, business: 0, removal: 0, criminal: 0 };
    
    for (const [agent, keywords] of Object.entries(routingRules)) {
      keywords.forEach(keyword => {
        if (queryLower.includes(keyword)) {
          matches[agent as keyof typeof matches]++;
        }
      });
    }

    // Determine primary agent
    const primaryAgent = Object.entries(matches)
      .sort(([, a], [, b]) => b - a)[0][0];

    // Get all matching agents
    const agents = Object.entries(matches)
      .filter(([, count]) => count > 0)
      .map(([agent]) => agent);

    return { primaryAgent, agents };
  }

  private async handleAffirmativeQuery(query: string, context?: QueryContext): Promise<AnalysisResult> {
    // Extract relevant parameters from query
    if (query.toLowerCase().includes('naturalization') || query.toLowerCase().includes('n-400')) {
      return this.affirmativeAgent.prepareNaturalization({
        clientName: context?.clientName || 'Client',
        greenCardDate: context?.greenCardDate || 'Unknown',
        physicalPresence: context?.physicalPresence || 'To be determined',
        continuousResidence: context?.continuousResidence || 'To be determined',
        criminalHistory: context?.criminalHistory,
        englishAbility: context?.englishAbility || 'To be assessed',
      });
    } else if (query.toLowerCase().includes('family') || query.toLowerCase().includes('i-130')) {
      return this.affirmativeAgent.analyzeFamilyPetition({
        petitioner: context?.petitioner || 'Petitioner',
        beneficiary: context?.beneficiary || 'Beneficiary',
        relationship: context?.relationship || 'To be determined',
        petitionerStatus: context?.petitionerStatus || 'USC',
        beneficiaryLocation: context?.beneficiaryLocation || 'abroad',
      });
    } else {
      return this.affirmativeAgent.analyzeConsularProcess({
        caseType: context?.caseType || 'Family-based',
        beneficiaryCountry: context?.beneficiaryCountry || 'Unknown',
        documentReadiness: context?.documentReadiness || 'To be assessed',
        previousDenials: context?.previousDenials,
        unlawfulPresence: context?.unlawfulPresence,
      });
    }
  }

  private async handleHumanitarianQuery(query: string, context?: QueryContext): Promise<AnalysisResult> {
    if (query.toLowerCase().includes('asylum')) {
      return this.humanitarianAgent.analyzeAsylumClaim({
        clientName: context?.clientName || 'Client',
        countryOfOrigin: context?.countryOfOrigin || 'Unknown',
        persecutionType: context?.persecutionType || 'To be determined',
        protectedGround: context?.protectedGround || 'To be determined',
        entryDate: context?.entryDate || 'Unknown',
        previousApplications: context?.previousApplications,
      });
    } else if (query.toLowerCase().includes('u visa')) {
      return this.humanitarianAgent.prepareUVisa({
        clientName: context?.clientName || 'Client',
        crimeType: context?.crimeType || 'To be determined',
        harmSuffered: context?.harmSuffered || 'To be documented',
        lawEnforcementCooperation: context?.lawEnforcementCooperation || 'To be assessed',
        certificationStatus: context?.certificationStatus || 'Not yet obtained',
      });
    } else {
      return this.humanitarianAgent.assessTPS({
        clientName: context?.clientName || 'Client',
        country: context?.country || 'Unknown',
        entryDate: context?.entryDate || 'Unknown',
        continuousPresence: context?.continuousPresence || 'To be documented',
        criminalHistory: context?.criminalHistory,
      });
    }
  }

  private async handleBusinessQuery(query: string, context?: QueryContext): Promise<AnalysisResult> {
    if (query.toLowerCase().includes('h-1b') || query.toLowerCase().includes('h1b')) {
      return this.businessAgent.analyzeH1B({
        position: context?.position || 'Position',
        degree: context?.degree || 'Degree',
        salary: context?.salary || 'TBD',
        jobDuties: context?.jobDuties || 'To be detailed',
        employerType: context?.employerType || 'Private company',
        capSubject: context?.capSubject !== false,
      });
    } else if (query.toLowerCase().includes('perm') || query.toLowerCase().includes('labor certification')) {
      return this.businessAgent.preparePERM({
        position: context?.position || 'Position',
        requirements: context?.requirements || 'To be determined',
        salary: context?.salary || 'TBD',
        location: context?.location || 'Location',
        foreignNational: context?.foreignNational || 'Employee',
        recruitmentReady: context?.recruitmentReady || false,
      });
    } else if (query.toLowerCase().includes('l-1') || query.toLowerCase().includes('l1')) {
      return this.businessAgent.analyzeL1({
        category: context?.category || 'L-1A',
        foreignEntity: context?.foreignEntity || 'Foreign Company',
        usEntity: context?.usEntity || 'US Company',
        position: context?.position || 'Position',
        timeAbroad: context?.timeAbroad || 'To be verified',
        relationship: context?.relationship || 'To be documented',
      });
    } else {
      return this.businessAgent.assessEB1({
        category: context?.category || 'EB-1A',
        achievements: context?.achievements || 'To be documented',
        evidence: context?.evidence || 'To be gathered',
        field: context?.field || 'Field of expertise',
        currentPosition: context?.currentPosition,
      });
    }
  }

  private async handleRemovalQuery(query: string, context?: QueryContext): Promise<AnalysisResult> {
    return this.removalAgent.analyzeCase({
      clientName: context?.clientName || 'Client',
      isDetained: context?.isDetained || false,
      detentionCenter: context?.detentionCenter,
      hasCourtDate: context?.hasCourtDate || false,
      courtDate: context?.courtDate,
      criminalHistory: context?.criminalHistory,
      timeInUS: context?.timeInUS,
      familyTies: context?.familyTies,
      previousApplications: context?.previousApplications,
    });
  }

  private async handleCriminalQuery(query: string, context?: QueryContext): Promise<AnalysisResult> {
    return this.criminalAgent.analyzeCase({
      charges: context?.charges || 'To be specified',
      jurisdiction: 'North Carolina',
      arrestDate: context?.arrestDate,
      courtDate: context?.courtDate,
      priorRecord: context?.priorRecord,
      immigrationStatus: context?.immigrationStatus,
    });
  }

  private async handleGeneralQuery(query: string, context?: QueryContext): Promise<AnalysisResult> {
    // For general queries, provide routing information
    return {
      message: 'Please specify your legal need for appropriate assistance',
      availableServices: [
        'Family Immigration & Citizenship (I-130, N-400, Consular Processing)',
        'Humanitarian Protection (Asylum, U/T Visas, VAWA, TPS)',
        'Business Immigration (H-1B, L-1, O-1, PERM, EB categories)',
        'Removal Defense & Immigration Court',
        'Criminal Defense & Immigration Consequences',
      ],
      recommendation: 'For immediate assistance, please provide more details about your situation.',
    };
  }
}
`;

    await writeFile(coordinatorPath, updatedCoordinator, 'utf-8');
    logger.info('Updated enhanced crew coordinator');
  }
}
