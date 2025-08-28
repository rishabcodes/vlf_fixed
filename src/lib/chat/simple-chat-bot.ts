// Simple rule-based chatbot for when OpenAI is not available
export class SimpleChatBot {
  private language: 'en' | 'es';

  constructor(language: 'en' | 'es' = 'en') {
    this.language = language;
  }

  async generateResponse(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();
    
    // Check if this is just a name response (avoid generic response)
    if (lowerMessage.includes('my name is') || lowerMessage.includes('i am') || lowerMessage.includes("i'm")) {
      return "Nice to meet you! How can I assist you today with your legal needs?";
    }
    
    // Check if user is expressing gratitude
    if (lowerMessage === 'thank you' || lowerMessage === 'thanks' || lowerMessage === 'thank you so much' || lowerMessage === 'thanks a lot') {
      return "You're welcome! If you have any other questions or need further assistance, please don't hesitate to reach out. We're here to help!";
    }
    
    // Define response patterns
    const responses = {
      en: {
        greeting: [
          'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'
        ],
        greetingResponse: "Hello! Welcome to Vasquez Law Firm. I'm here to help you with information about our legal services. How can I assist you today?",
        
        immigration: [
          'visa', 'green card', 'citizenship', 'immigration', 'deportation', 'asylum', 'naturalization', 'work permit'
        ],
        immigrationResponse: "We specialize in immigration law and can help with:\n• Family-based visas and green cards\n• Employment-based immigration\n• Citizenship and naturalization\n• Deportation defense\n• Asylum applications\n• Work permits and DACA\n\nWould you like to schedule a free consultation to discuss your specific case? Call us at 1-844-967-3536.",
        
        personalInjury: [
          'accident', 'injury', 'hurt', 'crash', 'slip', 'fall', 'medical malpractice', 'personal injury'
        ],
        personalInjuryResponse: "We handle all types of personal injury cases including:\n• Car accidents\n• Truck accidents\n• Slip and fall injuries\n• Medical malpractice\n• Wrongful death\n\nWe work on a contingency fee basis - you don't pay unless we win. Call 1-844-967-3536 for a free consultation.",
        
        workersComp: [
          'workers comp', 'work injury', 'workplace accident', 'workers compensation', 'job injury'
        ],
        workersCompResponse: "If you've been injured at work, we can help you:\n• File your workers' compensation claim\n• Appeal denied claims\n• Get medical treatment covered\n• Receive disability benefits\n• Handle third-party claims\n\nDon't let your employer deny you benefits. Call 1-844-967-3536 for a free consultation.",
        
        criminal: [
          'criminal', 'arrest', 'dui', 'dwi', 'drug', 'assault', 'theft', 'charge'
        ],
        criminalResponse: "We provide strong criminal defense for:\n• DUI/DWI charges\n• Drug offenses\n• Assault and battery\n• Theft and property crimes\n• Traffic violations\n• Expungements\n\nProtect your rights and future. Call 1-844-967-3536 immediately for legal help.",
        
        family: [
          'divorce', 'custody', 'child support', 'separation', 'family law', 'alimony'
        ],
        familyResponse: "Our family law services include:\n• Divorce proceedings\n• Child custody arrangements\n• Child support\n• Spousal support/alimony\n• Property division\n• Prenuptial agreements\n\nWe understand this is a difficult time. Call 1-844-967-3536 for compassionate legal support.",
        
        appointment: [
          'appointment', 'consultation', 'meeting', 'schedule', 'talk to lawyer', 'speak with attorney'
        ],
        appointmentResponse: "I'd be happy to help you schedule a consultation with one of our attorneys. You can:\n• Call us directly at 1-844-967-3536\n• Visit our office in Charlotte, NC or Atlanta, GA\n• We also offer virtual consultations\n\nMany consultations are free. What type of legal matter do you need help with?",
        
        cost: [
          'cost', 'fee', 'price', 'how much', 'payment', 'afford'
        ],
        costResponse: "We understand cost is a concern. We offer:\n• Free consultations for most cases\n• Contingency fees for personal injury (no win, no fee)\n• Payment plans for other services\n• Competitive rates\n\nCall 1-844-967-3536 to discuss your options with no obligation.",
        
        location: [
          'location', 'office', 'address', 'where', 'directions'
        ],
        locationResponse: "We have offices in:\n\n📍 Charlotte, NC\n4801 E Independence Blvd, Suite 200\nCharlotte, NC 28212\n\n📍 Atlanta, GA\n\nFor immigration matters, we serve clients nationwide. Call 1-844-967-3536 or visit us today!",
        
        hours: [
          'hours', 'open', 'time', 'when'
        ],
        hoursResponse: "Our office hours are:\nMonday - Friday: 9:00 AM - 6:00 PM\nSaturday: By appointment\nSunday: Closed\n\nFor emergencies, call 1-844-967-3536 - we have attorneys available for urgent matters.",
        
        default: "I can help you with information about:\n• Immigration Law\n• Personal Injury\n• Workers' Compensation\n• Criminal Defense\n• Family Law\n\nFor specific legal advice or to speak with an attorney, please call 1-844-967-3536 for a free consultation.\n\nWhat type of legal matter can I help you with today?"
      },
      es: {
        greeting: [
          'hola', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal'
        ],
        greetingResponse: "¡Hola! Bienvenido a Vasquez Law Firm. Estoy aquí para ayudarle con información sobre nuestros servicios legales. ¿En qué puedo asistirle hoy?",
        
        immigration: [
          'visa', 'tarjeta verde', 'ciudadanía', 'inmigración', 'deportación', 'asilo', 'naturalización', 'permiso de trabajo'
        ],
        immigrationResponse: "Nos especializamos en leyes de inmigración y podemos ayudar con:\n• Visas y tarjetas verdes familiares\n• Inmigración basada en empleo\n• Ciudadanía y naturalización\n• Defensa de deportación\n• Solicitudes de asilo\n• Permisos de trabajo y DACA\n\n¿Le gustaría programar una consulta gratuita? Llame al 1-844-967-3536.",
        
        personalInjury: [
          'accidente', 'lesión', 'herida', 'choque', 'caída', 'negligencia médica', 'lesiones personales'
        ],
        personalInjuryResponse: "Manejamos todo tipo de casos de lesiones personales:\n• Accidentes automovilísticos\n• Accidentes de camiones\n• Lesiones por resbalones y caídas\n• Negligencia médica\n• Muerte injusta\n\nTrabajamos con honorarios de contingencia - no paga a menos que ganemos. Llame al 1-844-967-3536 para una consulta gratuita.",
        
        workersComp: [
          'compensación laboral', 'lesión trabajo', 'accidente laboral', 'compensación trabajadores'
        ],
        workersCompResponse: "Si se lesionó en el trabajo, podemos ayudarle a:\n• Presentar su reclamo de compensación laboral\n• Apelar reclamos denegados\n• Obtener tratamiento médico cubierto\n• Recibir beneficios por discapacidad\n• Manejar reclamos de terceros\n\nNo deje que su empleador le niegue beneficios. Llame al 1-844-967-3536.",
        
        criminal: [
          'criminal', 'arresto', 'dui', 'dwi', 'droga', 'asalto', 'robo', 'cargo'
        ],
        criminalResponse: "Proporcionamos defensa criminal sólida para:\n• Cargos de DUI/DWI\n• Delitos de drogas\n• Asalto y agresión\n• Robo y delitos contra la propiedad\n• Violaciones de tráfico\n• Eliminación de antecedentes\n\nProteja sus derechos y futuro. Llame al 1-844-967-3536 inmediatamente.",
        
        family: [
          'divorcio', 'custodia', 'manutención', 'separación', 'derecho familiar', 'pensión alimenticia'
        ],
        familyResponse: "Nuestros servicios de derecho familiar incluyen:\n• Procedimientos de divorcio\n• Arreglos de custodia de hijos\n• Manutención infantil\n• Manutención conyugal\n• División de propiedad\n• Acuerdos prenupciales\n\nEntendemos que es un momento difícil. Llame al 1-844-967-3536.",
        
        appointment: [
          'cita', 'consulta', 'reunión', 'programar', 'hablar con abogado'
        ],
        appointmentResponse: "Me encantaría ayudarle a programar una consulta con uno de nuestros abogados. Puede:\n• Llamarnos directamente al 1-844-967-3536\n• Visitar nuestra oficina en Charlotte, NC o Atlanta, GA\n• También ofrecemos consultas virtuales\n\nMuchas consultas son gratuitas. ¿Con qué tipo de asunto legal necesita ayuda?",
        
        cost: [
          'costo', 'precio', 'cuánto', 'pago', 'tarifa'
        ],
        costResponse: "Entendemos que el costo es una preocupación. Ofrecemos:\n• Consultas gratuitas para la mayoría de casos\n• Honorarios de contingencia para lesiones personales\n• Planes de pago para otros servicios\n• Tarifas competitivas\n\nLlame al 1-844-967-3536 para discutir sus opciones sin obligación.",
        
        location: [
          'ubicación', 'oficina', 'dirección', 'dónde', 'direcciones'
        ],
        locationResponse: "Tenemos oficinas en:\n\n📍 Charlotte, NC\n4801 E Independence Blvd, Suite 200\nCharlotte, NC 28212\n\n📍 Atlanta, GA\n\nPara asuntos de inmigración, atendemos clientes en todo el país. ¡Llame al 1-844-967-3536!",
        
        hours: [
          'horario', 'abierto', 'hora', 'cuándo'
        ],
        hoursResponse: "Nuestro horario de oficina es:\nLunes - Viernes: 9:00 AM - 6:00 PM\nSábado: Con cita previa\nDomingo: Cerrado\n\nPara emergencias, llame al 1-844-967-3536.",
        
        default: "Puedo ayudarle con información sobre:\n• Ley de Inmigración\n• Lesiones Personales\n• Compensación Laboral\n• Defensa Criminal\n• Derecho Familiar\n\nPara asesoramiento legal específico, llame al 1-844-967-3536 para una consulta gratuita.\n\n¿Con qué tipo de asunto legal puedo ayudarle hoy?"
        }
};

    const patterns = responses[this.language];
    
    // Check greeting
    if (patterns.greeting.some(word => lowerMessage.includes(word))) {
      return patterns.greetingResponse;
    }
    
    // Check immigration
    if (patterns.immigration.some(word => lowerMessage.includes(word))) {
      return patterns.immigrationResponse;
    }
    
    // Check personal injury
    if (patterns.personalInjury.some(word => lowerMessage.includes(word))) {
      return patterns.personalInjuryResponse;
    }
    
    // Check workers comp
    if (patterns.workersComp.some(word => lowerMessage.includes(word))) {
      return patterns.workersCompResponse;
    }
    
    // Check criminal
    if (patterns.criminal.some(word => lowerMessage.includes(word))) {
      return patterns.criminalResponse;
    }
    
    // Check family law
    if (patterns.family.some(word => lowerMessage.includes(word))) {
      return patterns.familyResponse;
    }
    
    // Check appointment
    if (patterns.appointment.some(word => lowerMessage.includes(word))) {
      return patterns.appointmentResponse;
    }
    
    // Check cost
    if (patterns.cost.some(word => lowerMessage.includes(word))) {
      return patterns.costResponse;
    }
    
    // Check location
    if (patterns.location.some(word => lowerMessage.includes(word))) {
      return patterns.locationResponse;
    }
    
    // Check hours
    if (patterns.hours.some(word => lowerMessage.includes(word))) {
      return patterns.hoursResponse;
    }
    
    // Default response
    return patterns.default;
  }
}
