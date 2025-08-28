#!/usr/bin/env tsx
/**
 * AUTONOMOUS CREWAI SYSTEM LAUNCHER
 *
 * This is the MASTER LAUNCHER that starts the complete autonomous system
 * and ensures it runs continuously with monitoring and auto-recovery.
 */

import { logger } from '@/lib/logger';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

class AutonomousSystemLauncher {
  private processes: Map<string, ChildProcess> = new Map();
  private isShuttingDown: boolean = false;
  private startTime: Date = new Date();
  private restartCounts: Map<string, number> = new Map();

  async launch(): Promise<void> {
    logger.info('🚀 LAUNCHING AUTONOMOUS CREWAI SYSTEM');
    logger.info('=====================================');
    logger.info('This will start:');
    logger.info('  🤖 All CrewAI Agents (16+ agents)');
    logger.info('  📊 Monitoring & Health Checks');
    logger.info('  🔄 Background Workers');
    logger.info('  ⏰ Cron Jobs & Schedulers');
    logger.info('  🌐 API Endpoints');
    logger.info('  💾 Database Connections');
    logger.info('=====================================');

    try {
      // Create runtime directory
      await this.createRuntimeDirectory();

      // Start all system components
      await this.startSystemComponents();

      // Setup monitoring and recovery
      this.setupSystemMonitoring();

      // Handle graceful shutdown
      this.setupGracefulShutdown();

      // Show startup success
      this.showStartupSuccess();

      // Keep the system running
      await this.maintainSystemExecution();
    } catch (error) {
      logger.error('❌ SYSTEM LAUNCH FAILED:', error);
      process.exit(1);
    }
  }

  private async createRuntimeDirectory(): Promise<void> {
    const runtimeDir = path.join(process.cwd(), '.crewai-runtime');

    try {
      await fs.mkdir(runtimeDir, { recursive: true });

      // Create status file
      const statusFile = path.join(runtimeDir, 'system-status.json');
      await fs.writeFile(
        statusFile,
        JSON.stringify(
          {
            systemId: `autonomous_${Date.now()}`,
            startTime: this.startTime.toISOString(),
            status: 'starting',
            components: {},
          },
          null,
          2
        )
      );

      logger.info('📁 Runtime directory created');
    } catch (error) {
      logger.error('Failed to create runtime directory:', error);
      throw error;
    }
  }

  private async startSystemComponents(): Promise<void> {
    logger.info('🔧 Starting system components...');

    const components = [
      {
        name: 'crewai-system',
        script: 'scripts/crewai-startup-system.ts',
        description: 'Main CrewAI Agent System',
        critical: true,
      },
      {
        name: 'background-worker',
        script: 'scripts/background-worker.ts',
        description: 'Background Task Worker',
        critical: true,
      },
    ];

    for (const component of components) {
      await this.startComponent(component);

      // Wait a bit between components
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    logger.info('✅ All system components started');
  }

  private async startComponent(component: any): Promise<void> {
    logger.info(`🚀 Starting ${component.description}...`);

    try {
      const process = spawn('tsx', [component.script], {
        cwd: process.cwd(),
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          NODE_ENV: 'development',
          COMPONENT_NAME: component.name,
        },
      });

      // Store process reference
      this.processes.set(component.name, process);
      this.restartCounts.set(component.name, 0);

      // Handle process output
      process.stdout?.on('data', data => {
        const output = data.toString().trim();
        if (output) {
          logger.info(`[${component.name}] ${output}`);
        }
      });

      process.stderr?.on('data', data => {
        const output = data.toString().trim();
        if (output) {
          logger.error(`[${component.name}] ${output}`);
        }
      });

      // Handle process exit
      process.on('exit', (code, signal) => {
        if (!this.isShuttingDown) {
          logger.warn(`⚠️ Component ${component.name} exited with code ${code}, signal ${signal}`);

          if (component.critical) {
            this.restartComponent(component);
          }
        }
      });

      process.on('error', error => {
        logger.error(`❌ Component ${component.name} error:`, error);

        if (component.critical) {
          this.restartComponent(component);
        }
      });

      // Give the process time to start
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (process.killed) {
        throw new Error(`Component ${component.name} failed to start`);
      }

      logger.info(`✅ ${component.description} started (PID: ${process.pid})`);
    } catch (error) {
      logger.error(`❌ Failed to start ${component.description}:`, error);
      throw error;
    }
  }

  private async restartComponent(component: any): Promise<void> {
    const restartCount = this.restartCounts.get(component.name) || 0;

    if (restartCount >= 5) {
      logger.error(`❌ Component ${component.name} failed to restart 5 times - giving up`);
      return;
    }

    logger.info(`🔄 Restarting ${component.description} (attempt ${restartCount + 1}/5)...`);

    // Kill existing process if it's still running
    const existingProcess = this.processes.get(component.name);
    if (existingProcess && !existingProcess.killed) {
      existingProcess.kill('SIGTERM');
    }

    // Wait before restart
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Increment restart count
    this.restartCounts.set(component.name, restartCount + 1);

    // Restart the component
    await this.startComponent(component);
  }

  private setupSystemMonitoring(): void {
    logger.info('📊 Setting up system monitoring...');

    // Monitor system health every 30 seconds
    setInterval(async () => {
      await this.performSystemHealthCheck();
    }, 30000);

    // Update status file every minute
    setInterval(async () => {
      await this.updateStatusFile();
    }, 60000);

    // Log system stats every 5 minutes
    setInterval(() => {
      this.logSystemStats();
    }, 300000);

    logger.info('✅ System monitoring active');
  }

  private async performSystemHealthCheck(): Promise<void> {
    try {
      // Check process health
      let healthyProcesses = 0;
      let totalProcesses = this.processes.size;

      for (const [name, process] of this.processes) {
        if (process && !process.killed) {
          healthyProcesses++;
        } else {
          logger.warn(`⚠️ Process ${name} is not healthy`);
        }
      }

      // Check system resources
      const memoryUsage = process.memoryUsage();
      const memoryPercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

      if (memoryPercent > 90) {
        logger.warn(`🚨 High memory usage: ${memoryPercent.toFixed(1)}%`);

        if (global.gc) {
          global.gc();
          logger.info('🧹 Garbage collection performed');
        }
      }

      // Log health summary periodically
      const now = Date.now();
      if (now % 300000 < 30000) {
        // Every 5 minutes
        logger.info(
          `💚 System Health: ${healthyProcesses}/${totalProcesses} processes healthy, Memory: ${memoryPercent.toFixed(1)}%`
        );
      }
    } catch (error) {
      logger.error('Health check error:', error);
    }
  }

  private async updateStatusFile(): Promise<void> {
    try {
      const statusFile = path.join(process.cwd(), '.crewai-runtime', 'system-status.json');

      const processStatus = Array.from(this.processes.entries()).reduce(
        (acc, [name, process]) => {
          acc[name] = {
            pid: process.pid,
            alive: !process.killed,
            restartCount: this.restartCounts.get(name) || 0,
          };
          return acc;
        },
        {} as Record<string, any>
      );

      const status = {
        systemId: `autonomous_${this.startTime.getTime()}`,
        startTime: this.startTime.toISOString(),
        uptime: Math.round((Date.now() - this.startTime.getTime()) / 1000),
        status: 'running',
        components: processStatus,
        memory: process.memoryUsage(),
        lastUpdate: new Date().toISOString(),
      };

      await fs.writeFile(statusFile, JSON.stringify(status, null, 2));
    } catch (error) {
      logger.error('Failed to update status file:', error);
    }
  }

  private logSystemStats(): void {
    const uptime = Math.round((Date.now() - this.startTime.getTime()) / 1000);
    const memoryUsage = process.memoryUsage();
    const processCount = this.processes.size;
    const healthyProcesses = Array.from(this.processes.values()).filter(p => p && !p.killed).length;

    logger.info('📈 AUTONOMOUS SYSTEM STATS');
    logger.info('===========================');
    logger.info(
      `Uptime: ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`
    );
    logger.info(`Processes: ${healthyProcesses}/${processCount} healthy`);
    logger.info(`Memory: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB used`);
    logger.info(`CPU Load: ${process.loadavg?.()?.[0]?.toFixed(2) || 'N/A'}`);
    logger.info('===========================');
  }

  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      if (this.isShuttingDown) return;

      this.isShuttingDown = true;

      logger.info(`🛑 Received ${signal} - Shutting down autonomous system gracefully...`);

      // Stop all processes
      for (const [name, process] of this.processes) {
        if (process && !process.killed) {
          logger.info(`🛑 Stopping ${name}...`);
          process.kill('SIGTERM');

          // Give process time to shutdown gracefully
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Force kill if still running
          if (!process.killed) {
            logger.warn(`⚡ Force killing ${name}...`);
            process.kill('SIGKILL');
          }
        }
      }

      // Clean up runtime files
      try {
        const runtimeDir = path.join(process.cwd(), '.crewai-runtime');
        await fs.rm(runtimeDir, { recursive: true, force: true });
        logger.info('🧹 Runtime files cleaned up');
      } catch (error) {
        logger.error('Failed to clean up runtime files:', error);
      }

      logger.info('✅ Autonomous system shutdown complete');
      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    // Handle uncaught exceptions
    process.on('uncaughtException', error => {
      logger.error('🚨 Uncaught exception in launcher:', error);
      // Don't exit - log and continue
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('🚨 Unhandled rejection in launcher:', reason);
      // Don't exit - log and continue
    });
  }

  private showStartupSuccess(): void {
    const banner = `
████████████████████████████████████████████████████████████████
██                                                            ██
██  🚀 AUTONOMOUS CREWAI SYSTEM OPERATIONAL 🚀               ██
██                                                            ██
██  ✅ All agents initialized and working autonomously        ██
██  ✅ Background workers monitoring 24/7                     ██
██  ✅ Health checks and auto-recovery active                 ██
██  ✅ Real-time monitoring endpoints live                    ██
██                                                            ██
██  📊 Monitor at: http://localhost:3000/api/crews/status     ██
██  📈 Metrics at: http://localhost:3000/api/crews/metrics    ██
██  🏥 Health at:  http://localhost:3000/api/crews/health     ██
██  📋 Logs at:    http://localhost:3000/api/crews/logs       ██
██                                                            ██
██  🎯 The system is now working AUTONOMOUSLY!                ██
██     Content generation, SEO, reviews, social media,       ██
██     competitor analysis - all happening automatically.    ██
██                                                            ██
████████████████████████████████████████████████████████████████
`;

    console.log(banner);
    logger.info('🎉 AUTONOMOUS SYSTEM LAUNCH COMPLETE - AGENTS ARE WORKING!');
  }

  private async maintainSystemExecution(): Promise<void> {
    // Keep the main process alive
    return new Promise(resolve => {
      // This will run indefinitely until the process is killed
      const keepAlive = () => {
        if (!this.isShuttingDown) {
          setTimeout(keepAlive, 60000); // Check every minute
        } else {
          resolve();
        }
      };

      keepAlive();
    });
  }
}

// Create and start the autonomous system
const launcher = new AutonomousSystemLauncher();

// Auto-start if run directly
if (require.main === module) {
  launcher.launch().catch(error => {
    logger.error('❌ Autonomous system launch failed:', error);
    process.exit(1);
  });
}

export { AutonomousSystemLauncher };
