/**
 * Blog Scheduler Auto-Start
 * Automatically starts the blog generation scheduler when the server starts
 */

import { blogOrchestrator } from '@/new-seo-agents/production/simple-blog-orchestrator';
import { logger } from '@/lib/safe-logger';

let isInitialized = false;

export async function initializeBlogScheduler() {
  // Prevent multiple initializations
  if (isInitialized) {
    logger.info('[BlogSchedulerInit] Already initialized, skipping');
    return;
  }
  
  // Check if auto-start is enabled
  const autoStart = process.env.ENABLE_AUTO_BLOG === 'true';
  
  if (!autoStart) {
    logger.info('[BlogSchedulerInit] Auto-start disabled (set ENABLE_AUTO_BLOG=true to enable)');
    return;
  }
  
  try {
    logger.info('[BlogSchedulerInit] Starting blog generation scheduler automatically...');
    
    // Start the orchestrator
    await blogOrchestrator.start();
    
    isInitialized = true;
    
    logger.info('[BlogSchedulerInit] ✅ Blog scheduler started successfully!');
    logger.info('[BlogSchedulerInit] Will generate 3 posts per week (Mon/Wed/Fri at 10 AM)');
    
    // Log the current status
    const status = blogOrchestrator.getStatus();
    logger.info('[BlogSchedulerInit] Status:', {
      isRunning: status.isRunning,
      scheduledJobs: status.scheduledJobs,
      nextRun: status.nextRun
    });
    
  } catch (error) {
    logger.error('[BlogSchedulerInit] Failed to start blog scheduler:', error);
    // Don't throw - let the app continue running even if scheduler fails
  }
}

// Initialize on module load (for server components)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  // Auto-initialize in production
  initializeBlogScheduler().catch(error => {
    logger.error('[BlogSchedulerInit] Module-level initialization failed:', error);
  });
}
