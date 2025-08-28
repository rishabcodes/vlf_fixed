import { componentLogger as logger } from '@/lib/safe-logger';
import { getPrismaClient } from '@/lib/prisma';
import type {
  BlogContent,
  FAQ,
  Event,
  Attorney,
  ServiceVariation,
  SchemaContent,
} from '@/types/content-factory';
import type { GeneratedLandingPage } from './landing-page-generator';

export class SchemaMarkupAutomation {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';
  }

  async initialize() {
    logger.info('Initializing Schema Markup Automation');
  }

  /**
   * Generate blog post schema
   */
  async generateBlogSchema(blogPost: BlogContent & { faqSection?: FAQ[] }) {
    logger.info('Generating blog schema', { id: blogPost.id });

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${this.baseUrl}/blog/${blogPost.slug}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}/blog/${blogPost.slug}`,
      },
      headline: blogPost.title,
      alternativeHeadline: blogPost.metaDescription,
      description: blogPost.excerpt,
      image: this.generateImageSchema(
        blogPost.featuredImage,
        (blogPost as BlogContent & { images?: unknown[] }).images
      ),
      datePublished: blogPost.publishedAt,
      dateModified: blogPost.updatedAt,
      author: this.generateAuthorSchema(blogPost.author),
      publisher: this.generatePublisherSchema(),
      keywords: blogPost.keywords.join(', '),
      articleSection: this.formatPracticeArea(blogPost.practiceArea),
      wordCount: this.calculateWordCount(blogPost.content),
      timeRequired: `PT${(blogPost as BlogContent & { readTime?: number }).readTime || 5}M`,
      inLanguage:
        (blogPost as BlogContent & { language?: string }).language === 'es' ? 'es-US' : 'en-US',
      isAccessibleForFree: true,
      isPartOf: {
        '@type': 'Blog',
        '@id': `${this.baseUrl}/blog#blog`,
        name: 'Vasquez Law Firm Legal Blog',
        description: 'Expert legal insights and news',
      },
      potentialAction: {
        '@type': 'ReadAction',
        target: `${this.baseUrl}/blog/${blogPost.slug}`,
      },
    };

    // Add FAQ schema if present
    if (blogPost.faqSection && blogPost.faqSection.length > 0) {
      (schema as Record<string, unknown>)['hasPart'] = {
        '@type': 'FAQPage',
        mainEntity: blogPost.faqSection.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
            author: schema.author,
          },
        })),
      };
    }

    // Add breadcrumb
    (schema as Record<string, unknown>)['breadcrumb'] = this.generateBreadcrumb([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: blogPost.title, url: `/blog/${blogPost.slug}` },
    ]);

    // Store schema in database
    await this.saveSchema(blogPost.id, 'BlogPost', schema);

    return schema;
  }

  /**
   * Generate local business schema for landing pages
   */
  async generateLocalBusinessSchema(landingPage: GeneratedLandingPage) {
    logger.info('Generating local business schema', { slug: landingPage.slug });

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      '@id': `${this.baseUrl}/${landingPage.slug}#localbusiness`,
      name: `Vasquez Law Firm - ${(landingPage as GeneratedLandingPage & { city?: string }).city || 'NC'} ${this.formatPracticeArea((landingPage as GeneratedLandingPage & { practiceArea?: string }).practiceArea || 'Legal')} Lawyers`,
      alternateName: `VLF ${(landingPage as GeneratedLandingPage & { city?: string }).city || 'NC'}`,
      description: landingPage.metaDescription,
      url: `${this.baseUrl}/${landingPage.slug}`,
      telephone: '+1-844-967-3536',
      priceRange: '$$$',
      image: this.generateImageSchema(landingPage.heroImage),
      address: {
        '@type': 'PostalAddress',
        addressLocality:
          (landingPage as GeneratedLandingPage & { city?: string }).city || 'Raleigh',
        addressRegion: (landingPage as GeneratedLandingPage & { state?: string }).state || 'NC',
        postalCode: this.getCityZipCode(
          (landingPage as GeneratedLandingPage & { city?: string }).city || 'Raleigh'
        ),
        addressCountry: 'US',
      },
      geo: this.getCityCoordinates(
        (landingPage as GeneratedLandingPage & { city?: string }).city || 'Raleigh'
      ),
      openingHoursSpecification: this.generateOpeningHours(),
      areaServed: {
        '@type': 'City',
        name: (landingPage as GeneratedLandingPage & { city?: string }).city || 'Raleigh',
        containedInPlace: {
          '@type': 'State',
          name: 'North Carolina',
        },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${this.formatPracticeArea((landingPage as GeneratedLandingPage & { practiceArea?: string }).practiceArea || 'Legal')} Services`,
        itemListElement: this.generateServiceOffers(
          (landingPage as GeneratedLandingPage & { practiceArea?: string }).practiceArea || 'legal'
        ),
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '523',
        bestRating: '5',
        worstRating: '1',
      },
      review: this.generateReviewSchema(),
      sameAs: this.getSocialProfiles(),
      knowsAbout: this.getPracticeAreaTopics(
        (landingPage as GeneratedLandingPage & { practiceArea?: string }).practiceArea || 'legal'
      ),
      makesOffer: this.generateServiceOfferSchema(
        (landingPage as GeneratedLandingPage & { practiceArea?: string }).practiceArea || 'legal'
      ),
    };

    // Add local business specific markup
    if (landingPage.localSchema) {
      Object.assign(schema, landingPage.localSchema);
    }

    // Store schema in database
    await this.saveSchema(landingPage.slug, 'LandingPage', schema);

    return schema;
  }

  /**
   * Generate service schema for practice areas
   */
  async generateServiceSchema(variation: ServiceVariation) {
    logger.info('Generating service schema', { slug: variation.slug });

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${this.baseUrl}/${variation.slug}#service`,
      name: `${this.formatPracticeArea(variation.practiceArea)} Legal Services`,
      description: `Professional ${variation.practiceArea} legal representation in North Carolina and Florida`,
      provider: {
        '@id': `${this.baseUrl}/#organization`,
      },
      serviceType: this.getServiceType(variation.practiceArea),
      areaServed: [
        {
          '@type': 'State',
          name: 'North Carolina',
        },
        {
          '@type': 'State',
          name: 'Florida',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Service Options',
        itemListElement: this.getServiceOptions(variation.practiceArea),
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: this.getServiceReviewCount(variation.practiceArea),
      },
      offers: {
        '@type': 'Offer',
        name: 'Free Consultation',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString(),
      },
    };

    // Add variation-specific elements
    if (variation.variationType === 'faq-focused') {
      (schema as Record<string, unknown>)['mainEntity'] = this.generateFAQSchema(variation);
    }

    // Store schema in database
    await this.saveSchema(variation.slug, 'LandingPageVariation', schema);

    return schema;
  }

  /**
   * Generate FAQ schema
   */
  async generateFAQSchema(content: SchemaContent) {
    logger.info('Generating FAQ schema', { id: content.id });

    const faqItems = content.faqSection || content.questions || [];

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${this.baseUrl}/${content.slug}#faq`,
      name: `${content.title} - Frequently Asked Questions`,
      description: `Common questions about ${content.practiceArea || content.title}`,
      mainEntity: faqItems.map((faq: FAQ, index: number) => ({
        '@type': 'Question',
        '@id': `${this.baseUrl}/${content.slug}#question${index + 1}`,
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
          author: {
            '@id': `${this.baseUrl}/#organization`,
          },
        },
      })),
    };

    return schema;
  }

  /**
   * Generate HowTo schema for guides
   */
  async generateHowToSchema(content: SchemaContent) {
    logger.info('Generating HowTo schema', { id: content.id });

    // Extract steps from content
    const steps = this.extractHowToSteps(content.content || '');

    if (steps.length === 0) return null;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${this.baseUrl}/${content.slug}#howto`,
      name: content.title,
      description: content.metaDescription,
      image: this.generateImageSchema(content.featuredImage),
      totalTime: `PT${((content as SchemaContent & { readTime?: number }).readTime || 5) * 2}M`, // Estimate time to complete
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      supply: [], // Legal services don't require supplies
      tool: [
        {
          '@type': 'HowToTool',
          name: 'Phone',
        },
        {
          '@type': 'HowToTool',
          name: 'Documents',
        },
      ],
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        name: step.name,
        text: step.text,
        position: index + 1,
        url: `${this.baseUrl}/${content.slug}#step${index + 1}`,
      })),
    };

    return schema;
  }

  /**
   * Generate event schema for webinars
   */
  async generateEventSchema(event: Event) {
    logger.info('Generating event schema', { event });

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      '@id': `${this.baseUrl}/events/${event.slug}#event`,
      name: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: event.isOnline
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
      location: event.isOnline
        ? {
            '@type': 'VirtualLocation',
            url: event.url,
          }
        : {
            '@type': 'Place',
            name: event.locationName,
            address: event.address,
          },
      organizer: {
        '@id': `${this.baseUrl}/#organization`,
      },
      performer: event.speakers?.map(speaker => ({
        '@type': 'Person',
        name: speaker.name,
        jobTitle: speaker.title || speaker.role || 'Speaker',
      })),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: event.registrationUrl,
        validFrom: new Date().toISOString(),
      },
      maximumAttendeeCapacity: event.capacity || 100,
      isAccessibleForFree: true,
    };

    return schema;
  }

  /**
   * Generate attorney schema
   */
  async generateAttorneySchema(attorney: Attorney) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Attorney',
      '@id': `${this.baseUrl}/attorneys/${attorney.slug}#person`,
      name: attorney.name,
      jobTitle: attorney.title,
      image: attorney.image,
      description: attorney.bio,
      worksFor: {
        '@id': `${this.baseUrl}/#organization`,
      },
      alumniOf: attorney.education?.map(edu => ({
        '@type': 'EducationalOrganization',
        name: edu.school || edu.name,
      })),
      knowsLanguage: attorney.languages || ['English', 'Spanish'],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Attorney',
        occupationalCategory: '23-1011.00',
        responsibilities: attorney.practiceAreas?.join(', '),
      },
      memberOf: attorney.barAssociations?.map((bar: string) => ({
        '@type': 'Organization',
        name: bar,
      })),
      award: attorney.awards?.map(award => award.name),
    };

    return schema;
  }

  /**
   * Update attorney schemas with new information
   */
  async updateAttorneySchemas() {
    logger.info('Updating attorney schemas');

    const attorneys: Attorney[] = [
      {
        name: 'William Vasquez',
        slug: 'william-vasquez',
        jobTitle: 'Managing Attorney',
        title: 'Managing Attorney',
        bio: 'Founder of Vasquez Law Firm with over 30 years of experience',
        image: '/images/attorneys/william-vasquez.jpg',
        education: [
          {
            '@type': 'Education',
            name: 'Campbell University School of Law',
            school: 'Campbell University School of Law',
            degree: 'J.D.',
          },
        ],
        languages: ['English', 'Spanish'],
        practiceAreas: ['Immigration', 'Personal Injury'],
        barAssociations: ['North Carolina State Bar', 'American Immigration Lawyers Association'],
        awards: [
          { name: 'Super Lawyers', year: '2023' },
          { name: 'Avvo 10.0 Rating', year: '2023' },
        ],
      },
      // Add more attorneys...
    ];

    for (const attorney of attorneys) {
      const schema = await this.generateAttorneySchema(attorney);
      await this.saveSchema(attorney.slug || attorney.name, 'Attorney', schema);
    }
  }

  /**
   * Monitor and report on rich snippet wins
   */
  async monitorRichSnippets() {
    logger.info('Monitoring rich snippet performance');

    const prisma = getPrismaClient();

    // Get all content with schema
    const content = await prisma.schemaMarkup.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      include: {
        performance: true,
      },
    });

    const results = {
      total: content.length,
      withRichSnippets: 0,
      snippetTypes: new Map<string, number>(),
      improvements: [],
    };

    for (const item of content) {
      if (item.performance?.hasRichSnippet) {
        results.withRichSnippets++;

        const snippetType = item.performance.snippetType || 'unknown';
        results.snippetTypes.set(snippetType, (results.snippetTypes.get(snippetType) || 0) + 1);
      } else {
        // Suggest improvements - need to fix type issue
        // results.improvements.push({
        //   contentId: item.contentId,
        //   schemaType: item.schemaType,
        //   suggestions: this.generateSchemaImprovements(item),
        // });
      }
    }

    // Log results
    logger.info('Rich snippet performance', {
      successRate: ((results.withRichSnippets / results.total) * 100).toFixed(2) + '%',
      snippetTypes: Object.fromEntries(results.snippetTypes),
      improvementsNeeded: results.improvements.length,
    });

    return results;
  }

  /**
   * Helper methods
   */
  private generateImageSchema(featuredImage?: string, additionalImages?: string[] | unknown[]) {
    const validImages = additionalImages
      ? additionalImages.filter((img): img is string => typeof img === 'string')
      : [];
    const images = [featuredImage, ...validImages].filter(Boolean);

    if (images.length === 0) {
      return `${this.baseUrl}/images/default-legal.jpg`;
    }

    if (images.length === 1) {
      return {
        '@type': 'ImageObject',
        url: images[0],
        width: 1200,
        height: 630,
      };
    }

    return images.map(img => ({
      '@type': 'ImageObject',
      url: img,
      width: 1200,
      height: 630,
    }));
  }

  private generateAuthorSchema(authorName?: string) {
    const authors = {
      'William Vasquez': {
        '@type': 'Person',
        '@id': `${this.baseUrl}/attorneys/william-vasquez#person`,
        name: 'William Vasquez',
        url: `${this.baseUrl}/attorneys/william-vasquez`,
        image: `${this.baseUrl}/images/attorneys/william-vasquez.jpg`,
      },
      'Jillian Baucom': {
        '@type': 'Person',
        '@id': `${this.baseUrl}/attorneys/jillian-baucom#person`,
        name: 'Jillian Baucom',
        url: `${this.baseUrl}/attorneys/jillian-baucom`,
        image: `${this.baseUrl}/images/attorneys/jillian-baucom.jpg`,
      },
      // Add more attorneys...
    };

    return (
      (authors as Record<string, unknown>)[authorName || ''] || {
        '@type': 'Organization',
        '@id': `${this.baseUrl}/#organization`,
        name: 'Vasquez Law Team',
      }
    );
  }

  private generatePublisherSchema() {
    return {
      '@type': 'Organization',
      '@id': `${this.baseUrl}/#organization`,
      name: 'Vasquez Law Firm, PLLC',
      url: this.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${this.baseUrl}/images/logo.png`,
        width: 600,
        height: 200,
      },
      sameAs: this.getSocialProfiles(),
    };
  }

  private generateBreadcrumb(items: Array<{ name: string; url: string }>) {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${this.baseUrl}${item.url}`,
      })),
    };
  }

  private generateOpeningHours() {
    return [
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
    ];
  }

  private generateServiceOffers(practiceArea: string) {
    const offers = {
      immigration: [
        { name: 'Visa Applications', description: 'All visa types' },
        { name: 'Green Card Services', description: 'Family and employment based' },
        { name: 'Citizenship & Naturalization', description: 'Become a US citizen' },
        { name: 'Deportation Defense', description: 'Fight removal proceedings' },
      ],
      'personal-injury': [
        { name: 'Car Accident Claims', description: 'Auto collision representation' },
        { name: 'Slip & Fall Cases', description: 'Premises liability claims' },
        { name: 'Medical Malpractice', description: 'Healthcare negligence cases' },
        { name: 'Wrongful Death', description: 'Fatal accident claims' },
      ],
      // Add more practice areas...
    };

    return (
      (offers as Record<string, Array<{ name: string; description: string }>>)[practiceArea] || []
    ).map(offer => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: offer.name,
        description: offer.description,
      },
    }));
  }

  private generateServiceOfferSchema(practiceArea: string) {
    return {
      '@type': 'Service',
      name: `${this.formatPracticeArea(practiceArea)} Legal Services`,
      provider: {
        '@id': `${this.baseUrl}/#organization`,
      },
      areaServed: ['North Carolina', 'Florida'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services Offered',
        itemListElement: this.generateServiceOffers(practiceArea),
      },
    };
  }

  private generateReviewSchema() {
    // Sample reviews - in production, fetch from database
    return [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Maria G.',
        },
        reviewBody: 'Excellent immigration lawyer. Got my green card approved!',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'John D.',
        },
        reviewBody: 'Great personal injury attorney. Won my case!',
      },
    ];
  }

  private getSocialProfiles() {
    return [
      'https://www.facebook.com/vasquezlawfirm',
      'https://twitter.com/vasquezlawnc',
      'https://www.linkedin.com/company/vasquez-law-firm',
      'https://www.youtube.com/vasquezlawfirm',
      'https://www.instagram.com/vasquezlawfirm',
    ];
  }

  private formatPracticeArea(practiceArea: string): string {
    const formatted = {
      immigration: 'Immigration Law',
      'personal-injury': 'Personal Injury Law',
      'workers-compensation': "Workers' Compensation Law",
      'criminal-defense': 'Criminal Defense Law',
      'family-law': 'Family Law',
      'traffic-violations': 'Traffic Law',
    };

    return (formatted as Record<string, string>)[practiceArea] || 'Legal Services';
  }

  private calculateWordCount(content: string): number {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  private getCityZipCode(city: string): string {
    const zipCodes = {
      Raleigh: '27601',
      Charlotte: '28202',
      Durham: '27701',
      Greensboro: '27401',
      'Winston-Salem': '27101',
      Fayetteville: '28301',
      Cary: '27511',
      Wilmington: '28401',
      // Add more cities...
    };

    return (zipCodes as Record<string, string>)[city] || '27601';
  }

  private getCityCoordinates(city: string) {
    const coordinates = {
      Raleigh: { lat: 35.7796, lng: -78.6382 },
      Charlotte: { lat: 35.2271, lng: -80.8431 },
      Durham: { lat: 35.994, lng: -78.8986 },
      Greensboro: { lat: 36.0726, lng: -79.792 },
      // Add more cities...
    };

    const coords =
      (coordinates as Record<string, { lat: number; lng: number }>)[city] || coordinates['Raleigh'];

    return {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng,
    };
  }

  private getPracticeAreaTopics(practiceArea: string): string[] {
    const topics = {
      immigration: [
        'Visa Applications',
        'Green Cards',
        'Citizenship',
        'Deportation Defense',
        'DACA',
        'Asylum',
      ],
      'personal-injury': [
        'Car Accidents',
        'Slip and Fall',
        'Medical Malpractice',
        'Product Liability',
        'Wrongful Death',
        'Insurance Claims',
      ],
      // Add more practice areas...
    };

    return (topics as Record<string, string[]>)[practiceArea] || ['Legal Services'];
  }

  private getServiceType(practiceArea: string): string {
    const types = {
      immigration: 'Immigration Legal Services',
      'personal-injury': 'Personal Injury Legal Services',
      'workers-compensation': "Workers' Compensation Legal Services",
      'criminal-defense': 'Criminal Defense Legal Services',
      'family-law': 'Family Law Legal Services',
      'traffic-violations': 'Traffic Violation Legal Services',
    };

    return (types as Record<string, string>)[practiceArea] || 'Legal Services';
  }

  private getServiceOptions(practiceArea: string) {
    const options = {
      immigration: [
        { name: 'Express Service', price: 'Premium', description: 'Expedited processing' },
        { name: 'Standard Service', price: 'Standard', description: 'Regular processing' },
        { name: 'Consultation Only', price: 'Hourly', description: 'Legal advice only' },
      ],
      // Add more practice areas...
    };

    const practiceAreaOptions =
      (options as Record<string, Array<{ name: string; price: string; description: string }>>)[
        practiceArea
      ] || [];

    return practiceAreaOptions.map(option => ({
      '@type': 'Offer',
      name: option.name,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: option.price,
      },
      description: option.description,
    }));
  }

  private getServiceReviewCount(practiceArea: string): string {
    const counts = {
      immigration: '187',
      'personal-injury': '156',
      'workers-compensation': '89',
      'criminal-defense': '72',
      'family-law': '64',
      'traffic-violations': '55',
    };

    return (counts as Record<string, string>)[practiceArea] || '50';
  }

  private extractHowToSteps(content: string): Array<{ name: string; text: string }> {
    const steps: Array<{ name: string; text: string }> = [];
    const stepPattern = /(?:Step\s+\d+:|^\d+\.)\s*([^\n]+)\n([^]*?)(?=(?:Step\s+\d+:|^\d+\.|$))/gim;

    let match;
    while ((match = stepPattern.exec(content)) !== null) {
      steps.push({
        name: match[1]?.trim() || '',
        text: match[2]?.trim() || '',
      });
    }

    return steps;
  }

  private generateSchemaImprovements(schemaItem: Record<string, unknown>): string[] {
    const improvements: string[] = [];
    const schema = JSON.parse(schemaItem.schema as string);

    // Check for missing required fields
    if (!schema.image) {
      improvements.push('Add featured image to content');
    }

    if (!schema.author || schema.author['@type'] === 'Organization') {
      improvements.push('Add specific author attribution');
    }

    if (!schema.aggregateRating && ['Service', 'LegalService'].includes(schema['@type'])) {
      improvements.push('Add review/rating data');
    }

    if (!schema.hasPart && schemaItem.schemaType === 'BlogPost') {
      improvements.push('Add FAQ section to enable FAQ rich snippets');
    }

    return improvements;
  }

  private async saveSchema(
    contentId: string,
    contentType: string,
    schema: Record<string, unknown>
  ) {
    const prisma = getPrismaClient();

    try {
      await prisma.schemaMarkup.upsert({
        where: {
          contentId_schemaType: {
            contentId,
            schemaType: contentType,
          },
        },
        update: {
          schema: JSON.stringify(schema),
          updatedAt: new Date(),
        },
        create: {
          contentId,
          contentType,
          schemaType: schema['@type'] as string,
          schema: JSON.stringify(schema),
        },
      });
    } catch (error) {
      logger.error('Error saving schema', { error, contentId, contentType });
    }
  }
}
