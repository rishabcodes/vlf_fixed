/**
 * Fix for revalidation issues during build
 * This ensures proper URL construction for Next.js cache revalidation
 */

// Get the correct app URL based on environment
export function getAppUrl(): string {
  // In production, use the production URL
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://www.vasquezlawnc.com';
  }

  // In preview, use the Vercel URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 3000}`;
  }

  // Fallback to the configured URL or production URL
  return process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com';
}

// Override the URL for revalidation during build
if (typeof process !== 'undefined' && process.env.NEXT_PHASE === 'phase-production-build') {
  // During build, use a valid URL to prevent localhost:undefined errors
  process.env.NEXT_PUBLIC_APP_URL = 'https://www.vasquezlawnc.com';
}
