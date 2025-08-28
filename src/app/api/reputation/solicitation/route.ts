import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { reviewSolicitation } from '@/services/reputation-management/review-solicitation';
import { z } from 'zod';

// POST /api/reputation/solicitation/trigger - Trigger review solicitation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const schema = z.object({
      type: z.string(),
      clientId: z.string(),
      data: z.object({
        caseOutcome: z.string().optional(),
        satisfaction: z.number().optional(),
        practiceArea: z.string().optional(),
        attorneyName: z.string().optional(),
        consultationType: z.string().optional(),
        milestone: z.string().optional(),
      }),
    });

    const validatedData = schema.parse(body);

    // Process trigger
    await reviewSolicitation.processTrigger({
      type: validatedData.type,
      data: {
        client: {
          id: validatedData.clientId,
          name: 'Client Name', // Would fetch from database
          email: 'client@email.com', // Would fetch from database
        },
        ...validatedData.data,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Review solicitation triggered',
    });
  } catch (error) {
    logger.error('Failed to trigger review solicitation:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to trigger solicitation' },
      { status: 500 }
    );
  }
}

// PUT /api/reputation/solicitation/opt-out - Opt out client
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { clientId, reason } = body;

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    await reviewSolicitation.optOutClient(clientId, reason);

    return NextResponse.json({ 
      success: true, 
      message: 'Client opted out successfully',
    });
  } catch (error) {
    logger.error('Failed to opt out client:', error);
    return NextResponse.json(
      { error: 'Failed to opt out client' },
      { status: 500 }
    );
  }
}

// GET /api/reputation/solicitation/performance - Get campaign performance
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.role?.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const campaignId = searchParams.get('campaignId');

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    const performance = await reviewSolicitation.getCampaignPerformance(campaignId);

    return NextResponse.json({ success: true, performance });
  } catch (error) {
    logger.error('Failed to get campaign performance:', error);
    return NextResponse.json(
      { error: 'Failed to get performance data' },
      { status: 500 }
    );
  }
}
