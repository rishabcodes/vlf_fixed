import * as cron from 'node-cron';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta, createErrorLogMeta } from '@/lib/safe-logger';
import { appointmentReminderService } from '@/services/appointment-reminders';
import { campaignAutomationService } from '@/services/campaign-automation';
import { leadCaptureService } from '@/services/lead-capture';
import { contentFactory } from '@/services/content-factory';
import { getPrismaClient } from '@/lib/prisma';
import { Prisma, Lead, LeadStatus, PracticeArea, LeadUrgency } from '@prisma/client';

interface ContactInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  customFields?: Record<string, unknown>;
}

export class CronJobService {
  private jobs: Map<string, cron.ScheduledTask> = new Map();

  // Initialize all cron jobs
  async initialize() {
    try {
      logger.info('Initializing cron jobs');

      // Daily appointment reminders - 9 AM EST
      this.scheduleJob('appointment-reminders', '0 9 * * *', async () => {
        logger.info('Running appointment reminders');
        await appointmentReminderService.sendUpcomingReminders();
      });

      // Daily campaign automation - 10 AM EST
      this.scheduleJob('campaign-automation', '0 10 * * *', async () => {
        logger.info('Running campaign automation');
        await campaignAutomationService.runDailyCampaigns();
      });

      // Lead scoring - Every 30 minutes
      this.scheduleJob('lead-scoring', '*/30 * * * *', async () => {
        logger.info('Running lead scoring');
        await this.scoreRecentLeads();
      });

      // Database cleanup - Daily at 2 AM EST
      this.scheduleJob('database-cleanup', '0 2 * * *', async () => {
        logger.info('Running database cleanup');
        await this.performDatabaseCleanup();
      });

      // Follow-up surveys - Daily at 3 PM EST
      this.scheduleJob('follow-up-surveys', '0 15 * * *', async () => {
        logger.info('Running follow-up surveys');
        await this.sendFollowUpSurveys();
      });

      // Analytics aggregation - Every hour
      this.scheduleJob('analytics-aggregation', '0 * * * *', async () => {
        logger.info('Running analytics aggregation');
        await this.aggregateAnalytics();
      });

      // Backup important data - Daily at 3 AM EST
      this.scheduleJob('data-backup', '0 3 * * *', async () => {
        logger.info('Running data backup');
        await this.backupImportantData();
      });

      // Check for expired documents - Weekly on Sundays at 6 AM EST
      this.scheduleJob('document-expiry-check', '0 6 * * 0', async () => {
        logger.info('Checking for expired documents');
        await this.checkDocumentExpiry();
      });

      // Content Factory - Daily at 5 AM EST
      this.scheduleJob('content-generation', '0 5 * * *', async () => {
        logger.info('Running daily content generation');
        await contentFactory.runDailyContentGeneration();
      });

      // Process scheduled content - Every 30 minutes
      this.scheduleJob('content-publishing', '*/30 * * * *', async () => {
        logger.info('Processing scheduled content publications');
        const scheduler = await import('@/services/content-factory/content-scheduler').then(
          m => new m.ContentScheduler()
        );
        await scheduler.processScheduledPublications();
      });

      // Monitor rich snippets - Daily at 11 PM EST
      this.scheduleJob('rich-snippet-monitoring', '0 23 * * *', async () => {
        logger.info('Monitoring rich snippet performance');
        const schemaAutomation = await import('@/services/content-factory/schema-automation').then(
          m => new m.SchemaMarkupAutomation()
        );
        await schemaAutomation.monitorRichSnippets();
      });

      logger.info('All cron jobs initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize cron jobs:', errorToLogMeta(error));
      throw error;
    }
  }

  // Schedule a job
  private scheduleJob(name: string, schedule: string, task: () => Promise<void>) {
    try {
      const job = cron.schedule(schedule, async () => {
        const startTime = Date.now();

        try {
          logger.info(`Starting cron job: ${name}`);
          await task();

          const duration = Date.now() - startTime;
          logger.info(`Completed cron job: ${name}`, { duration });

          // Log job execution
          await this.logJobExecution(name, 'success', duration);
        } catch (error) {
          const duration = Date.now() - startTime;
          logger.error(`Failed cron job: ${name}`, createErrorLogMeta(error, { duration }));

          // Log job failure
          await this.logJobExecution(
            name,
            'failed',
            duration,
            error instanceof Error ? error : new Error(String(error))
          );
        }
      });

      // Start the job immediately
      job.start();

      this.jobs.set(name, job);
      logger.info(`Scheduled cron job: ${name} with schedule: ${schedule}`);
    } catch (error) {
      logger.error(`Failed to schedule cron job: ${name}`, { error });
    }
  }

  // Score recent leads
  private async scoreRecentLeads() {
    try {
      const prisma = getPrismaClient();

      // Fetch leads that need scoring (new or contacted status)
      const leads = await prisma.lead.findMany({
        where: {
          status: {
            in: ['new', 'contacted'] as LeadStatus[],
          },
        },
        include: {
          contact: true,
          assignedTo: true,
        },
      });

      logger.info(`Found ${leads.length} leads to score`);

      // Score each lead
      const scoredLeads = await Promise.all(
        leads.map(async lead => {
          const score = this.calculateLeadScore(lead);

          // Update lead score in database
          const updatedLead = await prisma.lead.update({
            where: { id: lead.id },
            data: {
              score,
              // Update urgency based on score
              urgency: this.getUrgencyFromScore(score),
            },
          });

          return updatedLead;
        })
      );

      // Auto-assign high-scoring leads to available attorneys
      const highScoreLeads = scoredLeads.filter(lead => lead.score >= 70 && !lead.assignedToId);

      if (highScoreLeads.length > 0) {
        await this.assignHighScoreLeads(highScoreLeads);
      }

      logger.info(
        `Lead scoring completed. Scored ${scoredLeads.length} leads, ${highScoreLeads.length} high-score leads assigned`
      );
    } catch (error) {
      logger.error('Lead scoring failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Calculate lead score based on various factors
  private calculateLeadScore(
    lead: Lead & {
      contact?: {
        name: string | null;
        email: string | null;
        phone: string | null;
      } | null;
      lastContactAt?: Date | null;
    }
  ): number {
    let score = 0;

    // Time factor - newer leads score higher
    const hoursSinceCreation = (Date.now() - lead.createdAt.getTime()) / (1000 * 60 * 60);
    if (hoursSinceCreation < 1) {
      score += 30; // Very fresh lead
    } else if (hoursSinceCreation < 24) {
      score += 20; // Less than a day old
    } else if (hoursSinceCreation < 72) {
      score += 10; // Less than 3 days old
    } else if (hoursSinceCreation < 168) {
      score += 5; // Less than a week old
    }

    // Practice area factor
    const highValuePracticeAreas: PracticeArea[] = ['personal_injury', 'workers_compensation'];
    if (lead.practiceArea && highValuePracticeAreas.includes(lead.practiceArea)) {
      score += 20;
    } else if (lead.practiceArea) {
      score += 10;
    }

    // Source factor
    const sourceScores: Record<string, number> = {
      website: 15,
      referral: 25,
      advertising: 20,
      social_media: 10,
      phone: 15,
      walk_in: 20,
    };
    score += sourceScores[lead.source] || 5;

    // Contact information completeness
    if (lead.contact) {
      if (lead.contact.phone) score += 10;
      if (lead.contact.email) score += 5;
      if (lead.contact.name) score += 5;
    }

    // Urgency factor
    const urgencyScores: Record<LeadUrgency, number> = {
      critical: 20,
      high: 15,
      medium: 10,
      low: 5,
    };
    score += urgencyScores[lead.urgency as LeadUrgency] || 0;

    // Engagement factor (if they've been contacted)
    if (lead.status === 'contacted') {
      score += 10;

      // If contacted recently, add more points
      if (lead.lastContactAt) {
        const hoursSinceContact = (Date.now() - lead.lastContactAt.getTime()) / (1000 * 60 * 60);
        if (hoursSinceContact < 24) {
          score += 5;
        }
      }
    }

    // Ensure score is between 0 and 100
    return Math.min(Math.max(score, 0), 100);
  }

  // Get urgency level based on lead score
  private getUrgencyFromScore(score: number): LeadUrgency {
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }

  // Assign high-scoring leads to available attorneys
  private async assignHighScoreLeads(leads: Lead[]) {
    try {
      const prisma = getPrismaClient();

      // Get available attorneys (those with fewer than 10 active leads)
      const attorneys = await prisma.user.findMany({
        where: {
          role: 'ATTORNEY',
          leads: {
            some: {
              status: {
                notIn: ['won', 'lost'],
              },
            },
          },
        },
        include: {
          _count: {
            select: {
              leads: {
                where: {
                  status: {
                    notIn: ['won', 'lost'],
                  },
                },
              },
            },
          },
        },
      });

      // Sort attorneys by workload (ascending)
      const sortedAttorneys = attorneys.sort((a, b) => a._count.leads - b._count.leads);

      // Assign leads round-robin style to attorneys with capacity
      let attorneyIndex = 0;
      for (const lead of leads) {
        // Skip if no attorneys available or all are at capacity
        const firstAttorney = sortedAttorneys[0];
        if (sortedAttorneys.length === 0 || !firstAttorney || firstAttorney._count.leads >= 10) {
          logger.warn(`No available attorneys for lead ${lead.id}`);
          continue;
        }

        const attorney = sortedAttorneys[attorneyIndex % sortedAttorneys.length];
        if (!attorney) {
          logger.warn(`Attorney not found at index ${attorneyIndex}`);
          continue;
        }

        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            assignedToId: attorney.id,
            assignedAt: new Date(),
          },
        });

        logger.info(`Assigned high-score lead ${lead.id} to attorney ${attorney.id}`);

        // Move to next attorney
        attorneyIndex++;
      }
    } catch (error) {
      logger.error('Failed to assign high-score leads:', errorToLogMeta(error));
      throw error;
    }
  }

  // Perform database cleanup
  private async performDatabaseCleanup() {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Clean up old sessions
      const deletedSessions = await getPrismaClient().session.deleteMany({
        where: {
          expires: { lt: new Date() },
        },
      });

      // Clean up old user activities
      const deletedActivities = await getPrismaClient().userActivity.deleteMany({
        where: {
          createdAt: { lt: thirtyDaysAgo },
        },
      });

      logger.info('Database cleanup completed', {
        deletedSessions: deletedSessions.count,
        deletedActivities: deletedActivities.count,
      });
    } catch (error) {
      logger.error('Database cleanup failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Send follow-up surveys
  private async sendFollowUpSurveys() {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // Get completed appointments from yesterday
      const startOfYesterday = new Date(yesterday);
      startOfYesterday.setHours(0, 0, 0, 0);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setHours(23, 59, 59, 999);

      const completedAppointments = await getPrismaClient().appointment.findMany({
        where: {
          status: 'completed',
          scheduledAt: {
            gte: startOfYesterday,
            lt: endOfYesterday,
          },
          // Check metadata for surveySent flag
          NOT: {
            metadata: {
              path: ['surveySent'],
              equals: true,
            },
          },
        },
      });

      for (const appointment of completedAppointments) {
        await appointmentReminderService.sendFollowUpSurvey(appointment.id);

        // Mark survey as sent in metadata
        await getPrismaClient().appointment.update({
          where: { id: appointment.id },
          data: {
            metadata: {
              ...((appointment.metadata as Prisma.JsonObject) || {}),
              surveySent: true,
              surveySentAt: new Date().toISOString(),
            },
          },
        });
      }

      logger.info(`Sent ${completedAppointments.length} follow-up surveys`);
    } catch (error) {
      logger.error('Follow-up survey sending failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Aggregate analytics data
  private async aggregateAnalytics() {
    try {
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const prisma = getPrismaClient();

      // Aggregate lead metrics
      const totalLeads = await prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const newLeads = await prisma.lead.count({
        where: {
          status: 'new',
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const convertedLeads = await prisma.lead.count({
        where: {
          status: 'won',
          convertedAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const lostLeads = await prisma.lead.count({
        where: {
          status: 'lost',
          updatedAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const avgLeadScore = await prisma.lead.aggregate({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        _avg: {
          score: true,
        },
      });

      // Aggregate communication metrics
      const totalCalls = await prisma.callLog.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const totalSms = await prisma.smsLog.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      // For emails, we'll count 0 since there's no Email model yet
      const totalEmails = 0;

      // Aggregate appointment metrics
      const totalAppointments = await prisma.appointment.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const completedAppointments = await prisma.appointment.count({
        where: {
          status: 'completed',
          updatedAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const noShowAppointments = await prisma.appointment.count({
        where: {
          status: 'no_show',
          updatedAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      // Aggregate metrics by practice area
      const practiceAreaMetrics: Record<string, unknown> = {};
      const practiceAreas = [
        'immigration',
        'personal_injury',
        'workers_compensation',
        'criminal_defense',
        'family_law',
        'traffic',
      ];

      for (const area of practiceAreas) {
        const areaLeads = await prisma.lead.count({
          where: {
            practiceArea: area as PracticeArea,
            createdAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        });

        const areaConversions = await prisma.lead.count({
          where: {
            practiceArea: area as PracticeArea,
            status: 'won',
            convertedAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        });

        const areaAppointments = await prisma.appointment.count({
          where: {
            metadata: {
              path: ['practiceArea'],
              equals: area,
            },
            createdAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        });

        practiceAreaMetrics[area] = {
          leads: areaLeads,
          conversions: areaConversions,
          appointments: areaAppointments,
          conversionRate: areaLeads > 0 ? (areaConversions / areaLeads) * 100 : 0,
        };
      }

      // Aggregate metrics by source
      const sourceMetrics: Record<string, unknown> = {};
      const leadSources = await prisma.lead.groupBy({
        by: ['source'],
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        _count: {
          id: true,
        },
      });

      for (const sourceGroup of leadSources) {
        const sourceConversions = await prisma.lead.count({
          where: {
            source: sourceGroup.source,
            status: 'won',
            convertedAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        });

        sourceMetrics[sourceGroup.source] = {
          leads: sourceGroup._count.id,
          conversions: sourceConversions,
          conversionRate:
            sourceGroup._count.id > 0 ? (sourceConversions / sourceGroup._count.id) * 100 : 0,
        };
      }

      // Create or update the analytics snapshot for today
      const snapshotDate = new Date(startOfDay);

      await prisma.analyticsSnapshot.upsert({
        where: {
          date: snapshotDate,
        },
        update: {
          totalLeads,
          newLeads,
          convertedLeads,
          lostLeads,
          avgLeadScore: avgLeadScore._avg.score || 0,
          totalCalls,
          totalSms,
          totalEmails,
          totalAppointments,
          completedAppointments,
          noShowAppointments,
          practiceAreaMetrics: practiceAreaMetrics as Prisma.JsonObject,
          sourceMetrics: sourceMetrics as Prisma.JsonObject,
          metadata: {
            lastUpdated: new Date().toISOString(),
            aggregationRun: new Date().toISOString(),
          } as Prisma.JsonObject,
        },
        create: {
          date: snapshotDate,
          totalLeads,
          newLeads,
          convertedLeads,
          lostLeads,
          avgLeadScore: avgLeadScore._avg.score || 0,
          totalCalls,
          totalSms,
          totalEmails,
          totalAppointments,
          completedAppointments,
          noShowAppointments,
          practiceAreaMetrics: practiceAreaMetrics as Prisma.JsonObject,
          sourceMetrics: sourceMetrics as Prisma.JsonObject,
          metadata: {
            createdAt: new Date().toISOString(),
          },
        },
      });

      logger.info('Analytics aggregation completed', {
        date: snapshotDate,
        metrics: {
          leads: { total: totalLeads, new: newLeads, converted: convertedLeads, lost: lostLeads },
          communications: { calls: totalCalls, sms: totalSms, emails: totalEmails },
          appointments: {
            total: totalAppointments,
            completed: completedAppointments,
            noShow: noShowAppointments,
          },
        },
      });
    } catch (error) {
      logger.error('Analytics aggregation failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Backup important data
  private async backupImportantData() {
    try {
      // This would integrate with a backup service
      // For now, log the intent
      const counts = await Promise.all([
        getPrismaClient().user.count({ where: { role: 'CLIENT' } }),
        getPrismaClient().case.count(),
        getPrismaClient().document.count(),
        getPrismaClient().appointment.count(),
      ]);

      logger.info('Data backup completed', {
        users: counts[0],
        cases: counts[1],
        documents: counts[2],
        appointments: counts[3],
      });
    } catch (error) {
      logger.error('Data backup failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Check for document expiry
  private async checkDocumentExpiry() {
    try {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      // TODO: Implement when document expiry fields are added to schema
      // Currently, the Document model doesn't have expiryDate or expiryNotificationSent fields
      logger.info('Document expiry check: Feature not yet implemented');
    } catch (error) {
      logger.error('Document expiry check failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Log job execution
  private async logJobExecution(
    jobName: string,
    status: 'success' | 'failed',
    duration: number,
    error?: Error | string
  ) {
    // TODO: Store job logs when cronJobLog model is added to schema
    // For now, just log to console
    const logData = {
      jobName,
      status,
      duration,
      error: error ? (typeof error === 'string' ? error : error.message) : null,
      executedAt: new Date(),
    };

    if (status === 'success') {
      logger.info('Cron job execution logged', logData);
    } else {
      logger.error('Cron job execution failed', logData);
    }
  }

  // Stop all jobs
  stop() {
    for (const [name, job] of this.jobs) {
      job.stop();
      logger.info(`Stopped cron job: ${name}`);
    }
    this.jobs.clear();
  }

  // Get job status
  getJobStatus() {
    const status: Record<string, unknown> = {};

    for (const [name, job] of this.jobs) {
      status[name] = {
        running: (job as cron.ScheduledTask & { running?: boolean }).running || false,
      };
    }

    return status;
  }

  // Manually trigger a job
  async triggerJob(jobName: string) {
    const job = this.jobs.get(jobName);

    if (!job) {
      throw new Error(`Job ${jobName} not found`);
    }

    logger.info(`Manually triggering job: ${jobName}`);
    // Cron jobs don't expose task directly, we need to use our stored tasks
    // This would require refactoring to store the task functions separately
    throw new Error('Manual job triggering not implemented');
  }
}

// Export singleton instance
export const cronJobService = new CronJobService();
