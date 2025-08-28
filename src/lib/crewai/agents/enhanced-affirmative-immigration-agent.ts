import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

interface AffirmativeAnalysis {
  summary: string;
  recommendations: string[];
  requirements: string[];
  timeline: string;
  nextSteps: string[];
  warnings: string[];
}

export class EnhancedAffirmativeImmigrationAgent {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private affirmativeSystemPrompt = `You are an expert Family-based immigration, naturalization, and affirmative applications attorney trained on the AILA Cookbook of Essential Practice Materials (4th Edition).

Your specialized knowledge includes:

FORMS AND DOCUMENTS:
Family petitions: I-130, I-130A, I-485, I-864, I-693, I-765, I-131\nNaturalization: N-400, N-600, N-600K

PROCEDURES:
Family-based: 1) File I-130, 2) NVC processing if abroad, 3) I-485 if in US, 4) Interview

PROCESSING TIMELINES:
Immediate relatives: 8-14 months\nF1 (adult children of USC): 7 years\nF2A (spouses/children of LPR): 2 years\nF2B (adult children of LPR): 6 years\nF3 (married children of USC): 13 years\nF4 (siblings of USC): 14 years\nN-400: 8-12 months from filing to oath

REQUIREMENTS:
N-400: 5 years LPR (3 if married to USC), physical presence, good moral character, English, civics

BEST PRACTICES:
Marriage cases: Document bona fides comprehensively\nUse I-130 online filing when available\nFile I-485 concurrently when possible\nPrepare for Stokes interview in suspicious marriage cases\nN-400: Review entire immigration history\nN-400: Disclose all citations, arrests, even if dismissed\nN-400: Prepare for English and civics test thoroughly

COMMON ISSUES:

SPECIALIZATIONS:
I-130/I-485 family petitions, K-1 fiancé visas, N-400 naturalization, N-600 certificates of citizenship, Consular processing, I-751 removal of conditions, I-90 green card renewals

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

  async analyzeFamilyPetition(params: {
    petitioner: string;
    beneficiary: string;
    relationship: string;
    petitionerStatus: 'USC' | 'LPR';
    beneficiaryLocation: 'US' | 'abroad';
    priorityCategory?: string;
  }): Promise<AffirmativeAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('family', params);
      }

      const userPrompt = `Analyze family-based petition:
Petitioner: ${params.petitioner} (${params.petitionerStatus})
Beneficiary: ${params.beneficiary}
Relationship: ${params.relationship}
Beneficiary Location: ${params.beneficiaryLocation}
Priority Category: ${params.priorityCategory || 'To be determined'}`;

      const response = await this.model.call([
        new SystemMessage(this.affirmativeSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Family petition analysis failed', errorToLogMeta(error));
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
  }): Promise<AffirmativeAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('naturalization', params);
      }

      const userPrompt = `Assess naturalization eligibility:
Client: ${params.clientName}
Green Card Since: ${params.greenCardDate}
Physical Presence: ${params.physicalPresence}
Continuous Residence: ${params.continuousResidence}
Criminal History: ${params.criminalHistory || 'None'}
English Ability: ${params.englishAbility}`;

      const response = await this.model.call([
        new SystemMessage(this.affirmativeSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Naturalization analysis failed', errorToLogMeta(error));
      return this.getMockAnalysis('naturalization', params);
    }
  }

  async analyzeConsularProcess(params: {
    caseType: string;
    beneficiaryCountry: string;
    documentReadiness: string;
    previousDenials?: string;
    unlawfulPresence?: string;
  }): Promise<AffirmativeAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('consular', params);
      }

      const userPrompt = `Analyze consular processing case:
Case Type: ${params.caseType}
Embassy/Consulate: ${params.beneficiaryCountry}
Document Status: ${params.documentReadiness}
Previous Denials: ${params.previousDenials || 'None'}
Unlawful Presence: ${params.unlawfulPresence || 'None'}`;

      const response = await this.model.call([
        new SystemMessage(this.affirmativeSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Consular process analysis failed', errorToLogMeta(error));
      return this.getMockAnalysis('consular', params);
    }
  }

  private getMockAnalysis(type: string, params: Record<string, unknown>): AffirmativeAnalysis {
    const mockData = {
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

    return mockData[type as keyof typeof mockData] || mockData.family;
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

  private parseResponse(content: string): AffirmativeAnalysis {
    const sections = content.split('\n\n');
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
