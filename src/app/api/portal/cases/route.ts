import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';
import { Prisma, PracticeArea, CaseStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const statusParams: string[] = searchParams.get('status')?.split(',') || [];
    const practiceArea = searchParams.get('practiceArea');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: Prisma.CaseWhereInput = {
      clientId: session.user.id,
    };

    if (statusParams.length > 0) {
      // Validate that all statuses are valid CaseStatus values
      const validStatuses = statusParams.filter((s): s is CaseStatus =>
        Object.values(CaseStatus).includes(s as CaseStatus)
      );
      if (validStatuses.length > 0) {
        where.status = { in: validStatuses };
      }
    }

    if (practiceArea && Object.values(PracticeArea).includes(practiceArea as PracticeArea)) {
      where.practiceArea = practiceArea as PracticeArea;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const cases = await prisma.case.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        attorney: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            documents: true,
          },
        },
      },
    });

    // Define metadata type
    interface CaseMetadata {
      title?: string;
      priority?: string;
    }

    // Transform the data
    const transformedCases = cases.map(c => {
      const metadata = (c.metadata as CaseMetadata) || {};
      return {
        id: c.id,
        caseNumber: c.caseNumber,
        title: metadata.title || `Case ${c.caseNumber}`,
        practiceArea: c.practiceArea,
        status: c.status,
        priority: metadata.priority || 'normal',
        attorney: c.attorney
          ? {
              name: c.attorney.name,
              email: c.attorney.email,
            }
          : null,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        unreadMessages: 0, // TODO: Implement when CaseMessage model is added
        documentCount: c._count.documents,
        lastActivity: c.updatedAt,
      };
    });

    return NextResponse.json({ success: true, cases: transformedCases });
  } catch (error) {
    logger.error('Failed to fetch cases:', error);
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}
