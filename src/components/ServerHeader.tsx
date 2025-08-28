// Server Component - No 'use client' directive
import Image from 'next/image';
import Link from 'next/link';

interface ServerHeaderProps {
  language?: 'en' | 'es';
}

export const ServerHeader: React.FC<ServerHeaderProps> = ({ language = 'en' }) => {
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
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
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
                    className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors duration-200 py-2"
                  >
                    {item.name}
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
          </div>
        </div>
      </nav>

      {/* Tagline Bar */}
      <div className="bg-primary py-1 text-center">
        <p className="text-white text-sm font-bold tracking-wider">YO PELEO POR TI™</p>
      </div>
    </header>
  );
};