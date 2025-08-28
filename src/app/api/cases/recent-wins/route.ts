import { NextRequest, NextResponse } from 'next/server';

import { apiLogger } from '@/lib/safe-logger';
const mockRecentWins = [
  {
    id: 'win-001',
    title: 'Personal Injury Settlement',
    amount: '$850,000',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    type: 'settlement' as const,
    category: 'Personal Injury',
    description: 'Motor vehicle accident resulting in significant injuries',
  },
  {
    id: 'win-002',
    title: 'Immigration Case Victory',
    amount: 'APPROVED',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    type: 'award' as const,
    category: 'Immigration',
    description: 'Successful asylum application after appeal',
  },
  {
    id: 'win-003',
    title: 'Workers Compensation Award',
    amount: '$425,000',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    type: 'award' as const,
    category: 'Workers Compensation',
    description: 'Construction site injury compensation',
  },
  {
    id: 'win-004',
    title: 'Criminal Charges Dismissed',
    amount: 'DISMISSED',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    type: 'dismissal' as const,
    category: 'Criminal Defense',
    description: 'DWI charges dismissed due to procedural errors',
  },
  {
    id: 'win-005',
    title: 'Family Law Settlement',
    amount: 'FAVORABLE',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    type: 'settlement' as const,
    category: 'Family Law',
    description: 'Child custody agreement reached',
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '5');
    const category = searchParams.get('category');

    let filteredWins = mockRecentWins;

    if (category) {
      filteredWins = mockRecentWins.filter(
        win => win.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort by date (most recent first) and limit results
    const recentWins = filteredWins
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return NextResponse.json(recentWins);
  } catch (error) {
    apiLogger.error('Recent wins API error:', error);
    return NextResponse.json({ error: 'Failed to fetch recent wins' }, { status: 500 });
  }
}
