import { NextResponse } from 'next/server';
import { FileSystemPageDiscovery, type DiscoveredPage } from '@/lib/sitemap/page-discovery';

export const dynamic = 'force-static';
export const revalidate = false;

const baseUrl = 'https://www.vasquezlawnc.com';

export async function GET() {
  const discovery = new FileSystemPageDiscovery();
  const allPages = await discovery.discoverAllPages();

  // Collect all Spanish pages
  const spanishPages: DiscoveredPage[] = [];

  for (const [, pair] of allPages) {
    if (pair.es) {
      spanishPages.push(pair.es);
    }
  }

  const xml = await discovery.generateSitemapXML(spanishPages, baseUrl);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
