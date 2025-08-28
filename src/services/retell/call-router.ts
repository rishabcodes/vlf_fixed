import { getRetellService } from './index';
import { RetellAgentManager } from './agent-manager';
import { ghlService } from '@/services/gohighlevel';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

interface CallRoutingOptions {
  phoneNumber: string;
  practiceArea?: string;
  language?: 'en' | 'es';
  urgency?: 'low' | 'medium' | 'high' | 'emergency';
  sourceType?: 'website' | 'google' | 'referral' | 'existing_client';
  metadata?: Record<string, unknown>;
}

interface RouteDecision {
  agentId: string;
  agentName: string;
  practiceArea: string;
  language: string;
  priority: number;
  callbackRequired?: boolean;
  specialInstructions?: string;
}

interface ExistingContact {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tags: string[];
  customFields: Record<string, unknown>;
  preferredLanguage?: string;
  practiceArea?: string;
  lastCallDate?: string;
  callHistory: unknown[];
  clientStatus: string;
}

export class CallRoutingService {
  private static instance: CallRoutingService;

  static getInstance(): CallRoutingService {
    if (!CallRoutingService.instance) {
      CallRoutingService.instance = new CallRoutingService();
    }
    return CallRoutingService.instance;
  }

  // Main call routing logic
  async routeCall(options: CallRoutingOptions): Promise<RouteDecision> {
    try {
      logger.info('Starting call routing', {
        phoneNumber: options.phoneNumber,
        practiceArea: options.practiceArea,
        language: options.language,
      });

      // 1. Check if it's an existing contact
      const existingContact = await this.getExistingContactInfo(options.phoneNumber);

      // 2. Determine practice area
      const practiceArea = await this.determinePracticeArea(options, existingContact);

      // 3. Determine language preference
      const language = await this.determineLanguage(options, existingContact);

      // 4. Check for emergency or high-priority cases
      const urgency = await this.assessUrgency(options, existingContact);

      // 5. Select appropriate agent
      const agentId = await this.selectAgent(practiceArea, language);

      // 6. Check agent availability and business hours
      const routeDecision = await this.finalizeRouting({
        agentId,
        practiceArea,
        language,
        urgency,
        options,
        existingContact,
      });

      logger.info('Call routing completed', {
        phoneNumber: options.phoneNumber,
        agentId: routeDecision.agentId,
        practiceArea: routeDecision.practiceArea,
        priority: routeDecision.priority,
      });

      return routeDecision;
    } catch (error) {
      logger.error('Call routing failed:', errorToLogMeta(error));

      // Fallback to general agent
      const fallbackAgentId = await RetellAgentManager.getAgentForPracticeArea('general');

      if (!fallbackAgentId) {
        throw new Error('No agents available for routing');
      }

      return {
        agentId: fallbackAgentId,
        agentName: 'General Reception Assistant',
        practiceArea: 'general',
        language: options.language || 'en',
        priority: 1,
        callbackRequired: true,
        specialInstructions: 'Fallback routing due to system error',
      };
    }
  }

  // Get existing contact information from GHL
  private async getExistingContactInfo(phoneNumber: string): Promise<ExistingContact | null> {
    try {
      const contact = await ghlService.findContactByPhone(phoneNumber);

      if (contact) {
        return {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          tags: contact.tags || [],
          customFields: contact.customFields || {},
          preferredLanguage:
            typeof contact.customFields?.preferredLanguage === 'string'
              ? contact.customFields.preferredLanguage
              : undefined,
          practiceArea:
            typeof contact.customFields?.practiceArea === 'string'
              ? contact.customFields.practiceArea
              : undefined,
          lastCallDate:
            typeof contact.customFields?.lastCallDate === 'string'
              ? contact.customFields.lastCallDate
              : undefined,
          callHistory: Array.isArray(contact.customFields?.callHistory)
            ? contact.customFields.callHistory
            : [],
          clientStatus:
            typeof contact.customFields?.clientStatus === 'string'
              ? contact.customFields.clientStatus
              : 'prospect',
        };
      }

      return null;
    } catch (error) {
      logger.error('Failed to get existing contact info:', errorToLogMeta(error));
      return null;
    }
  }

  // Determine practice area based on various factors
  private async determinePracticeArea(
    options: CallRoutingOptions,
    existingContact: ExistingContact | null
  ): Promise<string> {
    // 1. Use explicit practice area if provided
    if (options.practiceArea) {
      return options.practiceArea;
    }

    // 2. Use existing contact's practice area
    if (existingContact?.practiceArea) {
      return existingContact.practiceArea;
    }

    // 3. Analyze tags for practice area hints
    if (existingContact?.tags) {
      const tags = existingContact.tags;

      if (tags.some((tag: string) => tag.includes('immigration') || tag.includes('visa'))) {
        return 'immigration';
      }
      if (tags.some((tag: string) => tag.includes('injury') || tag.includes('accident'))) {
        return 'personal_injury';
      }
      if (tags.some((tag: string) => tag.includes('criminal') || tag.includes('dui'))) {
        return 'criminal_defense';
      }
      if (tags.some((tag: string) => tag.includes('workers') || tag.includes('comp'))) {
        return 'workers_compensation';
      }
      if (tags.some((tag: string) => tag.includes('family') || tag.includes('divorce'))) {
        return 'family_law';
      }
    }

    // 4. Check for source-based routing
    if (options.sourceType === 'referral') {
      // Referrals often need general routing first
      return 'general';
    }

    // 5. Default to general for new contacts
    return 'general';
  }

  // Determine language preference
  private async determineLanguage(
    options: CallRoutingOptions,
    existingContact: ExistingContact | null
  ): Promise<'en' | 'es'> {
    // 1. Use explicit language if provided
    if (options.language) {
      return options.language;
    }

    // 2. Use existing contact's preference
    if (existingContact?.preferredLanguage) {
      return existingContact.preferredLanguage === 'es' ? 'es' : 'en';
    }

    // 3. Check tags for language hints
    if (existingContact?.tags) {
      const tags = existingContact.tags;
      if (tags.some((tag: string) => tag.includes('spanish') || tag.includes('español'))) {
        return 'es';
      }
    }

    // 4. Default to English
    return 'en';
  }

  // Assess urgency of the call
  private async assessUrgency(
    options: CallRoutingOptions,
    existingContact: ExistingContact | null
  ): Promise<'low' | 'medium' | 'high' | 'emergency'> {
    // 1. Use explicit urgency if provided
    if (options.urgency) {
      return options.urgency;
    }

    // 2. Check for existing client emergency
    if (existingContact?.clientStatus === 'active' && existingContact?.tags?.includes('urgent')) {
      return 'emergency';
    }

    // 3. Check for time-sensitive practice areas
    if (existingContact?.practiceArea === 'criminal_defense') {
      // Criminal cases often have urgent timelines
      return 'high';
    }

    // 4. Check call frequency (multiple calls in short time = higher urgency)
    if (existingContact?.lastCallDate) {
      const lastCall = new Date(existingContact.lastCallDate);
      const hoursSinceLastCall = (Date.now() - lastCall.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastCall < 1) {
        return 'high'; // Multiple calls within an hour
      }
      if (hoursSinceLastCall < 24) {
        return 'medium'; // Called yesterday
      }
    }

    // 5. Check business hours - after hours calls might be more urgent
    const now = new Date();
    const hour = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const isAfterHours = hour < 9 || hour > 17;

    if (isAfterHours || isWeekend) {
      return 'medium';
    }

    // 6. Default urgency
    return 'low';
  }

  // Select the best agent for the call
  private async selectAgent(practiceArea: string, language: 'en' | 'es'): Promise<string> {
    // For Spanish speakers, try Spanish-specific agents first
    if (language === 'es') {
      const spanishAgentId = await RetellAgentManager.getAgentForPracticeArea(`${practiceArea}_es`);
      if (spanishAgentId) {
        return spanishAgentId;
      }

      // Fallback to general Spanish agent
      const generalSpanishId = await RetellAgentManager.getAgentForPracticeArea('immigration_es');
      if (generalSpanishId) {
        return generalSpanishId;
      }
    }

    // Get practice area specific agent
    const practiceAgentId = await RetellAgentManager.getAgentForPracticeArea(practiceArea);
    if (practiceAgentId) {
      return practiceAgentId;
    }

    // Fallback to general agent
    const generalAgentId = await RetellAgentManager.getAgentForPracticeArea('general');
    if (!generalAgentId) {
      throw new Error('No agents available');
    }

    return generalAgentId;
  }

  // Finalize routing decision with business logic
  private async finalizeRouting(params: {
    agentId: string;
    practiceArea: string;
    language: 'en' | 'es';
    urgency: string;
    options: CallRoutingOptions;
    existingContact: ExistingContact | null;
  }): Promise<RouteDecision> {
    const { agentId, practiceArea, language, urgency, existingContact } = params;

    // Get agent information
    const retellService = getRetellService();
    const agent = await retellService.getAgent(agentId);

    if (!agent) {
      throw new Error('Selected agent not found');
    }

    // Calculate priority (higher number = higher priority)
    let priority = 1;

    switch (urgency) {
      case 'emergency':
        priority = 10;
        break;
      case 'high':
        priority = 7;
        break;
      case 'medium':
        priority = 4;
        break;
      case 'low':
        priority = 1;
        break;
    }

    // Boost priority for existing clients
    if (existingContact?.clientStatus === 'active') {
      priority += 3;
    }

    // Check if callback is required (e.g., complex cases, after hours)
    const callbackRequired = this.shouldRequireCallback(urgency, practiceArea, existingContact);

    // Generate special instructions
    const specialInstructions = this.generateSpecialInstructions({
      urgency,
      practiceArea,
      existingContact,
      language,
    });

    return {
      agentId,
      agentName: agent.agent_name,
      practiceArea,
      language,
      priority,
      callbackRequired,
      specialInstructions,
    };
  }

  // Determine if callback is required
  private shouldRequireCallback(
    urgency: string,
    practiceArea: string,
    existingContact: ExistingContact | null
  ): boolean {
    // Emergency cases always need callback
    if (urgency === 'emergency') {
      return true;
    }

    // Complex practice areas benefit from attorney callback
    if (['criminal_defense', 'immigration'].includes(practiceArea)) {
      return true;
    }

    // Existing clients with active cases need callback
    if (existingContact?.clientStatus === 'active') {
      return true;
    }

    return false;
  }

  // Generate special instructions for the agent
  private generateSpecialInstructions(params: {
    urgency: string;
    practiceArea: string;
    existingContact: ExistingContact | null;
    language: 'en' | 'es';
  }): string {
    const { urgency, practiceArea, existingContact, language } = params;
    const instructions: string[] = [];

    // Urgency instructions
    if (urgency === 'emergency') {
      instructions.push('EMERGENCY CALL - Prioritize immediate assistance');
    } else if (urgency === 'high') {
      instructions.push('HIGH PRIORITY - Respond promptly and professionally');
    }

    // Existing client instructions
    if (existingContact) {
      instructions.push(
        `Existing contact: ${existingContact.firstName} ${existingContact.lastName}`
      );

      if (existingContact.clientStatus === 'active') {
        instructions.push('ACTIVE CLIENT - Provide premium service');
      }

      if (existingContact.lastCallDate) {
        const daysSinceLastCall = Math.floor(
          (Date.now() - new Date(existingContact.lastCallDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        instructions.push(`Last contact: ${daysSinceLastCall} days ago`);
      }
    }

    // Language instructions
    if (language === 'es') {
      instructions.push('Spanish-speaking client - Conduct call in Spanish');
    }

    // Practice area specific instructions
    switch (practiceArea) {
      case 'criminal_defense':
        instructions.push(
          'Criminal case - Be sensitive about legal situation, emphasize confidentiality'
        );
        break;
      case 'immigration':
        instructions.push(
          'Immigration case - Be culturally sensitive, check documentation status carefully'
        );
        break;
      case 'personal_injury':
        instructions.push(
          'Personal injury - Ask about injuries and medical treatment, express sympathy'
        );
        break;
      case 'workers_compensation':
        instructions.push(
          'Workers comp - Ask about workplace injury details and employer information'
        );
        break;
    }

    return instructions.join('. ');
  }

  // Create outbound call with routing
  async createRoutedCall(options: CallRoutingOptions): Promise<{
    callId: string;
    routeDecision: RouteDecision;
  }> {
    try {
      // Route the call
      const routeDecision = await this.routeCall(options);

      // Create the call
      const retellService = getRetellService();
      const call = await retellService.createPhoneCall({
        agent_id: routeDecision.agentId,
        from_number: process.env.GHL_OUTBOUND_PHONE_NUMBER || '+18449673536',
        to_number: options.phoneNumber,
        metadata: {
          practiceArea: routeDecision.practiceArea,
          language: routeDecision.language,
          priority: routeDecision.priority,
          specialInstructions: routeDecision.specialInstructions,
          callbackRequired: routeDecision.callbackRequired,
          urgency: options.urgency,
          sourceType: options.sourceType,
          ...options.metadata,
        },
      });

      // Log the routing decision
      const prisma = getPrismaClient();
      await prisma.callRouting.create({
        data: {
          callId: call.call_id,
          phoneNumber: options.phoneNumber,
          agentId: routeDecision.agentId,
          practiceArea: routeDecision.practiceArea,
          language: routeDecision.language,
          priority: routeDecision.priority,
          urgency: options.urgency || 'low',
          routingReason: routeDecision.specialInstructions || 'Standard routing',
          metadata: JSON.parse(
            JSON.stringify({
              routeDecision,
              originalOptions: options,
            })
          ) as Prisma.InputJsonValue,
        },
      });

      // Update contact in GHL if exists
      const existingContact = await this.getExistingContactInfo(options.phoneNumber);
      if (existingContact) {
        await ghlService.updateContact(existingContact.id, {
          customFields: {
            ...existingContact.customFields,
            lastCallId: call.call_id,
            lastCallAgent: routeDecision.agentId,
            lastCallPracticeArea: routeDecision.practiceArea,
            lastCallPriority: routeDecision.priority,
          },
        });
      }

      logger.info('Routed call created successfully', {
        callId: call.call_id,
        phoneNumber: options.phoneNumber,
        agentId: routeDecision.agentId,
        priority: routeDecision.priority,
      });

      return {
        callId: call.call_id,
        routeDecision,
      };
    } catch (error) {
      logger.error('Failed to create routed call:', errorToLogMeta(error));
      throw error;
    }
  }

  // Handle inbound call routing
  async handleInboundCall(phoneNumber: string, metadata?: Record<string, unknown>) {
    try {
      // Auto-detect call characteristics for inbound calls
      const options: CallRoutingOptions = {
        phoneNumber,
        sourceType: 'website', // Assume website unless specified
        metadata: {
          direction: 'inbound',
          timestamp: new Date().toISOString(),
          ...metadata,
        },
      };

      return await this.createRoutedCall(options);
    } catch (error) {
      logger.error('Failed to handle inbound call:', errorToLogMeta(error));
      throw error;
    }
  }

  // Get routing analytics
  async getRoutingAnalytics(timeRange?: { start: Date; end: Date }) {
    try {
      const prisma = getPrismaClient();

      const where: { createdAt?: { gte: Date; lte: Date } } = {};
      if (timeRange) {
        where.createdAt = {
          gte: timeRange.start,
          lte: timeRange.end,
        };
      }

      const routings = await prisma.callRouting.findMany({
        where,
      });

      // Analyze routing patterns
      const analytics = {
        totalCalls: routings.length,
        practiceAreaDistribution: {} as Record<string, number>,
        languageDistribution: {} as Record<string, number>,
        urgencyDistribution: {} as Record<string, number>,
        agentUtilization: {} as Record<string, number>,
        avgPriority: 0,
      };

      let totalPriority = 0;

      routings.forEach(routing => {
        // Practice area distribution
        analytics.practiceAreaDistribution[routing.practiceArea] =
          (analytics.practiceAreaDistribution[routing.practiceArea] || 0) + 1;

        // Language distribution
        analytics.languageDistribution[routing.language] =
          (analytics.languageDistribution[routing.language] || 0) + 1;

        // Urgency distribution
        analytics.urgencyDistribution[routing.urgency] =
          (analytics.urgencyDistribution[routing.urgency] || 0) + 1;

        // Agent utilization
        analytics.agentUtilization[routing.agentId] =
          (analytics.agentUtilization[routing.agentId] || 0) + 1;

        totalPriority += routing.priority;
      });

      analytics.avgPriority = routings.length > 0 ? totalPriority / routings.length : 0;

      return analytics;
    } catch (error) {
      logger.error('Failed to get routing analytics:', errorToLogMeta(error));
      throw error;
    }
  }
}

// Export singleton instance
export const callRouter = CallRoutingService.getInstance();
