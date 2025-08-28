import { getRetellService, RetellService } from './index';

import { logger } from '@/lib/safe-logger';
// Re-export the service as RetellClient for backward compatibility
export class RetellClient {
  private service: RetellService | null;

  constructor() {
    try {
      this.service = getRetellService();
    } catch (error) {
      // If Retell is not configured, create a mock service
      logger.warn('Retell service not configured, using mock implementation');
      this.service = null;
    }
  }

  async call(phoneNumber: string, agentId: string) {
    if (!this.service) {
      return { callId: 'mock-call-id', success: true };
    }

    try {
      const call = await this.service.createPhoneCall({
        agent_id: agentId,
        from_number: process.env.RETELL_PHONE_NUMBER || '+18449673536',
        to_number: phoneNumber,
        metadata: {
          source: 'website',
          timestamp: new Date().toISOString(),
        },
      });

      return {
        callId: call.call_id,
        success: true,
      };
    } catch (error) {
      logger.error('Failed to create call:', error);
      return {
        callId: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create call',
      };
    }
  }

  async endCall(callId: string) {
    if (!this.service) {
      return { success: true };
    }

    try {
      await this.service.endCall(callId);
      return { success: true };
    } catch (error) {
      logger.error('Failed to end call:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to end call',
      };
    }
  }

  async getCallDetails(callId: string) {
    if (!this.service) {
      return { callId, status: 'completed' };
    }

    try {
      const call = await this.service.getCall(callId);
      return {
        callId: call?.call_id || callId,
        status: call?.call_status || 'unknown',
        duration: call?.duration_ms,
        transcript: call?.transcript,
        recordingUrl: call?.recording_url,
      };
    } catch (error) {
      logger.error('Failed to get call details:', error);
      return { callId, status: 'error' };
    }
  }
}

export const getRetellClient = () => new RetellClient();

export default RetellClient;
