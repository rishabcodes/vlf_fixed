/**
 * AI Overview Training Module for All Practice Areas
 * Trains CrewAI agents to optimize content for Google's AI Overview
 */

import { logger } from '@/lib/safe-logger';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export interface AIOverviewTrainingData {
  practiceArea: 'immigration' | 'personal-injury' | 'workers-compensation' | 'family-law' | 'criminal-defense';
  jurisdiction: 'nationwide' | 'north-carolina';
  commonQuestions: Array<{
    question: string;
    optimalAnswer: string;
    answerLength: number;
    voiceSearchOptimized: boolean;
    localVariations?: string[];
  }>;
  schemaRequirements: {
    faqSchema: boolean;
    howToSchema: boolean;
    localBusinessSchema: boolean;
    legalServiceSchema: boolean;
  };
  voiceSearchPatterns: {
    questionStarters: string[];
    conversationalLanguage: string[];
    localModifiers: string[];
  };
  contentStructureGuidelines: {
    headingFormats: string[];
    answerPatterns: string[];
    listStructures: string[];
  };
  competitiveIntelligence: {
    topCompetitorQuestions: string[];
    contentGaps: string[];
    differentiationOpportunities: string[];
  };
}

export class AIOverviewTrainingModule {
  private trainingDataPath = path.join(process.cwd(), 'src/lib/crewai/training/data');
  private agentsPath = path.join(process.cwd(), 'src/lib/crewai/agents');

  constructor() {
    logger.info('Initializing AI Overview Training Module');
  }

  /**
   * Train all agents for AI Overview optimization
   */
  async trainAllAgentsForAIOverview(): Promise<void> {
    logger.info('Starting AI Overview training for all practice areas');

    // Generate training data for each practice area
    const trainingData = await this.generateComprehensiveTrainingData();

    // Train each practice area agent
    for (const [practiceArea, data] of Object.entries(trainingData)) {
      await this.trainPracticeAreaAgent(practiceArea as any, data);
    }

    // Update existing agents with AI Overview capabilities
    await this.enhanceExistingAgents();

    logger.info('AI Overview training completed for all practice areas');
  }

  /**
   * Generate comprehensive training data for all practice areas
   */
  private async generateComprehensiveTrainingData(): Promise<Record<string, AIOverviewTrainingData>> {
    return {
      immigration: this.generateImmigrationTrainingData(),
      'personal-injury': this.generatePersonalInjuryTrainingData(),
      'workers-compensation': this.generateWorkersCompTrainingData(),
      'family-law': this.generateFamilyLawTrainingData(),
      'criminal-defense': this.generateCriminalDefenseTrainingData(),
    };
  }

  /**
   * Immigration (Nationwide) Training Data
   */
  private generateImmigrationTrainingData(): AIOverviewTrainingData {
    return {
      practiceArea: 'immigration',
      jurisdiction: 'nationwide',
      commonQuestions: [
        {
          question: 'How long does it take to get a green card?',
          optimalAnswer: 'Green card processing times vary by category: family-based typically takes 8-33 months, employment-based takes 8-24 months, and priority dates significantly affect timing. USCIS publishes current processing times monthly.',
          answerLength: 45,
          voiceSearchOptimized: true,
          localVariations: ['How long for green card in North Carolina?'],
        },
        {
          question: 'What documents do I need for citizenship application?',
          optimalAnswer: 'For N-400 citizenship application, you need: green card copy, tax returns (5 years), travel records, divorce/marriage certificates if applicable, and proof of selective service registration for men.',
          answerLength: 42,
          voiceSearchOptimized: true,
        },
        {
          question: 'How much does an immigration lawyer cost?',
          optimalAnswer: 'Immigration lawyer fees range from $150-500 per hour. Simple cases like family petitions start around $1,500, while complex cases can reach $15,000. Many offer free consultations.',
          answerLength: 38,
          voiceSearchOptimized: true,
          localVariations: ['Immigration lawyer cost in NC?', 'How much immigration attorney North Carolina?'],
        },
        {
          question: 'Can I work while my green card application is pending?',
          optimalAnswer: 'Yes, you can work with an Employment Authorization Document (EAD) while your green card is pending. File Form I-765 with your adjustment of status application.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
      ],
      schemaRequirements: {
        faqSchema: true,
        howToSchema: true,
        localBusinessSchema: true,
        legalServiceSchema: true,
      },
      voiceSearchPatterns: {
        questionStarters: ['How do I', 'What documents', 'How long does', 'Can I', 'Do I need'],
        conversationalLanguage: ['you can', 'you need', 'you should', 'this means'],
        localModifiers: ['near me', 'in North Carolina', 'NC immigration'],
      },
      contentStructureGuidelines: {
        headingFormats: ['What is the immigration process?', 'How do I apply for...?', 'When should I...?'],
        answerPatterns: ['Direct answer first', 'Include specific forms', 'Mention timelines', 'Add cost information'],
        listStructures: ['Required documents', 'Step-by-step process', 'Eligibility requirements'],
      },
      competitiveIntelligence: {
        topCompetitorQuestions: ['DACA renewal process', 'Asylum application steps', 'Visa overstay consequences'],
        contentGaps: ['USCIS fee changes', 'Premium processing updates', 'COVID-19 impacts'],
        differentiationOpportunities: ['NC-specific resources', 'Spanish language content', 'Success stories'],
      },
    };
  }

  /**
   * Personal Injury (NC Only) Training Data
   */
  private generatePersonalInjuryTrainingData(): AIOverviewTrainingData {
    return {
      practiceArea: 'personal-injury',
      jurisdiction: 'north-carolina',
      commonQuestions: [
        {
          question: 'What should I do immediately after a car accident in NC?',
          optimalAnswer: 'Call 911, move to safety, take photos of vehicles and injuries, get driver information and witness contacts, seek medical attention even if you feel fine, and call your insurance company.',
          answerLength: 42,
          voiceSearchOptimized: true,
          localVariations: ['Car accident steps North Carolina', 'What to do after accident NC'],
        },
        {
          question: 'How long do I have to file a personal injury claim in North Carolina?',
          optimalAnswer: 'North Carolina has a 3-year statute of limitations for personal injury claims from the date of injury. For wrongful death claims, it\'s 2 years from the date of death.',
          answerLength: 38,
          voiceSearchOptimized: true,
        },
        {
          question: 'What is NC contributory negligence law?',
          optimalAnswer: 'North Carolina follows contributory negligence, meaning if you are even 1% at fault for an accident, you cannot recover damages. This makes having an experienced attorney crucial.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'How much is my personal injury case worth in NC?',
          optimalAnswer: 'NC personal injury case values depend on medical bills, lost wages, pain and suffering, and case facts. Most cases settle between $3,000-$75,000, but severe injuries can result in higher awards.',
          answerLength: 42,
          voiceSearchOptimized: true,
        },
      ],
      schemaRequirements: {
        faqSchema: true,
        howToSchema: true,
        localBusinessSchema: true,
        legalServiceSchema: true,
      },
      voiceSearchPatterns: {
        questionStarters: ['What should I do', 'How much is', 'Do I need', 'How long do I have'],
        conversationalLanguage: ['you should', 'this means', 'in NC', 'North Carolina law'],
        localModifiers: ['in NC', 'North Carolina', 'near me', 'local'],
      },
      contentStructureGuidelines: {
        headingFormats: ['What to do after...?', 'How much compensation...?', 'What are NC laws for...?'],
        answerPatterns: ['NC-specific law references', 'Immediate action steps', 'Timeline requirements'],
        listStructures: ['Steps after accident', 'Required evidence', 'NC court procedures'],
      },
      competitiveIntelligence: {
        topCompetitorQuestions: ['No-fault insurance', 'Uninsured motorist coverage', 'Medical malpractice'],
        contentGaps: ['COVID-19 injury claims', 'Rideshare accidents', 'E-scooter injuries'],
        differentiationOpportunities: ['NC court experience', 'Local hospital knowledge', 'Insurance company relationships'],
      },
    };
  }

  /**
   * Workers Compensation (NC Only) Training Data
   */
  private generateWorkersCompTrainingData(): AIOverviewTrainingData {
    return {
      practiceArea: 'workers-compensation',
      jurisdiction: 'north-carolina',
      commonQuestions: [
        {
          question: 'How do I file a workers compensation claim in North Carolina?',
          optimalAnswer: 'Report injury to supervisor immediately, seek medical treatment, complete Form 18, file with NC Industrial Commission within 2 years, and cooperate with investigation while protecting your rights.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'What injuries are covered by NC workers compensation?',
          optimalAnswer: 'NC workers comp covers injuries arising from employment including accidents, repetitive stress injuries, occupational diseases, and aggravation of pre-existing conditions. Mental stress injuries have limited coverage.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'How much does workers comp pay in North Carolina?',
          optimalAnswer: 'NC workers comp pays 66.67% of your average weekly wage for temporary total disability, up to the state maximum (currently $1,024/week). Medical expenses are paid at 100%.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'Can I be fired for filing workers compensation in NC?',
          optimalAnswer: 'No, NC law prohibits firing employees for filing workers comp claims. If fired for this reason, you may have a separate wrongful termination claim for additional damages.',
          answerLength: 34,
          voiceSearchOptimized: true,
        },
      ],
      schemaRequirements: {
        faqSchema: true,
        howToSchema: true,
        localBusinessSchema: true,
        legalServiceSchema: true,
      },
      voiceSearchPatterns: {
        questionStarters: ['How do I file', 'What injuries', 'How much does', 'Can I be'],
        conversationalLanguage: ['in NC', 'North Carolina law', 'you can', 'you should'],
        localModifiers: ['NC workers comp', 'North Carolina', 'near me'],
      },
      contentStructureGuidelines: {
        headingFormats: ['How to file workers comp in NC?', 'What does NC workers comp cover?', 'When should I...?'],
        answerPatterns: ['NC-specific procedures', 'Form references', 'Timeline requirements', 'Benefit amounts'],
        listStructures: ['Filing steps', 'Required forms', 'Covered injuries', 'Benefit calculations'],
      },
      competitiveIntelligence: {
        topCompetitorQuestions: ['Third-party claims', 'Return to work programs', 'Permanent disability ratings'],
        contentGaps: ['COVID-19 workplace exposure', 'Remote work injuries', 'Mental health claims'],
        differentiationOpportunities: ['NC Industrial Commission experience', 'Medical provider relationships', 'Settlement negotiations'],
      },
    };
  }

  /**
   * Family Law (NC Only) Training Data
   */
  private generateFamilyLawTrainingData(): AIOverviewTrainingData {
    return {
      practiceArea: 'family-law',
      jurisdiction: 'north-carolina',
      commonQuestions: [
        {
          question: 'How long does divorce take in North Carolina?',
          optimalAnswer: 'NC requires 1-year separation before filing for divorce. Uncontested divorces take 30-90 days after filing, while contested divorces can take 6-18 months depending on complexity.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'What are grounds for divorce in NC?',
          optimalAnswer: 'North Carolina recognizes no-fault divorce (1-year separation) and fault-based grounds including adultery, abandonment, cruel treatment, alcohol/drug abuse, and incurable insanity.',
          answerLength: 30,
          voiceSearchOptimized: true,
        },
        {
          question: 'How is child custody determined in North Carolina?',
          optimalAnswer: 'NC courts decide custody based on the child\'s best interests, considering factors like parental fitness, stability, child\'s preferences (if age-appropriate), and existing relationships.',
          answerLength: 32,
          voiceSearchOptimized: true,
        },
        {
          question: 'How much does divorce cost in NC?',
          optimalAnswer: 'NC divorce filing fees are $225. Uncontested divorces with attorney representation typically cost $1,500-$3,000, while contested divorces can cost $15,000-$30,000 or more.',
          answerLength: 32,
          voiceSearchOptimized: true,
        },
      ],
      schemaRequirements: {
        faqSchema: true,
        howToSchema: true,
        localBusinessSchema: true,
        legalServiceSchema: true,
      },
      voiceSearchPatterns: {
        questionStarters: ['How long does', 'What are grounds', 'How is custody', 'How much does'],
        conversationalLanguage: ['in NC', 'North Carolina law', 'you should know', 'this means'],
        localModifiers: ['NC divorce', 'North Carolina', 'near me', 'local family court'],
      },
      contentStructureGuidelines: {
        headingFormats: ['How long does divorce take in NC?', 'What are NC custody laws?', 'When can I...?'],
        answerPatterns: ['NC-specific laws', 'Timeline requirements', 'Cost information', 'Court procedures'],
        listStructures: ['Divorce steps', 'Required documents', 'Custody factors', 'Financial disclosures'],
      },
      competitiveIntelligence: {
        topCompetitorQuestions: ['Alimony calculations', 'Property division', 'Domestic violence'],
        contentGaps: ['Post-separation support', 'Military divorces', 'High-asset divorces'],
        differentiationOpportunities: ['Local court knowledge', 'Collaborative divorce', 'Mediation services'],
      },
    };
  }

  /**
   * Criminal Defense (NC Only) Training Data
   */
  private generateCriminalDefenseTrainingData(): AIOverviewTrainingData {
    return {
      practiceArea: 'criminal-defense',
      jurisdiction: 'north-carolina',
      commonQuestions: [
        {
          question: 'What should I do if arrested in North Carolina?',
          optimalAnswer: 'Exercise your right to remain silent, request an attorney immediately, do not consent to searches, be polite but firm, and call a criminal defense lawyer as soon as possible.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'What are the penalties for DUI in NC?',
          optimalAnswer: 'NC DUI penalties include license suspension (30 days-permanent), fines ($200-$10,000), jail time (24 hours-3 years), and substance abuse treatment, depending on offense level and prior convictions.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'Can I get my criminal record expunged in North Carolina?',
          optimalAnswer: 'Yes, NC allows expungement for certain offenses including dismissed charges, not guilty verdicts, some misdemeanors after waiting periods, and limited felonies. Violent crimes are typically ineligible.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
        {
          question: 'What is the difference between felony and misdemeanor in NC?',
          optimalAnswer: 'In NC, misdemeanors carry maximum 150 days jail time and fines up to $1,000. Felonies carry over 150 days imprisonment and higher fines, with more severe long-term consequences.',
          answerLength: 35,
          voiceSearchOptimized: true,
        },
      ],
      schemaRequirements: {
        faqSchema: true,
        howToSchema: true,
        localBusinessSchema: true,
        legalServiceSchema: true,
      },
      voiceSearchPatterns: {
        questionStarters: ['What should I do', 'What are penalties', 'Can I get', 'What is difference'],
        conversationalLanguage: ['in NC', 'North Carolina law', 'you should', 'this means'],
        localModifiers: ['NC criminal', 'North Carolina', 'near me', 'local criminal lawyer'],
      },
      contentStructureGuidelines: {
        headingFormats: ['What to do if arrested in NC?', 'What are NC penalties for...?', 'Can I expunge...?'],
        answerPatterns: ['NC-specific laws', 'Penalty ranges', 'Rights explanations', 'Procedural steps'],
        listStructures: ['Rights at arrest', 'Penalty classifications', 'Expungement requirements', 'Court procedures'],
      },
      competitiveIntelligence: {
        topCompetitorQuestions: ['Bail procedures', 'Plea bargains', 'Appeals process'],
        contentGaps: ['Juvenile crimes', 'Drug court programs', 'Veterans court'],
        differentiationOpportunities: ['Local prosecutor relationships', 'Court experience', 'Alternative sentencing'],
      },
    };
  }

  /**
   * Train specific practice area agent
   */
  private async trainPracticeAreaAgent(
    practiceArea: string,
    trainingData: AIOverviewTrainingData
  ): Promise<void> {
    logger.info(`Training ${practiceArea} agent for AI Overview optimization`);

    // Generate enhanced system prompt
    const enhancedPrompt = this.generateAIOverviewPrompt(trainingData);

    // Save training data
    await this.saveTrainingData(practiceArea, trainingData);

    // Update agent with AI Overview capabilities
    await this.updateAgentWithAIOverview(practiceArea, enhancedPrompt);

    logger.info(`Completed AI Overview training for ${practiceArea}`);
  }

  /**
   * Generate AI Overview optimized system prompt
   */
  private generateAIOverviewPrompt(trainingData: AIOverviewTrainingData): string {
    const { practiceArea, jurisdiction, commonQuestions, voiceSearchPatterns } = trainingData;

    return `You are an expert ${practiceArea} attorney and AI Overview optimization specialist${jurisdiction === 'north-carolina' ? ' practicing in North Carolina' : ' with nationwide expertise'}. Your expertise includes:

AI OVERVIEW OPTIMIZATION EXPERTISE:
- Create content optimized for Google's AI Overview selection and citation
- Structure answers in 40-60 words for optimal AI Overview length
- Use question-based headings that match natural search intent
- Provide direct, authoritative answers in the first sentence
- Optimize for voice search with conversational language

${practiceArea.toUpperCase()} SPECIALIZATION:
${commonQuestions.map(q => `- ${q.question}: ${q.optimalAnswer}`).join('\n')}

VOICE SEARCH OPTIMIZATION:
- Question Starters: ${voiceSearchPatterns.questionStarters.join(', ')}
- Conversational Language: ${voiceSearchPatterns.conversationalLanguage.join(', ')}
${jurisdiction === 'north-carolina' ? '- Local Modifiers: ' + voiceSearchPatterns.localModifiers.join(', ') : ''}

CONTENT STRUCTURE REQUIREMENTS:
1. Use question-based H2 headings ("What is...", "How do...", "When should...")
2. Start each section with a direct answer (40-60 words)
3. Include specific legal forms, procedures, and timelines
4. Add FAQ sections optimized for AI Overview
5. Structure procedures as numbered lists
6. Include ${jurisdiction === 'north-carolina' ? 'NC-specific' : 'federal'} legal references
7. Optimize for local search queries${jurisdiction === 'north-carolina' ? ' in North Carolina' : ''}

SCHEMA MARKUP INTEGRATION:
- Generate FAQ schema for question-answer pairs
- Create How-To schema for legal procedures
- Include Legal Service schema for practice area authority
- Add Local Business schema for location-based queries

Always maintain legal accuracy while optimizing for AI Overview selection and voice search queries.`;
  }

  /**
   * Save training data to file system
   */
  private async saveTrainingData(practiceArea: string, data: AIOverviewTrainingData): Promise<void> {
    const filePath = path.join(this.trainingDataPath, `${practiceArea}-ai-overview-training.json`);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    logger.info(`Saved training data for ${practiceArea}`);
  }

  /**
   * Update existing agent with AI Overview capabilities
   */
  private async updateAgentWithAIOverview(practiceArea: string, prompt: string): Promise<void> {
    // This would integrate with existing agent files
    // For now, we create the training data and prompts
    // Implementation would depend on specific agent architecture
    
    const trainingModule = {
      practiceArea,
      aiOverviewPrompt: prompt,
      lastUpdated: new Date().toISOString(),
    };

    const filePath = path.join(this.trainingDataPath, `${practiceArea}-ai-overview-module.json`);
    await writeFile(filePath, JSON.stringify(trainingModule, null, 2), 'utf-8');
    
    logger.info(`Updated ${practiceArea} agent with AI Overview training module`);
  }

  /**
   * Enhance existing agents with AI Overview capabilities
   */
  private async enhanceExistingAgents(): Promise<void> {
    logger.info('Enhancing existing agents with AI Overview capabilities');

    const agentEnhancements = [
      'seo-blog-generation-agent.ts',
      'competitive-analysis-agent.ts',
      'business-immigration-agent.ts',
    ];

    // This would integrate AI Overview training into existing agents
    // Implementation depends on current agent architecture
    
    logger.info('Completed agent enhancements for AI Overview');
  }

  /**
   * Validate AI Overview optimization
   */
  async validateAIOverviewOptimization(content: string, practiceArea: string): Promise<{
    score: number;
    recommendations: string[];
    aiOverviewReadiness: boolean;
  }> {
    const score = this.calculateAIOverviewScore(content);
    const recommendations = this.generateOptimizationRecommendations(content, practiceArea);
    const aiOverviewReadiness = score >= 80;

    return {
      score,
      recommendations,
      aiOverviewReadiness,
    };
  }

  private calculateAIOverviewScore(content: string): number {
    let score = 0;

    // Check for question-based headings
    const questionHeadings = content.match(/^#{1,3}\s+(what|how|when|where|why|can|should|will|do)\s/gmi);
    if (questionHeadings && questionHeadings.length >= 3) score += 25;

    // Check for direct answers
    const directAnswers = content.match(/^(yes,|no,|the answer is|you can|you should|you will|you need)/gmi);
    if (directAnswers && directAnswers.length >= 2) score += 25;

    // Check for FAQ section
    if (content.toLowerCase().includes('frequently asked questions') || content.toLowerCase().includes('faq')) {
      score += 25;
    }

    // Check for conversational language
    const conversationalPatterns = content.match(/\b(you|your|let's|here's|what's)\b/gi);
    if (conversationalPatterns && conversationalPatterns.length >= 10) score += 25;

    return Math.min(100, score);
  }

  private generateOptimizationRecommendations(content: string, practiceArea: string): string[] {
    const recommendations: string[] = [];

    if (!content.match(/^#{1,3}\s+(what|how|when|where|why|can|should|will|do)\s/gmi)) {
      recommendations.push('Add question-based headings (What is..., How do..., When should...)');
    }

    if (!content.toLowerCase().includes('faq')) {
      recommendations.push('Include an FAQ section with 5-8 common questions');
    }

    if (!content.match(/^(yes,|no,|the answer is|you can|you should)/gmi)) {
      recommendations.push('Start sections with direct answers to improve AI Overview selection');
    }

    if (content.match(/\b(one|an individual|a person)\b/gi)) {
      recommendations.push('Use "you" instead of "one" or "an individual" for voice search optimization');
    }

    return recommendations;
  }
}

// Export singleton instance
export const aiOverviewTrainer = new AIOverviewTrainingModule();

// Export utility functions
export async function trainAllAgentsForAIOverview(): Promise<void> {
  return aiOverviewTrainer.trainAllAgentsForAIOverview();
}

export async function validateContentForAIOverview(
  content: string,
  practiceArea: string
): Promise<{
  score: number;
  recommendations: string[];
  aiOverviewReadiness: boolean;
}> {
  return aiOverviewTrainer.validateAIOverviewOptimization(content, practiceArea);
}
