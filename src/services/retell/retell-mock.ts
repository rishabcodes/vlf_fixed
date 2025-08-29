// Simplified Retell Service for build
import { logger } from '@/lib/safe-logger';

export class RetellService {
  private apiKey: string;
  
  constructor(config: any) {
    this.apiKey = config.apiKey || '';
  }
  
  async getAgents() {
    return [];
  }
  
  async createPhoneCall(data: any) {
    return { call_id: 'mock-call-id' };
  }
  
  async endCall(callId: string) {
    return { success: true };
  }
}

export const getRetellService = () => new RetellService({ apiKey: process.env.RETELL_API_KEY });
export default RetellService;
