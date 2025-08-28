'use client';

import { useEffect, useState, useRef } from 'react';
import { logger } from '@/lib/safe-logger';
import type { Socket } from 'socket.io-client';

interface UseSocketReturn {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
}

export function useSocket(): UseSocketReturn {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Initialize socket connection
    const initSocket = async () => {
      // Skip socket connection in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[SOCKET] Skipping socket connection in development');
        return;
      }

      try {
        // Dynamically import socket.io-client to prevent SSR issues
        const { io } = await import('socket.io-client');

        // Connect to the WebSocket server
        const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || window.location.origin;
        const socket = io(socketUrl, {
          transports: ['websocket'],
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
          logger.info('Socket connected:', socket.id);
          setConnected(true);
          setError(null);
        });

        socket.on('disconnect', () => {
          logger.info('Socket disconnected');
          setConnected(false);
        });

        socket.on('connect_error', err => {
          logger.error('Socket connection error:', err);
          setError(err.message);
          setConnected(false);
        });

        socketRef.current = socket;
      } catch (err) {
        logger.error('Failed to initialize socket:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect');
        }
};

    initSocket();

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        }
};
  }, []);

  return {
    socket: socketRef.current,
    connected,
    error,
  };
}
