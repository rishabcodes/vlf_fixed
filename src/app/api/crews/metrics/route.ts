import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { CrewCoordinator } from '@/lib/crewai/enhanced-crew-coordinator';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { withDatabaseTracing } from '@/lib/telemetry/api-middleware';

interface AgentMetric {
  agentName: string;
  totalExecutions: number;
  successRate: number;
  averageDuration: number;
  errorRate: number;
  lastExecution?: Date;
}

interface SystemMetric {
  parallelProcessing: boolean;
  communicationChannels: number;
  memoryEntries: number;
  activeWorkflows: number;
  totalAgents: number;
}

async function handleGET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '24h';
    const agentName = searchParams.get('agent');

    const prisma = getPrismaClient();
    const crewCoordinator = CrewCoordinator.getInstance();

    // Calculate time filter
    const timeFilter = new Date();
    switch (timeRange) {
      case '1h':
        timeFilter.setHours(timeFilter.getHours() - 1);
        break;
      case '6h':
        timeFilter.setHours(timeFilter.getHours() - 6);
        break;
      case '24h':
        timeFilter.setHours(timeFilter.getHours() - 24);
        break;
      case '7d':
        timeFilter.setDate(timeFilter.getDate() - 7);
        break;
      case '30d':
        timeFilter.setDate(timeFilter.getDate() - 30);
        break;
      default:
        timeFilter.setHours(timeFilter.getHours() - 24);
    }

    // Build where clause
    const whereClause: {
      createdAt: { gte: Date };
      agentName?: { contains: string; mode: 'insensitive' };
    } = {
      createdAt: {
        gte: timeFilter,
      },
    };

    if (agentName) {
      whereClause.agentName = {
        contains: agentName,
        mode: 'insensitive',
      };
    }

    // Get performance metrics
    const performanceData = await prisma.agentExecutionLog.groupBy({
      by: ['agentName'],
      where: whereClause,
      _count: {
        _all: true,
      },
      _avg: {
        duration: true,
      },
    });

    // Get success rate data
    const successData = await prisma.agentExecutionLog.groupBy({
      by: ['agentName', 'success'],
      where: whereClause,
      _count: {
        _all: true,
      },
    });

    // Get hourly execution data for charts
    const hourlyData = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('hour', "createdAt") as hour,
        "agentName",
        COUNT(*) as executions,
        COUNT(CASE WHEN success = true THEN 1 END) as successful,
        AVG(duration) as avg_duration
      FROM "AgentExecutionLog"
      WHERE "createdAt" >= ${timeFilter}
      GROUP BY DATE_TRUNC('hour', "createdAt"), "agentName"
      ORDER BY hour DESC
    `;

    // Process agent metrics
    const agentMetrics = performanceData.map(agent => {
      const successStats = successData.filter(s => s.agentName === agent.agentName);
      const totalExecutions = successStats.reduce((sum, s) => sum + s._count._all, 0);
      const successfulExecutions = successStats.find(s => s.success)?._count._all || 0;

      return {
        agentName: agent.agentName,
        totalExecutions: totalExecutions,
        successfulExecutions: successfulExecutions,
        failedExecutions: totalExecutions - successfulExecutions,
        successRate: totalExecutions > 0 ? successfulExecutions / totalExecutions : 0,
        errorRate:
          totalExecutions > 0 ? (totalExecutions - successfulExecutions) / totalExecutions : 0,
        averageDuration: agent._avg.duration || 0,
        lastActivity: new Date(), // Would get from actual data
      };
    });

    // Get system metrics
    const systemMetrics = crewCoordinator.getSystemStatus();

    // Calculate trends
    const previousTimeFilter = new Date(timeFilter);
    switch (timeRange) {
      case '1h':
        previousTimeFilter.setHours(previousTimeFilter.getHours() - 1);
        break;
      case '6h':
        previousTimeFilter.setHours(previousTimeFilter.getHours() - 6);
        break;
      case '24h':
        previousTimeFilter.setHours(previousTimeFilter.getHours() - 24);
        break;
      case '7d':
        previousTimeFilter.setDate(previousTimeFilter.getDate() - 7);
        break;
      case '30d':
        previousTimeFilter.setDate(previousTimeFilter.getDate() - 30);
        break;
    }

    const previousPeriodData = await prisma.agentExecutionLog.groupBy({
      by: ['agentName'],
      where: {
        createdAt: {
          gte: previousTimeFilter,
          lt: timeFilter,
        },
      },
      _count: {
        _all: true,
      },
      _avg: {
        duration: true,
      },
    });

    // Calculate performance trends
    const trends = agentMetrics.map(current => {
      const previous = previousPeriodData.find(p => p.agentName === current.agentName);
      const previousExecutions = previous?._count._all || 0;
      const previousDuration = previous?._avg.duration || 0;

      return {
        agentName: current.agentName,
        executionTrend:
          previousExecutions > 0
            ? ((current.totalExecutions - previousExecutions) / previousExecutions) * 100
            : 0,
        performanceTrend:
          previousDuration > 0
            ? ((previousDuration - current.averageDuration) / previousDuration) * 100
            : 0,
      };
    });

    // Get top performing agents
    const topPerformers = agentMetrics
      .filter(a => a.totalExecutions > 0)
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);

    // Get most active agents
    const mostActive = agentMetrics
      .sort((a, b) => b.totalExecutions - a.totalExecutions)
      .slice(0, 5);

    // Calculate system health score
    const totalExecutions = agentMetrics.reduce((sum, a) => sum + a.totalExecutions, 0);
    const totalSuccessful = agentMetrics.reduce((sum, a) => sum + a.successfulExecutions, 0);
    const overallSuccessRate = totalExecutions > 0 ? totalSuccessful / totalExecutions : 0;
    const averageResponseTime =
      agentMetrics.reduce((sum, a) => sum + a.averageDuration, 0) / agentMetrics.length;

    const healthScore = Math.round(
      overallSuccessRate * 50 + // 50% weight for success rate
        Math.min(systemMetrics.totalAgents / 16, 1) * 25 + // 25% weight for agent availability
        Math.max(0, 1 - averageResponseTime / 10000) * 25 // 25% weight for response time
    );

    // Get error distribution
    const errorData = await prisma.agentExecutionLog.groupBy({
      by: ['error'],
      where: {
        ...whereClause,
        success: false,
        error: {
          not: null,
        },
      },
      _count: {
        _all: true,
      },
    });

    const response = {
      timeRange,
      timestamp: new Date().toISOString(),
      systemHealth: {
        healthScore,
        status:
          healthScore > 80
            ? 'excellent'
            : healthScore > 60
              ? 'good'
              : healthScore > 40
                ? 'warning'
                : 'critical',
        uptime: Math.round(process.uptime()),
        ...systemMetrics,
      },
      performance: {
        totalExecutions,
        successfulExecutions: totalSuccessful,
        failedExecutions: totalExecutions - totalSuccessful,
        overallSuccessRate,
        averageResponseTime,
        activeAgents: agentMetrics.filter(a => a.totalExecutions > 0).length,
        trends: {
          executionVolumeChange:
            trends.reduce((sum, t) => sum + t.executionTrend, 0) / trends.length,
          performanceChange: trends.reduce((sum, t) => sum + t.performanceTrend, 0) / trends.length,
        },
      },
      agents: agentMetrics,
      insights: {
        topPerformers,
        mostActive,
        trends,
        errorDistribution: errorData.map(e => ({
          error: e.error,
          count: e._count._all,
          percentage: (e._count._all / (totalExecutions - totalSuccessful)) * 100,
        })),
      },
      charts: {
        hourlyExecutions: hourlyData,
        successRateByAgent: agentMetrics.map(a => ({
          agent: a.agentName,
          successRate: a.successRate,
          totalExecutions: a.totalExecutions,
        })),
        responseTimeByAgent: agentMetrics.map(a => ({
          agent: a.agentName,
          averageResponseTime: a.averageDuration,
          totalExecutions: a.totalExecutions,
        })),
      },
      recommendations: generateRecommendations(agentMetrics, systemMetrics, healthScore),
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Failed to get crew metrics:', errorToLogMeta(error));
    return NextResponse.json(
      {
        error: 'Failed to get crew metrics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function generateRecommendations(
  agentMetrics: AgentMetric[],
  systemMetrics: SystemMetric,
  healthScore: number
): string[] {
  const recommendations: string[] = [];

  // Check for low-performing agents
  const lowPerformers = agentMetrics.filter(a => a.successRate < 0.8 && a.totalExecutions > 10);
  if (lowPerformers.length > 0) {
    recommendations.push(
      `Consider investigating ${lowPerformers.length} agents with success rates below 80%`
    );
  }

  // Check for slow agents
  const slowAgents = agentMetrics.filter(a => a.averageDuration > 5000); // 5 seconds
  if (slowAgents.length > 0) {
    recommendations.push(
      `${slowAgents.length} agents have response times over 5 seconds - consider optimization`
    );
  }

  // Check system health
  if (healthScore < 60) {
    recommendations.push('System health is below optimal - recommend immediate attention');
  }

  // Check agent availability
  const activeAgents = agentMetrics.filter(a => a.totalExecutions > 0).length;
  const totalAgents = agentMetrics.length;
  if (activeAgents < totalAgents * 0.8) {
    recommendations.push(
      'Less than 80% of agents are active - consider restarting inactive agents'
    );
  }

  // Check for memory usage
  const memoryUsage = process.memoryUsage();
  if (memoryUsage.heapUsed / memoryUsage.heapTotal > 0.9) {
    recommendations.push('Memory usage is high - consider garbage collection or scaling');
  }

  // If no issues found
  if (recommendations.length === 0) {
    recommendations.push('System is operating optimally - no immediate action required');
  }

  return recommendations;
}

export const GET = withDatabaseTracing(handleGET);
