'use client';

import {
  Shield,
  Lock,
  CreditCard,
  CheckCircle,
  Award,
  Globe,
  Zap,
  HeadphonesIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function PagoSeguroClient() {
  const securityBadges = [
    {
      name: 'SSL Certificado',
      description: 'Encriptación de 256 bits',
      icon: <Lock className="w-8 h-8 text-green-600" />,
    },
    {
      name: 'PCI DSS Nivel 1',
      description: 'Máximo estándar de seguridad',
      icon: <Shield className="w-8 h-8 text-blue-600" />,
    },
    {
      name: 'Verificado por Visa',
      description: 'Protección adicional',
      icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
    },
    {
      name: 'Mastercard SecureCode',
      description: 'Autenticación segura',
      icon: <Award className="w-8 h-8 text-orange-600" />,
    },
  ];

  const paymentFeatures = [
    {
      title: 'Procesamiento Instantáneo',
      description: 'Sus pagos se procesan en tiempo real con confirmación inmediata',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Múltiples Métodos de Pago',
      description: 'Aceptamos todas las tarjetas principales y transferencias bancarias',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: 'Disponible 24/7',
      description: 'Realice pagos en cualquier momento, desde cualquier lugar',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: 'Soporte Dedicado',
      description: 'Equipo de soporte disponible para ayudar con cualquier pregunta',
      icon: <HeadphonesIcon className="w-6 h-6" />,
    },
  ];

  const faqs = [
    {
      question: '¿Qué tan seguro es su sistema de pagos?',
      answer:
        'Utilizamos la tecnología de encriptación más avanzada del mercado, la misma que usan los principales bancos. Todos los datos se transmiten a través de conexiones SSL seguras de 256 bits y cumplimos con los estándares PCI DSS Nivel 1.',
    },
    {
      question: '¿Guardan mi información de tarjeta de crédito?',
      answer:
        'No. Nunca almacenamos información de tarjetas de crédito en nuestros servidores. Todos los datos de pago se procesan a través de pasarelas de pago seguras certificadas que cumplen con los más altos estándares de seguridad.',
    },
    {
      question: '¿Qué hago si tengo problemas con mi pago?',
      answer:
        'Nuestro equipo de soporte está disponible para ayudarle. Puede llamarnos al 1-844-YO-PELEO o enviarnos un correo a pagos@vasquezlawnc.com. Resolveremos cualquier problema rápidamente.',
    },
    {
      question: '¿Recibiré un recibo de mi pago?',
      answer:
        'Sí, recibirá un recibo detallado por correo electrónico inmediatamente después de completar su pago. Este recibo incluirá toda la información necesaria para sus registros.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Security pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
            >
              <Shield className="w-6 h-6 text-secondary-400" />
              <span className="text-lg font-medium">Portal de Pago 100% Seguro</span>
            </div>

            <h1
className="text-5xl md:text-7xl font-bold mb-6"
            >
              Pago <span className="text-secondary-400">Seguro</span> Garantizado
            </h1>

            <p
className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
            >
              Su seguridad es nuestra prioridad. Procesamos todos los pagos con la tecnología de
              encriptación más avanzada del mercado.
            </p>

            <div
className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/es/hacer-pago"
                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 text-lg"
              >
                <CreditCard className="w-6 h-6" />
                Realizar Pago Seguro
              </Link>
              <a
                href="tel:1-844-967-3536"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg transition-all border border-white/30 text-lg"
              >
                Llamar para Pagar: 1-844-YO-PELEO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Security Badges */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {securityBadges.map((badge, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div
                className="flex justify-center mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Por Qué Nuestro Sistema es el Más Seguro
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {paymentFeatures.map((feature, index) => (
                <div
                  key={index}

                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div
                className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-primary-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Tecnología de Seguridad de Vanguardia</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Encriptación SSL de 256 bits</h3>
                      <p className="text-gray-600">
                        La misma tecnología que usan los bancos más grandes del mundo para proteger
                        las transacciones financieras.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Cumplimiento PCI DSS</h3>
                      <p className="text-gray-600">
                        Certificados con el nivel más alto de seguridad para el procesamiento de
                        tarjetas de crédito.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Tokenización de Datos</h3>
                      <p className="text-gray-600">
                        Su información sensible se convierte en tokens seguros que no pueden ser
                        descifrados por terceros.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Monitoreo 24/7</h3>
                      <p className="text-gray-600">
                        Sistemas de detección de fraude activos las 24 horas para proteger cada
                        transacción.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                  <div className="bg-white rounded-xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Conexión Segura</span>
                      <Lock className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                      <p className="text-xs text-gray-600">Encriptación: AES-256</p>
                      <p className="text-xs text-gray-600">Protocolo: TLS 1.3</p>
                      <p className="text-xs text-gray-600">Certificado: Válido</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700">
                      Todos sus datos están protegidos con los más altos estándares de seguridad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Métodos de Pago Aceptados</h2>
            <p className="text-gray-600 mb-12">
              Aceptamos todos los métodos de pago principales para su conveniencia
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Visa', 'Mastercard', 'American Express', 'Discover'].map(card => (
                <div key={card}

                className="bg-white rounded-lg p-6 shadow-md">
                  <CreditCard className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                  <p
                className="font-medium">{card}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Preguntas Frecuentes sobre Seguridad
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}

                className="bg-gray-50 rounded-lg p-6"
                >
                  <h3
                className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Realizar un Pago Seguro?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Procese su pago de manera rápida y segura con nuestra plataforma protegida
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/hacer-pago"
              className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              <Lock className="w-5 h-5" />
              Ir al Portal de Pagos
            </Link>
            <a
              href="tel:1-844-967-3536"
              className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
            >
              Asistencia: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
