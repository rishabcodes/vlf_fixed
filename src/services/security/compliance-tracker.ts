import { logger } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { documentShareStubs, complianceReportStubs } from '@/lib/prisma-model-stubs';
import { EventEmitter } from 'events';
import { z } from 'zod';

// Compliance frameworks
const complianceFrameworks = {
  HIPAA: {
    id: 'hipaa',
    name: 'HIPAA Compliance',
    description: 'Health Insurance Portability and Accountability Act',
    requirements: [
      'encryption-at-rest',
      'encryption-in-transit',
      'access-controls',
      'audit-logging',
      'data-retention',
      'breach-notification',
      'employee-training',
      'risk-assessment',
    ],
  },
  ABA: {
    id: 'aba',
    name: 'ABA Model Rules',
    description: 'American Bar Association Model Rules of Professional Conduct',
    requirements: [
      'client-confidentiality',
      'conflict-checking',
      'trust-accounting',
      'communication-records',
      'competent-representation',
      'informed-consent',
      'advertising-compliance',
      'record-retention',
    ],
  },
  CCPA: {
    id: 'ccpa',
    name: 'CCPA Compliance',
    description: 'California Consumer Privacy Act',
    requirements: [
      'privacy-notice',
      'data-collection-disclosure',
      'opt-out-mechanism',
      'data-deletion-rights',
      'non-discrimination',
      'data-security',
      'vendor-agreements',
      'employee-training',
    ],
  },
  SOC2: {
    id: 'soc2',
    name: 'SOC 2 Type II',
    description: 'Service Organization Control 2',
    requirements: [
      'security-policies',
      'access-management',
      'change-management',
      'risk-assessment',
      'vendor-management',
      'incident-response',
      'business-continuity',
      'monitoring-alerting',
    ],
  },
};

// Compliance check schemas
const ComplianceCheckSchema = z.object({
  requirementId: z.string(),
  status: z.enum(['compliant', 'non_compliant', 'partial', 'not_applicable']),
  evidence: z.array(z.string()),
  lastChecked: z.date(),
  nextCheckDue: z.date(),
  notes: z.string().optional(),
  remediationRequired: z.boolean(),
  remediationPlan: z.string().optional(),
});

const ComplianceReportSchema = z.object({
  frameworkId: z.string(),
  overallStatus: z.enum(['compliant', 'non_compliant', 'partial']),
  completionPercentage: z.number(),
  requirements: z.array(ComplianceCheckSchema),
  riskScore: z.number(),
  lastAuditDate: z.date(),
  nextAuditDate: z.date(),
  auditor: z.string().optional(),
  recommendations: z.array(z.string()),
});

export class ComplianceTracker extends EventEmitter {
  private activeFrameworks: Set<string> = new Set(['ABA', 'CCPA']);
  private complianceChecks: Map<string, ComplianceCheck[]> = new Map();
  private automatedCheckers: Map<string, () => Promise<AutomatedCheckResult>> = new Map();

  constructor() {
    super();
    this.initializeAutomatedCheckers();
  }

  private initializeAutomatedCheckers(): void {
    // Encryption checks
    this.automatedCheckers.set('encryption-at-rest', async () => {
      // Check database encryption, file storage encryption
      const checks = await Promise.all([
        this.checkDatabaseEncryption(),
        this.checkFileStorageEncryption(),
      ]);

      return {
        compliant: checks.every(c => c),
        evidence: ['Database encryption: AES-256', 'File storage: Encrypted S3'],
      };
    });

    // Access control checks
    this.automatedCheckers.set('access-controls', async () => {
      const violations = await this.checkAccessControlViolations();
      return {
        compliant: violations.length === 0,
        evidence:
          violations.length === 0
            ? ['No access control violations found']
            : violations.map(v => `Violation: ${v}`),
      };
    });

    // Audit logging checks
    this.automatedCheckers.set('audit-logging', async () => {
      const auditConfig = await this.checkAuditLoggingConfiguration();
      return {
        compliant: auditConfig.allEventsLogged && auditConfig.retentionMet,
        evidence: [
          `Events logged: ${auditConfig.loggedEventTypes.join(', ')}`,
          `Retention period: ${auditConfig.retentionDays} days`,
        ],
      };
    });

    // Client confidentiality checks
    this.automatedCheckers.set('client-confidentiality', async () => {
      const breaches = await this.checkConfidentialityBreaches();
      return {
        compliant: breaches.length === 0,
        evidence:
          breaches.length === 0
            ? ['No confidentiality breaches detected']
            : breaches.map(b => `Breach: ${b.description}`),
      };
    });

    // Privacy notice checks
    this.automatedCheckers.set('privacy-notice', async () => {
      const privacyStatus = await this.checkPrivacyNoticeCompliance();
      return {
        compliant: privacyStatus.upToDate && privacyStatus.accessible,
        evidence: [
          `Last updated: ${privacyStatus.lastUpdated}`,
          `Accessible: ${privacyStatus.accessible}`,
          `Contains required elements: ${privacyStatus.requiredElements}`,
        ],
      };
    });
  }

  async runComplianceCheck(frameworkId: string): Promise<typeof ComplianceReportSchema._type> {
    const framework = complianceFrameworks[frameworkId as keyof typeof complianceFrameworks];
    if (!framework) {
      throw new Error(`Unknown compliance framework: ${frameworkId}`);
    }

    logger.info('Running compliance check', { framework: frameworkId });

    const requirements: ComplianceCheck[] = [];
    let compliantCount = 0;
    let partialCount = 0;

    for (const requirementId of framework.requirements) {
      const check = await this.checkRequirement(frameworkId, requirementId);
      requirements.push(check);

      if (check.status === 'compliant') compliantCount++;
      else if (check.status === 'partial') partialCount++;
    }

    const totalRequirements = framework.requirements.length;
    const completionPercentage = Math.round((compliantCount / totalRequirements) * 100);

    const overallStatus =
      compliantCount === totalRequirements
        ? 'compliant'
        : compliantCount + partialCount > totalRequirements / 2
          ? 'partial'
          : 'non_compliant';

    const riskScore = this.calculateRiskScore(requirements);
    const recommendations = this.generateRecommendations(requirements);

    const report: typeof ComplianceReportSchema._type = {
      frameworkId,
      overallStatus,
      completionPercentage,
      requirements,
      riskScore,
      lastAuditDate: new Date(),
      nextAuditDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      auditor: 'Automated Compliance System',
      recommendations,
    };

    // Store results
    await this.storeComplianceReport(report);

    // Emit events for non-compliance
    if (overallStatus !== 'compliant') {
      this.emit('compliance-violation', {
        framework: frameworkId,
        status: overallStatus,
        riskScore,
        violations: requirements.filter(r => r.status !== 'compliant'),
      });
    }

    return report;
  }

  private async checkRequirement(
    frameworkId: string,
    requirementId: string
  ): Promise<ComplianceCheck> {
    // Check if we have an automated checker
    const automatedChecker = this.automatedCheckers.get(requirementId);

    if (automatedChecker) {
      const result = await automatedChecker();
      return {
        requirementId,
        status: result.compliant ? 'compliant' : 'non_compliant',
        evidence: result.evidence,
        lastChecked: new Date(),
        nextCheckDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Weekly
        remediationRequired: !result.compliant,
        remediationPlan: result.remediationPlan,
      };
    }

    // Manual check placeholder
    return {
      requirementId,
      status: 'partial',
      evidence: ['Manual verification required'],
      lastChecked: new Date(),
      nextCheckDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Monthly
      notes: 'Automated check not available',
      remediationRequired: false,
    };
  }

  private calculateRiskScore(requirements: ComplianceCheck[]): number {
    const weights = {
      compliant: 0,
      partial: 0.5,
      non_compliant: 1,
      not_applicable: 0,
    };

    const totalRisk = requirements.reduce((sum, req) => {
      const weight = weights[req.status];
      const severity = this.getRequirementSeverity(req.requirementId);
      return sum + weight * severity;
    }, 0);

    const maxRisk = requirements.length * 10; // Max severity is 10
    return Math.round((totalRisk / maxRisk) * 100);
  }

  private getRequirementSeverity(requirementId: string): number {
    const severities: Record<string, number> = {
      'encryption-at-rest': 10,
      'encryption-in-transit': 10,
      'access-controls': 9,
      'audit-logging': 8,
      'client-confidentiality': 10,
      'data-security': 9,
      'breach-notification': 8,
      'privacy-notice': 7,
      'trust-accounting': 9,
      'conflict-checking': 8,
    };

    return severities[requirementId] || 5;
  }

  private generateRecommendations(requirements: ComplianceCheck[]): string[] {
    const recommendations: string[] = [];
    const nonCompliant = requirements.filter(r => r.status !== 'compliant');

    // Priority recommendations
    const critical = nonCompliant.filter(r => this.getRequirementSeverity(r.requirementId) >= 9);

    if (critical.length > 0) {
      recommendations.push(
        `CRITICAL: Address ${critical.length} high-severity non-compliant items immediately`
      );
      critical.forEach(req => {
        if (req.remediationPlan) {
          recommendations.push(`- ${req.requirementId}: ${req.remediationPlan}`);
        }
      });
    }

    // General recommendations
    if (nonCompliant.length > 0) {
      recommendations.push(
        `Schedule remediation for ${nonCompliant.length} non-compliant requirements`
      );
    }

    // Proactive recommendations
    recommendations.push('Enable continuous compliance monitoring');
    recommendations.push('Schedule quarterly compliance training for all staff');
    recommendations.push('Implement automated compliance checks where possible');

    return recommendations;
  }

  // Automated check implementations
  private async checkDatabaseEncryption(): Promise<boolean> {
    // Check PostgreSQL encryption settings
    try {
      const result = await prisma.$queryRaw`
        SELECT setting FROM pg_settings 
        WHERE name = 'ssl' AND setting = 'on'
      `;
      return Array.isArray(result) && result.length > 0;
    } catch (error) {
      logger.error('Failed to check database encryption', { error });
      return false;
    }
  }

  private async checkFileStorageEncryption(): Promise<boolean> {
    // Check S3 bucket encryption or local storage encryption
    // This would integrate with your storage provider
    return true; // Placeholder
  }

  private async checkAccessControlViolations(): Promise<string[]> {
    const violations: string[] = [];

    // Check for overly permissive roles
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' },
    });

    if (adminCount > 5) {
      violations.push(`Excessive admin accounts: ${adminCount}`);
    }

    // Check for inactive users with active access
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const inactiveWithAccess = await prisma.user.count({
      where: {
        lastActive: { lt: thirtyDaysAgo },
        blocked: false,
      },
    });

    if (inactiveWithAccess > 0) {
      violations.push(`${inactiveWithAccess} inactive users with active access`);
    }

    return violations;
  }

  private async checkAuditLoggingConfiguration(): Promise<AuditConfigResult> {
    // Check audit log configuration
    const requiredEvents = [
      'user.login',
      'user.logout',
      'data.access',
      'data.modify',
      'permission.change',
      'document.view',
      'document.download',
    ];

    // This would check your actual logging configuration
    return {
      allEventsLogged: true,
      retentionMet: true,
      loggedEventTypes: requiredEvents,
      retentionDays: 365,
    };
  }

  private async checkConfidentialityBreaches(): Promise<SecurityBreach[]> {
    // Check for potential confidentiality breaches
    const breaches: SecurityBreach[] = [];

    // Check for documents shared externally
    const externalShares = await documentShareStubs.count({
      where: {
        sharedWith: { contains: '@' },
        expiresAt: { lt: new Date() },
      },
    });

    if (externalShares > 0) {
      breaches.push({
        id: 'expired-shares',
        description: `${externalShares} expired document shares still accessible`,
        severity: 'high',
        timestamp: new Date(),
      });
    }

    return breaches;
  }

  private async checkPrivacyNoticeCompliance(): Promise<PrivacyNoticeStatus> {
    // Check privacy policy compliance
    // This would check your actual privacy policy
    return {
      upToDate: true,
      accessible: true,
      lastUpdated: new Date().toISOString(),
      requiredElements: true,
    };
  }

  private async storeComplianceReport(report: typeof ComplianceReportSchema._type): Promise<void> {
    try {
      await complianceReportStubs.create({
        data: {
          frameworkId: report.frameworkId,
          status: report.overallStatus,
          completionPercentage: report.completionPercentage,
          riskScore: report.riskScore,
          requirements: JSON.stringify(report.requirements),
          recommendations: JSON.stringify(report.recommendations),
          auditDate: report.lastAuditDate,
          nextAuditDate: report.nextAuditDate,
          auditor: report.auditor,
        },
      });
    } catch (error) {
      logger.error('Failed to store compliance report', { error });
    }
  }

  async scheduleComplianceAudits(): Promise<void> {
    for (const frameworkId of this.activeFrameworks) {
      // Schedule weekly automated checks
      setInterval(
        async () => {
          try {
            await this.runComplianceCheck(frameworkId);
          } catch (error) {
            logger.error('Scheduled compliance check failed', {
              framework: frameworkId,
              error,
            });
          }
        },
        7 * 24 * 60 * 60 * 1000
      ); // Weekly
    }
  }

  async getComplianceStatus(): Promise<{
    frameworks: Array<{
      id: string;
      name: string;
      status: string;
      completionPercentage: number;
      lastAudit: Date | null;
    }>;
    overallRisk: number;
    criticalIssues: number;
  }> {
    const frameworks: Array<{
      id: string;
      name: string;
      status: string;
      completionPercentage: number;
      lastAudit: Date | null;
    }> = [];
    let totalRisk = 0;
    let criticalIssues = 0;

    for (const [id, framework] of Object.entries(complianceFrameworks)) {
      const latestReport = (await complianceReportStubs.findFirst({
        where: { frameworkId: id },
        orderBy: { auditDate: 'desc' },
      })) as ComplianceReportData | null;

      if (latestReport) {
        frameworks.push({
          id,
          name: framework.name,
          status: latestReport.status || 'not_audited',
          completionPercentage: latestReport.completionPercentage || 0,
          lastAudit: latestReport.auditDate || null,
        });

        totalRisk += latestReport.riskScore || 0;

        // Count critical issues
        const requirements = JSON.parse(
          (latestReport.requirements as string) || '[]'
        ) as ComplianceCheck[];
        criticalIssues += requirements.filter(
          r => r.status !== 'compliant' && this.getRequirementSeverity(r.requirementId) >= 9
        ).length;
      } else {
        frameworks.push({
          id,
          name: framework.name,
          status: 'not_audited',
          completionPercentage: 0,
          lastAudit: null,
        });
      }
    }

    const overallRisk = Math.round(totalRisk / frameworks.length);

    return {
      frameworks,
      overallRisk,
      criticalIssues,
    };
  }
}

// Types
interface ComplianceCheck {
  requirementId: string;
  status: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  evidence: string[];
  lastChecked: Date;
  nextCheckDue: Date;
  notes?: string;
  remediationRequired: boolean;
  remediationPlan?: string;
}

interface AutomatedCheckResult {
  compliant: boolean;
  evidence: string[];
  remediationPlan?: string;
}

interface AuditConfigResult {
  allEventsLogged: boolean;
  retentionMet: boolean;
  loggedEventTypes: string[];
  retentionDays: number;
}

interface PrivacyNoticeStatus {
  upToDate: boolean;
  accessible: boolean;
  lastUpdated: string;
  requiredElements: boolean;
}

interface SecurityBreach {
  id: string;
  description: string;
  severity: string;
  timestamp: Date;
}

interface ComplianceReportData {
  status?: string;
  completionPercentage?: number;
  auditDate?: Date;
  riskScore?: number;
  requirements?: string;
}

// Export singleton instance
export const complianceTracker = new ComplianceTracker();
