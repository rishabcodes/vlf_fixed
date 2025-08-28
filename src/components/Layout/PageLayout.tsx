'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NewsTicker } from '@/components/ui/news-ticker';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved language preference only after mount
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferredLanguage') as 'en' | 'es' | null;
      if (savedLang) {
        setLanguage(savedLang);
      } else {
        // Check browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('es')) {
          setLanguage('es');
        }
      }
    }
  }, []);

  const handleLanguageChange = (lang: 'en' | 'es') => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NewsTicker locale={language} />
      <Header language={language} />
      <main className="flex-grow">{children}</main>
      <Footer language={language} />
    </div>
  );
};

export default PageLayout;
