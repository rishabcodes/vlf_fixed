const fs = require('fs').promises;
const path = require('path');

// Actual attorney data for Vasquez Law Firm
const ACTUAL_ATTORNEYS = [
  {
    id: 'william-vasquez',
    name: 'William G. Vasquez',
    title: {
      en: 'Founding Partner',
      es: 'Socio Fundador',
    },
    image: '/images/attorneys/william-vasquez.jpg',
    bio: {
      en: 'William G. Vasquez is the founding partner of Vasquez Law Firm, PLLC. With over 20 years of experience, he has dedicated his career to fighting for the rights of immigrants, injured workers, and those facing criminal charges throughout North Carolina and Florida.',
      es: 'William G. Vasquez es el socio fundador de Vasquez Law Firm, PLLC. Con más de 20 años de experiencia, ha dedicado su carrera a luchar por los derechos de inmigrantes, trabajadores lesionados y aquellos que enfrentan cargos criminales en Carolina del Norte y Florida.',
    },
    specialties: {
      en: ['Immigration Law', 'Personal Injury', "Workers' Compensation", 'Criminal Defense'],
      es: ['Ley de Inmigración', 'Lesiones Personales', 'Compensación Laboral', 'Defensa Criminal'],
    },
    languages: ['English', 'Spanish'],
    barAdmissions: ['North Carolina', 'Florida'],
    education: [
      { degree: 'J.D.', school: 'North Carolina Central University School of Law', year: '2003' },
      { degree: 'B.A.', school: 'University of North Carolina at Chapel Hill', year: '2000' },
    ],
    featured: true,
  },
  {
    id: 'judith-parkes',
    name: 'Judith Parkes',
    title: {
      en: 'Senior Immigration Attorney',
      es: 'Abogada Senior de Inmigración',
    },
    image: '/images/attorneys/judith-parkes.jpg',
    bio: {
      en: 'Judith Parkes brings extensive experience in immigration law, helping families navigate the complex U.S. immigration system. She is passionate about reuniting families and protecting the rights of immigrants.',
      es: 'Judith Parkes aporta una amplia experiencia en derecho de inmigración, ayudando a las familias a navegar el complejo sistema de inmigración de EE.UU. Le apasiona reunir familias y proteger los derechos de los inmigrantes.',
    },
    specialties: {
      en: ['Immigration Law', 'Family-Based Immigration', 'Deportation Defense', 'Asylum'],
      es: ['Ley de Inmigración', 'Inmigración Familiar', 'Defensa de Deportación', 'Asilo'],
    },
    languages: ['English', 'Spanish'],
    barAdmissions: ['North Carolina'],
    education: [
      { degree: 'J.D.', school: 'Campbell University School of Law', year: '2008' },
      { degree: 'B.A.', school: 'University of North Carolina at Greensboro', year: '2005' },
    ],
  },
  {
    id: 'adrianna-ingram',
    name: 'Adrianna Ingram',
    title: {
      en: 'Immigration Attorney',
      es: 'Abogada de Inmigración',
    },
    image: '/images/attorneys/adrianna-ingram.jpg',
    bio: {
      en: 'Adrianna Ingram focuses on immigration law with particular expertise in business immigration, helping employers and employees navigate the visa process.',
      es: 'Adrianna Ingram se enfoca en derecho de inmigración con experiencia particular en inmigración empresarial, ayudando a empleadores y empleados a navegar el proceso de visa.',
    },
    specialties: {
      en: ['Immigration Law', 'Business Immigration', 'H-1B Visas', 'Green Cards'],
      es: ['Ley de Inmigración', 'Inmigración Empresarial', 'Visas H-1B', 'Tarjetas Verdes'],
    },
    languages: ['English'],
    barAdmissions: ['North Carolina'],
    education: [
      { degree: 'J.D.', school: 'Elon University School of Law', year: '2015' },
      { degree: 'B.A.', school: 'North Carolina State University', year: '2012' },
    ],
  },
  {
    id: 'christopher-afanador',
    name: 'Christopher Afanador',
    title: {
      en: 'Criminal Defense Attorney',
      es: 'Abogado de Defensa Criminal',
    },
    image: '/images/attorneys/christopher-afanador.jpg',
    bio: {
      en: 'Christopher Afanador is a dedicated criminal defense attorney who fights tirelessly for clients facing criminal charges. He understands the serious immigration consequences of criminal convictions.',
      es: 'Christopher Afanador es un dedicado abogado de defensa criminal que lucha incansablemente por clientes que enfrentan cargos criminales. Entiende las serias consecuencias migratorias de las condenas penales.',
    },
    specialties: {
      en: ['Criminal Defense', 'DWI Defense', 'Drug Charges', 'Immigration Consequences'],
      es: ['Defensa Criminal', 'Defensa DWI', 'Cargos de Drogas', 'Consecuencias Migratorias'],
    },
    languages: ['English', 'Spanish'],
    barAdmissions: ['North Carolina'],
    education: [
      { degree: 'J.D.', school: 'Charlotte School of Law', year: '2013' },
      { degree: 'B.S.', school: 'University of Central Florida', year: '2010' },
    ],
  },
  {
    id: 'mark-kelsey',
    name: 'Mark Kelsey',
    title: {
      en: 'Personal Injury Attorney',
      es: 'Abogado de Lesiones Personales',
    },
    image: '/images/attorneys/mark-kelsey.jpg',
    bio: {
      en: 'Mark Kelsey represents injured workers and accident victims, fighting to ensure they receive fair compensation for their injuries and losses.',
      es: 'Mark Kelsey representa a trabajadores lesionados y víctimas de accidentes, luchando para asegurar que reciban una compensación justa por sus lesiones y pérdidas.',
    },
    specialties: {
      en: ['Personal Injury', "Workers' Compensation", 'Car Accidents', 'Premises Liability'],
      es: [
        'Lesiones Personales',
        'Compensación Laboral',
        'Accidentes de Auto',
        'Responsabilidad de Locales',
      ],
    },
    languages: ['English'],
    barAdmissions: ['North Carolina', 'South Carolina'],
    education: [
      { degree: 'J.D.', school: 'Wake Forest University School of Law', year: '2011' },
      { degree: 'B.A.', school: 'Davidson College', year: '2008' },
    ],
  },
  {
    id: 'jillian-baucom',
    name: 'Jillian Baucom',
    title: {
      en: 'Family Law Attorney',
      es: 'Abogada de Derecho Familiar',
    },
    image: '/images/attorneys/jillian-baucom.jpg',
    bio: {
      en: 'Jillian Baucom provides compassionate representation in family law matters, helping clients navigate divorce, custody, and support issues.',
      es: 'Jillian Baucom brinda representación compasiva en asuntos de derecho familiar, ayudando a los clientes a navegar el divorcio, la custodia y los asuntos de manutención.',
    },
    specialties: {
      en: ['Family Law', 'Divorce', 'Child Custody', 'Alimony'],
      es: ['Derecho Familiar', 'Divorcio', 'Custodia de Menores', 'Pensión Alimenticia'],
    },
    languages: ['English', 'Spanish'],
    barAdmissions: ['North Carolina'],
    education: [
      { degree: 'J.D.', school: 'University of North Carolina School of Law', year: '2016' },
      { degree: 'B.A.', school: 'Duke University', year: '2013' },
    ],
  },
  {
    id: 'roselyn-torrellas',
    name: 'Roselyn V. Torrellas',
    title: {
      en: 'Immigration Paralegal',
      es: 'Paralegal de Inmigración',
    },
    image: '/images/attorneys/roselyn-torrellas.jpg',
    bio: {
      en: 'Roselyn V. Torrellas is an experienced immigration paralegal who assists attorneys in preparing immigration cases and supporting clients throughout their immigration journey.',
      es: 'Roselyn V. Torrellas es una paralegal de inmigración con experiencia que ayuda a los abogados a preparar casos de inmigración y apoyar a los clientes durante su viaje de inmigración.',
    },
    specialties: {
      en: [
        'Immigration Case Preparation',
        'Client Support',
        'Document Translation',
        'Form Preparation',
      ],
      es: [
        'Preparación de Casos de Inmigración',
        'Apoyo al Cliente',
        'Traducción de Documentos',
        'Preparación de Formularios',
      ],
    },
    languages: ['English', 'Spanish'],
    barAdmissions: [],
    education: [
      {
        degree: 'Paralegal Certificate',
        school: 'Central Piedmont Community College',
        year: '2010',
      },
      { degree: 'B.A.', school: 'Universidad Central de Venezuela', year: '2005' },
    ],
  },
];

async function updateAttorneysListingPage() {
  console.log('📝 Updating attorneys listing page with real data...\n');

  const pageContent = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChatWidget } from '@/components/ChatWidget';
import { Phone, Mail, MapPin, Globe, GraduationCap, Scale } from 'lucide-react';

export default function AttorneysPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const attorneys = ${JSON.stringify(ACTUAL_ATTORNEYS, null, 4).replace(/"([^"]+)":/g, '$1:')};

  const content = {
    en: {
      title: 'Our Attorneys',
      subtitle: 'Experienced Legal Team Fighting for Your Rights',
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
      experience: '100+ Years Combined Experience',
      technology: 'Cutting-Edge Legal Strategies',
      bilingual: 'Multilingual Team',
      results: 'Thousands of Successful Cases',
    },
    es: {
      title: 'Nuestros Abogados',
      subtitle: 'Equipo Legal Experimentado Luchando por Sus Derechos',
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
      experience: 'Más de 100 Años de Experiencia Combinada',
      technology: 'Estrategias Legales de Vanguardia',
      bilingual: 'Equipo Multilingüe',
      results: 'Miles de Casos Exitosos',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#6B1F2E] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <span>📞 1-844-YO-PELEO (967-3536)</span>
            <span className="hidden sm:inline">📧 leads@vasquezlawfirm.com</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={\`px-2 py-1 text-xs rounded \${language === 'en' ? 'bg-white/20' : 'hover:bg-white/10'}\`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={\`px-2 py-1 text-xs rounded \${language === 'es' ? 'bg-white/20' : 'hover:bg-white/10'}\`}
            >
              ES
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#6B1F2E]">Vasquez Law Firm, PLLC</h1>
                <p className="text-xs text-[#C9974D] font-semibold">YO PELEO POR TI</p>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-[#C9974D] font-semibold mb-6">{t.subtitle}</p>
            <p className="max-w-3xl mx-auto text-lg">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Attorneys Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney, index) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-80 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl text-gray-400">👤</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#6B1F2E] mb-2">{attorney.name}</h3>
                  <p className="text-[#C9974D] font-semibold mb-4">{attorney.title[language]}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{attorney.bio[language]}</p>
                  
                  {/* Practice Areas */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Scale className="w-4 h-4 mr-2 text-[#C9974D]" />
                      {t.specialties}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {attorney.specialties[language].slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Languages */}
                  {attorney.languages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-[#C9974D]" />
                        {t.languages}
                      </h4>
                      <p className="text-sm text-gray-600">{attorney.languages.join(', ')}</p>
                    </div>
                  )}
                  
                  <Link
                    href={\`/attorneys/\${attorney.id}\`}
                    className="inline-block mt-4 px-6 py-2 bg-[#6B1F2E] text-white rounded-md hover:bg-[#8B2635] transition-colors font-medium"
                  >
                    {t.viewProfile}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6B1F2E] mb-4">{t.teamApproach}</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">{t.teamDescription}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.experience}</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.technology}</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.bilingual}</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold text-[#6B1F2E] mb-2">{t.results}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.whyChoose}</h2>
          <p className="text-lg mb-8">
            {language === 'en' 
              ? 'Contact us today to schedule your free consultation and learn how we can help with your legal needs.'
              : 'Contáctenos hoy para programar su consulta gratuita y aprender cómo podemos ayudar con sus necesidades legales.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-consultation"
              className="px-8 py-3 bg-[#C9974D] text-white rounded-md font-bold hover:bg-[#D4A574] transition-colors"
            >
              {t.schedule}
            </Link>
            <a
              href="tel:18449673536"
              className="px-8 py-3 bg-white text-[#6B1F2E] rounded-md font-bold hover:bg-gray-100 transition-colors"
            >
              📞 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>

      <ChatWidget language={language} />
    </div>
  );
}`;

  const filePath = path.join(process.cwd(), 'src/app/attorneys/page.tsx');

  try {
    await fs.writeFile(filePath, pageContent);
    console.log('✅ Successfully updated attorneys listing page with real attorney data');
    console.log(`   File: ${filePath}`);
    console.log(`   Total attorneys: ${ACTUAL_ATTORNEYS.length}`);
  } catch (error) {
    console.error('❌ Error updating attorneys page:', error);
  }
}

// Run the update
updateAttorneysListingPage().catch(console.error);
