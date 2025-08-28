import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

const landingPages = [
  // Location-based landing pages
  { path: '/locations/houston', priority: 0.8 },
  { path: '/locations/dallas', priority: 0.8 },
  { path: '/locations/austin', priority: 0.8 },
  { path: '/locations/san-antonio', priority: 0.8 },
  { path: '/locations/fort-worth', priority: 0.8 },
  { path: '/locations/el-paso', priority: 0.8 },

  // Service-specific landing pages
  { path: '/immigration-lawyer-houston', priority: 0.9 },
  { path: '/criminal-defense-attorney-dallas', priority: 0.9 },
  { path: '/personal-injury-lawyer-austin', priority: 0.9 },
  { path: '/deportation-defense-attorney', priority: 0.9 },
  { path: '/dui-lawyer-houston', priority: 0.8 },
  { path: '/car-accident-attorney-texas', priority: 0.8 },

  // Campaign landing pages
  { path: '/free-consultation', priority: 0.9 },
  { path: '/emergency-legal-help', priority: 0.8 },
  { path: '/24-hour-lawyer', priority: 0.8 },
  { path: '/no-win-no-fee', priority: 0.8 },
  { path: '/virtual-consultation', priority: 0.7 },

  // Special pages
  { path: '/covid-19-updates', priority: 0.6 },
  { path: '/legal-news', priority: 0.7 },
  { path: '/community', priority: 0.6 },
  { path: '/careers', priority: 0.5 },
  { path: '/referrals', priority: 0.6 },
];

export async function GET() {
  const entries = landingPages
    .map(page => {
      const lastmod = new Date().toISOString();
      const urls = [
        `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
      ];

      // Add Spanish versions for appropriate pages
      const spanishPath = page.path
        .replace('/locations/', '/es/ubicaciones/')
        .replace('/immigration-lawyer-', '/es/abogado-inmigracion-')
        .replace('/criminal-defense-attorney-', '/es/abogado-defensa-criminal-')
        .replace('/personal-injury-lawyer-', '/es/abogado-lesiones-personales-')
        .replace('/deportation-defense-attorney', '/es/abogado-defensa-deportacion')
        .replace('/dui-lawyer-', '/es/abogado-dui-')
        .replace('/car-accident-attorney-', '/es/abogado-accidentes-auto-')
        .replace('/free-consultation', '/es/consulta-gratis')
        .replace('/emergency-legal-help', '/es/ayuda-legal-emergencia')
        .replace('/24-hour-lawyer', '/es/abogado-24-horas')
        .replace('/no-win-no-fee', '/es/sin-ganar-sin-pagar')
        .replace('/virtual-consultation', '/es/consulta-virtual')
        .replace('/legal-news', '/es/noticias-legales')
        .replace('/community', '/es/comunidad')
        .replace('/careers', '/es/carreras')
        .replace('/referrals', '/es/referencias');

      if (spanishPath !== page.path && !page.path.includes('covid-19')) {
        urls.push(`  <url>
    <loc>${baseUrl}${spanishPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
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
