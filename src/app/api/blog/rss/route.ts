import { NextResponse } from 'next/server';
import { apiLogger } from '@/lib/safe-logger';
import { blogImportService } from '@/services/blog/import-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = (searchParams.get('language') || 'en') as 'en' | 'es';

    const posts = await blogImportService.importAllBlogPosts();
    const filteredPosts = posts
      .filter(post => post.language === language)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 20); // Latest 20 posts

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vasquezlawnc.com';
    const blogPath = language === 'es' ? '/es/blog' : '/blog';

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vasquez Law Firm ${language === 'es' ? 'Blog Legal' : 'Legal Blog'} - YO PELEO POR TI™</title>
    <description>${
      language === 'es'
        ? 'Perspectivas legales y noticias de expertos de Vasquez Law Firm. Inmigración, lesiones personales, compensación laboral y más.'
        : 'Expert legal insights and news from Vasquez Law Firm. Immigration, personal injury, workers compensation and more.'
    }</description>
    <link>${baseUrl}${blogPath}</link>
    <language>${language === 'es' ? 'es-US' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/blog/rss?language=${language}" rel="self" type="application/rss+xml"/>
    <generator>Vasquez Law Firm Blog System</generator>
    <managingEditor>leads@vasquezlawfirm.com (Vasquez Law Firm)</managingEditor>
    <webMaster>leads@vasquezlawfirm.com (Vasquez Law Firm)</webMaster>
    <category>${language === 'es' ? 'Legal' : 'Legal'}</category>
    <copyright>© ${new Date().getFullYear()} Vasquez Law Firm, PLLC. All rights reserved.</copyright>
    <image>
      <url>${baseUrl}/images/logo.png</url>
      <title>Vasquez Law Firm - YO PELEO POR TI™</title>
      <link>${baseUrl}</link>
    </image>
    
    ${filteredPosts
      .map(post => {
        const postUrl = `${baseUrl}${blogPath}/${post.slug}`;
        const excerpt =
          post.metaDescription || post.content.substring(0, 300).replace(/<[^>]*>/g, '') + '...';

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <author>leads@vasquezlawfirm.com (${post.author.includes('@') ? 'Vasquez Law Team' : post.author})</author>
      ${post.categories.map(cat => `<category>${cat}</category>`).join('')}
      ${post.featuredImage ? `<enclosure url="${post.featuredImage}" type="image/jpeg"/>` : ''}
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    apiLogger.error('Error generating RSS feed:', error);
    return NextResponse.json({ error: 'Failed to generate RSS feed' }, { status: 500 });
  }
}
