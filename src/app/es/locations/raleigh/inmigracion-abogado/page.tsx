import { Metadata } from 'next';

import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
export const metadata: Metadata = {
  title: 'Raleigh Inmigración Abogado - YO PELEO POR TI™ | Vasquez Law Firm',
  description:
    'Top Raleigh immigration attorney serving Wake County. Green cards, deportation defense, work visas, citizenship. State capital expertise. Free consultation. Se habla español.',
  keywords:
    'Raleigh immigration lawyer, Raleigh immigration attorney, immigration lawyer Raleigh NC, deportation defense Raleigh, green card lawyer Raleigh, work visa attorney Raleigh, citizenship lawyer Raleigh, Raleigh immigration law firm, best immigration lawyer Raleigh',
  openGraph: {
    title: 'Raleigh Inmigración Abogado - YO PELEO POR TI™ | Vasquez Law Firm',
    description:
      "Raleigh's trusted immigration law firm in the state capital. Expert representation for all immigration matters. Military discipline meets legal excellence.",
    images: [{ url: '/images/offices/raleigh-immigration-lawyer.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/raleigh/immigration-lawyer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raleigh Inmigración Abogado - YO PELEO POR TI™',
    description:
      'Expert immigration legal services in Raleigh, NC. 98% success rate. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/raleigh/immigration-lawyer',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/raleigh/immigration-lawyer',
      'es-US': 'https://www.vasquezlawfirm.com/locations/raleigh/abogado-inmigracion',
    },
  },
};

export default function RaleighInmigraciónAbogadoPage() {
  const serviceLocationData = {
    cityName: 'Raleigh',
    serviceName: 'Inmigración Law',
    heroTitle: 'Raleigh Inmigración Abogado',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      "North Carolina's capital city deserves capital representation. Military discipline meets legal excellence to protect your American dream. Serving Raleigh, Cary, and all of Wake County.",

    localStats: {
      stat1: { value: '4,000+', label: 'Wake County Families Helped' },
      stat2: { value: '98%', label: 'Success Rate' },
      stat3: { value: '24/7', label: 'Emergency Defense' },
      stat4: { value: '20+', label: 'Years in Raleigh' },
    },

    serviceDetails: {
      title: 'Raleigh Inmigración Legal Services',
      description:
        'Comprehensive immigration representation for Raleigh, Cary, and Wake County residents',
      services: [
        {
          name: 'Deportation Defense',
          description:
            'Emergency deportation defense and bond hearings. We fight detention and removal proceedings aggressively.',
          localInfo: 'Regular representation at Charlotte Inmigración Court (serving Raleigh area)',
        },
        {
          name: 'Green Cards & Permanent Residency',
          description:
            "Family-based and employment-based green card applications for Raleigh's diverse community.",
          localInfo:
            'Processing through USCIS Raleigh-Durham office with expert knowledge of local procedures',
        },
        {
          name: 'Work Visas for Tech & Research',
          description:
            'H-1B, L-1, O-1 visas for Research Triangle Park professionals, universities, and tech companies.',
          localInfo: 'Serving RTP companies, NC State, Duke, UNC, and major Raleigh employers',
        },
        {
          name: 'Citizenship & Naturalization',
          description:
            'Complete citizenship application assistance, interview preparation, and oath ceremony guidance.',
          localInfo: 'Regular citizenship workshops at our Raleigh office location',
        },
        {
          name: 'Student & Scholar Visas',
          description:
            'F-1, J-1, and related visas for international students and researchers in the Triangle.',
          localInfo: 'Expertise with Triangle universities and research institutions',
        },
        {
          name: 'Business Inmigración',
          description:
            'E-2 investor visas, L-1 transfers, and business immigration for Raleigh entrepreneurs.',
          localInfo: "Supporting Raleigh's growing international business community",
        },
      ],
    },

    localExpertise: {
      title: 'Why Raleigh Chooses Vasquez Law Firm',
      points: [
        'Deep understanding of Research Triangle immigration needs',
        'Relationships with Triangle universities and tech employers',
        'Knowledge of state government employment requirements',
        "Active in Raleigh's Latino and international communities",
        'Convenient downtown Raleigh location near government offices',
        'Entire team fluent in Spanish and English',
      ],
    },

    courtInfo: {
      title: 'Inmigración Court Information for Raleigh',
      name: 'Charlotte Inmigración Court (Serving Raleigh)',
      address: '6226 Central Avenue, Charlotte, NC 28212',
      phone: '(704) 535-6000',
      hours: 'Monday-Friday: 8:00 AM - 4:30 PM',
      parkingInfo: 'Cases from Raleigh heard in Charlotte',
      additionalInfo:
        'While Raleigh cases are heard in Charlotte Inmigración Court, we handle all preparation at our Raleigh office. We accompany clients to Charlotte for hearings and know the judges and procedures thoroughly.',
    },

    testimonials: [
      {
        text: 'My H-1B was denied twice before finding Vasquez Law. They got it approved and now I have my green card! Best immigration lawyer in Raleigh!',
        author: 'Priya S.',
        location: 'Research Triangle Park',
        rating: 5,
      },
      {
        text: 'Facing deportation after 20 years in Raleigh. They stopped my removal and got me permanent residency. My family is forever grateful!',
        author: 'José R.',
        location: 'Southeast Raleigh',
        rating: 5,
      },
      {
        text: 'International student at NC State with visa problems. They fixed everything and I graduated on time. True professionals!',
        author: 'Wei L.',
        location: 'Centennial Campus',
        rating: 5,
      },
    ],

    caseResults: [
      'Stopped deportation for Raleigh restaurant owner with U.S. citizen children',
      'Won asylum for family fleeing persecution, now thriving in Cary',
      'Secured O-1 visa for distinguished researcher at Research Triangle Park',
      'Obtained green cards for entire extended family in 8 months',
      'Successfully appealed citizenship denial for Wake County teacher',
    ],

    faqs: [
      {
        question: 'How much does a Raleigh immigration lawyer cost?',
        answer:
          'We offer transparent flat fees for most immigration cases with flexible payment plans. Initial consultations are always free. We believe quality legal representation should be accessible to everyone in the Triangle area, regardless of financial situation.',
      },
      {
        question: 'Do you handle immigration cases for RTP companies?',
        answer:
          'Yes! We regularly work with Research Triangle Park companies, startups, and established corporations on H-1B, L-1, O-1, and other employment-based visas. We understand the unique needs of tech and research professionals.',
      },
      {
        question: 'Can you help international students in Raleigh?',
        answer:
          'Absolutely. We assist F-1 students at NC State, Duke, UNC, and other Triangle schools with visa issues, OPT/CPT, status changes, and paths to permanent residency after graduation.',
      },
      {
        question: 'Where are immigration hearings held for Raleigh residents?',
        answer:
          'Inmigración Court hearings for Raleigh residents are held in Charlotte. However, we handle all preparation at our Raleigh office and accompany clients to Charlotte for hearings. USCIS interviews are often conducted at the Raleigh-Durham office.',
      },
    ],

    officeInfo: {
      name: 'Raleigh Office',
      street: '434 Fayetteville St, Suite 2310',
      city: 'Raleigh',
      state: 'NC',
      zip: '27601',
      phone: '1-844-YO-PELEO',
      localPhone: '(919) 300-9193',
      email: 'raleigh@vasquezlawfirm.com',
      hours: {
        weekdays: 'Monday-Friday: 8:00 AM - 5:00 PM',
        saturday: 'Saturday: By Appointment',
        sunday: 'Sunday: Emergency Services Available',
      },
    },

    servingAreas: [
      'Downtown Raleigh',
      'North Raleigh',
      'Southeast Raleigh',
      'Southwest Raleigh',
      'Northwest Raleigh',
      'Cary',
      'Apex',
      'Holly Springs',
      'Fuquay-Varina',
      'Garner',
      'Knightdale',
      'Wake Forest',
      'Morrisville',
      'Research Triangle Park',
      'Durham (partial)',
      'Chapel Hill (partial)',
      'Clayton',
      'Wendell',
      'Zebulon',
      'Rolesville',
      'All Wake County',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.5661!2d-78.6382!3d35.7796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzQ2LjYiTiA3OMKwMzgnMTcuNSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: 'Why Hire a Raleigh Inmigración Abogado?',
      content: `As North Carolina\'s capital and part of the Research Triangle, Raleigh attracts immigrants from around the world - tech professionals, researchers, students, and families seeking better opportunities. This diversity brings unique immigration challenges. Our Raleigh immigration lawyers understand the local landscape, from RTP employment needs to university student issues. We\'ve helped over 4,000 Wake County families navigate complex immigration law with a 98% success rate. Don\'t trust your American dream to inexperienced attorneys - choose proven advocates who know Raleigh.`,
    },

    localChallenges: {
      title: "Inmigración in North Carolina's Capital",
      content: `Raleigh\'s position as state capital and tech hub creates specific immigration opportunities and challenges. The Research Triangle Park attracts global talent needing H-1B and O-1 visas. Universities bring international students requiring F-1 support. Growing Latino communities face family separation fears. State government employment adds extra immigration complexities. Our Raleigh immigration attorneys navigate these unique aspects daily, providing tailored solutions whether you\'re a tech professional, student, or long-time resident facing deportation.`,
    },
  };

  return (
    <>
      <ModernServiceLocationTemplate data={serviceLocationData} />

      {/* Local Business Schema */}
      <Script
        id="raleigh-immigration-lawyer-local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/raleigh/immigration-lawyer',
            name: 'Vasquez Law Firm - Raleigh Inmigración Abogado',
            description:
              'Top Raleigh immigration attorney serving Wake County. Green cards, deportation defense, work visas, citizenship.',
            url: 'https://www.vasquezlawfirm.com/locations/raleigh/immigration-lawyer',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '434 Fayetteville St, Suite 2310',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 35.7796,
              longitude: -78.6382,
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
                name: 'Raleigh',
                '@id': 'https://en.wikipedia.org/wiki/Raleigh,_North_Carolina',
              },
              {
                '@type': 'City',
                name: 'Cary',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Wake County',
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
                    description: 'Emergency deportation defense for Raleigh residents',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Work Visas',
                    description: 'H-1B, L-1, O-1 visas for Research Triangle professionals',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Student Visas',
                    description: 'F-1 and J-1 visas for Triangle university students',
                  },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '412',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* Abogado Schema */}
      <Script
        id="raleigh-immigration-attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Abogado',
            name: 'Raleigh Inmigración Team',
            url: 'https://www.vasquezlawfirm.com/locations/raleigh/immigration-lawyer',
            image: 'https://www.vasquezlawfirm.com/images/team/raleigh-team.jpg',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '434 Fayetteville St, Suite 2310',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27601',
              addressCountry: 'US',
            },
            knowsAbout: [
              'Inmigración Law',
              'Deportation Defense',
              'Work Visas',
              'Student Visas',
              'Green Cards',
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="raleigh-immigration-lawyer-faq-schema"
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
    </>
  );
}
