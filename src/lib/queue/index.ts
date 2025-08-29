// Mock Queue Implementation for Build
import { logger } from '@/lib/safe-logger';

export class Queue {
  private name: string;
  private handler?: Function;

  constructor(name: string, options?: any) {
    this.name = name;
  }

  process(concurrency: number | Function, handler?: Function) {
    if (typeof concurrency === 'function') {
      this.handler = concurrency;
    } else {
      this.handler = handler;
    }
    logger.info(`Queue ${this.name} processor registered`);
    return this;
  }

  add(jobName: string, data: any, options?: any) {
    logger.debug(`Job ${jobName} added to queue ${this.name}`);
    
    // Execute handler immediately in mock
    if (this.handler) {
      setTimeout(() => {
        const job = { 
          data, 
          name: jobName, 
          id: Date.now(),
          progress: (percent: number) => {},
          log: (msg: string) => logger.info(msg),
        };
        this.handler(job);
      }, 0);
    }
    
    return Promise.resolve({ id: Date.now(), data });
  }

  on(event: string, handler: Function) {
    return this;
  }

  close() {
    return Promise.resolve();
  }

  empty() {
    return Promise.resolve();
  }

  clean(grace: number, status?: string) {
    return Promise.resolve([]);
  }

  getJobs(types: string[]) {
    return Promise.resolve([]);
  }

  getJobCounts() {
    return Promise.resolve({
      waiting: 0,
      active: 0,
      completed: 0,
      failed: 0,
      delayed: 0,
      paused: 0,
    });
  }
}

// Default export
export default Queue;

// Named exports for compatibility
export const createQueue = (name: string, options?: any) => new Queue(name, options);
export const MockQueue = Queue;
