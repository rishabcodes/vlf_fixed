'use client';

import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  timestamp: string;
  [key: string]: string | number;
}

interface AreaChartProps {
  title: string;
  data: DataPoint[];
  areas: Array<{
    key: string;
    color: string;
    name: string;
    stackId?: string;
  }>;
  height?: number;
  stacked?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function AreaChart({ 
  title, 
  data, 
  areas, 
  height = 300, 
  stacked = false,
  showLegend = true,
  className = '' 
}: AreaChartProps) {
  const formatTooltipLabel = (label: string) => {
    const date = new Date(label);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTooltipValue = (value: number, name: string) => {
    if (name.toLowerCase().includes('rate') || name.toLowerCase().includes('percentage')) {
      return [`${value.toFixed(1)}%`, name];
    }
    if (name.toLowerCase().includes('time') || name.toLowerCase().includes('duration')) {
      return [`${value.toFixed(0)}ms`, name];
    }
    return [value.toLocaleString(), name];
  };

  const formatAxisValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              {areas.map((area) => (
                <linearGradient key={area.key}

                id={`gradient-${area.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={area.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={area.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={formatAxisValue}
            />
            <Tooltip 
              labelFormatter={formatTooltipLabel}
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            {showLegend && <Legend />}
            {areas.map((area) => (
              <Area
                key={area.key}

                type="monotone"
                dataKey={area.key}
                stackId={stacked ? (area.stackId || 'default') : undefined}
                stroke={area.color}

                fill={`url(#gradient-${area.key})`}
                strokeWidth={2}
                name={area.name}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
