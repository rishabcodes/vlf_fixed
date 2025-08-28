import React from 'react';

interface AttorneySchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  alumniOf?: Array<{
    name: string;
    sameAs?: string;
  }>;
  knowsLanguage?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
}

export function AttorneySchema({
  name,
  jobTitle,
  description,
  image,
  url,
  telephone,
  email,
  address,
  alumniOf,
  knowsLanguage,
  worksFor = {
    name: 'Vasquez Law Firm, PLLC',
    url: 'https://www.vasquezlawnc.com',
  },
}: AttorneySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    image,
    url,
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    ...(alumniOf && {
      alumniOf: alumniOf.map(school => ({
        '@type': 'EducationalOrganization',
        ...school,
      })),
    }),
    ...(knowsLanguage && { knowsLanguage }),
    worksFor: {
      '@type': 'LegalService',
      ...worksFor,
    },
    '@graph': [
      {
        '@type': 'Attorney',
        name,
        url,
        areaServed: ['North Carolina', 'Florida'],
        priceRange: '$$',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
