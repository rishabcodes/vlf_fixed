// import { ghlService } from '@/services/gohighlevel';  // Removed - using GHL MCP instead
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { addDays, subDays, startOfDay, endOfDay } from 'date-fns';

interface CampaignTarget {
  contactId: string;
  campaignId: string;
  reason: string;
  data?: Record<string, unknown>;
}

export class CampaignAutomationService {
  // Run daily campaign automation
  async runDailyCampaigns() {
    try {
      logger.info('Starting daily campaign automation');

      // TODO: Implement campaign automation when contact/client models are added
      // Currently disabled to prevent build errors

      logger.info('Daily campaign automation completed');
    } catch (error) {
      logger.error('Daily campaign automation failed:', errorToLogMeta(error));
    }
  }

  // Birthday campaigns - placeholder
  private async runBirthdayCampaigns() {
    // TODO: Implement when contact model is added to schema
    logger.info('Birthday campaigns: Not implemented yet');
  }

  // Anniversary campaigns - placeholder
  private async runAnniversaryCampaigns() {
    // TODO: Implement when client model is added to schema
    logger.info('Anniversary campaigns: Not implemented yet');
  }

  // Inactive client re-engagement - placeholder
  private async runInactiveClientCampaigns() {
    // TODO: Implement when client model is added to schema
    logger.info('Inactive client campaigns: Not implemented yet');
  }

  // Review request campaigns - placeholder
  private async runReviewRequestCampaigns() {
    // TODO: Implement when client model is added to schema
    logger.info('Review request campaigns: Not implemented yet');
  }

  // Holiday campaigns - placeholder
  private async runHolidayCampaigns() {
    // TODO: Implement holiday campaign logic
    logger.info('Holiday campaigns: Not implemented yet');
  }

  // Educational content campaigns - placeholder
  private async runEducationalCampaigns() {
    // TODO: Implement educational campaign logic
    logger.info('Educational campaigns: Not implemented yet');
  }

  // Win-back campaigns - placeholder
  private async runWinBackCampaigns() {
    // TODO: Implement win-back campaign logic
    logger.info('Win-back campaigns: Not implemented yet');
  }

  // Trigger campaign for specific users based on actions
  async triggerActionBasedCampaign(userId: string, action: string) {
    try {
      const user = await getPrismaClient().user.findUnique({
        where: { id: userId },
      });

      if (!user || !user.phone) {
        return;
      }

      // Map actions to campaign IDs
      const campaignMap: Record<string, string | undefined> = {
        appointment_scheduled: process.env.GHL_APPOINTMENT_SCHEDULED_CAMPAIGN_ID,
        case_created: process.env.GHL_NEW_CASE_CAMPAIGN_ID,
        document_uploaded: process.env.GHL_DOCUMENT_UPLOADED_CAMPAIGN_ID,
        payment_received: process.env.GHL_PAYMENT_RECEIVED_CAMPAIGN_ID,
      };

      const campaignId = campaignMap[action];
      if (!campaignId) {
        logger.warn(`No campaign configured for action: ${action}`);
        return;
      }

      // Find or create GHL contact
      await ghlService.sendSMSByPhone(
        user.phone,
        `Thank you for ${action.replace('_', ' ')}. We'll be in touch soon!`,
        [`action_${action}`, 'automated']
      );

      logger.info('Action-based campaign triggered', {
        userId,
        action,
        campaignId,
      });
    } catch (error) {
      logger.error('Failed to trigger action-based campaign:', errorToLogMeta(error));
    }
  }
}

export const campaignAutomationService = new CampaignAutomationService();
