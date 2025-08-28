'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Phone, 
  TrendingUp, 
  Clock, 
  Shield,
  Activity,
  Star,
  BarChart3 
} from 'lucide-react';
import { DashboardMetrics } from '@/lib/analytics/core/analytics-engine';

interface MetricsOverviewProps {
  metrics: DashboardMetrics;
  isLoading?: boolean;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
  suffix?: string;
}

function MetricCard({ title, value, change, icon, color, suffix = '' }: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
      return val.toLocaleString();
    }
    return val;
  };

  const getTrendColor = (changeValue?: number) => {
    if (changeValue === undefined) return 'text-gray-500';
    return changeValue >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = (changeValue?: number) => {
    if (changeValue === undefined) return null;
    return changeValue >= 0 ? '↗' : '↘';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color}`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatValue(value)}{suffix}
              </p>
            </div>
          </div>
          {change !== undefined && (
            <div className={`text-sm font-medium ${getTrendColor(change)}`}>
              <span className="flex items-center">
                {getTrendIcon(change)}
                {Math.abs(change).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsOverview({ metrics, isLoading = false }: MetricsOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index}

                className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div
                className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Health Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={metrics.overview.systemHealth >= 95 ? "default" : "destructive"} className="px-3 py-1"
          >
            <Activity className="w-3 h-3 mr-1" />
            System Health: {metrics.overview.systemHealth.toFixed(1)}%
          </Badge>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Visitors"
          value={metrics.overview.totalVisitors}
          icon={<Users className="w-5 h-5 text-white" />}
          color="bg-blue-500"
          change={12.5}
        />
        
        <MetricCard
          title="Total Leads"
          value={metrics.overview.totalLeads}
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          color="bg-green-500"
          change={8.3}
        />
        
        <MetricCard
          title="Conversion Rate"
          value={metrics.overview.conversionRate}
          suffix="%"
          icon={<BarChart3 className="w-5 h-5 text-white" />}
          color="bg-purple-500"
          change={-2.1}
        />
        
        <MetricCard
          title="Response Time"
          value={metrics.overview.averageResponseTime}
          suffix="ms"
          icon={<Clock className="w-5 h-5 text-white" />}
          color="bg-orange-500"
          change={-5.7}
        />
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Voice Calls"
          value={metrics.voiceAgents.totalCalls}
          icon={<Phone className="w-5 h-5 text-white" />}
          color="bg-indigo-500"
          change={15.2}
        />
        
        <MetricCard
          title="Satisfaction Score"
          value={metrics.voiceAgents.satisfactionScore}
          suffix="/5"
          icon={<Star className="w-5 h-5 text-white" />}
          color="bg-yellow-500"
          change={3.8}
        />
        
        <MetricCard
          title="Security Score"
          value={100 - metrics.security.riskScore}
          suffix="%"
          icon={<Shield className="w-5 h-5 text-white" />}
          color="bg-red-500"
          change={2.4}
        />
        
        <MetricCard
          title="Content Views"
          value={metrics.content.totalViews}
          icon={<BarChart3 className="w-5 h-5 text-white" />}
          color="bg-teal-500"
          change={18.9}
        />
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Core Web Vitals</h3>
              <Badge variant="outline">Performance</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">LCP (Largest Contentful Paint)</span>
                <span className={`text-sm font-medium ${
                  metrics.performance.coreWebVitals.lcp <= 2500 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metrics.performance.coreWebVitals.lcp.toFixed(0)}ms
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">FID (First Input Delay)</span>
                <span className={`text-sm font-medium ${
                  metrics.performance.coreWebVitals.fid <= 100 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metrics.performance.coreWebVitals.fid.toFixed(0)}ms
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CLS (Cumulative Layout Shift)</span>
                <span className={`text-sm font-medium ${
                  metrics.performance.coreWebVitals.cls <= 0.1 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metrics.performance.coreWebVitals.cls.toFixed(3)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">System Status</h3>
              <Badge variant="outline">Operational</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Uptime</span>
                <span className="text-sm font-medium text-green-600">
                  {metrics.performance.uptime.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Error Rate</span>
                <span className={`text-sm font-medium ${
                  metrics.performance.errorRate <= 1 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metrics.performance.errorRate.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Threats Blocked</span>
                <span className="text-sm font-medium text-blue-600">
                  {metrics.security.threatsBlocked}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Business Metrics</h3>
              <Badge variant="outline">Growing</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">GMB Views</span>
                <span className="text-sm font-medium text-purple-600">
                  {metrics.gmb.totalViews.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Rating</span>
                <span className="text-sm font-medium text-yellow-600">
                  {metrics.gmb.averageRating.toFixed(1)}/5
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Engagement Rate</span>
                <span className="text-sm font-medium text-indigo-600">
                  {metrics.content.engagementRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
