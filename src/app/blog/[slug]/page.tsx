import { Metadata } from 'next';
import { componentLogger as logger } from '@/lib/safe-logger';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BlogPostTemplate } from '@/components/templates/BlogPostTemplate';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Skip pre-generation in fast build mode
  if (process.env.FAST_BUILD === 'true' || process.env.SKIP_STATIC_GENERATION === 'true') {
    console.log('[Fast Build] Skipping blog post pre-generation for faster builds');
    return [];
  }

  try {
    // Add timeout protection for database queries during build
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Database query timeout')), 5000)
    );

    const postsPromise = prisma.blogPost.findMany({
      where: {
        status: 'published',
        language: 'en',
      },
      select: {
        slug: true,
      },
      take: 100, // Limit to first 100 posts to prevent excessive build time
    });

    const posts = await Promise.race([postsPromise, timeoutPromise]).catch(() => []);

    // Filter out slugs that are too long to prevent filesystem errors
    return posts
      .filter(post => post.slug.length <= 200)
      .map(post => ({
        slug: post.slug,
      }));
  } catch (error) {
    logger.error('Error generating static params for blog posts:', error);
    // Return empty array to allow build to continue
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: slug,
        status: 'published',
        language: 'en',
      },
    });

    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: `${post.title} | Vasquez Law Firm Blog`,
      description: post.metaDescription || post.excerpt || post.content.substring(0, 160),
      keywords: post.metaKeywords.join(', '),
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        type: 'article',
        publishedTime: post.publishedAt?.toISOString(),
        authors: [post.author || 'Vasquez Law Firm'],
        images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
      },
    };
  } catch (error) {
    logger.error('Error generating metadata for blog post:', error);
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: slug,
        status: 'published',
        language: 'en',
      },
    });

    if (!post) {
      notFound();
    }

    // Get related posts based on category and practice area
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        language: 'en',
        NOT: {
          id: post.id,
        },
        OR: [
          {
            category: post.category,
          },
          {
            practiceArea: post.practiceArea,
          },
          {
            tags: {
              hasSome: post.tags,
            },
          },
        ],
      },
      take: 3,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return <BlogPostTemplate post={post} relatedPosts={relatedPosts} />;
  } catch (error) {
    logger.error('Error loading blog post:', error);
    notFound();
  }
}
