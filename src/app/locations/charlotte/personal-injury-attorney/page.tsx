import { Metadata } from 'next';

import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
export const metadata: Metadata = {
  title: 'Charlotte Personal Injury Attorney - Car Accidents & More | Vasquez Law',
  description:
    'Experienced Charlotte personal injury lawyers. Car accidents, truck crashes, slip & fall, wrongful death. No fee unless we win. Free consultation. Se habla español.',
  keywords:
    'Charlotte personal injury attorney, Charlotte personal injury lawyer, car accident lawyer Charlotte NC, truck accident attorney Charlotte, slip and fall lawyer Charlotte, wrongful death attorney Charlotte, Charlotte injury law firm, best personal injury lawyer Charlotte',
  openGraph: {
    title: 'Charlotte Personal Injury Attorney - YO PELEO POR TI™ | Vasquez Law',
    description:
      "Charlotte's trusted personal injury law firm. We fight insurance companies to get you maximum compensation. No fee unless we win your case.",
    images: [{ url: '/images/offices/charlotte-personal-injury-attorney.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/charlotte/personal-injury-attorney',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Personal Injury Attorney - YO PELEO POR TI™',
    description: 'Injured in Charlotte? We fight for maximum compensation. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/charlotte/personal-injury-attorney',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/charlotte/personal-injury-attorney',
      'es-US': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-lesiones-personales',
    },
  },
};

export default function CharlottePersonalInjuryAttorneyPage() {
  const serviceLocationData = {
    cityName: 'Charlotte',
    serviceName: 'Personal Injury',
    heroTitle: 'Charlotte Personal Injury Attorney',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      'Injured in Charlotte? We fight insurance companies to get you the compensation you deserve. No fee unless we win. Over $100 million recovered for clients.',

    localStats: {
      stat1: { value: '$100M+', label: 'Recovered for Clients' },
      stat2: { value: '3,500+', label: 'Charlotte Cases Won' },
      stat3: { value: '99%', label: 'Client Satisfaction' },
      stat4: { value: 'No Fee', label: 'Unless We Win' },
    },

    serviceDetails: {
      title: 'Charlotte Personal Injury Legal Services',
      description:
        'Comprehensive injury representation for accidents throughout Charlotte and Mecklenburg County',
      services: [
        {
          name: 'Car & Truck Accidents',
          description:
            'Serious injuries from crashes on I-77, I-85, I-485, and Charlotte streets. We handle all insurance negotiations.',
          localInfo: "Expert knowledge of Charlotte's most dangerous intersections and highways",
        },
        {
          name: 'Motorcycle Accidents',
          description:
            "Protecting bikers' rights after crashes. We understand the bias motorcyclists face from insurance companies.",
          localInfo: "Active in Charlotte's motorcycle community and safety advocacy",
        },
        {
          name: 'Slip & Fall Injuries',
          description:
            'Premises liability cases at stores, restaurants, apartments, and public property throughout Charlotte.',
          localInfo: 'Familiar with property codes and safety standards in Mecklenburg County',
        },
        {
          name: 'Medical Malpractice',
          description:
            'Holding Charlotte hospitals and doctors accountable for medical errors and negligence.',
          localInfo:
            'Experience with Atrium Health, Novant, and other Charlotte medical facilities',
        },
        {
          name: 'Wrongful Death',
          description:
            "Compassionate representation for families who've lost loved ones due to negligence.",
          localInfo:
            'Understanding of North Carolina wrongful death laws and local court procedures',
        },
        {
          name: "Workers' Compensation",
          description:
            "Fighting for injured workers' rights to medical care and wage replacement benefits.",
          localInfo: "Knowledge of Charlotte's major employers and workplace injury patterns",
        },
      ],
    },

    localExpertise: {
      title: 'Why Charlotte Injury Victims Choose Us',
      points: [
        'Deep knowledge of Charlotte roads and accident patterns',
        'Relationships with local medical providers for client treatment',
        'Regular practice in Mecklenburg County Superior Court',
        'Understanding of Charlotte Police Department accident reports',
        'Connections with accident reconstruction experts',
        "Bilingual team serving Charlotte's Hispanic community",
      ],
    },

    courtInfo: {
      title: 'Mecklenburg County Courthouse',
      name: 'Mecklenburg County Superior Court',
      address: '832 E 4th St, Charlotte, NC 28202',
      phone: '(704) 686-0700',
      hours: 'Monday-Friday: 8:00 AM - 5:00 PM',
      parkingInfo: 'Paid parking available in nearby decks',
      additionalInfo:
        'We regularly appear in Mecklenburg County courts and know the judges, procedures, and local rules that can impact your case outcome.',
    },

    testimonials: [
      {
        text: 'After my accident on I-485, Vasquez Law Firm got me $250,000. They handled everything while I focused on recovery.',
        author: 'James T.',
        location: 'Ballantyne',
        rating: 5,
      },
      {
        text: 'Hit by a drunk driver in Uptown. They got me full compensation plus punitive damages. True fighters for justice!',
        author: 'Sarah M.',
        location: 'NoDa',
        rating: 5,
      },
      {
        text: 'Fell at a Charlotte grocery store. They proved negligence and won my case. Highly recommend!',
        author: 'Robert L.',
        location: 'South Charlotte',
        rating: 5,
      },
    ],

    caseResults: [
      '$1.2 million settlement for family in I-77 truck accident',
      '$850,000 for construction worker injured in South End',
      '$500,000 slip and fall at major Charlotte retail store',
      '$2.5 million medical malpractice verdict at local hospital',
      '$750,000 motorcycle accident on Independence Boulevard',
    ],

    faqs: [
      {
        question: 'How much is my Charlotte injury case worth?',
        answer:
          "Case value depends on injury severity, medical costs, lost wages, and pain and suffering. We offer free case evaluations to assess your claim's potential value. Our Charlotte personal injury lawyers have recovered millions for clients with similar injuries.",
      },
      {
        question: 'How long do I have to file a personal injury lawsuit in Charlotte?',
        answer:
          'North Carolina has a 3-year statute of limitations for most personal injury cases. However, some cases have shorter deadlines. Contact us immediately to protect your rights - waiting too long could bar your recovery.',
      },
      {
        question: 'What if I was partially at fault for my Charlotte accident?',
        answer:
          "North Carolina follows contributory negligence rules - if you're even 1% at fault, you may be barred from recovery. However, we've successfully overcome this defense many times. Don't assume you have no case - let us evaluate it for free.",
      },
      {
        question: 'How much does a Charlotte personal injury lawyer cost?',
        answer:
          'We work on contingency - NO FEE unless we win your case. We advance all costs and only get paid from your settlement or verdict. Initial consultations are always free with no obligation.',
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
        sunday: 'Sunday: 24/7 for Emergencies',
      },
    },

    servingAreas: [
      'Uptown Charlotte',
      'South End',
      'NoDa',
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
      'Harrisburg',
      'Weddington',
      'Waxhaw',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8651648937!2d-80.8433!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzM3LjYiTiA4MMKwNTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: 'Why Hire a Charlotte Personal Injury Attorney?',
      content: `After an accident in Charlotte, you need a fighter in your corner. Insurance companies have teams of lawyers working to minimize your claim. Our Charlotte personal injury attorneys level the playing field with aggressive representation and proven results. We know Charlotte\'s roads, understand local insurance tactics, and have the resources to take on billion-dollar companies. With over $100 million recovered and a 99% client satisfaction rate, we\'re Charlotte\'s trusted choice for serious injury cases.`,
    },

    localChallenges: {
      title: 'Common Injury Accidents in Charlotte, NC',
      content: `Charlotte\'s rapid growth brings increased traffic and accident risks. I-77, I-85, and I-485 see daily crashes, while Independence Boulevard remains one of the deadliest roads in North Carolina. Construction zones throughout Uptown and South End create additional hazards. Our Charlotte injury lawyers understand these local danger zones and how they impact liability. Whether you\'re hurt in a South Boulevard pile-up or a University City intersection collision, we have the local knowledge to build a winning case.`,
    },
  };

  return (
    <>
      <ModernServiceLocationTemplate data={serviceLocationData} />

      {/* Local Business Schema */}
      <Script
        id="charlotte-personal-injury-attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/charlotte/personal-injury-attorney',
            name: 'Vasquez Law Firm - Charlotte Personal Injury Attorney',
            description:
              'Experienced Charlotte personal injury lawyers. Car accidents, truck crashes, slip & fall, wrongful death. No fee unless we win.',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/personal-injury-attorney',
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
            ],
            priceRange: 'No Fee Unless We Win',
            areaServed: [
              {
                '@type': 'City',
                name: 'Charlotte',
              },
              {
                '@type': 'AdministrativeArea',
                name: 'Mecklenburg County',
              },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Personal Injury Legal Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Car Accident Representation',
                    description: 'Legal representation for car accident victims in Charlotte',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Truck Accident Cases',
                    description: 'Commercial vehicle and truck accident injury claims',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Slip and Fall Claims',
                    description: 'Premises liability cases for slip and fall injuries',
                  },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '523',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="charlotte-personal-injury-faq-schema"
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
        id="charlotte-personal-injury-breadcrumb-schema"
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
                name: 'Personal Injury Attorney',
                item: 'https://www.vasquezlawfirm.com/locations/charlotte/personal-injury-attorney',
              },
            ],
          }),
        }}
      />
    </>
  );
}
