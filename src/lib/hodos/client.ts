/**
 * HODOS Platform Integration Client
 * Connects VLF Website with HODOS legal practice management system
 */

import { logger } from '@/lib/safe-logger';

interface HODOSConfig {
  apiUrl: string;
  apiKey: string;
  websocketUrl?: string;
  timeout?: number;
}

interface CaseData {
  clientId: string;
  caseType: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  documents?: string[];
}

interface AgentTask {
  agent?: string;
  task: string;
  context?: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high';
}

interface ClientData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferredLanguage?: string;
  source: 'website' | 'referral' | 'direct';
}

export class HODOSClient {
  private config: HODOSConfig;
  private headers: HeadersInit;

  constructor(config?: Partial<HODOSConfig>) {
    this.config = {
      apiUrl: config?.apiUrl || process.env.HODOS_API_URL || 'http://localhost:3001',
      apiKey: config?.apiKey || process.env.HODOS_API_KEY || '',
      websocketUrl: config?.websocketUrl || process.env.HODOS_WEBSOCKET_URL,
      timeout: config?.timeout || 30000,
    };

    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.config.apiKey}`,
      'X-Source': 'vlf-website',
    };
  }

  /**
   * Make authenticated request to HODOS API
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.apiUrl}/api${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        signal: AbortSignal.timeout(this.config.timeout || 30000),
      });

      if (!response.ok) {
        throw new Error(`HODOS API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('HODOS API request failed', { endpoint, error });
      throw error;
    }
  }

  /**
   * Client Management
   */
  async createClient(data: ClientData) {
    return this.request<{ id: string; client: ClientData }>('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getClient(id: string) {
    return this.request<{ id: string; client: ClientData }>(`/clients/${id}`);
  }

  async updateClient(id: string, data: Partial<ClientData>) {
    return this.request<{ id: string; client: ClientData }>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Case Management
   */
  async createCase(data: CaseData) {
    return this.request<{ id: string; case: CaseData }>('/cases', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCase(id: string) {
    return this.request<{ id: string; case: CaseData }>(`/cases/${id}`);
  }

  async getCasesByClient(clientId: string) {
    return this.request<CaseData[]>(`/cases?clientId=${clientId}`);
  }

  async updateCaseStatus(id: string, status: string) {
    return this.request<{ id: string; status: string; updatedAt: string }>(`/cases/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  /**
   * Document Management
   */
  async uploadDocument(caseId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);

    return this.request<{ id: string; url: string }>('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'X-Source': 'vlf-website',
      },
    });
  }

  async generateDocument(templateId: string, data: Record<string, unknown>) {
    return this.request<{ id: string; url: string }>('/documents/generate', {
      method: 'POST',
      body: JSON.stringify({ templateId, data }),
    });
  }

  /**
   * AI Agent Integration
   */
  async requestAgentAssistance(task: AgentTask) {
    return this.request<{ response: string; agent: string; confidence: number }>('/agents/assist', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async getAvailableAgents() {
    return this.request<Array<{ id: string; name: string; status: string }>>('/agents');
  }

  /**
   * Workflow Automation
   */
  async executeWorkflow(workflowId: string, params?: unknown) {
    return this.request<{ executionId: string; status: string }>(
      `/workflows/${workflowId}/execute`,
      {
        method: 'POST',
        body: JSON.stringify(params || {}),
      }
    );
  }

  async getWorkflowStatus(executionId: string) {
    return this.request<{ id: string; status: string; result?: unknown; error?: string }>(`/workflows/executions/${executionId}`);
  }

  /**
   * Scheduling Integration
   */
  async getAvailableSlots(attorneyId?: string, date?: string) {
    const params = new URLSearchParams();
    if (attorneyId) params.append('attorneyId', attorneyId);
    if (date) params.append('date', date);

    return this.request<Array<{ date: string; times: string[] }>>(
      `/scheduling/availability?${params}`
    );
  }

  async bookAppointment(data: {
    clientId: string;
    attorneyId?: string;
    datetime: string;
    type: string;
    notes?: string;
  }) {
    return this.request<{
      id: string;
      appointment: { date: string; time: string; duration: number; status: string };
    }>('/scheduling/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Health Check
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.config.apiUrl}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * WebSocket Connection (for real-time updates)
   */
  connectWebSocket(handlers: {
    onCaseUpdate?: (data: Record<string, unknown>) => void;
    onDocumentReady?: (data: Record<string, unknown>) => void;
    onAgentResponse?: (data: Record<string, unknown>) => void;
  }) {
    if (!this.config.websocketUrl) {
      logger.warn('WebSocket URL not configured');
      return null;
    }

    // Implementation would depend on your WebSocket library
    // This is a placeholder for the actual implementation
    logger.info('WebSocket connection would be established here');
    return null;
  }
}

// Singleton instance
export const hodosClient = new HODOSClient();
