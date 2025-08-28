import { Metadata } from 'next';

import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title: 'Charlotte Inmigración Abogado - YO PELEO POR TI™ | Vasquez Law Firm',
  description:
    'Top-rated Charlotte immigration lawyer serving Mecklenburg County. Green cards, deportation defense, work visas, citizenship. 98% success rate. Free consultation. Se habla español.',
  keywords:
    'Charlotte immigration lawyer, Charlotte immigration attorney, immigration lawyer Charlotte NC, deportation defense Charlotte, green card lawyer Charlotte, work visa attorney Charlotte, citizenship lawyer Charlotte, Charlotte immigration law firm, best immigration lawyer Charlotte',
  openGraph: {
    title: 'Charlotte Inmigración Abogado - YO PELEO POR TI™ | Vasquez Law Firm',
    description:
      "Charlotte's most trusted immigration law firm. Expert representation for green cards, deportation defense, work visas & citizenship. Military discipline meets legal excellence.",
    images: [{ url: '/images/offices/charlotte-immigration-lawyer.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/charlotte/immigration-lawyer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Inmigración Abogado - YO PELEO POR TI™',
    description:
      'Expert immigration legal services in Charlotte, NC. 98% success rate. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/charlotte/immigration-lawyer',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/charlotte/immigration-lawyer',
      'es-US': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-inmigracion',
    },
  },
};

export default function CharlotteInmigraciónAbogadoPage() {
  const serviceLocationData = {
    cityName: 'Charlotte',
    serviceName: 'Inmigración Law',
    heroTitle: 'Charlotte Inmigración Abogado',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      "Charlotte's most trusted immigration law firm. Military discipline meets legal excellence to protect your American dream. 98% success rate with over 30,000 cases won.",

    localStats: {
      stat1: { value: '5,000+', label: 'Charlotte Families Helped' },
      stat2: { value: '98%', label: 'Success Rate' },
      stat3: { value: '24/7', label: 'Emergency Defense' },
      stat4: { value: '60+', label: 'Years Combined Experience' },
    },

    serviceDetails: {
      title: 'Charlotte Inmigración Legal Services',
      description:
        'Comprehensive immigration representation for Charlotte and Mecklenburg County residents',
      services: [
        {
          name: 'Deportation Defense',
          description:
            'Emergency deportation defense at Charlotte Inmigración Court. We fight detention and removal proceedings.',
          localInfo: 'Regular representation at Charlotte Inmigración Court on Central Avenue',
        },
        {
          name: 'Green Cards & Permanent Residency',
          description:
            'Family-based and employment-based green card applications. Adjustment of status and consular processing.',
          localInfo: 'Fast processing through USCIS Charlotte Field Office',
        },
        {
          name: 'Work Visas & Employment Authorization',
          description:
            "H-1B, L-1, E-2, and other work visas for Charlotte's banking, tech, and healthcare sectors.",
          localInfo:
            'Serving Bank of America, Wells Fargo, Atrium Health, and other major Charlotte employers',
        },
        {
          name: 'Citizenship & Naturalization',
          description:
            'Complete citizenship application assistance, interview preparation, and appeals.',
          localInfo: 'Weekly citizenship clinics at our Charlotte office',
        },
        {
          name: 'DACA & Dreamers',
          description: 'Initial DACA applications and renewals for young immigrants in Charlotte.',
          localInfo: 'Partnership with Charlotte-area schools and universities',
        },
        {
          name: 'Asylum & Refugee Protection',
          description:
            'Asylum applications, interviews, and appeals for those fleeing persecution.',
          localInfo: 'Experienced with Charlotte Inmigración Court asylum proceedings',
        },
      ],
    },

    localExpertise: {
      title: 'Why Charlotte Chooses Vasquez Law Firm',
      points: [
        'Regular practice at Charlotte Inmigración Court on Central Avenue',
        'Deep relationships with USCIS Charlotte Field Office',
        'Understanding of local employment sectors: banking, healthcare, energy',
        "Active in Charlotte's Hispanic and immigrant communities",
        'Convenient location off I-85 with free parking',
        'Bilingual staff fluent in Spanish and English',
      ],
    },

    courtInfo: {
      title: 'Charlotte Inmigración Court Information',
      name: 'Charlotte Inmigración Court',
      address: '6226 Central Avenue, Charlotte, NC 28212',
      phone: '(704) 535-6000',
      hours: 'Monday-Friday: 8:00 AM - 4:30 PM',
      parkingInfo: 'Free parking available on-site',
      additionalInfo:
        'We appear regularly at Charlotte Inmigración Court and know the judges and procedures. Our office is just 10 minutes away for convenient meetings before and after hearings.',
    },

    testimonials: [
      {
        text: "Abogado Vasquez saved my family from deportation. His team fought for us when no one else would. Now we're permanent residents!",
        author: 'Maria G.',
        location: 'South Charlotte',
        rating: 5,
      },
      {
        text: 'Got my work visa approved in record time! They understand the Charlotte job market and helped me secure my position at Bank of America.',
        author: 'Raj P.',
        location: 'Uptown Charlotte',
        rating: 5,
      },
      {
        text: 'After living in Charlotte for 15 years, I finally became a citizen thanks to Vasquez Law Firm. They made the process so easy!',
        author: 'Carlos M.',
        location: 'East Charlotte',
        rating: 5,
      },
    ],

    caseResults: [
      'Stopped deportation for Charlotte restaurant owner, saving 20 local jobs',
      'Won asylum for family fleeing violence, now contributing to Charlotte community',
      'Secured green cards for entire extended family in record 6 months',
      'Successfully appealed citizenship denial for Charlotte healthcare worker',
      'Obtained emergency work authorization for Atrium Health nurse',
    ],

    faqs: [
      {
        question: 'How much does a Charlotte immigration lawyer cost?',
        answer:
          'We offer transparent flat fees for most immigration cases. Payment plans available. Initial consultations are always free. We believe everyone deserves quality legal representation regardless of their financial situation.',
      },
      {
        question: 'Do you handle emergency deportation cases in Charlotte?',
        answer:
          'Yes! We offer 24/7 emergency deportation defense. If you or a loved one is detained by ICE in Charlotte or surrounding areas, call us immediately at 1-844-YO-PELEO.',
      },
      {
        question: 'How long do immigration cases take in Charlotte?',
        answer:
          'Timeline varies by case type. Charlotte Inmigración Court cases can take 2-4 years. USCIS applications typically take 6-12 months. We work to expedite your case whenever possible.',
      },
      {
        question: 'Do you speak Spanish?',
        answer:
          'Yes! Our entire Charlotte team is bilingual. We conduct consultations, prepare documents, and represent clients in both English and Spanish.',
      },
    ],

    officeInfo: {
      name: 'Charlotte Office',
      street: '5701 Executive Center Dr, Suite 103',
      city: 'Charlotte',
      state: 'NC',
      zip: '28212',
      phone: '1-844-YO-PELEO',
      localPhone: '(704) 500-2009',
      email: 'charlotte@vasquezlawfirm.com',
      hours: {
        weekdays: 'Monday-Friday: 8:00 AM - 5:00 PM',
        saturday: 'Saturday: By Appointment',
        sunday: 'Sunday: Emergency Services Available',
      },
    },

    servingAreas: [
      'Uptown Charlotte',
      'South End',
      'NoDa (North Davidson)',
      'Plaza Midwood',
      'Myers Park',
      'Dilworth',
      'Elizabeth',
      'Ballantyne',
      'University City',
      'Steele Creek',
      'Matthews',
      'Mint Hill',
      'Pineville',
      'Huntersville',
      'Cornelius',
      'Davidson',
      'Mooresville',
      'Indian Trail',
      'Monroe',
      'Gastonia',
      'Concord',
      'Rock Hill, SC',
      'Fort Mill, SC',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8651648937!2d-80.8433!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzM3LjYiTiA4MMKwNTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: 'Why Hire a Charlotte Inmigración Abogado?',
      content: `Navigating immigration law in Charlotte requires local expertise and proven results. Charlotte has one of the fastest-growing immigrant populations in the Southeast, with unique challenges and opportunities. Our Charlotte immigration lawyers understand the local landscape, from the Inmigración Court on Central Avenue to the USCIS Field Office procedures. We\'ve helped over 5,000 Charlotte-area families achieve their American dream through strategic legal representation and unwavering advocacy.`,
    },

    localChallenges: {
      title: 'Inmigración Challenges in Charlotte, NC',
      content: `Charlotte\'s booming economy attracts immigrants from around the world, but also presents unique challenges. The city\'s major employers in banking, healthcare, and technology often need skilled workers through H-1B and other visa programs. Meanwhile, Charlotte\'s growing Latino community faces deportation threats and family separation. Our Charlotte immigration attorneys understand these local dynamics and provide tailored solutions for each client\'s situation.`,
    },
  };

  return (
    <>
      <ModernServiceLocationTemplate data={serviceLocationData} />

      {/* Local Business Schema */}
      <Script
        id="charlotte-immigration-lawyer-local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/charlotte/immigration-lawyer',
            name: 'Vasquez Law Firm - Charlotte Inmigración Abogado',
            description:
              'Top-rated Charlotte immigration lawyer serving Mecklenburg County. Green cards, deportation defense, work visas, citizenship.',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/immigration-lawyer',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '5701 Executive Center Dr, Suite 103',
              addressLocality: 'Charlotte',
              addressRegion: 'NC',
              postalCode: '28212',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.2271,
              longitude: -80.8433,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '17:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '14:00',
              },
            ],
            priceRange: '$$',
            areaServed: [
              {
                '@type': 'City',
                name: 'Charlotte',
                '@id': 'https://en.wikipedia.org/wiki/Charlotte,_North_Carolina',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Mecklenburg County',
              },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Inmigración Legal Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Deportation Defense',
                    description: 'Emergency deportation defense at Charlotte Inmigración Court',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Green Card Applications',
                    description: 'Family and employment-based permanent residency',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Work Visas',
                    description: 'H-1B, L-1, E-2 visas for Charlotte employers',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Citizenship & Naturalization',
                    description: 'Complete citizenship application assistance',
                  },
                },
              ],
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
                  name: 'Maria G.',
                },
                reviewBody:
                  'Abogado Vasquez saved my family from deportation. His team fought for us when no one else would.',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '487',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* Abogado Schema */}
      <Script
        id="charlotte-immigration-attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Abogado',
            name: 'William Vasquez',
            url: 'https://www.vasquezlawfirm.com/attorneys/william-vasquez',
            image: 'https://www.vasquezlawfirm.com/images/attorneys/william-vasquez.jpg',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '5701 Executive Center Dr, Suite 103',
              addressLocality: 'Charlotte',
              addressRegion: 'NC',
              postalCode: '28212',
              addressCountry: 'US',
            },
            knowsAbout: [
              'Inmigración Law',
              'Deportation Defense',
              'Green Cards',
              'Work Visas',
              'Citizenship',
            ],
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'Law School Name',
            },
            memberOf: {
              '@type': 'Organization',
              name: 'American Inmigración Abogados Association',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="charlotte-immigration-lawyer-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: serviceLocationData.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="charlotte-immigration-lawyer-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.vasquezlawfirm.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Locations',
                item: 'https://www.vasquezlawfirm.com/locations',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Charlotte',
                item: 'https://www.vasquezlawfirm.com/locations/charlotte',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Inmigración Abogado',
                item: 'https://www.vasquezlawfirm.com/locations/charlotte/immigration-lawyer',
              },
            ],
          }),
        }}
      />
    </>
  );
}
