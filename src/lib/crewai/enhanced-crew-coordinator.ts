import { CrewTask } from './crew-coordinator';
import {
  LegalConsultationAgent,
  LegalConsultationRequest,
} from './agents/legal-consultation-agent';
import {
  AppointmentSchedulingAgent,
  AppointmentRequest,
} from './agents/appointment-scheduling-agent';
import { DocumentAnalysisAgent, DocumentAnalysisRequest } from './agents/document-analysis-agent';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { EventEmitter } from 'events';
import pLimit from 'p-limit';

interface InterAgentMessage {
  taskId: string;
  taskData: unknown;
  agentName?: string;
  messageType?: string;
  data?: unknown;
}

// Event types for the event system
interface TaskEvent {
  taskId: string;
  agentName: string;
  executionTime?: number;
}

interface TaskStartedEvent extends TaskEvent {}

interface TaskCompletedEvent extends TaskEvent {
  result: unknown;
}

interface TaskFailedEvent extends TaskEvent {
  error: Error | string;
}

interface WorkflowStepCompletedEvent {
  workflowId: string;
  stepId: string;
  result: unknown;
}

interface AgentMessageEvent {
  from: string;
  to: string;
  type: string;
  payload: unknown;
}

interface MemoryAccessEvent {
  operation: 'store' | 'retrieve';
  agent: string;
  key: string;
  size?: number;
  hit?: boolean;
}

export interface ParallelProcessingConfig {
  maxConcurrentTasks: number;
  taskQueueSize: number;
  workerThreads: number;
  priorityQueues: boolean;
}

export interface CommunicationConfig {
  messageQueue: 'redis' | 'rabbitmq' | 'kafka' | 'memory';
  enableDirectMessaging: boolean;
  messageRetention: number; // in seconds
  maxMessageSize: number;
}

export interface MemoryConfig {
  type: 'distributed' | 'local';
  provider: 'redis' | 'memory';
  maxMemoryPerAgent: string;
  ttl: number; // in seconds
  compressionEnabled: boolean;
}

export interface WorkflowStep {
  id: string;
  agentName: string;
  action: string;
  input: unknown;
  dependencies: string[];
  retryCount: number;
  maxRetries: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  currentStep: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  context: Record<string, unknown>;
  createdAt: Date;
  completedAt?: Date;
}

export interface AgentCommunicationChannel {
  agentName: string;
  messageQueue: unknown[];
  subscribers: Set<string>;
  messageHandlers: Map<string, (...args: unknown[]) => Promise<unknown>>;
  lastActivity: Date;
}

export interface DistributedMemoryStore {
  agent: string;
  key: string;
  value: unknown;
  timestamp: Date;
  ttl: number;
  compressed: boolean;
}

export class CrewCoordinator {
  private static enhancedInstance: CrewCoordinator;
  private legalConsultationAgent: LegalConsultationAgent;
  private appointmentSchedulingAgent: AppointmentSchedulingAgent;
  private documentAnalysisAgent: DocumentAnalysisAgent;
  private activeTasks: Map<string, CrewTask> = new Map();
  private taskQueue: CrewTask[] = [];
  private parallelProcessingConfig?: ParallelProcessingConfig;
  private communicationConfig?: CommunicationConfig;
  private memoryConfig?: MemoryConfig;
  private concurrencyLimit?: ReturnType<typeof pLimit>;
  private workflowManager: Map<string, Workflow> = new Map();
  private communicationChannels: Map<string, AgentCommunicationChannel> = new Map();
  private distributedMemory: Map<string, DistributedMemoryStore> = new Map();
  private eventEmitter: EventEmitter;
  private performanceMetrics: Map<string, unknown> = new Map();

  private constructor() {
    this.legalConsultationAgent = new LegalConsultationAgent();
    this.appointmentSchedulingAgent = new AppointmentSchedulingAgent();
    this.documentAnalysisAgent = new DocumentAnalysisAgent();
    this.eventEmitter = new EventEmitter();
    this.setupEventHandlers();
    this.startTaskProcessor();
  }

  static getInstance(): CrewCoordinator {
    if (!CrewCoordinator.enhancedInstance) {
      CrewCoordinator.enhancedInstance = new CrewCoordinator();
    }
    return CrewCoordinator.enhancedInstance;
  }

  // Base CrewCoordinator methods
  async executeTask(task: CrewTask): Promise<unknown> {
    try {
      logger.info(`Starting task ${task.id} of type ${task.type}`);

      task.status = 'in-progress';
      this.activeTasks.set(task.id, task);

      let result;

      switch (task.type) {
        case 'legal-consultation':
          result = await this.legalConsultationAgent.analyze(
            task.data as unknown as LegalConsultationRequest
          );
          break;

        case 'appointment-scheduling':
          result = await this.appointmentSchedulingAgent.findAvailableSlots(
            task.data as unknown as AppointmentRequest
          );
          break;

        case 'document-analysis':
          result = await this.documentAnalysisAgent.analyzeDocument(
            task.data as unknown as DocumentAnalysisRequest
          );
          break;

        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }

      task.status = 'completed';
      task.result = result;
      task.completedAt = new Date();

      logger.info(`Completed task ${task.id}`);
      return result;
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Task ${task.id} failed:`, errorToLogMeta(error));
      throw error;
    } finally {
      this.activeTasks.delete(task.id);
    }
  }

  private queueTask(task: CrewTask) {
    // Insert task based on priority
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    const insertIndex = this.taskQueue.findIndex(
      queuedTask => priorityOrder[queuedTask.priority] > priorityOrder[task.priority]
    );

    if (insertIndex === -1) {
      this.taskQueue.push(task);
    } else {
      this.taskQueue.splice(insertIndex, 0, task);
    }

    logger.info(`Queued task ${task.id} with priority ${task.priority}`);
  }

  private async startTaskProcessor() {
    setInterval(async () => {
      if (this.taskQueue.length > 0 && this.activeTasks.size < 5) {
        // Max 5 concurrent tasks
        const task = this.taskQueue.shift();
        if (task) {
          // Execute task in background
          this.executeTask(task).catch(error => {
            logger.error(`Background task execution failed:`, errorToLogMeta(error));
          });
        }
      }
    }, 1000); // Check every second
  }

  private generateTaskId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventHandlers(): void {
    this.eventEmitter.on('task-started', this.handleTaskStarted.bind(this));
    this.eventEmitter.on('task-completed', this.handleTaskCompleted.bind(this));
    this.eventEmitter.on('task-failed', this.handleTaskFailed.bind(this));
    this.eventEmitter.on('workflow-step-completed', this.handleWorkflowStepCompleted.bind(this));
    this.eventEmitter.on('agent-message', this.handleAgentMessage.bind(this));
    this.eventEmitter.on('memory-access', this.handleMemoryAccess.bind(this));
  }

  // Enhanced parallel processing
  async enableParallelProcessing(config: ParallelProcessingConfig): Promise<void> {
    this.parallelProcessingConfig = config;
    this.concurrencyLimit = pLimit(config.maxConcurrentTasks);

    logger.info('Parallel processing enabled:', {
      maxConcurrentTasks: config.maxConcurrentTasks,
      taskQueueSize: config.taskQueueSize,
      workerThreads: config.workerThreads,
      priorityQueues: config.priorityQueues,
    });
    this.eventEmitter.emit('parallel-processing-enabled', config);
  }

  async executeTasksInParallel(tasks: CrewTask[]): Promise<unknown[]> {
    if (!this.parallelProcessingConfig || !this.concurrencyLimit) {
      throw new Error('Parallel processing not enabled');
    }

    logger.info(`Executing ${tasks.length} tasks in parallel`);

    const startTime = Date.now();

    try {
      const results = await Promise.allSettled(
        tasks.map(task => this.concurrencyLimit!(() => this.executeTask(task)))
      );

      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      logger.info(
        `Parallel execution completed: ${successful} successful, ${failed} failed in ${Date.now() - startTime}ms`
      );

      return results.map(result => (result.status === 'fulfilled' ? result.value : result.reason));
    } catch (error) {
      logger.error('Parallel execution failed:', errorToLogMeta(error));
      throw error;
    }
  }

  // Inter-agent communication
  async setupCommunicationChannels(config: CommunicationConfig): Promise<void> {
    this.communicationConfig = config;

    logger.info('Setting up communication channels:', {
      messageQueue: config.messageQueue,
      enableDirectMessaging: config.enableDirectMessaging,
      messageRetention: config.messageRetention,
      maxMessageSize: config.maxMessageSize,
    });

    // Initialize communication channels for each agent
    const agentNames = [
      'legal-consultation',
      'appointment-scheduling',
      'document-analysis',
      'competitive-analysis',
      'social-media-monitoring',
      'seo-blog-generation',
      'enhanced-intake',
      'removal-defense',
      'business-immigration',
      'criminal-defense',
      'aila-trained-removal',
    ];

    for (const agentName of agentNames) {
      await this.setupAgentCommunication(agentName);
    }

    this.eventEmitter.emit('communication-channels-setup', config);
  }

  async setupAgentCommunication(agentName: string): Promise<void> {
    const channel: AgentCommunicationChannel = {
      agentName,
      messageQueue: [],
      subscribers: new Set(),
      messageHandlers: new Map(),
      lastActivity: new Date(),
    };

    this.communicationChannels.set(agentName, channel);

    // Setup default message handlers
    this.setupDefaultMessageHandlers(agentName);

    logger.info(`Communication channel setup for ${agentName}`);
  }

  private setupDefaultMessageHandlers(agentName: string): void {
    const channel = this.communicationChannels.get(agentName);
    if (!channel) return;

    // Handler for task delegation
    channel.messageHandlers.set('delegate-task', async (...args: unknown[]) => {
      const message = args[0] as InterAgentMessage;
      const { taskId, taskData } = message;
      const typedTaskData = taskData as {
        type: string;
        priority?: string;
        userId: string;
        data: unknown;
      };
      logger.info(`Agent ${agentName} received task delegation: ${taskId}`);

      // Create and execute delegated task
      const task: CrewTask = {
        id: taskId,
        type: typedTaskData.type as
          | 'legal-consultation'
          | 'appointment-scheduling'
          | 'document-analysis'
          | 'competitive-analysis'
          | 'social-media-monitoring'
          | 'seo-blog-generation'
          | 'multi-step',
        priority: (typedTaskData.priority as 'low' | 'medium' | 'high' | 'urgent') || 'medium',
        userId: typedTaskData.userId,
        data: typedTaskData.data,
        status: 'pending',
        createdAt: new Date(),
      };

      return await this.executeTask(task);
    });

    // Handler for information sharing
    channel.messageHandlers.set('share-information', async (...args: unknown[]) => {
      const message = args[0] as InterAgentMessage & { information: unknown; context: unknown };
      const { information, context } = message;
      logger.info(`Agent ${agentName} received information sharing:`, {
        type: typeof information,
        hasContent: information !== null && information !== undefined,
      });

      // Store in distributed memory
      await this.storeInDistributedMemory(agentName, `shared-${Date.now()}`, {
        information,
        context,
        timestamp: new Date(),
      });
    });

    // Handler for status updates
    channel.messageHandlers.set('status-update', async (...args: unknown[]) => {
      const message = args[0] as InterAgentMessage & { status: unknown; details: unknown };
      const { status, details } = message;
      logger.info(`Agent ${agentName} received status update:`, {
        statusType: typeof status,
        hasStatus: status !== null && status !== undefined,
      });

      this.eventEmitter.emit('agent-status-update', {
        agentName,
        status,
        details,
        timestamp: new Date(),
      });
    });
  }

  async sendMessageToAgent(
    fromAgent: string,
    toAgent: string,
    messageType: string,
    payload: unknown
  ): Promise<void> {
    const channel = this.communicationChannels.get(toAgent);
    if (!channel) {
      logger.error(`Communication channel not found for agent: ${toAgent}`);
      return;
    }

    const message = {
      from: fromAgent,
      to: toAgent,
      type: messageType,
      payload,
      timestamp: new Date(),
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    // Add to message queue
    channel.messageQueue.push(message);
    channel.lastActivity = new Date();

    // Process message if handler exists
    const handler = channel.messageHandlers.get(messageType);
    if (handler) {
      try {
        await handler(message);
      } catch (error) {
        logger.error(
          `Error processing message ${messageType} for agent ${toAgent}:`,
          errorToLogMeta(error)
        );
      }
    }

    this.eventEmitter.emit('agent-message', message);
  }

  async broadcastMessage(fromAgent: string, messageType: string, payload: unknown): Promise<void> {
    logger.info(`Broadcasting message from ${fromAgent}: ${messageType}`);

    const broadcastPromises = Array.from(this.communicationChannels.keys())
      .filter(agentName => agentName !== fromAgent)
      .map(agentName => this.sendMessageToAgent(fromAgent, agentName, messageType, payload));

    await Promise.allSettled(broadcastPromises);
  }

  // Distributed memory system
  async initializeMemorySystem(config: MemoryConfig): Promise<void> {
    this.memoryConfig = config;

    logger.info('Initializing distributed memory system:', {
      type: config.type,
      provider: config.provider,
      maxMemoryPerAgent: config.maxMemoryPerAgent,
      ttl: config.ttl,
      compressionEnabled: config.compressionEnabled,
    });

    // Setup memory cleanup interval
    setInterval(() => {
      this.cleanupExpiredMemory();
    }, 60000); // Clean up every minute

    this.eventEmitter.emit('memory-system-initialized', config);
  }

  async storeInDistributedMemory(
    agent: string,
    key: string,
    value: unknown,
    ttl?: number
  ): Promise<void> {
    const memoryKey = `${agent}:${key}`;
    const actualTtl = ttl || this.memoryConfig?.ttl || 3600; // Default 1 hour

    const memoryStore: DistributedMemoryStore = {
      agent,
      key,
      value: this.memoryConfig?.compressionEnabled ? this.compressData(value) : value,
      timestamp: new Date(),
      ttl: actualTtl,
      compressed: this.memoryConfig?.compressionEnabled || false,
    };

    this.distributedMemory.set(memoryKey, memoryStore);

    this.eventEmitter.emit('memory-access', {
      operation: 'store',
      agent,
      key,
      size: JSON.stringify(value).length,
    });
  }

  async getFromDistributedMemory(agent: string, key: string): Promise<unknown> {
    const memoryKey = `${agent}:${key}`;
    const memoryStore = this.distributedMemory.get(memoryKey);

    if (!memoryStore) {
      return null;
    }

    // Check TTL
    const now = Date.now();
    const storeTime = memoryStore.timestamp.getTime();
    const ttlMs = memoryStore.ttl * 1000;

    if (now - storeTime > ttlMs) {
      this.distributedMemory.delete(memoryKey);
      return null;
    }

    this.eventEmitter.emit('memory-access', {
      operation: 'retrieve',
      agent,
      key,
      hit: true,
    });

    return memoryStore.compressed
      ? this.decompressData(memoryStore.value as string)
      : memoryStore.value;
  }

  private cleanupExpiredMemory(): void {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, store] of this.distributedMemory) {
      const storeTime = store.timestamp.getTime();
      const ttlMs = store.ttl * 1000;

      if (now - storeTime > ttlMs) {
        this.distributedMemory.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      logger.info(`Cleaned up ${cleanedCount} expired memory entries`);
    }
  }

  private compressData(data: unknown): string {
    // Simple compression simulation (in production, use actual compression library)
    return JSON.stringify(data);
  }

  private decompressData(data: string): unknown {
    // Simple decompression simulation
    return JSON.parse(data);
  }

  // Advanced workflow management
  async createWorkflow(
    name: string,
    steps: Omit<WorkflowStep, 'id' | 'status' | 'retryCount'>[]
  ): Promise<string> {
    const workflowId = `workflow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const workflow: Workflow = {
      id: workflowId,
      name,
      steps: steps.map((step, index) => ({
        ...step,
        id: `step-${index}`,
        status: 'pending',
        retryCount: 0,
      })),
      currentStep: 0,
      status: 'pending',
      context: {},
      createdAt: new Date(),
    };

    this.workflowManager.set(workflowId, workflow);

    logger.info(`Created workflow ${name} with ${steps.length} steps`);
    return workflowId;
  }

  async executeWorkflow(workflowId: string): Promise<unknown[]> {
    const workflow = this.workflowManager.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    workflow.status = 'running';
    logger.info(`Executing workflow ${workflow.name}`);

    try {
      const results: unknown[] = [];

      for (let i = 0; i < workflow.steps.length; i++) {
        const step = workflow.steps[i];
        if (!step) {
          logger.error(`Step at index ${i} not found in workflow`);
          continue;
        }
        workflow.currentStep = i;

        // Check dependencies
        const dependencyResults = await this.checkStepDependencies(step, results);
        if (!dependencyResults.canExecute) {
          throw new Error(
            `Step ${step?.id || 'unknown'} dependencies not met: ${dependencyResults.missingDependencies.join(', ')}`
          );
        }

        // Execute step
        const stepResult = await this.executeWorkflowStep(step, workflow.context);
        results.push(stepResult);

        // Update workflow context
        if (step?.id) {
          workflow.context[step.id] = stepResult;
        }

        this.eventEmitter.emit('workflow-step-completed', {
          workflowId,
          stepId: step?.id || 'unknown',
          result: stepResult,
        });
      }

      workflow.status = 'completed';
      workflow.completedAt = new Date();

      logger.info(`Workflow ${workflow.name} completed successfully`);
      return results;
    } catch (error) {
      workflow.status = 'failed';
      logger.error(`Workflow ${workflow.name} failed:`, errorToLogMeta(error));
      throw error;
    }
  }

  private async checkStepDependencies(
    step: WorkflowStep,
    results: unknown[]
  ): Promise<{
    canExecute: boolean;
    missingDependencies: string[];
  }> {
    const missingDependencies: string[] = [];

    for (const dependency of step.dependencies) {
      const dependencyIndex = parseInt(dependency.replace('step-', ''));
      if (dependencyIndex >= results.length || !results[dependencyIndex]) {
        missingDependencies.push(dependency);
      }
    }

    return {
      canExecute: missingDependencies.length === 0,
      missingDependencies,
    };
  }

  private async executeWorkflowStep(
    step: WorkflowStep,
    context: Record<string, unknown>
  ): Promise<unknown> {
    step.status = 'running';
    step.startTime = new Date();

    try {
      // Execute the step based on agent name and action
      let result;

      switch (step.agentName) {
        case 'legal-consultation':
          result = await this.legalConsultationAgent.analyze(
            step.input as LegalConsultationRequest
          );
          break;
        case 'appointment-scheduling':
          result = await this.appointmentSchedulingAgent.findAvailableSlots(
            step.input as AppointmentRequest
          );
          break;
        case 'document-analysis':
          result = await this.documentAnalysisAgent.analyzeDocument(
            step.input as DocumentAnalysisRequest
          );
          break;
        // Add more agent handlers as needed
        default:
          throw new Error(`Unknown agent: ${step.agentName}`);
      }

      step.status = 'completed';
      step.result = result;
      step.endTime = new Date();

      return result;
    } catch (error) {
      step.status = 'failed';
      step.error = error instanceof Error ? error.message : 'Unknown error';
      step.endTime = new Date();

      // Retry logic
      if (step.retryCount < step.maxRetries) {
        step.retryCount++;
        step.status = 'pending';
        logger.info(`Retrying step ${step.id} (attempt ${step.retryCount}/${step.maxRetries})`);
        return this.executeWorkflowStep(step, context);
      }

      throw error;
    }
  }

  // Agent initialization and management
  async initializeAgent(agentName: string): Promise<void> {
    logger.info(`Initializing agent: ${agentName}`);

    // Setup communication channel
    await this.setupAgentCommunication(agentName);

    // Initialize performance metrics
    this.performanceMetrics.set(agentName, {
      tasksExecuted: 0,
      averageExecutionTime: 0,
      successRate: 0,
      lastActivity: new Date(),
    });

    this.eventEmitter.emit('agent-initialized', { agentName });
  }

  async setupAutomationWorkflows(agentName: string): Promise<void> {
    logger.info(`Setting up automation workflows for: ${agentName}`);

    // Setup common automation workflows
    if (agentName === 'Lead Validation Agent') {
      await this.createLeadValidationWorkflow();
    } else if (agentName === 'Follow-Up Automation Agent') {
      await this.createFollowUpWorkflow();
    }

    this.eventEmitter.emit('automation-workflows-setup', { agentName });
  }

  private async createLeadValidationWorkflow(): Promise<void> {
    await this.createWorkflow('Lead Validation Process', [
      {
        agentName: 'lead-validation',
        action: 'validate-contact-info',
        input: {},
        dependencies: [],
        maxRetries: 2,
      },
      {
        agentName: 'lead-validation',
        action: 'assess-lead-quality',
        input: {},
        dependencies: ['step-0'],
        maxRetries: 1,
      },
      {
        agentName: 'lead-validation',
        action: 'categorize-lead',
        input: {},
        dependencies: ['step-1'],
        maxRetries: 1,
      },
    ]);
  }

  private async createFollowUpWorkflow(): Promise<void> {
    await this.createWorkflow('Follow-Up Automation Process', [
      {
        agentName: 'follow-up',
        action: 'schedule-follow-up',
        input: {},
        dependencies: [],
        maxRetries: 2,
      },
      {
        agentName: 'follow-up',
        action: 'send-follow-up-email',
        input: {},
        dependencies: ['step-0'],
        maxRetries: 3,
      },
      {
        agentName: 'follow-up',
        action: 'track-response',
        input: {},
        dependencies: ['step-1'],
        maxRetries: 1,
      },
    ]);
  }

  // Event handlers
  private handleTaskStarted(event: TaskStartedEvent): void {
    const { taskId, agentName } = event;
    logger.info(`Task ${taskId} started by ${agentName}`);
  }

  private handleTaskCompleted(event: TaskCompletedEvent): void {
    const { taskId, agentName, result, executionTime } = event;
    if (executionTime !== undefined) {
      logger.info(`Task ${taskId} completed by ${agentName} in ${executionTime}ms`);
      // Update performance metrics
      this.updateAgentPerformanceMetrics(agentName, true, executionTime);
    } else {
      logger.info(`Task ${taskId} completed by ${agentName}`);
      // Update performance metrics with default value
      this.updateAgentPerformanceMetrics(agentName, true, 0);
    }
  }

  private handleTaskFailed(event: TaskFailedEvent): void {
    const { taskId, agentName, error, executionTime } = event;
    logger.error(`Task ${taskId} failed by ${agentName}:`, errorToLogMeta(error));

    // Update performance metrics
    if (executionTime !== undefined) {
      this.updateAgentPerformanceMetrics(agentName, false, executionTime);
    } else {
      this.updateAgentPerformanceMetrics(agentName, false, 0);
    }
  }

  private handleWorkflowStepCompleted(event: WorkflowStepCompletedEvent): void {
    const { workflowId, stepId, result } = event;
    logger.info(`Workflow step ${stepId} completed in workflow ${workflowId}`);
  }

  private handleAgentMessage(event: AgentMessageEvent): void {
    const { from, to, type, payload } = event;
    logger.info(`Agent message: ${from} -> ${to} (${type})`);
  }

  private handleMemoryAccess(event: MemoryAccessEvent): void {
    const { operation, agent, key, size, hit } = event;
    if (operation === 'store') {
      logger.debug(`Memory stored: ${agent}:${key} (${size} bytes)`);
    } else {
      logger.debug(`Memory accessed: ${agent}:${key} (${hit ? 'hit' : 'miss'})`);
    }
  }

  private updateAgentPerformanceMetrics(
    agentName: string,
    success: boolean,
    executionTime: number
  ): void {
    const metrics = this.performanceMetrics.get(agentName) as
      | {
          tasksExecuted: number;
          averageExecutionTime: number;
          successRate: number;
          lastActivity: Date;
        }
      | undefined;
    if (!metrics) return;

    metrics.tasksExecuted++;
    metrics.averageExecutionTime =
      (metrics.averageExecutionTime * (metrics.tasksExecuted - 1) + executionTime) /
      metrics.tasksExecuted;

    if (success) {
      metrics.successRate =
        (metrics.successRate * (metrics.tasksExecuted - 1) + 1) / metrics.tasksExecuted;
    } else {
      metrics.successRate =
        (metrics.successRate * (metrics.tasksExecuted - 1)) / metrics.tasksExecuted;
    }

    metrics.lastActivity = new Date();
  }

  // Public API methods
  getWorkflowStatus(workflowId: string): Workflow | null {
    return this.workflowManager.get(workflowId) || null;
  }

  getAgentPerformanceMetrics(agentName: string): unknown {
    return this.performanceMetrics.get(agentName) || null;
  }

  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflowManager.values());
  }

  getSystemStatus(): {
    parallelProcessing: boolean;
    communicationChannels: number;
    memoryEntries: number;
    activeWorkflows: number;
    totalAgents: number;
  } {
    return {
      parallelProcessing: !!this.parallelProcessingConfig,
      communicationChannels: this.communicationChannels.size,
      memoryEntries: this.distributedMemory.size,
      activeWorkflows: Array.from(this.workflowManager.values()).filter(w => w.status === 'running')
        .length,
      totalAgents: this.communicationChannels.size,
    };
  }
}
