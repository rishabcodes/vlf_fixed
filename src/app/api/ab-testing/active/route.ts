import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import { abTestEngine } from '@/lib/ab-testing/ab-test-engine';

// GET /api/ab-testing/active - Get all active A/B tests
export async function GET(_request: NextRequest) {
  try {
    const activeTests = await abTestEngine.getActiveTests();

    // Return minimal data for client-side consumption
    const tests = activeTests.map(test => ({
      id: test.id,
      name: test.name,
      status: test.status,
    }));

    return NextResponse.json({
      success: true,
      tests,
    });
  } catch (error) {
    logger.error('Failed to get active A/B tests:', error);
    return NextResponse.json({ error: 'Failed to get active tests' }, { status: 500 });
  }
}
