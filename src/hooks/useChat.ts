import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { logger } from '@/lib/safe-logger';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface ChatOptions {
  enableSocket?: boolean;
  endpoint?: string;
}

export function useChat(options: ChatOptions = {}) {
  const { enableSocket = false, endpoint = '/api/chat' } = options;
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  // Initialize socket connection if enabled
  useEffect(() => {
    if (!enableSocket) {
      setIsConnected(true); // REST API is always "connected"
      return;
    }

    try {
      const newSocket = io({
        path: '/api/socket',
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        logger.info('Chat socket connected');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        logger.info('Chat socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('message', (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
        setIsTyping(false);
      });

      newSocket.on('typing', (data: { isTyping: boolean }) => {
        setIsTyping(data.isTyping);
      });

      newSocket.on('error', (error: any) => {
        logger.error('Chat socket error:', error);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } catch (error) {
      logger.error('Failed to initialize socket:', error);
      setIsConnected(false);
    }
  }, [enableSocket]);

  // Send message function
  const sendMessage = useCallback(async (
    content: string,
    metadata?: Record<string, any>
  ): Promise<ChatMessage | null> => {
    try {
      if (enableSocket && socket?.connected) {
        // Socket.io path
        const message: ChatMessage = {
          id: Date.now().toString(),
          content,
          role: 'user',
          timestamp: new Date(),
          metadata
        };
        
        socket.emit('message', { 
          content, 
          sessionId,
          metadata 
        });
        
        return message;
      } else {
        // REST API path
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content,
            sessionId,
            ...metadata
          })
        });

        if (!response.ok) {
          throw new Error(`Chat API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.sessionId) {
          setSessionId(data.sessionId);
        }

        const assistantMessage: ChatMessage = {
          id: Date.now().toString(),
          content: data.response,
          role: 'assistant',
          timestamp: new Date(),
          metadata: {
            intent: data.intent,
            confidence: data.confidence,
            agent: data.agent,
            ...data.metadata
            }
};

        return assistantMessage;
      }
    } catch (error) {
      logger.error('Error sending message:', error);
      return null;
    }
  }, [enableSocket, socket, endpoint, sessionId]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Load conversation history
  const loadHistory = useCallback(async (conversationId: string) => {
    try {
      const response = await fetch(`/api/chat/history/${conversationId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setSessionId(data.sessionId || '');
      }
    } catch (error) {
      logger.error('Error loading chat history:', error);
    }
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    loadHistory,
    isConnected,
    isTyping,
    sessionId
  };
}
