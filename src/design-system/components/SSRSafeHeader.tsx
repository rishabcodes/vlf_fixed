'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '../constants';
import { SimpleLanguageSwitcher } from '@/components/Navigation/SimpleLanguageSwitcher';

interface SSRSafeHeaderProps {
  language: 'en' | 'es';
  variant?: 'solid' | 'transparent';
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

export const SSRSafeHeader: React.FC<SSRSafeHeaderProps> = ({
  language,
  variant = 'solid',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: { en: NavigationItem[]; es: NavigationItem[] } = {
    en: [
      { name: 'Home', href: '/' },
      {
        name: 'Practice Areas',
        href: '/practice-areas',
        submenu: [
          { name: 'Immigration Law', href: '/practice-areas/immigration' },
          { name: 'Personal Injury', href: '/practice-areas/personal-injury' },
          { name: "Workers' Compensation", href: '/practice-areas/workers-compensation' },
          { name: 'Criminal Defense', href: '/practice-areas/criminal-defense' },
          { name: 'Family Law', href: '/practice-areas/family-law' },
          { name: 'Traffic Violations', href: '/practice-areas/traffic-violations' },
        ],
      },
      {
        name: 'Attorneys',
        href: '/attorneys',
        submenu: [
          { name: 'Our Team', href: '/attorneys' },
          { name: 'William Vasquez', href: '/attorneys/william-vasquez' },
          { name: 'Kelly Vega', href: '/attorneys/kelly-vega' },
          { name: 'Rebecca Sommer', href: '/attorneys/rebecca-sommer' },
        ],
      },
      {
        name: 'Locations',
        href: '/locations',
        submenu: [
          { name: 'All Locations', href: '/locations' },
          { name: 'Charlotte', href: '/locations/charlotte' },
          { name: 'Raleigh', href: '/locations/raleigh' },
          { name: 'Smithfield', href: '/locations/smithfield' },
          { name: 'Orlando', href: '/locations/orlando' },
        ],
      },
      {
        name: 'About',
        href: '/about',
        submenu: [
          { name: 'About Us', href: '/about' },
          { name: 'Our Team', href: '/attorneys' },
        ],
      },
      { name: 'Blog', href: '/blog' },
      { name: 'Scholarship', href: '/scholarship' },
      { name: 'Contact', href: '/contact' },
      { name: 'Payment', href: '/make-payment' },
    ],
    es: [
      { name: 'Inicio', href: '/es' },
      {
        name: 'Áreas de Práctica',
        href: '/es/areas-de-practica',
        submenu: [
          { name: 'Ley de Inmigración', href: '/es/areas-de-practica/inmigracion' },
          { name: 'Lesiones Personales', href: '/es/areas-de-practica/lesiones-personales' },
          { name: 'Compensación Laboral', href: '/es/areas-de-practica/compensacion-laboral' },
          { name: 'Defensa Criminal', href: '/es/areas-de-practica/defensa-criminal' },
          { name: 'Derecho Familiar', href: '/es/areas-de-practica/derecho-familia' },
          { name: 'Infracciones de Tráfico', href: '/es/areas-de-practica/infracciones-transito' },
        ],
      },
      {
        name: 'Abogados',
        href: '/es/abogados',
        submenu: [
          { name: 'Nuestro Equipo', href: '/es/abogados' },
          { name: 'William Vasquez', href: '/es/abogados/william-vasquez' },
          { name: 'Kelly Vega', href: '/es/abogados/kelly-vega' },
          { name: 'Rebecca Sommer', href: '/es/abogados/rebecca-sommer' },
        ],
      },
      {
        name: 'Ubicaciones',
        href: '/es/ubicaciones',
        submenu: [
          { name: 'Todas las Ubicaciones', href: '/es/ubicaciones' },
          { name: 'Charlotte', href: '/es/ubicaciones/charlotte' },
          { name: 'Raleigh', href: '/es/ubicaciones/raleigh' },
          { name: 'Smithfield', href: '/es/ubicaciones/smithfield' },
          { name: 'Orlando', href: '/es/ubicaciones/orlando' },
        ],
      },
      {
        name: 'Sobre Nosotros',
        href: '/es/acerca-de',
        submenu: [
          { name: 'Acerca de Nosotros', href: '/es/acerca-de' },
          { name: 'Nuestro Equipo', href: '/es/abogados' },
        ],
      },
      { name: 'Blog', href: '/es/blog' },
      { name: 'Beca', href: '/es/becas' },
      { name: 'Contacto', href: '/es/contacto' },
      { name: 'Pago', href: '/es/hacer-pago' },
    ],
  };

  const isTransparent = variant === 'transparent' && !scrolled;
  const currentNav = navigation[language];
  
  const isActive = (href: string) => {
    if (href === '/' || href === '/es') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-black/95 backdrop-blur-md'
      }`}
    >
      {/* Top Bar */}
      <div className={`transition-all duration-300 ${
        isTransparent ? 'bg-black/20 backdrop-blur-sm text-white' : 'bg-secondary text-white'
      } py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:1-844-967-3536" className="hover:text-primary transition-colors">
                <span className="mr-1">📞</span>
                1-844-YO-PELEO ({BRAND.phoneNumeric})
              </a>
              <span className="hidden sm:inline text-primary">•</span>
              <a
                href={`mailto:${BRAND.email}`}
                className="hidden sm:inline hover:text-primary transition-colors"
              >
                <span className="mr-1">✉️</span>
                {BRAND.email}
              </a>
            </div>
            <SimpleLanguageSwitcher
              variant="minimal"
              showFlags={false}
              showLabels={true}
              className="text-xs"
            />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-black shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={language === 'es' ? '/es' : '/'}
      className="flex items-center">
              <div      className="flex flex-col">
                <h1      className={`text-2xl font-bold transition-colors ${
                  isTransparent ? 'text-white' : 'text-white'
                }`}>
                  {BRAND.name}
                </h1>
                <p className="text-xs text-primary font-bold tracking-wider">
                  {BRAND.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex space-x-8">
                {currentNav.map((item) => (
                  <div key={item.name}

                className="relative">
                    <Link
                      href={item.href}

                className={`relative text-sm font-medium transition-colors duration-200 py-2 flex items-center gap-1 ${
                        isActive(item.href)
                          ? 'text-primary'
                          : isTransparent
                          ? 'text-white hover:text-primary'
                          : 'text-white hover:text-primary'
                      }`}
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.name}
                      {item.submenu && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                      {isActive(item.href) && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.submenu && activeDropdown === item.name && (
                      <div
                        className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}

                href={subItem.href}

                className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}

                className="ml-8 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-600 text-secondary text-sm font-bold rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}

                className="lg:hidden p-2 rounded-md transition-colors text-white hover:bg-white/20"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black border-t border-gray-700">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {currentNav.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium ${
                      isActive(item.href)
                        ? 'text-primary bg-black/50'
                        : 'text-white hover:text-primary hover:bg-black/50'
                    } transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-6">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}

                href={subItem.href}

                className="block px-3 py-2 text-sm text-gray-300 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href={language === 'es' ? '/es/contacto' : '/contact'}

                className="block mx-3 mt-4 px-6 py-3 bg-gradient-to-r from-primary to-primary-600 text-secondary text-center font-bold rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
