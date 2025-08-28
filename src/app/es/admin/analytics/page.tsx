'use client';

import { useState, useEffect, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ModernSelect as Select,
  ModernSelectContent as SelectContent,
  ModernSelectItem as SelectItem,
  ModernSelectTrigger as SelectTrigger,
  ModernSelectValue as SelectValue,
} from '@/components/ui/modern-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Download,
  RefreshCw,
  Calendar,
  Activity,
  Phone,
  MessageSquare,
  Shield,
  Globe,
  Star,
} from 'lucide-react';
import { MetricsOverview } from '@/components/dashboard/analytics/MetricsOverview';
import { RealTimeIndicator } from '@/components/dashboard/analytics/RealTimeIndicator';
import { LineChart } from '@/components/dashboard/charts/LineChart';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { PieChart } from '@/components/dashboard/charts/PieChart';
import { AreaChart } from '@/components/dashboard/charts/AreaChart';
import { DashboardMetrics } from '@/lib/analytics/core/analytics-engine';
import { useAnalyticsSocket } from '@/lib/socket/analytics-socket';
import { formatDistanceToNow } from 'date-fns';

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [timeRange, setTimeRange] = useState('24h');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { emitPageView } = useAnalyticsSocket();

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/analytics/dashboard?timeRange=${timeRange}`);
      const data = await response.json();

      if (data.success) {
        setMetrics(data.metrics);
        setLastUpdated(new Date());
      }
    } catch (error) {
      logger.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchMetrics();
    emitPageView('/admin/analytics');
  }, [fetchMetrics, emitPageView]);

  const handleExport = async (format: 'json' | 'csv') => {
    try {
      const response = await fetch('/api/analytics/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeRange: {
            start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            end: new Date().toISOString(),
            granularity: 'hour',
          },
          format,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      logger.error('Failed to export analytics:', error);
        }
};

  // Generate sample trend data for charts
  const generateTrendData = () => {
    if (!metrics) return [];

    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
      visitors: Math.floor(Math.random() * 500) + 200,
      leads: Math.floor(Math.random() * 50) + 10,
      calls: Math.floor(Math.random() * 30) + 5,
      responseTime: Math.floor(Math.random() * 100) + 50,
    }));
  };

  const trendData = generateTrendData();

  if (isLoading && !metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights across all systems and touchpoints
          </p>
        </div>

        <div className="flex items-center gap-3">
          <RealTimeIndicator />

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={fetchMetrics} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button variant="outline" onClick={() => handleExport('json')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          Last updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
        </div>
      )}

      {metrics && (
        <>
          {/* Metrics Overview */}
          <MetricsOverview metrics={metrics} isLoading={isLoading} />

          {/* Main Analytics Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="voice-agents">Voice Agents</TabsTrigger>
              <TabsTrigger value="seo">SEO & Content</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="gmb">GMB & Local</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Traffic & Conversion Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChart
                  title="Traffic & Leads Trend"
                  data={trendData}
                  lines={[
                    { key: 'visitors', color: '#3B82F6', name: 'Visitors' },
                    { key: 'leads', color: '#10B981', name: 'Leads' },
                  ]}
                />

                <AreaChart
                  title="Response Time Trend"
                  data={trendData}
                  areas={[{ key: 'responseTime', color: '#F59E0B', name: 'Response Time (ms)' }]}
                />
              </div>

              {/* Traffic Sources & Conversion Funnel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PieChart
                  title="Traffic Sources"
                  data={[
                    { name: 'Organic Search', value: 45, color: '#3B82F6' },
                    { name: 'Direct', value: 25, color: '#10B981' },
                    { name: 'Social Media', value: 15, color: '#F59E0B' },
                    { name: 'Referral', value: 10, color: '#EF4444' },
                    { name: 'Email', value: 5, color: '#8B5CF6' },
                  ]}
                />

                <BarChart
                  title="Conversion Funnel"
                  data={[
                    { name: 'Visitors', value: metrics.overview.totalVisitors },
                    { name: 'Engaged', value: Math.floor(metrics.overview.totalVisitors * 0.3) },
                    { name: 'Interested', value: Math.floor(metrics.overview.totalVisitors * 0.1) },
                    { name: 'Leads', value: metrics.overview.totalLeads },
                    { name: 'Clients', value: Math.floor(metrics.overview.totalLeads * 0.2) },
                  ]}
                  bars={[{ key: 'value', color: '#3B82F6', name: 'Count' }]}
                />
              </div>
            </TabsContent>

            <TabsContent value="voice-agents" className="space-y-6">
              {/* Voice Agent Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Calls</span>
                      <span className="font-bold">{metrics.voiceAgents.totalCalls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Duration</span>
                      <span className="font-bold">{metrics.voiceAgents.averageCallDuration}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversion Rate</span>
                      <span className="font-bold">{metrics.voiceAgents.conversionRate}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">
                        {metrics.voiceAgents.satisfactionScore}/5
                      </div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating}

                className="flex items-center gap-2">
                          <span
                className="text-sm w-2">{rating}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: `${Math.random() * 80 + 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Top Intents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {metrics.voiceAgents.topIntents.map((intent, index) => (
                        <div key={index}

                className="flex justify-between items-center">
                          <span
                className="text-sm text-gray-600 capitalize">
                            {intent.intent.replace('_', ' ')}
                          </span>
                          <Badge variant="secondary">{intent.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Call Volume Trends */}
              <LineChart
                title="Call Volume & Satisfaction Trends"
                data={trendData}
                lines={[{ key: 'calls', color: '#3B82F6', name: 'Calls' }]}
              />
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              {/* SEO Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Organic Traffic</span>
                      <span className="font-bold">
                        {metrics.seo.organicTraffic.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Position</span>
                      <span className="font-bold">{metrics.seo.averagePosition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Content Performance</span>
                      <span className="font-bold">{metrics.seo.contentPerformance}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Engagement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Views</span>
                      <span className="font-bold">
                        {metrics.content.totalViews.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engagement Rate</span>
                      <span className="font-bold">{metrics.content.engagementRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Time on Page</span>
                      <span className="font-bold">{metrics.content.averageTimeOnPage}s</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Keywords & Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChart
                  title="Top Performing Keywords"
                  data={metrics.seo.topKeywords.map(keyword => ({
                    name: keyword.keyword.substring(0, 20) + '...',
                    traffic: keyword.traffic,
                    position: keyword.position,
                  }))}
                  bars={[{ key: 'traffic', color: '#3B82F6', name: 'Traffic' }]}
                />

                <BarChart
                  title="Top Content Performance"
                  data={metrics.content.topContent.map(content => ({
                    name: content.title.substring(0, 15) + '...',
                    views: content.views,
                    engagement: content.engagement,
                  }))}
                  bars={[{ key: 'views', color: '#10B981', name: 'Views' }]}
                />
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              {/* Security Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Threat Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Threats Detected</span>
                      <span className="font-bold text-red-600">
                        {metrics.security.threatsDetected}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Threats Blocked</span>
                      <span className="font-bold text-green-600">
                        {metrics.security.threatsBlocked}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold">
                        {(
                          (metrics.security.threatsBlocked / metrics.security.threatsDetected) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div
                        className={`text-3xl font-bold ${
                          metrics.security.riskScore <= 30
                            ? 'text-green-600'
                            : metrics.security.riskScore <= 60
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {metrics.security.riskScore}/100
                      </div>
                      <div className="text-sm text-gray-600">Current Risk Score</div>
                      <Badge
                        variant={
                          metrics.security.riskScore <= 30
                            ? 'default'
                            : metrics.security.riskScore <= 60
                              ? 'secondary'
                              : 'destructive'
                        }
                      >
                        {metrics.security.riskScore <= 30
                          ? 'Low Risk'
                          : metrics.security.riskScore <= 60
                            ? 'Medium Risk'
                            : 'High Risk'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-blue-600">
                        {metrics.security.complianceScore}/100
                      </div>
                      <div className="text-sm text-gray-600">Compliance Score</div>
                      <Badge variant="default">
                        {metrics.security.complianceScore >= 90
                          ? 'Excellent'
                          : metrics.security.complianceScore >= 80
                            ? 'Good'
                            : 'Needs Improvement'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      System Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">API Response Time</span>
                      <span className="font-bold">
                        {metrics.performance.averageApiResponseTime}ms
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Error Rate</span>
                      <span className="font-bold">{metrics.performance.errorRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Uptime</span>
                      <span className="font-bold text-green-600">
                        {metrics.performance.uptime}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Core Web Vitals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">LCP</span>
                      <span
                        className={`font-bold ${
                          metrics.performance.coreWebVitals.lcp <= 2500
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {metrics.performance.coreWebVitals.lcp.toFixed(0)}ms
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">FID</span>
                      <span
                        className={`font-bold ${
                          metrics.performance.coreWebVitals.fid <= 100
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {metrics.performance.coreWebVitals.fid.toFixed(0)}ms
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CLS</span>
                      <span
                        className={`font-bold ${
                          metrics.performance.coreWebVitals.cls <= 0.1
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {metrics.performance.coreWebVitals.cls.toFixed(3)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gmb" className="space-y-6">
              {/* GMB Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Local Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Views</span>
                      <span className="font-bold">{metrics.gmb.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Actions</span>
                      <span className="font-bold">{metrics.gmb.totalActions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Action Rate</span>
                      <span className="font-bold">
                        {((metrics.gmb.totalActions / metrics.gmb.totalViews) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Reviews & Ratings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Rating</span>
                      <span className="font-bold text-yellow-600">
                        {metrics.gmb.averageRating}/5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Reviews</span>
                      <span className="font-bold">{metrics.gmb.reviewCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Review Growth</span>
                      <span className="font-bold text-green-600">+12%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
