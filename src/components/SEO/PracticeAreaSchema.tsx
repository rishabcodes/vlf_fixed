'use client';

import Script from 'next/script';
import {
  generateEnhancedFAQSchema,
  generateEnhancedBreadcrumbSchema,
  generateServiceSchema,
  generateCollectionPageSchema,
} from '@/lib/seo/comprehensive-schema';

interface PracticeAreaSchemaProps {
  title: string;
  description: string;
  services: Array<{
    title: string;
    description: string;
    features?: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
  breadcrumbBase?: string;
  serviceType?: string;
}

export function PracticeAreaSchema({
  title,
  description,
  services,
  faqs,
  breadcrumbBase = 'practice-areas',
  serviceType,
}: PracticeAreaSchemaProps) {
  // Generate the practice area URL
  const practiceAreaSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  const practiceAreaUrl = `https://www.vasquezlawnc.com/${breadcrumbBase}/${practiceAreaSlug}`;

  // Build breadcrumb schema
  const breadcrumbSchema = generateEnhancedBreadcrumbSchema([
    {
      name: 'Home',
      url: 'https://www.vasquezlawnc.com',
    },
    {
      name: 'Practice Areas',
      url: 'https://www.vasquezlawnc.com/practice-areas',
    },
    {
      name: title,
      url: practiceAreaUrl,
    },
  ]);

  // Build FAQ schema
  const faqSchema = faqs && faqs.length > 0 ? generateEnhancedFAQSchema(faqs) : null;

  // Build service schema
  const serviceSchema = generateServiceSchema({
    name: title,
    description,
    provider: 'Vasquez Law Firm, PLLC',
    areaServed: ['North Carolina', 'Charlotte', 'Raleigh', 'Durham', 'Greensboro', 'Winston-Salem'],
    availableLanguages: ['English', 'Spanish'],
    priceRange: '$$',
    url: practiceAreaUrl,
    serviceType: serviceType || title,
    hasOfferCatalog: services.map(service => ({
      name: service.title,
      description: service.description,
    })),
  });

  // Build collection page schema for sub-services
  const collectionSchema =
    services && services.length > 0
      ? generateCollectionPageSchema({
          name: `${title} Services`,
          description: `Comprehensive ${title.toLowerCase()} legal services offered by Vasquez Law Firm`,
          url: practiceAreaUrl,
          items: services.map(service => ({
            name: service.title,
            url: `${practiceAreaUrl}#${service.title.toLowerCase().replace(/\s+/g, '-')}`,
            description: service.description,
          })),
        })
      : null;

  // Combine all schemas
  const schemas = [
    breadcrumbSchema,
    serviceSchema,
    ...(faqSchema ? [faqSchema] : []),
    ...(collectionSchema ? [collectionSchema] : []),
  ];

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };

  return (
    <Script
      id={`practice-area-schema-${practiceAreaSlug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
    />
  );
}
