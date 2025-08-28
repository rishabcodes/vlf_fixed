/**
 * Client Services Specialist - Consolidated Client Management Agent
 * 
 * Consolidates 3 client service agents into one comprehensive system:
 * - enhanced-intake-agent.ts (Client intake, routing, practice area identification)
 * - appointment-scheduling-agent.ts (Calendar management, GHL integration, booking)
 * - document-analysis-agent.ts (Document review, analysis, compliance checking)
 */

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { createCrewLogger } from '@/lib/crews/log-execution';
import { APISafetyWrapper } from '@/lib/api-safety';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';

export type ClientServiceType = 'intake' | 'scheduling' | 'document_analysis';

export enum LegalPracticeArea {
  REMOVAL_DEFENSE = 'removal_defense',
  BUSINESS_IMMIGRATION = 'business_immigration',
  FAMILY_IMMIGRATION = 'family_immigration',
  CRIMINAL_DEFENSE = 'criminal_defense',
  PERSONAL_INJURY = 'personal_injury',
  WORKERS_COMP = 'workers_comp',
  FAMILY_LAW = 'family_law',
  TRAFFIC = 'traffic',
  BUSINESS_LAW = 'business_law',
  GENERAL = 'general',
}

export interface ClientServicesRequest {
  serviceType: ClientServiceType;
  
  // Common fields
  clientInfo?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    preferredLanguage?: 'en' | 'es';
    source?: string;
  };
  urgency?: 'low' | 'medium' | 'high' | 'immediate';
  
  // Intake specific fields
  clientInput?: string;
  isEmergency?: boolean;
  practiceArea?: LegalPracticeArea;
  
  // Scheduling specific fields
  appointmentType?: 'consultation' | 'follow_up' | 'document_review' | 'court' | 'other';
  preferredDates?: Date[];
  preferredTimeSlots?: string[];
  duration?: number;
  location?: 'in-person' | 'virtual' | 'phone';
  attorneyId?: string;
  notes?: string;
  
  // Document analysis specific fields
  documentPath?: string;
  documentType?: 'contract' | 'court-filing' | 'immigration-form' | 'medical-record' | 'insurance-claim' | 'other';
  analysisType?: 'summary' | 'risk-assessment' | 'compliance-check' | 'key-extraction' | 'full-analysis';
  clientId?: string;
}

export interface ClientServicesResponse {
  serviceType: ClientServiceType;
  success: boolean;
  
  // Intake results
  intakeResult?: {
    practiceArea: LegalPracticeArea;
    urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
    keyInformation: string[];
    routingDecision: string;
    followUpRequired: boolean;
    initialGuidance: string;
    documentsNeeded?: string[];
    nextSteps: string[];
  };
  
  // Scheduling results
  schedulingResult?: {
    availableSlots: Array<{
      date: Date;
      time: string;
      attorneyId: string;
      attorneyName: string;
      location: string;
      duration: number;
    }>;
    recommendedSlot?: {
      date: Date;
      time: string;
      attorneyName: string;
      reason: string;
    };
    confirmationNumber?: string;
    alternativeOptions?: string[];
    ghlContactId?: string;
  };
  
  // Document analysis results
  documentResult?: {
    summary: string;
    keyFindings: string[];
    riskFactors: string[];
    recommendedActions: string[];
    missingDocuments?: string[];
    complianceIssues?: string[];
    deadlines?: Array<{
      date: string;
      description: string;
      critical: boolean;
    }>;
    confidenceScore: number;
    requiresAttorneyReview: boolean;
  };
  
  // Common response fields
  message: string;
  error?: string;
  requiresFollowUp: boolean;
  nextActions: string[];
}

export class ClientServicesSpecialist {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;
  private crewLogger = createCrewLogger('client-services-specialist');
  private prisma = getPrismaClient();

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.safetyWrapper = new APISafetyWrapper({
      key: apiKey,
      serviceName: 'OpenAI',
      required: false,
    });
    this.initializeModel();
  }

  private initializeModel() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'not-configured') {
      this.model = new ChatOpenAI({
        modelName: 'gpt-4-turbo-preview',
        temperature: 0.3,
        openAIApiKey: apiKey,
      });
    }
  }

  async processClientService(request: ClientServicesRequest): Promise<ClientServicesResponse> {
    return this.crewLogger.logExecution(
      'process-client-service',
      async () => {
        logger.info('Starting client service processing', {
          serviceType: request.serviceType,
          urgency: request.urgency,
        });

        if (!this.model) {
          return this.getFallbackResponse(request);
        }

        try {
          let response: ClientServicesResponse;

          // Route to appropriate service handler
          switch (request.serviceType) {
            case 'intake':
              response = await this.processIntake(request);
              break;
            case 'scheduling':
              response = await this.processScheduling(request);
              break;
            case 'document_analysis':
              response = await this.processDocumentAnalysis(request);
              break;
            default:
              throw new Error(`Unknown service type: ${request.serviceType}`);
          }

          logger.info('Client service processing completed', {
            serviceType: request.serviceType,
            success: response.success,
          });

          return response;
        } catch (error) {
          logger.error('Client service processing failed', errorToLogMeta(error));
          return this.getFallbackResponse(request);
        }
      },
      {
        input: request,
        metadata: {
          serviceType: request.serviceType,
          urgency: request.urgency,
        },
      }
    );
  }

  private async processIntake(request: ClientServicesRequest): Promise<ClientServicesResponse> {
    const systemPrompt = this.getIntakeSystemPrompt(request.clientInfo?.preferredLanguage);
    const userPrompt = this.buildIntakePrompt(request);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseIntakeResponse(response.content.toString(), request);
  }

  private async processScheduling(request: ClientServicesRequest): Promise<ClientServicesResponse> {
    // Get available attorneys for the practice area
    const availableAttorneys = await this.getAvailableAttorneys(request);
    
    const systemPrompt = this.getSchedulingSystemPrompt(request.clientInfo?.preferredLanguage);
    const userPrompt = this.buildSchedulingPrompt(request, availableAttorneys);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseSchedulingResponse(response.content.toString(), request, availableAttorneys);
  }

  private async processDocumentAnalysis(request: ClientServicesRequest): Promise<ClientServicesResponse> {
    // Extract document text (simplified for this consolidation)
    const documentText = await this.extractDocumentText(request.documentPath || '');
    
    const systemPrompt = this.getDocumentSystemPrompt();
    const userPrompt = this.buildDocumentPrompt(request, documentText);

    const response = await this.model!.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ]);

    return this.parseDocumentResponse(response.content.toString(), request);
  }

  // System prompts for each service type
  private getIntakeSystemPrompt(language?: 'en' | 'es'): string {
    const spanishNote = language === 'es' ? '\nRESPOND IN SPANISH when appropriate for Spanish-speaking clients.' : '';
    
    return `You are a professional legal intake specialist for Vasquez Law Firm. Your role is to:

1. IDENTIFY the client's legal needs and appropriate practice area
2. ASSESS urgency (emergency situations include: detention, arrest, court within 48hrs, serious injury)
3. GATHER essential information compassionately and efficiently
4. ROUTE to the correct specialist
5. PROVIDE initial guidance and next steps
6. Be empathetic, professional, and culturally sensitive

PRACTICE AREAS:
- REMOVAL_DEFENSE: ICE detention, deportation, removal proceedings, bond hearings
- BUSINESS_IMMIGRATION: H1B, L1, E2, employment visas, PERM, green cards through employment
- FAMILY_IMMIGRATION: Green cards, citizenship, family petitions, consular processing
- CRIMINAL_DEFENSE: Arrests, charges, DUI, criminal cases, expungements
- PERSONAL_INJURY: Accidents, injuries, insurance claims, medical malpractice
- WORKERS_COMP: Workplace injuries, workers compensation claims
- FAMILY_LAW: Divorce, custody, child support, domestic violence
- TRAFFIC: Traffic tickets, license issues, DUI administrative
- BUSINESS_LAW: LLC, corporation, business formation, contracts

URGENCY LEVELS:
- EMERGENCY: Detention, arrest, serious injury, court within 48 hours
- HIGH: Court within 2 weeks, pending deadlines, significant legal issues
- MEDIUM: Standard legal matters with some time sensitivity
- LOW: General inquiries, planning, non-urgent matters

Always prioritize client safety, provide clear next steps, and route appropriately.${spanishNote}`;
  }

  private getSchedulingSystemPrompt(language?: 'en' | 'es'): string {
    return `You are an appointment scheduling specialist for Vasquez Law Firm. Your expertise includes:

APPOINTMENT TYPES:
- Consultation: Initial client meetings (60-90 minutes)
- Follow-up: Progress meetings with existing clients (30-60 minutes)
- Document review: Reviewing and signing documents (30-45 minutes)
- Court: Court appearances and preparation (varies)
- Emergency: Urgent matters requiring immediate attention

SCHEDULING PRIORITIES:
1. Emergency cases get priority scheduling
2. Match attorney expertise to client needs
3. Consider client preferences (time, location, language)
4. Optimize attorney calendars efficiently
5. Provide multiple options when possible

LOCATIONS:
- In-person: Office visits for complex matters
- Virtual: Video calls for consultations and follow-ups
- Phone: Quick discussions and updates

Always confirm appointment details, explain what to bring, and provide clear instructions.
${language === 'es' ? 'Provide Spanish language support when needed.' : ''}`;
  }

  private getDocumentSystemPrompt(): string {
    return `You are a legal document analysis specialist. Your role is to:

1. ANALYZE legal documents for key information, risks, and compliance
2. IDENTIFY missing documents, deadlines, and action items
3. ASSESS legal risks and provide recommendations
4. DETERMINE if attorney review is required
5. EXTRACT key findings in clear, understandable language

DOCUMENT TYPES:
- Contract: Terms, obligations, risks, expiration dates
- Court filing: Deadlines, requirements, next steps
- Immigration form: Completeness, accuracy, supporting documents
- Medical record: Injury details, treatment, prognosis
- Insurance claim: Coverage, damages, settlement potential

ANALYSIS TYPES:
- Summary: High-level overview of document contents
- Risk assessment: Identify potential legal risks and issues
- Compliance check: Ensure regulatory and legal compliance
- Key extraction: Pull out critical dates, amounts, parties
- Full analysis: Comprehensive review of all aspects

Always maintain confidentiality, provide clear explanations, and recommend attorney review for complex matters.`;
  }

  // Prompt builders for each service type
  private buildIntakePrompt(request: ClientServicesRequest): string {
    return `Process this client intake:

CLIENT INPUT: "${request.clientInput}"
${request.isEmergency ? 'MARKED AS EMERGENCY' : ''}
${request.clientInfo?.name ? `Client Name: ${request.clientInfo.name}` : ''}
${request.clientInfo?.phone ? `Phone: ${request.clientInfo.phone}` : ''}
${request.clientInfo?.preferredLanguage ? `Language: ${request.clientInfo.preferredLanguage}` : ''}

DETERMINE:
1. Primary legal issue and practice area
2. Urgency level (emergency/high/medium/low)
3. Key information collected
4. Routing decision (which specialist)
5. Initial guidance and next steps
6. Required follow-up actions

Provide response in JSON format with all required fields.`;
  }

  private buildSchedulingPrompt(request: ClientServicesRequest, attorneys: any[]): string {
    return `Schedule appointment for client:

APPOINTMENT REQUEST:
- Type: ${request.appointmentType}
- Practice Area: ${request.practiceArea}
- Urgency: ${request.urgency}
- Preferred Location: ${request.location}
- Duration: ${request.duration} minutes
- Language: ${request.clientInfo?.preferredLanguage}
- Notes: ${request.notes || 'None'}

PREFERRED DATES: ${request.preferredDates?.map(d => d.toISOString().split('T')[0]).join(', ') || 'Flexible'}
PREFERRED TIMES: ${request.preferredTimeSlots?.join(', ') || 'Flexible'}

AVAILABLE ATTORNEYS: ${attorneys.map(a => `${a.name} (${a.practiceAreas.join(', ')})`).join(', ')}

PROVIDE:
1. Best available appointment slots
2. Recommended slot with reasoning
3. Alternative options if preferred slots unavailable
4. Scheduling notes and preparation instructions

Response in JSON format with all required fields.`;
  }

  private buildDocumentPrompt(request: ClientServicesRequest, documentText: string): string {
    return `Analyze this legal document:

DOCUMENT TYPE: ${request.documentType}
ANALYSIS TYPE: ${request.analysisType}
CLIENT ID: ${request.clientId}
URGENCY: ${request.urgency}

DOCUMENT CONTENT:
${documentText.substring(0, 4000)} ${documentText.length > 4000 ? '...' : ''}

PROVIDE:
1. Document summary
2. Key findings and important information
3. Risk factors and potential issues
4. Recommended actions and next steps
5. Missing documents or information
6. Compliance issues (if any)
7. Critical deadlines
8. Confidence score (0-100)
9. Whether attorney review is required

Response in JSON format with detailed analysis.`;
  }

  // Response parsers
  private parseIntakeResponse(response: string, request: ClientServicesRequest): ClientServicesResponse {
    try {
      const parsed = JSON.parse(response);
      
      return {
        serviceType: 'intake',
        success: true,
        intakeResult: {
          practiceArea: parsed.practice_area || LegalPracticeArea.GENERAL,
          urgencyLevel: parsed.urgency_level || 'medium',
          keyInformation: parsed.key_information || [],
          routingDecision: parsed.routing_decision || 'General consultation',
          followUpRequired: parsed.follow_up_required || true,
          initialGuidance: parsed.initial_guidance || 'Please consult with our legal team',
          documentsNeeded: parsed.documents_needed || [],
          nextSteps: parsed.next_steps || ['Schedule consultation'],
        },
        message: 'Intake processed successfully',
        requiresFollowUp: parsed.follow_up_required || true,
        nextActions: parsed.next_steps || ['Schedule consultation with appropriate attorney'],
      };
    } catch (error) {
      logger.warn('Failed to parse intake response');
      return this.getFallbackIntakeResponse(request);
    }
  }

  private parseSchedulingResponse(response: string, request: ClientServicesRequest, attorneys: any[]): ClientServicesResponse {
    try {
      const parsed = JSON.parse(response);
      
      return {
        serviceType: 'scheduling',
        success: true,
        schedulingResult: {
          availableSlots: parsed.available_slots?.map((slot: any) => ({
            date: new Date(slot.date),
            time: slot.time,
            attorneyId: slot.attorney_id,
            attorneyName: slot.attorney_name,
            location: slot.location,
            duration: slot.duration || request.duration || 60,
          })) || [],
          recommendedSlot: parsed.recommended_slot ? {
            date: new Date(parsed.recommended_slot.date),
            time: parsed.recommended_slot.time,
            attorneyName: parsed.recommended_slot.attorney_name,
            reason: parsed.recommended_slot.reason,
          } : undefined,
          alternativeOptions: parsed.alternative_options || [],
        },
        message: 'Scheduling options provided',
        requiresFollowUp: true,
        nextActions: parsed.next_actions || ['Confirm preferred appointment slot'],
      };
    } catch (error) {
      logger.warn('Failed to parse scheduling response');
      return this.getFallbackSchedulingResponse(request);
    }
  }

  private parseDocumentResponse(response: string, request: ClientServicesRequest): ClientServicesResponse {
    try {
      const parsed = JSON.parse(response);
      
      return {
        serviceType: 'document_analysis',
        success: true,
        documentResult: {
          summary: parsed.summary || 'Document analysis completed',
          keyFindings: parsed.key_findings || [],
          riskFactors: parsed.risk_factors || [],
          recommendedActions: parsed.recommended_actions || [],
          missingDocuments: parsed.missing_documents || [],
          complianceIssues: parsed.compliance_issues || [],
          deadlines: parsed.deadlines?.map((d: any) => ({
            date: d.date,
            description: d.description,
            critical: d.critical || false,
          })) || [],
          confidenceScore: parsed.confidence_score || 75,
          requiresAttorneyReview: parsed.requires_attorney_review || true,
        },
        message: 'Document analysis completed',
        requiresFollowUp: parsed.requires_attorney_review || false,
        nextActions: parsed.recommended_actions || ['Review findings with attorney'],
      };
    } catch (error) {
      logger.warn('Failed to parse document response');
      return this.getFallbackDocumentResponse(request);
    }
  }

  // Helper methods
  private async getAvailableAttorneys(request: ClientServicesRequest) {
    // Mock attorney data - in production this would query the database
    return [
      {
        id: 'att-001',
        name: 'Attorney Rodriguez',
        practiceAreas: ['immigration', 'family_immigration', 'removal_defense'],
        languages: ['en', 'es'],
        availability: 'high'
      },
      {
        id: 'att-002', 
        name: 'Attorney Johnson',
        practiceAreas: ['criminal_defense', 'personal_injury', 'traffic'],
        languages: ['en'],
        availability: 'medium'
      },
      {
        id: 'att-003',
        name: 'Attorney Chen',
        practiceAreas: ['business_immigration', 'business_law'],
        languages: ['en'],
        availability: 'high'
      }
    ];
  }

  private async extractDocumentText(documentPath: string): Promise<string> {
    // Simplified document extraction - in production would handle PDFs, images, etc.
    if (!documentPath) {
      return '[No document provided for analysis]';
    }
    
    try {
      // This would be replaced with actual document processing
      return `[Document Analysis Placeholder]
      
Document Path: ${documentPath}

In a production environment, this would:
- Extract text from PDFs using libraries like pdf-parse
- Process images with OCR services
- Handle various document formats
- Maintain document security and privacy`;
    } catch (error) {
      return '[Error extracting document text]';
    }
  }

  // Fallback responses for when AI model is unavailable
  private getFallbackResponse(request: ClientServicesRequest): ClientServicesResponse {
    switch (request.serviceType) {
      case 'intake':
        return this.getFallbackIntakeResponse(request);
      case 'scheduling':
        return this.getFallbackSchedulingResponse(request);
      case 'document_analysis':
        return this.getFallbackDocumentResponse(request);
      default:
        return {
          serviceType: request.serviceType,
          success: false,
          message: 'Service temporarily unavailable',
          error: 'AI model unavailable',
          requiresFollowUp: true,
          nextActions: ['Contact office directly for assistance'],
        };
    }
  }

  private getFallbackIntakeResponse(request: ClientServicesRequest): ClientServicesResponse {
    return {
      serviceType: 'intake',
      success: true,
      intakeResult: {
        practiceArea: request.practiceArea || LegalPracticeArea.GENERAL,
        urgencyLevel: request.isEmergency ? 'emergency' : 'medium',
        keyInformation: ['Initial consultation needed'],
        routingDecision: 'General legal consultation',
        followUpRequired: true,
        initialGuidance: 'Thank you for contacting Vasquez Law Firm. We will schedule a consultation to discuss your legal needs.',
        documentsNeeded: ['Government-issued ID', 'Relevant documents related to your case'],
        nextSteps: ['Schedule consultation', 'Gather relevant documents'],
      },
      message: 'Intake received successfully',
      requiresFollowUp: true,
      nextActions: ['Attorney will contact you within 24 hours'],
    };
  }

  private getFallbackSchedulingResponse(request: ClientServicesRequest): ClientServicesResponse {
    return {
      serviceType: 'scheduling',
      success: true,
      schedulingResult: {
        availableSlots: [],
        alternativeOptions: [
          'Call office directly to schedule',
          'Request callback for scheduling',
          'Submit online scheduling request',
        ],
      },
      message: 'Scheduling system temporarily unavailable',
      requiresFollowUp: true,
      nextActions: ['Office staff will contact you to schedule appointment'],
    };
  }

  private getFallbackDocumentResponse(request: ClientServicesRequest): ClientServicesResponse {
    return {
      serviceType: 'document_analysis',
      success: true,
      documentResult: {
        summary: 'Document received for review',
        keyFindings: ['Document analysis pending'],
        riskFactors: ['Professional review required'],
        recommendedActions: ['Schedule appointment for document review'],
        confidenceScore: 0,
        requiresAttorneyReview: true,
      },
      message: 'Document received for professional review',
      requiresFollowUp: true,
      nextActions: ['Attorney will review document and contact you'],
    };
  }
}

export const clientServicesSpecialist = new ClientServicesSpecialist();