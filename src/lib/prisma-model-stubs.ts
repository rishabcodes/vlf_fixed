/**
 * Temporary stub implementations for models that don't exist in the Prisma schema
 * These are used to prevent runtime errors while the actual models are being implemented
 */

import { logger } from '@/lib/safe-logger';

// Stub for review model operations
export const reviewStubs = {
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.review.findMany - model not implemented');
    return [];
  },
  findUnique: async (args?: any) => {
    logger.warn('Using stub for prisma.review.findUnique - model not implemented');
    return null;
  },
  findFirst: async (args?: any) => {
    logger.warn('Using stub for prisma.review.findFirst - model not implemented');
    return null;
  },
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.review.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  update: async (args?: any) => {
    logger.warn('Using stub for prisma.review.update - model not implemented');
    return { id: args?.where?.id || 'stub-id', ...args?.data };
  },
  count: async (args?: any) => {
    logger.warn('Using stub for prisma.review.count - model not implemented');
    return 0;
  },
  aggregate: async (args?: any) => {
    logger.warn('Using stub for prisma.review.aggregate - model not implemented');
    return { _avg: { rating: 0 }, _count: 0 };
  },
  groupBy: async (args?: any) => {
    logger.warn('Using stub for prisma.review.groupBy - model not implemented');
    return [];
  },
};

// Stub for scheduledEmail model operations
export const scheduledEmailStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.findMany - model not implemented');
    return [];
  },
  update: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.update - model not implemented');
    return { id: args?.where?.id || 'stub-id', ...args?.data };
  },
  updateMany: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.updateMany - model not implemented');
    return { count: 0 };
  },
};

// Stub for reviewSolicitationTracking model operations
export const reviewSolicitationTrackingStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewSolicitationTracking.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn(
      'Using stub for prisma.reviewSolicitationTracking.findMany - model not implemented'
    );
    return [];
  },
};

// Stub for reviewSolicitationOptOut model operations
export const reviewSolicitationOptOutStubs = {
  findUnique: async (args?: any) => {
    logger.warn(
      'Using stub for prisma.reviewSolicitationOptOut.findUnique - model not implemented'
    );
    return null;
  },
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewSolicitationOptOut.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for voiceAgent model operations
export const voiceAgentStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceAgent.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceAgent.findMany - model not implemented');
    return [];
  },
};

// Stub for voiceCallMetrics model operations
export const voiceCallMetricsStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceCallMetrics.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for voiceMetricEvent model operations
export const voiceMetricEventStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceMetricEvent.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for documentShare model operations
export const documentShareStubs = {
  count: async (args?: any) => {
    logger.warn('Using stub for prisma.documentShare.count - model not implemented');
    return 0;
  },
};

// Stub for complianceReport model operations
export const complianceReportStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.complianceReport.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findFirst: async (args?: any) => {
    logger.warn('Using stub for prisma.complianceReport.findFirst - model not implemented');
    return null;
  },
};

// Stub for securityReport model operations
export const securityReportStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.securityReport.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for reputationTask model operations
export const reputationTaskStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reputationTask.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findFirst: async (args?: any) => {
    logger.warn('Using stub for prisma.reputationTask.findFirst - model not implemented');
    return null;
  },
};

// Stub for reviewResponse model operations
export const reviewResponseStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewResponse.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewResponse.findMany - model not implemented');
    return [];
  },
};

// Stub for reviewEscalation model operations
export const reviewEscalationStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewEscalation.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for dailyReputationMetrics model operations
export const dailyReputationMetricsStubs = {
  upsert: async (args?: any) => {
    logger.warn('Using stub for prisma.dailyReputationMetrics.upsert - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for reputationAlert model operations
export const reputationAlertStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reputationAlert.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.reputationAlert.findMany - model not implemented');
    return [];
  },
};

// Stub for reviewPlatform model operations
export const reviewPlatformStubs = {
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewPlatform.findMany - model not implemented');
    return [];
  },
};

// Stub for scheduledSyndication model operations
export const scheduledSyndicationStubs = {
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledSyndication.findMany - model not implemented');
    return [];
  },
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledSyndication.create - model not implemented');
    return { id: 'stub-id', status: 'scheduled', ...args?.data };
  },
  update: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledSyndication.update - model not implemented');
    return { id: args?.where?.id || 'stub-id', ...args?.data };
  },
  deleteMany: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledSyndication.deleteMany - model not implemented');
    return { count: 0 };
  },
};

// Stub for syndicationHistory model operations
export const syndicationHistoryStubs = {
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.syndicationHistory.findMany - model not implemented');
    return [];
  },
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.syndicationHistory.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  deleteMany: async (args?: any) => {
    logger.warn('Using stub for prisma.syndicationHistory.deleteMany - model not implemented');
    return { count: 0 };
  },
};

// Stub for syndicationReport model operations
export const syndicationReportStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.syndicationReport.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.syndicationReport.findMany - model not implemented');
    return [];
  },
};
