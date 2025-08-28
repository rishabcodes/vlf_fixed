import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { logMissingRoute, missingRouteRedirects } from '@/lib/route-logger';
import { headers } from 'next/headers';

// Common redirects map
const redirects: Record<string, string> = {
  services: '/practice-areas',
  testimonials: '/about#testimonials',
  resources: '/blog',
  'privacy-policy': '/legal/privacy-policy',
  'terms-of-service': '/legal/terms-of-service',
  terms: '/legal/terms-of-service',
  privacy: '/legal/privacy-policy',
  servicios: '/es/areas-de-practica',
  testimonios: '/es/acerca#testimonios',
  recursos: '/es/blog',
  privacidad: '/es/legal/politica-de-privacidad',
  terminos: '/es/legal/terminos-de-servicio',

  // Practice area redirects
  'family-based': '/areas-de-practica/immigration/family-based-relative',
  humanitarian: '/areas-de-practica/immigration/asylum-refugee-legal-help',
  'product-liability': '/areas-de-practica/lesiones-personales/responsabilidad-del-producto',
  'workplace-accidents': '/areas-de-practica/workers-compensation/workplace-accidents',
  'brain-injuries': '/areas-de-practica/personal-injury/brain-injuries',
  'spinal-cord-injuries': '/areas-de-practica/personal-injury/spinal-cord-injuries',
  'wrongful-death': '/areas-de-practica/personal-injury/wrongful-death',
  'medical-malpractice': '/areas-de-practica/personal-injury/medical-malpractice',
  'slip-and-fall': '/areas-de-practica/personal-injury/slip-and-fall',
  'truck-accidents': '/areas-de-practica/personal-injury/truck-accidents',

  // Workers Comp redirects - fix naming inconsistencies
  'repetitive-stress-injuries':
    '/areas-de-practica/workers-compensation/repetitive-stress-carpal-tunnel',
  'construction-injuries': '/areas-de-practica/workers-compensation/construction-site-injuries',
  'occupational-illness': '/areas-de-practica/workers-compensation/occupational-diseases',
  'third-party-claims': '/areas-de-practica/workers-compensation/third-party-injury-claims',
  'denied-claims': '/areas-de-practica/workers-compensation',
  'return-to-work': '/areas-de-practica/workers-compensation',
  'disability-benefits': '/areas-de-practica/workers-compensation',

  // Defensa Criminal redirects
  'white-collar-crimes': '/areas-de-practica/criminal-defense/white-collar',

  // Spanish practice area redirects
  'basado-en-familia': '/es/practice-areas/immigration/family-based',
  humanitario: '/es/practice-areas/immigration/humanitarian',
  'responsabilidad-producto': '/es/practice-areas/personal-injury/product-liability',
  'accidentes-trabajo': '/es/practice-areas/workers-compensation/workplace-accidents',
};

// Full static generation - no revalidation

// Generate all known routes at build time
export async function generateStaticParams() {
  // Return an empty array to let Next.js handle routes normally
  // This prevents the catch-all from interfering with other routes
  return [];
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ catchAll: string[] }>;
}): Promise<Metadata> {
  const { catchAll } = await params;
  const path = catchAll.join('/');

  // Handle location pages
  if (path.startsWith('locations/') || path.startsWith('ubicaciones/')) {
    const parts = path.split('/');
    const city = parts[2]
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: `${city} Abogados | Vasquez Law Firm`,
      description: `Top-rated attorneys serving ${city}. Inmigración, personal injury, criminal defense. Free consultation: 1-844-YO-PELEO`,
    };
  }

  // Handle blog pages
  if (path.includes('blog/')) {
    return {
      title: 'Blog | Vasquez Law Firm',
      description: 'Legal insights and updates from Vasquez Law Firm',
    };
  }

  return {
    title: 'Page Not Found | Vasquez Law Firm',
    description: 'The page you are looking for does not exist.',
  };
}

// Catch-all page handler
export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ catchAll: string[] }>;
}) {
  const { catchAll } = await params;
  const path = catchAll.join('/');
  const fullPath = `/${path}`;

  // Skip headers access during static generation
  let referrer = '';
  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PHASE !== 'phase-production-build'
  ) {
    try {
      const headersList = await headers();
      referrer = headersList.get('referer') || '';
    } catch (e) {
      // Headers not available during static generation
      referrer = '';
    }
  }

  // Check for missing route redirects first
  if (missingRouteRedirects[fullPath]) {
    redirect(missingRouteRedirects[fullPath]);
  }

  // Check for common redirects
  if (redirects[path]) {
    redirect(redirects[path]);
  }

  // Handle variations with trailing slashes
  const pathWithoutSlash = path.endsWith('/') ? path.slice(0, -1) : path;
  if (redirects[pathWithoutSlash]) {
    redirect(redirects[pathWithoutSlash]);
  }

  // Check if it's just the first segment that matches
  const firstSegment = catchAll?.[0];
  if (firstSegment && redirects[firstSegment]) {
    redirect(redirects[firstSegment]);
  }

  // Handle immigration-update-* routes -> redirect to blog
  if (path.startsWith('immigration-update-')) {
    redirect(`/blog/${path}`);
  }

  // Handle Spanish immigration update routes
  if (path.startsWith('actualizacion-inmigracion-')) {
    redirect(`/es/blog/${path}`);
  }

  // Handle common sub-pages that might be accessed directly
  if (path.includes('/') && !path.startsWith('blog/') && !path.startsWith('es/')) {
    // Try to construct practice area paths
    const segments = catchAll;
    if (segments.length === 2) {
      const [area, subpage] = segments;
      // Common practice area mappings
      const areaMap: Record<string, string> = {
        immigration: 'immigration',
        inmigracion: 'immigration',
        'personal-injury': 'personal-injury',
        'lesiones-personales': 'personal-injury',
        'workers-compensation': 'workers-compensation',
        'compensacion-laboral': 'workers-compensation',
        'criminal-defense': 'criminal-defense',
        'defensa-criminal': 'criminal-defense',
        'family-law': 'family-law',
        'derecho-familia': 'family-law',
      };

      if (area && areaMap[area]) {
        redirect(`/practice-areas/${areaMap[area]}/${subpage}`);
    }

  // Log missing route for monitoring
  logMissingRoute(fullPath, referrer);

  // This should rarely be hit as most routes should have their own pages
  // Return 404 for truly unknown routes
  notFound();
}
