'use client';

import {
  Sparkles,
  MessageSquare,
  Clock,
  Shield,
  Globe,
  Brain,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { UnifiedModernChatbot } from '@/components/ChatWidget/UnifiedModernChatbot';

export default function ConsultaIAClient() {
  const [showChat, setShowChat] = useState(false);

  const features = [
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: 'Disponible 24/7',
      description: 'Obtenga respuestas inmediatas a cualquier hora del día o la noche',
    },
    {
      icon: <Globe className="w-6 h-6 text-green-500" />,
      title: '100% en Español',
      description: 'Comunicación completa en su idioma, sin barreras lingüísticas',
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: 'Totalmente Confidencial',
      description: 'Sus consultas son privadas y protegidas por secreto profesional',
    },
    {
      icon: <Brain className="w-6 h-6 text-orange-500" />,
      title: 'IA Entrenada en Leyes',
      description: 'Respuestas basadas en las leyes de NC, FL y federales',
    },
  ];

  const useCases = [
    '¿Califico para una visa de trabajo?',
    '¿Cuánto vale mi caso de accidente?',
    '¿Qué hacer si me arrestaron?',
    '¿Cómo solicitar asilo político?',
    '¿Puedo pelear mi deportación?',
    '¿Cómo obtener compensación laboral?',
  ];

  const process = [
    {
      step: '1',
      title: 'Haga Su Pregunta',
      description: 'Escriba su consulta legal en español, con todos los detalles relevantes',
    },
    {
      step: '2',
      title: 'Reciba Orientación Inmediata',
      description: 'Nuestra IA analiza su situación y proporciona información legal relevante',
    },
    {
      step: '3',
      title: 'Obtenga Próximos Pasos',
      description: 'Reciba recomendaciones específicas y la opción de hablar con un abogado',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5 text-secondary-400" />
              <span className="text-sm font-medium">
                Tecnología de Inteligencia Artificial Avanzada
              </span>
            </div>

            <h1
className="text-5xl md:text-7xl font-bold mb-6"
            >
              Consulta Legal con <span className="text-secondary-400">IA</span>
            </h1>

            <p
className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
            >
              Obtenga respuestas legales instantáneas las 24 horas. Nuestra IA está entrenada en
              inmigración, lesiones personales, y más.
            </p>

            <div
className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => setShowChat(true)}

                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 text-lg"
              >
                <MessageSquare className="w-6 h-6" />
                Comenzar Consulta Gratis
              </button>
              <Link
                href="/es/consulta-gratis"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg transition-all border border-white/30 text-lg"
              >
                Prefiero Hablar con un Abogado
              </Link>
            </div>

            <p
className="mt-6 text-sm text-gray-300"
            >
              Sin costo • Sin obligación • Respuesta inmediata
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por Qué Usar Nuestra IA Legal?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}

                className="text-center group"
              >
                <div
                className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Preguntas Que Puede Hacer</h2>
            <p className="text-center text-gray-600 mb-12">
              Nuestra IA puede ayudarle con consultas sobre inmigración, accidentes, defensa
              criminal, compensación laboral y más.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div
                  key={index}

                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setShowChat(true)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-gray-700 group-hover:text-primary-600 transition-colors">
                      {useCase}
                    </p>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Cómo Funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <div
                  key={index}

                className="relative"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span
                className="text-2xl font-bold text-primary-600">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-200 rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b bg-primary-900 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-secondary-400" />
                    Consulta Legal con IA
                  </h3>
                  <p className="text-sm text-gray-200 mt-1">Haga su pregunta legal en español</p>
                </div>
                <button
                  onClick={() => setShowChat(false)}

                className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="h-[60vh]">
              <UnifiedModernChatbot language="es" />
            </div>
          </div>
        </div>
      )}

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Importante Saber</h2>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Nuestra IA proporciona información legal general</strong> basada en las
                leyes actuales, pero no reemplaza el consejo de un abogado licenciado.
              </p>
              <p className="text-gray-600">
                Para casos específicos o situaciones complejas, siempre recomendamos una consulta
                personalizada con nuestros abogados experimentados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Obtener Respuestas?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Nuestra IA está disponible 24/7 para ayudarle con sus preguntas legales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowChat(true)}

                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              Iniciar Chat con IA
            </button>
            <a
              href="tel:1-844-967-3536"
              className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
            >
              Llamar: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
