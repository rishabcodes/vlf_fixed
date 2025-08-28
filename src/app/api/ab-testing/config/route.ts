import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';

// Force dynamic rendering
// GET /api/ab-testing/config - Get A/B testing configuration
export async function GET(_request: NextRequest) {
  try {
    // Return current A/B testing configuration
    const config = await abTestEngine.getActiveTests();

    return NextResponse.json({
      success: true,
      config,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Failed to get A/B testing config:', error);
    return NextResponse.json({ error: 'Failed to get A/B testing configuration' }, { status: 500 });
  }
}
