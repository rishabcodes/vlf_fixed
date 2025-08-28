'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import DbImage from '@/components/DbImage';
import {
  Globe,
  Scale,
  Phone,
  ArrowRight,
  Award,
  Users,
  Shield,
  Star,
  Briefcase,
  User,
} from 'lucide-react';
import { generateAttorneySchema } from '@/components/SEO/schemas';
import { attorneys } from '@/data/attorneys';
import { TRADEMARK } from '@/lib/constants/trademark';

interface AttorneysPageContentProps {
  language: 'en' | 'es';
}

const attorneySlugMap: Record<string, string> = {
  'william-vasquez': 'william-vasquez',
  'adrianna-ingram': 'adrianna-ingram',
  'christopher-afanador': 'christopher-afanador',
  'jillian-baucom': 'jillian-baucom',
  'kelly-vega': 'kelly-vega',
  'mark-kelsey': 'mark-kelsey',
  'rebecca-sommer': 'rebecca-sommer',
  'roselyn-v-torrellas': 'roselyn-v-torrellas',
  'judith-parkes': 'judith-parkes',
};

export default function AttorneysPageContent({ language }: AttorneysPageContentProps) {
  const [hoveredAttorney, setHoveredAttorney] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const content = {
    en: {
      title: 'Our Elite Legal Team',
      subtitle: 'Experienced Attorneys Fighting for Your Rights',
      description:
        'Meet our dedicated team of attorneys who combine decades of legal expertise with compassionate client service to deliver exceptional results.',
      viewProfile: 'View Full Profile',
      specialties: 'Practice Areas',
      languages: 'Languages',
      barAdmissions: 'Bar Admissions',
      education: 'Education',
      schedule: 'Schedule Consultation',
      teamApproach: 'Our Team Approach',
      teamDescription:
        "At Vasquez Law Firm, we believe in collaborative representation. Our attorneys work together, leveraging each other's strengths to provide comprehensive legal solutions for our clients throughout North Carolina and Florida.",
      whyChoose: 'Why Choose Our Attorneys?',
      experience: '35+ Years of Excellence',
      technology: 'Cutting-Edge Legal Strategies',
      bilingual: 'Bilingual Team (English & Spanish)',
      results: 'Thousands of Successful Cases',
      cta: {
        title: 'Ready to Fight for Your Rights?',
        description: `Contact our experienced attorneys today for a free consultation. ${TRADEMARK.YO_PELEO_POR_TI}™`,
        button1: 'Free Case Evaluation',
        button2: 'Call: 1-844-YO-PELEO',
      },
    },
    es: {
      title: 'Nuestro Equipo Legal Elite',
      subtitle: 'Abogados Experimentados Luchando por Sus Derechos',
      description:
        'Conozca a nuestro dedicado equipo de abogados que combinan décadas de experiencia legal con servicio compasivo al cliente para ofrecer resultados excepcionales.',
      viewProfile: 'Ver Perfil Completo',
      specialties: 'Áreas de Práctica',
      languages: 'Idiomas',
      barAdmissions: 'Admisiones al Colegio de Abogados',
      education: 'Educación',
      schedule: 'Agendar Consulta',
      teamApproach: 'Nuestro Enfoque de Equipo',
      teamDescription:
        'En Vasquez Law Firm, creemos en la representación colaborativa. Nuestros abogados trabajan juntos, aprovechando las fortalezas de cada uno para brindar soluciones legales integrales a nuestros clientes en Carolina del Norte y Florida.',
      whyChoose: '¿Por Qué Elegir a Nuestros Abogados?',
      experience: 'Más de 35 Años de Excelencia',
      technology: 'Estrategias Legales de Vanguardia',
      bilingual: 'Equipo Bilingüe (Inglés y Español)',
      results: 'Miles de Casos Exitosos',
      cta: {
        title: '¿Listo para Luchar por Sus Derechos?',
        description: `Contáctenos hoy para una consulta gratuita con nuestros abogados experimentados. ${TRADEMARK.YO_PELEO_POR_TI}™`,
        button1: 'Evaluación Gratuita',
        button2: 'Llame: 1-844-YO-PELEO',
      },
    },
  };

  const t = content[language];
  const isSpanish = language === 'es';

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden bg-black py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-6">{t.subtitle}</p>
            <p className="max-w-3xl mx-auto text-lg text-gray-300">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Attorneys Grid with Modern Cards */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney, index) => (
              <div
                key={attorney.id}
                onMouseEnter={() => setHoveredAttorney(attorney.id)}
                onMouseLeave={() => setHoveredAttorney(null)}
                className="group relative animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 flex flex-col h-full">
                  {/* Glow Effect */}
                  {hoveredAttorney === attorney.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none transition-opacity duration-300" />
                  )}

                  <div className="h-80 relative overflow-hidden flex-shrink-0 bg-gray-900">
                    {!imageErrors.has(attorney.id) ? (
                      attorney.imageId ? (
                        <DbImage
                          id={attorney.imageId}
                          alt={attorney.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={() => {
                            setImageErrors(prev => new Set(prev).add(attorney.id));
                          }}
                        />
                      ) : (
                        <Image
                          src={attorney.image}
                          alt={attorney.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={() => {
                            setImageErrors(prev => new Set(prev).add(attorney.id));
                          }}
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <User className="w-24 h-24 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white">{attorney.name}</h3>
                      <p className="text-primary font-semibold">
                        {isSpanish ? attorney.titleEs : attorney.title}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 relative flex flex-col flex-grow">
                    <p className="text-gray-400 mb-4 line-clamp-3 min-h-[4.5rem]">
                      {isSpanish ? attorney.bioEs : attorney.bio}
                    </p>

                    {/* Practice Areas with Modern Pills */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <Scale className="w-4 h-4 mr-2 text-primary" />
                        {t.specialties}
                      </h4>
                      <div className="flex flex-wrap gap-2 min-h-[4rem]">
                        {attorney.practiceAreas.slice(0, 3).map(specialty => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-primary/10 text-xs text-primary rounded-full border border-primary/20 h-fit"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-6 min-h-[3rem]">
                      {attorney.languages.length > 0 ? (
                        <>
                          <h4 className="font-semibold text-white mb-1 flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-primary" />
                            {t.languages}
                          </h4>
                          <p className="text-sm text-gray-400">{attorney.languages.join(', ')}</p>
                        </>
                      ) : (
                        <div className="h-full"></div>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/attorneys/${attorneySlugMap[attorney.slug || attorney.id] || attorney.slug || attorney.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full hover:bg-primary-300 transition-all font-bold group-hover:scale-105 w-full justify-center"
                      >
                        {t.viewProfile}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Approach Section with Modern Stats */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.teamApproach}
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-300">{t.teamDescription}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                text: t.experience,
                value: '35+',
                metric: 'Years',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                text: t.technology,
                value: 'Elite',
                metric: 'Status',
              },
              {
                icon: <Globe className="w-8 h-8" />,
                text: t.bilingual,
                value: '2',
                metric: 'Languages',
              },
              {
                icon: <Users className="w-8 h-8" />,
                text: t.results,
                value: '30K+',
                metric: 'Cases Won',
              },
            ].map((item, index) => (
              <div
                key={index}

                className="relative group animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 text-center">
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <div className="text-3xl font-black text-white mb-1">{item.value}</div>
                  <div className="text-xs text-primary uppercase tracking-wider mb-2">
                    {item.metric}
                  </div>
                  <p className="text-sm text-gray-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.whyChoose}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase className="w-12 h-12" />,
                title: isSpanish ? 'Experiencia Comprobada' : 'Proven Experience',
                description: isSpanish
                  ? 'Décadas de experiencia combinada en múltiples áreas del derecho'
                  : 'Decades of combined experience across multiple practice areas',
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: isSpanish ? 'Enfoque Personalizado' : 'Personal Approach',
                description: isSpanish
                  ? 'Cada cliente recibe atención individual y estrategias personalizadas'
                  : 'Every client receives individual attention and customized strategies',
              },
              {
                icon: <Star className="w-12 h-12" />,
                title: isSpanish ? 'Resultados Excepcionales' : 'Exceptional Results',
                description: isSpanish
                  ? 'Historial comprobado de victorias y acuerdos exitosos'
                  : 'Proven track record of victories and successful settlements',
              },
            ].map((feature, index) => (
              <div
                key={index}

                className="text-center animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-primary mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.cta.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">{t.cta.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-full hover:bg-primary-300 transition-all font-bold text-lg hover:scale-105"
              >
                {t.cta.button1}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:1-844-965-3536"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all font-bold text-lg backdrop-blur-sm hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {t.cta.button2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      {attorneys.map(attorney => (
        <Script
          key={attorney.id}
          id={`attorney-schema-${attorney.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateAttorneySchema(attorney)),
          }}
        />
      ))}
    </div>
  );
}
