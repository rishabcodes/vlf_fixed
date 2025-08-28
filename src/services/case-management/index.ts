import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { cache } from '@/lib/cache';
import { generateCaseNumber } from '@/lib/utils/case-utils';
import { createNotification } from '@/services/notifications';
import { sendEmail } from '@/services/email';
import { GoHighLevelService } from '@/services/gohighlevel';
import type { CaseMetadata, CaseNote, CaseFinancials } from '@/types/services';
import {
  PracticeArea,
  CaseStatus,
  TaskPriority,
  TaskStatus,
  TaskType,
  Task,
  User,
  Case,
  Document,
  Appointment,
  Prisma,
} from '@prisma/client';

const ghl = new GoHighLevelService();

// Case creation schema
const CreateCaseSchema = z.object({
  clientId: z.string(),
  attorneyId: z.string().optional(),
  practiceArea: z.nativeEnum(PracticeArea),
  title: z.string(),
  description: z.string().optional(),
  initialDocuments: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        url: z.string(),
        size: z.number(),
      })
    )
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Case update schema
const UpdateCaseSchema = z.object({
  attorneyId: z.string().optional(),
  status: z.nativeEnum(CaseStatus).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Task schema
const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: z.nativeEnum(TaskType),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.string().optional(),
  assignedToId: z.string().optional(),
  caseId: z.string().optional(),
});

// Note schema
const CreateNoteSchema = z.object({
  caseId: z.string(),
  content: z.string(),
  isPrivate: z.boolean().default(false),
});

// Type definitions for better type safety
interface CaseWithRelations extends Case {
  client: User;
  attorney?: User | null;
  documents?: Document[];
  appointments?: Appointment[];
  tasks?: Task[];
}

export class CaseManagementService {
  async createCase(data: z.infer<typeof CreateCaseSchema>) {
    try {
      const validated = CreateCaseSchema.parse(data);

      // Generate unique case number
      const caseNumber = await generateCaseNumber(validated.practiceArea);

      // Create the case
      const newCase = await getPrismaClient().case.create({
        data: {
          caseNumber,
          clientId: validated.clientId,
          attorneyId: validated.attorneyId,
          practiceArea: validated.practiceArea,
          status: CaseStatus.open,
          description: validated.description,
          metadata: (validated.metadata || {}) as Prisma.InputJsonValue,
        },
        include: {
          client: true,
          attorney: true,
        },
      });

      // Create initial documents if provided
      if (validated.initialDocuments?.length) {
        await getPrismaClient().document.createMany({
          data: validated.initialDocuments.map(doc => ({
            caseId: newCase.id,
            name: doc.name,
            type: doc.type,
            url: doc.url,
            size: doc.size,
            uploadedBy: validated.clientId,
          })),
        });
      }

      // Create initial tasks
      await this.createInitialTasks(newCase.id, validated.practiceArea, validated.attorneyId);

      // Send notifications
      await this.notifyNewCase({
        id: newCase.id,
        caseNumber: newCase.caseNumber,
        clientId: newCase.clientId,
        practiceArea: newCase.practiceArea,
        client: {
          email: newCase.client.email,
          firstName: newCase.client.name?.split(' ')[0] || null,
          lastName: newCase.client.name?.split(' ').slice(1).join(' ') || null,
        },
        attorney: newCase.attorney
          ? {
              email: newCase.attorney.email,
              name: newCase.attorney.name,
            }
          : null,
      });

      // Update CRM
      if (newCase.client.email) {
        await ghl.upsertContact({
          email: newCase.client.email,
          firstName: newCase.client.name?.split(' ')[0] || '',
          lastName: newCase.client.name?.split(' ').slice(1).join(' ') || '',
          phone: newCase.client.phone || '',
          tags: [`case-opened`, `practice-${validated.practiceArea}`],
          customFields: {
            caseNumber: newCase.caseNumber,
            caseStatus: newCase.status,
            practiceArea: validated.practiceArea,
          },
        });
      }

      logger.info('Case created successfully', { caseId: newCase.id, caseNumber });
      return newCase;
    } catch (error) {
      logger.error('Error creating case', errorToLogMeta(error));
      throw error;
    }
  }

  async updateCase(caseId: string, data: z.infer<typeof UpdateCaseSchema>) {
    try {
      const validated = UpdateCaseSchema.parse(data);

      const existingCase = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        include: { client: true },
      });

      if (!existingCase) {
        throw new Error('Case not found');
      }

      const updatedCase = await getPrismaClient().case.update({
        where: { id: caseId },
        data: validated as Prisma.CaseUpdateInput,
        include: {
          client: true,
          attorney: true,
          documents: true,
          tasks: {
            where: { status: { not: TaskStatus.completed } },
            orderBy: { dueDate: 'asc' },
          },
        },
      });

      // If status changed, create notification
      if (validated.status && validated.status !== existingCase.status) {
        await this.notifyStatusChange(
          {
            id: updatedCase.id,
            caseNumber: updatedCase.caseNumber,
            status: updatedCase.status,
            client: {
              email: (updatedCase.client as User & { email: string }).email,
              firstName: updatedCase.client.name?.split(' ')[0] || null,
              lastName: updatedCase.client.name?.split(' ').slice(1).join(' ') || null,
              phone: updatedCase.client.phone || null,
            },
          },
          existingCase.status
        );
      }

      // Update CRM
      if (updatedCase.client.email && validated.status) {
        await ghl.upsertContact({
          phone: updatedCase.client.phone || 'unknown',
          firstName: updatedCase.client.name?.split(' ')[0] || 'Unknown',
          lastName: updatedCase.client.name?.split(' ').slice(1).join(' ') || 'Client',
          email: updatedCase.client.email,
          customFields: {
            caseStatus: validated.status,
          },
        });
      }

      // Clear cache
      await cache.delete(`case:${caseId}`);

      return updatedCase;
    } catch (error) {
      logger.error('Error updating case', errorToLogMeta(error));
      throw error;
    }
  }

  async getCaseDetails(caseId: string, includePrivate: boolean = false) {
    try {
      // Try cache first
      const cacheKey = `case:${caseId}:${includePrivate}`;
      const cached = await cache.get(cacheKey);
      if (cached) return cached;

      const caseDetails = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        include: {
          client: true,
          attorney: true,
          documents: {
            orderBy: { createdAt: 'desc' },
          },
          appointments: {
            orderBy: { scheduledAt: 'asc' },
          },
          tasks: {
            orderBy: { dueDate: 'asc' },
          },
        },
      });

      if (!caseDetails) {
        throw new Error('Case not found');
      }

      // Calculate case metrics
      const metrics = await this.calculateCaseMetrics(caseId);

      const result = {
        ...caseDetails,
        metrics,
      };

      // Cache for 5 minutes
      await cache.set(cacheKey, JSON.stringify(result), 300);

      return result;
    } catch (error) {
      logger.error('Error getting case details', errorToLogMeta(error));
      throw error;
    }
  }

  async createTask(data: z.infer<typeof CreateTaskSchema>) {
    try {
      const validated = CreateTaskSchema.parse(data);

      const task = await getPrismaClient().task.create({
        data: {
          ...validated,
          status: TaskStatus.pending,
          createdById: validated.assignedToId || 'system',
          dueDate: validated.dueDate ? new Date(validated.dueDate) : undefined,
        },
        include: {
          assignedTo: true,
          case: true,
        },
      });

      // Send notification to assigned user
      if (task.assignedTo && task.assignedToId) {
        await createNotification({
          userId: task.assignedToId,
          type: 'task_assigned',
          title: 'New Task Assigned',
          message: `You have been assigned a new task: ${task.title}`,
          metadata: {
            taskId: task.id,
            caseId: task.caseId,
          },
        });
      }

      return task;
    } catch (error) {
      logger.error('Error creating task', errorToLogMeta(error));
      throw error;
    }
  }

  async updateTaskStatus(taskId: string, status: TaskStatus) {
    try {
      const task = await getPrismaClient().task.update({
        where: { id: taskId },
        data: { status },
        include: {
          assignedTo: true,
          case: true,
        },
      });

      // If task completed, check for dependent tasks
      if (status === TaskStatus.completed) {
        await this.handleTaskCompletion(task);
      }

      return task;
    } catch (error) {
      logger.error('Error updating task status', errorToLogMeta(error));
      throw error;
    }
  }

  async addCaseNote(data: z.infer<typeof CreateNoteSchema>) {
    try {
      const validated = CreateNoteSchema.parse(data);

      // Store note in case metadata
      const caseData = await getPrismaClient().case.findUnique({
        where: { id: validated.caseId },
      });

      if (!caseData) {
        throw new Error('Case not found');
      }

      const metadata = caseData.metadata as CaseMetadata;
      const notes = metadata.notes || [];
      notes.push({
        id: Date.now().toString(),
        content: validated.content,
        createdAt: new Date(),
        createdBy: 'current-user', // Get from auth context
      } as CaseNote);

      await getPrismaClient().case.update({
        where: { id: validated.caseId },
        data: {
          metadata: JSON.parse(
            JSON.stringify({
              ...metadata,
              notes,
            })
          ),
        },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error adding case note', errorToLogMeta(error));
      throw error;
    }
  }

  async searchCases(
    query: string,
    filters?: {
      practiceArea?: PracticeArea;
      status?: CaseStatus;
      attorneyId?: string;
      dateRange?: { start: Date; end: Date };
    }
  ) {
    try {
      const where: {
        OR: Array<Record<string, unknown>>;
        clientId?: string;
        status?: CaseStatus;
        practiceArea?: PracticeArea;
        attorneyId?: string;
        createdAt?: { gte?: Date; lte?: Date };
      } = {
        OR: [
          { caseNumber: { contains: query, mode: 'insensitive' } },
          { client: { name: { contains: query, mode: 'insensitive' } } },
          { client: { email: { contains: query, mode: 'insensitive' } } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      };

      if (filters) {
        if (filters.practiceArea) where.practiceArea = filters.practiceArea;
        if (filters.status) where.status = filters.status;
        if (filters.attorneyId) where.attorneyId = filters.attorneyId;
        if (filters.dateRange) {
          where.createdAt = {
            gte: filters.dateRange.start,
            lte: filters.dateRange.end,
          };
        }
      }

      const cases = await getPrismaClient().case.findMany({
        where,
        include: {
          client: true,
          attorney: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });

      return cases;
    } catch (error) {
      logger.error('Error searching cases', errorToLogMeta(error));
      throw error;
    }
  }

  async generateCaseReport(caseId: string) {
    try {
      const caseData = await this.getCaseDetails(caseId, true);

      // Generate comprehensive report
      const report = {
        case: caseData,
        timeline: await this.getCaseTimeline(caseId),
        communications: await this.getCaseCommunications(caseId),
        financials: await this.getCaseFinancials(caseId),
        documents: await this.getCaseDocumentsSummary(caseId),
      };

      return report;
    } catch (error) {
      logger.error('Error generating case report', errorToLogMeta(error));
      throw error;
    }
  }

  // Private helper methods
  private async createInitialTasks(
    caseId: string,
    practiceArea: PracticeArea,
    attorneyId?: string
  ) {
    const tasks = this.getInitialTasksByPracticeArea(practiceArea);

    await getPrismaClient().task.createMany({
      data: tasks.map(task => ({
        ...task,
        caseId,
        assignedToId: attorneyId,
        createdById: 'system',
        status: TaskStatus.pending,
      })),
    });
  }

  private getInitialTasksByPracticeArea(practiceArea: PracticeArea) {
    const baseTask = {
      type: TaskType.client_communication as TaskType,
      priority: TaskPriority.medium as TaskPriority,
    };

    const tasksByArea: Record<
      PracticeArea,
      Array<{ title: string; type: TaskType; priority: TaskPriority }>
    > = {
      [PracticeArea.immigration]: [
        {
          ...baseTask,
          title: 'Collect immigration documents',
          type: TaskType.document_preparation,
        },
        { ...baseTask, title: 'Schedule initial consultation', priority: TaskPriority.high },
        { ...baseTask, title: 'Review visa eligibility', type: TaskType.document_preparation },
      ],
      [PracticeArea.personal_injury]: [
        { ...baseTask, title: 'Obtain medical records', type: TaskType.document_preparation },
        { ...baseTask, title: 'Contact insurance company', priority: TaskPriority.high },
        {
          ...baseTask,
          title: 'Document injuries and damages',
          type: TaskType.document_preparation,
        },
      ],
      [PracticeArea.workers_compensation]: [
        {
          ...baseTask,
          title: 'File workers comp claim',
          type: TaskType.court_filing,
          priority: TaskPriority.urgent,
        },
        { ...baseTask, title: 'Gather employment records', type: TaskType.document_preparation },
        { ...baseTask, title: 'Schedule IME if needed', type: TaskType.other },
      ],
      [PracticeArea.criminal_defense]: [
        {
          ...baseTask,
          title: 'Review arrest records',
          type: TaskType.document_preparation,
          priority: TaskPriority.high,
        },
        { ...baseTask, title: 'Contact prosecutor', priority: TaskPriority.high },
        { ...baseTask, title: 'Prepare for arraignment', type: TaskType.court_filing },
      ],
      [PracticeArea.family_law]: [
        { ...baseTask, title: 'Collect financial documents', type: TaskType.document_preparation },
        { ...baseTask, title: 'Draft initial petition', type: TaskType.document_preparation },
        { ...baseTask, title: 'Schedule mediation if applicable', type: TaskType.other },
      ],
      [PracticeArea.traffic]: [
        { ...baseTask, title: 'Review citation details', type: TaskType.document_preparation },
        { ...baseTask, title: 'Check driving record', type: TaskType.other },
        { ...baseTask, title: 'Prepare court appearance', type: TaskType.court_filing },
      ],
    };

    return tasksByArea[practiceArea] || [];
  }

  private async notifyNewCase(caseData: {
    id: string;
    caseNumber: string;
    clientId: string;
    practiceArea: string;
    client: {
      email: string;
      firstName?: string | null;
      lastName?: string | null;
    };
    attorney?: {
      email: string;
      name?: string | null;
    } | null;
  }) {
    // Notify attorney
    if (caseData.attorney) {
      await sendEmail({
        to: caseData.attorney.email,
        subject: `New Case Assigned: ${caseData.caseNumber}`,
        html: `
          <h2>New Case Assignment</h2>
          <p>You have been assigned to a new case:</p>
          <ul>
            <li>Case Number: ${caseData.caseNumber}</li>
            <li>Client: ${caseData.client.firstName || ''} ${caseData.client.lastName || ''}</li>
            <li>Practice Area: ${caseData.practiceArea}</li>
          </ul>
          <p>Please review the case details in the case management system.</p>
        `,
      });
    }

    // Notify client
    await sendEmail({
      to: caseData.client.email,
      subject: 'Your Case Has Been Created',
      html: `
        <h2>Case Created Successfully</h2>
        <p>Dear ${caseData.client.firstName || ''} ${caseData.client.lastName || ''},</p>
        <p>Your case has been created with the following details:</p>
        <ul>
          <li>Case Number: ${caseData.caseNumber}</li>
          <li>Attorney: ${caseData.attorney?.name || 'To be assigned'}</li>
        </ul>
        <p>You can track your case progress through the client portal.</p>
      `,
    });
  }

  private async notifyStatusChange(
    caseData: {
      id: string;
      caseNumber: string;
      status: CaseStatus;
      client: {
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        phone?: string | null;
      };
    },
    previousStatus: CaseStatus
  ) {
    const statusMessages = {
      [CaseStatus.open]: 'Your case has been opened and assigned',
      [CaseStatus.in_progress]: 'Your case is now actively being worked on',
      [CaseStatus.pending]: 'Your case is pending further action',
      [CaseStatus.closed]: 'Your case has been closed',
      [CaseStatus.archived]: 'Your case has been archived',
    };

    await sendEmail({
      to: caseData.client.email,
      subject: `Case Status Update: ${caseData.caseNumber}`,
      html: `
        <h2>Case Status Update</h2>
        <p>Dear ${caseData.client.firstName || ''} ${caseData.client.lastName || ''},</p>
        <p>${statusMessages[caseData.status as CaseStatus]}</p>
        <p>Previous Status: ${previousStatus}</p>
        <p>Current Status: ${caseData.status}</p>
        <p>If you have any questions, please contact your attorney.</p>
      `,
    });

    // Send SMS if enabled
    if (caseData.client.phone) {
      await ghl.sendSMSByPhone(
        caseData.client.phone,
        `Case ${caseData.caseNumber} status updated to: ${caseData.status}. Check your email for details.`,
        ['case-update', 'status-change']
      );
    }
  }

  private async handleTaskCompletion(task: Task) {
    // Check for dependent tasks or workflows
    logger.info('Task completed', { taskId: task.id, caseId: task.caseId });

    // Example: If initial consultation is complete, create follow-up tasks
    if (task.title.includes('initial consultation')) {
      await this.createTask({
        title: 'Send consultation summary to client',
        type: TaskType.client_communication,
        priority: TaskPriority.medium,
        caseId: task.caseId || undefined,
        assignedToId: task.assignedToId || undefined,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      });
    }
  }

  private async calculateCaseMetrics(caseId: string) {
    const [tasks, documents, appointments] = await Promise.all([
      getPrismaClient().task.findMany({ where: { caseId } }),
      getPrismaClient().document.count({ where: { caseId } }),
      getPrismaClient().appointment.findMany({ where: { caseId } }),
    ]);

    const completedTasks = tasks.filter(t => t.status === TaskStatus.completed).length;
    const totalTasks = tasks.length;
    const upcomingAppointments = appointments.filter(
      a => new Date(a.scheduledAt) > new Date()
    ).length;
    const overdueTasksCount = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.completed
    ).length;

    return {
      taskCompletion: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      totalDocuments: documents,
      upcomingAppointments,
      overdueTasks: overdueTasksCount,
      totalTasks,
      completedTasks,
    };
  }

  async getCaseTimeline(caseId: string) {
    try {
      // Get case creation event
      const caseData = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        select: { createdAt: true, caseNumber: true },
      });

      if (!caseData) {
        throw new Error('Case not found');
      }

      // Get all timeline events
      const [tasks, appointments, documents] = await Promise.all([
        // Tasks
        getPrismaClient().task.findMany({
          where: { caseId },
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            assignedTo: {
              select: { name: true },
            },
          },
          orderBy: { updatedAt: 'desc' },
        }),
        // Appointments
        getPrismaClient().appointment.findMany({
          where: { caseId },
          select: {
            id: true,
            type: true,
            status: true,
            scheduledAt: true,
            createdAt: true,
            user: {
              select: { name: true },
            },
          },
          orderBy: { scheduledAt: 'desc' },
        }),
        // Documents
        getPrismaClient().document.findMany({
          where: { caseId },
          select: {
            id: true,
            name: true,
            createdAt: true,
            uploadedBy: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      // Combine and format timeline
      const timeline = [
        {
          type: 'case_created',
          timestamp: caseData.createdAt,
          description: `Case ${caseData.caseNumber} opened`,
          icon: 'folder',
        },
        ...tasks.map(task => ({
          type: `task_${task.status}`,
          timestamp: task.updatedAt,
          description: task.title,
          assignedTo: task.assignedTo?.name,
          icon: 'task',
        })),
        ...appointments.map(apt => ({
          type: `appointment_${apt.status}`,
          timestamp: apt.scheduledAt,
          description: `${apt.type} appointment`,
          with: apt.user?.name,
          icon: 'calendar',
        })),
        ...documents.map(doc => ({
          type: 'document_uploaded',
          timestamp: doc.createdAt,
          description: `Document uploaded: ${doc.name}`,
          uploadedBy: doc.uploadedBy,
          icon: 'document',
        })),
      ];

      // Sort by timestamp descending
      timeline.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      return timeline;
    } catch (error) {
      logger.error('Error getting case timeline', errorToLogMeta(error));
      throw error;
    }
  }

  private async getCaseCommunications(caseId: string) {
    try {
      // Get case data for client/attorney IDs
      const caseData = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        select: { clientId: true, attorneyId: true },
      });

      if (!caseData) {
        throw new Error('Case not found');
      }

      // Get all related users
      const userIds = [caseData.clientId];
      if (caseData.attorneyId) {
        userIds.push(caseData.attorneyId);
      }

      // Get communications (this is a simplified version)
      // In production, you'd have a proper communications table
      const communications: Array<{
        type: string;
        timestamp: Date;
        content: string;
        createdBy: string;
      }> = [];

      // Get case notes as communications
      const caseWithNotes = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        select: { metadata: true },
      });

      const metadata = caseWithNotes?.metadata as CaseMetadata;
      const notes = metadata?.notes || [];
      communications.push(
        ...notes.map((note: CaseNote) => ({
          type: 'note',
          timestamp: new Date(note.createdAt),
          content: note.content,
          createdBy: note.createdBy,
        }))
      );

      // Sort by timestamp
      communications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      return communications;
    } catch (error) {
      logger.error('Error getting case communications', errorToLogMeta(error));
      throw error;
    }
  }

  private async getCaseFinancials(caseId: string) {
    try {
      // In a production system, you would have proper billing/payment tables
      // For now, return a structured response
      const caseData = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        select: { metadata: true },
      });

      const metadata = caseData?.metadata as CaseMetadata;
      const financials = metadata?.financials || ({} as CaseFinancials);

      return {
        totalBilled: financials.totalBilled || 0,
        totalPaid: financials.totalPaid || 0,
        outstanding: (financials.totalBilled || 0) - (financials.totalPaid || 0),
        lastPaymentDate: financials.lastPaymentDate ? new Date(financials.lastPaymentDate) : null,
      };
    } catch (error) {
      logger.error('Error getting case financials', errorToLogMeta(error));
      throw error;
    }
  }

  private async getCaseDocumentsSummary(caseId: string) {
    const documents = await getPrismaClient().document.groupBy({
      by: ['type'],
      where: { caseId },
      _count: true,
    });

    return documents.map(doc => ({
      type: doc.type,
      count: doc._count,
    }));
  }

  // Document management methods
  async uploadDocument(
    caseId: string,
    document: {
      name: string;
      type: string;
      url: string;
      size: number;
      uploadedBy: string;
    }
  ) {
    try {
      const newDocument = await getPrismaClient().document.create({
        data: {
          caseId,
          ...document,
        },
      });

      // Log activity
      await this.addCaseNote({
        caseId,
        content: `Document uploaded: ${document.name}`,
        isPrivate: false,
      });

      return newDocument;
    } catch (error) {
      logger.error('Error uploading document', errorToLogMeta(error));
      throw error;
    }
  }

  async getDocument(documentId: string, userId: string) {
    try {
      // Check authorization first
      const document = await getPrismaClient().document.findUnique({
        where: { id: documentId },
        include: {
          case: {
            include: {
              client: true,
              attorney: true,
            },
          },
        },
      });

      if (!document) {
        throw new Error('Document not found');
      }

      // Check if user has access to this document
      const hasAccess =
        document.case.clientId === userId ||
        document.case.attorneyId === userId ||
        document.uploadedBy === userId;

      if (!hasAccess) {
        throw new Error('Unauthorized access to document');
      }

      return document;
    } catch (error) {
      logger.error('Error getting document', errorToLogMeta(error));
      throw error;
    }
  }

  async deleteDocument(documentId: string, userId: string) {
    try {
      // Check authorization
      const document = await this.getDocument(documentId, userId);

      // Only attorneys and the uploader can delete documents
      const canDelete = document.case.attorneyId === userId || document.uploadedBy === userId;

      if (!canDelete) {
        throw new Error('Unauthorized to delete document');
      }

      await getPrismaClient().document.delete({
        where: { id: documentId },
      });

      // Log activity
      await this.addCaseNote({
        caseId: document.caseId,
        content: `Document deleted: ${document.name}`,
        isPrivate: false,
      });

      return { success: true };
    } catch (error) {
      logger.error('Error deleting document', errorToLogMeta(error));
      throw error;
    }
  }

  // Case retrieval and assignment methods
  async getCasesByUser(userId: string, role: 'CLIENT' | 'ATTORNEY') {
    try {
      const where = role === 'CLIENT' ? { clientId: userId } : { attorneyId: userId };

      const cases = await getPrismaClient().case.findMany({
        where,
        include: {
          client: true,
          attorney: true,
          _count: {
            select: {
              documents: true,
              tasks: {
                where: { status: { not: TaskStatus.completed } },
              },
              appointments: {
                where: {
                  scheduledAt: { gte: new Date() },
                  status: { notIn: ['cancelled', 'completed'] },
                },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      return cases;
    } catch (error) {
      logger.error('Error getting cases by user', errorToLogMeta(error));
      throw error;
    }
  }

  async assignAttorney(caseId: string, attorneyId: string, assignedBy: string) {
    try {
      const caseData = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        include: { client: true },
      });

      if (!caseData) {
        throw new Error('Case not found');
      }

      const attorney = await getPrismaClient().user.findUnique({
        where: { id: attorneyId },
      });

      if (!attorney || attorney.role !== 'ATTORNEY') {
        throw new Error('Invalid attorney');
      }

      const updatedCase = await getPrismaClient().case.update({
        where: { id: caseId },
        data: { attorneyId },
        include: { client: true, attorney: true },
      });

      // Notify attorney
      await createNotification({
        userId: attorneyId,
        type: 'case_assigned',
        title: 'New Case Assignment',
        message: `You have been assigned to case ${updatedCase.caseNumber}`,
        metadata: { caseId, caseNumber: updatedCase.caseNumber },
      });

      // Send email to attorney
      await sendEmail({
        to: attorney.email,
        subject: `New Case Assignment: ${updatedCase.caseNumber}`,
        html: `
          <h2>New Case Assignment</h2>
          <p>You have been assigned to a new case:</p>
          <ul>
            <li>Case Number: ${updatedCase.caseNumber}</li>
            <li>Client: ${updatedCase.client.name}</li>
            <li>Practice Area: ${updatedCase.practiceArea}</li>
          </ul>
          <p>Please review the case details in the case management system.</p>
        `,
      });

      // Log activity
      await this.addCaseNote({
        caseId,
        content: `Attorney ${attorney.name} assigned to case by ${assignedBy}`,
        isPrivate: true,
      });

      return updatedCase;
    } catch (error) {
      logger.error('Error assigning attorney', errorToLogMeta(error));
      throw error;
    }
  }

  // Authorization check methods
  async checkCaseAccess(caseId: string, userId: string): Promise<boolean> {
    try {
      const caseData = await getPrismaClient().case.findUnique({
        where: { id: caseId },
        select: {
          clientId: true,
          attorneyId: true,
        },
      });

      if (!caseData) {
        return false;
      }

      // Check if user is the client or assigned attorney
      return caseData.clientId === userId || caseData.attorneyId === userId;
    } catch (error) {
      logger.error('Error checking case access', errorToLogMeta(error));
      return false;
    }
  }

  // Batch operations
  async bulkUpdateCaseStatus(caseIds: string[], status: CaseStatus, updatedBy: string) {
    try {
      const results = await getPrismaClient().$transaction(
        caseIds.map(caseId =>
          getPrismaClient().case.update({
            where: { id: caseId },
            data: { status },
          })
        )
      );

      // Log activity for each case
      await Promise.all(
        caseIds.map(caseId =>
          this.addCaseNote({
            caseId,
            content: `Case status updated to ${status} by ${updatedBy}`,
            isPrivate: true,
          })
        )
      );

      return results;
    } catch (error) {
      logger.error('Error bulk updating case status', errorToLogMeta(error));
      throw error;
    }
  }

  // Statistics and analytics
  async getCaseStatistics(filters?: {
    practiceArea?: PracticeArea;
    dateRange?: { start: Date; end: Date };
    attorneyId?: string;
  }) {
    try {
      const where: {
        practiceArea?: PracticeArea;
        status?: CaseStatus;
        attorneyId?: string;
        createdAt?: { gte?: Date; lte?: Date };
      } = {};

      if (filters?.practiceArea) {
        where.practiceArea = filters.practiceArea;
      }

      if (filters?.attorneyId) {
        where.attorneyId = filters.attorneyId;
      }

      if (filters?.dateRange) {
        where.createdAt = {
          gte: filters.dateRange.start,
          lte: filters.dateRange.end,
        };
      }

      const [totalCases, statusCounts, practiceAreaCounts] = await Promise.all([
        // Total cases
        getPrismaClient().case.count({ where }),

        // Cases by status
        getPrismaClient().case.groupBy({
          by: ['status'],
          where,
          _count: true,
        }),

        // Cases by practice area
        getPrismaClient().case.groupBy({
          by: ['practiceArea'],
          where,
          _count: true,
        }),
      ]);

      // Average case duration
      const closedCases = await getPrismaClient().case.findMany({
        where: {
          ...where,
          status: CaseStatus.closed,
        },
        select: {
          createdAt: true,
          updatedAt: true,
        },
      });

      const avgDuration =
        closedCases.length > 0
          ? closedCases.reduce(
              (sum, c) => sum + (c.updatedAt.getTime() - c.createdAt.getTime()),
              0
            ) /
            closedCases.length /
            (1000 * 60 * 60 * 24) // Convert to days
          : 0;

      return {
        totalCases,
        statusBreakdown: statusCounts.reduce(
          (acc, curr) => {
            acc[curr.status] = curr._count;
            return acc;
          },
          {} as Record<CaseStatus, number>
        ),
        practiceAreaBreakdown: practiceAreaCounts.reduce(
          (acc, curr) => {
            acc[curr.practiceArea] = curr._count;
            return acc;
          },
          {} as Record<PracticeArea, number>
        ),
        averageCaseDurationDays: Math.round(avgDuration),
      };
    } catch (error) {
      logger.error('Error getting case statistics', errorToLogMeta(error));
      throw error;
    }
  }
}

export const caseManagement = new CaseManagementService();
