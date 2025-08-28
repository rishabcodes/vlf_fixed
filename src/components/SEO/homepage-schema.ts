export function generateHomepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization Schema
      {
        '@type': 'LegalService',
        '@id': 'https://www.vasquezlawnc.com/#organization',
        name: 'Vasquez Law Firm, PLLC',
        alternateName: 'Vasquez Law Firm',
        url: 'https://www.vasquezlawnc.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.vasquezlawnc.com/images/LOGO_TRANS.PNG',
          width: 600,
          height: 600,
        },
        image: 'https://www.vasquezlawnc.com/images/BANNER_TRANS.PNG',
        telephone: '+1-844-967-3536',
        email: 'leads@vasquezlawfirm.com',
        priceRange: '$$',
        description:
          'Top-rated immigration lawyers and personal injury attorneys serving North Carolina and Florida with over 60 years of collective experience.',
        slogan: 'YO PELEO POR TI™ - I FIGHT FOR YOU',
        foundingDate: '1989',
        founder: {
          '@type': 'Person',
          name: 'William Vasquez',
          jobTitle: 'Founding Attorney',
          description: 'U.S. Air Force Veteran Attorney',
        },
        sameAs: [
          'https://www.facebook.com/vasquezlawfirm',
          'https://www.linkedin.com/company/vasquez-law-firm',
          'https://www.youtube.com/@vasquezlawfirm',
        ],
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
        knowsAbout: [
          'Immigration Law',
          'Personal Injury Law',
          'Workers Compensation',
          'Criminal Defense',
          'Family Law',
          'Traffic Violations',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Legal Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Immigration Law Services',
                description:
                  'Green cards, citizenship, deportation defense, family petitions, work visas',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Personal Injury Law Services',
                description: 'Car accidents, truck accidents, slip and fall, medical malpractice',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Workers Compensation',
                description: 'Workplace injuries, disability benefits, denied claims',
              },
            },
          ],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1250',
          bestRating: '5',
        },
      },
      // Main Office Locations
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.vasquezlawnc.com/#charlotte-office',
        parentOrganization: {
          '@id': 'https://www.vasquezlawnc.com/#organization',
        },
        name: 'Vasquez Law Firm - Charlotte Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4801 E Independence Blvd Suite 714',
          addressLocality: 'Charlotte',
          addressRegion: 'NC',
          postalCode: '28212',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.1932,
          longitude: -80.7595,
        },
        telephone: '+1-704-766-9000',
        openingHours: 'Mo-Fr 09:00-17:00',
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.vasquezlawnc.com/#raleigh-office',
        parentOrganization: {
          '@id': 'https://www.vasquezlawnc.com/#organization',
        },
        name: 'Vasquez Law Firm - Raleigh Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4426 Louisburg Road',
          addressLocality: 'Raleigh',
          addressRegion: 'NC',
          postalCode: '27616',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 35.8988,
          longitude: -78.7879,
        },
        telephone: '+1-919-533-7000',
        openingHours: 'Mo-Fr 09:00-17:00',
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.vasquezlawnc.com/#smithfield-office',
        parentOrganization: {
          '@id': 'https://www.vasquezlawnc.com/#organization',
        },
        name: 'Vasquez Law Firm - Smithfield Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '181 S Equity Dr Suite D',
          addressLocality: 'Smithfield',
          addressRegion: 'NC',
          postalCode: '27577',
          addressCountry: 'US',
        },
        telephone: '+1-919-934-1700',
        openingHours: 'Mo-Fr 09:00-17:00',
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.vasquezlawnc.com/#orlando-office',
        parentOrganization: {
          '@id': 'https://www.vasquezlawnc.com/#organization',
        },
        name: 'Vasquez Law Firm - Orlando Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '37 N Orange Ave Suite 500',
          addressLocality: 'Orlando',
          addressRegion: 'FL',
          postalCode: '32801',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 28.5446,
          longitude: -81.379,
        },
        telephone: '+1-407-317-1000',
        openingHours: 'Mo-Fr 09:00-17:00',
      },
      // Website
      {
        '@type': 'WebSite',
        '@id': 'https://www.vasquezlawnc.com/#website',
        url: 'https://www.vasquezlawnc.com',
        name: 'Vasquez Law Firm',
        description: 'Immigration lawyers and personal injury attorneys serving NC & FL',
        publisher: {
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
      },
      // Breadcrumb
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.vasquezlawnc.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.vasquezlawnc.com',
          },
        ],
      },
    ],
  };
}

export function generateAttorneySchema(attorney: {
  name: string;
  title: string;
  image: string;
  description: string;
  education?: string[];
  awards?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: attorney.name,
    jobTitle: attorney.title,
    worksFor: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm',
      url: 'https://www.vasquezlawnc.com',
    },
    image: attorney.image,
    description: attorney.description,
    knowsAbout: ['Immigration Law', 'Personal Injury Law', 'Criminal Defense'],
    alumniOf: attorney.education?.map(school => ({
      '@type': 'EducationalOrganization',
      name: school,
    })),
    award: attorney.awards,
  };
}
