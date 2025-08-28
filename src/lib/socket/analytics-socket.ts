import { io, Socket } from 'socket.io-client';
import { logger } from '@/lib/safe-logger';

interface AnalyticsSocketClient {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  subscribeToRealTimeMetrics: (callback: (data: any) => void) => () => void;
  requestMetricsUpdate: () => void;
}

class AnalyticsSocketManager implements AnalyticsSocketClient {
  socket: Socket | null = null;
  isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    try {
      this.socket = io('/analytics', {
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: this.reconnectDelay,
        reconnectionAttempts: this.maxReconnectAttempts,
        timeout: 10000,
      });

      this.setupEventListeners();
    } catch (error) {
      logger.error('Failed to connect to analytics socket', { error });
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      logger.info('Analytics socket connected');
      
      // Join analytics room
      this.socket?.emit('join-analytics');
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      logger.warn('Analytics socket disconnected', { reason });
    });

    this.socket.on('connect_error', (error) => {
      logger.error('Analytics socket connection error', { error });
      this.handleReconnection();
    });

    this.socket.on('reconnect', (attemptNumber) => {
      this.isConnected = true;
      logger.info('Analytics socket reconnected', { attemptNumber });
    });

    this.socket.on('reconnect_error', (error) => {
      logger.error('Analytics socket reconnection error', { error });
    });

    this.socket.on('reconnect_failed', () => {
      logger.error('Analytics socket reconnection failed');
      this.isConnected = false;
    });
  }

  private handleReconnection(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        if (!this.isConnected) {
          logger.info('Attempting analytics socket reconnection', { 
            attempt: this.reconnectAttempts,
            delay 
          });
          this.connect();
        }
      }, delay);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      logger.info('Analytics socket disconnected manually');
    }
  }

  subscribeToRealTimeMetrics(callback: (data: any) => void): () => void {
    if (!this.socket) {
      logger.warn('Cannot subscribe to metrics: socket not connected');
      return () => {};
    }

    this.socket.on('metrics:update', callback);
    this.socket.on('metrics:realtime', callback);

    // Return unsubscribe function
    return () => {
      if (this.socket) {
        this.socket.off('metrics:update', callback);
        this.socket.off('metrics:realtime', callback);
        }
};
  }

  requestMetricsUpdate(): void {
    if (this.socket?.connected) {
      this.socket.emit('metrics:request-update');
    } else {
      logger.warn('Cannot request metrics update: socket not connected');
    }
  }

  // Subscription helpers for specific metric types
  subscribeToVisitorCount(callback: (count: number) => void): () => void {
    if (!this.socket) return () => {};

    const handler = (data: any) => {
      if (data.type === 'visitor_count') {
        callback(data.count);
        }
};

    this.socket.on('metrics:realtime', handler);
    return () => this.socket?.off('metrics:realtime', handler);
  }

  subscribeToSystemHealth(callback: (health: number) => void): () => void {
    if (!this.socket) return () => {};

    const handler = (data: any) => {
      if (data.type === 'system_health') {
        callback(data.score);
        }
};

    this.socket.on('metrics:realtime', handler);
    return () => this.socket?.off('metrics:realtime', handler);
  }

  subscribeToSecurityEvents(callback: (event: any) => void): () => void {
    if (!this.socket) return () => {};

    this.socket.on('security:event', callback);
    return () => this.socket?.off('security:event', callback);
  }

  subscribeToPerformanceAlerts(callback: (alert: any) => void): () => void {
    if (!this.socket) return () => {};

    this.socket.on('performance:alert', callback);
    return () => this.socket?.off('performance:alert', callback);
  }

  // Emit analytics events
  emitUserAction(action: string, data: any): void {
    if (this.socket?.connected) {
      this.socket.emit('analytics:user-action', { action, data, timestamp: new Date() });
    }
  }

  emitPageView(page: string, user?: any): void {
    if (this.socket?.connected) {
      this.socket.emit('analytics:page-view', { 
        page, 
        user: user || null,
        timestamp: new Date(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      });
    }
  }

  emitConversionEvent(type: string, value?: number, metadata?: any): void {
    if (this.socket?.connected) {
      this.socket.emit('analytics:conversion', { 
        type, 
        value, 
        metadata,
        timestamp: new Date(),
      });
    }
  }
}

// Singleton instance
let analyticsSocket: AnalyticsSocketManager | null = null;

export const getAnalyticsSocket = (): AnalyticsSocketManager => {
  if (!analyticsSocket) {
    analyticsSocket = new AnalyticsSocketManager();
  }
  return analyticsSocket;
};

// React hook for using analytics socket
import { useEffect, useRef, useState } from 'react';

export function useAnalyticsSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeMetrics, setRealtimeMetrics] = useState<any>(null);
  const socketRef = useRef<AnalyticsSocketManager | null>(null);

  useEffect(() => {
    socketRef.current = getAnalyticsSocket();
    
    socketRef.current.connect();
    setIsConnected(socketRef.current.isConnected);

    // Subscribe to connection status
    const checkConnection = setInterval(() => {
      setIsConnected(socketRef.current?.isConnected || false);
    }, 1000);

    // Subscribe to real-time metrics
    const unsubscribe = socketRef.current.subscribeToRealTimeMetrics((data) => {
      setRealtimeMetrics(data);
    });

    return () => {
      clearInterval(checkConnection);
      unsubscribe();
      socketRef.current?.disconnect();
    };
  }, []);

  const requestUpdate = () => {
    socketRef.current?.requestMetricsUpdate();
  };

  const emitUserAction = (action: string, data: any) => {
    socketRef.current?.emitUserAction(action, data);
  };

  const emitPageView = (page: string, user?: any) => {
    socketRef.current?.emitPageView(page, user);
  };

  const emitConversion = (type: string, value?: number, metadata?: any) => {
    socketRef.current?.emitConversionEvent(type, value, metadata);
  };

  return {
    isConnected,
    realtimeMetrics,
    requestUpdate,
    emitUserAction,
    emitPageView,
    emitConversion,
    socket: socketRef.current,
  };
}

export default analyticsSocket;