import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

const resources = [
  // Legal resources
  { path: '/resources', priority: 0.7 },
  { path: '/resources/immigration-guides', priority: 0.7 },
  { path: '/resources/legal-forms', priority: 0.6 },
  { path: '/resources/faq', priority: 0.7 },
  { path: '/resources/glossary', priority: 0.6 },
  { path: '/resources/videos', priority: 0.6 },
  { path: '/resources/calculators', priority: 0.7 },

  // Tools and utilities
  { path: '/tools/case-evaluation', priority: 0.8 },
  { path: '/tools/document-checklist', priority: 0.7 },
  { path: '/tools/fee-calculator', priority: 0.7 },
  { path: '/tools/appointment-scheduler', priority: 0.8 },

  // Client resources
  { path: '/client-portal', priority: 0.6 },
  { path: '/testimonials', priority: 0.7 },
  { path: '/case-results', priority: 0.8 },
  { path: '/reviews', priority: 0.7 },
];

export async function GET() {
  const entries = resources
    .map(resource => {
      const lastmod = new Date().toISOString();
      const urls = [
        `  <url>
    <loc>${baseUrl}${resource.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${resource.priority}</priority>
  </url>`,
      ];

      // Add Spanish version
      const esPath = resource.path
        .replace('/resources', '/es/recursos')
        .replace('/tools', '/es/herramientas')
        .replace('/client-portal', '/es/portal-cliente')
        .replace('/testimonials', '/es/testimonios')
        .replace('/case-results', '/es/resultados')
        .replace('/reviews', '/es/resenas');

      if (esPath !== resource.path) {
        urls.push(`  <url>
    <loc>${baseUrl}${esPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${resource.priority}</priority>
  </url>`);
      }

      return urls.join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
