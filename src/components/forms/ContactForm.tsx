'use client';

import React, { useState } from 'react';
import { logger } from '@/lib/safe-logger';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Mail, Phone, User, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactFormSchema, ContactFormData } from '@/lib/validations/forms';
import { FormField } from './FormField';
import { FormSubmitButton } from './FormSubmitButton';
import { HoneypotField } from './HoneypotField';

interface ContactFormProps {
  language?: 'en' | 'es';
  onSuccess?: () => void;
  source?: string;
  className?: string;
}

export function ContactForm({ language = 'en', onSuccess }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      caseType: '',
      message: '',
      preferredContact: 'phone',
      location: '',
      language,
      website: '', // Honeypot
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const content = {
    en: {
      title: 'Send Us a Message',
      subtitle: "We'll respond within 1 business hour",
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      caseType: 'Case Type',
      selectCase: 'Select your case type',
      message: 'Tell us about your case',
      preferredContact: 'Preferred Contact Method',
      location: 'Nearest Office',
      selectLocation: 'Select preferred location',
      submit: 'Send Message',
      submitting: 'Sending...',
      success: 'Message sent successfully!',
      successMessage: "Thank you for contacting us. We'll be in touch soon.",
      error: 'Failed to send message',
      errorMessage: 'Please try again or call us directly.',
    },
    es: {
      title: 'Envíanos un Mensaje',
      subtitle: 'Responderemos dentro de 1 hora hábil',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      caseType: 'Tipo de Caso',
      selectCase: 'Seleccione su tipo de caso',
      message: 'Cuéntenos sobre su caso',
      preferredContact: 'Método de Contacto Preferido',
      location: 'Oficina Más Cercana',
      selectLocation: 'Seleccione ubicación preferida',
      submit: 'Enviar Mensaje',
      submitting: 'Enviando...',
      success: '¡Mensaje enviado con éxito!',
      successMessage: 'Gracias por contactarnos. Nos pondremos en contacto pronto.',
      error: 'Error al enviar mensaje',
      errorMessage: 'Por favor intente de nuevo o llámenos directamente.',
    },
  };

  const t = content[language];

  const caseTypes =
    language === 'es'
      ? [
          { value: 'immigration', label: 'Inmigración' },
          { value: 'personal_injury', label: 'Lesiones Personales' },
          { value: 'workers_compensation', label: 'Compensación Laboral' },
          { value: 'criminal_defense', label: 'Defensa Criminal' },
          { value: 'family_law', label: 'Derecho Familiar' },
          { value: 'traffic', label: 'Infracciones de Tráfico' },
        ]
      : [
          { value: 'immigration', label: 'Immigration' },
          { value: 'personal_injury', label: 'Personal Injury' },
          { value: 'workers_compensation', label: "Workers' Compensation" },
          { value: 'criminal_defense', label: 'Criminal Defense' },
          { value: 'family_law', label: 'Family Law' },
          { value: 'traffic', label: 'Traffic Violations' },
        ];

  const locations = [
    { value: 'smithfield', label: 'Smithfield, NC' },
    { value: 'raleigh', label: 'Raleigh, NC' },
    { value: 'charlotte', label: 'Charlotte, NC' },
    { value: 'orlando', label: 'Orlando, FL' },
  ];

  const contactMethods =
    language === 'es'
      ? [
          { value: 'email', label: 'Correo Electrónico' },
          { value: 'phone', label: 'Llamada Telefónica' },
          { value: 'text', label: 'Mensaje de Texto' },
        ]
      : [
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone Call' },
          { value: 'text', label: 'Text Message' },
        ];

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot
    if (data.website) {
      logger.warn('Honeypot triggered');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      await response.json();

      // Show success state
      setIsSubmitted(true);
      toast.success(t.success);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Reset form after a delay
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
      }, 5000);

      // Track form submission
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          form_type: 'contact',
          case_type: data.caseType,
        });
      }
    } catch (error) {
      logger.error('Form submission error:', error);
      toast.error(t.error);
        }
};

  if (isSubmitted) {
    return (
      <div
className="bg-white rounded-lg shadow-xl p-8 text-center"
      >
        <div
className="mb-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.success}</h3>
        <p className="text-gray-600">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
      <p className="text-gray-600 mb-6">{t.subtitle}</p>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <HoneypotField />

          <FormField
            name="name"
            label={t.name}
            type="text"
            required
            icon={<User className="w-5 h-5" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="email"
              label={t.email}
              type="email"
              required
              icon={<Mail className="w-5 h-5" />}
            />

            <FormField
              name="phone"
              label={t.phone}
              type="tel"
              required
              placeholder="(123) 456-7890"
              icon={<Phone className="w-5 h-5" />}
            />
          </div>

          <FormField
            name="caseType"
            label={t.caseType}
            type="select"
            required
            placeholder={t.selectCase}
            options={caseTypes}
          />

          <FormField
            name="location"
            label={t.location}
            type="select"
            placeholder={t.selectLocation}
            options={locations}
            icon={<MapPin className="w-5 h-5" />}
          />

          <FormField
            name="message"
            label={t.message}
            type="textarea"
            required
            rows={4}
            icon={<MessageSquare className="w-5 h-5" />}
          />

          <FormField
            name="preferredContact"
            label={t.preferredContact}
            type="radio"
            options={contactMethods}
          />

          <FormSubmitButton
            isSubmitting={isSubmitting}
            text={t.submit}
            loadingText={t.submitting}
          />

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our{' '}
            <a href="/privacy-policy" className="text-[#C9974D] hover:underline">
              Privacy Policy
            </a>{' '}
            and consent to receive communications from Vasquez Law Firm.
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
