import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { complianceTracker } from '@/services/security/compliance-tracker';
import { z } from 'zod';

// GET /api/security/compliance - Get compliance status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const frameworkId = searchParams.get('framework');

    if (frameworkId) {
      // Get specific framework compliance report
      const report = await complianceTracker.runComplianceCheck(frameworkId);
      return NextResponse.json({ success: true, report });
    } else {
      // Get overall compliance status
      const status = await complianceTracker.getComplianceStatus();
      return NextResponse.json({ success: true, status });
    }
  } catch (error) {
    logger.error('Failed to get compliance status:', error);
    return NextResponse.json(
      { error: 'Failed to get compliance status' },
      { status: 500 }
    );
  }
}

// POST /api/security/compliance/audit - Run compliance audit
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const schema = z.object({
      framework: z.string(),
      auditType: z.enum(['full', 'quick', 'specific']).default('full'),
      requirements: z.array(z.string()).optional(),
    });

    const validatedData = schema.parse(body);

    // Run compliance audit
    const report = await complianceTracker.runComplianceCheck(validatedData.framework);

    return NextResponse.json({ 
      success: true, 
      report,
      message: 'Compliance audit completed',
    });
  } catch (error) {
    logger.error('Failed to run compliance audit:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to run compliance audit' },
      { status: 500 }
    );
  }
}
