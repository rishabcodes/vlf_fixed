'use client';

import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Zap,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactoRapidoClient() {
  const [urgency, setUrgency] = useState('normal');
  const [contacted, setContacted] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Llamada Directa',
      description: 'Respuesta inmediata',
      action: '1-844-YO-PELEO',
      href: 'tel:1-844-967-3536',
      highlight: true,
      time: '< 1 minuto',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Chat en Vivo',
      description: 'Agente disponible ahora',
      action: 'Iniciar Chat',
      href: '#chat',
      highlight: false,
      time: '< 2 minutos',
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email Urgente',
      description: 'Respuesta en 1 hora',
      action: 'urgente@vasquezlawnc.com',
      href: 'mailto:urgente@vasquezlawnc.com',
      highlight: false,
      time: '< 1 hora',
    },
  ];

  const urgentSituations = [
    'Detención o arresto inminente',
    'Fecha límite legal hoy/mañana',
    'Accidente con lesiones graves',
    'Orden de deportación recibida',
    'Citación judicial urgente',
    'Emergencia familiar legal',
  ];

  const offices = [
    {
      city: 'Charlotte',
      address: '123 Main St, Charlotte, NC',
      phone: '704-555-0123',
      hours: 'Lun-Vie: 8AM-6PM',
    },
    {
      city: 'Raleigh',
      address: '456 Capital Blvd, Raleigh, NC',
      phone: '919-555-0456',
      hours: 'Lun-Vie: 8AM-6PM',
    },
    {
      city: 'Orlando',
      address: '789 Orange Ave, Orlando, FL',
      phone: '407-555-0789',
      hours: 'Lun-Vie: 8AM-6PM',
    },
  ];

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContacted(true);
    // In real app, this would send the form data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-primary-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />

        {/* Animated urgency indicators */}
        <div className="absolute inset-0">
          <div
            className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"
          />
          <div
            className="absolute bottom-20 left-20 w-16 h-16 bg-white/10 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Respuesta Inmediata Disponible</span>
            </div>

            <h1
className="text-4xl md:text-6xl font-bold mb-6"
            >
              ¿Necesita Ayuda <span className="text-yellow-400">URGENTE</span>?
            </h1>

            <p
className="text-xl text-gray-200 mb-8"
            >
              Estamos aquí 24/7 para emergencias legales. Contacte ahora mismo.
            </p>

            <div
className="bg-yellow-500 text-black font-bold py-6 px-8 rounded-lg inline-block"
            >
              <a href="tel:1-844-967-3536" className="flex items-center gap-3 text-2xl">
                <Phone className="w-8 h-8 animate-pulse" />
                1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-12 -mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <a
                key={index}

                href={method.href}

                className={`bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1 ${
                  method.highlight ? 'ring-4 ring-yellow-400 ring-offset-2' : ''
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    method.highlight
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-primary-100 text-primary-600'
                  }`}
                >
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div
                  className={`font-bold text-lg ${
                    method.highlight ? 'text-yellow-600' : 'text-primary-600'
                  }`}
                >
                  {method.action}
                </div>
                <p className="text-sm text-gray-500 mt-2">Tiempo de respuesta: {method.time}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!contacted ? (
              <div
className="bg-gray-50 rounded-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Formulario de Contacto Rápido
                </h2>

                <form onSubmit={handleQuickContact} className="space-y-4">
                  {/* Urgency Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nivel de Urgencia
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'normal', label: 'Normal', color: 'green' },
                        { value: 'urgent', label: 'Urgente', color: 'yellow' },
                        { value: 'emergency', label: 'Emergencia', color: 'red' },
                      ].map(level => (
                        <label
                          key={level.value}

                className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            urgency === level.value
                              ? `border-${level.color}-500 bg-${level.color}-50`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={level.value}
                            checked={urgency === level.value}
                            onChange={e => setUrgency(e.target.value)}
                            className="sr-only"
                          />
                          <span
                            className={`font-medium ${
                              urgency === level.value ? `text-${level.color}-700` : ''
                            }`}
                          >
                            {level.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono (para llamada inmediata)"
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Issue Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Problema Legal
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccione uno...</option>
                      <option value="immigration">Inmigración - Urgente</option>
                      <option value="criminal">Arresto/Defensa Criminal</option>
                      <option value="accident">Accidente con Lesiones</option>
                      <option value="deportation">Orden de Deportación</option>
                      <option value="family">Emergencia Familiar</option>
                      <option value="other">Otro Asunto Urgente</option>
                    </select>
                  </div>

                  {/* Brief Description */}
                  <textarea
                    rows={3}

                placeholder="Describa brevemente su situación urgente..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />

                  {/* Preferred Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ¿Cómo prefiere ser contactado?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="text-primary-600" />
                        <span>Llamada</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="text-primary-600" />
                        <span>Texto</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="text-primary-600" />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      urgency === 'emergency'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : urgency === 'urgent'
                          ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    <Zap className="w-5 h-5" />
                    Enviar Solicitud de Contacto Urgente
                  </button>
                </form>

                {/* Emergency Notice */}
                {urgency === 'emergency' && (
                  <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium text-center">
                      Para emergencias inmediatas, por favor llame ahora:{' '}
                      <a href="tel:1-844-967-3536" className="underline font-bold">
                        1-844-YO-PELEO
                      </a>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div
className="bg-green-50 rounded-xl p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">¡Solicitud Recibida!</h3>
                <p className="text-gray-700 mb-6">
                  Un miembro de nuestro equipo se comunicará con usted en los próximos minutos.
                </p>
                <div className="bg-white rounded-lg p-6 mb-6">
                  <p className="font-semibold mb-2">Mientras tanto:</p>
                  <a
                    href="tel:1-844-967-3536"
                    className="text-2xl font-bold text-primary-600 hover:text-primary-700"
                  >
                    Llame Ahora: 1-844-YO-PELEO
                  </a>
                </div>
                <Link
                  href="/es"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Volver al Inicio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Urgent Situations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Situaciones Que Requieren Atención Inmediata
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {urgentSituations.map((situation, index) => (
                <div
                  key={index}

                className="bg-white rounded-lg p-4 shadow-md flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <p
                className="font-medium">{situation}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Si enfrenta cualquiera de estas situaciones, no espere.
              </p>
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Llamar Ahora para Ayuda Inmediata
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Oficinas Disponibles para Visitas de Emergencia
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {offices.map((office, index) => (
              <div
                key={index}

                className="bg-gray-50 rounded-lg p-6"
              >
                <h3
                className="text-xl font-bold mb-3">{office.city}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                    <p>{office.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <a
                      href={`tel:${office.phone}`}

                className="text-primary-600 hover:text-primary-700"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <p>{office.hours}</p>
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-3 font-medium">
                  * Disponible 24/7 para emergencias
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
