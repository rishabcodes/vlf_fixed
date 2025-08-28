'use client';

import React, { createContext, useContext, useState } from 'react';

import { logger } from '@/lib/safe-logger';
interface AgentActivity {
  id: string;
  name: string;
  task: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  progress: number;
  lastActivity: Date;
  performance: {
    success: number;
    errors: number;
    efficiency: number;
  };
}

interface LiveMetrics {
  visitorCount: number;
  conversationsActive: number;
  reviewsToday: number;
  contentCreated: number;
  rankingChanges: number;
  socialEngagement: number;
  leadGeneration: number;
  conversionRate: number;
}

interface DashboardData {
  agents: AgentActivity[];
  metrics: LiveMetrics;
  recentActivity: Array<{
    id: string;
    type: 'content' | 'review' | 'lead' | 'call' | 'social';
    message: string;
    timestamp: Date;
    success: boolean;
  }>;
  systemHealth: {
    uptime: number;
    performance: number;
    errors: number;
    lastUpdate: Date;
  };
}

interface DashboardContextType {
  data: DashboardData;
  isConnected: boolean;
  refreshData: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data] = useState<DashboardData>({
    agents: [],
    metrics: {
      visitorCount: 0,
      conversationsActive: 0,
      reviewsToday: 0,
      contentCreated: 0,
      rankingChanges: 0,
      socialEngagement: 0,
      leadGeneration: 0,
      conversionRate: 0,
    },
    recentActivity: [],
    systemHealth: {
      uptime: 0,
      performance: 0,
      errors: 0,
      lastUpdate: new Date(),
    },
  });

  const refreshData = () => {
    logger.info('Refresh data called');
  };

  return (
    <DashboardContext.Provider value={{ data, isConnected: false, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
};
