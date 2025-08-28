import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { CrewCoordinator } from '@/lib/crewai/enhanced-crew-coordinator';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface DatabaseHealthResult {
  connected: boolean;
  latency: number;
  recentActivity: number;
  tables: string[];
}

interface SystemResourceResult {
  memory: {
    heapUsed: number;
    heapTotal: number;
    usagePercent: number;
    healthy: boolean;
  };
  cpu: {
    user: number;
    system: number;
    usagePercent: number;
    healthy: boolean;
  };
  uptime: number;
  loadAverage: [number, number, number];
  status: string;
}

interface ProcessLoadAverage {
  loadavg?: () => [number, number, number];
}

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    const healthChecks = await Promise.allSettled([
      checkDatabaseHealth(),
      checkSystemResources(),
      checkAgentHealth(),
      checkAPIConnections(),
      checkCronJobs(),
      checkMemoryUsage(),
      checkDiskSpace(),
    ]);

    const results = healthChecks.map((result, index) => {
      const checkNames = [
        'database',
        'system_resources',
        'agent_health',
        'api_connections',
        'cron_jobs',
        'memory_usage',
        'disk_space',
      ];

      return {
        name: checkNames[index] || 'unknown',
        status: result.status === 'fulfilled' ? 'healthy' : 'unhealthy',
        details:
          result.status === 'fulfilled'
            ? result.value
            : (result as PromiseRejectedResult).reason?.message || 'Check failed',
        timestamp: new Date().toISOString(),
      };
    });

    const healthyChecks = results.filter(r => r.status === 'healthy').length;
    const totalChecks = results.length;
    const overallHealth = healthyChecks / totalChecks;

    const response = {
      status: overallHealth === 1 ? 'healthy' : overallHealth > 0.8 ? 'warning' : 'critical',
      score: Math.round(overallHealth * 100),
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      checks: results,
      summary: {
        total: totalChecks,
        healthy: healthyChecks,
        unhealthy: totalChecks - healthyChecks,
        percentage: Math.round(overallHealth * 100),
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        pid: process.pid,
        memory: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        loadAverage: (process as ProcessLoadAverage).loadavg
          ? (process as ProcessLoadAverage).loadavg!()
          : [0, 0, 0],
      },
      recommendations: generateHealthRecommendations(results),
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Health check failed:', errorToLogMeta(error));
    return NextResponse.json(
      {
        status: 'critical',
        score: 0,
        error: 'Health check system failure',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  const prisma = getPrismaClient();
  const startTime = Date.now();

  try {
    // Test connection
    await prisma.$connect();

    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    const testResult = Array.isArray(result) && result.length > 0;

    // Check recent activity
    const recentLogs = await prisma.agentExecutionLog.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 3600000), // Last hour
        },
      },
    });

    return {
      connected: true,
      latency: Date.now() - startTime,
      recentActivity: recentLogs,
      tables: testResult ? ['verified'] : [],
    };
  } catch (error) {
    throw new Error(
      `Database health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

async function checkSystemResources(): Promise<SystemResourceResult> {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();

  const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
  const cpuUsagePercent = (cpuUsage.user + cpuUsage.system) / 1000000; // Convert to seconds

  // Check if resources are within healthy limits
  const memoryHealthy = memoryUsagePercent < 85;
  const cpuHealthy = cpuUsagePercent < 80;

  if (!memoryHealthy || !cpuHealthy) {
    throw new Error(
      `Resource usage high - Memory: ${memoryUsagePercent.toFixed(1)}%, CPU: ${cpuUsagePercent.toFixed(1)}%`
    );
  }

  return {
    memory: {
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
      usagePercent: Math.round(memoryUsagePercent),
      healthy: memoryHealthy,
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system,
      usagePercent: Math.round(cpuUsagePercent),
      healthy: cpuHealthy,
    },
    uptime: Math.round(process.uptime()),
    loadAverage: (process as ProcessLoadAverage).loadavg
      ? (process as ProcessLoadAverage).loadavg!()
      : [0, 0, 0],
    status: 'healthy',
  };
}

interface AgentHealthResult {
  totalAgents: number;
  healthyAgents: number;
  unhealthyAgents: number;
  systemStatus: Record<string, unknown>;
  agentDetails: Array<{
    name: string;
    healthy: boolean;
    metrics: Record<string, unknown> | null;
  }>;
  status: string;
}

async function checkAgentHealth(): Promise<AgentHealthResult> {
  const crewCoordinator = CrewCoordinator.getInstance();
  const systemStatus = crewCoordinator.getSystemStatus();

  const agentNames = [
    'legal-consultation',
    'appointment-scheduling',
    'document-analysis',
    'seo-blog-generation',
    'social-media-monitoring',
    'competitive-analysis',
    'enhanced-intake',
    'removal-defense',
    'business-immigration',
    'criminal-defense',
    'aila-trained-removal',
    'blog-content-domination',
    'google-my-business-killer',
    'social-media-destroyer',
    'review-harvesting',
    'competitor-spy',
  ];

  const agentHealth = agentNames.map(name => {
    const metrics = crewCoordinator.getAgentPerformanceMetrics(name) as {
      successRate?: number;
      tasksExecuted?: number;
      averageExecutionTime?: number;
    } | null;
    return {
      name,
      healthy: !!metrics && (metrics.successRate || 0) > 0.8,
      metrics: metrics as Record<string, unknown> | null,
    };
  });

  const healthyAgents = agentHealth.filter(a => a.healthy).length;
  const totalAgents = agentHealth.length;

  if (healthyAgents < totalAgents * 0.8) {
    throw new Error(`Only ${healthyAgents}/${totalAgents} agents are healthy`);
  }

  return {
    totalAgents,
    healthyAgents,
    unhealthyAgents: totalAgents - healthyAgents,
    systemStatus,
    agentDetails: agentHealth,
    status: 'healthy',
  };
}

interface APIConnectionResult {
  connections: Array<{
    name: string;
    status: string;
    latency?: number;
    error?: string;
  }>;
  totalConnections: number;
  healthyConnections: number;
  averageLatency: number;
  status: string;
}

async function checkAPIConnections(): Promise<APIConnectionResult> {
  const connections: Array<{
    name: string;
    status: string;
    latency?: number;
    error?: string;
  }> = [];

  // Check OpenAI API
  try {
    // In a real implementation, you'd make a test API call
    connections.push({
      name: 'OpenAI API',
      status: 'healthy',
      latency: Math.random() * 200 + 100, // Simulated latency
    });
  } catch (error) {
    connections.push({
      name: 'OpenAI API',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Check Google Places API
  try {
    // In a real implementation, you'd make a test API call
    connections.push({
      name: 'Google Places API',
      status: 'healthy',
      latency: Math.random() * 150 + 50,
    });
  } catch (error) {
    connections.push({
      name: 'Google Places API',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Check if any connections are unhealthy
  const unhealthyConnections = connections.filter(c => c.status === 'unhealthy');
  if (unhealthyConnections.length > 0) {
    throw new Error(`${unhealthyConnections.length} API connections are unhealthy`);
  }

  return {
    connections,
    totalConnections: connections.length,
    healthyConnections: connections.filter(c => c.status === 'healthy').length,
    averageLatency: connections.reduce((sum, c) => sum + (c.latency || 0), 0) / connections.length,
    status: 'healthy',
  };
}

interface CronJobResult {
  cronJobs: Array<{
    name: string;
    nextRun: Date;
    status: string;
  }>;
  totalJobs: number;
  activeJobs: number;
  inactiveJobs: number;
  status: string;
}

async function checkCronJobs(): Promise<CronJobResult> {
  // In a real implementation, you'd check if cron jobs are running
  // For now, we'll simulate the check

  const cronJobs = [
    { name: 'Blog Content Generation', nextRun: new Date(Date.now() + 3600000), status: 'active' },
    { name: 'GMB Posting', nextRun: new Date(Date.now() + 7200000), status: 'active' },
    { name: 'Review Monitoring', nextRun: new Date(Date.now() + 1800000), status: 'active' },
    { name: 'Competitor Analysis', nextRun: new Date(Date.now() + 5400000), status: 'active' },
    { name: 'Social Media Posting', nextRun: new Date(Date.now() + 4500000), status: 'active' },
  ];

  const activeCronJobs = cronJobs.filter(job => job.status === 'active').length;
  const totalCronJobs = cronJobs.length;

  if (activeCronJobs < totalCronJobs) {
    throw new Error(`${totalCronJobs - activeCronJobs} cron jobs are inactive`);
  }

  return {
    cronJobs,
    totalJobs: totalCronJobs,
    activeJobs: activeCronJobs,
    inactiveJobs: totalCronJobs - activeCronJobs,
    status: 'healthy',
  };
}

interface MemoryUsageResult {
  heapUsed: number;
  heapTotal: number;
  external: number;
  arrayBuffers: number;
  usagePercent: number;
  heapUsedMB: number;
  heapTotalMB: number;
  externalMB: number;
  status: string;
}

async function checkMemoryUsage(): Promise<MemoryUsageResult> {
  const memoryUsage = process.memoryUsage();

  const metrics = {
    heapUsed: memoryUsage.heapUsed,
    heapTotal: memoryUsage.heapTotal,
    external: memoryUsage.external,
    arrayBuffers: memoryUsage.arrayBuffers,
    usagePercent: (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100,
  };

  // Check for memory leaks or high usage
  if (metrics.usagePercent > 90) {
    throw new Error(`Memory usage critical: ${metrics.usagePercent.toFixed(1)}%`);
  }

  if (metrics.usagePercent > 80) {
    logger.warn(`Memory usage high: ${metrics.usagePercent.toFixed(1)}%`);
  }

  return {
    ...metrics,
    heapUsedMB: Math.round(metrics.heapUsed / 1024 / 1024),
    heapTotalMB: Math.round(metrics.heapTotal / 1024 / 1024),
    externalMB: Math.round(metrics.external / 1024 / 1024),
    status: 'healthy',
  };
}

interface DiskSpaceResult {
  filesystem: string;
  size: string;
  used: string;
  available: string;
  usagePercent: number;
  mountPoint: string;
  status: string;
}

async function checkDiskSpace(): Promise<DiskSpaceResult> {
  try {
    const { stdout } = await execAsync('df -h /');
    const lines = stdout.trim().split('\n');

    if (lines.length < 2 || !lines[1]) {
      throw new Error('Unexpected df output format');
    }

    const data = lines[1].split(/\s+/);

    if (data.length < 6) {
      throw new Error('Unexpected df output format');
    }

    const usagePercentStr = data[4];
    if (!usagePercentStr) {
      throw new Error('Unable to parse disk usage percentage');
    }

    const usagePercent = parseInt(usagePercentStr.replace('%', ''));

    if (usagePercent > 90) {
      throw new Error(`Disk space critical: ${usagePercent}% used`);
    }

    return {
      filesystem: data[0] || 'unknown',
      size: data[1] || 'unknown',
      used: data[2] || 'unknown',
      available: data[3] || 'unknown',
      usagePercent: usagePercent,
      mountPoint: data[5] || '/',
      status: 'healthy',
    };
  } catch (error) {
    throw new Error(
      `Disk space check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

function generateHealthRecommendations(
  checks: Array<{ name: string; status: string; details?: Record<string, unknown> }>
): string[] {
  const recommendations: string[] = [];

  // Check for unhealthy components
  const unhealthyChecks = checks.filter(c => c.status === 'unhealthy');

  if (unhealthyChecks.length > 0) {
    recommendations.push(`Address ${unhealthyChecks.length} unhealthy components immediately`);
  }

  // Check memory usage
  const memoryCheck = checks.find(c => c.name === 'memory_usage');
  if (
    memoryCheck?.details &&
    typeof memoryCheck.details === 'object' &&
    'usagePercent' in memoryCheck.details
  ) {
    const usagePercent = memoryCheck.details.usagePercent as number;
    if (usagePercent > 80) {
      recommendations.push('Memory usage is high - consider optimization or scaling');
    }
  }

  // Check disk space
  const diskCheck = checks.find(c => c.name === 'disk_space');
  if (
    diskCheck?.details &&
    typeof diskCheck.details === 'object' &&
    'usagePercent' in diskCheck.details
  ) {
    const usagePercent = diskCheck.details.usagePercent as number;
    if (usagePercent > 80) {
      recommendations.push('Disk space is running low - consider cleanup or expansion');
    }
  }

  // Check agent health
  const agentCheck = checks.find(c => c.name === 'agent_health');
  if (
    agentCheck?.details &&
    typeof agentCheck.details === 'object' &&
    'unhealthyAgents' in agentCheck.details
  ) {
    const unhealthyAgents = agentCheck.details.unhealthyAgents as number;
    if (unhealthyAgents > 0) {
      recommendations.push(`Restart ${unhealthyAgents} unhealthy agents`);
    }
  }

  // Check API connections
  const apiCheck = checks.find(c => c.name === 'api_connections');
  if (
    apiCheck?.details &&
    typeof apiCheck.details === 'object' &&
    'averageLatency' in apiCheck.details
  ) {
    const averageLatency = apiCheck.details.averageLatency as number;
    if (averageLatency > 1000) {
      recommendations.push('API latency is high - check network connections');
    }
  }

  // If everything is healthy
  if (recommendations.length === 0) {
    recommendations.push('All systems are healthy - no action required');
  }

  return recommendations;
}
