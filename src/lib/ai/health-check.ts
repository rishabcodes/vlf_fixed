// import { enhancedChatService } from './enhanced-chat-service';
import { aiTranslationService } from './translation-service';
// import { AgentOrchestrator } from '@/lib/agents/agent-orchestrator';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

// Import the actual metrics type from agent-orchestrator
// import type { AgentPerformanceMetrics as AgentMetrics } from '@/lib/agents/agent-orchestrator';
type AgentMetrics = any; // Temporary fix

export interface AIServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: {
    enhancedChat: {
      available: boolean;
      openai: boolean;
      orchestrator: boolean;
      circuitBreaker: boolean;
    };
    translation: {
      available: boolean;
      aiAvailable: boolean;
      staticTranslations: boolean;
      cacheSize: number;
    };
    agentOrchestrator: {
      available: boolean;
      agentCount: number;
      metrics: Record<string, AgentMetrics>;
    };
  };
  lastChecked: string;
  uptime: number;
}

class AIHealthChecker {
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  async checkHealth(): Promise<AIServiceHealth> {
    const startTime = Date.now();

    try {
      // Check Enhanced Chat Service - commented out as service removed
      // const chatHealth = enhancedChatService.getHealth();
      const chatHealth = { status: 'unavailable', openai: false, orchestrator: false, circuitBreaker: false };

      // Check Translation Service
      const translationStats = aiTranslationService.getStats();

      // Check Agent Orchestrator - commented out as service removed
      // const orchestrator = AgentOrchestrator.getInstance();
      // const agentStatus = orchestrator.getAgentStatus();
      // const agentMetrics = orchestrator.getAllMetrics();
      const agentStatus = {};
      const agentMetrics = {};

      const services = {
        enhancedChat: {
          available: chatHealth.status === 'healthy',
          openai: chatHealth.services.openai || false,
          orchestrator: chatHealth.services.orchestrator || false,
          circuitBreaker: chatHealth.services.circuitBreaker || false,
        },
        translation: {
          available: true,
          aiAvailable: translationStats.aiAvailable,
          staticTranslations: translationStats.staticTranslationsAvailable,
          cacheSize: translationStats.cacheSize,
        },
        agentOrchestrator: {
          available: Object.keys(agentStatus).length > 0,
          agentCount: Object.keys(agentStatus).length,
          metrics: agentMetrics,
        },
      };

      // Determine overall status
      let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

      if (!services.enhancedChat.available) {
        status = 'unhealthy';
      } else if (!services.enhancedChat.openai || !services.translation.aiAvailable) {
        status = 'degraded';
      }

      const healthResult: AIServiceHealth = {
        status,
        services,
        lastChecked: new Date().toISOString(),
        uptime: Date.now() - this.startTime,
      };

      logger.info('AI health check completed', {
        status,
        processingTime: Date.now() - startTime,
        services: Object.keys(services),
      });

      return healthResult;
    } catch (error) {
      logger.error('AI health check failed:', errorToLogMeta(error));

      return {
        status: 'unhealthy',
        services: {
          enhancedChat: {
            available: false,
            openai: false,
            orchestrator: false,
            circuitBreaker: false,
          },
          translation: {
            available: false,
            aiAvailable: false,
            staticTranslations: false,
            cacheSize: 0,
          },
          agentOrchestrator: {
            available: false,
            agentCount: 0,
            metrics: {},
          },
        },
        lastChecked: new Date().toISOString(),
        uptime: Date.now() - this.startTime,
      };
    }
  }

  async performDiagnostics(): Promise<{
    basicChat: { success: boolean; responseTime: number; error?: string };
    translation: { success: boolean; responseTime: number; error?: string };
    agentRouting: { success: boolean; responseTime: number; error?: string };
  }> {
    const results = {
      basicChat: { success: false, responseTime: 0, error: '' },
      translation: { success: false, responseTime: 0, error: '' },
      agentRouting: { success: false, responseTime: 0, error: '' },
    };

    // Test basic chat functionality
    try {
      const startTime = Date.now();
      const testContext = {
        userId: 'health-check',
        sessionId: 'health-check-session',
        language: 'en',
        socketId: 'health-check-socket',
        history: [],
        conversationContext: [],
        metadata: {
          source: 'socket' as const,
        },
      };

      const response = await enhancedChatService.processMessage(
        'Hello, this is a health check',
        testContext
      );
      results.basicChat.success = !!response.response;
      results.basicChat.responseTime = Date.now() - startTime;
    } catch (error) {
      results.basicChat.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Test translation functionality
    try {
      const startTime = Date.now();
      const translation = await aiTranslationService.translateText('Hello', 'es');
      results.translation.success = translation.length > 0;
      results.translation.responseTime = Date.now() - startTime;
    } catch (error) {
      results.translation.error = error instanceof Error ? error.message : 'Unknown error';
    }

    // Test agent routing - commented out as service removed
    try {
      const startTime = Date.now();
      // const orchestrator = AgentOrchestrator.getInstance();
      const testContext = {
        userId: 'health-check',
        sessionId: 'health-check-session',
        language: 'en',
        history: [],
        metadata: { source: 'health-check' },
      };

      // const response = await orchestrator.routeMessage('I need help with immigration', testContext);
      // results.agentRouting.success = !!response.response;
      results.agentRouting.success = false;
      results.agentRouting.error = 'Agent orchestrator service removed';
      results.agentRouting.responseTime = Date.now() - startTime;
    } catch (error) {
      results.agentRouting.error = error instanceof Error ? error.message : 'Unknown error';
    }

    return results;
  }
}

// Export singleton instance
export const aiHealthChecker = new AIHealthChecker();

// Helper function for quick health check
export async function getAIHealthStatus(): Promise<'healthy' | 'degraded' | 'unhealthy'> {
  try {
    const health = await aiHealthChecker.checkHealth();
    return health.status;
  } catch (error) {
    logger.error('Quick health check failed:', errorToLogMeta(error));
    return 'unhealthy';
  }
}
