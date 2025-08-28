'use client';

import React, { useState } from 'react';

import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LeadCaptureFormProps {
  formId: string;
  practiceArea?: string;
  language?: 'en' | 'es';
  onSuccess?: () => void;
  className?: string;
}

export default function LeadCaptureForm({
  formId,
  practiceArea: defaultPracticeArea,
  language = 'en',
  onSuccess,
  className = '',
}: LeadCaptureFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    practiceArea: defaultPracticeArea || '',
    message: '',
    urgency: 'planning',
    language,
  });

  const translations = {
    en: {
      title: 'Get Your Free Consultation',
      subtitle: "Fill out the form below and we'll contact you within 24 hours",
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      practiceArea: 'Legal Matter',
      message: 'Tell us about your case',
      urgency: 'How urgent is your matter?',
      urgencyOptions: {
        immediate: 'Immediate (within 24 hours)',
        soon: 'Soon (within a week)',
        planning: 'Planning ahead',
      },
      practiceAreaOptions: {
        immigration: 'Immigration',
        personalInjury: 'Personal Injury',
        criminal: 'Criminal Defense',
        family: 'Family Law',
        workersComp: 'Workers Compensation',
        traffic: 'Traffic Violations',
      },
      submit: 'Get Free Consultation',
      submitting: 'Submitting...',
      successMessage: "Thank you! We'll contact you soon.",
      errorMessage: 'Something went wrong. Please try again.',
    },
    es: {
      title: 'Obtenga Su Consulta Gratuita',
      subtitle: 'Complete el formulario y lo contactaremos dentro de 24 horas',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      practiceArea: 'Asunto Legal',
      message: 'Cuéntenos sobre su caso',
      urgency: '¿Qué tan urgente es su asunto?',
      urgencyOptions: {
        immediate: 'Inmediato (dentro de 24 horas)',
        soon: 'Pronto (dentro de una semana)',
        planning: 'Planificando',
      },
      practiceAreaOptions: {
        immigration: 'Inmigración',
        personalInjury: 'Lesiones Personales',
        criminal: 'Defensa Criminal',
        family: 'Derecho Familiar',
        workersComp: 'Compensación Laboral',
        traffic: 'Violaciones de Tráfico',
      },
      submit: 'Obtener Consulta Gratuita',
      submitting: 'Enviando...',
      successMessage: '¡Gracias! Lo contactaremos pronto.',
      errorMessage: 'Algo salió mal. Por favor intente de nuevo.',
    },
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formId,
          pageUrl: window.location.href,
          source: 'website-form',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.errorMessage);
      }

      setSuccess(true);

      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          currency: 'USD',
          value: practiceAreaValues[formData.practiceArea] || 0,
        });
      }

      // Call success callback or redirect
      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          router.push('/thank-you');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorMessage);
    } finally {
      setLoading(false);
        }
};

  const practiceAreaValues: Record<string, number> = {
    immigration: 5000,
    personalInjury: 10000,
    criminal: 3000,
    family: 2500,
    workersComp: 7500,
    traffic: 1000,
  };

  if (success) {
    return (
      <div
className={`bg-green-50 dark:bg-green-900/20 p-8 rounded-lg text-center ${className}`}
      >
        <div
className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
          {t.successMessage}
        </h3>
        <p className="text-green-600 dark:text-green-300">
          {language === 'es'
            ? 'Un miembro de nuestro equipo se pondrá en contacto con usted pronto.'
            : 'A member of our team will contact you shortly.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t.firstName} *
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value )}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {t.lastName} *
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value )}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.email} *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value )}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.phone} *
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value )}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="practiceArea"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.practiceArea} *
        </label>
        <select
          id="practiceArea"
          required
          value={formData.practiceArea} onChange={e => setFormData({ ...formData, practiceArea: e.target.value )}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select...</option>
          {Object.entries(t.practiceAreaOptions).map(([value, label]) => (
            <option key={value}

                value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="urgency"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.urgency}
        </label>
        <select
          id="urgency"
          value={formData.urgency} onChange={e => setFormData({ ...formData, urgency: e.target.value )}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white"
        >
          {Object.entries(t.urgencyOptions).map(([value, label]) => (
            <option key={value}

                value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.message}
        </label>
        <textarea
          id="message"
          rows={4}

                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value )}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white"
        />
      </div>

      <>
        {error && (
          <div
className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}
      </>

      <button
        type="submit"
        disabled={loading} className="w-full bg-[#6B1F2E] hover:bg-[#8B2635] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </button>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        {language === 'es'
          ? 'Al enviar este formulario, acepta nuestros términos y condiciones y política de privacidad.'
          : 'By submitting this form, you agree to our terms and conditions and privacy policy.'}
      </p>
    </form>
  );
}
}
}
}
}
}
}
}
