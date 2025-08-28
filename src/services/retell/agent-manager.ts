import { logger } from '@/lib/safe-logger';

export class RetellAgentManager {
  private agents: Map<string, any> = new Map();

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents() {
    // Initialize with configured agent IDs from environment
    const agentConfigs = [
      { id: process.env.RETELL_AGENT_ENGLISH_INTAKE, type: 'english_intake', language: 'en' },
      { id: process.env.RETELL_AGENT_SPANISH_INTAKE, type: 'spanish_intake', language: 'es' },
      { id: process.env.RETELL_AGENT_GENERAL_SUPPORT, type: 'general_support', language: 'en' },
      { id: process.env.RETELL_AGENT_APPOINTMENT_SCHEDULER, type: 'appointment', language: 'en' },
      { id: process.env.RETELL_AGENT_LEAD_QUALIFIER, type: 'lead_qualifier', language: 'en' },
      { id: process.env.RETELL_AGENT_CASE_STATUS, type: 'case_status', language: 'en' },
      { id: process.env.RETELL_AGENT_EMERGENCY_HANDLER, type: 'emergency', language: 'en' },
      { id: process.env.RETELL_AGENT_PAYMENT_PROCESSOR, type: 'payment', language: 'en' },
    ];

    agentConfigs.forEach(config => {
      if (config.id) {
        this.agents.set(config.type, {
          id: config.id,
          type: config.type,
          language: config.language,
        });
        logger.info(`Initialized agent: ${config.type} (${config.id})`);
      }
    });
  }

  getAgentByType(type: string) {
    return this.agents.get(type);
  }

  getAgentById(id: string) {
    for (const agent of this.agents.values()) {
      if (agent.id === id) {
        return agent;
      }
    }
    return null;
  }

  getAllAgents() {
    return Array.from(this.agents.values());
  }

  getAgentForIntent(intent: string, language: string = 'en') {
    // Route to appropriate agent based on intent
    const intentMapping: Record<string, string> = {
      'new_case': language === 'es' ? 'spanish_intake' : 'english_intake',
      'appointment': 'appointment',
      'case_status': 'case_status',
      'payment': 'payment',
      'emergency': 'emergency',
      'general': 'general_support',
    };

    const agentType = intentMapping[intent] || 'general_support';
    return this.getAgentByType(agentType);
  }
}

// Export singleton instance
export const agentManager = new RetellAgentManager();