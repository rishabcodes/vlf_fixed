import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';
// import type { UserActivity } from '@prisma/client';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
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

    // Get all activities for the case
    const activities = await prisma.userActivity.findMany({
      where: {
        userId: session.user.id,
        metadata: {
          path: ['caseId'],
          equals: params.id,
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    // Transform activities into timeline events
    const events = activities.map((activity: any) => {
      // Extract title and description from metadata if available
      const metadata = (activity.metadata as any) || {};
      const title = metadata.title || activity.type || 'Activity';
      const description = metadata.description || '';

      return {
        id: activity.id,
        type: activity.type,
        title: title,
        description: description,
        date: activity.createdAt,
        user: {
          name: activity.user?.name || 'System',
          role: activity.user?.role || 'system',
        },
        metadata: metadata,
      };
    });

    return NextResponse.json({ success: true, events });
  } catch (error) {
    logger.error('Failed to fetch timeline:', error);
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
  }
}
