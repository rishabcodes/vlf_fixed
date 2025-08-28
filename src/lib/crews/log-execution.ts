import { getPrismaClient } from '@/lib/prisma';
import logger from '@/lib/safe-logger';

interface LogExecutionParams {
  agentName: string;
  executionType: string;
  status: 'success' | 'failure';
  startTime: Date;
  endTime: Date;
  input?: unknown;
  output?: unknown;
  error?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Log a crew execution to the database
 * This should be called whenever a crew agent completes an execution
 */
export async function logCrewExecution(params: LogExecutionParams) {
  const prisma = getPrismaClient();

  try {
    const duration = params.endTime.getTime() - params.startTime.getTime();

    // TODO: Implement crew execution logging when model is added to schema
    // For now, use agentExecutionLog which exists in the schema
    const log = await prisma.agentExecutionLog.create({
      data: {
        agentName: params.agentName,
        executionType: params.executionType,
        success: params.status === 'success',
        duration,
        input: params.input || {},
        output: params.output || {},
        error: params.error,
        metadata: (params.metadata as unknown) || {},
      },
    });

    logger.info('Crew execution logged', {
      id: log.id,
      agent: params.agentName,
      type: params.executionType,
      status: params.status,
      duration: `${duration}ms`,
    });

    return log;
  } catch (error) {
    logger.error('Failed to log crew execution', {
      error,
      params,
    });
    throw error;
  }
}

/**
 * Helper function to create a crew execution logger for a specific agent
 */
export function createCrewLogger(agentName: string) {
  return {
    async logExecution<T>(
      executionType: string,
      fn: () => Promise<T>,
      metadata?: Record<string, unknown>
    ): Promise<T> {
      const startTime = new Date();
      let status: 'success' | 'failure' = 'success';
      let output: T | undefined;
      let error: string | undefined;

      try {
        output = await fn();
      } catch (err) {
        status = 'failure';
        error = err instanceof Error ? err.message : String(err);
        throw err;
      } finally {
        const endTime = new Date();
        await logCrewExecution({
          agentName,
          executionType,
          status,
          startTime,
          endTime,
          input: metadata?.input,
          output,
          error,
          metadata,
        });
      }

      return output;
    },
  };
}

/**
 * Example usage in a crew agent:
 *
 * const logger = createCrewLogger('seo-blog-agent');
 *
 * const result = await logger.logExecution(
 *   'generate-blog-post',
 *   async () => {
 *     // Your agent logic here
 *     const blogPost = await generateBlogPost(topic);
 *     return blogPost;
 *   },
 *   {
 *     input: { topic: 'Immigration Law Updates' },
 *     userId: session.user.id,
 *   }
 * );
 */
