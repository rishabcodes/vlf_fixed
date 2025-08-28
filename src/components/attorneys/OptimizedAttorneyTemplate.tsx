'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Phone, ArrowRight } from 'lucide-react';
import { TRADEMARK } from '@/lib/constants/trademark';
import { Attorney } from '@/data/attorneys';
import DbImage from '@/components/DbImage';

// Lazy load heavy components
const AttorneySchema = dynamic(
  () => import('@/components/SEO/AttorneySchema').then(mod => mod.AttorneySchema),
  { ssr: false, loading: () => null }
);

// Lazy load sidebar components
const Sidebar = dynamic(() => import('./AttorneySidebar'), {
  loading: () => <div className="animate-pulse bg-white/5 rounded-2xl h-96" />
});

interface AttorneyPageTemplateProps {
  attorney: Attorney;
  language?: 'en' | 'es';
}

export function OptimizedAttorneyTemplate({ attorney, language = 'en' }: AttorneyPageTemplateProps) {
  const isSpanish = language === 'es';

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section - Load immediately */}
        <section className="relative overflow-hidden bg-black py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fadeIn">
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">{attorney.name}</h1>
                <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
                  {isSpanish ? attorney.titleEs : attorney.title}
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-full hover:bg-primary-300 transition-all font-bold text-lg hover:scale-105"
                  >
                    {isSpanish ? 'Agendar Consulta' : 'Schedule Consultation'}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="tel:1-844-965-3536"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all font-bold text-lg backdrop-blur-sm hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    1-844-YO-PELEO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Bio Section - Critical content */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 animate-slideUp">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="h-full relative min-h-[300px] md:min-h-[400px]">
                        {attorney.imageId ? (
                          <DbImage
                            id={attorney.imageId}
                            alt={attorney.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <Image
                            src={attorney.image}
                            alt={attorney.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )}
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <h2 className="text-3xl font-bold mb-4 text-white">
                        {isSpanish ? 'Acerca de' : 'About'} {attorney.name}
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed">
                          {isSpanish ? attorney.bioEs : attorney.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Lazy loaded */}
              <Sidebar attorney={attorney} language={language} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="animate-fadeIn">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                  {isSpanish ? '¿Listo para Luchar por Sus Derechos?' : 'Ready to Fight for Your Rights?'}
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {isSpanish
                  ? `Contáctenos hoy para una consulta gratuita. ${TRADEMARK.YO_PELEO_POR_TI}™`
                  : `Contact us today for a free consultation. ${TRADEMARK.YO_PELEO_POR_TI}™`}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Schema Markup - Lazy loaded */}
      <AttorneySchema attorney={attorney} />
    </>
  );
}
