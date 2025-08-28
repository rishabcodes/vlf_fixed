'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DbImage from '@/components/DbImage';
import { usePathname } from 'next/navigation';
import { Phone, ChevronDown, Globe } from 'lucide-react';
import { mainNavigation, spanishNavigation } from '@/lib/navData';
import { cn } from '@/lib/utils';
import { NewsTicker } from '@/components/ui/news-ticker';
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';

interface TransparentNavbarProps {
  language?: 'en' | 'es';
  onLanguageChange?: (lang: 'en' | 'es') => void;
  isHomepage?: boolean;
  showBreadcrumbs?: boolean;
  pathname?: string;
}

export function TransparentNavbar({ 
  language = 'en', 
  onLanguageChange = () => {},
  isHomepage = false,
  showBreadcrumbs = false,
  pathname: propPathname
}: TransparentNavbarProps) {
  const pathname = propPathname || usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState(language);
  // const [showDynamicIsland, setShowDynamicIsland] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);
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

  // TODO: Dynamic Island functionality - temporarily disabled
  // // Scroll detection for Dynamic Island (non-homepage only)
  // useEffect(() => {
  //   if (isHomepage) return;

  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     const isDesktop = window.innerWidth >= 1024;
      
  //     if (isDesktop) {
  //       // Show Dynamic Island when scrolled down 100px and hide regular navbar
  //       if (currentScrollY > 100 && !showDynamicIsland) {
  //         setShowDynamicIsland(true);
  //       } else if (currentScrollY <= 50 && showDynamicIsland) {
  //         setShowDynamicIsland(false);
  //       }
  //     } else {
  //       setShowDynamicIsland(false);
  //     }
      
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isHomepage, showDynamicIsland, lastScrollY]);

  const handleDropdownEnter = (name: string) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    setCurrentLang(newLang);
    onLanguageChange(newLang);
  };

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    if (!pathname) return [];
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: currentLang === 'es' ? 'Inicio' : 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, href: currentPath });
    });

    return breadcrumbs;
  };

  return (
    <>
      {/* News Ticker - Using proper component */}
      <div className={cn(
        "top-0 left-0 right-0 z-[9999] bg-[#6B1F2E] h-[20px]",
        isHomepage ? "absolute" : "fixed"
      )}>
        <ClientOnlyWrapper>
          <NewsTicker locale={currentLang} />
        </ClientOnlyWrapper>
      </div>

      {/* Contact Bar - Reduced height */}
      <div className={cn(
        "top-[20px] left-0 right-0 z-[9998] bg-black/20 backdrop-blur-sm border-b border-white/10",
        isHomepage ? "absolute" : "fixed"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-1 text-sm">
            {/* Center phone and availability */}
            <div className="flex-1 flex justify-center items-center space-x-3 text-xs">
              <a href="tel:1-844-967-3536" className="flex items-center text-white hover:text-[#D4AF37] transition-colors">
                <Phone className="h-3.5 w-3.5 mr-1" />
                <span className="font-medium">1-844-967-3536</span>
              </a>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">Available 24/7</span>
            </div>
            {/* Right side items */}
            <div className="flex items-center">
              <Link href="/free-consultation" className="text-white hover:text-[#D4AF37] transition-colors font-medium text-xs">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - absolute (non-sticky) on homepage, fixed (sticky) on other pages */}
      <nav className={cn(
        "top-[40px] left-0 right-0 z-[55] transition-all duration-300",
        isHomepage ? "absolute bg-transparent" : "fixed bg-black/40 backdrop-blur-lg"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Left Side Navigation - Home, Practice Areas, Attorneys, Locations */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {navigation.filter(item => ['Home', 'Practice Areas', 'Attorneys', 'Locations', 'Inicio', 'Áreas de Práctica', 'Abogados', 'Ubicaciones'].includes(item.name)).map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => (item.children || ('columns' in item && item.columns)) && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-white hover:text-[#D4AF37] transition-colors font-medium flex items-center",
                        (pathname === item.href || (item.href === '/' && pathname === '/')) && "text-[#D4AF37]"
                      )}
                    >
                      {item.name}
                      {(item.children || ('columns' in item && item.columns)) && (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </Link>
                  ) : (
                    <button
                      className="text-white hover:text-[#D4AF37] transition-colors font-medium flex items-center"
                    >
                      {item.name}
                      {(item.children || ('columns' in item && item.columns)) && (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  )}

                  {/* Dropdown Menu - Handle both mega menu (columns) and simple dropdowns */}
                  {activeDropdown === item.name && (
                    <>
                      {/* Mega Menu for items with columns (Practice Areas) */}
                      {'columns' in item && item.columns ? (
                        <div className="absolute top-full left-0 mt-2 bg-gray-900 bg-opacity-95 rounded-lg shadow-xl p-6 min-w-[1200px] z-[70]">
                          <div className="grid grid-cols-6 gap-4">
                            {item.columns.map((column) => (
                              <div key={column.title}>
                                <h3 className="text-[#D4AF37] font-semibold mb-2 text-sm">{column.title}</h3>
                                <ul className="space-y-1">
                                  {column.items.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        href={subItem.href}
                                        className="text-white hover:text-[#D4AF37] text-xs transition-colors block py-1"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : item.children ? (
                        /* Simple Dropdown for regular items */
                        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 bg-opacity-95 rounded-lg shadow-xl py-2 z-[70]">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Center Logo - Larger */}
            <div className="relative z-[60]">
              <Link href="/" className="flex items-center px-8">
                <DbImage
                  id="cmeublswh0015sfmzr1t1zc4k"
                  alt="Vasquez Law Firm"
                  width={240}
                  height={85}
                  className="h-20 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Right Side Navigation - About, Resources, Blog, Scholarship */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-start">
              {navigation.filter(item => ['About', 'Resources', 'Blog', 'Scholarship', 'Acerca de', 'Recursos', 'Beca'].includes(item.name)).map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => (item.children || ('columns' in item && item.columns)) && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "text-white hover:text-[#D4AF37] transition-colors font-medium flex items-center",
                        (pathname === item.href || (item.href === '/' && pathname === '/')) && "text-[#D4AF37]"
                      )}
                    >
                      {item.name}
                      {(item.children || ('columns' in item && item.columns)) && (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </Link>
                  ) : (
                    <button
                      className="text-white hover:text-[#D4AF37] transition-colors font-medium flex items-center"
                    >
                      {item.name}
                      {(item.children || ('columns' in item && item.columns)) && (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  )}

                  {/* Dropdown Menu - Handle both mega menu (columns) and simple dropdowns */}
                  {activeDropdown === item.name && (
                    <>
                      {/* Mega Menu for items with columns (Practice Areas) */}
                      {'columns' in item && item.columns ? (
                        <div className="absolute top-full right-0 mt-2 bg-gray-900 bg-opacity-95 rounded-lg shadow-xl p-6 min-w-[1200px] z-[70]">
                          <div className="grid grid-cols-6 gap-4">
                            {item.columns.map((column) => (
                              <div key={column.title}>
                                <h3 className="text-[#D4AF37] font-semibold mb-2 text-sm">{column.title}</h3>
                                <ul className="space-y-1">
                                  {column.items.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        href={subItem.href}
                                        className="text-white hover:text-[#D4AF37] text-xs transition-colors block py-1"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : item.children ? (
                        /* Simple Dropdown for regular items */
                        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 bg-opacity-95 rounded-lg shadow-xl py-2 z-[70]">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ))}
              {/* Language toggle handled by LanguageTogglePortal */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setActiveDropdown(activeDropdown ? null : 'mobile')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {activeDropdown === 'mobile' && (
            <div className="lg:hidden bg-gray-900 bg-opacity-95 rounded-lg mt-2 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <div>
                      <button
                        className="w-full text-left px-4 py-2 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        {item.name}
                      </button>
                      {item.children && activeDropdown === item.name && (
                        <div className="bg-gray-800 py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block pl-8 pr-4 py-2 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 px-4">
                <Link
                  href="/free-consultation"
                  className="block bg-[#D4AF37] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#D4AF37] transition-colors text-center"
                  onClick={() => setActiveDropdown(null)}
                >
                  Free Case Review
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* TODO: Dynamic Island - temporarily disabled for performance
      {!isHomepage && showDynamicIsland && (
        <div className="fixed top-6 left-2.5 right-2.5 z-[1000] transition-all duration-700 ease-out animate-in slide-in-from-top-4 fade-in hidden lg:block">
          <div className="bg-black/90 backdrop-blur-xl border border-white/30 rounded-full shadow-2xl py-4 hover:bg-black/95 transition-all duration-200 shadow-[0_8px_32px_rgba(212,175,55,0.1)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)] w-full">
            [Dynamic Island content would go here]
          </div>
        </div>
      )} */}

      {/* Breadcrumbs with Language Toggle - Only show on non-homepage pages */}
      {showBreadcrumbs && pathname && pathname !== '/' && pathname !== '/es' && (
        <div className="bg-black/30 border-b border-white/10 backdrop-blur-sm fixed top-[140px] left-0 right-0 z-[50]">
          <div className="container mx-auto px-4 relative" data-lang-anchor="breadcrumbs">
            <div className="flex items-center justify-between py-3">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  {getBreadcrumbs().map((crumb, index, array) => (
                    <li key={crumb.href} className="flex items-center">
                      {index > 0 && (
                        <svg
                          className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {index === array.length - 1 ? (
                        <span className="text-gray-300 font-medium">{crumb.name}</span>
                      ) : (
                        <Link
                          href={crumb.href}
                          className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              {/* Language toggle handled by LanguageTogglePortal */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}