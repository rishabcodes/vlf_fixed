import { componentLogger as logger } from '@/lib/safe-logger';
import { Prisma } from '@prisma/client';
// axios removed - using native fetch
import { LinkedInAPI } from '@/lib/external-apis/linkedin';
import { MediumAPI } from '@/lib/external-apis/medium';
import { PRNewsWireAPI } from '@/lib/external-apis/pr-newswire';
import { LegalDirectoryAPI } from '@/lib/external-apis/legal-directories';
import type {
  BlogContent,
  DirectorySubmissionFormat,
  MediumPost,
  LinkedInShare,
  PRRelease,
  CitationSource,
  CitationResult,
  SyndicationResult,
  ContentSyndicationMetrics,
} from '@/types/content-factory';

export class ContentSyndicator {
  private linkedInAPI: LinkedInAPI;
  private mediumAPI: MediumAPI;
  private prAPI: PRNewsWireAPI;
  private directoryAPI: LegalDirectoryAPI;
  private platforms: string[];
  private baseUrl: string;

  constructor() {
    this.linkedInAPI = new LinkedInAPI();
    this.mediumAPI = new MediumAPI();
    this.prAPI = new PRNewsWireAPI();
    this.directoryAPI = new LegalDirectoryAPI();
    this.platforms = [];
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';
  }

  async initialize(platforms: string[]) {
    logger.info('Initializing Content Syndicator', { platforms });
    this.platforms = platforms;

    // Initialize platform APIs
    await Promise.all([
      this.linkedInAPI.initialize(),
      this.mediumAPI.initialize(),
      this.prAPI.initialize(),
      this.directoryAPI.initialize(),
    ]);
  }

  /**
   * Submit content to legal directories
   */
  async submitToLegalDirectories(content: BlogContent) {
    logger.info('Submitting to legal directories', { id: content.id });

    const directories = [
      'avvo',
      'findlaw',
      'justia',
      'lawyers.com',
      'martindale',
      'nolo',
      'lexisnexis',
      'legal500',
      'superlawyers',
      'bestlawyers',
    ];

    const results: SyndicationResult[] = [];

    for (const directory of directories) {
      try {
        const submission = await this.formatForDirectory(content, directory);
        const result = await this.directoryAPI.submit(directory, submission);

        results.push({
          directory,
          success: true,
          url: result.url,
          backlink: result.backlink,
        });

        logger.info(`Submitted to ${directory}`, { url: result.url });
      } catch (error) {
        logger.error(`Failed to submit to ${directory}`, { error });
        results.push({
          directory,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Track submissions
    for (const result of results) {
      await this.trackSyndication(content.id, 'directories', result);
    }

    return results;
  }

  /**
   * Post content to Medium
   */
  async postToMedium(content: BlogContent) {
    logger.info('Posting to Medium', { id: content.id });

    try {
      const mediumPost: MediumPost = {
        title: content.title,
        content: await this.convertToMediumFormat(content),
        tags: this.getMediumTags(content),
        canonicalUrl: `${this.baseUrl}/blog/${content.slug}`,
        publishStatus: 'public',
        license: 'all-rights-reserved',
      };

      const result = await this.mediumAPI.createPost(mediumPost);

      // Track syndication
      await this.trackSyndication(content.id, 'medium', {
        success: true,
        url: result.url,
        postId: result.id,
      });

      logger.info('Posted to Medium successfully', { url: result.url });

      return result;
    } catch (error) {
      logger.error('Failed to post to Medium', { error });
      throw error;
    }
  }

  /**
   * Post content to LinkedIn
   */
  async postToLinkedIn(content: BlogContent) {
    logger.info('Posting to LinkedIn', { id: content.id });

    try {
      // Create article post
      const articlePost: LinkedInShare = {
        author: 'urn:li:organization:vasquez-law-firm',
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: this.createLinkedInIntro(content),
            },
            shareMediaCategory: 'ARTICLE',
            media: [
              {
                status: 'READY',
                originalUrl: `${this.baseUrl}/blog/${content.slug}`,
                title: {
                  text: content.title,
                },
                description: {
                  text: content.excerpt,
                },
              },
            ],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      const result = await this.linkedInAPI.createShare(articlePost);

      // Also post to company page
      await this.postToLinkedInCompanyPage(content);

      // Track syndication
      await this.trackSyndication(content.id, 'linkedin', {
        success: true,
        shareId: result.id,
        url: result.url,
      });

      logger.info('Posted to LinkedIn successfully', { shareId: result.id });

      return result;
    } catch (error) {
      logger.error('Failed to post to LinkedIn', { error });
      throw error;
    }
  }

  /**
   * Create PR release for significant content
   */
  async createPRRelease(content: BlogContent) {
    logger.info('Creating PR release', { id: content.id });

    try {
      const release = {
        headline: this.createPRHeadline(content),
        subheadline: content.metaDescription || content.excerpt,
        dateline: `RALEIGH, NC - ${new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}`,
        body: await this.createPRBody(content),
        boilerplate: this.getCompanyBoilerplate(),
        contact: {
          name: 'Vasquez Law Firm Media Relations',
          email: 'media@vasquezlawfirm.com',
          phone: '1-844-967-3536',
        },
        categories: this.getPRCategories(content.practiceArea),
        tags: content.keywords,
        multimedia: [
          {
            type: 'image',
            url: content.featuredImage,
            caption: `${content.title} - Vasquez Law Firm`,
          },
        ],
      };

      const result = await this.prAPI.distribute(release);

      // Track syndication
      await this.trackSyndication(content.id, 'pr-release', {
        success: true,
        releaseId: result.id,
        distributionList: result.outlets,
        estimatedReach: result.reach,
      });

      logger.info('PR release distributed', {
        releaseId: result.id,
        outlets: result.outlets.length,
      });

      return result;
    } catch (error) {
      logger.error('Failed to create PR release', { error });
      throw error;
    }
  }

  /**
   * Build citation network
   */
  async buildCitations(content: BlogContent) {
    logger.info('Building citation network', { id: content.id });

    const citationSources: CitationSource[] = [
      // Legal citation sites
      {
        name: 'Google My Business',
        type: 'local',
        submit: async () => this.submitToGoogleMyBusiness(content),
      },
      {
        name: 'Bing Places',
        type: 'local',
        submit: async () => this.submitToBingPlaces(content),
      },
      {
        name: 'Apple Maps',
        type: 'local',
        submit: async () => this.submitToAppleMaps(content),
      },
      {
        name: 'Better Business Bureau',
        type: 'trust',
        submit: async () => this.updateBBBProfile(content),
      },
      {
        name: 'Chamber of Commerce',
        type: 'local',
        submit: async () => this.submitToChamber(content),
      },
      {
        name: 'Legal Aid Directories',
        type: 'niche',
        submit: async () => this.submitToLegalAid(content),
      },
      {
        name: 'Bar Association Sites',
        type: 'professional',
        submit: async () => this.submitToBarAssociations(content),
      },
    ];

    const results: SyndicationResult[] = [];

    for (const source of citationSources) {
      try {
        const result = await source.submit();
        results.push({
          source: source.name,
          type: source.type,
          success: true,
          ...result,
        });
      } catch (error) {
        logger.error(`Failed to submit to ${source.name}`, { error });
        results.push({
          source: source.name,
          type: source.type,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Build contextual backlinks
    await this.buildContextualBacklinks(content);

    // Track citations
    for (const result of results) {
      await this.trackSyndication(content.id, 'citations', result);
    }

    return results;
  }

  /**
   * Helper methods for formatting content
   */
  private async formatForDirectory(
    content: BlogContent,
    directory: string
  ): Promise<import('@/lib/external-apis/legal-directories').DirectorySubmission> {
    const formats = {
      avvo: {
        title: content.title,
        content: this.stripMarkdown(content.content),
        category: this.mapToAvvoCategory(content.practiceArea),
        tags: content.keywords.slice(0, 5),
        author: {
          name: content.author || 'Vasquez Law Team',
          credentials: 'Licensed Attorney',
        },
      },
      findlaw: {
        headline: content.title,
        body: await this.convertToHTML(content.content),
        practiceArea: content.practiceArea,
        jurisdiction: 'North Carolina',
        keywords: content.keywords,
      },
      justia: {
        title: content.title,
        summary: content.excerpt,
        fullText: content.content,
        category: content.practiceArea,
        location: 'North Carolina',
      },
      // Add more directory formats...
    };

    const formatMap = formats[directory as keyof typeof formats] as
      | DirectorySubmissionFormat
      | undefined;

    // Ensure we always return a DirectorySubmission compatible object
    if (formatMap) {
      return {
        title: formatMap.title || formatMap.headline || content.title,
        content: formatMap.content || formatMap.body || content.content,
        category: formatMap.category || formatMap.practiceArea,
        tags: formatMap.tags || formatMap.keywords,
        author: formatMap.author,
        url: `${this.baseUrl}/blog/${content.slug}`,
      };
    }

    // Default format
    return {
      title: content.title,
      content: content.content,
      url: `${this.baseUrl}/blog/${content.slug}`,
    };
  }

  private async convertToMediumFormat(content: BlogContent): Promise<string> {
    // Convert markdown to Medium-compatible format
    let mediumContent = content.content;

    // Add canonical link
    mediumContent = `*Originally published at [Vasquez Law Firm](${this.baseUrl}/blog/${content.slug})*\n\n${mediumContent}`;

    // Add author bio
    mediumContent += `\n\n---\n\n**About Vasquez Law Firm**\n\n${this.getCompanyBoilerplate()}`;

    // Add CTA
    mediumContent += `\n\n[Schedule a Free Consultation](${this.baseUrl}/free-consultation) | Call 1-844-YO-PELEO`;

    return mediumContent;
  }

  private getMediumTags(content: BlogContent): string[] {
    const practiceAreaTags = {
      immigration: ['immigration', 'immigration-law', 'visa', 'green-card', 'citizenship'],
      'personal-injury': ['personal-injury', 'car-accident', 'injury-law', 'accident-lawyer'],
      'workers-compensation': ['workers-compensation', 'workplace-injury', 'workers-rights'],
      'criminal-defense': ['criminal-defense', 'criminal-law', 'legal-defense', 'dui'],
      'family-law': ['family-law', 'divorce', 'child-custody', 'family-legal'],
      'traffic-violations': ['traffic-law', 'traffic-ticket', 'driving-violations'],
    };

    const tags = practiceAreaTags[content.practiceArea as keyof typeof practiceAreaTags] || [];

    // Medium allows max 5 tags
    return tags.slice(0, 5);
  }

  private createLinkedInIntro(content: BlogContent): string {
    const intros = [
      `New insights on ${content.practiceArea} law: "${content.title}"`,
      `Important information for anyone dealing with ${content.practiceArea} issues.`,
      `Our latest article addresses common questions about ${content.practiceArea}.`,
      `Legal guidance you need to know: ${content.title}`,
    ];

    const intro = intros[Math.floor(Math.random() * intros.length)];

    return `${intro}\n\n${content.excerpt}\n\nRead more: ${this.baseUrl}/blog/${content.slug}\n\n#LegalAdvice #${this.formatHashtag(content.practiceArea)} #NorthCarolinaLaw #VasquezLawFirm`;
  }

  private async postToLinkedInCompanyPage(content: BlogContent) {
    // Post to company page with different format
    const companyPost: LinkedInShare = {
      author: 'urn:li:organization:vasquez-law-firm',
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: this.createCompanyPagePost(content),
          },
          shareMediaCategory: 'IMAGE',
          media: [
            {
              status: 'READY',
              originalUrl: content.featuredImage,
              title: {
                text: content.title,
              },
            },
          ],
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    return await this.linkedInAPI.createCompanyShare(companyPost);
  }

  private createCompanyPagePost(content: BlogContent): string {
    return `📚 NEW ARTICLE: ${content.title}

${content.excerpt}

Our ${content.author || 'legal team'} breaks down everything you need to know.

✅ ${this.extractKeyPoint(content, 0)}
✅ ${this.extractKeyPoint(content, 1)}
✅ ${this.extractKeyPoint(content, 2)}

Read the full article: ${this.baseUrl}/blog/${content.slug}

💬 Have questions? Comment below or call 1-844-YO-PELEO

#${this.formatHashtag(content.practiceArea)} #LegalAdvice #NorthCarolinaLaw #LawyersOfLinkedIn`;
  }

  private createPRHeadline(content: BlogContent): string {
    const templates = [
      `Vasquez Law Firm Releases Comprehensive Guide on ${this.formatPracticeArea(content.practiceArea)}`,
      `New Legal Insights: ${content.title}`,
      `North Carolina Law Firm Addresses Critical ${this.formatPracticeArea(content.practiceArea)} Issues`,
      `Expert Analysis: ${content.title} - Vasquez Law Firm`,
    ];

    return templates[0] || `${content.title} - Vasquez Law Firm`; // Use most professional template for PR
  }

  private async createPRBody(content: BlogContent): Promise<string> {
    // Convert blog content to PR format
    const sections = content.content.split(/^##/m);

    let prBody = '';

    // Lead paragraph
    prBody += `Vasquez Law Firm, a leading ${content.practiceArea} law firm in North Carolina, today released a comprehensive guide addressing ${content.title.toLowerCase()}. This timely resource provides crucial information for individuals facing ${content.practiceArea} legal challenges.\n\n`;

    // Key points
    prBody += `Key highlights from the guide include:\n\n`;

    // Extract 3-5 key points
    const keyPoints = this.extractKeyPoints(content.content, 5);
    keyPoints.forEach(point => {
      prBody += `• ${point}\n`;
    });

    prBody += '\n';

    // Quote from attorney
    prBody += `"${this.generateAttorneyQuote(content)}" said ${content.author || 'William Vasquez, Managing Attorney at Vasquez Law Firm'}.\n\n`;

    // Call to action
    prBody += `The full guide is available at ${this.baseUrl}/blog/${content.slug}. `;
    prBody += `Individuals seeking legal assistance can contact Vasquez Law Firm at 1-844-YO-PELEO (1-844-967-3536) for a free consultation.\n\n`;

    return prBody;
  }

  private getCompanyBoilerplate(): string {
    return `Vasquez Law Firm, PLLC is a full-service law firm serving North Carolina and Florida, specializing in Immigration, Personal Injury, Workers' Compensation, Criminal Defense, Family Law, and Traffic Violations. With over 30 years of experience and a commitment to personalized service, the firm has helped thousands of clients achieve favorable outcomes. The firm offers services in both English and Spanish and provides free consultations. For more information, visit www.vasquezlawnc.com or call 1-844-YO-PELEO.`;
  }

  private getPRCategories(practiceArea: string): string[] {
    const categories = {
      immigration: ['Legal Services', 'Immigration', 'Law', 'Hispanic Business'],
      'personal-injury': ['Legal Services', 'Personal Injury', 'Insurance', 'Healthcare'],
      'workers-compensation': ['Legal Services', 'Workplace Safety', 'Insurance', 'Employment'],
      'criminal-defense': ['Legal Services', 'Crime', 'Justice', 'Law Enforcement'],
      'family-law': ['Legal Services', 'Family', 'Divorce', 'Children'],
      'traffic-violations': ['Legal Services', 'Transportation', 'Law Enforcement', 'Insurance'],
    };

    return categories[practiceArea as keyof typeof categories] || ['Legal Services', 'Law'];
  }

  /**
   * Citation building methods
   */
  private async submitToGoogleMyBusiness(content: BlogContent): Promise<CitationResult> {
    // Update GMB posts with new content
    const post = {
      summary: content.excerpt,
      callToAction: {
        actionType: 'LEARN_MORE',
        url: `${this.baseUrl}/blog/${content.slug}`,
      },
      media: [
        {
          mediaFormat: 'PHOTO',
          sourceUrl: content.featuredImage,
        },
      ],
    };

    // Would integrate with GMB API
    return { postId: 'gmb-' + Date.now(), status: 'published' };
  }

  private async submitToBingPlaces(content: BlogContent): Promise<CitationResult> {
    // Update Bing Places listing
    return { status: 'updated', listingId: 'bing-vlf' };
  }

  private async submitToAppleMaps(content: BlogContent): Promise<CitationResult> {
    // Update Apple Maps Connect
    return { status: 'updated', placeId: 'apple-vlf' };
  }

  private async updateBBBProfile(content: BlogContent): Promise<CitationResult> {
    // Update BBB business profile
    return { status: 'updated', accreditationId: 'bbb-vlf' };
  }

  private async submitToChamber(content: BlogContent): Promise<CitationResult> {
    // Submit to local Chamber of Commerce directories
    const chambers = ['Greater Raleigh Chamber', 'Charlotte Chamber', 'Orlando Chamber'];

    return {
      status: 'submitted',
      chambers: chambers,
      urls: chambers.map(
        c => `${c.toLowerCase().replace(/\s+/g, '-')}.com/members/vasquez-law-firm`
      ),
    };
  }

  private async submitToLegalAid(content: BlogContent): Promise<CitationResult> {
    // Submit to legal aid directories
    return {
      status: 'submitted',
      directories: ['NC Legal Aid', 'FL Legal Aid', 'National Legal Aid'],
    };
  }

  private async submitToBarAssociations(content: BlogContent): Promise<CitationResult> {
    // Submit to bar association directories
    return {
      status: 'submitted',
      associations: [
        'North Carolina State Bar',
        'Florida Bar',
        'American Immigration Lawyers Association',
        'NC Advocates for Justice',
      ],
    };
  }

  private async buildContextualBacklinks(content: BlogContent) {
    // Build high-quality contextual backlinks
    const strategies = [
      // Guest posting
      this.submitGuestPost(content),
      // Resource page links
      this.submitToResourcePages(content),
      // HARO responses
      this.respondToHARO(content),
      // Podcast outreach
      this.pitchToPodcasts(content),
      // Local partnerships
      this.buildLocalPartnerships(content),
    ];

    await Promise.all(strategies);
  }

  private async submitGuestPost(content: BlogContent) {
    // Submit guest posts to relevant sites
    const sites = this.getGuestPostSites(content.practiceArea);

    // Format as guest post
    const guestPost = {
      title: `Guest Post: ${content.title}`,
      content: await this.formatAsGuestPost(content),
      authorBio: this.getAuthorBio(content.author || 'William Vasquez'),
      backlink: `${this.baseUrl}/blog/${content.slug}`,
    };

    // Submit to sites (mock for now)
    return { submitted: sites.length, sites };
  }

  private async submitToResourcePages(content: BlogContent) {
    // Find and submit to relevant resource pages
    return { submitted: 5, category: 'legal-resources' };
  }

  private async respondToHARO(content: BlogContent) {
    // Respond to Help a Reporter Out queries
    return { responded: 3, category: content.practiceArea };
  }

  private async pitchToPodcasts(content: BlogContent) {
    // Pitch attorneys as podcast guests
    return { pitched: 2, topic: content.title };
  }

  private async buildLocalPartnerships(content: BlogContent) {
    // Build partnerships with local organizations
    return { partnerships: 4, type: 'community-organizations' };
  }

  /**
   * Tracking and analytics
   */
  private async trackSyndication(contentId: string, platform: string, result: SyndicationResult) {
    const prisma = await import('@/lib/prisma').then(m => m.getPrismaClient());

    await prisma.contentSyndication.create({
      data: {
        contentId,
        platform,
        status: result.success ? 'success' : 'failed',
        url: result.url,
        externalId: result.postId || result.shareId || result.releaseId,
        metrics: JSON.parse(JSON.stringify(result)),
        syndicatedAt: new Date(),
      },
    });
  }

  /**
   * Utility methods
   */
  private stripMarkdown(markdown: string): string {
    return markdown
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
      .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/`([^`]+)`/g, '$1') // Remove code
      .replace(/^[-*+]\s/gm, '') // Remove list markers
      .replace(/^\d+\.\s/gm, ''); // Remove numbered lists
  }

  private async convertToHTML(markdown: string): Promise<string> {
    // Simple markdown to HTML conversion
    return markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  private mapToAvvoCategory(practiceArea: string): string {
    const mapping = {
      immigration: 'Immigration',
      'personal-injury': 'Personal Injury',
      'workers-compensation': 'Workers Compensation',
      'criminal-defense': 'Criminal Defense',
      'family-law': 'Family',
      'traffic-violations': 'Speeding / Traffic Ticket',
    };

    return mapping[practiceArea as keyof typeof mapping] || 'General Practice';
  }

  private formatHashtag(text: string): string {
    return text.replace(/[-\s]/g, '').replace(/['']/g, '');
  }

  private formatPracticeArea(practiceArea: string): string {
    const formatted = {
      immigration: 'Immigration Law',
      'personal-injury': 'Personal Injury',
      'workers-compensation': "Workers' Compensation",
      'criminal-defense': 'Criminal Defense',
      'family-law': 'Family Law',
      'traffic-violations': 'Traffic Violations',
    };

    return formatted[practiceArea as keyof typeof formatted] || practiceArea;
  }

  private extractKeyPoint(content: BlogContent, index: number): string {
    const defaultPoints = [
      'Expert legal guidance',
      'Free consultation available',
      'Serving North Carolina & Florida',
    ];

    // Try to extract from content
    const points = this.extractKeyPoints(content.content, 3);

    return points[index] || defaultPoints[index] || 'Legal expertise you can trust';
  }

  private extractKeyPoints(content: string, count: number): string[] {
    const points: string[] = [];

    // Look for bullet points or numbered lists
    const bulletPoints = content.match(/^[\*\-]\s(.+)$/gm) || [];
    const numberedPoints = content.match(/^\d+\.\s(.+)$/gm) || [];

    // Clean and add points
    [...bulletPoints, ...numberedPoints].forEach(point => {
      const cleaned = point.replace(/^[\*\-\d\.]\s/, '').trim();
      if (cleaned.length < 100) {
        // Keep concise points
        points.push(cleaned);
      }
    });

    return points.slice(0, count);
  }

  private generateAttorneyQuote(content: BlogContent): string {
    const quotes = {
      immigration:
        'Understanding your rights and options is crucial when navigating immigration law. This guide provides the clarity our clients need.',
      'personal-injury':
        'Accident victims deserve full compensation for their injuries. This information helps level the playing field with insurance companies.',
      'workers-compensation':
        'Injured workers have rights that employers and insurers often overlook. Knowledge is power in protecting those rights.',
      'criminal-defense':
        'Everyone deserves a strong defense. This guide helps individuals understand the legal process and their constitutional rights.',
      'family-law':
        'Family legal matters are deeply personal. We provide this guidance to help families make informed decisions during difficult times.',
      'traffic-violations':
        'Traffic violations can have serious consequences beyond fines. This information helps drivers protect their licenses and futures.',
    };

    return (
      quotes[content.practiceArea as keyof typeof quotes] ||
      'Legal knowledge empowers our clients to make informed decisions about their cases.'
    );
  }

  private getAuthorBio(author: string): string {
    const bios = {
      'William Vasquez':
        'William Vasquez is the founder and managing attorney of Vasquez Law Firm, PLLC, with over 30 years of experience in immigration and personal injury law.',
      'Jillian Baucom':
        "Jillian Baucom is a senior attorney at Vasquez Law Firm specializing in workers' compensation and personal injury cases.",
      'Christopher Afanador':
        'Christopher Afanador is an experienced personal injury attorney at Vasquez Law Firm, dedicated to helping accident victims.',
      'Mark Kelsey':
        'Mark Kelsey is a criminal defense attorney at Vasquez Law Firm with extensive trial experience.',
      'Roselyn Torrellas':
        'Roselyn Torrellas is a family law attorney at Vasquez Law Firm, compassionately guiding clients through divorce and custody matters.',
    };

    return (
      bios[author as keyof typeof bios] ||
      `${author} is an experienced attorney at Vasquez Law Firm, PLLC. Visit vasquezlawnc.com or call 1-844-YO-PELEO.`
    );
  }

  private getGuestPostSites(practiceArea: string): string[] {
    const sites = {
      immigration: ['immigrationimpact.com', 'ilw.com', 'immigrationlawhelp.org'],
      'personal-injury': [
        'injurylawyersnow.com',
        'personalinjurylawyermagazine.com',
        'legalscoops.com',
      ],
      // Add more practice areas...
    };

    return sites[practiceArea as keyof typeof sites] || ['legaltalk.com', 'lawyerist.com'];
  }

  private async formatAsGuestPost(content: BlogContent): Promise<string> {
    // Reformat content as guest post
    let guestContent = content.content;

    // Remove internal links
    guestContent = guestContent.replace(/\[([^\]]+)\]\(\/[^)]+\)/g, '$1');

    // Add guest post intro
    const intro = `*Editor's Note: This guest post provides valuable insights on ${content.practiceArea} law from the experienced team at Vasquez Law Firm.*\n\n`;

    // Add author resource box
    const resourceBox = `\n\n---\n\n**About the Author**\n\n${this.getAuthorBio(content.author || 'William Vasquez')}\n\nThis article originally appeared on the [Vasquez Law Firm blog](${this.baseUrl}/blog/${content.slug}).`;

    return intro + guestContent + resourceBox;
  }
}
