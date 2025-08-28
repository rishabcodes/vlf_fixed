/**
 * Comprehensive Schema.org Implementation for Vasquez Law Firm
 * This file contains all schema types needed for complete SEO domination
 */

// Enhanced Attorney Schema with full details
export function generateEnhancedAttorneySchema(attorney: {
  name: string;
  slug: string;
  jobTitle: string;
  image: string;
  telephone?: string;
  email?: string;
  education?: Array<{ name: string; degree: string; year?: string }>;
  knowsAbout: string[];
  memberOf?: string[];
  award?: string[];
  yearsExperience?: number;
  languages?: string[];
  barAdmissions?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    '@id': `https://www.vasquezlawnc.com/attorneys/${attorney.slug}#attorney`,
    name: attorney.name,
    jobTitle: attorney.jobTitle,
    image: attorney.image,
    telephone: attorney.telephone || '+1-844-967-3536',
    email: attorney.email,
    worksFor: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
      url: 'https://vasquezlawnc.com',
    },
    alumniOf: attorney.education
      ? attorney.education.map(edu => ({
          '@type': 'EducationalOrganization',
          name: edu.name,
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: edu.degree,
            dateCreated: edu.year,
          },
        }))
      : undefined,
    knowsAbout: attorney.knowsAbout,
    knowsLanguage: attorney.languages
      ? attorney.languages.map(lang => ({
          '@type': 'Language',
          name: lang,
        }))
      : undefined,
    memberOf: attorney.memberOf
      ? attorney.memberOf.map(org => ({
          '@type': 'Organization',
          name: org,
        }))
      : undefined,
    award: attorney.award,
    hasOccupation: {
      '@type': 'Occupation',
      name: attorney.jobTitle,
      experienceRequirements: `${attorney.yearsExperience} years`,
      occupationalCategory: 'Legal',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services Offered',
      itemListElement: attorney.knowsAbout.map(area => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: area,
        },
      })),
    },
  };
}

// Enhanced FAQ Schema for voice search optimization
export function generateEnhancedFAQSchema(
  faqs: Array<{
    question: string;
    answer: string;
    category?: string;
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${typeof window !== 'undefined' ? window.location.href : ''}#faq`,
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `#question-${index}`,
      name: faq.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        author: {
          '@type': 'LegalService',
          name: 'Vasquez Law Firm, PLLC',
        },
      },
      ...(faq.category && { about: { '@type': 'Thing', name: faq.category } }),
    })),
  };
}

// Review Schema with AggregateRating
export function generateReviewSchema(
  reviews: Array<{
    author: string;
    rating: number;
    text: string;
    date: string;
    title?: string;
    source?: string;
  }>
) {
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: '5',
    worstRating: '1',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://www.vasquezlawnc.com/#organization',
    name: 'Vasquez Law Firm, PLLC',
    aggregateRating,
    review: reviews.map(review => ({
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
      name: review.title || `Review by ${review.author}`,
      reviewBody: review.text,
      datePublished: review.date,
      publisher: {
        '@type': 'Organization',
        name: review.source || 'Google Reviews',
      },
    })),
  };
}

// Enhanced BreadcrumbList for better navigation
export function generateEnhancedBreadcrumbSchema(
  items: Array<{
    name: string;
    url: string;
    image?: string;
  }>
) {
  const lastItem = items.length > 0 ? items[items.length - 1] : null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${lastItem ? lastItem.url : 'https://www.vasquezlawnc.com'}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: {
        '@type': 'WebPage',
        '@id': item.url,
        url: item.url,
        name: item.name,
        ...(item.image && { image: item.image }),
      },
    })),
  };
}

// Event Schema for free consultations
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  isOnline?: boolean;
  offers?: {
    price: number;
    priceCurrency: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location
      ? {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Charlotte',
            addressRegion: 'NC',
          },
        }
      : {
          '@type': 'VirtualLocation',
          url: 'https://www.vasquezlawnc.com/contact',
        },
    offers: {
      '@type': 'Offer',
      price: event.offers?.price || 0,
      priceCurrency: event.offers?.priceCurrency || 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    organizer: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      url: 'https://www.vasquezlawnc.com',
    },
  };
}

// HowTo Schema for legal processes
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    minValue: number;
    maxValue: number;
  };
  steps: Array<{
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
    estimatedCost: howTo.estimatedCost && {
      '@type': 'MonetaryAmount',
      currency: howTo.estimatedCost.currency,
      minValue: howTo.estimatedCost.minValue,
      maxValue: howTo.estimatedCost.maxValue,
    },
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
    author: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
    },
  };
}

// Service Schema for practice areas
export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  availableLanguages?: string[];
  priceRange?: string;
  url: string;
  image?: string;
  serviceType?: string;
  hasOfferCatalog?: Array<{
    name: string;
    description: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${service.url}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType || service.name,
    provider: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: service.provider,
    },
    areaServed: service.areaServed.map(area => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    availableLanguage: service.availableLanguages
      ? service.availableLanguages.map(lang => ({
          '@type': 'Language',
          name: lang,
        }))
      : undefined,
    priceRange: service.priceRange || '$$',
    url: service.url,
    image: service.image,
    hasOfferCatalog: service.hasOfferCatalog && {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: service.hasOfferCatalog.map(offer => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer.name,
          description: offer.description,
        },
      })),
    },
  };
}

// Local Business Schema with departments
export function generateEnhancedLocalBusinessSchema(business: {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  geo?: {
    lat: number;
    lng: number;
  };
  hours?: Array<{
    days: string[];
    opens: string;
    closes: string;
  }>;
  departments?: Array<{
    name: string;
    telephone?: string;
    email?: string;
  }>;
  amenities?: string[];
  paymentAccepted?: string[];
  placeId?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `https://www.vasquezlawnc.com/locations/${business.address.city.toLowerCase()}#location`,
    name: business.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    telephone: business.phone,
    ...(business.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.lat,
        longitude: business.geo.lng,
      },
      hasMap: `https://www.google.com/maps/place/?q=place_id:${business.placeId}`,
    }),
    openingHoursSpecification: business.hours
      ? business.hours.map(spec => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: spec.days,
          opens: spec.opens,
          closes: spec.closes,
        }))
      : undefined,
    department: business.departments
      ? business.departments.map(dept => ({
          '@type': 'Organization',
          name: dept.name,
          telephone: dept.telephone,
          email: dept.email,
        }))
      : undefined,
    amenityFeature: business.amenities
      ? business.amenities.map(amenity => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
          value: true,
        }))
      : undefined,
    paymentAccepted: business.paymentAccepted,
    priceRange: '$$',
    image: [
      `https://www.vasquezlawnc.com/images/office-${business.address.city.toLowerCase()}-exterior.jpg`,
      `https://www.vasquezlawnc.com/images/office-${business.address.city.toLowerCase()}-interior.jpg`,
      `https://www.vasquezlawnc.com/images/office-${business.address.city.toLowerCase()}-team.jpg`,
    ],
  };
}

// Question & Answer Schema for specific legal questions
export function generateQASchema(qa: {
  question: string;
  answer: string;
  author: string;
  dateCreated: string;
  upvoteCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: qa.question,
      text: qa.question,
      dateCreated: qa.dateCreated,
      author: {
        '@type': 'Person',
        name: qa.author,
      },
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
        dateCreated: qa.dateCreated,
        upvoteCount: qa.upvoteCount || 0,
        author: {
          '@type': 'Attorney',
          name: 'Vasquez Law Firm Attorney',
          worksFor: {
            '@type': 'LegalService',
            name: 'Vasquez Law Firm, PLLC',
          },
        },
      },
    },
  };
}

// SpeakableSpecification for voice search
export function generateSpeakableSchema(content: {
  headline: string;
  summary: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-headline', '.speakable-summary'],
    },
    headline: content.headline,
    description: content.summary,
    url: content.url,
  };
}

// CollectionPage Schema for practice area hubs
export function generateCollectionPageSchema(collection: {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    url: string;
    description: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: collection.url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.url,
        name: item.name,
        description: item.description,
      })),
    },
  };
}

// ContactPage Schema
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vasquez Law Firm',
    description: 'Get in touch with our experienced attorneys for a free consultation',
    url: 'https://www.vasquezlawnc.com/contact',
    mainEntity: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+1-844-967-3536',
          availableLanguage: ['English', 'Spanish'],
          areaServed: ['US'],
          contactOption: ['TollFree', 'HearingImpairedSupported'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:30',
            closes: '17:30',
          },
        },
        {
          '@type': 'ContactPoint',
          contactType: 'emergency',
          telephone: '+1-844-967-3536',
          availableLanguage: ['English', 'Spanish'],
          areaServed: ['US'],
          contactOption: ['TollFree', 'Emergency'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        },
      ],
    },
  };
}

// WebSite Schema with SearchAction
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.vasquezlawnc.com/#website',
    url: 'https://www.vasquezlawnc.com',
    name: 'Vasquez Law Firm',
    description: 'Top-rated immigration and personal injury attorneys serving NC & FL',
    publisher: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.vasquezlawnc.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    ],
    inLanguage: ['en-US', 'es-ES'],
  };
}

// VideoObject Schema for video content
export function generateVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  embedUrl: string;
  transcript?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: video.embedUrl,
    ...(video.transcript && { transcript: video.transcript }),
    publisher: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
    },
  };
}

// BlogPosting Schema with author details
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image: string;
  url: string;
  keywords: string[];
  wordCount?: number;
  readingTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author,
      worksFor: {
        '@type': 'LegalService',
        name: 'Vasquez Law Firm, PLLC',
      },
    },
    publisher: {
      '@type': 'LegalService',
      '@id': 'https://www.vasquezlawnc.com/#organization',
      name: 'Vasquez Law Firm, PLLC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.vasquezlawnc.com/logo.png',
      },
    },
    image: post.image,
    url: post.url,
    keywords: post.keywords,
    ...(post.wordCount && { wordCount: post.wordCount }),
    ...(post.readingTime && { timeRequired: post.readingTime }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
  };
}
