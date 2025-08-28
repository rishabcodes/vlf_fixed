'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { LanguageToggle } from './LanguageToggle';

// Custom hook to find and observe portal targets
function usePortalTarget(selector: string) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Initial search
    const findTarget = () => {
      const element = document.querySelector(selector) as HTMLElement;
      setTarget(element);
      return element;
    };

    // Try immediate search
    const initialTarget = findTarget();
    
    if (!initialTarget) {
      // If not found, observe for changes
      const observer = new MutationObserver(() => {
        const newTarget = findTarget();
        if (newTarget) {
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }

    return () => {}; // No cleanup needed if target found immediately
  }, [selector]);

  return target;
}

// Custom hook for language persistence
function useLanguagePersistence() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Hydrate from localStorage and pathname on mount
  useEffect(() => {
    const storedLang = localStorage.getItem('vasquez.lang') as 'en' | 'es' | null;
    const pathLang = pathname?.startsWith('/es') ? 'es' : 'en';
    
    // Use stored preference if available, otherwise use path language
    const initialLang = storedLang || pathLang;
    setLanguage(initialLang);
    setIsHydrated(true);
  }, [pathname]);

  // Handle language change with navigation and persistence
  const handleLanguageChange = useCallback((newLang: 'en' | 'es') => {
    setLanguage(newLang);
    localStorage.setItem('vasquez.lang', newLang);

    // Navigate to appropriate route
    if (!pathname) return;

    let newPath: string;
    if (newLang === 'es') {
      // Switch to Spanish
      newPath = pathname.startsWith('/es') ? pathname : `/es${pathname}`;
    } else {
      // Switch to English
      newPath = pathname.startsWith('/es') ? pathname.replace('/es', '') || '/' : pathname;
    }

    if (newPath !== pathname) {
      router.push(newPath);
    }
  }, [pathname, router]);

  return {
    language,
    handleLanguageChange,
    isHydrated,
  };
}

export const LanguageTogglePortal: React.FC = () => {
  const pathname = usePathname();
  const { language, handleLanguageChange, isHydrated } = useLanguagePersistence();

  // Determine target selector based on route
  const targetSelector = pathname === '/' || pathname === '/es' 
    ? '[data-lang-anchor="hero"]'
    : '[data-lang-anchor="breadcrumbs"]';

  const portalTarget = usePortalTarget(targetSelector);
  
  // Fallback target for when no anchor is found
  const [fallbackTarget, setFallbackTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create fallback container if no portal target is found after a delay
    const timeoutId = setTimeout(() => {
      if (!portalTarget && !fallbackTarget) {
        const fallback = document.createElement('div');
        fallback.className = 'fixed top-[86px] right-6 z-[100]';
        fallback.setAttribute('data-lang-fallback', 'true');
        document.body.appendChild(fallback);
        setFallbackTarget(fallback);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      // Clean up fallback if portal target is found
      if (portalTarget && fallbackTarget) {
        fallbackTarget.remove();
        setFallbackTarget(null);
          }
};
  }, [portalTarget, fallbackTarget]);

  // Clean up fallback on unmount
  useEffect(() => {
    return () => {
      if (fallbackTarget) {
        fallbackTarget.remove();
          }
};
  }, [fallbackTarget]);

  // Don't render until hydrated to avoid mismatch
  if (!isHydrated) {
    return null;
  }

  const renderTarget = portalTarget || fallbackTarget;
  
  if (!renderTarget) {
    return null;
  }

  const isHeroPage = pathname === '/' || pathname === '/es';
  
  // Check if we're using the fallback
  const isFallback = renderTarget === fallbackTarget;
  
  const toggleElement = isFallback ? (
    // Fallback: Fixed positioning at top-right
    <LanguageToggle
      value={language}
      onChange={handleLanguageChange}
      className=""
    />
  ) : isHeroPage ? (
    // Hero page: Absolute positioning at top-right, fine-tuned position
    <div className="pointer-events-none absolute top-[86px] right-4 sm:right-8 md:right-12 z-[100]">
      <LanguageToggle
        value={language}
        onChange={handleLanguageChange}
        className=""
      />
    </div>
  ) : (
    // Other pages: Positioned in center-right of breadcrumb container
    <div className="pointer-events-none absolute inset-y-0 right-4 sm:right-8 md:right-12 flex items-center">
      <LanguageToggle
        value={language}
        onChange={handleLanguageChange}
        className=""
      />
    </div>
  );

  return createPortal(toggleElement, renderTarget);
};

export default LanguageTogglePortal;