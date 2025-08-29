import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { logger } from '@/lib/safe-logger';
import { ghlMCPClient } from '@/new-chatbot-ghl/services/ghl-mcp-client';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Comprehensive Legal Assistant System Prompt with all question flows
const COMPREHENSIVE_LEGAL_PROMPT = {
  en: `You are Alex, a helpful legal assistant for Vasquez Law Firm. Be professional, empathetic, and informative.

IMPORTANT GUIDELINES FROM ORIGINAL SYSTEM:
- You may introduce yourself as Alex when appropriate
- Provide general legal information only, not legal advice
- Be warm and conversational while maintaining professionalism
- ALWAYS ask for the user's name FIRST when they greet you (Hi, Hello, etc.)
- IMMEDIATELY after getting the user's name, ask for their phone number by saying something like "Thanks [Name]! May I have your phone number so our team can follow up with you?"
- After getting phone (or if declined), provide the legal disclaimer THEN ask about their legal needs
- Keep responses concise and clear - 2-3 sentences maximum
- If asked about fees, mention free consultations and payment plans
- When previous interactions are provided above, acknowledge them naturally and build on that context
- You can reference previous conversations when context shows them

GREETING FLOW (MUST FOLLOW):
1. User says Hi/Hello → Ask for their name: "Hello! May I have your name, please?"
2. User provides name → Ask for phone: "Thank you, [Name]! May I have your phone number so our team can follow up with you?"
3. User provides phone (or declines) → Give disclaimer + ask needs: "Great! Just so you know, I provide general legal information but this doesn't create an attorney-client relationship. For specific legal advice, you'll need to consult with one of our attorneys. Now, what legal matter can I help you with today?"

CRITICAL FOR LANGUAGE SWITCHING:
- If the conversation history shows messages in a different language, the user has switched languages
- NEVER restart the conversation or re-introduce yourself after a language switch
- Continue exactly where the conversation left off, just in the new language
- Maintain all context about what was discussed, regardless of language
- Treat the conversation as one continuous flow, not separate conversations

CRITICAL RULE: Ask ONLY ONE question at a time. Never ask multiple questions in a single response. Keep messages brief.

RETURNING CLIENT PROTOCOL:
- When you have previous context about a client's concerns, ALWAYS acknowledge it first
- Ask if they want to continue discussing the same issue or something else
- Example: "I see last time you were asking about [topic]. Would you like to continue discussing that, or is there something else I can help you with today?"
- Be warm and welcoming to returning clients
- Never assume they want to talk about the same thing - always check first

CONTACT INFORMATION COLLECTION FLOW:
1. When user provides their name → Acknowledge it and ask for phone number
2. Example: "Nice to meet you, [Name]! May I have your phone number so our team can follow up with you?"
3. If user declines phone or seems hesitant → Ask for email instead: "No problem! Would you be comfortable sharing your email address instead?"
4. If user declines both → Proceed normally: "That's completely fine! How can I help you with your legal needs today?"
5. Do NOT repeatedly ask for contact information if declined
6. IMPORTANT: User comfort is priority - proceed with helping them regardless of contact info

PRACTICE AREAS:
Immigration, Personal Injury, Workers' Compensation, Criminal Defense, Family Law, Traffic, Business Law

OFFICE LOCATIONS AND HOURS:
Main Phone (all locations): 1-844-967-3536 (1-844-YO-PELEO)

1. SMITHFIELD, NC
   Address: 612 S Brightleaf Blvd, Smithfield, NC 27577
   Phone: (919) 989-3000
   Hours: Mon-Fri: 8:30 AM - 5:30 PM | Sat: 9:00 AM - 2:00 PM | Sun: Closed

2. RALEIGH, NC  
   Address: 4426 Louisburg Road, Raleigh, NC 27616
   Phone: (919) 533-7000
   Hours: Mon-Fri: 8:30 AM - 5:30 PM | Sat: 9:00 AM - 2:00 PM | Sun: Closed

3. CHARLOTTE, NC
   Address: 5701 Executive Center Dr, Suite 103, Charlotte, NC 28212
   Phone: (704) 533-7000
   Hours: Mon-Fri: 8:00 AM - 5:00 PM | Sat-Sun: Closed

4. ORLANDO, FL
   Address: 1111 E Amelia Street, Orlando, FL 32803
   Phone: (407) 955-5000
   Hours: Mon-Fri: 9:00 AM - 6:00 PM | Sat-Sun: Closed

LOCATION ASSISTANCE:
- When someone asks about visiting, suggest the nearest office based on their location if mentioned
- Always mention if an office is closed on weekends (Charlotte and Orlando)
- For Saturday visits, only suggest Smithfield or Raleigh offices
- Don't recite full addresses unless specifically asked - just mention city/office name
- If urgent and offices are closed, provide the main phone number

ADDITIONAL INTELLIGENT BEHAVIORS:
- Conduct dynamic legal intake conversations that adapt to each client's unique situation
- Recognize urgency and prioritize emergency situations
- Ask follow-up questions based on answers received
- Adapt your questioning based on context

DYNAMIC INTAKE PROTOCOLS:
When someone mentions a legal issue, conduct a natural conversation to gather necessary information. Ask ONE question at a time. Keep responses to 2-3 sentences maximum. Be conversational, not robotic.

HANDLING DECLINED QUESTIONS:
- If user says any of these, gracefully move to the next question:
  • "I'm not comfortable"
  • "I don't want to answer"
  • "I don't know"
  • "Skip that"
  • "Next question"
  • "Rather not say"
  • "I'd prefer not to"
  • "Can we move on"
  • "Not sure"
- Response example: "No problem at all! Let me ask you something else..."
- Never push for information they're uncomfortable sharing
- Still provide helpful guidance with partial information
- Document in notes what information was declined (for attorney reference)

EMERGENCY SITUATIONS (Immediate Response Required):
If someone mentions: detained, ICE, arrested, jail, emergency, urgent danger
- Express understanding of urgency
- Ask critical questions first
- Focus on immediate needs

1. ICE DETENTION/DEPORTATION:
Key questions to naturally work into conversation:
- Full name and date of birth of detained person
- Detention center location
- Any criminal history (be sensitive)
- How long in the US
- Immigration status or pending applications
- US citizen/green card family members
- Prior deportation orders
- Entry method to US

2. CRIMINAL ARREST:
Essential information to gather:
- County of arrest and exact charges
- Court date (critical for urgency)
- First offense or prior record
- Bond/bail status
- Tests taken (breathalyzer, blood, field sobriety)
- Immigration status (affects consequences)
- Current representation

URGENT SITUATIONS (Quick Response Needed):

3. CAR/MOTOR VEHICLE ACCIDENTS:
Conversationally determine:
- Where and when accident occurred
- Injuries and medical treatment
- Police report filed
- Insurance companies contacted (what was said)
- Witnesses present
- Photos taken
- Property damage
- Who was at fault

4. WORKPLACE INJURIES:
Important to understand:
- Date and description of injury
- Reported to employer
- Medical treatment and who's paying
- Missed work time
- Workers comp claim status
- Witnesses to incident
- Safety violations involved

5. DUI/DWI:
Gather through conversation:
- County and arrest details
- Court date
- BAC level if known
- Tests performed or refused
- Prior DUI history
- License status
- Immigration concerns

STANDARD CONSULTATIONS:

6. DIVORCE/FAMILY LAW:
Explore naturally:
- Separation status and duration (NC requires 1 year)
- Children (ages, current arrangements)
- Safety concerns (prioritize if mentioned)
- Property and assets
- Income situations
- Cooperation level with spouse
- County of residence
- Prior court orders
- Desired outcomes

7. IMMIGRATION - GREEN CARD/VISA:
Understand their situation:
- Basis for application (family, work, asylum)
- Current immigration status
- Entry method to US
- Time in US
- Family ties (citizen/LPR relatives)
- Employment situation
- Criminal history
- Prior denials
- Country of origin

8. IMMIGRATION - CITIZENSHIP:
Determine eligibility:
- Green card duration
- Physical presence in US
- Travel history
- Criminal record
- English proficiency
- Civics knowledge
- Military service
- Tax filing history

9. PERSONAL INJURY (Beyond Car Accidents):
- Slip and fall: Location, conditions, notice to owner, witnesses
- Medical malpractice: Provider, treatment, injuries, expert opinions
- Product liability: Product, manufacturer, injury, recall status
- Dog bites: Owner information, provocation, medical treatment

10. CRIMINAL DEFENSE VARIATIONS:
- Drug charges: Type, amount, intent to distribute, search validity
- Assault: Circumstances, injuries, self-defense, weapons
- Theft: Value, prior offenses, restitution ability
- Domestic violence: Relationship, injuries, protective orders, children involved
- White collar: Type of crime, amounts involved, federal vs state

11. CUSTODY/CHILD SUPPORT:
Key factors to discuss:
- Current arrangements
- Children's ages and needs
- Both parents' situations
- Relocation issues
- Support payment history
- Special circumstances
- Best interests factors

12. WORKERS COMPENSATION COMPLEX:
- Repetitive strain injuries
- Occupational diseases
- Psychological injuries
- Third-party liability
- Return to work issues
- Permanent disability ratings

13. BUSINESS LAW:
- Formation type needed (LLC, Corp, Partnership)
- Business purpose
- Number of owners
- Liability concerns
- Contract disputes
- Employment issues

14. TRAFFIC VIOLATIONS:
- Type of violation
- License points
- CDL implications
- Insurance impacts
- Court date

ADAPTIVE QUESTIONING TECHNIQUES:

1. Start broad, then narrow based on responses
2. If confused, ask clarifying questions
3. If emotional, acknowledge feelings before continuing
4. If urgent, prioritize time-sensitive information
5. If complex, break down into smaller topics
6. If language barrier detected, simplify vocabulary

INFORMATION GATHERING PRIORITIES:
Emergency > Identifying Information > Legal Issue Details > Supporting Context > Contact Information

RECOGNIZE PATTERNS:
- Multiple legal issues: Address most urgent first
- Immigration + Criminal: Both affect each other
- Injury + No Insurance: Payment options important
- Family Law + Safety: Protective orders may be needed
- Business + Immigration: Visa implications

NATURAL FOLLOW-UPS:
When someone mentions:
- "Accident" → Ask about injuries, insurance, fault
- "Arrested" → Court date, charges, immigration status
- "Divorce" → Children, safety, separation date
- "Detained" → Location, criminal history, family
- "Hurt at work" → Reported, medical care, time missed
- "Immigration" → Current status, basis, timeline
- "Custody" → Current arrangements, concerns, location

CONVERSATION FLOW:
1. Acknowledge their situation (1 sentence)
2. Express empathy when appropriate (1 sentence)
3. Ask ONE most relevant question
4. Wait for response before asking next question

APPOINTMENT BOOKING & OFFICE VISITS:
When user wants to schedule an appointment or visit:
1. First ask what type of legal matter they need help with (if not already discussed)
2. Ask which office location they prefer or which city they're closest to
3. Check the office hours for that location before suggesting times
4. If they want to visit on Saturday, only suggest Smithfield or Raleigh (Charlotte and Orlando closed weekends)
5. For appointments: Ask for preferred date and time within office hours
6. Check availability and offer 2-3 available time slots if preference isn't available
7. Confirm the appointment details before booking

For visit/appointment requests:
- Always check office hours first before suggesting times
- If today and asking about "now", check current time against office hours
- For weekend visits: Smithfield and Raleigh open Saturday 9 AM - 2 PM only
- Charlotte and Orlando are CLOSED weekends - suggest weekday alternatives
- Offer virtual consultations as alternative if office hours don't work
- If urgent after hours, provide emergency phone number: 1-844-967-3536

REMEMBER:
- Keep responses to 2-3 sentences maximum
- Ask ONLY ONE question per message
- Prior context if this is a returning client
- Information already provided in conversation
- Urgency level to prioritize accordingly
- Cultural sensitivity for immigrant clients
- Trauma-informed approach for victims

Never ask questions that were already answered. Build upon information provided. Make the conversation feel natural, not like an interrogation. ONE QUESTION AT A TIME.`,

  es: `Eres Alex, un asistente legal útil para Vasquez Law Firm. Sé profesional, empático e informativo.

PAUTAS IMPORTANTES DEL SISTEMA ORIGINAL:
- Puedes presentarte como Alex cuando sea apropiado
- Proporciona solo información legal general, no asesoramiento legal
- Sé cálido y conversacional mientras mantienes el profesionalismo
- SIEMPRE pregunta el nombre del usuario PRIMERO cuando te saluden (Hola, Buenos días, etc.)
- INMEDIATAMENTE después de obtener el nombre del usuario, pide su número de teléfono diciendo algo como "¡Mucho gusto, [Nombre]! ¿Podría darme su número de teléfono para que nuestro equipo pueda contactarlo?"
- Después de obtener el teléfono (o si lo rechaza), proporciona el descargo de responsabilidad Y LUEGO pregunta sobre sus necesidades legales
- Mantén las respuestas concisas y claras - máximo 2-3 oraciones
- Si te preguntan sobre tarifas, menciona consultas gratuitas y planes de pago
- Cuando se proporcionen interacciones previas arriba, reconócelas naturalmente y construye sobre ese contexto
- Puedes referenciar conversaciones previas cuando el contexto las muestre

FLUJO DE SALUDO (DEBE SEGUIR):
1. Usuario dice Hola → Pide su nombre: "¡Hola! ¿Podría decirme su nombre, por favor?"
2. Usuario da nombre → Pide teléfono: "¡Gracias, [Nombre]! ¿Podría darme su número de teléfono para que nuestro equipo pueda contactarlo?"
3. Usuario da teléfono (o rechaza) → Da descargo + pregunta necesidades: "¡Perfecto! Solo para que sepa, proporciono información legal general pero esto no crea una relación abogado-cliente. Para asesoramiento legal específico, necesitará consultar con uno de nuestros abogados. Ahora, ¿con qué asunto legal puedo ayudarle hoy?"

CRÍTICO PARA CAMBIO DE IDIOMA:
- Si el historial de conversación muestra mensajes en un idioma diferente, el usuario ha cambiado de idioma
- NUNCA reinicies la conversación o te presentes de nuevo después de un cambio de idioma
- Continúa exactamente donde quedó la conversación, solo en el nuevo idioma
- Mantén todo el contexto sobre lo que se discutió, independientemente del idioma
- Trata la conversación como un flujo continuo, no conversaciones separadas

REGLA CRÍTICA: Haz SOLO UNA pregunta a la vez. Nunca hagas múltiples preguntas en una sola respuesta. Mantén los mensajes breves.

PROTOCOLO PARA CLIENTES QUE REGRESAN:
- Cuando tengas contexto previo sobre las inquietudes de un cliente, SIEMPRE reconócelo primero
- Pregunta si quieren continuar discutiendo el mismo tema o algo más
- Ejemplo: "Veo que la última vez estaba preguntando sobre [tema]. ¿Le gustaría continuar hablando de eso, o hay algo más en lo que pueda ayudarle hoy?"
- Sé cálido y acogedor con los clientes que regresan
- Nunca asumas que quieren hablar de lo mismo - siempre pregunta primero

FLUJO DE RECOPILACIÓN DE INFORMACIÓN DE CONTACTO:
1. Cuando el usuario proporciona su nombre → Reconócelo y pide el número de teléfono
2. Ejemplo: "¡Mucho gusto, [Nombre]! ¿Podría darme su número de teléfono para que nuestro equipo pueda contactarlo?"
3. Si el usuario rechaza dar el teléfono o parece dudar → Pide el correo electrónico: "¡No hay problema! ¿Estaría cómodo compartiendo su correo electrónico?"
4. Si el usuario rechaza ambos → Procede normalmente: "¡Está perfectamente bien! ¿Cómo puedo ayudarle con sus necesidades legales hoy?"
5. NO pidas repetidamente información de contacto si la rechazan
6. IMPORTANTE: La comodidad del usuario es prioridad - procede a ayudarles independientemente de la información de contacto

ÁREAS DE PRÁCTICA:
Inmigración, Lesiones Personales, Compensación Laboral, Defensa Criminal, Derecho Familiar, Tráfico, Derecho Comercial

UBICACIONES Y HORARIOS DE OFICINAS:
Teléfono Principal (todas las ubicaciones): 1-844-967-3536 (1-844-YO-PELEO)

1. SMITHFIELD, NC
   Dirección: 612 S Brightleaf Blvd, Smithfield, NC 27577
   Teléfono: (919) 989-3000
   Horario: Lun-Vie: 8:30 AM - 5:30 PM | Sáb: 9:00 AM - 2:00 PM | Dom: Cerrado

2. RALEIGH, NC
   Dirección: 4426 Louisburg Road, Raleigh, NC 27616
   Teléfono: (919) 533-7000
   Horario: Lun-Vie: 8:30 AM - 5:30 PM | Sáb: 9:00 AM - 2:00 PM | Dom: Cerrado

3. CHARLOTTE, NC
   Dirección: 5701 Executive Center Dr, Suite 103, Charlotte, NC 28212
   Teléfono: (704) 533-7000
   Horario: Lun-Vie: 8:00 AM - 5:00 PM | Sáb-Dom: Cerrado

4. ORLANDO, FL
   Dirección: 1111 E Amelia Street, Orlando, FL 32803
   Teléfono: (407) 955-5000
   Horario: Lun-Vie: 9:00 AM - 6:00 PM | Sáb-Dom: Cerrado

ASISTENCIA DE UBICACIÓN:
- Cuando alguien pregunte sobre visitar, sugiere la oficina más cercana según su ubicación si la mencionan
- Siempre menciona si una oficina está cerrada los fines de semana (Charlotte y Orlando)
- Para visitas los sábados, solo sugiere las oficinas de Smithfield o Raleigh
- No recites direcciones completas a menos que se solicite específicamente - solo menciona la ciudad/nombre de oficina
- Si es urgente y las oficinas están cerradas, proporciona el número de teléfono principal

COMPORTAMIENTOS INTELIGENTES ADICIONALES:
- Conduce conversaciones legales dinámicas que se adaptan a la situación única de cada cliente
- Reconoce la urgencia y prioriza situaciones de emergencia
- Haz preguntas de seguimiento basadas en las respuestas recibidas
- Adapta tus preguntas según el contexto

PROTOCOLOS DE ADMISIÓN DINÁMICA:
Cuando alguien mencione un problema legal, conduce una conversación natural para recopilar información necesaria. Haz UNA pregunta a la vez. Mantén las respuestas a 2-3 oraciones máximo. Sé conversacional, no robótico.

MANEJO DE PREGUNTAS RECHAZADAS:
- Si el usuario dice alguna de estas frases, pasa amablemente a la siguiente pregunta:
  • "No me siento cómodo"
  • "No quiero responder"
  • "No sé"
  • "Salta esa"
  • "Siguiente pregunta"
  • "Prefiero no decir"
  • "Preferiría no"
  • "Podemos continuar"
  • "No estoy seguro"
- Ejemplo de respuesta: "¡No hay problema! Déjeme preguntarle algo más..."
- Nunca presiones por información que no quieren compartir
- Aún proporciona orientación útil con información parcial
- Documenta en notas qué información fue rechazada (para referencia del abogado)

SITUACIONES DE EMERGENCIA (Respuesta Inmediata Requerida):
Si alguien menciona: detenido, ICE, arrestado, cárcel, emergencia, peligro urgente
- Expresa comprensión de la urgencia
- Haz preguntas críticas primero
- Enfócate en necesidades inmediatas

1. DETENCIÓN ICE/DEPORTACIÓN:
Preguntas clave para incluir naturalmente:
- Nombre completo y fecha de nacimiento del detenido
- Ubicación del centro de detención
- Historial criminal (sé sensible)
- Tiempo en Estados Unidos
- Estatus migratorio o aplicaciones pendientes
- Familiares ciudadanos/residentes
- Órdenes de deportación previas
- Método de entrada a EE.UU.

2. ARRESTO CRIMINAL:
Información esencial para recopilar:
- Condado de arresto y cargos exactos
- Fecha de corte (crítico para urgencia)
- Primera ofensa o récord previo
- Estado de fianza
- Pruebas tomadas (alcoholímetro, sangre, sobriedad)
- Estatus migratorio (afecta consecuencias)
- Representación actual

SITUACIONES URGENTES:

3. ACCIDENTES VEHICULARES:
Determinar conversacionalmente:
- Dónde y cuándo ocurrió
- Lesiones y tratamiento médico
- Reporte policial presentado
- Compañías de seguro contactadas
- Testigos presentes
- Fotos tomadas
- Daños a propiedad
- Quién tuvo la culpa

4. LESIONES LABORALES:
Importante entender:
- Fecha y descripción de lesión
- Reportado al empleador
- Tratamiento médico y quién paga
- Tiempo de trabajo perdido
- Estado del reclamo
- Testigos del incidente
- Violaciones de seguridad

5. DUI/DWI:
Recopilar a través de conversación:
- Condado y detalles del arresto
- Fecha de corte
- Nivel de alcohol si se conoce
- Pruebas realizadas o rechazadas
- Historial previo de DUI
- Estado de licencia
- Preocupaciones migratorias

CONSULTAS ESTÁNDAR:

6. DIVORCIO/DERECHO FAMILIAR:
Explorar naturalmente:
- Estado de separación y duración (NC requiere 1 año)
- Hijos (edades, arreglos actuales)
- Preocupaciones de seguridad (priorizar si se menciona)
- Propiedad y activos
- Situaciones de ingresos
- Nivel de cooperación con cónyuge
- Condado de residencia
- Órdenes judiciales previas
- Resultados deseados

7. INMIGRACIÓN - RESIDENCIA/VISA:
Entender su situación:
- Base para aplicación (familia, trabajo, asilo)
- Estatus migratorio actual
- Método de entrada a EE.UU.
- Tiempo en EE.UU.
- Lazos familiares (parientes ciudadanos/residentes)
- Situación laboral
- Historial criminal
- Denegaciones previas
- País de origen

8. INMIGRACIÓN - CIUDADANÍA:
Determinar elegibilidad:
- Duración de residencia
- Presencia física en EE.UU.
- Historial de viajes
- Récord criminal
- Dominio del inglés
- Conocimiento cívico
- Servicio militar
- Historial de impuestos

9. LESIONES PERSONALES (Más allá de accidentes):
- Resbalones y caídas: Ubicación, condiciones, notificación, testigos
- Mala práctica médica: Proveedor, tratamiento, lesiones, opiniones expertas
- Responsabilidad de producto: Producto, fabricante, lesión, estado de retiro
- Mordeduras de perro: Información del dueño, provocación, tratamiento

10. VARIACIONES DE DEFENSA CRIMINAL:
- Cargos de drogas: Tipo, cantidad, intención de distribuir, validez de búsqueda
- Asalto: Circunstancias, lesiones, defensa propia, armas
- Robo: Valor, ofensas previas, capacidad de restitución
- Violencia doméstica: Relación, lesiones, órdenes de protección, niños involucrados
- Delitos de cuello blanco: Tipo de crimen, montos, federal vs estatal

11. CUSTODIA/MANUTENCIÓN:
Factores clave para discutir:
- Arreglos actuales
- Edades y necesidades de los niños
- Situación de ambos padres
- Problemas de reubicación
- Historial de pagos
- Circunstancias especiales
- Factores del mejor interés

12. COMPENSACIÓN LABORAL COMPLEJA:
- Lesiones por esfuerzo repetitivo
- Enfermedades ocupacionales
- Lesiones psicológicas
- Responsabilidad de terceros
- Problemas de regreso al trabajo
- Calificaciones de discapacidad permanente

13. DERECHO COMERCIAL:
- Tipo de formación necesaria (LLC, Corp, Sociedad)
- Propósito del negocio
- Número de propietarios
- Preocupaciones de responsabilidad
- Disputas de contratos
- Problemas laborales

14. VIOLACIONES DE TRÁFICO:
- Tipo de violación
- Puntos de licencia
- Implicaciones CDL
- Impactos en seguro
- Fecha de corte

TÉCNICAS DE PREGUNTAS ADAPTATIVAS:
1. Comienza amplio, luego reduce según respuestas
2. Si hay confusión, haz preguntas aclaratorias
3. Si hay emoción, reconoce sentimientos antes de continuar
4. Si es urgente, prioriza información sensible al tiempo
5. Si es complejo, divide en temas más pequeños
6. Si hay barrera de idioma, simplifica vocabulario

RECONOCE PATRONES:
- Múltiples problemas legales: Aborda el más urgente primero
- Inmigración + Criminal: Ambos se afectan mutuamente
- Lesión + Sin seguro: Opciones de pago importantes
- Derecho familiar + Seguridad: Órdenes de protección necesarias
- Negocio + Inmigración: Implicaciones de visa

FLUJO DE CONVERSACIÓN:
1. Reconoce su situación (1 oración)
2. Expresa empatía cuando sea apropiado (1 oración)
3. Haz UNA pregunta más relevante
4. Espera la respuesta antes de hacer la siguiente pregunta

RECUERDA:
- Mantén las respuestas a 2-3 oraciones máximo
- Haz SOLO UNA pregunta por mensaje
- Contexto previo si es un cliente que regresa
- Información ya proporcionada en la conversación
- Nivel de urgencia para priorizar

Nunca hagas preguntas que ya fueron respondidas. Construye sobre la información proporcionada. Haz que la conversación se sienta natural, no como un interrogatorio. UNA PREGUNTA A LA VEZ.`
};

// Legal disclaimer
const LEGAL_DISCLAIMER = {
  en: "I'm an AI assistant providing general legal information. This is not legal advice and does not create an attorney-client relationship. For specific legal matters, please consult with one of our attorneys.",
  es: 'Soy un asistente de IA que brinda información legal general. Esto no es asesoramiento legal y no crea una relación abogado-cliente. Para asuntos legales específicos, consulte con uno de nuestros abogados.',
};

// Fetch previous context from GHL
async function fetchPreviousContext(phoneNumber: string, language: 'en' | 'es' = 'en'): Promise<{ 
  context: string | null; 
  contactId: string | null;
  noteIds: string[];
}> {
  try {
    if (!phoneNumber || !ghlMCPClient.isConfigured()) {
      return { context: null, contactId: null, noteIds: [] };
    }

    // Search for contact by phone
    const contact = await ghlMCPClient.searchContactByPhone(phoneNumber);
    if (!contact) {
      return { context: null, contactId: null, noteIds: [] };
    }
    const contactId = contact.id;

    // Get previous notes
    const notes = await ghlMCPClient.getContactNotes(contactId);
    if (!notes || notes.length === 0) {
      return { context: null, contactId, noteIds: [] };
    }

    // Extract relevant information from notes
    const noteIds = notes.map((note: any) => note.id).filter(Boolean);
    const previousConversations = notes
      .filter((note: any) => note.body && note.body.includes('CHAT CONVERSATION'))
      .map((note: any) => {
        const date = new Date(note.createdAt || note.dateAdded).toLocaleDateString();
        
        // Extract legal issues
        const legalIssuesMatch = note.body.match(/LEGAL ISSUES:\s*(.+?)(?:\n|$)/);
        const legalIssues = legalIssuesMatch ? legalIssuesMatch[1].trim() : '';
        
        // Extract summary if available
        const summaryMatch = note.body.match(/SUMMARY:\s*(.+?)(?:\n\n|\n[A-Z])/s);
        const summary = summaryMatch ? summaryMatch[1].trim() : 'Previous conversation';
        
        // Extract key points
        const keyPointsMatch = note.body.match(/KEY POINTS:\s*(.+?)(?:\n\n|\n[A-Z])/s);
        const keyPoints = keyPointsMatch ? keyPointsMatch[1].trim() : '';
        
        return {
          date,
          legalIssues,
          summary,
          keyPoints
        };
      })
      .slice(-1); // Get only the most recent conversation for clarity

    if (previousConversations.length === 0) {
      return { context: null, contactId, noteIds };
    }

    const lastConversation = previousConversations[0];
    
    // Format context based on language
    const context = language === 'es' 
      ? `CLIENTE QUE REGRESA - ${contact.firstName || ''} ${contact.lastName || ''}
Visita anterior: ${lastConversation?.date || 'Reciente'}
Consulta anterior: ${lastConversation?.legalIssues || 'Consulta legal general'}

IMPORTANTE: Comienza reconociendo su consulta anterior y pregunta si quieren continuar con ese tema o discutir algo más.
Ejemplo: "¡Bienvenido de nuevo ${contact.firstName || ''}! Veo que la última vez estaba preguntando sobre ${lastConversation?.legalIssues || 'un asunto legal'}. ¿Le gustaría continuar hablando de eso, o hay algo más en lo que pueda ayudarle hoy?"

Información del Cliente:
- Teléfono: ${contact.phone || phoneNumber}
- Correo: ${contact.email || 'No proporcionado'}`
      : `RETURNING CLIENT - ${contact.firstName || ''} ${contact.lastName || ''}
Previous visit: ${lastConversation?.date || 'Recent'}
Previous concern: ${lastConversation?.legalIssues || 'General legal inquiry'}

IMPORTANT: Start by acknowledging their previous concern and ask if they want to continue with that topic or discuss something else.
Example: "Welcome back ${contact.firstName || 'there'}! I see last time you were asking about ${lastConversation?.legalIssues || 'a legal matter'}. Would you like to continue discussing that, or is there something else I can help you with today?"

Client Information:
- Phone: ${contact.phone || phoneNumber}
- Email: ${contact.email || 'Not provided'}`;

    console.log('Retrieved context for returning client:', {
      contactId,
      noteCount: notes.length,
      conversationCount: previousConversations.length,
      contextPreview: context.substring(0, 200)
    });

    return { context, contactId, noteIds };
  } catch (error) {
    logger.error('Failed to fetch previous context:', error);
    return { context: null, contactId: null, noteIds: [] };
  }
}

// Create or update GHL note for conversation
async function createOrUpdateGHLNote(
  contactId: string,
  conversationHistory: any[],
  currentMessage: string,
  aiResponse: string,
  noteId?: string | null,
  sessionId?: string
): Promise<string | null> {
  try {
    if (!contactId || !ghlMCPClient.isConfigured()) {
      return null;
    }

    // Format conversation for note
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'short',
      timeStyle: 'short'
    });
    
    // Build full conversation text
    let fullConversation = '';
    conversationHistory.forEach((msg) => {
      const speaker = msg.sender === 'user' ? 'Client' : 'Assistant';
      fullConversation += `${speaker}: ${msg.text}\n\n`;
    });
    fullConversation += `Client: ${currentMessage}\n\nAssistant: ${aiResponse}\n\n`;
    
    // Extract detailed information from conversation
    const lowerText = fullConversation.toLowerCase();
    
    // Extract contact info
    const extractedInfo = extractContactInfo(fullConversation, conversationHistory);
    const phoneMatch = fullConversation.match(/\b\d{10}\b|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/);
    const phone = extractedInfo.phone || (phoneMatch ? phoneMatch[0] : 'N/A');
    const name = extractedInfo.name || 'N/A';
    
    // Detect case type and details
    const caseTypes = [];
    const legalAnalysis = [];
    const reliefOptions = [];
    
    // Immigration cases
    if (lowerText.includes('immigration') || lowerText.includes('visa') || lowerText.includes('green card') || 
        lowerText.includes('citizenship') || lowerText.includes('deportation') || lowerText.includes('ice') ||
        lowerText.includes('asylum') || lowerText.includes('detained')) {
      caseTypes.push('Immigration');
      
      // Extract immigration details
      if (lowerText.includes('asylum')) reliefOptions.push({ type: 'Asylum/Withholding', score: 6, hurdle: 'corroborate past persecution' });
      if (lowerText.includes('green card')) reliefOptions.push({ type: 'Adjustment of Status', score: 7, hurdle: 'eligibility requirements' });
      if (lowerText.includes('citizenship')) reliefOptions.push({ type: 'Naturalization', score: 8, hurdle: 'meet residency requirements' });
      if (lowerText.includes('deportation') || lowerText.includes('removal')) {
        reliefOptions.push({ type: 'Cancellation of Removal', score: 5, hurdle: 'prove hardship and time requirements' });
        legalAnalysis.push('Removal proceedings - defensive posture');
      }
      if (lowerText.includes('detained')) {
        legalAnalysis.push('URGENT: Currently detained - bond hearing needed');
      }
    }
    
    // Personal Injury cases
    if (lowerText.includes('accident') || lowerText.includes('injury') || lowerText.includes('hurt') ||
        lowerText.includes('crash') || lowerText.includes('slip') || lowerText.includes('fall')) {
      caseTypes.push('Personal Injury');
      reliefOptions.push({ type: 'Personal Injury Claim', score: 7, hurdle: 'prove liability and damages' });
      
      if (lowerText.includes('car') || lowerText.includes('auto') || lowerText.includes('vehicle')) {
        legalAnalysis.push('Motor vehicle accident - need police report and medical records');
      }
      if (lowerText.includes('work')) {
        caseTypes.push('Workers Compensation');
        reliefOptions.push({ type: 'Workers Comp Claim', score: 8, hurdle: 'prove work-related injury' });
      }
    }
    
    // Criminal cases
    if (lowerText.includes('arrest') || lowerText.includes('criminal') || lowerText.includes('charge') ||
        lowerText.includes('dui') || lowerText.includes('dwi') || lowerText.includes('jail')) {
      caseTypes.push('Criminal Defense');
      
      if (lowerText.includes('dui') || lowerText.includes('dwi')) {
        reliefOptions.push({ type: 'DUI Defense', score: 6, hurdle: 'challenge evidence and procedures' });
        legalAnalysis.push('DUI charge - review arrest procedures and test results');
      }
      if (lowerText.includes('court') && (lowerText.includes('tomorrow') || lowerText.includes('soon'))) {
        legalAnalysis.push('URGENT: Court date approaching - immediate representation needed');
      }
    }
    
    // Family Law cases
    if (lowerText.includes('divorce') || lowerText.includes('custody') || lowerText.includes('child support') ||
        lowerText.includes('separation') || lowerText.includes('alimony')) {
      caseTypes.push('Family Law');
      
      if (lowerText.includes('divorce')) {
        reliefOptions.push({ type: 'Divorce', score: 8, hurdle: 'meet separation requirements (NC: 1 year)' });
        legalAnalysis.push('Divorce case - verify separation date and residency');
      }
      if (lowerText.includes('custody')) {
        reliefOptions.push({ type: 'Custody Arrangement', score: 7, hurdle: 'prove best interests of child' });
      }
    }
    
    // Calculate qualification score (1-10)
    let qualificationScore = 5; // Base score
    
    // Increase score for urgent matters
    if (lowerText.includes('emergency') || lowerText.includes('urgent') || 
        lowerText.includes('detained') || lowerText.includes('arrested')) {
      qualificationScore += 3;
    }
    
    // Increase score for clear legal issue
    if (caseTypes.length > 0) qualificationScore += 1;
    
    // Increase score if contact info provided
    if (name !== 'N/A' && phone !== 'N/A') qualificationScore += 1;
    
    // Cap at 10
    qualificationScore = Math.min(qualificationScore, 10);
    
    // Determine if qualified lead
    const isQualified = qualificationScore >= 6 || caseTypes.length > 0;
    
    // Generate summary
    const summary = `The user ${name !== 'N/A' ? name : ''} contacted regarding ${caseTypes.length > 0 ? caseTypes.join(', ') : 'general legal inquiry'}. ${lowerText.includes('urgent') || lowerText.includes('emergency') ? 'This is an URGENT matter requiring immediate attention.' : 'Standard consultation requested.'}`;
    
    // Generate action plan
    const actionPlan = [];
    if (lowerText.includes('detained') || lowerText.includes('arrested')) {
      actionPlan.push('IMMEDIATE: Contact client regarding detention/arrest');
    }
    if (caseTypes.includes('Immigration')) {
      actionPlan.push('Confirm immigration status and deadlines');
      actionPlan.push('Review eligibility for relief options');
    }
    if (caseTypes.includes('Personal Injury')) {
      actionPlan.push('Obtain police report and medical records');
      actionPlan.push('Document injuries and damages');
    }
    if (caseTypes.includes('Criminal Defense')) {
      actionPlan.push('Review charges and court dates');
      actionPlan.push('Prepare defense strategy');
    }
    if (caseTypes.includes('Family Law')) {
      actionPlan.push('Verify separation/residency requirements');
      actionPlan.push('Gather financial documentation');
    }
    actionPlan.push('Schedule consultation with attorney');
    actionPlan.push('Follow up within 24 hours');
    
    // Create comprehensive note content
    const noteContent = `QUALIFYING AGENT CHAT SUMMARY
${summary}

DOB: N/A
Address: N/A

📄 Case Summary – [${caseTypes.join(', ') || 'General Inquiry'}]
---------------------------------------
${caseTypes.includes('Immigration') ? `- Nationality: ${lowerText.includes('honduras') ? 'Honduras' : lowerText.includes('mexico') ? 'Mexico' : 'Not specified'}
- Entry & Status: ${lowerText.includes('asylum') ? 'Asylum applicant' : lowerText.includes('green card') ? 'Seeking permanent residence' : 'To be determined'}
- Next Court / USCIS date: ${lowerText.includes('court') ? 'Check EOIR system' : 'No date mentioned'}
- Family with status: ${lowerText.includes('citizen') || lowerText.includes('green card') ? 'Yes' : 'Not mentioned'}
- Past persecution: ${lowerText.includes('persecution') || lowerText.includes('violence') ? 'Yes - needs documentation' : 'Not mentioned'}
- A-Number: To be obtained` : ''}
${caseTypes.includes('Personal Injury') ? `- Accident Date: ${lowerText.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/) || 'Not specified'}
- Injury Type: ${lowerText.includes('back') ? 'Back injury' : lowerText.includes('neck') ? 'Neck injury' : 'Multiple injuries'}
- Medical Treatment: ${lowerText.includes('hospital') || lowerText.includes('doctor') ? 'Yes' : 'To be confirmed'}
- Police Report: ${lowerText.includes('police') ? 'Yes' : 'To be obtained'}` : ''}
${caseTypes.includes('Criminal Defense') ? `- Charges: ${lowerText.includes('dui') ? 'DUI' : lowerText.includes('assault') ? 'Assault' : 'To be specified'}
- Court Date: ${lowerText.includes('tomorrow') ? 'URGENT - Tomorrow' : 'To be confirmed'}
- Prior Record: To be determined` : ''}

🔍 Legal Analysis
---------------------------------------
${legalAnalysis.length > 0 ? legalAnalysis.map(analysis => `- ${analysis}`).join('\n') : '- Initial assessment pending consultation'}

🎯 Relief Options & Scores
---------------------------------------
${reliefOptions.length > 0 ? reliefOptions.map(option => 
  `Relief : ${option.type}
Score  : ${option.score} / 10
Hurdle : ${option.hurdle}\n`).join('\n') : 'To be determined after consultation'}

🗒️ Action Plan
---------------------------------------
${actionPlan.map(action => `- ${action}`).join('\n')}

First name: ${name.split(' ')[0] || 'N/A'}
Last name: ${name.split(' ').slice(1).join(' ') || 'N/A'}
Phone: ${phone}
Type: Client Consultation
Rating: ${qualificationScore}
Language: ${lowerText.includes('español') || lowerText.includes('spanish') ? 'Spanish' : 'English'}

Qualified Lead: ${isQualified}

CHAT SUMMARY:
${summary}

FULL CHAT:
${fullConversation}
========================================
Session: ${sessionId || 'web-chat'} | ${timestamp} EDT
========================================`;

    // Update existing note or create new one
    if (noteId) {
      // Update existing note
      const updated = await ghlMCPClient.updateContactNote(contactId, noteId, noteContent);
      if (updated) {
        console.log('[Chat] Updated GHL note with comprehensive format:', noteId);
        return noteId;
      }
    }
    
    // Create new note
    const newNoteId = await ghlMCPClient.createContactNote(contactId, noteContent);
    if (newNoteId) {
      console.log('[Chat] Created new GHL note with comprehensive format:', newNoteId);
      return newNoteId;
    }
    
    return null;
  } catch (error) {
    logger.error('Failed to create/update GHL note:', error);
    return null;
  }
}

// Format AI response for better readability
function formatAIResponse(text: string): string {
  // Split into sentences (handling common abbreviations)
  const sentences = text
    .replace(/Mr\./g, 'Mr')
    .replace(/Mrs\./g, 'Mrs')
    .replace(/Dr\./g, 'Dr')
    .replace(/etc\./g, 'etc')
    .replace(/i\.e\./g, 'ie')
    .replace(/e\.g\./g, 'eg')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  // Group sentences into paragraphs (2-3 sentences each)
  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];
  
  sentences.forEach((sentence, index) => {
    // Restore abbreviations
    sentence = sentence
      .replace(/\bMr\b/g, 'Mr.')
      .replace(/\bMrs\b/g, 'Mrs.')
      .replace(/\bDr\b/g, 'Dr.')
      .replace(/\betc\b/g, 'etc.')
      .replace(/\bie\b/g, 'i.e.')
      .replace(/\beg\b/g, 'e.g.');
    
    currentParagraph.push(sentence);
    
    // Create new paragraph after questions or every 2-3 sentences
    const isQuestion = sentence.endsWith('?');
    const hasEnoughSentences = currentParagraph.length >= 2;
    const isLastSentence = index === sentences.length - 1;
    
    if (isQuestion || (hasEnoughSentences && !isLastSentence) || isLastSentence) {
      paragraphs.push(currentParagraph.join(' '));
      currentParagraph = [];
    }
  });
  
  // Format lists with bullet points
  let formatted = paragraphs.join('\n\n');
  
  // Add line break after greeting phrases
  formatted = formatted.replace(
    /(Hello|Hi|Welcome|Good morning|Good afternoon|Good evening|Nice to meet you)[,.]?\s+/gi,
    '$1.\n\n'
  );
  
  return formatted;
}

// Detect language from message
function detectLanguage(message: string): 'en' | 'es' {
  const lowerMessage = message.toLowerCase();
  
  // Spanish indicators (common words, phrases, accents)
  const spanishIndicators = [
    'hola', 'buenos días', 'buenas tardes', 'buenas noches',
    'cómo', 'qué', 'cuál', 'dónde', 'cuándo', 'quién',
    'necesito', 'quiero', 'tengo', 'puedo', 'ayuda',
    'gracias', 'por favor', 'perdón', 'disculpe',
    'abogado', 'problema', 'pregunta', 'información',
    'mi nombre es', 'me llamo', 'soy',
    'está', 'están', 'estoy', 'español',
    'sí', 'también', 'después', 'más',
    'usted', 'señor', 'señora',
    // Check for Spanish-specific characters
    'ñ', 'á', 'é', 'í', 'ó', 'ú', 'ü'
  ];
  
  // English indicators (common words and phrases)
  const englishIndicators = [
    'hello', 'hi', 'hey', 'good morning', 'good afternoon',
    'how', 'what', 'which', 'where', 'when', 'who',
    'need', 'want', 'have', 'can', 'help', 'please',
    'thanks', 'thank you', 'sorry', 'excuse',
    'lawyer', 'attorney', 'problem', 'question', 'information',
    'my name is', "i'm", 'i am',
    'yes', 'no', 'maybe', 'please', 'thanks',
    'mr', 'mrs', 'ms', 'sir', 'madam'
  ];
  
  // Count matches for each language
  let spanishScore = 0;
  let englishScore = 0;
  
  // Check for Spanish indicators
  for (const indicator of spanishIndicators) {
    if (lowerMessage.includes(indicator)) {
      spanishScore += indicator.length > 3 ? 2 : 1; // Weight longer words more
    }
  }
  
  // Check for English indicators
  for (const indicator of englishIndicators) {
    if (lowerMessage.includes(indicator)) {
      englishScore += indicator.length > 3 ? 2 : 1;
    }
  }
  
  // Additional checks for language-specific patterns
  // Spanish question marks
  if (message.includes('¿') || message.includes('¡')) {
    spanishScore += 5;
  }
  
  // Common Spanish verb endings
  if (/\b\w+(ando|iendo|ado|ido|ar|er|ir)\b/i.test(message)) {
    spanishScore += 2;
  }
  
  // Common English contractions
  if (/\b(don't|can't|won't|i'm|i'll|i've|we're|they're|it's)\b/i.test(lowerMessage)) {
    englishScore += 3;
  }
  
  // If scores are very close or both are zero, default to English
  // but with a slight preference for Spanish if it has any score
  if (spanishScore === 0 && englishScore === 0) {
    return 'en'; // Default to English if no clear indicators
  }
  
  // Return the language with higher score
  return spanishScore > englishScore ? 'es' : 'en';
}

// Helper function to detect and parse appointment requests
function detectAppointmentRequest(message: string, aiResponse: string, conversationHistory: any[] = []): {
  isConfirmed?: boolean;
  date?: string;
  time?: string;
  location?: string;
} | null {
  const lowerMessage = message.toLowerCase();
  const lowerResponse = aiResponse.toLowerCase();
  
  // Check if this looks like appointment confirmation
  const hasAppointmentIntent = 
    (lowerMessage.includes('tomorrow') && lowerMessage.includes('2pm')) ||
    (lowerMessage.includes('friday') && (lowerMessage.includes('2pm') || lowerMessage.includes('2 pm'))) ||
    (lowerResponse.includes('appointment') && lowerResponse.includes('arrange')) ||
    (lowerResponse.includes('appointment') && lowerResponse.includes('friday'));
  
  if (!hasAppointmentIntent) return null;
  
  // Extract date
  let date: string | undefined;
  const today = new Date();
  
  if (lowerMessage.includes('tomorrow') || lowerResponse.includes('tomorrow')) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    date = tomorrow.toISOString().split('T')[0];
  } else if (lowerMessage.includes('friday') || lowerResponse.includes('friday')) {
    const friday = new Date(today);
    const currentDay = friday.getDay();
    const daysUntilFriday = currentDay <= 5 ? (5 - currentDay) : (5 + 7 - currentDay);
    friday.setDate(today.getDate() + daysUntilFriday);
    date = friday.toISOString().split('T')[0];
  }
  
  // Extract time
  let time: string | undefined;
  const timeMatch = (message + ' ' + aiResponse).match(/(\d{1,2})(?::(\d{2}))?\s*(pm|am|PM|AM)/);
  if (timeMatch) {
    let hour = parseInt(timeMatch[1]);
    const minutes = timeMatch[2] || '00';
    const meridiem = timeMatch[3].toLowerCase();
    
    if (meridiem === 'pm' && hour !== 12) {
      hour += 12;
    } else if (meridiem === 'am' && hour === 12) {
      hour = 0;
    }
    
    time = `${hour.toString().padStart(2, '0')}:${minutes}:00`;
  }
  
  // Extract location
  let location: string | undefined;
  const locationText = (message + ' ' + aiResponse).toLowerCase();
  if (locationText.includes('charlotte')) location = 'Charlotte';
  else if (locationText.includes('raleigh')) location = 'Raleigh';
  else if (locationText.includes('smithfield')) location = 'Smithfield';
  else if (locationText.includes('orlando')) location = 'Orlando';
  
  return { isConfirmed: hasAppointmentIntent, date, time, location };
}

// Extract contact information from user message
function extractContactInfo(message: string, conversationHistory: any[] = [], onlyIfRequested: boolean = true): { 
  name?: string; 
  email?: string; 
  phone?: string;
  hasName?: boolean;
} {
  const result: any = {};
  const lowerMessage = message.toLowerCase();
  
  // Check if this message is likely a response to a name request
  const isNameResponse = !onlyIfRequested || (() => {
    if (conversationHistory.length === 0) return true; // First interaction, likely name request
    
    // Look at the last AI message to see if it asked for a name
    const lastAiMessage = [...conversationHistory].reverse().find(msg => msg.sender === 'assistant');
    if (!lastAiMessage?.text) return false;
    
    const lastAiText = lastAiMessage.text.toLowerCase();
    const nameRequestPatterns = [
      /may i have your name/i,
      /what.*your name/i,
      /could.*tell me.*name/i,
      /can you.*name/i,
      /¿.*nombre/i, // Spanish
      /me.*puede.*nombre/i, // Spanish
      /¿cuál.*nombre/i // Spanish
    ];
    
    return nameRequestPatterns.some(pattern => pattern.test(lastAiText));
  })();
  
  // Only extract name if this appears to be a response to a name request
  if (!isNameResponse) {
    return result;
  }
  
  // Name extraction patterns (supports both English and Spanish)
  const namePatterns = [
    /(?:my name is|i'm|i am|this is|call me)\s+([a-z]+(?:\s+[a-z]+)?)/i,
    /(?:mi nombre es|me llamo|soy)\s+([a-z]+(?:\s+[a-z]+)?)/i, // Spanish patterns
  ];
  
  // Check for standalone names only if the message is short and likely a direct response
  if (message.length < 30 && message.split(' ').length <= 3) {
    const cityNames = ['charlotte', 'raleigh', 'orlando', 'smithfield'];
    const commonWords = ['yes', 'no', 'ok', 'okay', 'thanks', 'hello', 'hi', 'bye', 'alright', 'sure', 'fine'];
    const standaloneNamePattern = /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})$/;
    const standaloneMatch = message.match(standaloneNamePattern);
    
    if (standaloneMatch && standaloneMatch[1] && 
        !cityNames.includes(standaloneMatch[1].toLowerCase()) &&
        !commonWords.includes(standaloneMatch[1].toLowerCase())) {
      result.name = standaloneMatch[1];
      result.hasName = true;
      return result; // Early return for standalone names
    }
  }
  
  for (const pattern of namePatterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      // Clean up the name - remove common words and location names
      let name = match[1].trim();
      const excludeWords = ['test', 'here', 'there', 'yes', 'no', 'hello', 'hi',
                           'charlotte', 'raleigh', 'orlando', 'smithfield', // city names
                           'north', 'south', 'carolina', 'florida', // state names
                           'bye', 'alright', 'okay', 'thanks', 'sure']; // common words
      const nameWords = name.split(' ').filter(word => 
        !excludeWords.includes(word.toLowerCase()) && 
        word.length > 1
      );
      
      if (nameWords.length > 0) {
        result.name = nameWords.map(w => 
          w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        ).join(' ');
        result.hasName = true;
        break;
      }
    }
  }
  
  // Email extraction
  const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const emailMatch = message.match(emailPattern);
  if (emailMatch) {
    result.email = emailMatch[1].toLowerCase();
  }
  
  // Phone extraction (US phone numbers)
  const phonePattern = /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = message.match(phonePattern);
  if (phoneMatch) {
    result.phone = phoneMatch[0].replace(/\D/g, '');
    if (result.phone.length === 10) {
      result.phone = '1' + result.phone;
    }
  }
  
  // Check if we already have name from conversation history (both languages)
  if (!result.hasName) {
    const hasNameInHistory = conversationHistory.some(msg => 
      msg.sender === 'bot' && 
      (msg.text?.includes('Nice to meet you') || 
       msg.text?.includes('Thank you,') ||
       msg.text?.includes('Hello,') ||
       msg.text?.includes('Mucho gusto') ||
       msg.text?.includes('Gracias,') ||
       msg.text?.includes('Hola,'))
    );
    if (hasNameInHistory) {
      result.hasName = true; // We already have their name
    }
  }
  
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      language: providedLanguage, 
      sessionId, 
      conversationHistory = [], 
      phoneNumber,
      ghlContactId: providedContactId,
      ghlNoteIds: providedNoteIds = [],
      contactName: providedName
    } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Auto-detect language from the current message
    const detectedLanguage = detectLanguage(message);
    
    // Use detected language, but allow override if explicitly provided
    // This allows the frontend to still use language toggle if needed
    const language = providedLanguage || detectedLanguage;
    
    // Log language detection for debugging
    console.log('[Chat] Language detection:', { 
      message: message.substring(0, 50), 
      detected: detectedLanguage, 
      provided: providedLanguage,
      using: language 
    });

    // Generate session ID if not provided
    const currentSessionId = sessionId || `session-${Date.now()}`;

    // Check if we already have contact info from conversation history (for language switches)
    let existingNameFromHistory: string | null = null;
    let existingEmailFromHistory: string | null = null;
    let existingPhoneFromHistory: string | null = null;
    
    // Search through conversation history for previously collected info
    conversationHistory.forEach((msg: any) => {
      if (msg.sender === 'user') {
        const historyInfo = extractContactInfo(msg.text, [], false); // Don't require request context for history search
        if (historyInfo.name && !existingNameFromHistory) {
          existingNameFromHistory = historyInfo.name;
        }
        if (historyInfo.email && !existingEmailFromHistory) {
          existingEmailFromHistory = historyInfo.email;
        }
        if (historyInfo.phone && !existingPhoneFromHistory) {
          existingPhoneFromHistory = historyInfo.phone;
        }
      }
    });
    
    // Only extract from current message if we don't already have a name
    let extractedInfo: { name?: string; email?: string; phone?: string; hasName?: boolean; } = { 
      name: undefined, 
      email: undefined, 
      phone: undefined 
    };
    if (!providedName && !existingNameFromHistory) {
      // Only try to extract name from current message if we don't have one already
      extractedInfo = extractContactInfo(message, conversationHistory, true);
    } else {
      // Still extract email and phone from current message
      const tempInfo = extractContactInfo(message, conversationHistory, false);
      extractedInfo.email = tempInfo.email;
      extractedInfo.phone = tempInfo.phone;
    }
    
    // Prioritize: provided > existing from history > extracted from current message
    let contactName = providedName || existingNameFromHistory || extractedInfo.name;
    let contactEmail = extractedInfo.email || existingEmailFromHistory;
    let contactPhone = phoneNumber || extractedInfo.phone || existingPhoneFromHistory;
    
    // Fetch previous context if phone number is provided
    let previousContext = null;
    let ghlContactId = providedContactId;
    let ghlNoteIds = providedNoteIds;
    let contactCreated = false;
    
    if (phoneNumber && !providedContactId) {
      const { context, contactId, noteIds } = await fetchPreviousContext(phoneNumber, language);
      previousContext = context;
      ghlContactId = contactId;
      ghlNoteIds = noteIds;
    }
    
    // Handle contact creation/update logic properly
    if (!ghlContactId) {
      // No existing contact ID - need to create or find one
      try {
        // First try to find existing contact by phone/email if available
        let existingContact = null;
        if (contactPhone) {
          existingContact = await ghlMCPClient.searchContactByPhone(contactPhone);
          console.log('[Chat] Searched for contact by phone:', contactPhone, 'Found:', !!existingContact);
        } else if (contactEmail) {
          existingContact = await ghlMCPClient.searchContactByEmail(contactEmail);
          console.log('[Chat] Searched for contact by email:', contactEmail, 'Found:', !!existingContact);
        }
        
        if (existingContact) {
          // Found existing contact - use it
          ghlContactId = existingContact.id;
          console.log('[Chat] Using existing contact:', ghlContactId);
          
          // Update with any new info we have
          if (contactName || contactEmail || contactPhone) {
            const updateData: any = { id: ghlContactId };
            if (contactName && !existingContact.firstName) {
              const nameParts = contactName.split(' ');
              updateData.firstName = nameParts[0];
              updateData.lastName = nameParts.slice(1).join(' ') || '';
            }
            if (contactEmail && !existingContact.email) {
              updateData.email = contactEmail;
            }
            if (contactPhone && !existingContact.phone) {
              updateData.phone = contactPhone;
            }
            
            if (Object.keys(updateData).length > 1) {
              await ghlMCPClient.updateExistingContact(ghlContactId, updateData);
              console.log('[Chat] Updated existing contact with new info');
            }
          }
        } else {
          // No existing contact found - create new one
          const anonymousName = contactName || `Anonymous-${currentSessionId.slice(-8)}`;
          const nameParts = anonymousName.split(' ');
          
          console.log('[Chat] Creating new contact for session:', currentSessionId);
          const result = await ghlMCPClient.createOrUpdateContact({
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(' ') || '',
            email: contactEmail || `${currentSessionId}@chat.vasquezlaw.com`,
            phone: contactPhone || undefined,
            tags: ['Website-chatbot', contactName ? 'new-lead' : 'anonymous'],
            source: 'Website Chat'
          });
          
          ghlContactId = result.id;
          contactCreated = true;
          console.log('[Chat] Created new contact:', ghlContactId);
        }
      } catch (error) {
        logger.error('Failed to create/find contact:', error);
      }
    } else {
      // We have an existing contact ID - just update with new info
      if (contactName || contactEmail || contactPhone) {
        try {
          console.log('[Chat] Updating existing contact:', ghlContactId, 'with new info');
          
          const updateData: any = { id: ghlContactId };
          
          // Only update fields that have new values
          if (contactName) {
            const nameParts = contactName.split(' ');
            updateData.firstName = nameParts[0];
            updateData.lastName = nameParts.slice(1).join(' ') || '';
          }
          if (contactEmail) {
            updateData.email = contactEmail;
          }
          if (contactPhone) {
            updateData.phone = contactPhone;
          }
          
          if (Object.keys(updateData).length > 1) {
            updateData.tags = ['Website-chatbot', 'new-lead'];
            await ghlMCPClient.updateExistingContact(ghlContactId, updateData);
            console.log('[Chat] Updated contact with new info successfully');
          }
        } catch (error) {
          logger.error('Failed to update existing contact:', error);
        }
      }
    }

    // Get current EDT time
    const currentEDT = new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    // Build conversation history for OpenAI
    const hasCollectedName = extractedInfo.hasName || contactName || ghlContactId || previousContext;
    const hasCollectedPhone = contactPhone || phoneNumber;
    const hasCollectedEmail = contactEmail;
    
    // Check if user has declined to provide contact info
    const hasDeclinedPhone = conversationHistory.some((msg: any) => 
      msg.sender === 'user' && 
      (msg.text?.toLowerCase().includes("don't want") || 
       msg.text?.toLowerCase().includes("no thanks") ||
       msg.text?.toLowerCase().includes("prefer not") ||
       msg.text?.toLowerCase().includes("rather not") ||
       msg.text?.toLowerCase().includes("i'd rather") ||
       (msg.text?.toLowerCase().includes("no") && conversationHistory[conversationHistory.indexOf(msg) - 1]?.text?.includes("phone number")))
    );
    
    const hasDeclinedEmail = conversationHistory.some((msg: any) => 
      msg.sender === 'user' && 
      (msg.text?.toLowerCase().includes("no email") ||
       msg.text?.toLowerCase().includes("no thanks") ||
       msg.text?.toLowerCase().includes("prefer not") ||
       (msg.text?.toLowerCase().includes("no") && conversationHistory[conversationHistory.indexOf(msg) - 1]?.text?.includes("email")))
    );
    
    // Use gpt-4.1-mini as default (1M token context, faster, cheaper)
    const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
    let systemPrompt = COMPREHENSIVE_LEGAL_PROMPT[language as 'en' | 'es'] || COMPREHENSIVE_LEGAL_PROMPT.en;
    
    // Modify system prompt based on what we know about the user
    if (hasCollectedName && contactName) {
      // Handle both English and Spanish prompts
      if (language === 'es') {
        systemPrompt = systemPrompt.replace(
          "Pregunta el nombre del usuario al principio de la conversación",
          `El nombre del usuario es ${contactName}. Úsalo naturalmente en la conversación cuando sea apropiado`
        );
        
        // If we have the name but not the phone/email, and haven't asked yet
        if (!hasCollectedPhone && !hasCollectedEmail && !hasDeclinedPhone && !hasDeclinedEmail) {
          systemPrompt += `\n\nIMPORTANTE: Ya tienes el nombre del usuario (${contactName}). Tu PRÓXIMA respuesta debe pedir cortésmente su número de teléfono para seguimiento. Ejemplo: "¡Mucho gusto, ${contactName}! ¿Podría darme su número de teléfono para que nuestro equipo pueda contactarlo?"`;
        }
        // If phone was declined but no email yet
        else if (hasDeclinedPhone && !hasCollectedEmail && !hasDeclinedEmail) {
          systemPrompt += `\n\nIMPORTANTE: El usuario no quiso proporcionar su número de teléfono. Tu PRÓXIMA respuesta debe pedir su correo electrónico. Ejemplo: "¡No hay problema! ¿Estaría cómodo compartiendo su correo electrónico?"`;
        }
        // If both were declined or we have contact info, proceed normally
        else if ((hasDeclinedPhone && hasDeclinedEmail) || hasCollectedPhone || hasCollectedEmail) {
          systemPrompt += `\n\nContinúa ayudando al usuario con sus necesidades legales. No pidas información de contacto adicional.`;
        }
      } else {
        systemPrompt = systemPrompt.replace(
          "Ask for the user's name early in the conversation",
          `The user's name is ${contactName}. Use it naturally in conversation when appropriate`
        );
        
        // If we have the name but not the phone/email, and haven't asked yet
        if (!hasCollectedPhone && !hasCollectedEmail && !hasDeclinedPhone && !hasDeclinedEmail) {
          systemPrompt += `\n\nIMPORTANT: You have the user's name (${contactName}). Your NEXT response should politely ask for their phone number for follow-up. Example: "Thanks ${contactName}! May I have your phone number so our team can follow up with you?"`;
        }
        // If phone was declined but no email yet
        else if (hasDeclinedPhone && !hasCollectedEmail && !hasDeclinedEmail) {
          systemPrompt += `\n\nIMPORTANT: The user declined to provide their phone number. Your NEXT response should ask for their email instead. Example: "No problem! Would you be comfortable sharing your email address instead?"`;
        }
        // If both were declined or we have contact info, proceed normally
        else if ((hasDeclinedPhone && hasDeclinedEmail) || hasCollectedPhone || hasCollectedEmail) {
          systemPrompt += `\n\nProceed with helping the user with their legal needs. Do not ask for additional contact information.`;
        }
      }
    } else if (hasCollectedName) {
      // Handle both languages when we know we have a name but don't know what it is
      if (language === 'es') {
        systemPrompt = systemPrompt.replace(
          "Pregunta el nombre del usuario al principio de la conversación",
          "Ya tienes la información del usuario, no preguntes su nombre otra vez"
        );
      } else {
        systemPrompt = systemPrompt.replace(
          "Ask for the user's name early in the conversation",
          "You already have the user's information, don't ask for their name again"
        );
      }
    }
    
    // Check if language switch occurred (conversation history has different language)
    let conversationContext = '';
    let languageSwitched = false;
    if (conversationHistory.length > 0) {
      // Check if previous messages contain the opposite language
      const hasEnglish = conversationHistory.some((msg: any) => 
        /\b(hello|thanks|help|need|want|please|lawyer|attorney)\b/i.test(msg.text)
      );
      const hasSpanish = conversationHistory.some((msg: any) => 
        /\b(hola|gracias|ayuda|necesito|quiero|por favor|abogado)\b/i.test(msg.text)
      );
      
      languageSwitched = (language === 'es' && hasEnglish && !hasSpanish) || 
                        (language === 'en' && hasSpanish && !hasEnglish);
      
      // Build conversation context summary for better continuity
      if (conversationHistory.length > 2) {
        const topics = new Set<string>();
        
        // Extract legal topics discussed
        conversationHistory.forEach((msg: any) => {
          if (msg.text) {
            // Check for legal topics
            if (/immigration|inmigración|visa|green card|citizenship|ciudadanía|ice|deportation/i.test(msg.text)) {
              topics.add('immigration');
            }
            if (/accident|accidente|injury|lesión|hurt|dolor|insurance|seguro/i.test(msg.text)) {
              topics.add('personal injury');
            }
            if (/divorce|divorcio|custody|custodia|child support|manutención/i.test(msg.text)) {
              topics.add('family law');
            }
            if (/arrest|arrested|criminal|criminal|jail|cárcel|dui|dwi/i.test(msg.text)) {
              topics.add('criminal defense');
            }
            if (/work injury|lesión laboral|workers comp|compensación laboral/i.test(msg.text)) {
              topics.add('workers compensation');
            }
          }
        });
        
        if (topics.size > 0 || languageSwitched) {
          conversationContext = `\n\nIMPORTANT CONTEXT: `;
          
          if (languageSwitched) {
            conversationContext += language === 'es' 
              ? `El usuario cambió de inglés a español. Continúa la conversación naturalmente en español. `
              : `The user switched from Spanish to English. Continue the conversation naturally in English. `;
          }
          
          if (topics.size > 0) {
            const topicsArray = Array.from(topics);
            conversationContext += language === 'es'
              ? `Temas legales ya discutidos: ${topicsArray.join(', ')}. `
              : `Legal topics already discussed: ${topicsArray.join(', ')}. `;
          }
          
          conversationContext += language === 'es'
            ? `No repitas preguntas ya respondidas. Continúa desde donde quedó la conversación.`
            : `Don't repeat questions already answered. Continue from where the conversation left off.`;
        }
      }
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemPrompt + 
          `\n\nCurrent Date/Time (Eastern): ${currentEDT}` +
          (previousContext ? `\n\n${previousContext}` : '') +
          conversationContext +
          (contactName ? `\n\nUser's name: ${contactName}` : '') +
          (hasCollectedPhone ? `\n\nUser's phone: ${contactPhone || phoneNumber}` : '') +
          (hasCollectedEmail ? `\n\nUser's email: ${contactEmail}` : ''),
      },
    ];

    // Add conversation history (last 20 exchanges = 40 messages)
    const recentHistory = conversationHistory.slice(-40);
    recentHistory.forEach((msg: any) => {
      messages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      });
    });

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    // Get response from OpenAI with comprehensive prompt
    let aiResponse = '';
    
    try {
      const completion = await openai.chat.completions.create({
        model: model, // Use the optimal model determined above
        messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      aiResponse = completion.choices[0]?.message?.content || 
        (language === 'es' 
          ? 'Lo siento, no pude generar una respuesta.' 
          : 'I apologize, but I was unable to generate a response.');
          
    } catch (error) {
      logger.error('OpenAI API error:', error);
      aiResponse = language === 'es'
        ? 'Disculpa, tuve un problema al procesar tu mensaje. Por favor, intenta de nuevo o llámanos al 1-844-967-3536.'
        : 'I apologize, I had trouble processing your message. Please try again or call us at 1-844-967-3536.';
    }

    // Check if AI response confirms an appointment
    const appointmentData = detectAppointmentRequest(message, aiResponse, conversationHistory);
    
    // Process appointment booking if confirmed
    let appointmentInfo = null;
    if (appointmentData?.isConfirmed && appointmentData.date && appointmentData.time && ghlContactId) {
      // Create the appointment in GHL
      try {
        console.log('[Chat] Creating appointment:', {
          date: appointmentData.date,
          time: appointmentData.time,
          location: appointmentData.location,
          contactId: ghlContactId
        });
        
        // Create appointment using GHL MCP
        const appointment = await ghlMCPClient.createAppointment({
          contactId: ghlContactId,
          title: `Legal Consultation - ${contactName || 'Client'}`,
          startTime: `${appointmentData.date}T${appointmentData.time}`,
          endTime: `${appointmentData.date}T${appointmentData.time}`, // Will be adjusted by duration
          duration: 30, // 30-minute consultation
          location: appointmentData.location || 'Charlotte Office',
          description: `Traffic violation consultation scheduled via chatbot\nSession: ${currentSessionId}\nLanguage: ${language}`,
          appointmentStatus: 'scheduled'
        });
        
        if (appointment) {
          console.log('[Chat] Appointment created successfully:', appointment.id);
          appointmentInfo = {
            created: true,
            appointmentId: appointment.id,
            date: appointmentData.date,
            time: appointmentData.time,
            location: appointmentData.location
          };
          
          // Add confirmation to response if not already there
          if (!aiResponse.includes('confirmation')) {
            aiResponse += `\n\nYour appointment has been successfully scheduled for ${appointmentData.date} at ${appointmentData.time.substring(0, 5)} at our ${appointmentData.location} office.`;
          }
        }
      } catch (error) {
        logger.error('Failed to create GHL appointment:', error);
      }
    } else if ((message.toLowerCase().includes('appointment') || 
                message.toLowerCase().includes('schedule') ||
                message.toLowerCase().includes('consultation')) && ghlContactId) {
      try {
        // Extract date/time preferences from the conversation
        const dateTimeRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(?:tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|(?:\d{1,2}(?::\d{2})?\s*(?:am|pm))/gi;
        const dateTimeMatches = message.match(dateTimeRegex);
        
        if (dateTimeMatches) {
          // Get available calendars
          const calendars = await ghlMCPClient.getUserCalendars();
          const defaultCalendar = calendars[0]?.id || 'default-calendar';
          
          // Parse requested date
          let requestedDate = new Date();
          if (message.toLowerCase().includes('tomorrow')) {
            requestedDate.setDate(requestedDate.getDate() + 1);
          } else if (message.toLowerCase().includes('today')) {
            // Keep current date
          } else {
            // Try to parse specific date
            const dateMatch = dateTimeMatches.find(m => m.includes('/') || m.includes('-'));
            if (dateMatch) {
              requestedDate = new Date(dateMatch);
            }
          }
          
          // Check availability for next 7 days from requested date
          const startDate = requestedDate.toISOString().split('T')[0];
          const endDate = new Date(requestedDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          
          const availability = await ghlMCPClient.checkCalendarAvailability(
            defaultCalendar,
            startDate,
            endDate
          );
          
          if (availability.available && availability.slots.length > 0) {
            // Store available slots for the AI to reference
            appointmentInfo = {
              available: true,
              slots: availability.slots.slice(0, 3), // First 3 available slots
              calendarId: defaultCalendar
            };
            
            // Add availability info to AI context for better response
            aiResponse += `\n\nI've checked our calendar and we have the following times available:\n`;
            appointmentInfo.slots.forEach((slot: any, index: number) => {
              const slotDate = new Date(slot.date || startDate);
              const formattedDate = slotDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              });
              aiResponse += `${index + 1}. ${formattedDate} at ${slot.startTime}\n`;
            });
            aiResponse += '\nWhich time works best for you?';
          }
        } else if (aiResponse.toLowerCase().includes('confirm') && conversationHistory.length > 0) {
          // Check if confirming an appointment
          const lastMessages = conversationHistory.slice(-4);
          const hasTimeSelection = lastMessages.some((msg: any) => 
            /\d{1,2}(?::\d{2})?\s*(?:am|pm)/i.test(msg.text)
          );
          
          if (hasTimeSelection) {
            // Extract selected time and book appointment
            // This would need more sophisticated parsing in production
            console.log('[Chat] User confirming appointment selection');
          }
        }
      } catch (error) {
        logger.error('Failed to process appointment booking:', error);
        // Continue without appointment booking
      }
    }
    
    // Format response for readability
    const formattedResponse = formatAIResponse(aiResponse);
    
    // Check if disclaimer should be added (only on first substantive message)
    const isFirstExchange = conversationHistory.length <= 2;
    const hasLegalDisclaimer = conversationHistory.some((msg: any) => 
      msg.text?.includes('not legal advice') || 
      msg.text?.includes('no es asesoramiento legal')
    );
    
    // Add disclaimer only once at the beginning
    const finalResponse = (!hasLegalDisclaimer && isFirstExchange && message.length > 20)
      ? `${formattedResponse}\n\n*${LEGAL_DISCLAIMER[language as 'en' | 'es']}*`
      : formattedResponse;

    // Create or update GHL note if we have a contact
    let updatedNoteId = null;
    if (ghlContactId) {
      // Determine if this is a key conversation point that needs immediate note update
      const isKeyPoint = (
        // Just collected name and phone
        (extractedInfo.name && extractedInfo.phone) ||
        // Just identified legal issue type
        (message.toLowerCase().includes('accident') || 
         message.toLowerCase().includes('arrest') ||
         message.toLowerCase().includes('divorce') ||
         message.toLowerCase().includes('immigration') ||
         message.toLowerCase().includes('injury') ||
         message.toLowerCase().includes('detained')) ||
        // Emergency situation
        (message.toLowerCase().includes('urgent') || 
         message.toLowerCase().includes('emergency'))
      );
      
      // Check if we should update existing note or create new one
      // Update same note if within same session and has existing note
      const shouldUpdateExisting = ghlNoteIds && ghlNoteIds.length > 0 && 
                                   conversationHistory.length > 0;
      
      const noteIdToUpdate = shouldUpdateExisting ? ghlNoteIds[0] : null;
      
      // Always create/update note, especially at key points
      updatedNoteId = await createOrUpdateGHLNote(
        ghlContactId,
        conversationHistory,
        message,
        aiResponse,
        noteIdToUpdate,
        currentSessionId
      );
      
      // Update note IDs list
      if (updatedNoteId && !ghlNoteIds.includes(updatedNoteId)) {
        ghlNoteIds = [updatedNoteId, ...ghlNoteIds.slice(0, 9)]; // Keep last 10 notes
      }
      
      // Log key point note creation
      if (isKeyPoint) {
        console.log('[Chat] Created/updated note at key conversation point:', {
          hasName: !!extractedInfo.name,
          hasPhone: !!extractedInfo.phone,
          noteId: updatedNoteId
        });
      }
    }

    return NextResponse.json({
      response: finalResponse,
      sessionId: currentSessionId,
      ghlContactId,
      ghlNoteIds,
      hasContext: !!previousContext,
      contactCreated,
      contactName,
      language: language, // Return the detected/used language
      extractedInfo: {
        name: extractedInfo.name,
        email: extractedInfo.email,
        phone: extractedInfo.phone
      },
      noteCreated: !!updatedNoteId && !providedNoteIds.includes(updatedNoteId),
      noteUpdated: !!updatedNoteId && providedNoteIds.includes(updatedNoteId),
      appointmentInfo: appointmentInfo
    });

  } catch (error) {
    logger.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}