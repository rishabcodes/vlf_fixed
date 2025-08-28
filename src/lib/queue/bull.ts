import Bull, { Job } from '@/lib/mocks/bull-mock';
import { securityLogger } from '@/lib/safe-logger';
import { performanceLogger, logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { bullRedis } from '@/lib/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define job data interfaces
interface CallAnalysisJobData {
  callId: string;
  transcript: string;
  metadata: Record<string, unknown>;
}

interface TranscriptionJobData {
  callId: string;
  recordingUrl: string;
}

interface NotificationJobData {
  type: string;
  callId?: string;
  analysis?: unknown;
}

interface EmailJobData {
  to: string | string[];
  subject: string;
  template: string;
  data: Record<string, unknown>;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
  }>;
  replyTo?: string;
  priority?: 'high' | 'normal' | 'low';
  headers?: Record<string, string>;
}

interface SEOJobData {
  type: 'analyze-post' | 'generate-sitemap' | 'check-backlinks';
  data?: unknown;
}

interface DocumentJobData {
  type: 'generate-pdf' | 'extract-text' | 'translate';
  documentId: string;
  data?: unknown;
}

// Shared Redis configuration for all queues
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
};

// Job queues for different tasks
export const callAnalysisQueue = new Bull('call-analysis', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

export const transcriptionQueue = new Bull('transcription', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 25,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
  },
});

export const notificationQueue = new Bull('notifications', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 200,
    removeOnFail: 100,
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

export const emailQueue = new Bull('email', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
});

export const seoQueue = new Bull('seo-tasks', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 25,
    attempts: 2,
  },
});

export const documentQueue = new Bull('document-processing', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 25,
    attempts: 3,
    timeout: 300000, // 5 minutes
  },
});

// Queue processors
callAnalysisQueue.process(async (job: Job<CallAnalysisJobData>) => {
  const start = Date.now();
  const { callId, transcript, metadata } = job.data;

  try {
    // Process call analysis asynchronously
    // This prevents webhook blocking
    const analysis = await analyzeCallWithAI(transcript, metadata);

    // Store results
    await prisma?.callAnalysis.create({
      data: {
        callId,
        ...analysis,
      },
    });

    performanceLogger.measure('call-analysis-job', Date.now() - start, { callId });

    // Trigger follow-up actions
    if (analysis.sentiment === 'negative') {
      await notificationQueue.add('urgent-notification', {
        type: 'negative-sentiment',
        callId,
        analysis,
      });
    }

    return analysis;
  } catch (error) {
    securityLogger.error('Call analysis failed:', error);
    throw error;
  }
});

// Enhanced webhook handler using queues
export async function handleWebhookAsync(event: {
  type: string;
  callId?: string;
  transcript?: string;
  metadata?: Record<string, unknown>;
  leadId?: string;
  data?: Record<string, unknown>;
  recordingUrl?: string;
}) {
  // Instead of processing synchronously, queue the job
  switch (event.type) {
    case 'call.ended':
      await callAnalysisQueue.add('analyze-call', {
        callId: event.callId,
        transcript: event.transcript,
        metadata: event.metadata,
      });
      break;

    case 'recording.ready':
      await transcriptionQueue.add('transcribe-recording', {
        callId: event.callId,
        recordingUrl: event.recordingUrl,
      });
      break;
  }

  // Return immediately to avoid webhook timeout
  return { queued: true };
}

// Email queue processor
emailQueue.process(async (job: Job<EmailJobData>) => {
  const emailData = job.data;

  try {
    // Import email service dynamically to avoid circular dependencies
    const { emailService } = await import('@/services/email.service');

    logger.info(`Processing email job`, {
      to: emailData.to,
      subject: emailData.subject,
      template: emailData.template,
    });

    // Send email
    const result = await emailService.sendEmail(emailData as any);

    if (!result.success) {
      throw new Error(result.error || 'Email send failed');
    }

    return result;
  } catch (error) {
    logger.error('Email queue processor error:', errorToLogMeta(error));
    throw error;
  }
});

// SEO queue processor
seoQueue.process(async (job: Job<SEOJobData>) => {
  const { type, data } = job.data;

  try {
    switch (type) {
      case 'analyze-post':
        // TODO: Implement SEO analysis
        break;
      case 'generate-sitemap':
        // TODO: Implement sitemap generation
        break;
      case 'check-backlinks':
        // TODO: Implement backlink checking
        break;
    }
    return { success: true };
  } catch (error) {
    logger.error('SEO task failed:', errorToLogMeta(error));
    throw error;
  }
});

// Document queue processor
documentQueue.process(async (job: Job<DocumentJobData>) => {
  const { type, documentId, data } = job.data;

  try {
    switch (type) {
      case 'generate-pdf':
        // TODO: Implement PDF generation
        break;
      case 'extract-text':
        // TODO: Implement text extraction
        break;
      case 'translate':
        // TODO: Implement document translation
        break;
    }
    return { success: true };
  } catch (error) {
    logger.error('Document processing failed:', errorToLogMeta(error));
    throw error;
  }
});

// Monitor queue health
export function setupQueueMonitoring() {
  const queues = [
    { name: 'call-analysis', queue: callAnalysisQueue },
    { name: 'transcription', queue: transcriptionQueue },
    { name: 'notifications', queue: notificationQueue },
    { name: 'email', queue: emailQueue },
    { name: 'seo-tasks', queue: seoQueue },
    { name: 'document-processing', queue: documentQueue },
  ];

  // Set up event listeners for all queues
  queues.forEach(({ name, queue }) => {
    queue.on('completed', (job: any, result: any) => {
      performanceLogger.measure('queue-job-completed', job.processedOn! - job.timestamp, {
        queue: name,
        jobId: job.id,
      });
    });

    queue.on('failed', (job: any, err: Error) => {
      logger.error(`Job ${job.id} in queue ${name} failed:`, {
        error: err.message,
        stack: err.stack,
      });
    });

    queue.on('stalled', (job: any) => {
      logger.warn(`Job ${job.id} in queue ${name} stalled`);
    });
  });

  // Health check endpoint data
  return async () => {
    const health: Record<string, unknown> = {};

    for (const { name, queue } of queues) {
      const [waiting, active, completed, failed, delayed, paused] = await Promise.all([
        queue.getWaitingCount(),
        queue.getActiveCount(),
        queue.getCompletedCount(),
        queue.getFailedCount(),
        queue.getDelayedCount(),
        queue.isPaused(),
      ]);

      health[name] = {
        waiting,
        active,
        completed,
        failed,
        delayed,
        paused,
        isReady: !paused && active < 100, // Consider queue ready if not paused and not overloaded
      };
    }

    return health;
  };
}

// Queue utilities
export async function clearAllQueues() {
  const queues = [
    callAnalysisQueue,
    transcriptionQueue,
    notificationQueue,
    emailQueue,
    seoQueue,
    documentQueue,
  ];

  await Promise.all(queues.map(queue => queue.empty()));
  logger.info('All queues cleared');
}

export async function pauseAllQueues() {
  const queues = [
    callAnalysisQueue,
    transcriptionQueue,
    notificationQueue,
    emailQueue,
    seoQueue,
    documentQueue,
  ];

  await Promise.all(queues.map(queue => queue.pause()));
  logger.info('All queues paused');
}

export async function resumeAllQueues() {
  const queues = [
    callAnalysisQueue,
    transcriptionQueue,
    notificationQueue,
    emailQueue,
    seoQueue,
    documentQueue,
  ];

  await Promise.all(queues.map(queue => queue.resume()));
  logger.info('All queues resumed');
}

async function analyzeCallWithAI(transcript: string, metadata: Record<string, unknown>) {
  // Implement AI analysis
  return {
    summary: 'Call summary...',
    sentiment: 'positive',
    actionItems: [],
    extractedInfo: {},
  };
}
