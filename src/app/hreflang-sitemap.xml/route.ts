import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

export async function GET() {
  // Basic hreflang sitemap for the main pages
  const pages = [
    { path: '/', priority: 1.0 },
    { path: '/about', priority: 0.9 },
    { path: '/practice-areas', priority: 0.9 },
    { path: '/attorneys', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/blog', priority: 0.7 },
    { path: '/resources', priority: 0.7 },
  ];

  const entries = pages
    .map(page => {
      const lastmod = new Date().toISOString();
      return `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.path}" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page.path === '/' ? '' : page.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.path}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
