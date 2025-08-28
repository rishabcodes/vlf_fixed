/**
 * Dynamic Legal Chatbot with Embedded Knowledge Base
 * All legal questions and NC-specific requirements preserved
 */

import { NextRequest, NextResponse } from 'next/server';
import { apiLogger as logger } from '@/lib/safe-logger';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Embedded Legal Knowledge Base (from legal-agents-context.md)
const LEGAL_KNOWLEDGE = {
  classification: {
    emergency_keywords: ['detained', 'ICE', 'arrest', 'jail', 'custody', 'court tomorrow', 'court today', 'deadline today', 'emergency', 'urgent', 'immediate', 'dying', 'hospital', 'serious injury', 'domestic violence', 'abuse', 'danger'],
    legal_areas: {
      immigration: ['visa', 'green card', 'citizenship', 'deportation', 'ICE', 'asylum', 'immigration', 'USCIS', 'detained', 'removal', 'naturalization', 'work permit', 'H1B', 'L1', 'status'],
      criminal: ['arrest', 'charged', 'criminal', 'DUI', 'DWI', 'court', 'bail', 'probation', 'expungement', 'police', 'jail', 'felony', 'misdemeanor'],
      personal_injury: ['accident', 'injury', 'injured', 'insurance', 'crash', 'slip', 'fall', 'medical', 'hurt', 'pain', 'hospital', 'doctor', 'car accident'],
      workers_comp: ['work injury', 'workplace accident', 'workers compensation', 'hurt at work', 'job injury', 'injured on the job'],
      family_law: ['divorce', 'custody', 'child support', 'alimony', 'separation', 'marriage', 'domestic', 'family court', 'visitation'],
      business: ['business', 'LLC', 'contract', 'company', 'incorporation', 'partnership', 'trademark', 'employment'],
      traffic: ['ticket', 'speeding', 'traffic violation', 'license suspension', 'driving', 'citation']
    }
  },
  questions: {
    initial: [
      "Hello! I'm here to help connect you with the right legal specialist at Vasquez Law Firm. May I have your name?",
      "Thank you, {name}. Could you please provide your phone number so we can reach you if needed?",
      "Thank you, {name}. Before we continue, I want to let you know that this does not constitute legal advice or create an attorney-client relationship. Now, I'd like to understand your situation better so I can help. What brings you to us today?"
    ],
    immigration: {
      emergency: [
        "Is the person detained? Which detention center?",
        "Do you have an A-Number (Alien Registration Number)?",
        "Do you have a Notice to Appear (NTA)?",
        "When is the court hearing?",
        "Have there been any criminal convictions?",
        "When did you enter the US?",
        "What is your current immigration status?"
      ],
      general: [
        "What type of immigration matter do you need help with?",
        "What is your current visa status?",
        "How long have you been in the United States?",
        "Do you have any family members who are US citizens or permanent residents?",
        "Have you ever filed any immigration applications before?"
      ],
      asylum: [
        "What country are you from?",
        "Why do you fear returning to your country?",
        "Have you suffered persecution based on race, religion, nationality, political opinion, or membership in a particular social group?",
        "When did you arrive in the United States? (Important: There's a one-year deadline to file for asylum)",
        "Do you have evidence to support your asylum claim?"
      ]
    },
    family_law: {
      nc_specific: [
        "Have you and your spouse already separated? (In NC, you need 1 year of separation for divorce)",
        "When did you separate?",
        "Do you have any children together?",
        "How many children and what are their ages?",
        "Do you own a home together?",
        "Are there retirement accounts or other significant assets?",
        "Has there been any domestic violence?"
      ]
    },
    criminal: {
      urgent: [
        "What are you charged with?",
        "Are you currently in custody or have you been released?",
        "Has bail been set? If so, what is the amount?",
        "When is your court date?",
        "Is this your first offense or do you have a prior record?",
        "Have you spoken to the police? (Remember: You have the right to remain silent)"
      ]
    },
    personal_injury: {
      nc_contributory: [
        "When and where did the accident occur?",
        "Have you received medical treatment? Are you still treating?",
        "Was a police report filed?",
        "Important: North Carolina has contributory negligence - if you're even 1% at fault, it could affect your case. Did the other party claim you were at fault in any way?",
        "Have you spoken to any insurance companies?",
        "Are there any witnesses?",
        "Are you currently missing work due to your injuries?"
      ]
    },
    workers_comp: {
      nc_requirements: [
        "Were you injured while performing work duties?",
        "Does your employer have 3 or more employees? (NC requirement)",
        "Have you reported the injury to your employer within 30 days?",
        "Are you treating with a doctor approved by your employer's insurance?",
        "Are you currently out of work or on light duty?",
        "When did the injury occur?"
      ]
    }
  },
  nc_rules: {
    family_law: [
      "1 year separation required for divorce with separate residences",
      "Child support follows NC guidelines based on income",
      "Custody based on 'best interests of the child' standard",
      "Equitable distribution - fair division, not necessarily 50/50",
      "Alimony based on dependency and supporting spouse ability"
    ],
    personal_injury: [
      "CONTRIBUTORY NEGLIGENCE: If you're even 1% at fault, you cannot recover damages",
      "This is a harsh rule - only a few states have it",
      "Exceptions: Last clear chance doctrine, gross negligence"
    ],
    workers_comp: [
      "Employer must have 3+ employees",
      "30-day written notice requirement",
      "2-year statute of limitations",
      "Benefits: Medical treatment, 2/3 wages for total disability, permanent partial disability, vocational rehabilitation"
    ]
  },
  emergency_protocol: {
    detention: "Don't sign anything without an attorney. Call our 24/7 emergency line: 1-844-YO-PELEO (1-844-967-3536)",
    court_deadline: "NEVER miss a court date. Missing court can result in deportation or arrest warrants.",
    injury: "Seek immediate medical treatment. Document everything. Don't give statements to insurance companies."
  }
};

// Enhanced pattern-based classifier with natural language understanding
function classifyLegalArea(message: string): { area: string; confidence: number; isEmergency: boolean } {
  const lowerMessage = message.toLowerCase();
  
  // Check for emergencies first
  const isEmergency = LEGAL_KNOWLEDGE.classification.emergency_keywords.some(keyword => 
    lowerMessage.includes(keyword)
  );
  
  // Handle common misspellings
  const normalizedMessage = lowerMessage
    .replace(/divorse|divrce|divroce/g, 'divorce')
    .replace(/custady|custdoy/g, 'custody')
    .replace(/injurd|injered/g, 'injured')
    .replace(/accidant|acident/g, 'accident')
    .replace(/arested|aressted/g, 'arrested');
  
  // Natural language patterns for each legal area
  const naturalPatterns = {
    family_law: [
      /wife.{0,10}(left|leaving|packed|moved out)/,
      /husband.{0,10}(left|leaving|cheating|affair)/,
      /separated.{0,10}(from|with).{0,10}(spouse|wife|husband)/,
      /(spouse|partner).{0,10}(left|leaving|moved)/,
      /packed.{0,10}bags/,
      /moved.{0,10}out/,
      /wants?.{0,10}divorce/,
      /child.{0,10}(custody|support|visitation)/,
      /seeing someone else/,
      /found out.{0,10}(cheating|affair)/,
      /go our separate ways/
    ],
    personal_injury: [
      /(car|vehicle|truck).{0,10}(hit|struck|crashed)/,
      /hit.{0,10}(me|my car|from behind)/,
      /rear.?ended/,
      /slip(ped)?.{0,10}(and)?.{0,10}(fell|fall)/,
      /(dog|animal).{0,10}(bit|attacked)/,
      /accident.{0,10}(yesterday|today|last)/,
      /insurance.{0,10}(company|claim)/,
      /red light.{0,10}hit/,
      /grocery store.{0,10}(fell|hurt)/,
      /wet floor/
    ],
    workers_comp: [
      /hurt.{0,10}(at|while).{0,10}work/,
      /injured.{0,10}(at|on).{0,10}(job|work)/,
      /work(place)?.{0,10}(injury|accident)/,
      /lifting.{0,10}(boxes|heavy).{0,10}(at|work|warehouse)/,
      /fell.{0,10}(off|from).{0,10}ladder/,
      /warehouse.{0,10}(hurt|injured|back)/,
      /construction.{0,10}(site|accident)/,
      /repetitive.{0,10}(stress|strain)/,
      /carpal tunnel/,
      /back.{0,10}(hurt|pain|lifting).{0,10}(work|warehouse|boxes)/,
      /typing.{0,10}all day/,
      /hands?.{0,10}hurt.{0,10}(typing|work)/
    ],
    criminal: [
      /pulled.{0,10}over.{0,10}(drunk|DUI|drinking|said)/,
      /they said.{0,10}(I was drunk|drunk|stole)/,
      /arrested.{0,10}(me|last night)/,
      /police.{0,10}(stopped|arrested)/,
      /got into.{0,10}fight/,
      /(store|security).{0,10}(stopped|said).{0,10}(stole|mistake)/,
      /security.{0,10}stopped.{0,10}me/,
      /said.{0,10}stole.{0,10}(something|mistake)/,
      /bail.{0,10}(set|posted)/,
      /court date.{0,10}weeks?/,
      /first.{0,10}(offense|arrest)/
    ],
    immigration: [
      /they took.{0,10}(husband|wife|family|him|her)/,
      /took.{0,10}(my|him|her).{0,10}(husband|wife|morning|work)/,
      /ICE.{0,10}(took|detained)/,
      /can't go back.{0,10}country/,
      /visa.{0,10}(expired|expiring)/,
      /work.{0,10}authorization/,
      /company.{0,10}can't.{0,10}extend/,
      /green card.{0,10}(process|application)/,
      /asylum/,
      /deportation/,
      /crossing.{0,10}border/
    ],
    traffic: [
      /(cop|officer|police).{0,10}gave.{0,10}(me|tickets)/,
      /gave me.{0,10}(tickets?|citation)/,
      /speeding.{0,10}(ticket|citation)/,
      /pulled over.{0,10}(speeding|fast)/,
      /points.{0,10}license/,
      /red light.{0,10}(camera|ticket)/,
      /school zone/,
      /expired.{0,10}registration/,
      /multiple.{0,10}tickets/,
      /(three|multiple|several).{0,10}(tickets|citations)/,
      /traffic.{0,10}(stop|violation)/
    ],
    business: [
      /business partner.{0,10}(pushing|forcing)/,
      /push(ing)? me out.{0,10}company/,
      /won't pay.{0,10}(work|job|invoice)/,
      /employee.{0,10}(stealing|taking).{0,10}clients/,
      /partnership.{0,10}dispute/,
      /contract.{0,10}(dispute|breach)/,
      /non.?compete/,
      /clients?.{0,10}(stealing|poaching)/,
      /built.{0,10}together/
    ]
  };
  
  // Score each legal area based on both keywords and natural patterns
  const scores: Record<string, number> = {};
  
  // First, check keyword matches
  for (const [area, keywords] of Object.entries(LEGAL_KNOWLEDGE.classification.legal_areas)) {
    scores[area] = keywords.filter(keyword => normalizedMessage.includes(keyword)).length * 2;
  }
  
  // Then check natural language patterns (weighted higher)
  for (const [area, patterns] of Object.entries(naturalPatterns)) {
    const patternMatches = patterns.filter(pattern => pattern.test(normalizedMessage)).length;
    scores[area] = (scores[area] || 0) + (patternMatches * 5); // Weight patterns higher
  }
  
  // Context-based scoring adjustments
  // Family law context
  if ((normalizedMessage.includes('wife') || normalizedMessage.includes('husband') || 
       normalizedMessage.includes('spouse') || normalizedMessage.includes('partner')) &&
      (normalizedMessage.includes('left') || normalizedMessage.includes('leaving') || 
       normalizedMessage.includes('moved') || normalizedMessage.includes('packed'))) {
    scores.family_law = (scores.family_law || 0) + 10;
  }
  
  // Personal injury context
  if ((normalizedMessage.includes('hit') || normalizedMessage.includes('accident') || 
       normalizedMessage.includes('hurt') || normalizedMessage.includes('injured')) &&
      !normalizedMessage.includes('work')) {
    scores.personal_injury = (scores.personal_injury || 0) + 5;
  }
  
  // Workers comp context - prioritize over personal injury if "work" is mentioned
  if ((normalizedMessage.includes('work') || normalizedMessage.includes('job') || 
       normalizedMessage.includes('workplace')) &&
      (normalizedMessage.includes('hurt') || normalizedMessage.includes('injured') || 
       normalizedMessage.includes('accident'))) {
    scores.workers_comp = (scores.workers_comp || 0) + 10;
    scores.personal_injury = Math.max(0, (scores.personal_injury || 0) - 5); // Reduce PI score
  }
  
  // Find the best match
  const bestMatch = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b, ['general', 0]);
  const confidence = bestMatch[1] > 0 ? Math.min(bestMatch[1] * 10, 90) : 0;
  
  // Default to general legal if no strong match
  const area = confidence > 20 ? bestMatch[0] : 'general';
  
  return {
    area,
    confidence,
    isEmergency
  };
}

// Build dynamic system prompt based on legal area
function buildSystemPrompt(legalArea: string, isEmergency: boolean): string {
  let prompt = `You are a helpful legal intake specialist for Vasquez Law Firm. You are warm, empathetic, and professional.

CRITICAL CONTACT COLLECTION (MUST DO FIRST IF NOT PROVIDED):
If the user hasn't provided their name and phone yet, follow this flow:
1. First message: Greet and ask for their name
2. After getting name: Ask for their phone number
3. After getting phone: Provide legal disclaimer and then help with their issue
4. If they refuse contact info: Respect their choice but explain we can better assist with it

Example flow:
- "Hello! I'm here to help connect you with the right legal specialist at Vasquez Law Firm. May I have your name?"
- "Thank you, [name]. Could you please provide your phone number so we can reach you if needed?"
- "Thank you. Before we continue, I want to let you know that this does not constitute legal advice or create an attorney-client relationship. Now, what brings you to us today?"

CRITICAL RULES:
- Ask only ONE question at a time and wait for the response
- Be understanding if users don't answer directly - gently guide them
- Handle typos and misspellings intelligently
- Never use em dashes (—), only regular dashes (-)
- Show genuine concern while maintaining professional boundaries
- NEVER guarantee case outcomes or provide specific legal advice

`;

  if (isEmergency) {
    prompt += `EMERGENCY DETECTED! Priority response required.
${LEGAL_KNOWLEDGE.emergency_protocol.detention}
${LEGAL_KNOWLEDGE.emergency_protocol.court_deadline}

`;
  }

  // Add area-specific knowledge
  if (legalArea === 'immigration') {
    prompt += `IMMIGRATION SPECIALIST MODE:
Key Questions to Ask (one at a time):
${LEGAL_KNOWLEDGE.questions.immigration.emergency.join('\n')}

Remember:
- Detention cases are highest priority
- Court dates are critical - missing them can result in deportation
- Be compassionate but realistic
- Document A-numbers and detention centers carefully
`;
  } else if (legalArea === 'family_law') {
    prompt += `FAMILY LAW SPECIALIST MODE (North Carolina):
Understanding Tone: "I understand this must be a very difficult time for you."

Key Questions (ask one at a time):
${LEGAL_KNOWLEDGE.questions.family_law.nc_specific.join('\n')}

NC Specific Rules You Must Mention:
${LEGAL_KNOWLEDGE.nc_rules.family_law.join('\n')}
`;
  } else if (legalArea === 'personal_injury') {
    prompt += `PERSONAL INJURY SPECIALIST MODE (North Carolina):
Critical NC Rule - CONTRIBUTORY NEGLIGENCE:
${LEGAL_KNOWLEDGE.nc_rules.personal_injury.join('\n')}

Key Questions (ask one at a time):
${LEGAL_KNOWLEDGE.questions.personal_injury.nc_contributory.join('\n')}

Always advise: Seek medical treatment, document everything, don't talk to other insurance companies.
`;
  } else if (legalArea === 'criminal') {
    prompt += `CRIMINAL DEFENSE SPECIALIST MODE:
Key Questions (ask one at a time):
${LEGAL_KNOWLEDGE.questions.criminal.urgent.join('\n')}

Critical Instructions:
- NEVER advise to talk to police without attorney
- Emphasize right to remain silent
- Be supportive but realistic about outcomes
`;
  } else if (legalArea === 'workers_comp') {
    prompt += `WORKERS COMPENSATION SPECIALIST MODE (North Carolina):
NC Requirements:
${LEGAL_KNOWLEDGE.nc_rules.workers_comp.join('\n')}

Key Questions (ask one at a time):
${LEGAL_KNOWLEDGE.questions.workers_comp.nc_requirements.join('\n')}
`;
  } else {
    prompt += `GENERAL LEGAL ASSISTANCE MODE:
Start with understanding their situation, then guide them appropriately.
Focus on:
1. Understanding their legal need
2. Collecting contact information
3. Identifying any urgency
4. Scheduling appropriate consultation
`;
  }

  prompt += `

CONVERSATION STYLE:
- Be naturally conversational, not robotic
- Acknowledge when users are frustrated or confused  
- If they make spelling mistakes or typos, understand their intent
- If they don't answer a question directly, gently redirect
- Show empathy: "I understand", "I can see why that's concerning", "Let me help you with that"

Emergency Contact: 1-844-YO-PELEO (1-844-967-3536) for urgent matters.`;

  return prompt;
}

// Context for conversation
interface ConversationContext {
  sessionId: string;
  userId?: string;
  language: 'en' | 'es';
  previousAgent?: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    agent?: string;
    timestamp?: Date;
  }>;
  metadata?: Record<string, any>;
  // Contact information
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  ghlContactId?: string;
  conversationStartTime?: Date;
}

// Store active conversations (in production, use Redis or database)
const conversations = new Map<string, ConversationContext>();

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, userId, language = 'en' } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    // Classify the legal area based on the message
    classification = classifyLegalArea(message);
    
    // Build dynamic system prompt
    const systemPrompt = buildSystemPrompt(classification.area, classification.isEmergency);
    
    // Prepare messages for GPT
    const messages: any[] = [
      { role: 'system', content: systemPrompt }
    ];
    
    // Add conversation history if available
    if (conversationHistory.length > 0) {
      // Keep last 10 messages for context
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);
    }
    
    // Add current message
    messages.push({ role: 'user', content: message });
    
    // Dynamic model selection based on query complexity
    let modelToUse = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    let maxTokens = 4000; // Optimized token allocation
    
    // Model selection strategy for optimal speed
    if (classification.isEmergency) {
      // Use GPT-4o for emergency situations (highest quality)
      modelToUse = 'gpt-4o';
      maxTokens = 4000;
    } else if (classification.confidence > 70 && classification.area !== 'general') {
      // Use GPT-4o for complex legal questions with high confidence
      modelToUse = 'gpt-4o';
      maxTokens = 4000;
    } else if (conversationHistory.length === 0 && message.toLowerCase().match(/^(hi|hello|hey|good|morning|afternoon|evening)/)) {
      // Use GPT-4o-mini for simple greetings (fastest response)
      modelToUse = 'gpt-4o-mini';
      maxTokens = 1000;
    } else {
      // Use GPT-4o-mini for standard queries (good balance of speed and quality)
      modelToUse = 'gpt-4o-mini';
      maxTokens = 2000;
    }
    
    logger.info(`Using model: ${modelToUse} with ${maxTokens} tokens for query type: ${classification.area} (confidence: ${classification.confidence}%)`);
    
    // Get GPT response with dynamic knowledge
    const completion = await openai.chat.completions.create({
      model: modelToUse,
      messages,
      max_tokens: maxTokens, // Standard OpenAI API parameter
      temperature: classification.isEmergency ? 0.3 : 0.7, // Lower temperature for emergencies
    });

    const reply = completion.choices[0].message.content || 'I apologize, but I am having trouble processing your request. Please try again or call us at 1-844-YO-PELEO.';

    // Calculate progress based on conversation stage
    let progress = 0;
    if (conversationHistory.length > 0) {
      progress = Math.min((conversationHistory.length / 10) * 100, 90);
    }
    if (classification.confidence > 50) {
      progress = Math.max(progress, 30);
    }

    return NextResponse.json({
      reply,
      sessionId,
      classification: {
        area: classification.area,
        confidence: classification.confidence,
        isEmergency: classification.isEmergency
      },
      progress,
      legalAreaDetected: classification.area,
      emergencyStatus: classification.isEmergency
    });

  } catch (error: any) {
    logger.error('Chat API error:', error);
    logger.error('Full error details:', {
      message: error.message,
      name: error.name,
      status: error.status,
      code: error.code,
      type: error.type
    });
    
    // Provide helpful error message
    if (error.message?.includes('model')) {
      return NextResponse.json({
        error: 'Model configuration issue. Please check OPENAI_MODEL in environment.',
        details: error.message
      }, { status: 500 });
    }
    
    // For sensitive topics, provide a more helpful response
    const isSensitiveTopic = message?.toLowerCase().includes('hit') || 
                           message?.toLowerCase().includes('accident') ||
                           message?.toLowerCase().includes('injury') ||
                           message?.toLowerCase().includes('arrested') ||
                           message?.toLowerCase().includes('detained');
    
    if (isSensitiveTopic) {
      let emergencyResponse = "I understand this is a serious situation. ";
      
      if (message?.toLowerCase().includes('hit')) {
        emergencyResponse += "First, make sure everyone involved gets medical attention if needed. Do not leave the scene. ";
      }
      
      emergencyResponse += "Please call our emergency line immediately at 1-844-YO-PELEO (1-844-967-3536) to speak with an attorney who can guide you through the immediate steps you need to take.";
      
      return NextResponse.json({
        reply: emergencyResponse,
        sessionId,
        classification: classification,
        progress: 30,
        legalAreaDetected: classification.area,
        emergencyStatus: true
      });
    }
    
    // Return fallback response instead of error for better UX
    return NextResponse.json({
      reply: 'I apologize, but I am having trouble processing your request. Please try again or call us at 1-844-YO-PELEO.',
      sessionId,
      classification: classification,
      progress: 0,
      error: error.message,  // Always show error for debugging
      errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

/**
 * Process message with a specialist agent
 */
async function processWithSpecialistAgent(
  agentType: AgentType,
  message: string,
  context: ConversationContext
): Promise<string> {
  const agentConfig = agentConfigs[agentType];
  
  if (!agentConfig) {
    return "I'm having trouble connecting you with the right specialist. Please try again.";
  }

  // Build context for the agent
  const agentContext = {
    message,
    language: context.language,
    history: context.conversationHistory,
    userInfo: context.metadata?.userInfo,
  };

  // Use agent's prompt template to generate response
  // In production, this would call the actual AI model with the agent's prompt
  const systemPrompt = agentConfig.promptTemplate;
  
  // For now, return a structured response based on agent type
  switch (agentType) {
    case AgentType.REMOVAL_DEFENSE:
      return handleRemovalDefense(message, context);
    
    case AgentType.CRIMINAL_DEFENSE:
      return handleCriminalDefense(message, context);
    
    case AgentType.PERSONAL_INJURY:
      return handlePersonalInjury(message, context);
    
    case AgentType.FAMILY_LAW:
      return handleFamilyLaw(message, context);
    
    case AgentType.BUSINESS_IMMIGRATION:
      return handleBusinessImmigration(message, context);
    
    case AgentType.GENERAL_LEGAL:
      return handleGeneralLegal(message, context);
    
    case AgentType.SPANISH_LANGUAGE:
      return handleSpanishLanguage(message, context);
    
    case AgentType.EMERGENCY_AFTER_HOURS:
      return handleEmergency(message, context);
      
    default:
      return `I'm ${agentConfig.name} and I'm here to help with your ${agentConfig.practiceAreas.join(', ')} needs. ${agentConfig.description}. How can I assist you today?`;
  }
}

// Agent-specific handlers (simplified examples)
function handleRemovalDefense(message: string, context: ConversationContext): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('detained') || lowerMessage.includes('ice')) {
    return "I understand this is an emergency situation. First, let me get critical information: What detention center are they being held at? Have they been able to contact you?";
  }
  
  if (lowerMessage.includes('court') || lowerMessage.includes('hearing')) {
    return "Court dates in removal proceedings are critical. When is the hearing scheduled? Do you have the Notice to Appear (NTA) document?";
  }
  
  return "I specialize in deportation defense and removal proceedings. Can you tell me more about your immigration situation? Are you or a family member currently in proceedings?";
}

function handleCriminalDefense(message: string, context: ConversationContext): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('arrest') || lowerMessage.includes('charged')) {
    return "I understand you're dealing with criminal charges. First, have you been released or are you still in custody? What are the specific charges?";
  }
  
  if (lowerMessage.includes('dui') || lowerMessage.includes('dwi')) {
    return "DUI charges in North Carolina are serious. When did the arrest occur? Have you had your first court appearance yet?";
  }
  
  return "I'm a criminal defense attorney in North Carolina. I can help with charges ranging from misdemeanors to felonies. What type of criminal matter are you facing?";
}

function handlePersonalInjury(message: string, context: ConversationContext): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('accident') || lowerMessage.includes('crash')) {
    return "I'm sorry to hear about your accident. First and most importantly, have you received medical treatment? When did the accident occur?";
  }
  
  if (lowerMessage.includes('insurance')) {
    return "Dealing with insurance companies can be challenging. Have you spoken with any insurance adjusters yet? It's important not to give recorded statements without legal counsel.";
  }
  
  return "I handle personal injury cases in North Carolina. Whether it's a car accident, slip and fall, or other injury, I can help. What type of injury have you suffered?";
}

function handleFamilyLaw(message: string, context: ConversationContext): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('divorce')) {
    return "I understand divorce is a difficult decision. In North Carolina, you must be separated for one year before filing. Have you and your spouse already separated?";
  }
  
  if (lowerMessage.includes('custody') || lowerMessage.includes('child')) {
    return "Child custody matters require careful attention. Are you seeking to establish custody, modify an existing order, or dealing with a custody dispute?";
  }
  
  return "I handle family law matters including divorce, custody, and support. These are emotional times and I'm here to guide you through the legal process. What family law issue are you facing?";
}

function handleBusinessImmigration(message: string, context: ConversationContext): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('h1b') || lowerMessage.includes('h-1b')) {
    return "H-1B visas require employer sponsorship and have annual caps. Is your employer ready to sponsor you? What is your field of specialization?";
  }
  
  if (lowerMessage.includes('green card') || lowerMessage.includes('perm')) {
    return "Employment-based green cards involve multiple steps including PERM labor certification. What is your current visa status and job position?";
  }
  
  return "I specialize in business immigration including work visas and employment-based green cards. Are you an employer looking to sponsor someone or an employee seeking visa assistance?";
}

function handleGeneralLegal(message: string, context: ConversationContext): string {
  return "I'm a general legal counselor and can help with various legal questions or situations that span multiple areas. Could you tell me more about your legal situation so I can provide the best guidance or connect you with the right specialist?";
}

function handleSpanishLanguage(message: string, context: ConversationContext): string {
  return "¡Hola! Soy un especialista legal bilingüe. Puedo ayudarte en español con cualquier asunto legal. ¿En qué puedo asistirte hoy?";
}

function handleEmergency(message: string, context: ConversationContext): string {
  return "I understand this is an urgent situation. I'm available 24/7 for emergencies. Please call us immediately at 1-844-YO-PELEO (1-844-967-3536) or provide your contact information so we can reach you right away. What is the nature of your emergency?";
}