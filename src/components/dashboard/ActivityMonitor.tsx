'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from './DashboardContext';

interface ActivityItem {
  id: string;
  type: 'content' | 'review' | 'lead' | 'call' | 'social' | 'seo';
  message: string;
  timestamp: Date;
  success: boolean;
  details?: string;
}

const ActivityMonitor: React.FC = () => {
  const { data, isConnected } = useDashboard();
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animate new items
    const latestItem = data.recentActivity[0];
    if (latestItem) {
      setAnimatingItems(prev => new Set(prev).add(latestItem.id));
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(latestItem.id);
          return newSet;
        });
      }, 1000);
    }
  }, [data.recentActivity]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'content':
        return '📝';
      case 'review':
        return '⭐';
      case 'lead':
        return '🎯';
      case 'call':
        return '📞';
      case 'social':
        return '📱';
      case 'seo':
        return '🔍';
      default:
        return '⚡';
        }
};

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'content':
        return 'bg-blue-500';
      case 'review':
        return 'bg-yellow-500';
      case 'lead':
        return 'bg-green-500';
      case 'call':
        return 'bg-purple-500';
      case 'social':
        return 'bg-pink-500';
      case 'seo':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
        }
};

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Live Activity Monitor</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600">{isConnected ? 'Live' : 'Disconnected'}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {data.recentActivity.map(activity => (
          <div
            key={activity.id}

                className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-500 ${
              animatingItems.has(activity.id)
                ? 'scale-105 border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${getActivityColor(activity.type)}`}
            >
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <span className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {activity.details && <p className="text-xs text-gray-600 mt-1">{activity.details}</p>}
            </div>

            <div
              className={`w-2 h-2 rounded-full ${activity.success ? 'bg-green-500' : 'bg-red-500'}`}
            />
          </div>
        ))}
      </div>

      {data.recentActivity.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="animate-pulse">
            <div className="text-2xl mb-2">⚡</div>
            <p>Waiting for activity...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityMonitor;
