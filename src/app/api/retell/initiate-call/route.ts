import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { RetellClient } from '@/services/retell/client';
import { selectVoiceAgent } from '@/services/retell/agent-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, language = 'en', phoneNumber } = body;

    // Validate request
    if (type !== 'immediate' && type !== 'scheduled') {
      return NextResponse.json(
        { error: 'Invalid call type' },
        { status: 400 }
      );
    }

    // Initialize Retell client
    const retellClient = new RetellClient();

    // Select appropriate agent based on context
    const agentType = selectVoiceAgent({
      language,
      isEmergency: type === 'immediate',
      timeOfDay: new Date()
    });

    // For immediate calls, we'll display our main number
    // In production, this would initiate an outbound call
    if (type === 'immediate') {
      logger.info('Immediate call requested', {
        language,
        agentType,
        timestamp: new Date().toISOString()
      });

      // Log the call request
      try {
        await prisma.callLog.create({
          data: {
            fromNumber: phoneNumber || 'unknown',
            toNumber: '1-844-965-3536',
            direction: 'inbound',
            status: 'active',
            startedAt: new Date(),
            metadata: {
              language,
              agentType,
              requestType: 'immediate',
              timestamp: new Date().toISOString()
            }
          }
        });
      } catch (dbError) {
        logger.error('Failed to log call request:', errorToLogMeta(dbError));
      }

      return NextResponse.json({
        success: true,
        message: 'Please call our main line',
        phoneNumber: '1-844-YO-PELEO',
        alternateNumber: '1-844-965-3536',
        agentType,
        estimatedWaitTime: '< 1 minute'
      });
    }

    // For scheduled callbacks, create a task
    if (type === 'scheduled') {
      const { 
        name, 
        phone, 
        email, 
        preferredDate, 
        preferredTime, 
        topic, 
        urgency,
        message 
      } = body;

      // Create callback task
      const callbackTask = await prisma.task.create({
        data: {
          type: 'callback',
          status: 'pending',
          priority: urgency === 'emergency' ? 'urgent' : urgency === 'urgent' ? 'high' : 'medium',
          title: `Callback request from ${name}`,
          dueDate: new Date(`${preferredDate} ${preferredTime}`),
          createdById: 'system', // This needs to be handled properly
          metadata: {
            name,
            phone,
            email,
            topic,
            message,
            language,
            agentType,
            requestedAt: new Date().toISOString()
          }
        }
      });

      // Send notification to staff
      // In production, this would trigger notifications
      logger.info('Callback scheduled', {
        taskId: callbackTask.id,
        scheduledFor: callbackTask.dueDate,
        urgency
      });

      return NextResponse.json({
        success: true,
        message: 'Callback scheduled successfully',
        taskId: callbackTask.id,
        scheduledFor: callbackTask.dueDate
      });
    }

  } catch (error) {
    logger.error('Error initiating call:', errorToLogMeta(error));
    
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}
