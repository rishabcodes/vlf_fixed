import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

export async function GET() {
  // Sub-sitemaps for better organization and performance
  const sitemaps = [
    { loc: `${baseUrl}/sitemap-complete.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-locations.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-practice-areas.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-blog.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-near-me.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-attorneys.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-en.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-es.xml`, lastmod: new Date().toISOString() },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
