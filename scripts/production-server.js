#!/usr/bin/env node

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

// Configuration
const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);
const wsPort = parseInt(process.env.WS_PORT || '3001', 10);

// Note: Redis has been removed from this project
// WebSocket scaling would need to be handled at the infrastructure level

// Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Initialize server
app.prepare().then(() => {
  // HTTP server for Next.js
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Health check endpoints
      if (pathname === '/health') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'healthy', timestamp: Date.now() }));
        return;
      }

      if (pathname === '/health/agents') {
        // Check agent status
        const agentStatus = await checkAgentHealth();
        res.statusCode = agentStatus.healthy ? 200 : 503;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(agentStatus));
        return;
      }

      // Handle all other routes with Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  });

  // WebSocket server
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'https://vasquezlawnc.com',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // WebSocket authentication
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      // Verify token
      const user = await verifyToken(token);
      socket.userId = user.id;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  // WebSocket event handlers
  io.on('connection', socket => {
    console.log(`Client connected: ${socket.id} (User: ${socket.userId})`);

    // Join user-specific room
    socket.join(`user:${socket.userId}`);

    // Handle chat messages
    socket.on('chat:message', async data => {
      const message = await handleChatMessage(socket.userId, data);

      // Emit to sender
      socket.emit('chat:message:sent', message);

      // Emit to recipients
      if (data.recipientId) {
        io.to(`user:${data.recipientId}`).emit('chat:message:received', message);
      }
    });

    // Handle agent updates
    socket.on('agent:status', async data => {
      const status = await getAgentStatus(data.agentId);
      socket.emit('agent:status:update', status);
    });

    // Handle real-time notifications
    socket.on('notification:subscribe', types => {
      types.forEach(type => socket.join(`notification:${type}`));
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Redis pub/sub for scaling WebSocket
  const pubClient = redis.duplicate();
  const subClient = redis.duplicate();

  subClient.on('message', (channel, message) => {
    const data = JSON.parse(message);

    switch (channel) {
      case 'agent:updates':
        io.to('notification:agents').emit('agent:update', data);
        break;
      case 'lead:new':
        io.to('notification:leads').emit('lead:new', data);
        break;
      case 'chat:broadcast':
        io.to(`user:${data.userId}`).emit('chat:message:received', data.message);
        break;
    }
  });

  subClient.subscribe('agent:updates', 'lead:new', 'chat:broadcast');

  // Start servers
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Next.js ready on http://${hostname}:${port}`);
    console.log(`> WebSocket ready on ws://${hostname}:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV}`);
    console.log(`> Redis connected: ${redis.status}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      io.close(() => {
        console.log('WebSocket server closed');
        redis.disconnect();
        process.exit(0);
      });
    });
  });
});

// Helper functions
async function checkAgentHealth() {
  try {
    const response = await fetch('http://localhost:8080/health');
    const data = await response.json();
    return {
      healthy: true,
      agents: data.agents,
      uptime: data.uptime,
      tasksCompleted: data.tasksCompleted,
    };
  } catch (error) {
    return {
      healthy: false,
      error: error.message,
    };
  }
}

async function verifyToken(token) {
  // Implement JWT verification
  const jwt = require('jsonwebtoken');
  return jwt.verify(token, process.env.NEXTAUTH_SECRET);
}

async function handleChatMessage(userId, data) {
  // Store message in database
  const { prisma } = require('@/lib/prisma');

  const message = await prisma.message.create({
    data: {
      userId,
      content: data.content,
      recipientId: data.recipientId,
      type: data.type || 'text',
    },
  });

  // If it's an AI chat, process with AI
  if (data.isAI) {
    const aiResponse = await processAIChat(data.content);
    const aiMessage = await prisma.message.create({
      data: {
        userId: 'ai-assistant',
        content: aiResponse,
        recipientId: userId,
        type: 'ai-response',
      },
    });

    // Publish for other instances
    pubClient.publish(
      'chat:broadcast',
      JSON.stringify({
        userId,
        message: aiMessage,
      })
    );
  }

  return message;
}

async function getAgentStatus(agentId) {
  const response = await fetch(`http://localhost:8080/agents/${agentId}/status`);
  return response.json();
}

async function processAIChat(content) {
  // Process with OpenAI
  const { OpenAI } = require('openai');
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful legal assistant for Vasquez Law Firm.' },
      { role: 'user', content },
    ],
  });

  return completion.choices[0].message.content;
}
