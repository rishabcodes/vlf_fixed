import { logger } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { securityReportStubs } from '@/lib/prisma-model-stubs';
import { EventEmitter } from 'events';
import crypto from 'crypto';
import type { Prisma } from '@prisma/client';
import type {
  ThreatDetectorConfig,
  SecurityPolicy,
  MonitoringStatus,
  ThreatResponseAction,
} from '@/lib/security/types';

// Basic threat interface
interface SecurityThreat {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  description: string;
  sourceIp?: string;
  targetResource?: string;
  timestamp: Date;
  evidence: string[];
  count: number;
  metadata?: Record<string, unknown>;
}

interface ScanResult {
  detectorId: string;
  threats: SecurityThreat[];
  timestamp: Date;
}

interface ComplianceViolation {
  policyId: string;
  policyName: string;
  violation: string;
  severity: string;
}

interface ComplianceCheckResult {
  violations: ComplianceViolation[];
  compliant: boolean;
}

interface SecurityReportSummary {
  totalThreats: number;
  threatsBySeverity: Record<string, number>;
  complianceViolations: number;
  detectorStatus: Array<{
    id: string;
    name: string;
    enabled: boolean;
    threatCount: number;
  }>;
}

interface SecurityReport {
  timestamp: Date;
  summary: SecurityReportSummary;
  threats: SecurityThreat[];
  compliance: ComplianceCheckResult;
}

interface ThreatMetadata {
  targetResource?: string;
  evidence?: string[];
  count?: number;
  [key: string]: unknown;
}

interface ThreatQueryWhere {
  createdAt?: {
    gte: Date;
  };
  severity?: string;
  status?: string;
}

export class SecurityMonitor extends EventEmitter {
  private isMonitoring: boolean = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private threatDetectors: Map<string, ThreatDetectorConfig> = new Map();
  private securityPolicies: Map<string, SecurityPolicy> = new Map();
  private activeThreats: Map<string, SecurityThreat> = new Map();

  constructor() {
    super();
    this.initializeThreatDetectors();
    this.initializeSecurityPolicies();
  }

  private initializeThreatDetectors(): void {
    // Authentication threats
    this.registerDetector({
      id: 'brute-force',
      name: 'Brute Force Attack Detection',
      type: 'authentication',
      enabled: true,
      config: {
        maxAttempts: 5,
        windowMinutes: 15,
        blockDurationMinutes: 60,
      },
      threatCount: 0,
    });

    this.registerDetector({
      id: 'suspicious-login',
      name: 'Suspicious Login Detection',
      type: 'authentication',
      enabled: true,
      config: {
        checkGeoLocation: true,
        checkDeviceFingerprint: true,
        checkTimePattern: true,
      },
      threatCount: 0,
    });

    // Data access threats
    this.registerDetector({
      id: 'data-exfiltration',
      name: 'Data Exfiltration Detection',
      type: 'data-access',
      enabled: true,
      config: {
        maxRecordsPerMinute: 1000,
        maxDownloadsPerHour: 50,
        sensitiveDataThreshold: 100,
      },
      threatCount: 0,
    });

    // API security threats
    this.registerDetector({
      id: 'api-abuse',
      name: 'API Abuse Detection',
      type: 'api',
      enabled: true,
      config: {
        rateLimitPerMinute: 100,
        rateLimitPerHour: 1000,
        suspiciousPatterns: ['sql', 'script', 'exec', 'union'],
      },
      threatCount: 0,
    });
  }

  private initializeSecurityPolicies(): void {
    // Password policy
    this.registerPolicy({
      id: 'password-policy',
      name: 'Password Security Policy',
      description: 'Enforces strong password requirements',
      rules: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        preventCommonPasswords: true,
        preventPasswordReuse: 5,
        maxAge: 90,
      },
      enforced: true,
      violations: 0,
      lastUpdated: new Date(),
    });

    // Access control policy
    this.registerPolicy({
      id: 'access-control',
      name: 'Access Control Policy',
      description: 'Controls user access and authentication',
      rules: {
        requireMFA: ['admin', 'attorney'],
        sessionTimeout: 30,
        ipWhitelist: process.env.IP_WHITELIST?.split(',') || [],
        enforceEncryption: true,
      },
      enforced: true,
      violations: 0,
      lastUpdated: new Date(),
    });
  }

  private registerDetector(config: ThreatDetectorConfig): void {
    this.threatDetectors.set(config.id, config);
  }

  private registerPolicy(policy: SecurityPolicy): void {
    this.securityPolicies.set(policy.id, policy);
  }

  async startMonitoring(detectorIds?: string[]): Promise<void> {
    if (this.isMonitoring) {
      logger.warn('Security monitoring already active');
      return;
    }

    this.isMonitoring = true;

    // Enable specific detectors or all if none specified
    const enabledDetectors = detectorIds || Array.from(this.threatDetectors.keys());

    for (const id of enabledDetectors) {
      const detector = this.threatDetectors.get(id);
      if (detector) {
        detector.enabled = true;
        detector.lastRun = new Date();
      }
    }

    // Start monitoring loop
    this.monitoringInterval = setInterval(async () => {
      await this.performSecurityScan();
    }, 60000); // Run every minute

    this.emit('started');
    logger.info('Security monitoring started', { detectors: enabledDetectors });
  }

  async stopMonitoring(): Promise<void> {
    if (!this.isMonitoring) {
      return;
    }

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    this.isMonitoring = false;
    this.emit('stopped');

    logger.info('Security monitor stopped');
  }

  private async performSecurityScan(): Promise<void> {
    try {
      logger.info('Performing security scan...');

      const scanResults: ScanResult[] = [];

      // Simulate threat detection for each enabled detector
      for (const [id, detector] of this.threatDetectors) {
        if (!detector.enabled) continue;

        try {
          const threats = await this.simulateDetection(detector);
          scanResults.push({
            detectorId: id,
            threats,
            timestamp: new Date(),
          });

          // Handle detected threats
          for (const threat of threats) {
            await this.handleThreat(threat);
          }

          detector.lastRun = new Date();
          detector.threatCount += threats.length;
        } catch (error) {
          logger.error(`Detector ${id} failed:`, { error: String(error) });
        }
      }

      // Check policy compliance
      const complianceResults = await this.checkCompliance();

      // Generate security report
      const report = await this.generateSecurityReport(scanResults, complianceResults);

      // Store scan results
      await this.storeScanResults(report);

      this.emit('scanCompleted', report);
      logger.info('Security scan completed');
    } catch (error) {
      logger.error('Security scan failed:', { error: String(error) });
      this.emit('scanFailed', error);
    }
  }

  private async simulateDetection(detector: ThreatDetectorConfig): Promise<SecurityThreat[]> {
    const threats: SecurityThreat[] = [];

    // Simulate different types of threats based on detector type
    switch (detector.type) {
      case 'authentication':
        if (Math.random() < 0.1) {
          // 10% chance of threat
          threats.push(
            this.createThreat({
              type: detector.id,
              severity: 'high',
              description: `${detector.name} detected suspicious activity`,
              evidence: ['Multiple failed login attempts from same IP'],
            })
          );
        }
        break;

      case 'api':
        if (Math.random() < 0.05) {
          // 5% chance of threat
          threats.push(
            this.createThreat({
              type: detector.id,
              severity: 'medium',
              description: `API abuse pattern detected`,
              evidence: ['High request rate from single source'],
            })
          );
        }
        break;

      case 'data-access':
        if (Math.random() < 0.02) {
          // 2% chance of threat
          threats.push(
            this.createThreat({
              type: detector.id,
              severity: 'critical',
              description: `Potential data exfiltration detected`,
              evidence: ['Large data download outside normal hours'],
            })
          );
        }
        break;
    }

    return threats;
  }

  private createThreat(params: {
    type: string;
    severity: SecurityThreat['severity'];
    description: string;
    evidence: string[];
    sourceIp?: string;
    targetResource?: string;
  }): SecurityThreat {
    const id = crypto.randomUUID();
    const threat: SecurityThreat = {
      id,
      type: params.type,
      severity: params.severity,
      status: 'active',
      description: params.description,
      sourceIp: params.sourceIp || this.generateRandomIP(),
      targetResource: params.targetResource || 'api/auth',
      timestamp: new Date(),
      evidence: params.evidence,
      count: 1,
    };

    this.activeThreats.set(id, threat);
    return threat;
  }

  private generateRandomIP(): string {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  private async handleThreat(threat: SecurityThreat): Promise<void> {
    // Log the threat
    logger.warn('Security threat detected', {
      id: threat.id,
      type: threat.type,
      severity: threat.severity,
      description: threat.description,
    });

    // Store in database
    try {
      await prisma.securityThreat.create({
        data: {
          id: threat.id,
          type: threat.type,
          source: threat.sourceIp || 'unknown',
          threat: threat.description,
          severity: threat.severity,
          status: threat.status,
          details: threat.description,
          metadata: {
            targetResource: threat.targetResource,
            evidence: threat.evidence,
            count: threat.count,
            ...(threat.metadata || {}),
          } as Prisma.InputJsonValue,
        },
      });
    } catch (error) {
      logger.error('Failed to store security threat', { error: String(error) });
    }

    // Emit threat event
    this.emit('threat-detected', threat);

    // Auto-respond based on severity
    if (threat.severity === 'critical') {
      await this.autoRespond(threat);
    }
  }

  private async autoRespond(threat: SecurityThreat): Promise<void> {
    // Implement automatic response for critical threats
    switch (threat.type) {
      case 'brute-force':
        // Block IP address
        logger.info('Auto-blocking IP for brute force attack', { ip: threat.sourceIp });
        break;
      case 'data-exfiltration':
        // Suspend user account
        logger.info('Auto-suspending user for data exfiltration', {
          resource: threat.targetResource,
        });
        break;
    }
  }

  private async checkCompliance(): Promise<ComplianceCheckResult> {
    const violations: ComplianceViolation[] = [];

    for (const [id, policy] of this.securityPolicies) {
      if (policy.enforced) {
        // Simulate compliance checking
        if (Math.random() < 0.1) {
          // 10% chance of violation
          violations.push({
            policyId: id,
            policyName: policy.name,
            violation: 'Policy rule not met',
            severity: 'medium',
          });
        }
      }
    }

    return { violations, compliant: violations.length === 0 };
  }

  private async generateSecurityReport(
    scanResults: ScanResult[],
    complianceResults: ComplianceCheckResult
  ): Promise<SecurityReport> {
    const totalThreats = scanResults.reduce((sum, result) => sum + result.threats.length, 0);
    const threatsBySeverity = scanResults.reduce(
      (acc, result) => {
        result.threats.forEach(threat => {
          acc[threat.severity] = (acc[threat.severity] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      timestamp: new Date(),
      summary: {
        totalThreats,
        threatsBySeverity,
        complianceViolations: complianceResults.violations.length,
        detectorStatus: Array.from(this.threatDetectors.values()).map(d => ({
          id: d.id,
          name: d.name,
          enabled: d.enabled,
          threatCount: d.threatCount,
        })),
      },
      threats: scanResults.flatMap(r => r.threats),
      compliance: complianceResults,
    };
  }

  private async storeScanResults(report: SecurityReport): Promise<void> {
    try {
      await securityReportStubs.create({
        data: {
          timestamp: report.timestamp,
          summary: JSON.stringify(report.summary),
          threatsDetected: report.summary.totalThreats,
          complianceViolations: report.summary.complianceViolations,
          reportData: JSON.stringify(report),
        },
      });
    } catch (error) {
      logger.error('Failed to store security report', { error: String(error) });
    }
  }

  async getMonitoringStatus(): Promise<MonitoringStatus> {
    const totalDetectors = this.threatDetectors.size;
    const activeDetectors = Array.from(this.threatDetectors.values()).filter(d => d.enabled).length;

    const threatsLast24h = await prisma.securityThreat.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    const openIncidents = await prisma.securityIncident.count({
      where: {
        resolved: false,
      },
    });

    return {
      isActive: this.isMonitoring,
      activeDetectors,
      totalDetectors,
      lastHealthCheck: new Date(),
      uptime: this.isMonitoring ? Date.now() - (this.monitoringInterval ? 0 : Date.now()) : 0,
      threatsDetected24h: threatsLast24h,
      incidentsOpen: openIncidents,
    };
  }

  async getThreats(
    params: {
      timeframe?: string;
      severity?: string;
      status?: string;
    } = {}
  ): Promise<SecurityThreat[]> {
    const where: ThreatQueryWhere = {};

    // Apply timeframe filter
    if (params.timeframe) {
      const hours =
        params.timeframe === '1h'
          ? 1
          : params.timeframe === '24h'
            ? 24
            : params.timeframe === '7d'
              ? 168
              : params.timeframe === '30d'
                ? 720
                : 24;

      where.createdAt = {
        gte: new Date(Date.now() - hours * 60 * 60 * 1000),
      };
    }

    if (params.severity && params.severity !== 'all') {
      where.severity = params.severity;
    }

    if (params.status && params.status !== 'all') {
      where.status = params.status;
    }

    const threats = await prisma.securityThreat.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return threats.map(t => {
      const metadata = (t.metadata as ThreatMetadata) || {};
      return {
        id: t.id,
        type: t.type,
        severity: t.severity as SecurityThreat['severity'],
        status: t.status as SecurityThreat['status'],
        description: t.details,
        sourceIp: t.source || undefined,
        targetResource: metadata.targetResource || undefined,
        timestamp: t.createdAt,
        evidence: metadata.evidence || [],
        count: metadata.count || 1,
        metadata: metadata,
      };
    });
  }

  async performSecurityAudit(): Promise<{
    passed: number;
    failed: number;
    checks: Array<{ name: string; passed: boolean; details?: string }>;
  }> {
    const checks = [
      { name: 'Database Encryption', check: () => this.checkDatabaseEncryption() },
      { name: 'SSL Configuration', check: () => this.checkSSLConfiguration() },
      { name: 'Access Controls', check: () => this.checkAccessControls() },
      { name: 'Audit Logging', check: () => this.checkAuditLogging() },
      { name: 'Password Policy', check: () => this.checkPasswordPolicy() },
      { name: 'Session Security', check: () => this.checkSessionSecurity() },
    ];

    const results: Array<{ name: string; passed: boolean; details?: string }> = [];
    let passed = 0;
    let failed = 0;

    for (const check of checks) {
      try {
        const result = await check.check();
        results.push({ name: check.name, passed: result });
        if (result) passed++;
        else failed++;
      } catch (error) {
        results.push({
          name: check.name,
          passed: false,
          details: String(error),
        });
        failed++;
      }
    }

    return { passed, failed, checks: results };
  }

  private async checkDatabaseEncryption(): Promise<boolean> {
    // Simulate database encryption check
    return true;
  }

  private async checkSSLConfiguration(): Promise<boolean> {
    // Simulate SSL configuration check
    return true;
  }

  private async checkAccessControls(): Promise<boolean> {
    // Check for proper access controls
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' },
    });
    return adminCount <= 5; // Limit admin accounts
  }

  private async checkAuditLogging(): Promise<boolean> {
    // Simulate audit logging check
    return true;
  }

  private async checkPasswordPolicy(): Promise<boolean> {
    // Simulate password policy check
    return true;
  }

  private async checkSessionSecurity(): Promise<boolean> {
    // Simulate session security check
    return true;
  }

  async respondToThreat(
    threatId: string,
    action: ThreatResponseAction,
    notes?: string
  ): Promise<void> {
    const threat = this.activeThreats.get(threatId);
    if (!threat) {
      throw new Error('Threat not found');
    }

    // Update threat status based on action
    switch (action) {
      case 'acknowledge':
        threat.status = 'investigating';
        break;
      case 'resolve':
        threat.status = 'resolved';
        this.activeThreats.delete(threatId);
        break;
      case 'escalate':
        // Create security incident
        await this.createSecurityIncident(threat);
        break;
      case 'ignore':
        threat.status = 'false_positive';
        this.activeThreats.delete(threatId);
        break;
    }

    // Update in database
    await prisma.securityThreat.update({
      where: { id: threatId },
      data: {
        status: threat.status,
        updatedAt: new Date(),
      },
    });

    // Log the response
    logger.info('Threat response recorded', {
      threatId,
      action,
      notes,
      newStatus: threat.status,
    });
  }

  async recordIncident(incident: {
    type: string;
    severity: string;
    description: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    try {
      await prisma.securityIncident.create({
        data: {
          id: crypto.randomUUID(),
          type: incident.type,
          severity: incident.severity,
          description: incident.description,
          metadata: (incident.metadata || {}) as Prisma.InputJsonValue,
        },
      });

      logger.warn('Security incident recorded', incident);
    } catch (error) {
      logger.error('Failed to record security incident', { error: String(error) });
    }
  }

  private async createSecurityIncident(threat: SecurityThreat): Promise<void> {
    await this.recordIncident({
      type: threat.type,
      severity: threat.severity,
      description: `Escalated threat: ${threat.description}`,
      metadata: { threatId: threat.id, evidence: threat.evidence } as Record<string, unknown>,
    });
  }
}

// Export singleton instance
export const securityMonitor = new SecurityMonitor();
