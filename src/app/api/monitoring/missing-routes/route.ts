import { NextResponse } from 'next/server';
import { getMissingRoutes } from '@/lib/route-logger';

export async function GET() {
  try {
    const missingRoutes = getMissingRoutes();

    return NextResponse.json({
      success: true,
      count: missingRoutes.length,
      routes: missingRoutes.sort(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve missing routes',
      },
      { status: 500 }
    );
  }
}
