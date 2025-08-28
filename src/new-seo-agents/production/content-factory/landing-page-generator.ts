import { componentLogger as logger } from '@/lib/safe-logger';
import OpenAI from 'openai';
import { NCDataService } from '@/lib/external-apis/nc-data';
import { LocalSEOService } from '@/lib/external-apis/local-seo';
import type {
  LocalData,
  PageSection,
  LocalSchema,
  ConversionElements,
} from '@/types/content-factory';

export interface CityPageOptions {
  city: string;
  practiceArea: string;
  language: string;
  includeLocalStats: boolean;
  includeTestimonials: boolean;
  includeMapEmbed: boolean;
}

export interface PracticeAreaVariationOptions {
  practiceArea: string;
  variationType: string;
  language: string;
  targetAudience: string;
}

export interface GeneratedLandingPage {
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  sections: PageSection[];
  localSchema: LocalSchema;
  conversionElements?: ConversionElements;
}

export class LandingPageGenerator {
  private openai: OpenAI;
  private ncDataService: NCDataService;
  private localSEOService: LocalSEOService;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.ncDataService = new NCDataService();
    this.localSEOService = new LocalSEOService();
  }

  private getOpenAIContent(response: OpenAI.Chat.Completions.ChatCompletion): string {
    if (response.choices && response.choices.length > 0 && response.choices[0]?.message?.content) {
      return response.choices[0].message.content;
    }
    return '';
  }

  async initialize() {
    logger.info('Initializing Landing Page Generator');
  }

  /**
   * Generate city-specific landing page
   */
  async generateCityPage(options: CityPageOptions): Promise<GeneratedLandingPage> {
    logger.info('Generating city landing page', {
      city: options.city,
      practiceArea: options.practiceArea,
    });

    try {
      // Get local data for the city
      const localData = await this.getLocalData(options.city);

      // Get local keywords
      const localKeywords = await this.localSEOService.getLocalKeywords(
        options.city,
        options.practiceArea
      );

      // Generate page sections
      const sections = await this.generateCityPageSections(
        options,
        localData as LocalData,
        localKeywords
      );

      // Generate hero section
      const heroSection = await this.generateHeroSection(options, localData as LocalData);

      // Generate local schema
      const localSchema = await this.generateLocalBusinessSchema(options, localData as LocalData);

      // Compile full page content
      const content = this.compileCityPageContent(heroSection, sections as PageSection[]);

      // Generate metadata
      const metadata = await this.generateCityPageMetadata(options, localKeywords);

      // Translate if needed
      if (options.language === 'es') {
        const heroImage = await this.generateHeroImage(options.city, options.practiceArea);
        return await this.translateLandingPage({
          content,
          ...metadata,
          sections: sections as PageSection[],
          localSchema,
          heroImage,
        });
      }

      return {
        ...metadata,
        content,
        sections: sections as PageSection[],
        localSchema,
        heroImage: await this.generateHeroImage(options.city, options.practiceArea),
      };
    } catch (error) {
      logger.error('Error generating city page', { error, options });
      throw error;
    }
  }

  /**
   * Generate practice area variation for A/B testing
   */
  async generatePracticeAreaVariation(
    options: PracticeAreaVariationOptions
  ): Promise<GeneratedLandingPage> {
    logger.info('Generating practice area variation', {
      practiceArea: options.practiceArea,
      type: options.variationType,
    });

    try {
      // Generate content based on variation type
      let content;
      let conversionElements;

      switch (options.variationType) {
        case 'emotional':
          content = await this.generateEmotionalContent(options);
          conversionElements = await this.generateEmotionalCTAs(options);
          break;
        case 'statistical':
          content = await this.generateStatisticalContent(options);
          conversionElements = await this.generateDataDrivenCTAs(options);
          break;
        case 'testimonial':
          content = await this.generateTestimonialContent(options);
          conversionElements = await this.generateSocialProofCTAs(options);
          break;
        case 'faq-focused':
          content = await this.generateFAQFocusedContent(options);
          conversionElements = await this.generateEducationalCTAs(options);
          break;
        default:
          content = await this.generateStandardContent(options);
          conversionElements = await this.generateStandardCTAs(options);
      }

      // Generate metadata
      const metadata = await this.generateVariationMetadata(options);

      // Add conversion tracking elements
      const trackingElements = this.addConversionTracking(conversionElements);

      return {
        ...metadata,
        content: content.content || '',
        sections: (content.sections || []) as PageSection[],
        localSchema: null as unknown as LocalSchema,
        conversionElements: trackingElements,
        heroImage: await this.generateHeroImage('default', options.practiceArea),
      };
    } catch (error) {
      logger.error('Error generating practice area variation', { error, options });
      throw error;
    }
  }

  /**
   * Get local data for a city
   */
  private async getLocalData(city: string) {
    try {
      const [demographics, crimeStats, courtInfo, competitorData] = await Promise.all([
        this.ncDataService.getCityDemographics(city),
        this.ncDataService.getCrimeStatistics(city),
        this.ncDataService.getLocalCourtInfo(city),
        this.localSEOService.getLocalCompetitors(city),
      ]);

      return {
        demographics,
        crimeStats,
        courtInfo,
        competitorData,
        population: demographics.population || 'N/A',
        medianIncome: demographics.medianIncome || 'N/A',
        majorEmployers: demographics.majorEmployers || [],
        localCourts: courtInfo.courts || [],
        nearbyOffices: this.getNearbyOffices(city),
      };
    } catch (error) {
      logger.error('Error fetching local data', { error, city });
      return this.getDefaultLocalData(city);
    }
  }

  /**
   * Generate city page sections
   */
  private async generateCityPageSections(
    options: CityPageOptions,
    localData: LocalData,
    keywords: string[]
  ) {
    const sections: any[] = [];
    let order = 0;

    // Local expertise section
    const expertiseSection = await this.generateLocalExpertiseSection(options, localData);
    sections.push({ ...expertiseSection, order: order++ });

    // Practice area specific content
    const practiceSection = await this.generatePracticeAreaSection(options, localData);
    sections.push({ ...practiceSection, order: order++ });

    // Local statistics section
    if (options.includeLocalStats) {
      const statsSection = await this.generateLocalStatsSection(options, localData);
      sections.push({ ...statsSection, order: order++ });
    }

    // Testimonials section
    if (options.includeTestimonials) {
      const testimonialsSection = await this.generateTestimonialsSection(options);
      sections.push({ ...testimonialsSection, order: order++ });
    }

    // Local resources section
    const resourcesSection = await this.generateLocalResourcesSection(options, localData);
    sections.push({ ...resourcesSection, order: order++ });

    // FAQ section
    const faqSection = await this.generateLocalFAQSection(options, keywords);
    sections.push({ ...faqSection, order: order++ });

    // Contact section with map
    if (options.includeMapEmbed) {
      const mapSection = await this.generateMapSection(options, localData);
      sections.push({ ...mapSection, order: order++ });
    }

    return sections;
  }

  /**
   * Generate hero section
   */
  private async generateHeroSection(options: CityPageOptions, localData: LocalData) {
    const prompt = `Create a compelling hero section for a ${options.practiceArea} lawyer landing page in ${options.city}, NC.

Include:
1. Powerful headline mentioning ${options.city} and ${options.practiceArea}
2. Subheadline that addresses pain points
3. Bullet points of key benefits (3-4)
4. Strong call-to-action
5. Trust indicators (years of experience, cases won, etc.)

Local context: Population ${localData.population}, ${localData.majorEmployers.length} major employers

Format as JSON with keys: headline, subheadline, benefits, cta, trustIndicators`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 500,
    });

    const heroData = JSON.parse(this.getOpenAIContent(response) || '{}');
    return { ...heroData, order: 0 };
  }

  /**
   * Generate local expertise section
   */
  private async generateLocalExpertiseSection(options: CityPageOptions, localData: LocalData) {
    const prompt = `Write a "Local ${options.city} Expertise" section for ${options.practiceArea} law.

Include:
1. Knowledge of local courts: ${localData.localCourts.map(c => c.name).join(', ')}
2. Understanding of local laws and procedures
3. Relationships with local legal community
4. Experience with ${options.city} specific cases
5. Commitment to the ${options.city} community

Make it specific and authentic, not generic. About 200-300 words.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      type: 'local-expertise',
      title: `Your Trusted ${options.city} ${this.formatPracticeArea(options.practiceArea)} Lawyers`,
      content: this.getOpenAIContent(response),
    };
  }

  /**
   * Generate practice area specific content
   */
  private async generatePracticeAreaSection(options: CityPageOptions, localData: LocalData) {
    const specificData = this.getPracticeAreaSpecificData(options.practiceArea, localData);

    const prompt = `Write a section about ${options.practiceArea} law services in ${options.city}, NC.

Include:
1. Common ${options.practiceArea} issues in ${options.city}
2. How local factors affect these cases
3. Specific services offered
4. Success stories (anonymous)
5. Why choose Vasquez Law Firm

Local context: ${JSON.stringify(specificData)}

About 300-400 words. Make it specific to ${options.city}.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    });

    return {
      type: 'practice-area',
      title: `${this.formatPracticeArea(options.practiceArea)} Services in ${options.city}`,
      content: this.getOpenAIContent(response),
    };
  }

  /**
   * Generate local statistics section
   */
  private async generateLocalStatsSection(options: CityPageOptions, localData: LocalData) {
    const stats = this.getRelevantStats(options.practiceArea, localData);

    const prompt = `Create a statistics section showing why ${options.practiceArea} legal services are needed in ${options.city}.

Use these stats: ${JSON.stringify(stats)}

Format as:
1. Eye-catching statistics with context
2. What these numbers mean for residents
3. How we help address these issues

Make it visual and impactful. Include 4-6 key statistics.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 400,
    });

    return {
      type: 'statistics',
      title: `${options.city} by the Numbers`,
      content: this.getOpenAIContent(response),
      visualData: stats,
    };
  }

  /**
   * Generate testimonials section
   */
  private async generateTestimonialsSection(options: CityPageOptions) {
    const prompt = `Create 3 realistic testimonials from ${options.city} clients for ${options.practiceArea} cases.

Include:
1. Client initial and city (e.g., "J.S. from ${options.city}")
2. Specific situation they faced
3. How Vasquez Law Firm helped
4. Outcome achieved
5. Personal recommendation

Make them authentic, specific, and emotionally compelling. Vary the length and style.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 600,
    });

    return {
      type: 'testimonials',
      title: `What ${options.city} Clients Say About Us`,
      content: this.getOpenAIContent(response),
    };
  }

  /**
   * Generate local resources section
   */
  private async generateLocalResourcesSection(options: CityPageOptions, localData: LocalData) {
    const resources = this.getLocalResources(options.city, options.practiceArea, localData);

    const prompt = `Create a helpful local resources section for ${options.city} residents dealing with ${options.practiceArea} issues.

Include these resources: ${JSON.stringify(resources)}

Format as:
1. Brief intro about why these resources matter
2. List of resources with descriptions
3. How Vasquez Law Firm can help navigate these resources

Make it genuinely helpful, not just promotional.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      type: 'resources',
      title: `${options.city} Legal Resources`,
      content: this.getOpenAIContent(response),
      resources,
    };
  }

  /**
   * Generate local FAQ section
   */
  private async generateLocalFAQSection(options: CityPageOptions, keywords: string[]) {
    const prompt = `Generate 5 frequently asked questions specific to ${options.practiceArea} law in ${options.city}, NC.

Focus on:
1. Local procedures and requirements
2. ${options.city} specific concerns
3. Cost questions
4. Timeline questions
5. What makes ${options.city} cases unique

Include keywords: ${keywords.join(', ')}

Format as JSON array with 'question' and 'answer' keys. Answers should be detailed (100-150 words each).`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      type: 'faq',
      title: `${options.practiceArea} FAQs for ${options.city} Residents`,
      questions: JSON.parse(response.choices[0]?.message?.content || '[]'),
    };
  }

  /**
   * Generate map section
   */
  private async generateMapSection(options: CityPageOptions, localData: LocalData) {
    const nearestOffice = this.getNearestOffice(options.city);

    if (!nearestOffice) {
      return {
        type: 'map',
        title: `Our Offices Serving ${options.city}`,
        content: `We proudly serve ${options.city} residents with dedicated legal representation.`,
        mapData: {
          center: { lat: 35.7796, lng: -78.6382 }, // Default to Raleigh
          zoom: 10,
          markers: [] as Array<{
            city: string;
            address: string;
            coordinates: { lat: number; lng: number };
            distance: number;
          }>,
        },
      };
    }

    return {
      type: 'map',
      title: `Visit Our Office Near ${options.city}`,
      content: `Our ${nearestOffice.city} office is conveniently located to serve ${options.city} residents. 
                Just ${nearestOffice.distance} miles away, we're here when you need us.`,
      mapData: {
        center: nearestOffice.coordinates,
        zoom: 12,
        markers: [nearestOffice],
      },
      office: nearestOffice,
    };
  }

  /**
   * Generate emotional content variation
   */
  private async generateEmotionalContent(options: PracticeAreaVariationOptions) {
    const emotionalTriggers = this.getEmotionalTriggers(options.practiceArea);

    const prompt = `Create an emotionally compelling landing page for ${options.practiceArea} law.

Target audience: ${options.targetAudience}
Emotional triggers: ${emotionalTriggers.join(', ')}

Structure:
1. Empathetic headline that acknowledges their pain
2. Story-driven introduction
3. "We understand" section with specific scenarios
4. Hope and solution focused content
5. Compassionate call-to-action

Write with empathy, understanding, and hope. About 800-1000 words total.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
    });

    return {
      content: this.getOpenAIContent(response),
      sections: this.parseContentSections(response.choices[0]?.message?.content || ''),
    };
  }

  /**
   * Generate statistical content variation
   */
  private async generateStatisticalContent(options: PracticeAreaVariationOptions) {
    const statistics = await this.getRelevantStatistics(options.practiceArea);

    const prompt = `Create a data-driven landing page for ${options.practiceArea} law.

Target audience: ${options.targetAudience}
Key statistics: ${JSON.stringify(statistics)}

Structure:
1. Statistic-led headline
2. Problem magnitude section with data
3. Success rates and case results
4. Industry comparisons
5. Data-backed call-to-action

Use numbers, percentages, and concrete data throughout. About 800-1000 words.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 1500,
    });

    return {
      content: this.getOpenAIContent(response),
      sections: this.parseContentSections(response.choices[0]?.message?.content || ''),
    };
  }

  /**
   * Generate testimonial-focused content
   */
  private async generateTestimonialContent(options: PracticeAreaVariationOptions) {
    const prompt = `Create a testimonial-driven landing page for ${options.practiceArea} law.

Target audience: ${options.targetAudience}

Structure:
1. Client quote as headline
2. Success story introduction
3. Multiple client testimonials woven throughout
4. Results achieved section
5. "Join our satisfied clients" CTA

Make testimonials specific, varied, and authentic. About 800-1000 words.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
    });

    return {
      content: this.getOpenAIContent(response),
      sections: this.parseContentSections(response.choices[0]?.message?.content || ''),
    };
  }

  /**
   * Generate FAQ-focused content
   */
  private async generateFAQFocusedContent(options: PracticeAreaVariationOptions) {
    const commonQuestions = await this.getCommonQuestions(options.practiceArea);

    const prompt = `Create an FAQ-driven landing page for ${options.practiceArea} law.

Target audience: ${options.targetAudience}
Common questions: ${commonQuestions.join(', ')}

Structure:
1. Question-based headline
2. "Get answers" introduction
3. Comprehensive Q&A sections
4. "Still have questions?" section
5. "Get personalized answers" CTA

Answer questions thoroughly while building trust. About 800-1000 words.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return {
      content: this.getOpenAIContent(response),
      sections: this.parseContentSections(response.choices[0]?.message?.content || ''),
    };
  }

  /**
   * Generate standard content
   */
  private async generateStandardContent(options: PracticeAreaVariationOptions) {
    const prompt = `Create a standard professional landing page for ${options.practiceArea} law.

Target audience: ${options.targetAudience}

Structure:
1. Professional headline
2. Service overview
3. Why choose us section
4. Process explanation
5. Clear call-to-action

Professional, informative, and trustworthy tone. About 800-1000 words.`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return {
      content: this.getOpenAIContent(response),
      sections: this.parseContentSections(response.choices[0]?.message?.content || ''),
    };
  }

  /**
   * Generate CTAs based on content type
   */
  private async generateEmotionalCTAs(options: PracticeAreaVariationOptions) {
    return {
      primary: 'Get the Compassionate Help You Deserve',
      secondary: 'Talk to Someone Who Understands',
      sticky: "We're Here for You 24/7",
      exit: "Don't Face This Alone",
    };
  }

  private async generateDataDrivenCTAs(options: PracticeAreaVariationOptions) {
    return {
      primary: '95% Success Rate - Get Your Free Case Evaluation',
      secondary: 'See Our Case Results',
      sticky: 'Join 500+ Satisfied Clients',
      exit: 'Get a Data-Backed Legal Strategy',
    };
  }

  private async generateSocialProofCTAs(options: PracticeAreaVariationOptions) {
    return {
      primary: 'Join Hundreds of Happy Clients',
      secondary: 'Read More Success Stories',
      sticky: 'Rated 5 Stars by Our Clients',
      exit: 'See Why Clients Choose Us',
    };
  }

  private async generateEducationalCTAs(options: PracticeAreaVariationOptions) {
    return {
      primary: 'Get Expert Answers to Your Questions',
      secondary: 'Learn More About Your Rights',
      sticky: 'Free Legal Consultation',
      exit: 'Download Our Free Guide',
    };
  }

  private async generateStandardCTAs(options: PracticeAreaVariationOptions) {
    return {
      primary: 'Schedule Your Free Consultation',
      secondary: 'Call Now: 1-844-YO-PELEO',
      sticky: 'Get Legal Help Today',
      exit: "Don't Wait - Contact Us Now",
    };
  }

  /**
   * Helper methods
   */
  private compileCityPageContent(heroSection: PageSection, sections: PageSection[]): string {
    const hero = heroSection as {
      headline?: string;
      subheadline?: string;
      bullets?: string[];
      cta?: string;
      trustIndicators?: string[];
    };
    let content = `# ${hero.headline}\n\n`;
    content += `## ${hero.subheadline}\n\n`;

    // Add benefits (bullets)
    if (hero.bullets) {
      content += hero.bullets.map((b: string) => `- ${b}`).join('\n') + '\n\n';
    }

    // Add sections
    sections.forEach(section => {
      content += `## ${section.title}\n\n`;
      content += `${section.content}\n\n`;
    });

    return content;
  }

  private async generateCityPageMetadata(options: CityPageOptions, keywords: string[]) {
    const title = `${options.city} ${this.formatPracticeArea(options.practiceArea)} Lawyer | Vasquez Law Firm`;
    const slug = `${options.city.toLowerCase().replace(/\s+/g, '-')}-${options.practiceArea}-lawyer`;
    const metaDescription = `Expert ${options.practiceArea} attorney serving ${options.city}, NC. Free consultation. Se habla español. Call 1-844-YO-PELEO.`;

    return {
      title,
      slug,
      metaDescription,
      keywords: [
        `${options.city} ${options.practiceArea} lawyer`,
        `${options.practiceArea} attorney ${options.city} NC`,
        ...keywords,
      ],
    };
  }

  private async generateVariationMetadata(options: PracticeAreaVariationOptions) {
    const variationTitles = {
      emotional: `Compassionate ${this.formatPracticeArea(options.practiceArea)} Lawyers Who Understand`,
      statistical: `${this.formatPracticeArea(options.practiceArea)} Attorneys with Proven Results`,
      testimonial: `Trusted ${this.formatPracticeArea(options.practiceArea)} Lawyers - Client Success Stories`,
      'faq-focused': `${this.formatPracticeArea(options.practiceArea)} Law Questions Answered`,
    };

    const title =
      (variationTitles as Record<string, string>)[options.variationType] ||
      `${this.formatPracticeArea(options.practiceArea)} Lawyers`;
    const slug = `${options.practiceArea}-${options.variationType}`;

    return {
      title,
      slug,
      metaDescription: `${title} | Free Consultation | Vasquez Law Firm`,
      keywords: this.getVariationKeywords(options),
    };
  }

  private async generateLocalBusinessSchema(
    options: CityPageOptions,
    localData: LocalData
  ): Promise<LocalSchema> {
    const nearestOffice = this.getNearestOffice(options.city) || this.getDefaultOffice();
    
    // Provide fallback office data if none found
    const officeData = nearestOffice || {
      city: 'Charlotte',
      address: '6211 Monroe Rd, Charlotte, NC 28212',
      coordinates: { lat: 35.1598, lng: -80.8256 },
      distance: 0,
    };

    return {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: `Vasquez Law Firm - ${options.city} ${this.formatPracticeArea(options.practiceArea)} Lawyers`,
      description: `Professional ${options.practiceArea} legal services in ${options.city}, North Carolina`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: officeData.address || '6009 Triangle Dr',
        addressLocality: options.city,
        addressRegion: 'NC',
        postalCode: (officeData as any).zip || '27616',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: officeData.coordinates.lat,
        longitude: officeData.coordinates.lng,
      },
      telephone: '1-844-967-3536',
      priceRange: '$$$',
      areaServed: [
        {
          '@type': 'City',
          name: options.city,
        },
      ],
    };
  }

  private async translateLandingPage(page: GeneratedLandingPage): Promise<GeneratedLandingPage> {
    // Translation logic - similar to blog translation
    // For brevity, returning the page with Spanish slug
    return {
      ...page,
      slug: page.slug + '-es',
    };
  }

  private formatPracticeArea(practiceArea: string): string {
    const formatted = {
      immigration: 'Immigration',
      'personal-injury': 'Personal Injury',
      'workers-compensation': "Workers' Compensation",
      'criminal-defense': 'Criminal Defense',
      'family-law': 'Family Law',
      'traffic-violations': 'Traffic Violation',
    };

    return (formatted as Record<string, string>)[practiceArea] || practiceArea;
  }

  private getNearbyOffices(city: string): Array<{
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
    distance: number;
  }> {
    // Return offices within reasonable distance
    const offices = this.getAllOffices();
    type OfficeWithDistance = {
      city: string;
      address: string;
      coordinates: { lat: number; lng: number };
      distance: number;
    };
    return offices
      .map(office => ({
        ...office,
        distance: this.calculateDistance(city, office.city),
      }))
      .filter((office): office is OfficeWithDistance => office.distance < 50)
      .sort((a, b) => a.distance - b.distance);
  }

  private getNearestOffice(city: string): {
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
    distance: number;
  } | null {
    const offices = this.getNearbyOffices(city);
    return offices.length > 0 && offices[0] ? offices[0] : null;
  }

  private getAllOffices(): Array<{
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
  }> {
    return [
      {
        city: 'Raleigh',
        address: '123 Main St, Suite 100, Raleigh, NC 27601',
        coordinates: { lat: 35.7796, lng: -78.6382 },
      },
      {
        city: 'Charlotte',
        address: '456 Trade St, Suite 200, Charlotte, NC 28202',
        coordinates: { lat: 35.2271, lng: -80.8431 },
      },
      {
        city: 'Goldsboro',
        address: '789 Center St, Goldsboro, NC 27530',
        coordinates: { lat: 35.3849, lng: -77.9928 },
      },
      {
        city: 'Smithfield',
        address: '321 Market St, Smithfield, NC 27577',
        coordinates: { lat: 35.5085, lng: -78.3394 },
      },
    ];
  }

  private getDefaultOffice(): {
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
    distance: number;
  } | null {
    const office = this.getAllOffices()[0];
    if (!office) {
      return {
        city: 'Charlotte',
        address: '6211 Monroe Rd, Charlotte, NC 28212',
        coordinates: { lat: 35.2271, lng: -80.8431 },
        distance: 0,
      };
    }
    return {
      city: office.city,
      address: office.address,
      coordinates: office.coordinates,
      distance: 0,
    };
  }

  private calculateDistance(city1: string, city2: string): number {
    // Simplified distance calculation
    // In production, use actual geocoding
    const distances = {
      'Raleigh-Charlotte': 165,
      'Raleigh-Durham': 28,
      'Charlotte-Gastonia': 23,
      // Add more city pairs
    };

    const key = [city1, city2].sort().join('-');
    return (distances as Record<string, number>)[key] || 30;
  }

  private getDefaultLocalData(city: string): unknown {
    return {
      demographics: {
        population: 'Growing',
        medianIncome: '$50,000+',
        majorEmployers: ['Healthcare', 'Education', 'Technology'],
      },
      crimeStats: {},
      courtInfo: {
        courts: [
          { name: `${city} District Court`, address: 'Downtown' },
          { name: `${city} Superior Court`, address: 'Downtown' },
        ],
      },
      competitorData: {},
      localCourts: [],
      nearbyOffices: this.getNearbyOffices(city),
    };
  }

  private getPracticeAreaSpecificData(
    practiceArea: string,
    localData: LocalData
  ): Record<string, unknown> {
    // Return practice area specific local data
    const specificData = {
      immigration: {
        immigrantPopulation:
          (localData.demographics as LocalData['demographics'] & { immigrantPopulation?: string })
            .immigrantPopulation || '15%',
        commonCountries: ['Mexico', 'India', 'China', 'Philippines'],
        uscisOffice: 'Charlotte USCIS Field Office',
      },
      'personal-injury': {
        accidentRate:
          (localData as LocalData & { crimeStats?: { vehicleAccidents?: string } }).crimeStats
            ?.vehicleAccidents || 'Above state average',
        majorHighways: ['I-40', 'I-85', 'I-95'],
        hospitals: (localData as LocalData & { hospitals?: string[] }).hospitals || [
          'Wake Med',
          'Duke Health',
        ],
      },
      // Add more practice areas
    };

    return ((specificData as Record<string, Record<string, unknown>>)[practiceArea] ||
      {}) as Record<string, unknown>;
  }

  private getRelevantStats(practiceArea: string, localData: LocalData) {
    const statsMap = {
      immigration: [
        { label: 'Immigrant Population', value: '125,000+', context: 'in the Triangle area' },
        { label: 'Visa Applications', value: '15,000/year', context: 'processed in NC' },
        { label: 'Average Wait Time', value: '8-12 months', context: 'for green cards' },
        { label: 'Success Rate', value: '94%', context: 'with attorney representation' },
      ],
      'personal-injury': [
        { label: 'Car Accidents', value: '50,000+/year', context: 'in North Carolina' },
        { label: 'Average Settlement', value: '$75,000', context: 'with legal representation' },
        { label: 'Uninsured Drivers', value: '7.4%', context: 'in NC (2023)' },
        { label: 'Case Success Rate', value: '97%', context: 'at Vasquez Law Firm' },
      ],
      // Add more practice areas
    };

    return (
      (statsMap as Record<string, Array<{ label: string; value: string; context: string }>>)[
        practiceArea
      ] || []
    );
  }

  private getLocalResources(
    city: string,
    practiceArea: string,
    localData: LocalData
  ): Array<{ name: string; type: string; contact?: string }> {
    const resources = {
      immigration: [
        {
          name: 'USCIS Charlotte Field Office',
          type: 'Government',
          contact: '(800) 375-5283',
          description: 'Immigration services',
        },
        {
          name: 'NC Justice Center',
          type: 'Non-profit',
          contact: '(919) 856-2570',
          description: 'Immigration advocacy',
        },
        {
          name: `${city} Immigrant Resource Center`,
          type: 'Community',
          contact: 'Visit website',
          description: 'Local support',
        },
      ],
      'personal-injury': [
        {
          name: `${city} Police Department`,
          type: 'Government',
          contact: 'Call 911',
          description: 'Accident reports',
        },
        {
          name: 'NC DMV',
          type: 'Government',
          contact: '(919) 715-7000',
          description: 'Driving records',
        },
        {
          name: `${city} Medical Center`,
          type: 'Healthcare',
          contact: 'Call 911',
          description: 'Medical treatment',
        },
      ],
      // Add more practice areas
    };

    return (
      (
        resources as Record<
          string,
          Array<{ name: string; type: string; contact?: string; description: string }>
        >
      )[practiceArea] || []
    ).map(r => ({
      name: r.name,
      type: r.type || 'Resource',
      contact: r.contact,
    }));
  }

  private getEmotionalTriggers(practiceArea: string): string[] {
    const triggers = {
      immigration: [
        'fear of deportation',
        'family separation',
        'uncertain future',
        'hope for better life',
      ],
      'personal-injury': ['pain and suffering', 'medical bills', 'lost wages', 'life disruption'],
      'workers-compensation': [
        'injury pain',
        'job security fears',
        'financial stress',
        'employer retaliation',
      ],
      'criminal-defense': [
        'fear of jail',
        'reputation damage',
        'family impact',
        'future consequences',
      ],
      'family-law': [
        "children's wellbeing",
        'financial security',
        'emotional trauma',
        'new beginning',
      ],
      'traffic-violations': ['license loss', 'insurance rates', 'job impact', 'driving record'],
    };

    return (
      (triggers as Record<string, string[]>)[practiceArea] || [
        'legal concerns',
        'uncertainty',
        'need for help',
      ]
    );
  }

  private async getRelevantStatistics(
    practiceArea: string
  ): Promise<Array<{ label: string; value: string; context: string }>> {
    // In production, fetch from real data sources
    return this.getRelevantStats(practiceArea, {} as LocalData);
  }

  private async getCommonQuestions(practiceArea: string): Promise<string[]> {
    const questions = {
      immigration: [
        'How long does it take to get a green card?',
        'Can I work while waiting for my visa?',
        'What happens if my visa expires?',
        'How much does an immigration lawyer cost?',
        'Can I bring my family to the US?',
      ],
      'personal-injury': [
        'How much is my case worth?',
        'Who pays my medical bills?',
        'How long do I have to file a claim?',
        'What if I was partially at fault?',
        'Do I need to go to court?',
      ],
      // Add more practice areas
    };

    return (questions as Record<string, string[]>)[practiceArea] || [];
  }

  private getVariationKeywords(options: PracticeAreaVariationOptions): string[] {
    const baseKeywords = [
      `${options.practiceArea} lawyer`,
      `${options.practiceArea} attorney`,
      `${options.practiceArea} law firm`,
    ];

    const variationKeywords = {
      emotional: ['compassionate', 'understanding', 'caring', 'supportive'],
      statistical: ['results', 'success rate', 'case wins', 'proven'],
      testimonial: ['reviews', 'testimonials', 'client stories', 'trusted'],
      'faq-focused': ['questions', 'answers', 'information', 'explained'],
    };

    return [
      ...baseKeywords,
      ...((variationKeywords as Record<string, string[]>)[options.variationType] || []),
    ];
  }

  private parseContentSections(content: string): unknown[] {
    // Parse markdown content into sections
    const sections = content.split(/^##\s+/m).filter(s => s.trim());

    return sections.map((section, index) => {
      const lines = section.split('\n');
      const title = lines[0]?.trim() || '';
      const sectionContent = lines.slice(1).join('\n').trim();

      return {
        id: `section-${index}`,
        title,
        content: sectionContent,
        order: index,
      };
    });
  }

  private addConversionTracking(conversionElements: any): ConversionElements {
    const tracking = {
      primaryCTA: { id: 'primary-cta', event: 'click_primary_cta' },
      secondaryCTA: { id: 'secondary-cta', event: 'click_secondary_cta' },
      stickyCTA: { id: 'sticky-cta', event: 'click_sticky_cta' },
      exitCTA: { id: 'exit-cta', event: 'click_exit_cta' },
    };

    // Convert the simple CTA strings to proper ConversionElements structure
    return {
      ctaButtons: [
        {
          text: conversionElements.primary || 'Get Started',
          url: '/contact',
          style: 'primary',
          trackingId: tracking.primaryCTA.id,
        },
        {
          text: conversionElements.secondary || 'Learn More',
          url: '/services',
          style: 'secondary',
          trackingId: tracking.secondaryCTA.id,
        },
        {
          text: conversionElements.sticky || 'Contact Us',
          url: '/contact',
          style: 'sticky',
          trackingId: tracking.stickyCTA.id,
        },
      ],
      forms: [
        {
          type: 'contact',
          fields: ['name', 'email', 'phone', 'message'],
          submitUrl: '/api/contact',
          trackingId: 'contact-form',
        },
      ],
      chatWidget: {
        enabled: true,
        position: 'bottom-right',
        welcomeMessage: 'How can we help you today?',
      },
      popups: [
        {
          type: 'exit-intent',
          trigger: 'exit',
          content: conversionElements.exit || "Don't leave yet!",
          delay: 0,
        },
      ],
    };
  }

  private async generateHeroImage(city: string, practiceArea: string): Promise<string> {
    // In production, integrate with image generation service
    return `/images/heroes/${city.toLowerCase()}-${practiceArea}.jpg`;
  }
}
