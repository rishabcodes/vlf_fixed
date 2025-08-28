'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND } from '../constants';

interface ConsistentFooterProps {
  language: 'en' | 'es';
}

export const ConsistentFooter: React.FC<ConsistentFooterProps> = ({ language }) => {
  const content = {
    en: {
      practiceAreas: 'Practice Areas',
      immigration: 'Immigration Law',
      personalInjury: 'Personal Injury',
      workersComp: "Workers' Compensation",
      criminalDefense: 'Criminal Defense',
      familyLaw: 'Family Law',
      trafficViolations: 'Traffic Violations',
      quickLinks: 'Quick Links',
      about: 'About Us',
      attorneys: 'Our Attorneys',
      blog: 'Blog & Resources',
      contact: 'Contact Us',
      testimonials: 'Client Testimonials',
      faq: 'FAQ',
      offices: 'Our Offices',
      connect: 'Connect With Us',
      resources: 'Resources',
      legalDisclaimer: 'Legal Disclaimer',
      accessibility: 'Accessibility',
      cookiePolicy: 'Cookie Policy',
      newsletter: 'Subscribe to our newsletter',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      copyright: `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`,
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      sitemap: 'Sitemap',
      tagline: BRAND.tagline,
      experience: '60+ Years of Experience',
      available: '24/7 AI Assistance Available',
    },
    es: {
      practiceAreas: 'Áreas de Práctica',
      immigration: 'Ley de Inmigración',
      personalInjury: 'Lesiones Personales',
      workersComp: 'Compensación Laboral',
      criminalDefense: 'Defensa Criminal',
      familyLaw: 'Derecho Familiar',
      trafficViolations: 'Violaciones de Tráfico',
      quickLinks: 'Enlaces Rápidos',
      about: 'Sobre Nosotros',
      attorneys: 'Nuestros Abogados',
      blog: 'Blog y Recursos',
      contact: 'Contáctanos',
      testimonials: 'Testimonios',
      faq: 'Preguntas Frecuentes',
      offices: 'Nuestras Oficinas',
      connect: 'Conéctate Con Nosotros',
      resources: 'Recursos',
      legalDisclaimer: 'Aviso Legal',
      accessibility: 'Accesibilidad',
      cookiePolicy: 'Política de Cookies',
      newsletter: 'Suscríbete a nuestro boletín',
      emailPlaceholder: 'Ingresa tu correo',
      subscribe: 'Suscribir',
      copyright: `© ${new Date().getFullYear()} ${BRAND.name}. Todos los derechos reservados.`,
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      sitemap: 'Mapa del Sitio',
      tagline: BRAND.tagline,
      experience: '60+ Años de Experiencia',
      available: 'Asistencia IA 24/7 Disponible',
    },
  };

  const t = content[language];

  const offices = [
    { city: 'Raleigh', state: 'NC', phone: '(919) 533-7000' },
    { city: 'Charlotte', state: 'NC', phone: '(704) 533-7000' },
    { city: 'Smithfield', state: 'NC', phone: '(919) 989-3000' },
    { city: 'Orlando', state: 'FL', phone: '(407) 955-5000' },
  ];

  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{BRAND.name}</h3>
              <p className="text-primary font-bold text-lg mb-4">{t.tagline}</p>
              <p className="text-neutral-300 text-sm mb-2">{t.experience}</p>
              <p className="text-neutral-300 text-sm">{t.available}</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.practiceAreas}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={
                    language === 'es'
                      ? '/es/areas-de-practica/inmigracion'
                      : '/practice-areas/immigration'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.immigration}
                </Link>
              </li>
              <li>
                <Link
                  href={
                    language === 'es'
                      ? '/es/areas-de-practica/lesiones-personales'
                      : '/practice-areas/personal-injury'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.personalInjury}
                </Link>
              </li>
              <li>
                <Link
                  href={
                    language === 'es'
                      ? '/es/areas-de-practica/compensacion-laboral'
                      : '/practice-areas/workers-compensation'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.workersComp}
                </Link>
              </li>
              <li>
                <Link
                  href={
                    language === 'es'
                      ? '/es/areas-de-practica/defensa-criminal'
                      : '/practice-areas/criminal-defense'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.criminalDefense}
                </Link>
              </li>
              <li>
                <Link
                  href={
                    language === 'es'
                      ? '/es/areas-de-practica/derecho-familia'
                      : '/practice-areas/family-law'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.familyLaw}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={language === 'es' ? '/es/acerca-de' : '/about'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.about}
                </Link>
              </li>
              <li>
                <Link
                  href={language === 'es' ? '/es/abogados' : '/attorneys'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.attorneys}
                </Link>
              </li>
              <li>
                <Link
                  href={language === 'es' ? '/es/blog' : '/blog'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={language === 'es' ? '/es/contacto' : '/contact'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={language === 'es' ? '/es/testimonios' : '/testimonials'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.testimonials}
                </Link>
              </li>
              <li>
                <Link
                  href={language === 'es' ? '/es/preguntas-frecuentes' : '/faq'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.faq}
                </Link>
              </li>
              <li>
                <Link
                  href={language === 'es' ? '/es/recursos' : '/resources'}

                className="text-neutral-300 hover:text-primary transition-colors"
                >
                  {t.resources}
                </Link>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.offices}</h4>
            <ul className="space-y-3 text-sm">
              {offices.map((office, index) => (
                <li key={index}

                className="text-neutral-300">
                  <span
                className="font-medium">
                    {office.city}, {office.state}
                  </span>
                  <br />
                  <a href={`tel:${office.phone}`}

                className="hover:text-primary transition-colors">
                    {office.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-secondary-600">
          <div className="max-w-md mx-auto text-center lg:text-left lg:mx-0">
            <h4 className="text-lg font-semibold mb-4">{t.connect}</h4>
            <p className="text-neutral-300 text-sm mb-4">{t.newsletter}</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="flex-1 px-4 py-2 bg-secondary-800 border border-secondary-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                {t.subscribe}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p>{t.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href={language === 'es' ? '/es/politica-privacidad' : '/privacy-policy'}

                className="hover:text-primary transition-colors"
              >
                {t.privacy}
              </Link>
              <Link
                href={language === 'es' ? '/es/terminos-servicio' : '/terms-of-service'}

                className="hover:text-primary transition-colors"
              >
                {t.terms}
              </Link>
              <Link
                href={language === 'es' ? '/es/mapa-del-sitio' : '/sitemap'}

                className="hover:text-primary transition-colors"
              >
                {t.sitemap}
              </Link>
              <Link
                href={language === 'es' ? '/es/aviso-legal' : '/legal-disclaimer'}

                className="hover:text-primary transition-colors"
              >
                {t.legalDisclaimer}
              </Link>
              <Link
                href={language === 'es' ? '/es/accesibilidad' : '/accessibility'}

                className="hover:text-primary transition-colors"
              >
                {t.accessibility}
              </Link>
              <Link
                href={language === 'es' ? '/es/politica-cookies' : '/cookie-policy'}

                className="hover:text-primary transition-colors"
              >
                {t.cookiePolicy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
