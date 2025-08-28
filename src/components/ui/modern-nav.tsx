'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModernNavProps {
  language?: 'en' | 'es';
  className?: string;
}

export function ModernNav({ language = 'en', className }: ModernNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = language === 'es' 
    ? [
        { name: 'Inicio', href: '/es' },
        { 
          name: 'Áreas de Práctica', 
          href: '/es/practice-areas',
          dropdown: [
            { name: 'Inmigración', href: '/es/practice-areas/immigration' },
            { name: 'Lesiones Personales', href: '/es/practice-areas/personal-injury' },
            { name: 'Defensa Criminal', href: '/es/practice-areas/criminal-defense' },
            { name: 'Derecho Familiar', href: '/es/practice-areas/family-law' },
          ]
        },
        { name: 'Abogados', href: '/es/attorneys' },
        { name: 'Ubicaciones', href: '/es/locations' },
        { name: 'Blog', href: '/es/blog' },
        { name: 'Contacto', href: '/es/contact' },
      ]
    : [
        { name: 'Home', href: '/' },
        { 
          name: 'Practice Areas', 
          href: '/practice-areas',
          dropdown: [
            { name: 'Immigration', href: '/practice-areas/immigration' },
            { name: 'Personal Injury', href: '/practice-areas/personal-injury' },
            { name: 'Criminal Defense', href: '/practice-areas/criminal-defense' },
            { name: 'Family Law', href: '/practice-areas/family-law' },
          ]
        },
        { name: 'Attorneys', href: '/attorneys' },
        { name: 'Locations', href: '/locations' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#6B1F2E] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:1-844-967-3536" className="flex items-center gap-1 hover:text-[#D4AF37]">
                <Phone className="w-4 h-4" />
                1-844-967-3536
              </a>
              <span className="hidden md:flex items-center gap-1">
                <Mail className="w-4 h-4" />
                info@vasquezlawnc.com
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/free-consultation" className="hover:text-[#D4AF37]">
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={cn(
          "bg-white shadow-md sticky top-0 z-50 transition-all duration-200",
          isScrolled && "shadow-lg",
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={language === 'es' ? '/es' : '/'} className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">VLF</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-[#6B1F2E]">Vasquez Law Firm</h1>
                  <p className="text-xs text-gray-600">YO PELEO POR TI™</p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href={item.href}
                    className="text-gray-700 hover:text-[#6B1F2E] font-medium flex items-center gap-1"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                      {item.dropdown.map(subItem => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-[#6B1F2E] hover:text-white transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Button className="bg-[#6B1F2E] hover:bg-[#8B2635] text-white">
                {language === 'es' ? 'Evaluación Gratis' : 'Free Case Review'}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4">
              {navItems.map(item => (
                <div key={item.name} className="mb-4">
                  <Link 
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-[#6B1F2E] font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-2">
                      {item.dropdown.map(subItem => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 text-gray-600 hover:text-[#6B1F2E] text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Button className="w-full bg-[#6B1F2E] hover:bg-[#8B2635] text-white mt-4">
                {language === 'es' ? 'Evaluación Gratis' : 'Free Case Review'}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}