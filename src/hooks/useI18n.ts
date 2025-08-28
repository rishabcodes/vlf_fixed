'use client';

import { usePathname, useRouter } from 'next/navigation';
import { logger } from '@/lib/safe-logger';
import { useEffect, useState } from 'react';
import { getTranslations } from '@/lib/i18n';

export function useI18n() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine current language from pathname
  const currentLanguage: 'en' | 'es' = pathname?.startsWith('/es') ? 'es' : 'en';

  const [translations, setTranslations] = useState(() => getTranslations(currentLanguage));

  useEffect(() => {
    setTranslations(getTranslations(currentLanguage));
  }, [currentLanguage]);

  const changeLanguage = (newLanguage: 'en' | 'es') => {
    if (newLanguage === currentLanguage) return;

    // Set cookie for language preference
    if (typeof document !== 'undefined') {
      document.cookie = `preferred-language=${newLanguage};path=/;max-age=31536000;samesite=lax`;
    }

    // Calculate new path
    let newPath = pathname || '/';

    // Remove existing language prefix
    if (pathname?.startsWith('/es/')) {
      newPath = pathname.slice(3) || '/';
    } else if (pathname?.startsWith('/en/')) {
      newPath = pathname.slice(3) || '/';
    }

    // Add new language prefix for Spanish
    if (newLanguage === 'es') {
      newPath = `/es${newPath === '/' ? '' : newPath}`;
    }

    // Navigate to new path
    if (newPath) {
      router.push(newPath);
      }
};

  return {
    t: translations,
    language: currentLanguage,
    changeLanguage,
  };
}

// Hook for using translations in components
export function useTranslation() {
  const { t, language } = useI18n();

  return {
    t,
    language,
    // Helper function to get nested translations
    translate: (key: string) => {
      const keys = key.split('.');
      let value: unknown = t;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          logger.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      return value;
    },
  };
}
