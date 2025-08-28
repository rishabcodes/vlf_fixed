'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Check if current path is Spanish
    if (pathname?.startsWith('/es')) {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  }, [pathname]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    let newPath;

    if (newLanguage === 'es') {
      if (pathname === '/') {
        newPath = '/es';
      } else {
        newPath = `/es${pathname}`;
      }
    } else {
      // Remove /es prefix only if it's at the beginning
      if (pathname?.startsWith('/es/')) {
        newPath = pathname.substring(3); // Remove '/es' prefix
      } else if (pathname === '/es') {
        newPath = '/';
      } else {
        newPath = pathname || '/';
      }
    }

    router.push(newPath);
  };

  return (
    <button onClick={toggleLanguage} className="flex items-center space-x-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-all"
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium">{language === 'en' ? 'ES' : 'EN'}</span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    </button>
  );
}
