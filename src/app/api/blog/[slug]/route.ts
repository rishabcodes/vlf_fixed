import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';
import { SEOOptimizationService } from '@/services/seo-optimization';
import { blogImportService } from '@/services/blog/import-service';
import type { BlogPost, RelatedPost, BlogPostResponse } from '@/types/api';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    // First try to find in database
    let post: BlogPost | null = (await getPrismaClient().blogPost.findUnique({
      where: { slug },
      include: {
        translations: {
          select: {
            id: true,
            slug: true,
            language: true,
          },
        },
      },
    })) as BlogPost | null;

    let relatedPosts: RelatedPost[] = [];
    let structuredData: Record<string, unknown> | null = null;

    if (post) {
      // Database post found
      // Increment view count
      await getPrismaClient().blogPost.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
      });

      // Get related posts
      relatedPosts = await getPrismaClient().blogPost.findMany({
        where: {
          AND: [
            { practiceArea: post.practiceArea },
            { language: post.language },
            { id: { not: post.id } },
            { status: 'published' },
          ],
        },
        take: 3,
        orderBy: { seoScore: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          publishedAt: true,
        },
      });

      // Generate structured data
      structuredData = SEOOptimizationService.generateSchema(
        'BlogPosting',
        post as Record<string, unknown>
      );
    } else {
      // Try to find in imported posts
      const importedPost = await blogImportService.getBlogPost(slug);

      if (!importedPost) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }

      // Convert imported post to database format
      post = {
        id: importedPost.slug,
        title: importedPost.title,
        slug: importedPost.slug,
        content: importedPost.contentHtml,
        excerpt: importedPost.metaDescription || importedPost.content.substring(0, 200) + '...',
        metaDescription: importedPost.metaDescription,
        practiceArea: importedPost.categories[0] || 'general',
        language: importedPost.language,
        publishedAt: new Date(importedPost.publishDate),
        updatedAt: new Date(importedPost.modifiedDate || importedPost.publishDate),
        createdAt: new Date(importedPost.publishDate),
        readTime: importedPost.readTime,
        author: importedPost.author?.includes('@')
          ? 'Vasquez Law Team'
          : importedPost.author || 'Vasquez Law Team',
        keywords: importedPost.tags,
        metaKeywords: importedPost.tags,
        featuredImage: importedPost.featuredImage,
        images: [],
        viewCount: Math.floor(Math.random() * 500) + 50, // Mock view count
        seoScore: 85 + Math.floor(Math.random() * 15),
        faqSection: null,
        translations: [],
        status: 'published',
        originalId: importedPost.slug,
      } satisfies BlogPost;

      // Get related posts from imported posts
      const importedRelated = await blogImportService.getRelatedPosts(importedPost, 3);
      relatedPosts = importedRelated.map(
        related =>
          ({
            id: related.slug,
            title: related.title,
            slug: related.slug,
            excerpt: related.metaDescription || related.content.substring(0, 200) + '...',
            featuredImage: related.featuredImage,
            publishedAt: new Date(related.publishDate),
            category: related.categories[0] || 'general',
          }) satisfies RelatedPost
      );

      // Generate structured data for imported post
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: importedPost.title,
        description: importedPost.metaDescription,
        image: importedPost.featuredImage || 'https://vasquezlawnc.com/logo.png',
        author: {
          '@type': 'Person',
          name: importedPost.author?.includes('@')
            ? 'Vasquez Law Team'
            : importedPost.author || 'Vasquez Law Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Vasquez Law Firm, PLLC',
          logo: {
            '@type': 'ImageObject',
            url: 'https://vasquezlawnc.com/logo.png',
          },
        },
        datePublished: importedPost.publishDate,
        dateModified: importedPost.modifiedDate || importedPost.publishDate,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://vasquezlawnc.com/blog/${importedPost.slug}`,
        },
      };
    }

    const response: BlogPostResponse = {
      post: post!,
      relatedPosts,
      structuredData,
    };

    return NextResponse.json(response);
  } catch (error) {
    apiLogger.error('blog-get', error as Error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
