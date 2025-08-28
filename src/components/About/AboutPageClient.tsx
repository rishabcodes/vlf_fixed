'use client';

import Image from 'next/image';
import DbImage from '@/components/DbImage';

import Script from 'next/script';
import {
  Phone,
  ArrowRight,
  MapPin,
  Users,
  Award,
  Scale,
  Shield,
  Heart,
  Target,
  Briefcase,
} from 'lucide-react';
import { generateOrganizationSchema } from '@/components/SEO/schemas';
import { TRADEMARK } from '@/lib/constants/trademark';
import { useState } from 'react';

interface AboutPageClientProps {
  language?: 'en' | 'es';
}

export default function AboutPageClient({ language: propLanguage }: AboutPageClientProps = {}) {
  const [language] = useState<'en' | 'es'>(propLanguage || 'en');
  const isSpanish = language === 'es';

  const content = {
    en: {
      title: 'About Vasquez Law Firm',
      subtitle: 'Fighting for You Since 2011',
      slogan: `${TRADEMARK.YO_PELEO_POR_TI} - From humble beginnings to becoming North Carolina's trusted voice for justice, we've built our reputation on dedication, integrity, and results.`,
      ourStory: 'Our Story',
      storyText1:
        'Founded in 2011 by William J. Vásquez, our firm began with a simple yet powerful mission: to provide accessible, high-quality legal representation to all members of our community, regardless of their background or circumstances.',
      storyText2:
        "What started as a solo practice in Raleigh has grown into one of North Carolina's most innovative law firms, with four offices across NC and Florida. Our growth has been driven by our unwavering commitment to our clients and our core values.",
      storyText3:
        "Today, we're proud to be pioneers in combining traditional legal expertise with cutting-edge technology, including AI-powered assistants that help us provide faster, more efficient service while maintaining the personal touch our clients deserve.",
      ourMission: 'Our Mission',
      missionText:
        'To provide accessible, high-quality legal representation to all members of our community, regardless of their background or circumstances. We leverage technology to break down barriers and ensure justice is available to everyone.',
      ourValues: 'Our Core Values',
      valuesDesc: 'These five principles guide everything we do at Vasquez Law Firm',
      value1: {
        title: 'MY FAMILY, YOUR FAMILY',
        desc: 'We value our team and clients as family, fostering relationships built on mutual investment and care',
      },
      value2: {
        title: 'HONESTY',
        desc: 'We are straightforward and honest from the very first consultation, ensuring trust and transparency in every interaction',
      },
      value3: {
        title: 'DEDICATION',
        desc: 'We are committed to the growth of everyone in our firm, helping our employees move into their strengths',
      },
      value4: {
        title: 'QUALITY EXPERIENCE',
        desc: 'We strive to create a fun and productive workspace that enhances the overall quality of life for our team',
      },
      value5: {
        title: 'I FIGHT (YO PELEO)',
        desc: '"YO PELEO" – We are dedicated to fighting for our clients and our team with passion and commitment',
      },
      ourCommitment: 'Our Commitment to Innovation',
      commitmentText:
        "As pioneers in AI-enhanced legal services, we're committed to using technology responsibly to improve access to justice. Our AI assistants work alongside our attorneys to provide faster responses, more accurate case analysis, and better outcomes for our clients.",
      meetTeam: 'Meet Our Team',
      teamDesc: 'Experienced attorneys and dedicated staff committed to fighting for your rights',
      ourLocations: 'Our Locations',
      locationsDesc: 'Proudly serving 50+ communities across North Carolina and Florida',
      mainOffice: 'MAIN OFFICE',
      recognition: 'Recognition & Awards',
      recognitionDesc:
        'Our dedication to excellence has been recognized by clients and peers alike',
      award1: 'Top Immigration Law Firm',
      award2: 'Innovation in Legal Tech',
      award3: 'Community Service Excellence',
      award4: 'Client Choice Award',
      award4Years: '5 Years Running',
      associations: 'Professional Associations',
      assoc1: 'American Immigration Lawyers Association (AILA)',
      assoc2: 'North Carolina State Bar',
      assoc3: 'Florida Bar',
      assoc4: 'National Association of Criminal Defense Lawyers',
      readyToJoin: 'Ready to Join the Vasquez Family?',
      readyDesc: 'Experience the difference of a law firm that truly fights for you',
      scheduleFree: 'Schedule Your Free Consultation',
      callNow: 'Call Now: 1-844-YO-PELEO',
      ourJourney: 'Our Journey',
      milestones: [
        {
          year: '2011',
          event: 'Vasquez Law Firm Founded',
          description: 'Started with a vision to provide accessible legal services',
        },
        {
          year: '2015',
          event: 'Charlotte Office Opened',
          description: 'Expanded to serve the Queen City community',
        },
        {
          year: '2018',
          event: 'Smithfield Location Added',
          description: 'Growing to better serve rural communities',
        },
        {
          year: '2020',
          event: 'Orlando Office Launch',
          description: 'First expansion outside North Carolina',
        },
        {
          year: '2023',
          event: 'AI Integration',
          description: 'Pioneering technology-enhanced legal services',
        },
      ],
      yearsExperience: 'Years Combined Experience',
      satisfiedClients: 'Satisfied Clients',
      officeLocations: 'Office Locations',
      successRate: 'Success Rate',
      tagline: `"${TRADEMARK.I_FIGHT_FOR_YOU}" isn't just words - it's our promise to every client who walks through our doors. From the courtroom to the conference room, we fight tirelessly for justice.`,
    },
    es: {
      title: 'Acerca de Vasquez Law Firm',
      subtitle: 'Luchando por Ti Desde 2011',
      slogan: `${TRADEMARK.YO_PELEO_POR_TI} - Desde humildes comienzos hasta convertirnos en la voz confiable de justicia en Carolina del Norte, hemos construido nuestra reputación en dedicación, integridad y resultados.`,
      ourStory: 'Nuestra Historia',
      storyText1:
        'Fundada en 2011 por William J. Vásquez, nuestra firma comenzó con una misión simple pero poderosa: proporcionar representación legal accesible y de alta calidad a todos los miembros de nuestra comunidad, independientemente de su origen o circunstancias.',
      storyText2:
        'Lo que comenzó como una práctica individual en Raleigh ha crecido hasta convertirse en una de las firmas de abogados más innovadoras de Carolina del Norte, con cuatro oficinas en NC y Florida. Nuestro crecimiento ha sido impulsado por nuestro compromiso inquebrantable con nuestros clientes y nuestros valores fundamentales.',
      storyText3:
        'Hoy, estamos orgullosos de ser pioneros en combinar experiencia legal tradicional con tecnología de vanguardia, incluyendo asistentes impulsados por IA que nos ayudan a brindar un servicio más rápido y eficiente mientras mantenemos el toque personal que nuestros clientes merecen.',
      ourMission: 'Nuestra Misión',
      missionText:
        'Proporcionar representación legal accesible y de alta calidad a todos los miembros de nuestra comunidad, independientemente de su origen o circunstancias. Aprovechamos la tecnología para derribar barreras y garantizar que la justicia esté disponible para todos.',
      ourValues: 'Nuestros Valores Fundamentales',
      valuesDesc: 'Estos cinco principios guían todo lo que hacemos en Vasquez Law Firm',
      value1: {
        title: 'MI FAMILIA, TU FAMILIA',
        desc: 'Valoramos a nuestro equipo y clientes como familia, fomentando relaciones basadas en inversión mutua y cuidado',
      },
      value2: {
        title: 'HONESTIDAD',
        desc: 'Somos directos y honestos desde la primera consulta, asegurando confianza y transparencia en cada interacción',
      },
      value3: {
        title: 'DEDICACIÓN',
        desc: 'Estamos comprometidos con el crecimiento de todos en nuestra firma, ayudando a nuestros empleados a desarrollar sus fortalezas',
      },
      value4: {
        title: 'EXPERIENCIA DE CALIDAD',
        desc: 'Nos esforzamos por crear un espacio de trabajo divertido y productivo que mejore la calidad de vida general de nuestro equipo',
      },
      value5: {
        title: 'YO PELEO',
        desc: '"YO PELEO" – Estamos dedicados a luchar por nuestros clientes y nuestro equipo con pasión y compromiso',
      },
      ourCommitment: 'Nuestro Compromiso con la Innovación',
      commitmentText:
        'Como pioneros en servicios legales mejorados con IA, estamos comprometidos a usar la tecnología de manera responsable para mejorar el acceso a la justicia. Nuestros asistentes de IA trabajan junto a nuestros abogados para brindar respuestas más rápidas, análisis de casos más precisos y mejores resultados para nuestros clientes.',
      meetTeam: 'Conozca a Nuestro Equipo',
      teamDesc:
        'Abogados experimentados y personal dedicado comprometido a luchar por sus derechos',
      ourLocations: 'Nuestras Ubicaciones',
      locationsDesc:
        'Sirviendo con orgullo a más de 50 comunidades en Carolina del Norte y Florida',
      mainOffice: 'OFICINA PRINCIPAL',
      recognition: 'Reconocimientos y Premios',
      recognitionDesc:
        'Nuestra dedicación a la excelencia ha sido reconocida por clientes y colegas por igual',
      award1: 'Mejor Firma de Inmigración',
      award2: 'Innovación en Tecnología Legal',
      award3: 'Excelencia en Servicio Comunitario',
      award4: 'Premio Elección del Cliente',
      award4Years: '5 Años Consecutivos',
      associations: 'Asociaciones Profesionales',
      assoc1: 'Asociación Americana de Abogados de Inmigración (AILA)',
      assoc2: 'Colegio de Abogados de Carolina del Norte',
      assoc3: 'Colegio de Abogados de Florida',
      assoc4: 'Asociación Nacional de Abogados de Defensa Criminal',
      readyToJoin: '¿Listo para Unirse a la Familia Vasquez?',
      readyDesc: 'Experimente la diferencia de una firma de abogados que realmente lucha por usted',
      scheduleFree: 'Programe Su Consulta Gratuita',
      callNow: 'Llame Ahora: 1-844-YO-PELEO',
      ourJourney: 'Nuestro Viaje',
      milestones: [
        {
          year: '2011',
          event: 'Fundación de Vasquez Law Firm',
          description: 'Comenzó con una visión de proporcionar servicios legales accesibles',
        },
        {
          year: '2015',
          event: 'Apertura de Oficina en Charlotte',
          description: 'Expandido para servir a la comunidad de Queen City',
        },
        {
          year: '2018',
          event: 'Ubicación de Smithfield Agregada',
          description: 'Creciendo para servir mejor a las comunidades rurales',
        },
        {
          year: '2020',
          event: 'Lanzamiento de Oficina en Orlando',
          description: 'Primera expansión fuera de Carolina del Norte',
        },
        {
          year: '2023',
          event: 'Integración de IA',
          description: 'Pioneros en servicios legales mejorados con tecnología',
        },
      ],
      yearsExperience: 'Años de Experiencia Combinada',
      satisfiedClients: 'Clientes Satisfechos',
      officeLocations: 'Ubicaciones de Oficina',
      successRate: 'Tasa de Éxito',
      tagline: `"${TRADEMARK.YO_PELEO_POR_TI}" no son solo palabras - es nuestra promesa a cada cliente que cruza nuestras puertas. Desde la sala del tribunal hasta la sala de conferencias, luchamos incansablemente por la justicia.`,
    },
  };

  const t = content[language];

  const coreValues = [
    {
      title: t.value1.title,
      description: t.value1.desc,
      icon: <Heart className="h-8 w-8" />,
    },
    {
      title: t.value2.title,
      description: t.value2.desc,
      icon: <Shield className="h-8 w-8" />,
    },
    {
      title: t.value3.title,
      description: t.value3.desc,
      icon: <Target className="h-8 w-8" />,
    },
    {
      title: t.value4.title,
      description: t.value4.desc,
      icon: <Award className="h-8 w-8" />,
    },
    {
      title: t.value5.title,
      description: t.value5.desc,
      icon: <Scale className="h-8 w-8" />,
    },
  ];

  const offices = [
    {
      city: 'Charlotte',
      state: 'NC',
      address: '5701 Executive Center Dr, Ste 103',
      phone: '(704) 533-7000',
      isMainOffice: true,
    },
    {
      city: 'Raleigh',
      state: 'NC',
      address: '4426 Louisburg Road',
      phone: '(919) 533-7000',
    },
    {
      city: 'Smithfield',
      state: 'NC',
      address: '612 S Brightleaf Blvd',
      phone: '(919) 989-3000',
    },
    {
      city: 'Orlando',
      state: 'FL',
      address: '1111 E Amelia Street',
      phone: '(407) 955-5000',
    },
  ];

  const stats = [
    { number: '60+', label: t.yearsExperience, icon: <Briefcase className="h-6 w-6" /> },
    { number: '5,000+', label: t.satisfiedClients, icon: <Users className="h-6 w-6" /> },
    { number: '4', label: t.officeLocations, icon: <MapPin className="h-6 w-6" /> },
    { number: '98%', label: t.successRate, icon: <Award className="h-6 w-6" /> },
  ];

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
            <div
              className="absolute inset-0"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div
              className="text-center max-w-4xl mx-auto"
              suppressHydrationWarning
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">{t.title}</h1>
              <p className="text-xl md:text-2xl mb-4 font-semibold text-primary">{t.subtitle}</p>
              <p className="text-lg mb-12 text-gray-300 max-w-3xl mx-auto">{t.slogan}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    suppressHydrationWarning
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all"
                  >
                    <div
                      className="text-primary mb-3 flex justify-center"
                      suppressHydrationWarning
                    >{stat.icon}</div>
                    <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div
                className="text-center mb-16"
                suppressHydrationWarning
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {t.ourStory.split(' ')[0]}{' '}
                  <span className="text-primary">{t.ourStory.split(' ')[1]}</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {isSpanish
                    ? 'De un solo abogado con una visión a una firma de servicios completos sirviendo a miles en el sureste'
                    : 'From a single attorney with a vision to a full-service law firm serving thousands across the Southeast'}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed mb-6">{t.storyText1}</p>
                    <p className="text-gray-300 leading-relaxed mb-6">{t.storyText2}</p>
                    <p className="text-gray-300 leading-relaxed mb-8">{t.storyText3}</p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {TRADEMARK.YO_PELEO_POR_TI}
                    </h3>
                    <p className="text-gray-300">{t.tagline}</p>
                  </div>
                </div>

                <div
                  className="relative"
                  suppressHydrationWarning
                >
                  <Image
                    src="/images/about/team-photo.jpg"
                    alt="Vasquez Law Firm Team"
                    width={600}
                    height={400}

                className="rounded-2xl shadow-2xl w-full object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-6 shadow-xl">
                    <p className="text-black font-bold text-xl">
                      {isSpanish ? 'Desde 2011' : 'Since 2011'}
                    </p>
                    <p className="text-black/80">
                      {isSpanish ? 'Sirviendo a Nuestra Comunidad' : 'Serving Our Community'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <h3 className="text-3xl font-bold text-center mb-12 text-white">
                  {t.ourJourney.split(' ')[0]}{' '}
                  <span className="text-primary">{t.ourJourney.split(' ')[1]}</span>
                </h3>
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
                {t.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    suppressHydrationWarning
                    className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <div className="flex-1" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-black z-10" />
                    <div
                      className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}
                    >
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                        <p className="text-primary font-bold text-lg mb-2">{milestone.year}</p>
                        <h4 className="text-white font-semibold text-xl mb-2">{milestone.event}</h4>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Mission */}
              <div
                className="text-center mb-20"
                suppressHydrationWarning
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {t.ourMission.split(' ')[0]}{' '}
                  <span className="text-primary">{t.ourMission.split(' ')[1]}</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {t.missionText}
                </p>
              </div>

              {/* Core Values */}
              <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
                  {t.ourValues.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-primary">{t.ourValues.split(' ').slice(-1)[0]}</span>
                </h2>
                <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
                  {t.valuesDesc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {coreValues.map((value, index) => (
                    <div
                      key={index}
                      suppressHydrationWarning
                      className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all ${
                        index === 4 ? 'lg:col-span-3 lg:max-w-2xl lg:mx-auto' : ''
                      }`}
                    >
                      <div className="text-primary mb-4">{value.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitment to Excellence */}
              <div
                className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-12 border border-primary/20"
                suppressHydrationWarning
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  {t.ourCommitment.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-primary">{t.ourCommitment.split(' ').slice(-1)[0]}</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
                  {t.commitmentText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div
                className="text-center mb-16"
                suppressHydrationWarning
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {t.meetTeam.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-primary">{t.meetTeam.split(' ').slice(-1)[0]}</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.teamDesc}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    name: 'William J. Vásquez',
                    title: isSpanish ? 'Abogado Fundador' : 'Founding Attorney',
                    image: '/images/attorneys/william-vasquez.jpg',
                    imageId: 'cmeublit3000jsfmz573fl78r', // william-vasquez.jpg
                  },
                  {
                    name: 'Jillian Baucom',
                    title: isSpanish ? 'Abogada Gerente' : 'Managing Attorney',
                    image: '/images/attorneys/jillian-baucom.jpg',
                    imageId: 'cmeublcg50009sfmzbrh6qnzr', // jillian-baucom.jpg
                  },
                  {
                    name: 'Christopher Afanador',
                    title: isSpanish ? 'Abogado de Inmigración' : 'Immigration Attorney',
                    image: '/images/attorneys/christopher-afanador.jpg',
                    imageId: 'cmeublbqt0008sfmzp0whkmir', // christopher-afanador.jpg
                  },
                  {
                    name: 'Adrianna Ingram',
                    title: isSpanish ? 'Abogada de Inmigración' : 'Immigration Attorney',
                    image: '/images/attorneys/adriana-ingram.webp',
                    imageId: 'cmeubl9fw0006sfmz2kjgcvcd', // adrianna-ingram.jpg
                  },
                  {
                    name: 'Roselyn V. Torrellas',
                    title: isSpanish ? 'Abogada' : 'Attorney',
                    image: '/images/attorneys/roselyn-torrellas.jpg',
                    imageId: 'cmeublgs4000hsfmzkcrfbdk7', // roselyn-torrellas.jpg
                  },
                  {
                    name: 'Mark Kelsey',
                    title: isSpanish ? 'Abogado' : 'Attorney',
                    image: '/images/attorneys/mark-kelsey.jpg',
                    imageId: 'cmeublf5d000esfmzdxedu2x2', // mark-kelsey.jpg
                  },
                ].map((attorney, index) => (
                  <div
                    key={index}
                    suppressHydrationWarning
                    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all group"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <DbImage
                        id={attorney.imageId}
                        alt={attorney.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority={index < 3} // Priority for first 3 images
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{attorney.name}</h3>
                      <p className="text-primary">{attorney.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  {t.ourLocations.split(' ')[0]}{' '}
                  <span className="text-primary">{t.ourLocations.split(' ')[1]}</span>
                </h2>
                <p className="text-xl text-gray-300">{t.locationsDesc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offices.map((office, index) => (
                  <a
                    key={index}
                    suppressHydrationWarning
                    href={`/${isSpanish ? 'es/' : ''}locations/${office.city.toLowerCase()}`}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    {office.isMainOffice && (
                      <div className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                        {t.mainOffice}
                      </div>
                    )}
                    <MapPin className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {office.city}, {office.state}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{office.address}</p>
                    <p className="text-primary font-semibold">{office.phone}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div
                className="text-center mb-16"
                suppressHydrationWarning
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {t.recognition.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-primary">{t.recognition.split(' ').slice(-1)[0]}</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.recognitionDesc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  { title: t.award1, icon: '🏆', year: '2023' },
                  { title: t.award2, icon: '🚀', year: '2023' },
                  { title: t.award3, icon: '❤️', year: '2022-2023' },
                  { title: t.award4, icon: '⭐', year: t.award4Years },
                ].map((award, index) => (
                  <div
                    key={index}
                    suppressHydrationWarning
                    className="text-center bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div
                      className="text-5xl mb-4"
                      suppressHydrationWarning
                    >{award.icon}</div>
                    <p className="text-lg font-bold text-white mb-2">{award.title}</p>
                    <p className="text-sm text-primary">{award.year}</p>
                  </div>
                ))}
              </div>

              {/* Professional Associations */}
              <div>
                <h3 className="text-3xl font-bold text-center text-white mb-8">
                  {t.associations.split(' ')[0]}{' '}
                  <span className="text-primary">{t.associations.split(' ')[1]}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[t.assoc1, t.assoc2, t.assoc3, t.assoc4].map((association, index) => (
                    <div
                      key={index}
                      suppressHydrationWarning
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all"
                    >
                      <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                      <p
                        className="text-white font-medium"
                        suppressHydrationWarning
                      >{association}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-300">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-black">{t.readyToJoin}</h2>
              <p className="text-xl mb-8 text-black/80">{t.readyDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={isSpanish ? '/es/contacto' : '/contact'}
                  suppressHydrationWarning
                  className="px-8 py-4 bg-black text-primary font-bold rounded-lg shadow-lg hover:bg-gray-900 transition-all inline-flex items-center justify-center"
                >
                  {t.scheduleFree}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="tel:1-844-967-3536"
                  suppressHydrationWarning
                  className="px-8 py-4 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t.callNow}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Structured Data for SEO */}
      <Script
        id="about-page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            mainEntity: {
              '@type': 'LegalService',
              name: 'Vasquez Law Firm, PLLC',
              description: isSpanish
                ? 'Fundada en 2011, Vasquez Law Firm proporciona representación legal accesible y de alta calidad en Carolina del Norte y Florida.'
                : 'Founded in 2011, Vasquez Law Firm provides accessible, high-quality legal representation across North Carolina and Florida.',
              foundingDate: '2011',
              founder: {
                '@type': 'Person',
                name: 'William J. Vásquez',
              },
              slogan: 'YO PELEO POR TI™ - I Fight For You',
              numberOfEmployees: '10+',
              areaServed: ['North Carolina', 'Florida'],
              award: [
                isSpanish ? 'Mejor Firma de Inmigración 2023' : 'Top Immigration Law Firm 2023',
                isSpanish
                  ? 'Premio de Innovación en Tecnología Legal 2023'
                  : 'Innovation in Legal Technology Award 2023',
                isSpanish
                  ? 'Excelencia en Servicio Comunitario 2022-2023'
                  : 'Community Service Excellence 2022-2023',
                isSpanish
                  ? 'Premio Elección del Cliente 2019-2023'
                  : 'Client Choice Award 2019-2023',
              ],
            },
          }),
        }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
    </>
  );
}
