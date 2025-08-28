import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import { requestLogger } from '@/lib/safe-logger';
import { getChatSocketServer } from '@/lib/socket';

export async function GET(request: NextRequest) {
  const requestId = requestLogger.request(request.url, 'GET');

  try {
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || 'today';

    // Calculate date range
    const now = new Date();
    const startDate = new Date();

    switch (range) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
    }

    // Fetch metrics in parallel
    const [activeCalls, todaysCalls, callAnalyses, conversations, tasks] = await Promise.all([
      // Active calls
      getPrismaClient().call.count({
        where: { status: 'active' },
      }),

      // Today's calls
      getPrismaClient().call.count({
        where: {
          startedAt: { gte: startDate },
        },
      }),

      // Call analyses for sentiment
      getPrismaClient().callAnalysis.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        select: {
          sentiment: true,
          extractedInfo: true,
        },
      }),

      // Active conversations
      getPrismaClient().conversation.count({
        where: { status: 'active' },
      }),

      // Recent tasks
      getPrismaClient().task.groupBy({
        by: ['type'],
        _count: true,
        where: {
          createdAt: { gte: startDate },
        },
        orderBy: {
          _count: {
            type: 'desc',
          },
        },
        take: 5,
      }),
    ]);

    // Calculate average call duration
    const avgDurationResult = await getPrismaClient().call.aggregate({
      where: {
        startedAt: { gte: startDate },
        duration: { not: null },
      },
      _avg: {
        duration: true,
      },
    });

    // Process sentiment data
    const sentimentCounts = callAnalyses.reduce(
      (acc, analysis) => {
        const sentiment = analysis.sentiment || 'neutral';
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Extract top issues from call analyses
    const issueMap = new Map<string, number>();
    callAnalyses.forEach(analysis => {
      const extractedInfo = analysis.extractedInfo as { issue?: string } | null;
      if (extractedInfo?.issue) {
        const count = issueMap.get(extractedInfo.issue) || 0;
        issueMap.set(extractedInfo.issue, count + 1);
      }
    });

    const topIssues = Array.from(issueMap.entries())
      .map(([issue, count]) => ({ issue, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Mock agent performance data (in real app, this would come from aggregated data)
    const agentPerformance = [
      {
        agentId: 'agent_immigration',
        callsHandled: Math.floor(todaysCalls * 0.4),
        avgDuration: 8.5,
        satisfaction: 92,
      },
      {
        agentId: 'agent_personal_injury',
        callsHandled: Math.floor(todaysCalls * 0.3),
        avgDuration: 12.3,
        satisfaction: 88,
      },
      {
        agentId: 'agent_general',
        callsHandled: Math.floor(todaysCalls * 0.3),
        avgDuration: 6.7,
        satisfaction: 95,
      },
    ];

    // Get active chats from socket server (if available)
    let activeChats = conversations;
    try {
      const socketServer = getChatSocketServer();
      activeChats = socketServer.getActiveSessionsCount();
    } catch (error) {
      // Socket server might not be initialized in this context
      apiLogger.info('Socket server not available');
    }

    const metrics = {
      activeChats,
      activeCalls,
      todaysCalls,
      avgCallDuration: (avgDurationResult._avg.duration || 0) / 60, // Convert to minutes
      sentimentBreakdown: {
        positive: sentimentCounts.positive || 0,
        neutral: sentimentCounts.neutral || 0,
        negative: sentimentCounts.negative || 0,
      },
      topIssues,
      agentPerformance,
      taskBreakdown: tasks.map(t => ({
        type: t.type,
        count: t._count,
      })),
    };

    requestLogger.response(requestId, 200, Date.now());
    return NextResponse.json(metrics);
  } catch (error) {
    requestLogger.error(requestId, error);
    requestLogger.response(requestId, 500, Date.now() - Date.now());
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
