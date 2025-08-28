import React from 'react';

interface PracticeAreaSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: {
    name: string;
    url: string;
    telephone?: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
  areaServed?: string[];
  serviceType?: string;
  additionalType?: string;
  priceRange?: string;
}

export function PracticeAreaSchema({
  name,
  description,
  url,
  image,
  provider = {
    name: 'Vasquez Law Firm, PLLC',
    url: 'https://www.vasquezlawnc.com',
    telephone: '+1-855-929-6299',
    address: {
      streetAddress: '4801 E Independence Blvd Suite 714',
      addressLocality: 'Charlotte',
      addressRegion: 'NC',
      postalCode: '28212',
      addressCountry: 'US',
    },
  },
  areaServed = ['North Carolina', 'Florida'],
  serviceType = 'Legal Service',
  additionalType = 'Attorney',
  priceRange = '$$',
}: PracticeAreaSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    ...(image && { image }),
    serviceType,
    additionalType,
    provider: {
      '@type': 'LegalService',
      ...provider,
      ...(provider.address && {
        address: {
          '@type': 'PostalAddress',
          ...provider.address,
        },
      }),
    },
    areaServed: areaServed.map(area => ({
      '@type': 'State',
      name: area,
    })),
    priceRange,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free Initial Consultation',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
