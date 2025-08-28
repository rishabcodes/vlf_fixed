import { AgentType } from '@/config/agents/types';
import { logger } from '@/lib/safe-logger';

export interface ClassificationContext {
  userInput: string;
  conversationHistory: string[];
  questionsAsked: number;
  emergencyDetected?: boolean;
  existingClient?: boolean;
  languagePreference?: 'en' | 'es';
  legalArea?: string;
  // Contact information collection
  contactName?: string;
  contactPhone?: string;
  contactInfoCollected?: boolean;
}

export class ClassificationHandler {
  private static instance: ClassificationHandler;
  private maxQuestions = 3;

  private constructor() {}

  static getInstance(): ClassificationHandler {
    if (!ClassificationHandler.instance) {
      ClassificationHandler.instance = new ClassificationHandler();
    }
    return ClassificationHandler.instance;
  }

  /**
   * Main classification method that determines routing based on user responses
   */
  async classifyAndRoute(
    context: ClassificationContext
  ): Promise<{ agent: AgentType; reasoning: string }> {
    const { userInput, questionsAsked } = context;
    const lowerInput = userInput.toLowerCase();

    // Question 1: Emergency Detection
    if (questionsAsked === 0) {
      return this.checkEmergency(lowerInput);
    }

    // Question 2: Existing Client Check
    if (questionsAsked === 1) {
      if (context.emergencyDetected === false) {
        return this.checkExistingClient(lowerInput);
      }
    }

    // Question 3: Legal Area Determination
    if (questionsAsked === 2) {
      if (!context.emergencyDetected && !context.existingClient) {
        return this.determineLegalArea(lowerInput, context);
      }
    }

    // Follow-up questions for specific areas
    if (questionsAsked === 3) {
      return this.handleFollowUp(lowerInput, context);
    }

    // Default fallback
    return {
      agent: AgentType.GENERAL_LEGAL,
      reasoning: 'Unable to determine specific need, routing to general legal counselor',
    };
  }

  private checkEmergency(input: string): { agent: AgentType; reasoning: string } {
    const emergencyKeywords = ['yes', 'detained', 'arrested', 'jail', 'ice', 'custody', 'court today', 'court tomorrow'];
    const injuryKeywords = ['injured', 'accident', 'hurt'];

    if (emergencyKeywords.some(keyword => input.includes(keyword))) {
      if (injuryKeywords.some(keyword => input.includes(keyword))) {
        return {
          agent: AgentType.PERSONAL_INJURY,
          reasoning: 'Emergency injury situation detected',
        };
      }
      return {
        agent: AgentType.EMERGENCY_AFTER_HOURS,
        reasoning: 'Emergency legal situation requiring immediate attention',
      };
    }

    // Not an emergency, continue classification
    return {
      agent: AgentType.CLASSIFICATION,
      reasoning: 'No emergency detected, continuing classification',
    };
  }

  private checkExistingClient(input: string): { agent: AgentType; reasoning: string } {
    const yesIndicators = ['yes', 'si', 'yeah', 'yep', 'existing', 'current'];
    
    if (yesIndicators.some(indicator => input.includes(indicator))) {
      return {
        agent: AgentType.CASE_STATUS,
        reasoning: 'Existing client needs case status update',
      };
    }

    // Not existing client, continue
    return {
      agent: AgentType.CLASSIFICATION,
      reasoning: 'New client, continuing classification',
    };
  }

  private determineLegalArea(
    input: string,
    context: ClassificationContext
  ): { agent: AgentType; reasoning: string } {
    // Check for number selections (1-8)
    const numberMatch = input.match(/^[1-8]$/);
    if (numberMatch) {
      return this.routeByNumber(parseInt(numberMatch[0]));
    }

    // Check for keyword-based routing
    const areaMap: Record<string, AgentType> = {
      'immigration': AgentType.CLASSIFICATION, // Needs follow-up
      'visa': AgentType.CLASSIFICATION, // Needs follow-up
      'criminal': AgentType.CRIMINAL_DEFENSE,
      'arrest': AgentType.CRIMINAL_DEFENSE,
      'dui': AgentType.CRIMINAL_DEFENSE,
      'accident': AgentType.CLASSIFICATION, // Needs follow-up for work vs regular
      'injury': AgentType.CLASSIFICATION, // Needs follow-up
      'divorce': AgentType.FAMILY_LAW,
      'custody': AgentType.FAMILY_LAW,
      'family': AgentType.FAMILY_LAW,
      'business': AgentType.BUSINESS_FORMATION,
      'llc': AgentType.BUSINESS_FORMATION,
      'traffic': AgentType.TRAFFIC_TICKETS,
      'ticket': AgentType.TRAFFIC_TICKETS,
      'billing': AgentType.PAYMENT_BILLING,
      'payment': AgentType.PAYMENT_BILLING,
      'document': AgentType.DOCUMENT_COLLECTION,
    };

    for (const [keyword, agent] of Object.entries(areaMap)) {
      if (input.includes(keyword)) {
        if (agent === AgentType.CLASSIFICATION) {
          // Needs follow-up question
          context.legalArea = keyword;
          return {
            agent: AgentType.CLASSIFICATION,
            reasoning: `${keyword} area detected, need follow-up question`,
          };
        }
        return {
          agent,
          reasoning: `Routing to ${agent} based on ${keyword} keyword`,
        };
      }
    }

    // Default to general legal
    return {
      agent: AgentType.GENERAL_LEGAL,
      reasoning: 'No specific area identified, routing to general legal',
    };
  }

  private routeByNumber(number: number): { agent: AgentType; reasoning: string } {
    const routes: Record<number, AgentType | 'followup'> = {
      1: 'followup', // Immigration - needs follow-up
      2: AgentType.CRIMINAL_DEFENSE,
      3: 'followup', // Injury - needs follow-up
      4: AgentType.FAMILY_LAW,
      5: AgentType.BUSINESS_FORMATION,
      6: AgentType.TRAFFIC_TICKETS,
      7: 'followup', // Billing/Documents - needs follow-up
      8: AgentType.GENERAL_LEGAL,
    };

    const route = routes[number];
    if (route === 'followup') {
      return {
        agent: AgentType.CLASSIFICATION,
        reasoning: `Option ${number} selected, needs follow-up question`,
      };
    }

    return {
      agent: route || AgentType.GENERAL_LEGAL,
      reasoning: `Direct routing based on option ${number}`,
    };
  }

  private handleFollowUp(
    input: string,
    context: ClassificationContext
  ): { agent: AgentType; reasoning: string } {
    const lowerInput = input.toLowerCase();

    // Immigration follow-up
    if (context.legalArea === 'immigration' || context.legalArea === 'visa') {
      if (lowerInput.includes('detention') || lowerInput.includes('deportation')) {
        return { agent: AgentType.REMOVAL_DEFENSE, reasoning: 'Detention/deportation case' };
      }
      if (lowerInput.includes('work') || lowerInput.includes('employment')) {
        return { agent: AgentType.BUSINESS_IMMIGRATION, reasoning: 'Work visa case' };
      }
      if (lowerInput.includes('family')) {
        return { agent: AgentType.AFFIRMATIVE_IMMIGRATION, reasoning: 'Family immigration case' };
      }
      if (lowerInput.includes('asylum') || lowerInput.includes('refugee')) {
        return { agent: AgentType.ASYLUM, reasoning: 'Asylum case' };
      }
    }

    // Injury follow-up
    if (context.legalArea === 'injury' || context.legalArea === 'accident') {
      if (lowerInput.includes('work') || lowerInput.includes('job')) {
        return { agent: AgentType.WORKERS_COMP, reasoning: 'Workplace injury' };
      }
      return { agent: AgentType.PERSONAL_INJURY, reasoning: 'Non-workplace injury' };
    }

    // Billing/Documents follow-up
    if (lowerInput.includes('bill') || lowerInput.includes('pay')) {
      return { agent: AgentType.PAYMENT_BILLING, reasoning: 'Billing inquiry' };
    }
    if (lowerInput.includes('document') || lowerInput.includes('paper')) {
      return { agent: AgentType.DOCUMENT_COLLECTION, reasoning: 'Document assistance' };
    }

    // Default
    return {
      agent: AgentType.GENERAL_LEGAL,
      reasoning: 'Unable to determine specific need from follow-up',
    };
  }

  /**
   * Get the next question to ask based on context
   */
  getNextQuestion(context: ClassificationContext): string | null {
    const { questionsAsked, emergencyDetected, existingClient, legalArea, contactName, contactPhone, contactInfoCollected } = context;

    // First collect contact information
    if (!contactName && questionsAsked === 0) {
      return "Welcome to Vasquez Law Firm! To better assist you, may I have your name?";
    }

    if (contactName && !contactPhone && questionsAsked === 1) {
      return `Thank you, ${contactName}. What's the best phone number to reach you at?`;
    }

    // After contact info is collected, proceed with classification
    const adjustedQuestionCount = contactInfoCollected ? questionsAsked - 2 : questionsAsked;

    if (adjustedQuestionCount === 0 && contactInfoCollected) {
      return "Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)";
    }

    if (adjustedQuestionCount === 1 && !emergencyDetected && contactInfoCollected) {
      return "Are you an existing client with an open case?";
    }

    if (adjustedQuestionCount === 2 && !emergencyDetected && !existingClient && contactInfoCollected) {
      return `Which best describes your legal need?
1. Immigration/Visa/Citizenship
2. Criminal charges/arrest/DUI
3. Accident/injury/insurance
4. Divorce/custody/family matter
5. Business/LLC/contracts
6. Traffic ticket/violation
7. Billing or document help
8. Other/Not sure`;
    }

    if (adjustedQuestionCount === 3 && contactInfoCollected) {
      // Follow-up questions based on area
      if (legalArea === 'immigration' || legalArea === '1') {
        return "Is this about: detention/deportation, work visa, family petition, or asylum?";
      }
      if (legalArea === 'injury' || legalArea === 'accident' || legalArea === '3') {
        return "Did this happen at work?";
      }
      if (legalArea === '7') {
        return "Do you need help with billing/payment or documents?";
      }
    }

    return null; // No more questions
  }
}