import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';
import * as cheerio from 'cheerio';
// axios removed - using native fetch;
import { OpenAI } from 'openai';

interface CheerioElement {
  attribs?: Record<string, string>;
}

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export async function POST(req: NextRequest) {
  apiLogger.request(req.method, req.url, {});

  try {
    const { action, url } = await req.json();

    switch (action) {
      case 'import-all':
        const result = await importEntireWebsite();
        return NextResponse.json(result);

      case 'import-page':
        const pageResult = await importPage(url);
        return NextResponse.json(pageResult);

      case 'optimize-content':
        const optimizeResult = await optimizeImportedContent();
        return NextResponse.json(optimizeResult);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    apiLogger.error('content-import', error as Error);
    return NextResponse.json({ error: 'Failed to import content' }, { status: 500 });
  }
}

async function importEntireWebsite() {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const importResults = {
    pages: 0,
    blogs: 0,
    images: 0,
    errors: [] as string[],
  };

  try {
    // Fetch the sitemap or main pages
    const mainPages = [
      '/',
      '/practice-areas',
      '/immigration-law',
      '/personal-injury',
      '/workers-compensation',
      '/criminal-defense',
      '/family-law',
      '/traffic-violations',
      '/attorneys',
      '/about-us',
      '/contact',
      '/blog',
    ];

    for (const page of mainPages) {
      try {
        const url = `${baseUrl}${page}`;
        const response = await fetch(url).then(res => res.json());
        const $ = cheerio.load(response.data);

        // Extract page content
        const title = $('title').text() || $('h1').first().text();
        const metaDescription = $('meta[name="description"]').attr('content') || '';
        const content = $('main, .content, #content, article').first().html() || $('body').html();

        // Clean and structure content
        const cleanContent = await cleanAndStructureContent(content || '', $);

        // Detect page type and practice area
        const pageType = detectPageType(page, title);
        const practiceArea = detectPracticeAreaFromUrl(page);

        if (pageType === 'blog') {
          // Import as blog post
          await importBlogPost({
            title,
            content: cleanContent.content,
            excerpt: cleanContent.excerpt,
            metaDescription,
            url,
            practiceArea,
          });
          importResults.blogs++;
        } else {
          // Save page content for reference
          await savePageContent({
            url,
            title,
            content: cleanContent.content,
            metaDescription,
            pageType,
            practiceArea,
          });
          importResults.pages++;
        }

        // Extract and save images
        const images = await extractImages($, baseUrl);
        importResults.images += images.length;

        // If it's a blog listing page, get all blog posts
        if (page === '/blog') {
          const blogLinks = await extractBlogLinks($, baseUrl);
          for (const blogUrl of blogLinks) {
            try {
              await importBlogPost({ url: blogUrl });
              importResults.blogs++;
            } catch (error) {
              importResults.errors.push(`Failed to import blog: ${blogUrl}`);
            }
          }
        }
      } catch (error) {
        importResults.errors.push(`Failed to import page: ${page}`);
        apiLogger.error('import-page', error as Error);
      }
    }

    // Optimize all imported content
    await optimizeImportedContent();

    return {
      success: true,
      ...importResults,
    };
  } catch (error) {
    apiLogger.error('import-entire-website', error as Error);
    throw error;
  }
}

async function importPage(url: string) {
  try {
    const response = await fetch(url).then(res => res.json());
    const $ = cheerio.load(response.data);

    const title = $('title').text() || $('h1').first().text();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const content = $('main, .content, #content, article').first().html() || $('body').html();

    const cleanContent = await cleanAndStructureContent(content || '', $);
    const practiceArea = detectPracticeAreaFromUrl(url);

    // Translate to Spanish if needed
    const spanishContent = await translateContent(cleanContent.content, 'es');

    return {
      success: true,
      data: {
        title,
        content: cleanContent.content,
        contentEs: spanishContent,
        excerpt: cleanContent.excerpt,
        metaDescription,
        practiceArea,
        images: await extractImages($, url),
      },
    };
  } catch (error) {
    apiLogger.error('import-page', { error: error as Error, url });
    throw error;
  }
}

async function cleanAndStructureContent(
  html: string,
  _$: cheerio.CheerioAPI
): Promise<{
  content: string;
  excerpt: string;
}> {
  // Remove scripts, styles, and unwanted elements
  const $content = cheerio.load(html);
  $content('script, style, noscript, iframe').remove();
  $content('[class*="sidebar"], [class*="footer"], [class*="header"], [class*="nav"]').remove();

  // Clean up attributes
  $content('*').each((i, elem) => {
    const $elem = $content(elem);
    // Keep only essential attributes
    const allowedAttrs = ['href', 'src', 'alt', 'title'];
    const attrs = (elem as CheerioElement).attribs || {};
    for (const attr in attrs) {
      if (!allowedAttrs.includes(attr)) {
        $elem.removeAttr(attr);
      }
    }
  });

  // Convert to clean HTML
  const cleanHtml = $content.html() || '';

  // Extract excerpt (first paragraph or first 160 chars)
  const firstParagraph = $content('p').first().text();
  const excerpt = firstParagraph.substring(0, 160) + (firstParagraph.length > 160 ? '...' : '');

  return {
    content: cleanHtml,
    excerpt,
  };
}

async function importBlogPost(data: {
  url?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  metaDescription?: string;
  practiceArea?: string;
}) {
  try {
    let { title, content, excerpt } = data;
    const practiceArea = data.practiceArea;
    // metaDescription is not used in this function
    // let metaDescription = data.metaDescription;

    // If only URL provided, fetch the content
    if (data.url && !content) {
      const response = await fetch(data.url).then(res => res.json());
      const $ = cheerio.load(response.data);

      title = title || $('h1').first().text() || $('title').text();
      const articleContent = $('article, .blog-post, .post-content, main').first().html();
      const cleanedContent = await cleanAndStructureContent(articleContent || '', $);
      content = cleanedContent.content;
      excerpt = excerpt || cleanedContent.excerpt;
      // metaDescription is updated but not used further in this function
      // metaDescription = metaDescription || $('meta[name="description"]').attr('content') || excerpt;

      // Extract date
      // const dateText = $('.date, .post-date, time').first().text();
      // Parse date (this is simplified, might need more robust parsing)
    }

    if (!title || !content) {
      throw new Error('Missing title or content');
    }

    // Generate SEO-optimized version
    const optimizedContent = await optimizeContentForSEO({
      title,
      content,
      practiceArea: practiceArea || 'general',
    });

    // Translate to Spanish
    const spanishVersion = await translateContent(content, 'es');
    const spanishTitle = await translateContent(title, 'es');

    // Generate slug
    const slug = generateSlug(title);

    // Save to database
    const blogPost = await getPrismaClient().blogPost.create({
      data: {
        title: optimizedContent.title,
        slug,
        content: optimizedContent.content,
        excerpt: excerpt || optimizedContent.excerpt,
        metaDescription: optimizedContent.metaDescription,
        metaKeywords: optimizedContent.keywords,
        practiceArea: practiceArea || 'general',
        language: 'en',
        status: 'draft',
        keywords: optimizedContent.keywords,
        seoScore: optimizedContent.seoScore,
        readTime: Math.ceil(content.split(' ').length / 200),
      },
    });

    // Create Spanish version
    await getPrismaClient().blogPost.create({
      data: {
        title: spanishTitle,
        slug: `${slug}-es`,
        content: spanishVersion,
        excerpt: excerpt ? await translateContent(excerpt, 'es') : '',
        metaDescription: await translateContent(optimizedContent.metaDescription, 'es'),
        metaKeywords: optimizedContent.keywords, // Keep same keywords
        practiceArea: practiceArea || 'general',
        language: 'es',
        status: 'draft',
        keywords: optimizedContent.keywords,
        originalId: blogPost.id,
        seoScore: optimizedContent.seoScore,
        readTime: Math.ceil(spanishVersion.split(' ').length / 200),
      },
    });

    return blogPost;
  } catch (error) {
    apiLogger.error('import-blog-post', { error: error as Error, url: data.url });
    throw error;
  }
}

async function optimizeContentForSEO(data: {
  title: string;
  content: string;
  practiceArea: string;
}): Promise<{
  title: string;
  content: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  seoScore: number;
}> {
  const prompt = `Optimize this legal content for SEO while maintaining accuracy and readability.
    
    Current Title: ${data.title}
    Practice Area: ${data.practiceArea}
    Content: ${data.content.substring(0, 2000)}...
    
    Tasks:
    1. Create an SEO-optimized title (60 chars max)
    2. Write a compelling meta description (155 chars max)
    3. Identify 5-7 target keywords
    4. Rewrite the content to naturally include keywords (maintain legal accuracy)
    5. Add FAQs if relevant
    6. Calculate an SEO score (0-100)
    
    Return as JSON: {
      title: string,
      metaDescription: string,
      keywords: string[],
      content: string (full optimized content),
      excerpt: string (160 chars),
      seoScore: number
    }`;

  if (!openai) {
    // Return a basic optimization without AI
    return {
      title: data.title.substring(0, 60),
      content: data.content,
      excerpt: data.content.substring(0, 160) + '...',
      metaDescription: data.content.substring(0, 155),
      keywords: [data.practiceArea, 'law', 'attorney', 'legal'],
      seoScore: 75,
    };
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const result = JSON.parse(response.choices[0]?.message?.content || '{}');
  return result;
}

async function translateContent(content: string, targetLanguage: 'es' | 'en'): Promise<string> {
  if (content.length < 10) return content;

  if (!openai) {
    // Return original content if no AI available
    return content;
  }

  const prompt = `Translate this legal content to ${targetLanguage === 'es' ? 'Spanish' : 'English'}.
    Maintain legal accuracy and professional tone.
    Keep any legal terms that don't have direct translations.
    
    Content: ${content}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content || content;
}

async function optimizeImportedContent() {
  // Get all draft content
  const drafts = await getPrismaClient().blogPost.findMany({
    where: { status: 'draft' },
  });

  for (const draft of drafts) {
    try {
      // Re-optimize with current SEO best practices
      const optimized = await optimizeContentForSEO({
        title: draft.title,
        content: draft.content,
        practiceArea: draft.practiceArea || 'general',
      });

      // Update the post
      await getPrismaClient().blogPost.update({
        where: { id: draft.id },
        data: {
          title: optimized.title,
          content: optimized.content,
          metaDescription: optimized.metaDescription,
          keywords: optimized.keywords,
          seoScore: optimized.seoScore,
        },
      });
    } catch (error) {
      apiLogger.error('optimize-content', { error: error as Error, id: draft.id });
    }
  }

  return {
    optimized: drafts.length,
  };
}

function detectPageType(url: string, _title: string): string {
  if (url.includes('/blog/') || url.includes('/news/') || url.includes('/article/')) {
    return 'blog';
  }
  if (url.includes('/practice-area') || url.includes('/services')) {
    return 'practice-area';
  }
  if (url.includes('/attorney') || url.includes('/lawyer')) {
    return 'attorney';
  }
  if (url === '/' || url.includes('/home')) {
    return 'home';
  }
  return 'page';
}

function detectPracticeAreaFromUrl(url: string): string {
  const areas = {
    immigration: 'immigration',
    'personal-injury': 'personal-injury',
    'workers-comp': 'workers-compensation',
    criminal: 'criminal-defense',
    family: 'family-law',
    traffic: 'traffic-violations',
  };

  for (const [key, value] of Object.entries(areas)) {
    if (url.toLowerCase().includes(key)) {
      return value;
    }
  }

  return 'general';
}

async function extractImages($: cheerio.CheerioAPI, baseUrl: string): Promise<string[]> {
  const images: string[] = [];

  $('img').each((i, elem) => {
    let src = $(elem).attr('src');
    if (src) {
      // Make absolute URL
      if (!src.startsWith('http')) {
        src = new URL(src, baseUrl).href;
      }
      images.push(src);
    }
  });

  return images;
}

async function extractBlogLinks($: cheerio.CheerioAPI, baseUrl: string): Promise<string[]> {
  const links: string[] = [];

  $('a[href*="/blog/"], a[href*="/news/"], .blog-post a, article a').each((i, elem) => {
    let href = $(elem).attr('href');
    if (href && !href.startsWith('#') && !href.includes('javascript:')) {
      // Make absolute URL
      if (!href.startsWith('http')) {
        href = new URL(href, baseUrl).href;
      }
      // Only include blog posts
      if (href.includes('/blog/') || href.includes('/news/')) {
        links.push(href);
      }
    }
  });

  return [...new Set(links)]; // Remove duplicates
}

async function savePageContent(data: {
  url: string;
  title: string;
  content: string;
  metaDescription: string;
  pageType: string;
  practiceArea?: string;
}) {
  // Store in a temporary collection or file for reference
  // This could be used to create static pages or reference content
  apiLogger.info('page-content-saved', { url: data.url, pageType: data.pageType });
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}
