'use client';

import { Phone, MapPin, GraduationCap, Scale, Users, Globe, ArrowRight } from 'lucide-react';
import { Attorney } from '@/data/attorneys';

interface AttorneySidebarProps {
  attorney: Attorney;
  language?: 'en' | 'es';
}

export default function AttorneySidebar({ attorney, language = 'en' }: AttorneySidebarProps) {
  const isSpanish = language === 'es';

  return (
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
                {bar.description && <p className="text-sm text-gray-400">{bar.description}</p>}
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

      {/* Languages */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-slideUp" style={{ animationDelay: '300ms' }}>
        <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
          <Globe className="mr-3 h-6 w-6" />
          {isSpanish ? 'Idiomas' : 'Languages'}
        </h3>
        <div className="flex flex-wrap gap-3">
          {attorney.languages.map((lang, index) => (
            <span key={index}

                className="px-4 py-2 bg-primary/10 text-white rounded-full border border-primary/20">
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
