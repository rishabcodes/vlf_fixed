'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { useAnalyticsSocket } from '@/lib/socket/analytics-socket';

interface RealTimeIndicatorProps {
  className?: string;
}

export function RealTimeIndicator({ className = '' }: RealTimeIndicatorProps) {
  const { isConnected, realtimeMetrics } = useAnalyticsSocket();

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium">
              {isConnected ? 'Live' : 'Disconnected'}
            </span>
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
          </div>
          
          {realtimeMetrics && (
            <Badge variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              {realtimeMetrics.timestamp ? 
                new Date(realtimeMetrics.timestamp).toLocaleTimeString() : 
                'Updating...'
              }
            </Badge>
          )}
        </div>
        
        {realtimeMetrics && (
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users:</span>
              <span className="font-medium">
                {realtimeMetrics.overview?.activeUsers || '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Calls:</span>
              <span className="font-medium">
                {realtimeMetrics.voiceAgents?.activeCalls || 0}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
