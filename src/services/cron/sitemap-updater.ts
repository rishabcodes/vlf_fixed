import { CronJob } from 'cron';
import { generateComprehensiveSitemap } from '@/scripts/generate-sitemap';
import { getSitemapMonitor } from '@/lib/sitemap/sitemap-monitor';
import { logger, errorToLogMeta } from '@/lib/safe-logger';

export class SitemapUpdater {
  private job: CronJob;
  
  constructor() {
    // Run every day at 3 AM
    this.job = new CronJob(
      '0 3 * * *',
      async () => {
        logger.info('Sitemap Updater: Starting daily sitemap update');
        try {
          await generateComprehensiveSitemap();
          
          // Update monitoring stats
          const monitor = getSitemapMonitor();
          await monitor.updateStats();
          
          logger.info('Sitemap Updater: Daily sitemap update completed successfully');
        } catch (error) {
          logger.error('Sitemap Updater: Failed to update sitemap', errorToLogMeta(error));
        }
      },
      null,
      false,
      'America/New_York'
    );
  }
  
  start() {
    this.job.start();
    logger.info('Sitemap Updater: Cron job started - will run daily at 3 AM ET');
  }
  
  stop() {
    this.job.stop();
    logger.info('Sitemap Updater: Cron job stopped');
  }
  
  // Manual trigger for testing
  async runNow() {
    logger.info('Sitemap Updater: Running manual sitemap update');
    await generateComprehensiveSitemap();
    const monitor = getSitemapMonitor();
    await monitor.updateStats();
  }
}

// Singleton instance
let updater: SitemapUpdater | null = null;

export function getSitemapUpdater(): SitemapUpdater {
  if (!updater) {
    updater = new SitemapUpdater();
  }
  return updater;
}
