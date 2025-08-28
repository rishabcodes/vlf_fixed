'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronDown, Globe } from 'lucide-react';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { MegaMenu } from './MegaMenu';
import { mainNavigation, spanishNavigation } from '@/lib/navData';
import { cn } from '@/lib/utils';

interface ModernHeaderProps {
  language?: 'en' | 'es';
  onLanguageChange?: (lang: 'en' | 'es') => void;
}

export function ModernHeader({ 
  language = 'en', 
  onLanguageChange = () => {} 
}: ModernHeaderProps) {
  const pathname = usePathname();
  const { isScrolled } = useScrollHeader();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState(language);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();

  const navigation = currentLang === 'es' ? spanishNavigation : mainNavigation;

  useEffect(() => {
    // Detect language from URL
    if (pathname?.startsWith('/es')) {
      setCurrentLang('es');
    } else {
      setCurrentLang('en');
    }
  }, [pathname]);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleDropdownEnter = (name: string) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const handleLanguageToggle = (lang: 'en' | 'es') => {
    setCurrentLang(lang);
    onLanguageChange(lang);
  };

  const hasMegaMenu = (item: any) => {
    return item.columns && item.columns.length > 0;
  };

  const hasDropdown = (item: any) => {
    return item.children && item.children.length > 0;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        isScrolled && "shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white"
      )}
    >
      <nav className="bg-white border-b border-zinc-200" aria-label="Main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-[60px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={currentLang === 'es' ? '/es' : '/'} className="flex items-center">
                <Image
                  src="/images/BANNER_TRANS.PNG"
                  alt="Vasquez Law Firm"
                  width={150}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-3 py-2 text-[15px] font-medium text-zinc-700 hover:text-zinc-900 transition-colors",
                      pathname === item.href && "text-amber-600"
                    )}
                  >
                    {item.name}
                    {(hasMegaMenu(item) || hasDropdown(item)) && (
                      <ChevronDown className="ml-1 h-3 w-3" />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {hasMegaMenu(item) && (
                    <MegaMenu
                      item={item as any}
                      isOpen={activeDropdown === item.name}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}

                  {/* Regular Dropdown */}
                  {hasDropdown(item) && activeDropdown === item.name && (
                    <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-zinc-200 z-50">
                      <div className="py-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-2 text-sm text-zinc-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <div className="flex items-center rounded-full bg-zinc-100 p-0.5">
                <button
                  onClick={() => handleLanguageToggle('en')}
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full transition-colors",
                    currentLang === 'en' 
                      ? "bg-white text-zinc-900 shadow-sm" 
                      : "text-zinc-600 hover:text-zinc-900"
                  )}
                  aria-label="English"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageToggle('es')}
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full transition-colors",
                    currentLang === 'es' 
                      ? "bg-white text-zinc-900 shadow-sm" 
                      : "text-zinc-600 hover:text-zinc-900"
                  )}
                  aria-label="Español"
                >
                  ES
                </button>
              </div>

              {/* Phone - Icon on mobile, text on desktop */}
              <a
                href="tel:1-844-YO-PELEO"
                className="hidden md:flex items-center text-sm text-zinc-700 hover:text-amber-600 transition-colors"
              >
                <Phone className="h-4 w-4 mr-1" />
                <span className="hidden lg:inline">1-844-YO-PELEO</span>
              </a>

              {/* Email - Hidden on mobile */}
              <a
                href="mailto:leads@vasquezlawfirm.com"
                className="hidden md:flex items-center text-sm text-zinc-700 hover:text-amber-600 transition-colors"
              >
                <Mail className="h-4 w-4 mr-1" />
                <span className="hidden lg:inline">Email</span>
              </a>

              {/* CTA Button */}
              <Link
                href={currentLang === 'es' ? '/es/consulta-gratis' : '/free-consultation'}
                className="rounded-full px-4 py-2 text-sm font-semibold shadow-sm bg-amber-500 hover:bg-amber-600 text-white transition-colors"
              >
                {currentLang === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-14 z-50 bg-white">
            <div className="h-full overflow-y-auto pb-20">
              <div className="px-4 py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block px-3 py-2 text-base font-medium rounded-lg transition-colors",
                        pathname === item.href 
                          ? "bg-amber-50 text-amber-600" 
                          : "text-zinc-700 hover:bg-zinc-50"
                      )}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile Submenu */}
                    {(item.children || item.columns) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-1.5 text-sm text-zinc-600 hover:text-amber-600"
                          >
                            {child.name}
                          </Link>
                        ))}
                        {item.columns?.map((column) => (
                          <div key={column.title}>
                            <p className="px-3 py-1 text-xs font-semibold text-zinc-500 uppercase">
                              {column.title}
                            </p>
                            {column.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-1.5 text-sm text-zinc-600 hover:text-amber-600"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA - Pinned at bottom */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-200">
                <Link
                  href={currentLang === 'es' ? '/es/consulta-gratis' : '/free-consultation'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-full px-4 py-3 text-center text-sm font-semibold shadow-sm bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                >
                  {currentLang === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}