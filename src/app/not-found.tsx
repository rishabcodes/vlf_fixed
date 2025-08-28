'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Phone, MessageCircle, ArrowLeft, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es');

  const content = {
    title: isSpanish ? 'Página No Encontrada' : 'Page Not Found',
    code: '404',
    description: isSpanish 
      ? 'Lo sentimos, la página que busca no existe o ha sido movida.'
      : 'Sorry, the page you are looking for does not exist or has been moved.',
    homeButton: isSpanish ? 'Ir al Inicio' : 'Go to Homepage',
    contactButton: isSpanish ? 'Contáctenos' : 'Contact Us',
    callButton: isSpanish ? 'Llamar Ahora' : 'Call Now',
    searchButton: isSpanish ? 'Buscar' : 'Search',
    suggestedPages: isSpanish ? 'Páginas Sugeridas:' : 'Suggested Pages:',
    practiceAreas: isSpanish ? 'Áreas de Práctica' : 'Practice Areas',
    attorneys: isSpanish ? 'Abogados' : 'Attorneys',
    locations: isSpanish ? 'Ubicaciones' : 'Locations',
    blog: isSpanish ? 'Blog' : 'Blog',
    faq: isSpanish ? 'Preguntas Frecuentes' : 'FAQ'
  };

  const suggestedLinks = [
    { 
      href: isSpanish ? '/es/areas-de-practica' : '/practice-areas', 
      label: content.practiceAreas,
      description: isSpanish 
        ? 'Explore nuestros servicios legales'
        : 'Explore our legal services'
    },
    { 
      href: isSpanish ? '/es/abogados' : '/attorneys', 
      label: content.attorneys,
      description: isSpanish 
        ? 'Conozca a nuestro equipo'
        : 'Meet our team'
    },
    { 
      href: isSpanish ? '/es/ubicaciones' : '/locations', 
      label: content.locations,
      description: isSpanish 
        ? 'Encuentre una oficina cerca'
        : 'Find an office near you'
    },
    { 
      href: isSpanish ? '/es/blog' : '/blog', 
      label: content.blog,
      description: isSpanish 
        ? 'Últimas noticias legales'
        : 'Latest legal news'
    },
    { 
      href: isSpanish ? '/es/preguntas-frecuentes' : '/faq', 
      label: content.faq,
      description: isSpanish 
        ? 'Respuestas a preguntas comunes'
        : 'Answers to common questions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div
          className="text-center"
        >
          {/* 404 Code */}
          <h1
            className="text-9xl font-bold text-primary-600 mb-4 animate-fadeIn"
          >
            {content.code}
          </h1>

          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {content.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={isSpanish ? '/es' : '/'}

                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Home
                className="w-5 h-5 mr-2" />
              {content.homeButton}
            </Link>
            
            <Link
              href={isSpanish ? '/es/contacto' : '/contact'}

                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <MessageCircle
                className="w-5 h-5 mr-2" />
              {content.contactButton}
            </Link>
            
            <a
              href="tel:1-844-965-3536"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              {content.callButton}
            </a>
          </div>

          {/* Suggested Pages */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {content.suggestedPages}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedLinks.map((link, index) => (
                <div
                  key={link.href}
                >
                  <Link
                    href={link.href}

                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <h4
                      className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {link.label}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {link.description}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}

                className="mt-8 inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {isSpanish ? 'Volver' : 'Go Back'}
          </button>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
