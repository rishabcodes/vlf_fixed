// Logger type definitions

export interface LogMeta {
  [key: string]: unknown;
  traceId?: string;
  spanId?: string;
  timestamp?: string;
  requestId?: string;
  component?: string;
  category?: string;
}

export interface Logger {
  error(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  http?(message: string, meta?: LogMeta): void;
  verbose?(message: string, meta?: LogMeta): void;
  debug(message: string, meta?: LogMeta): void;
  silly?(message: string, meta?: LogMeta): void;
}

export interface APILogger {
  request(
    endpoint: string,
    method: string,
    payload?: unknown,
    headers?: Record<string, unknown>
  ): string;
  response(requestId: string, statusCode: number, responseTime: number, data?: unknown): void;
  error(requestId: string, error: unknown, retry?: number): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
}

export interface SecurityLogger {
  accessGranted(resource: string, userId?: string): void;
  accessDenied(resource: string, userId?: string, reason?: string): void;
  authenticationFailure(method: string, identifier?: string, reason?: string): void;
  authenticationSuccess(method: string, userId: string): void;
  suspiciousActivity(activity: string, metadata?: unknown): void;
  ipBlocked?(ipAddress: string, reason: string, duration?: number): void;
  rateLimitExceeded?(identifier: string, limit: number, window: string): void;
}

export interface PerformanceLogger {
  operationStart?(operationName: string, metadata?: LogMeta): string;
  operationEnd?(operationId: string, duration?: number, metadata?: LogMeta): void;
  dbQuery?(query: string, duration: number, metadata?: LogMeta): void;
  apiCall?(
    endpoint: string,
    method: string,
    duration: number,
    statusCode?: number,
    metadata?: LogMeta
  ): void;
  slowOperation(
    operationName: string,
    duration: number,
    threshold: number,
    metadata?: LogMeta
  ): void;
  resourceUsage?(cpu: number, memory: number, metadata?: LogMeta): void;
  measure(operation: string, duration: number, metadata?: unknown): void;
  memoryUsage(): void;
  stateChange(
    componentName: string,
    previousState: unknown,
    newState: unknown,
    trigger: string
  ): void;
  mount(componentName: string, props?: unknown): void;
  unmount(componentName: string): void;
  rerender(componentName: string, reason: string, changes?: unknown): void;
  propChange(componentName: string, propName: string, oldValue: unknown, newValue: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
}

export interface WSLogger {
  connection(clientId: string, metadata?: unknown): void;
  disconnection(clientId: string, reason: string, duration: number): void;
  message(clientId: string, type: string, direction: 'inbound' | 'outbound', size: number): void;
  error(clientId: string, error: unknown): void;
  broadcast?(eventType: string, recipientCount: number, metadata?: LogMeta): void;
  info(clientId: string, message: string): void;
  warn(clientId: string, message: string): void;
}

export interface DBLogger {
  query(query: string, params?: unknown[], duration?: number): void;
  connection(
    status: 'connected' | 'disconnected' | 'error' | 'opened' | 'closed',
    metadata?: unknown
  ): void;
  transaction(transactionId: string, status: 'start' | 'commit' | 'rollback'): void;
  migration(name: string, status: 'start' | 'complete' | 'error' | string, error?: unknown): void;
  error(operation: string, error: unknown): void;
}

export interface ComponentLogger {
  info(component: string, message: string, data?: LogMeta): void;
  error(component: string, error: Error | string, data?: LogMeta): void;
  warn(component: string, message: string, data?: LogMeta): void;
  debug(component: string, message: string, data?: LogMeta): void;
}

// Winston-specific types
export interface WinstonLogInfo {
  level: string;
  message: string;
  [key: string]: unknown;
}

export interface WinstonFormat {
  (info: WinstonLogInfo): WinstonLogInfo;
}
