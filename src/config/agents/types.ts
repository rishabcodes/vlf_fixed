export enum AgentType {
  // Core Routing Agents
  CLASSIFICATION = 'classification',
  GENERAL_LEGAL = 'general_legal',
  
  // Immigration Law Agents
  REMOVAL_DEFENSE = 'removal_defense',
  BUSINESS_IMMIGRATION = 'business_immigration',
  AFFIRMATIVE_IMMIGRATION = 'affirmative_immigration',
  ASYLUM = 'asylum',
  U_VISA_VAWA = 'u_visa_vawa',

  // NC State Law Agents
  CRIMINAL_DEFENSE = 'criminal_defense',
  PERSONAL_INJURY = 'personal_injury',
  WORKERS_COMP = 'workers_comp',
  FAMILY_LAW = 'family_law',
  TRAFFIC_TICKETS = 'traffic_tickets',

  // Support Agents
  GENERAL_INTAKE = 'general_intake',
  SPANISH_LANGUAGE = 'spanish_language',
  EMERGENCY_AFTER_HOURS = 'emergency_after_hours',
  PAYMENT_BILLING = 'payment_billing',
  DOCUMENT_COLLECTION = 'document_collection',
  CASE_STATUS = 'case_status',

  // Business Agents
  BUSINESS_FORMATION = 'business_formation',
}

export interface AgentConfig {
  id: string;
  type: AgentType;
  name: string;
  description: string;
  language: 'en' | 'es' | 'both';
  availability: {
    days: string[];
    hours: {
      start: string;
      end: string;
    };
    timezone: string;
  };
  skills: string[];
  practiceAreas: string[];
  promptTemplate: string;
  knowledgeBase?: string;
  transferRules?: TransferRule[];
  webhookUrl?: string;
  retellConfig?: {
    agentId?: string;
    voiceId?: string;
    language?: string;
  };
}

export interface TransferRule {
  condition: string;
  targetAgent: AgentType;
  priority: number;
}

export interface AgentTrainingData {
  agentType: AgentType;
  scenarios: TrainingScenario[];
  knowledge: KnowledgeItem[];
  responses: ResponseTemplate[];
}

export interface TrainingScenario {
  id: string;
  description: string;
  userInput: string;
  expectedResponse: string;
  followUpQuestions: string[];
}

export interface KnowledgeItem {
  id: string;
  category: string;
  topic: string;
  content: string;
  relatedTopics: string[];
}

export interface ResponseTemplate {
  id: string;
  scenario: string;
  template: string;
  variables: string[];
}
