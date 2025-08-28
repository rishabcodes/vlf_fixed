'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '../constants';
import navigationData from '@/data/navigation.json';

interface ConsistentHeaderProps {
  language: 'en' | 'es';
  variant?: 'solid' | 'transparent';
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationItem[];
}

export const ConsistentHeader: React.FC<ConsistentHeaderProps> = ({
  language,
  variant = 'solid',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Refs for direct DOM manipulation
  const headerRef = useRef<HTMLElement>(null);
  const dynamicIslandRef = useRef<HTMLElement>(null);
  const topSectionsRef = useRef<HTMLDivElement>(null);
  
  // Animation state - Initialize with SSR-safe values
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showDynamicIsland, setShowDynamicIsland] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Use navigation data directly from import
  const navigation = navigationData as { en: NavigationItem[]; es: NavigationItem[] };

  // Mark as client-side after mount
  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const maxScroll = 120;
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      
      setScrollProgress(progress);
      
      // Hysteresis to prevent flicker
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        if (progress >= 0.08 && !showDynamicIsland) {
          setShowDynamicIsland(true);
        } else if (progress <= 0.03 && showDynamicIsland) {
          setShowDynamicIsland(false);
        }
      } else {
        setShowDynamicIsland(false);
      }
      
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
          }
};
    
    // Initial calculation
    updateScrollProgress();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showDynamicIsland]);
  
  // Route change handling
  useEffect(() => {
    const scrollY = window.scrollY;
    const maxScroll = 120;
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
    setScrollProgress(progress);
  }, [pathname]);

  const isTransparent = variant === 'transparent' && scrollProgress < 0.1;

  // Calculate transform values based on scroll progress
  const headerOpacity = 1 - scrollProgress;
  const headerScale = 1 - (scrollProgress * 0.015); // Subtle scale: 1 → 0.985
  const islandOpacity = scrollProgress;
  const islandY = 12 - (scrollProgress * 12); // 12px → 0px
  
  // Determine if Dynamic Island should be shown (only after mount)
  const isDynamicIsland = mounted && showDynamicIsland;

  return (
    <>
      {/* Dynamic Island - Fades in on scroll (Desktop only) */}
      {isDynamicIsland && (
        <nav
          ref={dynamicIslandRef}
          className="fixed top-4 left-1/2 z-[500] rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/50 will-change-transform will-change-opacity max-w-[90%] w-auto"
          style={{
            opacity: islandOpacity,
            transform: `translateX(-50%) translateY(${islandY}px)`,
          }}
        >
          <div className="flex items-center justify-center px-4 py-3">
            <div className="flex items-center justify-center gap-3 w-full whitespace-nowrap">
              {navigation[language].map((item) => (
                <div key={item.name} className="relative group">
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-700 hover:text-[#C9974D] px-2 py-2 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
                    >
                      {item.name}
                    </a>
                  ) : item.name === 'Free Consultation' || item.name === 'Consulta Gratis' ? (
                    <Link
                      href={item.href}
                      className="bg-gradient-to-r from-[#C9974D] to-[#B08740] text-white font-bold rounded-full hover:from-[#B08740] hover:to-[#906431] transition-all duration-200 px-3 py-1.5 text-sm shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={item.href}
                        className={`relative font-semibold transition-colors duration-200 px-2 py-2 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                          pathname === item.href || (item.submenu && pathname?.startsWith(item.href))
                            ? 'text-sm text-[#C9974D]'
                            : 'text-sm text-gray-700 hover:text-[#C9974D]'
                        }`}
                      >
                        {item.name}
                        {item.submenu && (
                          <svg
                            className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                        {(pathname === item.href ||
                          (item.submenu && pathname?.startsWith(item.href))) && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9974D]" />
                        )}
                      </Link>
                      
                      {/* Simple Dropdown for Dynamic Island */}
                      {item.submenu && (
                        <>
                          {/* Invisible bridge to maintain hover */}
                          <div 
                            suppressHydrationWarning
                            className="absolute top-full left-0 w-full h-3 bg-transparent pointer-events-auto z-[599]"
                          />
                          
                          <div 
                            suppressHydrationWarning
                            className={`top-full mt-3 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[600] pointer-events-none group-hover:pointer-events-auto ${
                              (item.name === 'Practice Areas' || item.name === 'Áreas de Práctica')
                                ? 'fixed left-1/2 -translate-x-1/2'
                                : 'absolute left-0'
                            }`}
                            style={{
                              ...(item.name === 'Practice Areas' || item.name === 'Áreas de Práctica' 
                                ? { top: '60px' } 
                                : {})
                            }}
                          >
                            <div 
                              suppressHydrationWarning
                              className={`py-4 px-6 ${
                                (item.name === 'Practice Areas' || item.name === 'Áreas de Práctica') 
                                  ? 'min-w-[1200px] max-h-[80vh]' 
                                  : 'min-w-[280px] max-h-[400px]'
                              }`}
                            >
                              {/* Practice Areas - Show in 6 column grid */}
                              {(item.name === 'Practice Areas' || item.name === 'Áreas de Práctica') ? (
                                <div className="grid grid-cols-6 gap-6">
                                  {item.submenu.map(category => (
                                    <div key={category.name} className="relative group/sub">
                                      <Link
                                        href={category.href}
                                        className="block text-base font-bold text-[#6B1F2E] hover:text-[#C9974D] transition-colors mb-2"
                                      >
                                        {category.name}
                                      </Link>
                                      {category.submenu && (
                                        <div className="space-y-1">
                                          {category.submenu.map(subItem => (
                                            <div key={subItem.name} className="relative group/item">
                                              <Link
                                                href={subItem.href}
                                                className="block py-1.5 text-sm text-gray-700 hover:text-[#C9974D] hover:bg-[#C9974D]/5 px-2 rounded transition-all duration-150"
                                              >
                                                {subItem.name}
                                                {subItem.submenu && (
                                                  <span className="text-[#C9974D] ml-1 text-xs">▶</span>
                                                )}
                                              </Link>
                                              
                                              {/* Nested dropdown for third level */}
                                              {subItem.submenu && (
                                                <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-150 z-[700] min-w-[280px]">
                                                  <div className="py-2 px-3">
                                                    {subItem.submenu.map(thirdLevel => (
                                                      <Link
                                                        key={thirdLevel.name}
                                                        href={thirdLevel.href}
                                                        className="block py-1 text-[13px] text-gray-600 hover:text-[#C9974D] hover:bg-[#C9974D]/5 px-2 rounded transition-colors"
                                                      >
                                                        {thirdLevel.name}
                                                      </Link>
                                                    ))}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                /* Other dropdowns - single column */
                                <div className="space-y-1">
                                {item.submenu.map(subItem => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-[#C9974D]/10 hover:text-[#C9974D] rounded-lg transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Header - Fades out on scroll */}
      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 right-0 z-[400] 
          ${mounted ? 'will-change-transform will-change-opacity' : ''}
          ${isTransparent ? 'bg-transparent' : 'bg-white border-b border-gray-200 shadow-lg'}
          ${mounted && scrollProgress > 0.95 ? 'pointer-events-none' : ''}
        `}
        style={{
          opacity: mounted && scrollProgress > 0 ? headerOpacity : 1, // Always visible until user scrolls
          transform: mounted && scrollProgress > 0 ? `scale(${headerScale})` : 'scale(1)',
          transformOrigin: 'center top',
        }}
        aria-hidden={mounted && scrollProgress > 0.95}
      >
        {/* Top Contact Bar */}
        <div
          ref={topSectionsRef}
          className={`
            overflow-hidden
            ${isTransparent ? 'bg-black/80' : 'bg-secondary'}
            text-white py-0.5
          `}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center text-xs">
            <div className="flex items-center space-x-4">
              <a
                href={`tel:${BRAND.phoneNumeric}`}
                className="hover:text-primary transition-colors"
              >
                <span className="mr-1">📞</span>
                {BRAND.phone} ({BRAND.phoneNumeric.slice(-8)})
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
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`relative ${isTransparent ? 'bg-transparent border-0 shadow-none' : 'bg-white border-b border-gray-200 shadow-sm'}`}>
        {/* Regular Navigation Layout */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Mobile Layout - Logo Left, Hamburger Right */}
            <div className="lg:hidden flex justify-between items-center h-28 border-b border-gray-100 py-4">
              {/* Left - Logo */}
              <Link 
                href={language === 'es' ? '/es' : '/'} 
                className="flex items-center cursor-pointer"
              >
                <img
                  src="/images/BANNER_TRANS.PNG"
                  alt="Vasquez Law Firm - YO PELEO POR TI™"
                  width={320}
                  height={96}
                  className="h-12 w-auto cursor-pointer"
                  loading="eager"
                  width={360}
                  height={108}
                  className="h-18 w-auto cursor-pointer"
                  priority
                />
              </Link>

              {/* Right - Mobile Menu Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className={`p-2 rounded-md transition-colors text-[#C9974D] ${
                  isTransparent
                    ? 'hover:bg-white/20'
                    : 'hover:bg-[#C9974D]/10'
                }`}
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

            {/* Desktop Layout - Centered Logo */}
            <div className="hidden lg:block w-full">
              <div className="flex justify-center items-center h-36 border-b border-gray-100 relative py-6 w-full">
                {/* Centered Logo */}
                <Link 
                  href={language === 'es' ? '/es' : '/'}
                  href={language === 'es' ? '/es' : '/'} 
                  className="flex items-center cursor-pointer"
                >
                  <img
                    src="/images/BANNER_TRANS.PNG"
                    alt="Vasquez Law Firm - YO PELEO POR TI™"
                    width={420}
                    height={126}
                    className="h-16 w-auto cursor-pointer"
                    loading="eager"
                    width={560}
                    height={168}
                    className="h-24 w-auto cursor-pointer"
                    priority
                  />
                </Link>
              </div>

              {/* Bottom Row - Navigation Menu */}
              <div className="hidden lg:flex justify-center items-center h-16 w-full">
                <div className="flex justify-center items-center space-x-8">
                {navigation[language].map((item) => (
                  <div 
                    key={item.name} 
                    className="relative group"
                  >
                    {item.href.startsWith('http') ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative font-semibold transition-all duration-200 py-2 flex items-center gap-1 ${
                          isTransparent
                            ? 'text-sm text-[#C9974D] hover:text-white hover:scale-105'
                            : 'text-sm text-gray-700 hover:text-[#6B1F2E] hover:scale-105'
                        }`}
                      >
                        {item.name}
                      </a>
                    ) : item.name === 'Free Consultation' || item.name === 'Consulta Gratis' ? (
                      <Link
                        href={item.href}
                        className="bg-gradient-to-r from-[#C9974D] to-[#B08740] text-white font-bold rounded-full hover:from-[#B08740] hover:to-[#906431] transition-all duration-300 px-5 py-2 text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative font-semibold transition-all duration-200 py-2 flex items-center gap-1 cursor-pointer ${
                          pathname === item.href || (item.submenu && pathname?.startsWith(item.href))
                            ? 'text-sm text-[#6B1F2E] scale-105'
                            : isTransparent
                              ? 'text-sm text-[#C9974D] hover:text-white hover:scale-105'
                              : 'text-sm text-gray-700 hover:text-[#6B1F2E] hover:scale-105'
                        }`}
                      >
                        {item.name}
                        {item.submenu && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                        {(pathname === item.href ||
                          (item.submenu && pathname?.startsWith(item.href))) && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9974D]" />
                        )}
                      </Link>
                    )}

                    {/* Dropdown Menu - CSS Hover */}
                    {item.submenu && (
                      <>
                        {/* Invisible bridge to maintain hover */}
                        <div 
                          suppressHydrationWarning
                          className="absolute top-full left-0 w-full h-3 bg-transparent pointer-events-auto z-[499]"
                        />
                        
                        <div 
                          suppressHydrationWarning
                          className={`top-full mt-3 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[500] pointer-events-none group-hover:pointer-events-auto ${
                            (item.name === 'Practice Areas' || item.name === 'Áreas de Práctica')
                              ? 'fixed left-1/2 -translate-x-1/2'
                              : 'absolute left-0'
                          }`}
                          style={{
                            ...(item.name === 'Practice Areas' || item.name === 'Áreas de Práctica' 
                              ? { top: '160px' } 
                              : {}),
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.98) 100%)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 20px 40px rgba(107, 31, 46, 0.1), 0 10px 20px rgba(201, 151, 77, 0.08)',
                          }}
                        >
                          <div className={`py-4 px-6 ${
                            (item.name === 'Practice Areas' || item.name === 'Áreas de Práctica') 
                              ? 'min-w-[1200px] max-h-[80vh]' 
                              : 'min-w-[280px] max-h-[400px]'
                          }`}>
                            {/* Practice Areas - Show in 6 column grid */}
                            {(item.name === 'Practice Areas' || item.name === 'Áreas de Práctica') ? (
                              <div className="grid grid-cols-6 gap-6">
                                {item.submenu.map(category => (
                                  <div key={category.name} className="relative group/sub">
                                    <Link
                                      href={category.href}
                                      className="block text-base font-bold text-[#6B1F2E] hover:text-[#C9974D] transition-colors mb-2"
                                    >
                                      {category.name}
                                    </Link>
                                    {category.submenu && (
                                      <div className="space-y-1">
                                        {category.submenu.map(subItem => (
                                          <div key={subItem.name} className="relative group/item">
                                            <Link
                                              href={subItem.href}
                                              className="block py-1.5 text-sm text-gray-700 hover:text-[#C9974D] hover:bg-[#C9974D]/5 px-2 rounded transition-all duration-150"
                                            >
                                              {subItem.name}
                                              {subItem.submenu && (
                                                <span className="text-[#C9974D] ml-1 text-xs">▶</span>
                                              )}
                                            </Link>
                                            
                                            {/* Nested dropdown for third level */}
                                            {subItem.submenu && (
                                              <div className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-150 z-[600] min-w-[280px]">
                                                <div className="py-2 px-3">
                                                  {subItem.submenu.map(thirdLevel => (
                                                    <Link
                                                      key={thirdLevel.name}
                                                      href={thirdLevel.href}
                                                      className="block py-1 text-[13px] text-gray-600 hover:text-[#C9974D] hover:bg-[#C9974D]/5 px-2 rounded transition-colors"
                                                    >
                                                      {thirdLevel.name}
                                                    </Link>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              /* Regular dropdown layout for other menus */
                              <div className="space-y-1">
                                {item.submenu.map(subItem => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-[#C9974D]/10 hover:text-[#C9974D] rounded-lg transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-200">
              <div className="px-4 py-6 space-y-1">
                {navigation[language].map(item => (
                  <div key={item.name}>
                    {item.href.startsWith('http') ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors text-[#906431] hover:bg-[#C9974D]/5 hover:text-[#C9974D]`}
                      >
                        {item.name}
                      </a>
                    ) : item.name === 'Free Consultation' || item.name === 'Consulta Gratis' ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block mx-4 px-5 py-2.5 bg-gradient-to-r from-[#C9974D] to-[#B08740] text-white text-center text-base font-bold rounded-full hover:from-[#B08740] hover:to-[#906431] transition-all shadow-md"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => {
                          // Only close menu if no submenu
                          if (!item.submenu) {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                          pathname === item.href || (item.submenu && pathname?.startsWith(item.href))
                            ? 'bg-[#C9974D]/10 text-[#C9974D]'
                            : 'text-[#906431] hover:bg-[#C9974D]/5 hover:text-[#C9974D]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map(subItem => (
                          <div key={subItem.name}>
                            <Link
                              href={subItem.href}
                              onClick={() => {
                                if (!subItem.submenu) {
                                  setMobileMenuOpen(false);
                                }
                              }}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                subItem.submenu
                                  ? 'font-medium text-neutral-700 border-b border-neutral-200'
                                  : 'text-neutral-600 hover:text-primary pl-6'
                              }`}
                            >
                              {subItem.name}
                              {subItem.submenu && (
                                <span className="text-xs text-primary ml-1">→</span>
                              )}
                            </Link>
                            {subItem.submenu && (
                              <div className="ml-4 mt-1 space-y-1 bg-neutral-50/50 rounded">
                                {subItem.submenu.map(nestedItem => (
                                  <Link
                                    key={nestedItem.name}
                                    href={nestedItem.href}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                    }}
                                    className="block px-4 py-1.5 text-xs text-neutral-600 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                                  >
                                    {nestedItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
      </nav>
    </header>
    </>
  );
};

