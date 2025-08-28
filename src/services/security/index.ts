export { SecurityMonitor, securityMonitor } from './security-monitor';
export { ComplianceTracker, complianceTracker } from './compliance-tracker';

// Initialize security services
import { securityMonitor } from './security-monitor';
import { complianceTracker } from './compliance-tracker';
import { securityLogger } from '@/lib/safe-logger';

// Setup event listeners between services
securityMonitor.on('threat-detected', (threat) => {
  // Log compliance-related threats
  if (threat.type.includes('compliance') || threat.severity === 'critical') {
    securityLogger.warn('Compliance-related security threat detected', threat);
  }
});

complianceTracker.on('compliance-violation', (violation) => {
  // Create security incident for compliance violations
  securityMonitor.recordIncident({
    type: 'compliance-violation',
    severity: violation.riskScore > 70 ? 'high' : 'medium',
    description: `Compliance violation in ${violation.framework}`,
    metadata: violation,
  });
});

// Start monitoring services
if (process.env.NODE_ENV === 'production') {
  securityMonitor.startMonitoring();
  complianceTracker.scheduleComplianceAudits();
}

export const initializeSecurity = async () => {
  await securityMonitor.startMonitoring();
  await complianceTracker.scheduleComplianceAudits();
};