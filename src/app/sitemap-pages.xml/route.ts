import { NextResponse } from 'next/server';
import { FileSystemPageDiscovery, type DiscoveredPage } from '@/lib/sitemap/page-discovery';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

export async function GET() {
  const discovery = new FileSystemPageDiscovery();
  const allPages = await discovery.discoverAllPages();

  // Filter for static pages (not blog, attorneys, etc.)
  const staticPages: DiscoveredPage[] = [];

  for (const [, pair] of allPages) {
    if (
      pair.en &&
      !pair.en.path.includes('/blog') &&
      !pair.en.path.includes('/attorneys') &&
      !pair.en.path.includes('/es/') &&
      pair.en.type === 'static'
    ) {
      staticPages.push(pair.en);
    }
  }

  const xml = await discovery.generateSitemapXML(staticPages, baseUrl);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
