'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  language: 'en' | 'es';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const content = {
    en: {
      slogan: 'YO PELEO POR TI™',
      practiceAreas: 'Practice Areas',
      contact: 'Contact',
      followUs: 'Follow Us',
      rights: 'All rights reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      callNow: 'Call Now',
      emailUs: 'Email Us',
      locations: 'Locations',
    },
    es: {
      slogan: 'YO PELEO POR TI™',
      practiceAreas: 'Áreas de Práctica',
      contact: 'Contacto',
      followUs: 'Síguenos',
      rights: 'Todos los derechos reservados',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      callNow: 'Llame Ahora',
      emailUs: 'Envíenos un Email',
      locations: 'Ubicaciones',
    },
  };

  const t = content[language];

  const practiceAreaLinks = [
    {
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      href: { en: '/practice-areas/immigration', es: '/es/areas-de-practica/inmigracion' },
    },
    {
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      href: {
        en: '/practice-areas/personal-injury',
        es: '/es/areas-de-practica/lesiones-personales',
      },
    },
    {
      name: { en: 'Workers Compensation', es: 'Compensación Laboral' },
      href: {
        en: '/practice-areas/workers-compensation',
        es: '/es/areas-de-practica/compensacion-laboral',
      },
    },
    {
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      href: {
        en: '/practice-areas/criminal-defense',
        es: '/es/areas-de-practica/defensa-criminal',
      },
    },
    {
      name: { en: 'Family Law', es: 'Derecho Familiar' },
      href: { en: '/practice-areas/family-law', es: '/es/areas-de-practica/derecho-familia' },
    },
    {
      name: { en: 'Traffic Violations', es: 'Infracciones de Tráfico' },
      href: {
        en: '/practice-areas/traffic-violations',
        es: '/es/areas-de-practica/infracciones-transito',
      },
    },
  ];

  const locations = [
    {
      city: 'Smithfield, NC',
      address: '612 S Brightleaf Blvd',
      cityState: 'Smithfield, NC 27577',
      phone: '(919) 989-3000',
    },
    {
      city: 'Raleigh, NC',
      address: '4426 Louisburg Road',
      cityState: 'Raleigh, NC 27616',
      phone: '(919) 533-7000',
    },
    {
      city: 'Charlotte, NC',
      address: '5701 Executive Center Dr, Ste 103',
      cityState: 'Charlotte, NC 28212',
      phone: '(704) 533-7000',
    },
    {
      city: 'Orlando, FL',
      address: '1111 E Amelia Street',
      cityState: 'Orlando, FL 32803',
      phone: '(407) 955-5000',
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-primary to-primary-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">
            {language === 'es'
              ? '¿Necesita Ayuda Legal? ¡Llame Ahora!'
              : 'Need Legal Help? Call Now!'}
          </h3>
          <a
            href="tel:1-844-967-3536"
            className="inline-block px-8 py-3 bg-white text-secondary text-xl font-bold rounded hover:bg-neutral-100 transition-all shadow-lg"
          >
            📞 1-844-YO-PELEO (967-3536)
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/images/LOGO_TRANS.PNG"
                  alt="Vasquez Law Firm Logo"
                  width={180}
                  height={180}

                className="h-32 w-auto"
                />
              </Link>
              <p className="text-primary-400 font-semibold mb-2">{t.slogan}</p>
              <p className="text-gray-400 text-sm">
                {language === 'es'
                  ? 'Más de 35 años de experiencia combinada luchando por los derechos de nuestros clientes.'
                  : "Over 35 years of combined experience fighting for our clients' rights."}
              </p>
            </div>

            {/* Practice Areas */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.practiceAreas}</h3>
              <ul className="space-y-2">
                {practiceAreaLinks.map(area => (
                  <li key={area.href.en}>
                    <Link
                      href={area.href[language]}

                className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {area.name[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.locations}</h3>
              <div className="space-y-4">
                {locations.map(location => (
                  <div key={location.city}

                className="text-sm">
                    <p
                className="font-semibold text-gray-300">{location.city}</p>
                    <p className="text-gray-400">{location.address}</p>
                    <p className="text-gray-400">{location.cityState}</p>
                    <a
                      href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}

                className="text-primary-400 hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
              <div className="space-y-3">
                <a
                  href="tel:1-844-967-3536"
                  className="flex items-center text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  <span className="mr-2">📞</span>
                  1-844-YO-PELEO
                </a>
                <a
                  href="mailto:leads@vasquezlawfirm.com"
                  className="flex items-center text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  <span className="mr-2">✉️</span>
                  leads@vasquezlawfirm.com
                </a>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3">{t.followUs}</h4>
                <div className="flex space-x-3">
                  <a
                    href="https://www.facebook.com/vasquezlawnc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <span className="text-lg">f</span>
                  </a>
                  <a
                    href="https://twitter.com/vasquezlawnc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/vasquez-law-firm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <span className="text-lg">in</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@vasquezlawfirm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                    aria-label="YouTube"
                  >
                    <span className="text-lg">▶</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Vasquez Law Firm, PLLC. {t.rights}.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href={language === 'es' ? '/es/politica-privacidad' : '/privacy-policy'}

                className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  {t.privacy}
                </Link>
                <Link
                  href={language === 'es' ? '/es/terminos-servicio' : '/terms-of-service'}

                className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  {t.terms}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
