import { z } from 'zod';

// Security threat schemas
export const ThreatSchema = z.object({
  id: z.string(),
  type: z.string(),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  status: z.enum(['active', 'investigating', 'resolved', 'false_positive']),
  description: z.string(),
  sourceIp: z.string().optional(),
  targetResource: z.string().optional(),
  timestamp: z.date(),
  evidence: z.array(z.string()),
  count: z.number().default(1),
  metadata: z.record(z.any()).optional(),
});

// Security incident schema
export const SecurityIncidentSchema = z.object({
  id: z.string(),
  type: z.string(),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  status: z.enum(['open', 'investigating', 'contained', 'resolved']),
  title: z.string(),
  description: z.string(),
  reportedBy: z.string(),
  assignedTo: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  resolvedAt: z.date().optional(),
  threats: z.array(ThreatSchema).optional(),
  timeline: z.array(z.object({
    timestamp: z.date(),
    action: z.string(),
    user: z.string(),
    notes: z.string().optional(),
  })),
});

// Threat detector configuration
export const ThreatDetectorConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  enabled: z.boolean(),
  config: z.record(z.any()),
  lastRun: z.date().optional(),
  threatCount: z.number().default(0),
});

// Security policy schema
export const SecurityPolicySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  rules: z.record(z.any()),
  enforced: z.boolean(),
  violations: z.number().default(0),
  lastUpdated: z.date(),
});

// Audit log schema
export const AuditLogSchema = z.object({
  id: z.string(),
  timestamp: z.date(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().optional(),
  details: z.record(z.any()).optional(),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  outcome: z.enum(['success', 'failure', 'error']),
  severity: z.enum(['info', 'warning', 'error', 'critical']).default('info'),
});

// Security metrics schema
export const SecurityMetricsSchema = z.object({
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
  threats: z.object({
    total: z.number(),
    byType: z.record(z.number()),
    bySeverity: z.record(z.number()),
    resolved: z.number(),
    active: z.number(),
  }),
  incidents: z.object({
    total: z.number(),
    open: z.number(),
    resolved: z.number(),
    averageResolutionTime: z.number(),
  }),
  compliance: z.object({
    frameworks: z.record(z.number()),
    overallScore: z.number(),
    violations: z.number(),
  }),
  performance: z.object({
    detectorsRunning: z.number(),
    averageResponseTime: z.number(),
    uptime: z.number(),
  }),
});

// Export TypeScript types
export type Threat = z.infer<typeof ThreatSchema>;
export type SecurityIncident = z.infer<typeof SecurityIncidentSchema>;
export type ThreatDetectorConfig = z.infer<typeof ThreatDetectorConfigSchema>;
export type SecurityPolicy = z.infer<typeof SecurityPolicySchema>;
export type AuditLog = z.infer<typeof AuditLogSchema>;
export type SecurityMetrics = z.infer<typeof SecurityMetricsSchema>;

// Security events
export interface SecurityEvent {
  type: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: Date;
  source: string;
  data: Record<string, any>;
}

// Threat response actions
export type ThreatResponseAction = 'acknowledge' | 'resolve' | 'escalate' | 'ignore';

// Compliance status types
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';

// Security monitoring status
export interface MonitoringStatus {
  isActive: boolean;
  activeDetectors: number;
  totalDetectors: number;
  lastHealthCheck: Date;
  uptime: number;
  threatsDetected24h: number;
  incidentsOpen: number;
}
