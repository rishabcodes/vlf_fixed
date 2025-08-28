/**
 * Comprehensive Client Portal - Case Management System
 * Provides secure case tracking, document management, and client communication
 */

import { logger } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { sendEmail } from '@/lib/email';
import { createNotification } from '@/lib/notifications';
import { aiClientIntakeSystem } from '@/lib/crewai/ai-powered-client-intake';
import { PracticeArea } from '@prisma/client';
import { cache, CacheTTL } from '@/lib/cache';

export interface ClientCase {
  id: string;
  clientId: string;
  caseNumber: string;
  practiceArea: string;
  status: CaseStatus;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignedAttorney?: string;
  assignedParalegal?: string;

  // Case Details
  title: string;
  description: string;
  intakeDate: Date;
  nextCourtDate?: Date;
  importantDeadlines: Array<{
    date: Date;
    description: string;
    completed: boolean;
  }>;

  // Progress Tracking
  currentPhase: string;
  phases: Array<{
    name: string;
    status: 'pending' | 'in_progress' | 'completed';
    startDate?: Date;
    completedDate?: Date;
    tasks: Array<{
      id: string;
      description: string;
      completed: boolean;
      dueDate?: Date;
    }>;
  }>;

  // Financial
  retainerAmount?: number;
  totalBilled: number;
  totalPaid: number;
  paymentPlan?: {
    monthlyAmount: number;
    nextPaymentDate: Date;
  };

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate: Date;
  tags: string[];
}

export interface CaseDocument {
  id: string;
  caseId: string;
  uploadedBy: string;
  uploadedAt: Date;

  // Document Info
  title: string;
  description?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  category: DocumentCategory;

  // Security
  isConfidential: boolean;
  isClientVisible: boolean;
  requiresSignature: boolean;
  signatureStatus?: 'pending' | 'signed' | 'declined';

  // Storage
  storageUrl: string;
  thumbnailUrl?: string;

  // Metadata
  tags: string[];
  relatedDocuments: string[];
  version: number;
  previousVersionId?: string;
}

export interface CaseActivity {
  id: string;
  caseId: string;
  timestamp: Date;
  activityType: ActivityType;
  performedBy: string;
  performerRole: 'client' | 'attorney' | 'paralegal' | 'system';

  title: string;
  description: string;
  metadata?: Record<string, any>;

  // Visibility
  isClientVisible: boolean;
  isInternal: boolean;

  // Related Items
  relatedDocuments?: string[];
  relatedActivities?: string[];
}

export interface ClientMessage {
  id: string;
  caseId: string;
  threadId: string;
  senderId: string;
  senderRole: 'client' | 'attorney' | 'paralegal';
  recipientId: string;

  // Message Content
  subject?: string;
  content: string;
  isEncrypted: boolean;

  // Status
  sentAt: Date;
  readAt?: Date;
  isRead: boolean;
  isArchived: boolean;

  // Attachments
  attachments?: Array<{
    documentId: string;
    fileName: string;
    fileSize: number;
  }>;

  // Thread Info
  replyToMessageId?: string;
  threadPosition: number;
}

export interface CaseUpdate {
  caseId: string;
  updateType: 'status' | 'phase' | 'deadline' | 'document' | 'payment' | 'general';
  title: string;
  description: string;
  oldValue?: any;
  newValue?: any;
  updatedBy: string;
  isSignificant: boolean;
  requiresClientNotification: boolean;
}

export type CaseStatus = 'open' | 'in_progress' | 'pending' | 'closed' | 'archived';

export type DocumentCategory =
  | 'intake'
  | 'contract'
  | 'court_filing'
  | 'evidence'
  | 'correspondence'
  | 'financial'
  | 'other';

export type ActivityType =
  | 'case_opened'
  | 'status_changed'
  | 'document_uploaded'
  | 'document_signed'
  | 'payment_received'
  | 'court_date_set'
  | 'deadline_added'
  | 'message_sent'
  | 'phase_completed'
  | 'note_added';

export class ClientPortalCaseManagement {
  /**
   * Create a new case for a client
   */
  async createCase(params: {
    clientId: string;
    practiceArea: string;
    title: string;
    description: string;
    priority?: 'urgent' | 'high' | 'medium' | 'low';
    intakeAssessment?: any;
  }): Promise<ClientCase> {
    logger.info('Creating new case', {
      clientId: params.clientId,
      practiceArea: params.practiceArea,
    });

    try {
      // Generate unique case number
      const caseNumber = await this.generateCaseNumber(params.practiceArea);

      // Create phases based on practice area
      const phases = this.generateCasePhases(params.practiceArea);

      // Create case in database
      const caseData = await prisma.case.create({
        data: {
          clientId: params.clientId,
          caseNumber,
          practiceArea: params.practiceArea as any,
          status: 'open' as any,
          description: params.description,
          metadata: {
            priority: params.priority || 'medium',
            title: params.title,
            currentPhase: phases[0].name,
            phases: JSON.stringify(phases),
            intakeDate: new Date(),
            totalBilled: 0,
            totalPaid: 0,
            lastActivityDate: new Date(),
            tags: [],
            importantDeadlines: [],
            intakeAssessment: params.intakeAssessment,
          } as any,
        },
      });

      // Create initial activity
      await this.createActivity({
        caseId: caseData.id,
        activityType: 'case_opened',
        performedBy: 'system',
        performerRole: 'system',
        title: 'Case Opened',
        description: `New ${params.practiceArea} case created`,
        isClientVisible: true,
        isInternal: false,
      });

      // Send welcome email to client
      await this.sendCaseWelcomeEmail(params.clientId, caseData);

      // Notify assigned staff
      await this.notifyStaffOfNewCase(caseData);

      // Clear cache
      await this.clearClientCaseCache(params.clientId);

      return this.mapToClientCase(caseData);
    } catch (error) {
      logger.error('Failed to create case', { error, params });
      throw error;
    }
  }

  /**
   * Get case details with access control
   */
  async getCase(
    caseId: string,
    requesterId: string,
    requesterRole: string
  ): Promise<ClientCase | null> {
    const cacheKey = `case:${caseId}:${requesterId}`;

    return cache.remember(
      cacheKey,
      async () => {
        const caseData = await prisma.case.findUnique({
          where: { id: caseId },
          include: {
            client: true,
            attorney: true,
            // TODO: Add paralegal relation when available
          },
        });

        if (!caseData) return null;

        // Access control
        if (!this.hasAccessToCase(caseData, requesterId, requesterRole)) {
          throw new Error('Access denied to this case');
        }

        return this.mapToClientCase(caseData);
      },
      CacheTTL.SHORT
    );
  }

  /**
   * List cases for a client
   */
  async listClientCases(
    clientId: string,
    filters?: {
      status?: CaseStatus[];
      practiceArea?: string;
      dateRange?: { start: Date; end: Date };
    }
  ): Promise<ClientCase[]> {
    const cases = await prisma.case.findMany({
      where: {
        clientId,
        ...(filters?.status && { status: { in: filters.status } }),
        ...(filters?.practiceArea && { practiceArea: filters.practiceArea as any }),
        ...(filters?.dateRange && {
          createdAt: {
            gte: filters.dateRange.start,
            lte: filters.dateRange.end,
          },
        }),
      },
      orderBy: { updatedAt: 'desc' },
    });

    return cases.map(c => this.mapToClientCase(c));
  }

  /**
   * Update case status
   */
  async updateCaseStatus(
    caseId: string,
    newStatus: CaseStatus,
    updatedBy: string,
    reason?: string
  ): Promise<void> {
    const currentCase = await prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!currentCase) {
      throw new Error('Case not found');
    }

    // Validate status transition
    if (!this.isValidStatusTransition(currentCase.status, newStatus)) {
      throw new Error(`Invalid status transition from ${currentCase.status} to ${newStatus}`);
    }

    // Update case
    await prisma.case.update({
      where: { id: caseId },
      data: {
        status: newStatus,
      },
    });

    // Create activity
    await this.createActivity({
      caseId,
      activityType: 'status_changed',
      performedBy: updatedBy,
      performerRole: 'attorney', // Should be determined by actual role
      title: 'Case Status Updated',
      description: `Status changed from ${currentCase.status} to ${newStatus}${reason ? `: ${reason}` : ''}`,
      isClientVisible: true,
      isInternal: false,
      metadata: {
        oldStatus: currentCase.status,
        newStatus,
        reason,
      },
    });

    // Send notifications
    if (this.shouldNotifyClientOfStatusChange(currentCase.status as CaseStatus, newStatus)) {
      await this.notifyClientOfCaseUpdate({
        caseId,
        updateType: 'status',
        title: 'Case Status Updated',
        description: `Your case status has been updated to: ${newStatus}`,
        oldValue: currentCase.status,
        newValue: newStatus,
        updatedBy,
        isSignificant: true,
        requiresClientNotification: true,
      });
    }

    // Clear cache
    await cache.delete(`case:${caseId}:*`);
  }

  /**
   * Upload document to case
   */
  async uploadDocument(params: {
    caseId: string;
    uploadedBy: string;
    title: string;
    description?: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    category: DocumentCategory;
    fileBuffer: Buffer;
    isConfidential?: boolean;
    isClientVisible?: boolean;
    requiresSignature?: boolean;
  }): Promise<CaseDocument> {
    logger.info('Uploading document to case', { caseId: params.caseId, fileName: params.fileName });

    try {
      // Validate file
      this.validateDocument(params);

      // Upload to storage (simplified - would use actual storage service)
      const storageUrl = await this.uploadToStorage(params.fileBuffer, params.fileName);
      const thumbnailUrl = await this.generateThumbnail(params.fileBuffer, params.mimeType);

      // Create document record
      const document = await prisma.document.create({
        data: {
          caseId: params.caseId,
          uploadedBy: params.uploadedBy,
          name: params.fileName,
          type: params.mimeType,
          url: storageUrl,
          size: params.fileSize,
          metadata: {
            title: params.title,
            description: params.description,
            category: params.category,
            isConfidential: params.isConfidential || false,
            isClientVisible: params.isClientVisible ?? true,
            requiresSignature: params.requiresSignature || false,
            thumbnailUrl,
            tags: [],
            version: 1,
          } as any,
        },
      });

      // Create activity
      await this.createActivity({
        caseId: params.caseId,
        activityType: 'document_uploaded',
        performedBy: params.uploadedBy,
        performerRole: 'attorney', // Should be determined
        title: 'Document Uploaded',
        description: `Uploaded: ${params.title}`,
        isClientVisible: params.isClientVisible ?? true,
        isInternal: false,
        relatedDocuments: [document.id],
      });

      // Update case last activity
      await prisma.case.update({
        where: { id: params.caseId },
        data: { updatedAt: new Date() },
      });

      // If requires signature, initiate signing process
      if (params.requiresSignature) {
        await this.initiateDocumentSigning(document.id);
      }

      return this.mapToCaseDocument(document);
    } catch (error) {
      logger.error('Failed to upload document', { error, params });
      throw error;
    }
  }

  /**
   * Send secure message
   */
  async sendMessage(params: {
    caseId: string;
    senderId: string;
    senderRole: 'client' | 'attorney' | 'paralegal';
    recipientId: string;
    subject?: string;
    content: string;
    attachments?: string[];
    replyToMessageId?: string;
  }): Promise<ClientMessage> {
    logger.info('Sending secure message', { caseId: params.caseId, senderId: params.senderId });

    try {
      // Determine or create thread
      let threadId: string;
      let threadPosition = 1;

      if (params.replyToMessageId) {
        const originalMessage = await prisma.message.findUnique({
          where: { id: params.replyToMessageId },
        });
        if (originalMessage) {
          threadId = (originalMessage.metadata as any)?.threadId || `thread-${Date.now()}`;
          // For simplicity, just increment position
          threadPosition = 2;
        } else {
          threadId = `thread-${Date.now()}`;
        }
      } else {
        threadId = `thread-${Date.now()}`;
      }

      // Encrypt message content (simplified)
      const encryptedContent = await this.encryptMessage(params.content);

      // Create message
      // TODO: Refactor to match Prisma Message schema
      const message = { id: `msg-${Date.now()}` } as any;

      // Create activity
      await this.createActivity({
        caseId: params.caseId,
        activityType: 'message_sent',
        performedBy: params.senderId,
        performerRole: params.senderRole,
        title: 'Message Sent',
        description: params.subject || 'New message',
        isClientVisible: true,
        isInternal: false,
      });

      // Send notification to recipient
      await this.notifyOfNewMessage(message);

      // Update case last activity
      await prisma.case.update({
        where: { id: params.caseId },
        data: { updatedAt: new Date() },
      });

      return this.mapToClientMessage(message);
    } catch (error) {
      logger.error('Failed to send message', { error, params });
      throw error;
    }
  }

  /**
   * Update case phase progress
   */
  async updateCasePhase(
    caseId: string,
    phaseName: string,
    status: 'pending' | 'in_progress' | 'completed',
    updatedBy: string
  ): Promise<void> {
    const caseData = await prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!caseData) {
      throw new Error('Case not found');
    }

    const phases = JSON.parse((caseData.metadata as any)?.phases || '[]');
    const phaseIndex = phases.findIndex((p: any) => p.name === phaseName);

    if (phaseIndex === -1) {
      throw new Error('Phase not found');
    }

    // Update phase
    phases[phaseIndex].status = status;
    if (status === 'in_progress' && !phases[phaseIndex].startDate) {
      phases[phaseIndex].startDate = new Date();
    } else if (status === 'completed') {
      phases[phaseIndex].completedDate = new Date();
    }

    // Update current phase if needed
    let currentPhase = (caseData.metadata as any)?.currentPhase;
    if (status === 'completed' && phaseIndex < phases.length - 1) {
      currentPhase = phases[phaseIndex + 1].name;
      phases[phaseIndex + 1].status = 'in_progress';
      phases[phaseIndex + 1].startDate = new Date();
    }

    // Save updates
    await prisma.case.update({
      where: { id: caseId },
      data: {
        metadata: {
          ...((caseData.metadata as any) || {}),
          phases,
          currentPhase,
        },
      },
    });

    // Create activity
    await this.createActivity({
      caseId,
      activityType: 'phase_completed',
      performedBy: updatedBy,
      performerRole: 'attorney',
      title: `Phase ${status === 'completed' ? 'Completed' : 'Updated'}: ${phaseName}`,
      description: `${phaseName} phase is now ${status}`,
      isClientVisible: true,
      isInternal: false,
    });

    // Notify client of significant progress
    if (status === 'completed') {
      await this.notifyClientOfCaseUpdate({
        caseId,
        updateType: 'phase',
        title: 'Case Progress Update',
        description: `${phaseName} phase has been completed`,
        updatedBy,
        isSignificant: true,
        requiresClientNotification: true,
      });
    }
  }

  /**
   * Add deadline to case
   */
  async addDeadline(params: {
    caseId: string;
    date: Date;
    description: string;
    addedBy: string;
    sendReminders?: boolean;
  }): Promise<void> {
    const caseData = await prisma.case.findUnique({
      where: { id: params.caseId },
    });

    if (!caseData) {
      throw new Error('Case not found');
    }

    const deadlines = (caseData.metadata as any)?.importantDeadlines || [];
    deadlines.push({
      id: `deadline-${Date.now()}`,
      date: params.date,
      description: params.description,
      completed: false,
      addedBy: params.addedBy,
      addedAt: new Date(),
    });

    // Sort by date
    deadlines.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

    await prisma.case.update({
      where: { id: params.caseId },
      data: {
        metadata: {
          ...((caseData.metadata as any) || {}),
          importantDeadlines: deadlines,
        },
      },
    });

    // Create activity
    await this.createActivity({
      caseId: params.caseId,
      activityType: 'deadline_added',
      performedBy: params.addedBy,
      performerRole: 'attorney',
      title: 'Deadline Added',
      description: `${params.description} - Due: ${params.date.toLocaleDateString()}`,
      isClientVisible: true,
      isInternal: false,
    });

    // Schedule reminders if requested
    if (params.sendReminders) {
      await this.scheduleDeadlineReminders(params.caseId, params.date, params.description);
    }
  }

  /**
   * Get case activity timeline
   */
  async getCaseTimeline(
    caseId: string,
    filters?: {
      activityTypes?: ActivityType[];
      dateRange?: { start: Date; end: Date };
      clientVisible?: boolean;
    }
  ): Promise<CaseActivity[]> {
    // TODO: Implement case activity tracking with proper model
    // For now, return empty array
    logger.info('Case activities requested', { caseId, filters });
    return [];
  }

  /**
   * Generate case summary
   */
  async generateCaseSummary(caseId: string): Promise<{
    overview: string;
    currentStatus: string;
    recentActivity: string[];
    upcomingDeadlines: string[];
    actionItems: string[];
  }> {
    const caseData = await this.getCase(caseId, 'system', 'system');
    if (!caseData) {
      throw new Error('Case not found');
    }

    const recentActivities = await this.getCaseTimeline(caseId, {
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days
        end: new Date(),
      },
    });

    const upcomingDeadlines = caseData.importantDeadlines
      .filter(d => !d.completed && new Date(d.date) > new Date())
      .slice(0, 5);

    const actionItems = this.generateActionItems(caseData);

    return {
      overview: `${caseData.practiceArea} case opened on ${caseData.intakeDate.toLocaleDateString()}. Currently in ${caseData.currentPhase} phase.`,
      currentStatus: this.generateStatusSummary(caseData),
      recentActivity: recentActivities
        .slice(0, 5)
        .map(a => `${a.timestamp.toLocaleDateString()}: ${a.title}`),
      upcomingDeadlines: upcomingDeadlines.map(
        d => `${new Date(d.date).toLocaleDateString()}: ${d.description}`
      ),
      actionItems,
    };
  }

  // Helper methods

  private async generateCaseNumber(practiceArea: string): Promise<string> {
    const prefix = this.getPracticeAreaPrefix(practiceArea);
    const year = new Date().getFullYear();

    // Get the last case number for this year and practice area
    const lastCase = await prisma.case.findFirst({
      where: {
        caseNumber: { startsWith: `${prefix}-${year}-` },
      },
      orderBy: { createdAt: 'desc' },
    });

    let sequence = 1;
    if (lastCase) {
      const lastSequence = parseInt(lastCase.caseNumber.split('-')[2] || '0');
      sequence = lastSequence + 1;
    }

    return `${prefix}-${year}-${sequence.toString().padStart(5, '0')}`;
  }

  private getPracticeAreaPrefix(practiceArea: string): string {
    const prefixes: Record<string, string> = {
      immigration: 'IM',
      personal_injury: 'PI',
      workers_compensation: 'WC',
      family_law: 'FL',
      criminal_defense: 'CD',
    };
    return prefixes[practiceArea] || 'GN';
  }

  private generateCasePhases(practiceArea: string): any[] {
    const phaseTemplates: Record<string, string[]> = {
      immigration: [
        'Initial Consultation',
        'Document Collection',
        'Application Preparation',
        'Application Submission',
        'USCIS Processing',
        'Interview Preparation',
        'Decision & Follow-up',
      ],
      personal_injury: [
        'Initial Investigation',
        'Medical Treatment',
        'Evidence Collection',
        'Demand Letter',
        'Negotiation',
        'Litigation (if needed)',
        'Settlement/Trial',
      ],
      workers_compensation: [
        'Claim Filing',
        'Medical Evaluation',
        'Benefits Determination',
        'Appeals (if needed)',
        'Settlement Negotiation',
        'Case Resolution',
      ],
      family_law: [
        'Initial Filing',
        'Discovery',
        'Mediation',
        'Negotiation',
        'Court Proceedings',
        'Final Decree',
      ],
      criminal_defense: [
        'Arraignment',
        'Discovery',
        'Pre-trial Motions',
        'Plea Negotiations',
        'Trial Preparation',
        'Trial/Resolution',
      ],
    };

    const phases = phaseTemplates[practiceArea] || ['Initial Phase', 'Processing', 'Resolution'];

    return phases.map((name, index) => ({
      name,
      status: index === 0 ? 'in_progress' : 'pending',
      startDate: index === 0 ? new Date() : null,
      completedDate: null,
      tasks: [],
    }));
  }

  private hasAccessToCase(caseData: any, requesterId: string, requesterRole: string): boolean {
    // System always has access
    if (requesterRole === 'system') return true;

    // Client can access their own cases
    if (requesterRole === 'client' && caseData.clientId === requesterId) return true;

    // Attorney can access assigned cases
    if (requesterRole === 'attorney' && caseData.assignedAttorney === requesterId) return true;

    // Paralegal can access assigned cases
    if (requesterRole === 'paralegal' && caseData.assignedParalegal === requesterId) return true;

    // Admin can access all cases
    if (requesterRole === 'admin') return true;

    return false;
  }

  private isValidStatusTransition(from: CaseStatus, to: CaseStatus): boolean {
    const validTransitions: Record<CaseStatus, CaseStatus[]> = {
      open: ['in_progress', 'pending', 'closed'],
      in_progress: ['pending', 'closed', 'archived'],
      pending: ['in_progress', 'closed'],
      closed: ['archived', 'open'], // Can reopen
      archived: [], // Cannot transition from archived
    };

    return validTransitions[from]?.includes(to) || false;
  }

  private shouldNotifyClientOfStatusChange(from: CaseStatus, to: CaseStatus): boolean {
    // Always notify for significant status changes
    const significantChanges = ['in_progress', 'completed', 'closed'];

    return significantChanges.includes(to) && from !== to;
  }

  private validateDocument(params: any): void {
    // File size limit (10MB)
    if (params.fileSize > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Allowed mime types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(params.mimeType)) {
      throw new Error('File type not allowed');
    }
  }

  private async uploadToStorage(fileBuffer: Buffer, fileName: string): Promise<string> {
    // In practice, this would upload to S3 or similar
    // For now, return a mock URL
    return `https://storage.vasquezlaw.com/documents/${Date.now()}-${fileName}`;
  }

  private async generateThumbnail(
    fileBuffer: Buffer,
    mimeType: string
  ): Promise<string | undefined> {
    // In practice, generate actual thumbnail for images/PDFs
    if (mimeType.startsWith('image/')) {
      return `https://storage.vasquezlaw.com/thumbnails/${Date.now()}.jpg`;
    }
    return undefined;
  }

  private async initiateDocumentSigning(documentId: string): Promise<void> {
    // In practice, integrate with DocuSign or similar
    logger.info('Initiating document signing', { documentId });
  }

  private async encryptMessage(content: string): Promise<string> {
    // In practice, use proper encryption
    return Buffer.from(content).toString('base64');
  }

  private async sendCaseWelcomeEmail(clientId: string, caseData: any): Promise<void> {
    const client = await prisma.user.findUnique({
      where: { id: clientId },
    });

    if (!client?.email) return;

    await sendEmail({
      to: client.email,
      subject: `Welcome to Your Client Portal - Case ${caseData.caseNumber}`,
      html: `
        <h2>Welcome to Your Client Portal</h2>
        <p>Dear ${client.name},</p>
        <p>Your case has been created in our system:</p>
        <ul>
          <li>Case Number: ${caseData.caseNumber}</li>
          <li>Practice Area: ${caseData.practiceArea}</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/cases/${caseData.id}">Access Your Portal</a></p>
      `,
      text: `Welcome to Your Client Portal\n\nDear ${client.name},\n\nYour case has been created in our system:\n\nCase Number: ${caseData.caseNumber}\nPractice Area: ${caseData.practiceArea}\n\nAccess your portal at: ${process.env.NEXT_PUBLIC_APP_URL}/portal/cases/${caseData.id}`,
    });
  }

  private async notifyStaffOfNewCase(caseData: any): Promise<void> {
    // TODO: Implement staff notification system
    // For now, just log the new case
    logger.info('New case created', {
      caseId: caseData.id,
      caseNumber: caseData.caseNumber,
      practiceArea: caseData.practiceArea,
      priority: caseData.priority,
    });
  }

  private async notifyClientOfCaseUpdate(update: CaseUpdate): Promise<void> {
    if (!update.requiresClientNotification) return;

    const caseData = await prisma.case.findUnique({
      where: { id: update.caseId },
      include: { client: true },
    });

    if (!caseData?.client?.email) return;

    await sendEmail({
      to: caseData.client.email,
      subject: `Case Update: ${update.title}`,
      html: `
        <h2>Case Update</h2>
        <p>Dear ${caseData.client.name},</p>
        <p>There has been an update to your case ${caseData.caseNumber}:</p>
        <h3>${update.title}</h3>
        <p>${update.description}</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/cases/${caseData.id}">View Update in Portal</a></p>
      `,
      text: `Case Update\n\nDear ${caseData.client.name},\n\nThere has been an update to your case ${caseData.caseNumber}:\n\n${update.title}\n${update.description}\n\nView update at: ${process.env.NEXT_PUBLIC_APP_URL}/portal/cases/${caseData.id}`,
    });
  }

  private async notifyOfNewMessage(message: any): Promise<void> {
    const recipient = await prisma.user.findUnique({
      where: { id: message.recipientId },
    });

    if (!recipient?.email) return;

    await sendEmail({
      to: recipient.email,
      subject: 'New Secure Message in Client Portal',
      html: `
        <h2>New Secure Message</h2>
        <p>You have received a new secure message in your client portal.</p>
        <p>From: ${message.senderName}</p>
        <p>Subject: ${message.subject}</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/messages">View Message</a></p>
      `,
      text: `New Secure Message\n\nYou have received a new secure message in your client portal.\n\nFrom: ${message.senderName}\nSubject: ${message.subject}\n\nView message at: ${process.env.NEXT_PUBLIC_APP_URL}/portal/messages`,
    });
  }

  private async scheduleDeadlineReminders(
    caseId: string,
    deadline: Date,
    description: string
  ): Promise<void> {
    // Schedule reminders at 7 days, 3 days, and 1 day before
    const reminderDays = [7, 3, 1];

    for (const days of reminderDays) {
      const reminderDate = new Date(deadline);
      reminderDate.setDate(reminderDate.getDate() - days);

      if (reminderDate > new Date()) {
        // In practice, use a job queue to schedule
        logger.info('Scheduling deadline reminder', {
          caseId,
          deadline,
          reminderDate,
          description,
        });
      }
    }
  }

  private async clearClientCaseCache(clientId: string): Promise<void> {
    await cache.delete(`client:${clientId}:cases:*`);
  }

  private async createActivity(params: Omit<CaseActivity, 'id' | 'timestamp'>): Promise<void> {
    // TODO: Implement case activity tracking with proper model
    logger.info('Case activity created', {
      caseId: params.caseId,
      activityType: params.activityType,
      performedBy: params.performedBy,
    });
  }

  private generateStatusSummary(caseData: ClientCase): string {
    const statusDescriptions: Record<CaseStatus, string> = {
      open: 'Your case is being reviewed by our team',
      in_progress: 'Your case is actively being worked on',
      pending: 'Your case is awaiting action or response',
      closed: 'Your case has been closed',
      archived: 'Your case has been archived',
    };

    return statusDescriptions[caseData.status] || 'Status unknown';
  }

  private generateActionItems(caseData: ClientCase): string[] {
    const items: string[] = [];

    // Check for missing documents
    if (caseData.currentPhase === 'Document Collection') {
      items.push('Complete document submission');
    }

    // Check for upcoming deadlines
    const urgentDeadlines = caseData.importantDeadlines.filter(
      d => !d.completed && new Date(d.date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    if (urgentDeadlines.length > 0) {
      items.push(`Address ${urgentDeadlines.length} upcoming deadline(s)`);
    }

    // Check for unsigned documents
    // This would check actual document signing status
    items.push('Review and sign pending documents');

    // Payment reminders
    if (caseData.totalBilled > caseData.totalPaid) {
      items.push('Review outstanding balance');
    }

    return items;
  }

  // Mapping methods

  private mapToClientCase(data: any): ClientCase {
    return {
      id: data.id,
      clientId: data.clientId,
      caseNumber: data.caseNumber,
      practiceArea: data.practiceArea,
      status: data.status,
      priority: data.priority,
      assignedAttorney: data.assignedAttorney,
      assignedParalegal: data.assignedParalegal,
      title: data.title,
      description: data.description,
      intakeDate: data.intakeDate,
      nextCourtDate: data.nextCourtDate,
      importantDeadlines: data.importantDeadlines || [],
      currentPhase: data.currentPhase,
      phases: typeof data.phases === 'string' ? JSON.parse(data.phases) : data.phases,
      retainerAmount: data.retainerAmount,
      totalBilled: data.totalBilled,
      totalPaid: data.totalPaid,
      paymentPlan: data.paymentPlan,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      lastActivityDate: data.lastActivityDate,
      tags: data.tags || [],
    };
  }

  private mapToCaseDocument(data: any): CaseDocument {
    return {
      id: data.id,
      caseId: data.caseId,
      uploadedBy: data.uploadedBy,
      uploadedAt: data.uploadedAt,
      title: data.title,
      description: data.description,
      fileName: data.fileName,
      fileSize: data.fileSize,
      mimeType: data.mimeType,
      category: data.category,
      isConfidential: data.isConfidential,
      isClientVisible: data.isClientVisible,
      requiresSignature: data.requiresSignature,
      signatureStatus: data.signatureStatus,
      storageUrl: data.storageUrl,
      thumbnailUrl: data.thumbnailUrl,
      tags: data.tags || [],
      relatedDocuments: data.relatedDocuments || [],
      version: data.version,
      previousVersionId: data.previousVersionId,
    };
  }

  private mapToCaseActivity(data: any): CaseActivity {
    return {
      id: data.id,
      caseId: data.caseId,
      timestamp: data.timestamp,
      activityType: data.activityType,
      performedBy: data.performedBy,
      performerRole: data.performerRole,
      title: data.title,
      description: data.description,
      metadata: data.metadata ? JSON.parse(data.metadata) : undefined,
      isClientVisible: data.isClientVisible,
      isInternal: data.isInternal,
      relatedDocuments: data.relatedDocuments ? JSON.parse(data.relatedDocuments) : undefined,
      relatedActivities: data.relatedActivities ? JSON.parse(data.relatedActivities) : undefined,
    };
  }

  private mapToClientMessage(data: any): ClientMessage {
    return {
      id: data.id,
      caseId: data.caseId,
      threadId: data.threadId,
      senderId: data.senderId,
      senderRole: data.senderRole,
      recipientId: data.recipientId,
      subject: data.subject,
      content: data.content,
      isEncrypted: data.isEncrypted,
      sentAt: data.sentAt,
      readAt: data.readAt,
      isRead: data.isRead,
      isArchived: data.isArchived,
      attachments: data.attachments ? JSON.parse(data.attachments) : undefined,
      replyToMessageId: data.replyToMessageId,
      threadPosition: data.threadPosition,
    };
  }
}

// Export singleton instance
export const clientPortalCaseManagement = new ClientPortalCaseManagement();
