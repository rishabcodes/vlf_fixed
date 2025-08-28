'use client';

import { usePathname, useRouter } from 'next/navigation';
import { logger } from '@/lib/safe-logger';
import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { HreflangGenerator } from '@/components/SEO/HreflangGenerator';
import { hasSpanishVersion } from '@/components/SEO/DynamicHreflang';

interface LanguageOption {
  code: 'en' | 'es';
  name: string;
  flag: string;
  locale: string;
}

const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    locale: 'en-US',
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    locale: 'es-US',
  },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'toggle' | 'minimal';
  showFlags?: boolean;
  showLabels?: boolean;
}

export function LanguageSwitcher({
  className = '',
  variant = 'dropdown',
  showFlags = true,
  showLabels = true,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Handle null pathname
  const safePathname = pathname || '/';

  // Determine current language
  const currentLang: 'en' | 'es' = safePathname.startsWith('/es') ? 'es' : 'en';
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  // Check if current page has translations
  const pageHasSpanishVersion = hasSpanishVersion(safePathname);

  // Get available languages for current page
  const availableLanguages = languages.filter(lang => {
    if (lang.code === 'en') return true; // English is always available
    if (lang.code === 'es') return pageHasSpanishVersion;
    return false;
  });

  // Handle language switch
  const handleLanguageSwitch = (targetLang: 'en' | 'es') => {
    if (targetLang === currentLang) {
      setIsOpen(false);
      return;
    }

    try {
      // Simple and robust language switching logic
      if (targetLang === 'es') {
        // Switching to Spanish
        if (safePathname.startsWith('/es')) {
          // Already on Spanish path, shouldn't happen
          return;
        }
        // Add /es prefix to current path
        const newPath = `/es${safePathname}`;
        router.push(newPath);
      } else {
        // Switching to English
        if (!safePathname.startsWith('/es')) {
          // Already on English path, shouldn't happen
          return;
        }
        // Remove /es prefix from current path
        const newPath = safePathname.replace(/^\/es/, '') || '/';
        router.push(newPath);
      }
    } catch (error) {
      logger.error('Error switching language:', error);
      // More user-friendly fallback: stay on current page
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {availableLanguages.map(lang => (
          <button
            key={lang.code}

                onClick={() => handleLanguageSwitch(lang.code)}

                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
              currentLang === lang.code
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
            }` aria-label={`Switch to ${lang.name}` disabled={currentLang === lang.code}
          >
            {showFlags && lang.flag} {showLabels && lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'toggle' && availableLanguages.length === 2) {
    const otherLang = availableLanguages.find(lang => lang.code !== currentLang);

    if (!otherLang) return null;

    return (
      <button
        onClick={() => handleLanguageSwitch(otherLang.code)}

                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${className}` aria-label={`Switch to ${otherLang.name}`}
      >
        <GlobeAltIcon className="w-4 h-4" />
        {showFlags && <span>{otherLang.flag}</span>}
        {showLabels && <span>{otherLang.name}</span>}
      </button>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}

                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        aria-expanded={isOpen aria-haspopup="true"
        aria-label="Select language"
      >
        <GlobeAltIcon className="w-4 h-4" />
        {showFlags && currentLanguage && <span>{currentLanguage.flag}</span>}
        {showLabels && currentLanguage && <span>{currentLanguage.name}</span>}
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}

                aria-hidden="true" />

          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {availableLanguages.map(lang => (
                <button
                  key={lang.code}

                onClick={() => handleLanguageSwitch(lang.code)}

                className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${
                    currentLang === lang.code
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }` role="menuitem"
                  disabled={currentLang === lang.code}
                >
                  <span className="mr-3">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-xs text-gray-500">{lang.locale}</div>
                  </div>
                  {currentLang === lang.code && (
                    <div className="ml-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}

              {!pageHasSpanishVersion && currentLang === 'en' && (
                <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-100">
                  Spanish translation not available for this page
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * SEO-friendly language links for footer or header
 */
export function LanguageLinks({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const safePathname = pathname || '/';
  const currentLang: 'en' | 'es' = safePathname.startsWith('/es') ? 'es' : 'en';
  const hreflangEntries = HreflangGenerator.generateHreflangEntries(safePathname);

  // Filter out x-default and get unique language entries
  const languageUrls = hreflangEntries
    .filter(entry => entry.hreflang !== 'x-default' && !entry.hreflang.includes('-'))
    .reduce(
      (acc, entry) => {
        if (!acc.find(item => item.hreflang === entry.hreflang)) {
          acc.push(entry);
        }
        return acc;
      },
      [] as typeof hreflangEntries
    );

  const handleLanguageClick = (entry: typeof hreflangEntries[0], event: React.MouseEvent) => {
    event.preventDefault();
    const targetLang = entry.hreflang as 'en' | 'es';
    
    // Use the same simple logic as the main language switcher
    if (targetLang === 'es' && !safePathname.startsWith('/es')) {
      router.push(`/es${safePathname}`);
    } else if (targetLang === 'en' && safePathname.startsWith('/es')) {
      const newPath = safePathname.replace(/^\/es/, '') || '/';
      router.push(newPath);
        }
};

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {languageUrls.map(entry => {
        const lang = languages.find(l => l.code === entry.hreflang);
        if (!lang) return null;

        const isActive = currentLang === lang.code;

        return (
          <button
            key={entry.hreflang}

                onClick={(e) => handleLanguageClick(entry, e)}

                className={`flex items-center space-x-1 text-sm transition-colors ${
              isActive ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-primary-600'
            }` aria-label={`Switch to ${lang.name}` aria-current={isActive ? 'page' : undefined disabled={isActive}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        );
      })}
    </div>
  );
}
}
}
}
}
}
}
}
}
