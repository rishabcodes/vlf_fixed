import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

const practiceAreas = [
  // Immigration
  { slug: 'immigration', priority: 0.9 },
  { slug: 'immigration/family-based', priority: 0.8 },
  { slug: 'immigration/employment-based', priority: 0.8 },
  { slug: 'immigration/deportation-defense', priority: 0.8 },
  { slug: 'immigration/asylum', priority: 0.8 },
  { slug: 'immigration/citizenship', priority: 0.8 },
  { slug: 'immigration/green-cards', priority: 0.8 },
  { slug: 'immigration/visas', priority: 0.8 },
  { slug: 'immigration/daca', priority: 0.8 },
  { slug: 'immigration/appeals', priority: 0.7 },

  // Criminal Defense
  { slug: 'criminal-defense', priority: 0.9 },
  { slug: 'criminal-defense/dui', priority: 0.8 },
  { slug: 'criminal-defense/drug-charges', priority: 0.8 },
  { slug: 'criminal-defense/assault', priority: 0.8 },
  { slug: 'criminal-defense/theft', priority: 0.8 },
  { slug: 'criminal-defense/federal-crimes', priority: 0.8 },
  { slug: 'criminal-defense/white-collar', priority: 0.8 },
  { slug: 'criminal-defense/expungement', priority: 0.7 },

  // Personal Injury
  { slug: 'personal-injury', priority: 0.9 },
  { slug: 'personal-injury/car-accidents', priority: 0.8 },
  { slug: 'personal-injury/truck-accidents', priority: 0.8 },
  { slug: 'personal-injury/motorcycle-accidents', priority: 0.8 },
  { slug: 'personal-injury/slip-and-fall', priority: 0.8 },
  { slug: 'personal-injury/medical-malpractice', priority: 0.8 },
  { slug: 'personal-injury/wrongful-death', priority: 0.8 },
  { slug: 'personal-injury/workplace-injuries', priority: 0.8 },

  // Family Law
  { slug: 'family-law', priority: 0.9 },
  { slug: 'family-law/divorce', priority: 0.8 },
  { slug: 'family-law/child-custody', priority: 0.8 },
  { slug: 'family-law/child-support', priority: 0.8 },
  { slug: 'family-law/alimony', priority: 0.8 },
  { slug: 'family-law/property-division', priority: 0.8 },
  { slug: 'family-law/prenuptial-agreements', priority: 0.7 },
];

export async function GET() {
  const entries = practiceAreas
    .map(area => {
      const lastmod = new Date().toISOString();
      const urls = [
        `  <url>
    <loc>${baseUrl}/practice-areas/${area.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${area.priority}</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/es/areas-de-practica/${area.slug.replace('immigration', 'inmigracion').replace('criminal-defense', 'defensa-criminal').replace('personal-injury', 'lesiones-personales').replace('family-law', 'derecho-familiar')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${area.priority}</priority>
  </url>`,
      ];

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
