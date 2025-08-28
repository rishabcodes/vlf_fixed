// In-memory cache for fast responses
interface CachedResponse {
  response: string;
  timestamp: number;
  hitCount: number;
}

export class ResponseCache {
  private static cache = new Map<string, CachedResponse>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private static readonly MAX_CACHE_SIZE = 100;

  // Common responses that can be instantly returned
  private static readonly INSTANT_RESPONSES: Record<string, Record<string, string>> = {
    en: {
      greeting: "Hello! Welcome to Vasquez Law Firm. I'm here to help you with information about our legal services. How can I assist you today?",
      hours: "Our office hours are:\nMonday - Friday: 9:00 AM - 6:00 PM\nSaturday: By appointment\nSunday: Closed\n\nFor emergencies, call 1-844-967-3536.",
      location: "We have offices in:\n📍 Charlotte, NC: 4801 E Independence Blvd, Suite 200\n📍 Atlanta, GA\n\nCall 1-844-967-3536 for directions!",
      contact: "You can reach us at:\n📞 Phone: 1-844-967-3536\n📧 Email: info@vasquezlawnc.com\n🌐 Website: vasquezlawnc.com",
      thanks: "You're welcome! If you have any more questions or need legal assistance, feel free to ask or call us at 1-844-967-3536.",
      bye: "Thank you for contacting Vasquez Law Firm. Have a great day! Remember, we're here when you need us at 1-844-967-3536."
    },
    es: {
      greeting: "¡Hola! Bienvenido a Vasquez Law Firm. Estoy aquí para ayudarle con información sobre nuestros servicios legales. ¿En qué puedo asistirle hoy?",
      hours: "Nuestro horario:\nLunes - Viernes: 9:00 AM - 6:00 PM\nSábado: Con cita\nDomingo: Cerrado\n\nPara emergencias, llame al 1-844-967-3536.",
      location: "Tenemos oficinas en:\n📍 Charlotte, NC: 4801 E Independence Blvd, Suite 200\n📍 Atlanta, GA\n\n¡Llame al 1-844-967-3536 para direcciones!",
      contact: "Puede contactarnos:\n📞 Teléfono: 1-844-967-3536\n📧 Email: info@vasquezlawnc.com\n🌐 Sitio web: vasquezlawnc.com",
      thanks: "¡De nada! Si tiene más preguntas o necesita asistencia legal, no dude en preguntar o llamarnos al 1-844-967-3536.",
      bye: "Gracias por contactar a Vasquez Law Firm. ¡Que tenga un excelente día! Recuerde, estamos aquí cuando nos necesite al 1-844-967-3536."
      }
};

  static getInstantResponse(messageType: string, language: 'en' | 'es' = 'en'): string | null {
    return this.INSTANT_RESPONSES[language]?.[messageType] || null;
  }

  static get(key: string): string | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // Check if cache expired
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    // Update hit count
    cached.hitCount++;
    return cached.response;
  }

  static set(key: string, response: string): void {
    // Enforce cache size limit
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      // Remove least recently used item
      const oldestKey = Array.from(this.cache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
      hitCount: 0
    });
  }

  static generateCacheKey(message: string, language: string): string {
    // Normalize message for caching
    return `${language}:${message.toLowerCase().trim().replace(/[^\w\s]/g, '')}`;
  }

  static clear(): void {
    this.cache.clear();
  }

  static getStats(): {
    size: number;
    totalHits: number;
    avgHitRate: number;
  } {
    const entries = Array.from(this.cache.values());
    const totalHits = entries.reduce((sum, entry) => sum + entry.hitCount, 0);
    
    return {
      size: this.cache.size,
      totalHits,
      avgHitRate: entries.length > 0 ? totalHits / entries.length : 0
    };
  }
}
