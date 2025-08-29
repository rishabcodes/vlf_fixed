// Stub implementation for enhanced chat service
// This module is being phased out

export const enhancedChatService = {
  getHealth() {
    return {
      status: 'degraded' as const,
      services: {
        openai: false,
        orchestrator: false,
        circuitBreaker: false,
      },
    };
  },

  async processMessage(message: string, context: any) {
    return {
      response: 'Chat service is currently unavailable',
      metadata: {
        source: 'stub',
      },
    };
  },
};