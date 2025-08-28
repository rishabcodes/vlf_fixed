'use client';

import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Canvas confetti removed;

const evaluationSchema = z.object({
  caseType: z.enum(['immigration', 'personal-injury', 'criminal-defense', 'workers-comp']),
  urgency: z.enum(['immediate', 'soon', 'planning']),
  previousAttorney: z.boolean(),
  budget: z.enum(['payment-plan', 'retainer', 'contingency', 'unsure']),
  location: z.string().min(1, 'Location is required'),
  language: z.enum(['en', 'es']),
});

type EvaluationData = z.infer<typeof evaluationSchema>;

interface CaseEvaluatorProps {
  language: 'en' | 'es';
}

export default function CaseEvaluator({ language }: CaseEvaluatorProps) {
  const [step, setStep] = useState(0);
  const [eligibility, setEligibility] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EvaluationData>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      language: language,
    },
  });

  const watchedValues = watch();

  const content = {
    en: {
      title: 'Free Case Evaluation',
      subtitle: 'Get instant eligibility assessment powered by AI',
      steps: [
        {
          question: 'What type of legal help do you need?',
          field: 'caseType',
          options: [
            {
              value: 'immigration',
              label: 'Immigration',
              icon: '🌍',
              description: 'Visas, Green Cards, Citizenship',
            },
            {
              value: 'personal-injury',
              label: 'Personal Injury',
              icon: '🏥',
              description: 'Accidents, Medical Malpractice',
            },
            {
              value: 'criminal-defense',
              label: 'Criminal Defense',
              icon: '⚖️',
              description: 'DUI, Drug Crimes, Assault',
            },
            {
              value: 'workers-comp',
              label: "Workers' Comp",
              icon: '👷',
              description: 'Workplace Injuries, Benefits',
            },
          ],
        },
        {
          question: 'How urgent is your situation?',
          field: 'urgency',
          options: [
            {
              value: 'immediate',
              label: 'Emergency (24-48 hours)',
              icon: '🚨',
              description: 'Court date tomorrow, detained, etc.',
            },
            {
              value: 'soon',
              label: 'Soon (This week)',
              icon: '⏰',
              description: 'Deadline approaching, injuries need treatment',
            },
            {
              value: 'planning',
              label: 'Planning Ahead',
              icon: '📅',
              description: 'Preparing for future legal needs',
            },
          ],
        },
        {
          question: 'Have you worked with an attorney before on this matter?',
          field: 'previousAttorney',
          options: [
            {
              value: true,
              label: 'Yes',
              icon: '✅',
              description: 'I need a second opinion or new representation',
            },
            {
              value: false,
              label: 'No',
              icon: '❌',
              description: 'This is my first time seeking legal help',
            },
          ],
        },
        {
          question: "What's your preferred payment arrangement?",
          field: 'budget',
          options: [
            {
              value: 'payment-plan',
              label: 'Payment Plan',
              icon: '💳',
              description: 'Monthly payments over time',
            },
            {
              value: 'retainer',
              label: 'Retainer Fee',
              icon: '💰',
              description: 'Upfront payment for services',
            },
            {
              value: 'contingency',
              label: 'Contingency',
              icon: '🤝',
              description: 'Pay only if we win (PI cases)',
            },
            {
              value: 'unsure',
              label: "I am Not Sure",
              icon: '❓',
              description: "Let's discuss options",
            },
          ],
        },
        {
          question: 'Where are you located?',
          field: 'location',
          type: 'input',
          placeholder: 'City, State (e.g., Raleigh, NC)',
        },
      ],
      calculating: 'Analyzing your case...',
      results: {
        high: {
          title: 'Excellent Case Potential!',
          message:
            'Based on your answers, you have a strong case. Our experienced attorneys are ready to fight for you.',
          cta: 'Schedule Free Consultation',
        },
        medium: {
          title: 'Good Case Potential',
          message: "Your case shows promise. Let's discuss your options in a free consultation.",
          cta: 'Book Consultation',
        },
        low: {
          title: "Let's Explore Your Options",
          message:
            'Every case is unique. Our attorneys can help find the best path forward for your situation.',
          cta: 'Get Legal Advice',
        },
      },
    },
    es: {
      title: 'Evaluación Gratuita de Caso',
      subtitle: 'Obtenga evaluación instantánea de elegibilidad con IA',
      steps: [
        {
          question: '¿Qué tipo de ayuda legal necesita?',
          field: 'caseType',
          options: [
            {
              value: 'immigration',
              label: 'Inmigración',
              icon: '🌍',
              description: 'Visas, Tarjetas Verdes, Ciudadanía',
            },
            {
              value: 'personal-injury',
              label: 'Lesiones Personales',
              icon: '🏥',
              description: 'Accidentes, Negligencia Médica',
            },
            {
              value: 'criminal-defense',
              label: 'Defensa Criminal',
              icon: '⚖️',
              description: 'DUI, Delitos de Drogas, Asalto',
            },
            {
              value: 'workers-comp',
              label: 'Compensación Laboral',
              icon: '👷',
              description: 'Lesiones Laborales, Beneficios',
            },
          ],
        },
        {
          question: '¿Qué tan urgente es su situación?',
          field: 'urgency',
          options: [
            {
              value: 'immediate',
              label: 'Emergencia (24-48 horas)',
              icon: '🚨',
              description: 'Corte mañana, detenido, etc.',
            },
            {
              value: 'soon',
              label: 'Pronto (Esta semana)',
              icon: '⏰',
              description: 'Fecha límite acercándose',
            },
            {
              value: 'planning',
              label: 'Planificando',
              icon: '📅',
              description: 'Preparándose para necesidades futuras',
            },
          ],
        },
        {
          question: '¿Ha trabajado con un abogado antes en este asunto?',
          field: 'previousAttorney',
          options: [
            { value: true, label: 'Sí', icon: '✅', description: 'Necesito una segunda opinión' },
            {
              value: false,
              label: 'No',
              icon: '❌',
              description: 'Primera vez buscando ayuda legal',
            },
          ],
        },
        {
          question: '¿Cuál es su arreglo de pago preferido?',
          field: 'budget',
          options: [
            {
              value: 'payment-plan',
              label: 'Plan de Pago',
              icon: '💳',
              description: 'Pagos mensuales',
            },
            {
              value: 'retainer',
              label: 'Anticipo',
              icon: '💰',
              description: 'Pago inicial por servicios',
            },
            {
              value: 'contingency',
              label: 'Contingencia',
              icon: '🤝',
              description: 'Pagar solo si ganamos',
            },
            {
              value: 'unsure',
              label: 'No Estoy Seguro',
              icon: '❓',
              description: 'Discutamos opciones',
            },
          ],
        },
        {
          question: '¿Dónde está ubicado?',
          field: 'location',
          type: 'input',
          placeholder: 'Ciudad, Estado (ej. Raleigh, NC)',
        },
      ],
      calculating: 'Analizando su caso...',
      results: {
        high: {
          title: '¡Excelente Potencial de Caso!',
          message:
            'Basado en sus respuestas, tiene un caso fuerte. Nuestros abogados experimentados están listos para luchar por usted.',
          cta: 'Programar Consulta Gratuita',
        },
        medium: {
          title: 'Buen Potencial de Caso',
          message: 'Su caso muestra promesa. Discutamos sus opciones en una consulta gratuita.',
          cta: 'Reservar Consulta',
        },
        low: {
          title: 'Exploremos Sus Opciones',
          message:
            'Cada caso es único. Nuestros abogados pueden ayudar a encontrar el mejor camino para su situación.',
          cta: 'Obtener Asesoría Legal',
        },
      },
    },
  };

  const t = content[language];
  const currentStep = t.steps[step];

  // Calculate eligibility based on answers
  useEffect(() => {
    let score = 50; // Base score

    // Case type scoring
    if (watchedValues.caseType === 'personal-injury') score += 10;
    if (watchedValues.caseType === 'immigration') score += 15;

    // Urgency scoring
    if (watchedValues.urgency === 'immediate') score += 20;
    if (watchedValues.urgency === 'soon') score += 10;

    // Previous attorney
    if (watchedValues.previousAttorney === false) score += 10;

    // Budget scoring
    if (watchedValues.budget === 'retainer' || watchedValues.budget === 'contingency') score += 15;
    if (watchedValues.budget === 'payment-plan') score += 10;

    setEligibility(Math.min(score, 100));
  }, [watchedValues]);

  const onSubmit = async (_data: EvaluationData) => {
    setIsCalculating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsCalculating(false);
    setShowResults(true);

    // Celebrate high eligibility
    if (eligibility > 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
        }
};

  const nextStep = () => {
    if (step < t.steps.length - 1) {
      setStep(step + 1);
        }
};

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
        }
};

  const getResultTier = () => {
    if (eligibility > 80) return 'high';
    if (eligibility > 60) return 'medium';
    return 'low';
  };

  return (
    <section className="relative bg-gradient-to-br from-black via-[#1a0a0f] to-black py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div
className="mb-12 text-center"
        >
          <h2 className="mb-4 text-5xl font-black text-white">{t.title}</h2>
          <p className="text-xl text-gray-300">{t.subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#C9974D] to-[#E5B568]"
              style={{ width: `${((step + 1) / t.steps.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-400">
            <span>
              Step {step + 1} of {t.steps.length}
            </span>
            <span>{Math.round(eligibility)}% Eligibility</span>
          </div>
        </div>

        {/* Form Content */}
        <>
          {!showResults && !isCalculating && currentStep && (
            <div
              key={step}

                className="rounded-2xl bg-white/5 p-8 backdrop-blur-sm"
            >
              <h3
                className="mb-8 text-2xl font-bold text-white">{currentStep.question}</h3>

              {currentStep.type === 'input' ? (
                <div>
                  <input
                    {...register('location')}
                    type="text"
                    placeholder={currentStep.placeholder}
                    className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#C9974D]"
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-400">{errors.location.message}</p>
                  )}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {currentStep.options?.map(option => (
                    <label key={option.value.toString()} className="group relative cursor-pointer">
                      <input
                        {...register(currentStep.field as keyof EvaluationData)}
                        type={currentStep.field === 'previousAttorney' ? 'checkbox' : 'radio'}
                        value={option.value.toString()}
                        className="sr-only"
                      />
                      <div      className="rounded-xl border-2 border-white/10 bg-white/5 p-6 transition-all hover:border-[#C9974D]/50 hover:bg-white/10 group-has-[:checked]:border-[#C9974D] group-has-[:checked]:bg-[#C9974D]/20">
                        <div      className="mb-2 text-3xl">{option.icon}</div>
                        <h4 className="mb-1 font-semibold text-white">{option.label}</h4>
                        <p className="text-sm text-gray-400">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep} disabled={step === 0}
      className="rounded-full px-6 py-3 font-semibold text-white transition-opacity disabled:opacity-50"
                >
                  ← Back
                </button>

                {step === t.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)} className="rounded-full bg-[#C9974D] px-8 py-3 font-semibold text-black transition-all hover:bg-[#E5B568]"
                  >
                    Get Results
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep} className="rounded-full bg-[#C9974D] px-8 py-3 font-semibold text-black transition-all hover:bg-[#E5B568]"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Calculating Animation */}
          {isCalculating && (
            <div
className="flex min-h-[400px] flex-col items-center justify-center"
            >
              <div className="mb-8 h-32 w-32">
                <div
className="h-full w-full rounded-full border-4 border-[#C9974D] border-t-transparent"
                />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.calculating}</h3>
              <div className="mt-4 flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}

                className="h-2 w-2 rounded-full bg-[#C9974D]"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div
className="rounded-2xl bg-gradient-to-br from-[#C9974D]/20 to-transparent p-8 text-center backdrop-blur-sm"
            >
              <div className="mb-6">
                <div
className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-[#C9974D]"
                >
                  <span className="text-5xl font-black text-black">{eligibility}%</span>
                </div>
                <h3 className="mb-2 text-3xl font-bold text-white">
                  {t.results[getResultTier()].title}
                </h3>
                <p className="mx-auto max-w-md text-gray-300">
                  {t.results[getResultTier()].message}
                </p>
              </div>

              <button
className="rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-100"
              >
                {t.results[getResultTier()].cta}
              </button>
            </div>
          )}
        </>
      </div>
    </section>
  );
}
