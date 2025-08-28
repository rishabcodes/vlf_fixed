import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { caseManagement } from '@/services/case-management';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { UserRole } from '@prisma/client';
import { getPrismaClient } from '@/lib/prisma';

export const runtime = 'nodejs';
export async function GET(req: NextRequest, { params }: { params: { caseId: string } }) {
  try {
    const { caseId } = params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to this case
    const hasAccess = await checkCaseAccess(caseId, session.user.id, session.user.role as UserRole);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const userRole = session.user.role as UserRole;
    const includePrivate =
      userRole === UserRole.ATTORNEY ||
      userRole === UserRole.PARALEGAL ||
      userRole === UserRole.ADMIN;
    const caseDetails = await caseManagement.getCaseDetails(caseId, includePrivate);

    return NextResponse.json({ case: caseDetails });
  } catch (error) {
    logger.error('Error fetching case details', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to fetch case details' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { caseId: string } }) {
  try {
    const { caseId } = params;
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

    const updatedCase = await caseManagement.updateCase(caseId, data);

    return NextResponse.json({ case: updatedCase });
  } catch (error) {
    logger.error('Error updating case', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { caseId: string } }) {
  try {
    const { caseId } = params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can delete cases
    if (session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Archive instead of delete
    await getPrismaClient().case.update({
      where: { id: caseId },
      data: { status: 'archived' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error archiving case', errorToLogMeta(error));
    return NextResponse.json({ error: 'Failed to archive case' }, { status: 500 });
  }
}

async function checkCaseAccess(caseId: string, userId: string, role: UserRole): Promise<boolean> {
  // Admins have access to all cases
  if (role === UserRole.ADMIN) return true;

  const caseData = await getPrismaClient().case.findUnique({
    where: { id: caseId },
    select: {
      clientId: true,
      attorneyId: true,
    },
  });

  if (!caseData) return false;

  // Clients can only see their own cases
  if (role === UserRole.CLIENT) {
    return caseData.clientId === userId;
  }

  // Attorneys and paralegals can see cases they're assigned to
  if ([UserRole.ATTORNEY, UserRole.PARALEGAL].includes(role)) {
    return caseData.attorneyId === userId;
  }

  return false;
}
