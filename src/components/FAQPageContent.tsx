'use client';

import React, { useState } from 'react';

import { ChevronDown, Search, Phone, MessageCircle, Clock, DollarSign, FileText, Shield, Users, Scale } from 'lucide-react';
import { ModernPageWrapper } from '@/components/ModernPageWrapper';
import { TRADEMARK } from '@/lib/constants/trademark';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQPageContentProps {
  language?: 'en' | 'es';
}

export default function FAQPageContent({ language = 'en' }: FAQPageContentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = {
    en: [
      { id: 'all', name: 'All Questions', icon: Scale },
      { id: 'general', name: 'General Legal Services', icon: Scale },
      { id: 'fees', name: 'Fees & Payment', icon: DollarSign },
      { id: 'consultation', name: 'Consultation Process', icon: Users },
      { id: 'immigration', name: 'Immigration Law', icon: FileText },
      { id: 'personal-injury', name: 'Personal Injury', icon: Shield },
      { id: 'criminal', name: 'Criminal Defense', icon: Shield },
      { id: 'process', name: 'Legal Process', icon: Clock },
    ],
    es: [
      { id: 'all', name: 'Todas las Preguntas', icon: Scale },
      { id: 'general', name: 'Servicios Legales Generales', icon: Scale },
      { id: 'fees', name: 'Tarifas y Pagos', icon: DollarSign },
      { id: 'consultation', name: 'Proceso de Consulta', icon: Users },
      { id: 'immigration', name: 'Ley de Inmigración', icon: FileText },
      { id: 'personal-injury', name: 'Lesiones Personales', icon: Shield },
      { id: 'criminal', name: 'Defensa Criminal', icon: Shield },
      { id: 'process', name: 'Proceso Legal', icon: Clock },
    ],
  };

  const faqs: { en: FAQItem[]; es: FAQItem[] } = {
    en: [
      // General Legal Services
      {
        category: 'general',
        question: 'What legal services does Vasquez Law Firm offer?',
        answer: `We provide comprehensive legal services including immigration law, personal injury, criminal defense, family law, and workers' compensation. Our team of experienced attorneys serves clients across North Carolina and Florida, with offices in Raleigh, Charlotte, Smithfield, and Orlando. We also offer 24/7 AI-powered assistance for immediate legal guidance.`,
      },
      {
        category: 'general',
        question: 'How long has Vasquez Law Firm been in practice?',
        answer: `Founded in 2011, Vasquez Law Firm has over 13 years of experience serving the legal needs of our communities. What started as a solo practice has grown into one of North Carolina's most innovative law firms, combining traditional legal expertise with cutting-edge technology to better serve our clients.`,
      },
      {
        category: 'general',
        question: 'Do you speak languages other than English?',
        answer: `Yes! We provide services in English, Spanish, and Portuguese. Our team includes bilingual attorneys and staff, and all our AI assistants are fully bilingual. We believe that language should never be a barrier to justice, which is why we ensure clear communication in your preferred language.`,
      },
      
      // Fees & Payment
      {
        category: 'fees',
        question: 'How much does it cost to hire an attorney?',
        answer: `Our fee structure varies by case type. For personal injury cases, we work on a contingency fee basis - you pay nothing unless we win your case. For immigration and other matters, we offer transparent flat fees or hourly rates. We always discuss fees upfront during your free consultation, and we offer flexible payment plans to make quality legal representation accessible.`,
      },
      {
        category: 'fees',
        question: 'Do you offer payment plans?',
        answer: `Yes, we offer flexible payment plans for most case types. We understand that legal services can be a significant expense, so we work with our clients to create payment arrangements that fit their budget. We accept various payment methods including credit cards, and we'll discuss all options during your consultation.`,
      },
      {
        category: 'fees',
        question: 'What is a contingency fee?',
        answer: `A contingency fee means you pay nothing upfront and no attorney fees unless we win your case. If we successfully recover compensation for you, our fee is a percentage of the settlement or judgment. This arrangement is common in personal injury cases and ensures that everyone has access to quality legal representation regardless of their financial situation.`,
      },
      
      // Consultation Process
      {
        category: 'consultation',
        question: 'Is the initial consultation really free?',
        answer: `Yes, we offer a completely free initial consultation with no obligation to hire us. During this consultation, an experienced attorney will evaluate your case, explain your legal options, and answer all your questions. We'll also provide an AI-powered case outcome prediction to help you make an informed decision.`,
      },
      {
        category: 'consultation',
        question: 'What should I bring to my consultation?',
        answer: `Bring any documents related to your case, including: police reports, medical records, immigration documents, correspondence with insurance companies, photographs, witness information, and any court documents. Don't worry if you don't have everything - we can help you obtain necessary documents later.`,
      },
      {
        category: 'consultation',
        question: 'Can I have my consultation online or by phone?',
        answer: `Absolutely! We offer in-person, phone, and video consultations to accommodate your needs. Our secure video conferencing platform makes it easy to meet with an attorney from the comfort of your home. We also have a 24/7 AI assistant available for immediate questions and to help schedule your consultation.`,
      },
      
      // Immigration Law
      {
        category: 'immigration',
        question: 'What immigration services do you provide?',
        answer: `We handle all aspects of immigration law including: family-based petitions, employment-based visas, green cards and citizenship, asylum and refugee cases, deportation defense, DACA applications, and business immigration. Our attorneys stay current with changing immigration laws to provide the best representation possible.`,
      },
      {
        category: 'immigration',
        question: 'How long does the immigration process take?',
        answer: `Processing times vary significantly depending on the type of case and current USCIS backlogs. Family petitions can take 8-24 months, employment visas 3-12 months, and citizenship applications 6-18 months. During your consultation, we'll provide more specific timelines based on your situation and current processing times.`,
      },
      {
        category: 'immigration',
        question: 'Can you help if I am facing deportation?',
        answer: `Yes, we have extensive experience in deportation defense. Time is critical in these cases, so contact us immediately. We'll review your case for possible defenses, help you understand your rights, and represent you in immigration court. Our 24/7 AI assistant can provide immediate guidance while you wait for an attorney consultation.`,
      },
      
      // Personal Injury
      {
        category: 'personal-injury',
        question: 'What types of personal injury cases do you handle?',
        answer: `We handle all types of personal injury cases including: car accidents, truck accidents, motorcycle accidents, slip and fall injuries, workplace injuries, medical malpractice, wrongful death, and product liability. Our experienced team fights to get you the maximum compensation for your injuries and losses.`,
      },
      {
        category: 'personal-injury',
        question: 'How much is my personal injury case worth?',
        answer: `Case values depend on many factors including: severity of injuries, medical expenses (current and future), lost wages and earning capacity, pain and suffering, and liability factors. During your free consultation, we'll evaluate these factors and provide an estimate based on similar cases we've handled.`,
      },
      {
        category: 'personal-injury',
        question: 'How long do I have to file a personal injury claim?',
        answer: `In North Carolina and Florida, the statute of limitations for most personal injury cases is 2-4 years from the date of injury. However, some cases have shorter deadlines, and evidence can disappear quickly. It's best to contact us as soon as possible to protect your rights and preserve important evidence.`,
      },
      
      // Criminal Defense
      {
        category: 'criminal',
        question: 'What should I do if I am arrested?',
        answer: `If arrested: remain silent except to request an attorney, don't consent to searches without a warrant, don't discuss your case with anyone except your lawyer, and contact us immediately. Our 24/7 availability means we can provide immediate guidance and representation when you need it most.`,
      },
      {
        category: 'criminal',
        question: 'Do you handle both misdemeanors and felonies?',
        answer: `Yes, we defend clients against all criminal charges, from traffic violations and misdemeanors to serious felonies. Our experienced criminal defense attorneys understand the stakes involved and work aggressively to protect your rights, freedom, and future.`,
      },
      
      // Legal Process
      {
        category: 'process',
        question: 'How long will my case take?',
        answer: `Case duration varies by type and complexity. Simple matters may resolve in weeks, while complex litigation can take months or years. We'll provide a realistic timeline during your consultation and keep you updated throughout the process. Our goal is always to resolve your case as efficiently as possible while maximizing your outcome.`,
      },
      {
        category: 'process',
        question: 'Will I have to go to court?',
        answer: `Not necessarily. Many cases settle without trial. For those that do go to court, we'll thoroughly prepare you and be by your side every step of the way. We'll always discuss the pros and cons of settlement versus trial, ensuring you make informed decisions about your case.`,
      },
      {
        category: 'process',
        question: 'How will I stay informed about my case?',
        answer: `We prioritize clear, consistent communication. You'll receive regular updates via your preferred method (phone, email, or text), have 24/7 access to our client portal to view case documents and status, can reach out anytime with questions, and receive immediate responses from our AI assistant for general inquiries.`,
      },
      {
        category: 'process',
        question: 'What makes Vasquez Law Firm different?',
        answer: `${TRADEMARK.YO_PELEO_POR_TI} - We fight for you! Our unique combination of experienced attorneys and cutting-edge AI technology means faster responses and better outcomes. We treat clients like family, offer 24/7 availability through our AI assistant, provide services in multiple languages, and have a proven track record of success across North Carolina and Florida.`,
      },
    ],
    es: [
      // Servicios Legales Generales
      {
        category: 'general',
        question: '¿Qué servicios legales ofrece Vasquez Law Firm?',
        answer: `Brindamos servicios legales integrales que incluyen ley de inmigración, lesiones personales, defensa criminal, derecho familiar y compensación laboral. Nuestro equipo de abogados experimentados atiende a clientes en Carolina del Norte y Florida, con oficinas en Raleigh, Charlotte, Smithfield y Orlando. También ofrecemos asistencia las 24/7 con IA para orientación legal inmediata.`,
      },
      {
        category: 'general',
        question: '¿Cuánto tiempo lleva Vasquez Law Firm en práctica?',
        answer: `Fundada en 2011, Vasquez Law Firm tiene más de 13 años de experiencia sirviendo las necesidades legales de nuestras comunidades. Lo que comenzó como una práctica individual ha crecido hasta convertirse en una de las firmas de abogados más innovadoras de Carolina del Norte, combinando experiencia legal tradicional con tecnología de vanguardia.`,
      },
      {
        category: 'general',
        question: '¿Hablan otros idiomas además del inglés?',
        answer: `¡Sí! Brindamos servicios en inglés, español y portugués. Nuestro equipo incluye abogados y personal bilingüe, y todos nuestros asistentes de IA son completamente bilingües. Creemos que el idioma nunca debe ser una barrera para la justicia, por eso garantizamos una comunicación clara en su idioma preferido.`,
      },
      
      // Tarifas y Pagos
      {
        category: 'fees',
        question: '¿Cuánto cuesta contratar a un abogado?',
        answer: `Nuestra estructura de tarifas varía según el tipo de caso. Para casos de lesiones personales, trabajamos con honorarios de contingencia: no paga nada a menos que ganemos su caso. Para inmigración y otros asuntos, ofrecemos tarifas fijas transparentes o tarifas por hora. Siempre discutimos las tarifas por adelantado durante su consulta gratuita, y ofrecemos planes de pago flexibles.`,
      },
      {
        category: 'fees',
        question: '¿Ofrecen planes de pago?',
        answer: `Sí, ofrecemos planes de pago flexibles para la mayoría de los tipos de casos. Entendemos que los servicios legales pueden ser un gasto significativo, por lo que trabajamos con nuestros clientes para crear arreglos de pago que se ajusten a su presupuesto. Aceptamos varios métodos de pago, incluidas tarjetas de crédito.`,
      },
      {
        category: 'fees',
        question: '¿Qué es una tarifa de contingencia?',
        answer: `Una tarifa de contingencia significa que no paga nada por adelantado ni honorarios de abogado a menos que ganemos su caso. Si recuperamos con éxito una compensación para usted, nuestra tarifa es un porcentaje del acuerdo o fallo. Este arreglo es común en casos de lesiones personales y garantiza que todos tengan acceso a representación legal de calidad.`,
      },
      
      // Proceso de Consulta
      {
        category: 'consultation',
        question: '¿La consulta inicial es realmente gratuita?',
        answer: `Sí, ofrecemos una consulta inicial completamente gratuita sin obligación de contratarnos. Durante esta consulta, un abogado experimentado evaluará su caso, explicará sus opciones legales y responderá todas sus preguntas. También proporcionaremos una predicción del resultado del caso impulsada por IA para ayudarlo a tomar una decisión informada.`,
      },
      {
        category: 'consultation',
        question: '¿Qué debo llevar a mi consulta?',
        answer: `Traiga cualquier documento relacionado con su caso, incluyendo: reportes policiales, registros médicos, documentos de inmigración, correspondencia con compañías de seguros, fotografías, información de testigos y cualquier documento judicial. No se preocupe si no tiene todo: podemos ayudarlo a obtener los documentos necesarios más tarde.`,
      },
      {
        category: 'consultation',
        question: '¿Puedo tener mi consulta en línea o por teléfono?',
        answer: `¡Por supuesto! Ofrecemos consultas en persona, por teléfono y por video para satisfacer sus necesidades. Nuestra plataforma segura de videoconferencia facilita reunirse con un abogado desde la comodidad de su hogar. También tenemos un asistente de IA disponible las 24/7 para preguntas inmediatas y para ayudar a programar su consulta.`,
      },
      
      // Ley de Inmigración
      {
        category: 'immigration',
        question: '¿Qué servicios de inmigración brindan?',
        answer: `Manejamos todos los aspectos de la ley de inmigración, incluyendo: peticiones familiares, visas basadas en empleo, tarjetas verdes y ciudadanía, casos de asilo y refugiados, defensa contra deportación, aplicaciones DACA e inmigración empresarial. Nuestros abogados se mantienen actualizados con las leyes de inmigración cambiantes.`,
      },
      {
        category: 'immigration',
        question: '¿Cuánto tiempo toma el proceso de inmigración?',
        answer: `Los tiempos de procesamiento varían significativamente según el tipo de caso y los retrasos actuales de USCIS. Las peticiones familiares pueden tomar 8-24 meses, las visas de empleo 3-12 meses y las solicitudes de ciudadanía 6-18 meses. Durante su consulta, proporcionaremos plazos más específicos basados en su situación.`,
      },
      {
        category: 'immigration',
        question: '¿Pueden ayudar si enfrento deportación?',
        answer: `Sí, tenemos amplia experiencia en defensa contra deportación. El tiempo es crítico en estos casos, así que contáctenos de inmediato. Revisaremos su caso en busca de posibles defensas, lo ayudaremos a comprender sus derechos y lo representaremos en la corte de inmigración. Nuestro asistente de IA 24/7 puede proporcionar orientación inmediata.`,
      },
      
      // Lesiones Personales
      {
        category: 'personal-injury',
        question: '¿Qué tipos de casos de lesiones personales manejan?',
        answer: `Manejamos todo tipo de casos de lesiones personales, incluyendo: accidentes automovilísticos, accidentes de camiones, accidentes de motocicleta, lesiones por resbalones y caídas, lesiones laborales, negligencia médica, muerte por negligencia y responsabilidad del producto. Nuestro equipo experimentado lucha para obtener la máxima compensación.`,
      },
      {
        category: 'personal-injury',
        question: '¿Cuánto vale mi caso de lesiones personales?',
        answer: `Los valores de los casos dependen de muchos factores, incluyendo: gravedad de las lesiones, gastos médicos (actuales y futuros), salarios perdidos y capacidad de ganancia, dolor y sufrimiento, y factores de responsabilidad. Durante su consulta gratuita, evaluaremos estos factores y proporcionaremos una estimación basada en casos similares.`,
      },
      {
        category: 'personal-injury',
        question: '¿Cuánto tiempo tengo para presentar un reclamo por lesiones personales?',
        answer: `En Carolina del Norte y Florida, el estatuto de limitaciones para la mayoría de los casos de lesiones personales es de 2 a 4 años desde la fecha de la lesión. Sin embargo, algunos casos tienen plazos más cortos y la evidencia puede desaparecer rápidamente. Es mejor contactarnos lo antes posible para proteger sus derechos.`,
      },
      
      // Defensa Criminal
      {
        category: 'criminal',
        question: '¿Qué debo hacer si soy arrestado?',
        answer: `Si es arrestado: permanezca en silencio excepto para solicitar un abogado, no consienta registros sin una orden judicial, no discuta su caso con nadie excepto su abogado y contáctenos de inmediato. Nuestra disponibilidad 24/7 significa que podemos proporcionar orientación y representación inmediata cuando más lo necesita.`,
      },
      {
        category: 'criminal',
        question: '¿Manejan tanto delitos menores como graves?',
        answer: `Sí, defendemos a clientes contra todos los cargos criminales, desde violaciones de tráfico y delitos menores hasta delitos graves. Nuestros abogados experimentados en defensa criminal entienden lo que está en juego y trabajan agresivamente para proteger sus derechos, libertad y futuro.`,
      },
      
      // Proceso Legal
      {
        category: 'process',
        question: '¿Cuánto tiempo tomará mi caso?',
        answer: `La duración del caso varía según el tipo y la complejidad. Los asuntos simples pueden resolverse en semanas, mientras que los litigios complejos pueden tomar meses o años. Proporcionaremos un cronograma realista durante su consulta y lo mantendremos actualizado durante todo el proceso.`,
      },
      {
        category: 'process',
        question: '¿Tendré que ir a la corte?',
        answer: `No necesariamente. Muchos casos se resuelven sin juicio. Para aquellos que van a la corte, lo prepararemos completamente y estaremos a su lado en cada paso. Siempre discutiremos los pros y contras del acuerdo versus el juicio, asegurándonos de que tome decisiones informadas sobre su caso.`,
      },
      {
        category: 'process',
        question: '¿Cómo me mantendré informado sobre mi caso?',
        answer: `Priorizamos la comunicación clara y consistente. Recibirá actualizaciones regulares a través de su método preferido (teléfono, correo electrónico o texto), tendrá acceso 24/7 a nuestro portal de clientes para ver documentos y el estado del caso, puede comunicarse en cualquier momento con preguntas y recibirá respuestas inmediatas de nuestro asistente de IA.`,
      },
      {
        category: 'process',
        question: '¿Qué hace diferente a Vasquez Law Firm?',
        answer: `${TRADEMARK.YO_PELEO_POR_TI} - ¡Nosotros peleamos por ti! Nuestra combinación única de abogados experimentados y tecnología de IA de vanguardia significa respuestas más rápidas y mejores resultados. Tratamos a los clientes como familia, ofrecemos disponibilidad 24/7 a través de nuestro asistente de IA, brindamos servicios en varios idiomas y tenemos un historial comprobado de éxito.`,
      },
    ],
  };

  const filteredFAQs = faqs[language].filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const content = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Get answers to common questions about our legal services',
      searchPlaceholder: 'Search questions...',
      noResults: 'No questions found matching your search.',
      stillHaveQuestions: 'Still Have Questions?',
      stillHaveQuestionsText: 'Our team is here to help. Contact us for personalized assistance.',
      contactUs: 'Contact Us',
      chatNow: 'Chat Now',
      callNumber: '1-844-YO-PELEO',
    },
    es: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Obtenga respuestas a preguntas comunes sobre nuestros servicios legales',
      searchPlaceholder: 'Buscar preguntas...',
      noResults: 'No se encontraron preguntas que coincidan con su búsqueda.',
      stillHaveQuestions: '¿Todavía Tiene Preguntas?',
      stillHaveQuestionsText: 'Nuestro equipo está aquí para ayudar. Contáctenos para asistencia personalizada.',
      contactUs: 'Contáctenos',
      chatNow: 'Chatear Ahora',
      callNumber: '1-844-YO-PELEO',
    },
  };

  return (
    <ModernPageWrapper>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('/images/patterns/circuit-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1
              className="text-5xl font-bold text-white mb-6"
            >
              {content[language].title}
            </h1>
            <p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              {content[language].subtitle}
            </p>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={content[language].searchPlaceholder}

                  value={searchTerm}

                  onChange={(e) => setSearchTerm(e.target.value)}

                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories[language].map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}

                onClick={() => setActiveCategory(category.id)}

                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      activeCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{content[language].noResults}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div
                      key={index}

                className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(index)}

                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            openItems.includes(index) ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      <>
                        {openItems.includes(index) && (
                          <div
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {content[language].stillHaveQuestions}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {content[language].stillHaveQuestionsText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {content[language].contactUs}
              </a>
              <a
                href="#chat"
                onClick={(e) => {
                  e.preventDefault();
                  // Trigger chat widget
                  if (typeof window !== 'undefined') {
                    const windowWithChat = window as unknown as { openChatWidget?: () => void };
                    if (windowWithChat.openChatWidget) {
                      windowWithChat.openChatWidget();
                    }}}

                className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {content[language].chatNow}
              </a>
              <a
                href={`tel:${content[language].callNumber.replace(/-/g, '')}`}

                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all"
              >
                <Phone className="w-5 h-5" />
                {content[language].callNumber}
              </a>
            </div>
          </div>
        </section>
      </div>
    </ModernPageWrapper>
  );
}
}
