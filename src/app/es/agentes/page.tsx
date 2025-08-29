import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, MessageSquare, FileText, Scale, Clock, Shield, BarChart, Globe, Lightbulb, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agentes de IA Legal - Bufete de Abogados Vásquez',
  description:
    'Asistentes virtuales impulsados por IA para ayudarle con sus necesidades legales las 24/7',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/agentes',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/agents',
      'es-ES': 'https://www.vasquezlawnc.com/es/agentes',
    },
  },
};

const agents = [
  {
    id: 'legal-assistant',
    name: 'Asistente Legal Virtual',
    description:
      'Su asistente personal de IA disponible 24/7 para responder preguntas legales generales',
    icon: MessageSquare,
    features: [
      'Respuestas instantáneas en español e inglés',
      'Información sobre áreas de práctica',
      'Orientación sobre procesos legales',
      'Programación de consultas',
    ],
    href: '/es/consulta-ia',
    cta: 'Chatear Ahora',
    popular: true,
  },
  {
    id: 'document-analyzer',
    name: 'Analizador de Documentos',
    description: 'Analice y comprenda documentos legales complejos con ayuda de IA',
    icon: FileText,
    features: [
      'Resumen de documentos largos',
      'Identificación de cláusulas importantes',
      'Explicación en lenguaje simple',
      'Detección de problemas potenciales',
    ],
    href: '/es/agentes/documentos',
    cta: 'Analizar Documento',
  },
  {
    id: 'case-evaluator',
    name: 'Evaluador de Casos',
    description: 'Obtenga una evaluación preliminar de la fortaleza de su caso',
    icon: Scale,
    features: [
      'Análisis de méritos del caso',
      'Estimación de compensación',
      'Identificación de evidencia clave',
      'Recomendaciones de estrategia',
    ],
    href: '/es/agentes/evaluador',
    cta: 'Evaluar Mi Caso',
    popular: true,
  },
  {
    id: 'immigration-guide',
    name: 'Guía de Inmigración',
    description: 'Navegue el complejo sistema de inmigración con orientación personalizada',
    icon: Globe,
    features: [
      'Elegibilidad para diferentes visas',
      'Listas de documentos requeridos',
      'Líneas de tiempo del proceso',
      'Actualizaciones de cambios en la ley',
    ],
    href: '/es/agentes/inmigracion',
    cta: 'Obtener Orientación',
  },
  {
    id: 'deadline-tracker',
    name: 'Rastreador de Plazos',
    description: 'Nunca pierda una fecha límite legal importante',
    icon: Clock,
    features: [
      'Recordatorios automáticos',
      'Cálculo de estatutos de limitaciones',
      'Fechas de audiencias',
      'Plazos de presentación',
    ],
    href: '/es/agentes/plazos',
    cta: 'Configurar Alertas',
  },
  {
    id: 'rights-advisor',
    name: 'Asesor de Derechos',
    description: 'Conozca sus derechos legales en diferentes situaciones',
    icon: Shield,
    features: [
      'Derechos durante arrestos',
      'Derechos laborales',
      'Derechos del inquilino',
      'Derechos del consumidor',
    ],
    href: '/es/agentes/derechos',
    cta: 'Conocer Mis Derechos',
  },
];

export default function AIAgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <SparklesIcon className="h-12 w-12 text-secondary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Agentes de IA Legal
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Tecnología de inteligencia artificial de vanguardia diseñada para hacer el derecho
                más accesible, comprensible y eficiente para todos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/es/consulta-ia">
                  <Button size="lg" className="bg-secondary hover:bg-secondary-dark">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Probar Asistente Virtual
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Ver Todos los Agentes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestros Agentes de IA Especializados
              </h2>
              <p className="text-lg text-gray-600">
                Cada agente está entrenado específicamente para ayudarle con diferentes aspectos
                legales
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map(agent => {
                const Icon = agent.icon;
                return (
                  <Card key={agent.id}

                className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <Icon className="h-8 w-8 text-secondary" />
                        </div>
                        {agent.popular && (
                          <span
                className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <CardTitle>{agent.name}</CardTitle>
                      <CardDescription>{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {agent.features.map((feature, index) => (
                          <li key={index}

                className="flex items-start">
                            <ChartBarIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span
                className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={agent.href}>
                        <Button className="w-full" variant={agent.popular ? 'primary' : 'outline'}>
                          {agent.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Por Qué Elegir Nuestros Agentes de IA
              </h2>
              <p className="text-lg text-gray-600">
                Combinamos la experiencia legal con tecnología avanzada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Disponible 24/7</h3>
                <p className="text-gray-600">
                  Obtenga ayuda instantánea en cualquier momento, día o noche
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bilingüe</h3>
                <p className="text-gray-600">Asistencia completa en español e inglés</p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Confidencial</h3>
                <p className="text-gray-600">Sus conversaciones son privadas y seguras</p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Siempre Actualizado</h3>
                <p className="text-gray-600">Información basada en las leyes más recientes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Información Importante</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800 mb-3">
                  Nuestros agentes de IA proporcionan información legal general y no constituyen
                  asesoramiento legal. Para situaciones específicas y representación legal, es
                  esencial consultar con un abogado licenciado.
                </p>
                <p className="text-amber-800">
                  La tecnología de IA es una herramienta complementaria diseñada para hacer el
                  proceso legal más accesible, pero no reemplaza la experiencia y el juicio
                  profesional de nuestros abogados.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-secondary to-secondary-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Experimente el Futuro del Derecho
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Comience con nuestro asistente virtual gratuito y descubra cómo la IA puede ayudarle
              con sus necesidades legales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/es/consulta-ia">
                <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Comenzar Ahora
                </Button>
              </Link>
              <Link href="/es/consulta-gratis">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-secondary"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Hablar con un Abogado
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
  );
}
