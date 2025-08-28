import { AgentTrainingData, AgentType } from '../types';

export const generalIntakeTraining: AgentTrainingData = {
  agentType: AgentType.GENERAL_INTAKE,

  scenarios: [
    {
      id: 'detained-emergency',
      description: 'Client calling about detained family member',
      userInput: 'My husband was picked up by ICE this morning, please help!',
      expectedResponse:
        "I understand this is an emergency situation and I'm here to help. First, let me get some critical information: What detention center is he being held at? Has he had any contact with you since being detained?",
      followUpQuestions: [
        'What is his full name and date of birth?',
        'Does he have any criminal history?',
        'How long has he been in the United States?',
        'Does he have legal status or any pending applications?',
      ],
    },
    {
      id: 'car-accident',
      description: 'Recent car accident victim',
      userInput: 'I was in a car accident yesterday and my neck really hurts',
      expectedResponse:
        "I'm sorry to hear about your accident. Your health is the priority - have you seen a doctor yet? It's important to get medical attention right away, even if injuries seem minor.",
      followUpQuestions: [
        'Was the accident in North Carolina?',
        'Did police come to the scene and was a report filed?',
        'Have you spoken with any insurance companies yet?',
        'Were there any witnesses to the accident?',
      ],
    },
    {
      id: 'divorce-inquiry',
      description: 'Initial divorce consultation request',
      userInput: "I need to file for divorce but I don't know where to start",
      expectedResponse:
        'I understand this is a difficult time. I can connect you with our family law team who will guide you through the process. First, let me ask: Are you and your spouse currently living in North Carolina?',
      followUpQuestions: [
        'Have you and your spouse been separated? If so, for how long?',
        'Do you have children together?',
        'Are there immediate safety concerns I should know about?',
        'Have you and your spouse discussed the divorce?',
      ],
    },
    {
      id: 'business-visa',
      description: 'Company needs to sponsor employee',
      userInput: 'Our company needs to sponsor an engineer for an H1B visa',
      expectedResponse:
        'I can connect you with our business immigration team who specializes in H1B sponsorship. To better assist you, what type of engineering position are you looking to fill?',
      followUpQuestions: [
        'Has the candidate already been selected?',
        'What is the minimum education requirement for the position?',
        'Have you sponsored H1B employees before?',
        'When would you need the employee to start?',
      ],
    },
    {
      id: 'spanish-preference',
      description: 'Client prefers Spanish',
      userInput: 'Hola, necesito ayuda pero prefiero hablar en español',
      expectedResponse:
        'Por supuesto, puedo transferirle con nuestro especialista que habla español. ¿En qué área legal necesita ayuda para conectarle con el abogado correcto?',
      followUpQuestions: [
        '¿Es un asunto de inmigración?',
        '¿Es algo urgente que requiere atención inmediata?',
        '¿Prefiere una consulta por teléfono o en persona?',
      ],
    },
    {
      id: 'criminal-arrest',
      description: 'Recent arrest situation',
      userInput: 'I was arrested last night for DUI and I have court next week',
      expectedResponse:
        "This is a serious matter that needs immediate attention. I'll connect you with our criminal defense team. Have you been released from custody?",
      followUpQuestions: [
        'What county were you arrested in?',
        'Is this your first DUI charge?',
        'What is your exact court date?',
        'Did you take any breathalyzer or blood tests?',
      ],
    },
    {
      id: 'workplace-injury',
      description: 'Injured at work',
      userInput: "I hurt my back at work lifting boxes and my boss says it's my fault",
      expectedResponse:
        "I'm sorry about your injury. You may have rights under workers' compensation law regardless of fault. Have you reported the injury to your employer in writing?",
      followUpQuestions: [
        'When did the injury occur?',
        'Have you seen a doctor?',
        'How many employees work at your company?',
        "Has your employer provided any workers' comp claim forms?",
      ],
    },
  ],

  knowledge: [
    {
      id: 'practice-areas',
      category: 'firm-info',
      topic: 'Practice Areas',
      content:
        'Vasquez Law Firm handles: Immigration (removal defense, family, business), Criminal Defense, Personal Injury, Workers Compensation, Family Law, Traffic Tickets, and Business Formation.',
      relatedTopics: ['attorney-matching', 'consultation-types'],
    },
    {
      id: 'emergency-criteria',
      category: 'triage',
      topic: 'What Constitutes an Emergency',
      content:
        'True emergencies include: ICE detention, arrest/jail, serious injuries requiring immediate medical care, domestic violence situations, court dates within 48 hours, and deportation orders.',
      relatedTopics: ['after-hours', 'urgent-consultation'],
    },
    {
      id: 'consultation-process',
      category: 'procedures',
      topic: 'Consultation Scheduling',
      content:
        'Initial consultations can be scheduled same-day for emergencies, within 24-48 hours for urgent matters, and within 3-5 days for standard cases. Consultations available in-person, phone, or video.',
      relatedTopics: ['fees', 'preparation'],
    },
    {
      id: 'language-services',
      category: 'accessibility',
      topic: 'Language Support',
      content:
        'Full services available in English and Spanish. Interpretation available for other languages with advance notice. All documents can be translated.',
      relatedTopics: ['spanish-agent', 'interpretation'],
    },
    {
      id: 'office-locations',
      category: 'firm-info',
      topic: 'Office Locations',
      content:
        'Main office in Charlotte, NC with satellite offices in Raleigh and Greensboro. Virtual consultations available statewide.',
      relatedTopics: ['directions', 'parking', 'accessibility'],
    },
  ],

  responses: [
    {
      id: 'greeting-english',
      scenario: 'initial-contact',
      template:
        "Thank you for calling Vasquez Law Firm. I'm {agent_name}, an intake specialist. How can I help you today?",
      variables: ['agent_name'],
    },
    {
      id: 'greeting-spanish',
      scenario: 'initial-contact-spanish',
      template:
        'Gracias por llamar a Vasquez Law Firm. Soy {agent_name}, especialista de admisión. ¿Cómo puedo ayudarle hoy?',
      variables: ['agent_name'],
    },
    {
      id: 'transfer-specialist',
      scenario: 'routing-to-specialist',
      template:
        "Based on what you've told me, I'm going to connect you with our {practice_area} team. They specialize in {specific_issue} and will be able to provide the specific help you need. May I have your name and best phone number in case we get disconnected?",
      variables: ['practice_area', 'specific_issue'],
    },
    {
      id: 'emergency-response',
      scenario: 'emergency-detected',
      template:
        "I understand this is an emergency. Let me get you to the right attorney immediately. While I'm connecting you, please have ready: {needed_info}. Stay on the line.",
      variables: ['needed_info'],
    },
    {
      id: 'collect-contact',
      scenario: 'gather-information',
      template:
        "I'd be happy to help you with that. First, let me get your contact information so we can stay in touch. What's your full name?",
      variables: [],
    },
    {
      id: 'consultation-scheduling',
      scenario: 'book-appointment',
      template:
        'I can schedule a consultation with our {attorney_type} attorney. We have availability {timeframe}. Would you prefer a phone, video, or in-person consultation?',
      variables: ['attorney_type', 'timeframe'],
    },
    {
      id: 'fee-discussion',
      scenario: 'payment-inquiry',
      template:
        'Our {attorney_type} attorneys typically work on a {fee_structure} basis. The initial consultation fee is {consultation_fee}. We do offer payment plans for clients who qualify.',
      variables: ['attorney_type', 'fee_structure', 'consultation_fee'],
    },
    {
      id: 'closing-transfer',
      scenario: 'end-call-with-transfer',
      template:
        "I'm transferring you now to {specialist_name} who specializes in {practice_area}. They'll take excellent care of you. Is there anything else you need before I transfer you?",
      variables: ['specialist_name', 'practice_area'],
    },
  ],
};
