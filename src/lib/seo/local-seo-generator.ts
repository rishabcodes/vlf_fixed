import { Metadata } from 'next';

export interface LocalPageData {
  city: string;
  county: string;
  state: string;
  stateAbbr: string;
  zip: string;
  population: string;
  courtInfo: {
    superior: string;
    district: string;
    federal?: string;
  };
  nearbyCity: string[];
  practiceAreaFocus: string[];
  localStats: {
    casesHandled: string;
    yearsServing: string;
    clientRating: string;
    responseTime: string;
  };
}

export const ncCities: Record<string, LocalPageData> = {
  charlotte: {
    city: 'Charlotte',
    county: 'Mecklenburg',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '28202',
    population: '897,720',
    courtInfo: {
      superior: '26th Judicial District Court',
      district: 'Mecklenburg County District Court',
      federal: 'Western District of North Carolina',
    },
    nearbyCity: ['Huntersville', 'Matthews', 'Mint Hill', 'Pineville', 'Cornelius', 'Davidson'],
    practiceAreaFocus: [
      'Immigration Law',
      'Personal Injury',
      'Workers Compensation',
      'Criminal Defense',
    ],
    localStats: {
      casesHandled: '2,500+',
      yearsServing: '20+',
      clientRating: '4.9',
      responseTime: '< 1 hour',
    },
  },
  raleigh: {
    city: 'Raleigh',
    county: 'Wake',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27601',
    population: '474,708',
    courtInfo: {
      superior: '10th Judicial District Court',
      district: 'Wake County District Court',
      federal: 'Eastern District of North Carolina',
    },
    nearbyCity: ['Cary', 'Apex', 'Holly Springs', 'Garner', 'Wake Forest', 'Morrisville'],
    practiceAreaFocus: ['Immigration Law', 'Criminal Defense', 'Personal Injury', 'Family Law'],
    localStats: {
      casesHandled: '3,000+',
      yearsServing: '25+',
      clientRating: '4.9',
      responseTime: '< 30 min',
    },
  },
  durham: {
    city: 'Durham',
    county: 'Durham',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27701',
    population: '283,506',
    courtInfo: {
      superior: '14th Judicial District Court',
      district: 'Durham County District Court',
      federal: 'Middle District of North Carolina',
    },
    nearbyCity: ['Chapel Hill', 'Hillsborough', 'Morrisville', 'Research Triangle Park'],
    practiceAreaFocus: [
      'Immigration Law',
      'Workers Compensation',
      'Criminal Defense',
      'Personal Injury',
    ],
    localStats: {
      casesHandled: '1,500+',
      yearsServing: '15+',
      clientRating: '4.8',
      responseTime: '< 45 min',
    },
  },
  greensboro: {
    city: 'Greensboro',
    county: 'Guilford',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27401',
    population: '299,035',
    courtInfo: {
      superior: '18th Judicial District Court',
      district: 'Guilford County District Court',
      federal: 'Middle District of North Carolina',
    },
    nearbyCity: ['High Point', 'Jamestown', 'Summerfield', 'Oak Ridge', 'Pleasant Garden'],
    practiceAreaFocus: [
      'Immigration Law',
      'Personal Injury',
      'Criminal Defense',
      'Traffic Violations',
    ],
    localStats: {
      casesHandled: '1,200+',
      yearsServing: '12+',
      clientRating: '4.8',
      responseTime: '< 1 hour',
    },
  },
  'winston-salem': {
    city: 'Winston-Salem',
    county: 'Forsyth',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27101',
    population: '249,545',
    courtInfo: {
      superior: '21st Judicial District Court',
      district: 'Forsyth County District Court',
      federal: 'Middle District of North Carolina',
    },
    nearbyCity: ['Kernersville', 'Clemmons', 'Lewisville', 'Pfafftown', 'Bethania'],
    practiceAreaFocus: ['Immigration Law', 'Workers Compensation', 'Personal Injury', 'Family Law'],
    localStats: {
      casesHandled: '1,000+',
      yearsServing: '10+',
      clientRating: '4.9',
      responseTime: '< 45 min',
    },
  },
  smithfield: {
    city: 'Smithfield',
    county: 'Johnston',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27577',
    population: '12,697',
    courtInfo: {
      superior: '11th Judicial District Court',
      district: 'Johnston County District Court',
      federal: 'Eastern District of North Carolina',
    },
    nearbyCity: ['Clayton', 'Selma', 'Four Oaks', 'Benson', 'Princeton', 'Pine Level'],
    practiceAreaFocus: [
      'Immigration Law',
      'Criminal Defense',
      'Personal Injury',
      'Workers Compensation',
    ],
    localStats: {
      casesHandled: '800+',
      yearsServing: '30+',
      clientRating: '5.0',
      responseTime: '< 15 min',
    },
  },
  clayton: {
    city: 'Clayton',
    county: 'Johnston',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27520',
    population: '26,307',
    courtInfo: {
      superior: '11th Judicial District Court',
      district: 'Johnston County District Court',
      federal: 'Eastern District of North Carolina',
    },
    nearbyCity: ['Smithfield', 'Garner', 'Archer Lodge', 'Willow Spring', 'Wendell'],
    practiceAreaFocus: ['Immigration Law', 'Personal Injury', 'Criminal Defense', 'Family Law'],
    localStats: {
      casesHandled: '600+',
      yearsServing: '20+',
      clientRating: '4.9',
      responseTime: '< 30 min',
    },
  },
  garner: {
    city: 'Garner',
    county: 'Wake',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27529',
    population: '31,159',
    courtInfo: {
      superior: '10th Judicial District Court',
      district: 'Wake County District Court',
      federal: 'Eastern District of North Carolina',
    },
    nearbyCity: ['Raleigh', 'Clayton', 'Fuquay-Varina', 'Holly Springs', 'Knightdale'],
    practiceAreaFocus: [
      'Immigration Law',
      'Workers Compensation',
      'Personal Injury',
      'Traffic Violations',
    ],
    localStats: {
      casesHandled: '500+',
      yearsServing: '15+',
      clientRating: '4.8',
      responseTime: '< 30 min',
    },
  },
  cary: {
    city: 'Cary',
    county: 'Wake',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27511',
    population: '174,721',
    courtInfo: {
      superior: '10th Judicial District Court',
      district: 'Wake County District Court',
      federal: 'Eastern District of North Carolina',
    },
    nearbyCity: ['Apex', 'Morrisville', 'Raleigh', 'Holly Springs', 'Chapel Hill'],
    practiceAreaFocus: ['Immigration Law', 'Personal Injury', 'Family Law', 'Criminal Defense'],
    localStats: {
      casesHandled: '1,000+',
      yearsServing: '18+',
      clientRating: '4.9',
      responseTime: '< 45 min',
    },
  },
  apex: {
    city: 'Apex',
    county: 'Wake',
    state: 'North Carolina',
    stateAbbr: 'NC',
    zip: '27502',
    population: '58,780',
    courtInfo: {
      superior: '10th Judicial District Court',
      district: 'Wake County District Court',
      federal: 'Eastern District of North Carolina',
    },
    nearbyCity: ['Cary', 'Holly Springs', 'Raleigh', 'Morrisville', 'New Hill'],
    practiceAreaFocus: ['Immigration Law', 'Personal Injury', 'Workers Compensation', 'Family Law'],
    localStats: {
      casesHandled: '400+',
      yearsServing: '12+',
      clientRating: '4.9',
      responseTime: '< 30 min',
    },
  },
};

export function generateLocalMetadata(city: string, practiceArea?: string): Metadata {
  const data = ncCities[city.toLowerCase()];
  if (!data) return {};

  const title = practiceArea
    ? `${practiceArea.replace(/'/g, "'")} Lawyer ${data.city} NC | Vasquez Law Firm - #1 Rated`
    : `${data.city} ${data.stateAbbr} Immigration Lawyer & Personal Injury Attorney | Vasquez Law Firm`;

  const description = practiceArea
    ? `Top-rated ${practiceArea.toLowerCase().replace(/'/g, "'")} lawyer serving ${data.city}, ${data.county} County, NC. ${data.localStats.casesHandled} cases won. Available 24/7. Free consultation. Se habla español. Call 1-844-YO-PELEO.`
    : `Experienced ${data.city} attorneys serving ${data.county} County. Immigration, personal injury, criminal defense, workers comp. ${data.localStats.casesHandled} cases won. Free consultation. Hablamos español.`;

  const keywords = practiceArea
    ? `${practiceArea.toLowerCase().replace(/'/g, "'")} lawyer ${data.city}, ${practiceArea.toLowerCase().replace(/'/g, "'")} attorney ${data.city} NC, ${data.city} ${practiceArea.toLowerCase().replace(/'/g, "'")} law firm, ${data.county} county ${practiceArea.toLowerCase().replace(/'/g, "'")} attorney, best ${practiceArea.toLowerCase().replace(/'/g, "'")} lawyer ${data.city}`
    : `${data.city} immigration lawyer, ${data.city} personal injury attorney, ${data.city} criminal defense lawyer, ${data.city} workers compensation attorney, ${data.city} abogado, ${data.county} county attorney`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [`/og-${data.city.toLowerCase()}.jpg`],
      locale: 'en_US',
      alternateLocale: 'es_ES',
    },
    alternates: {
      languages: {
        en: `/locations/nc/${city.toLowerCase()}${practiceArea ? `/${practiceArea.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
        es: `/es/locations/nc/${city.toLowerCase()}${practiceArea ? `/${practiceArea.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
      },
    },
  };
}

export function generateLocalBusinessSchema(city: string, practiceArea?: string) {
  const data = ncCities[city.toLowerCase()];
  if (!data) return {};

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `https://www.vasquezlawnc.com/locations/nc/${city.toLowerCase()}#business`,
    name: `Vasquez Law Firm - ${data.city} ${practiceArea ? practiceArea : 'Office'}`,
    image: `https://www.vasquezlawnc.com/images/${data.city.toLowerCase()}-office.jpg`,
    url: `https://www.vasquezlawnc.com/locations/nc/${city.toLowerCase()}`,
    telephone: '1-844-967-3536',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.city,
      addressRegion: data.stateAbbr,
      postalCode: data.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: getLatitude(data.city),
      longitude: getLongitude(data.city),
    },
    areaServed: [
      {
        '@type': 'City',
        name: data.city,
      },
      {
        '@type': 'AdministrativeArea',
        name: `${data.county} County`,
      },
      ...data.nearbyCity.map(city => ({
        '@type': 'City',
        name: city,
      })),
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: '24/7 Emergency Legal Services',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.localStats.clientRating,
      reviewCount: Math.floor(parseInt(data.localStats.casesHandled) * 0.3),
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: data.practiceAreaFocus.map(area => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: area,
          provider: {
            '@type': 'LegalService',
            name: 'Vasquez Law Firm, PLLC',
          },
        },
      })),
    },
    slogan: 'YO PELEO POR TI™ - I FIGHT FOR YOU',
    description: `Leading ${data.city} law firm specializing in ${data.practiceAreaFocus.join(', ')}. Serving ${data.county} County with ${data.localStats.yearsServing} years of experience. ${data.localStats.casesHandled} successful cases.`,
    parentOrganization: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      '@id': 'https://www.vasquezlawnc.com/#organization',
    },
  };

  if (practiceArea) {
    const extendedSchema = baseSchema as typeof baseSchema & { knowsAbout?: string[]; serviceType?: string };
    extendedSchema.knowsAbout = [practiceArea];
    extendedSchema.serviceType = practiceArea;
  }

  return baseSchema;
}

export function generateReviewSchema(city: string) {
  const reviews = [
    {
      author: 'Maria G.',
      rating: 5,
      text: `Mr. Vasquez helped me with my immigration case in ${city}. He explained everything clearly and got me my green card. Highly recommend!`,
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      author: 'James T.',
      rating: 5,
      text: `Best criminal defense lawyer in ${city}! Got my charges reduced and saved my job. Worth every penny.`,
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      author: 'Sarah L.',
      rating: 5,
      text: `After my car accident, Vasquez Law Firm handled everything. Got me a great settlement. Thank you!`,
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return reviews.map(review => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LegalService',
      name: `Vasquez Law Firm - ${city}`,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.text,
    datePublished: review.date,
  }));
}

function getLatitude(city: string): number {
  const coords: Record<string, number> = {
    Charlotte: 35.2271,
    Raleigh: 35.7796,
    Durham: 35.994,
    Greensboro: 36.0726,
    'Winston-Salem': 36.0999,
    Smithfield: 35.5085,
    Clayton: 35.6507,
    Garner: 35.7113,
    Cary: 35.7915,
    Apex: 35.7327,
  };
  return coords[city] || 35.7796;
}

function getLongitude(city: string): number {
  const coords: Record<string, number> = {
    Charlotte: -80.8431,
    Raleigh: -78.6382,
    Durham: -78.8986,
    Greensboro: -79.792,
    'Winston-Salem': -80.2442,
    Smithfield: -78.3394,
    Clayton: -78.4572,
    Garner: -78.6142,
    Cary: -78.7811,
    Apex: -78.8503,
  };
  return coords[city] || -78.6382;
}
