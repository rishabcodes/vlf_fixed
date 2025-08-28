'use client';

import React, { useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

import { Send, Loader, CheckCircle, AlertCircle, Phone, Mail, User, FileText } from 'lucide-react';

interface ContactFormProps {
  service: string;
  city: string;
  language?: 'en' | 'es';
  onSubmitSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: 'phone' | 'email';
  urgency: 'immediate' | '24hours' | 'week' | 'consultation';
}

export default function ContactForm({
  service,
  city,
  language = 'en',
  onSubmitSuccess,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'phone',
    urgency: 'consultation',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Translations
  const t =
    language === 'es'
      ? {
          title: 'Cuéntanos sobre tu caso',
          subtitle: 'Responderemos en 15 minutos o menos',
          fields: {
            name: 'Nombre completo',
            email: 'Correo electrónico',
            phone: 'Teléfono',
            message: 'Describe tu situación',
            preferredContact: 'Método de contacto preferido',
            urgency: '¿Qué tan urgente es tu caso?',
          },
          placeholders: {
            name: 'Juan Pérez',
            email: 'juan@ejemplo.com',
            phone: '(555) 123-4567',
            message: 'Necesito ayuda con...',
          },
          options: {
            phone: 'Teléfono',
            email: 'Correo electrónico',
            immediate: 'Emergencia - Necesito ayuda ahora',
            '24hours': 'Urgente - En las próximas 24 horas',
            week: 'Esta semana',
            consultation: 'Solo quiero una consulta',
          },
          submit: 'Enviar mensaje',
          submitting: 'Enviando...',
          success: '¡Mensaje enviado! Te contactaremos pronto.',
          error: 'Error al enviar. Por favor intenta de nuevo.',
          validation: {
            name: 'Por favor ingresa tu nombre',
            email: 'Por favor ingresa un correo válido',
            phone: 'Por favor ingresa un teléfono válido',
            message: 'Por favor describe tu situación',
          },
        }
      : {
          title: 'Tell us about your case',
          subtitle: "We'll respond in 15 minutes or less",
          fields: {
            name: 'Full name',
            email: 'Email address',
            phone: 'Phone number',
            message: 'Describe your situation',
            preferredContact: 'Preferred contact method',
            urgency: 'How urgent is your case?',
          },
          placeholders: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '(555) 123-4567',
            message: 'I need help with...',
          },
          options: {
            phone: 'Phone',
            email: 'Email',
            immediate: 'Emergency - I need help now',
            '24hours': 'Urgent - Within 24 hours',
            week: 'This week',
            consultation: 'Just want a consultation',
          },
          submit: 'Send Message',
          submitting: 'Sending...',
          success: "Message sent! We'll contact you soon.",
          error: 'Error sending message. Please try again.',
          validation: {
            name: 'Please enter your name',
            email: 'Please enter a valid email',
            phone: 'Please enter a valid phone number',
            message: 'Please describe your situation',
          },
        };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.validation.name;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.email;
    }

    if (!formData.phone.trim() || !/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t.validation.phone;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = t.validation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare the data
      const submissionData = {
        ...formData,
        service,
        city,
        language,
        source: 'near-me-page',
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      };

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          service: service,
          city: city,
          urgency: formData.urgency,
        });
      }

      setSubmitStatus('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredContact: 'phone',
        urgency: 'consultation',
      });

      // Call success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      logger.error('Form submission error:', error);
      setSubmitStatus('error');

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
        }
};

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
        }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
        <p className="text-white/80">{t.subtitle}</p>
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-2">
          <User className="inline w-4 h-4 mr-1" />
          {t.fields.name}
        </label>
        <input
          type="text"
          value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder={t.placeholders.name} className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border ${
            errors.name ? 'border-red-400' : 'border-white/20'
          } focus:outline-none focus:border-white transition-colors`} disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-2">
          <Mail className="inline w-4 h-4 mr-1" />
          {t.fields.email}
        </label>
        <input
          type="email"
          value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder={t.placeholders.email} className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border ${
            errors.email ? 'border-red-400' : 'border-white/20'
          } focus:outline-none focus:border-white transition-colors`} disabled={isSubmitting}
        />
        {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium mb-2">
          <Phone className="inline w-4 h-4 mr-1" />
          {t.fields.phone}
        </label>
        <input
          type="tel"
          value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder={t.placeholders.phone} className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border ${
            errors.phone ? 'border-red-400' : 'border-white/20'
          } focus:outline-none focus:border-white transition-colors`} disabled={isSubmitting}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-300">{errors.phone}</p>}
      </div>

      {/* Urgency Field */}
      <div>
        <label className="block text-sm font-medium mb-2">{t.fields.urgency}</label>
        <select
          value={formData.urgency}
      onChange={e => handleChange('urgency', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:border-white transition-colors"
          disabled={isSubmitting}
        >
          <option value="immediate" className="text-gray-800">
            {t.options.immediate}
          </option>
          <option value="24hours" className="text-gray-800">
            {t.options['24hours']}
          </option>
          <option value="week" className="text-gray-800">
            {t.options.week}
          </option>
          <option value="consultation" className="text-gray-800">
            {t.options.consultation}
          </option>
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium mb-2">
          <FileText className="inline w-4 h-4 mr-1" />
          {t.fields.message}
        </label>
        <textarea
          value={formData.message} onChange={e => handleChange('message', e.target.value)} placeholder={t.placeholders.message}
          rows={4}

                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border ${
            errors.message ? 'border-red-400' : 'border-white/20'
          } focus:outline-none focus:border-white transition-colors resize-none`} disabled={isSubmitting}
        />
        {errors.message && <p className="mt-1 text-sm text-red-300">{errors.message}</p>}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium mb-2">{t.fields.preferredContact}</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="phone"
              checked={formData.preferredContact === 'phone'} onChange={e => handleChange('preferredContact', e.target.value)} className="mr-2"
              disabled={isSubmitting}
            />
            <Phone className="w-4 h-4 mr-1" />
            {t.options.phone}
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="email"
              checked={formData.preferredContact === 'email'} onChange={e => handleChange('preferredContact', e.target.value)} className="mr-2"
              disabled={isSubmitting}
            />
            <Mail className="w-4 h-4 mr-1" />
            {t.options.email}
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting} className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
          isSubmitting
            ? 'bg-white/50 cursor-not-allowed'
            : 'bg-white text-[#6B1F2E] hover:bg-gray-100'
        } flex items-center justify-center gap-2`}
      >
        {isSubmitting ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t.submit}
          </>
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div
className="bg-green-500/20 border border-green-400 text-green-100 px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          {t.success}
        </div>
      )}

      {submitStatus === 'error' && (
        <div
className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {t.error}
        </div>
      )}
    </form>
  );
}
