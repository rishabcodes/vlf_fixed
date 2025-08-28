/**
 * Example integration for app/layout.tsx
 * 
 * Replace the existing header implementation with:
 * 
 * import { ModernHeader } from '@/components/ModernHeader';
 * import { AnnouncementBar } from '@/components/AnnouncementBar';
 * 
 * Then in your layout:
 * 
 * <body>
 *   <AnnouncementBar />
 *   <ModernHeader />
 *   {children}
 * </body>
 */

'use client';

import React from 'react';
import { ModernHeader } from './ModernHeader';
import { AnnouncementBar } from './AnnouncementBar';

export function ModernHeaderExample() {
  const handleLanguageChange = (lang: 'en' | 'es') => {
    // Handle language change - integrate with your i18n system
    console.log('Language changed to:', lang);
    
    // Example: redirect to language-specific route
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (lang === 'es' && !currentPath.startsWith('/es')) {
        window.location.href = `/es${currentPath}`;
      } else if (lang === 'en' && currentPath.startsWith('/es')) {
        window.location.href = currentPath.replace('/es', '');
      }
    }
  };

  return (
    <>
      <AnnouncementBar 
        initiallyOpen={true}
        message="YO PELEO™ NEWS: New immigration law changes affecting DACA recipients"
        linkText="Read more →"
        linkHref="/blog/immigration-updates"
      />
      <ModernHeader 
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
}