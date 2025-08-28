import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { prisma } from '@/lib/prisma-safe';
import { z } from 'zod';
import { openai } from '@/lib/openai-client';

export class ReviewResponseGenerator {
  private responseTemplates: Map<string, ResponseTemplate> = new Map();
  private toneProfiles: Map<string, ToneProfile> = new Map();

  constructor() {
    this.initializeTemplates();
    this.initializeToneProfiles();
  }

  private initializeTemplates(): void {
    // Positive review templates
    this.registerTemplate({
      id: 'positive-general',
      sentiment: 'positive',
      rating: [4, 5],
      template: `Thank you so much for taking the time to share your experience, {authorName}! We're thrilled to hear that {positiveAspect}. Your trust in our firm means everything to us, and we're honored to have been able to help with your {practiceArea} matter. We look forward to continuing to serve you and your family.`,
      variables: ['authorName', 'positiveAspect', 'practiceArea'],
    });

    this.registerTemplate({
      id: 'positive-outcome',
      sentiment: 'positive',
      rating: [5],
      keywords: ['won', 'success', 'victory', 'approved'],
      template: `{authorName}, congratulations again on your {outcome}! We're so happy we could help achieve this result for you. Thank you for trusting us with your case and for sharing your experience. Your recommendation means the world to us!`,
      variables: ['authorName', 'outcome'],
    });

    // Neutral review templates
    this.registerTemplate({
      id: 'neutral-general',
      sentiment: 'neutral',
      rating: [3],
      template: `Thank you for your feedback, {authorName}. We appreciate you taking the time to share your experience. We're always looking for ways to improve our service. If there's anything specific we could have done better, please don't hesitate to reach out to us directly at {contactInfo}. We'd love the opportunity to address any concerns.`,
      variables: ['authorName', 'contactInfo'],
    });

    // Negative review templates
    this.registerTemplate({
      id: 'negative-apologetic',
      sentiment: 'negative',
      rating: [1, 2],
      template: `{authorName}, I'm truly sorry to hear about your experience. This is not the level of service we strive to provide. I would very much like to discuss this with you personally to understand what went wrong and how we can make it right. Please contact me directly at {directContact}. Your feedback is important to us, and we take it very seriously.`,
      variables: ['authorName', 'directContact'],
      requiresApproval: true,
    });

    this.registerTemplate({
      id: 'negative-misunderstanding',
      sentiment: 'negative',
      rating: [1, 2],
      keywords: ['misunderstanding', 'confusion', 'miscommunication'],
      template: `Thank you for bringing this to our attention, {authorName}. It appears there may have been a misunderstanding, and I sincerely apologize for any confusion. We'd like to clarify the situation and ensure you have the correct information. Please reach out to us at {contactInfo} so we can resolve this promptly.`,
      variables: ['authorName', 'contactInfo'],
      requiresApproval: true,
    });

    // Specific issue templates
    this.registerTemplate({
      id: 'communication-issue',
      sentiment: 'negative',
      keywords: ['communication', 'response', 'call back', 'email'],
      template: `{authorName}, I apologize for the communication issues you experienced. We understand how frustrating it can be when you don't receive timely responses. We've recently implemented new systems to ensure better communication with our clients. I'd like to personally ensure your concerns are addressed. Please contact me at {directContact}.`,
      variables: ['authorName', 'directContact'],
      requiresApproval: true,
    });

    this.registerTemplate({
      id: 'billing-concern',
      sentiment: 'negative',
      keywords: ['billing', 'fee', 'charge', 'expensive', 'cost'],
      template: `Thank you for your feedback, {authorName}. We understand that legal fees can be a concern. We always strive to be transparent about our billing and provide value for our services. I'd be happy to review your billing concerns personally. Please contact our office at {contactInfo} and ask for me directly.`,
      variables: ['authorName', 'contactInfo'],
      requiresApproval: true,
    });

    // Spanish templates
    this.registerTemplate({
      id: 'positive-spanish',
      sentiment: 'positive',
      language: 'es',
      rating: [4, 5],
      template: `¡Muchas gracias por tomarse el tiempo de compartir su experiencia, {authorName}! Nos alegra mucho saber que {positiveAspect}. Su confianza en nuestro bufete significa todo para nosotros, y es un honor haber podido ayudarle con su caso de {practiceArea}. Esperamos seguir sirviéndole a usted y a su familia.`,
      variables: ['authorName', 'positiveAspect', 'practiceArea'],
    });
  }

  private initializeToneProfiles(): void {
    // Professional tone
    this.registerToneProfile({
      id: 'professional',
      name: 'Professional',
      characteristics: {
        formality: 'high',
        empathy: 'medium',
        brevity: 'medium',
        personalization: 'medium',
      },
      guidelines: [
        'Use formal language',
        'Maintain professional distance',
        'Focus on facts and solutions',
        'Avoid colloquialisms',
      ],
    });

    // Warm & Personal tone
    this.registerToneProfile({
      id: 'warm-personal',
      name: 'Warm & Personal',
      characteristics: {
        formality: 'medium',
        empathy: 'high',
        brevity: 'low',
        personalization: 'high',
      },
      guidelines: [
        'Use friendly, approachable language',
        'Show genuine care and understanding',
        'Reference specific details from the review',
        'Express gratitude warmly',
      ],
    });

    // Empathetic tone (for negative reviews)
    this.registerToneProfile({
      id: 'empathetic',
      name: 'Empathetic',
      characteristics: {
        formality: 'medium',
        empathy: 'very-high',
        brevity: 'medium',
        personalization: 'high',
      },
      guidelines: [
        'Acknowledge feelings and frustrations',
        'Take responsibility without admitting fault',
        'Show genuine desire to resolve issues',
        'Use compassionate language',
      ],
    });
  }

  private registerTemplate(template: ResponseTemplate): void {
    this.responseTemplates.set(template.id, template);
  }

  private registerToneProfile(profile: ToneProfile): void {
    this.toneProfiles.set(profile.id, profile);
  }

  async generateResponse(review: any, options?: GenerateOptions): Promise<GeneratedResponse> {
    try {
      const sentiment = review.sentiment || this.analyzeSentiment(review);
      const language = this.detectLanguage(review.content);

      // Select appropriate template
      const template = this.selectTemplate(review, sentiment, language);

      // Select tone profile
      const toneProfile = this.selectToneProfile(sentiment, options?.toneOverride);

      let responseText: string;

      if (options?.useAI !== false) {
        // Generate AI response
        responseText = await this.generateAIResponse(review, template, toneProfile);
      } else {
        // Use template-based response
        responseText = template
          ? this.fillTemplate(template, review)
          : 'Thank you for your review. We appreciate your feedback.';
      }

      // Post-process response
      responseText = this.postProcessResponse(responseText, review);

      // Check compliance
      const compliance = await this.checkCompliance(responseText);

      return {
        success: true,
        response: responseText,
        template: template?.id,
        tone: toneProfile.id,
        requiresApproval: template?.requiresApproval || !compliance.passed,
        complianceCheck: compliance,
        language,
        metadata: {
          reviewId: review.id,
          platformId: review.platformId,
          sentiment,
          generatedAt: new Date(),
        },
      };
    } catch (error) {
      logger.error('Failed to generate review response:', errorToLogMeta(error));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate response',
      };
    }
  }

  private selectTemplate(
    review: any,
    sentiment: string,
    language: string
  ): ResponseTemplate | null {
    const templates = Array.from(this.responseTemplates.values());

    // Filter by language
    const languageTemplates = templates.filter(t => !t.language || t.language === language);

    // Filter by sentiment
    const sentimentTemplates = languageTemplates.filter(t => t.sentiment === sentiment);

    // Filter by rating
    const ratingTemplates = sentimentTemplates.filter(
      t => !t.rating || t.rating.includes(review.rating)
    );

    // Check keywords
    for (const template of ratingTemplates) {
      if (template.keywords) {
        const hasKeyword = template.keywords.some(keyword =>
          review.content.toLowerCase().includes(keyword.toLowerCase())
        );
        if (hasKeyword) return template;
      }
    }

    // Return first matching template or null
    return ratingTemplates[0] || null;
  }

  private selectToneProfile(sentiment: string, override?: string): ToneProfile {
    if (override && this.toneProfiles.has(override)) {
      return this.toneProfiles.get(override)!;
    }

    // Select based on sentiment
    switch (sentiment) {
      case 'negative':
        return this.toneProfiles.get('empathetic')!;
      case 'positive':
        return this.toneProfiles.get('warm-personal')!;
      default:
        return this.toneProfiles.get('professional')!;
    }
  }

  private async generateAIResponse(
    review: any,
    template: ResponseTemplate | null,
    toneProfile: ToneProfile
  ): Promise<string> {
    const prompt = this.buildAIPrompt(review, template, toneProfile);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional representative of Vasquez Law Firm, responding to online reviews. Always maintain professionalism, show empathy, and never admit fault or discuss specific case details.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content || '';
  }

  private buildAIPrompt(
    review: any,
    template: ResponseTemplate | null,
    toneProfile: ToneProfile
  ): string {
    let prompt = `Generate a response to this ${review.rating}-star review:\n\n`;
    prompt += `Review: "${review.content}"\n`;
    prompt += `Author: ${review.author}\n`;
    prompt += `Platform: ${review.platformId}\n\n`;

    prompt += `Tone Guidelines:\n`;
    toneProfile.guidelines.forEach(guideline => {
      prompt += `- ${guideline}\n`;
    });

    if (template) {
      prompt += `\nUse this as inspiration but don't copy exactly:\n`;
      prompt += template.template + '\n';
    }

    prompt += `\nRequirements:\n`;
    prompt += `- Keep response under 150 words\n`;
    prompt += `- Thank the reviewer by name\n`;
    prompt += `- Be specific to their feedback\n`;
    prompt += `- Include a call to action when appropriate\n`;
    prompt += `- Never discuss specific case details\n`;
    prompt += `- Never admit fault or liability\n`;

    return prompt;
  }

  private fillTemplate(template: ResponseTemplate, review: any): string {
    let response = template.template;

    const variables: Record<string, string> = {
      authorName: review.author,
      contactInfo: '(919) 555-0123 or info@vasquezlawfirm.com',
      directContact: 'wvasquez@vasquezlawfirm.com or (919) 555-0100',
      practiceArea: this.extractPracticeArea(review.content),
      positiveAspect: this.extractPositiveAspect(review.content),
      outcome: this.extractOutcome(review.content),
    };

    // Replace variables
    template.variables.forEach(variable => {
      const value = variables[variable] || `[${variable}]`;
      response = response.replace(`{${variable}}`, value);
    });

    return response;
  }

  private postProcessResponse(response: string, review: any): string {
    // Add signature
    response += '\n\n- William Vasquez, Managing Attorney\nVasquez Law Firm, PLLC';

    // Ensure proper length
    if (response.length > 500) {
      response = response.substring(0, 497) + '...';
    }

    return response;
  }

  private async checkCompliance(response: string): Promise<ComplianceCheck> {
    const issues: string[] = [];

    // Check for prohibited content
    const prohibited = [
      'guarantee',
      'guaranteed',
      'definitely win',
      'always win',
      'admission of guilt',
      'our fault',
      'confidential',
      'client information',
    ];

    prohibited.forEach(term => {
      if (response.toLowerCase().includes(term)) {
        issues.push(`Contains prohibited term: "${term}"`);
      }
    });

    // Check for required elements
    if (!response.includes('Thank you') && !response.includes('Gracias')) {
      issues.push('Missing thank you');
    }

    // Check length
    if (response.length < 50) {
      issues.push('Response too short');
    }

    if (response.length > 500) {
      issues.push('Response too long');
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  }

  private analyzeSentiment(review: any): string {
    if (review.rating >= 4) return 'positive';
    if (review.rating <= 2) return 'negative';
    return 'neutral';
  }

  private detectLanguage(content: string): string {
    // Simple language detection
    const spanishIndicators = ['gracias', 'abogado', 'caso', 'ayuda', 'excelente', 'recomiendo'];
    const spanishCount = spanishIndicators.filter(word =>
      content.toLowerCase().includes(word)
    ).length;

    return spanishCount >= 2 ? 'es' : 'en';
  }

  private extractPracticeArea(content: string): string {
    const areas = [
      { keywords: ['immigration', 'visa', 'green card', 'citizenship'], name: 'immigration' },
      { keywords: ['criminal', 'arrest', 'charge', 'dui', 'dwi'], name: 'criminal defense' },
      { keywords: ['divorce', 'custody', 'family'], name: 'family law' },
      { keywords: ['injury', 'accident', 'injured'], name: 'personal injury' },
      { keywords: ['workers comp', 'work injury', 'workplace'], name: 'workers compensation' },
    ];

    const lowerContent = content.toLowerCase();
    for (const area of areas) {
      if (area.keywords.some(keyword => lowerContent.includes(keyword))) {
        return area.name;
      }
    }

    return 'legal';
  }

  private extractPositiveAspect(content: string): string {
    // Extract positive phrases
    const positivePatterns = [
      /(?:was|were) (?:very )?(?:professional|helpful|knowledgeable|responsive)/i,
      /(?:excellent|outstanding|amazing|great) (?:service|attorney|lawyer|experience)/i,
      /(?:highly|definitely|strongly) recommend/i,
    ];

    for (const pattern of positivePatterns) {
      const match = content.match(pattern);
      if (match) return match[0];
    }

    return 'you had a positive experience with our firm';
  }

  private extractOutcome(content: string): string {
    const outcomePatterns = [
      /(?:won|winning) (?:my|our|the) case/i,
      /(?:got|received) (?:my|our) (?:green card|visa|citizenship)/i,
      /charges (?:were )?(?:dropped|dismissed)/i,
      /(?:successful|positive) (?:outcome|result)/i,
    ];

    for (const pattern of outcomePatterns) {
      const match = content.match(pattern);
      if (match) return match[0];
    }

    return 'successful outcome';
  }

  // Batch generate responses
  async batchGenerateResponses(
    reviews: any[],
    options?: GenerateOptions
  ): Promise<Map<string, GeneratedResponse>> {
    const results = new Map<string, GeneratedResponse>();

    // Process in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < reviews.length; i += batchSize) {
      const batch = reviews.slice(i, i + batchSize);

      const batchPromises = batch.map(review =>
        this.generateResponse(review, options).then(response => ({ reviewId: review.id, response }))
      );

      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach(({ reviewId, response }) => {
        results.set(reviewId, response);
      });

      // Add delay between batches
      if (i + batchSize < reviews.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }
}

// Types
interface ResponseTemplate {
  id: string;
  sentiment: string;
  rating?: number[];
  keywords?: string[];
  language?: string;
  template: string;
  variables: string[];
  requiresApproval?: boolean;
}

interface ToneProfile {
  id: string;
  name: string;
  characteristics: {
    formality: string;
    empathy: string;
    brevity: string;
    personalization: string;
  };
  guidelines: string[];
}

interface GenerateOptions {
  useAI?: boolean;
  toneOverride?: string;
  includeSignature?: boolean;
  maxLength?: number;
}

interface GeneratedResponse {
  success: boolean;
  response?: string;
  template?: string;
  tone?: string;
  requiresApproval?: boolean;
  complianceCheck?: ComplianceCheck;
  language?: string;
  metadata?: any;
  error?: string;
}

interface ComplianceCheck {
  passed: boolean;
  issues: string[];
}

export const responseGenerator = new ReviewResponseGenerator();
