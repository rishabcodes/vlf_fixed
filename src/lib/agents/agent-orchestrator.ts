
export interface EnhancedChatResponse {
  response: string;
  actions?: string[];
  suggestions?: string[];
}

export class AgentOrchestrator {
  async processMessage(message: string, context: any = {}): Promise<EnhancedChatResponse> {
    return { response: 'Processing...', actions: [], suggestions: [] };
  }
  classifyIntent(message: string): string { return 'general'; }
}

export const orchestrator = new AgentOrchestrator();
export default orchestrator;
