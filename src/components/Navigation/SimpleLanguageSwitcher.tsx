'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LanguageOption {
  code: 'en' | 'es';
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
  },
];

interface SimpleLanguageSwitcherProps {
  variant?: 'minimal' | 'toggle';
  showFlags?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function SimpleLanguageSwitcher({
  variant = 'minimal',
  showFlags = false,
  showLabels = true,
  className = '',
}: SimpleLanguageSwitcherProps) {
  const pathname = usePathname();
  const safePathname = pathname || '/';
  const currentLang: 'en' | 'es' = safePathname.startsWith('/es') ? 'es' : 'en';

  // Get the opposite language URL - simple and robust
  const getTargetUrl = (targetLang: 'en' | 'es'): string => {
    if (targetLang === currentLang) {
      return safePathname; // No change needed
    }
    
    // Simple language switching logic
    if (targetLang === 'es') {
      // Add /es prefix to switch to Spanish
      return `/es${safePathname}`;
    } else {
      // Remove /es prefix to switch to English
      return safePathname.replace(/^\/es/, '') || '/';
        }
};
  
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {languages.map(lang => {
          const isActive = currentLang === lang.code;
          const targetUrl = getTargetUrl(lang.code);

          return (
            <Link
              key={lang.code}

                href={targetUrl}

                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white cursor-default'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
              }`}
              aria-label={`Switch to ${lang.name}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={isActive ? (e) => e.preventDefault() : undefined}
            >
              {showFlags && lang.flag} {showLabels && lang.code.toUpperCase()}
            </Link>
          );
        })}
      </div>
    );
  }
  
  // Toggle variant
  if (variant === 'toggle') {
    const otherLang = languages.find(lang => lang.code !== currentLang);
    if (!otherLang) {
      return null;
    }
    
    const targetUrl = getTargetUrl(otherLang.code);
    
    return (
      <Link
        href={targetUrl}

                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${className}`}
        aria-label={`Switch to ${otherLang.name}`}
      >
        {showFlags && <span>{otherLang.flag}</span>}
        {showLabels && <span>{otherLang.name}</span>}
      </Link>
    );
  }
  
  return null;
}
