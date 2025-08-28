import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export interface SearchResult {
  url: string;
  title: string;
  snippet: string;
  rank?: number;
}

export class WebFetch {
  private apiKey?: string;
  private searchEngineId?: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    this.searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
  }

  async searchGoogle(query: string, limit: number = 10): Promise<SearchResult[]> {
    try {
      if (!this.apiKey || !this.searchEngineId) {
        logger.warn('Google Search API not configured, returning mock results');
        return this.getMockSearchResults(query, limit);
      }

      const url = new URL('https://www.googleapis.com/customsearch/v1');
      url.searchParams.set('key', this.apiKey);
      url.searchParams.set('cx', this.searchEngineId);
      url.searchParams.set('q', query);
      url.searchParams.set('num', Math.min(limit, 10).toString());

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Google Search API error: ${response.status}`);
      }

      const data = await response.json();

      return (data.items || []).map((item: any, index: number) => ({
        url: item.link,
        title: item.title,
        snippet: item.snippet,
        rank: index + 1,
      }));
    } catch (error) {
      logger.error('Google Search API error:', errorToLogMeta(error));
      return this.getMockSearchResults(query, limit);
    }
  }

  async fetchContent(url: string): Promise<string> {
    try {
      // In production, this would use a proper web scraping service
      // For now, return mock content based on URL
      logger.info(`Fetching content from ${url}`);

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return this.getMockWebContent(url);
    } catch (error) {
      logger.error(`Failed to fetch content from ${url}:`, errorToLogMeta(error));
      return 'Unable to fetch content from this URL.';
    }
  }

  async fetchPageTitle(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; VLF-Bot/1.0)',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // For simplicity, extract title from URL or return a generic one
      const domain = new URL(url).hostname;
      return `${domain} - Legal Services`;
    } catch (error) {
      logger.warn(`Failed to fetch page title for ${url}:`, errorToLogMeta(error));
      return 'Legal Services Website';
    }
  }

  async checkUrlAccessibility(url: string): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; VLF-Bot/1.0)',
        },
      });

      clearTimeout(timeoutId);

      return response.ok;
    } catch (error) {
      logger.warn(`URL not accessible: ${url}`, { error });
      return false;
    }
  }

  private getMockSearchResults(query: string, limit: number): SearchResult[] {
    const mockResults: SearchResult[] = [
      {
        url: 'https://example-law-firm-1.com',
        title: `${query} - Leading Legal Services`,
        snippet: `Professional legal services for ${query}. Experienced attorneys providing comprehensive legal solutions.`,
        rank: 1,
      },
      {
        url: 'https://example-attorneys-2.com',
        title: `Top Lawyers for ${query}`,
        snippet: `Find the best lawyers specializing in ${query}. Free consultation available.`,
        rank: 2,
      },
      {
        url: 'https://legal-directory-3.com',
        title: `${query} Attorney Directory`,
        snippet: `Directory of qualified attorneys handling ${query} cases. Compare lawyers and read reviews.`,
        rank: 3,
      },
      {
        url: 'https://law-blog-4.com',
        title: `Understanding ${query} - Legal Guide`,
        snippet: `Comprehensive guide to ${query}. Learn about your rights and legal options.`,
        rank: 4,
      },
      {
        url: 'https://legal-news-5.com',
        title: `Recent ${query} News and Updates`,
        snippet: `Latest news and developments in ${query}. Stay informed about legal changes.`,
        rank: 5,
      },
    ];

    return mockResults.slice(0, limit);
  }

  private getMockWebContent(url: string): string {
    const domain = new URL(url).hostname;

    return `
# ${domain} - Legal Services

Welcome to our law firm, specializing in comprehensive legal services. Our experienced team of attorneys is dedicated to providing exceptional legal representation and guidance to our clients.

## Our Practice Areas

We handle a wide range of legal matters including:
- Personal Injury Law
- Immigration Law
- Family Law
- Criminal Defense
- Workers' Compensation
- Business Law

## Why Choose Us

- Over 20 years of combined experience
- Personalized attention to each case
- Multilingual services available
- Free initial consultation
- Proven track record of success

## Contact Information

Phone: (555) 123-4567
Email: info@${domain}
Address: 123 Legal Street, City, State 12345

## Client Reviews

"Excellent service and professional representation. Highly recommended!" - Client A

"The team was very knowledgeable and kept me informed throughout the process." - Client B

## Recent News

Stay updated with the latest legal developments and firm news. We regularly publish articles on important legal topics affecting our clients.

For more information about our services or to schedule a consultation, please contact us today.
`;
  }

  // Utility methods for specific use cases
  async extractLegalKeywords(content: string): Promise<string[]> {
    const legalKeywords = [
      'attorney',
      'lawyer',
      'legal',
      'law',
      'court',
      'case',
      'lawsuit',
      'litigation',
      'settlement',
      'compensation',
      'damages',
      'consultation',
      'representation',
      'defense',
      'rights',
      'claim',
      'dispute',
      'contract',
      'agreement',
    ];

    const words = content.toLowerCase().split(/\W+/);
    const foundKeywords = legalKeywords.filter(keyword =>
      words.some(word => word.includes(keyword))
    );

    return [...new Set(foundKeywords)]; // Remove duplicates
  }

  async extractContactInfo(content: string): Promise<{
    phones: string[];
    emails: string[];
    addresses: string[];
  }> {
    const phoneRegex = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const addressRegex =
      /\d+\s+[\w\s]+(?:street|st|avenue|ave|road|rd|boulevard|blvd|lane|ln|drive|dr|court|ct|circle|cir)[\w\s]*,?\s*[\w\s]+,?\s*[A-Z]{2}\s*\d{5}/gi;

    return {
      phones: [...(content.match(phoneRegex) || [])],
      emails: [...(content.match(emailRegex) || [])],
      addresses: [...(content.match(addressRegex) || [])],
    };
  }

  async analyzeSentiment(text: string): Promise<'positive' | 'negative' | 'neutral'> {
    // Simple sentiment analysis based on keywords
    const positiveWords = [
      'excellent',
      'great',
      'amazing',
      'wonderful',
      'outstanding',
      'professional',
      'helpful',
      'recommend',
    ];
    const negativeWords = [
      'terrible',
      'awful',
      'horrible',
      'bad',
      'worst',
      'unprofessional',
      'rude',
      'disappointed',
    ];

    const words = text.toLowerCase().split(/\W+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  async extractPricing(content: string): Promise<
    Array<{
      type: string;
      amount: number;
      description: string;
    }>
  > {
    const priceRegex = /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    const prices = [...(content.match(priceRegex) || [])];

    return prices.map((price, index) => ({
      type: 'fee',
      amount: parseFloat(price.replace(/[$,]/g, '')),
      description: `Fee ${index + 1} found in content`,
    }));
  }

  async fetchHTML(url: string): Promise<string> {
    try {
      logger.info(`Fetching HTML from ${url}`);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; VLF-Bot/1.0)',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      return html;
    } catch (error) {
      logger.error(`Failed to fetch HTML from ${url}:`, errorToLogMeta(error));
      // Return mock HTML content
      return this.getMockWebContent(url);
    }
  }
}
