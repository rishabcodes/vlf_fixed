'use client';

import React, { useState } from 'react';

import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  service: string;
  city: string;
  language?: 'en' | 'es';
}

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection({ service, city, language = 'en' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Service-specific FAQs
  const serviceFAQs: Record<string, { en: FAQ[]; es: FAQ[] }> = {
    'Car Accident Lawyer': {
      en: [
        {
          question: `How much does a car accident lawyer cost in ${city}?`,
          answer:
            "We work on a contingency fee basis, meaning you don't pay unless we win your case. Our fee is typically 33-40% of the settlement amount.",
        },
        {
          question: 'What should I do immediately after a car accident?',
          answer:
            'Call 911, seek medical attention, document the scene with photos, exchange information with other drivers, and contact a lawyer before speaking to insurance companies.',
        },
        {
          question: 'How long do I have to file a car accident claim in North Carolina?',
          answer:
            "In North Carolina, you generally have 3 years from the date of the accident to file a personal injury lawsuit, but it's best to act quickly to preserve evidence.",
        },
        {
          question: "What if the other driver doesn't have insurance?",
          answer:
            'You may still have options through your own uninsured/underinsured motorist coverage. We can help you explore all available compensation sources.',
        },
      ],
      es: [
        {
          question: `¿Cuánto cuesta un abogado de accidentes en ${city}?`,
          answer:
            'Trabajamos con honorarios de contingencia, lo que significa que no pagas a menos que ganemos tu caso. Nuestra tarifa es típicamente del 33-40% del monto del acuerdo.',
        },
        {
          question: '¿Qué debo hacer inmediatamente después de un accidente?',
          answer:
            'Llama al 911, busca atención médica, documenta la escena con fotos, intercambia información con otros conductores y contacta a un abogado antes de hablar con las compañías de seguros.',
        },
        {
          question: '¿Cuánto tiempo tengo para presentar un reclamo en Carolina del Norte?',
          answer:
            'En Carolina del Norte, generalmente tienes 3 años desde la fecha del accidente para presentar una demanda, pero es mejor actuar rápido para preservar la evidencia.',
        },
        {
          question: '¿Qué pasa si el otro conductor no tiene seguro?',
          answer:
            'Aún puedes tener opciones a través de tu propia cobertura de motorista sin seguro/con seguro insuficiente. Podemos ayudarte a explorar todas las fuentes de compensación disponibles.',
        },
      ],
    },
    'Workers Compensation': {
      en: [
        {
          question: "Can I be fired for filing a workers' compensation claim?",
          answer:
            "No, it's illegal for employers to retaliate against employees for filing legitimate workers' compensation claims. We can protect your rights if retaliation occurs.",
        },
        {
          question: "What injuries are covered by workers' compensation?",
          answer:
            'Any injury that occurs during the course and scope of your employment is typically covered, including repetitive stress injuries, occupational diseases, and acute injuries.',
        },
        {
          question: 'How long do I have to report a workplace injury?',
          answer:
            'In North Carolina, you must report your injury to your employer within 30 days, and file a claim with the Industrial Commission within 2 years.',
        },
        {
          question: 'Can I see my own doctor for a work injury?',
          answer:
            "Initially, you must see a doctor approved by your employer's workers' compensation insurance, but you may be able to change doctors later with proper procedures.",
        },
      ],
      es: [
        {
          question: '¿Puedo ser despedido por presentar un reclamo de compensación laboral?',
          answer:
            'No, es ilegal que los empleadores tomen represalias contra los empleados por presentar reclamos legítimos. Podemos proteger tus derechos si ocurren represalias.',
        },
        {
          question: '¿Qué lesiones están cubiertas?',
          answer:
            'Cualquier lesión que ocurra durante el curso y alcance de tu empleo está típicamente cubierta, incluyendo lesiones por estrés repetitivo, enfermedades ocupacionales y lesiones agudas.',
        },
        {
          question: '¿Cuánto tiempo tengo para reportar una lesión laboral?',
          answer:
            'En Carolina del Norte, debes reportar tu lesión a tu empleador dentro de 30 días y presentar un reclamo ante la Comisión Industrial dentro de 2 años.',
        },
        {
          question: '¿Puedo ver a mi propio médico?',
          answer:
            'Inicialmente, debes ver a un médico aprobado por el seguro de compensación de tu empleador, pero podrías cambiar de médico más tarde con los procedimientos adecuados.',
        },
      ],
    },
    Immigration: {
      en: [
        {
          question: 'How long does the immigration process take?',
          answer:
            'Processing times vary greatly depending on the type of case. Family-based petitions can take 8-33 months, while employment-based cases may take 6-18 months.',
        },
        {
          question: 'Can I work while my immigration case is pending?',
          answer:
            'It depends on your current status and the type of application. Some applicants can apply for work authorization while their case is pending.',
        },
        {
          question: 'What happens if my visa expires while waiting?',
          answer:
            'You may be able to stay if you filed for an extension or change of status before expiration. Each situation is unique and requires legal analysis.',
        },
        {
          question: 'Do I need a lawyer for immigration matters?',
          answer:
            'While not required, immigration law is complex and constantly changing. A lawyer can help avoid costly mistakes and improve your chances of success.',
        },
      ],
      es: [
        {
          question: '¿Cuánto tiempo toma el proceso de inmigración?',
          answer:
            'Los tiempos varían mucho según el tipo de caso. Las peticiones familiares pueden tomar 8-33 meses, mientras que los casos basados en empleo pueden tomar 6-18 meses.',
        },
        {
          question: '¿Puedo trabajar mientras mi caso está pendiente?',
          answer:
            'Depende de tu estatus actual y el tipo de aplicación. Algunos solicitantes pueden aplicar para autorización de trabajo mientras su caso está pendiente.',
        },
        {
          question: '¿Qué pasa si mi visa expira mientras espero?',
          answer:
            'Podrías poder quedarte si presentaste una extensión o cambio de estatus antes de la expiración. Cada situación es única y requiere análisis legal.',
        },
        {
          question: '¿Necesito un abogado para asuntos de inmigración?',
          answer:
            'Aunque no es requerido, la ley de inmigración es compleja y cambia constantemente. Un abogado puede ayudar a evitar errores costosos y mejorar tus posibilidades de éxito.',
        },
      ],
    },
  };

  // Get FAQs for current service, fallback to general FAQs
  const currentFAQs =
    serviceFAQs[service]?.[language] || serviceFAQs['Car Accident Lawyer']?.[language] || [];

  const t =
    language === 'es'
      ? {
          title: 'Preguntas Frecuentes',
          subtitle: `Respuestas a preguntas comunes sobre ${service} en ${city}`,
          stillHaveQuestions: '¿Aún tienes preguntas?',
          contactUs: 'Contáctanos para una consulta gratuita',
        }
      : {
          title: 'Frequently Asked Questions',
          subtitle: `Common questions about ${service} in ${city}`,
          stillHaveQuestions: 'Still have questions?',
          contactUs: 'Contact us for a free consultation',
        };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
className="text-center mb-12"
        >
          <HelpCircle className="w-12 h-12 text-[#6B1F2E] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {currentFAQs.map((faq, index) => (
            <div
              key={index}

                className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}

                className="w-full text-left p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B1F2E]"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <div
                  >
                    <ChevronDown className="w-5 h-5 text-[#6B1F2E] flex-shrink-0" />
                  </div>
                </div>
              </button>

              <>
                {openIndex === index && (
                  <div
className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </>
            </div>
          ))}
        </div>

        <div
className="text-center mt-12"
        >
          <p className="text-lg font-semibold mb-4">{t.stillHaveQuestions}</p>
          <a
            href={language === 'es' ? '/es/contacto' : '/contact'}

                className="inline-flex items-center px-6 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-colors"
          >
            {t.contactUs}
          </a>
        </div>
      </div>
    </section>
  );
}
