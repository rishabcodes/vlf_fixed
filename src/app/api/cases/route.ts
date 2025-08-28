import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { caseManagement } from '@/services/case-management';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { UserRole, PracticeArea, CaseStatus } from '@prisma/client';

export const runtime = 'nodejs';
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions
    const userRole = session.user.role as UserRole;
    if (
      userRole !== UserRole.ATTORNEY &&
      userRole !== UserRole.PARALEGAL &&
      userRole !== UserRole.ADMIN
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const practiceArea = searchParams.get('practiceArea');
    const status = searchParams.get('status');
    const attorneyId = searchParams.get('attorneyId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const filters: {
      practiceArea?: PracticeArea;
      status?: CaseStatus;
      attorneyId?: string;
      dateRange?: {
        start: Date;
        end: Date;
      };
    } = {};
    if (practiceArea) filters.practiceArea = practiceArea as PracticeArea;
    if (status) filters.status = status as CaseStatus;
    if (attorneyId) filters.attorneyId = attorneyId;
    if (startDate && endDate) {
      filters.dateRange = {
        start: new Date(startDate),
        end: new Date(endDate),
      };
    }

    const cases = await caseManagement.searchCases(query, filters);

    return NextResponse.json({ cases });
  } catch (error) {
    logger.error('Error fetching cases', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check permissions
    const userRole = session.user.role as UserRole;
    if (
      userRole !== UserRole.ATTORNEY &&
      userRole !== UserRole.PARALEGAL &&
      userRole !== UserRole.ADMIN
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    const newCase = await caseManagement.createCase(data);

    return NextResponse.json({ case: newCase }, { status: 201 });
  } catch (error) {
    logger.error('Error creating case', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}
