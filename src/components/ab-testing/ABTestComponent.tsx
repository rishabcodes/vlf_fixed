'use client';

import React from 'react';
import { useABTest, useABTestContent } from './ABTestProvider';
import type { FormSubmitHandler } from '@/types/forms';

// Example A/B test component for hero section
interface HeroSectionProps {
  className?: string;
}

export function ABTestHeroSection({ className = '' }: HeroSectionProps) {
  const defaultContent = {
    headline: 'Expert Legal Representation in North Carolina',
    subheadline: 'Get the justice you deserve with our experienced team of attorneys',
    ctaText: 'Free Consultation',
    ctaSecondary: 'Learn More',
    backgroundImage: '/images/hero-default.jpg',
    highlightText: '25+ Years Experience',
  };

  const { content, variant, trackEvent } = useABTestContent('hero-cta-test', defaultContent);

  const handleCTAClick = () => {
    trackEvent('cta_click', 1, { buttonType: 'primary', variant });
  };

  const handleSecondaryClick = () => {
    trackEvent('cta_secondary_click', 1, { buttonType: 'secondary', variant });
  };

  return (
    <section className={`relative bg-gray-900 text-white py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">{content.headline}</h1>
          <p className="text-xl mb-8 text-gray-300">{content.subheadline}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleCTAClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {content.ctaText}
            </button>
            <button
              onClick={handleSecondaryClick} className="border border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {content.ctaSecondary}
            </button>
          </div>

          <div className="text-sm text-gray-400">{content.highlightText}</div>
        </div>
      </div>
    </section>
  );
}

// Example A/B test component for pricing section
interface PricingSectionProps {
  className?: string;
}

export function ABTestPricingSection({ className = '' }: PricingSectionProps) {
  const defaultContent = {
    title: 'Transparent Legal Fees',
    subtitle: 'No hidden costs, clear pricing for all services',
    consultationPrice: 'Free',
    consultationNote: 'Initial consultation at no cost',
    ctaText: 'Schedule Consultation',
    features: [
      'No upfront fees',
      'Payment plans available',
      'Contingency options',
      'Clear cost estimates',
    ],
  };

  const { content, trackEvent } = useABTestContent('pricing-cta-test', defaultContent);

  const handleConsultationClick = () => {
    trackEvent('consultation_request', 1, { section: 'pricing' });
  };

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          <p className="text-gray-600 text-lg">{content.subtitle}</p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{content.consultationPrice}</div>
            <p className="text-gray-600">{content.consultationNote}</p>
          </div>

          <ul className="space-y-3 mb-8">
            {(content.features as string[]).map((feature, index) => (
              <li key={index}

                className="flex items-center">
                <span
                className="text-green-500 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={handleConsultationClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {content.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}

// Example A/B test component for contact form
interface ContactFormProps {
  className?: string;
}

export function ABTestContactForm({ className = '' }: ContactFormProps) {
  const defaultContent = {
    title: 'Get Help Today',
    subtitle: 'Speak with an experienced attorney',
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    phoneLabel: 'Phone Number',
    messageLabel: 'How can we help?',
    submitText: 'Send Message',
    privacyText: 'Your information is confidential and secure',
    urgencyText: '',
    incentiveText: '',
  };

  const { content, trackEvent } = useABTestContent('contact-form-test', defaultContent);

  const handleSubmit: FormSubmitHandler = e => {
    e.preventDefault();
    trackEvent('form_submit', 1, { formType: 'contact' });
    // Handle form submission
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
            <p className="text-gray-600 text-lg">{content.subtitle}</p>
            {content.urgencyText && (
              <p className="text-red-600 font-semibold mt-2">{content.urgencyText}</p>
            )}
            {content.incentiveText && (
              <p className="text-green-600 font-semibold mt-2">{content.incentiveText}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.phoneLabel}
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.emailLabel}
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.messageLabel}
              </label>
              <textarea
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {content.submitText}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">{content.privacyText}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

// Generic A/B test wrapper component
interface ABTestWrapperProps {
  testId: string;
  variants: Record<string, React.ComponentType<Record<string, unknown>>>;
  defaultVariant: string;
  componentProps?: Record<string, unknown>;
  trackingEvents?: Record<string, string>;
}

export function ABTestWrapper({
  testId,
  variants,
  defaultVariant,
  componentProps = {},
  trackingEvents = {},
}: ABTestWrapperProps) {
  const { variant, isLoading, trackEvent } = useABTest(testId);

  if (isLoading) {
    // Show default variant while loading
    const DefaultComponent = variants[defaultVariant];
    if (!DefaultComponent) return null;
    return <DefaultComponent {...componentProps} />;
  }

  const selectedVariant = variant || defaultVariant;
  const SelectedComponent = variants[selectedVariant];

  if (!SelectedComponent) {
    const DefaultComponent = variants[defaultVariant];
    if (!DefaultComponent) return null;
    return <DefaultComponent {...componentProps} />;
  }

  // Add tracking to component props
  const enhancedProps = {
    ...componentProps,
    abTestVariant: selectedVariant,
    abTrackEvent: trackEvent,
    abTrackingEvents: trackingEvents,
  };

  return <SelectedComponent {...enhancedProps} />;
}
