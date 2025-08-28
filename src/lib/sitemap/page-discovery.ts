import fs from 'fs';
import { componentLogger as logger } from '@/lib/safe-logger';
import path from 'path';
import { getPrismaClient } from '../prisma';
import { ncCities } from '../seo/local-seo-generator';

export interface DiscoveredPage {
  path: string;
  type: 'static' | 'dynamic';
  language: 'en' | 'es';
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface PagePair {
  en?: DiscoveredPage;
  es?: DiscoveredPage;
}

export class FileSystemPageDiscovery {
  private appDir: string;
  private ignoredPaths = ['api', '_', 'sitemap', 'robots.txt', 'manifest', 'socket', 'webhook', 'webhooks', '.well-known'];
  private baseUrl: string;
  
  constructor(appDir: string = path.join(process.cwd(), 'src/app'), baseUrl: string = 'https://www.vasquezlawnc.com') {
    this.appDir = appDir;
    this.baseUrl = baseUrl;
  }

  private findPageFiles(dir: string, files: string[] = []): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(this.appDir, fullPath);
      
      // Skip ignored directories
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || 
            entry.name.startsWith('_') || 
            entry.name === 'api' || 
            entry.name === '.well-known' ||
            entry.name === '.next') {
          continue;
        }
        this.findPageFiles(fullPath, files);
      } else if (entry.isFile() && entry.name.match(/^page\.(tsx|ts|jsx|js)$/)) {
        files.push(relativePath);
      }
    }
    
    return files;
  }

  async discoverAllPages(): Promise<Map<string, PagePair>> {
    const pages = new Map<string, PagePair>();
    
    // Find all page.tsx files
    const pageFiles = this.findPageFiles(this.appDir);

    logger.info(`Found ${pageFiles.length} page files in filesystem`);

    for (const file of pageFiles) {
      const pagePath = this.fileToRoute(file);
      
      // Skip ignored paths
      if (this.shouldIgnorePath(pagePath)) continue;
      
      const stats = fs.statSync(path.join(this.appDir, file));
      const language = pagePath.startsWith('/es') ? 'es' : 'en';
      const normalizedPath = this.normalizePath(pagePath, language);
      
      const pageInfo: DiscoveredPage = {
        path: pagePath,
        type: this.isStaticRoute(pagePath) ? 'static' : 'dynamic',
        language,
        lastModified: stats.mtime,
        changeFrequency: this.getChangeFrequency(pagePath),
        priority: this.getPriority(pagePath),
      };

      if (!pages.has(normalizedPath)) {
        pages.set(normalizedPath, {});
      }
      
      const pair = pages.get(normalizedPath)!;
      pair[language] = pageInfo;
    }

    // Discover dynamic routes from data sources
    await this.discoverDynamicRoutes(pages);
    
    return pages;
  }

  private fileToRoute(file: string): string {
    const dir = path.dirname(file);
    if (dir === '.') return '/';
    
    // Convert file path to route path
    let route = '/' + dir.replace(/\\/g, '/');
    
    // Handle route groups (parentheses)
    route = route.replace(/\/\([^)]+\)/g, '');
    
    return route;
  }

  private shouldIgnorePath(path: string): boolean {
    const segments = path.split('/').filter(Boolean);
    return segments.some(segment => this.ignoredPaths.includes(segment));
  }

  private isStaticRoute(path: string): boolean {
    return !path.includes('[') && !path.includes(']');
  }

  private normalizePath(path: string, language: 'en' | 'es'): string {
    if (language === 'es' && path.startsWith('/es/')) {
      return path.substring(3);
    }
    return path;
  }

  private getChangeFrequency(path: string): DiscoveredPage['changeFrequency'] {
    if (path === '/' || path === '/es') return 'daily';
    if (path.includes('/blog')) return 'weekly';
    if (path.includes('/news')) return 'daily';
    if (path.includes('/attorneys') || path.includes('/abogados')) return 'monthly';
    if (path.includes('/practice-areas') || path.includes('/areas-de-practica')) return 'monthly';
    if (path.includes('/locations') || path.includes('/ubicaciones')) return 'weekly';
    if (path.includes('/near-me') || path.includes('/cerca-de-mi')) return 'weekly';
    return 'weekly';
  }

  private getPriority(path: string): number {
    if (path === '/' || path === '/es') return 1.0;
    if (path === '/practice-areas' || path === '/es/areas-de-practica') return 0.95;
    if (path === '/locations/nc' || path === '/es/ubicaciones/nc') return 0.95;
    
    // Main practice area pages
    if ((path.includes('/practice-areas/') || path.includes('/areas-de-practica/')) && path.split('/').length === 3) return 0.9;
    
    // Major city pages
    const majorCities = ['charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem'];
    if (path.includes('/locations/') && majorCities.some(city => path.includes(city))) return 0.9;
    
    // Location + practice area combos
    if (path.includes('/locations/') && (path.includes('-lawyer') || path.includes('-attorney'))) return 0.85;
    
    // Sub-practice areas
    if ((path.includes('/practice-areas/') || path.includes('/areas-de-practica/')) && path.split('/').length === 4) return 0.8;
    
    if (path.includes('/attorneys') || path.includes('/abogados')) return 0.8;
    if (path.includes('/contact') || path.includes('/contacto')) return 0.8;
    if (path.includes('/blog')) return 0.7;
    if (path.includes('/near-me') || path.includes('/cerca-de-mi')) return 0.7;
    
    return 0.6;
  }

  private async discoverDynamicRoutes(pages: Map<string, PagePair>): Promise<void> {
    // This would connect to your database or CMS to get dynamic content
    // For now, we'll use the existing data sources
    
    // Add blog posts
    const blogPosts = await this.getBlogPosts();
    for (const post of blogPosts) {
      const normalizedPath = `/blog/${post.slug}`;
      pages.set(normalizedPath, {
        en: {
          path: `/blog/${post.slug}`,
          type: 'dynamic',
          language: 'en',
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        },
        es: post.translations?.es ? {
          path: `/es/blog/${post.slug}`,
          type: 'dynamic',
          language: 'es',
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        } : undefined,
      });
    }

    // Add attorney profiles
    const attorneys = await this.getAttorneys();
    for (const attorney of attorneys) {
      const normalizedPath = `/attorneys/${attorney.slug}`;
      pages.set(normalizedPath, {
        en: {
          path: `/attorneys/${attorney.slug}`,
          type: 'dynamic',
          language: 'en',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        },
        es: {
          path: `/es/abogados/${attorney.slug}`,
          type: 'dynamic',
          language: 'es',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        },
      });
    }
  }

  private async getBlogPosts(): Promise<any[]> {
    try {
      const prisma = getPrismaClient();
      const posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        select: {
          slug: true,
          createdAt: true,
          updatedAt: true,
          metadata: true,
        },
      });
      return posts;
    } catch (error) {
      logger.error('Error fetching blog posts:', error);
      return [];
    }
  }

  private async getAttorneys(): Promise<any[]> {
    // Return static attorney data for now
    return [
      { slug: 'william-vasquez' },
      { slug: 'adrianna-ingram' },
      { slug: 'christopher-afanador' },
      { slug: 'jillian-baucom' },
      { slug: 'mark-kelsey' },
      { slug: 'roselyn-v-torrellas' },
      { slug: 'judith-parkes' },
    ];
  }

  async generateSitemapXML(pages: DiscoveredPage[], baseUrl: string = this.baseUrl): Promise<string> {
    const entries = pages.map(page => {
      const loc = `${baseUrl}${page.path}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
  }

  async generateSitemapWithAlternates(pagePairs: Map<string, PagePair>, baseUrl: string = this.baseUrl): Promise<string> {
    const entries: string[] = [];
    
    pagePairs.forEach((pair, normalizedPath) => {
      // Generate entry for EN page
      if (pair.en) {
        const enLoc = `${baseUrl}${pair.en.path}`;
        const esLoc = pair.es ? `${baseUrl}${pair.es.path}` : null;
        
        let entry = `  <url>
    <loc>${enLoc}</loc>
    <lastmod>${pair.en.lastModified.toISOString()}</lastmod>
    <changefreq>${pair.en.changeFrequency}</changefreq>
    <priority>${pair.en.priority}</priority>`;
        
        if (esLoc) {
          entry += `
    <xhtml:link rel="alternate" hreflang="es" href="${esLoc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>`;
        }
        
        entry += `
  </url>`;
        entries.push(entry);
      }
      
      // Generate entry for ES page if it exists and no EN equivalent
      if (pair.es && !pair.en) {
        const esLoc = `${baseUrl}${pair.es.path}`;
        entries.push(`  <url>
    <loc>${esLoc}</loc>
    <lastmod>${pair.es.lastModified.toISOString()}</lastmod>
    <changefreq>${pair.es.changeFrequency}</changefreq>
    <priority>${pair.es.priority}</priority>
  </url>`);
      }
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;
  }
}
