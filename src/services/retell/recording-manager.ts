import { getRetellService } from './index';
// import { ghlService } from '@/services/gohighlevel';  // Removed - using GHL MCP instead
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';

// Call data interface for Retell API responses (matches RetellCall)
interface CallData {
  call_id: string;
  agent_id?: string;
  call_status: 'ongoing' | 'ended' | 'error';
  start_timestamp: number;
  end_timestamp?: number;
  transcript?: string;
  recording_url?: string;
  metadata?: Record<string, unknown>;
  from_number?: string;
  to_number?: string;
  duration_ms?: number;
}

// Sync data interface for GHL integration
interface SyncData {
  recordingUrl: string;
  transcript: string;
  analysis: TranscriptAnalysis;
  call: CallData;
}

// Where clause interface for analytics queries
interface AnalyticsWhereClause {
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
  [key: string]: unknown;
}

interface RecordingData {
  callId: string;
  recordingUrl: string;
  transcript: string;
  duration: number;
  analysis?: {
    sentiment: string;
    summary: string;
    keywords: string[];
    actionItems: string[];
    followUpRequired: boolean;
    appointmentScheduled: boolean;
    practiceAreaConfirmed?: string;
  };
}

interface TranscriptAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  summary: string;
  keywords: string[];
  actionItems: string[];
  followUpRequired: boolean;
  appointmentScheduled: boolean;
  practiceAreaDetected?: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  clientSatisfaction: number; // 1-10 scale
}

export class RecordingManager {
  private static instance: RecordingManager;

  static getInstance(): RecordingManager {
    if (!RecordingManager.instance) {
      RecordingManager.instance = new RecordingManager();
    }
    return RecordingManager.instance;
  }

  // Process recording when it becomes available
  async processRecording(callId: string): Promise<void> {
    try {
      logger.info('Processing call recording', { callId });

      // Get recording URL from Retell
      const retellService = getRetellService();
      const recordingData = await retellService.getCallRecording(callId);

      if (!recordingData.recording_url) {
        throw new Error('No recording URL available');
      }

      // Get transcript
      const transcript = await retellService.getCallTranscript(callId);

      // Get call details
      const call = await retellService.getCall(callId);
      if (!call) {
        throw new Error('Call not found');
      }

      // Analyze transcript
      const analysis = await this.analyzeTranscript(transcript, call);

      // Store recording data
      await this.storeRecordingData({
        callId,
        recordingUrl: recordingData.recording_url,
        transcript,
        duration: call.duration_ms || 0,
        analysis,
      });

      // Sync with GoHighLevel
      await this.syncToGHL(callId, {
        recordingUrl: recordingData.recording_url,
        transcript,
        analysis,
        call,
      });

      // Create follow-up tasks if needed
      await this.createFollowUpTasks(callId, analysis, call);

      logger.info('Recording processed successfully', {
        callId,
        sentiment: analysis.sentiment,
        followUpRequired: analysis.followUpRequired,
      });
    } catch (error) {
      logger.error('Failed to process recording:', { error, callId });
      throw error;
    }
  }

  // Analyze transcript using AI
  private async analyzeTranscript(transcript: string, call: CallData): Promise<TranscriptAnalysis> {
    try {
      // Basic analysis using keywords and patterns
      const analysis: TranscriptAnalysis = {
        sentiment: 'neutral',
        confidence: 0.5,
        summary: '',
        keywords: [],
        actionItems: [],
        followUpRequired: false,
        appointmentScheduled: false,
        urgencyLevel: 'low',
        clientSatisfaction: 5,
      };

      const lowerTranscript = transcript.toLowerCase();

      // Sentiment analysis
      const positiveWords = [
        'great',
        'excellent',
        'wonderful',
        'helpful',
        'satisfied',
        'thank you',
        'appreciate',
      ];
      const negativeWords = [
        'terrible',
        'awful',
        'disappointed',
        'frustrated',
        'angry',
        'worst',
        'horrible',
      ];

      let positiveScore = 0;
      let negativeScore = 0;

      positiveWords.forEach(word => {
        const matches = (lowerTranscript.match(new RegExp(word, 'g')) || []).length;
        positiveScore += matches;
      });

      negativeWords.forEach(word => {
        const matches = (lowerTranscript.match(new RegExp(word, 'g')) || []).length;
        negativeScore += matches;
      });

      if (positiveScore > negativeScore) {
        analysis.sentiment = 'positive';
        analysis.confidence = Math.min(0.9, 0.5 + (positiveScore - negativeScore) * 0.1);
        analysis.clientSatisfaction = Math.min(10, 6 + positiveScore);
      } else if (negativeScore > positiveScore) {
        analysis.sentiment = 'negative';
        analysis.confidence = Math.min(0.9, 0.5 + (negativeScore - positiveScore) * 0.1);
        analysis.clientSatisfaction = Math.max(1, 4 - negativeScore);
      }

      // Extract keywords
      const keywordPatterns = [
        { pattern: /immigrat(ion|e)/g, keyword: 'immigration' },
        { pattern: /accident|injury|hurt/g, keyword: 'personal_injury' },
        { pattern: /criminal|arrest|charged/g, keyword: 'criminal_defense' },
        { pattern: /work(ers)?.*comp|workplace.*injury/g, keyword: 'workers_compensation' },
        { pattern: /divorce|custody|family/g, keyword: 'family_law' },
        { pattern: /visa|green.*card|citizenship/g, keyword: 'immigration' },
        { pattern: /dui|dwi/g, keyword: 'criminal_defense' },
        { pattern: /appointment|schedule|meet/g, keyword: 'appointment' },
        { pattern: /urgent|emergency|asap/g, keyword: 'urgent' },
        { pattern: /callback|call.*back/g, keyword: 'callback' },
      ];

      keywordPatterns.forEach(({ pattern, keyword }) => {
        if (pattern.test(lowerTranscript)) {
          analysis.keywords.push(keyword);
        }
      });

      // Detect practice area
      if (analysis.keywords.includes('immigration')) {
        analysis.practiceAreaDetected = 'immigration';
      } else if (analysis.keywords.includes('personal_injury')) {
        analysis.practiceAreaDetected = 'personal_injury';
      } else if (analysis.keywords.includes('criminal_defense')) {
        analysis.practiceAreaDetected = 'criminal_defense';
      } else if (analysis.keywords.includes('workers_compensation')) {
        analysis.practiceAreaDetected = 'workers_compensation';
      } else if (analysis.keywords.includes('family_law')) {
        analysis.practiceAreaDetected = 'family_law';
      }

      // Check for appointment scheduling
      const appointmentPatterns = [
        /scheduled.*appointment/i,
        /appointment.*scheduled/i,
        /see you.*on/i,
        /confirmed.*meeting/i,
      ];

      analysis.appointmentScheduled = appointmentPatterns.some(pattern => pattern.test(transcript));

      // Check for follow-up requirements
      const followUpPatterns = [
        /call.*back/i,
        /follow.*up/i,
        /get.*back.*to.*you/i,
        /need.*more.*information/i,
        /send.*documents/i,
      ];

      analysis.followUpRequired =
        followUpPatterns.some(pattern => pattern.test(transcript)) ||
        analysis.keywords.includes('callback');

      // Determine urgency
      if (
        analysis.keywords.includes('urgent') ||
        lowerTranscript.includes('emergency') ||
        lowerTranscript.includes('deadline')
      ) {
        analysis.urgencyLevel = 'high';
      } else if (
        analysis.followUpRequired ||
        analysis.appointmentScheduled ||
        analysis.keywords.includes('appointment')
      ) {
        analysis.urgencyLevel = 'medium';
      }

      // Extract action items
      const actionItemPatterns = [
        /need to.*(?:send|provide|get|schedule|call)/gi,
        /will.*(?:send|provide|call|schedule)/gi,
        /should.*(?:call|contact|schedule)/gi,
        /next step.*is/gi,
      ];

      actionItemPatterns.forEach(pattern => {
        const matches = transcript.match(pattern) || [];
        matches.forEach((match: string) => {
          if (match.length > 10 && match.length < 100) {
            analysis.actionItems.push(match.trim());
          }
        });
      });

      // Generate summary
      analysis.summary = this.generateSummary(transcript, analysis);

      return analysis;
    } catch (error) {
      logger.error('Failed to analyze transcript:', errorToLogMeta(error));

      // Return basic analysis on error
      return {
        sentiment: 'neutral',
        confidence: 0.1,
        summary: 'Call completed - manual review required',
        keywords: [],
        actionItems: [],
        followUpRequired: true,
        appointmentScheduled: false,
        urgencyLevel: 'medium',
        clientSatisfaction: 5,
      };
    }
  }

  // Generate call summary
  private generateSummary(transcript: string, analysis: TranscriptAnalysis): string {
    const duration = Math.ceil(transcript.length / 150); // Rough estimate: 150 chars per minute

    let summary = `${duration}-minute call completed. `;

    if (analysis.practiceAreaDetected) {
      summary += `Practice area: ${analysis.practiceAreaDetected.replace('_', ' ')}. `;
    }

    if (analysis.appointmentScheduled) {
      summary += 'Appointment scheduled. ';
    }

    if (analysis.followUpRequired) {
      summary += 'Follow-up required. ';
    }

    summary += `Client sentiment: ${analysis.sentiment}.`;

    if (analysis.actionItems.length > 0) {
      summary += ` Action items: ${analysis.actionItems.length} identified.`;
    }

    return summary;
  }

  // Store recording data in database
  private async storeRecordingData(data: RecordingData): Promise<void> {
    try {
      const prisma = getPrismaClient();

      // Store main recording record
      await prisma.callRecording.upsert({
        where: { callId: data.callId },
        create: {
          callId: data.callId,
          recordingUrl: data.recordingUrl,
          transcript: data.transcript,
          duration: data.duration,
          sentiment: data.analysis?.sentiment || 'neutral',
          summary: data.analysis?.summary || '',
          keywords: data.analysis?.keywords || [],
          actionItems: data.analysis?.actionItems || [],
          followUpRequired: data.analysis?.followUpRequired || false,
          appointmentScheduled: data.analysis?.appointmentScheduled || false,
          metadata: {
            analysis: data.analysis,
            processedAt: new Date().toISOString(),
          },
        },
        update: {
          recordingUrl: data.recordingUrl,
          transcript: data.transcript,
          duration: data.duration,
          sentiment: data.analysis?.sentiment || 'neutral',
          summary: data.analysis?.summary || '',
          keywords: data.analysis?.keywords || [],
          actionItems: data.analysis?.actionItems || [],
          followUpRequired: data.analysis?.followUpRequired || false,
          appointmentScheduled: data.analysis?.appointmentScheduled || false,
          metadata: {
            analysis: data.analysis,
            processedAt: new Date().toISOString(),
          },
        },
      });

      // Update the related voice call record
      await prisma.voiceCall.updateMany({
        where: { retellCallId: data.callId },
        data: {
          status: 'completed',
          duration: Math.round(data.duration / 1000), // Convert to seconds
          transcript: data.transcript,
          recordingUrl: data.recordingUrl,
          sentiment: data.analysis?.sentiment,
          metadata: {
            analysis: data.analysis,
            recordingProcessed: true,
            recordingProcessedAt: new Date().toISOString(),
          },
        },
      });

      logger.info('Recording data stored', {
        callId: data.callId,
        transcriptLength: data.transcript.length,
        duration: data.duration,
      });
    } catch (error) {
      logger.error('Failed to store recording data:', errorToLogMeta(error));
      throw error;
    }
  }

  // Sync recording data to GoHighLevel
  private async syncToGHL(callId: string, data: SyncData): Promise<void> {
    try {
      // Get GHL contact ID from call metadata
      const ghlContactId = data.call.metadata?.ghlContactId as string | undefined;

      if (!ghlContactId || typeof ghlContactId !== 'string') {
        logger.warn('No GHL contact ID found for call', { callId });
        return;
      }

      // Sync recording and transcript
      await ghlService.syncCallRecording(ghlContactId, callId, data.recordingUrl, data.transcript);

      // Update contact with call outcome
      await ghlService.updateContactCallOutcome(ghlContactId, {
        callId,
        duration: data.call.duration_ms || 0,
        outcome: this.determineCallOutcome(data.analysis),
        summary: data.analysis.summary,
        sentiment: data.analysis.sentiment,
        appointmentScheduled: data.analysis.appointmentScheduled,
        nextSteps: data.analysis.actionItems.join('; '),
      });

      // Add detailed note
      const noteContent = this.formatCallNote(data);
      await ghlService.addNote(ghlContactId, noteContent);

      // Update tags based on analysis
      const tags = this.generateTagsFromAnalysis(data.analysis);
      if (tags.length > 0) {
        const contact = await ghlService.getContact(ghlContactId);
        if (contact) {
          await ghlService.updateContact(ghlContactId, {
            tags: [...(contact.tags || []), ...tags],
          });
        }
      }

      logger.info('Recording synced to GHL', {
        callId,
        ghlContactId,
        tagsAdded: tags.length,
      });
    } catch (error) {
      logger.error('Failed to sync recording to GHL:', errorToLogMeta(error));
    }
  }

  // Determine call outcome from analysis
  private determineCallOutcome(
    analysis: TranscriptAnalysis
  ): 'connected' | 'voicemail' | 'no_answer' | 'busy' | 'failed' {
    // Since we have a transcript, the call was connected
    return 'connected';
  }

  // Format call note for GHL
  private formatCallNote(data: { analysis: TranscriptAnalysis; call: CallData }): string {
    const { analysis } = data;
    const duration = Math.round((data.call.duration_ms || 0) / 1000);

    let note = `CALL SUMMARY (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')})\n\n`;

    note += `Sentiment: ${analysis.sentiment.toUpperCase()}`;
    if (analysis.confidence > 0.7) {
      note += ` (${Math.round(analysis.confidence * 100)}% confidence)`;
    }
    note += `\nClient Satisfaction: ${analysis.clientSatisfaction}/10\n\n`;

    if (analysis.summary) {
      note += `Summary: ${analysis.summary}\n\n`;
    }

    if (analysis.practiceAreaDetected) {
      note += `Practice Area: ${analysis.practiceAreaDetected.replace('_', ' ')}\n`;
    }

    if (analysis.keywords.length > 0) {
      note += `Keywords: ${analysis.keywords.join(', ')}\n`;
    }

    if (analysis.actionItems.length > 0) {
      note += `\nAction Items:\n${analysis.actionItems.map(item => `• ${item}`).join('\n')}\n`;
    }

    if (analysis.appointmentScheduled) {
      note += `\n✅ APPOINTMENT SCHEDULED\n`;
    }

    if (analysis.followUpRequired) {
      note += `\n📞 FOLLOW-UP REQUIRED\n`;
    }

    note += `\nUrgency Level: ${analysis.urgencyLevel.toUpperCase()}`;

    return note;
  }

  // Generate tags from analysis
  private generateTagsFromAnalysis(analysis: TranscriptAnalysis): string[] {
    const tags: string[] = [];

    // Sentiment tags
    tags.push(`call-${analysis.sentiment}`);

    // Practice area tags
    if (analysis.practiceAreaDetected) {
      tags.push(`practice-${analysis.practiceAreaDetected}`);
    }

    // Outcome tags
    if (analysis.appointmentScheduled) {
      tags.push('appointment-scheduled', 'hot-lead');
    }

    if (analysis.followUpRequired) {
      tags.push('follow-up-required');
    }

    // Urgency tags
    if (analysis.urgencyLevel === 'high') {
      tags.push('urgent');
    }

    // Satisfaction tags
    if (analysis.clientSatisfaction >= 8) {
      tags.push('highly-satisfied');
    } else if (analysis.clientSatisfaction <= 3) {
      tags.push('needs-attention');
    }

    return tags;
  }

  // Create follow-up tasks based on analysis
  private async createFollowUpTasks(
    callId: string,
    analysis: TranscriptAnalysis,
    call: CallData
  ): Promise<void> {
    try {
      const ghlContactId = call.metadata?.ghlContactId as string | undefined;
      if (!ghlContactId || typeof ghlContactId !== 'string') return;

      const tasks: Array<{
        contactId: string;
        title: string;
        body: string;
        dueDate: Date;
      }> = [];

      // Create tasks based on action items
      for (const actionItem of analysis.actionItems) {
        tasks.push({
          contactId: ghlContactId,
          title: 'Follow up on call action item',
          body: actionItem,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        });
      }

      // Create follow-up task if required
      if (analysis.followUpRequired && !analysis.appointmentScheduled) {
        tasks.push({
          contactId: ghlContactId,
          title: 'Follow up on recent call',
          body: `Follow up required from call analysis. Client sentiment: ${analysis.sentiment}. Summary: ${analysis.summary}`,
          dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
        });
      }

      // Create urgent task for negative sentiment
      if (analysis.sentiment === 'negative' || analysis.clientSatisfaction <= 3) {
        tasks.push({
          contactId: ghlContactId,
          title: 'URGENT: Address negative call experience',
          body: `Client had negative experience during call. Satisfaction score: ${analysis.clientSatisfaction}/10. Immediate attention required.`,
          dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        });
      }

      // Create all tasks
      for (const task of tasks) {
        await ghlService.createTask(task);
      }

      logger.info('Follow-up tasks created', {
        callId,
        taskCount: tasks.length,
      });
    } catch (error) {
      logger.error('Failed to create follow-up tasks:', errorToLogMeta(error));
    }
  }

  // Get recording by call ID
  async getRecording(callId: string) {
    try {
      const prisma = getPrismaClient();

      const recording = await prisma.callRecording.findUnique({
        where: { callId },
        include: {
          voiceCall: true,
        },
      });

      return recording;
    } catch (error) {
      logger.error('Failed to get recording:', errorToLogMeta(error));
      throw error;
    }
  }

  // Get recordings for a contact
  async getContactRecordings(ghlContactId: string) {
    try {
      const prisma = getPrismaClient();

      const recordings = await prisma.callRecording.findMany({
        where: {
          voiceCall: {
            ghlContactId,
          },
        },
        include: {
          voiceCall: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return recordings;
    } catch (error) {
      logger.error('Failed to get contact recordings:', errorToLogMeta(error));
      throw error;
    }
  }

  // Get recording analytics
  async getRecordingAnalytics(timeRange?: { start: Date; end: Date }) {
    try {
      const prisma = getPrismaClient();

      const where: AnalyticsWhereClause = {};
      if (timeRange) {
        where.createdAt = {
          gte: timeRange.start,
          lte: timeRange.end,
        };
      }

      const recordings = await prisma.callRecording.findMany({
        where,
        select: {
          sentiment: true,
          duration: true,
          appointmentScheduled: true,
          followUpRequired: true,
          keywords: true,
          createdAt: true,
        },
      });

      const analytics = {
        total: recordings.length,
        avgDuration: 0,
        sentimentDistribution: {
          positive: 0,
          neutral: 0,
          negative: 0,
        },
        appointmentRate: 0,
        followUpRate: 0,
        topKeywords: {} as Record<string, number>,
        trendsOverTime: [] as unknown[],
      };

      let totalDuration = 0;
      let appointmentCount = 0;
      let followUpCount = 0;

      recordings.forEach(recording => {
        // Duration
        totalDuration += recording.duration;

        // Sentiment
        analytics.sentimentDistribution[
          recording.sentiment as keyof typeof analytics.sentimentDistribution
        ]++;

        // Appointments
        if (recording.appointmentScheduled) appointmentCount++;

        // Follow-ups
        if (recording.followUpRequired) followUpCount++;

        // Keywords
        recording.keywords.forEach((keyword: string) => {
          analytics.topKeywords[keyword] = (analytics.topKeywords[keyword] || 0) + 1;
        });
      });

      analytics.avgDuration = recordings.length > 0 ? totalDuration / recordings.length : 0;
      analytics.appointmentRate =
        recordings.length > 0 ? (appointmentCount / recordings.length) * 100 : 0;
      analytics.followUpRate =
        recordings.length > 0 ? (followUpCount / recordings.length) * 100 : 0;

      return analytics;
    } catch (error) {
      logger.error('Failed to get recording analytics:', errorToLogMeta(error));
      throw error;
    }
  }

  // Delete old recordings (for storage management)
  async cleanupOldRecordings(daysToKeep: number = 90) {
    try {
      const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

      const prisma = getPrismaClient();
      const deletedCount = await prisma.callRecording.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate,
          },
        },
      });

      logger.info('Old recordings cleaned up', {
        deletedCount: deletedCount.count,
        cutoffDate,
      });

      return deletedCount.count;
    } catch (error) {
      logger.error('Failed to cleanup old recordings:', errorToLogMeta(error));
      throw error;
    }
  }
}

// Export singleton instance
export const recordingManager = RecordingManager.getInstance();
