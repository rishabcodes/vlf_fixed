/**
 * Client Intake API Interface
 * REST API endpoints for AI-powered client intake system
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/safe-logger';
import {
  aiClientIntakeSystem,
  ClientIntakeRequest,
  CaseAssessmentResult,
} from './ai-powered-client-intake';
import { prisma } from '@/lib/prisma-safe';
import { sendEmail } from '@/lib/email';

export interface ClientIntakeResponse {
  success: boolean;
  assessment?: CaseAssessmentResult;
  error?: string;
  followUpActions?: string[];
}

export interface ClientContactRequest {
  assessmentId: string;
  contactMethod: 'email' | 'phone' | 'text';
  message?: string;
  urgency: 'immediate' | 'high' | 'medium' | 'low';
}

export class ClientIntakeAPI {
  /**
   * Submit client intake form and receive AI assessment
   */
  static async submitIntake(request: NextRequest): Promise<NextResponse> {
    try {
      const body: ClientIntakeRequest = await request.json();

      logger.info('Processing client intake submission', {
        clientEmail: body.personalInfo.email,
        primaryArea: body.legalIssue.primaryArea,
        urgency: body.legalIssue.urgency,
        location: `${body.personalInfo.location.city}, ${body.personalInfo.location.state}`,
      });

      // Validate required fields
      const validation = this.validateIntakeRequest(body);
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            error: `Validation failed: ${validation.errors.join(', ')}`,
          },
          { status: 400 }
        );
      }

      // Process through AI intake system
      const assessment = await aiClientIntakeSystem.processClientIntake(body);

      // Store in database
      await this.storeAssessment(body, assessment);

      // Send confirmation email to client
      await this.sendClientConfirmation(body, assessment);

      // Send notification to firm
      await this.sendFirmNotification(body, assessment);

      // Schedule follow-up actions
      await this.scheduleFollowUpActions(assessment);

      logger.info('Client intake processing completed', {
        assessmentId: assessment.assessmentId,
        practiceArea: assessment.practiceArea,
        priority: assessment.followUpStrategy.priority,
      });

      const response: ClientIntakeResponse = {
        success: true,
        assessment,
        followUpActions: assessment.followUpStrategy.followUpActions,
      };

      return NextResponse.json(response);
    } catch (error) {
      logger.error('Client intake processing failed', { error });

      const response: ClientIntakeResponse = {
        success: false,
        error: 'Internal server error. Please try again or contact us directly.',
      };

      return NextResponse.json(response, { status: 500 });
    }
  }

  /**
   * Get assessment results by ID
   */
  static async getAssessment(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url);
      const assessmentId = searchParams.get('id');

      if (!assessmentId) {
        return NextResponse.json(
          {
            success: false,
            error: 'Assessment ID is required',
          },
          { status: 400 }
        );
      }

      // TODO: Implement clientAssessment model in Prisma schema
      // const assessment = await prisma.clientAssessment.findUnique({
      //   where: { assessmentId },
      //   include: {
      //     client: true,
      //     followUpActions: true,
      //   },
      // });

      // if (!assessment) {
      //   return NextResponse.json({
      //     success: false,
      //     error: 'Assessment not found',
      //   }, { status: 404 });
      // }

      // For now, return a mock response
      const assessment = {
        assessmentId,
        createdAt: new Date(),
        client: null,
        followUpActions: [],
      };

      return NextResponse.json({
        success: true,
        assessment: this.formatAssessmentForResponse(assessment),
      });
    } catch (error) {
      logger.error('Failed to retrieve assessment', { error });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to retrieve assessment',
        },
        { status: 500 }
      );
    }
  }

  /**
   * Update assessment status or add notes
   */
  static async updateAssessment(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();
      const { assessmentId, status, notes, attorneyAssigned } = body;

      if (!assessmentId) {
        return NextResponse.json(
          {
            success: false,
            error: 'Assessment ID is required',
          },
          { status: 400 }
        );
      }

      // TODO: Implement clientAssessment model in Prisma schema
      // const updated = await prisma.clientAssessment.update({
      //   where: { assessmentId },
      //   data: {
      //     status,
      //     notes,
      //     attorneyAssigned,
      //     updatedAt: new Date(),
      //   },
      // });

      // For now, return a mock response
      const updated = {
        assessmentId,
        status,
        notes,
        attorneyAssigned,
        updatedAt: new Date(),
      };

      logger.info('Assessment updated', {
        assessmentId,
        status,
        attorneyAssigned,
      });

      return NextResponse.json({
        success: true,
        assessment: this.formatAssessmentForResponse(updated),
      });
    } catch (error) {
      logger.error('Failed to update assessment', { error });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update assessment',
        },
        { status: 500 }
      );
    }
  }

  /**
   * Request client contact/callback
   */
  static async requestContact(request: NextRequest): Promise<NextResponse> {
    try {
      const body: ClientContactRequest = await request.json();
      const { assessmentId, contactMethod, message, urgency } = body;

      // Retrieve assessment
      // TODO: Implement clientAssessment model in Prisma schema
      // const assessment = await prisma.clientAssessment.findUnique({
      //   where: { assessmentId },
      //   include: { client: true },
      // });

      // For now, return a mock response
      const assessment = null;

      if (!assessment) {
        return NextResponse.json(
          {
            success: false,
            error: 'Assessment not found',
          },
          { status: 404 }
        );
      }

      // TODO: Implement clientContactRequest model in Prisma schema
      // const contactRequest = await prisma.clientContactRequest.create({
      //   data: {
      //     assessmentId,
      //     contactMethod,
      //     message: message || '',
      //     urgency,
      //     status: 'pending',
      //     requestedAt: new Date(),
      //   },
      // });

      // For now, return a mock response
      const contactRequest = {
        id: `contact_${Date.now()}`,
        assessmentId,
        contactMethod,
        message: message || '',
        urgency,
        status: 'pending',
        requestedAt: new Date(),
      };

      // Send notification to firm
      await this.sendContactRequestNotification(assessment, contactRequest);

      logger.info('Client contact request created', {
        assessmentId,
        contactMethod,
        urgency,
      });

      return NextResponse.json({
        success: true,
        contactRequestId: contactRequest.id,
        message: 'Contact request submitted successfully. We will reach out to you soon.',
      });
    } catch (error) {
      logger.error('Failed to process contact request', { error });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to process contact request',
        },
        { status: 500 }
      );
    }
  }

  /**
   * Get client dashboard data
   */
  static async getClientDashboard(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url);
      const clientEmail = searchParams.get('email');

      if (!clientEmail) {
        return NextResponse.json(
          {
            success: false,
            error: 'Client email is required',
          },
          { status: 400 }
        );
      }

      // TODO: Implement client model in Prisma schema or use User model
      // const client = await prisma.client.findUnique({
      //   where: { email: clientEmail },
      //   include: {
      //     assessments: {
      //       orderBy: { createdAt: 'desc' },
      //     },
      //     contactRequests: {
      //       orderBy: { requestedAt: 'desc' },
      //     },
      //   },
      // });

      // For now, return a mock response
      const client = {
        id: `client_${Date.now()}`,
        firstName: 'John',
        lastName: 'Doe',
        email: clientEmail,
        phone: '555-0123',
        assessments: [],
        contactRequests: [],
      };

      if (!client) {
        return NextResponse.json(
          {
            success: false,
            error: 'Client not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        client: {
          id: client.id,
          name: `${client.firstName} ${client.lastName}`,
          email: client.email,
          phone: client.phone,
          assessments: client.assessments.map(this.formatAssessmentForResponse),
          contactRequests: client.contactRequests,
        },
      });
    } catch (error) {
      logger.error('Failed to retrieve client dashboard', { error });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to retrieve client data',
        },
        { status: 500 }
      );
    }
  }

  /**
   * Validate intake request
   */
  private static validateIntakeRequest(request: ClientIntakeRequest): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Personal info validation
    if (!request.personalInfo.firstName?.trim()) {
      errors.push('First name is required');
    }
    if (!request.personalInfo.lastName?.trim()) {
      errors.push('Last name is required');
    }
    if (!request.personalInfo.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(request.personalInfo.email)) {
      errors.push('Valid email is required');
    }
    if (!request.personalInfo.phone?.trim()) {
      errors.push('Phone number is required');
    }

    // Location validation
    if (!request.personalInfo.location.city?.trim()) {
      errors.push('City is required');
    }
    if (!request.personalInfo.location.state?.trim()) {
      errors.push('State is required');
    }

    // Legal issue validation
    if (!request.legalIssue.description?.trim()) {
      errors.push('Legal issue description is required');
    }
    if (request.legalIssue.description && request.legalIssue.description.length < 10) {
      errors.push('Legal issue description must be at least 10 characters');
    }

    // Goals validation
    if (!request.clientGoals || request.clientGoals.length === 0) {
      errors.push('At least one client goal is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Store assessment in database
   */
  private static async storeAssessment(
    request: ClientIntakeRequest,
    assessment: CaseAssessmentResult
  ): Promise<void> {
    try {
      // TODO: Implement client model in Prisma schema or use User model
      // const client = await prisma.client.upsert({
      //   where: { email: request.personalInfo.email },
      //   update: {
      //     firstName: request.personalInfo.firstName,
      //     lastName: request.personalInfo.lastName,
      //     phone: request.personalInfo.phone,
      //     preferredLanguage: request.personalInfo.preferredLanguage,
      //     city: request.personalInfo.location.city,
      //     state: request.personalInfo.location.state,
      //     zipCode: request.personalInfo.location.zipCode,
      //   },
      //   create: {
      //     email: request.personalInfo.email,
      //     firstName: request.personalInfo.firstName,
      //     lastName: request.personalInfo.lastName,
      //     phone: request.personalInfo.phone,
      //     preferredLanguage: request.personalInfo.preferredLanguage,
      //     city: request.personalInfo.location.city,
      //     state: request.personalInfo.location.state,
      //     zipCode: request.personalInfo.location.zipCode,
      //   },
      // });

      // For now, use a mock client
      const client = {
        id: `client_${Date.now()}`,
        email: request.personalInfo.email,
        firstName: request.personalInfo.firstName,
        lastName: request.personalInfo.lastName,
      };

      // TODO: Implement clientAssessment model in Prisma schema
      // await prisma.clientAssessment.create({
      //   data: {
      //     assessmentId: assessment.assessmentId,
      //     clientId: client.id,
      //     practiceArea: assessment.practiceArea,
      //     jurisdiction: assessment.jurisdiction,
      //     agentUsed: assessment.agentUsed,
      //     confidence: assessment.confidence,
      //     caseViability: assessment.caseAnalysis.viability,
      //     caseComplexity: assessment.caseAnalysis.complexity,
      //     likelihood: assessment.caseAnalysis.likelihood,
      //     timeframe: assessment.caseAnalysis.timeframe,
      //     estimatedCosts: JSON.stringify(assessment.costAnalysis.estimatedCosts),
      //     attorneyNecessity: assessment.recommendations.attorney_necessity,
      //     priority: assessment.followUpStrategy.priority,
      //     recommendedContact: assessment.followUpStrategy.recommendedContact,
      //     specializedAssessment: JSON.stringify(assessment.specializedAssessment),
      //     recommendations: JSON.stringify(assessment.recommendations),
      //     riskFactors: JSON.stringify(assessment.riskFactors),
      //     opportunities: JSON.stringify(assessment.opportunities),
      //     status: 'new',
      //     createdAt: assessment.timestamp,
      //   },
      // });

      logger.info('Assessment stored in database', {
        assessmentId: assessment.assessmentId,
        clientId: client.id,
        practiceArea: assessment.practiceArea,
      });
    } catch (error) {
      logger.error('Failed to store assessment', { error, assessmentId: assessment.assessmentId });
      throw error;
    }
  }

  /**
   * Send confirmation email to client
   */
  private static async sendClientConfirmation(
    request: ClientIntakeRequest,
    assessment: CaseAssessmentResult
  ): Promise<void> {
    try {
      const subject = `Case Assessment Confirmation - ${assessment.assessmentId}`;
      const isSpanish = request.personalInfo.preferredLanguage === 'es';

      const content = this.generateClientConfirmationEmail(request, assessment, isSpanish);

      await sendEmail({
        to: request.personalInfo.email,
        subject,
        html: content,
        text: content.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
      });

      logger.info('Client confirmation email sent', {
        assessmentId: assessment.assessmentId,
        clientEmail: request.personalInfo.email,
        language: request.personalInfo.preferredLanguage,
      });
    } catch (error) {
      logger.error('Failed to send client confirmation email', { error });
    }
  }

  /**
   * Send notification to firm
   */
  private static async sendFirmNotification(
    request: ClientIntakeRequest,
    assessment: CaseAssessmentResult
  ): Promise<void> {
    try {
      const subject = `New Client Intake - ${assessment.practiceArea.toUpperCase()} - Priority: ${assessment.followUpStrategy.priority.toUpperCase()}`;
      const content = this.generateFirmNotificationEmail(request, assessment);

      // Determine recipient based on practice area
      const recipient = this.getFirmRecipient(
        assessment.practiceArea,
        assessment.followUpStrategy.priority
      );

      await sendEmail({
        to: recipient,
        subject,
        html: content,
      });

      logger.info('Firm notification email sent', {
        assessmentId: assessment.assessmentId,
        practiceArea: assessment.practiceArea,
        priority: assessment.followUpStrategy.priority,
        recipient,
      });
    } catch (error) {
      logger.error('Failed to send firm notification email', { error });
    }
  }

  /**
   * Schedule follow-up actions
   */
  private static async scheduleFollowUpActions(assessment: CaseAssessmentResult): Promise<void> {
    try {
      // TODO: Implement followUpAction model in Prisma schema
      // for (const action of assessment.followUpStrategy.followUpActions) {
      //   await prisma.followUpAction.create({
      //     data: {
      //       assessmentId: assessment.assessmentId,
      //       action,
      //       priority: assessment.followUpStrategy.priority,
      //       dueDate: this.calculateDueDate(assessment.followUpStrategy.recommendedContact),
      //       status: 'pending',
      //     },
      //   });
      // }

      logger.info('Follow-up actions scheduled', {
        assessmentId: assessment.assessmentId,
        actionCount: assessment.followUpStrategy.followUpActions.length,
      });
    } catch (error) {
      logger.error('Failed to schedule follow-up actions', { error });
    }
  }

  /**
   * Calculate due date based on recommended contact timeline
   */
  private static calculateDueDate(recommendedContact: string): Date {
    const now = new Date();

    switch (recommendedContact) {
      case 'immediate':
        return new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours
      case 'within_24h':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
      case 'within_week':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
      default:
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    }
  }

  /**
   * Get firm recipient based on practice area and priority
   */
  private static getFirmRecipient(practiceArea: string, priority: string): string {
    // Priority overrides for urgent cases
    if (priority === 'urgent') {
      return process.env.URGENT_INTAKE_EMAIL || 'intake@vasquezlawfirm.com';
    }

    // Practice area routing
    const recipients: Record<string, string> = {
      immigration: process.env.IMMIGRATION_ATTORNEY_EMAIL || 'immigration@vasquezlawfirm.com',
      personal_injury: process.env.PI_ATTORNEY_EMAIL || 'personalinjury@vasquezlawfirm.com',
      workers_compensation: process.env.WC_ATTORNEY_EMAIL || 'workerscomp@vasquezlawfirm.com',
      family_law: process.env.FAMILY_ATTORNEY_EMAIL || 'family@vasquezlawfirm.com',
      criminal_defense: process.env.CRIMINAL_ATTORNEY_EMAIL || 'criminal@vasquezlawfirm.com',
    };

    return recipients[practiceArea] || 'intake@vasquezlawfirm.com';
  }

  /**
   * Generate client confirmation email content
   */
  private static generateClientConfirmationEmail(
    request: ClientIntakeRequest,
    assessment: CaseAssessmentResult,
    isSpanish: boolean
  ): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawfirm.com';
    const dashboardUrl = `${baseUrl}/client-dashboard?email=${encodeURIComponent(request.personalInfo.email)}`;

    if (isSpanish) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmación de Evaluación de Caso</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1>Vasquez Law Firm</h1>
            <h2>Confirmación de Evaluación de Caso</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Estimado/a ${request.personalInfo.firstName} ${request.personalInfo.lastName},</p>
            
            <p>Gracias por contactar a Vasquez Law Firm. Hemos recibido su solicitud de consulta y hemos completado una evaluación inicial de su caso.</p>
            
            <div style="background-color: white; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0;">
              <h3>Resumen de su Evaluación</h3>
              <p><strong>ID de Evaluación:</strong> ${assessment.assessmentId}</p>
              <p><strong>Área de Práctica:</strong> ${this.translatePracticeArea(assessment.practiceArea)}</p>
              <p><strong>Viabilidad del Caso:</strong> ${this.translateViability(assessment.caseAnalysis.viability)}</p>
              <p><strong>Costos Estimados:</strong> ${assessment.costAnalysis.estimatedCosts.total_estimated}</p>
              <p><strong>Prioridad:</strong> ${this.translatePriority(assessment.followUpStrategy.priority)}</p>
            </div>
            
            <h3>Próximos Pasos Recomendados:</h3>
            <ul>
              ${assessment.recommendations.immediate_actions.map(action => `<li>${action}</li>`).join('')}
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${dashboardUrl}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Ver Panel de Cliente</a>
            </div>
            
            <p>Nos pondremos en contacto con usted pronto para programar una consulta. Si tiene preguntas urgentes, por favor contáctenos al (919) 845-6899.</p>
            
            <p>Atentamente,<br>
            El Equipo de Vasquez Law Firm</p>
          </div>
        </body>
        </html>
      `;
    } else {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Case Assessment Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1>Vasquez Law Firm</h1>
            <h2>Case Assessment Confirmation</h2>
          </div>
          
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Dear ${request.personalInfo.firstName} ${request.personalInfo.lastName},</p>
            
            <p>Thank you for contacting Vasquez Law Firm. We have received your consultation request and completed an initial assessment of your case.</p>
            
            <div style="background-color: white; padding: 15px; border-left: 4px solid #1e40af; margin: 20px 0;">
              <h3>Your Assessment Summary</h3>
              <p><strong>Assessment ID:</strong> ${assessment.assessmentId}</p>
              <p><strong>Practice Area:</strong> ${this.formatPracticeArea(assessment.practiceArea)}</p>
              <p><strong>Case Viability:</strong> ${this.formatViability(assessment.caseAnalysis.viability)}</p>
              <p><strong>Estimated Costs:</strong> ${assessment.costAnalysis.estimatedCosts.total_estimated}</p>
              <p><strong>Priority Level:</strong> ${this.formatPriority(assessment.followUpStrategy.priority)}</p>
            </div>
            
            <h3>Recommended Next Steps:</h3>
            <ul>
              ${assessment.recommendations.immediate_actions.map(action => `<li>${action}</li>`).join('')}
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${dashboardUrl}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">View Client Dashboard</a>
            </div>
            
            <p>We will be in touch with you soon to schedule a consultation. If you have urgent questions, please contact us at (919) 845-6899.</p>
            
            <p>Best regards,<br>
            The Vasquez Law Firm Team</p>
          </div>
        </body>
        </html>
      `;
    }
  }

  /**
   * Generate firm notification email content
   */
  private static generateFirmNotificationEmail(
    request: ClientIntakeRequest,
    assessment: CaseAssessmentResult
  ): string {
    const adminUrl = process.env.ADMIN_BASE_URL || 'https://vasquezlawfirm.com/admin';
    const assessmentUrl = `${adminUrl}/assessments/${assessment.assessmentId}`;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Client Intake - ${assessment.practiceArea.toUpperCase()}</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
          <h1>New Client Intake Alert</h1>
          <h2>Priority: ${assessment.followUpStrategy.priority.toUpperCase()}</h2>
        </div>
        
        <div style="padding: 20px;">
          <h3>Client Information</h3>
          <p><strong>Name:</strong> ${request.personalInfo.firstName} ${request.personalInfo.lastName}</p>
          <p><strong>Email:</strong> ${request.personalInfo.email}</p>
          <p><strong>Phone:</strong> ${request.personalInfo.phone}</p>
          <p><strong>Location:</strong> ${request.personalInfo.location.city}, ${request.personalInfo.location.state}</p>
          <p><strong>Preferred Language:</strong> ${request.personalInfo.preferredLanguage === 'es' ? 'Spanish' : 'English'}</p>
          
          <h3>Case Information</h3>
          <p><strong>Practice Area:</strong> ${this.formatPracticeArea(assessment.practiceArea)}</p>
          <p><strong>Case Viability:</strong> ${this.formatViability(assessment.caseAnalysis.viability)}</p>
          <p><strong>Complexity:</strong> ${this.formatComplexity(assessment.caseAnalysis.complexity)}</p>
          <p><strong>Estimated Value:</strong> ${assessment.costAnalysis.estimatedCosts.total_estimated}</p>
          <p><strong>Attorney Necessity:</strong> ${assessment.recommendations.attorney_necessity}</p>
          
          <h3>Urgency & Timeline</h3>
          <p><strong>Client Urgency:</strong> ${request.legalIssue.urgency}</p>
          <p><strong>Recommended Contact:</strong> ${assessment.followUpStrategy.recommendedContact}</p>
          <p><strong>Has Deadlines:</strong> ${request.legalIssue.hasDeadlines ? 'Yes' : 'No'}</p>
          ${request.legalIssue.deadlineDate ? `<p><strong>Deadline Date:</strong> ${request.legalIssue.deadlineDate}</p>` : ''}
          
          <h3>Legal Issue Description</h3>
          <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
            ${request.legalIssue.description}
          </p>
          
          <h3>Client Goals</h3>
          <ul>
            ${request.clientGoals.map(goal => `<li>${goal}</li>`).join('')}
          </ul>
          
          ${
            request.specificQuestions.length > 0
              ? `
            <h3>Specific Questions</h3>
            <ul>
              ${request.specificQuestions.map(question => `<li>${question}</li>`).join('')}
            </ul>
          `
              : ''
          }
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${assessmentUrl}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">View Full Assessment</a>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h4>AI Assessment Summary</h4>
            <p><strong>Routing Confidence:</strong> ${assessment.confidence}%</p>
            <p><strong>Agent Used:</strong> ${assessment.agentUsed}</p>
            <p><strong>Jurisdiction:</strong> ${assessment.jurisdiction}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Send contact request notification
   */
  private static async sendContactRequestNotification(
    assessment: any,
    contactRequest: any
  ): Promise<void> {
    try {
      const subject = `Client Contact Request - ${assessment.assessmentId}`;
      const recipient = this.getFirmRecipient(assessment.practiceArea, contactRequest.urgency);

      const content = `
        <h3>Client Contact Request</h3>
        <p><strong>Client:</strong> ${assessment.client.firstName} ${assessment.client.lastName}</p>
        <p><strong>Email:</strong> ${assessment.client.email}</p>
        <p><strong>Phone:</strong> ${assessment.client.phone}</p>
        <p><strong>Preferred Contact Method:</strong> ${contactRequest.contactMethod}</p>
        <p><strong>Urgency:</strong> ${contactRequest.urgency}</p>
        <p><strong>Message:</strong> ${contactRequest.message || 'No additional message'}</p>
        <p><strong>Assessment ID:</strong> ${assessment.assessmentId}</p>
      `;

      await sendEmail({
        to: recipient,
        subject,
        html: content,
      });
    } catch (error) {
      logger.error('Failed to send contact request notification', { error });
    }
  }

  /**
   * Format assessment for API response
   */
  private static formatAssessmentForResponse(assessment: any): any {
    return {
      assessmentId: assessment.assessmentId,
      practiceArea: assessment.practiceArea,
      caseViability: assessment.caseViability,
      priority: assessment.priority,
      status: assessment.status,
      createdAt: assessment.createdAt,
      // Add other fields as needed for client-facing responses
    };
  }

  /**
   * Formatting helper methods
   */
  private static formatPracticeArea(area: string): string {
    const formatted: Record<string, string> = {
      immigration: 'Immigration Law',
      personal_injury: 'Personal Injury',
      workers_compensation: 'Workers Compensation',
      family_law: 'Family Law',
      criminal_defense: 'Criminal Defense',
    };
    return formatted[area] || area;
  }

  private static formatViability(viability: string): string {
    const formatted: Record<string, string> = {
      strong: 'Strong Case',
      good: 'Good Prospects',
      moderate: 'Moderate Prospects',
      weak: 'Challenging Case',
      not_viable: 'Not Viable',
    };
    return formatted[viability] || viability;
  }

  private static formatComplexity(complexity: string): string {
    const formatted: Record<string, string> = {
      simple: 'Simple',
      moderate: 'Moderate',
      complex: 'Complex',
      extremely_complex: 'Highly Complex',
    };
    return formatted[complexity] || complexity;
  }

  private static formatPriority(priority: string): string {
    const formatted: Record<string, string> = {
      urgent: 'Urgent',
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority',
    };
    return formatted[priority] || priority;
  }

  /**
   * Spanish translation helpers
   */
  private static translatePracticeArea(area: string): string {
    const translations: Record<string, string> = {
      immigration: 'Derecho de Inmigración',
      personal_injury: 'Lesiones Personales',
      workers_compensation: 'Compensación Laboral',
      family_law: 'Derecho Familiar',
      criminal_defense: 'Defensa Criminal',
    };
    return translations[area] || area;
  }

  private static translateViability(viability: string): string {
    const translations: Record<string, string> = {
      strong: 'Caso Sólido',
      good: 'Buenas Perspectivas',
      moderate: 'Perspectivas Moderadas',
      weak: 'Caso Desafiante',
      not_viable: 'No Viable',
    };
    return translations[viability] || viability;
  }

  private static translatePriority(priority: string): string {
    const translations: Record<string, string> = {
      urgent: 'Urgente',
      high: 'Alta Prioridad',
      medium: 'Prioridad Media',
      low: 'Prioridad Baja',
    };
    return translations[priority] || priority;
  }
}

export default ClientIntakeAPI;
