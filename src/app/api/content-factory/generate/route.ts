import { NextRequest, NextResponse } from 'next/server';
import { contentFactory } from '@/services/content-factory';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/safe-logger';

export const runtime = 'nodejs';
export async function POST(_request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    logger.info('Manual content generation triggered', {
      userId: session.user.id,
      userEmail: session.user.email,
    });

    // Initialize content factory
    await contentFactory.initialize();

    // Run content generation
    const result = await contentFactory.runDailyContentGeneration();

    logger.info('Content generation completed', result);

    return NextResponse.json({
      message: 'Content generation completed successfully',
      ...result,
      success: true,
    });
  } catch (error) {
    logger.error('Content generation failed', { error });

    return NextResponse.json(
      {
        error: 'Content generation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
