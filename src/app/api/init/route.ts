/**
 * Initialization endpoint - called once when server starts
 * This ensures the blog scheduler starts automatically
 */

import { NextResponse } from 'next/server';
import { initializeBlogScheduler } from '@/lib/blog-scheduler-init';
import { logger } from '@/lib/safe-logger';

// This will be called on first request to any API route
let initialized = false;

export async function GET() {
  if (initialized) {
    return NextResponse.json({ 
      status: 'already_initialized',
      message: 'Blog scheduler already initialized' 
    });
  }
  
  try {
    await initializeBlogScheduler();
    initialized = true;
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Blog scheduler initialized',
      autoStartEnabled: process.env.ENABLE_AUTO_BLOG === 'true'
    });
  } catch (error) {
    logger.error('[Init API] Failed to initialize:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to initialize blog scheduler',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
