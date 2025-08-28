import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';
import { apiLogger } from '@/lib/safe-logger';
import { SEOOptimizationService } from '@/services/seo-optimization';

export async function GET() {
  try {
    const seoService = new SEOOptimizationService();
    const sitemap = await seoService.generateHreflangSitemap();

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    apiLogger.error('Error generating hreflang sitemap:', error);

    // Return a basic sitemap
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com';
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
  </url>
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
