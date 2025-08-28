'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { usePathname } from 'next/navigation';

interface PageWrapperProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default function PageWrapper({ children, showNavigation = true }: PageWrapperProps) {
  const pathname = usePathname();
  
  // Determine language from URL path
  const language: 'en' | 'es' = pathname?.startsWith('/es') ? 'es' : 'en';

  // Don't show navigation on homepage
  const isHomePage = pathname === '/';

  if (isHomePage || !showNavigation) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Header with contact info */}
      <Header language={language} />

      {/* Page content */}
      {children}

      {/* Footer */}
      <Footer language={language} />
    </>
  );
}
