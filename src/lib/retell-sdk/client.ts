import Retell from 'retell-sdk';
import { logger } from '@/lib/safe-logger';

let retellClient: Retell | null = null;

export function getRetellClient(): Retell {
  if (!retellClient) {
    const apiKey = process.env.RETELL_API_KEY;
    
    if (!apiKey) {
      logger.error('RETELL_API_KEY environment variable is not set');
      throw new Error('Retell API key is required');
    }

    retellClient = new Retell({
      apiKey: apiKey,
    });

    logger.info('Retell SDK client initialized successfully');
  }

  return retellClient;
}

export interface CreateWebCallParams {
  agentId: string;
  agentVersion?: number;
  language?: 'en' | 'es';
  metadata?: Record<string, unknown>;
  retellLlmDynamicVariables?: Record<string, unknown>;
}

export interface CreatePhoneCallParams {
  fromNumber: string;
  toNumber: string;
  agentId: string;
  language?: 'en' | 'es';
  metadata?: Record<string, unknown>;
}

export async function createWebCall(params: CreateWebCallParams) {
  const client = getRetellClient();
  
  try {
    logger.info('Creating web call with params:', {
      agentId: params.agentId,
      agentVersion: params.agentVersion,
      language: params.language
    });

    // Simplified to match API documentation exactly
    // Only send agent_id and optionally agent_version
    const callParams: any = {
      agent_id: params.agentId,
    };

    // Add agent version if provided (this is officially supported)
    if (params.agentVersion !== undefined) {
      callParams.agent_version = params.agentVersion;
    }

    // Add metadata only if provided (keep it simple)
    if (params.metadata) {
      callParams.metadata = params.metadata;
    }

    // Add dynamic variables if provided
    if (params.retellLlmDynamicVariables) {
      callParams.retell_llm_dynamic_variables = params.retellLlmDynamicVariables;
    }

    const response = await client.call.createWebCall(callParams);

    logger.info('Web call created successfully', {
      callId: response.call_id,
      agentId: params.agentId,
      language: params.language,
      hasAccessToken: !!response.access_token,
      tokenLength: response.access_token?.length,
      callStatus: response.call_status,
      callType: response.call_type,
      // Log important fields without exposing sensitive data
      responseKeys: Object.keys(response)
    });

    // Ensure we have the required fields
    if (!response.access_token) {
      throw new Error('No access token received from Retell API');
    }

    // Check call status
    if (response.call_status && response.call_status !== 'registered') {
      logger.warn('Unexpected call status:', response.call_status);
    }

    return response;
  } catch (error: any) {
    logger.error('Failed to create web call:', {
      error: error.message,
      status: error.status,
      body: error.body,
      agentId: params.agentId
    });
    throw error;
  }
}

export async function createPhoneCall(params: CreatePhoneCallParams) {
  const client = getRetellClient();
  
  try {
    const response = await client.call.createPhoneCall({
      from_number: params.fromNumber,
      to_number: params.toNumber,
      agent_id: params.agentId,
      metadata: {
        language: params.language || 'en',
        source: 'website_voice',
        timestamp: new Date().toISOString(),
        ...params.metadata,
      },
    });

    logger.info('Phone call created successfully', {
      callId: response.call_id,
      agentId: params.agentId,
      fromNumber: params.fromNumber,
      toNumber: params.toNumber,
      language: params.language,
    });

    return response;
  } catch (error) {
    logger.error('Failed to create phone call:', error);
    throw error;
  }
}

export function getAgentId(language: 'en' | 'es' = 'en'): string {
  const englishAgent = process.env.RETELL_AGENT_ENGLISH_INTAKE;
  const spanishAgent = process.env.RETELL_AGENT_SPANISH_INTAKE;
  const fallbackAgent = process.env.RETELL_AGENT_ID;

  if (language === 'es' && spanishAgent) {
    return spanishAgent;
  }
  
  if (language === 'en' && englishAgent) {
    return englishAgent;
  }

  if (fallbackAgent) {
    return fallbackAgent;
  }

  // If no agent ID is configured, throw an error with helpful message
  logger.error('No Retell agent ID configured. Please set RETELL_AGENT_ID, RETELL_AGENT_ENGLISH_INTAKE, or RETELL_AGENT_SPANISH_INTAKE in your environment variables.');
  throw new Error('Retell agent ID not configured. Please contact support or check your environment configuration.');
}

export default getRetellClient;