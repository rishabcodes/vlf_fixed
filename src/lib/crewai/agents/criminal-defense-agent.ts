import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export class CriminalDefenseAgent {
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
    charges: string;
    arrestDate: string;
    county: string;
    isDetained: boolean;
    bailAmount?: string;
    priorRecord?: string;
    courtDate?: string;
    evidenceDescription?: string;
  }): Promise<CriminalCaseAnalysis> {
    try {
      if (!this.model) {
        return this.getMockCaseAnalysis(params);
      }

      const systemPrompt = `You are an experienced North Carolina criminal defense attorney. 
Analyze cases considering:
1. NC criminal statutes and sentencing guidelines
2. Constitutional rights and violations
3. Evidence admissibility
4. Plea bargain possibilities
5. Trial strategies
6. Immigration consequences if applicable
7. Collateral consequences (license, employment, etc.)

Focus on NC-specific laws and procedures.`;

      const userPrompt = `Analyze this NC criminal case:
Client: ${params.clientName}
Charges: ${params.charges}
Arrest Date: ${params.arrestDate}
County: ${params.county}
Currently Detained: ${params.isDetained ? `Yes, bail set at ${params.bailAmount || 'unknown'}` : 'No'}
Prior Record: ${params.priorRecord || 'None'}
Court Date: ${params.courtDate || 'Not set'}
Evidence: ${params.evidenceDescription || 'Unknown'}

Provide:
1. Charge analysis and potential sentences
2. Constitutional issues to investigate
3. Defense strategies
4. Immediate action items
5. Likely outcomes`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseCaseAnalysis(response.content as string, params);
    } catch (error) {
      logger.error('Criminal case analysis failed', errorToLogMeta(error));
      return this.getMockCaseAnalysis(params);
    }
  }

  async analyzeDUI(params: {
    clientName: string;
    bac?: string;
    fieldSobrietyTests?: string;
    priorDUI?: boolean;
    accidentInvolved?: boolean;
    licenseSuspended?: boolean;
    breathalyzerRefusal?: boolean;
  }): Promise<DUIAnalysis> {
    try {
      if (!this.model) {
        return this.getMockDUIAnalysis(params);
      }

      const systemPrompt = `You are a NC DUI/DWI defense attorney. Consider:
- NC implied consent laws
- Breathalyzer accuracy and calibration
- Field sobriety test administration
- DMV proceedings vs criminal case
- Sentencing levels under NC law
- Limited driving privileges`;

      const userPrompt = `Analyze this NC DUI case:
Client: ${params.clientName}
BAC: ${params.bac || 'Not provided'}
Field Sobriety Tests: ${params.fieldSobrietyTests || 'Not specified'}
Prior DUI: ${params.priorDUI ? 'Yes' : 'No'}
Accident: ${params.accidentInvolved ? 'Yes' : 'No'}
License Status: ${params.licenseSuspended ? 'Suspended' : 'Valid'}
Breathalyzer Refusal: ${params.breathalyzerRefusal ? 'Yes' : 'No'}`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseDUIAnalysis(response.content as string, params);
    } catch (error) {
      logger.error('DUI analysis failed', errorToLogMeta(error));
      return this.getMockDUIAnalysis(params);
    }
  }

  async prepareBailMotion(params: {
    charges: string;
    currentBail: string;
    clientTies: string;
    employment?: string;
    priorRecord?: string;
  }): Promise<BailMotionStrategy> {
    try {
      if (!this.model) {
        return this.getMockBailMotion(params);
      }

      const systemPrompt = `Prepare NC bail reduction motion considering:
- Pretrial release conditions under NC law
- Electronic monitoring options
- Community ties and flight risk
- Public safety considerations
- Ability to pay`;

      const userPrompt = `Prepare bail motion for:
Charges: ${params.charges}
Current Bail: ${params.currentBail}
Community Ties: ${params.clientTies}
Employment: ${params.employment || 'Unemployed'}
Prior Record: ${params.priorRecord || 'None'}`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseBailMotion(response.content as string);
    } catch (error) {
      logger.error('Bail motion preparation failed', errorToLogMeta(error));
      return this.getMockBailMotion(params);
    }
  }

  private parseCaseAnalysis(content: string, params: any): CriminalCaseAnalysis {
    const sections = content.split('\n\n');

    return {
      chargeSeverity: this.assessChargeSeverity(params.charges),
      potentialSentence: sections[0] || 'Sentence depends on prior record level',
      constitutionalIssues: this.extractListItems(sections[1] || ''),
      defenseStrategies: this.extractListItems(sections[2] || ''),
      immediateActions: this.extractListItems(sections[3] || ''),
      likelyOutcomes: this.extractListItems(sections[4] || ''),
      pleaBargainLikelihood: this.assessPleaLikelihood(params),
      trialRecommendation: this.recommendTrial(params),
      collateralConsequences: this.identifyCollateralConsequences(params.charges),
    };
  }

  private parseDUIAnalysis(content: string, params: any): DUIAnalysis {
    const sections = content.split('\n\n');

    return {
      level: this.determineDUILevel(params),
      defenses: this.extractListItems(sections[0] || ''),
      dmvConsequences: sections[1] || 'License suspension likely',
      criminalPenalties: sections[2] || 'Penalties vary by level',
      limitedPrivilegeEligible: !params.priorDUI && !params.breathalyzerRefusal,
      recommendedActions: this.extractListItems(sections[3] || ''),
      evidenceChallenges: this.extractListItems(sections[4] || ''),
    };
  }

  private parseBailMotion(content: string): BailMotionStrategy {
    const sections = content.split('\n\n');

    return {
      recommendedBail: this.extractBailAmount(sections[0] || ''),
      arguments: this.extractListItems(sections[1] || ''),
      conditions: this.extractListItems(sections[2] || ''),
      supportingEvidence: this.extractListItems(sections[3] || ''),
    };
  }

  private assessChargeSeverity(charges: string): 'misdemeanor' | 'felony' | 'mixed' {
    const felonyKeywords = ['felony', 'trafficking', 'robbery', 'burglary', 'assault with deadly'];
    const chargesLower = charges.toLowerCase();

    if (felonyKeywords.some(keyword => chargesLower.includes(keyword))) {
      return 'felony';
    }
    return 'misdemeanor';
  }

  private assessPleaLikelihood(params: any): 'high' | 'medium' | 'low' {
    if (params.priorRecord && params.priorRecord !== 'None') return 'high';
    if (
      params.evidenceDescription?.includes('video') ||
      params.evidenceDescription?.includes('confession')
    )
      return 'high';
    return 'medium';
  }

  private recommendTrial(params: any): boolean {
    return (
      !params.evidenceDescription?.includes('overwhelming') &&
      !params.evidenceDescription?.includes('confession')
    );
  }

  private identifyCollateralConsequences(charges: string): string[] {
    const consequences: string[] = [];
    const chargesLower = charges.toLowerCase();

    if (chargesLower.includes('dui') || chargesLower.includes('dwi')) {
      consequences.push("Driver's license suspension", 'Increased insurance rates');
    }
    if (chargesLower.includes('drug')) {
      consequences.push('Federal student aid ineligibility', 'Professional license impact');
    }
    if (chargesLower.includes('assault') || chargesLower.includes('domestic')) {
      consequences.push('Firearm possession prohibition', 'Immigration consequences');
    }
    if (chargesLower.includes('theft') || chargesLower.includes('fraud')) {
      consequences.push('Employment difficulties', 'Professional license issues');
    }

    return consequences;
  }

  private determineDUILevel(params: any): string {
    if (params.priorDUI) return 'Level 2 or higher';
    if (params.accidentInvolved) return 'Aggravated Level 1';
    if (parseFloat(params.bac || '0') >= 0.15) return 'Level 1';
    return 'Level 4 or 5';
  }

  private extractBailAmount(text: string): string {
    const match = text.match(/\$[\d,]+/);
    return match ? match[0] : 'Unsecured bond or $5,000';
  }

  private extractListItems(text: string): string[] {
    return text
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(item => item.length > 0);
  }

  private getMockCaseAnalysis(params: any): CriminalCaseAnalysis {
    return {
      chargeSeverity: this.assessChargeSeverity(params.charges),
      potentialSentence: 'Misdemeanor: Up to 120 days; Felony: Varies by class and prior record',
      constitutionalIssues: [
        'Fourth Amendment - Was the stop/search lawful?',
        'Fifth Amendment - Were Miranda rights given?',
        'Sixth Amendment - Right to speedy trial',
      ],
      defenseStrategies: [
        'Challenge probable cause for arrest',
        'Suppress illegally obtained evidence',
        'Negotiate plea to lesser charges',
        'Prepare for trial if evidence is weak',
      ],
      immediateActions: [
        params.isDetained ? 'File motion for bail reduction' : 'Calendar all court dates',
        'Request discovery from prosecutor',
        'Interview witnesses while memories are fresh',
        'Document any injuries or damages',
        'Advise client not to discuss case',
      ],
      likelyOutcomes: [
        'Dismissal if constitutional violations found',
        'Plea bargain to reduced charges',
        'Deferred prosecution for first offenders',
        'Trial if strong defense exists',
      ],
      pleaBargainLikelihood: 'medium',
      trialRecommendation: false,
      collateralConsequences: this.identifyCollateralConsequences(params.charges),
    };
  }

  private getMockDUIAnalysis(params: any): DUIAnalysis {
    return {
      level: this.determineDUILevel(params),
      defenses: [
        'Challenge initial traffic stop legality',
        'Question breathalyzer calibration and maintenance',
        'Review field sobriety test administration',
        'Investigate officer training and certification',
        'Check for medical conditions affecting results',
      ],
      dmvConsequences: params.breathalyzerRefusal
        ? '1-year license revocation for refusal'
        : '30-day civil revocation, then suspension based on conviction',
      criminalPenalties:
        'Level 5: Fine up to $200, 24 hours to 60 days jail (suspended with probation)',
      limitedPrivilegeEligible: !params.priorDUI && !params.breathalyzerRefusal,
      recommendedActions: [
        'Request DMV hearing within 10 days',
        'Obtain driving record',
        'Enroll in substance abuse assessment',
        'Document any medical conditions',
        'Gather character references',
      ],
      evidenceChallenges: [
        'Breathalyzer margin of error',
        'Rising blood alcohol defense',
        'Improper field sobriety test conditions',
        'Lack of probable cause for stop',
      ],
    };
  }

  private getMockBailMotion(params: any): BailMotionStrategy {
    return {
      recommendedBail: '$5,000 unsecured or $2,500 secured',
      arguments: [
        'Strong community ties demonstrated by local family',
        'Stable employment history',
        'No prior failures to appear',
        'Non-violent charges pose minimal public risk',
        'Financial hardship from current bail amount',
      ],
      conditions: [
        'Pretrial supervision',
        'No contact with alleged victims',
        'Abstain from alcohol/drugs with testing',
        'Maintain employment',
        'Electronic monitoring if necessary',
      ],
      supportingEvidence: [
        'Employment verification letter',
        'Proof of residence',
        'Family support letters',
        'Financial affidavit showing inability to pay',
      ],
    };
  }
}

interface CriminalCaseAnalysis {
  chargeSeverity: 'misdemeanor' | 'felony' | 'mixed';
  potentialSentence: string;
  constitutionalIssues: string[];
  defenseStrategies: string[];
  immediateActions: string[];
  likelyOutcomes: string[];
  pleaBargainLikelihood: 'high' | 'medium' | 'low';
  trialRecommendation: boolean;
  collateralConsequences: string[];
}

interface DUIAnalysis {
  level: string;
  defenses: string[];
  dmvConsequences: string;
  criminalPenalties: string;
  limitedPrivilegeEligible: boolean;
  recommendedActions: string[];
  evidenceChallenges: string[];
}

interface BailMotionStrategy {
  recommendedBail: string;
  arguments: string[];
  conditions: string[];
  supportingEvidence: string[];
}
