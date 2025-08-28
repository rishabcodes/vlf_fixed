// Crew log types for the logs API
export interface CrewLog {
  id: string;
  agentName: string;
  executionType: string;
  status: 'success' | 'failure';
  timestamp: Date;
  duration: number;
  input: unknown;
  output: unknown;
  error?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface CrewLogFilters {
  agent?: string;
  timeRange?: '1h' | '6h' | '24h' | '7d' | '30d';
  status?: 'success' | 'failure';
  executionType?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface CrewLogAnalytics {
  successRate: number;
  averageDuration: string;
  executionTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  errorDistribution: Array<{
    error: string;
    count: number;
  }>;
  agentActivity: Array<{
    agent: string;
    totalExecutions: number;
    successCount: number;
    failureCount: number;
    averageDuration: string;
  }>;
}

export interface CrewLogsResponse {
  logs: CrewLog[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  analytics: CrewLogAnalytics;
}

export interface CrewLogAction {
  action: 'delete' | 'export' | 'cleanup';
  logIds?: string[];
}

export interface CrewMetrics {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  activeAgents: number;
  queuedTasks: number;
  lastExecutionTime?: Date;
}

export interface CrewAgentStatus {
  name: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  lastActivity?: Date;
  currentTask?: string;
  metrics: {
    successRate: number;
    averageExecutionTime: number;
    totalExecutions: number;
  };
}

export interface CrewSystemStatus {
  healthy: boolean;
  agents: CrewAgentStatus[];
  systemMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    uptime: number;
  };
  recentErrors: Array<{
    agent: string;
    error: string;
    timestamp: Date;
  }>;
}
