import {
  LegalConsultationAgent,
  LegalConsultationRequest,
} from './agents/legal-consultation-agent';
import {
  AppointmentSchedulingAgent,
  AppointmentRequest,
} from './agents/appointment-scheduling-agent';
import { DocumentAnalysisAgent, DocumentAnalysisRequest } from './agents/document-analysis-agent';
import {
  CompetitiveAnalysisAgent,
  CompetitorAnalysisRequest,
} from './agents/competitive-analysis-agent';
import {
  SocialMediaMonitoringAgent,
  SocialMediaMonitoringRequest,
} from './agents/social-media-monitoring-agent';
import {
  SEOBlogGenerationAgent,
  SEOBlogGenerationRequest,
} from './agents/seo-blog-generation-agent';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { logCrewExecution } from '@/lib/crews/log-execution';

export interface CrewTask {
  id: string;
  type:
    | 'legal-consultation'
    | 'appointment-scheduling'
    | 'document-analysis'
    | 'competitive-analysis'
    | 'social-media-monitoring'
    | 'seo-blog-generation'
    | 'multi-step';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userId: string;
  data: unknown; // Can be any request type
  dependencies?: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface MultiStepWorkflow {
  steps: {
    agent: string;
    action: string;
    data: unknown;
  }[];
  currentStep: number;
  results: unknown[];
}

export class CrewCoordinator {
  private static instance: CrewCoordinator;
  private legalConsultationAgent: LegalConsultationAgent;
  private appointmentSchedulingAgent: AppointmentSchedulingAgent;
  private documentAnalysisAgent: DocumentAnalysisAgent;
  private competitiveAnalysisAgent: CompetitiveAnalysisAgent;
  private socialMediaMonitoringAgent: SocialMediaMonitoringAgent;
  private seoBlogGenerationAgent: SEOBlogGenerationAgent;
  private activeTasks: Map<string, CrewTask> = new Map();
  private taskQueue: CrewTask[] = [];

  private constructor() {
    this.legalConsultationAgent = new LegalConsultationAgent();
    this.appointmentSchedulingAgent = new AppointmentSchedulingAgent();
    this.documentAnalysisAgent = new DocumentAnalysisAgent();
    this.competitiveAnalysisAgent = new CompetitiveAnalysisAgent();
    this.socialMediaMonitoringAgent = new SocialMediaMonitoringAgent();
    this.seoBlogGenerationAgent = new SEOBlogGenerationAgent();

    // Start task processing
    this.startTaskProcessor();
  }

  static getInstance(): CrewCoordinator {
    if (!CrewCoordinator.instance) {
      CrewCoordinator.instance = new CrewCoordinator();
    }
    return CrewCoordinator.instance;
  }

  async executeTask(task: CrewTask): Promise<unknown> {
    const startTime = new Date();
    let status: 'success' | 'failure' = 'success';
    let result: unknown;
    let error: string | undefined;

    try {
      logger.info(`Starting task ${task.id} of type ${task.type}`);

      task.status = 'in-progress';
      this.activeTasks.set(task.id, task);

      switch (task.type) {
        case 'legal-consultation':
          result = await this.executeLegalConsultation(
            task.data as unknown as LegalConsultationRequest
          );
          break;

        case 'appointment-scheduling':
          result = await this.executeAppointmentScheduling(
            task.data as unknown as AppointmentRequest
          );
          break;

        case 'document-analysis':
          result = await this.executeDocumentAnalysis(
            task.data as unknown as DocumentAnalysisRequest
          );
          break;

        case 'competitive-analysis':
          result = await this.executeCompetitiveAnalysis(
            task.data as unknown as CompetitorAnalysisRequest
          );
          break;

        case 'social-media-monitoring':
          result = await this.executeSocialMediaMonitoring(
            task.data as unknown as SocialMediaMonitoringRequest
          );
          break;

        case 'seo-blog-generation':
          result = await this.executeSEOBlogGeneration(
            task.data as unknown as SEOBlogGenerationRequest
          );
          break;

        case 'multi-step':
          result = await this.executeMultiStepWorkflow(task.data as unknown as MultiStepWorkflow);
          break;

        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }

      task.status = 'completed';
      task.result = result;
      task.completedAt = new Date();

      logger.info(`Completed task ${task.id}`);
      return result;
    } catch (err) {
      status = 'failure';
      error = err instanceof Error ? err.message : 'Unknown error';
      task.status = 'failed';
      task.error = error;
      logger.error(`Task ${task.id} failed:`, errorToLogMeta(err));
      throw err;
    } finally {
      const endTime = new Date();

      // Log the execution to the database
      await logCrewExecution({
        agentName: `crew-coordinator-${task.type}`,
        executionType: task.type,
        status,
        startTime,
        endTime,
        input: task.data,
        output: result,
        error,
        metadata: {
          taskId: task.id,
          userId: task.userId,
          priority: task.priority,
          dependencies: task.dependencies,
        },
      }).catch(logError => {
        logger.error('Failed to log crew execution:', logError);
      });

      this.activeTasks.delete(task.id);
    }
  }

  async createLegalConsultationTask(
    userId: string,
    request: LegalConsultationRequest,
    priority: CrewTask['priority'] = 'medium'
  ): Promise<string> {
    const task: CrewTask = {
      id: this.generateTaskId(),
      type: 'legal-consultation',
      priority,
      userId,
      data: request,
      status: 'pending',
      createdAt: new Date(),
    };

    this.queueTask(task);
    return task.id;
  }

  async createAppointmentSchedulingTask(
    userId: string,
    request: AppointmentRequest,
    priority: CrewTask['priority'] = 'medium'
  ): Promise<string> {
    const task: CrewTask = {
      id: this.generateTaskId(),
      type: 'appointment-scheduling',
      priority,
      userId,
      data: request,
      status: 'pending',
      createdAt: new Date(),
    };

    this.queueTask(task);
    return task.id;
  }

  async createDocumentAnalysisTask(
    userId: string,
    request: DocumentAnalysisRequest,
    priority: CrewTask['priority'] = 'medium'
  ): Promise<string> {
    const task: CrewTask = {
      id: this.generateTaskId(),
      type: 'document-analysis',
      priority,
      userId,
      data: request,
      status: 'pending',
      createdAt: new Date(),
    };

    this.queueTask(task);
    return task.id;
  }

  async createCompetitiveAnalysisTask(
    userId: string,
    request: CompetitorAnalysisRequest,
    priority: CrewTask['priority'] = 'medium'
  ): Promise<string> {
    const task: CrewTask = {
      id: this.generateTaskId(),
      type: 'competitive-analysis',
      priority,
      userId,
      data: request,
      status: 'pending',
      createdAt: new Date(),
    };

    this.queueTask(task);
    return task.id;
  }

  async createSocialMediaMonitoringTask(
    userId: string,
    request: SocialMediaMonitoringRequest,
    priority: CrewTask['priority'] = 'medium'
  ): Promise<string> {
    const task: CrewTask = {
      id: this.generateTaskId(),
      type: 'social-media-monitoring',
      priority,
      userId,
      data: request,
      status: 'pending',
      createdAt: new Date(),
    };

    this.queueTask(task);
    return task.id;
  }

  async createSEOBlogGenerationTask(
    userId: string,
    request: SEOBlogGenerationRequest,
    priority: CrewTask['priority'] = 'medium'
  ): Promise<string> {
    const task: CrewTask = {
      id: this.generateTaskId(),
      type: 'seo-blog-generation',
      priority,
      userId,
      data: request,
      status: 'pending',
      createdAt: new Date(),
    };

    this.queueTask(task);
    return task.id;
  }

  async createClientIntakeWorkflow(
    userId: string,
    initialConsultation: LegalConsultationRequest
  ): Promise<string> {
    const workflow: MultiStepWorkflow = {
      steps: [
        {
          agent: 'legal-consultation',
          action: 'analyze',
          data: initialConsultation,
        },
        {
          agent: 'appointment-scheduling',
          action: 'findSlots',
          data: {
            userId,
            appointmentType: 'consultation',
            practiceArea: initialConsultation.caseType,
            duration: 60,
            isUrgent: initialConsultation.urgency === 'high',
            language: initialConsultation.language,
            location: 'virtual',
          },
        },
      ],
      currentStep: 0,
      results: [],
    };

    const task: CrewTask = {
      id: this.generateTaskId(),
      type: 'multi-step',
      priority: initialConsultation.urgency === 'high' ? 'urgent' : 'medium',
      userId,
      data: workflow,
      status: 'pending',
      createdAt: new Date(),
    };

    this.queueTask(task);
    return task.id;
  }

  getTaskStatus(taskId: string): CrewTask | undefined {
    return this.activeTasks.get(taskId) || this.taskQueue.find(task => task.id === taskId);
  }

  private async executeLegalConsultation(request: LegalConsultationRequest) {
    return await this.legalConsultationAgent.analyze(request);
  }

  private async executeAppointmentScheduling(request: AppointmentRequest) {
    return await this.appointmentSchedulingAgent.findAvailableSlots(request);
  }

  private async executeDocumentAnalysis(request: DocumentAnalysisRequest) {
    return await this.documentAnalysisAgent.analyzeDocument(request);
  }

  private async executeCompetitiveAnalysis(request: CompetitorAnalysisRequest) {
    return await this.competitiveAnalysisAgent.analyzeCompetition(request);
  }

  private async executeSocialMediaMonitoring(request: SocialMediaMonitoringRequest) {
    return await this.socialMediaMonitoringAgent.monitorTrendingTopics(request);
  }

  private async executeSEOBlogGeneration(request: SEOBlogGenerationRequest) {
    return await this.seoBlogGenerationAgent.generateSEOBlog(request);
  }

  private async executeMultiStepWorkflow(workflow: MultiStepWorkflow) {
    const results: unknown[] = [];

    for (let i = workflow.currentStep; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      if (!step) {
        logger.error(`Step at index ${i} not found in workflow`);
        continue;
      }
      let stepResult;

      switch (step.agent) {
        case 'legal-consultation':
          stepResult = await this.legalConsultationAgent.analyze(
            step.data as LegalConsultationRequest
          );
          break;

        case 'appointment-scheduling':
          stepResult = await this.appointmentSchedulingAgent.findAvailableSlots(
            step.data as AppointmentRequest
          );
          break;

        case 'document-analysis':
          stepResult = await this.documentAnalysisAgent.analyzeDocument(
            step.data as DocumentAnalysisRequest
          );
          break;

        case 'competitive-analysis':
          stepResult = await this.competitiveAnalysisAgent.analyzeCompetition(
            step.data as CompetitorAnalysisRequest
          );
          break;

        case 'social-media-monitoring':
          stepResult = await this.socialMediaMonitoringAgent.monitorTrendingTopics(
            step.data as SocialMediaMonitoringRequest
          );
          break;

        case 'seo-blog-generation':
          stepResult = await this.seoBlogGenerationAgent.generateSEOBlog(
            step.data as SEOBlogGenerationRequest
          );
          break;

        default:
          throw new Error(`Unknown agent: ${step?.agent || 'undefined'}`);
      }

      if (step) {
        results.push(stepResult);
        workflow.currentStep = i + 1;
        workflow.results = results;
      }
    }

    return {
      completed: true,
      results,
      workflow,
    };
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

  // Analytics and monitoring methods
  getQueueStatus() {
    return {
      queueLength: this.taskQueue.length,
      activeTasks: this.activeTasks.size,
      tasksByType: this.getTaskTypeBreakdown(),
      tasksByPriority: this.getTaskPriorityBreakdown(),
    };
  }

  private getTaskTypeBreakdown() {
    const breakdown: Record<string, number> = {};

    [...this.taskQueue, ...Array.from(this.activeTasks.values())].forEach(task => {
      breakdown[task.type] = (breakdown[task.type] || 0) + 1;
    });

    return breakdown;
  }

  private getTaskPriorityBreakdown() {
    const breakdown: Record<string, number> = {};

    [...this.taskQueue, ...Array.from(this.activeTasks.values())].forEach(task => {
      breakdown[task.priority] = (breakdown[task.priority] || 0) + 1;
    });

    return breakdown;
  }
}

// Export the singleton getter instead of instance
export const getCrewCoordinator = () => CrewCoordinator.getInstance();
