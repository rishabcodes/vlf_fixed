import fs from 'fs/promises';
import { securityLogger } from '@/lib/safe-logger';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface ImportedBlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  headline: string;
  content: string;
  contentHtml: string;
  categories: string[];
  tags: string[];
  featuredImage: string;
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    caption?: string;
  }>;
  language: 'en' | 'es';
  readTime: number;
}

export class BlogImportService {
  private blogPostsDir = path.join(process.cwd(), 'content-import/blog-posts');
  private cachedPosts: Map<string, ImportedBlogPost> = new Map();

  private async processMarkdown(content: string): Promise<string> {
    const result = await remark().use(html).process(content);
    return result.toString();
  }

  private calculateReadTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }

  private detectLanguage(title: string, content: string): 'en' | 'es' {
    const spanishIndicators = [
      'cómo',
      'qué',
      'dónde',
      'cuándo',
      'por qué',
      'el',
      'la',
      'los',
      'las',
      'de',
      'para',
      'inmigración',
      'abogado',
      'ley',
      'derechos',
    ];

    const text = `${title} ${content}`.toLowerCase();
    const spanishCount = spanishIndicators.filter(word => text.includes(word)).length;

    return spanishCount >= 3 ? 'es' : 'en';
  }

  private generateSlug(filename: string): string {
    const slug = filename
      .replace('.json', '')
      .replace('.md', '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Limit slug length to prevent filesystem errors
    // Max safe length for most filesystems is 255 chars, but we'll use 200 to be safe
    if (slug.length > 200) {
      return slug.substring(0, 200).replace(/-+$/, '');
    }
    
    return slug;
  }

  private mapCategoriesToPracticeAreas(categories: string[]): string[] {
    const categoryMap: Record<string, string> = {
      Immigration: 'immigration',
      Inmigración: 'immigration',
      'Personal Injury': 'personal-injury',
      'Lesiones Personales': 'personal-injury',
      'Workers Compensation': 'workers-compensation',
      'Compensación Laboral': 'workers-compensation',
      'Criminal Defense': 'criminal-defense',
      'Defensa Criminal': 'criminal-defense',
      'Family Law': 'family-law',
      'Derecho Familiar': 'family-law',
      'Traffic Violations': 'traffic-violations',
      'Multas de Tránsito': 'traffic-violations',
    };

    return categories
      .map(cat => categoryMap[cat])
      .filter((value): value is string => Boolean(value))
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  async importBlogPost(filename: string): Promise<ImportedBlogPost | null> {
    try {
      // Check if it's a JSON file
      if (filename.endsWith('.json')) {
        const jsonPath = path.join(this.blogPostsDir, filename);
        const jsonContent = await fs.readFile(jsonPath, 'utf-8');
        const data = JSON.parse(jsonContent);

        // Skip category pages and non-blog posts
        if (data.type !== 'blog-post' || data.url?.includes('/category/')) {
          return null;
        }

        // Try to find corresponding markdown file
        const mdFilename = filename.replace('.json', '.md');
        const mdPath = path.join(this.blogPostsDir, mdFilename);
        let markdownContent = '';
        let contentHtml = '';

        try {
          const mdContent = await fs.readFile(mdPath, 'utf-8');
          const { content } = matter(mdContent);
          markdownContent = content;
          contentHtml = await this.processMarkdown(content);
        } catch (error) {
          // No markdown file, use any content from JSON
          markdownContent = data.content?.text || '';
          contentHtml = data.content?.html || '';
        }

        const slug = this.generateSlug(filename);
        const language = this.detectLanguage(data.title || '', markdownContent);

        const post: ImportedBlogPost = {
          slug,
          title: data.headline || data.title || 'Untitled Post',
          metaDescription: data.metaDescription || '',
          publishDate: data.publishDate || new Date().toISOString(),
          modifiedDate: data.modifiedDate,
          author: data.author || 'Vasquez Law Firm',
          headline: data.headline || data.title || '',
          content: markdownContent,
          contentHtml,
          categories: this.mapCategoriesToPracticeAreas(data.categories || []),
          tags: data.tags || [],
          featuredImage: data.featuredImage || data.images?.[0]?.src || '',
          images: data.images || [],
          language,
          readTime: this.calculateReadTime(markdownContent),
        };

        this.cachedPosts.set(slug, post);
        return post;
      }
    } catch (error) {
      securityLogger.error(`Error importing blog post ${filename}:`, error);
    }

    return null;
  }

  async importAllBlogPosts(): Promise<ImportedBlogPost[]> {
    try {
      // Check if directory exists
      try {
        await fs.access(this.blogPostsDir);
      } catch {
        // Directory doesn't exist, return sample posts
        securityLogger.info('Blog import directory does not exist, using sample posts');
        return this.generateSamplePosts();
      }

      const files = await fs.readdir(this.blogPostsDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      const posts = await Promise.all(jsonFiles.map(file => this.importBlogPost(file)));
      const validPosts = posts.filter((post): post is ImportedBlogPost => post !== null);

      // If no posts found or all have empty content, generate sample posts
      if (validPosts.length === 0 || validPosts.every(p => !p.content && !p.contentHtml)) {
        return this.generateSamplePosts();
      }

      return validPosts;
    } catch (error) {
      securityLogger.error('Error importing blog posts:', error);
      // Return sample posts as fallback
      return this.generateSamplePosts();
    }
  }

  async getBlogPost(slug: string): Promise<ImportedBlogPost | null> {
    // Check cache first
    if (this.cachedPosts.has(slug)) {
      return this.cachedPosts.get(slug)!;
    }

    try {
      // Check if directory exists
      await fs.access(this.blogPostsDir);
      
      // Try to find and import the post
      const files = await fs.readdir(this.blogPostsDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const post = await this.importBlogPost(file);
          if (post && post.slug === slug) {
            return post;
          }
        }
      }
    } catch (error) {
      securityLogger.debug('Blog import directory not accessible:', error);
    }

    return null;
  }

  async getRelatedPosts(
    currentPost: ImportedBlogPost,
    limit: number = 3
  ): Promise<ImportedBlogPost[]> {
    const allPosts = await this.importAllBlogPosts();

    // Filter out current post and posts in different languages
    const eligiblePosts = allPosts.filter(
      post => post.slug !== currentPost.slug && post.language === currentPost.language
    );

    // Score posts based on relevance
    const scoredPosts = eligiblePosts.map(post => {
      let score = 0;

      // Same category gets highest score
      if (post.categories.some(cat => currentPost.categories.includes(cat))) {
        score += 10;
      }

      // Shared tags
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += sharedTags.length * 2;

      // Title similarity (simple word matching)
      const currentWords = currentPost.title.toLowerCase().split(/\s+/);
      const postWords = post.title.toLowerCase().split(/\s+/);
      const sharedWords = currentWords.filter(word => word.length > 3 && postWords.includes(word));
      score += sharedWords.length;

      return { post, score };
    });

    // Sort by score and return top posts
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post);
  }

  async getBlogPostsByCategory(
    category: string,
    language: 'en' | 'es' = 'en'
  ): Promise<ImportedBlogPost[]> {
    const allPosts = await this.importAllBlogPosts();

    return allPosts.filter(
      post => post.categories.includes(category) && post.language === language
    );
  }

  async searchBlogPosts(query: string, language: 'en' | 'es' = 'en'): Promise<ImportedBlogPost[]> {
    const allPosts = await this.importAllBlogPosts();
    const searchTerms = query.toLowerCase().split(/\s+/);

    return allPosts.filter(post => {
      if (post.language !== language) return false;

      const searchableText = `
        ${post.title} 
        ${post.metaDescription} 
        ${post.content}
        ${post.tags.join(' ')}
      `.toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  private generateSamplePosts(): ImportedBlogPost[] {
    const samplePosts: ImportedBlogPost[] = [
      {
        slug: 'understanding-immigration-law-basics',
        title: 'Understanding Immigration Law: A Comprehensive Guide',
        metaDescription:
          'Learn the fundamentals of immigration law, visa types, and the path to citizenship in this comprehensive guide.',
        publishDate: new Date('2024-01-15').toISOString(),
        author: 'William Vasquez',
        headline: 'Understanding Immigration Law: A Comprehensive Guide',
        content:
          'Immigration law can be complex and overwhelming. This guide breaks down the basics to help you understand your options.',
        contentHtml:
          '<p>Immigration law can be complex and overwhelming. This guide breaks down the basics to help you understand your options.</p><h2>Types of Visas</h2><p>There are several visa categories available...</p>',
        categories: ['immigration'],
        tags: ['immigration', 'visa', 'citizenship', 'legal advice'],
        featuredImage: '',
        images: [],
        language: 'en',
        readTime: 5,
      },
      {
        slug: 'workers-compensation-rights-nc',
        title: "Know Your Workers' Compensation Rights in North Carolina",
        metaDescription:
          "Essential information about workers' compensation claims in NC, including filing deadlines and benefit types.",
        publishDate: new Date('2024-01-10').toISOString(),
        author: 'Jillian Baucom',
        headline: "Know Your Workers' Compensation Rights in North Carolina",
        content:
          "If you've been injured at work in North Carolina, understanding your workers' compensation rights is crucial.",
        contentHtml:
          "<p>If you've been injured at work in North Carolina, understanding your workers' compensation rights is crucial.</p><h2>Filing Deadlines</h2><p>You must report your injury within 30 days...</p>",
        categories: ['workers-compensation'],
        tags: ['workers compensation', 'workplace injury', 'NC law', 'employee rights'],
        featuredImage: '',
        images: [],
        language: 'en',
        readTime: 7,
      },
      {
        slug: 'personal-injury-claim-timeline',
        title: 'Personal Injury Claim Timeline: What to Expect',
        metaDescription:
          'Understand the typical timeline of a personal injury claim from accident to settlement or trial.',
        publishDate: new Date('2024-01-05').toISOString(),
        author: 'Christopher Afanador',
        headline: 'Personal Injury Claim Timeline: What to Expect',
        content:
          'After an accident, knowing what to expect in the legal process can help reduce stress and ensure you take the right steps.',
        contentHtml:
          '<p>After an accident, knowing what to expect in the legal process can help reduce stress and ensure you take the right steps.</p><h2>Initial Consultation</h2><p>The first step is meeting with an attorney...</p>',
        categories: ['personal-injury'],
        tags: ['personal injury', 'car accident', 'legal process', 'settlement'],
        featuredImage: '',
        images: [],
        language: 'en',
        readTime: 6,
      },
      {
        slug: 'dui-defense-strategies',
        title: 'DUI Defense Strategies: Protecting Your Rights',
        metaDescription:
          'Learn about effective DUI defense strategies and how to protect your rights after a drunk driving arrest.',
        publishDate: new Date('2023-12-28').toISOString(),
        author: 'Mark Kelsey',
        headline: 'DUI Defense Strategies: Protecting Your Rights',
        content:
          'Being charged with DUI can have serious consequences. Understanding defense strategies is crucial for protecting your future.',
        contentHtml:
          '<p>Being charged with DUI can have serious consequences. Understanding defense strategies is crucial for protecting your future.</p><h2>Common Defense Strategies</h2><p>Several defense strategies may apply to your case...</p>',
        categories: ['criminal-defense'],
        tags: ['DUI', 'criminal defense', 'drunk driving', 'legal defense'],
        featuredImage: '',
        images: [],
        language: 'en',
        readTime: 8,
      },
      {
        slug: 'family-law-custody-basics',
        title: 'Child Custody Laws in North Carolina: What Parents Need to Know',
        metaDescription:
          'Understanding child custody laws in NC, including types of custody and factors courts consider.',
        publishDate: new Date('2023-12-20').toISOString(),
        author: 'Roselyn Torrellas',
        headline: 'Child Custody Laws in North Carolina: What Parents Need to Know',
        content:
          'Navigating child custody can be emotionally challenging. This guide explains NC custody laws to help parents understand their rights.',
        contentHtml:
          '<p>Navigating child custody can be emotionally challenging. This guide explains NC custody laws to help parents understand their rights.</p><h2>Types of Custody</h2><p>North Carolina recognizes two types of custody...</p>',
        categories: ['family-law'],
        tags: ['child custody', 'family law', 'divorce', 'parenting'],
        featuredImage: '',
        images: [],
        language: 'en',
        readTime: 6,
      },
      {
        slug: 'reforma-migratoria-2024',
        title: 'Reforma Migratoria 2024: Lo Que Necesita Saber',
        metaDescription:
          'Información actualizada sobre los cambios en las leyes de inmigración y cómo pueden afectarle.',
        publishDate: new Date('2024-01-08').toISOString(),
        author: 'William Vasquez',
        headline: 'Reforma Migratoria 2024: Lo Que Necesita Saber',
        content:
          'Los cambios recientes en las leyes de inmigración pueden afectar su caso. Manténgase informado sobre las últimas actualizaciones.',
        contentHtml:
          '<p>Los cambios recientes en las leyes de inmigración pueden afectar su caso. Manténgase informado sobre las últimas actualizaciones.</p><h2>Cambios Principales</h2><p>La reforma incluye varios cambios importantes...</p>',
        categories: ['immigration'],
        tags: ['inmigración', 'reforma', 'visa', 'ciudadanía'],
        featuredImage: '',
        images: [],
        language: 'es',
        readTime: 7,
      },
      {
        slug: 'accidentes-trabajo-compensacion',
        title: 'Accidentes de Trabajo: Cómo Obtener Compensación',
        metaDescription:
          'Guía completa sobre cómo reclamar compensación por accidentes laborales en Carolina del Norte.',
        publishDate: new Date('2023-12-15').toISOString(),
        author: 'Jillian Baucom',
        headline: 'Accidentes de Trabajo: Cómo Obtener Compensación',
        content:
          'Si ha sufrido un accidente en el trabajo, es importante conocer sus derechos y cómo obtener la compensación que merece.',
        contentHtml:
          '<p>Si ha sufrido un accidente en el trabajo, es importante conocer sus derechos y cómo obtener la compensación que merece.</p><h2>Pasos a Seguir</h2><p>Después de un accidente laboral, debe...</p>',
        categories: ['workers-compensation'],
        tags: ['compensación laboral', 'accidente trabajo', 'derechos laborales'],
        featuredImage: '',
        images: [],
        language: 'es',
        readTime: 6,
      },
    ];

    return samplePosts;
  }
}

export const blogImportService = new BlogImportService();
