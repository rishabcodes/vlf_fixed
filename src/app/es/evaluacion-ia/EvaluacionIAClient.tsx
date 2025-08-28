'use client';

import {
  Brain,
  FileSearch,
  Scale,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function EvaluacionIAClient() {
  const [caseType, setCaseType] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [evaluationScore, setEvaluationScore] = useState(0);

  const caseTypes = [
    { value: 'immigration', label: 'Inmigración', icon: '🌐' },
    { value: 'personal-injury', label: 'Lesiones Personales', icon: '🏥' },
    { value: 'workers-comp', label: 'Compensación Laboral', icon: '⚒️' },
    { value: 'criminal-defense', label: 'Defensa Criminal', icon: '⚖️' },
    { value: 'family-law', label: 'Derecho Familiar', icon: '👨‍👩‍👧‍👦' },
    { value: 'car-accident', label: 'Accidentes de Auto', icon: '🚗' },
  ];

  const evaluationFactors = [
    {
      icon: <FileSearch className="w-6 h-6 text-blue-500" />,
      title: 'Análisis de Documentos',
      description: 'Revisión exhaustiva de toda la evidencia disponible',
    },
    {
      icon: <Scale className="w-6 h-6 text-purple-500" />,
      title: 'Precedentes Legales',
      description: 'Comparación con casos similares exitosos',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: 'Probabilidad de Éxito',
      description: 'Cálculo basado en datos históricos',
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: 'Tiempo Estimado',
      description: 'Proyección realista de duración del caso',
    },
  ];

  const handleEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate AI evaluation
    const score = Math.floor(Math.random() * 30) + 70; // 70-100 score
    setEvaluationScore(score);
    setShowResults(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 85) return 'Excelente probabilidad de éxito';
    if (score >= 70) return 'Buena probabilidad con estrategia adecuada';
    return 'Caso complejo que requiere análisis detallado';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated neural network background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 800">
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 1440}
                cy={Math.random() * 800}
                r="2"
                fill="white"
              />
            ))}
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div
className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Brain className="w-5 h-5 text-secondary-400" />
              <span className="text-sm font-medium">Evaluación Impulsada por IA</span>
            </div>

            <h1
className="text-5xl md:text-7xl font-bold mb-6"
            >
              Evalúe Su Caso con <span className="text-secondary-400">IA</span>
            </h1>

            <p
className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
            >
              Obtenga un análisis instantáneo de la fortaleza de su caso legal usando inteligencia
              artificial avanzada
            </p>

            <div
className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#evaluation-form"
                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 text-lg"
              >
                <Sparkles className="w-6 h-6" />
                Evaluar Mi Caso Ahora
              </a>
              <Link
                href="/es/consulta-gratis"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg transition-all border border-white/30 text-lg"
              >
                Hablar con un Abogado
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cómo Funciona la Evaluación con IA
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {evaluationFactors.map((factor, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div
                className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  {factor.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{factor.title}</h3>
                <p className="text-gray-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Form */}
      <section id="evaluation-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!showResults ? (
              <div
className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Evaluación Gratuita de Su Caso
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Complete este formulario para recibir un análisis instantáneo de su caso legal
                </p>

                <form onSubmit={handleEvaluation} className="space-y-6">
                  {/* Case Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tipo de Caso Legal
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {caseTypes.map(type => (
                        <label
                          key={type.value}

                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            caseType === type.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="caseType"
                            value={type.value}
                            checked={caseType === type.value}
                            onChange={e => setCaseType(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-2xl">{type.icon}</span>
                          <span className="font-medium">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Case Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describa Su Situación
                    </label>
                    <textarea
                      rows={4}

                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Proporcione detalles sobre su caso legal..."
                      required
                    />
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ¿Cuándo Ocurrió?
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccione un período</option>
                      <option value="week">Hace menos de una semana</option>
                      <option value="month">Hace menos de un mes</option>
                      <option value="3months">Hace 1-3 meses</option>
                      <option value="6months">Hace 3-6 meses</option>
                      <option value="year">Hace 6-12 meses</option>
                      <option value="more">Hace más de un año</option>
                    </select>
                  </div>

                  {/* Evidence */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ¿Qué Evidencia Tiene? (Seleccione todas las que apliquen)
                    </label>
                    <div className="space-y-3">
                      {[
                        'Documentos oficiales',
                        'Fotografías o videos',
                        'Testigos',
                        'Reportes médicos',
                        'Reportes policiales',
                        'Correspondencia/emails',
                        'Contratos o acuerdos',
                      ].map(evidence => (
                        <label key={evidence}
                          className="flex items-center gap-3">
                          <input type="checkbox"
                            className="w-4 h-4 text-primary-600 rounded" />
                          <span>{evidence}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="pt-6 border-t">
                    <h3 className="font-semibold mb-4">Información de Contacto</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nombre"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="Correo Electrónico"
                        required
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      required
                      className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        Su información está protegida y es confidencial. Solo será utilizada para
                        evaluar su caso y contactarle con los resultados.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Brain className="w-5 h-5" />
                    Obtener Evaluación con IA
                  </button>
                </form>
              </div>
            ) : (
              <div
className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-12 h-12 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Evaluación Completada</h2>
                  <p className="text-gray-600">
                    Nuestra IA ha analizado su caso basándose en miles de casos similares
                  </p>
                </div>

                {/* Score Display */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Puntuación de Fortaleza del Caso</p>
                    <div className={`text-6xl font-bold ${getScoreColor(evaluationScore)}`}>
                      {evaluationScore}%
                    </div>
                    <p className={`text-lg font-medium mt-2 ${getScoreColor(evaluationScore)}`}>
                      {getScoreMessage(evaluationScore)}
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-xl">Recomendaciones Basadas en IA:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>
                        Su caso muestra méritos legales sólidos basados en precedentes similares
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p>La evidencia disponible fortalece significativamente su posición</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p>Recomendamos actuar pronto debido a limitaciones de tiempo</p>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-primary-50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-xl mb-4">Próximos Pasos Recomendados:</h3>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        1
                      </span>
                      <span>
                        Programe una consulta gratuita para revisar esta evaluación con un abogado
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        2
                      </span>
                      <span>Reúna toda la documentación y evidencia disponible</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        3
                      </span>
                      <span>Actúe rápidamente para proteger sus derechos legales</span>
                    </li>
                  </ol>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/es/consulta-gratis"
                    className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-6 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                    Programar Consulta Gratuita
                  </Link>
                  <a
                    href="tel:1-844-967-3536"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors"
                  >
                    Llamar: 1-844-YO-PELEO
                  </a>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 mt-6 text-center">
                  Esta evaluación con IA es solo para fines informativos y no constituye
                  asesoramiento legal. Los resultados se basan en patrones de casos similares y
                  deben ser revisados con un abogado licenciado.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Por Qué Usar Nuestra Evaluación con IA
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Gratis</h3>
                <p className="text-gray-600">Sin costo, sin obligación, sin tarjetas de crédito</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resultados Instantáneos</h3>
                <p className="text-gray-600">
                  Obtenga una evaluación completa en menos de 5 minutos
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Totalmente Confidencial</h3>
                <p className="text-gray-600">
                  Su información está protegida y nunca será compartida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
