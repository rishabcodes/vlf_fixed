import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';
// import type { Message } from '@prisma/client';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify case belongs to user
    const caseData = await prisma.case.findFirst({
      where: {
        id: params.id,
        clientId: session.user.id,
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // TODO: Implement CaseMessage model in Prisma schema
    // For now, return empty messages array
    const messages: any[] = [];

    // Mock message structure for future implementation
    const transformedMessages = messages.map((m: any) => ({
      id: m.id,
      content: m.content,
      sentAt: m.sentAt,
      sender: {
        id: m.sender.id,
        name: m.sender.name || 'Unknown',
        role: m.sender.role || 'client',
      },
      attachments: m.attachments || [],
      readAt: m.readAt,
    }));

    return NextResponse.json({ success: true, messages: transformedMessages });
  } catch (error) {
    logger.error('Failed to fetch messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    // Verify case belongs to user
    const caseData = await prisma.case.findFirst({
      where: {
        id: params.id,
        clientId: session.user.id,
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // TODO: Implement CaseMessage model in Prisma schema
    // For now, create mock message
    const message = {
      id: `mock-${Date.now()}`,
      caseId: params.id,
      senderId: session.user.id,
      content,
      sentAt: new Date(),
      sender: {
        id: session.user.id,
        name: session.user.name || 'Unknown',
        role: 'client',
      },
    };

    // Create activity log
    await prisma.userActivity.create({
      data: {
        userId: session.user.id,
        type: 'CASE_MESSAGE_SENT',
        metadata: {
          caseId: params.id,
          messageId: message.id,
          title: 'New Message',
          description: 'Client sent a message',
        },
      },
    });

    // TODO: Send notification to attorney

    return NextResponse.json({
      success: true,
      message: {
        id: message.id,
        content: message.content,
        sentAt: message.sentAt,
        sender: {
          id: message.sender.id,
          name: message.sender.name || 'Unknown',
          role: message.sender.role || 'client',
        },
      },
    });
  } catch (error) {
    logger.error('Failed to send message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
