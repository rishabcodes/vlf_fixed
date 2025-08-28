import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const caseData = await prisma.case.findFirst({
      where: {
        id: params.id,
        clientId: session.user.id,
      },
      include: {
        attorney: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        documents: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        // Remove non-existent relations
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Transform the data
    const metadata = (caseData.metadata as any) || {};
    const transformedCase = {
      id: caseData.id,
      caseNumber: caseData.caseNumber,
      title: metadata.title || `Case ${caseData.caseNumber}`,
      description: caseData.description,
      practiceArea: caseData.practiceArea,
      status: caseData.status,
      priority: metadata.priority || 'normal',
      attorney: caseData.attorney,
      createdAt: caseData.createdAt,
      updatedAt: caseData.updatedAt,
      nextHearing: metadata.nextHearing || null,
      keyDates: [
        { label: 'Case Filed', date: caseData.createdAt },
        { label: 'Last Updated', date: caseData.updatedAt },
      ],
      parties: [
        { role: 'Client', name: session.user.name || 'Client' },
        { role: 'Attorney', name: caseData.attorney?.name || 'Not Assigned' },
      ],
      stats: {
        documents: caseData.documents.length,
        unreadMessages: 0, // TODO: Implement when CaseMessage model is added
      },
    };

    return NextResponse.json({ success: true, case: transformedCase });
  } catch (error) {
    logger.error('Failed to fetch case details:', error);
    return NextResponse.json({ error: 'Failed to fetch case details' }, { status: 500 });
  }
}
