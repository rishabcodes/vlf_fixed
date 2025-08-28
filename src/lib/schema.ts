export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Vasquez Law Firm, PLLC',
  alternateName: 'VLF',
  url: 'https://www.vasquezlawnc.com',
  logo: 'https://www.vasquezlawnc.com/images/logo-vasquez.png',
  image: 'https://www.vasquezlawnc.com/images/office-main.jpg',
  telephone: '+1-844-967-3536',
  email: 'leads@vasquezlawfirm.com',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '4426 Louisburg Road',
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
      postalCode: '27616',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Charlotte',
      addressRegion: 'NC',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Smithfield',
      addressRegion: 'NC',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Orlando',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.8486,
    longitude: -78.5755,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:30',
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '287',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    {
      '@type': 'State',
      name: 'North Carolina',
    },
    {
      '@type': 'State',
      name: 'Florida',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Legal Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Immigration Law',
          description: 'Green cards, visas, citizenship, deportation defense',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Personal Injury',
          description: 'Car accidents, slip and fall, medical malpractice',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Criminal Defense',
          description: 'DWI, drug charges, assault, theft defense',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Workers Compensation',
          description: 'Workplace injuries and disability benefits',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Family Law',
          description: 'Divorce, custody, child support, adoption',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Traffic Violations',
          description: 'Speeding tickets, license restoration',
        },
      },
    ],
  },
  sameAs: [
    'https://www.facebook.com/vasquezlawfirm',
    'https://twitter.com/vasquezlaw',
    'https://www.linkedin.com/company/vasquez-law-firm',
    'https://www.youtube.com/@vasquezlawfirm',
    'https://www.instagram.com/vasquezlawfirm',
    'https://www.tiktok.com/@vasquezlawfirm',
  ],
};

export const attorneySchema = (attorney: {
  name: string;
  title: string;
  image: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Attorney',
  name: attorney.name,
  jobTitle: attorney.title,
  image: attorney.image,
  url: attorney.url,
  worksFor: {
    '@type': 'LegalService',
    name: 'Vasquez Law Firm, PLLC',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4426 Louisburg Road',
    addressLocality: 'Raleigh',
    addressRegion: 'NC',
    postalCode: '27616',
    addressCountry: 'US',
  },
  telephone: '+1-844-967-3536',
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
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
});

export const localBusinessSchema = (location: {
  name: string;
  address: string;
  city: string;
  state: string;
  zip?: string;
  phone: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `https://www.vasquezlawnc.com/#${location.city.toLowerCase()}`,
  name: `Vasquez Law Firm - ${location.name} Office`,
  image: `https://www.vasquezlawnc.com/images/office-${location.city.toLowerCase()}.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: location.address,
    addressLocality: location.city,
    addressRegion: location.state,
    postalCode: location.zip,
    addressCountry: 'US',
  },
  telephone: location.phone,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:30',
  },
  parentOrganization: {
    '@type': 'LegalService',
    name: 'Vasquez Law Firm, PLLC',
    '@id': 'https://www.vasquezlawnc.com/#organization',
  },
});

export const reviewSchema = (review: {
  author: string;
  rating: number;
  text: string;
  date: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  author: {
    '@type': 'Person',
    name: review.author,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating,
    bestRating: '5',
    worstRating: '1',
  },
  reviewBody: review.text,
  datePublished: review.date,
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
