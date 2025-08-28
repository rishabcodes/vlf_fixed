'use client';

import Script from 'next/script';
import { GraduationCap, Calendar, Award, Mail, CheckCircle, ArrowRight } from 'lucide-react';

import { useState } from 'react';

interface ScholarshipsPageClientProps {
  language?: 'en' | 'es';
}

export default function ScholarshipsPageClient({ language = 'en' }: ScholarshipsPageClientProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isSpanish = language === 'es';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const content = {
    en: {
      supportingDreamers: 'Supporting DACA Dreamers',
      title: 'Vasquez Law Firm DACA Dreamer Scholarship',
      subtitle: 'Empowering Dreams Through Education',
      description:
        'At Vasquez Law Firm, we believe in the power of education to transform lives. Our DACA Dreamer Scholarship provides financial support to exceptional DACA recipients pursuing higher education, helping them achieve their dreams and build brighter futures.',
      applyNow: 'Apply Now',
      viewRequirements: 'View Requirements',
      scholarshipDetails: 'Scholarship Details',
      scholarshipDetailsDesc:
        'Two scholarships awarded each semester to outstanding DACA recipients',
      amount: 'Scholarship Amount',
      amountValue: '$1,000 per semester',
      amountDesc: 'Two scholarships awarded each semester to help cover educational expenses',
      deadline: 'Application Deadline',
      deadlineValue: 'November 27, 2024',
      deadlineDesc: 'Winners will be notified by January 8, 2025',
      eligibility: 'Eligibility',
      eligibilityValue: 'DACA Recipients',
      eligibilityDesc: 'Must be enrolled or planning to enroll in an accredited university',
      requirementsTitle: 'Eligibility Requirements',
      requirementsDesc:
        'To qualify for the Vasquez Law Firm DACA Dreamer Scholarship, applicants must meet the following criteria',
      requirements: [
        'Must be a DACA recipient pursuing higher education',
        'GPA of 3.5 or higher',
        'Enrolled or planning to enroll in an accredited university for Fall 2024',
        'At least 17 years of age',
      ],
      applicationRequirements: 'Application Requirements',
      applicationRequirementsDesc:
        'Complete your application with the following documents and materials',
      applicationItems: [
        {
          title: 'Online Application',
          description: 'Complete the online application form in full with all required information',
        },
        {
          title: 'Academic Transcript',
          description: 'Submit unofficial academic transcript showing a GPA of 3.5 or higher',
        },
        {
          title: 'Proof of Enrollment',
          description:
            'Documentation confirming enrollment or acceptance at an accredited university',
        },
        {
          title: 'DACA Status',
          description: 'Documentation proving current DACA recipient status',
        },
        {
          title: 'Original Artwork',
          description:
            'Submit an original piece of artwork representing your immigration experience (painting, sculpture, poetry, etc.)',
        },
        {
          title: 'Personal Statement',
          description:
            'Share your story and how this scholarship will help you achieve your educational goals',
        },
      ],
      applicationComingSoon: 'Application Coming Soon',
      applicationNotOpen:
        'The scholarship application form is not yet open. Register below to receive an email notification when applications become available.',
      enterEmail: 'Enter your email',
      notifyMe: 'Notify Me',
      thankYou: "Thank you! We'll notify you when applications open.",
      questions: 'Questions about the scholarship?',
      evaluationCriteria: 'Evaluation Criteria',
      evaluationCriteriaDesc: 'Applications will be evaluated based on the following criteria',
      evaluationItems: [
        {
          title: 'Complete Documentation',
          description: 'Complete and accurate submission of all required documents and materials',
        },
        {
          title: 'Thoughtful Application Responses',
          description: 'Detailed and thoughtful responses to all application questions',
        },
        {
          title: 'Original Ideas & Personal Experience',
          description:
            'Creative artwork that authentically reflects your immigration journey and experiences',
        },
      ],
      readyToApply: 'Ready to Apply?',
      readyToApplyDesc: 'Take the first step towards achieving your educational dreams',
      getNotification: 'Get Notified When Applications Open',
    },
    es: {
      supportingDreamers: 'Apoyando a los Soñadores con DACA',
      title: 'Beca DACA Dreamer de Vasquez Law Firm',
      subtitle: 'Empoderando Sueños a Través de la Educación',
      description:
        'En Vasquez Law Firm, creemos en el poder de la educación para transformar vidas. Nuestra Beca DACA Dreamer proporciona apoyo financiero a receptores excepcionales de DACA que buscan educación superior, ayudándoles a alcanzar sus sueños y construir futuros más brillantes.',
      applyNow: 'Aplicar Ahora',
      viewRequirements: 'Ver Requisitos',
      scholarshipDetails: 'Detalles de la Beca',
      scholarshipDetailsDesc: 'Dos becas otorgadas cada semestre a receptores destacados de DACA',
      amount: 'Monto de la Beca',
      amountValue: '$1,000 por semestre',
      amountDesc: 'Dos becas otorgadas cada semestre para ayudar a cubrir gastos educativos',
      deadline: 'Fecha Límite de Aplicación',
      deadlineValue: '27 de noviembre de 2024',
      deadlineDesc: 'Los ganadores serán notificados antes del 8 de enero de 2025',
      eligibility: 'Elegibilidad',
      eligibilityValue: 'Receptores de DACA',
      eligibilityDesc: 'Debe estar inscrito o planeando inscribirse en una universidad acreditada',
      requirementsTitle: 'Requisitos de Elegibilidad',
      requirementsDesc:
        'Para calificar para la Beca DACA Dreamer de Vasquez Law Firm, los solicitantes deben cumplir con los siguientes criterios',
      requirements: [
        'Debe ser un receptor de DACA que busca educación superior',
        'GPA de 3.5 o superior',
        'Inscrito o planeando inscribirse en una universidad acreditada para otoño 2024',
        'Al menos 17 años de edad',
      ],
      applicationRequirements: 'Requisitos de Aplicación',
      applicationRequirementsDesc:
        'Complete su aplicación con los siguientes documentos y materiales',
      applicationItems: [
        {
          title: 'Aplicación en Línea',
          description:
            'Complete el formulario de aplicación en línea completo con toda la información requerida',
        },
        {
          title: 'Transcripción Académica',
          description:
            'Envíe transcripción académica no oficial que muestre un GPA de 3.5 o superior',
        },
        {
          title: 'Prueba de Inscripción',
          description:
            'Documentación que confirme inscripción o aceptación en una universidad acreditada',
        },
        {
          title: 'Estatus DACA',
          description: 'Documentación que pruebe el estatus actual de receptor de DACA',
        },
        {
          title: 'Obra de Arte Original',
          description:
            'Envíe una obra de arte original que represente su experiencia de inmigración (pintura, escultura, poesía, etc.)',
        },
        {
          title: 'Declaración Personal',
          description:
            'Comparta su historia y cómo esta beca ayudará a alcanzar sus metas educativas',
        },
      ],
      applicationComingSoon: 'Aplicación Próximamente',
      applicationNotOpen:
        'El formulario de aplicación para la beca aún no está abierto. Regístrese a continuación para recibir una notificación por correo electrónico cuando las aplicaciones estén disponibles.',
      enterEmail: 'Ingrese su correo electrónico',
      notifyMe: 'Notificarme',
      thankYou: '¡Gracias! Le notificaremos cuando las aplicaciones estén abiertas.',
      questions: '¿Preguntas sobre la beca?',
      evaluationCriteria: 'Criterios de Evaluación',
      evaluationCriteriaDesc:
        'Las aplicaciones serán evaluadas basándose en los siguientes criterios',
      evaluationItems: [
        {
          title: 'Documentación Completa',
          description: 'Envío completo y preciso de todos los documentos y materiales requeridos',
        },
        {
          title: 'Respuestas Detalladas en la Aplicación',
          description: 'Respuestas detalladas y reflexivas a todas las preguntas de la aplicación',
        },
        {
          title: 'Ideas Originales y Experiencia Personal',
          description:
            'Obra de arte creativa que refleje auténticamente su viaje y experiencias de inmigración',
        },
      ],
      readyToApply: '¿Listo para Aplicar?',
      readyToApplyDesc: 'Da el primer paso hacia el logro de tus sueños educativos',
      getNotification: 'Recibir Notificación Cuando Abran las Aplicaciones',
    },
  };

  const t = content[language];

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
            <div className="absolute inset-0">
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-up">
                <div className="inline-flex items-center px-6 py-3 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                  <GraduationCap className="w-5 h-5 text-primary mr-2" />
                  <span className="text-primary font-semibold">{t.supportingDreamers}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
                  {t.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-primary">{t.title.split(' ').slice(-1)[0]}</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">{t.subtitle}</p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">{t.description}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#apply"
                    className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                  >
                    {t.applyNow}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                  <a
                    href="#requirements"
                    className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
                  >
                    {t.viewRequirements}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Details */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                {t.scholarshipDetails.split(' ')[0]}{' '}
                <span className="text-primary">{t.scholarshipDetails.split(' ')[1]}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.scholarshipDetailsDesc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Award className="w-12 h-12" />,
                  title: t.amount,
                  description: t.amountValue,
                  details: t.amountDesc,
                },
                {
                  icon: <Calendar className="w-12 h-12" />,
                  title: t.deadline,
                  description: t.deadlineValue,
                  details: t.deadlineDesc,
                },
                {
                  icon: <GraduationCap className="w-12 h-12" />,
                  title: t.eligibility,
                  description: t.eligibilityValue,
                  details: t.eligibilityDesc,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <div className="text-primary mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-primary font-bold mb-2">{item.description}</p>
                  <p className="text-gray-400">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section id="requirements" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                {t.requirementsTitle.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary">{t.requirementsTitle.split(' ').slice(-1)[0]}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.requirementsDesc}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {t.requirements.map((requirement, index) => (
                  <div
                    key={index}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-300">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Requirements */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                {t.applicationRequirements.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary">
                  {t.applicationRequirements.split(' ').slice(-1)[0]}
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t.applicationRequirementsDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.applicationItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Notification Section */}
        <section id="apply" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl p-12 border border-primary/20">
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                    {t.applicationComingSoon.split(' ')[0]}{' '}
                    <span className="text-primary">{t.applicationComingSoon.split(' ')[1]}</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">{t.applicationNotOpen}</p>
                </div>

                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email} onChange={e => setEmail(e.target.value)} placeholder={t.enterEmail}
                      required
                      className="flex-1 px-6 py-4 bg-black border border-primary/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary-300 transition-all"
                    >
                      {t.notifyMe}
                    </button>
                  </div>
                  {isSubscribed && (
                    <p className="text-green-400 text-center mt-4"
                    >
                      {t.thankYou}
                    </p>
                  )}
                </form>

                <div className="text-center mt-8">
                  <p className="text-gray-400 mb-2">{t.questions}</p>
                  <a
                    href="mailto:scholarship@vasquezlawfirm.com"
                    className="inline-flex items-center text-primary hover:text-primary-300 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    scholarship@vasquezlawfirm.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                {t.evaluationCriteria.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary">{t.evaluationCriteria.split(' ').slice(-1)[0]}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.evaluationCriteriaDesc}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {t.evaluationItems.map((criteria, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border-l-4 border-primary"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{criteria.title}</h3>
                    <p className="text-gray-300">{criteria.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                {t.readyToApply.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary">{t.readyToApply.split(' ').slice(-1)[0]}</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">{t.readyToApplyDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#apply"
                  className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                >
                  {t.getNotification}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id="scholarship-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ScholarshipProgram',
              name: isSpanish
                ? 'Beca DACA Dreamer de Vasquez Law Firm'
                : 'Vasquez Law Firm DACA Dreamer Scholarship',
              description: isSpanish
                ? 'Apoyo financiero para receptores de DACA que buscan educación superior'
                : 'Financial support for DACA recipients pursuing higher education',
              provider: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm, PLLC',
                url: 'https://www.vasquezlawfirm.com',
              },
              amount: {
                '@type': 'MonetaryAmount',
                value: '1000',
                currency: 'USD',
              },
              educationalLevel: isSpanish ? 'Educación Superior' : 'Higher Education',
              applicationDeadline: '2024-11-27',
              url: `https://www.vasquezlawfirm.com/${isSpanish ? 'es/becas' : 'scholarships'}`,
            }),
          }}
        />
      </div>
    </>
  );
