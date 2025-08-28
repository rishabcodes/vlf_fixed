'use client';

import { MapPin, Phone, Star, CheckCircle, ArrowRight, Users, Award, Shield } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';

interface NearMeTemplateProps {
  city: string;
  state: string;
  practiceArea: {
    key: string;
    name: { en: string; es: string };
    description: { en: string; es: string };
    icon: string;
  };
  nearestOffice: {
    name: string;
    address: string;
    phone: string;
    distance: string;
  };
  language: 'en' | 'es';
}

export function NearMeTemplate({
  city,
  state,
  practiceArea,
  nearestOffice,
  language,
}: NearMeTemplateProps) {
  const isSpanish = language === 'es';

  const content = {
    hero: {
      title: isSpanish
        ? `${practiceArea.name.es} Cerca de Mi en ${city}, ${state}`
        : `${practiceArea.name.en} Near Me in ${city}, ${state}`,
      subtitle: isSpanish
        ? `Abogados expertos en ${practiceArea.name.es.toLowerCase()} disponibles las 24 horas del día`
        : `Expert ${practiceArea.name.en.toLowerCase()} attorneys available 24/7`,
      cta1: isSpanish ? 'Llamar Ahora' : 'Call Now',
      cta2: isSpanish ? 'Consulta Gratuita' : 'Free Consultation',
    },
    stats: {
      title: isSpanish ? 'Por Qué Elegir Vasquez Law Firm' : 'Why Choose Vasquez Law Firm',
      stat1: { number: '30,000+', label: isSpanish ? 'Casos Ganados' : 'Cases Won' },
      stat2: { number: '60+', label: isSpanish ? 'Años de Experiencia' : 'Years Experience' },
      stat3: { number: '24/7', label: isSpanish ? 'Disponibilidad' : 'Availability' },
      stat4: { number: '5★', label: isSpanish ? 'Calificación' : 'Rating' },
    },
    location: {
      title: isSpanish ? 'Oficina Más Cercana' : 'Nearest Office',
      distance: isSpanish ? 'Distancia' : 'Distance',
      getDirections: isSpanish ? 'Obtener Direcciones' : 'Get Directions',
    },
    services: {
      title: isSpanish
        ? `Servicios de ${practiceArea.name.es} en ${city}`
        : `${practiceArea.name.en} Services in ${city}`,
      subtitle: isSpanish
        ? 'Representación legal completa para su caso'
        : 'Comprehensive legal representation for your case',
    },
    benefits: {
      title: isSpanish
        ? 'Beneficios de Nuestra Consulta Gratuita'
        : 'Benefits of Our Free Consultation',
      benefit1: isSpanish ? 'Evaluación experta de su caso' : 'Expert case evaluation',
      benefit2: isSpanish ? 'Sin costo ni obligación' : 'No cost or obligation',
      benefit3: isSpanish ? 'Respuestas claras a sus preguntas' : 'Clear answers to your questions',
      benefit4: isSpanish ? 'Plan de acción personalizado' : 'Personalized action plan',
      benefit5: isSpanish ? 'Disponible en español' : 'Available in Spanish',
    },
    emergency: {
      title: isSpanish ? 'Ayuda de Emergencia 24/7' : '24/7 Emergency Help',
      description: isSpanish
        ? 'Situaciones legales urgentes no esperan. Nuestro equipo está disponible las 24 horas.'
        : "Urgent legal situations don't wait. Our team is available 24 hours a day.",
      button: isSpanish ? 'Emergencia Legal' : 'Legal Emergency',
    },
    cta: {
      title: isSpanish ? 'Obtenga Ayuda Legal Hoy' : 'Get Legal Help Today',
      subtitle: isSpanish
        ? `No espere para proteger sus derechos. Contacte a nuestros expertos en ${practiceArea.name.es.toLowerCase()} ahora.`
        : `Don't wait to protect your rights. Contact our ${practiceArea.name.en.toLowerCase()} experts now.`,
    },
  };

  const getServiceSpecifics = () => {
    const services: Record<string, { en: string[]; es: string[] }> = {
      immigration: {
        en: [
          'Green Card Applications',
          'Citizenship & Naturalization',
          'Deportation Defense',
          'Family Reunification',
          'Work Permits & Visas',
          'Asylum & Refugee Cases',
        ],
        es: [
          'Solicitudes de Tarjeta Verde',
          'Ciudadanía y Naturalización',
          'Defensa contra Deportación',
          'Reunificación Familiar',
          'Permisos de Trabajo y Visas',
          'Casos de Asilo y Refugio',
        ],
      },
      'personal-injury': {
        en: [
          'Car Accident Claims',
          'Slip and Fall Cases',
          'Medical Malpractice',
          'Workplace Injuries',
          'Product Liability',
          'Wrongful Death',
        ],
        es: [
          'Reclamos por Accidentes de Auto',
          'Casos de Resbalones y Caídas',
          'Negligencia Médica',
          'Lesiones en el Trabajo',
          'Responsabilidad del Producto',
          'Muerte Injusta',
        ],
      },
      'criminal-defense': {
        en: [
          'DUI/DWI Defense',
          'Drug Crime Defense',
          'Assault & Battery',
          'Theft & Fraud',
          'Domestic Violence',
          'Traffic Violations',
        ],
        es: [
          'Defensa DUI/DWI',
          'Defensa de Crímenes de Drogas',
          'Asalto y Agresión',
          'Robo y Fraude',
          'Violencia Doméstica',
          'Violaciones de Tráfico',
        ],
      },
      'workers-compensation': {
        en: [
          'Workplace Injury Claims',
          'Disability Benefits',
          'Medical Benefits',
          'Lost Wage Recovery',
          'Permanent Disability',
          'Return to Work Programs',
        ],
        es: [
          'Reclamos por Lesiones Laborales',
          'Beneficios por Discapacidad',
          'Beneficios Médicos',
          'Recuperación de Salarios Perdidos',
          'Discapacidad Permanente',
          'Programas de Regreso al Trabajo',
        ],
      },
      'family-law': {
        en: [
          'Divorce Proceedings',
          'Child Custody',
          'Child Support',
          'Alimony & Spousal Support',
          'Property Division',
          'Domestic Violence Protection',
        ],
        es: [
          'Procedimientos de Divorcio',
          'Custodia de Menores',
          'Manutención Infantil',
          'Pensión Alimenticia',
          'División de Propiedades',
          'Protección contra Violencia Doméstica',
        ],
      },
      'car-accidents': {
        en: [
          'Auto Accident Claims',
          'Truck Accident Cases',
          'Motorcycle Accidents',
          'Hit and Run Cases',
          'Uninsured Motorist Claims',
          'Insurance Negotiations',
        ],
        es: [
          'Reclamos por Accidentes de Auto',
          'Casos de Accidentes de Camión',
          'Accidentes de Motocicleta',
          'Casos de Atropello y Fuga',
          'Reclamos de Motorista Sin Seguro',
          'Negociaciones con Seguros',
        ],
      },
    };

    return services[practiceArea.key] || services.immigration;
  };

  const serviceList = getServiceSpecifics();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-400 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                {nearestOffice.distance} {isSpanish ? 'de su ubicación' : 'from your location'}
              </span>
            </div>

            <h1
className="text-4xl md:text-6xl font-bold mb-6"
            >
              {content.hero.title}
            </h1>

            <p
className="text-xl mb-8 text-gray-200"
            >
              {content.hero.subtitle}
            </p>

            <div
className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {content.hero.cta1}: {nearestOffice.phone}
              </a>
              <Link
                href={isSpanish ? '/es/consulta-gratis' : '/free-consultation'}

                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
              >
                {content.hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{content.stats.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                content.stats.stat1,
                content.stats.stat2,
                content.stats.stat3,
                content.stats.stat4,
              ].map((stat, index) => (
                <div
                  key={index}

                className="text-center"
                >
                  <div
                className="text-4xl font-bold text-secondary-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">{content.location.title}</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">{nearestOffice.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-600">{nearestOffice.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-600" />
                      <a
                        href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        {nearestOffice.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <ArrowRight className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-medium">
                        {content.location.distance}: {nearestOffice.distance}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      {content.hero.cta1}
                    </a>
                    <button className="border border-gray-300 hover:border-gray-400 px-6 py-2 rounded-lg">
                      {content.location.getDirections}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px]">
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p>{isSpanish ? 'Mapa interactivo disponible' : 'Interactive map available'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-6xl mb-4 block">{practiceArea.icon}</span>
              <h2 className="text-3xl font-bold mb-4">{content.services.title}</h2>
              <p className="text-xl text-gray-600">{content.services.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {(serviceList && serviceList[language] ? serviceList[language] : []).map((service, index) => (
                <div
                  key={service}

                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mb-3" />
                  <h3
                className="text-lg font-semibold mb-2">{service}</h3>
                  <p className="text-gray-600 text-sm">
                    {isSpanish
                      ? 'Representación experta disponible'
                      : 'Expert representation available'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{content.benefits.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Users, title: content.benefits.benefit1 },
                { icon: Shield, title: content.benefits.benefit2 },
                { icon: Award, title: content.benefits.benefit3 },
                { icon: CheckCircle, title: content.benefits.benefit4 },
                { icon: Star, title: content.benefits.benefit5 },
              ].map((benefit, index) => (
                <div
                  key={index}

                className="text-center p-6"
                >
                  <benefit.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3
                className="font-semibold">{benefit.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{content.emergency.title}</h2>
            <p className="text-xl mb-8 text-red-200">{content.emergency.description}</p>
            <a
              href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              {content.emergency.button}
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
            <p className="text-xl mb-8 text-gray-200">{content.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${nearestOffice.phone.replace(/\D/g, '')}`}

                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {nearestOffice.phone}
              </a>
              <Link
                href={isSpanish ? '/es/contacto' : '/contact'}

                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
              >
                {isSpanish ? 'Contactar Ahora' : 'Contact Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">
                {isSpanish ? 'Envíenos un Mensaje' : 'Send Us a Message'}
              </h3>
              <ContactForm
                language={language}
                source={`near-me-${city.toLowerCase()}-${practiceArea.key}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
