import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, DollarSign, Scale, FileText, BarChart, Clock, Truck, Users, Building, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculadoras Legales - Bufete de Abogados Vásquez',
  description: 'Herramientas gratuitas para estimar compensaciones, acuerdos y costos legales',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/calculadoras',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/calculators',
      'es-ES': 'https://www.vasquezlawnc.com/es/calculadoras',
    },
  },
};

const calculators = [
  {
    id: 'personal-injury',
    title: 'Calculadora de Lesiones Personales',
    description: 'Estime el valor potencial de su reclamo por lesiones personales',
    icon: Heart,
    href: '/es/calculadoras/lesiones-personales',
    popular: true,
    fields: ['Gastos médicos', 'Salarios perdidos', 'Dolor y sufrimiento'],
  },
  {
    id: 'car-accident',
    title: 'Calculadora de Accidente de Auto',
    description: 'Calcule la compensación potencial por accidentes vehiculares',
    icon: Truck,
    href: '/es/calculadoras/accidente-auto',
    popular: true,
    fields: ['Daños al vehículo', 'Tratamiento médico', 'Pérdida de ingresos'],
  },
  {
    id: 'workers-comp',
    title: 'Compensación al Trabajador',
    description: 'Determine los beneficios por lesiones laborales',
    icon: Building,
    href: '/es/calculadoras/compensacion-trabajador',
    fields: ['Salario semanal', 'Porcentaje de discapacidad', 'Duración'],
  },
  {
    id: 'settlement',
    title: 'Calculadora de Acuerdos',
    description: 'Estime el valor de liquidación de su caso',
    icon: Scale,
    href: '/es/calculadoras/acuerdos',
    fields: ['Responsabilidad', 'Daños totales', 'Honorarios legales'],
  },
  {
    id: 'child-support',
    title: 'Manutención Infantil',
    description: 'Calcule los pagos de manutención según las pautas de NC',
    icon: Users,
    href: '/es/calculadoras/manutencion-infantil',
    fields: ['Ingresos', 'Número de hijos', 'Custodia'],
  },
  {
    id: 'legal-fees',
    title: 'Estimador de Honorarios Legales',
    description: 'Comprenda los costos potenciales de representación legal',
    icon: DollarSign,
    href: '/es/calculadoras/honorarios-legales',
    fields: ['Tipo de caso', 'Complejidad', 'Duración estimada'],
  },
  {
    id: 'case-timeline',
    title: 'Línea de Tiempo del Caso',
    description: 'Estime cuánto tiempo tomará resolver su caso',
    icon: Clock,
    href: '/es/calculadoras/linea-tiempo',
    fields: ['Tipo de caso', 'Complejidad', 'Carga judicial'],
  },
  {
    id: 'immigration-costs',
    title: 'Costos de Inmigración',
    description: 'Calcule las tarifas totales para diferentes procesos migratorios',
    icon: FileText,
    href: '/es/calculadoras/costos-inmigracion',
    fields: ['Tipo de visa/petición', 'Tarifas gubernamentales', 'Honorarios legales'],
  },
];

export default function CalculatorsPage() {
  const popularCalculators = calculators.filter(calc => calc.popular);
  const otherCalculators = calculators.filter(calc => !calc.popular);

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Calculator className="mx-auto h-16 w-16 text-secondary mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Calculadoras Legales Gratuitas
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Use nuestras herramientas interactivas para estimar compensaciones, calcular costos
                y comprender mejor el valor potencial de su caso legal.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Popular Calculators */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculadoras Más Populares</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {popularCalculators.map(calculator => {
                  const Icon = calculator.icon;
                  return (
                    <Link key={calculator.id}

                href={calculator.href}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Icon className="h-10 w-10 text-secondary" />
                            <span className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded">
                              Popular
                            </span>
                          </div>
                          <CardTitle className="mt-4">{calculator.title}</CardTitle>
                          <CardDescription>{calculator.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Calcula:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {calculator.fields.map((field, index) => (
                                <li key={index}

                className="flex items-center">
                                  <BarChart className="h-4 w-4 mr-2 text-gray-400" />
                                  {field}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Other Calculators */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Todas las Calculadoras</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherCalculators.map(calculator => {
                  const Icon = calculator.icon;
                  return (
                    <Link key={calculator.id}

                href={calculator.href}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <Icon className="h-8 w-8 text-secondary mb-3" />
                          <CardTitle className="text-lg">{calculator.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {calculator.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <Card className="mt-12 bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Aviso Legal Importante</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800">
                  Estas calculadoras proporcionan solo estimaciones generales basadas en la
                  información que usted proporciona. Los resultados no constituyen asesoramiento
                  legal y no deben considerarse como garantía de ningún resultado específico. Cada
                  caso es único y muchos factores pueden afectar el valor real o el resultado de su
                  caso.
                </p>
                <p className="text-amber-800 mt-3">
                  Para una evaluación precisa de su situación legal específica, por favor consulte
                  con uno de nuestros abogados experimentados.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-secondary to-secondary-dark rounded-lg p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">¿Necesita una Evaluación Profesional?</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Nuestros abogados pueden proporcionar una evaluación detallada y personalizada de su
                caso durante una consulta gratuita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/es/consulta-gratis">
                  <button className="px-6 py-3 bg-white text-secondary rounded-lg font-semibold hover:bg-gray-100 transition">
                    Programar Consulta Gratuita
                  </button>
                </Link>
                <a href="tel:18449673536">
                  <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-secondary transition">
                    Llamar 1-844-YO-PELEO
                  </button>
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">100% Gratis</h3>
                <p className="text-gray-600">
                  Todas nuestras calculadoras son completamente gratuitas y no requieren registro.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Basado en la Ley de NC</h3>
                <p className="text-gray-600">
                  Nuestras calculadoras utilizan las leyes y pautas actuales de Carolina del Norte.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Resultados Detallados</h3>
                <p className="text-gray-600">
                  Obtenga desgloses detallados y explicaciones de sus cálculos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
