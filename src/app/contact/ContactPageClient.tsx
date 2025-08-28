'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Shield,
  Users,
  Building2,
  Calendar,
  ArrowRight,
  CheckCircle,
  Globe,
  FileText
} from 'lucide-react';
import { TRADEMARK } from '@/lib/constants/trademark';
import { ContactForm } from '@/components/forms/ContactForm';

interface ContactPageClientProps {
  language?: 'en' | 'es';
}

export default function ContactPageClient({ language = 'en' }: ContactPageClientProps) {
  const offices = [
    {
      id: 'smithfield',
      name: 'Smithfield Office (Main)',
      address: '325 N Brightleaf Blvd #11, Smithfield, NC 27577',
      phone: '(919) 934-7600',
      fax: '(919) 934-7601',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      mapUrl: 'https://goo.gl/maps/smithfield'
    },
    {
      id: 'raleigh',
      name: 'Raleigh Office',
      address: '431 Chapel Hill Road, Raleigh, NC 27607',
      phone: '(919) 400-9800',
      fax: '(919) 400-9801',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      mapUrl: 'https://goo.gl/maps/raleigh'
    },
    {
      id: 'charlotte',
      name: 'Charlotte Office',
      address: '901 W Trade St #500, Charlotte, NC 28202',
      phone: '(704) 343-1400',
      fax: '(704) 343-1401',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      mapUrl: 'https://goo.gl/maps/charlotte'
    },
    {
      id: 'orlando',
      name: 'Orlando Office',
      address: '1 S Orange Ave #200, Orlando, FL 32801',
      phone: '(407) 802-3400',
      fax: '(407) 802-3401',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      mapUrl: 'https://goo.gl/maps/orlando'
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: language === 'es' ? 'Llámanos 24/7' : 'Call Us 24/7',
      value: '1-844-YO-PELEO (967-3536)',
      description: language === 'es' ? 'Línea gratuita disponible 24/7' : 'Toll-free line available 24/7',
      action: 'tel:18449673536'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: language === 'es' ? 'Chat en Vivo' : 'Live Chat',
      value: language === 'es' ? 'Disponible Ahora' : 'Available Now',
      description: language === 'es' ? 'Habla con nuestro asistente de IA' : 'Chat with our AI assistant',
      action: '#chat'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: language === 'es' ? 'Correo Electrónico' : 'Email Us',
      value: 'info@vasquezlawnc.com',
      description: language === 'es' ? 'Respuesta en 1 hora hábil' : 'Response within 1 business hour',
      action: 'mailto:info@vasquezlawnc.com'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: language === 'es' ? 'Agendar Consulta' : 'Schedule Consultation',
      value: language === 'es' ? 'Consulta Gratis' : 'Free Consultation',
      description: language === 'es' ? 'Disponible en persona o virtual' : 'Available in-person or virtual',
      action: '/free-consultation'
    }
  ];

  const reasons = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: language === 'es' ? '30+ Años de Experiencia' : '30+ Years Experience',
      description: language === 'es' 
        ? 'Décadas de experiencia legal exitosa'
        : 'Decades of successful legal experience'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: language === 'es' ? '10,000+ Clientes' : '10,000+ Clients',
      description: language === 'es'
        ? 'Miles de clientes satisfechos'
        : 'Thousands of satisfied clients'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: language === 'es' ? 'Servicio Bilingüe' : 'Bilingual Service',
      description: language === 'es'
        ? 'Atención completa en inglés y español'
        : 'Full service in English and Spanish'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: language === 'es' ? 'Sin Costo Inicial' : 'No Upfront Costs',
      description: language === 'es'
        ? 'No cobramos hasta que ganemos'
        : "We don't get paid until you win"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              {language === 'es' ? 'Contáctanos' : 'Contact Us'}
            </h1>
            <p className="text-xl mb-8">
              {language === 'es' 
                ? 'Estamos aquí para luchar por ti. Disponible 24/7.'
                : "We're here to fight for you. Available 24/7."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:18449673536"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {language === 'es' ? 'Llamar Ahora' : 'Call Now'}
              </a>
              <Link
                href="/free-consultation"
                className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-dark transition flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'es' ? 'Múltiples Formas de Contactarnos' : 'Multiple Ways to Reach Us'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-primary font-semibold mb-1">{method.value}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <ContactForm language={language} />
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="text-3xl font-bold mb-8">
                  {language === 'es' ? '¿Por Qué Elegirnos?' : 'Why Choose Us?'}
                </h2>
                <div className="space-y-6">
                  {reasons.map((reason, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-primary flex-shrink-0">
                        {reason.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                        <p className="text-gray-600">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Emergency Contact */}
                <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-900 mb-2">
                    {language === 'es' ? '¿Emergencia Legal?' : 'Legal Emergency?'}
                  </h3>
                  <p className="text-red-800 mb-4">
                    {language === 'es'
                      ? 'Si tienes una emergencia legal, llámanos inmediatamente:'
                      : 'If you have a legal emergency, call us immediately:'}
                  </p>
                  <a
                    href="tel:18449673536"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    <Phone className="w-5 h-5" />
                    1-844-YO-PELEO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'es' ? 'Nuestras Oficinas' : 'Our Office Locations'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {offices.map((office) => (
              <div key={office.id} className="bg-gray-50 rounded-lg p-6">
                <Building2 className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-3">{office.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {office.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {office.hours}
                  </p>
                </div>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary-dark transition text-sm font-semibold"
                >
                  {language === 'es' ? 'Ver en Mapa' : 'View on Map'}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trademark */}
      <section className="py-8 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <p className="text-2xl font-bold mb-2">{TRADEMARK.slogan}</p>
          <p className="text-lg">{TRADEMARK.sloganSpanish}</p>
        </div>
      </section>
    </div>
  );
}
