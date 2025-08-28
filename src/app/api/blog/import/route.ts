import { NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { blogImportService } from '@/services/blog/import-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const language = (searchParams.get('language') || 'en') as 'en' | 'es';
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    let posts;

    if (search) {
      posts = await blogImportService.searchBlogPosts(search, language);
    } else if (category && category !== 'all') {
      posts = await blogImportService.getBlogPostsByCategory(category, language);
    } else {
      posts = await blogImportService.importAllBlogPosts();
      posts = posts.filter(post => post.language === language);
    }

    // Sort by publish date (newest first)
    posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    // Format posts for frontend
    const formattedPosts = paginatedPosts.map(post => ({
      id: post.slug,
      title: post.title,
      slug: post.slug,
      excerpt: post.metaDescription || post.content.substring(0, 200) + '...',
      content: post.contentHtml,
      featuredImage: post.featuredImage,
      practiceArea: post.categories[0] || 'general',
      language: post.language,
      publishedAt: post.publishDate,
      readTime: post.readTime,
      author: {
        name: post.author.includes('@') ? 'Vasquez Law Team' : post.author,
        image: null,
      },
      tags: post.tags,
      seoScore: 85 + Math.floor(Math.random() * 15), // Mock SEO score
    }));

    return NextResponse.json({
      posts: formattedPosts,
      totalPosts: posts.length,
      totalPages: Math.ceil(posts.length / limit),
      currentPage: page,
      hasMore: endIndex < posts.length,
    });
  } catch (error) {
    apiLogger.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(_request: Request) {
  try {
    // Trigger a re-import of all blog posts
    const posts = await blogImportService.importAllBlogPosts();

    return NextResponse.json({
      message: 'Blog posts imported successfully',
      count: posts.length,
    });
  } catch (error) {
    apiLogger.error('Error importing blog posts:', error);
    return NextResponse.json({ error: 'Failed to import blog posts' }, { status: 500 });
  }
}
