import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export class RemovalDefenseAgent {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;

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

  async analyzeCase(params: {
    clientName: string;
    isDetained: boolean;
    detentionCenter?: string;
    hasCourtDate: boolean;
    courtDate?: string;
    criminalHistory?: string;
    timeInUS?: string;
    familyTies?: string;
    previousApplications?: string;
  }): Promise<RemovalDefenseAnalysis> {
    try {
      if (!this.model) {
        return this.getMockAnalysis(params);
      }

      const systemPrompt = `You are an experienced deportation defense attorney specializing in removal proceedings. 
Your role is to:
1. Assess urgency and prioritize detained cases
2. Identify potential defenses and relief options
3. Provide clear action steps
4. Give realistic assessments while maintaining hope
5. Emphasize critical deadlines and court appearances

Consider all forms of relief including:
- Cancellation of Removal (LPR and non-LPR)
- Asylum/Withholding/CAT protection
- Adjustment of Status
- Waivers (212(h), 212(c), 237(a)(1)(H))
- Prosecutorial Discretion
- Bond eligibility`;

      const userPrompt = `Analyze this removal defense case:
Client: ${params.clientName}
Detained: ${params.isDetained ? `Yes, at ${params.detentionCenter || 'unknown facility'}` : 'No'}
Court Date: ${params.hasCourtDate ? params.courtDate : 'No court date yet'}
Criminal History: ${params.criminalHistory || 'None reported'}
Time in US: ${params.timeInUS || 'Unknown'}
Family Ties: ${params.familyTies || 'Not specified'}
Previous Applications: ${params.previousApplications || 'None'}

Provide:
1. Urgency assessment
2. Potential defenses
3. Immediate action steps
4. Evidence needed
5. Estimated timeline`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseAnalysis(response.content as string, params);
    } catch (error) {
      logger.error('Removal defense analysis failed', errorToLogMeta(error));
      return this.getMockAnalysis(params);
    }
  }

  async prepareBondMotion(params: {
    clientName: string;
    detentionCenter: string;
    currentBond?: number;
    familyTies: string;
    employment?: string;
    communityTies?: string;
    criminalHistory?: string;
  }): Promise<BondMotionPrep> {
    try {
      if (!this.model) {
        return this.getMockBondMotion(params);
      }

      const systemPrompt = `You are preparing an immigration bond motion. Consider:
- Flight risk factors
- Danger to community assessment
- Positive equities (family, employment, property)
- Ability to pay
- Criminal history impact`;

      const userPrompt = `Prepare bond motion arguments for:
Client: ${params.clientName}
Facility: ${params.detentionCenter}
Current Bond: ${params.currentBond ? `$${params.currentBond}` : 'No bond set'}
Family: ${params.familyTies}
Employment: ${params.employment || 'Unknown'}
Community Ties: ${params.communityTies || 'None specified'}
Criminal History: ${params.criminalHistory || 'None'}`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseBondMotion(response.content as string);
    } catch (error) {
      logger.error('Bond motion preparation failed', errorToLogMeta(error));
      return this.getMockBondMotion(params);
    }
  }

  private parseAnalysis(content: string, params: any): RemovalDefenseAnalysis {
    // Parse AI response into structured format
    const sections = content.split('\n\n');

    return {
      urgencyLevel: params.isDetained ? 'critical' : params.hasCourtDate ? 'high' : 'standard',
      summary: sections[0] || 'Case requires immediate attention',
      potentialDefenses: this.extractListItems(sections[1] || ''),
      immediateActions: this.extractListItems(sections[2] || ''),
      evidenceNeeded: this.extractListItems(sections[3] || ''),
      estimatedTimeline: sections[4] || 'Timeline depends on case specifics',
      riskAssessment: this.assessRisk(params),
      recommendedStrategy: this.determineStrategy(params),
    };
  }

  private parseBondMotion(content: string): BondMotionPrep {
    const sections = content.split('\n\n');

    return {
      argumentSummary: sections[0] || 'Strong case for bond',
      positiveFactors: this.extractListItems(sections[1] || ''),
      riskMitigation: this.extractListItems(sections[2] || ''),
      suggestedBondAmount: this.extractBondAmount(content),
      supportingEvidence: this.extractListItems(sections[3] || ''),
      hearingPrep: this.extractListItems(sections[4] || ''),
    };
  }

  private extractListItems(text: string): string[] {
    return text
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(item => item.length > 0);
  }

  private extractBondAmount(text: string): string {
    const match = text.match(/\$[\d,]+/);
    return match ? match[0] : '$5,000 - $15,000 (depending on factors)';
  }

  private assessRisk(params: any): 'low' | 'medium' | 'high' {
    if (params.isDetained) return 'high';
    if (params.criminalHistory && params.criminalHistory !== 'None') return 'medium';
    if (params.hasCourtDate) return 'medium';
    return 'low';
  }

  private determineStrategy(params: any): string {
    if (params.isDetained) {
      return 'Priority: File bond motion immediately, then assess relief options';
    }
    if (params.timeInUS && parseInt(params.timeInUS) >= 10) {
      return 'Explore Cancellation of Removal with focus on hardship factors';
    }
    if (params.previousApplications?.includes('asylum')) {
      return 'Review asylum claim strength and consider withholding/CAT';
    }
    return 'Comprehensive eligibility screening for all forms of relief';
  }

  private getMockAnalysis(params: any): RemovalDefenseAnalysis {
    return {
      urgencyLevel: params.isDetained ? 'critical' : 'high',
      summary: 'Immediate legal representation recommended for removal proceedings',
      potentialDefenses: [
        'Cancellation of Removal eligibility assessment needed',
        'Review potential asylum/withholding claims',
        'Check adjustment of status possibilities',
        'Evaluate waiver eligibility',
      ],
      immediateActions: [
        params.isDetained
          ? 'File G-28 appearance with detention center'
          : 'File G-28 with immigration court',
        'Request copy of Notice to Appear and all charging documents',
        'Calendar all deadlines and court dates',
        'Begin gathering supporting documentation',
      ],
      evidenceNeeded: [
        'Proof of continuous presence in US',
        'Family relationship documents',
        'Tax returns and employment records',
        'Medical records if applicable',
        'Country condition evidence if fear-based claim',
      ],
      estimatedTimeline: params.isDetained
        ? '2-6 months (detained docket)'
        : '2-4 years (non-detained)',
      riskAssessment: this.assessRisk(params),
      recommendedStrategy: this.determineStrategy(params),
    };
  }

  private getMockBondMotion(params: any): BondMotionPrep {
    return {
      argumentSummary: `Strong case for bond reduction based on family ties and minimal flight risk`,
      positiveFactors: [
        `US citizen/LPR family members: ${params.familyTies}`,
        'No significant criminal history',
        'Established community presence',
        'Willingness to comply with all ICE requirements',
      ],
      riskMitigation: [
        'Family members will ensure appearance at hearings',
        'Can surrender passport if required',
        'Will comply with electronic monitoring if ordered',
        'Has stable residence with family',
      ],
      suggestedBondAmount: '$5,000 - $7,500',
      supportingEvidence: [
        'Letters of support from family and community',
        'Proof of family relationships (birth certificates, marriage certificate)',
        'Employment verification or job offers',
        'Lease agreements or property ownership',
        'Medical needs documentation if applicable',
      ],
      hearingPrep: [
        'Prepare client testimony on ties to community',
        'Arrange family members to testify',
        'Gather financial documents showing ability to pay',
        'Document any medical conditions requiring treatment',
      ],
    };
  }
}

interface RemovalDefenseAnalysis {
  urgencyLevel: 'critical' | 'high' | 'standard';
  summary: string;
  potentialDefenses: string[];
  immediateActions: string[];
  evidenceNeeded: string[];
  estimatedTimeline: string;
  riskAssessment: 'low' | 'medium' | 'high';
  recommendedStrategy: string;
}

interface BondMotionPrep {
  argumentSummary: string;
  positiveFactors: string[];
  riskMitigation: string[];
  suggestedBondAmount: string;
  supportingEvidence: string[];
  hearingPrep: string[];
}
