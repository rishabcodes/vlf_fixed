import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { immigrationKnowledgeBase } from '@/config/agents/knowledge-base/immigration-knowledge';

interface RemovalCaseParams {
  clientName: string;
  isDetained: boolean;
  detentionCenter?: string;
  hasCourtDate: boolean;
  courtDate?: string;
  criminalHistory?: string;
  timeInUS?: string;
  familyTies?: string;
  immigrationHistory?: string;
  countryOfOrigin?: string;
}

export class AILATrainedRemovalDefenseAgent {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private ailaKnowledge = immigrationKnowledgeBase.removal_defense;

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

  async analyzeRemovalCase(params: {
    clientName: string;
    isDetained: boolean;
    detentionCenter?: string;
    hasCourtDate: boolean;
    courtDate?: string;
    criminalHistory?: string;
    timeInUS?: string;
    familyTies?: string;
    immigrationHistory?: string;
    countryOfOrigin?: string;
  }): Promise<RemovalDefenseAnalysis> {
    try {
      if (!this.model) {
        return this.getAILATrainedAnalysis(params);
      }

      const systemPrompt = this.buildAILASystemPrompt();
      const userPrompt = this.buildCasePrompt(params);

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseAILAAnalysis(response.content as string, params);
    } catch (error) {
      logger.error('AILA-trained removal analysis failed', errorToLogMeta(error));
      return this.getAILATrainedAnalysis(params);
    }
  }

  private buildAILASystemPrompt(): string {
    return `You are an expert deportation defense attorney trained on AILA (American Immigration Lawyers Association) best practices and current law. 

Your knowledge includes:
${JSON.stringify(this.ailaKnowledge, null, 2)}

Key AILA Practice Points:
1. Always screen for ALL forms of relief, not just the obvious ones
2. Consider humanitarian factors and discretion
3. Be aware of circuit-specific case law
4. Document everything for potential appeals
5. Consider collateral consequences (criminal, family court, etc.)
6. Think creatively about legal arguments

When analyzing cases:
- Start with detention/bond issues if detained
- Identify all potential forms of relief
- Consider procedural defenses (defective NTA, improper service)
- Assess strength of each defense
- Provide realistic timelines
- Flag urgent deadlines
- Consider pro se resources if needed`;
  }

  private buildCasePrompt(params: RemovalCaseParams): string {
    return `Analyze this removal defense case using AILA best practices:

Client: ${params.clientName}
Detained: ${params.isDetained ? `Yes, at ${params.detentionCenter || 'unknown facility'}` : 'No'}
${params.hasCourtDate ? `Court Date: ${params.courtDate}` : 'No court date scheduled'}
Time in US: ${params.timeInUS || 'Unknown'}
Country of Origin: ${params.countryOfOrigin || 'Unknown'}
Criminal History: ${params.criminalHistory || 'None reported'}
Family Ties: ${params.familyTies || 'Not specified'}
Immigration History: ${params.immigrationHistory || 'Unknown'}

Apply AILA training to provide:
1. Immediate action items (especially if detained)
2. All potential forms of relief with eligibility assessment
3. Procedural defenses to explore
4. Evidence gathering priorities
5. Timeline and strategic considerations
6. Circuit-specific considerations if applicable`;
  }

  private parseAILAAnalysis(content: string, params: RemovalCaseParams): RemovalDefenseAnalysis {
    // Enhanced parsing with AILA categories
    const analysis: RemovalDefenseAnalysis = {
      urgencyLevel: this.assessUrgency(params),
      bondEligibility: this.assessBondEligibility(params),
      reliefOptions: this.identifyReliefOptions(params),
      proceduralDefenses: this.identifyProceduralDefenses(params),
      evidencePriorities: this.prioritizeEvidence(params),
      strategicConsiderations: this.developStrategy(params),
      timeline: this.estimateTimeline(params),
      ailaResources: this.recommendAILAResources(params),
    };

    // Parse AI response to enhance analysis
    if (content) {
      // Extract specific recommendations from AI response
      const sections = content.split('\n\n');
      if (sections.length > 0) {
        analysis.aiEnhancedRecommendations = sections;
      }
    }

    return analysis;
  }

  private assessUrgency(params: RemovalCaseParams): 'critical' | 'urgent' | 'standard' {
    if (params.isDetained) return 'critical';
    if (params.hasCourtDate) {
      const daysUntilCourt = this.daysUntilDate(params.courtDate);
      if (daysUntilCourt < 7) return 'critical';
      if (daysUntilCourt < 30) return 'urgent';
    }
    return 'standard';
  }

  private assessBondEligibility(params: RemovalCaseParams): BondAssessment {
    const assessment: BondAssessment = {
      eligible: true,
      factors: {
        positive: [],
        negative: [],
      },
      recommendedAmount: '$5,000 - $15,000',
      strategy: [],
    };

    // Apply AILA bond factors
    if (params.familyTies?.includes('USC') || params.familyTies?.includes('citizen')) {
      assessment.factors.positive.push('US citizen family members');
    }
    if (params.timeInUS && parseInt(params.timeInUS) >= 5) {
      assessment.factors.positive.push('Long-term residence');
    }
    if (!params.criminalHistory || params.criminalHistory === 'None') {
      assessment.factors.positive.push('No criminal history');
    }

    // Negative factors
    if (params.criminalHistory?.includes('felony')) {
      assessment.factors.negative.push('Felony conviction');
      assessment.recommendedAmount = '$15,000 - $25,000';
    }
    if (params.immigrationHistory?.includes('prior removal')) {
      assessment.factors.negative.push('Prior removal order');
      assessment.eligible = false;
    }

    // AILA strategies
    assessment.strategy = [
      'Prepare comprehensive bond packet',
      'Obtain letters of support',
      'Document rehabilitation',
      'Show community ties',
      'Address negative factors directly',
    ];

    return assessment;
  }

  private identifyReliefOptions(params: RemovalCaseParams): ReliefOption[] {
    const options: ReliefOption[] = [];

    // Cancellation of Removal
    if (params.timeInUS && parseInt(params.timeInUS) >= 10) {
      options.push({
        type: 'Cancellation of Removal (Non-LPR)',
        eligibility: 'Potentially eligible',
        requirements: this.ailaKnowledge.cancellation_of_removal.non_lpr_requirements,
        strength: 'Medium',
        timeline: '2-4 years',
      });
    }

    // Asylum/Withholding/CAT
    if (params.countryOfOrigin) {
      options.push({
        type: 'Asylum',
        eligibility: 'Requires persecution assessment',
        requirements: this.ailaKnowledge.asylum_withholding_cat.asylum_requirements,
        strength: 'To be determined',
        timeline: '2-3 years',
      });
    }

    // Adjustment of Status
    if (params.familyTies?.includes('USC spouse') || params.familyTies?.includes('USC child')) {
      options.push({
        type: 'Adjustment of Status',
        eligibility: 'Potentially eligible through family',
        requirements: ['Approved I-130', 'Visa availability', 'Admissibility'],
        strength: 'High if immediate relative',
        timeline: '8-12 months',
      });
    }

    // Always include prosecutorial discretion
    options.push({
      type: 'Prosecutorial Discretion',
      eligibility: 'Always worth pursuing',
      requirements: ['Positive equities', 'No serious criminal history', 'Community ties'],
      strength: 'Varies',
      timeline: '2-6 months',
    });

    return options;
  }

  private identifyProceduralDefenses(params: RemovalCaseParams): string[] {
    return [
      'Review NTA for defects (missing allegations, improper service)',
      'Check jurisdiction (proper venue, timely filing)',
      'Verify proper notice (time and place of hearing)',
      'Examine charging documents for accuracy',
      'Consider motion to terminate for procedural violations',
      'Review any prior proceedings for res judicata',
      'Check statute of limitations issues',
    ];
  }

  private prioritizeEvidence(params: RemovalCaseParams): EvidencePriority[] {
    const priorities: EvidencePriority[] = [
      {
        category: 'Identity & Status',
        items: ['Passport', 'Birth certificate', 'Prior immigration documents'],
        urgency: 'Immediate',
      },
      {
        category: 'Continuous Presence',
        items: ['Tax returns', 'School records', 'Medical records', 'Employment records'],
        urgency: 'High',
      },
      {
        category: 'Family Ties',
        items: [
          'Marriage certificates',
          'Birth certificates of children',
          'Proof of USC/LPR status',
        ],
        urgency: 'High',
      },
      {
        category: 'Good Moral Character',
        items: ['Criminal record checks', 'Letters of support', 'Community service'],
        urgency: 'Medium',
      },
      {
        category: 'Hardship Evidence',
        items: ['Medical documentation', 'Country conditions', 'Psychological evaluations'],
        urgency: 'Medium',
      },
    ];

    return priorities;
  }

  private developStrategy(params: RemovalCaseParams): string[] {
    const strategies: string[] = [];

    if (params.isDetained) {
      strategies.push(
        'File motion for bond redetermination immediately',
        'Request telephonic appearance if far from detention center',
        'Consider habeas corpus if prolonged detention'
      );
    }

    strategies.push(
      'File FOIA requests with all agencies (USCIS, CBP, ICE)',
      'Submit comprehensive relief applications',
      'Build record for appeal from day one',
      'Consider parallel proceedings (e.g., U visa if crime victim)',
      'Maintain regular client communication',
      'Document all government communications'
    );

    return strategies;
  }

  private estimateTimeline(params: RemovalCaseParams): TimelineEstimate {
    if (params.isDetained) {
      return {
        overall: '6-12 months (detained docket)',
        milestones: [
          { event: 'Bond hearing', timeframe: '1-2 weeks' },
          { event: 'Master calendar hearing', timeframe: '2-4 weeks' },
          { event: 'Individual hearing', timeframe: '3-6 months' },
          { event: 'Decision', timeframe: '6-8 months' },
        ],
      };
    }

    return {
      overall: '2-4 years (non-detained docket)',
      milestones: [
        { event: 'Master calendar hearing', timeframe: '2-6 months' },
        { event: 'Filing deadline', timeframe: '6-12 months' },
        { event: 'Individual hearing', timeframe: '18-36 months' },
        { event: 'Decision', timeframe: '24-48 months' },
      ],
    };
  }

  private recommendAILAResources(params: {
    criminalHistory?: string;
    reliefOptions?: string[];
  }): string[] {
    const resources = [
      'AILA Practice Advisory on Detention and Bond',
      "AILA's Representing Clients in Immigration Court manual",
    ];

    if (params.criminalHistory) {
      resources.push("AILA's Immigration Consequences of Criminal Activity");
    }

    if (params.reliefOptions?.includes('Asylum')) {
      resources.push("AILA's Asylum Primer");
    }

    resources.push(
      'EOIR Practice Manual',
      'BIA Practice Manual',
      'Circuit-specific case law digests'
    );

    return resources;
  }

  private daysUntilDate(dateString?: string): number {
    if (!dateString) return 999;
    const courtDate = new Date(dateString);
    const today = new Date();
    const diffTime = courtDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private getAILATrainedAnalysis(params: {
    clientName: string;
    isDetained: boolean;
    detentionCenter?: string;
    hasCourtDate: boolean;
    courtDate?: string;
    criminalHistory?: string;
    timeInUS?: string;
    familyTies?: string;
    immigrationHistory?: string;
    countryOfOrigin?: string;
  }): RemovalDefenseAnalysis {
    return {
      urgencyLevel: this.assessUrgency(params),
      bondEligibility: this.assessBondEligibility(params),
      reliefOptions: this.identifyReliefOptions(params),
      proceduralDefenses: this.identifyProceduralDefenses(params),
      evidencePriorities: this.prioritizeEvidence(params),
      strategicConsiderations: this.developStrategy(params),
      timeline: this.estimateTimeline(params),
      ailaResources: this.recommendAILAResources(params),
      aiEnhancedRecommendations: [
        'This analysis is based on AILA best practices and training materials.',
        'Consult current AILA practice advisories for updates.',
        'Consider circuit-specific precedents in your jurisdiction.',
      ],
    };
  }
}

// Enhanced type definitions
interface RemovalDefenseAnalysis {
  urgencyLevel: 'critical' | 'urgent' | 'standard';
  bondEligibility: BondAssessment;
  reliefOptions: ReliefOption[];
  proceduralDefenses: string[];
  evidencePriorities: EvidencePriority[];
  strategicConsiderations: string[];
  timeline: TimelineEstimate;
  ailaResources: string[];
  aiEnhancedRecommendations?: string[];
}

interface BondAssessment {
  eligible: boolean;
  factors: {
    positive: string[];
    negative: string[];
  };
  recommendedAmount: string;
  strategy: string[];
}

interface ReliefOption {
  type: string;
  eligibility: string;
  requirements: string[];
  strength: string;
  timeline: string;
}

interface EvidencePriority {
  category: string;
  items: string[];
  urgency: 'Immediate' | 'High' | 'Medium' | 'Low';
}

interface TimelineEstimate {
  overall: string;
  milestones: Array<{
    event: string;
    timeframe: string;
  }>;
}
