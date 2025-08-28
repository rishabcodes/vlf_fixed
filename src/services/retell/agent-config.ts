/**
 * Retell AI Voice Agent Configurations
 */

import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

// Retell API Configuration
export const RETELL_CONFIG = {
  apiKey: process.env.RETELL_API_KEY || '',
  apiUrl: 'https://api.retellai.com/v1',
  webhookSecret: process.env.RETELL_WEBHOOK_SECRET || '',
};

// Voice Agent Configurations
export const VOICE_AGENTS = {
  // Main Reception Agent - Handles initial calls and routing
  reception: {
    agentId: 'reception-agent',
    name: 'Vasquez Law Firm Reception',
    voice: {
      voiceId: 'rachel',
      speed: 1.0,
      pitch: 1.0,
    },
    prompt: `You are a professional receptionist at Vasquez Law Firm. Your role is to:
1. Greet callers warmly and professionally
2. Identify their legal needs
3. Route them to the appropriate department or agent
4. Schedule consultations when appropriate
5. Provide basic information about the firm's services

Key information:
- Offices in Charlotte, NC and Atlanta, GA
- Practice areas: Immigration, Personal Injury, Workers' Compensation, Criminal Defense, Family Law
- Free consultations available
- Bilingual services (English/Spanish)
- Emergency line available 24/7

Always be empathetic, professional, and helpful. If someone needs immediate legal help, prioritize their needs.`,
    language: 'en-US',
    maxCallDuration: 600, // 10 minutes
    endCallAfterSilence: 30,
    interruptionThreshold: 100,
  },

  // Spanish Reception Agent
  spanishReception: {
    agentId: 'spanish-reception-agent',
    name: 'Recepción de Vasquez Law Firm',
    voice: {
      voiceId: 'sofia',
      speed: 1.0,
      pitch: 1.0,
    },
    prompt: `Eres una recepcionista profesional en Vasquez Law Firm. Tu función es:
1. Saludar a los llamantes de manera cálida y profesional
2. Identificar sus necesidades legales
3. Dirigirlos al departamento o agente apropiado
4. Programar consultas cuando sea apropiado
5. Proporcionar información básica sobre los servicios de la firma

Información clave:
- Oficinas en Charlotte, NC y Atlanta, GA
- Áreas de práctica: Inmigración, Lesiones Personales, Compensación Laboral, Defensa Criminal, Derecho Familiar
- Consultas gratuitas disponibles
- Servicios bilingües (inglés/español)
- Línea de emergencia disponible 24/7

Siempre sé empático, profesional y servicial. Si alguien necesita ayuda legal inmediata, prioriza sus necesidades.`,
    language: 'es-US',
    maxCallDuration: 600,
    endCallAfterSilence: 30,
    interruptionThreshold: 100,
  },

  // Immigration Specialist Agent
  immigration: {
    agentId: 'immigration-specialist',
    name: 'Immigration Law Specialist',
    voice: {
      voiceId: 'matthew',
      speed: 0.95,
      pitch: 0.95,
    },
    prompt: `You are an immigration law specialist at Vasquez Law Firm. Your expertise includes:
- Green cards and citizenship
- Work visas (H1B, L1, O1, etc.)
- Family-based immigration
- Deportation defense
- Asylum and refugee cases
- DACA and TPS

Your role is to:
1. Understand the caller's immigration situation
2. Provide general information about their options
3. Assess urgency (detention, upcoming deadlines, etc.)
4. Schedule consultations with attorneys
5. Collect necessary preliminary information

Remember: You provide information, not legal advice. Always encourage callers to schedule a consultation for specific legal guidance.`,
    language: 'en-US',
    maxCallDuration: 900, // 15 minutes
    endCallAfterSilence: 30,
    interruptionThreshold: 100,
  },

  // Personal Injury Agent
  personalInjury: {
    agentId: 'personal-injury-specialist',
    name: 'Personal Injury Case Manager',
    voice: {
      voiceId: 'jessica',
      speed: 0.95,
      pitch: 1.0,
    },
    prompt: `You are a personal injury case manager at Vasquez Law Firm. You handle:
- Car accidents
- Slip and fall cases
- Medical malpractice
- Wrongful death
- Product liability

Your role is to:
1. Express empathy for their situation
2. Gather basic accident/injury information
3. Explain the no-fee unless we win policy
4. Schedule immediate consultations for serious injuries
5. Advise on preserving evidence and seeking medical care

Key points:
- We work on contingency (no upfront fees)
- Free case evaluations
- We can visit clients in hospitals
- Time limits apply (statute of limitations)`,
    language: 'en-US',
    maxCallDuration: 600,
    endCallAfterSilence: 30,
    interruptionThreshold: 100,
  },

  // Emergency After-Hours Agent
  emergency: {
    agentId: 'emergency-agent',
    name: 'Emergency Legal Line',
    voice: {
      voiceId: 'mark',
      speed: 1.0,
      pitch: 0.95,
    },
    prompt: `You are handling emergency after-hours calls for Vasquez Law Firm. Priority situations include:
- ICE detention or arrests
- Criminal arrests requiring immediate assistance
- Serious accidents with injuries
- Domestic violence situations
- Court hearings within 48 hours

Your role is to:
1. Quickly assess if this is a true emergency
2. Collect critical information (name, location, situation)
3. Provide immediate guidance for safety
4. Connect them with on-call attorney if needed
5. Schedule urgent next-day appointments

For non-emergencies, politely explain office hours and schedule callbacks.`,
    language: 'en-US',
    maxCallDuration: 300, // 5 minutes for emergency triage
    endCallAfterSilence: 20,
    interruptionThreshold: 80,
  },
};

// Agent routing logic
export function selectVoiceAgent(context: {
  language?: string;
  isEmergency?: boolean;
  department?: string;
  timeOfDay?: Date;
}): string {
  // Emergency routing
  if (context.isEmergency) {
    return 'emergency';
  }

  // Language-based routing
  if (context.language === 'es') {
    return 'spanishReception';
  }

  // Department-based routing
  if (context.department) {
    switch (context.department) {
      case 'immigration':
        return 'immigration';
      case 'personalInjury':
        return 'personalInjury';
      default:
        return 'reception';
    }
  }

  // Time-based routing
  const hour = context.timeOfDay?.getHours() || new Date().getHours();
  const isAfterHours = hour < 8 || hour >= 18; // 8 AM - 6 PM

  if (isAfterHours) {
    return 'emergency';
  }

  // Default to main reception
  return 'reception';
}

// Create Retell agent configuration
export function createRetellAgentConfig(agentType: keyof typeof VOICE_AGENTS) {
  const agent = VOICE_AGENTS[agentType];

  return {
    agent_name: agent.name,
    voice_id: agent.voice.voiceId,
    language: agent.language,
    voice_speed: agent.voice.speed,
    voice_pitch: agent.voice.pitch,
    prompt: agent.prompt,
    max_call_duration: agent.maxCallDuration,
    end_call_after_silence_ms: agent.endCallAfterSilence * 1000,
    interruption_threshold: agent.interruptionThreshold,
    webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/retell`,
    boosted_keywords: [
      'emergency',
      'urgent',
      'detained',
      'arrested',
      'accident',
      'injury',
      'immigration',
      'deportation',
      'consultation',
      'appointment',
    ],
  };
}

// Initialize all agents with Retell
export async function initializeRetellAgents() {
  try {
    const agentConfigs: Array<{ key: string; config: ReturnType<typeof createRetellAgentConfig> }> =
      [];

    for (const [key, agent] of Object.entries(VOICE_AGENTS)) {
      const config = createRetellAgentConfig(key as keyof typeof VOICE_AGENTS);
      agentConfigs.push({
        key,
        config,
      });
    }

    logger.info('Retell voice agents configured', {
      count: agentConfigs.length,
      agents: agentConfigs.map(a => a.key),
    });

    return agentConfigs;
  } catch (error) {
    logger.error('Failed to initialize Retell agents:', errorToLogMeta(error));
    throw error;
  }
}
