// Enhanced Schema.org implementations for comprehensive SEO

export function generateEnhancedOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': 'https://www.vasquezlawnc.com/#organization',
        name: 'Vasquez Law Firm, PLLC',
        alternateName: ['VLF', 'Vasquez Law', 'YO PELEO POR TI™ Law Firm'],
        legalName: 'Vasquez Law Firm, PLLC',
        description:
          'Full-service immigration and personal injury law firm serving North Carolina and Florida. Over 30,000 cases won. Available 24/7 with bilingual services.',
        url: 'https://www.vasquezlawnc.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.vasquezlawnc.com/images/logo.png',
          width: 600,
          height: 200,
          caption: 'Vasquez Law Firm Logo',
        },
        image: [
          'https://www.vasquezlawnc.com/images/BANNER_TRANS.PNG',
          'https://www.vasquezlawnc.com/images/office-charlotte.jpg',
          'https://www.vasquezlawnc.com/images/office-raleigh.jpg',
          'https://www.vasquezlawnc.com/images/office-smithfield.jpg',
        ],
        telephone: '+1-844-967-3536',
        email: 'leads@vasquezlawfirm.com',
        slogan: 'YO PELEO POR TI™ - I FIGHT FOR YOU',
        foundingDate: '1989',
        founder: {
          '@type': 'Person',
          name: 'William Vasquez',
          jobTitle: 'Founding Attorney',
        },
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          minValue: 20,
          maxValue: 50,
        },
        address: [
          {
            '@type': 'PostalAddress',
            '@id': 'https://www.vasquezlawnc.com/#address-smithfield',
            streetAddress: '612 S Brightleaf Blvd',
            addressLocality: 'Smithfield',
            addressRegion: 'NC',
            postalCode: '27577',
            addressCountry: 'US',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.5085,
              longitude: -78.3394,
            },
          },
          {
            '@type': 'PostalAddress',
            '@id': 'https://www.vasquezlawnc.com/#address-raleigh',
            streetAddress: '4426 Louisburg Road',
            addressLocality: 'Raleigh',
            addressRegion: 'NC',
            postalCode: '27616',
            addressCountry: 'US',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.8486,
              longitude: -78.5755,
            },
          },
          {
            '@type': 'PostalAddress',
            '@id': 'https://www.vasquezlawnc.com/#address-charlotte',
            addressLocality: 'Charlotte',
            addressRegion: 'NC',
            addressCountry: 'US',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.2271,
              longitude: -80.8431,
            },
          },
        ],
        areaServed: [
          {
            '@type': 'State',
            name: 'North Carolina',
            '@id': 'https://www.wikidata.org/wiki/Q1454',
          },
          {
            '@type': 'State',
            name: 'Florida',
            '@id': 'https://www.wikidata.org/wiki/Q812',
          },
        ],
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 35.7796,
            longitude: -78.6382,
          },
          geoRadius: '300 miles',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Legal Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Immigration Law',
                description:
                  'Comprehensive immigration services including green cards, citizenship, visas, deportation defense, and asylum applications.',
                provider: {
                  '@id': 'https://www.vasquezlawnc.com/#organization',
                },
                areaServed: {
                  '@type': 'Country',
                  name: 'United States',
                },
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Immigration Services',
                  itemListElement: [
                    { '@type': 'Service', name: 'Green Card Applications' },
                    { '@type': 'Service', name: 'Citizenship & Naturalization' },
                    { '@type': 'Service', name: 'Work Visas (H-1B, L-1, etc.)' },
                    { '@type': 'Service', name: 'Family-Based Immigration' },
                    { '@type': 'Service', name: 'Deportation Defense' },
                    { '@type': 'Service', name: 'Asylum & Refugee Cases' },
                    { '@type': 'Service', name: 'DACA Applications' },
                    { '@type': 'Service', name: 'U-Visa & VAWA Cases' },
                  ],
                },
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Personal Injury',
                description:
                  'Aggressive representation for accident victims including car accidents, truck accidents, slip and falls, and wrongful death cases.',
                provider: {
                  '@id': 'https://www.vasquezlawnc.com/#organization',
                },
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Criminal Defense',
                description:
                  '24/7 criminal defense services for DWI, drug charges, assault, theft, and all criminal matters in NC courts.',
                provider: {
                  '@id': 'https://www.vasquezlawnc.com/#organization',
                },
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Workers Compensation',
                description:
                  'Fighting for injured workers to get medical care, lost wages, and disability benefits they deserve.',
                provider: {
                  '@id': 'https://www.vasquezlawnc.com/#organization',
                },
              },
            },
          ],
        },
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
            description: '24/7 Emergency Legal Services Available',
          },
        ],
        potentialAction: [
          {
            '@type': 'CallAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'tel:+18449673536',
              inLanguage: ['en-US', 'es-US'],
              actionPlatform: [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/IOSPlatform',
                'http://schema.org/AndroidPlatform',
              ],
            },
            result: {
              '@type': 'Reservation',
              name: 'Legal Consultation',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '523',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: 'Maria Gonzalez',
            },
            reviewBody:
              'Mr. Vasquez helped me get my green card. Excellent service, always available to answer questions. Highly recommend!',
            datePublished: '2024-01-15',
          },
        ],
        sameAs: [
          'https://www.facebook.com/vasquezlawfirm',
          'https://twitter.com/vasquezlawnc',
          'https://www.linkedin.com/company/vasquez-law-firm',
          'https://www.youtube.com/@vasquezlawfirm',
          'https://www.instagram.com/vasquezlawfirm',
          'https://www.tiktok.com/@vasquezlawfirm',
          'https://www.avvo.com/attorneys/vasquez',
          'https://www.martindale.com/vasquez-law-firm',
        ],
        memberOf: [
          {
            '@type': 'Organization',
            name: 'American Immigration Lawyers Association',
          },
          {
            '@type': 'Organization',
            name: 'North Carolina State Bar',
          },
          {
            '@type': 'Organization',
            name: 'North Carolina Advocates for Justice',
          },
        ],
        award: [
          'Super Lawyers 2023',
          'Avvo Clients Choice Award 2023',
          'Top 100 Trial Lawyers 2023',
        ],
        knowsLanguage: ['en-US', 'es-US', 'es-MX'],
        paymentAccepted: [
          'Cash',
          'Check',
          'Credit Card',
          'PayPal',
          'Zelle',
          'Payment Plans Available',
        ],
        priceRange: '$$',
        hasMap: 'https://www.vasquezlawnc.com/contact',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.vasquezlawnc.com/#website',
        url: 'https://www.vasquezlawnc.com',
        name: 'Vasquez Law Firm',
        description: 'North Carolina Immigration Lawyers & Personal Injury Attorneys',
        publisher: {
          '@id': 'https://www.vasquezlawnc.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.vasquezlawnc.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en-US', 'es-US'],
      },
    ],
  };
}

export function generateEnhancedLocalBusinessSchema(location: {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  fax?: string;
  lat?: number;
  lng?: number;
  hours?: string;
  slug?: string;
}) {
  const baseUrl = 'https://www.vasquezlawnc.com';
  return {
    '@context': 'https://schema.org',
    '@type': ['Attorney', 'LocalBusiness'],
    '@id': `${baseUrl}/contact/${location.slug}#location`,
    name: `Vasquez Law Firm - ${location.city}`,
    alternateName: location.name,
    url: `${baseUrl}/contact/${location.slug}`,
    image: [
      `${baseUrl}/images/office-${location.city.toLowerCase()}.jpg`,
      `${baseUrl}/images/BANNER_TRANS.PNG`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: 'US',
    },
    geo:
      location.lat && location.lng
        ? {
            '@type': 'GeoCoordinates',
            latitude: location.lat,
            longitude: location.lng,
          }
        : undefined,
    telephone: location.phone,
    faxNumber: location.fax,
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'PayPal'],
    areaServed: {
      '@type': 'City',
      name: location.city,
      containedInPlace: {
        '@type': 'State',
        name: location.state,
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Immigration Law Consultation' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Personal Injury Representation' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Criminal Defense Services' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Workers Compensation Claims' },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '487',
    },
    parentOrganization: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
    },
  };
}

export function generateEnhancedAttorneySchema(attorney: {
  name: string;
  jobTitle: string;
  slug?: string;
  image?: string;
  telephone?: string;
  email?: string;
  education?: Array<{ name: string; degree: string; year?: string }>;
  knowsAbout?: string[];
  memberOf?: string[];
  award?: string[];
  yearsExperience?: number;
  languages?: string[];
  barAdmissions?: string[];
}) {
  const baseUrl = 'https://www.vasquezlawnc.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/attorneys/${attorney.slug}#attorney`,
    name: attorney.name,
    url: `${baseUrl}/attorneys/${attorney.slug}`,
    jobTitle: attorney.jobTitle,
    image: attorney.image || `${baseUrl}/images/attorneys/${attorney.slug}.jpg`,
    telephone: attorney.telephone,
    email: attorney.email,
    worksFor: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
      url: 'https://www.vasquezlawnc.com',
      telephone: '+1-844-967-3536',
      priceRange: '$$',
    },
    alumniOf: attorney.education?.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.name,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: edu.degree,
        dateCreated: edu.year,
      },
    })),
    knowsAbout: attorney.knowsAbout || [
      'Immigration Law',
      'Personal Injury Law',
      'Criminal Defense',
      'Workers Compensation',
      'Legal Consultation',
      'Court Representation',
    ],
    knowsLanguage: attorney.languages?.map(lang => ({
      '@type': 'Language',
      name: lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : lang,
    })) || [
      { '@type': 'Language', name: 'English' },
      { '@type': 'Language', name: 'Spanish' },
    ],
    memberOf: attorney.memberOf?.map(org => ({
      '@type': 'Organization',
      name: org,
    })),
    hasOccupation: {
      '@type': 'Occupation',
      name: attorney.jobTitle,
      experienceRequirements: attorney.yearsExperience
        ? `${attorney.yearsExperience} years`
        : undefined,
      occupationalCategory: '23-1011.00',
    },
    hasCredential: attorney.barAdmissions?.map(bar => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Bar Admission',
      competencyRequired: bar,
    })),
    award: attorney.award,
    sameAs: attorney.slug
      ? [`${baseUrl}/attorneys/${attorney.slug}`, `${baseUrl}/es/abogados/${attorney.slug}`]
      : undefined,
  };
}

export function generateReviewSchema(review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  itemReviewed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    itemReviewed: {
      '@type': 'LegalService',
      name: review.itemReviewed || 'Vasquez Law Firm Legal Services',
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  serviceType?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: service.provider || 'Vasquez Law Firm, PLLC',
    },
    areaServed: service.areaServed || ['North Carolina', 'Florida'],
    serviceType: service.serviceType || 'Legal Services',
    url: service.url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Initial Consultation',
            description: 'Complimentary consultation to discuss your legal needs',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '487',
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  description: string;
  image?: string;
  url: string;
  keywords?: string[];
  wordCount?: number;
  readingTime?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.title,
    author: {
      '@type': 'Person',
      name: post.author,
      worksFor: {
        '@type': 'LegalService',
        '@id': 'https://www.vasquezlawnc.com/#organization',
        name: 'Vasquez Law Firm, PLLC',
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    description: post.description,
    image: post.image || 'https://www.vasquezlawnc.com/images/BANNER_TRANS.PNG',
    url: post.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
    publisher: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vasquezlawnc.com/images/logo.png',
      },
    },
    keywords: post.keywords?.join(', '),
    wordCount: post.wordCount,
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };
}

export function generateVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // ISO 8601 format, e.g., "PT4M30S"
  contentUrl: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    publisher: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
    },
  };
}

export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  url?: string;
  eventStatus?: 'EventScheduled' | 'EventPostponed' | 'EventCancelled';
  eventAttendanceMode?:
    | 'OfflineEventAttendanceMode'
    | 'OnlineEventAttendanceMode'
    | 'MixedEventAttendanceMode';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
      },
    },
    url: event.url,
    eventStatus: `https://schema.org/${event.eventStatus || 'EventScheduled'}`,
    eventAttendanceMode: `https://schema.org/${event.eventAttendanceMode || 'OfflineEventAttendanceMode'}`,
    organizer: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
    },
  };
}

export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  step: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost,
    supply: howTo.supply,
    tool: howTo.tool,
    step: howTo.step.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.text,
      image: s.image,
      url: s.url,
    })),
  };
}
