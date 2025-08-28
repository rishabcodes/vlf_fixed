'use client';

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface BarChartProps {
  title: string;
  data: DataPoint[];
  bars: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  height?: number;
  horizontal?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function BarChart({ 
  title, 
  data, 
  bars, 
  height = 300, 
  horizontal = false,
  showLegend = true,
  className = '' 
}: BarChartProps) {
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
          <RechartsBarChart 
            data={data} 
            layout={horizontal ? 'horizontal' : 'vertical'}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            {horizontal ? (
              <>
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatAxisValue}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  width={100}
                />
              </>
            ) : (
              <>
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatAxisValue}
                />
              </>
            )}
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            {showLegend && <Legend />}
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}

                fill={bar.color} name={bar.name}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
