import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

interface BusinessImmigrationAnalysis {
  summary: string;
  eligibility: boolean;
  requirements: string[];
  timeline: string;
  risks: string[];
  strategy: string[];
  documents: string[];
  nextSteps: string[];
}

export class EnhancedBusinessImmigrationAgent {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private businessSystemPrompt = `You are an expert Employment-based immigration and business visas attorney trained on the AILA Cookbook of Essential Practice Materials (4th Edition).

Your specialized knowledge includes:

FORMS AND DOCUMENTS:
B: DS-160, I-539\nE: DS-160, I-129, E supplement\nH-1B: ETA-9035 (LCA), I-129, H supplement\nL-1: I-129, L supplement, I-129S (blanket)\nO-1: I-129, O supplement

PROCEDURES:
PERM: 1) PWD request, 2) Recruitment, 3) ETA-9089 filing, 4) Certification\nPERM recruitment: Sunday newspaper, State workforce agency, 2 additional steps

PROCESSING TIMELINES:
B: Consular: 2-4 weeks; COS/EOS: 4-8 months\nE: Consular: 2-3 months; USCIS: 2-4 months (premium available)\nH-1B: Regular: 4-6 months; Premium: 15 days (after LCA)\nL-1: Regular: 2-4 months; Premium: 15 days\nO-1: Regular: 2-3 months; Premium: 15 days\nPERM: PWD 3-4 months + Recruitment 2-3 months + Processing 6-8 months = 11-15 months total\nEB-1A: 8-12 months\nEB-1B: 8-12 months\nEB-1C: 8-12 months\nEB-2 NIW: 8-12 months

REQUIREMENTS:
B: Temporary intent to visit; Ties to home country; Sufficient funds; Clear purpose of visit\nE: Treaty country nationality; Substantial trade (E-1) or investment (E-2); Executive/supervisory role or essential skills; 50% ownership by treaty nationals\nH-1B: Specialty occupation position; Bachelor's degree or equivalent; Employer-employee relationship; Prevailing wage compliance\nL-1: One year employment abroad in past 3 years; Qualifying relationship between entities; Executive/managerial (L-1A) or specialized knowledge (L-1B); Intent to work in qualifying capacity\nO-1: Extraordinary ability in sciences, arts, education, business, athletics; Meet 3 of 8 criteria (O-1A) or comparable evidence; Advisory opinion from peer group; Itinerary if multiple venues\nEB-1A: Extraordinary ability - meet 3 of 10 criteria\nEB-1B: Outstanding professor/researcher - 3 years experience\nEB-1C: Multinational executive/manager - 1 year abroad in 3\nEB-2 NIW: National interest waiver - Dhanasar three-prong test

BEST PRACTICES:
B: Document strong ties to home country\nB: Prepare detailed itinerary\nB: Show proof of departure intent\nB: Avoid immigrant intent indicators\nE: Document substantial trade volume or investment\nE: Show business viability and job creation\nE: Maintain E-2 investment at risk\nE: Track trade statistics for E-1\nH-1B: File LCA accurately with correct wage level\nH-1B: Maintain Public Access File\nH-1B: Prepare for RFEs on specialty occupation\nH-1B: Consider cap-exempt options\nH-1B: Document specialized knowledge requirements\nL-1: Document organizational charts clearly\nL-1: Show qualifying relationship between entities\nL-1: Define specialized knowledge precisely\nL-1: Prepare detailed job descriptions\nO-1: Obtain strong recommendation letters\nO-1: Document all achievements comprehensively\nO-1: Get favorable advisory opinion\nO-1: Show sustained acclaim\nPERM: Avoid requirements that unduly restrict US workers\nPERM: Document all recruitment efforts meticulously\nPERM: Prepare audit file proactively\nEB-1A: Document sustained national/international acclaim\nEB-1B: Show international recognition in field\nEB-1C: Document executive/managerial duties clearly\nEB-2 NIW: Show substantial merit and national importance

COMMON ISSUES:
H-1B: H-1B cap lottery selection\nH-1B: Wage level challenges\nH-1B: Specialty occupation RFEs\nH-1B: Third-party placement issues

SPECIALIZATIONS:
H-1B specialty occupation, L-1 intracompany transfers, O-1 extraordinary ability, E-1/E-2 treaty traders/investors, PERM labor certification, EB-1 extraordinary ability/multinational managers, EB-2 NIW national interest waivers, EB-5 investor visas, TN NAFTA professionals, R-1 religious workers

When providing advice:
1. Always cite specific forms and requirements
2. Provide accurate timelines based on current processing times
3. Identify potential issues early
4. Suggest document preparation strategies
5. Explain procedures step-by-step
6. Warn about common pitfalls
7. Be precise about eligibility requirements
8. Consider case-specific factors`;

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

  async analyzeH1B(params: {
    position: string;
    degree: string;
    salary: string;
    jobDuties: string;
    employerType: string;
    capSubject: boolean;
  }): Promise<BusinessImmigrationAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('h1b', params);
      }

      const userPrompt = `Analyze H-1B case:
Position: ${params.position}
Degree: ${params.degree}
Salary: ${params.salary}
Duties: ${params.jobDuties}
Employer: ${params.employerType}
Cap Subject: ${params.capSubject ? 'Yes' : 'No'}`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('H-1B analysis failed', errorToLogMeta(error));
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
  }): Promise<BusinessImmigrationAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('perm', params);
      }

      const userPrompt = `Prepare PERM strategy:
Position: ${params.position}
Requirements: ${params.requirements}
Salary: ${params.salary}
Location: ${params.location}
Foreign National: ${params.foreignNational}
Ready for Recruitment: ${params.recruitmentReady ? 'Yes' : 'No'}`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('PERM preparation failed', errorToLogMeta(error));
      return this.getMockAnalysis('perm', params);
    }
  }

  async assessEB1(params: {
    category: 'EB-1A' | 'EB-1B' | 'EB-1C';
    achievements: string;
    evidence: string;
    field: string;
    currentPosition?: string;
  }): Promise<BusinessImmigrationAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('eb1', params);
      }

      const userPrompt = `Assess ${params.category} eligibility:
Field: ${params.field}
Achievements: ${params.achievements}
Evidence: ${params.evidence}
Current Position: ${params.currentPosition || 'N/A'}`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('EB-1 assessment failed', errorToLogMeta(error));
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
  }): Promise<BusinessImmigrationAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('l1', params);
      }

      const userPrompt = `Analyze ${params.category} case:
Foreign Entity: ${params.foreignEntity}
US Entity: ${params.usEntity}
Position: ${params.position}
Time Abroad: ${params.timeAbroad}
Corporate Relationship: ${params.relationship}`;

      const response = await this.model.call([
        new SystemMessage(this.businessSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('L-1 analysis failed', errorToLogMeta(error));
      return this.getMockAnalysis('l1', params);
    }
  }

  private getMockAnalysis(
    type: string,
    params: Record<string, unknown>
  ): BusinessImmigrationAnalysis {
    const mockData = {
      h1b: {
        summary: 'H-1B petition requires careful documentation of specialty occupation',
        eligibility: true,
        requirements: [
          "Bachelor's degree or equivalent in related field",
          'Specialty occupation position',
          'LCA filed and certified',
          'Employer-employee relationship',
          'Prevailing wage compliance',
        ],
        timeline: 'LCA: 7 days; Regular: 4-6 months; Premium: 15 days',
        risks: [
          'H-1B cap lottery if not exempt',
          'RFEs common for generic titles',
          'Wage level must match duties',
          'Third-party placement scrutiny',
        ],
        strategy: [
          'File LCA with accurate prevailing wage',
          'Document specialty occupation nature',
          'Show degree requirement in industry',
          'Consider premium processing',
        ],
        documents: [
          'Degree certificates and transcripts',
          'Job offer letter',
          'Detailed job description',
          'Company financial documents',
          'Organizational chart',
        ],
        nextSteps: [
          'Determine correct wage level',
          'File LCA with DOL',
          'Post required notices',
          'Maintain Public Access File',
          'Prepare detailed job description',
        ],
      },
      perm: {
        summary: 'PERM requires strategic planning to avoid audit triggers',
        eligibility: true,
        requirements: [
          'Prevailing wage determination',
          'Recruitment in specified media',
          'Sunday newspaper ads',
          'State workforce agency posting',
          'Additional recruitment steps',
        ],
        timeline: 'Total 11-15 months: PWD 3-4 + Recruitment 2-3 + Processing 6-8',
        risks: [
          'Requirements too specific trigger audits',
          'Must pay 100% of prevailing wage',
          'Cannot require foreign language unless justified',
          'Maintain all recruitment documentation',
        ],
        strategy: [
          'Draft requirements carefully',
          'Avoid tailoring to foreign national',
          'Use standard industry requirements',
          'Document business necessity',
        ],
        documents: [
          'Prevailing wage determination',
          'Recruitment tear sheets',
          'Job postings documentation',
          'Recruitment report',
          'ETA-9089 form',
        ],
        nextSteps: [
          'File PWD request (ETA-9141)',
          'Prepare recruitment plan',
          'Draft advertisements',
          'Create recruitment report template',
          'Set up audit file',
        ],
      },
      eb1: {
        summary: 'EB-1 requires exceptional evidence of extraordinary ability',
        eligibility: true,
        requirements: [
          'EB-1A: Meet 3 of 10 criteria',
          'EB-1B: Outstanding researcher/professor',
          'EB-1C: Multinational manager/executive',
          'Evidence of extraordinary ability',
          'Sustained national/international acclaim',
        ],
        timeline: 'Processing: 8-12 months; Premium: 15 days',
        risks: [
          'Quality over quantity for evidence',
          'Comparable evidence must truly compare',
          'Final merits determination is subjective',
          'Premium processing available',
        ],
        strategy: [
          'Document all achievements comprehensively',
          'Get strong recommendation letters',
          'Show sustained acclaim',
          'Demonstrate impact in field',
        ],
        documents: [
          'Awards and recognition',
          'Publications and citations',
          'Media coverage',
          'Recommendation letters',
          'Evidence of impact',
        ],
        nextSteps: [
          'Compile evidence for each criterion',
          'Draft petition letter strategically',
          'Obtain expert opinion letters',
          'Document citations and impact',
          'Organize exhibits clearly',
        ],
      },
      l1: {
        summary: 'L-1 requires qualifying relationship and appropriate role',
        eligibility: true,
        requirements: [
          'Qualifying relationship between entities',
          'One year employment in 3 years',
          'Managerial/executive or specialized knowledge',
          'Coming to work in qualifying capacity',
          'US office requirements if new',
        ],
        timeline: 'Regular: 2-4 months; Premium: 15 days',
        risks: [
          'Specialized knowledge bar is high',
          'Function managers need subordinates',
          'New office L-1s face scrutiny',
          'Blanket L may be faster option',
        ],
        strategy: [
          'Document corporate relationship clearly',
          'Show one year employment abroad',
          'Define specialized knowledge (L-1B)',
          'Detail managerial/executive duties (L-1A)',
        ],
        documents: [
          'Corporate documents for both entities',
          'Organizational charts',
          'Employment verification abroad',
          'Detailed job descriptions',
          'Proof of qualifying relationship',
        ],
        nextSteps: [
          'Prepare organizational charts',
          'Document qualifying relationship',
          'Detail position abroad and in US',
          'Show continuous employment',
          'Address new office if applicable',
        ],
      },
    };

    return mockData[type as keyof typeof mockData] || mockData.h1b;
  }

  private extractListItems(text: string): string[] {
    return text
      .split('\n')
      .filter(
        line =>
          line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().match(/^\d+\./)
      )
      .map(line => line.replace(/^[-•\d.]\s*/, '').trim())
      .filter(item => item.length > 0);
  }

  private parseResponse(content: string): BusinessImmigrationAnalysis {
    const sections = content.split('\n\n');
    return {
      summary: sections[0] || '',
      eligibility:
        content.toLowerCase().includes('eligible') || content.toLowerCase().includes('qualify'),
      requirements: this.extractListItems(sections[2] || ''),
      timeline: sections[3] || '',
      risks: this.extractListItems(sections[5] || ''),
      strategy: this.extractListItems(sections[1] || ''),
      documents: this.extractListItems(sections[6] || ''),
      nextSteps: this.extractListItems(sections[4] || ''),
    };
  }
}
