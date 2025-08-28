#!/usr/bin/env node

/**
 * Development server with WebSocket support
 * Run with: node scripts/dev-server.js
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

async function startServer() {
  try {
    await app.prepare();
    console.log('Next.js app prepared');

    // Create HTTP server
    const httpServer = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling request:', err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    });

    // Initialize WebSocket server if enabled
    if (process.env.ENABLE_WEBSOCKET !== 'false') {
      try {
        // Import the compiled WebSocket server with module-alias setup
        const { getChatSocketServer } = require('../dist/lib/socket/server-setup.js');
        const chatServer = getChatSocketServer(httpServer);
        console.log('✅ WebSocket server initialized');

        // Log active connections periodically
        setInterval(() => {
          const activeConnections = chatServer.getActiveSessionsCount();
          if (activeConnections > 0) {
            console.log(`Active WebSocket connections: ${activeConnections}`);
          }
        }, 30000); // Every 30 seconds
      } catch (error) {
        console.error('⚠️  Failed to initialize WebSocket server:', error);
        console.log('Chat will use REST API fallback');
      }
    }

    // Start server
    httpServer.listen(port, () => {
      console.log(`
  ▲ Vasquez Law Firm Development Server Ready
  ─────────────────────────────────────────────
  
  Environment: ${process.env.NODE_ENV}
  URL:         http://${hostname}:${port}
  WebSocket:   ${process.env.ENABLE_WEBSOCKET !== 'false' ? 'Enabled ✅' : 'Disabled ❌'}
  
  Chat Status: ${process.env.OPENAI_API_KEY ? 'OpenAI Connected ✅' : 'OpenAI Not Configured ⚠️'}
  
  ─────────────────────────────────────────────
  
  Press Ctrl+C to stop the server
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = signal => {
      console.log(`\n${signal} signal received: closing HTTP server`);

      httpServer.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });

      // Force exit after 10 seconds
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
