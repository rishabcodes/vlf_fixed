import { componentLogger as logger } from '@/lib/safe-logger';
import type { SEOContent } from '@/types/content-factory';

export class SEOAnalyzer {
  /**
   * Calculate SEO score for content
   */
  async calculateScore(content: SEOContent): Promise<number> {
    logger.info('Calculating SEO score', { title: content.title });

    const scores = {
      titleOptimization: this.analyzeTitleOptimization(content),
      metaDescription: this.analyzeMetaDescription(content),
      contentQuality: await this.analyzeContentQuality(content),
      keywordDensity: this.analyzeKeywordDensity(content),
      readability: this.analyzeReadability(content),
      internalLinking: this.analyzeInternalLinking(content),
      headingStructure: this.analyzeHeadingStructure(content),
      imageOptimization: this.analyzeImageOptimization(content),
      schemaMarkup: this.analyzeSchemaMarkup(content),
      mobileOptimization: this.analyzeMobileOptimization(content),
    };

    // Calculate weighted average
    const weights = {
      titleOptimization: 15,
      metaDescription: 10,
      contentQuality: 20,
      keywordDensity: 15,
      readability: 10,
      internalLinking: 10,
      headingStructure: 5,
      imageOptimization: 5,
      schemaMarkup: 5,
      mobileOptimization: 5,
    };

    let totalScore = 0;
    let totalWeight = 0;

    for (const [metric, score] of Object.entries(scores)) {
      const weight = (weights as Record<string, number>)[metric] || 0;
      totalScore += score * weight;
      totalWeight += weight;
    }

    const finalScore = Math.round(totalScore / totalWeight);

    logger.info('SEO score calculated', {
      finalScore,
      breakdown: scores,
    });

    return finalScore;
  }

  /**
   * Analyze title optimization
   */
  private analyzeTitleOptimization(content: { title?: string; keywords?: string[] }): number {
    let score = 100;
    const title = content.title || '';
    const primaryKeyword = content.keywords?.[0] || '';

    // Check title length (50-60 characters optimal)
    if (title.length < 30) {
      score -= 20;
    } else if (title.length > 70) {
      score -= 15;
    } else if (title.length < 50 || title.length > 60) {
      score -= 5;
    }

    // Check for primary keyword
    if (!title.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      score -= 30;
    }

    // Check keyword position (earlier is better)
    const keywordPosition = title.toLowerCase().indexOf(primaryKeyword.toLowerCase());
    if (keywordPosition > 30) {
      score -= 10;
    } else if (keywordPosition > 15) {
      score -= 5;
    }

    // Check for power words
    const powerWords = ['best', 'guide', 'how', 'why', 'top', 'expert', 'ultimate'];
    if (powerWords.some(word => title.toLowerCase().includes(word))) {
      score += 5;
    }

    // Check for numbers
    if (/\d+/.test(title)) {
      score += 5;
    }

    // Check for location (important for local SEO)
    const locations = ['north carolina', 'nc', 'charlotte', 'raleigh', 'orlando', 'florida'];
    if (locations.some(loc => title.toLowerCase().includes(loc))) {
      score += 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze meta description
   */
  private analyzeMetaDescription(content: SEOContent): number {
    let score = 100;
    const description = content.metaDescription || '';
    const primaryKeyword = content.keywords?.[0] || '';

    // Check length (150-160 characters optimal)
    if (description.length < 120) {
      score -= 20;
    } else if (description.length > 170) {
      score -= 15;
    } else if (description.length < 150 || description.length > 160) {
      score -= 5;
    }

    // Check for primary keyword
    if (!description.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      score -= 25;
    }

    // Check for call-to-action
    const ctaPhrases = ['call', 'contact', 'learn', 'discover', 'get', 'find out'];
    if (!ctaPhrases.some(phrase => description.toLowerCase().includes(phrase))) {
      score -= 15;
    }

    // Check uniqueness (shouldn't duplicate title)
    if (description === content.title) {
      score -= 30;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze content quality
   */
  private async analyzeContentQuality(content: SEOContent): Promise<number> {
    let score = 100;
    const text = content.content || '';
    const wordCount = text.split(/\s+/).length;

    // Check word count (1500+ optimal for SEO)
    if (wordCount < 300) {
      score -= 50;
    } else if (wordCount < 800) {
      score -= 30;
    } else if (wordCount < 1200) {
      score -= 15;
    } else if (wordCount < 1500) {
      score -= 5;
    }

    // Check for unique content (simplified check)
    const sentences = text.split(/[.!?]+/);
    const uniqueSentences = new Set(sentences).size;
    const duplicateRatio = 1 - uniqueSentences / sentences.length;

    if (duplicateRatio > 0.2) {
      score -= 20;
    }

    // Check content depth (presence of subheadings)
    const h2Count = (text.match(/^##\s/gm) || []).length;
    const h3Count = (text.match(/^###\s/gm) || []).length;

    if (h2Count < 3) {
      score -= 10;
    }
    if (h3Count < 2) {
      score -= 5;
    }

    // Check for multimedia references
    if (!text.includes('![') && !content.images?.length) {
      score -= 10;
    }

    // Check for lists
    const bulletLists = (text.match(/^\s*[-*]\s/gm) || []).length;
    const numberedLists = (text.match(/^\s*\d+\.\s/gm) || []).length;

    if (bulletLists + numberedLists < 1) {
      score -= 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze keyword density
   */
  private analyzeKeywordDensity(content: SEOContent): number {
    let score = 100;
    const text = content.content || '';
    const keywords = content.keywords || [];
    const wordCount = text.split(/\s+/).length;

    if (keywords.length === 0 || wordCount === 0) {
      return 0;
    }

    // Check primary keyword density (1-2% optimal)
    const primaryKeyword = keywords[0];
    if (!primaryKeyword) {
      return score;
    }
    const primaryCount = (
      text.toLowerCase().match(new RegExp(primaryKeyword.toLowerCase(), 'g')) || []
    ).length;
    const primaryDensity = (primaryCount / wordCount) * 100;

    if (primaryDensity < 0.5) {
      score -= 30;
    } else if (primaryDensity < 1) {
      score -= 10;
    } else if (primaryDensity > 3) {
      score -= 25; // Keyword stuffing
    } else if (primaryDensity > 2) {
      score -= 10;
    }

    // Check LSI keywords (related terms)
    const lsiKeywords = keywords.slice(1, 5);
    let lsiFound = 0;

    lsiKeywords.forEach((keyword: string) => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        lsiFound++;
      }
    });

    if (lsiFound < 2) {
      score -= 15;
    }

    // Check keyword distribution (should appear throughout)
    const sections = text.split(/\n\n+/);
    let sectionsWithKeyword = 0;

    sections.forEach((section: string) => {
      if (section.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        sectionsWithKeyword++;
      }
    });

    const distributionRatio = sectionsWithKeyword / sections.length;
    if (distributionRatio < 0.5) {
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze readability
   */
  private analyzeReadability(content: SEOContent): number {
    let score = 100;
    const text = content.content || '';

    // Calculate average sentence length
    const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);
    const words = text.split(/\s+/).filter((w: string) => w.length > 0);
    const avgSentenceLength = words.length / sentences.length;

    // Optimal is 15-20 words per sentence
    if (avgSentenceLength > 30) {
      score -= 25;
    } else if (avgSentenceLength > 25) {
      score -= 15;
    } else if (avgSentenceLength > 20) {
      score -= 5;
    }

    // Check paragraph length
    const paragraphs = text.split(/\n\n+/).filter((p: string) => p.trim().length > 0);
    let longParagraphs = 0;

    paragraphs.forEach((para: string) => {
      const paraWords = para.split(/\s+/).length;
      if (paraWords > 150) {
        longParagraphs++;
      }
    });

    if (longParagraphs > paragraphs.length * 0.3) {
      score -= 15;
    }

    // Check for transition words
    const transitionWords = [
      'however',
      'therefore',
      'moreover',
      'furthermore',
      'additionally',
      'consequently',
      'meanwhile',
      'subsequently',
      'finally',
      'indeed',
    ];

    let transitionsFound = 0;
    transitionWords.forEach(word => {
      if (text.toLowerCase().includes(word)) {
        transitionsFound++;
      }
    });

    if (transitionsFound < 3) {
      score -= 10;
    }

    // Check passive voice (simplified)
    const passiveIndicators = ['was', 'were', 'been', 'being', 'be'];
    let passiveSentences = 0;

    sentences.forEach((sentence: string) => {
      if (passiveIndicators.some(word => sentence.toLowerCase().includes(` ${word} `))) {
        passiveSentences++;
      }
    });

    const passiveRatio = passiveSentences / sentences.length;
    if (passiveRatio > 0.3) {
      score -= 15;
    } else if (passiveRatio > 0.2) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze internal linking
   */
  private analyzeInternalLinking(content: SEOContent): number {
    let score = 100;
    const text = content.content || '';
    const wordCount = text.split(/\s+/).length;

    // Extract internal links
    const internalLinks = text.match(/\[([^\]]+)\]\(\/[^)]+\)/g) || [];
    const linkCount = internalLinks.length;

    // Optimal is 2-5 internal links per 1000 words
    const expectedLinks = Math.floor(wordCount / 1000) * 3;

    if (linkCount === 0) {
      score -= 40;
    } else if (linkCount < expectedLinks - 2) {
      score -= 20;
    } else if (linkCount < expectedLinks) {
      score -= 10;
    } else if (linkCount > expectedLinks * 2) {
      score -= 15; // Too many links
    }

    // Check for important page links
    const importantPages = ['/free-consultation', '/contact', '/practice-areas'];
    let importantLinksFound = 0;

    importantPages.forEach(page => {
      if (text.includes(`](${page}`)) {
        importantLinksFound++;
      }
    });

    if (importantLinksFound === 0) {
      score -= 15;
    }

    // Check anchor text diversity
    const anchorTexts = internalLinks.map((link: string) => {
      const match = link.match(/\[([^\]]+)\]/);
      return match?.[1]?.toLowerCase() || '';
    });

    const uniqueAnchors = new Set(anchorTexts).size;
    const diversityRatio = uniqueAnchors / anchorTexts.length;

    if (diversityRatio < 0.5) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze heading structure
   */
  private analyzeHeadingStructure(content: SEOContent): number {
    let score = 100;
    const text = content.content || '';

    // Extract headings
    const h1s = text.match(/^#\s[^#]/gm) || [];
    const h2s = text.match(/^##\s/gm) || [];
    const h3s = text.match(/^###\s/gm) || [];

    // Should have exactly one H1 (title)
    if (h1s.length > 1) {
      score -= 30;
    }

    // Should have proper hierarchy
    if (h2s.length === 0) {
      score -= 20;
    }

    // Check if primary keyword is in at least one H2
    const primaryKeyword = content.keywords?.[0] || '';
    let keywordInHeading = false;

    h2s.forEach((heading: string) => {
      if (heading.toLowerCase().includes(primaryKeyword.toLowerCase())) {
        keywordInHeading = true;
      }
    });

    if (!keywordInHeading && primaryKeyword) {
      score -= 15;
    }

    // Check heading distribution
    const wordCount = text.split(/\s+/).length;
    const headingsPerWords = (h2s.length + h3s.length) / (wordCount / 300);

    if (headingsPerWords < 0.5) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze image optimization
   */
  private analyzeImageOptimization(content: SEOContent): number {
    let score = 100;
    const images = content.images || [];
    const imageReferences = content.content.match(/!\[[^\]]*\]/g) || [];

    // Check if content has images
    if (images.length === 0 && imageReferences.length === 0) {
      score -= 30;
    }

    // Check alt text
    let missingAltText = 0;
    imageReferences.forEach((ref: string) => {
      const altMatch = ref.match(/!\[([^\]]*)\]/);
      if (!altMatch || !altMatch[1] || altMatch[1].trim().length === 0) {
        missingAltText++;
      }
    });

    if (missingAltText > 0) {
      score -= missingAltText * 10;
    }

    // Check for featured image
    if (!content.featuredImage) {
      score -= 20;
    }

    // Check image file names (should be descriptive)
    let poorFileNames = 0;
    images.forEach(image => {
      const src = typeof image === 'string' ? image : image.src;
      if (/IMG_\d+|image\d+|photo\d+/i.test(src)) {
        poorFileNames++;
      }
    });

    if (poorFileNames > 0) {
      score -= poorFileNames * 5;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze schema markup
   */
  private analyzeSchemaMarkup(content: SEOContent): number {
    let score = 100;

    // Check for FAQ schema
    if (content.faqSection && content.faqSection.length > 0) {
      score += 10;
    } else {
      score -= 10;
    }

    // Content type should support rich snippets
    if (!content.schemaType) {
      score -= 20;
    }

    // Check for complete schema data
    const requiredFields = ['title', 'description', 'author', 'datePublished'];
    let missingFields = 0;

    requiredFields.forEach(field => {
      // Check specific fields that exist in SEOContent
      if (field === 'title' && !content.title) {
        missingFields++;
      } else if (field === 'description' && !content.metaDescription) {
        missingFields++;
      } else if (field === 'author' && !content.author) {
        missingFields++;
      } else if (field === 'datePublished' && !content.publishedAt) {
        missingFields++;
      }
    });

    score -= missingFields * 10;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze mobile optimization
   */
  private analyzeMobileOptimization(content: SEOContent): number {
    let score = 100;
    const text = content.content || '';

    // Check for mobile-unfriendly elements

    // Tables are hard to read on mobile
    if (text.includes('<table>') || text.includes('|---|')) {
      score -= 15;
    }

    // Very long URLs can break mobile layouts
    const urls = text.match(/https?:\/\/[^\s]+/g) || [];
    urls.forEach((url: string) => {
      if (url.length > 50) {
        score -= 5;
      }
    });

    // Check paragraph length for mobile readability
    const paragraphs = text.split(/\n\n+/);
    let veryLongParagraphs = 0;

    paragraphs.forEach((para: string) => {
      if (para.length > 500) {
        // Characters, not words
        veryLongParagraphs++;
      }
    });

    if (veryLongParagraphs > 2) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate SEO recommendations
   */
  async generateRecommendations(content: SEOContent, score: number): Promise<string[]> {
    const recommendations: string[] = [];

    if (score < 70) {
      recommendations.push('Consider rewriting title to include primary keyword earlier');
      recommendations.push('Expand content to at least 1500 words for better SEO');
      recommendations.push('Add more internal links to important pages');
      recommendations.push('Include FAQ section to enable rich snippets');
    }

    // Specific recommendations based on analysis
    const titleScore = this.analyzeTitleOptimization(content);
    if (titleScore < 80) {
      recommendations.push('Optimize title length to 50-60 characters');
    }

    const keywordScore = this.analyzeKeywordDensity(content);
    if (keywordScore < 80) {
      recommendations.push('Adjust keyword density to 1-2% for primary keyword');
      recommendations.push('Include more LSI (related) keywords naturally');
    }

    const readabilityScore = this.analyzeReadability(content);
    if (readabilityScore < 80) {
      recommendations.push('Break up long sentences and paragraphs');
      recommendations.push('Add transition words for better flow');
    }

    return recommendations;
  }
}
