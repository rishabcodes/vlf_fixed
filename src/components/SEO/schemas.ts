export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Vasquez Law Firm',
    alternateName: 'Vasquez Law Firm, PLLC',
    url: 'https://vasquezlawnc.com',
    logo: 'https://vasquezlawnc.com/logo.png',
    telephone: '+1-844-967-3536',
    email: 'leads@vasquezlawfirm.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4801 E Independence Blvd Suite 714',
      addressLocality: 'Charlotte',
      addressRegion: 'NC',
      postalCode: '28212',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/vasquezlawfirm',
      'https://www.linkedin.com/company/vasquez-law-firm',
      'https://www.youtube.com/@vasquezlawfirm',
    ],
    areaServed: ['North Carolina', 'South Carolina', 'Florida'],
    priceRange: '$$',
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessSchema(location: {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  lat?: number;
  lng?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: 'Vasquez Law Firm - ' + location.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
    },
    telephone: location.phone,
    geo:
      location.lat && location.lng
        ? {
            '@type': 'GeoCoordinates',
            latitude: location.lat,
            longitude: location.lng,
          }
        : undefined,
  };
}

export function generateAttorneySchema(attorney: {
  name: string;
  jobTitle: string;
  image?: string;
  telephone?: string;
  email?: string;
  education?: Array<{ name: string; degree: string }>;
  knowsAbout?: string[];
  memberOf?: string[];
  award?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: attorney.name,
    jobTitle: attorney.jobTitle,
    image: attorney.image,
    telephone: attorney.telephone,
    email: attorney.email,
    worksFor: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      url: 'https://vasquezlawnc.com',
      telephone: '+1-844-967-3536',
      priceRange: '$$',
    },
    alumniOf: attorney.education?.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.name,
    })),
    knowsAbout: attorney.knowsAbout,
    memberOf: attorney.memberOf?.map(org => ({
      '@type': 'Organization',
      name: org,
    })),
    award: attorney.award,
  };
}

export function generateAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Vasquez Law Firm',
    description:
      'Learn about Vasquez Law Firm, our experienced attorneys, and our commitment to providing accessible legal services in North Carolina and Florida.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://vasquezlawnc.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About Us',
          item: 'https://vasquezlawnc.com/about',
        },
      ],
    },
    mainEntity: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      slogan: 'YO PELEO POR TI™ - I FIGHT FOR YOU',
      foundingDate: '1989',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: 20,
      },
      areaServed: ['North Carolina', 'Florida'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Legal Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Immigration Law' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Personal Injury' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Criminal Defense' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workers Compensation' } },
        ],
      },
    },
  };
}
