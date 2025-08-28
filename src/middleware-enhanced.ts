import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es'];
const defaultLocale = 'es';

// Pages that should not be redirected
const publicFiles = /\.(.*)$/;
const excludedPaths = ['/api', '/_next', '/images', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

function getLocale(request: NextRequest): string {
  // 1. Check if locale is in URL
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameLocale) return pathnameLocale;

  // 2. Check cookie
  const cookieLocale = request.cookies.get('preferred-language')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  const detectedLocale = locales.find(locale => acceptLanguage.toLowerCase().includes(locale));
  if (detectedLocale) return detectedLocale;

  // 4. Default to English
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const pathname = request.nextUrl.pathname;

  // Skip excluded paths
  if (publicFiles.test(pathname) || excludedPaths.some(path => pathname.startsWith(path))) {
    return addSecurityHeaders(NextResponse.next(), startTime);
  }

  // Get locale
  const locale = getLocale(request);
  const pathnameHasLocale = locales.some(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  );

  // Redirect if no locale in pathname
  if (!pathnameHasLocale) {
    // For root path, redirect based on detected locale
    if (pathname === '/') {
      if (locale !== defaultLocale) {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }
      // For default locale (en), keep clean URLs without /en prefix
      return addSecurityHeaders(NextResponse.next(), startTime);
    }

    // For other paths, add locale prefix only for non-default languages
    if (locale !== defaultLocale) {
      return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
  }

  // Handle locale in pathname
  if (pathnameHasLocale) {
    const pathLocale = pathname.split('/')[1];

    // Remove /en prefix to keep clean URLs for English
    if (pathLocale === defaultLocale) {
      const newPathname = pathname.slice(3) || '/';
      return NextResponse.redirect(new URL(newPathname, request.url));
    }

    // For Spanish, check if the page exists
    // This is a placeholder - in production, you'd check against a list of translated pages
    const spanishPageExists = checkSpanishPageExists(pathname);
    if (!spanishPageExists && pathLocale === 'es') {
      // Redirect to English version if Spanish page doesn't exist
      const englishPath = pathname.slice(3) || '/';
      const response = NextResponse.redirect(new URL(englishPath, request.url));
      response.cookies.set('show-translation-notice', 'true', {
        maxAge: 60, // Show notice for 1 minute
      });
      return response;
    }
  }

  const response = addSecurityHeaders(NextResponse.next(), startTime);

  // Set language cookie
  response.cookies.set('preferred-language', locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  // Add locale header for components to use
  response.headers.set('x-locale', locale);

  return response;
}

function addSecurityHeaders(response: NextResponse, startTime: number): NextResponse {
  // HSTS
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // X-Frame-Options
  response.headers.set('X-Frame-Options', 'DENY');

  // X-Content-Type-Options
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // X-XSS-Protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://api.openai.com wss://*.vasquezlawnc.com;"
  );

  // Permissions Policy
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');

  // Add request ID for tracking
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-ID', requestId);

  // Add response time
  response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`);

  return response;
}

function checkSpanishPageExists(pathname: string): boolean {
  // List of Spanish pages that exist
  // In production, this would be dynamically generated or checked against the file system
  const existingSpanishPages = [
    '/es',
    '/es/areas-de-practica',
    '/es/areas-de-practica/inmigracion',
    '/es/areas-de-practica/lesiones-personales',
    '/es/areas-de-practica/compensacion-laboral',
    '/es/areas-de-practica/defensa-criminal',
    '/es/areas-de-practica/derecho-familia',
    '/es/abogados',
    '/es/contacto',
    '/es/blog',
    // Add more as they are created
  ];

  return existingSpanishPages.some(page => pathname.startsWith(page));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
