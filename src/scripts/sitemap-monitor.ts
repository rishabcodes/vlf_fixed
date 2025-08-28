import { getSitemapMonitor } from '../lib/sitemap/sitemap-monitor';

async function startMonitoring() {
  console.log('🚀 Starting sitemap monitoring service...');
  
  const monitor = getSitemapMonitor();
  await monitor.start();
  
  console.log('✅ Sitemap monitoring is running');
  console.log('📊 Dashboard available at: http://localhost:3000/admin/sitemap-monitor');
  console.log('\nPress Ctrl+C to stop monitoring...');
  
  // Keep process alive
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping sitemap monitoring...');
    monitor.stop();
    process.exit(0);
  });

startMonitoring().catch(console.error);
}
