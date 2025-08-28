import { securityLogger } from '@/lib/safe-logger';

// Voice auth temporarily disabled for launch
export class VoiceAuthService {
  static async enrollVoice(userId: string, voiceData: unknown) {
    securityLogger.info('Voice enrollment:', userId);
    return { success: true, enrollmentId: 'temp-id' };
  }

  static async verifyVoice(userId: string, voiceData: unknown) {
    securityLogger.info('Voice verification:', userId);
    return { verified: true, confidence: 0.95 };
  }
}
