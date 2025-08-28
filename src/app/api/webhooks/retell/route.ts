import { NextRequest, NextResponse } from 'next/server';
import { getRetellService } from '@/services/retell';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { callAnalysisQueue } from '@/lib/queue/bull';
import { getPrismaClient } from '@/lib/prisma';
import { statusManager } from '@/services/retell/status-manager';
import { recordingManager } from '@/services/retell/recording-manager';
import { retellErrorHandler } from '@/services/retell/error-handler';
import type { RetellCallAnalysis, RetellCallMetadata } from '@/types/api';
import { withTracing } from '@/lib/telemetry/api-middleware';

interface RetellWebhookEvent {
  event: string;
  call?: {
    call_id: string;
    agent_id: string;
    status: string;
    from_number?: string;
    to_number?: string;
    call_type?: string;
    start_timestamp?: string;
    end_timestamp?: string;
    duration_ms?: number;
    transcript?: string;
    metadata?: Record<string, unknown>;
    disconnection_reason?: string;
    call_analysis?: RetellCallAnalysis;
  };
  call_id?: string;
  analysis?: {
    summary?: string;
    sentiment?: string;
    action_items?: string[];
    extracted_info?: Record<string, unknown>;
  };
  transcript?: string;
  recording_url?: string;
}

async function handlePOST(request: NextRequest) {
  let event: RetellWebhookEvent | undefined;
  try {
    // Get webhook signature for verification
    const signature = request.headers.get('x-retell-signature') || '';
    const rawBody = await request.text();

    // Verify webhook if secret is configured
    if (process.env.RETELL_WEBHOOK_SECRET && process.env.RETELL_WEBHOOK_SECRET !== 'skip') {
      const service = getRetellService();
      const isValid = service.verifyWebhook(signature, rawBody, process.env.RETELL_WEBHOOK_SECRET);

      if (!isValid) {
        logger.warn('Invalid Retell webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } else {
      // Log that webhook verification is skipped
      logger.info('Retell webhook verification skipped - no secret configured');
    }

    // Parse the webhook event
    event = JSON.parse(rawBody);

    logger.info('Retell webhook received', {
      event: event?.event,
      callId: event?.call?.call_id,
    });

    // Handle the event with enhanced error handling
    if (event) {
      await handleRetellEvent(event);
    } else {
      throw new Error('No event data received');
    }

    // Respond quickly to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    // Use enhanced error handler
    await retellErrorHandler.handleError(error, {
      operation: 'webhook_processing',
      metadata: { event: event?.event, callId: event?.call?.call_id },
    });

    logger.error('Retell webhook error', errorToLogMeta(error));
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleRetellEvent(event: RetellWebhookEvent) {
  const { event: eventType, call } = event;

  switch (eventType) {
    case 'call_started':
      if (call) {
        await handleCallStarted(call);
        await statusManager.updateCallStatus(call.call_id as string, 'connected', {
          timestamp: new Date(),
          agent_id: call.agent_id,
        });
      }
      break;

    case 'call_ended':
      if (call) {
        await handleCallEnded(call);
        await statusManager.updateCallStatus(call.call_id as string, 'ended', {
          timestamp: new Date(),
          duration: call.duration_ms,
          reason: call.disconnection_reason,
        });
      }
      break;

    case 'call_analyzed':
      await handleCallAnalyzed(event as unknown as Record<string, unknown>);
      break;

    case 'transcript_ready':
      await handleTranscriptReady(event as unknown as Record<string, unknown>);
      break;

    case 'recording_ready':
      await handleRecordingReady(event as unknown as Record<string, unknown>);
      // Process recording with new manager
      if (call?.call_id) {
        setTimeout(async () => {
          try {
            await recordingManager.processRecording(call.call_id as string);
          } catch (error) {
            logger.error('Failed to process recording', errorToLogMeta(error));
          }
        }, 1000); // 1 second delay
      }
      break;

    // Additional Retell webhook events
    case 'call_queued':
      if (call) {
        await statusManager.updateCallStatus(call.call_id as string, 'queued', {
          timestamp: new Date(),
          agent_id: call.agent_id,
        });
      }
      break;

    case 'call_ringing':
      if (call) {
        await statusManager.updateCallStatus(call.call_id as string, 'ringing', {
          timestamp: new Date(),
          to_number: call.to_number,
        });
      }
      break;

    case 'call_failed':
      if (call) {
        await statusManager.updateCallStatus(call.call_id as string, 'failed', {
          timestamp: new Date(),
          reason: call.disconnection_reason || 'Unknown error',
        });
      }
      break;

    case 'call_no_answer':
      if (call) {
        await statusManager.updateCallStatus(call.call_id as string, 'no_answer', {
          timestamp: new Date(),
        });
      }
      break;

    case 'call_busy':
      if (call) {
        await statusManager.updateCallStatus(call.call_id as string, 'busy', {
          timestamp: new Date(),
        });
      }
      break;

    case 'voicemail_detected':
      if (call) {
        await statusManager.updateCallStatus(call.call_id as string, 'voicemail', {
          timestamp: new Date(),
        });
      }
      break;

    default:
      logger.warn('Unknown Retell webhook event', { eventType });
  }
}

async function handleCallStarted(call: Record<string, unknown>) {
  try {
    const prisma = getPrismaClient();
    const ghlService = (await import('@/services/gohighlevel')).ghlService;

    // Create or update call record
    await prisma.call.upsert({
      where: { externalCallId: call.call_id as string },
      create: {
        externalCallId: call.call_id as string,
        agentId: call.agent_id as string,
        fromNumber: (call.from_number as string) || 'unknown',
        toNumber: (call.to_number as string) || 'unknown',
        direction:
          call.call_type === 'web_call'
            ? 'inbound'
            : (call.from_number as string)?.includes(process.env.RETELL_PHONE_NUMBER || '')
              ? 'outbound'
              : 'inbound',
        status: 'active',
        startedAt: new Date(call.start_timestamp as string),
        metadata: JSON.parse(
          JSON.stringify({
            retell_metadata: call.metadata,
            call_type: call.call_type,
          })
        ),
      },
      update: {
        status: 'active',
        startedAt: new Date(call.start_timestamp as string),
      },
    });

    // Create or update GHL contact
    const phoneNumber = (call.from_number as string) || '';
    if (phoneNumber && phoneNumber !== 'unknown') {
      try {
        // Check if contact exists in GHL
        // Use getOrCreateContact which is a public method
        const contact = await ghlService.getOrCreateContact({
          phone: phoneNumber,
          source: 'Retell Voice Call',
          tags: ['voice-lead', 'retell'],
          customFields: {
            lastRetellCallId: call.call_id as string,
            lastCallDate: new Date().toISOString(),
          },
        });

        const ghlContactId = contact.id;

        // Update call record with GHL contact ID
        await prisma.call.update({
          where: { externalCallId: call.call_id as string },
          data: {
            metadata: {
              ghl_contact_id: ghlContactId,
            },
          },
        });
      } catch (ghlError) {
        logger.error('Failed to sync with GHL', errorToLogMeta(ghlError));
      }
    }

    logger.info('Call started', {
      callId: call.call_id,
      agentId: call.agent_id,
      from: call.from_number,
      to: call.to_number,
    });
  } catch (error) {
    logger.error('Failed to handle call started', errorToLogMeta(error));
  }
}

async function handleCallEnded(call: Record<string, unknown>) {
  try {
    const prisma = getPrismaClient();
    const ghlService = (await import('@/services/gohighlevel')).ghlService;

    // Get the call record to retrieve GHL contact ID
    const callRecord = await prisma.call.findUnique({
      where: { externalCallId: call.call_id as string },
    });

    // Update call record
    const updatedCall = await prisma.call.update({
      where: { externalCallId: call.call_id as string },
      data: {
        status: 'completed',
        endedAt: new Date(call.end_timestamp as string),
        duration: call.duration_ms ? Math.round((call.duration_ms as number) / 1000) : null,
        transcript: call.transcript as string,
        metadata: JSON.parse(
          JSON.stringify({
            ...((callRecord?.metadata as object) || {}),
            retell_metadata: call.metadata,
            disconnection_reason: call.disconnection_reason,
            call_analysis: call.call_analysis,
          })
        ),
      },
    });

    // Queue for analysis
    await callAnalysisQueue.add('analyze-call', {
      callId: call.call_id as string,
      transcript: call.transcript as string,
      metadata: {
        ...(call.metadata as Record<string, unknown>),
        duration: call.duration_ms,
        disconnection_reason: call.disconnection_reason,
      },
    });

    // Update GHL contact with call summary
    const ghlContactId = (callRecord?.metadata as RetellCallMetadata)?.ghl_contact_id;
    if (ghlContactId) {
      try {
        // Add note to contact
        await ghlService.addNote(
          ghlContactId,
          `Voice Call Summary (${new Date().toLocaleDateString()})\n\n` +
            `Duration: ${Math.round(((call.duration_ms as number) || 0) / 1000)}s\n` +
            `Agent: ${call.agent_id}\n` +
            `Call ID: ${call.call_id}\n\n` +
            `Summary: ${(call.call_analysis as RetellCallAnalysis)?.summary || 'Call completed'}\n` +
            `Sentiment: ${(call.call_analysis as RetellCallAnalysis)?.sentiment || 'neutral'}`
        );

        // Update contact tags based on call analysis
        const analysis = call.call_analysis as RetellCallAnalysis;
        const tags: string[] = ['voice-call-completed'];

        if (analysis?.sentiment === 'positive') tags.push('satisfied-caller');
        if (analysis?.sentiment === 'negative') tags.push('needs-follow-up');
        if (analysis?.intent) tags.push(`intent-${analysis.intent}`);

        // Use batchUpdateContacts which is public
        await ghlService.batchUpdateContacts([
          {
            contactId: ghlContactId,
            data: {
              tags,
              customFields: {
                lastCallDuration: Math.round(((call.duration_ms as number) || 0) / 1000),
                lastCallSentiment: (analysis?.sentiment as string) || 'neutral',
              },
            },
          },
        ]);

        // Create opportunity if it's a new lead
        if (analysis?.intent === 'new_case_inquiry') {
          await ghlService.createOpportunity({
            contactId: ghlContactId,
            pipelineId: process.env.GHL_MAIN_PIPELINE_ID!,
            stageId: process.env.GHL_NEW_LEADS_STAGE_ID!,
            name: `Voice Lead - ${analysis.case_type || 'General Inquiry'}`,
            value: 0,
          });
        }

        // Create task if follow-up needed
        if (
          (call.metadata as RetellCallMetadata)?.requires_callback ||
          (call.call_analysis as Record<string, unknown>)?.sentiment === 'negative' ||
          analysis?.requires_follow_up
        ) {
          await ghlService.createTask({
            contactId: ghlContactId,
            title: 'Follow up on voice call',
            body:
              `Call ended with ${analysis?.sentiment || 'neutral'} sentiment. ` +
              `Duration: ${Math.round(((call.duration_ms as number) || 0) / 1000)}s. ` +
              `Review transcript and recording.`,
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            assignedTo: process.env.GHL_DEFAULT_USER_ID,
          });
        }
      } catch (ghlError) {
        logger.error('Failed to update GHL after call ended', errorToLogMeta(ghlError));
      }
    }

    // Create follow-up tasks if needed
    if (
      (call.metadata as Record<string, unknown>)?.requires_callback ||
      (call.call_analysis as Record<string, unknown>)?.sentiment === 'negative'
    ) {
      await createFollowUpTask(updatedCall);
    }

    logger.info('Call ended', {
      callId: call.call_id,
      duration: call.duration_ms,
      reason: call.disconnection_reason,
    });
  } catch (error) {
    logger.error('Failed to handle call ended', errorToLogMeta(error));
  }
}

async function handleCallAnalyzed(event: Record<string, unknown>) {
  const { call_id, analysis } = event;

  try {
    // Store analysis results
    await getPrismaClient().callAnalysis.upsert({
      where: { callId: call_id as string },
      create: {
        callId: call_id as string,
        summary: (analysis as Record<string, unknown>).summary as string,
        sentiment: (analysis as Record<string, unknown>).sentiment as string,
        actionItems: ((analysis as Record<string, unknown>).action_items as string[]) || [],
        extractedInfo: JSON.parse(
          JSON.stringify((analysis as Record<string, unknown>).extracted_info || {})
        ),
      },
      update: {
        summary: (analysis as Record<string, unknown>).summary as string,
        sentiment: (analysis as Record<string, unknown>).sentiment as string,
        actionItems: ((analysis as Record<string, unknown>).action_items as string[]) || [],
        extractedInfo: JSON.parse(
          JSON.stringify((analysis as Record<string, unknown>).extracted_info || {})
        ),
      },
    });

    logger.info('Call analysis stored', {
      callId: call_id,
      sentiment: (analysis as Record<string, unknown>).sentiment,
    });
  } catch (error) {
    logger.error('Failed to handle call analysis', errorToLogMeta(error));
  }
}

async function handleTranscriptReady(event: Record<string, unknown>) {
  const { call_id, transcript } = event;

  try {
    // Update call with transcript
    await getPrismaClient().call.update({
      where: { externalCallId: call_id as string },
      data: {
        transcript: transcript as string,
      },
    });

    logger.info('Transcript stored', {
      callId: call_id,
      length: (transcript as string).length,
    });
  } catch (error) {
    logger.error('Failed to handle transcript ready', errorToLogMeta(error));
  }
}

async function handleRecordingReady(event: Record<string, unknown>) {
  const { call_id, recording_url } = event;

  try {
    // Update call with recording URL
    await getPrismaClient().call.update({
      where: { externalCallId: call_id as string },
      data: {
        recordingUrl: recording_url as string,
      },
    });

    logger.info('Recording URL stored', {
      callId: call_id,
    });
  } catch (error) {
    logger.error('Failed to handle recording ready', errorToLogMeta(error));
  }
}

async function createFollowUpTask(call: Record<string, unknown>) {
  try {
    // Find admin user to assign task
    const adminUser = await getPrismaClient().user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (!adminUser) {
      logger.warn('No admin user found for task assignment');
      return;
    }

    await getPrismaClient().task.create({
      data: {
        title: `Follow up on call from ${call.fromNumber as string}`,
        description: `Call requires follow-up. Duration: ${call.duration as number}s. Check transcript and recording for details.`,
        type: 'callback',
        priority: (call.metadata as Record<string, unknown>)?.urgent ? 'urgent' : 'medium',
        status: 'pending',
        relatedCallId: call.externalCallId as string,
        createdById: adminUser.id,
        assignedToId: adminUser.id,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    logger.info('Follow-up task created', {
      callId: call.externalCallId as string,
    });
  } catch (error) {
    logger.error('Failed to create follow-up task', errorToLogMeta(error));
  }
}

// Handle GET requests for webhook configuration
export async function GET(_request: NextRequest) {
  // This endpoint can be used to verify the webhook is accessible
  return NextResponse.json({
    status: 'ok',
    webhook: 'retell',
    configured: !!process.env.RETELL_API_KEY,
  });
}

export const POST = withTracing(handlePOST, {
  spanName: 'webhook.retell',
  attributes: { 'vlf.operation': 'webhook_retell' },
});
