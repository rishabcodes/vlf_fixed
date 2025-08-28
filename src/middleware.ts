import { NextResponse } from 'next/server';
import { securityLogger } from '@/lib/safe-logger';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// List of supported locales
const locales = ['en', 'es'];
const defaultLocale = 'en'; // Changed to match next.config.js

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
  // Check if locale is already in the path
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return pathname.split('/')[1] || defaultLocale;
  }

  // Check cookie for preferred language
  const cookieLocale = request.cookies.get('preferred-language')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const detectedLocale = acceptLanguage
      .split(',')
      .map(lang => {
        const parts = lang.split(';')[0];
        if (parts) {
          const langCode = parts.split('-')[0];
          return langCode ? langCode.trim() : '';
        }
        return '';
      })
      .filter(lang => lang && locales.includes(lang))[0];

    if (detectedLocale) {
      return detectedLocale;
    }
  }

  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.') || // files with extensions
    pathname.startsWith('/favicon')
  ) {
    // Add CORS headers for image requests to prevent 401 errors
    if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
      const response = NextResponse.next();
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      return response;
    }
    return NextResponse.next();
  }

  // Handle authentication for protected routes
  const protectedPaths = ['/dashboard', '/admin', '/cases'];
  const isProtectedPath = protectedPaths.some(
    path =>
      pathname.startsWith(path) ||
      pathname.startsWith(`/es${path}`) ||
      pathname.startsWith(`/en${path}`)
  );

  if (isProtectedPath) {
    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        // Redirect to sign in page with callback
        const signInUrl = new URL('/auth/signin', request.url);
        signInUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(signInUrl);
      }

      // Check admin access
      if (pathname.includes('/admin') && token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // Log error but don't block access if auth check fails
      securityLogger.error('[Middleware] Auth check error:', error instanceof Error ? error.message : String(error));
      // Continue to allow the app to work even if auth is broken
    }
  }

  // Handle locale routing
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get the preferred locale
  const locale = getLocale(request);

  // For Spanish, redirect to /es path if not already there
  if (locale === 'es' && !pathname.startsWith('/es')) {
    const newUrl = new URL(`/es${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // For English (default), continue without prefix
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
