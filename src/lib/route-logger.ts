import { logger } from '@/lib/safe-logger';

// Track missing routes to identify patterns
const missingRoutes = new Set<string>();

export function logMissingRoute(path: string, referrer?: string) {
  if (!missingRoutes.has(path)) {
    missingRoutes.add(path);
    logger.warn('Missing route accessed', {
      path,
      referrer,
      timestamp: new Date().toISOString(),
    });
  }
}

export function getMissingRoutes(): string[] {
  return Array.from(missingRoutes);
}

// Common route mappings for missing pages
export const missingRouteRedirects: Record<string, string> = {
  // Personal injury sub-pages that don't exist
  '/brain-injuries': '/practice-areas/personal-injury',
  '/spinal-cord-injuries': '/practice-areas/personal-injury',
  '/product-liability': '/practice-areas/personal-injury',

  // Immigration sub-pages
  '/humanitarian': '/practice-areas/immigration',
  '/family-based': '/practice-areas/immigration/family-based-relative',

  // Workers comp sub-pages
  '/workplace-accidents': '/practice-areas/workers-compensation',

  // Blog posts that might be accessed incorrectly
  '/immigration-update-florida': '/blog',
  '/immigration-update-north-carolina': '/blog',
};
