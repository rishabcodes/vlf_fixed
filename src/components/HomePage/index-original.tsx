'use client';

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';

// Removed framer-motion for performance - using CSS transitions instead

// Critical component loaded immediately
import ModernHero from '../hero/ModernHero';
import { TestimonialsSection } from './TestimonialsSection';

// Lazy load non-critical components for better performance
const FirmHighlights = dynamic(() => import('./FirmHighlights'), {
  loading: () => <div className="h-96" />,
  ssr: false
});
const OfficeLocations = dynamic(() => import('./OfficeLocations'), {
  loading: () => <div className="h-96" />,
  ssr: false
});
const ResultsShowcase = dynamic(() => import('./ResultsShowcase'), {
  loading: () => <div className="h-96" />,
  ssr: false
});
const PracticeAreasShowcase = dynamic(() => import('./PracticeAreasShowcase'), {
  loading: () => <div className="h-96" />,
  ssr: false
});

// BACKUP: VirtualParalegal temporarily disabled - component saved in _backup_virtualparalegal/
// const VirtualParalegal = dynamic(() => import('../VirtualParalegal'), {
//   loading: () => null,
// });

interface HomePageProps {
  language?: 'en' | 'es';
}

const HomePage: React.FC<HomePageProps> = ({ language: initialLanguage = 'en' }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Detect current language from URL path
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>(initialLanguage);
  
  useEffect(() => {
    // Update language based on current path
    if (pathname?.startsWith('/es')) {
      setCurrentLanguage('es');
    } else {
      setCurrentLanguage('en');
    }
  }, [pathname]);
  
  // Use the current language for display
  const language = currentLanguage;
  
  // BACKUP: VirtualParalegal state disabled
  // const [showVirtualParalegal, setShowVirtualParalegal] = useState(false);

  // Navigate to appropriate language route
  const handleLanguageChange = useCallback((lang: 'en' | 'es') => {
    if (lang === 'es') {
      router.push('/es');
    } else {
      router.push('/');
    }
  }, [router]);

  // BACKUP: VirtualParalegal toggle disabled
  // const handleVirtualParalegalToggle = useCallback(() => {
  //   setShowVirtualParalegal(prev => !prev);
  // }, []);

  return (
    <div className="min-h-screen bg-mesh-dark relative overflow-hidden">
      {/* Floating gradient orbs removed for performance - backup in navigation-fix-2025-08-13 */}
      {/* Language Toggle moved to MasterLayout for global availability */}

      {/* Virtual Paralegal Trigger - Removed to prevent duplicate chat widgets */}

      {/* Page Sections */}
      <ModernHero language={language} />

      {/* Trust Indicators for Spanish */}
      {language === 'es' && (
        <section className="bg-gradient-to-b from-black/95 via-burgundy-950/10 to-black py-12 relative">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  number: '60+',
                  label: 'Años de Experiencia',
                },
                { number: '30K+', label: 'Clientes Ayudados' },
                { number: '4', label: 'Ubicaciones' },
                { number: '24/7', label: 'Disponible' },
              ].map((stat, index) => (
                <div
                  key={index}

                className="text-center"
                >
                  <div
                className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FirmHighlights language={language} />
      {language === 'es' && <PracticeAreasShowcase language={language} />}
      <OfficeLocations language={language} />
      <ResultsShowcase language={language} />
      <TestimonialsSection language={language} />

      {/* BACKUP: Virtual Paralegal Modal - temporarily disabled */}
      {/* {showVirtualParalegal && (
        <VirtualParalegal language={language} onClose={() => setShowVirtualParalegal(false)} />
      )} */}

      {/* Background Effects removed for performance */}
    </div>
  );
};

export default HomePage;
