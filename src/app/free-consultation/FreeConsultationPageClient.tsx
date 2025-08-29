'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  Video,
  MapPin,
  CheckCircle,
  Shield,
  Users,
  Award,
  Globe,
  FileText,
  Scale,
  Heart,
  Briefcase,
  Star,
  ArrowRight
} from 'lucide-react';
import { TRADEMARK } from '@/lib/constants/trademark';
import { ContactForm } from '@/components/forms/ContactForm';

interface FreeConsultationPageClientProps {
  language?: 'en' | 'es';
}

export default function FreeConsultationPageClient({ language = 'en' }: FreeConsultationPageClientProps) {
  const consultationBenefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: language === 'es' ? '100% Gratis' : '100% Free',
      description: language === 'es' ? 'Sin cargos ocultos u obligaciones' : 'No hidden fees or obligations'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: language === 'es' ? '30-60 Minutos' : '30-60 Minutes',
      description: language === 'es' ? 'Evaluación completa del caso' : 'Comprehensive case evaluation'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: language === 'es' ? 'Bilingüe' : 'Bilingual',
      description: language === 'es' ? 'Disponible en inglés y español' : 'Available in English and Spanish'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: language === 'es' ? 'Confidencial' : 'Confidential',
      description: language === 'es' ? 'Tu información está protegida' : 'Your information is protected'
    }
  ];

  const practiceAreaExpertise = [
    {
      icon: <Globe className="w-8 h-8" />,
      area: language === 'es' ? 'Ley de Inmigración' : 'Immigration Law',
      description: language === 'es' 
        ? 'Visas, green cards, ciudadanía, defensa de deportación, y más'
        : 'Visas, green cards, citizenship, deportation defense, and more'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      area: language === 'es' ? 'Lesiones Personales' : 'Personal Injury',
      description: language === 'es'
        ? 'Accidentes de auto, caídas, negligencia médica, muerte injusta'
        : 'Car accidents, slip & falls, medical malpractice, wrongful death'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      area: language === 'es' ? 'Compensación de Trabajadores' : 'Workers Compensation',
      description: language === 'es'
        ? 'Lesiones laborales, enfermedades ocupacionales, beneficios por discapacidad'
        : 'Workplace injuries, occupational diseases, disability benefits'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      area: language === 'es' ? 'Defensa Criminal' : 'Criminal Defense',
      description: language === 'es'
        ? 'DUI/DWI, crímenes de drogas, asalto, robo, crímenes federales'
        : 'DUI/DWI, drug crimes, assault, theft, federal crimes'
    },
    {
      icon: <Users className="w-8 h-8" />,
      area: language === 'es' ? 'Derecho Familiar' : 'Family Law',
      description: language === 'es'
        ? 'Divorcio, custodia, manutención, adopción, violencia doméstica'
        : 'Divorce, custody, child support, adoption, domestic violence'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      area: language === 'es' ? 'Infracciones de Tráfico' : 'Traffic Violations',
      description: language === 'es'
        ? 'Multas por exceso de velocidad, suspensión de licencia, violaciones CDL'
        : 'Speeding tickets, license suspension, CDL violations'
    }
  ];

  const consultationProcess = [
    {
      step: '1',
      title: language === 'es' ? 'Completa el Formulario' : 'Complete the Form',
      description: language === 'es' 
        ? 'Llena el formulario con tu información y detalles del caso'
        : 'Fill out the form with your information and case details'
    },
    {
      step: '2',
      title: language === 'es' ? 'Confirmación Inmediata' : 'Immediate Confirmation',
      description: language === 'es'
        ? 'Recibirás un email de confirmación con los detalles de tu consulta'
        : "You'll receive a confirmation email with your consultation details"
    },
    {
      step: '3',
      title: language === 'es' ? 'Consulta con Abogado' : 'Attorney Consultation',
      description: language === 'es'
        ? 'Habla con un abogado experimentado sobre tu caso'
        : 'Speak with an experienced attorney about your case'
    },
    {
      step: '4',
      title: language === 'es' ? 'Plan de Acción' : 'Action Plan',
      description: language === 'es'
        ? 'Recibe un plan claro para seguir adelante con tu caso'
        : 'Get a clear plan for moving forward with your case'
    }
  ];

  const testimonials = [
    {
      name: 'Maria G.',
      location: 'Raleigh, NC',
      text: language === 'es'
        ? 'La consulta gratuita me ayudó a entender mis opciones. Ahora tengo mi green card gracias a Vasquez Law Firm.'
        : 'The free consultation helped me understand my options. Now I have my green card thanks to Vasquez Law Firm.',
      rating: 5
    },
    {
      name: 'James T.',
      location: 'Charlotte, NC',
      text: language === 'es'
        ? 'Después de mi accidente, no sabía qué hacer. La consulta gratuita me dio claridad y confianza.'
        : "After my accident, I didn't know what to do. The free consultation gave me clarity and confidence.",
      rating: 5
    },
    {
      name: 'Carmen R.',
      location: 'Orlando, FL',
      text: language === 'es'
        ? 'Profesionales, comprensivos y siempre disponibles. La consulta fue muy informativa.'
        : 'Professional, understanding, and always available. The consultation was very informative.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              {language === 'es' ? 'Consulta Gratuita' : 'Free Consultation'}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {language === 'es'
                ? 'Habla con un abogado experimentado sobre tu caso. Sin obligación.'
                : 'Speak with an experienced attorney about your case. No obligation.'}
            </p>
            
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              {consultationBenefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-primary mb-2">{benefit.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Call CTA */}
            <div className="bg-primary/20 border border-primary rounded-lg p-6 mb-8">
              <p className="text-white mb-4">
                {language === 'es' 
                  ? '¿Prefieres hablar ahora? Llámanos directamente:'
                  : 'Prefer to talk now? Call us directly:'}
              </p>
              <a
                href="tel:18449673536"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                <Phone className="w-5 h-5" />
                1-844-YO-PELEO (967-3536)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {language === 'es' ? 'Solicita Tu Consulta Gratuita' : 'Request Your Free Consultation'}
                </h2>
                <ContactForm language={language} />
              </div>

              {/* Process Steps */}
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  {language === 'es' ? 'Cómo Funciona' : 'How It Works'}
                </h2>
                <div className="space-y-6">
                  {consultationProcess.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Important Notice */}
                <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    {language === 'es' ? 'Información Importante' : 'Important Information'}
                  </h3>
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {language === 'es'
                        ? 'La consulta es 100% gratuita y confidencial'
                        : 'Consultation is 100% free and confidential'}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {language === 'es'
                        ? 'No hay obligación de contratar nuestros servicios'
                        : 'No obligation to hire our services'}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {language === 'es'
                        ? 'Disponible en persona, por teléfono o video'
                        : 'Available in-person, by phone, or video'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'es' ? 'Áreas de Práctica' : 'Practice Areas We Cover'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practiceAreaExpertise.map((area, index) => (
                <div key={index} className="text-center">
                  <div className="text-primary mb-4 flex justify-center">{area.icon}</div>
                  <h3 className="font-semibold text-xl mb-3">{area.area}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'es' ? 'Lo Que Dicen Nuestros Clientes' : 'What Our Clients Say'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'es' 
                ? '¿Listo para Obtener la Ayuda que Necesitas?'
                : 'Ready to Get the Help You Need?'}
            </h2>
            <p className="text-xl mb-8">
              {language === 'es'
                ? 'No esperes más. Agenda tu consulta gratuita hoy.'
                : "Don't wait any longer. Schedule your free consultation today."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {language === 'es' ? 'Llamar Ahora' : 'Call Now'}
              </a>
              <a
                href="#consultation-form"
                className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {language === 'es' ? 'Completar Formulario' : 'Complete Form'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trademark */}
      <section className="py-8 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-2xl font-bold mb-2">{TRADEMARK.YO_PELEO_POR_TI}</p>
          <p className="text-lg">{TRADEMARK.I_FIGHT_FOR_YOU}</p>
        </div>
      </section>
    </div>
  );
}
