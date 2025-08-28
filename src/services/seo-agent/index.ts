import { OpenAI } from 'openai';
import { componentLogger, performanceLogger } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import Bull, { Bull as BullTypes } from '@/lib/mocks/bull-mock';
import * as cheerio from 'cheerio';
import { CronJob } from 'cron';
// axios removed - using native fetch;
import { URL } from 'url';
import type { SchemaOrgFAQ, SchemaMarkup } from '@/types/services';

export interface SEOAgentConfig {
  openAIKey: string;
  serpApiKey: string;
  socialMediaKeys: {
    youtube: string;
    tiktok: string;
    instagram: string;
    facebook: string;
  };
  targetDA: number;
  practiceAreas: string[];
  languages: ['en', 'es'];
  competitors: string[];
}

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc?: number;
  intent: string;
}

interface ContentGap {
  topic: string;
  practiceArea: string;
  keywords: string[];
  insights: {
    searchVolume?: number;
    competitionLevel?: string;
    contentType?: string;
    targetAudience?: string;
    expectedTraffic?: number;
  };
}

// Remove local type definition to use the one from services.ts

export class SEOAgent {
  private openai: OpenAI;
  private contentQueue: Bull;
  private analysisQueue: Bull;
  private config: SEOAgentConfig;
  private cronJobs: CronJob[] = [];
  private baseUrl: string;

  constructor(config: SEOAgentConfig) {
    this.config = config;
    this.openai = new OpenAI({ apiKey: config.openAIKey });
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';

    // Initialize queues for async processing
    this.contentQueue = new Bull('seo-content-generation');

    this.analysisQueue = new Bull('seo-analysis');

    this.initializeQueues();
    this.startCronJobs();
  }

  private initializeQueues() {
    // Content generation processor
    this.contentQueue.process(async (job: any) => {
      const { type, data } = job.data;

      switch (type) {
        case 'blog-post':
          return await this.generateBlogPost(data);
        case 'social-response':
          return await this.generateSocialResponse(data);
        case 'news-analysis':
          return await this.analyzeAndCreateContent(data);
        default:
          throw new Error(`Unknown content type: ${type}`);
      }
    });

    // Analysis processor
    this.analysisQueue.process(async (job: any) => {
      const { type, data } = job.data;

      switch (type) {
        case 'competitor-analysis':
          return await this.analyzeCompetitor(data);
        case 'keyword-research':
          return await this.performKeywordResearch(data);
        case 'backlink-analysis':
          return await this.analyzeBacklinks(data);
        default:
          throw new Error(`Unknown analysis type: ${type}`);
      }
    });
  }

  private startCronJobs() {
    // Every hour: Check for trending news
    const newsJob = new CronJob('0 * * * *', async () => {
      await this.checkTrendingNews();
    });

    // Every 4 hours: Scan social media
    const socialJob = new CronJob('0 */4 * * *', async () => {
      await this.scanSocialMedia();
    });

    // Daily: Competitor analysis
    const competitorJob = new CronJob('0 2 * * *', async () => {
      await this.runCompetitorAnalysis();
    });

    // Weekly: Comprehensive SEO audit
    const auditJob = new CronJob('0 3 * * 0', async () => {
      await this.runSEOAudit();
    });

    this.cronJobs = [newsJob, socialJob, competitorJob, auditJob];
    this.cronJobs.forEach(job => job.start());
  }

  // ========== CONTENT GENERATION ==========

  async generateBlogPost(data: {
    topic: string;
    practiceArea: string;
    language: 'en' | 'es';
    keywords: string[];
    competitorInsights?: {
      topKeywords?: string[];
      contentStrategies?: string[];
      backlinkSources?: string[];
      socialMediaPresence?: Record<string, number>;
    };
    isTranslation?: boolean;
    originalId?: string;
  }) {
    const {
      topic,
      practiceArea,
      language,
      keywords,
      competitorInsights,
      isTranslation,
      originalId,
    } = data;

    componentLogger.info('SEOAgent.generateBlogPost', { topic, practiceArea, language });

    try {
      // If translation, get original content
      if (isTranslation && originalId) {
        const original = await getPrismaClient().blogPost.findUnique({
          where: { id: originalId },
        });

        if (original) {
          return await this.translateBlogPost(
            {
              title: original.title,
              content: original.content,
              metaDescription: original.metaDescription,
              keywords: original.metaKeywords,
              practiceArea: original.practiceArea || undefined,
            },
            language
          );
        }
      }

      // Generate SEO-optimized title
      const titlePrompt = `Generate an SEO-optimized blog title for a law firm about "${topic}" in ${practiceArea} law.
        Target keywords: ${keywords.join(', ')}
        Language: ${language === 'es' ? 'Spanish' : 'English'}
        Make it compelling, include power words, and optimize for featured snippets.`;

      const titleResponse = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: titlePrompt }],
        temperature: 0.7,
      });

      const title = titleResponse.choices[0]?.message?.content || 'Untitled Blog Post';

      // Generate comprehensive blog content
      const contentPrompt = `Write a comprehensive, SEO-optimized blog post for Vasquez Law Firm.
        Title: ${title}
        Topic: ${topic}
        Practice Area: ${practiceArea}
        Language: ${language === 'es' ? 'Spanish' : 'English'}
        Target Keywords: ${keywords.join(', ')}
        
        Requirements:
        1. 2000+ words for maximum SEO value
        2. Include FAQ section for featured snippets
        3. Use headers (H2, H3) with keywords
        4. Include local SEO elements (North Carolina, Florida mentions)
        5. Natural keyword density (2-3%)
        6. Include call-to-actions
        7. Mention "YO PELEO POR TI™" tagline
        8. Include case examples and statistics
        9. Internal linking opportunities
        10. Meta description (155 chars)
        
        ${competitorInsights ? `Competitor insights to outperform: ${JSON.stringify(competitorInsights)}` : ''}
        
        Format as JSON with: title, metaDescription, content, faqSection, internalLinks, keywords`;

      const contentResponse = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: contentPrompt }],
        temperature: 0.7,
        max_tokens: 4000,
      });

      const blogData = JSON.parse(contentResponse.choices[0]?.message?.content || '{}');

      // Calculate read time
      const wordCount = blogData.content.split(' ').length;
      const readTime = Math.ceil(wordCount / 200);

      // Save to database
      const blog = await getPrismaClient().blogPost.create({
        data: {
          title: blogData.title,
          slug: this.generateSlug(blogData.title),
          content: blogData.content,
          excerpt: this.generateExcerpt(blogData.content),
          metaDescription: blogData.metaDescription,
          metaKeywords: blogData.keywords || [],
          language,
          practiceArea,
          keywords: blogData.keywords,
          faqSection: blogData.faqSection,
          status: 'draft',
          seoScore: await this.calculateSEOScore(blogData),
          readTime,
        },
      });

      // Generate images with AI
      await this.generateBlogImages(blog.id, topic);

      // Generate schema markup
      await this.generateAndSaveSchemaMarkup({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt || undefined,
        metaDescription: blog.metaDescription,
        keywords: blog.metaKeywords,
        faqSection: blog.faqSection as Array<{ question: string; answer: string }> | undefined,
        language: blog.language,
        practiceArea: blog.practiceArea || undefined,
        author: blog.author || undefined,
        featuredImage: blog.featuredImage || undefined,
        publishedAt: blog.publishedAt || undefined,
        updatedAt: blog.updatedAt,
      });

      // If not already a translation, create in other language
      if (!isTranslation) {
        const otherLanguage = language === 'en' ? 'es' : 'en';
        await this.contentQueue.add('blog-post', {
          ...data,
          language: otherLanguage,
          isTranslation: true,
          originalId: blog.id,
        });
      }

      performanceLogger.info('blog-generated', { id: blog.id, language });
      return blog;
    } catch (error) {
      componentLogger.error('SEOAgent.generateBlogPost', {
        error: error as Error,
        topic,
        practiceArea,
      });
      throw error;
    }
  }

  private async translateBlogPost(
    original: {
      title: string;
      content: string;
      metaDescription?: string;
      keywords?: string[];
      practiceArea?: string;
    },
    targetLanguage: 'en' | 'es'
  ) {
    const translatePrompt = `Translate this blog post to ${targetLanguage === 'es' ? 'Spanish' : 'English'}.
      Maintain SEO optimization, keyword relevance, and local SEO elements.
      Adapt cultural references appropriately.
      
      Original content: ${JSON.stringify({
        title: original.title,
        content: original.content,
        metaDescription: original.metaDescription,
        faqSection: (original as { faqSection?: Array<{ question: string; answer: string }> })
          .faqSection,
      })}
      
      Return JSON with translated: title, content, metaDescription, faqSection, keywords`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: translatePrompt }],
      temperature: 0.3,
    });

    const translatedData = JSON.parse(response.choices[0]?.message?.content || '{}');

    return await getPrismaClient().blogPost.create({
      data: {
        ...translatedData,
        slug: this.generateSlug(translatedData.title),
        excerpt: this.generateExcerpt(translatedData.content) || undefined,
        practiceArea: original.practiceArea || undefined,
        language: targetLanguage,
        status: 'draft',
        seoScore: await this.calculateSEOScore(translatedData),
        readTime: 5,
        originalId: undefined,
      },
    });
  }

  // ========== KEYWORD RESEARCH ==========

  async performKeywordResearch(data: { practiceArea: string; language: string }) {
    const { practiceArea, language } = data;

    try {
      // Get seed keywords
      const seedKeywords = this.getSeedKeywords(practiceArea, language);

      // Expand keywords using various techniques
      const expandedKeywords = await this.expandKeywords(seedKeywords);

      // Get search volumes and difficulty
      const keywordData = await this.getKeywordMetrics(expandedKeywords);

      // Find long-tail opportunities
      const longTailKeywords = await this.findLongTailKeywords(practiceArea, language);

      // Question-based keywords for featured snippets
      const questions = await this.findQuestionKeywords(practiceArea, language);

      // Save to database
      await this.saveKeywordResearch({
        practiceArea,
        language,
        keywords: [...keywordData, ...longTailKeywords, ...questions],
      });

      return {
        highVolume: keywordData.filter(k => k.volume > 1000),
        lowCompetition: keywordData.filter(k => k.difficulty < 30),
        questions,
        longTail: longTailKeywords,
      };
    } catch (error) {
      componentLogger.error('SEOAgent.performKeywordResearch', {
        error: error as Error,
        practiceArea,
      });
      throw error;
    }
  }

  private async expandKeywords(seedKeywords: string[]): Promise<string[]> {
    const prompt = `Given these seed keywords: ${seedKeywords.join(', ')}
      
      Generate 30 related keywords including:
      1. Synonyms and variations
      2. Related search terms
      3. Semantic variations
      4. Common misspellings
      5. Plural/singular forms
      
      Return as JSON array of strings.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const expanded = JSON.parse(response.choices[0]?.message?.content || '[]');
    return [...new Set([...seedKeywords, ...expanded])];
  }

  private async getKeywordMetrics(keywords: string[]): Promise<KeywordData[]> {
    // In production, this would use SERP API or similar service
    // For now, simulating with OpenAI
    const prompt = `Estimate search metrics for these keywords in the legal industry:
      ${keywords.join(', ')}
      
      For each keyword, provide:
      - Monthly search volume (realistic numbers)
      - Difficulty score (0-100)
      - CPC estimate in USD
      - Search intent (informational, transactional, navigational, commercial)
      
      Return as JSON array with format: { keyword, volume, difficulty, cpc, intent }`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0]?.message?.content || '[]');
  }

  private async findLongTailKeywords(
    practiceArea: string,
    language: string
  ): Promise<KeywordData[]> {
    const prompt = `Generate 20 long-tail keywords (3-7 words) for ${practiceArea} law in ${language === 'es' ? 'Spanish' : 'English'}.
      
      Focus on:
      1. Specific legal questions
      2. Location-based searches (North Carolina, Florida)
      3. Situational queries
      4. Cost/price related searches
      5. "Near me" variations
      
      Return as JSON array with format: { keyword, volume, difficulty, cpc, intent }`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
    });

    return JSON.parse(response.choices[0]?.message?.content || '[]');
  }

  private async findQuestionKeywords(
    practiceArea: string,
    language: string
  ): Promise<KeywordData[]> {
    const prompt = `Generate 15 question-based keywords for ${practiceArea} law in ${language === 'es' ? 'Spanish' : 'English'}.
      
      Include questions starting with:
      - How/¿Cómo
      - What/¿Qué
      - When/¿Cuándo
      - Where/¿Dónde
      - Why/¿Por qué
      - Can/¿Puedo
      - Should/¿Debo
      - How much/¿Cuánto
      
      These should be actual questions people ask about ${practiceArea} legal issues.
      
      Return as JSON array with format: { keyword, volume, difficulty, cpc, intent: "informational" }`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    return JSON.parse(response.choices[0]?.message?.content || '[]');
  }

  private async saveKeywordResearch(data: {
    practiceArea: string;
    language: string;
    keywords: KeywordData[];
  }) {
    const prisma = getPrismaClient();

    for (const keyword of data.keywords) {
      await prisma.keywordResearch.upsert({
        where: {
          keyword_language: {
            keyword: keyword.keyword,
            language: data.language,
          },
        },
        update: {
          searchVolume: keyword.volume,
          difficulty: keyword.difficulty,
          cpc: keyword.cpc,
          intent: keyword.intent,
          practiceArea: data.practiceArea,
        },
        create: {
          keyword: keyword.keyword,
          practiceArea: data.practiceArea,
          language: data.language,
          searchVolume: keyword.volume,
          difficulty: keyword.difficulty,
          cpc: keyword.cpc,
          intent: keyword.intent,
        },
      });
    }
  }

  // ========== META TAG OPTIMIZATION ==========

  async optimizeMetaTags(params: {
    title: string;
    description: string;
    keywords: string[];
    type: 'homepage' | 'practice-area' | 'blog' | 'attorney' | 'location';
    language: 'en' | 'es';
  }) {
    const { title, description, keywords, type, language } = params;

    const prompt = `Optimize these meta tags for SEO:
      Current Title: ${title}
      Current Description: ${description}
      Keywords: ${keywords.join(', ')}
      Page Type: ${type}
      Language: ${language}
      
      Requirements:
      1. Title: 50-60 characters, include primary keyword, compelling
      2. Description: 150-155 characters, include CTA, use active voice
      3. Keywords: Prioritize top 5-7 most relevant
      
      Consider:
      - Local SEO (North Carolina, Florida)
      - Legal industry best practices
      - ${language === 'es' ? 'Spanish' : 'English'} language optimization
      
      Return JSON: { title, description, keywords: [] }`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    return JSON.parse(response.choices[0]?.message?.content || '{}');
  }

  // ========== SCHEMA MARKUP GENERATION ==========

  async generateSchemaMarkup(type: string, data: Record<string, unknown>): Promise<SchemaMarkup> {
    const schemas = {
      LawFirm: () => this.generateLawFirmSchema(data),
      Attorney: () => this.generateAttorneySchema(data),
      BlogPosting: () => this.generateBlogSchema(data),
      FAQPage: () => this.generateFAQSchema(data),
      LocalBusiness: () => this.generateLocalBusinessSchema(data),
      Review: () => this.generateReviewSchema(data),
      Service: () => this.generateServiceSchema(data),
      HowTo: () => this.generateHowToSchema(data),
    };

    const generator = schemas[type as keyof typeof schemas];
    if (generator) {
      return await generator();
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
    };
  }

  private generateLawFirmSchema(data: Record<string, unknown>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      '@id': `${this.baseUrl}/#organization`,
      name: 'Vasquez Law Firm, PLLC',
      alternateName: 'VLF',
      url: this.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${this.baseUrl}/images/logo.png`,
        width: 600,
        height: 200,
      },
      image: `${this.baseUrl}/images/office.jpg`,
      description:
        "Full-service law firm specializing in Immigration, Personal Injury, Workers' Compensation, Criminal Defense, Family Law, and Traffic Violations. Serving North Carolina and Florida with AI-enhanced legal services.",
      slogan: 'YO PELEO POR TI™',
      foundingDate: '1989',
      priceRange: '$$$',
      telephone: '+1-844-967-3536',
      email: 'leads@vasquezlawfirm.com',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress:
            (
              data.addresses as Array<{
                street?: string;
                city?: string;
                state?: string;
                zip?: string;
              }>
            )?.[0]?.street || '123 Main St, Suite 100',
          addressLocality:
            (
              data.addresses as Array<{
                street?: string;
                city?: string;
                state?: string;
                zip?: string;
              }>
            )?.[0]?.city || 'Raleigh',
          addressRegion:
            (
              data.addresses as Array<{
                street?: string;
                city?: string;
                state?: string;
                zip?: string;
              }>
            )?.[0]?.state || 'NC',
          postalCode:
            (
              data.addresses as Array<{
                street?: string;
                city?: string;
                state?: string;
                zip?: string;
              }>
            )?.[0]?.zip || '27601',
          addressCountry: 'US',
        },
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.latitude || 35.7796,
        longitude: data.longitude || -78.6382,
      },
      areaServed: [
        { '@type': 'State', name: 'North Carolina' },
        { '@type': 'State', name: 'Florida' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '10:00',
          closes: '14:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Legal Services',
        itemListElement: this.config.practiceAreas.map(area => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: this.formatPracticeAreaName(area),
            description: this.getPracticeAreaDescription(area),
          },
        })),
      },
      sameAs: [
        'https://www.facebook.com/vasquezlawfirm',
        'https://twitter.com/vasquezlawnc',
        'https://www.linkedin.com/company/vasquez-law-firm',
        'https://www.youtube.com/vasquezlawfirm',
      ],
      review: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '523',
      },
    };
  }

  private generateAttorneySchema(data: Record<string, unknown>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Attorney',
      '@id': `${this.baseUrl}/attorneys/${data.slug}#person`,
      name: data.name,
      image: data.image,
      jobTitle: data.title,
      worksFor: {
        '@id': `${this.baseUrl}/#organization`,
      },
      description: data.bio,
      alumniOf: (data.education as Array<{ name: string }>)?.map(edu => ({
        '@type': 'EducationalOrganization',
        name: edu.name,
      })),
      knowsLanguage: data.languages || ['English', 'Spanish'],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Attorney',
        occupationalCategory: '23-1011.00',
      },
      memberOf: (data.associations as Array<{ name: string }>)?.map(assoc => ({
        '@type': 'Organization',
        name: assoc,
      })),
    };
  }

  private generateBlogSchema(data: Record<string, unknown>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${this.baseUrl}/blog/${data.slug}#article`,
      headline: data.title,
      alternativeHeadline: data.metaDescription,
      image: data.featuredImage || `${this.baseUrl}/images/blog-default.jpg`,
      author: {
        '@type': 'Person',
        name: data.author || 'Vasquez Law Team',
        url: `${this.baseUrl}/attorneys`,
      },
      publisher: {
        '@id': `${this.baseUrl}/#organization`,
      },
      datePublished: data.publishedAt || new Date().toISOString(),
      dateModified: data.updatedAt || new Date().toISOString(),
      description: data.excerpt || data.metaDescription,
      articleBody: data.content,
      keywords: (data.keywords as string[])?.join(', ') || '',
      wordCount: (data.content as string)?.split(' ').length || 0,
      inLanguage: data.language === 'es' ? 'es-US' : 'en-US',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}/blog/${data.slug}`,
      },
      articleSection: this.formatPracticeAreaName(data.practiceArea as string),
      ...(data.faqSection && Array.isArray(data.faqSection) && data.faqSection.length > 0
        ? {
            hasPart: {
              '@type': 'FAQPage',
              mainEntity: (data.faqSection as Array<{ question: string; answer: string }>).map(
                faq => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })
              ),
            },
          }
        : {}),
    };
  }

  private generateFAQSchema(data: Record<string, unknown>): SchemaOrgFAQ & { '@context': string } {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity:
        (data.questions as Array<{ question: string; answer: string }>)?.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
            author: {
              '@id': `${this.baseUrl}/#organization`,
            },
          },
        })) || [],
    };
  }

  private generateLocalBusinessSchema(data: Record<string, unknown>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${this.baseUrl}/locations/${data.city}#location`,
      name: `Vasquez Law Firm - ${data.city}`,
      parentOrganization: {
        '@id': `${this.baseUrl}/#organization`,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.address,
        addressLocality: data.city,
        addressRegion: data.state,
        postalCode: data.zip,
        addressCountry: 'US',
      },
      telephone: data.phone,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '10:00',
          closes: '14:00',
        },
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.latitude,
        longitude: data.longitude,
      },
    };
  }

  private generateReviewSchema(data: Record<string, unknown>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'LegalService',
        name: 'Vasquez Law Firm, PLLC',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: data.rating,
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: data.authorName,
      },
      datePublished: data.date,
      reviewBody: data.review,
    };
  }

  private generateServiceSchema(data: Record<string, unknown>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: data.name || this.formatPracticeAreaName(data.practiceArea as string),
      provider: {
        '@id': `${this.baseUrl}/#organization`,
      },
      areaServed: [
        { '@type': 'State', name: 'North Carolina' },
        { '@type': 'State', name: 'Florida' },
      ],
      description: data.description || this.getPracticeAreaDescription(data.practiceArea as string),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${data.name} Services`,
        itemListElement:
          (data.services as Array<{ name: string; description: string; price?: string }>)?.map(
            service => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service.name,
                description: service.description,
              },
            })
          ) || [],
      },
    };
  }

  private generateHowToSchema(data: Record<string, unknown>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: data.title,
      description: data.description,
      image: data.image,
      totalTime: data.totalTime,
      estimatedCost: data.cost && {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: data.cost,
      },
      supply:
        (data.supplies as Array<{ name: string }>)?.map(supply => ({
          '@type': 'HowToSupply',
          name: supply,
        })) || [],
      tool:
        (data.tools as Array<{ name: string }>)?.map(tool => ({
          '@type': 'HowToTool',
          name: tool,
        })) || [],
      step:
        (data.steps as Array<{ name: string; text?: string; url?: string; image?: string }>)?.map(
          (step, index) => ({
            '@type': 'HowToStep',
            name: step.name,
            text: step.text,
            image: step.image,
            url: `${this.baseUrl}#step${index + 1}`,
          })
        ) || [],
    };
  }

  // ========== SITEMAP GENERATION ==========

  async generateSitemap(): Promise<string> {
    const prisma = getPrismaClient();

    // Static pages
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/practice-areas', priority: 0.9, changefreq: 'weekly' },
      { url: '/attorneys', priority: 0.8, changefreq: 'monthly' },
      { url: '/about', priority: 0.7, changefreq: 'monthly' },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' },
      { url: '/blog', priority: 0.9, changefreq: 'daily' },
      { url: '/testimonials', priority: 0.7, changefreq: 'weekly' },
      { url: '/resources', priority: 0.6, changefreq: 'weekly' },
    ];

    // Practice area pages
    const practiceAreas = this.config.practiceAreas;

    // Location pages
    const locations = ['raleigh', 'charlotte', 'orlando', 'miami'];

    // Blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true, language: true },
    });

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // Add static pages with hreflang
    for (const page of staticPages) {
      for (const lang of ['en', 'es']) {
        xml += '  <url>\n';
        xml += `    <loc>${this.baseUrl}/${lang}${page.url}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;

        // Add hreflang tags
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${this.baseUrl}/en${page.url}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="es" href="${this.baseUrl}/es${page.url}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${this.baseUrl}${page.url}"/>\n`;

        xml += '  </url>\n';
      }
    }

    // Add practice area pages
    for (const area of practiceAreas) {
      for (const lang of ['en', 'es']) {
        xml += '  <url>\n';
        xml += `    <loc>${this.baseUrl}/${lang}/practice-areas/${area}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
      }
    }

    // Add location pages
    for (const location of locations) {
      for (const lang of ['en', 'es']) {
        xml += '  <url>\n';
        xml += `    <loc>${this.baseUrl}/${lang}/locations/${location}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
        xml += '    <changefreq>monthly</changefreq>\n';
        xml += '    <priority>0.7</priority>\n';
        xml += '  </url>\n';
      }
    }

    // Add blog posts
    for (const post of blogPosts) {
      xml += '  <url>\n';
      xml += `    <loc>${this.baseUrl}/${post.language}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.updatedAt.toISOString()}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    return xml;
  }

  // ========== CONTENT SCORING & RECOMMENDATIONS ==========

  async scoreContent(
    content: string,
    params: {
      targetKeywords: string[];
      practiceArea: string;
      contentType: 'blog' | 'page' | 'landing';
    }
  ): Promise<{
    score: number;
    recommendations: string[];
    issues: string[];
  }> {
    let score = 0;
    const recommendations: string[] = [];
    const issues: string[] = [];

    // Word count analysis
    const wordCount = content.split(/\s+/).length;
    if (wordCount >= 2000) {
      score += 20;
    } else if (wordCount >= 1500) {
      score += 15;
      recommendations.push(`Increase content length to 2000+ words (currently ${wordCount} words)`);
    } else if (wordCount >= 1000) {
      score += 10;
      recommendations.push(
        `Content is too short. Aim for 2000+ words (currently ${wordCount} words)`
      );
    } else {
      score += 5;
      issues.push(
        `Content is significantly too short (${wordCount} words). Minimum 1000 words recommended`
      );
    }

    // Keyword density
    const keywordDensity = this.calculateKeywordDensity(content, params.targetKeywords);
    if (keywordDensity >= 1 && keywordDensity <= 3) {
      score += 15;
    } else if (keywordDensity < 1) {
      score += 5;
      recommendations.push('Increase keyword usage naturally throughout the content');
    } else {
      score += 5;
      issues.push('Keyword density is too high. Reduce to avoid over-optimization');
    }

    // Header structure
    const h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
    const h2Count = (content.match(/<h2[^>]*>/gi) || []).length;
    const h3Count = (content.match(/<h3[^>]*>/gi) || []).length;

    if (h1Count === 1) score += 5;
    else issues.push('Should have exactly one H1 tag');

    if (h2Count >= 3) score += 10;
    else recommendations.push('Add more H2 subheadings (at least 3)');

    if (h3Count >= 2) score += 5;
    else recommendations.push('Consider adding H3 tags for better structure');

    // Internal linking
    const internalLinks = (content.match(/href="\/[^"]*"/gi) || []).length;
    if (internalLinks >= 3) score += 10;
    else recommendations.push(`Add more internal links (currently ${internalLinks}, aim for 3+)`);

    // Images and alt text
    const images = content.match(/<img[^>]*>/gi) || [];
    const imagesWithAlt = images.filter(img => img.includes('alt=')).length;

    if (images.length >= 3) score += 5;
    else recommendations.push('Add more images to break up text');

    if (images.length > 0 && imagesWithAlt === images.length) score += 5;
    else if (images.length > imagesWithAlt) {
      issues.push(`${images.length - imagesWithAlt} images missing alt text`);
    }

    // FAQ section
    if (
      content.toLowerCase().includes('faq') ||
      content.toLowerCase().includes('frequently asked')
    ) {
      score += 10;
    } else {
      recommendations.push('Add an FAQ section for featured snippet opportunities');
    }

    // Call-to-action
    const ctaPatterns = [
      'contact us',
      'call us',
      'schedule',
      'consultation',
      'get started',
      'learn more',
      'yo peleo por ti',
    ];
    const hasCTA = ctaPatterns.some(pattern => content.toLowerCase().includes(pattern));

    if (hasCTA) score += 5;
    else recommendations.push('Add clear call-to-action statements');

    // Local SEO
    const locationMentions = [
      'north carolina',
      'florida',
      'raleigh',
      'charlotte',
      'orlando',
      'miami',
    ];
    const hasLocalSEO = locationMentions.some(location => content.toLowerCase().includes(location));

    if (hasLocalSEO) score += 5;
    else recommendations.push('Include location mentions for local SEO');

    // Readability (simplified check)
    const avgSentenceLength =
      content.split(/[.!?]+/).length > 0 ? wordCount / content.split(/[.!?]+/).length : 0;

    if (avgSentenceLength <= 20 && avgSentenceLength >= 10) score += 5;
    else if (avgSentenceLength > 20) {
      recommendations.push('Simplify sentences for better readability');
    }

    return {
      score: Math.min(score, 100),
      recommendations,
      issues,
    };
  }

  // ========== COMPETITOR ANALYSIS ==========

  async analyzeCompetitor(data: { url: string; depth: string }) {
    const { url } = data;

    try {
      // Fetch competitor sitemap
      await this.fetchSitemap(url);

      // Analyze top performing pages
      const topPages = await this.identifyTopPages(url);

      // Extract content strategy
      const contentStrategy = await this.extractContentStrategy(topPages);

      // Analyze backlink profile
      const backlinks = await this.analyzeBacklinks({ domain: url });

      // Technical SEO audit
      const technicalSEO = await this.auditTechnicalSEO(url);

      // Content gap analysis
      const contentGaps = await this.findContentGaps({
        competitors: topPages.map(page => ({ url: page.url, keywords: [] })),
        currentKeywords: contentStrategy.topKeywords || [],
        practiceAreas: this.config.practiceAreas,
        contentStrategy: { topics: contentStrategy.topTopics || [] },
      });

      return {
        url,
        topPages,
        contentStrategy,
        backlinks,
        technicalSEO,
        opportunities: await this.identifyOpportunities(contentStrategy, backlinks),
        contentGaps,
      };
    } catch (error) {
      componentLogger.error('SEOAgent.analyzeCompetitor', { error: error as Error, url });
      throw error;
    }
  }

  private async fetchSitemap(url: string): Promise<{ urls: string[] }> {
    try {
      const sitemapUrl = new URL('/sitemap.xml', url).toString();
      const response = await fetch(sitemapUrl).then(res => res.json());
      const $ = cheerio.load(response.data, { xmlMode: true });

      const urls: string[] = [];
      $('url loc').each((_, elem) => {
        urls.push($(elem).text());
      });

      return { urls };
    } catch (error) {
      if (componentLogger.warn) {
        componentLogger.warn('SEOAgent.fetchSitemap failed', { url, error });
      } else {
        console.warn('SEOAgent.fetchSitemap failed', { url, error });
      }
      return { urls: [] };
    }
  }

  private async identifyTopPages(url: string): Promise<
    Array<{
      url: string;
      title: string;
      metaDescription?: string;
      h1: string;
      wordCount: number;
    }>
  > {
    // In production, this would use SEO tools API
    // For now, we'll analyze the homepage and key pages
    const pagesToAnalyze = [url, `${url}/practice-areas`, `${url}/about`, `${url}/blog`];

    const topPages: Array<{
      url: string;
      title: string;
      metaDescription?: string;
      h1: string;
      wordCount: number;
    }> = [];
    for (const pageUrl of pagesToAnalyze) {
      try {
        const response = await fetch(pageUrl).then(res => res.json());
        const $ = cheerio.load(response.data);

        topPages.push({
          url: pageUrl,
          title: $('title').text(),
          metaDescription: $('meta[name="description"]').attr('content'),
          h1: $('h1').first().text(),
          wordCount: $('body').text().split(/\s+/).length,
        });
      } catch (error) {
        if (componentLogger.warn) {
          componentLogger.warn('Failed to analyze page', { pageUrl, error });
        } else {
          console.warn('Failed to analyze page', { pageUrl, error });
        }
      }
    }

    return topPages;
  }

  private async extractContentStrategy(
    topPages: Array<{
      url: string;
      title: string;
      description?: string;
      keywords?: string[];
      traffic?: number;
    }>
  ): Promise<{
    topKeywords: string[];
    contentTypes: string[];
    publishingFrequency: string;
    averageLength: number;
    topTopics: string[];
  }> {
    const prompt = `Analyze these competitor pages and extract their content strategy:
      ${JSON.stringify(topPages, null, 2)}
      
      Identify:
      1. Content themes and topics
      2. Keyword targeting patterns
      3. Content structure and format
      4. Unique value propositions
      5. Content gaps we can exploit
      
      Return as JSON with detailed analysis.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0]?.message?.content || '{}');
  }

  private async analyzeBacklinks(data: { domain: string }): Promise<{
    totalBacklinks: number;
    referringDomains: number;
    domainAuthority: number;
    topReferrers: string[];
    anchorTextDistribution: Record<string, number>;
  }> {
    // In production, use Ahrefs, Moz, or SEMrush API
    // For now, return mock data structure
    return {
      totalBacklinks: 0,
      referringDomains: 0,
      domainAuthority: 0,
      topReferrers: [],
      anchorTextDistribution: {},
    };
  }

  private async auditTechnicalSEO(url: string): Promise<{
    score: number;
    issues: string[];
    suggestions: string[];
  }> {
    try {
      const response = await fetch(url).then(res => res.json());
      const $ = cheerio.load(response.data);

      const audit = {
        score: 85,
        issues: [] as string[],
        suggestions: [] as string[],
      };

      // Check for meta tags
      if (!$('meta[name="description"]').length) {
        audit.issues.push('Missing meta description');
        audit.score -= 10;
      }

      // Check for schema markup
      const hasSchema = $('script[type="application/ld+json"]').length > 0;
      if (!hasSchema) {
        audit.suggestions.push('Add schema markup');
        audit.score -= 5;
      }

      // Check for canonical
      if (!$('link[rel="canonical"]').length) {
        audit.issues.push('Missing canonical tag');
        audit.score -= 5;
      }

      // Check for mobile viewport
      if (!$('meta[name="viewport"]').length) {
        audit.issues.push('Missing mobile viewport meta tag');
        audit.score -= 10;
      }

      return audit;
    } catch (error) {
      componentLogger.error('SEOAgent.auditTechnicalSEO', { error: error as Error, url });
      return { score: 0, issues: ['Failed to audit'], suggestions: [] };
    }
  }

  private async identifyOpportunities(
    contentStrategy: {
      topKeywords: string[];
      contentTypes: string[];
      topTopics: string[];
    },
    backlinks: {
      totalBacklinks: number;
      referringDomains: number;
      topReferrers: string[];
    }
  ): Promise<{
    contentGaps: string[];
    linkOpportunities: string[];
    technicalImprovements: string[];
    priorityActions: string[];
  }> {
    const prompt = `Based on this competitor analysis, identify SEO opportunities:
      
      Content Strategy: ${JSON.stringify(contentStrategy)}
      Backlink Profile: ${JSON.stringify(backlinks)}
      
      Suggest:
      1. Content topics we should create
      2. Keywords to target
      3. Backlink opportunities
      4. Technical improvements
      5. Quick wins
      
      Return as actionable JSON recommendations.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    return JSON.parse(response.choices[0]?.message?.content || '{}');
  }

  private async findContentGaps(analysis: {
    competitors: Array<{ url: string; keywords: string[] }>;
    currentKeywords: string[];
    practiceAreas: string[];
    contentStrategy?: { topics?: string[] };
  }): Promise<ContentGap[]> {
    const gaps: ContentGap[] = [];

    // Analyze missing topics
    const ourPracticeAreas = this.config.practiceAreas;
    const theirTopics =
      (analysis as { contentStrategy?: { topics?: string[] } }).contentStrategy?.topics || [];

    for (const area of ourPracticeAreas) {
      const relatedTopics = await this.suggestTopics(area, theirTopics);

      for (const topic of relatedTopics) {
        gaps.push({
          topic,
          practiceArea: area,
          keywords: await this.suggestKeywords(topic, area),
          insights: {
            competitionLevel: 'low',
            searchVolume: 5000,
          },
        });
      }
    }

    return gaps;
  }

  // ========== NEWS & SOCIAL MEDIA MONITORING ==========

  async checkTrendingNews() {
    componentLogger.info('SEOAgent.checkTrendingNews', {});

    for (const practiceArea of this.config.practiceAreas) {
      try {
        const searchQueries = this.generateNewsQueries(practiceArea);

        for (const query of searchQueries) {
          const newsData = await this.fetchGoogleNews(query);

          for (const article of newsData) {
            const shouldCreate = await this.analyzeNewsRelevance(article, practiceArea);

            if (shouldCreate) {
              await this.contentQueue.add('news-analysis', {
                article,
                practiceArea,
                type: 'rapid-response',
              });
            }
          }
        }
      } catch (error) {
        componentLogger.error('SEOAgent.checkTrendingNews', {
          error: error as Error,
          practiceArea,
        });
      }
    }
  }

  async scanSocialMedia() {
    componentLogger.info('SEOAgent.scanSocialMedia', {});

    const platforms = ['youtube', 'tiktok', 'instagram', 'facebook'];

    for (const platform of platforms) {
      for (const practiceArea of this.config.practiceAreas) {
        try {
          const content = await this.scrapeSocialPlatform(platform, practiceArea);

          for (const post of content) {
            if (this.isViralContent(post)) {
              await this.contentQueue.add('social-response', {
                platform,
                post,
                practiceArea,
                strategy: 'newsjacking',
              });

              // Save to database
              await getPrismaClient().scrapedContent.create({
                data: {
                  platform,
                  url: post.url,
                  title: post.title,
                  description: post.description,
                  engagement: post.engagement,
                  publishedAt: post.publishedAt,
                  author: post.author,
                  hashtags: post.hashtags,
                  practiceArea,
                  relevanceScore: post.relevanceScore,
                },
              });
            }
          }
        } catch (error) {
          componentLogger.error('SEOAgent.scanSocialMedia', {
            error: error as Error,
            platform,
            practiceArea,
          });
        }
      }
    }
  }

  private async fetchGoogleNews(query: string): Promise<
    Array<{
      title: string;
      url: string;
      summary: string;
      publishedAt: Date;
      source: string;
    }>
  > {
    // In production, use Google News API or web scraping
    // This is a placeholder that would fetch real news
    const mockNews = [
      {
        title: `New ${query} Development`,
        url: 'https://example.com/news/1',
        summary: 'Recent changes in legal landscape...',
        publishedAt: new Date(),
        source: 'Legal News Daily',
      },
    ];

    return mockNews;
  }

  private async analyzeNewsRelevance(
    article: {
      title: string;
      description?: string;
      content?: string;
      keywords?: string[];
    },
    practiceArea: string
  ): Promise<boolean> {
    const prompt = `Analyze if this news article is relevant for a law firm's ${practiceArea} practice area blog:
      Title: ${article.title}
      Summary: ${(article as { summary?: string; description?: string }).summary || article.description || ''}
      
      Consider:
      1. Direct relevance to legal practice
      2. Potential client interest
      3. SEO opportunity
      4. Timeliness
      
      Return JSON: { relevant: boolean, score: number, reason: string }`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const analysis = JSON.parse(response.choices[0]?.message?.content || '{}');
    return analysis.relevant && analysis.score > 7;
  }

  private async scrapeSocialPlatform(
    platform: string,
    practiceArea: string
  ): Promise<
    Array<{
      url: string;
      title: string;
      description: string;
      engagement: {
        likes: number;
        comments: number;
        shares: number;
        views?: number;
      };
      publishedAt: Date;
      author: string;
      hashtags: string[];
      relevanceScore: number;
      views?: number;
    }>
  > {
    // In production, use platform APIs or scraping tools
    // This is a placeholder
    return [];
  }

  private isViralContent(post: {
    engagement?: { likes?: number; shares?: number; comments?: number };
    views?: number;
  }): boolean {
    const engagementRate =
      ((post.engagement?.likes || 0) +
        (post.engagement?.comments || 0) +
        (post.engagement?.shares || 0)) /
      (post.views || 1);
    return engagementRate > 0.05 || (post.views || 0) > 10000;
  }

  private async generateSocialResponse(data: {
    platform: string;
    post: unknown;
    practiceArea: string;
  }): Promise<{
    blogPostIdea: string;
    socialResponse: string;
    keywords: string[];
    angle: string;
  }> {
    const { platform, post, practiceArea } = data;

    const prompt = `Create a response strategy for this viral ${platform} content:
      Post: ${JSON.stringify(post)}
      Practice Area: ${practiceArea}
      
      Generate:
      1. Blog post idea that relates to this trend
      2. Social media response content
      3. Keywords to target
      4. Angle that adds legal expertise
      
      Return as JSON.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
    });

    return JSON.parse(response.choices[0]?.message?.content || '{}');
  }

  private async analyzeAndCreateContent(data: {
    article: { title: string; summary?: string };
    practiceArea: string;
  }): Promise<unknown> {
    const { article, practiceArea } = data;

    // Generate rapid response content
    const contentData = {
      topic: `Legal Perspective: ${article.title}`,
      practiceArea,
      language: 'en' as 'en' | 'es',
      keywords: await this.extractNewsKeywords(article),
      competitorInsights: {
        topKeywords: await this.extractNewsKeywords(article),
        contentStrategies: ['news-jacking', 'trending-topic'],
      },
    };

    return await this.generateBlogPost(contentData);
  }

  // ========== HELPER METHODS ==========

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private generateExcerpt(content: string, maxLength: number = 160): string {
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength ? plainText.substring(0, maxLength - 3) + '...' : plainText;
  }

  private async calculateSEOScore(blogData: {
    title: string;
    keywords: string[];
    metaDescription: string;
    content: string;
    headings: string[];
    images: unknown[];
    structuredData?: unknown;
    internalLinks?: unknown[];
    faqSection?: unknown[];
  }): Promise<number> {
    let score = 0;

    // Title optimization (20 points)
    if (blogData.title.length >= 30 && blogData.title.length <= 60) score += 10;
    if (blogData.keywords.some((kw: string) => blogData.title.toLowerCase().includes(kw)))
      score += 10;

    // Meta description (15 points)
    if (blogData.metaDescription.length >= 120 && blogData.metaDescription.length <= 155)
      score += 15;

    // Content length (20 points)
    const wordCount = blogData.content.split(' ').length;
    if (wordCount >= 2000) score += 20;
    else if (wordCount >= 1500) score += 15;
    else if (wordCount >= 1000) score += 10;

    // Keyword density (15 points)
    const keywordDensity = this.calculateKeywordDensity(blogData.content, blogData.keywords);
    if (keywordDensity >= 1 && keywordDensity <= 3) score += 15;

    // Headers (10 points)
    const headers = (blogData.content.match(/<h[2-3]>/g) || []).length;
    if (headers >= 5) score += 10;

    // FAQ section (10 points)
    if (blogData.faqSection && blogData.faqSection.length > 0) score += 10;

    // Internal links (10 points)
    if (blogData.internalLinks && blogData.internalLinks.length >= 3) score += 10;

    return Math.min(score, 100);
  }

  private calculateKeywordDensity(content: string, keywords: string[]): number {
    const words = content.toLowerCase().split(/\s+/);
    const keywordCount = keywords.reduce((count, keyword) => {
      return count + words.filter(word => word.includes(keyword.toLowerCase())).length;
    }, 0);

    return (keywordCount / words.length) * 100;
  }

  private generateNewsQueries(practiceArea: string): string[] {
    const baseQueries: Record<string, string[]> = {
      immigration: ['immigration law changes', 'USCIS updates', 'visa news', 'immigration reform'],
      'personal-injury': [
        'accident settlements',
        'personal injury verdicts',
        'safety recalls',
        'insurance changes',
      ],
      'workers-compensation': [
        'workplace safety',
        'OSHA updates',
        'workers comp changes',
        'workplace injury statistics',
      ],
      'criminal-defense': [
        'criminal law changes',
        'sentencing guidelines',
        'DWI laws',
        'criminal justice reform',
      ],
      'family-law': [
        'divorce law changes',
        'custody updates',
        'alimony reform',
        'family court news',
      ],
      'traffic-violations': [
        'traffic law updates',
        'DUI checkpoints',
        'speeding laws',
        'license suspension news',
      ],
    };

    const queries = baseQueries[practiceArea] || [];

    // Add location-specific queries
    return [
      ...queries,
      ...queries.map(q => `${q} North Carolina`),
      ...queries.map(q => `${q} Florida`),
    ];
  }

  private getSeedKeywords(practiceArea: string, language: string): string[] {
    const keywords: Record<string, Record<string, string[]>> = {
      immigration: {
        en: [
          'immigration lawyer',
          'visa attorney',
          'green card',
          'deportation defense',
          'citizenship',
        ],
        es: [
          'abogado de inmigración',
          'visa',
          'tarjeta verde',
          'defensa de deportación',
          'ciudadanía',
        ],
      },
      'personal-injury': {
        en: [
          'personal injury lawyer',
          'car accident attorney',
          'slip and fall',
          'injury compensation',
        ],
        es: [
          'abogado de lesiones personales',
          'accidente de auto',
          'resbalón y caída',
          'compensación',
        ],
      },
      'workers-compensation': {
        en: [
          'workers comp lawyer',
          'workplace injury attorney',
          'workers compensation claim',
          'work accident lawyer',
        ],
        es: [
          'abogado de compensación laboral',
          'lesiones en el trabajo',
          'reclamo de compensación',
          'accidente laboral',
        ],
      },
      'criminal-defense': {
        en: ['criminal defense lawyer', 'DWI attorney', 'criminal charges', 'defense attorney'],
        es: ['abogado defensor criminal', 'abogado DWI', 'cargos criminales', 'defensa criminal'],
      },
      'family-law': {
        en: ['divorce lawyer', 'family law attorney', 'child custody', 'alimony lawyer'],
        es: [
          'abogado de divorcio',
          'abogado de familia',
          'custodia de niños',
          'pensión alimenticia',
        ],
      },
      'traffic-violations': {
        en: [
          'traffic ticket lawyer',
          'speeding ticket attorney',
          'license suspension',
          'traffic court',
        ],
        es: [
          'abogado de multas',
          'multa de velocidad',
          'suspensión de licencia',
          'corte de tráfico',
        ],
      },
    };

    return keywords[practiceArea]?.[language] || [];
  }

  private async generateBlogImages(blogId: string, topic: string) {
    try {
      // Generate feature image
      const featureImage = await this.openai.images.generate({
        prompt: `Professional law firm blog header image for article about ${topic}. Modern, trustworthy, blue and red color scheme.`,
        n: 1,
        size: '1792x1024',
      });

      // Generate infographic
      const infographic = await this.openai.images.generate({
        prompt: `Legal infographic explaining ${topic}. Clean, professional, easy to understand, Vasquez Law Firm branding.`,
        n: 1,
        size: '1024x1024',
      });

      // Save image URLs to blog post
      await getPrismaClient().blogPost.update({
        where: { id: blogId },
        data: {
          featuredImage: featureImage.data?.[0]?.url || '',
          images: infographic.data?.[0]?.url ? [infographic.data[0].url] : [],
        },
      });
    } catch (error) {
      componentLogger.error('SEOAgent.generateBlogImages', { error: error as Error, blogId });
    }
  }

  private async generateAndSaveSchemaMarkup(blog: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    metaDescription?: string;
    keywords?: string[];
    faqSection?: Array<{ question: string; answer: string }>;
    language?: string;
    practiceArea?: string;
    author?: string;
    featuredImage?: string;
    publishedAt?: Date;
    updatedAt?: Date;
  }) {
    const schema = await this.generateSchemaMarkup('BlogPosting', blog);

    // In production, you might want to save this to a separate field
    // or inject it into the page when rendering
    return schema;
  }

  private formatPracticeAreaName(area: string): string {
    const names: Record<string, string> = {
      immigration: 'Immigration Law',
      'personal-injury': 'Personal Injury',
      'workers-compensation': "Workers' Compensation",
      'criminal-defense': 'Criminal Defense',
      'family-law': 'Family Law',
      'traffic-violations': 'Traffic Violations',
    };

    return names[area] || area;
  }

  private getPracticeAreaDescription(area: string): string {
    const descriptions: Record<string, string> = {
      immigration:
        'Comprehensive immigration services including visas, green cards, citizenship, and deportation defense.',
      'personal-injury':
        'Representation for car accidents, slip and falls, and other personal injury cases.',
      'workers-compensation': 'Helping injured workers get the compensation they deserve.',
      'criminal-defense':
        'Aggressive defense for criminal charges including DWI, drug offenses, and more.',
      'family-law': 'Compassionate representation for divorce, custody, and family matters.',
      'traffic-violations': 'Fighting traffic tickets and license suspensions.',
    };

    return descriptions[area] || '';
  }

  private async suggestTopics(practiceArea: string, competitorTopics: string[]): Promise<string[]> {
    const prompt = `Suggest 5 blog topics for ${practiceArea} law that competitors haven't covered:
      Competitor topics: ${competitorTopics.join(', ')}
      
      Focus on:
      1. Unique angles
      2. Recent legal changes
      3. Local relevance (NC/FL)
      4. Common client questions
      5. Trending issues
      
      Return as JSON array of strings.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0]?.message?.content || '[]');
  }

  private async suggestKeywords(topic: string, practiceArea: string): Promise<string[]> {
    const prompt = `Suggest 5-7 keywords for a blog post about "${topic}" in ${practiceArea} law.
      Include mix of head terms and long-tail keywords.
      Return as JSON array of strings.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    return JSON.parse(response.choices[0]?.message?.content || '[]');
  }

  private async extractNewsKeywords(article: {
    title: string;
    summary?: string;
  }): Promise<string[]> {
    const prompt = `Extract 5-7 SEO keywords from this news article:
      Title: ${article.title}
      Summary: ${article.summary}
      
      Focus on legal terms and searchable phrases.
      Return as JSON array of strings.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0]?.message?.content || '[]');
  }

  async runCompetitorAnalysis() {
    componentLogger.info('SEOAgent.runCompetitorAnalysis', {});

    for (const competitor of this.config.competitors) {
      try {
        const analysis = await this.analyzeCompetitor({
          url: competitor,
          depth: 'comprehensive',
        });

        // Save analysis to database
        const domain = new URL(competitor).hostname;

        // First, ensure competitor exists
        const competitorRecord = await getPrismaClient().competitor.upsert({
          where: { website: competitor },
          update: { lastChecked: new Date() },
          create: {
            name: domain,
            website: competitor,
            domain: domain,
            practiceAreas: this.config.practiceAreas,
            locations: ['North Carolina', 'Florida'],
          },
        });

        await getPrismaClient().competitorAnalysis.create({
          data: {
            competitorId: competitorRecord.id,
            url: competitor,
            domain: domain,
            blogPosts: analysis.topPages,
            seoData: analysis.technicalSEO,
            backlinks: analysis.backlinks,
            keywords: analysis.contentStrategy,
            contentGaps: JSON.parse(JSON.stringify(analysis.contentGaps || [])),
          },
        });

        // Generate content for gaps
        for (const gap of analysis.contentGaps || []) {
          await this.contentQueue.add('blog-post', {
            topic: gap.topic,
            practiceArea: gap.practiceArea,
            language: 'en',
            keywords: gap.keywords,
            competitorInsights: gap.insights,
          });
        }
      } catch (error) {
        componentLogger.error('SEOAgent.runCompetitorAnalysis', {
          error: error as Error,
          competitor,
        });
      }
    }
  }

  private async runSEOAudit(): Promise<void> {
    componentLogger.info('SEOAgent.runSEOAudit', {});

    try {
      const prisma = getPrismaClient();

      // Audit all published blog posts
      const posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
      });

      for (const post of posts) {
        const score = await this.scoreContent(post.content, {
          targetKeywords: post.keywords,
          practiceArea: post.practiceArea || 'general',
          contentType: 'blog',
        });

        // Update SEO score
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { seoScore: score.score },
        });

        // Create SEO analysis record
        await prisma.seoAnalysis.create({
          data: {
            blogPostId: post.id,
            analyzedAt: new Date(),
          },
        });
      }

      // Analyze site structure
      await this.analyzeSiteStructure();

      // Check for technical issues
      await this.checkTechnicalSEO();

      componentLogger.info('SEOAgent.runSEOAudit completed', {});
    } catch (error) {
      componentLogger.error('SEOAgent.runSEOAudit', error as Error);
    }
  }

  private async analyzeSiteStructure() {
    // Analyze internal linking
    // Check for orphan pages
    // Verify sitemap completeness
    // Check URL structure
  }

  private async checkTechnicalSEO() {
    // Check page speed
    // Verify mobile responsiveness
    // Check for broken links
    // Validate structured data
  }

  async stop() {
    // Stop all cron jobs
    this.cronJobs.forEach(job => job.stop());

    // Close queue connections
    await this.contentQueue.close();
    await this.analysisQueue.close();
  }
}
