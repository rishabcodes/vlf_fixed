import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { wsLogger, userFlowLogger, logger, performanceLogger, securityLogger } from '../safe-logger';
import type { LogMeta } from '@/types/logger';
import { getPrismaClient } from '../prisma';
import { getRetellClient } from '../../services/retell/client';
import jwt from 'jsonwebtoken';
import { EventEmitter } from 'events';
import { createHash } from 'crypto';
import os from 'os';
import { performance } from 'perf_hooks';

interface SocketData {
  userId?: string;
  sessionId: string;
  language: string;
  conversationId?: string;
  roomId?: string;
  userRole?: string;
  authenticated: boolean;
}

interface ChatMessage {
  content: string;
  language?: string;
  metadata?: Record<string, unknown>;
}

interface CaseUpdateEvent {
  caseId: string;
  updateType:
    | 'status_change'
    | 'document_added'
    | 'note_added'
    | 'attorney_assigned'
    | 'task_updated';
  data: Record<string, unknown>;
}

interface NotificationEvent {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}

interface SystemMetrics {
  timestamp: number;
  uptime: number;
  memory: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
    external: number;
  };
  cpu: {
    user: number;
    system: number;
    load: number[];
  };
  connections: {
    total: number;
    authenticated: number;
    anonymous: number;
    rooms: number;
  };
  performance: {
    avgResponseTime: number;
    messageRate: number;
    errorRate: number;
  };
  circuitBreakers: {
    database: { status: string; failures: number };
    aiService: { status: string; failures: number };
    retell: { status: string; failures: number };
  };
  ai: {
    enhancedChatAvailable: boolean;
    translationAvailable: boolean;
    orchestratorAgentCount: number;
    averageResponseTime: number;
    totalProcessedMessages: number;
    errorRate: number;
  };
}

interface AdminCommand {
  type:
    | 'disconnect_user'
    | 'broadcast_message'
    | 'clear_room'
    | 'reset_circuit_breaker'
    | 'enable_maintenance'
    | 'disable_maintenance'
    | 'set_rate_limit';
  payload: Record<string, unknown>;
  adminId: string;
  timestamp: number;
}

interface AlertConfig {
  metric: string;
  threshold: number;
  comparison: 'gt' | 'lt' | 'eq';
  duration: number;
  enabled: boolean;
  lastTriggered?: number;
}

interface ConnectionInfo {
  socketId: string;
  sessionId: string;
  userId?: string;
  authenticated: boolean;
  connectedAt: number;
  lastActivity: number;
  ipAddress: string;
  userAgent: string;
  roomIds: string[];
  messageCount: number;
  errorCount: number;
  language: string;
}

// Room types for different conversation contexts
enum RoomType {
  CONVERSATION = 'conversation',
  CASE = 'case',
  SUPPORT = 'support',
  BROADCAST = 'broadcast',
}

export class ChatSocketServer extends EventEmitter {
  private io: SocketIOServer;
  private activeSessions: Map<string, SocketData> = new Map();
  private roomParticipants: Map<string, Set<string>> = new Map();
  private reconnectionTokens: Map<string, string> = new Map();

  // Enhanced monitoring and admin controls
  private connectionInfo: Map<string, ConnectionInfo> = new Map();
  private systemMetrics: SystemMetrics[] = [];
  private alertConfigs: Map<string, AlertConfig> = new Map();
  private adminSessions: Set<string> = new Set();
  private maintenanceMode: boolean = false;
  // Removed duplicate - performanceMetrics is properly defined later in the file with correct structure
  private messageRateTracker: Map<string, number[]> = new Map();
  private errorRateTracker: Map<string, number[]> = new Map();
  private serverStartTime: number = Date.now();
  private lastHealthCheck: number = 0;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private metricsCollectionInterval: NodeJS.Timeout | null = null;
  private alertingInterval: NodeJS.Timeout | null = null;
  private adminCommandHistory: AdminCommand[] = [];
  private shutdownInProgress: boolean = false;
  private customRateLimit: Map<string, { maxMessages: number; windowMs: number }> = new Map();

  // Message retry queue for failed database operations
  private messageRetryQueue: Map<
    string,
    {
      conversationId: string;
      role: 'user' | 'assistant';
      content: string;
      metadata?: Record<string, unknown>;
      timestamp: number;
      attempts: number;
    }[]
  > = new Map();

  // Circuit breakers for external services
  private aiServiceCircuitBreaker = {
    failures: 0,
    lastFailureTime: 0,
    isOpen: false,
    threshold: 3,
    resetTime: 60000, // 1 minute
  };

  private retellCircuitBreaker = {
    failures: 0,
    lastFailureTime: 0,
    isOpen: false,
    threshold: 3,
    resetTime: 120000, // 2 minutes
  };

  constructor(httpServer: HTTPServer) {
    super();

    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        credentials: true,
      },
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
      // Enhanced connection handling
      connectTimeout: 45000,
      upgradeTimeout: 10000,
      maxHttpBufferSize: 1e6, // 1MB
      allowEIO3: true,
    });

    this.setupMiddleware();
    this.setupEventHandlers();
    this.setupRoomHandlers();
    this.setupNotificationHandlers();
    this.setupCaseHandlers();
    this.setupReconnectionHandlers();
    this.setupAdminHandlers();
    this.startRetryWorker();
    this.setupConnectionMonitoring();
    this.initializeMonitoring();
    this.setupDefaultAlerts();
    this.startHealthChecks();
    this.startMetricsCollection();
    this.startAlerting();
    this.setupGracefulShutdown();
    this.startSitemapMonitor();
  }

  private setupMiddleware() {
    // Maintenance mode check
    this.io.use(async (socket, next) => {
      if (this.maintenanceMode && !this.isAdminConnection(socket)) {
        next(new Error('Server is in maintenance mode'));
        return;
      }
      next();
    });

    // Rate limiting middleware
    this.io.use(async (socket, next) => {
      const clientIp = socket.handshake.address;
      const now = Date.now();

      // Check for IP-based rate limiting
      if (!this.checkConnectionRateLimit(clientIp)) {
        securityLogger.suspiciousActivity('connection_rate_limit_exceeded', {
          ip: clientIp,
          userAgent: socket.handshake.headers['user-agent'],
          timestamp: now,
        });
        next(new Error('Connection rate limit exceeded'));
        return;
      }

      next();
    });

    // Authentication middleware
    this.io.use(async (socket, next) => {
      const startTime = performance.now();

      try {
        // Input validation
        const handshakeAuth = socket.handshake.auth || {};
        const sessionId =
          handshakeAuth.sessionId ||
          `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const language = handshakeAuth.language || 'en';
        const token = handshakeAuth.token;
        const reconnectionToken = handshakeAuth.reconnectionToken;
        const isAdmin = handshakeAuth.admin === true;

        // Validate inputs
        if (typeof sessionId !== 'string' || sessionId.length > 100) {
          throw new Error('Invalid session ID');
        }

        if (typeof language !== 'string' || !['en', 'es'].includes(language)) {
          throw new Error('Invalid language');
        }

        let userId: string | undefined;
        let userRole: string | undefined;
        let authenticated = false;
        let authMethod: string | undefined;

        // Admin authentication with enhanced security
        if (isAdmin && token) {
          try {
            const adminSecret = process.env.ADMIN_SECRET || process.env.NEXTAUTH_SECRET;
            if (!adminSecret) {
              throw new Error('Admin secret not configured');
            }

            const decoded = (await Promise.race([
              jwt.verify(token, adminSecret),
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Admin JWT verification timeout')), 5000)
              ),
            ])) as { id?: string; role?: string; exp?: number; admin?: boolean };

            if (decoded.admin && (decoded.role === 'ADMIN' || decoded.role === 'SUPER_ADMIN')) {
              userId = decoded.id;
              userRole = decoded.role;
              authenticated = true;
              authMethod = 'admin_jwt';

              this.adminSessions.add(socket.id);
              if (userId) {
                securityLogger.authenticationSuccess('admin_websocket', userId);
              }
            } else {
              throw new Error('Invalid admin credentials');
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            securityLogger.authenticationFailure('admin_websocket', undefined, errorMessage);
            throw new Error('Admin authentication failed');
          }
        }
        // Regular JWT authentication
        else if (token && typeof token === 'string') {
          try {
            const secret = process.env.NEXTAUTH_SECRET;
            if (!secret) {
              throw new Error('NextAuth secret not configured');
            }

            // Add timeout to JWT verification
            const decoded = (await Promise.race([
              jwt.verify(token, secret),
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('JWT verification timeout')), 5000)
              ),
            ])) as { id?: string; role?: string; exp?: number };

            // Check token expiration
            if (decoded.exp && decoded.exp < Date.now() / 1000) {
              throw new Error('Token expired');
            }

            userId = decoded.id;
            userRole = decoded.role;
            authenticated = true;
            authMethod = 'jwt';

            wsLogger.info(socket.id, `JWT authentication successful for user ${userId}`);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown JWT error';
            wsLogger.warn(socket.id, `JWT authentication failed: ${errorMessage}`);
            // Continue to try other auth methods
          }
        }

        // Try to reconnect with reconnection token
        if (!authenticated && reconnectionToken && typeof reconnectionToken === 'string') {
          try {
            const sessionData = this.reconnectionTokens.get(reconnectionToken);
            if (sessionData) {
              const previousSession = JSON.parse(sessionData);

              // Validate previous session data
              if (previousSession && typeof previousSession === 'object') {
                userId = previousSession.userId;
                userRole = previousSession.userRole;
                authenticated = previousSession.authenticated;
                authMethod = 'reconnection_token';

                this.reconnectionTokens.delete(reconnectionToken);
                wsLogger.info(
                  socket.id,
                  `Reconnection token authentication successful for user ${userId}`
                );
              }
            }
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'Unknown reconnection error';
            wsLogger.warn(socket.id, `Reconnection token authentication failed: ${errorMessage}`);
          }
        }

        socket.data = {
          sessionId,
          language,
          userId,
          userRole,
          authenticated,
        } as SocketData;

        // Store connection info for monitoring
        this.connectionInfo.set(socket.id, {
          socketId: socket.id,
          sessionId,
          userId,
          authenticated,
          connectedAt: Date.now(),
          lastActivity: Date.now(),
          ipAddress: socket.handshake.address,
          userAgent: socket.handshake.headers['user-agent'] || 'Unknown',
          roomIds: [],
          messageCount: 0,
          errorCount: 0,
          language,
        });

        const authDuration = performance.now() - startTime;
        performanceLogger.measure('socket_authentication', authDuration, {
          socketId: socket.id,
          authMethod,
          authenticated,
        });

        wsLogger.connection(socket.id, {
          sessionId,
          language,
          userId,
          authenticated,
          authMethod,
          userAgent: socket.handshake.headers['user-agent'],
          ip: socket.handshake.address,
          isAdmin: this.adminSessions.has(socket.id),
        });

        next();
      } catch (error) {
        const authDuration = performance.now() - startTime;
        performanceLogger.measure('socket_authentication_failed', authDuration, {
          socketId: socket.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        const errorMessage = error instanceof Error ? error.message : 'Unknown middleware error';
        wsLogger.error(socket.id, `Authentication middleware error: ${errorMessage}`);
        next(new Error(`Authentication failed: ${errorMessage}`));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on('connection', socket => {
      const clientId = socket.id;
      const socketData = socket.data as SocketData;

      this.activeSessions.set(clientId, socketData);

      // Generate reconnection token
      const reconnectionToken = this.generateReconnectionToken(socketData);
      socket.emit('auth:reconnection-token', { token: reconnectionToken });

      // Handle chat initialization
      socket.on('chat:init', async (data: { userId?: string; language?: string }) => {
        try {
          socketData.userId = data.userId || socketData.userId;
          if (data.language) {
            socketData.language = data.language;
          }

          // Create a new conversation
          const conversation = await getPrismaClient().conversation.create({
            data: {
              userId: socketData.userId || 'anonymous',
              channel: 'chat',
              status: 'active',
              language: socketData.language,
              metadata: {
                socketId: clientId,
                sessionId: socketData.sessionId,
                authenticated: socketData.authenticated,
              },
            },
          });

          socketData.conversationId = conversation.id;
          socketData.roomId = `conversation_${conversation.id}`;

          // Join conversation room
          await this.joinRoom(socket, socketData.roomId, RoomType.CONVERSATION);

          // Send welcome message
          const welcomeMessage = await this.getWelcomeMessage(socketData.language);
          socket.emit('message', {
            role: 'assistant',
            content: welcomeMessage,
            timestamp: new Date().toISOString(),
          });

          wsLogger.message(clientId, 'chat_initialized', 'outbound', welcomeMessage.length);
        } catch (error) {
          wsLogger.error(clientId, error);
          socket.emit('error', { message: 'Failed to initialize chat' });
        }
      });

      // Handle incoming messages
      socket.on('message', async (message: ChatMessage) => {
        const processingStartTime = Date.now();
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        try {
          // Update connection activity
          const connectionInfo = this.connectionInfo.get(clientId);
          if (connectionInfo) {
            connectionInfo.lastActivity = Date.now();
            connectionInfo.messageCount++;
          }

          // Input validation
          if (!message || typeof message !== 'object') {
            throw new Error('Invalid message format');
          }

          const { content, metadata } = message;

          if (!content || typeof content !== 'string') {
            throw new Error('Message content is required and must be a string');
          }

          if (content.length > 10000) {
            throw new Error('Message too long');
          }

          if (content.trim().length === 0) {
            throw new Error('Message cannot be empty');
          }

          // Enhanced rate limiting check
          if (!this.checkEnhancedRateLimit(clientId)) {
            this.trackErrorRate(clientId);
            socket.emit('error', {
              message: 'Too many messages. Please slow down.',
              type: 'rate_limit_exceeded',
              retryAfter: 60,
            });
            return;
          }

          // Track message rate
          this.trackMessageRate(clientId);

          wsLogger.message(clientId, 'user_message', 'inbound', content.length);
          userFlowLogger.flowStep('chat_interaction', 'message_received', socketData.sessionId);

          // Store user message with database fallback
          if (socketData.conversationId) {
            const conversationId = socketData.conversationId;
            await this.withDatabaseFallback(
              () =>
                getPrismaClient().message.create({
                  data: {
                    conversationId,
                    role: 'user',
                    content,
                    metadata: metadata ? { ...metadata, messageId } : { messageId },
                  },
                }),
              () => {
                // Fallback: Store in memory for later retry
                if (socketData.conversationId) {
                  this.storeMessageForRetry(socketData.conversationId, 'user', content, metadata);
                }
                return { id: messageId };
              },
              'store_user_message'
            );
          }

          // Broadcast typing indicator to room
          if (socketData.roomId) {
            socket.to(socketData.roomId).emit('typing', {
              userId: socketData.userId,
              isTyping: true,
            });
          }

          // Send typing indicator
          socket.emit('typing', { isTyping: true });

          // Process message with AI (with retry logic)
          const response = await this.processMessageWithRetry(content, socketData, messageId);

          // Store AI response with database fallback
          if (socketData.conversationId) {
            const conversationId = socketData.conversationId;
            await this.withDatabaseFallback(
              () =>
                getPrismaClient().message.create({
                  data: {
                    conversationId,
                    role: 'assistant',
                    content: response.content,
                    metadata: response.metadata
                      ? { ...response.metadata, messageId }
                      : { messageId },
                  },
                }),
              () => {
                // Fallback: Store in memory for later retry
                if (socketData.conversationId) {
                  this.storeMessageForRetry(
                    socketData.conversationId,
                    'assistant',
                    response.content,
                    response.metadata
                  );
                }
                return { id: messageId };
              },
              'store_assistant_message'
            );
          }

          // Send response
          socket.emit('typing', { isTyping: false });
          socket.emit('message', {
            role: 'assistant',
            content: response.content,
            metadata: response.metadata,
            timestamp: new Date().toISOString(),
            messageId,
          });

          // Broadcast to room if applicable
          if (socketData.roomId) {
            socket.to(socketData.roomId).emit('typing', {
              userId: socketData.userId,
              isTyping: false,
            });
          }

          const processingDuration = Date.now() - processingStartTime;
          wsLogger.message(clientId, 'assistant_message', 'outbound', response.content.length);

          // Track performance
          if (processingDuration > 5000) {
            wsLogger.warn(clientId, `Slow message processing: ${processingDuration}ms`);
          }

          // Check if we need to escalate to human or voice
          if (response.metadata?.escalate && response.metadata?.escalationType) {
            await this.handleEscalationWithRetry(
              socket,
              response.metadata.escalationType as string
            );
          }
        } catch (error) {
          // Update error tracking
          const connectionInfo = this.connectionInfo.get(clientId);
          if (connectionInfo) {
            connectionInfo.errorCount++;
          }

          this.trackErrorRate(clientId);

          const errorForLogging = error instanceof Error ? error.message : 'Unknown error';
          wsLogger.error(clientId, errorForLogging);
          socket.emit('typing', { isTyping: false });

          // Provide specific error messages based on error type
          let errorMessage = 'Failed to process message';
          let errorType = 'processing_error';

          if (error instanceof Error) {
            if (error.message.includes('rate limit')) {
              errorMessage = 'Too many messages. Please slow down.';
              errorType = 'rate_limit_exceeded';
            } else if (error.message.includes('Invalid message format')) {
              errorMessage = 'Invalid message format';
              errorType = 'invalid_format';
            } else if (error.message.includes('Message too long')) {
              errorMessage = 'Message is too long. Please keep messages under 10,000 characters.';
              errorType = 'message_too_long';
            } else if (error.message.includes('Message cannot be empty')) {
              errorMessage = 'Message cannot be empty';
              errorType = 'empty_message';
            }
          }

          socket.emit('error', {
            message: errorMessage,
            type: errorType,
            messageId,
            canRetry: !['invalid_format', 'message_too_long', 'empty_message'].includes(errorType),
          });

          // Emit error event for monitoring
          this.emit('message_error', {
            socketId: clientId,
            messageId,
            error: error instanceof Error ? error.message : 'Unknown error',
            errorType,
          });
        }
      });

      // Handle virtual assistant messages
      socket.on(
        'user:message',
        async (data: { text: string; language: string; timestamp: string }) => {
          try {
            const { text, language, timestamp } = data;

            wsLogger.message(clientId, 'virtual_assistant_message', 'inbound', text.length);

            // Store user message
            if (socketData.conversationId) {
              await getPrismaClient().message.create({
                data: {
                  conversationId: socketData.conversationId,
                  role: 'user',
                  content: text,
                  metadata: { source: 'virtual_assistant', timestamp },
                },
              });
            }

            // Process with AI
            const response = await this.processMessage(text, { ...socketData, language });

            // Store AI response
            if (socketData.conversationId) {
              await getPrismaClient().message.create({
                data: {
                  conversationId: socketData.conversationId,
                  role: 'assistant',
                  content: response.content,
                  metadata: response.metadata
                    ? ({ ...response.metadata, source: 'virtual_assistant' } as any)
                    : { source: 'virtual_assistant' },
                },
              });
            }

            // Send response to virtual assistant
            socket.emit('assistant:message', {
              id: Date.now().toString(),
              text: response.content,
              metadata: response.metadata,
              timestamp: new Date().toISOString(),
            });

            wsLogger.message(
              clientId,
              'virtual_assistant_response',
              'outbound',
              response.content.length
            );
          } catch (error) {
            wsLogger.error(clientId, error);
            socket.emit('assistant:error', { message: 'Failed to process message' });
          }
        }
      );

      // Handle language change
      socket.on('language:change', (language: string) => {
        try {
          if (typeof language === 'string' && ['en', 'es'].includes(language)) {
            socketData.language = language;
            socket.emit('language:changed', { language });
          } else {
            socket.emit('error', { message: 'Invalid language' });
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          wsLogger.error(clientId, `Language change error: ${errorMsg}`);
          socket.emit('error', { message: 'Failed to change language' });
        }
      });

      // Handle heartbeat/ping
      socket.on('heartbeat', () => {
        try {
          socket.emit('heartbeat-ack', { timestamp: new Date().toISOString() });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          wsLogger.error(clientId, `Heartbeat error: ${errorMsg}`);
        }
      });

      // Handle typing indicators
      socket.on('typing:start', () => {
        if (socketData.roomId) {
          socket.to(socketData.roomId).emit('typing', {
            userId: socketData.userId,
            isTyping: true,
          });
        }
      });

      socket.on('typing:stop', () => {
        if (socketData.roomId) {
          socket.to(socketData.roomId).emit('typing', {
            userId: socketData.userId,
            isTyping: false,
          });
        }
      });

      // Handle disconnect
      socket.on('disconnect', async reason => {
        try {
          const sessionDuration = Date.now() - parseInt(socketData.sessionId.split('_')[1] || '0');
          const connectionInfo = this.connectionInfo.get(clientId);

          wsLogger.disconnection(clientId, reason, sessionDuration);

          // Leave all rooms
          if (socketData.roomId) {
            await this.leaveRoom(socket, socketData.roomId);
          }

          // Update conversation status
          if (socketData.conversationId) {
            await getPrismaClient().conversation.update({
              where: { id: socketData.conversationId },
              data: {
                status: 'closed',
                endedAt: new Date(),
                metadata: {
                  disconnectReason: reason,
                  duration: sessionDuration,
                  messageCount: connectionInfo?.messageCount || 0,
                  errorCount: connectionInfo?.errorCount || 0,
                },
              },
            });
          }

          // Clean up admin session
          if (this.adminSessions.has(clientId)) {
            this.adminSessions.delete(clientId);
            logger.info('Admin session disconnected', { socketId: clientId, reason });
          }

          // Clean up tracking data
          this.activeSessions.delete(clientId);
          this.connectionInfo.delete(clientId);
          this.messageRateTracker.delete(clientId);
          this.errorRateTracker.delete(clientId);

          // Emit disconnect event for monitoring
          this.emit('client_disconnect', {
            socketId: clientId,
            reason,
            duration: sessionDuration,
            connectionInfo,
          });
        } catch (error) {
          wsLogger.error(clientId, error);
        }
      });
    });
  }

  private setupRoomHandlers() {
    this.io.on('connection', socket => {
      const socketData = socket.data as SocketData;

      // Join a specific room
      socket.on('room:join', async (data: { roomId: string; roomType: RoomType }) => {
        try {
          // Check authorization
          if (!this.canJoinRoom(socketData, data.roomId, data.roomType)) {
            socket.emit('room:error', { message: 'Unauthorized to join this room' });
            return;
          }

          await this.joinRoom(socket, data.roomId, data.roomType);
          socket.emit('room:joined', { roomId: data.roomId });

          // Notify other participants
          socket.to(data.roomId).emit('room:participant-joined', {
            userId: socketData.userId,
            socketId: socket.id,
          });
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('room:error', { message: 'Failed to join room' });
        }
      });

      // Leave a room
      socket.on('room:leave', async (data: { roomId: string }) => {
        try {
          await this.leaveRoom(socket, data.roomId);
          socket.emit('room:left', { roomId: data.roomId });

          // Notify other participants
          socket.to(data.roomId).emit('room:participant-left', {
            userId: socketData.userId,
            socketId: socket.id,
          });
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('room:error', { message: 'Failed to leave room' });
        }
      });

      // Send message to room
      socket.on('room:message', async (data: { roomId: string; message: string }) => {
        try {
          if (!socket.rooms.has(data.roomId)) {
            socket.emit('room:error', { message: 'Not in this room' });
            return;
          }

          // Broadcast to room
          this.io.to(data.roomId).emit('room:message', {
            userId: socketData.userId,
            message: data.message,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('room:error', { message: 'Failed to send room message' });
        }
      });
    });
  }

  private setupNotificationHandlers() {
    this.io.on('connection', socket => {
      const socketData = socket.data as SocketData;

      // Subscribe to notifications
      socket.on('notifications:subscribe', async () => {
        try {
          if (!socketData.userId) {
            socket.emit('notifications:error', { message: 'Authentication required' });
            return;
          }

          // Join user's notification room
          const notificationRoom = `notifications_${socketData.userId}`;
          socket.join(notificationRoom);

          // Fetch and send unread notifications
          const unreadNotifications = await getPrismaClient().notification.findMany({
            where: {
              userId: socketData.userId,
              read: false,
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          });

          socket.emit('notifications:initial', { notifications: unreadNotifications });
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('notifications:error', { message: 'Failed to subscribe to notifications' });
        }
      });

      // Mark notification as read
      socket.on('notifications:mark-read', async (data: { notificationId: string }) => {
        try {
          if (!socketData.userId) {
            socket.emit('notifications:error', { message: 'Authentication required' });
            return;
          }

          await getPrismaClient().notification.update({
            where: {
              id: data.notificationId,
              userId: socketData.userId,
            },
            data: { read: true },
          });

          socket.emit('notifications:marked-read', { notificationId: data.notificationId });
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('notifications:error', { message: 'Failed to mark notification as read' });
        }
      });
    });
  }

  private setupCaseHandlers() {
    this.io.on('connection', socket => {
      const socketData = socket.data as SocketData;

      // Subscribe to case updates
      socket.on('case:subscribe', async (data: { caseId: string }) => {
        try {
          if (!socketData.authenticated) {
            socket.emit('case:error', { message: 'Authentication required' });
            return;
          }

          // Verify user has access to this case
          const userCase = await getPrismaClient().case.findFirst({
            where: {
              id: data.caseId,
              OR: [{ clientId: socketData.userId }, { attorneyId: socketData.userId }],
            },
          });

          if (!userCase) {
            socket.emit('case:error', { message: 'Unauthorized to access this case' });
            return;
          }

          // Join case room
          const caseRoom = `case_${data.caseId}`;
          await this.joinRoom(socket, caseRoom, RoomType.CASE);

          socket.emit('case:subscribed', { caseId: data.caseId });
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('case:error', { message: 'Failed to subscribe to case updates' });
        }
      });

      // Unsubscribe from case updates
      socket.on('case:unsubscribe', async (data: { caseId: string }) => {
        try {
          const caseRoom = `case_${data.caseId}`;
          await this.leaveRoom(socket, caseRoom);
          socket.emit('case:unsubscribed', { caseId: data.caseId });
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('case:error', { message: 'Failed to unsubscribe from case updates' });
        }
      });
    });
  }

  private setupReconnectionHandlers() {
    this.io.on('connection', socket => {
      const socketData = socket.data as SocketData;

      // Handle reconnection
      socket.on('reconnect:attempt', async (data: { conversationId?: string }) => {
        try {
          if (data.conversationId) {
            // Restore conversation state
            const conversation = await getPrismaClient().conversation.findUnique({
              where: { id: data.conversationId },
              include: {
                messages: {
                  orderBy: { createdAt: 'desc' },
                  take: 20,
                },
              },
            });

            if (conversation) {
              socketData.conversationId = conversation.id;
              socketData.roomId = `conversation_${conversation.id}`;

              // Rejoin room
              await this.joinRoom(socket, socketData.roomId, RoomType.CONVERSATION);

              // Send conversation history
              socket.emit('reconnect:success', {
                conversation: {
                  id: conversation.id,
                  messages: conversation.messages.reverse(),
                },
              });
            }
          }
        } catch (error) {
          wsLogger.error(socket.id, error);
          socket.emit('reconnect:error', { message: 'Failed to restore session' });
        }
      });
    });
  }

  // Circuit breaker for database operations
  private dbCircuitBreaker = {
    failures: 0,
    lastFailureTime: 0,
    isOpen: false,
    threshold: 5,
    resetTime: 30000, // 30 seconds
  };

  private async withDatabaseFallback<T>(
    operation: () => Promise<T>,
    fallback: () => T | Promise<T>,
    operationName: string
  ): Promise<T> {
    // Check circuit breaker
    if (this.dbCircuitBreaker.isOpen) {
      const now = Date.now();
      if (now - this.dbCircuitBreaker.lastFailureTime < this.dbCircuitBreaker.resetTime) {
        wsLogger.warn('db_circuit_breaker', `Database circuit breaker open for ${operationName}`);
        return await fallback();
      }
      // Reset circuit breaker
      this.dbCircuitBreaker.isOpen = false;
      this.dbCircuitBreaker.failures = 0;
    }

    try {
      const result = await Promise.race([
        operation(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Database operation timeout')), 5000)
        ),
      ]);

      // Reset failure count on success
      this.dbCircuitBreaker.failures = 0;
      return result;
    } catch (error) {
      this.dbCircuitBreaker.failures++;
      this.dbCircuitBreaker.lastFailureTime = Date.now();

      if (this.dbCircuitBreaker.failures >= this.dbCircuitBreaker.threshold) {
        this.dbCircuitBreaker.isOpen = true;
        wsLogger.error(
          'db_circuit_breaker',
          `Database circuit breaker opened after ${this.dbCircuitBreaker.failures} failures`
        );
      }

      const errorMsg = error instanceof Error ? error.message : 'Unknown database error';
      logger.error('Database operation failed', { operationName, error: errorMsg });
      return await fallback();
    }
  }

  private async processMessage(content: string, socketData: SocketData) {
    try {
      // Import enhanced services
      const { enhancedChatService } = await import('@/lib/ai/enhanced-chat-service');
      const { aiTranslationService } = await import('@/lib/ai/translation-service');

      const startTime = performance.now();

      // Get conversation history from this socket session
      const conversationHistory = this.getConversationHistory(socketData.sessionId);

      // Build enhanced context for AI processing
      const enhancedContext = {
        userId: socketData.userId,
        sessionId: socketData.sessionId,
        language: socketData.language,
        socketId: socketData.sessionId, // Using sessionId as socket identifier
        history: conversationHistory.slice(-10), // Last 10 messages for context
        conversationContext: conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp || Date.now(),
        })),
        userProfile: (await this.getUserProfile(socketData.userId)) || undefined,
        metadata: {
          source: 'socket' as const,
          quickResponse: undefined,
          socketConnectedAt: socketData.authenticated ? new Date().toISOString() : undefined,
          roomId: socketData.roomId,
          userRole: socketData.userRole,
        },
      };

      // Detect language if not explicitly set
      if (!socketData.language || socketData.language === 'auto') {
        const detectedLanguage = await aiTranslationService.detectLanguage(content);
        if (detectedLanguage !== 'unknown') {
          socketData.language = detectedLanguage;
          enhancedContext.language = detectedLanguage;
        }
      }

      // Process message through enhanced AI service
      const aiResponse = await enhancedChatService.processMessage(content, enhancedContext);

      // Store message in conversation history
      this.addToConversationHistory(socketData.sessionId, {
        role: 'user',
        content,
        timestamp: Date.now(),
      });

      this.addToConversationHistory(socketData.sessionId, {
        role: 'assistant',
        content: aiResponse.response,
        timestamp: Date.now(),
        metadata: {
          agent: aiResponse.agent,
          processingTime: aiResponse.processingTime,
          confidence: aiResponse.confidence,
        },
      });

      // Handle escalations
      if (aiResponse.escalation) {
        const escalation = aiResponse.escalation;
        if (escalation) {
          setTimeout(() => {
            this.handleAIEscalation(socketData.sessionId, escalation);
          }, 1000); // Small delay to ensure message is sent first
        }
      }

      // Handle follow-up actions
      if (aiResponse.followUpActions && aiResponse.followUpActions.length > 0) {
        this.scheduleFollowUpActions(socketData.sessionId, aiResponse.followUpActions);
      }

      // Update performance metrics
      this.updatePerformanceMetrics('ai_message_processing', Date.now() - startTime);

      logger.info('AI message processed', {
        sessionId: socketData.sessionId,
        agent: aiResponse.agent,
        intent: aiResponse.intentAnalysis?.primary,
        confidence: aiResponse.confidence,
        processingTime: aiResponse.processingTime,
        language: socketData.language,
      });

      return {
        content: aiResponse.response,
        metadata: {
          intent: aiResponse.intentAnalysis?.primary,
          agent: aiResponse.agent,
          confidence: aiResponse.confidence,
          suggestions: aiResponse.suggestions,
          actions: aiResponse.actions,
          escalate: !!aiResponse.escalation,
          escalationType: aiResponse.escalation?.type,
          followUpActions: aiResponse.followUpActions,
          processingTime: aiResponse.processingTime,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown AI error';
      wsLogger.error('AI processing error', {
        sessionId: socketData.sessionId,
        error: errorMessage,
      });

      // Fallback to basic keyword-based responses
      return this.getBasicResponse(content, socketData);
    }
  }

  private getBasicResponse(content: string, socketData: SocketData) {
    const lowerContent = content.toLowerCase();

    // Emergency patterns - highest priority
    if (/(urgent|emergency|emergencia|urgente|help|ayuda|asap)/.test(lowerContent)) {
      return {
        content:
          socketData.language === 'es'
            ? 'Esto parece urgente. Por favor llama inmediatamente al 1-844-967-3536 para asistencia urgente.'
            : 'This seems urgent. Please call immediately at 1-844-967-3536 for urgent assistance.',
        metadata: {
          intent: 'emergency',
          escalate: true,
          escalationType: 'urgent',
          priority: 'high',
        },
      };
    }

    // Appointment scheduling
    if (/(appointment|schedule|consulta|cita|programar|book)/.test(lowerContent)) {
      return {
        content:
          socketData.language === 'es'
            ? 'Puedo ayudarte a programar una consulta. Llama al 1-844-967-3536 o dime qué tipo de asunto legal tienes.'
            : 'I can help you schedule a consultation. Call 1-844-967-3536 or tell me what type of legal matter you have.',
        metadata: {
          intent: 'appointment',
          actions: [{ type: 'show-contact', data: { phone: '1-844-967-3536' } }],
        },
      };
    }

    // Practice area specific responses
    if (/(immigration|visa|green card|deportation|ciudadania|inmigracion)/.test(lowerContent)) {
      return {
        content:
          socketData.language === 'es'
            ? 'Nuestro equipo de inmigración puede ayudarte. ¿Necesitas ayuda con visas, residencia, ciudadanía o defensa de deportación?'
            : 'Our immigration team can help you. Do you need assistance with visas, green cards, citizenship, or deportation defense?',
        metadata: {
          intent: 'immigration',
          practiceArea: 'immigration',
          suggestions:
            socketData.language === 'es'
              ? ['Consulta de inmigración', 'Defensa de deportación', 'Ciudadanía']
              : ['Immigration consultation', 'Deportation defense', 'Citizenship'],
        },
      };
    }

    if (/(accident|injury|personal injury|accidente|lesion)/.test(lowerContent)) {
      return {
        content:
          socketData.language === 'es'
            ? 'Lamento escuchar sobre tu accidente. Nuestro equipo de lesiones personales puede ayudarte. ¿Cuándo ocurrió?'
            : "I'm sorry to hear about your accident. Our personal injury team can help you. When did it occur?",
        metadata: {
          intent: 'personal_injury',
          practiceArea: 'personal_injury',
          suggestions:
            socketData.language === 'es'
              ? ['Accidente de auto', 'Lesión laboral', 'Consulta gratis']
              : ['Car accident', 'Work injury', 'Free consultation'],
        },
      };
    }

    if (/(criminal|arrest|dui|dwi|criminal|arresto|cargos)/.test(lowerContent)) {
      return {
        content:
          socketData.language === 'es'
            ? 'Nuestros abogados de defensa criminal pueden ayudarte. Es importante actuar rápido. ¿Qué tipo de cargos enfrentas?'
            : "Our criminal defense attorneys can help you. It's important to act quickly. What type of charges are you facing?",
        metadata: {
          intent: 'criminal_defense',
          practiceArea: 'criminal_defense',
          priority: 'high',
          suggestions:
            socketData.language === 'es'
              ? ['Defensa DUI', 'Cargos criminales', 'Llamar ahora']
              : ['DUI defense', 'Criminal charges', 'Call now'],
        },
      };
    }

    // Voice/phone requests
    if (/(speak|talk|call|hablar|llamar|telefono|phone)/.test(lowerContent)) {
      return {
        content:
          socketData.language === 'es'
            ? '¿Te gustaría hablar con alguien? Puedes llamar al 1-844-967-3536 o puedo transferirte a nuestro asistente de voz.'
            : 'Would you like to speak with someone? You can call 1-844-967-3536 or I can transfer you to our voice assistant.',
        metadata: {
          escalate: true,
          escalationType: 'voice',
          actions: [
            { type: 'show-contact', data: { phone: '1-844-967-3536' } },
            { type: 'offer-voice-transfer', data: {} },
          ],
        },
      };
    }

    // Fees and costs
    if (/(cost|fee|price|money|payment|costo|precio|dinero|pago)/.test(lowerContent)) {
      return {
        content:
          socketData.language === 'es'
            ? 'Muchas consultas son gratuitas. Para lesiones personales trabajamos sin honorarios hasta ganar. Llama al 1-844-967-3536 para discutir tu caso.'
            : 'Many consultations are free. For personal injury we work on contingency (no fees unless we win). Call 1-844-967-3536 to discuss your case.',
        metadata: {
          intent: 'fees',
          suggestions:
            socketData.language === 'es'
              ? ['Consulta gratis', 'Sin honorarios hasta ganar', 'Llamar ahora']
              : ['Free consultation', 'No fees unless we win', 'Call now'],
        },
      };
    }

    // Spanish language request
    if (socketData.language === 'en' && /(spanish|español|habla|espanol)/.test(lowerContent)) {
      return {
        content:
          '¡Perfecto! Hablamos español. ¿Cómo puedo ayudarte hoy? Para asistencia inmediata, llama al 1-844-967-3536.',
        metadata: {
          intent: 'language_switch',
          language_switched: 'es',
          actions: [{ type: 'switch-language', data: { language: 'es' } }],
        },
      };
    }

    // Default response
    return {
      content:
        socketData.language === 'es'
          ? 'Entiendo tu consulta. Para una respuesta específica sobre tu situación legal, te recomiendo hablar con uno de nuestros abogados. Llama al 1-844-967-3536 para una consulta.'
          : 'I understand your inquiry. For a specific response about your legal situation, I recommend speaking with one of our attorneys. Call 1-844-967-3536 for a consultation.',
      metadata: {
        intent: 'general',
        actions: [{ type: 'show-contact', data: { phone: '1-844-967-3536' } }],
        suggestions:
          socketData.language === 'es'
            ? ['Llamar ahora', 'Programar consulta', 'Nuestros servicios']
            : ['Call now', 'Schedule consultation', 'Our services'],
      },
    };
  }

  // Conversation history management
  private conversationHistories: Map<
    string,
    Array<{
      role: string;
      content: string;
      timestamp: number;
      metadata?: Record<string, unknown>;
    }>
  > = new Map();

  private getConversationHistory(sessionId: string) {
    return this.conversationHistories.get(sessionId) || [];
  }

  private addToConversationHistory(
    sessionId: string,
    message: {
      role: string;
      content: string;
      timestamp: number;
      metadata?: Record<string, unknown>;
    }
  ) {
    if (!this.conversationHistories.has(sessionId)) {
      this.conversationHistories.set(sessionId, []);
    }

    const history = this.conversationHistories.get(sessionId)!;
    history.push(message);

    // Keep only last 50 messages per session
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }
  }

  // User profile management
  private async getUserProfile(userId?: string) {
    if (!userId) return null;

    try {
      // This would typically fetch from database
      // For now, return basic profile structure
      return {
        tier: 'standard',
        practiceAreas: ['general'],
        urgencyLevel: 'medium',
        communicationPreference: 'chat',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      wsLogger.error('Error fetching user profile', {
        context: 'user-profile',
        error: errorMessage,
      });
      return null;
    }
  }

  // AI Escalation handling
  private async handleAIEscalation(
    sessionId: string,
    escalation: {
      type: 'voice' | 'human' | 'urgent' | 'technical';
      reason: string;
      metadata?: Record<string, unknown>;
    }
  ) {
    const socket = this.getSocketBySessionId(sessionId);
    if (!socket) return;

    const socketData = socket.data as SocketData;

    switch (escalation.type) {
      case 'urgent':
        socket.emit('escalation', {
          type: 'urgent',
          message:
            socketData.language === 'es'
              ? 'Esto requiere atención inmediata. Te estoy conectando con nuestro equipo urgente.'
              : "This requires immediate attention. I'm connecting you with our urgent team.",
          phoneNumber: '1-844-967-3536',
          priority: 'high',
        });
        break;

      case 'voice':
        await this.handleEscalation(socket, 'voice');
        break;

      case 'human':
        await this.handleEscalation(socket, 'human');
        break;

      case 'technical':
        socket.emit('escalation', {
          type: 'technical',
          message:
            socketData.language === 'es'
              ? 'Experiencia problema técnico. Por favor llama al 1-844-967-3536.'
              : 'Experiencing technical issues. Please call 1-844-967-3536.',
          phoneNumber: '1-844-967-3536',
        });
        break;
    }

    logger.info('AI escalation handled', {
      sessionId,
      type: escalation.type,
      reason: escalation.reason,
    });
  }

  // Follow-up actions scheduling
  private scheduleFollowUpActions(
    sessionId: string,
    actions: Array<{
      type: string;
      delay: number;
      content: string;
    }>
  ) {
    actions.forEach(action => {
      setTimeout(() => {
        const socket = this.getSocketBySessionId(sessionId);
        if (socket) {
          socket.emit('follow_up', {
            type: action.type,
            content: action.content,
            timestamp: new Date().toISOString(),
          });
        }
      }, action.delay);
    });
  }

  // Helper to get socket by session ID
  private getSocketBySessionId(sessionId: string) {
    for (const [socketId, socket] of this.io.sockets.sockets) {
      const socketData = socket.data as SocketData;
      if (socketData.sessionId === sessionId) {
        return socket;
      }
    }
    return null;
  }

  // Performance metrics tracking
  private performanceMetrics: Map<
    string,
    {
      count: number;
      totalTime: number;
      averageTime: number;
      lastUpdated: number;
    }
  > = new Map();

  private updatePerformanceMetrics(operation: string, duration: number) {
    const existing = this.performanceMetrics.get(operation);

    if (existing) {
      existing.count++;
      existing.totalTime += duration;
      existing.averageTime = existing.totalTime / existing.count;
      existing.lastUpdated = Date.now();
    } else {
      this.performanceMetrics.set(operation, {
        count: 1,
        totalTime: duration,
        averageTime: duration,
        lastUpdated: Date.now(),
      });
    }
  }

  private async getWelcomeMessage(language: string): Promise<string> {
    if (language === 'es') {
      return '¡Hola! Soy el asistente virtual de Vasquez Law Firm. ¿Cómo puedo ayudarte hoy?';
    }
    return "Hello! I'm the Vasquez Law Firm virtual assistant. How can I help you today?";
  }

  private async handleEscalation(socket: Socket, escalationType: string) {
    const socketData = socket.data as SocketData;

    switch (escalationType) {
      case 'voice':
        // Create a Retell call for the user
        const retellClient = getRetellClient();

        socket.emit('escalation', {
          type: 'voice',
          message:
            socketData.language === 'es'
              ? 'Te estoy transfiriendo a nuestro asistente de voz. Por favor, llama al 1-844-YO-PELEO.'
              : "I'm transferring you to our voice assistant. Please call 1-844-YO-PELEO.",
          phoneNumber: '1-844-967-3536',
        });
        break;

      case 'human':
        // Create support ticket for human agent
        if (socketData.userId && socketData.conversationId) {
          await getPrismaClient().supportTicket.create({
            data: {
              userId: socketData.userId,
              subject: 'Human Agent Requested',
              description: `User requested to speak with a human agent during conversation ${socketData.conversationId}`,
              category: 'GENERAL_INQUIRY',
              priority: 'HIGH',
              status: 'OPEN',
              metadata: {
                requestedAt: new Date(),
                language: socketData.language,
                conversationId: socketData.conversationId,
              },
            },
          });
        }

        socket.emit('escalation', {
          type: 'human',
          message:
            socketData.language === 'es'
              ? 'Un miembro de nuestro equipo se pondrá en contacto contigo pronto.'
              : 'A member of our team will be in touch with you shortly.',
        });
        break;
    }
  }

  // Room management methods
  private async joinRoom(socket: Socket, roomId: string, roomType: RoomType) {
    try {
      // Validate room ID
      if (!roomId || typeof roomId !== 'string' || roomId.length > 100) {
        throw new Error('Invalid room ID');
      }

      socket.join(roomId);

      if (!this.roomParticipants.has(roomId)) {
        this.roomParticipants.set(roomId, new Set());
      }
      const participants = this.roomParticipants.get(roomId);
      if (participants) {
        participants.add(socket.id);
      }

      wsLogger.info(socket.id, `Joined room: ${roomId} (${roomType})`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      wsLogger.error(socket.id, `Failed to join room ${roomId}: ${errorMessage}`);
      throw error;
    }
  }

  private async leaveRoom(socket: Socket, roomId: string) {
    try {
      socket.leave(roomId);

      const participants = this.roomParticipants.get(roomId);
      if (participants) {
        participants.delete(socket.id);
        if (participants.size === 0) {
          this.roomParticipants.delete(roomId);
        }
      }

      wsLogger.info(socket.id, `Left room: ${roomId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      wsLogger.error(socket.id, `Failed to leave room ${roomId}: ${errorMessage}`);
      // Don't throw - leaving a room should be non-critical
    }
  }

  private canJoinRoom(socketData: SocketData, roomId: string, roomType: RoomType): boolean {
    // Implement authorization logic based on room type
    switch (roomType) {
      case RoomType.CONVERSATION:
        // Users can join their own conversations
        return true;
      case RoomType.CASE:
        // Only authenticated users with case access
        return socketData.authenticated;
      case RoomType.SUPPORT:
        // Only support staff and the requesting user
        return (
          socketData.authenticated &&
          (socketData.userRole === 'ADMIN' || socketData.userRole === 'ATTORNEY')
        );
      case RoomType.BROADCAST:
        // Everyone can join broadcast rooms
        return true;
      default:
        return false;
    }
  }

  // Rate limiting
  private rateLimitMap: Map<string, number[]> = new Map();
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
  private readonly RATE_LIMIT_MAX = 30; // 30 messages per minute

  private checkRateLimit(clientId: string): boolean {
    const now = Date.now();
    const timestamps = this.rateLimitMap.get(clientId) || [];

    // Remove timestamps outside the window
    const validTimestamps = timestamps.filter(t => now - t < this.RATE_LIMIT_WINDOW);

    if (validTimestamps.length >= this.RATE_LIMIT_MAX) {
      return false;
    }

    validTimestamps.push(now);
    this.rateLimitMap.set(clientId, validTimestamps);

    return true;
  }

  // Reconnection token generation
  private generateReconnectionToken(socketData: SocketData): string {
    const token = `reconnect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const tokenData = JSON.stringify({
      userId: socketData.userId,
      userRole: socketData.userRole,
      authenticated: socketData.authenticated,
      language: socketData.language,
      conversationId: socketData.conversationId,
    });

    this.reconnectionTokens.set(token, tokenData);

    // Clean up old tokens after 5 minutes
    setTimeout(() => {
      this.reconnectionTokens.delete(token);
    }, 300000);

    return token;
  }

  // Message retry queue management
  private storeMessageForRetry(
    conversationId: string,
    role: 'user' | 'assistant',
    content: string,
    metadata?: Record<string, unknown>
  ) {
    const queueKey = `retry_${conversationId}`;
    if (!this.messageRetryQueue.has(queueKey)) {
      this.messageRetryQueue.set(queueKey, []);
    }

    const queue = this.messageRetryQueue.get(queueKey)!;
    queue.push({
      conversationId,
      role,
      content,
      metadata,
      timestamp: Date.now(),
      attempts: 0,
    });

    // Limit queue size to prevent memory issues
    if (queue.length > 100) {
      queue.shift();
    }
  }

  // Retry worker for failed database operations
  private startRetryWorker() {
    setInterval(async () => {
      for (const [queueKey, messages] of this.messageRetryQueue.entries()) {
        if (messages.length === 0) continue;

        const messagesToRetry = messages.filter(
          msg => msg.attempts < 3 && Date.now() - msg.timestamp > 30000 // Wait 30 seconds before retry
        );

        for (const message of messagesToRetry) {
          message.attempts++;

          try {
            await getPrismaClient().message.create({
              data: {
                conversationId: message.conversationId,
                role: message.role,
                content: message.content,
                metadata: (message.metadata || {}) as any,
              },
            });

            // Remove from queue on success
            const index = messages.indexOf(message);
            messages.splice(index, 1);

            logger.info(`Message retry successful for conversation ${message.conversationId}`, {
              event: 'retry_success',
              conversationId: message.conversationId,
            });
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error('Message retry failed', {
              event: 'retry_failed',
              conversationId: message.conversationId,
              attempt: message.attempts,
              error: errorMessage,
            });

            // Remove from queue if max attempts reached
            if (message.attempts >= 3) {
              const index = messages.indexOf(message);
              messages.splice(index, 1);
            }
          }
        }

        // Clean up empty queues
        if (messages.length === 0) {
          this.messageRetryQueue.delete(queueKey);
        }
      }
    }, 60000); // Run every minute
  }

  // Circuit breaker helper
  private async withCircuitBreaker<T>(
    operation: () => Promise<T>,
    fallback: () => T | Promise<T>,
    circuitBreaker: {
      failures: number;
      lastFailureTime: number;
      isOpen: boolean;
      threshold: number;
      resetTime: number;
    },
    operationName: string
  ): Promise<T> {
    // Check if circuit breaker is open
    if (circuitBreaker.isOpen) {
      const now = Date.now();
      if (now - circuitBreaker.lastFailureTime < circuitBreaker.resetTime) {
        wsLogger.warn('circuit_breaker_open', `Circuit breaker open for ${operationName}`);
        return await fallback();
      }
      // Reset circuit breaker
      circuitBreaker.isOpen = false;
      circuitBreaker.failures = 0;
    }

    try {
      const result = await operation();
      // Reset failure count on success
      circuitBreaker.failures = 0;
      return result;
    } catch (error) {
      circuitBreaker.failures++;
      circuitBreaker.lastFailureTime = Date.now();

      if (circuitBreaker.failures >= circuitBreaker.threshold) {
        circuitBreaker.isOpen = true;
        wsLogger.error(
          `Circuit breaker opened for ${operationName} after ${circuitBreaker.failures} failures`,
          {
            event: 'circuit_breaker_opened',
            operationName,
            failures: circuitBreaker.failures,
          }
        );
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      wsLogger.error('Circuit breaker failure', {
        event: 'circuit_breaker_failure',
        operationName,
        error: errorMessage,
      });
      return await fallback();
    }
  }

  // Message processing with retry logic
  private async processMessageWithRetry(
    content: string,
    socketData: SocketData,
    messageId: string,
    maxRetries: number = 3
  ): Promise<{ content: string; metadata?: Record<string, unknown> }> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.withCircuitBreaker(
          async () => {
            // Add timeout to AI processing
            return await Promise.race([
              this.processMessage(content, socketData),
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('AI processing timeout')), 30000)
              ),
            ]);
          },
          async () => {
            // Fallback response when AI service is unavailable
            return {
              content:
                socketData.language === 'es'
                  ? 'Disculpa, estoy experimentando dificultades técnicas. Por favor, intenta de nuevo en un momento.'
                  : "Sorry, I'm experiencing technical difficulties. Please try again in a moment.",
              metadata: {
                fallback: true,
                attempt,
                messageId,
                intent: 'fallback',
                escalate: false,
                escalationType: 'none',
                priority: 'low',
              } as any,
            };
          },
          this.aiServiceCircuitBreaker,
          'ai_message_processing'
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error('Process message attempt failed', {
          event: 'process_message_attempt_failed',
          messageId,
          attempt,
          error: errorMessage,
        });

        if (attempt === maxRetries) {
          // Final fallback
          return {
            content:
              socketData.language === 'es'
                ? 'Lo siento, no pude procesar tu mensaje. Por favor, intenta de nuevo más tarde.'
                : "I'm sorry, I couldn't process your message. Please try again later.",
            metadata: { error: true, attempts: attempt, messageId },
          };
        }

        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    // This should never be reached due to the final fallback above
    throw new Error('All retry attempts failed');
  }

  // Enhanced escalation handling with retry
  private async handleEscalationWithRetry(
    socket: Socket,
    escalationType: string,
    maxRetries: number = 2
  ): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.handleEscalation(socket, escalationType);
        return;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error('Escalation attempt failed', {
          event: 'escalation_attempt_failed',
          socketId: socket.id,
          escalationType,
          attempt,
          error: errorMessage,
        });

        if (attempt === maxRetries) {
          // Send fallback escalation message
          const socketData = socket.data as SocketData;
          socket.emit('escalation', {
            type: 'fallback',
            message:
              socketData.language === 'es'
                ? 'Hay un problema técnico. Por favor, llama directamente al 1-844-YO-PELEO para asistencia inmediata.'
                : "There's a technical issue. Please call 1-844-YO-PELEO directly for immediate assistance.",
            phoneNumber: '1-844-967-3536',
            error: true,
          });
          return;
        }

        // Short delay before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  // Connection monitoring and cleanup
  private setupConnectionMonitoring() {
    // Clean up stale connections every 5 minutes
    setInterval(
      () => {
        const now = Date.now();
        const staleThreshold = 5 * 60 * 1000; // 5 minutes
        let cleanedCount = 0;

        for (const [socketId, sessionData] of this.activeSessions.entries()) {
          const sessionAge = now - parseInt(sessionData.sessionId.split('_')[1] || '0');

          if (sessionAge > staleThreshold) {
            const socket = this.io.sockets.sockets.get(socketId);
            if (!socket || !socket.connected) {
              // Clean up stale session
              this.activeSessions.delete(socketId);
              this.connectionInfo.delete(socketId);
              this.messageRateTracker.delete(socketId);
              this.errorRateTracker.delete(socketId);
              cleanedCount++;

              // Remove from room participants
              for (const [roomId, participants] of this.roomParticipants.entries()) {
                if (participants.has(socketId)) {
                  participants.delete(socketId);
                  if (participants.size === 0) {
                    this.roomParticipants.delete(roomId);
                  }
                }
              }

              wsLogger.info('cleanup', `Cleaned up stale session: ${socketId}`);
            }
          }
        }

        // Clean up old reconnection tokens
        let cleanedTokens = 0;
        for (const [token, data] of this.reconnectionTokens.entries()) {
          try {
            const sessionData = JSON.parse(data);
            if (sessionData.timestamp && now - sessionData.timestamp > 5 * 60 * 1000) {
              this.reconnectionTokens.delete(token);
              cleanedTokens++;
            }
          } catch (error) {
            // Invalid token data, remove it
            this.reconnectionTokens.delete(token);
            cleanedTokens++;
          }
        }

        if (cleanedCount > 0 || cleanedTokens > 0) {
          logger.info('Cleanup completed', {
            cleanedSessions: cleanedCount,
            cleanedTokens: cleanedTokens,
            totalSessions: this.activeSessions.size,
            totalTokens: this.reconnectionTokens.size,
          });
        }
      },
      5 * 60 * 1000
    ); // Run every 5 minutes

    // Log connection stats every minute
    setInterval(() => {
      const stats = this.generateConnectionStats();
      logger.info('Connection stats', { event: 'connection_stats', ...stats });
      this.emit('connection_stats', stats);
    }, 60 * 1000); // Run every minute
  }

  // Public methods for external use
  public getActiveSessionsCount(): number {
    return this.activeSessions.size;
  }

  public getRoomParticipantCount(roomId: string): number {
    return this.roomParticipants.get(roomId)?.size || 0;
  }

  public broadcastToAll(event: string, data: Record<string, unknown>) {
    this.io.emit(event, data);
  }

  public broadcastToUser(userId: string, event: string, data: Record<string, unknown>) {
    for (const [socketId, session] of this.activeSessions) {
      if (session.userId === userId) {
        this.io.to(socketId).emit(event, data);
      }
    }
  }

  public broadcastToRoom(roomId: string, event: string, data: Record<string, unknown>) {
    this.io.to(roomId).emit(event, data);
  }

  // Comprehensive health check with detailed system status
  public getHealthStatus(): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    details: Record<string, unknown>;
  } {
    const now = Date.now();
    const uptime = now - this.serverStartTime;

    const dbCircuitBreakerStatus = this.dbCircuitBreaker.isOpen ? 'open' : 'closed';
    const aiCircuitBreakerStatus = this.aiServiceCircuitBreaker.isOpen ? 'open' : 'closed';
    const retellCircuitBreakerStatus = this.retellCircuitBreaker.isOpen ? 'open' : 'closed';

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    const issues: string[] = [];

    // Determine overall health status
    if (this.dbCircuitBreaker.isOpen) {
      status = 'unhealthy';
      issues.push('Database circuit breaker is open');
    } else if (this.aiServiceCircuitBreaker.isOpen || this.retellCircuitBreaker.isOpen) {
      status = 'degraded';
      if (this.aiServiceCircuitBreaker.isOpen) {
        issues.push('AI service circuit breaker is open');
      }
      if (this.retellCircuitBreaker.isOpen) {
        issues.push('Retell service circuit breaker is open');
      }
    }

    // Check for high error rates
    const errorRate = this.calculateGlobalErrorRate();
    if (errorRate > 0.1) {
      // 10% error rate threshold
      status = status === 'healthy' ? 'degraded' : status;
      issues.push(`High error rate: ${(errorRate * 100).toFixed(2)}%`);
    }

    // Check memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    if (memoryUsagePercent > 90) {
      status = status === 'healthy' ? 'degraded' : status;
      issues.push(`High memory usage: ${memoryUsagePercent.toFixed(2)}%`);
    }

    // Check maintenance mode
    if (this.maintenanceMode) {
      status = 'degraded';
      issues.push('Server is in maintenance mode');
    }

    // Check for shutdown in progress
    if (this.shutdownInProgress) {
      status = 'unhealthy';
      issues.push('Server shutdown in progress');
    }

    const connectionStats = this.generateConnectionStats();
    const performanceStats = this.generatePerformanceStats();

    this.lastHealthCheck = now;

    return {
      status,
      details: {
        uptime,
        timestamp: now,
        maintenanceMode: this.maintenanceMode,
        shutdownInProgress: this.shutdownInProgress,
        issues,
        connections: connectionStats,
        performance: performanceStats,
        system: {
          memory: {
            heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
            heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
            rss: Math.round(memoryUsage.rss / 1024 / 1024),
            external: Math.round(memoryUsage.external / 1024 / 1024),
          },
          cpu: {
            usage: process.cpuUsage(),
            loadAverage: os.loadavg(),
          },
        },
        messageRetryQueueSize: Array.from(this.messageRetryQueue.values()).reduce(
          (sum, queue) => sum + queue.length,
          0
        ),
        circuitBreakers: {
          database: {
            status: dbCircuitBreakerStatus,
            failures: this.dbCircuitBreaker.failures,
            lastFailureTime: this.dbCircuitBreaker.lastFailureTime,
            timeSinceLastFailure: this.dbCircuitBreaker.lastFailureTime
              ? now - this.dbCircuitBreaker.lastFailureTime
              : null,
          },
          aiService: {
            status: aiCircuitBreakerStatus,
            failures: this.aiServiceCircuitBreaker.failures,
            lastFailureTime: this.aiServiceCircuitBreaker.lastFailureTime,
            timeSinceLastFailure: this.aiServiceCircuitBreaker.lastFailureTime
              ? now - this.aiServiceCircuitBreaker.lastFailureTime
              : null,
          },
          retell: {
            status: retellCircuitBreakerStatus,
            failures: this.retellCircuitBreaker.failures,
            lastFailureTime: this.retellCircuitBreaker.lastFailureTime,
            timeSinceLastFailure: this.retellCircuitBreaker.lastFailureTime
              ? now - this.retellCircuitBreaker.lastFailureTime
              : null,
          },
        },
        alerts: {
          configured: this.alertConfigs.size,
          active: Array.from(this.alertConfigs.values()).filter(alert => alert.enabled).length,
        },
        adminSessions: this.adminSessions.size,
      },
    };
  }

  // Enhanced graceful shutdown with comprehensive cleanup
  public async shutdown(): Promise<void> {
    if (this.shutdownInProgress) {
      logger.warn('Shutdown already in progress');
      return;
    }

    this.shutdownInProgress = true;
    logger.info('Initiating graceful shutdown...');

    try {
      // Stop intervals
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval);
      }
      if (this.metricsCollectionInterval) {
        clearInterval(this.metricsCollectionInterval);
      }
      if (this.alertingInterval) {
        clearInterval(this.alertingInterval);
      }

      // Enable maintenance mode to prevent new connections
      this.maintenanceMode = true;

      // Stop accepting new connections
      this.io.engine.generateId = () => {
        throw new Error('Server is shutting down');
      };

      // Notify all clients of shutdown
      this.io.emit('server:shutdown', {
        message: 'Server is shutting down. Please reconnect in a moment.',
        timestamp: new Date().toISOString(),
        gracePeriod: 30, // seconds
      });

      // Give clients time to receive shutdown message and save state
      logger.info('Waiting for clients to disconnect gracefully...');
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Force close remaining connections
      const activeConnections = this.io.sockets.sockets.size;
      if (activeConnections > 0) {
        logger.info(`Force closing ${activeConnections} remaining connections`);
        this.io.sockets.sockets.forEach(socket => {
          socket.disconnect(true);
        });
      }

      // Process remaining retry queue items
      logger.info('Processing remaining retry queue items...');
      await this.processRemainingRetryQueue();

      // Close all socket connections
      this.io.close();

      // Clear all data structures
      this.activeSessions.clear();
      this.roomParticipants.clear();
      this.reconnectionTokens.clear();
      this.messageRetryQueue.clear();
      this.connectionInfo.clear();
      this.systemMetrics.length = 0;
      this.alertConfigs.clear();
      this.adminSessions.clear();
      this.performanceMetrics.clear();
      this.messageRateTracker.clear();
      this.errorRateTracker.clear();
      this.adminCommandHistory.length = 0;
      this.customRateLimit.clear();

      // Final health check
      const finalStats = this.generateConnectionStats();
      logger.info('Shutdown completed', finalStats);

      this.emit('shutdown_complete', finalStats);
    } catch (error) {
      const errorDetails =
        error instanceof Error
          ? { message: error.message, stack: error.stack }
          : { message: 'Unknown shutdown error' };
      logger.error('Error during shutdown', errorDetails);
      throw error;
    } finally {
      this.shutdownInProgress = false;
    }
  }

  // Send notification to specific user
  public async sendNotification(userId: string, notification: NotificationEvent) {
    const notificationRoom = `notifications_${userId}`;
    this.io.to(notificationRoom).emit('notification', {
      ...notification,
      timestamp: new Date().toISOString(),
    });

    // Also store in database
    await getPrismaClient().notification.create({
      data: {
        userId,
        type: 'SYSTEM',
        title: notification.title,
        message: notification.message,
        metadata: notification.metadata as any,
        read: false,
      },
    });
  }

  // Send case update to all subscribed users
  public async sendCaseUpdate(caseId: string, update: CaseUpdateEvent) {
    const caseRoom = `case_${caseId}`;
    this.io.to(caseRoom).emit('case:update', {
      ...update,
      timestamp: new Date().toISOString(),
    });

    // Get case participants and send notifications
    const caseData = await getPrismaClient().case.findUnique({
      where: { id: caseId },
      select: {
        clientId: true,
        attorneyId: true,
        caseNumber: true,
      },
    });

    if (caseData) {
      const notificationMessage = this.getCaseUpdateMessage(update.updateType, caseData.caseNumber);

      // Notify client
      if (caseData.clientId) {
        await this.sendNotification(caseData.clientId, {
          type: 'info',
          title: 'Case Update',
          message: notificationMessage,
          metadata: { caseId, updateType: update.updateType },
        });
      }

      // Notify attorney
      if (caseData.attorneyId && caseData.attorneyId !== update.data.updatedBy) {
        await this.sendNotification(caseData.attorneyId, {
          type: 'info',
          title: 'Case Update',
          message: notificationMessage,
          metadata: { caseId, updateType: update.updateType },
        });
      }
    }
  }

  private getCaseUpdateMessage(updateType: string, caseNumber: string): string {
    const messages: Record<string, string> = {
      status_change: `Case ${caseNumber} status has been updated`,
      document_added: `New document added to case ${caseNumber}`,
      note_added: `New note added to case ${caseNumber}`,
      attorney_assigned: `Attorney assigned to case ${caseNumber}`,
      task_updated: `Task updated in case ${caseNumber}`,
    };

    return messages[updateType] || `Case ${caseNumber} has been updated`;
  }

  // ============================
  // ADMIN CONTROLS AND MONITORING
  // ============================

  private setupAdminHandlers() {
    this.io.on('connection', socket => {
      // Only handle admin commands if this is an admin session
      if (!this.adminSessions.has(socket.id)) {
        return;
      }

      const socketData = socket.data as SocketData;
      logger.info('Admin connected', { socketId: socket.id, userId: socketData.userId });

      // Get real-time dashboard data
      socket.on('admin:dashboard', () => {
        try {
          const dashboardData = this.generateDashboardData();
          socket.emit('admin:dashboard:data', dashboardData);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin dashboard error', { error: errorMessage });
          socket.emit('admin:error', { message: 'Failed to get dashboard data' });
        }
      });

      // Get detailed connection info
      socket.on('admin:connections', () => {
        try {
          const connections = Array.from(this.connectionInfo.values());
          socket.emit('admin:connections:data', connections);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin connections error', { error: errorMessage });
          socket.emit('admin:error', { message: 'Failed to get connections data' });
        }
      });

      // Get system metrics
      socket.on('admin:metrics', () => {
        try {
          const metrics = this.getSystemMetrics();
          socket.emit('admin:metrics:data', metrics);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin metrics error', { error: errorMessage });
          socket.emit('admin:error', { message: 'Failed to get metrics data' });
        }
      });

      // Execute admin commands
      socket.on('admin:command', async (command: AdminCommand) => {
        try {
          await this.executeAdminCommand(command, socketData.userId!);
          socket.emit('admin:command:success', { commandId: command.timestamp });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin command error', { error: errorMessage, command });
          socket.emit('admin:error', { message: `Command failed: ${errorMessage}` });
        }
      });

      // Real-time monitoring subscription
      socket.on('admin:monitor:start', () => {
        socket.join('admin_monitoring');
        socket.emit('admin:monitor:started');
      });

      socket.on('admin:monitor:stop', () => {
        socket.leave('admin_monitoring');
        socket.emit('admin:monitor:stopped');
      });

      // Alert configuration
      socket.on('admin:alerts:config', (alertConfig: AlertConfig) => {
        try {
          this.configureAlert(alertConfig);
          socket.emit('admin:alerts:configured', { metric: alertConfig.metric });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin alert config error', { error: errorMessage });
          socket.emit('admin:error', { message: 'Failed to configure alert' });
        }
      });

      // Get alert history
      socket.on('admin:alerts:history', () => {
        try {
          const alertHistory = this.getAlertHistory();
          socket.emit('admin:alerts:history:data', alertHistory);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin alert history error', { error: errorMessage });
          socket.emit('admin:error', { message: 'Failed to get alert history' });
        }
      });

      // Sitemap monitoring
      socket.on('admin:sitemap:stats', async () => {
        try {
          const { getSitemapMonitor } = await import('../sitemap/sitemap-monitor');
          const monitor = getSitemapMonitor();
          const stats = monitor.getLastStats();
          socket.emit('admin:sitemap:stats:data', stats);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin sitemap stats error', { error: errorMessage });
          socket.emit('admin:error', { message: 'Failed to get sitemap stats' });
        }
      });

      // Refresh sitemap stats
      socket.on('admin:sitemap:refresh', async () => {
        try {
          const { getSitemapMonitor } = await import('../sitemap/sitemap-monitor');
          const monitor = getSitemapMonitor();
          await monitor.updateStats();
          const stats = monitor.getLastStats();
          socket.emit('admin:sitemap:stats:data', stats);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Admin sitemap refresh error', { error: errorMessage });
          socket.emit('admin:error', { message: 'Failed to refresh sitemap stats' });
        }
      });
    });
  }

  private async executeAdminCommand(command: AdminCommand, adminId: string): Promise<void> {
    command.adminId = adminId;
    command.timestamp = Date.now();

    // Log admin command
    securityLogger.accessGranted('admin_command', adminId);
    logger.info('Admin command executed', { command, adminId });

    // Store command in history
    this.adminCommandHistory.push(command);
    if (this.adminCommandHistory.length > 1000) {
      this.adminCommandHistory.shift();
    }

    switch (command.type) {
      case 'disconnect_user':
        await this.adminDisconnectUser(
          command.payload as { userId?: string; socketId?: string; reason?: string }
        );
        break;

      case 'broadcast_message':
        await this.adminBroadcastMessage(
          command.payload as { message: string; type?: string; rooms?: string[] }
        );
        break;

      case 'clear_room':
        await this.adminClearRoom(command.payload as { roomId: string; reason?: string });
        break;

      case 'reset_circuit_breaker':
        await this.adminResetCircuitBreaker(command.payload as { service: string });
        break;

      case 'enable_maintenance':
        this.adminEnableMaintenanceMode(command.payload as { message?: string });
        break;

      case 'disable_maintenance':
        this.adminDisableMaintenanceMode();
        break;

      case 'set_rate_limit':
        this.adminSetRateLimit(
          command.payload as {
            userId?: string;
            socketId?: string;
            maxMessages: number;
            windowMs: number;
          }
        );
        break;

      default:
        throw new Error(`Unknown admin command: ${command.type}`);
    }
  }

  private async adminDisconnectUser(payload: {
    userId?: string;
    socketId?: string;
    reason?: string;
  }): Promise<void> {
    const { userId, socketId, reason = 'Disconnected by admin' } = payload;

    if (socketId) {
      const socket = this.io.sockets.sockets.get(socketId);
      if (socket) {
        socket.emit('admin:force_disconnect', { reason });
        socket.disconnect(true);
        logger.info('Admin force disconnected socket', { socketId, reason });
      }
    } else if (userId) {
      for (const [id, session] of this.activeSessions) {
        if (session.userId === userId) {
          const socket = this.io.sockets.sockets.get(id);
          if (socket) {
            socket.emit('admin:force_disconnect', { reason });
            socket.disconnect(true);
            logger.info('Admin force disconnected user', { userId, socketId: id, reason });
          }
        }
      }
    }
  }

  private async adminBroadcastMessage(payload: {
    message: string;
    type?: string;
    rooms?: string[];
  }): Promise<void> {
    const { message, type = 'info', rooms } = payload;

    const broadcastData = {
      type: 'admin_broadcast',
      message,
      messageType: type,
      timestamp: new Date().toISOString(),
    };

    if (rooms && rooms.length > 0) {
      rooms.forEach(roomId => {
        this.io.to(roomId).emit('admin:broadcast', broadcastData);
      });
    } else {
      this.io.emit('admin:broadcast', broadcastData);
    }

    logger.info('Admin broadcast sent', { message, type, rooms });
  }

  private async adminClearRoom(payload: { roomId: string; reason?: string }): Promise<void> {
    const { roomId, reason = 'Room cleared by admin' } = payload;

    const participants = this.roomParticipants.get(roomId);
    if (participants) {
      participants.forEach(socketId => {
        const socket = this.io.sockets.sockets.get(socketId);
        if (socket) {
          socket.emit('room:cleared', { roomId, reason });
          socket.leave(roomId);
        }
      });

      this.roomParticipants.delete(roomId);
      logger.info('Admin cleared room', { roomId, reason, participantCount: participants.size });
    }
  }

  private async adminResetCircuitBreaker(payload: { service: string }): Promise<void> {
    const { service } = payload;

    switch (service) {
      case 'database':
        this.dbCircuitBreaker.failures = 0;
        this.dbCircuitBreaker.isOpen = false;
        this.dbCircuitBreaker.lastFailureTime = 0;
        break;

      case 'aiService':
        this.aiServiceCircuitBreaker.failures = 0;
        this.aiServiceCircuitBreaker.isOpen = false;
        this.aiServiceCircuitBreaker.lastFailureTime = 0;
        break;

      case 'retell':
        this.retellCircuitBreaker.failures = 0;
        this.retellCircuitBreaker.isOpen = false;
        this.retellCircuitBreaker.lastFailureTime = 0;
        break;

      default:
        throw new Error(`Unknown circuit breaker service: ${service}`);
    }

    logger.info('Admin reset circuit breaker', { service });
  }

  private adminEnableMaintenanceMode(payload: { message?: string }): void {
    const { message = 'Server is under maintenance. Please try again later.' } = payload;

    this.maintenanceMode = true;

    // Notify all connected clients
    this.io.emit('server:maintenance', {
      enabled: true,
      message,
      timestamp: new Date().toISOString(),
    });

    logger.info('Maintenance mode enabled', { message });
  }

  private adminDisableMaintenanceMode(): void {
    this.maintenanceMode = false;

    // Notify all connected clients
    this.io.emit('server:maintenance', {
      enabled: false,
      message: 'Server is back online',
      timestamp: new Date().toISOString(),
    });

    logger.info('Maintenance mode disabled');
  }

  private adminSetRateLimit(payload: {
    userId?: string;
    socketId?: string;
    maxMessages: number;
    windowMs: number;
  }): void {
    const { userId, socketId, maxMessages, windowMs } = payload;

    const rateLimit = { maxMessages, windowMs };

    if (socketId) {
      this.customRateLimit.set(socketId, rateLimit);
      logger.info('Custom rate limit set for socket', { socketId, rateLimit });
    } else if (userId) {
      // Apply to all sockets for this user
      for (const [id, session] of this.activeSessions) {
        if (session.userId === userId) {
          this.customRateLimit.set(id, rateLimit);
        }
      }
      logger.info('Custom rate limit set for user', { userId, rateLimit });
    }
  }

  private generateDashboardData(): Record<string, unknown> {
    const now = Date.now();
    const uptime = now - this.serverStartTime;
    const connectionStats = this.generateConnectionStats();
    const performanceStats = this.generatePerformanceStats();
    const systemMetrics = this.getSystemMetrics();

    return {
      timestamp: now,
      uptime,
      status: this.getHealthStatus(),
      connections: connectionStats,
      performance: performanceStats,
      system: systemMetrics,
      alerts: {
        configured: this.alertConfigs.size,
        active: Array.from(this.alertConfigs.values()).filter(alert => alert.enabled).length,
      },
      maintenance: {
        enabled: this.maintenanceMode,
      },
      circuitBreakers: {
        database: {
          status: this.dbCircuitBreaker.isOpen ? 'open' : 'closed',
          failures: this.dbCircuitBreaker.failures,
          lastFailureTime: this.dbCircuitBreaker.lastFailureTime,
        },
        aiService: {
          status: this.aiServiceCircuitBreaker.isOpen ? 'open' : 'closed',
          failures: this.aiServiceCircuitBreaker.failures,
          lastFailureTime: this.aiServiceCircuitBreaker.lastFailureTime,
        },
        retell: {
          status: this.retellCircuitBreaker.isOpen ? 'open' : 'closed',
          failures: this.retellCircuitBreaker.failures,
          lastFailureTime: this.retellCircuitBreaker.lastFailureTime,
        },
      },
      adminSessions: this.adminSessions.size,
      recentCommands: this.adminCommandHistory.slice(-10),
    };
  }

  private generateConnectionStats(): Record<string, unknown> {
    const totalConnections = this.activeSessions.size;
    const authenticatedConnections = Array.from(this.activeSessions.values()).filter(
      s => s.authenticated
    ).length;
    const anonymousConnections = totalConnections - authenticatedConnections;

    const languages = Array.from(this.activeSessions.values()).reduce(
      (acc, session) => {
        acc[session.language] = (acc[session.language] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      total: totalConnections,
      authenticated: authenticatedConnections,
      anonymous: anonymousConnections,
      rooms: this.roomParticipants.size,
      languages,
      adminSessions: this.adminSessions.size,
    };
  }

  private generatePerformanceStats(): Record<string, unknown> {
    const now = Date.now();
    const windowMs = 60000; // 1 minute

    // Calculate average response time
    const responseTimeMetrics = this.performanceMetrics.get('response_time');
    const avgResponseTime = responseTimeMetrics?.averageTime || 0;

    // Calculate message rate
    const messageRates = Array.from(this.messageRateTracker.values())
      .map(times => times.filter(time => now - time < windowMs).length)
      .reduce((sum, count) => sum + count, 0);

    // Calculate error rate
    const errorRates = Array.from(this.errorRateTracker.values())
      .map(times => times.filter(time => now - time < windowMs).length)
      .reduce((sum, count) => sum + count, 0);

    const totalMessages = messageRates + errorRates;
    const errorRate = totalMessages > 0 ? errorRates / totalMessages : 0;

    return {
      avgResponseTime,
      messageRate: messageRates,
      errorRate,
      messagesPerMinute: messageRates,
      errorsPerMinute: errorRates,
    };
  }

  private getSystemMetrics(): SystemMetrics {
    const now = Date.now();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const connectionStats = this.generateConnectionStats();
    const performanceStats = this.generatePerformanceStats();

    return {
      timestamp: now,
      uptime: now - this.serverStartTime,
      memory: {
        heapUsed: memoryUsage.heapUsed,
        heapTotal: memoryUsage.heapTotal,
        rss: memoryUsage.rss,
        external: memoryUsage.external,
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system,
        load: os.loadavg(),
      },
      connections: connectionStats as any,
      performance: performanceStats as any,
      circuitBreakers: {
        database: {
          status: this.dbCircuitBreaker.isOpen ? 'open' : 'closed',
          failures: this.dbCircuitBreaker.failures,
        },
        aiService: {
          status: this.aiServiceCircuitBreaker.isOpen ? 'open' : 'closed',
          failures: this.aiServiceCircuitBreaker.failures,
        },
        retell: {
          status: this.retellCircuitBreaker.isOpen ? 'open' : 'closed',
          failures: this.retellCircuitBreaker.failures,
        },
      },
      ai: this.generateAIMetrics(),
    };
  }

  // Generate AI service metrics
  private generateAIMetrics() {
    try {
      const aiProcessingMetrics = this.performanceMetrics.get('ai_message_processing');
      const totalMessages = aiProcessingMetrics?.count || 0;
      const avgResponseTime = aiProcessingMetrics?.averageTime || 0;

      // Calculate error rate from circuit breaker
      const aiFailures = this.aiServiceCircuitBreaker.failures;
      const errorRate = totalMessages > 0 ? (aiFailures / (totalMessages + aiFailures)) * 100 : 0;

      return {
        enhancedChatAvailable: !this.aiServiceCircuitBreaker.isOpen,
        translationAvailable: true, // Translation service has fallbacks
        orchestratorAgentCount: 0, // Will be populated by orchestrator
        averageResponseTime: Math.round(avgResponseTime),
        totalProcessedMessages: totalMessages,
        errorRate: Math.round(errorRate * 100) / 100,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      wsLogger.error('Error generating AI metrics', {
        context: 'ai-metrics',
        error: errorMessage,
      });
      return {
        enhancedChatAvailable: false,
        translationAvailable: false,
        orchestratorAgentCount: 0,
        averageResponseTime: 0,
        totalProcessedMessages: 0,
        errorRate: 100,
      };
    }
  }

  // ============================
  // MONITORING AND ALERTING
  // ============================

  private initializeMonitoring(): void {
    // Set up event listeners for monitoring
    this.on('client_disconnect', data => {
      this.broadcastToAdmins('client_disconnect', data);
    });

    this.on('message_error', data => {
      this.broadcastToAdmins('message_error', data);
    });

    this.on('connection_stats', data => {
      this.broadcastToAdmins('connection_stats', data);
    });

    logger.info('Monitoring initialized');
  }

  private setupDefaultAlerts(): void {
    // Default alert configurations
    const defaultAlerts: AlertConfig[] = [
      {
        metric: 'error_rate',
        threshold: 0.1, // 10%
        comparison: 'gt',
        duration: 300000, // 5 minutes
        enabled: true,
      },
      {
        metric: 'response_time',
        threshold: 5000, // 5 seconds
        comparison: 'gt',
        duration: 300000, // 5 minutes
        enabled: true,
      },
      {
        metric: 'connection_count',
        threshold: 1000,
        comparison: 'gt',
        duration: 0, // Immediate
        enabled: true,
      },
      {
        metric: 'memory_usage',
        threshold: 0.9, // 90%
        comparison: 'gt',
        duration: 300000, // 5 minutes
        enabled: true,
      },
    ];

    defaultAlerts.forEach(alert => {
      this.alertConfigs.set(alert.metric, alert);
    });

    logger.info('Default alerts configured', { count: defaultAlerts.length });
  }

  private startHealthChecks(): void {
    this.healthCheckInterval = setInterval(() => {
      const healthStatus = this.getHealthStatus();

      // Broadcast health status to admins
      this.broadcastToAdmins('health_check', healthStatus);

      // Log health status if not healthy
      if (healthStatus.status !== 'healthy') {
        logger.warn('Health check failed', healthStatus);
      }
    }, 30000); // Every 30 seconds

    logger.info('Health checks started');
  }

  private startMetricsCollection(): void {
    this.metricsCollectionInterval = setInterval(() => {
      const metrics = this.getSystemMetrics();

      // Store metrics (keep last 100 data points)
      this.systemMetrics.push(metrics);
      if (this.systemMetrics.length > 100) {
        this.systemMetrics.shift();
      }

      // Broadcast metrics to monitoring clients
      this.broadcastToAdmins('metrics_update', metrics);

      // Clean up old performance data
      this.cleanupPerformanceData();
    }, 60000); // Every minute

    logger.info('Metrics collection started');
  }

  private startAlerting(): void {
    this.alertingInterval = setInterval(() => {
      this.checkAlerts();
    }, 30000); // Every 30 seconds

    logger.info('Alerting started');
  }

  private async startSitemapMonitor(): Promise<void> {
    try {
      const { getSitemapMonitor } = await import('../sitemap/sitemap-monitor');
      const monitor = getSitemapMonitor();
      await monitor.start();
      logger.info('Sitemap monitoring started');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to start sitemap monitor', { error: errorMessage });
    }
  }

  private checkAlerts(): void {
    const now = Date.now();
    const currentMetrics = this.getSystemMetrics();

    for (const [metric, config] of this.alertConfigs) {
      if (!config.enabled) continue;

      // Check if enough time has passed since last trigger
      if (config.lastTriggered && now - config.lastTriggered < config.duration) {
        continue;
      }

      let value: number;
      let shouldTrigger = false;

      switch (metric) {
        case 'error_rate':
          value = this.calculateGlobalErrorRate();
          shouldTrigger = this.compareValue(value, config.threshold, config.comparison);
          break;

        case 'response_time':
          value = currentMetrics.performance.avgResponseTime;
          shouldTrigger = this.compareValue(value, config.threshold, config.comparison);
          break;

        case 'connection_count':
          value = currentMetrics.connections.total;
          shouldTrigger = this.compareValue(value, config.threshold, config.comparison);
          break;

        case 'memory_usage':
          value = currentMetrics.memory.heapUsed / currentMetrics.memory.heapTotal;
          shouldTrigger = this.compareValue(value, config.threshold, config.comparison);
          break;

        default:
          continue;
      }

      if (shouldTrigger) {
        config.lastTriggered = now;
        this.triggerAlert(metric, value, config);
      }
    }
  }

  private compareValue(value: number, threshold: number, comparison: 'gt' | 'lt' | 'eq'): boolean {
    switch (comparison) {
      case 'gt':
        return value > threshold;
      case 'lt':
        return value < threshold;
      case 'eq':
        return value === threshold;
      default:
        return false;
    }
  }

  private triggerAlert(metric: string, value: number, config: AlertConfig): void {
    const alertData = {
      metric,
      value,
      threshold: config.threshold,
      comparison: config.comparison,
      timestamp: new Date().toISOString(),
      severity: this.getAlertSeverity(metric, value, config.threshold),
    };

    logger.warn('Alert triggered', alertData satisfies LogMeta);

    // Broadcast alert to admin clients
    this.broadcastToAdmins('alert_triggered', alertData);

    // Emit alert event for external handling
    this.emit('alert', alertData);
  }

  private getAlertSeverity(
    metric: string,
    value: number,
    threshold: number
  ): 'low' | 'medium' | 'high' | 'critical' {
    const ratio = value / threshold;

    if (ratio >= 2) return 'critical';
    if (ratio >= 1.5) return 'high';
    if (ratio >= 1.2) return 'medium';
    return 'low';
  }

  private configureAlert(config: AlertConfig): void {
    this.alertConfigs.set(config.metric, config);
    logger.info('Alert configured', {
      metric: config.metric,
      threshold: config.threshold,
      comparison: config.comparison,
      duration: config.duration,
      enabled: config.enabled,
      lastTriggered: config.lastTriggered,
    } satisfies LogMeta);
  }

  private getAlertHistory(): Record<string, unknown>[] {
    // This would typically come from a database or log files
    // For now, return recent alerts from memory
    return [];
  }

  private broadcastToAdmins(event: string, data: unknown): void {
    this.io.to('admin_monitoring').emit(event, data);
  }

  // ============================
  // ENHANCED RATE LIMITING
  // ============================

  private checkConnectionRateLimit(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxConnections = 10;

    // Count recent connections from this IP
    const recentConnections = Array.from(this.connectionInfo.values()).filter(
      conn => conn.ipAddress === ip && now - conn.connectedAt < windowMs
    ).length;

    return recentConnections < maxConnections;
  }

  private checkEnhancedRateLimit(clientId: string): boolean {
    const customLimit = this.customRateLimit.get(clientId);

    if (customLimit) {
      return this.checkCustomRateLimit(clientId, customLimit.maxMessages, customLimit.windowMs);
    }

    return this.checkRateLimit(clientId);
  }

  private checkCustomRateLimit(clientId: string, maxMessages: number, windowMs: number): boolean {
    const now = Date.now();
    const timestamps = this.rateLimitMap.get(clientId) || [];

    // Remove timestamps outside the window
    const validTimestamps = timestamps.filter(t => now - t < windowMs);

    if (validTimestamps.length >= maxMessages) {
      return false;
    }

    validTimestamps.push(now);
    this.rateLimitMap.set(clientId, validTimestamps);

    return true;
  }

  private trackMessageRate(clientId: string): void {
    const now = Date.now();
    const timestamps = this.messageRateTracker.get(clientId) || [];

    timestamps.push(now);

    // Keep only recent timestamps (last 5 minutes)
    const recentTimestamps = timestamps.filter(t => now - t < 300000);
    this.messageRateTracker.set(clientId, recentTimestamps);
  }

  private trackErrorRate(clientId: string): void {
    const now = Date.now();
    const timestamps = this.errorRateTracker.get(clientId) || [];

    timestamps.push(now);

    // Keep only recent timestamps (last 5 minutes)
    const recentTimestamps = timestamps.filter(t => now - t < 300000);
    this.errorRateTracker.set(clientId, recentTimestamps);
  }

  private calculateGlobalErrorRate(): number {
    const now = Date.now();
    const windowMs = 300000; // 5 minutes

    const totalMessages = Array.from(this.messageRateTracker.values()).reduce(
      (sum, timestamps) => sum + timestamps.filter(t => now - t < windowMs).length,
      0
    );

    const totalErrors = Array.from(this.errorRateTracker.values()).reduce(
      (sum, timestamps) => sum + timestamps.filter(t => now - t < windowMs).length,
      0
    );

    return totalMessages > 0 ? totalErrors / totalMessages : 0;
  }

  private cleanupPerformanceData(): void {
    const now = Date.now();
    const maxAge = 3600000; // 1 hour

    // Clean up message rate tracking
    for (const [clientId, timestamps] of this.messageRateTracker) {
      const recentTimestamps = timestamps.filter(t => now - t < maxAge);
      if (recentTimestamps.length === 0) {
        this.messageRateTracker.delete(clientId);
      } else {
        this.messageRateTracker.set(clientId, recentTimestamps);
      }
    }

    // Clean up error rate tracking
    for (const [clientId, timestamps] of this.errorRateTracker) {
      const recentTimestamps = timestamps.filter(t => now - t < maxAge);
      if (recentTimestamps.length === 0) {
        this.errorRateTracker.delete(clientId);
      } else {
        this.errorRateTracker.set(clientId, recentTimestamps);
      }
    }

    // Clean up performance metrics
    for (const [metric, data] of this.performanceMetrics) {
      // Remove metrics that haven't been updated in maxAge
      if (now - data.lastUpdated > maxAge) {
        this.performanceMetrics.delete(metric);
      }
    }
  }

  // ============================
  // UTILITY METHODS
  // ============================

  private isAdminConnection(socket: Socket): boolean {
    return this.adminSessions.has(socket.id);
  }

  private async processRemainingRetryQueue(): Promise<void> {
    logger.info('Processing remaining retry queue items...');

    for (const [queueKey, messages] of this.messageRetryQueue.entries()) {
      for (const message of messages) {
        try {
          await getPrismaClient().message.create({
            data: {
              conversationId: message.conversationId,
              role: message.role,
              content: message.content,
              metadata: (message.metadata || {}) as any,
            },
          });

          logger.info('Processed retry queue message', { conversationId: message.conversationId });
        } catch (error) {
          logger.error('Failed to process retry queue message', {
            conversationId: message.conversationId,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }
  }

  private setupGracefulShutdown(): void {
    // Handle various shutdown signals
    const shutdownSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    shutdownSignals.forEach(signal => {
      process.on(signal, async () => {
        logger.info(`Received ${signal}, initiating graceful shutdown...`);
        try {
          await this.shutdown();
          process.exit(0);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          logger.error('Shutdown failed', { error: errorMessage });
          process.exit(1);
        }
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', async error => {
      logger.error('Uncaught exception', { error: error.message, stack: error.stack });
      try {
        await this.shutdown();
      } catch (shutdownError) {
        const errorMessage =
          shutdownError instanceof Error ? shutdownError.message : 'Unknown error';
        logger.error('Emergency shutdown failed', { error: errorMessage });
      }
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', async (reason, promise) => {
      logger.error('Unhandled promise rejection', { reason, promise });
      try {
        await this.shutdown();
      } catch (shutdownError) {
        const errorMessage =
          shutdownError instanceof Error ? shutdownError.message : 'Unknown error';
        logger.error('Emergency shutdown failed', { error: errorMessage });
      }
      process.exit(1);
    });
  }

  // ============================
  // PUBLIC API METHODS
  // ============================

  public getDashboardData(): Record<string, unknown> {
    return this.generateDashboardData();
  }

  public getConnectionsData(): ConnectionInfo[] {
    return Array.from(this.connectionInfo.values());
  }

  public getMetricsData(): SystemMetrics {
    return this.getSystemMetrics();
  }

  public getMetricsHistory(): SystemMetrics[] {
    return [...this.systemMetrics];
  }

  public async forceDisconnectUser(
    userId: string,
    reason: string = 'Force disconnect'
  ): Promise<void> {
    return this.adminDisconnectUser({ userId, reason });
  }

  public async forceDisconnectSocket(
    socketId: string,
    reason: string = 'Force disconnect'
  ): Promise<void> {
    return this.adminDisconnectUser({ socketId, reason });
  }

  public setMaintenanceMode(enabled: boolean, message?: string): void {
    if (enabled) {
      this.adminEnableMaintenanceMode({ message });
    } else {
      this.adminDisableMaintenanceMode();
    }
  }

  public isMaintenanceMode(): boolean {
    return this.maintenanceMode;
  }

  public getAdminCommandHistory(): AdminCommand[] {
    return [...this.adminCommandHistory];
  }

  public resetCircuitBreaker(service: 'database' | 'aiService' | 'retell'): void {
    this.adminResetCircuitBreaker({ service });
  }

  public configureCustomAlert(config: AlertConfig): void {
    this.configureAlert(config);
  }

  public getAlertConfigs(): Map<string, AlertConfig> {
    return new Map(this.alertConfigs);
  }

  public setCustomRateLimit(
    target: { userId?: string; socketId?: string },
    maxMessages: number,
    windowMs: number
  ): void {
    this.adminSetRateLimit({ ...target, maxMessages, windowMs });
  }

  public getPerformanceMetrics(): Map<
    string,
    { count: number; totalTime: number; averageTime: number; lastUpdated: number }
  > {
    return new Map(this.performanceMetrics);
  }

  public getErrorRate(): number {
    return this.calculateGlobalErrorRate();
  }

  public getUptime(): number {
    return Date.now() - this.serverStartTime;
  }

  public isShuttingDown(): boolean {
    return this.shutdownInProgress;
  }
}

// Export singleton instance
let chatSocketServer: ChatSocketServer | null = null;

export function getChatSocketServer(httpServer?: HTTPServer): ChatSocketServer {
  if (!chatSocketServer && httpServer) {
    chatSocketServer = new ChatSocketServer(httpServer);
  }

  if (!chatSocketServer) {
    throw new Error('Chat socket server not initialized');
  }

  return chatSocketServer;
}

// Export room types for external use
export { RoomType };

// Export interfaces for external use
export type { SystemMetrics, AdminCommand, AlertConfig, ConnectionInfo };
