'use client';

import Image from 'next/image';
import DbImage from '@/components/DbImage';
import {
  Phone,
  ArrowRight,
  Globe,
  Scale,
  GraduationCap,
  MapPin,
  Shield,
  Users,
  Briefcase,
} from 'lucide-react';
import { TRADEMARK } from '@/lib/constants/trademark';
import { Attorney } from '@/data/attorneys';
import { AttorneySchema } from '@/components/SEO/AttorneySchema';

interface AttorneyPageTemplateProps {
  attorney: Attorney;
  language?: 'en' | 'es';
}

export function AttorneyPageTemplate({ attorney, language = 'en' }: AttorneyPageTemplateProps) {
  const isSpanish = language === 'es';

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section with Modern Design */}
        <section className="relative overflow-hidden bg-black py-24">
          {/* Animated Background */}
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
                {attorney.specialization && (
                  <p className="text-lg text-gray-300 mb-8">{attorney.specialization}</p>
                )}
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
              {/* Main Bio Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Attorney Photo & Bio */}
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
                          />
                        ) : (
                          <Image
                            src={attorney.image}
                            alt={attorney.name}
                            fill
                            className="object-cover"
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

                {/* Practice Areas */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp" style={{ animationDelay: '100ms' }}>
                  <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
                    <Scale className="mr-3 h-8 w-8 text-primary" />
                    {isSpanish ? 'Áreas de Práctica' : 'Practice Areas'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {attorney.practiceAreas.map((area, index) => (
                      <div
                        key={index}

                className="flex items-center p-4 bg-primary/10 rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        <Briefcase className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span
                className="text-white">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notable Cases or Achievements */}
                {attorney.achievements && attorney.achievements.length > 0 && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-3xl font-bold mb-6 text-white flex items-center">
                      <Shield className="mr-3 h-8 w-8 text-primary" />
                      {isSpanish ? 'Logros Notables' : 'Notable Achievements'}
                    </h2>
                    <div className="space-y-4">
                      {attorney.achievements.map((achievement, index) => (
                        <div key={index}

                className="flex items-start">
                          <div className="mt-1.5 w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          <p
                className="text-gray-300">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp">
                  <h3 className="text-xl font-bold mb-6 text-primary">
                    {isSpanish ? 'Información de Contacto' : 'Contact Information'}
                  </h3>
                  <div className="space-y-4">
                    {attorney.phone && (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-primary mr-3" />
                        <a href={`tel:${attorney.phone}`}

                className="text-white hover:text-primary transition-colors">
                          {attorney.phone}
                        </a>
                      </div>
                    )}
                    {attorney.offices && attorney.offices.length > 0 && (
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                        <div>
                          <p className="text-white">
                            {isSpanish ? 'Oficinas' : 'Offices'}: {attorney.offices.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <a
                    href="/contact"
                    className="mt-6 w-full bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center"
                  >
                    {isSpanish ? 'Agendar Consulta' : 'Schedule Consultation'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>

                {/* Education */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp" style={{ animationDelay: '100ms' }}>
                  <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                    <GraduationCap className="mr-3 h-6 w-6" />
                    {isSpanish ? 'Educación' : 'Education'}
                  </h3>
                  <div className="space-y-6">
                    {attorney.education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-white">{edu.institution}</h4>
                        <p className="text-gray-400">{edu.degree}</p>
                        {edu.year && <p className="text-sm text-gray-500">{edu.year}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar Admissions */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp" style={{ animationDelay: '200ms' }}>
                  <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                    <Scale className="mr-3 h-6 w-6" />
                    {isSpanish ? 'Admisiones al Colegio de Abogados' : 'Bar Admissions'}
                  </h3>
                  <div className="space-y-3">
                    {attorney.barAdmissions.map((bar, index) => (
                      <div key={index}

                className="flex items-start">
                        <div className="mt-1.5 w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        <div>
                          <p
                className="text-white font-semibold">{bar.state}</p>
                          {bar.description && (
                            <p className="text-sm text-gray-400">{bar.description}</p>
                          )}
                          {bar.year && (
                            <p className="text-sm text-gray-400">
                              {isSpanish ? `Admitido en ${bar.year}` : `Admitted in ${bar.year}`}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Associations */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp" style={{ animationDelay: '300ms' }}>
                  <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                    <Users className="mr-3 h-6 w-6" />
                    {isSpanish ? 'Asociaciones Profesionales' : 'Professional Associations'}
                  </h3>
                  <div className="space-y-4">
                    {attorney.associations.map((assoc, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-white">{assoc.name}</h4>
                        {assoc.role && <p className="text-gray-400">{assoc.role}</p>}
                        {assoc.years && <p className="text-sm text-gray-500">{assoc.years}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                    <Globe className="mr-3 h-6 w-6" />
                    {isSpanish ? 'Idiomas' : 'Languages'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {attorney.languages.map((lang, index) => (
                      <span
                        key={index}

                className="px-4 py-2 bg-primary/10 text-white rounded-full border border-primary/20"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
                  {isSpanish
                    ? '¿Listo para Luchar por Sus Derechos?'
                    : 'Ready to Fight for Your Rights?'}
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {isSpanish
                  ? `Contáctenos hoy para una consulta gratuita. ${TRADEMARK.YO_PELEO_POR_TI}™`
                  : `Contact us today for a free consultation. ${TRADEMARK.YO_PELEO_POR_TI}™`}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-full hover:bg-primary-300 transition-all font-bold text-lg hover:scale-105"
                >
                  {isSpanish ? 'Evaluación Gratuita' : 'Free Case Evaluation'}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="tel:1-844-965-3536"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all font-bold text-lg backdrop-blur-sm hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  {isSpanish ? 'Llame: 1-844-YO-PELEO' : 'Call: 1-844-YO-PELEO'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Schema Markup */}
      <AttorneySchema attorney={attorney} />
    </>
  );
}
