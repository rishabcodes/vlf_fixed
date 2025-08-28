'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: string) => {
    if (!pathname) return;
    const currentLang = pathname.startsWith('/es') ? 'es' : 'en';
    
    if (currentLang === lang) return;

    let newPath = pathname;
    
    if (lang === 'es') {
      // Switch to Spanish
      if (!pathname.startsWith('/es')) {
        newPath = `/es${pathname}`;
      }
    } else {
      // Switch to English
      if (pathname.startsWith('/es')) {
        newPath = pathname.replace(/^\/es/, '') || '/';
      }
    }

    router.push(newPath);
  };

  const currentLang = pathname?.startsWith('/es') ? 'es' : 'en';

  return (
    <div className={`flex space-x-2 ${className}`}>
      <button
        onClick={() => handleLanguageChange('en')}

                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLang === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('es')}

                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          currentLang === 'es'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
