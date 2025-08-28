'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard, type LiveMetrics } from './DashboardContext';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: 'number' | 'percentage' | 'currency';
  icon: string;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  format = 'number',
  icon,
  color,
  trend,
}) => {
  const [animatedValue, setAnimatedValue] = useState(previousValue || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (value !== animatedValue) {
      setIsUpdating(true);
      const duration = 1000;
      const steps = 60;
      const stepValue = (value - animatedValue) / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        setAnimatedValue(prev => prev + stepValue);

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValue(value);
          setIsUpdating(false);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [value, animatedValue]);

  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return Math.round(val).toLocaleString();
        }
};

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
        }
};

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
        }
};

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${color} transition-all duration-300 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className={`text-2xl font-bold text-gray-900 ${isUpdating ? 'animate-pulse' : ''}`}>
          {formatValue(animatedValue)}
        </div>

        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <span className="text-sm">{getTrendIcon()}</span>
            <span className="text-sm font-medium">
              {previousValue
                ? Math.abs(((value - previousValue) / previousValue) * 100).toFixed(1)
                : 0}
              %
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${color.replace('border-l-', 'bg-')}` style={{ width: `${Math.min(100, (animatedValue / (value * 1.2)) * 100)}%` }}
        />
      </div>
    </div>
  );
};

const LivingMetrics: React.FC = () => {
  const { data, isConnected } = useDashboard();
  const [previousMetrics, setPreviousMetrics] = useState(data.metrics);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (JSON.stringify(data.metrics) !== JSON.stringify(previousMetrics)) {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
      setPreviousMetrics(data.metrics);
    }
  }, [data.metrics, previousMetrics]);

  const metricConfigs = [
    {
      title: 'Live Visitors',
      value: data.metrics.visitorCount,
      icon: '👥',
      color: 'border-l-blue-500',
      trend: (data.metrics.visitorCount > previousMetrics.visitorCount ? 'up' : 'stable') as
        | 'up'
        | 'stable',
    },
    {
      title: 'Active Conversations',
      value: data.metrics.conversationsActive,
      icon: '💬',
      color: 'border-l-green-500',
      trend: (data.metrics.conversationsActive > previousMetrics.conversationsActive
        ? 'up'
        : 'stable') as 'up' | 'stable',
    },
    {
      title: 'Reviews Today',
      value: data.metrics.reviewsToday,
      icon: '⭐',
      color: 'border-l-yellow-500',
      trend: (data.metrics.reviewsToday > previousMetrics.reviewsToday ? 'up' : 'stable') as
        | 'up'
        | 'stable',
    },
    {
      title: 'Content Created',
      value: data.metrics.contentCreated,
      icon: '📝',
      color: 'border-l-purple-500',
      trend: (data.metrics.contentCreated > previousMetrics.contentCreated ? 'up' : 'stable') as
        | 'up'
        | 'stable',
    },
    {
      title: 'Ranking Changes',
      value: data.metrics.rankingChanges,
      icon: '🔍',
      color: 'border-l-indigo-500',
      trend: (data.metrics.rankingChanges > previousMetrics.rankingChanges ? 'up' : 'stable') as
        | 'up'
        | 'stable',
    },
    {
      title: 'Social Engagement',
      value: data.metrics.socialEngagement,
      icon: '📱',
      color: 'border-l-pink-500',
      trend: (data.metrics.socialEngagement > previousMetrics.socialEngagement
        ? 'up'
        : 'stable') as 'up' | 'stable',
    },
    {
      title: 'Leads Generated',
      value: data.metrics.leadGeneration,
      icon: '🎯',
      color: 'border-l-red-500',
      trend: (data.metrics.leadGeneration > previousMetrics.leadGeneration ? 'up' : 'stable') as
        | 'up'
        | 'stable',
    },
    {
      title: 'Conversion Rate',
      value: data.metrics.conversionRate,
      icon: '📊',
      color: 'border-l-orange-500',
      format: 'percentage' as const,
      trend: (data.metrics.conversionRate > previousMetrics.conversionRate ? 'up' : 'stable') as
        | 'up'
        | 'stable',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Living Metrics</h2>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
          />
          <span className="text-sm text-gray-600">
            {isConnected ? 'Real-time updates' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${pulseAnimation ? 'animate-pulse' : ''}`}
      >
        {metricConfigs.map((config, index) => (
          <MetricCard
            key={config.title}
            title={config.title value={config.value}
            previousValue={previousMetrics[Object.keys(data.metrics)[index] as keyof LiveMetrics]}
            format={config.format}
            icon={config.icon}
            color={config.color}
            trend={config.trend}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
        <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">📈</div>
            <p className="text-gray-600">Real-time charts coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingMetrics;
}
}
