'use client';

import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import Image from 'next/image';
import MiniMap from '@/components/MiniMap';

interface OfficeLocationsProps {
  language: 'en' | 'es';
}

export default function OfficeLocations({ language }: OfficeLocationsProps) {
  const content = {
    en: {
      title: 'Our Office Locations',
      subtitle: '4 Convenient Locations to Serve You Better',
      cta: 'Get Directions',
      hours: 'Office Hours',
      offices: [
        {
          city: 'Charlotte',
          state: 'NC',
          address: '5701 Executive Center Drive, Ste 103',
          zip: 'Charlotte, NC 28212',
          phone: '(704) 533-7000',
          fax: '(704) 800-6779',
          hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
          mapUrl: 'https://maps.google.com/?q=5701+Executive+Center+Drive+Charlotte+NC+28212',
        },
        {
          city: 'Raleigh',
          state: 'NC',
          address: '4426 Louisburg Road',
          zip: 'Raleigh, NC 27616',
          phone: '(919) 533-7000',
          fax: '(919) 261-1707',
          hours: 'Mon-Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 2:00 PM',
          mapUrl: 'https://maps.google.com/?q=4426+Louisburg+Road+Raleigh+NC+27616',
        },
        {
          city: 'Smithfield',
          state: 'NC',
          address: '612 S. Bright Leaf Blvd',
          zip: 'Smithfield, NC 27577',
          phone: '(919) 989-3000',
          fax: '(919) 261-1707',
          hours: 'Mon-Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 2:00 PM',
          mapUrl: 'https://maps.google.com/?q=612+S+Bright+Leaf+Blvd+Smithfield+NC+27577',
        },
        {
          city: 'Orlando',
          state: 'FL',
          address: '1111 E Amelia Street',
          zip: 'Orlando, FL 32803',
          phone: '(407) 955-5000',
          hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
          mapUrl: 'https://maps.google.com/?q=1111+E+Amelia+Street+Orlando+FL+32803',
        },
      ],
    },
    es: {
      title: 'Nuestras Ubicaciones',
      subtitle: '4 Ubicaciones Convenientes para Servirle Mejor',
      cta: 'Obtener Direcciones',
      hours: 'Horario de Oficina',
      offices: [
        {
          city: 'Charlotte',
          state: 'NC',
          address: '5701 Executive Center Drive, Ste 103',
          zip: 'Charlotte, NC 28212',
          phone: '(704) 533-7000',
          fax: '(704) 800-6779',
          hours: 'Lun-Vie: 8:00 AM - 5:00 PM',
          mapUrl: 'https://maps.google.com/?q=5701+Executive+Center+Drive+Charlotte+NC+28212',
        },
        {
          city: 'Raleigh',
          state: 'NC',
          address: '4426 Louisburg Road',
          zip: 'Raleigh, NC 27616',
          phone: '(919) 533-7000',
          fax: '(919) 261-1707',
          hours: 'Lun-Vie: 8:30 AM - 5:30 PM, Sáb: 9:00 AM - 2:00 PM',
          mapUrl: 'https://maps.google.com/?q=4426+Louisburg+Road+Raleigh+NC+27616',
        },
        {
          city: 'Smithfield',
          state: 'NC',
          address: '612 S. Bright Leaf Blvd',
          zip: 'Smithfield, NC 27577',
          phone: '(919) 989-3000',
          fax: '(919) 261-1707',
          hours: 'Lun-Vie: 8:30 AM - 5:30 PM, Sáb: 9:00 AM - 2:00 PM',
          mapUrl: 'https://maps.google.com/?q=612+S+Bright+Leaf+Blvd+Smithfield+NC+27577',
        },
        {
          city: 'Orlando',
          state: 'FL',
          address: '1111 E Amelia Street',
          zip: 'Orlando, FL 32803',
          phone: '(407) 955-5000',
          hours: 'Lun-Vie: 9:00 AM - 6:00 PM',
          mapUrl: 'https://maps.google.com/?q=1111+E+Amelia+Street+Orlando+FL+32803',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative py-16 bg-gradient-to-b from-black via-burgundy-950/5 to-black overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="gradient-orb-mixed w-80 h-80 top-1/3 left-10 animate-float-orb opacity-40" />
      <div className="gradient-orb-gold w-64 h-64 bottom-20 right-1/4 animate-float-orb-reverse opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with Logo */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/LOGO_TRANS.PNG"
              alt="Vasquez Law Firm"
              width={120}
              height={120}
              className="opacity-80"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t.title}</h2>
          <p className="text-lg text-[#C9974D]">{t.subtitle}</p>
        </div>

        {/* Mini Map */}
        <div className="mb-12 animate-slideUp">
          <MiniMap height="250px" className="rounded-xl shadow-2xl border border-[#C9974D]/30" />
        </div>

        {/* Office Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.offices.map((office, index) => {
            const officeImages: { [key: string]: string } = {
              Charlotte: '/images/offices/charlotte-office.jpg',
              Raleigh: '/images/offices/raleigh-office.jpg',
              Smithfield: '/images/offices/smithfield-office.jpg',
              Orlando: '/images/offices/orlando-office.jpg',
            };

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#6B1F2E]/20 to-[#C9974D]/10 border border-[#C9974D]/30 hover:border-[#C9974D] transition-all duration-300 animate-slideUp flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Office Photo */}
                <div className="relative h-32 sm:h-36 overflow-hidden">
                  <Image
                    src={officeImages[office.city] || '/images/offices/default-office.jpg'}

                alt={`${office.city} office exterior`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* City Header Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {office.city}, {office.state}
                    </h3>
                  </div>
                </div>

                {/* Office Details */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-[#C9974D] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm">{office.address}</p>
                        <p className="text-gray-300 text-sm">{office.zip}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#C9974D]" />
                      <a
                        href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                        className="text-white font-semibold text-sm hover:text-[#C9974D] transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#C9974D]" />
                      <p className="text-gray-300 text-xs">{office.hours}</p>
                    </div>

                    {office.fax && (
                      <div className="flex items-center gap-2">
                        <p className="text-gray-300 text-xs">Fax: {office.fax}</p>
                      </div>
                    )}
                  </div>

                  {/* Get Directions Button - Fixed at bottom */}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 mt-4 w-full px-4 py-2 bg-[#C9974D] text-black text-sm font-semibold rounded-lg hover:bg-[#E5B568] transition-colors"
                  >
                    <MapPin className="h-3 w-3" />
                    {t.cta}
                  </a>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C9974D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10 animate-fadeIn">
          <div className="mb-6">
            <p className="text-base text-gray-300 italic mb-2">
              &quot;Open your mouth for the mute, for the rights of all who are destitute. Open your
              mouth, judge righteously, defend the rights of the poor and needy.&quot;
            </p>
            <p className="text-[#C9974D] font-semibold text-sm">— Proverbs 31:8-9</p>
          </div>

          <p className="text-lg text-[#C9974D] font-bold mb-2">El Abogado Que Habla Su Idioma</p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-4">
            <a
              href="https://www.vasquezlawnc.com"
              className="text-white hover:text-[#C9974D] transition-colors text-sm"
            >
              www.vasquezlawnc.com
            </a>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <a
              href="https://www.yopeleo.com"
              className="text-white hover:text-[#C9974D] transition-colors text-sm"
            >
              www.yopeleo.com
            </a>
          </div>

          <p className="text-lg text-white mb-4">
            {language === 'en'
              ? 'Available 24/7 for emergencies'
              : 'Disponible 24/7 para emergencias'}
          </p>
          <a
            href="tel:18449673536"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9974D] to-[#E5B568] text-black text-lg font-bold rounded-full hover:scale-105 transition-transform"
          >
            <Phone className="h-5 w-5" />
            1-844-YO-PELEO
          </a>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#6B1F2E]/10 blur-3xl" />
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#C9974D]/10 blur-3xl" />
      </div>
    </section>
  );
}
