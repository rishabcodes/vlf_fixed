/**
 * Voice Search Optimization Utility for Legal Content
 * Optimizes content for voice assistants and conversational queries
 */

import { logger } from '@/lib/safe-logger';

export interface VoiceSearchPattern {
  trigger: string[];
  response: string;
  structure: 'direct' | 'list' | 'step-by-step';
  localOptimization?: boolean;
}

export interface VoiceOptimizationOptions {
  practiceArea: string;
  location?: string;
  contentType: 'faq' | 'article' | 'guide' | 'service';
  targetAudience: 'potential_clients' | 'current_clients' | 'general_public';
}

export interface VoiceOptimizedContent {
  conversationalHeadings: string[];
  naturalLanguageQueries: string[];
  directAnswers: Array<{
    question: string;
    answer: string;
    voiceLength: number;
    isComplete: boolean;
  }>;
  localVariations: string[];
  questionStarters: string[];
}

export class VoiceSearchOptimizer {
  private commonVoiceStarters = [
    'what is',
    'how do',
    'when should',
    'where can',
    'why do',
    'can I',
    'should I',
    'will I',
    'do I need',
    'what happens if',
    'how much does',
    'how long does',
  ];

  private localModifiers = [
    'near me',
    'in my area',
    'close to me',
    'locally',
    'in [location]',
    'around [location]',
  ];

  /**
   * Optimize content for voice search queries
   */
  async optimizeForVoiceSearch(
    content: string,
    options: VoiceOptimizationOptions
  ): Promise<VoiceOptimizedContent> {
    logger.info('Optimizing content for voice search', {
      practiceArea: options.practiceArea,
      contentType: options.contentType,
    });

    const conversationalHeadings = this.generateConversationalHeadings(content, options);
    const naturalLanguageQueries = this.generateNaturalLanguageQueries(options);
    const directAnswers = this.extractDirectAnswers(content, options);
    const localVariations = this.generateLocalVariations(options);
    const questionStarters = this.generateQuestionStarters(options);

    return {
      conversationalHeadings,
      naturalLanguageQueries,
      directAnswers,
      localVariations,
      questionStarters,
    };
  }

  /**
   * Convert formal headings to conversational questions
   */
  private generateConversationalHeadings(
    content: string,
    options: VoiceOptimizationOptions
  ): string[] {
    const headings: string[] = [];
    const { practiceArea, location } = options;

    // Extract existing headings
    const existingHeadings = content.match(/^#{1,3}\s+(.+)$/gm) || [];
    
    // Generate conversational versions
    for (const heading of existingHeadings) {
      const cleanHeading = heading.replace(/^#+\s+/, '');
      
      // Convert to question format
      if (!this.isAlreadyQuestion(cleanHeading)) {
        const conversational = this.convertToQuestion(cleanHeading, practiceArea, location);
        if (conversational) {
          headings.push(conversational);
        }
      } else {
        headings.push(cleanHeading);
      }
    }

    // Add practice-area specific questions
    headings.push(...this.getPracticeAreaQuestions(practiceArea, location));

    return headings;
  }

  /**
   * Generate natural language queries people actually ask
   */
  private generateNaturalLanguageQueries(options: VoiceOptimizationOptions): string[] {
    const { practiceArea, location } = options;
    const queries: string[] = [];

    // Base queries for each practice area
    const baseQueries = this.getBaseQueries(practiceArea);
    
    // Add location variations
    if (location) {
      baseQueries.forEach(query => {
        queries.push(query);
        queries.push(`${query} in ${location}`);
        queries.push(`${query} near ${location}`);
        queries.push(`${query} ${location} area`);
      });
    } else {
      queries.push(...baseQueries);
    }

    // Add voice search specific patterns
    queries.push(...this.getVoiceSearchPatterns(practiceArea, location));

    return queries;
  }

  /**
   * Extract and optimize direct answers from content
   */
  private extractDirectAnswers(
    content: string,
    options: VoiceOptimizationOptions
  ): Array<{
    question: string;
    answer: string;
    voiceLength: number;
    isComplete: boolean;
  }> {
    const answers: Array<{
      question: string;
      answer: string;
      voiceLength: number;
      isComplete: boolean;
    }> = [];

    // Find question-based sections
    const sections = content.split(/^#{1,3}\s+/gm);
    
    for (let i = 0; i < sections.length - 1; i++) {
      const heading = sections[i]?.trim();
      const sectionContent = sections[i + 1];

      if (heading && sectionContent && this.isAlreadyQuestion(heading)) {
        const directAnswer = this.extractDirectAnswer(sectionContent);
        if (directAnswer) {
          const voiceLength = directAnswer.split(' ').length;
          answers.push({
            question: heading,
            answer: directAnswer,
            voiceLength,
            isComplete: this.isCompleteAnswer(directAnswer),
          });
        }
      }
    }

    // Generate additional Q&A pairs
    answers.push(...this.generateAdditionalQAPairs(options));

    return answers;
  }

  /**
   * Generate local search variations
   */
  private generateLocalVariations(options: VoiceOptimizationOptions): string[] {
    const { practiceArea, location } = options;
    const variations: string[] = [];

    if (!location) return variations;

    const baseTerms = this.getPracticeAreaTerms(practiceArea);
    
    baseTerms.forEach(term => {
      this.localModifiers.forEach(modifier => {
        variations.push(`${term} ${modifier.replace('[location]', location)}`);
      });
    });

    // Add specific local patterns
    variations.push(
      `best ${practiceArea} lawyer in ${location}`,
      `${practiceArea} attorney near ${location}`,
      `${location} ${practiceArea} legal help`,
      `find ${practiceArea} lawyer ${location}`,
      `${practiceArea} consultation ${location}`
    );

    return variations;
  }

  /**
   * Generate question starters for the practice area
   */
  private generateQuestionStarters(options: VoiceOptimizationOptions): string[] {
    const { practiceArea } = options;
    const starters: string[] = [];

    this.commonVoiceStarters.forEach(starter => {
      starters.push(`${starter} ${this.getPracticeAreaContext(practiceArea)}`);
    });

    return starters;
  }

  // Helper methods
  private isAlreadyQuestion(text: string): boolean {
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'can', 'should', 'will', 'do'];
    return questionWords.some(word => text.toLowerCase().startsWith(word)) || text.includes('?');
  }

  private convertToQuestion(heading: string, practiceArea: string, location?: string): string | null {
    const lower = heading.toLowerCase();
    
    if (lower.includes('benefit') || lower.includes('advantage')) {
      return `What are the benefits of ${heading.toLowerCase()}?`;
    }
    if (lower.includes('process') || lower.includes('procedure')) {
      return `How does the ${heading.toLowerCase()} work?`;
    }
    if (lower.includes('requirement') || lower.includes('eligibility')) {
      return `What are the requirements for ${heading.toLowerCase()}?`;
    }
    if (lower.includes('cost') || lower.includes('fee')) {
      return `How much does ${heading.toLowerCase()} cost?`;
    }
    if (lower.includes('time') || lower.includes('duration')) {
      return `How long does ${heading.toLowerCase()} take?`;
    }

    return `What do I need to know about ${heading.toLowerCase()}?`;
  }

  private getBaseQueries(practiceArea: string): string[] {
    const queries: Record<string, string[]> = {
      immigration: [
        'how do I apply for a green card',
        'what documents do I need for citizenship',
        'can I bring my family to the US',
        'how long does immigration take',
        'what is the cost of immigration',
        'do I qualify for asylum',
        'how do I renew my visa',
        'what is DACA',
      ],
      'personal-injury': [
        'what should I do after a car accident',
        'how much is my injury case worth',
        'do I need a lawyer for my accident',
        'what is the statute of limitations',
        'how long do injury cases take',
        'will insurance cover my injuries',
        'what if the accident was partly my fault',
        'can I sue for emotional distress',
      ],
      'criminal-defense': [
        'what should I do if arrested',
        'do I need a lawyer for DUI',
        'can I get my record expunged',
        'what are the penalties for DUI',
        'how much does a criminal lawyer cost',
        'should I take a plea deal',
        'what is the difference between felony and misdemeanor',
        'can I represent myself in court',
      ],
      'workers-compensation': [
        'what should I do if injured at work',
        'does workers comp cover all injuries',
        'how much will workers comp pay',
        'can I sue my employer',
        'what if my claim is denied',
        'do I need a lawyer for workers comp',
        'how long do I have to file a claim',
        'can I be fired for filing workers comp',
      ],
    };

    return queries[practiceArea] || [];
  }

  private getVoiceSearchPatterns(practiceArea: string, location?: string): string[] {
    const patterns: string[] = [];
    const locationPhrase = location ? ` in ${location}` : '';

    patterns.push(
      `find me a ${practiceArea} lawyer${locationPhrase}`,
      `I need help with ${practiceArea}${locationPhrase}`,
      `who is the best ${practiceArea} attorney${locationPhrase}`,
      `${practiceArea} lawyer near me`,
      `call a ${practiceArea} lawyer${locationPhrase}`,
      `${practiceArea} legal advice${locationPhrase}`,
      `${practiceArea} consultation${locationPhrase}`
    );

    return patterns;
  }

  private extractDirectAnswer(content: string): string | null {
    // Find the first paragraph that looks like a direct answer
    const paragraphs = content.split('\n\n');
    
    for (const paragraph of paragraphs) {
      const trimmed = paragraph.trim();
      if (trimmed.length > 20 && trimmed.length < 300) {
        // Check if it starts with a direct statement
        const directStarters = [
          'yes,', 'no,', 'the answer is', 'you can', 'you should', 'you will',
          'you need', 'the cost is', 'the process takes', 'the requirement is'
        ];
        
        if (directStarters.some(starter => trimmed.toLowerCase().startsWith(starter))) {
          return trimmed;
        }
      }
    }

    return null;
  }

  private isCompleteAnswer(answer: string): boolean {
    return answer.includes('.') && answer.length > 30 && answer.length < 200;
  }

  private generateAdditionalQAPairs(options: VoiceOptimizationOptions): Array<{
    question: string;
    answer: string;
    voiceLength: number;
    isComplete: boolean;
  }> {
    const { practiceArea, location } = options;
    const pairs: Array<{
      question: string;
      answer: string;
      voiceLength: number;
      isComplete: boolean;
    }> = [];

    // Common legal questions with optimized answers
    const commonQuestions = this.getCommonQuestions(practiceArea, location);
    
    commonQuestions.forEach(qa => {
      const voiceLength = qa.answer.split(' ').length;
      pairs.push({
        question: qa.question,
        answer: qa.answer,
        voiceLength,
        isComplete: voiceLength >= 30 && voiceLength <= 60,
      });
    });

    return pairs;
  }

  private getCommonQuestions(practiceArea: string, location?: string): Array<{question: string, answer: string}> {
    const locationPhrase = location ? ` in ${location}` : '';
    
    const questions: Record<string, Array<{question: string, answer: string}>> = {
      immigration: [
        {
          question: `How much does an immigration lawyer cost${locationPhrase}?`,
          answer: 'Immigration lawyer fees typically range from $150-500 per hour, with simple cases starting around $1,000 and complex cases reaching $15,000 or more. Many lawyers offer free consultations to discuss your specific situation and provide accurate pricing.',
        },
        {
          question: 'How long does it take to get a green card?',
          answer: 'Green card processing times vary by category. Family-based applications typically take 8-33 months, while employment-based can take 8-24 months. Priority dates and country of origin significantly affect timing.',
        },
      ],
      'personal-injury': [
        {
          question: `Do I need a lawyer for my car accident${locationPhrase}?`,
          answer: 'You should contact a personal injury lawyer if you suffered significant injuries, face medical bills over $5,000, the other driver was uninsured, or the insurance company denies your claim. Most attorneys offer free consultations.',
        },
        {
          question: 'How much is my personal injury case worth?',
          answer: 'Personal injury case values depend on medical expenses, lost wages, pain and suffering, and case circumstances. Most cases settle between $3,000-$75,000, but severe injuries can result in much higher settlements.',
        },
      ],
    };

    return questions[practiceArea] || [];
  }

  private getPracticeAreaTerms(practiceArea: string): string[] {
    const terms: Record<string, string[]> = {
      immigration: ['immigration lawyer', 'green card attorney', 'visa lawyer', 'citizenship attorney'],
      'personal-injury': ['personal injury lawyer', 'accident attorney', 'injury lawyer', 'car accident lawyer'],
      'criminal-defense': ['criminal lawyer', 'DUI attorney', 'defense lawyer', 'criminal defense attorney'],
      'workers-compensation': ['workers comp lawyer', 'workplace injury attorney', 'workers compensation lawyer'],
    };

    return terms[practiceArea] || [practiceArea + ' lawyer'];
  }

  private getPracticeAreaContext(practiceArea: string): string {
    const contexts: Record<string, string> = {
      immigration: 'immigration law and green cards',
      'personal-injury': 'personal injury claims and accidents',
      'criminal-defense': 'criminal charges and DUI defense',
      'workers-compensation': 'workplace injuries and workers comp',
    };

    return contexts[practiceArea] || practiceArea;
  }

  private getPracticeAreaQuestions(practiceArea: string, location?: string): string[] {
    const locationPhrase = location ? ` in ${location}` : '';
    
    const questions: Record<string, string[]> = {
      immigration: [
        `What immigration services are available${locationPhrase}?`,
        'How do I check my immigration case status?',
        'What documents do I need for my immigration case?',
        'Can I work while my immigration case is pending?',
      ],
      'personal-injury': [
        `What should I do immediately after an accident${locationPhrase}?`,
        'How long do I have to file a personal injury claim?',
        'What if the insurance company offers a settlement?',
        'Do I pay attorney fees upfront for injury cases?',
      ],
      'criminal-defense': [
        `What are my rights if arrested${locationPhrase}?`,
        'Should I talk to police without a lawyer?',
        'What is the difference between jail and prison?',
        'Can I get probation instead of jail time?',
      ],
      'workers-compensation': [
        `How do I file a workers compensation claim${locationPhrase}?`,
        'What injuries are covered by workers comp?',
        'Can I choose my own doctor for work injuries?',
        'What if my employer retaliates for filing a claim?',
      ],
    };

    return questions[practiceArea] || [];
  }
}

// Export utility functions for direct use
export const voiceSearchOptimizer = new VoiceSearchOptimizer();

export async function optimizeContentForVoice(
  content: string,
  options: VoiceOptimizationOptions
): Promise<VoiceOptimizedContent> {
  return voiceSearchOptimizer.optimizeForVoiceSearch(content, options);
}

export function generateVoiceSearchQuestions(
  practiceArea: string,
  location?: string
): string[] {
  const optimizer = new VoiceSearchOptimizer();
  return optimizer['generateNaturalLanguageQueries']({ 
    practiceArea, 
    location, 
    contentType: 'article',
    targetAudience: 'potential_clients'
  });
}

export function optimizeHeadingsForVoice(
  headings: string[],
  practiceArea: string,
  location?: string
): string[] {
  const optimizer = new VoiceSearchOptimizer();
  const content = headings.map(h => `## ${h}`).join('\n\n');
  return optimizer['generateConversationalHeadings'](content, {
    practiceArea,
    location,
    contentType: 'article',
    targetAudience: 'potential_clients'
  });
}
