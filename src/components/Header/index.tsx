'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Removed framer-motion for performance
import { usePathname } from 'next/navigation';
import { SimpleLanguageSwitcher } from '../Navigation/SimpleLanguageSwitcher';

interface HeaderProps {
  language?: 'en' | 'es';
}

export const Header: React.FC<HeaderProps> = ({ language: propLanguage }) => {
  const pathname = usePathname();
  // Determine language from URL path
  const language = pathname?.startsWith('/es') ? 'es' : propLanguage || 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = {
    en: [
      { name: 'Home', href: '/' },
      { name: 'Personal Injury', href: '/personal-injury' },
      { name: 'Practice Areas', href: '/practice-areas' },
      { name: 'Attorneys', href: '/attorneys' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    es: [
      { name: 'Inicio', href: '/' },
      { name: 'Lesiones Personales', href: '/personal-injury' },
      { name: 'Áreas de Práctica', href: '/practice-areas' },
      { name: 'Abogados', href: '/attorneys' },
      { name: 'Sobre Nosotros', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contacto', href: '/contact' },
    ],
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top Contact Bar */}
      <div className="bg-secondary text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:1-844-967-3536" className="hover:text-primary-400 transition-colors">
                <span className="mr-1">📞</span>
                1-844-YO-PELEO (967-3536)
              </a>
              <span className="hidden sm:inline text-primary-400">•</span>
              <a
                href="mailto:leads@vasquezlawfirm.com"
                className="hidden sm:inline hover:text-primary-400 transition-colors"
              >
                <span className="mr-1">✉️</span>
                leads@vasquezlawfirm.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b-3 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center py-2">
              <Image
                src="/images/BANNER_TRANS.PNG"
                alt="Vasquez Law Firm - YO PELEO POR TI™"
                width={350}
                height={100}

                className="h-16 sm:h-20 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex space-x-8">
                {navigation[language].map(item => (
                  <Link
                    key={item.name}

                href={item.href}

                className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                      pathname === item.href
                        ? 'text-secondary'
                        : 'text-neutral-700 hover:text-primary'
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-200"
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="ml-8 px-6 py-2.5 bg-gradient-to-r from-secondary to-secondary-600 text-white text-sm font-semibold rounded hover:from-secondary-600 hover:to-secondary transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}

                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden bg-white border-t border-gray-200 animate-slideDown"
          >
              <div className="px-4 py-4 space-y-1">
                {/* Mobile Logo */}
                <div className="pb-4 mb-4 border-b border-gray-200 flex justify-center">
                  <Image
                    src="/images/LOGO_TRANS.PNG"
                    alt="Vasquez Law Firm Logo"
                    width={120}
                    height={120}

                className="h-24 w-auto"
                  />
                </div>

                {navigation[language].map(item => (
                  <Link
                    key={item.name}

                href={item.href}

                onClick={() => setMobileMenuOpen(false)}

                className={`block px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                      pathname === item.href
                        ? 'bg-secondary/10 text-secondary'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}

                className="block w-full px-4 py-3 bg-gradient-to-r from-secondary to-secondary-600 text-white text-center font-semibold rounded hover:from-secondary-600 hover:to-secondary transition-all"
                  >
                    {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
                  </Link>
                </div>
              </div>
          </div>
        )}
      </nav>

      {/* Tagline Bar */}
      <div className="bg-primary py-1 text-center">
        <p className="text-white text-sm font-bold tracking-wider">YO PELEO POR TI™</p>
      </div>
    </header>
  );
};
