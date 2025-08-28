import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const baseUrl = 'https://www.vasquezlawnc.com';

  // TODO: Replace with actual blog post data from your database
  // This is a placeholder structure
  const blogPosts = [
    {
      slug: '7-proven-strategies-that-immigration-lawyers-use-to-win-complex-cases',
      lastModified: '2024-01-15',
      title: '7 Proven Strategies That Immigration Lawyers Use to Win Complex Cases',
      image: '/images/blog/immigration-strategies.jpg',
    },
    {
      slug: 'top-immigration-lawyer-explains-5-key-signs-your-status-is-at-risk',
      lastModified: '2024-01-10',
      title: 'Top Immigration Lawyer Explains 5 Key Signs Your Status Is at Risk',
      image: '/images/blog/immigration-status-risk.jpg',
    },
    {
      slug: 'common-legal-mistakes-to-avoid-after-a-car-accident',
      lastModified: '2024-01-05',
      title: 'Common Legal Mistakes to Avoid After a Car Accident',
      image: '/images/blog/car-accident-mistakes.jpg',
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${blogPosts
  .map(
    post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <news:news>
      <news:publication>
        <news:name>Vasquez Law Firm Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${post.lastModified}</news:publication_date>
      <news:title>${post.title}</news:title>
    </news:news>
    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:caption>${post.title}</image:caption>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
