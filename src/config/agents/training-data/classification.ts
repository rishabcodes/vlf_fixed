import { AgentTrainingData, AgentType } from '../types';

export const classificationTraining: AgentTrainingData = {
  agentType: AgentType.CLASSIFICATION,

  scenarios: [
    {
      id: 'emergency-detention',
      description: 'User with detained family member',
      userInput: 'My husband was taken by ICE this morning',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [],
      metadata: {
        expectedRoute: AgentType.EMERGENCY_AFTER_HOURS,
        questionsNeeded: 1,
      },
    },
    {
      id: 'non-emergency-divorce',
      description: 'Standard divorce inquiry',
      userInput: 'I want to file for divorce',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [
        'Are you an existing client with an open case?',
        'Which best describes your legal need? [list of options]',
      ],
      metadata: {
        expectedRoute: AgentType.FAMILY_LAW,
        questionsNeeded: 3,
      },
    },
    {
      id: 'unclear-general',
      description: 'Vague initial request',
      userInput: 'I need legal help',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [
        'Are you an existing client with an open case?',
        'Which best describes your legal need? [list of options]',
      ],
      metadata: {
        expectedRoute: AgentType.GENERAL_LEGAL,
        questionsNeeded: 3,
      },
    },
    {
      id: 'work-injury-classification',
      description: 'Injury needing classification',
      userInput: 'I got hurt and need a lawyer',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [
        'Are you an existing client with an open case?',
        'Which best describes your legal need? [user selects 3 for injury]',
        'Did this happen at work?',
      ],
      metadata: {
        expectedRoute: AgentType.WORKERS_COMP,
        questionsNeeded: 4,
      },
    },
    {
      id: 'immigration-subcategory',
      description: 'Immigration needing subcategorization',
      userInput: 'I need help with immigration',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [
        'Are you an existing client with an open case?',
        'Which best describes your legal need? [user selects 1 for immigration]',
        'Is this about: detention/deportation, work visa, family petition, or asylum?',
      ],
      metadata: {
        expectedRoute: AgentType.BUSINESS_IMMIGRATION, // if work visa selected
        questionsNeeded: 4,
      },
    },
    {
      id: 'existing-client',
      description: 'Existing client checking status',
      userInput: 'I want to check on my case',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [
        'Are you an existing client with an open case?',
      ],
      metadata: {
        expectedRoute: AgentType.CASE_STATUS,
        questionsNeeded: 2,
      },
    },
    {
      id: 'spanish-preference',
      description: 'User preferring Spanish',
      userInput: 'Necesito ayuda legal',
      expectedResponse: '¿Es esta una emergencia o situación urgente? (detenido, arrestado, corte en 48 horas, o peligro inmediato)',
      followUpQuestions: [],
      metadata: {
        expectedRoute: AgentType.SPANISH_LANGUAGE,
        questionsNeeded: 1,
        languageDetected: 'es',
      },
    },
    {
      id: 'billing-inquiry',
      description: 'Payment or billing question',
      userInput: 'I have a question about my bill',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [
        'Are you an existing client with an open case?',
        'Which best describes your legal need? [user selects 7 for billing]',
      ],
      metadata: {
        expectedRoute: AgentType.PAYMENT_BILLING,
        questionsNeeded: 3,
      },
    },
    {
      id: 'car-accident-emergency',
      description: 'Recent car accident with injuries',
      userInput: 'I was just in a bad car accident and am at the hospital',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [],
      metadata: {
        expectedRoute: AgentType.PERSONAL_INJURY,
        questionsNeeded: 1,
      },
    },
    {
      id: 'dui-arrest',
      description: 'Criminal charge inquiry',
      userInput: 'I was charged with DUI last night',
      expectedResponse: 'Is this an emergency or urgent situation? (detained, arrested, court within 48 hours, or immediate danger)',
      followUpQuestions: [
        'Are you an existing client with an open case?',
        'Which best describes your legal need? [user selects 2 for criminal]',
      ],
      metadata: {
        expectedRoute: AgentType.CRIMINAL_DEFENSE,
        questionsNeeded: 3,
      },
    },
  ],

  expectedBehaviors: [
    'Always ask emergency question first',
    'Never skip to legal area without checking emergency and existing client status',
    'Maximum 3 main questions plus 1 follow-up if needed',
    'Route immediately on emergency detection',
    'Use numbered list for legal area selection',
    'Detect Spanish and adjust language accordingly',
    'Never provide legal advice during classification',
    'Pass full context to receiving agent',
  ],

  errorScenarios: [
    {
      input: 'User provides multiple issues at once',
      expectedHandling: 'Focus on most urgent issue first, note others for receiving agent',
    },
    {
      input: 'User refuses to answer classification questions',
      expectedHandling: 'Route to General Legal Specialist with partial information',
    },
    {
      input: 'User changes topic mid-classification',
      expectedHandling: 'Acknowledge change and restart classification if needed',
    },
  ],
};