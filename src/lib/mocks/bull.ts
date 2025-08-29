// Mock Bull Queue Implementation
export class MockBull {
  private name: string;
  private handler?: Function;
  private logger: any;

  constructor(name: string, options?: any) {
    this.name = name;
    // Create a safe logger
    this.logger = {
      info: (msg: string, meta?: any) => console.log(`[Queue ${name}]`, msg, meta),
      error: (msg: string, meta?: any) => console.error(`[Queue ${name}]`, msg, meta),
      warn: (msg: string, meta?: any) => console.warn(`[Queue ${name}]`, msg, meta),
      debug: (msg: string, meta?: any) => console.debug(`[Queue ${name}]`, msg, meta),
    };
  }

  process(handler: Function) {
    this.handler = handler;
    // Safe logging
    if (this.logger && this.logger.info) {
      this.logger.info(`Queue ${this.name} processor registered`);
    }
    return this;
  }

  add(jobName: string, data: any, options?: any) {
    // Safe logging
    if (this.logger && this.logger.info) {
      this.logger.info(`Job ${jobName} added to queue ${this.name}`, { data, options });
    }
    
    // Simulate async job processing
    if (this.handler) {
      setTimeout(() => {
        const job = { data, name: jobName, id: Date.now() };
        this.handler(job);
      }, 0);
    }
    
    return Promise.resolve({ id: Date.now(), data });
  }

  on(event: string, handler: Function) {
    // Safe event handling
    if (this.logger && this.logger.debug) {
      this.logger.debug(`Event listener registered for ${event}`);
    }
    return this;
  }

  close() {
    if (this.logger && this.logger.info) {
      this.logger.info(`Queue ${this.name} closed`);
    }
    return Promise.resolve();
  }

  removeAllListeners() {
    return this;
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

// Export as default and named export for compatibility
export default MockBull;

// Mock for bull package
export const Queue = MockBull;
