'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useLanguage() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Determine language from URL
    // Default to Spanish unless explicitly on English path
    const isEnglishPath = pathname?.startsWith('/en') ?? false;
    const detectedLanguage = isEnglishPath ? 'en' : 'es';

    setLanguage(detectedLanguage);
  }, [pathname, mounted]);

  // Return server-safe defaults during SSR
  if (!mounted) {
    const serverLanguage = getLanguageFromPath(pathname || '/');
    return {
      language: serverLanguage,
      isSpanish: serverLanguage === 'es',
      isEnglish: serverLanguage === 'en',
    };
  }

  return {
    language,
    isSpanish: language === 'es',
    isEnglish: language === 'en',
  };
}

// Server-side language detection
export function getLanguageFromPath(pathname: string): 'en' | 'es' {
  // Default to Spanish unless explicitly English
  return pathname.startsWith('/en') ? 'en' : 'es';
}
