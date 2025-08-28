import { componentLogger as logger } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import OpenAI from 'openai';
import { GoogleNewsAPI } from '@/lib/external-apis/google-news';
import { KeywordResearchAPI, type KeywordData } from '@/lib/external-apis/keyword-research';
import { TrendAnalyzer } from '@/lib/external-apis/trend-analyzer';

export interface BlogGenerationOptions {
  topic: string;
  practiceArea: string;
  language: string;
  targetKeywords: string[];
  includeLocalCaseStudy: boolean;
  optimizeForVoiceSearch: boolean;
}

export interface GeneratedBlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  featuredImage: string;
  images: string[];
  author: string;
  faqSection: Array<{ question: string; answer: string }>;
  readTime: number;
}

export class BlogContentGenerator {
  private openai: OpenAI;
  private googleNews: GoogleNewsAPI;
  private keywordAPI: KeywordResearchAPI;
  private trendAnalyzer: TrendAnalyzer;

  constructor() {
    // Delay OpenAI initialization to avoid startup errors
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    } else {
      // Create a dummy client that will throw on use
      this.openai = null as any;
    }
    this.googleNews = new GoogleNewsAPI();
    this.keywordAPI = new KeywordResearchAPI();
    this.trendAnalyzer = new TrendAnalyzer();
  }

  private getOpenAIContent(response: OpenAI.Chat.Completions.ChatCompletion): string {
    const firstChoice = response.choices?.[0];
    if (firstChoice?.message?.content) {
      // Strip markdown code blocks if present
      let content = firstChoice.message.content;
      
      // Remove ```json and ``` markers if present
      if (content.startsWith('```json')) {
        content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (content.startsWith('```')) {
        content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      return content.trim();
    }
    return '';
  }

  async initialize() {
    logger.info('Initializing Blog Content Generator');
    // Initialize any necessary connections or caches
  }

  /**
   * Get trending legal topics from various sources
   */
  async getTrendingTopics() {
    logger.info('Fetching trending legal topics');

    const topics: Array<{
      title: string;
      practiceArea: string;
      keywords: string[];
      relevanceScore: number;
      isVoiceSearch: boolean;
      source: string;
    }> = [];

    try {
      // Get trending searches related to legal topics
      const trendingSearches = await this.trendAnalyzer.getTrendingSearches([
        'immigration law',
        'personal injury lawyer',
        'workers compensation',
        'DUI defense',
        'divorce attorney',
        'traffic ticket lawyer',
      ]);

      // Get trending news
      const trendingNews = await this.googleNews.getTrendingNews({
        categories: ['legal', 'immigration', 'crime', 'business'],
        location: 'North Carolina',
      });

      // Get voice search trends
      const voiceSearchTrends = await this.trendAnalyzer.getVoiceSearchTrends();

      // Combine and score topics
      const allTopics = [
        ...trendingSearches.map(t => ({ ...t, source: 'search' })),
        ...trendingNews.map(t => ({ ...t, source: 'news' })),
        ...voiceSearchTrends.map(t => ({ ...t, source: 'voice', isVoiceSearch: true })),
      ];

      // Categorize by practice area and score relevance
      for (const topic of allTopics) {
        const practiceArea = this.categorizeTopic(topic.title);
        const keywords = await this.extractKeywords(topic.title);

        topics.push({
          title: topic.title,
          practiceArea,
          keywords,
          relevanceScore:
            ('score' in topic && typeof topic.score === 'number' ? topic.score : 0) || this.calculateRelevanceScore(topic),
          isVoiceSearch:
            ('isVoiceSearch' in topic && typeof topic.isVoiceSearch === 'boolean' ? topic.isVoiceSearch : false),
          source: topic.source,
        });
      }

      // Sort by relevance and return top topics
      return topics.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 50);
    } catch (error) {
      logger.error('Error fetching trending topics', { error });
      return this.getFallbackTopics();
    }
  }

  /**
   * Get local legal news for North Carolina
   */
  async getLocalLegalNews() {
    logger.info('Fetching local legal news for NC');

    try {
      const newsItems = await this.googleNews.searchNews({
        query:
          'North Carolina legal news OR NC law changes OR Charlotte lawyer OR Raleigh attorney',
        dateRange: 'last7days',
        location: 'North Carolina',
      });

      return newsItems.map(item => ({
        title: item.title,
        url: item.url,
        practiceArea: this.categorizeTopic(item.title + ' ' + item.description),
        keywords: this.extractKeywordsFromNews(item),
        publishedAt: item.publishedAt,
        relevanceScore: this.calculateNewsRelevance(item),
      }));
    } catch (error) {
      logger.error('Error fetching local news', { error });
      return [];
    }
  }

  /**
   * Get popular voice search queries
   */
  async getVoiceSearchQueries() {
    logger.info('Analyzing voice search queries');

    const voiceSearchPatterns = [
      'how do I',
      'what happens if',
      'can a lawyer help me',
      'do I need an attorney for',
      'what are my rights',
      'how much does it cost',
      'near me',
      'best lawyer for',
      'emergency lawyer',
      'speak to attorney now',
    ];

    const queries: Array<{
      title: string;
      practiceArea: string;
      keywords: string[];
      searchVolume: number;
      isVoiceSearch: boolean;
      relevanceScore: number;
    }> = [];

    for (const practiceArea of this.getPracticeAreas()) {
      for (const pattern of voiceSearchPatterns) {
        const query = this.generateVoiceSearchQuery(pattern, practiceArea);
        const searchVolume = await this.keywordAPI.getSearchVolume(query);

        if (searchVolume > 50) {
          queries.push({
            title: query,
            practiceArea,
            keywords: [query, ...this.extractKeywords(query)],
            searchVolume,
            isVoiceSearch: true,
            relevanceScore: searchVolume / 10,
          });
        }
      }
    }

    return queries.sort((a, b) => b.searchVolume - a.searchVolume).slice(0, 30);
  }

  /**
   * Generate a blog post based on options
   */
  async generateBlogPost(options: BlogGenerationOptions): Promise<GeneratedBlogPost> {
    logger.info('Generating blog post', {
      topic: options.topic,
      practiceArea: options.practiceArea,
      language: options.language,
    });

    try {
      // Research keywords and related topics
      const keywordData = await this.researchKeywords(options);

      // Generate content outline
      const outline = await this.generateOutline(options, keywordData);

      // Generate main content
      const content = await this.generateContent(options, outline || '', keywordData);

      // Add local case study if requested
      if (options.includeLocalCaseStudy) {
        content.content = await this.addLocalCaseStudy(content.content || '', options);
      }

      // Optimize for voice search if requested
      if (options.optimizeForVoiceSearch) {
        content.content = await this.optimizeForVoiceSearch(content.content || '', options);
      }

      // Generate FAQ section
      const faqSection = await this.generateFAQSection(options, keywordData);

      // Generate meta data
      const metadata = await this.generateMetadata(content, options, keywordData);

      // Translate if needed
      if (options.language === 'es') {
        return await this.translateContent(
          content,
          { metaDescription: content.metaDescription || '', excerpt: content.excerpt || '' },
          faqSection
        );
      }

      return {
        ...content,
        ...metadata,
        content: content.content || '',
        faqSection,
        author: this.selectAuthor(options.practiceArea),
        readTime: this.calculateReadTime(content.content || ''),
      };
    } catch (error) {
      logger.error('Error generating blog post', { error, options });
      throw error;
    }
  }

  /**
   * Research keywords for the topic
   */
  private async researchKeywords(options: BlogGenerationOptions) {
    const primaryKeyword = options.targetKeywords[0] || options.topic;

    // Get keyword data
    const keywordData = await this.keywordAPI.getKeywordData(primaryKeyword);

    // Get related keywords
    const relatedKeywords = await this.keywordAPI.getRelatedKeywords(primaryKeyword);

    // Get long-tail keywords
    const longTailKeywords = await this.keywordAPI.getLongTailKeywords(primaryKeyword);

    // Get competitor keywords
    const competitorKeywords = await this.keywordAPI.getCompetitorKeywords(
      primaryKeyword,
      options.practiceArea
    );

    return {
      primary: keywordData,
      related: relatedKeywords,
      longTail: longTailKeywords,
      competitor: competitorKeywords,
      all: [
        primaryKeyword,
        ...relatedKeywords.map(k => k.keyword),
        ...longTailKeywords.map(k => k.keyword),
        ...competitorKeywords.map(k => k.keyword),
      ].slice(0, 20),
    };
  }

  /**
   * Generate content outline
   */
  private async generateOutline(
    options: BlogGenerationOptions,
    keywordData: {
      primary: KeywordData;
      related: KeywordData[];
      longTail: KeywordData[];
      competitor: KeywordData[];
      all: string[];
    }
  ) {
    const prompt = `Create a comprehensive blog post outline for: "${options.topic}"

Practice Area: ${options.practiceArea}
Target Keywords: ${keywordData.all.join(', ')}
Optimize for Voice Search: ${options.optimizeForVoiceSearch}

Requirements:
1. Include an engaging introduction that addresses the reader's pain points
2. Create 5-7 main sections with descriptive headings
3. Include subsections for detailed information
4. Add a section for North Carolina specific laws/regulations
5. Include a practical tips or action steps section
6. End with a compelling conclusion and call-to-action

Format the outline with clear hierarchy using H2 and H3 tags.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return this.getOpenAIContent(response);
  }

  /**
   * Generate main content
   */
  private async generateContent(
    options: BlogGenerationOptions,
    outline: string,
    keywordData: {
      primary: KeywordData;
      related: KeywordData[];
      longTail: KeywordData[];
      competitor: KeywordData[];
      all: string[];
    }
  ) {
    const prompt = `Write a comprehensive, SEO-optimized blog post based on this outline:

${outline}

Requirements:
1. Write in a conversational, helpful tone that builds trust
2. Include the keywords naturally: ${keywordData.all.join(', ')}
3. Make it specific to North Carolina law and regulations
4. Include real examples and scenarios (without using real names)
5. Write 1500-2000 words of high-quality, original content
6. Use short paragraphs (2-3 sentences) for easy reading
7. Include transition phrases for smooth flow
8. Add relevant statistics and data points
9. Write in active voice
10. Include internal linking opportunities to these pages: /practice-areas/${options.practiceArea}, /contact, /free-consultation

IMPORTANT: Write the content in clean markdown format:
- Use # for main title, ## for sections, ### for subsections
- Use **bold** sparingly, only for key terms or emphasis
- Use bullet points and numbered lists where appropriate
- DO NOT overuse formatting - keep it clean and readable
- Focus on quality content over excessive formatting`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 3000,
    });

    const content = this.getOpenAIContent(response);

    // Generate title and meta elements
    const titlePrompt = `Based on this content, create:
1. An engaging, SEO-optimized title (50-60 characters)
2. A compelling meta description (150-160 characters)
3. A brief excerpt (2-3 sentences)
4. A URL slug

Content topic: ${options.topic}
Primary keyword: ${keywordData.primary.keyword}

Format as JSON with keys: title, metaDescription, excerpt, slug`;

    const titleResponse = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: titlePrompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const metadata = JSON.parse(this.getOpenAIContent(titleResponse) || '{}');

    return {
      title: metadata.title,
      slug: metadata.slug,
      content,
      excerpt: metadata.excerpt,
      metaDescription: metadata.metaDescription,
      keywords: keywordData.all,
      featuredImage: await this.generateFeaturedImage(options.topic),
      images: await this.generateContentImages(content),
    };
  }

  /**
   * Add local case study
   */
  private async addLocalCaseStudy(content: string, options: BlogGenerationOptions) {
    const caseStudyPrompt = `Add a North Carolina case study section to this content. 
Create a realistic but anonymous scenario relevant to ${options.practiceArea}.
Include:
1. Background situation
2. Legal challenge faced
3. How Vasquez Law Firm helped
4. Positive outcome achieved
5. Key takeaways

Make it specific to NC laws and regulations. Format as a new section with markdown.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'user', content: content },
        { role: 'user', content: caseStudyPrompt },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    return content + '\n\n' + this.getOpenAIContent(response);
  }

  /**
   * Optimize content for voice search
   */
  private async optimizeForVoiceSearch(content: string, options: BlogGenerationOptions) {
    const voiceOptimizationPrompt = `Optimize this content for voice search by:
1. Adding conversational question-and-answer sections
2. Including natural language phrases people would speak
3. Adding a "Quick Answer" section at the beginning
4. Using complete sentences that directly answer questions
5. Including local phrases like "near me" and location-specific terms

Current content: ${content.substring(0, 1000)}...

Add these optimizations while maintaining the flow and quality.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: voiceOptimizationPrompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return this.getOpenAIContent(response) + '\n\n' + content;
  }

  /**
   * Generate FAQ section
   */
  private async generateFAQSection(
    options: BlogGenerationOptions,
    keywordData: {
      primary: KeywordData;
      related: KeywordData[];
      longTail: KeywordData[];
      competitor: KeywordData[];
      all: string[];
    }
  ) {
    const faqPrompt = `Generate 5-7 frequently asked questions and detailed answers about "${options.topic}" for ${options.practiceArea} law in North Carolina.

Include:
1. Questions people actually search for
2. Voice search friendly questions (how, what, when, where)
3. Location-specific questions (North Carolina, Charlotte, Raleigh)
4. Cost/price related questions
5. Process/timeline questions

Format as JSON array with 'question' and 'answer' keys.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: faqPrompt }],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = this.getOpenAIContent(response);
    try {
      return JSON.parse(content || '[]');
    } catch {
      return [];
    }
  }

  /**
   * Generate metadata
   */
  private async generateMetadata(
    content: { title: string; content: string },
    options: BlogGenerationOptions,
    keywordData: {
      primary: KeywordData;
      related: KeywordData[];
      longTail: KeywordData[];
      competitor: KeywordData[];
      all: string[];
    }
  ) {
    return {
      keywords: keywordData.all,
      featuredImage: await this.generateFeaturedImage(options.topic),
      images: await this.generateContentImages(content.content || ''),
    };
  }

  /**
   * Translate content to Spanish
   */
  private async translateContent(
    content: { title: string; content: string; slug?: string },
    metadata: { metaDescription: string; excerpt: string },
    faqSection: Array<{ question: string; answer: string }>
  ) {
    const translationPrompt = `Translate this legal blog post to Spanish. 
Maintain legal accuracy and use appropriate legal terminology for Spanish-speaking clients.
Keep the same professional tone and formatting.

Content: ${JSON.stringify({ content, metadata, faqSection })}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: translationPrompt }],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const translatedContent = this.getOpenAIContent(response);
    let translated;
    try {
      translated = JSON.parse(translatedContent || '{}');
    } catch {
      translated = {};
    }

    return {
      ...content,
      ...translated,
      slug: (content.slug || 'blog-post') + '-es',
    };
  }

  /**
   * Helper methods
   */
  private categorizeTopic(text: string): string {
    const categories = {
      immigration: ['immigration', 'visa', 'green card', 'citizenship', 'deportation', 'asylum'],
      'personal-injury': ['accident', 'injury', 'crash', 'slip', 'fall', 'hurt', 'compensation'],
      'workers-compensation': ['work injury', 'workers comp', 'workplace', 'job injury'],
      'criminal-defense': ['arrest', 'criminal', 'DUI', 'DWI', 'charged', 'crime', 'defense'],
      'family-law': ['divorce', 'custody', 'child support', 'family', 'marriage'],
      'traffic-violations': ['ticket', 'traffic', 'speeding', 'license', 'driving'],
    };

    const lowerText = text.toLowerCase();

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return category;
      }
    }

    return 'general';
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction - could be enhanced with NLP
    const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but']);

    return text
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.has(word))
      .slice(0, 5);
  }

  private extractKeywordsFromNews(newsItem: {
    title: string;
    description?: string;
    content?: string;
  }): string[] {
    const text = `${newsItem.title} ${newsItem.description}`;
    return this.extractKeywords(text);
  }

  private calculateRelevanceScore(topic: {
    title: string;
    source: string;
    views?: number;
    shares?: number;
    publishedAt?: string | Date;
    trending?: boolean;
    location?: string;
  }): number {
    let score = 50; // Base score

    // Boost for recent topics
    if (topic.publishedAt) {
      const daysOld = (Date.now() - new Date(topic.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysOld < 1) score += 30;
      else if (daysOld < 3) score += 20;
      else if (daysOld < 7) score += 10;
    }

    // Boost for trending
    if (topic.trending) score += 20;

    // Boost for local relevance
    if (topic.location?.includes('North Carolina')) score += 15;

    return Math.min(score, 100);
  }

  private calculateNewsRelevance(newsItem: {
    title: string;
    description?: string;
    content?: string;
    publishedAt?: Date | string;
    source?: string;
  }): number {
    let score = 0;

    // Check for legal keywords
    const legalKeywords = ['law', 'legal', 'attorney', 'lawyer', 'court', 'judge', 'case'];
    const text = `${newsItem.title} ${newsItem.description}`.toLowerCase();

    score += legalKeywords.filter(kw => text.includes(kw)).length * 10;

    // Boost for local news
    if (text.includes('north carolina') || text.includes(' nc ')) score += 20;

    // Recency bonus
    if (newsItem.publishedAt) {
      const hoursOld = (Date.now() - new Date(newsItem.publishedAt).getTime()) / (1000 * 60 * 60);
      if (hoursOld < 24) score += 25;
      else if (hoursOld < 72) score += 15;
      else if (hoursOld < 168) score += 5;
    }

    return Math.min(score, 100);
  }

  private generateVoiceSearchQuery(pattern: string, practiceArea: string): string {
    const practiceAreaQueries = {
      immigration: {
        'how do I': 'get a green card in North Carolina',
        'what happens if': 'my visa expires',
        'can a lawyer help me': 'with deportation defense',
        'do I need an attorney for': 'citizenship application',
        'what are my rights': 'as an immigrant in NC',
        'how much does it cost': 'to hire an immigration lawyer',
      },
      'personal-injury': {
        'how do I': 'file a personal injury claim in NC',
        'what happens if': 'I was in a car accident',
        'can a lawyer help me': 'get compensation for my injuries',
        'do I need an attorney for': 'a slip and fall accident',
        'what are my rights': 'after a car accident in North Carolina',
        'how much does it cost': 'to hire a personal injury lawyer',
      },
      // Add more practice areas...
    };

    const queries = practiceAreaQueries[practiceArea as keyof typeof practiceAreaQueries] || {};
    return `${pattern} ${queries[pattern as keyof typeof queries] || practiceArea}`;
  }

  private getPracticeAreas(): string[] {
    return [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'traffic-violations',
    ];
  }

  private selectAuthor(practiceArea: string): string {
    const authorMap = {
      immigration: 'William Vasquez',
      'personal-injury': 'Christopher Afanador',
      'workers-compensation': 'Jillian Baucom',
      'criminal-defense': 'Mark Kelsey',
      'family-law': 'Roselyn Torrellas',
      'traffic-violations': 'Vasquez Law Team',
    };

    return authorMap[practiceArea as keyof typeof authorMap] || 'Vasquez Law Team';
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  private async generateFeaturedImage(topic: string): Promise<string> {
    // This would integrate with an image generation service
    // For now, return a placeholder
    return `/images/blog/featured/${topic.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  }

  private async generateContentImages(content: string): Promise<string[]> {
    // Extract sections that could benefit from images
    const sections = content.split(/^##/m).slice(1);
    const images: string[] = [];

    for (let i = 0; i < Math.min(sections.length, 3); i++) {
      const section = sections[i];
      if (!section) continue;
      const sectionTitle = section.split('\n')[0]?.trim() || `section-${i}`;
      images.push(`/images/blog/content/${sectionTitle.toLowerCase().replace(/\s+/g, '-')}.jpg`);
    }

    return images;
  }

  private getFallbackTopics() {
    // Fallback topics if APIs fail
    return [
      {
        title: 'New Immigration Laws in North Carolina 2024',
        practiceArea: 'immigration',
        keywords: ['immigration laws', 'NC immigration', '2024 immigration changes'],
        relevanceScore: 80,
        isVoiceSearch: false,
      },
      {
        title: 'What to Do After a Car Accident in Charlotte',
        practiceArea: 'personal-injury',
        keywords: ['car accident', 'Charlotte accident lawyer', 'personal injury'],
        relevanceScore: 75,
        isVoiceSearch: false,
      },
      // Add more fallback topics...
    ];
  }
}
