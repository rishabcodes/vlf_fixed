'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { logger } from '@/lib/safe-logger';
import type { Socket } from 'socket.io-client';

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

export interface LiveMetrics {
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
    details?: string;
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const isMountedRef = useRef(false);
  const [data, setData] = useState<DashboardData>({
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

  // Initialize socket connection only on client side
  useEffect(() => {
    // Ensure we only run on client after mount
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      // Set initial lastUpdate after mount
      setData(prev => ({
        ...prev,
        systemHealth: {
          ...prev.systemHealth,
          lastUpdate: new Date(),
        },
      }));
    }

    const initSocket = async () => {
      try {
        const { io } = await import('socket.io-client');
        const newSocket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '', {
          transports: ['websocket'],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        newSocket.on('connect', () => {
          setIsConnected(true);
          // Request initial data
          newSocket.emit('dashboard:subscribe');
        });

        newSocket.on('disconnect', () => {
          setIsConnected(false);
        });

        // Listen for real-time updates
        newSocket.on('dashboard:update', (newData: Partial<DashboardData>) => {
          setData(prev => ({ ...prev, ...newData }));
        });

        newSocket.on('agent:activity', (activity: AgentActivity) => {
          setData(prev => ({
            ...prev,
            agents: prev.agents.map(agent => (agent.id === activity.id ? activity : agent)),
          }));
        });

        newSocket.on('metrics:update', (metrics: LiveMetrics) => {
          setData(prev => ({ ...prev, metrics }));
        });

        newSocket.on('activity:new', (activity: DashboardData['recentActivity'][0]) => {
          setData(prev => ({
            ...prev,
            recentActivity: [activity, ...prev.recentActivity.slice(0, 49)],
          }));
        });

        setSocket(newSocket);
      } catch (error) {
        logger.error('Failed to initialize dashboard socket:', error);
          }
};

    initSocket();

    return () => {
      if (socket) {
        socket.off('dashboard:update');
        socket.off('agent:activity');
        socket.off('metrics:update');
        socket.off('activity:new');
        socket.emit('dashboard:unsubscribe');
        socket.disconnect();
          }
};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Socket is intentionally not in deps to prevent reconnection loops

  const refreshData = () => {
    if (socket) {
      socket.emit('dashboard:refresh');
        }
};

  return (
    <DashboardContext.Provider value={{ data, isConnected, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
};
