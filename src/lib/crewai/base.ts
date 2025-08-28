import { logger } from '@/lib/safe-logger';

export interface AgentConfig {
  name: string;
  role: string;
  goal: string;
  backstory: string;
  tools?: string[];
  maxIterations?: number;
}

export interface TaskConfig {
  description: string;
  expectedOutput: string;
  agent: string;
  context?: string[];
}

export interface CrewConfig {
  agents: AgentConfig[];
  tasks: TaskConfig[];
  process?: 'sequential' | 'hierarchical';
  verbose?: boolean;
}

export abstract class Agent {
  protected name: string;
  protected role: string;
  protected goal: string;
  protected backstory: string;
  protected tools: string[];
  protected maxIterations: number;

  constructor(config: AgentConfig) {
    this.name = config.name;
    this.role = config.role;
    this.goal = config.goal;
    this.backstory = config.backstory;
    this.tools = config.tools || [];
    this.maxIterations = config.maxIterations || 5;
  }

  abstract execute(input: unknown): Promise<unknown>;

  protected log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    logger[level](`[${this.name}] ${message}`);
  }
}

export abstract class Crew {
  protected agents: Map<string, Agent>;
  protected tasks: TaskConfig[];
  protected process: 'sequential' | 'hierarchical';
  protected verbose: boolean;

  constructor(config: CrewConfig) {
    this.agents = new Map();
    this.tasks = config.tasks;
    this.process = config.process || 'sequential';
    this.verbose = config.verbose || false;
  }

  abstract run(input: unknown): Promise<unknown>;

  protected log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    if (this.verbose) {
      logger[level](`[Crew] ${message}`);
    }
  }
}
