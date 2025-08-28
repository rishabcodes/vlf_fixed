import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export enum LegalPracticeArea {
  REMOVAL_DEFENSE = 'removal_defense',
  BUSINESS_IMMIGRATION = 'business_immigration',
  FAMILY_IMMIGRATION = 'family_immigration',
  CRIMINAL_DEFENSE = 'criminal_defense',
  PERSONAL_INJURY = 'personal_injury',
  WORKERS_COMP = 'workers_comp',
  FAMILY_LAW = 'family_law',
  TRAFFIC = 'traffic',
  BUSINESS_LAW = 'business_law',
  GENERAL = 'general',
}

export class EnhancedIntakeAgent {
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

  async processIntake(params: {
    clientInput: string;
    preferredLanguage?: 'en' | 'es';
    isEmergency?: boolean;
    contactInfo?: {
      name?: string;
      phone?: string;
      email?: string;
    };
  }): Promise<IntakeResult> {
    try {
      if (!this.model) {
        return this.getMockIntake(params);
      }

      const systemPrompt = `You are a professional legal intake specialist for Vasquez Law Firm. 
Your role is to:
1. Identify the client's legal needs and appropriate practice area
2. Assess urgency (emergency situations include: detention, arrest, court within 48hrs, serious injury)
3. Gather essential information
4. Route to the correct specialist
5. Be empathetic and professional

Practice areas:
- REMOVAL_DEFENSE: ICE detention, deportation, removal proceedings
- BUSINESS_IMMIGRATION: H1B, L1, E2, employment visas, PERM
- FAMILY_IMMIGRATION: Green cards, citizenship, family petitions
- CRIMINAL_DEFENSE: Arrests, charges, DUI, criminal cases
- PERSONAL_INJURY: Accidents, injuries, insurance claims
- WORKERS_COMP: Workplace injuries, workers compensation
- FAMILY_LAW: Divorce, custody, child support
- TRAFFIC: Traffic tickets, license issues
- BUSINESS_LAW: LLC, corporation, business formation

${params.preferredLanguage === 'es' ? 'Respond in Spanish when appropriate.' : ''}`;

      const userPrompt = `Client says: "${params.clientInput}"
${params.isEmergency ? 'MARKED AS EMERGENCY' : ''}
${params.contactInfo?.name ? `Name: ${params.contactInfo.name}` : ''}

Determine:
1. Primary legal issue
2. Practice area (from the list above)
3. Urgency level
4. Key information to collect
5. Initial guidance`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseIntakeResult(response.content as string, params);
    } catch (error) {
      logger.error('Intake processing failed', errorToLogMeta(error));
      return this.getMockIntake(params);
    }
  }

  async routeToSpecialist(practiceArea: LegalPracticeArea): Promise<RoutingInfo> {
    const routingMap: Record<LegalPracticeArea, RoutingInfo> = {
      [LegalPracticeArea.REMOVAL_DEFENSE]: {
        agentType: 'RemovalDefenseAgent',
        agentName: 'Deportation Defense Specialist',
        priority: 'urgent',
        availability: '24/7 for detained cases',
        specialInstructions: 'Prioritize detained individuals and upcoming court dates',
      },
      [LegalPracticeArea.BUSINESS_IMMIGRATION]: {
        agentType: 'BusinessImmigrationAgent',
        agentName: 'Business Immigration Attorney',
        priority: 'standard',
        availability: 'Business hours',
        specialInstructions: 'Gather company and position details',
      },
      [LegalPracticeArea.FAMILY_IMMIGRATION]: {
        agentType: 'FamilyImmigrationAgent',
        agentName: 'Family Immigration Specialist',
        priority: 'standard',
        availability: 'Business hours',
        specialInstructions: 'Document family relationships and immigration history',
      },
      [LegalPracticeArea.CRIMINAL_DEFENSE]: {
        agentType: 'CriminalDefenseAgent',
        agentName: 'NC Criminal Defense Attorney',
        priority: 'urgent',
        availability: '24/7 for arrests',
        specialInstructions: 'Note charges, arrest location, and bail status',
      },
      [LegalPracticeArea.PERSONAL_INJURY]: {
        agentType: 'PersonalInjuryAgent',
        agentName: 'Personal Injury Attorney',
        priority: 'high',
        availability: 'Extended hours',
        specialInstructions: 'Document injuries and gather insurance info',
      },
      [LegalPracticeArea.WORKERS_COMP]: {
        agentType: 'WorkersCompAgent',
        agentName: 'Workers Compensation Specialist',
        priority: 'standard',
        availability: 'Business hours',
        specialInstructions: 'Verify injury occurred at work and employer info',
      },
      [LegalPracticeArea.FAMILY_LAW]: {
        agentType: 'FamilyLawAgent',
        agentName: 'Family Law Attorney',
        priority: 'standard',
        availability: 'Business hours',
        specialInstructions: 'Screen for domestic violence and urgent custody issues',
      },
      [LegalPracticeArea.TRAFFIC]: {
        agentType: 'TrafficAgent',
        agentName: 'Traffic Violation Attorney',
        priority: 'low',
        availability: 'Business hours',
        specialInstructions: 'Get citation details and court date',
      },
      [LegalPracticeArea.BUSINESS_LAW]: {
        agentType: 'BusinessFormationAgent',
        agentName: 'Business Law Attorney',
        priority: 'low',
        availability: 'Business hours',
        specialInstructions: 'Understand business goals and structure needs',
      },
      [LegalPracticeArea.GENERAL]: {
        agentType: 'GeneralCounselAgent',
        agentName: 'General Legal Counsel',
        priority: 'standard',
        availability: 'Business hours',
        specialInstructions: 'Clarify legal needs for proper routing',
      },
    };

    return routingMap[practiceArea] || routingMap[LegalPracticeArea.GENERAL];
  }

  private parseIntakeResult(content: string, params: any): IntakeResult {
    // Extract practice area from AI response
    const practiceArea = this.extractPracticeArea(content);
    const urgencyLevel = this.assessUrgency(content, params);

    return {
      practiceArea,
      urgencyLevel,
      summary: this.extractSummary(content),
      keyInformation: this.extractKeyInfo(content),
      requiredDocuments: this.extractDocuments(content),
      nextSteps: this.extractNextSteps(content),
      routingRecommendation: practiceArea,
      estimatedResponseTime: this.getResponseTime(urgencyLevel),
      language: params.preferredLanguage || 'en',
    };
  }

  private extractPracticeArea(content: string): LegalPracticeArea {
    const contentLower = content.toLowerCase();

    if (
      contentLower.includes('removal') ||
      contentLower.includes('detention') ||
      contentLower.includes('ice')
    ) {
      return LegalPracticeArea.REMOVAL_DEFENSE;
    }
    if (
      contentLower.includes('h1b') ||
      contentLower.includes('employment visa') ||
      contentLower.includes('business immigration')
    ) {
      return LegalPracticeArea.BUSINESS_IMMIGRATION;
    }
    if (
      contentLower.includes('green card') ||
      contentLower.includes('citizenship') ||
      contentLower.includes('family petition')
    ) {
      return LegalPracticeArea.FAMILY_IMMIGRATION;
    }
    if (
      contentLower.includes('criminal') ||
      contentLower.includes('arrest') ||
      contentLower.includes('dui')
    ) {
      return LegalPracticeArea.CRIMINAL_DEFENSE;
    }
    if (
      contentLower.includes('accident') ||
      contentLower.includes('injury') ||
      contentLower.includes('insurance claim')
    ) {
      return LegalPracticeArea.PERSONAL_INJURY;
    }
    if (contentLower.includes('work injury') || contentLower.includes('workers comp')) {
      return LegalPracticeArea.WORKERS_COMP;
    }
    if (
      contentLower.includes('divorce') ||
      contentLower.includes('custody') ||
      contentLower.includes('child support')
    ) {
      return LegalPracticeArea.FAMILY_LAW;
    }
    if (
      contentLower.includes('traffic') ||
      contentLower.includes('speeding') ||
      contentLower.includes('license')
    ) {
      return LegalPracticeArea.TRAFFIC;
    }
    if (
      contentLower.includes('llc') ||
      contentLower.includes('business') ||
      contentLower.includes('corporation')
    ) {
      return LegalPracticeArea.BUSINESS_LAW;
    }

    return LegalPracticeArea.GENERAL;
  }

  private assessUrgency(
    content: string,
    params: any
  ): 'emergency' | 'urgent' | 'high' | 'standard' {
    if (params.isEmergency) return 'emergency';

    const contentLower = content.toLowerCase();
    const emergencyKeywords = [
      'detained',
      'arrested',
      'ice',
      'jail',
      'emergency',
      'urgent',
      'immediately',
    ];
    const urgentKeywords = ['court date', 'deadline', 'injured', 'accident'];

    if (emergencyKeywords.some(keyword => contentLower.includes(keyword))) {
      return 'emergency';
    }
    if (urgentKeywords.some(keyword => contentLower.includes(keyword))) {
      return 'urgent';
    }

    return 'standard';
  }

  private extractSummary(content: string): string {
    const lines = content.split('\n');
    return lines[0] || 'Client needs legal assistance';
  }

  private extractKeyInfo(content: string): string[] {
    return (
      this.extractListItems(content, 'information') || [
        'Client contact information',
        'Details of legal issue',
        'Relevant dates and deadlines',
        'Any documentation available',
      ]
    );
  }

  private extractDocuments(content: string): string[] {
    return (
      this.extractListItems(content, 'document') || [
        'Government-issued ID',
        'Any legal notices received',
        'Relevant contracts or agreements',
      ]
    );
  }

  private extractNextSteps(content: string): string[] {
    return (
      this.extractListItems(content, 'step') || [
        'Schedule consultation',
        'Gather required documents',
        'Avoid discussing case with others',
      ]
    );
  }

  private extractListItems(text: string, keyword: string): string[] {
    const lines = text.split('\n');
    const items: string[] = [];
    let inSection = false;

    for (const line of lines) {
      if (line.toLowerCase().includes(keyword)) {
        inSection = true;
        continue;
      }
      if (inSection && (line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./))) {
        items.push(line.replace(/^[-•\d.]\s*/, '').trim());
      }
      if (inSection && line.trim() === '') {
        break;
      }
    }

    return items;
  }

  private getResponseTime(urgency: string): string {
    const times = {
      emergency: 'Immediate - within 1 hour',
      urgent: 'Within 2-4 hours',
      high: 'Within 24 hours',
      standard: 'Within 1-2 business days',
    };
    return times[urgency as keyof typeof times] || times.standard;
  }

  private getMockIntake(params: any): IntakeResult {
    const input = params.clientInput.toLowerCase();
    let practiceArea = LegalPracticeArea.GENERAL;
    let urgency: 'emergency' | 'urgent' | 'high' | 'standard' = 'standard';

    // Simple keyword matching for mock
    if (input.includes('detained') || input.includes('ice')) {
      practiceArea = LegalPracticeArea.REMOVAL_DEFENSE;
      urgency = 'emergency';
    } else if (input.includes('arrest') || input.includes('criminal')) {
      practiceArea = LegalPracticeArea.CRIMINAL_DEFENSE;
      urgency = 'urgent';
    } else if (input.includes('accident') || input.includes('injury')) {
      practiceArea = LegalPracticeArea.PERSONAL_INJURY;
      urgency = 'high';
    } else if (input.includes('divorce') || input.includes('custody')) {
      practiceArea = LegalPracticeArea.FAMILY_LAW;
    } else if (input.includes('visa') || input.includes('immigration')) {
      practiceArea = LegalPracticeArea.BUSINESS_IMMIGRATION;
    }

    return {
      practiceArea,
      urgencyLevel: urgency,
      summary: 'Client needs legal assistance with ' + practiceArea.replace('_', ' '),
      keyInformation: [
        'Client name and contact information',
        'Specific details about the legal issue',
        'Any deadlines or court dates',
        'Previous legal actions taken',
      ],
      requiredDocuments: [
        'Photo ID',
        'Any legal documents received',
        'Evidence related to the case',
        'Financial documents if applicable',
      ],
      nextSteps: [
        'Complete intake form',
        'Schedule consultation with specialist',
        'Begin gathering required documents',
        'Avoid discussing case details with third parties',
      ],
      routingRecommendation: practiceArea,
      estimatedResponseTime: this.getResponseTime(urgency),
      language: params.preferredLanguage || 'en',
    };
  }
}

interface IntakeResult {
  practiceArea: LegalPracticeArea;
  urgencyLevel: 'emergency' | 'urgent' | 'high' | 'standard';
  summary: string;
  keyInformation: string[];
  requiredDocuments: string[];
  nextSteps: string[];
  routingRecommendation: LegalPracticeArea;
  estimatedResponseTime: string;
  language: 'en' | 'es';
}

interface RoutingInfo {
  agentType: string;
  agentName: string;
  priority: string;
  availability: string;
  specialInstructions: string;
}
