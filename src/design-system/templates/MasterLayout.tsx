'use client';

import React, { useState, useEffect } from 'react';
import { ConsistentHeader } from '../components/ConsistentHeader';
import { ConsistentFooter } from '../components/ConsistentFooter';
import { TransparentNavbar } from '@/components/TransparentNavbar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NewsTicker } from '@/components/ui/news-ticker';
import { Banner } from '@/components/ui/banner';
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';
// import { componentLogger } from '@/lib/safe-logger';

interface MasterLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'hero' | 'minimal';
  showBreadcrumbs?: boolean;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({
  children,
  variant = 'default',
  showBreadcrumbs = true,
}) => {
  const pathname = usePathname();
  const safePathname = pathname || '/';
  const [hideTicker, setHideTicker] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Determine current language from pathname
  const currentLanguage: 'en' | 'es' = safePathname.startsWith('/es') ? 'es' : 'en';

  // Mark as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll for ticker
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide ticker when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideTicker(true);
      } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setHideTicker(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mounted]);

  // Debug: Log when MasterLayout renders (only in development)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[MasterLayout] Mounted:', {
        variant,
        currentLanguage,
        pathname: safePathname,
      });
    }
  }, [variant, currentLanguage, safePathname]);

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const paths = safePathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: currentLanguage === 'es' ? 'Inicio' : 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path, _index) => {
      currentPath += `/${path}`;
      const name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, href: currentPath });
    });

    return breadcrumbs;
  };

  // Check if we're on the homepage
  const isHomepage = safePathname === '/' || safePathname === '/es';

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Use TransparentNavbar uniformly on ALL pages */}
      <TransparentNavbar 
        language={currentLanguage} 
        isHomepage={isHomepage}
        showBreadcrumbs={showBreadcrumbs}
        pathname={safePathname}
      />

      {/* Main content area with proper padding */}
      <div className={isHomepage ? 'pt-0' : 'pt-[140px]'}>
        {/* Padding accounts for fixed navbar height on non-homepage pages */}

        <main className="flex-grow relative">
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
        <ConsistentFooter language={currentLanguage} />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  );
};

export default MasterLayout;
