// Smart message classifier for routing optimization
export class MessageClassifier {
  private static simpleGreetings = [
    'hi', 'hello', 'hey', 'hola', 'good morning', 'good afternoon', 
    'good evening', 'buenos días', 'buenas tardes', 'buenas noches',
    'how are you', 'what\'s up', 'sup', 'howdy', 'greetings'
  ];

  private static simpleQuestions = [
    'hours', 'location', 'address', 'phone', 'cost', 'price', 'fee',
    'open', 'closed', 'contact', 'email', 'website'
  ];

  private static complexLegalKeywords = [
    'visa', 'green card', 'deportation', 'asylum', 'citizenship',
    'injury', 'accident', 'workers comp', 'criminal', 'arrest',
    'divorce', 'custody', 'immigration', 'case', 'lawsuit',
    'court', 'hearing', 'appeal', 'petition', 'application'
  ];

  private static appointmentKeywords = [
    'appointment', 'consultation', 'meeting', 'schedule', 'book',
    'talk to lawyer', 'speak with attorney', 'cita', 'consulta'
  ];

  static classifyMessage(message: string): {
    type: 'greeting' | 'simple' | 'appointment' | 'complex' | 'emergency';
    confidence: number;
    requiresAgent: boolean;
    requiresDatabase: boolean;
    requiresGHL: boolean;
  } {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check for emergency keywords
    if (this.isEmergency(lowerMessage)) {
      return {
        type: 'emergency',
        confidence: 1.0,
        requiresAgent: true,
        requiresDatabase: true,
        requiresGHL: true
      };
    }

    // Check for greetings
    if (this.isGreeting(lowerMessage)) {
      return {
        type: 'greeting',
        confidence: 0.95,
        requiresAgent: false,
        requiresDatabase: false,
        requiresGHL: false
      };
    }

    // Check for appointment requests
    if (this.isAppointmentRequest(lowerMessage)) {
      return {
        type: 'appointment',
        confidence: 0.9,
        requiresAgent: true,
        requiresDatabase: true,
        requiresGHL: true
      };
    }

    // Check for simple questions
    if (this.isSimpleQuestion(lowerMessage)) {
      return {
        type: 'simple',
        confidence: 0.85,
        requiresAgent: false,
        requiresDatabase: false,
        requiresGHL: false
      };
    }

    // Default to complex for legal questions
    return {
      type: 'complex',
      confidence: 0.7,
      requiresAgent: true,
      requiresDatabase: true,
      requiresGHL: true
    };
  }

  private static isGreeting(message: string): boolean {
    // Check if message is just a greeting (under 20 chars and contains greeting word)
    if (message.length > 20) return false;
    return this.simpleGreetings.some(greeting => message.includes(greeting));
  }

  private static isSimpleQuestion(message: string): boolean {
    return this.simpleQuestions.some(keyword => message.includes(keyword));
  }

  private static isAppointmentRequest(message: string): boolean {
    return this.appointmentKeywords.some(keyword => message.includes(keyword));
  }

  private static isEmergency(message: string): boolean {
    const emergencyKeywords = ['urgent', 'emergency', 'arrested', 'detained', 
                               'ice', 'deported', 'help now', 'immediate'];
    return emergencyKeywords.some(keyword => message.includes(keyword));
  }

  private static hasLegalKeywords(message: string): boolean {
    return this.complexLegalKeywords.some(keyword => message.includes(keyword));
  }
}
