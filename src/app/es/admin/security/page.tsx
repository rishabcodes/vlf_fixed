'use client';

import { useState, useEffect, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectOption } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Clock,
  // Lock,
  FileCheck,
  // Users,
  // Activity,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Threat {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  source: string;
  detectedAt: string;
  status: string;
  responseActions?: string[];
  sourceIp?: string;
  targetResource?: string;
  timestamp: string;
  count?: number;
  evidence?: string[];
}

interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non_compliant' | 'not_audited';
  lastAudit?: string;
  nextAudit?: string;
}

interface ComplianceFramework {
  name: string;
  requirements: ComplianceRequirement[];
  complianceScore: number;
  lastAudit?: string;
}

interface Detector {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
}

interface SecurityMonitoring {
  isActive: boolean;
  lastCheck?: string;
  checksToday: number;
  blockedThreats: number;
  activeDetectors?: number;
  detectors?: Detector[];
}

interface SecurityCheck {
  name: string;
  passed: boolean;
}

interface SecurityAudit {
  passed: number;
  failed: number;
  checks?: SecurityCheck[];
}

interface SecurityData {
  monitoring?: SecurityMonitoring;
  metrics?: {
    totalThreats: number;
    blockedThreats: number;
    activeIncidents: number;
    complianceScore: number;
  };
  threats?: Threat[];
  insights?: string[];
  recommendations?: string[];
  audit?: SecurityAudit;
}

interface ComplianceStatusFramework {
  id: string;
  name: string;
  status: 'compliant' | 'partial' | 'non_compliant' | 'not_audited';
  completionPercentage: number;
  lastAudit?: string;
  timestamp?: string;
}

interface ComplianceData {
  frameworks?: ComplianceFramework[];
  overallScore?: number;
  lastAudit?: string;
  status?: {
    overallRisk: number;
    criticalIssues: number;
    frameworks?: ComplianceStatusFramework[];
  };
}

export default function SecurityPage() {
  const [securityData, setSecurityData] = useState<SecurityData | null>(null);
  const [complianceData, setComplianceData] = useState<ComplianceData | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [responseNotes, setResponseNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('24h');
  const [severityFilter, setSeverityFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (timeframe !== '24h') params.append('timeframe', timeframe);
      if (severityFilter !== 'all') params.append('severity', severityFilter);

      const [securityRes, complianceRes] = await Promise.all([
        fetch(`/api/security/monitoring?${params}`),
        fetch('/api/security/compliance'),
      ]);

      const [securityResult, complianceResult] = await Promise.all([
        securityRes.json(),
        complianceRes.json(),
      ]);

      setSecurityData(securityResult);
      setComplianceData(complianceResult);
    } catch (error) {
      logger.error('Failed to fetch security data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [timeframe, severityFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMonitoringControl = useCallback(
    async (action: string) => {
      try {
        const response = await fetch('/api/security/monitoring', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        });

        if (response.ok) {
          alert(`Monitoring ${action}ed successfully`);
          fetchData();
        }
      } catch (error) {
        logger.error('Failed to control monitoring:', error);
      }
    },
    [fetchData]
  );

  const handleThreatResponse = useCallback(
    async (action: string) => {
      if (!selectedThreat) return;

      try {
        const response = await fetch('/api/security/monitoring', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            threatId: selectedThreat.id,
            action,
            notes: responseNotes,
          }),
        });

        if (response.ok) {
          alert('Threat response recorded');
          setSelectedThreat(null);
          setResponseNotes('');
          fetchData();
        }
      } catch (error) {
        logger.error('Failed to respond to threat:', error);
      }
    },
    [selectedThreat, responseNotes, fetchData]
  );

  const runComplianceAudit = useCallback(
    async (framework: string) => {
      try {
        const response = await fetch('/api/security/compliance/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ framework }),
        });

        if (response.ok) {
          alert('Compliance audit started');
          setTimeout(fetchData, 3000);
        }
      } catch (error) {
        logger.error('Failed to run compliance audit:', error);
      }
    },
    [fetchData]
  );

  const getSeverityBadge = (severity: string) => {
    const variants: Record<
      string,
      {
        variant:
          | 'default'
          | 'secondary'
          | 'destructive'
          | 'outline'
          | 'success'
          | 'warning'
          | 'info';
        color: string;
      }
    > = {
      critical: { variant: 'destructive', color: 'text-red-600' },
      high: { variant: 'destructive', color: 'text-orange-600' },
      medium: { variant: 'warning', color: 'text-yellow-600' },
      low: { variant: 'secondary', color: 'text-gray-600' },
    };

    return variants[severity] || variants['low'];
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      {
        variant:
          | 'default'
          | 'secondary'
          | 'destructive'
          | 'outline'
          | 'success'
          | 'warning'
          | 'info';
        icon: typeof CheckCircle;
        color: string;
      }
    > = {
      compliant: { variant: 'success', icon: CheckCircle, color: 'text-green-600' },
      partial: { variant: 'warning', icon: AlertTriangle, color: 'text-yellow-600' },
      non_compliant: { variant: 'destructive', icon: XCircle, color: 'text-red-600' },
      not_audited: { variant: 'secondary', icon: Clock, color: 'text-gray-600' },
    };

    return variants[status] || variants['not_audited'];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Security & Compliance Center</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleMonitoringControl('restart')}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Restart Monitoring
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      {securityData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monitoring Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {securityData.monitoring?.isActive ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-600">Inactive</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {securityData.monitoring?.activeDetectors || 0} detectors running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {securityData.threats?.filter(t => t.status === 'active').length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {securityData.threats?.length || 0} total detected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {complianceData?.status?.overallRisk
                  ? Math.max(0, 100 - complianceData.status.overallRisk)
                  : 'N/A'}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {complianceData?.status?.criticalIssues || 0} critical issues
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  (complianceData?.status?.overallRisk || 0) < 30
                    ? 'text-green-600'
                    : (complianceData?.status?.overallRisk || 0) < 70
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}
              >
                {(complianceData?.status?.overallRisk || 0) < 30
                  ? 'Low'
                  : (complianceData?.status?.overallRisk || 0) < 70
                    ? 'Medium'
                    : 'High'}
              </div>
              <p className="text-xs text-muted-foreground">Overall security posture</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="threats" className="space-y-4">
        <TabsList>
          <TabsTrigger value="threats">Security Threats</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="audit">Security Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <Select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
              <SelectOption value="1h">Last Hour</SelectOption>
              <SelectOption value="24h">Last 24 Hours</SelectOption>
              <SelectOption value="7d">Last 7 Days</SelectOption>
              <SelectOption value="30d">Last 30 Days</SelectOption>
            </Select>

            <Select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}>
              <SelectOption value="all">All Severities</SelectOption>
              <SelectOption value="critical">Critical</SelectOption>
              <SelectOption value="high">High</SelectOption>
              <SelectOption value="medium">Medium</SelectOption>
              <SelectOption value="low">Low</SelectOption>
            </Select>
          </div>

          {/* Threats List */}
          <div className="space-y-4">
            {securityData?.threats?.map(threat => (
              <Card
                key={threat.id}

                className={
                  threat.severity === 'critical'
                    ? 'border-red-500'
                    : threat.severity === 'high'
                      ? 'border-orange-500'
                      : 'border-gray-200'
                }
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium">
                          {threat.type
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </h3>
                        <Badge {...getSeverityBadge(threat.severity)}>{threat.severity}</Badge>
                        <Badge variant={threat.status === 'active' ? 'destructive' : 'secondary'}>
                          {threat.status}
                        </Badge>
                      </div>

                      <p className="text-gray-700 mb-4">{threat.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Source IP:</span>{' '}
                          {threat.sourceIp || 'Unknown'}
                        </div>
                        <div>
                          <span className="font-medium">Target:</span>{' '}
                          {threat.targetResource || 'System'}
                        </div>
                        <div>
                          <span className="font-medium">Detected:</span>{' '}
                          {formatDistanceToNow(new Date(threat.timestamp), { addSuffix: true })}
                        </div>
                        <div>
                          <span className="font-medium">Count:</span> {threat.count || 1}{' '}
                          occurrences
                        </div>
                      </div>

                      {threat.evidence && threat.evidence.length > 0 && (
                        <div className="mt-4">
                          <span className="font-medium text-sm">Evidence:</span>
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                            {threat.evidence.slice(0, 3).map((item: string, index: number) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {threat.status === 'active' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedThreat(threat)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Respond to Security Threat</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium">{threat.type}</h4>
                                <p className="text-sm text-gray-600 mt-1">{threat.description}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                  Severity: {threat.severity} •{' '}
                                  {formatDistanceToNow(new Date(threat.timestamp), {
                                    addSuffix: true,
                                  })}
                                </p>
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Response Notes
                                </label>
                                <Textarea
                                  value={responseNotes} onChange={e => setResponseNotes(e.target.value)} placeholder="Add notes about your response..."
                                  rows={4}
                                />
                              </div>

                              <div className="flex justify-between">
                                <div className="space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => handleThreatResponse('acknowledge')}
                                  >
                                    Acknowledge
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleThreatResponse('ignore')}
                                  >
                                    Ignore
                                  </Button>
                                </div>
                                <div className="space-x-2">
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleThreatResponse('escalate')}
                                  >
                                    Escalate
                                  </Button>
                                  <Button onClick={() => handleThreatResponse('resolve')}>
                                    Resolve
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          {complianceData?.status?.frameworks && (
            <div className="space-y-4">
              {complianceData.status.frameworks.map(framework => {
                const statusBadge = getStatusBadge(framework.status);
                if (!statusBadge) return null;
                const StatusIcon = statusBadge.icon;

                return (
                  <Card key={framework.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-medium">{framework.name}</h3>
                            <Badge {...statusBadge}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {framework.status.replace(/_/g, ' ')}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Completion:</span>{' '}
                              {framework.completionPercentage}%
                            </div>
                            <div>
                              <span className="font-medium">Last Audit:</span>{' '}
                              {framework.lastAudit
                                ? formatDistanceToNow(new Date(framework.lastAudit), {
                                    addSuffix: true,
                                  })
                                : 'Never'}
                            </div>
                            <div>
                              <span className="font-medium">Framework:</span>{' '}
                              {framework.id.toUpperCase()}
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                            <div
                              className={`h-2 rounded-full ${
                                framework.completionPercentage >= 90
                                  ? 'bg-green-600'
                                  : framework.completionPercentage >= 70
                                    ? 'bg-yellow-600'
                                    : 'bg-red-600'
                              }`}
                              style={{ width: `${framework.completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => runComplianceAudit(framework.id)}
                        >
                          Run Audit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Monitoring Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Threat Detection</h4>
                    <p className="text-sm text-gray-600">
                      Real-time monitoring of security threats and anomalies
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMonitoringControl('start')}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMonitoringControl('stop')}
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Stop
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {securityData?.monitoring?.detectors?.map(detector => (
                    <div key={detector.id}

                className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5
                className="font-medium">{detector.name}</h5>
                          <p className="text-xs text-gray-600">{detector.type}</p>
                        </div>
                        <Badge variant={detector.enabled ? 'success' : 'secondary'}>
                          {detector.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          {securityData?.audit && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Audit Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {securityData.audit.passed}
                      </div>
                      <p className="text-sm text-gray-600">Checks Passed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {securityData.audit.failed}
                      </div>
                      <p className="text-sm text-gray-600">Checks Failed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(
                          (securityData.audit.passed /
                            (securityData.audit.passed + securityData.audit.failed)) *
                            100
                        )}
                        %
                      </div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {securityData.audit.checks?.map((check, index) => (
                      <div
                        key={index}

                className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {check.passed ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle
                className="h-5 w-5 text-red-600" />
                          )}
                          <span className="font-medium">{check.name}</span>
                        </div>
                        <Badge variant={check.passed ? 'success' : 'destructive'}>
                          {check.passed ? 'Pass' : 'Fail'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
