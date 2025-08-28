import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { APISafetyWrapper } from '@/lib/api-safety';

export interface LegalConsultationRequest {
  userId: string;
  language: 'en' | 'es';
  caseType: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  location?: string;
}

export interface LegalConsultationResponse {
  recommendations: string[];
  suggestedPracticeAreas: string[];
  estimatedCaseComplexity: 'simple' | 'moderate' | 'complex';
  nextSteps: string[];
  disclaimers: string[];
  suggestedAttorneys?: string[];
}

export class LegalConsultationAgent {
  private model: ChatOpenAI | null = null;
  private apiWrapper: APISafetyWrapper;

  constructor() {
    this.apiWrapper = new APISafetyWrapper({
      key: process.env.OPENAI_API_KEY,
      serviceName: 'OpenAI',
      required: false,
    });

    if (this.apiWrapper.isAvailable()) {
      this.model = new ChatOpenAI({
        modelName: 'gpt-4-turbo-preview',
        temperature: 0.3,
        openAIApiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  async analyze(request: LegalConsultationRequest): Promise<LegalConsultationResponse> {
    // Return mock response if API is not configured
    if (!this.apiWrapper.isAvailable()) {
      return this.getMockResponse(request);
    }

    try {
      const systemPrompt = this.buildSystemPrompt(request.language);
      const userPrompt = this.buildUserPrompt(request);

      if (!this.model) {
        throw new Error('Legal consultation model not initialized');
      }

      const response = await this.model.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseResponse(response.content.toString());
    } catch (error) {
      logger.error('Legal consultation agent error:', errorToLogMeta(error));
      throw new Error('Failed to process legal consultation');
    }
  }

  private buildSystemPrompt(language: 'en' | 'es'): string {
    const prompts = {
      en: `You are a legal consultation AI assistant for Vasquez Law Firm. Your role is to:
1. Analyze client legal issues and provide initial guidance
2. Recommend appropriate practice areas and attorneys
3. Assess case complexity and urgency
4. Provide clear next steps while maintaining ethical boundaries
5. Always include appropriate legal disclaimers

Practice areas: Immigration, Personal Injury, Workers' Compensation, Criminal Defense, Family Law

Important: You are NOT providing legal advice, only initial consultation guidance.`,

      es: `Eres un asistente de IA de consulta legal para Vasquez Law Firm. Tu rol es:
1. Analizar problemas legales de clientes y proporcionar orientación inicial
2. Recomendar áreas de práctica y abogados apropiados
3. Evaluar la complejidad y urgencia del caso
4. Proporcionar pasos claros a seguir manteniendo límites éticos
5. Siempre incluir descargos legales apropiados

Áreas de práctica: Inmigración, Lesiones Personales, Compensación Laboral, Defensa Criminal, Derecho Familiar

Importante: NO estás proporcionando asesoría legal, solo orientación de consulta inicial.`,
    };

    return prompts[language];
  }

  private buildUserPrompt(request: LegalConsultationRequest): string {
    return `
Case Type: ${request.caseType}
Description: ${request.description}
Urgency: ${request.urgency}
Location: ${request.location || 'Not specified'}

Please analyze this legal issue and provide:
1. Initial recommendations
2. Relevant practice areas
3. Case complexity assessment
4. Suggested next steps
5. Required disclaimers
6. Recommended attorneys if applicable
`;
  }

  private parseResponse(content: string): LegalConsultationResponse {
    // In a production environment, this would use more sophisticated parsing
    // For now, we'll structure the response based on the AI output

    const sections = content.split('\n\n');

    return {
      recommendations: this.extractSection(sections, 'recommendations') || [],
      suggestedPracticeAreas: this.extractSection(sections, 'practice areas') || [],
      estimatedCaseComplexity: this.extractComplexity(content),
      nextSteps: this.extractSection(sections, 'next steps') || [],
      disclaimers: [
        'This is not legal advice. Please consult with an attorney for legal guidance.',
        'Each case is unique and outcomes may vary.',
        'Attorney-client privilege does not apply to this initial consultation.',
      ],
      suggestedAttorneys: this.extractSection(sections, 'attorneys') || undefined,
    };
  }

  private extractSection(sections: string[], keyword: string): string[] | undefined {
    const section = sections.find(s => s.toLowerCase().includes(keyword));
    if (!section) return undefined;

    return section
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(line => line.length > 0);
  }

  private extractComplexity(content: string): 'simple' | 'moderate' | 'complex' {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('complex') || lowerContent.includes('complicated')) {
      return 'complex';
    } else if (lowerContent.includes('moderate') || lowerContent.includes('standard')) {
      return 'moderate';
    }
    return 'simple';
  }

  private getMockResponse(request: LegalConsultationRequest): LegalConsultationResponse {
    logger.info('Using mock legal consultation response (OpenAI not configured)');

    return {
      recommendations: [
        'Schedule a consultation with our experienced attorneys',
        'Gather all relevant documents related to your case',
        'Document any evidence or communications',
        'Avoid discussing your case on social media',
      ],
      suggestedPracticeAreas: [request.caseType],
      estimatedCaseComplexity: 'moderate',
      nextSteps: [
        'Call 1-844-YO-PELEO to schedule a free consultation',
        'Prepare a timeline of events',
        'List all parties involved',
        'Compile relevant documentation',
      ],
      disclaimers: [
        'This is not legal advice. Please consult with an attorney for legal guidance.',
        'Each case is unique and outcomes may vary.',
        'Attorney-client privilege does not apply to this initial consultation.',
      ],
      suggestedAttorneys: ['William Vasquez', 'Available Attorney'],
    };
  }
}
