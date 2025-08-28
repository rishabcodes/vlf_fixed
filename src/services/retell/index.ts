// axios removed - using native fetch
interface FetchInstance {
  get: (url: string) => Promise<any>;
  post: (url: string, data?: any) => Promise<any>;
  put: (url: string, data?: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}
import { logger } from '@/lib/safe-logger';
import { cache, cacheKeys, CacheTTL } from '@/lib/cache';
import { callAnalysisQueue } from '@/lib/queue/bull';

interface RetellConfig {
  apiKey: string;
  baseURL?: string;
}

interface RetellAgent {
  agent_id: string;
  agent_name: string;
  voice_id: string;
  language: string;
  response_engine: {
    type: string;
    llm_id?: string;
    system_prompt?: string;
  };
  webhook_url?: string;
  interruption_sensitivity?: number;
  ambient_sound?: boolean;
  responsiveness?: number;
  voice_temperature?: number;
  voice_speed?: number;
  enable_backchannel?: boolean;
  reminder_trigger_ms?: number;
  reminder_max_count?: number;
}

interface CallAnalytics {
  call_id: string;
  agent_id: string;
  duration_seconds: number;
  transcript: Array<{
    role: 'agent' | 'user';
    content: string;
    timestamp: number;
  }>;
  sentiment_analysis?: {
    overall_sentiment: string;
    confidence: number;
  };
  call_summary?: string;
  metrics?: {
    latency: number;
    interruptions: number;
    user_satisfaction?: number;
  };
}

interface AgentAnalytics {
  agent_id: string;
  total_calls: number;
  total_duration: number;
  average_call_duration: number;
  success_rate: number;
  metrics: {
    average_latency: number;
    interruption_rate: number;
    user_satisfaction: number;
  };
}

interface RetellVoice {
  voice_id: string;
  voice_name: string;
  gender: string;
  accent: string;
  language: string;
  provider: string;
}

interface RetellLLM {
  llm_id: string;
  llm_name: string;
  provider: string;
  model: string;
}

interface RetellWebhookEvent {
  event:
    | 'call_started'
    | 'call_ended'
    | 'call_analyzed'
    | 'transcript_ready'
    | 'recording_ready'
    | 'call_queued'
    | 'call_ringing'
    | 'call_failed'
    | 'call_no_answer'
    | 'call_busy'
    | 'voicemail_detected';
  call: {
    call_id: string;
    agent_id: string;
    from_number?: string;
    to_number?: string;
    status?: string;
    start_timestamp?: number;
    end_timestamp?: number;
    duration_seconds?: number;
    duration_ms?: number;
    disconnection_reason?: string;
  };
  call_id?: string;
  transcript?: Array<{
    role: 'agent' | 'user';
    content: string;
    timestamp: number;
  }>;
  analysis?: {
    call_summary?: string;
    sentiment?: string;
    summary?: string;
    sentiment_analysis?: {
      overall_sentiment: string;
      confidence: number;
    };
  };
}

interface RetellCall {
  call_id: string;
  agent_id: string;
  call_status: 'ongoing' | 'ended' | 'error';
  start_timestamp: number;
  end_timestamp?: number;
  transcript?: string;
  recording_url?: string;
  metadata?: Record<string, unknown>;
  from_number?: string;
  to_number?: string;
  direction?: 'inbound' | 'outbound';
  duration_ms?: number;
  disconnection_reason?: string;
}

interface CreateCallParams {
  agent_id: string;
  from_number: string;
  to_number: string;
  metadata?: Record<string, unknown>;
  override_agent_config?: Partial<RetellAgent>;
}

interface WebCallParams {
  agent_id: string;
  metadata?: Record<string, unknown>;
  override_agent_config?: Partial<RetellAgent>;
}

export class RetellService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(config: RetellConfig) {
    this.apiKey = config.apiKey;
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.retellai.com',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        const requestId = `retell-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        config.headers['X-Request-ID'] = requestId;

        logger.info('Retell API request', {
          requestId,
          method: config.method,
          url: config.url,
          data: config.data,
        });

        const configWithMetadata = config as typeof config & { metadata?: { requestId: string; startTime: number   }
};
        configWithMetadata.metadata = { requestId, startTime: Date.now() };
        return config;
      },
      error => {
        logger.error('Retell request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      response => {
        const configWithMetadata = response.config as typeof response.config & { metadata?: { requestId: string; startTime: number   }
};
        if (configWithMetadata.metadata) {
          const duration = Date.now() - configWithMetadata.metadata.startTime;
          logger.info('Retell API response', {
            requestId: configWithMetadata.metadata.requestId,
            status: response.status,
            duration,
          });
        }
        return response;
      },
      error => {
        const errorConfig = error.config as typeof error.config & { metadata?: { requestId: string; startTime: number   }
};
        if (errorConfig?.metadata) {
          const duration = Date.now() - errorConfig.metadata.startTime;
          logger.error('Retell API error', {
            requestId: errorConfig.metadata.requestId,
            status: error.response?.status,
            duration,
            error: error.response?.data || error.message,
          });
        }
        return Promise.reject(error);
      }
    );
  }

  // Agent Management
  async createAgent(data: Partial<RetellAgent>): Promise<RetellAgent> {
    const response = await this.client.post('/api/create-agent', data);
    // Handle different response structures
    if (response.data) {
      // If response.data is the agent object itself
      if (response.data.agent_id) {
        return response.data;
      }
      // If response.data has an 'agent' property
      if (response.data.agent && response.data.agent.agent_id) {
        return response.data.agent;
      }
    }
    // Log the actual response for debugging
    logger.error('Unexpected Retell createAgent response structure:', {
      data: response.data,
      status: response.status,
    });
    throw new Error('Invalid response from Retell API when creating agent');
  }

  async getAgent(agentId: string): Promise<RetellAgent | null> {
    const cacheKey = `retell:agent:${agentId}`;

    return cache.remember(
      cacheKey,
      async () => {
        try {
          const response = await this.client.get(`/api/get-agent/${agentId}`);
          return response.data;
        } catch (error) {
          if (error instanceof Error && 'response' in error && (error as Error & { response?: { status: number } }).response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
      CacheTTL.LONG
    );
  }

  async updateAgent(agentId: string, data: Partial<RetellAgent>): Promise<RetellAgent> {
    const response = await this.client.patch(`/api/update-agent/${agentId}`, data);

    // Clear cache
    await cache.delete(`retell:agent:${agentId}`);

    // Handle different response structures
    if (response.data) {
      if (response.data.agent_id) {
        return response.data;
      }
      if (response.data.agent && response.data.agent.agent_id) {
        return response.data.agent;
      }
    }
    throw new Error('Invalid response from Retell API when updating agent');
  }

  async listAgents(): Promise<RetellAgent[]> {
    const cacheKey = 'retell:agents:list';

    return cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/api/list-agents');
        return response.data || [];
      },
      CacheTTL.MEDIUM
    );
  }

  async deleteAgent(agentId: string): Promise<void> {
    await this.client.delete(`/api/delete-agent/${agentId}`);
    await cache.delete(`retell:agent:${agentId}`);
    await cache.delete('retell:agents:list');
  }

  // Call Management
  async createPhoneCall(params: CreateCallParams): Promise<RetellCall> {
    const response = await this.client.post('/api/create-phone-call', params);
    const call = response.data;

    // Queue for analysis
    await callAnalysisQueue.add(
      'analyze-call',
      {
        callId: call.call_id,
        metadata: params.metadata,
      },
      { delay: 5000 }
    ); // Delay to ensure call data is available

    return call;
  }

  async createWebCall(params: WebCallParams): Promise<{ call_id: string; web_call_link: string }> {
    const response = await this.client.post('/api/create-web-call', params);
    return response.data;
  }

  async getCall(callId: string): Promise<RetellCall | null> {
    const cacheKey = cacheKeys.call(callId);

    return cache.remember(
      cacheKey,
      async () => {
        try {
          const response = await this.client.get(`/api/get-call/${callId}`);
          return response.data;
        } catch (error) {
          if (error instanceof Error && 'response' in error && (error as Error & { response?: { status: number } }).response?.status === 404) {
            return null;
          }
          throw error;
        }
      },
      CacheTTL.MEDIUM
    );
  }

  async listCalls(filters?: {
    agent_id?: string;
    limit?: number;
    sort_order?: 'ascending' | 'descending';
    filter_criteria?: {
      from_number?: string;
      to_number?: string;
      call_status?: string[];
    };
  }): Promise<RetellCall[]> {
    const response = await this.client.get('/api/list-calls', { params: filters });
    return response.data || [];
  }

  async endCall(callId: string): Promise<void> {
    await this.client.post(`/api/end-call/${callId}`);

    // Clear cache
    await cache.delete(cacheKeys.call(callId));

    // Queue for immediate analysis
    await callAnalysisQueue.add('analyze-call', {
      callId,
      priority: 'high',
    });
  }

  async getCallRecording(callId: string): Promise<{ recording_url: string; expires_at: number }> {
    const response = await this.client.get(`/api/get-call-recording/${callId}`);
    return response.data;
  }

  async getCallTranscript(callId: string): Promise<string> {
    const cacheKey = cacheKeys.callTranscript(callId);

    return cache.remember(
      cacheKey,
      async () => {
        const call = await this.getCall(callId);
        if (!call?.transcript) {
          throw new Error('Call transcript not available');
        }
        return call.transcript;
      },
      CacheTTL.EXTRA_LONG
    );
  }

  // Analytics
  async getCallAnalytics(callId: string): Promise<CallAnalytics> {
    const response = await this.client.get(`/get-call-analysis/${callId}`);
    return response.data;
  }

  async getAgentAnalytics(
    agentId: string,
    timeRange?: { start: Date; end: Date }
  ): Promise<AgentAnalytics> {
    const params = timeRange
      ? {
          start_timestamp: timeRange.start.getTime(),
          end_timestamp: timeRange.end.getTime(),
        }
      : {};

    const response = await this.client.get(`/get-agent-analytics/${agentId}`, { params });
    return response.data;
  }

  // Voice Management
  async listVoices(): Promise<RetellVoice[]> {
    const cacheKey = 'retell:voices:list';

    return cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/api/list-voices');
        return response.data.voices || [];
      },
      CacheTTL.EXTRA_LONG
    );
  }

  // LLM Management
  async listLLMs(): Promise<RetellLLM[]> {
    const cacheKey = 'retell:llms:list';

    return cache.remember(
      cacheKey,
      async () => {
        const response = await this.client.get('/api/list-llms');
        return response.data.llms || [];
      },
      CacheTTL.EXTRA_LONG
    );
  }

  // Webhook handling (enhanced with security manager)
  verifyWebhook(signature: string, payload: string, secret: string): boolean {
    try {
      // Use security manager for enhanced validation
      const { securityManager } = require('./security-manager');
      return securityManager.verifyWebhookSignature(payload, signature);
    } catch (error) {
      // Fallback to basic verification
      const crypto = require('crypto');
      const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
      return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    }
  }

  async handleWebhookEvent(event: RetellWebhookEvent): Promise<void> {
    logger.info('Retell webhook event', { type: event.event, callId: event.call?.call_id });

    try {
      // Import enhanced managers
      const { statusManager } = await import('./status-manager');
      const { recordingManager } = await import('./recording-manager');
      const { retellErrorHandler } = await import('./error-handler');

      switch (event.event) {
        case 'call_started':
          await this.handleCallStarted(event);
          await statusManager.updateCallStatus(event.call.call_id, 'connected', {
            timestamp: new Date(),
            agent_id: event.call.agent_id,
          });
          break;
        case 'call_ended':
          await this.handleCallEnded(event);
          await statusManager.updateCallStatus(event.call.call_id, 'ended', {
            timestamp: new Date(),
            duration: event.call.duration_ms,
            reason: event.call.disconnection_reason,
          });
          break;
        case 'call_analyzed':
          await this.handleCallAnalyzed(event);
          break;
        case 'transcript_ready':
          await this.handleTranscriptReady(event);
          break;
        case 'recording_ready':
          // Process recording with enhanced manager
          setTimeout(async () => {
            try {
              await recordingManager.processRecording(event.call.call_id);
            } catch (error) {
              await retellErrorHandler.handleError(error, {
                operation: 'process_recording',
                callId: event.call.call_id,
              });
            }
          }, 1000);
          break;
        case 'call_queued':
          await statusManager.updateCallStatus(event.call.call_id, 'queued', {
            timestamp: new Date(),
            agent_id: event.call.agent_id,
          });
          break;
        case 'call_ringing':
          await statusManager.updateCallStatus(event.call.call_id, 'ringing', {
            timestamp: new Date(),
            to_number: event.call.to_number,
          });
          break;
        case 'call_failed':
          await statusManager.updateCallStatus(event.call.call_id, 'failed', {
            timestamp: new Date(),
            reason: event.call.disconnection_reason || 'Unknown error',
          });
          break;
        case 'call_no_answer':
          await statusManager.updateCallStatus(event.call.call_id, 'no_answer', {
            timestamp: new Date(),
          });
          break;
        case 'call_busy':
          await statusManager.updateCallStatus(event.call.call_id, 'busy', {
            timestamp: new Date(),
          });
          break;
        case 'voicemail_detected':
          await statusManager.updateCallStatus(event.call.call_id, 'voicemail', {
            timestamp: new Date(),
          });
          break;
        default:
          logger.warn('Unknown Retell webhook event', { type: event.event });
      }
    } catch (error) {
      // Enhanced error handling
      const { retellErrorHandler } = await import('./error-handler');
      await retellErrorHandler.handleError(error, {
        operation: 'webhook_event_handling',
        callId: event.call?.call_id,
        metadata: { event: event.event },
      });
      throw error;
    }
  }

  private async handleCallStarted(event: RetellWebhookEvent): Promise<void> {
    const { call } = event;

    // Store call data
    await cache.set(cacheKeys.call(call.call_id), call, CacheTTL.LONG);

    // Log call start
    logger.info('Call started', {
      callId: call.call_id,
      agentId: call.agent_id,
      from: call.from_number,
      to: call.to_number,
    });
  }

  private async handleCallEnded(event: RetellWebhookEvent): Promise<void> {
    const { call } = event;

    // Update call data
    await cache.set(cacheKeys.call(call.call_id), call, CacheTTL.LONG);

    // Queue for analysis
    await callAnalysisQueue.add('analyze-call', {
      callId: call.call_id,
      transcript: event.transcript,
      metadata: {},
      duration: call.duration_seconds ? call.duration_seconds * 1000 : 0,
    });
  }

  private async handleCallAnalyzed(event: RetellWebhookEvent): Promise<void> {
    const { call_id, analysis } = event;

    if (analysis) {
      logger.info('Call analysis complete', {
        callId: call_id,
        sentiment: analysis.sentiment || analysis.sentiment_analysis?.overall_sentiment,
        summary: (analysis.summary || analysis.call_summary)?.substring(0, 100),
      });
    }
  }

  private async handleTranscriptReady(event: RetellWebhookEvent): Promise<void> {
    const { call_id, transcript } = event;

    if (call_id && transcript) {
      // Cache transcript
      await cache.set(cacheKeys.callTranscript(call_id), transcript, CacheTTL.EXTRA_LONG);
    }
  }
}

// Singleton instance
let retellService: RetellService | null = null;

export function getRetellService(): RetellService {
  if (!retellService) {
    const apiKey = process.env.RETELL_API_KEY;
    if (!apiKey) {
      logger.warn('RETELL_API_KEY not set, Retell service will not be available');
      throw new Error('RETELL_API_KEY environment variable is not set');
    }
    retellService = new RetellService({ apiKey });
  }
  return retellService;
}

// Export types
export type { RetellAgent, RetellCall, CreateCallParams, WebCallParams };
