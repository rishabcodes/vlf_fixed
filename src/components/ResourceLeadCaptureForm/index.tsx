'use client';

import React, { useState } from 'react';

import { Check, AlertCircle, Loader2, Download, Mail, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ResourceLeadCaptureFormProps {
  resourceId: string;
  resourceTitle: string;
  resourceUrl?: string; // URL to download/access resource
  resourceType?: 'download' | 'email' | 'redirect'; // How to deliver resource
  practiceArea?: string;
  language?: 'en' | 'es';
  onSuccess?: (data: { email: string; resourceDelivered: boolean }) => void;
  className?: string;
  customThankYouMessage?: string;
}

export default function ResourceLeadCaptureForm({
  resourceId,
  resourceTitle,
  resourceUrl,
  resourceType = 'download',
  practiceArea: defaultPracticeArea,
  language = 'en',
  onSuccess,
  className = '',
  customThankYouMessage,
}: ResourceLeadCaptureFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    privacyConsent: false,
    marketingConsent: false,
    practiceArea: defaultPracticeArea || '',
    language,
  });

  const translations = {
    en: {
      title: 'Get Your Free Resource',
      subtitle: `Download "${resourceTitle}"`,
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number (Optional)',
      zipCode: 'ZIP Code',
      privacyLabel: 'I agree to the Privacy Policy and Terms of Service',
      marketingLabel: 'I agree to receive marketing communications (optional)',
      submit: 'Get My Free Resource',
      submitting: 'Processing...',
      successTitle: 'Success! Check Your Email',
      successMessage:
        customThankYouMessage ||
        `We've sent "${resourceTitle}" to your email address. Please check your inbox.`,
      successDownload: 'Download Resource Now',
      errorMessage: 'Something went wrong. Please try again.',
      validation: {
        nameRequired: 'Please enter your name',
        emailRequired: 'Please enter your email address',
        emailInvalid: 'Please enter a valid email address',
        zipRequired: 'Please enter your ZIP code',
        zipInvalid: 'Please enter a valid ZIP code',
        privacyRequired: 'You must agree to the privacy policy to continue',
      },
    },
    es: {
      title: 'Obtenga Su Recurso Gratuito',
      subtitle: `Descargue "${resourceTitle}"`,
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Teléfono (Opcional)',
      zipCode: 'Código Postal',
      privacyLabel: 'Acepto la Política de Privacidad y los Términos de Servicio',
      marketingLabel: 'Acepto recibir comunicaciones de marketing (opcional)',
      submit: 'Obtener Mi Recurso Gratuito',
      submitting: 'Procesando...',
      successTitle: '¡Éxito! Revise Su Correo',
      successMessage:
        customThankYouMessage ||
        `Hemos enviado "${resourceTitle}" a su correo electrónico. Por favor revise su bandeja de entrada.`,
      successDownload: 'Descargar Recurso Ahora',
      errorMessage: 'Algo salió mal. Por favor intente de nuevo.',
      validation: {
        nameRequired: 'Por favor ingrese su nombre',
        emailRequired: 'Por favor ingrese su correo electrónico',
        emailInvalid: 'Por favor ingrese un correo electrónico válido',
        zipRequired: 'Por favor ingrese su código postal',
        zipInvalid: 'Por favor ingrese un código postal válido',
        privacyRequired: 'Debe aceptar la política de privacidad para continuar',
      },
    },
  };

  const t = translations[language];

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // US ZIP code validation (5 digits or 5+4 format)
  const zipRegex = /^\d{5}(-\d{4})?$/;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = t.validation.nameRequired;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = t.validation.emailRequired;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t.validation.emailInvalid;
    }

    // ZIP code validation
    if (!formData.zipCode.trim()) {
      errors.zipCode = t.validation.zipRequired;
    } else if (!zipRegex.test(formData.zipCode)) {
      errors.zipCode = t.validation.zipInvalid;
    }

    // Privacy consent validation
    if (!formData.privacyConsent) {
      errors.privacyConsent = t.validation.privacyRequired;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError('');
    setValidationErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Submit to API
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name.split(' ')[0] || formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone || 'not-provided',
          practiceArea: formData.practiceArea || 'general',
          formId: `resource-${resourceId}`,
          pageUrl: window.location.href,
          source: 'resource-download',
          language: formData.language,
          message: `Downloaded resource: ${resourceTitle}`,
          metadata: {
            resourceId,
            resourceTitle,
            zipCode: formData.zipCode,
            privacyConsent: formData.privacyConsent,
            marketingConsent: formData.marketingConsent,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.errorMessage);
      }

      setSuccess(true);

      // Track conversion
      if (
        typeof window !== 'undefined' &&
        window.gtag
      ) {
        window.gtag(
          'event',
          'generate_lead',
          {
            currency: 'USD',
            value: 50, // Resource download value
            lead_source: 'resource_download',
            resource_id: resourceId,
          }
        );
      }

      // Deliver resource based on type
      if (resourceType === 'download' && resourceUrl) {
        // Trigger download
        const link = document.createElement('a');
        link.href = resourceUrl;
        link.download = resourceTitle;
        link.click();
      } else if (resourceType === 'redirect' && resourceUrl) {
        // Check if URL is internal or external
        const isInternalUrl =
          resourceUrl.startsWith('/') || resourceUrl.includes(window.location.origin);

        setTimeout(() => {
          if (isInternalUrl) {
            // Use Next.js router for internal URLs
            router.push(resourceUrl);
          } else {
            // Use window.location for external URLs
            window.location.href = resourceUrl;
          }
        }, 2000);
      }
      // For 'email' type, the backend should handle sending the resource

      // Call success callback
      if (onSuccess) {
        onSuccess({
          email: formData.email,
          resourceDelivered: true,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
className={`bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-xl text-center ${className}`}
      >
        <div
className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Check className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t.successTitle}</h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6">{t.successMessage}</p>

        {resourceType === 'download' && resourceUrl && (
          <a
            href={resourceUrl}
            download={resourceTitle}
            className="inline-flex items-center gap-2 bg-[#6B1F2E] hover:bg-[#8B2635] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            {t.successDownload}
          </a>
        )}

        <div
className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <Mail className="w-4 h-4" />
          <span>
            {language === 'es'
              ? 'Revise su correo para más detalles'
              : 'Check your email for more details'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t.subtitle}</p>
      </div>

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.name} *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors ${
            validationErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          aria-invalid={!!validationErrors.name}
          aria-describedby={validationErrors.name ? 'name-error' : undefined}
        />
        {validationErrors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {validationErrors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
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
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors ${
            validationErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          aria-invalid={!!validationErrors.email}
          aria-describedby={validationErrors.email ? 'email-error' : undefined}
        />
        {validationErrors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {validationErrors.email}
          </p>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.phone}
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
          placeholder={language === 'es' ? '(919) 555-0123' : '(919) 555-0123'}
        />
      </div>

      {/* ZIP Code Field */}
      <div>
        <label
          htmlFor="zipCode"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.zipCode} *
        </label>
        <input
          type="text"
          id="zipCode"
          value={formData.zipCode}
          onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors ${
            validationErrors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="27601"
          maxLength={10}
          aria-invalid={!!validationErrors.zipCode}
          aria-describedby={validationErrors.zipCode ? 'zip-error' : undefined}
        />
        {validationErrors.zipCode && (
          <p id="zip-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {validationErrors.zipCode}
          </p>
        )}
      </div>

      {/* Privacy Consent */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacyConsent"
            checked={formData.privacyConsent}
            onChange={e => setFormData({ ...formData, privacyConsent: e.target.checked })}
            className={`mt-1 w-4 h-4 text-[#6B1F2E] border-gray-300 rounded focus:ring-[#6B1F2E] ${
              validationErrors.privacyConsent ? 'border-red-500' : ''
            }`}
            aria-invalid={!!validationErrors.privacyConsent}
            aria-describedby={validationErrors.privacyConsent ? 'privacy-error' : undefined}
          />
          <label htmlFor="privacyConsent" className="text-sm text-gray-600 dark:text-gray-300">
            {t.privacyLabel} *
          </label>
        </div>
        {validationErrors.privacyConsent && (
          <p id="privacy-error" className="text-sm text-red-600 dark:text-red-400 ml-7">
            {validationErrors.privacyConsent}
          </p>
        )}

        {/* Marketing Consent (Optional) */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="marketingConsent"
            checked={formData.marketingConsent}
            onChange={e => setFormData({ ...formData, marketingConsent: e.target.checked })}
            className="mt-1 w-4 h-4 text-[#6B1F2E] border-gray-300 rounded focus:ring-[#6B1F2E]"
          />
          <label htmlFor="marketingConsent" className="text-sm text-gray-600 dark:text-gray-300">
            {t.marketingLabel}
          </label>
        </div>
      </div>

      {/* Error Message */}
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] hover:from-[#8B2635] hover:to-[#A02E3F] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            {t.submit}
          </>
        )}
      </button>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Shield className="w-4 h-4" />
        <span>
          {language === 'es'
            ? 'Sus datos están seguros y protegidos'
            : 'Your information is secure and protected'}
        </span>
      </div>
    </form>
  );
}
