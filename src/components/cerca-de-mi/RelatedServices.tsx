'use client';

import React from 'react';

import Link from 'next/link';
import { ArrowRight, Shield, Car, Briefcase, Users, Scale, AlertTriangle } from 'lucide-react';

interface RelatedServicesProps {
  currentService: string;
  city: string;
  language?: 'en' | 'es';
}

interface Service {
  name: string;
  nameEs: string;
  icon: React.ElementType;
  description: string;
  descriptionEs: string;
  link: string;
  linkEs: string;
}

export default function RelatedServices({
  currentService,
  city,
  language = 'en',
}: RelatedServicesProps) {
  const allServices: Service[] = [
    {
      name: 'Personal Injury',
      nameEs: 'Lesiones Personales',
      icon: Shield,
      description: 'Compensation for injuries caused by accidents or negligence',
      descriptionEs: 'Compensación por lesiones causadas por accidentes o negligencia',
      link: `/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-personal-injury-cerca-de-mi`,
      linkEs: `/es/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-personal-injury-cerca-de-mi`,
    },
    {
      name: 'Car Accidents',
      nameEs: 'Accidentes de Auto',
      icon: Car,
      description: 'Legal help after vehicle collisions and traffic accidents',
      descriptionEs: 'Ayuda legal después de colisiones vehiculares y accidentes de tráfico',
      link: `/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-car-accident-cerca-de-mi`,
      linkEs: `/es/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-car-accident-cerca-de-mi`,
    },
    {
      name: 'Workers Compensation',
      nameEs: 'Compensación Laboral',
      icon: Briefcase,
      description: 'Benefits for work-related injuries and occupational diseases',
      descriptionEs: 'Beneficios por lesiones laborales y enfermedades ocupacionales',
      link: `/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-workers-compensation-cerca-de-mi`,
      linkEs: `/es/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-workers-compensation-cerca-de-mi`,
    },
    {
      name: 'Immigration',
      nameEs: 'Inmigración',
      icon: Users,
      description: 'Visas, green cards, citizenship, and deportation defense',
      descriptionEs: 'Visas, tarjetas verdes, ciudadanía y defensa contra deportación',
      link: `/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-immigration-cerca-de-mi`,
      linkEs: `/es/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-immigration-cerca-de-mi`,
    },
    {
      name: 'Criminal Defense',
      nameEs: 'Defensa Criminal',
      icon: Scale,
      description: 'Defense against criminal charges and traffic violations',
      descriptionEs: 'Defensa contra cargos criminales y violaciones de tráfico',
      link: `/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-criminal-defense-cerca-de-mi`,
      linkEs: `/es/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-criminal-defense-cerca-de-mi`,
    },
    {
      name: 'DUI/DWI Defense',
      nameEs: 'Defensa DUI/DWI',
      icon: AlertTriangle,
      description: 'Legal representation for drunk driving charges',
      descriptionEs: 'Representación legal para cargos de conducción bajo influencia',
      link: `/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-dui-dwi-cerca-de-mi`,
      linkEs: `/es/cerca-de-mi/${city.toLowerCase().replace(/ /g, '-')}-dui-dwi-cerca-de-mi`,
    },
  ];

  // Filter out current service and get 3 related services
  const relatedServices = allServices
    .filter(service => !service.name.toLowerCase().includes(currentService.toLowerCase()))
    .slice(0, 3);

  const t =
    language === 'es'
      ? {
          title: 'Otros Servicios Legales',
          subtitle: `También ofrecemos estos servicios en ${city}`,
          learnMore: 'Saber Más',
        }
      : {
          title: 'Other Legal Services',
          subtitle: `We also offer these services in ${city}`,
          learnMore: 'Learn More',
        };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedServices.map((service, index) => (
            <div
              key={index}
              className="group"
            >
              <Link
                href={language === 'es' ? service.linkEs : service.link}

                className="block h-full"
              >
                <div
                className="bg-gray-50 rounded-lg p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  {React.createElement(service.icon, {
                    className: 'w-12 h-12 text-[#6B1F2E] mb-4',
                  })}
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'es' ? service.nameEs : service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'es' ? service.descriptionEs : service.description}
                  </p>
                  <div className="flex items-center text-[#6B1F2E] font-semibold">
                    <span>{t.learnMore}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
