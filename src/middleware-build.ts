// Build-time middleware to prevent static generation of location pages
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs at build time to prevent static generation
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Force dynamic rendering for location and blog pages
  if (pathname.includes('/locations/') || 
      pathname.includes('/ubicaciones/') ||
      pathname.includes('/blog/') ||
      pathname.includes('/es/blog/')) {
    
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('x-middleware-rewrite', request.nextUrl.pathname);
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/locations/:path*',
    '/es/ubicaciones/:path*',
    '/blog/:path*',
    '/es/blog/:path*',
  ],
};