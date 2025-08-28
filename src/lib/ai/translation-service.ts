import OpenAI from 'openai';
import { t, translations } from '@/lib/translations';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { performance } from 'perf_hooks';

// Enhanced translation service with AI fallback
export class AITranslationService {
  private openai: OpenAI | null = null;
  private translationCache: Map<string, { text: string; timestamp: number }>;
  private readonly CACHE_TTL = 3600000; // 1 hour
  private readonly MAX_RETRIES = 2;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: 10000, // 10 seconds for translations
      });
    }

    this.translationCache = new Map();

    // Clean cache periodically
    setInterval(() => this.cleanCache(), this.CACHE_TTL);

    logger.info('AI Translation Service initialized', {
      openaiAvailable: !!this.openai,
      staticTranslationsLoaded: true,
    });
  }

  /**
   * Translate text with AI fallback for dynamic content
   */
  async translateText(
    text: string,
    targetLanguage: 'en' | 'es',
    sourceLanguage?: 'en' | 'es',
    context?: {
      domain: 'legal' | 'general' | 'medical' | 'technical';
      formality: 'formal' | 'casual' | 'professional';
      urgency?: 'high' | 'normal' | 'low';
    }
  ): Promise<string> {
    const startTime = performance.now();

    try {
      // Return original text if target language is the same as source
      if (sourceLanguage && sourceLanguage === targetLanguage) {
        return text;
      }

      // Check static translations first
      const staticTranslation = this.getStaticTranslation(text, targetLanguage);
      if (staticTranslation) {
        return staticTranslation;
      }

      // Check cache
      const cacheKey = `${text}_${targetLanguage}_${sourceLanguage || 'auto'}`;
      const cached = this.translationCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
        return cached.text;
      }

      // Use AI translation for dynamic content
      if (this.openai && text.length > 10) {
        // Only use AI for substantial text
        const aiTranslation = await this.getAITranslation(
          text,
          targetLanguage,
          sourceLanguage,
          context
        );

        // Cache the result
        this.translationCache.set(cacheKey, {
          text: aiTranslation,
          timestamp: Date.now(),
        });

        logger.debug('AI translation completed', {
          sourceLength: text.length,
          targetLanguage,
          processingTime: performance.now() - startTime,
        });

        return aiTranslation;
      }

      // Fallback to basic translation rules
      return this.getBasicTranslation(text, targetLanguage);
    } catch (error) {
      logger.error('Translation error:', errorToLogMeta(error));
      return this.getBasicTranslation(text, targetLanguage);
    }
  }

  /**
   * Get static translation from pre-defined translations
   */
  private getStaticTranslation(text: string, targetLanguage: 'en' | 'es'): string | null {
    if (targetLanguage === 'en') {
      return null; // Static translations are only for Spanish
    }

    // Try to find exact match in static translations
    const lowerText = text.toLowerCase().trim();

    // Define translation object type that can handle nested objects and arrays
    type TranslationObject = string | string[] | { [key: string]: TranslationObject };

    // Search through all translation sections
    const searchTranslations = (obj: TranslationObject, path = ''): string | null => {
      if (typeof obj === 'string') {
        return obj === lowerText ? obj : null;
      }

      if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          const result = searchTranslations(value, path ? `${path}.${key}` : key);
          if (result) return result;
        }
      }

      return null;
    };

    return searchTranslations(translations.es);
  }

  /**
   * Get AI-powered translation with legal context
   */
  private async getAITranslation(
    text: string,
    targetLanguage: 'en' | 'es',
    sourceLanguage?: 'en' | 'es',
    context?: {
      domain: 'legal' | 'general' | 'medical' | 'technical';
      formality: 'formal' | 'casual' | 'professional';
      urgency?: 'high' | 'normal' | 'low';
    }
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI not configured');
    }

    const domain = context?.domain || 'legal';
    const formality = context?.formality || 'professional';

    const systemPrompt = this.getTranslationSystemPrompt(targetLanguage, domain, formality);

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Translate the following text to ${targetLanguage === 'es' ? 'Spanish' : 'English'}:\n\n${text}`,
      },
    ];

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.3, // Lower temperature for more consistent translations
      max_tokens: Math.min(text.length * 2, 1000), // Reasonable token limit
    });

    const translation = completion.choices[0]?.message?.content?.trim();

    if (!translation) {
      throw new Error('Empty translation response');
    }

    return translation;
  }

  /**
   * Get translation system prompt based on context
   */
  private getTranslationSystemPrompt(
    targetLanguage: 'en' | 'es',
    domain: string,
    formality: string
  ): string {
    const basePrompt =
      targetLanguage === 'es'
        ? `You are a professional translator specializing in legal and business Spanish translations for a law firm. Translate text to Mexican/Central American Spanish that is:`
        : `You are a professional translator specializing in legal and business English translations for a law firm. Translate text to clear, professional English that is:`;

    const contextualGuidance = {
      legal:
        targetLanguage === 'es'
          ? `
- Culturally appropriate for Latino/Hispanic clients
- Uses proper legal terminology in Spanish
- Maintains professional tone while being accessible
- Preserves legal disclaimers and important warnings
- Uses "usted" form for formal address
- Includes appropriate legal courtesy phrases`
          : `
- Clear and accessible to non-native English speakers
- Uses proper legal terminology
- Maintains professional tone
- Preserves legal disclaimers and important warnings
- Avoids complex legal jargon when possible
- Includes appropriate legal courtesy phrases`,

      general:
        targetLanguage === 'es'
          ? `
- Natural and conversational
- Appropriate for general Spanish-speaking audience
- Uses common, everyday vocabulary
- Warm and welcoming tone`
          : `
- Natural and conversational
- Clear and easy to understand
- Uses common, everyday vocabulary
- Warm and welcoming tone`,
    };

    const formalityGuidance = {
      formal:
        targetLanguage === 'es'
          ? 'Use formal address (usted), complete sentences, and respectful language.'
          : 'Use formal language, complete sentences, and professional terminology.',

      professional:
        targetLanguage === 'es'
          ? 'Balance professionalism with accessibility, use appropriate formality.'
          : 'Balance professionalism with clarity, avoid excessive formality.',

      casual:
        targetLanguage === 'es'
          ? 'Use friendly, approachable language while maintaining respect.'
          : 'Use friendly, approachable language while maintaining professionalism.',
    };

    return `${basePrompt}

${contextualGuidance[domain as keyof typeof contextualGuidance] || contextualGuidance.general}

${formalityGuidance[formality as keyof typeof formalityGuidance] || formalityGuidance.professional}

IMPORTANT RULES:
- Translate ONLY the content, do not add explanations or notes
- Preserve formatting (line breaks, punctuation, etc.)
- Keep legal disclaimers intact and accurate
- Maintain the same tone and intent
- If you encounter legal terms, use standard legal translations
- For contact information (phone numbers, addresses), keep them unchanged
- Return only the translation, nothing else`;
  }

  /**
   * Basic translation fallback for simple text
   */
  private getBasicTranslation(text: string, targetLanguage: 'en' | 'es'): string {
    if (targetLanguage === 'en') {
      return text; // Return original if translating to English without AI
    }

    // Basic Spanish translations for common phrases
    const basicTranslations: Record<string, string> = {
      hello: 'hola',
      'thank you': 'gracias',
      please: 'por favor',
      yes: 'sí',
      no: 'no',
      help: 'ayuda',
      consultation: 'consulta',
      appointment: 'cita',
      lawyer: 'abogado',
      attorney: 'abogado',
      legal: 'legal',
      immigration: 'inmigración',
      accident: 'accidente',
      injury: 'lesión',
      criminal: 'criminal',
      family: 'familia',
      divorce: 'divorcio',
      emergency: 'emergencia',
      urgent: 'urgente',
      free: 'gratis',
      cost: 'costo',
      fee: 'tarifa',
      call: 'llamar',
      'call now': 'llama ahora',
      contact: 'contacto',
      office: 'oficina',
      location: 'ubicación',
    };

    const lowerText = text.toLowerCase().trim();

    // Check for exact matches
    if (basicTranslations[lowerText]) {
      return basicTranslations[lowerText];
    }

    // Check for partial matches and replace
    let result = text;
    for (const [english, spanish] of Object.entries(basicTranslations)) {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      result = result.replace(regex, spanish);
    }

    return result;
  }

  /**
   * Translate legal disclaimers specifically
   */
  async translateLegalDisclaimer(text: string, targetLanguage: 'en' | 'es'): Promise<string> {
    const context = {
      domain: 'legal' as const,
      formality: 'formal' as const,
      urgency: 'high' as const,
    };

    return this.translateText(text, targetLanguage, undefined, context);
  }

  /**
   * Translate chat messages with appropriate context
   */
  async translateChatMessage(
    message: string,
    targetLanguage: 'en' | 'es',
    isUserMessage: boolean = false
  ): Promise<string> {
    const context = {
      domain: 'general' as const,
      formality: isUserMessage ? ('casual' as const) : ('professional' as const),
    };

    return this.translateText(message, targetLanguage, undefined, context);
  }

  /**
   * Detect language of text
   */
  async detectLanguage(text: string): Promise<'en' | 'es' | 'unknown'> {
    // Simple language detection based on common words
    const spanishIndicators = [
      'que',
      'de',
      'la',
      'el',
      'en',
      'y',
      'a',
      'es',
      'se',
      'no',
      'te',
      'lo',
      'le',
      'da',
      'su',
      'por',
      'son',
      'con',
      'para',
      'una',
      'tiene',
      'al',
      'pero',
      'todo',
      'está',
      'muy',
      'fue',
      'ser',
      'como',
      'mi',
      'él',
      'más',
      'esto',
      'yo',
      'hola',
      'gracias',
      'por favor',
      'sí',
      'cómo',
      'dónde',
      'cuándo',
      'español',
      'habla',
      'necesito',
      'ayuda',
      'abogado',
    ];

    const englishIndicators = [
      'the',
      'be',
      'to',
      'of',
      'and',
      'a',
      'in',
      'that',
      'have',
      'i',
      'it',
      'for',
      'not',
      'on',
      'with',
      'he',
      'as',
      'you',
      'do',
      'at',
      'this',
      'but',
      'his',
      'by',
      'from',
      'they',
      'we',
      'say',
      'her',
      'she',
      'or',
      'an',
      'will',
      'my',
      'one',
      'all',
      'would',
      'there',
      'their',
      'what',
      'so',
      'up',
      'out',
      'if',
      'about',
      'who',
      'get',
      'which',
      'go',
      'me',
      'hello',
      'thank',
      'please',
      'yes',
      'how',
      'where',
      'when',
      'english',
      'speak',
      'need',
      'help',
      'lawyer',
      'attorney',
    ];

    const words = text.toLowerCase().split(/\s+/);
    let spanishScore = 0;
    let englishScore = 0;

    for (const word of words) {
      if (spanishIndicators.includes(word)) {
        spanishScore++;
      }
      if (englishIndicators.includes(word)) {
        englishScore++;
      }
    }

    if (spanishScore > englishScore && spanishScore > 0) {
      return 'es';
    } else if (englishScore > spanishScore && englishScore > 0) {
      return 'en';
    }

    return 'unknown';
  }

  /**
   * Cache management
   */
  private cleanCache(): void {
    const now = Date.now();
    for (const [key, value] of this.translationCache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.translationCache.delete(key);
      }
    }
  }

  /**
   * Get translation statistics
   */
  getStats(): {
    cacheSize: number;
    aiAvailable: boolean;
    staticTranslationsAvailable: boolean;
  } {
    return {
      cacheSize: this.translationCache.size,
      aiAvailable: !!this.openai,
      staticTranslationsAvailable: true,
    };
  }
}

// Export singleton instance
export const aiTranslationService = new AITranslationService();
