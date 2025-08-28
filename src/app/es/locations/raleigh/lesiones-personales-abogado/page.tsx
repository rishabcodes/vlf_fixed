import { Metadata } from 'next';

import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
export const metadata: Metadata = {
  title: 'Raleigh Lesiones Personales Abogado - Car Accidents & More | Vasquez Law',
  description:
    'Experienced Raleigh personal injury lawyers. Car accidents on I-40/I-440, truck crashes, slip & fall. No fee unless we win. Free consultation. Se habla español.',
  keywords:
    'Raleigh personal injury attorney, Raleigh personal injury lawyer, car accident lawyer Raleigh NC, truck accident attorney Raleigh, slip and fall lawyer Raleigh, wrongful death attorney Raleigh, Raleigh injury law firm, best personal injury lawyer Raleigh',
  openGraph: {
    title: 'Raleigh Lesiones Personales Abogado - YO PELEO POR TI™ | Vasquez Law',
    description:
      "Raleigh's trusted personal injury law firm. We fight insurance companies to get you maximum compensation. No fee unless we win your case.",
    images: [{ url: '/images/offices/raleigh-personal-injury-attorney.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/raleigh/personal-injury-attorney',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raleigh Lesiones Personales Abogado - YO PELEO POR TI™',
    description: 'Injured in Raleigh? We fight for maximum compensation. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/raleigh/personal-injury-attorney',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/raleigh/personal-injury-attorney',
      'es-US': 'https://www.vasquezlawfirm.com/locations/raleigh/abogado-lesiones-personales',
    },
  },
};

export default function RaleighPersonalInjuryAbogadoPage() {
  const serviceLocationData = {
    cityName: 'Raleigh',
    serviceName: 'Lesiones Personales',
    heroTitle: 'Raleigh Lesiones Personales Abogado',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      "Injured in North Carolina's capital? We fight insurance companies to get Wake County residents the compensation they deserve. No fee unless we win. Over $100 million recovered.",

    localStats: {
      stat1: { value: '$75M+', label: 'Recovered in Wake County' },
      stat2: { value: '2,800+', label: 'Raleigh Cases Won' },
      stat3: { value: '99%', label: 'Client Satisfaction' },
      stat4: { value: 'No Fee', label: 'Unless We Win' },
    },

    serviceDetails: {
      title: 'Raleigh Lesiones Personales Legal Services',
      description:
        'Comprehensive injury representation for accidents throughout Raleigh, Cary, and Wake County',
      services: [
        {
          name: 'Car & Truck Accidents',
          description:
            'Serious injuries from crashes on I-40, I-440, I-540, Capital Boulevard, and Raleigh streets.',
          localInfo:
            "Expert knowledge of Raleigh's most dangerous roads including Capital Blvd and Glenwood Ave",
        },
        {
          name: 'Motorcycle Accidents',
          description:
            "Protecting bikers' rights after crashes on Raleigh roads. We fight insurance company bias.",
          localInfo: "Active in Raleigh's motorcycle community and Triangle rider safety advocacy",
        },
        {
          name: 'Pedestrian & Bicycle Injuries',
          description:
            'Representing walkers and cyclists injured on Raleigh greenways, sidewalks, and streets.',
          localInfo: "Familiar with Raleigh's greenway system and pedestrian accident hotspots",
        },
        {
          name: 'Medical Malpractice',
          description:
            'Holding Raleigh hospitals and doctors accountable for medical errors and negligence.',
          localInfo:
            'Experience with WakeMed, Duke Raleigh, UNC Rex, and other Triangle medical facilities',
        },
        {
          name: 'Premises Liability',
          description:
            'Slip and fall injuries at stores, restaurants, apartments, and government buildings.',
          localInfo: 'Knowledge of Wake County property codes and state capital safety standards',
        },
        {
          name: 'Wrongful Death',
          description:
            "Compassionate representation for families who've lost loved ones due to negligence.",
          localInfo:
            'Understanding of North Carolina wrongful death laws with Wake County expertise',
        },
      ],
    },

    localExpertise: {
      title: 'Why Raleigh Injury Victims Choose Us',
      points: [
        'Deep knowledge of Raleigh roads and traffic patterns',
        'Relationships with Triangle medical providers for client care',
        'Regular practice in Wake County Superior Court',
        'Understanding of Raleigh Police Department procedures',
        'Connections with local accident reconstruction experts',
        "Bilingual team serving Raleigh's diverse communities",
      ],
    },

    courtInfo: {
      title: 'Wake County Courthouse',
      name: 'Wake County Superior Court',
      address: '316 Fayetteville St, Raleigh, NC 27601',
      phone: '(919) 792-4000',
      hours: 'Monday-Friday: 8:00 AM - 5:00 PM',
      parkingInfo: 'Multiple parking decks available downtown',
      additionalInfo:
        'We regularly appear in Wake County courts and understand the local judges, procedures, and jury tendencies that can significantly impact your personal injury case outcome.',
    },

    testimonials: [
      {
        text: 'T-boned on Capital Boulevard. Vasquez Law got me $300,000 for my injuries. They handled everything professionally!',
        author: 'Michelle P.',
        location: 'North Raleigh',
        rating: 5,
      },
      {
        text: 'Motorcycle accident on I-440. Insurance offered $10,000, they got me $150,000. True fighters for justice!',
        author: 'Kevin D.',
        location: 'Downtown Raleigh',
        rating: 5,
      },
      {
        text: 'Fell at Crabtree Valley Mall. They proved negligence and won a great settlement. Highly recommend!',
        author: 'Patricia W.',
        location: 'West Raleigh',
        rating: 5,
      },
    ],

    caseResults: [
      '$1.5 million settlement for family in I-40 truck accident',
      '$900,000 for pedestrian struck in downtown Raleigh crosswalk',
      '$650,000 medical malpractice settlement at major Raleigh hospital',
      '$2.1 million wrongful death verdict in Wake County',
      '$475,000 slip and fall at state government building',
    ],

    faqs: [
      {
        question: 'How much is my Raleigh injury case worth?',
        answer:
          "Case value depends on injury severity, medical costs, lost wages, and pain and suffering. Wake County juries tend to be fair but conservative. We offer free case evaluations to assess your claim's potential value based on similar Raleigh cases we've won.",
      },
      {
        question: "What's the deadline to file a personal injury lawsuit in Raleigh?",
        answer:
          'North Carolina has a 3-year statute of limitations for most personal injury cases. However, claims against the state, city of Raleigh, or government entities have much shorter deadlines. Contact us immediately to protect your rights.',
      },
      {
        question: 'What if I was partially at fault for my Raleigh accident?',
        answer:
          "North Carolina's contributory negligence rule is harsh - even 1% fault can bar recovery. However, we've successfully overcome this defense many times in Wake County courts. Don't assume you have no case without professional evaluation.",
      },
      {
        question: 'Do you handle cases against the state government in Raleigh?',
        answer:
          'Yes. We have experience with claims against state agencies, NC State University, and other government entities. These cases have special rules and shorter deadlines, but we know how to navigate the complexities.',
      },
    ],

    officeInfo: {
      name: 'Raleigh Main Office',
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
        sunday: 'Sunday: 24/7 for Emergencies',
      },
    },

    servingAreas: [
      'Downtown Raleigh',
      'North Raleigh',
      'South Raleigh',
      'East Raleigh',
      'West Raleigh',
      'Cary',
      'Apex',
      'Holly Springs',
      'Fuquay-Varina',
      'Garner',
      'Knightdale',
      'Wake Forest',
      'Morrisville',
      'Wendell',
      'Zebulon',
      'Rolesville',
      'Clayton',
      'Willow Spring',
      'New Hill',
      'All Wake County',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.5661!2d-78.6382!3d35.7796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzQ2LjYiTiA3OMKwMzgnMTcuNSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: 'Why Hire a Raleigh Lesiones Personales Abogado?',
      content: `After an accident in Raleigh, you need experienced advocates who understand Wake County\'s legal landscape. Insurance companies employ teams of adjusters and lawyers to minimize your claim. Our Raleigh personal injury attorneys level the playing field with aggressive representation and local expertise. We know Raleigh\'s dangerous roads like Capital Boulevard and I-440, understand Wake County jury tendencies, and have relationships throughout the Triangle medical and legal communities. With over $75 million recovered for Wake County residents, we\'re Raleigh\'s trusted choice for serious injury cases.`,
    },

    localChallenges: {
      title: 'Common Injury Accidents in Raleigh, NC',
      content: `As North Carolina\'s capital and second-largest city, Raleigh faces unique traffic and safety challenges. The I-40/I-440 Beltline sees daily accidents, while Capital Boulevard remains one of the state\'s deadliest roads. Growing suburbs create congestion on roads like Falls of Neuse and Six Forks. Downtown\'s mix of government workers, students, and residents creates pedestrian dangers. Construction throughout the Triangle adds hazards. Our Raleigh injury lawyers understand these local patterns and how they impact liability in your case.`,
    },
  };

  return (
    <>
      <ModernServiceLocationTemplate data={serviceLocationData} />

      {/* Local Business Schema */}
      <Script
        id="raleigh-personal-injury-attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/raleigh/personal-injury-attorney',
            name: 'Vasquez Law Firm - Raleigh Lesiones Personales Abogado',
            description:
              'Experienced Raleigh personal injury lawyers. Car accidents, truck crashes, slip & fall. No fee unless we win.',
            url: 'https://www.vasquezlawfirm.com/locations/raleigh/personal-injury-attorney',
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
            ],
            priceRange: 'No Fee Unless We Win',
            areaServed: [
              {
                '@type': 'City',
                name: 'Raleigh',
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
              name: 'Lesiones Personales Legal Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Car Accident Representation',
                    description:
                      'Legal representation for car accident victims in Raleigh and Wake County',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Truck Accident Cases',
                    description: 'Commercial vehicle accident injury claims on I-40, I-440, I-540',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Medical Malpractice',
                    description: 'Claims against Raleigh hospitals and healthcare providers',
                  },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '456',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="raleigh-personal-injury-faq-schema"
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
