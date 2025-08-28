import { AgentType, AgentConfig } from '@/config/agents/types';
import { agentConfigs } from '@/config/agents/agent-configs';
import { agentTrainingData } from '@/config/agents/training-data';
import { logger } from '@/lib/safe-logger';
import type { AgentContext } from '@/types/services';

export class AgentManager {
  private static instance: AgentManager;
  private agents: Map<AgentType, AgentConfig> = new Map();
  private activeAgents: Map<string, AgentSession> = new Map();

  private constructor() {
    this.initializeAgents();
  }

  static getInstance(): AgentManager {
    if (!AgentManager.instance) {
      AgentManager.instance = new AgentManager();
    }
    return AgentManager.instance;
  }

  private initializeAgents() {
    Object.entries(agentConfigs).forEach(([type, config]) => {
      this.agents.set(type as AgentType, config);
      logger.info(`Initialized agent: ${config.name}`, { type, skills: config.skills });
    });
  }

  async routeToAgent(
    input: string,
    context: ConversationContext,
    preferredAgent?: AgentType
  ): Promise<AgentType> {
    // If preferred agent specified and available, use it
    if (preferredAgent && this.isAgentAvailable(preferredAgent)) {
      return preferredAgent;
    }

    // NEW: Start with Classification agent for new conversations
    if (!context.previousAgent) {
      return AgentType.CLASSIFICATION;
    }

    // Check for obvious emergency keywords for immediate routing
    const lowerInput = input.toLowerCase();
    const emergencyPhrases = [
      'ice detention', 'ice took', 'detained by ice',
      'arrested by police', 'in jail now',
      'court tomorrow', 'court today'
    ];
    
    if (emergencyPhrases.some(phrase => lowerInput.includes(phrase))) {
      return AgentType.EMERGENCY_AFTER_HOURS;
    }

    // Check for obvious direct routes
    const directRoutes = {
      'car accident': AgentType.PERSONAL_INJURY,
      'divorce papers': AgentType.FAMILY_LAW,
      'work injury': AgentType.WORKERS_COMP,
      'dui arrest': AgentType.CRIMINAL_DEFENSE,
      'green card': AgentType.AFFIRMATIVE_IMMIGRATION,
      'h1b visa': AgentType.BUSINESS_IMMIGRATION,
    };

    for (const [phrase, agent] of Object.entries(directRoutes)) {
      if (lowerInput.includes(phrase)) {
        return agent;
      }
    }

    // If context exists but no clear route, use Classification
    return AgentType.CLASSIFICATION;
  }

  private analyzeRoutingSignals(input: string): RoutingSignals {
    const signals: RoutingSignals = {
      isEmergency: false,
      needsSpanish: false,
      legalArea: null,
      keywords: [],
    };

    // Emergency keywords
    const emergencyKeywords = [
      'detained',
      'arrested',
      'jail',
      'ice',
      'emergency',
      'urgent',
      'police',
      'custody',
    ];
    signals.isEmergency = emergencyKeywords.some(keyword => input.includes(keyword));

    // Spanish indicators
    const spanishIndicators = ['español', 'spanish', 'hablar español', 'no speak english'];
    signals.needsSpanish = spanishIndicators.some(indicator => input.includes(indicator));

    // Legal area detection
    const areaKeywords = {
      immigration: [
        'immigration',
        'visa',
        'green card',
        'citizenship',
        'deportation',
        'ice',
        'detained',
      ],
      criminal: ['arrested', 'criminal', 'dui', 'charged', 'police', 'court', 'jail'],
      personalInjury: ['accident', 'injured', 'hurt', 'crash', 'slip', 'fall', 'insurance'],
      workersComp: ['work injury', 'hurt at work', 'workers comp', 'workplace accident'],
      family: ['divorce', 'custody', 'child support', 'separation', 'family court'],
      business: ['business', 'llc', 'corporation', 'company', 'incorporate'],
    };

    for (const [area, keywords] of Object.entries(areaKeywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        signals.legalArea = area;
        signals.keywords = keywords.filter(keyword => input.includes(keyword));
        break;
      }
    }

    return signals;
  }

  private getAgentForLegalArea(area: string): AgentType {
    const areaToAgent: Record<string, AgentType> = {
      immigration: AgentType.GENERAL_INTAKE, // Will be further routed by intake
      criminal: AgentType.CRIMINAL_DEFENSE,
      personalInjury: AgentType.PERSONAL_INJURY,
      workersComp: AgentType.WORKERS_COMP,
      family: AgentType.FAMILY_LAW,
      business: AgentType.BUSINESS_FORMATION,
    };

    return areaToAgent[area] || AgentType.GENERAL_INTAKE;
  }

  private isAgentAvailable(agentType: AgentType): boolean {
    const agent = this.agents.get(agentType);
    if (!agent) return false;

    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);

    // Check if current day is in available days
    if (!agent.availability.days.includes(currentDay)) {
      return false;
    }

    // Check if current time is within available hours
    const { start, end } = agent.availability.hours;
    return currentTime >= start && currentTime <= end;
  }

  async createAgentSession(
    agentType: AgentType,
    userId: string,
    channel: 'voice' | 'chat' | 'sms'
  ): Promise<AgentSession> {
    const agent = this.agents.get(agentType);
    if (!agent) {
      throw new Error(`Agent type ${agentType} not found`);
    }

    const sessionId = this.generateSessionId();
    const session: AgentSession = {
      id: sessionId,
      agentType,
      userId,
      channel,
      startTime: new Date(),
      context: {
        previousAgent: null,
        transferHistory: [],
        collectedInfo: {},
        language: agent.language === 'es' ? 'es' : 'en',
      },
    };

    this.activeAgents.set(sessionId, session);
    logger.info('Created agent session', { sessionId, agentType, userId, channel });

    return session;
  }

  async transferSession(
    sessionId: string,
    targetAgent: AgentType,
    reason: string
  ): Promise<AgentSession> {
    const session = this.activeAgents.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const previousAgent = session.agentType;
    session.agentType = targetAgent;
    session.context.previousAgent = previousAgent;
    session.context.transferHistory.push({
      from: previousAgent,
      to: targetAgent,
      reason,
      timestamp: new Date(),
    });

    logger.info('Transferred session', {
      sessionId,
      from: previousAgent,
      to: targetAgent,
      reason,
    });

    return session;
  }

  getAgentPrompt(agentType: AgentType, context?: AgentContext): string {
    const agent = this.agents.get(agentType);
    if (!agent) {
      throw new Error(`Agent type ${agentType} not found`);
    }

    let prompt = agent.promptTemplate;

    // Add training data context
    const training = agentTrainingData[agentType];
    if (training && training.knowledge.length > 0) {
      prompt += '\n\nKey Knowledge:\n';
      training.knowledge.forEach(item => {
        prompt += `- ${item.topic}: ${item.content}\n`;
      });
    }

    // Add context-specific information
    if (context) {
      prompt += '\n\nCurrent Context:\n';
      prompt += JSON.stringify(context, null, 2);
    }

    return prompt;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  endSession(sessionId: string): void {
    const session = this.activeAgents.get(sessionId);
    if (session) {
      const duration = Date.now() - session.startTime.getTime();
      logger.info('Ended agent session', {
        sessionId,
        duration,
        transferCount: session.context.transferHistory.length,
      });
      this.activeAgents.delete(sessionId);
    }
  }

  getActiveSessionCount(): number {
    return this.activeAgents.size;
  }

  getAgentConfig(agentType: AgentType): AgentConfig | undefined {
    return this.agents.get(agentType);
  }
}

// Types for agent sessions and routing
interface AgentSession {
  id: string;
  agentType: AgentType;
  userId: string;
  channel: 'voice' | 'chat' | 'sms';
  startTime: Date;
  context: ConversationContext;
}

interface ConversationContext {
  previousAgent: AgentType | null;
  transferHistory: TransferRecord[];
  collectedInfo: Record<string, string | number | boolean>;
  language: 'en' | 'es';
}

interface TransferRecord {
  from: AgentType;
  to: AgentType;
  reason: string;
  timestamp: Date;
}

interface RoutingSignals {
  isEmergency: boolean;
  needsSpanish: boolean;
  legalArea: string | null;
  keywords: string[];
}

export const agentManager = AgentManager.getInstance();
