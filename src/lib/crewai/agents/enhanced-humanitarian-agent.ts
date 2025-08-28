import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

interface HumanitarianAnalysis {
  summary: string;
  eligibility: boolean;
  requirements: string[];
  timeline: string;
  risks: string[];
  strategy: string[];
  documents: string[];
  nextSteps: string[];
}

export class EnhancedHumanitarianAgent {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private humanitarianSystemPrompt = `You are an expert Humanitarian relief, asylum, and removal defense attorney trained on the AILA Cookbook of Essential Practice Materials (4th Edition).

Your specialized knowledge includes:

FORMS AND DOCUMENTS:
T visa: I-914, I-914A (family), I-914B (declaration)\nU visa: I-918, I-918A (family), I-918B (law enforcement certification)\nVAWA: I-360 self-petition\nTPS: I-821, I-765 (work permit)\nDACA: I-821D, I-765, I-765WS\nAsylum: I-589

PROCEDURES:

PROCESSING TIMELINES:
T visa: 18-24 months processing\nU visa: 5+ years wait; Bona fide determination: 6-8 months\nVAWA I-360: 16-21 months\nTPS: Initial 6-9 months; Re-registration 3-5 months\nDACA renewal: 3-5 months\nAsylum: Affirmative 2-5 years; Defensive varies by court

REQUIREMENTS:
T visa: Victim of severe trafficking, present due to trafficking, comply with law enforcement, extreme hardship\nU visa: Victim of qualifying crime, substantial harm, helpful to law enforcement, admissible\nVAWA: Marriage/relationship to USC/LPR, abuse, good moral character, residence with abuser\nTPS: Nationality of designated country, continuous presence, timely filing\nDACA: Arrived before 16, under 31 on 6/15/2012, continuous presence, in school/graduated/military\nAsylum: Persecution on account of race, religion, nationality, political opinion, or PSG

BEST PRACTICES:
T visa: Document trafficking comprehensively\nT visa: Get law enforcement declaration if possible\nT visa: Address each element explicitly\nU visa: Get certification signed promptly (6-month validity)\nU visa: Document substantial harm thoroughly\nU visa: Request bona fide determination for work permit\nVAWA: Extensive documentation of abuse\nVAWA: Any credible evidence standard\nVAWA: Confidentiality protections important\nTPS: File during initial registration period\nTPS: Maintain continuous TPS status\nTPS: Re-register timely every period\nDACA: File renewal 120-150 days before expiration\nDACA: Maintain continuous DACA status\nDACA: Document education/military service\nAsylum: File within one year of arrival\nAsylum: Document country conditions extensively\nAsylum: Corroborate testimony with evidence\nAsylum: Prepare for credibility challenges

COMMON ISSUES:
U visa: Extremely long wait times (5+ years)\nU visa: Law enforcement reluctance to certify\nU visa: Proving substantial harm\nDACA: Program subject to litigation\nDACA: No new initial applications currently\nDACA: Travel only with advance parole\nAsylum: One-year filing deadline\nAsylum: Particular social group complexity\nAsylum: Inconsistencies destroy credibility

SPECIALIZATIONS:
Asylum and refugee protection, U visa for crime victims, T visa for trafficking victims, VAWA self-petitions, TPS applications, DACA renewals, Humanitarian parole, Cancellation of removal, Withholding and CAT protection

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

  async analyzeAsylumClaim(params: {
    clientName: string;
    countryOfOrigin: string;
    persecutionType: string;
    protectedGround: string;
    entryDate: string;
    previousApplications?: string;
  }): Promise<HumanitarianAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('asylum', params);
      }

      const userPrompt = `Analyze asylum claim:
Client: ${params.clientName}
Country: ${params.countryOfOrigin}
Persecution: ${params.persecutionType}
Protected Ground: ${params.protectedGround}
Entry Date: ${params.entryDate}
Previous Applications: ${params.previousApplications || 'None'}`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('Asylum analysis failed', errorToLogMeta(error));
      return this.getMockAnalysis('asylum', params);
    }
  }

  async prepareUVisa(params: {
    clientName: string;
    crimeType: string;
    harmSuffered: string;
    lawEnforcementCooperation: string;
    certificationStatus: string;
  }): Promise<HumanitarianAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('uvisa', params);
      }

      const userPrompt = `Prepare U visa case:
Client: ${params.clientName}
Crime: ${params.crimeType}
Harm: ${params.harmSuffered}
Cooperation: ${params.lawEnforcementCooperation}
Certification: ${params.certificationStatus}`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('U visa preparation failed', errorToLogMeta(error));
      return this.getMockAnalysis('uvisa', params);
    }
  }

  async assessTPS(params: {
    clientName: string;
    country: string;
    entryDate: string;
    continuousPresence: string;
    criminalHistory?: string;
  }): Promise<HumanitarianAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('tps', params);
      }

      const userPrompt = `Assess TPS eligibility:
Client: ${params.clientName}
Country: ${params.country}
Entry Date: ${params.entryDate}
Continuous Presence: ${params.continuousPresence}
Criminal History: ${params.criminalHistory || 'None'}`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('TPS assessment failed', errorToLogMeta(error));
      return this.getMockAnalysis('tps', params);
    }
  }

  async analyzeVAWA(params: {
    clientName: string;
    abuserStatus: string;
    relationshipType: string;
    abuseDocumentation: string;
    currentSafety: string;
  }): Promise<HumanitarianAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis('vawa', params);
      }

      const userPrompt = `Analyze VAWA self-petition:
Client: ${params.clientName}
Abuser Status: ${params.abuserStatus}
Relationship: ${params.relationshipType}
Documentation: ${params.abuseDocumentation}
Current Safety: ${params.currentSafety}`;

      const response = await this.model.call([
        new SystemMessage(this.humanitarianSystemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content as string);
    } catch (error) {
      logger.error('VAWA analysis failed', errorToLogMeta(error));
      return this.getMockAnalysis('vawa', params);
    }
  }

  private getMockAnalysis(type: string, params: Record<string, unknown>): HumanitarianAnalysis {
    const mockData = {
      asylum: {
        summary: 'Asylum claim requires immediate attention to one-year deadline',
        eligibility: true,
        requirements: [
          'Persecution on account of protected ground',
          'Unable/unwilling to return due to persecution',
          'Not firmly resettled in third country',
          'File within one year (or show exception)',
        ],
        timeline: 'Affirmative: 2-5 years; Defensive: varies by court',
        risks: [
          'One-year deadline is strictly enforced',
          'Inconsistencies can destroy credibility',
          'Particular social group must be carefully defined',
        ],
        strategy: [
          'File I-589 within one year of entry',
          'Document persecution thoroughly',
          'Gather country condition evidence',
          'Consider withholding/CAT as alternatives',
        ],
        documents: [
          'I-589 application',
          'Country condition evidence',
          'Personal statement',
          'Witness affidavits',
          'Medical/psychological evaluations',
        ],
        nextSteps: [
          'Complete I-589 with detailed statement',
          'Gather corroborating evidence',
          'Research country conditions',
          'Prepare for credibility assessment',
        ],
      },
      uvisa: {
        summary: 'U visa eligibility appears strong with proper documentation',
        eligibility: true,
        requirements: [
          'Victim of qualifying crime',
          'Suffered substantial harm',
          'Helpful to law enforcement',
          'Admissible to US (or waiver available)',
        ],
        timeline: 'Current wait: 5+ years; Bona fide determination: 6-8 months',
        risks: [
          'Certification expires after 6 months',
          'Wait times are extremely long',
          'Must maintain cooperation throughout',
        ],
        strategy: [
          'Obtain law enforcement certification promptly',
          'Document substantial physical/mental harm',
          'Request bona fide determination',
          'Include qualifying family members',
        ],
        documents: [
          'I-918 petition',
          'I-918B law enforcement certification',
          'Medical records',
          'Police reports',
          'Personal statement',
        ],
        nextSteps: [
          'Get I-918B certified within 6 months',
          'Gather evidence of harm',
          'Document cooperation with law enforcement',
          'Prepare personal statement',
        ],
      },
      tps: {
        summary: 'TPS eligibility depends on country designation and presence',
        eligibility: true,
        requirements: [
          'National of designated country',
          'Continuously present since designation date',
          'Continuously resided since specified date',
          'Not subject to criminal bars',
        ],
        timeline: 'Initial: 6-9 months; Re-registration: 3-5 months',
        risks: [
          'Must re-register each period',
          'Late filing requires good cause',
          'Certain crimes are permanent bars',
        ],
        strategy: [
          'File during initial registration period',
          'Document continuous presence carefully',
          'Apply for employment authorization',
          'Re-register every designation period',
        ],
        documents: [
          'I-821 TPS application',
          'I-765 work permit application',
          'Proof of nationality',
          'Evidence of continuous presence',
          'Identity documents',
        ],
        nextSteps: [
          'Confirm country designation status',
          'Gather presence documentation',
          'Complete I-821 and I-765',
          'Prepare biometrics fee',
        ],
      },
      vawa: {
        summary: 'VAWA self-petition provides path independent of abuser',
        eligibility: true,
        requirements: [
          'Marriage/relationship to USC/LPR abuser',
          'Abuse occurred',
          'Good moral character',
          'Resided with abuser',
        ],
        timeline: 'I-360 processing: 16-21 months',
        risks: [
          'Confidentiality protections crucial',
          'Cannot contact abuser',
          'Address any criminal issues',
        ],
        strategy: [
          'Document abuse comprehensively',
          'Ensure safety before filing',
          'Use any credible evidence standard',
          'Request prima facie determination',
        ],
        documents: [
          'I-360 self-petition',
          'Evidence of relationship',
          'Evidence of abuse',
          'Police/medical records',
          'Personal declaration',
        ],
        nextSteps: [
          'Gather evidence of relationship',
          'Document abuse incidents',
          'Obtain police/medical records',
          'Prepare detailed declaration',
        ],
      },
    };

    return mockData[type as keyof typeof mockData] || mockData.asylum;
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

  private parseResponse(content: string): HumanitarianAnalysis {
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
