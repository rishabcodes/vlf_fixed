import { Metadata } from 'next';

import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
export const metadata: Metadata = {
  title: 'Charlotte Workers Comp Attorney - Workplace Injury Lawyers | Vasquez Law',
  description:
    'Injured at work in Charlotte? Get the benefits you deserve. Workers compensation lawyers fighting insurance companies. Free consultation. No fee unless we win.',
  keywords:
    'Charlotte workers comp attorney, Charlotte workers compensation lawyer, workplace injury lawyer Charlotte NC, work accident attorney Charlotte, workers comp benefits Charlotte, construction accident lawyer Charlotte, Charlotte work injury law firm',
  openGraph: {
    title: 'Charlotte Workers Comp Attorney - YO PELEO POR TI™ | Vasquez Law',
    description:
      "Hurt at work in Charlotte? We fight for your medical care, lost wages, and disability benefits. Don't let insurance companies deny your claim.",
    images: [{ url: '/images/offices/charlotte-workers-comp-attorney.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/charlotte/workers-comp-attorney',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Workers Comp Attorney - YO PELEO POR TI™',
    description:
      'Injured at work? We fight for your benefits. Free consultation. Se habla español.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/charlotte/workers-comp-attorney',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/charlotte/workers-comp-attorney',
      'es-US': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-compensacion-laboral',
    },
  },
};

export default function CharlotteWorkersCompAttorneyPage() {
  const serviceLocationData = {
    cityName: 'Charlotte',
    serviceName: "Workers' Compensation",
    heroTitle: 'Charlotte Workers Comp Attorney',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      "Injured at work in Charlotte? Don't let insurance companies deny your rightful benefits. We fight for your medical care, lost wages, and future. No upfront fees.",

    localStats: {
      stat1: { value: '1,500+', label: 'Charlotte Workers Helped' },
      stat2: { value: '$50M+', label: 'Benefits Recovered' },
      stat3: { value: '97%', label: 'Claims Approved' },
      stat4: { value: 'No Fee', label: 'Unless We Win' },
    },

    serviceDetails: {
      title: "Charlotte Workers' Compensation Services",
      description:
        "Complete representation for workplace injuries throughout Charlotte's diverse industries",
      services: [
        {
          name: 'Construction Injuries',
          description:
            'Falls, equipment accidents, electrocutions. We understand OSHA violations and third-party claims.',
          localInfo: 'Representing workers at major Charlotte construction sites and developments',
        },
        {
          name: 'Manufacturing & Warehouse',
          description:
            "Machine injuries, repetitive stress, back injuries from Charlotte's distribution centers.",
          localInfo: 'Experience with Amazon, FedEx, UPS, and Charlotte manufacturing facilities',
        },
        {
          name: 'Healthcare Worker Injuries',
          description:
            'Back injuries, needle sticks, workplace violence in hospitals and care facilities.',
          localInfo: 'Serving Atrium Health, Novant, and other Charlotte medical workers',
        },
        {
          name: 'Transportation & Delivery',
          description: 'Truck drivers, delivery workers, airport employees injured on the job.',
          localInfo: 'Helping Charlotte Douglas Airport and transportation workers',
        },
        {
          name: 'Office & Repetitive Stress',
          description:
            "Carpal tunnel, back problems, slip and falls in Charlotte's corporate offices.",
          localInfo: 'Representing workers from Bank of America, Wells Fargo, and other employers',
        },
        {
          name: 'Denied Claims Appeals',
          description:
            'Fighting wrongful denials, getting second opinions, appealing to the Industrial Commission.',
          localInfo: 'Regular appearances before North Carolina Industrial Commission',
        },
      ],
    },

    localExpertise: {
      title: 'Why Charlotte Workers Choose Us',
      points: [
        "Deep knowledge of Charlotte's major employers and insurers",
        'Relationships with occupational medicine doctors',
        'Understanding of NC Industrial Commission procedures',
        "Experience with Charlotte's dangerous industries",
        'Bilingual services for Hispanic construction workers',
        'Former insurance defense attorneys on our team',
      ],
    },

    courtInfo: {
      title: 'North Carolina Industrial Commission',
      name: 'NC Industrial Commission - Charlotte Office',
      address: '901 S. Kings Dr, Suite 104, Charlotte, NC 28204',
      phone: '(704) 376-6790',
      hours: 'Monday-Friday: 8:00 AM - 5:00 PM',
      parkingInfo: 'Free parking available on-site',
      additionalInfo:
        'We regularly appear before Deputy Commissioners in Charlotte and know the local procedures that can make or break your case. Our office handles mediations and hearings throughout the region.',
    },

    testimonials: [
      {
        text: 'Fell from scaffolding at a South End construction site. They got all my surgeries covered plus disability benefits. True advocates!',
        author: 'Juan M.',
        location: 'East Charlotte',
        rating: 5,
      },
      {
        text: "Hurt my back at the Amazon warehouse. Insurance denied everything until Vasquez Law got involved. Now I'm getting proper treatment.",
        author: 'Tamika W.',
        location: 'West Charlotte',
        rating: 5,
      },
      {
        text: 'Repetitive stress injury from 20 years at the bank. They proved my case and got me a great settlement. Highly recommend!',
        author: 'Patricia S.',
        location: 'Uptown',
        rating: 5,
      },
    ],

    caseResults: [
      '$450,000 settlement for construction worker paralyzed in fall',
      '$275,000 for warehouse worker with crushed foot',
      '$180,000 for nurse with permanent back injury',
      '$350,000 for truck driver in loading dock accident',
      'Lifetime medical benefits for manufacturing worker',
    ],

    faqs: [
      {
        question: 'What should I do after a Charlotte workplace injury?',
        answer:
          'Report it immediately to your supervisor IN WRITING. Seek medical treatment right away - you have the right to see your own doctor after the first visit. Document everything: take photos, get witness info, keep all paperwork. Then call us for free guidance on protecting your rights.',
      },
      {
        question: "Can I be fired for filing workers' comp in Charlotte?",
        answer:
          "It's illegal for employers to retaliate against you for filing a legitimate workers' comp claim. However, they may try other tactics. We protect you from retaliation and can file additional claims if your employer violates the law. Don't let fear stop you from getting benefits you've earned.",
      },
      {
        question: "What benefits can I get through NC workers' comp?",
        answer:
          "You're entitled to: (1) All medical treatment related to your injury, (2) Two-thirds of your average weekly wage while unable to work, (3) Permanent disability benefits if applicable, (4) Vocational rehabilitation if you can't return to your job. We fight for maximum benefits in each category.",
      },
      {
        question: "How long do I have to file a workers' comp claim in Charlotte?",
        answer:
          'You must report the injury within 30 days and file a claim within 2 years. However, some exceptions apply. The sooner you act, the stronger your case. Insurance companies use delays against you. Call us immediately for free advice on deadlines specific to your situation.',
      },
    ],

    officeInfo: {
      name: "Charlotte Workers' Comp Office",
      street: '5701 Executive Center Dr, Suite 103',
      city: 'Charlotte',
      state: 'NC',
      zip: '28212',
      phone: '1-844-YO-PELEO',
      localPhone: '(704) 500-2009',
      email: 'workcomp@vasquezlawfirm.com',
      hours: {
        weekdays: 'Monday-Friday: 8:00 AM - 5:00 PM',
        saturday: 'Saturday: By Appointment',
        sunday: 'Sunday: Emergency Consultations',
      },
    },

    servingAreas: [
      'Uptown Charlotte',
      'South End',
      'NoDa',
      'University Research Park',
      'Charlotte Douglas Airport',
      'Steele Creek Industrial',
      'North Charlotte Industrial',
      'Matthews',
      'Mint Hill',
      'Pineville',
      'Huntersville Business Park',
      'Concord Mills Area',
      'Monroe Industrial',
      'Gastonia',
      'Rock Hill, SC',
      'Fort Mill, SC',
      'All Charlotte Hospitals',
      'All Charlotte Construction Sites',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8651648937!2d-80.8433!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzM3LjYiTiA4MMKwNTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: "Why Hire a Charlotte Workers' Comp Attorney?",
      content: `Workers' compensation insurance companies have one goal: pay you as little as possible. They employ teams of adjusters, nurses, and lawyers to deny or minimize your benefits. Charlotte's booming construction, logistics, and healthcare industries see thousands of workplace injuries annually. Without experienced legal representation, you're at the mercy of insurance companies who don't care about your recovery or future. Our Charlotte workers' comp attorneys level the playing field, forcing insurers to pay for proper medical care, lost wages, and permanent disability benefits you deserve.`,
    },

    localChallenges: {
      title: 'Common Workplace Injuries in Charlotte, NC',
      content: `Charlotte\'s diverse economy creates unique workplace hazards. Construction workers building Charlotte\'s skyline face fall risks daily. Warehouse workers at the airport and distribution centers suffer back injuries and equipment accidents. Healthcare workers at Atrium and Novant face violence and lifting injuries. Office workers in Uptown develop carpal tunnel and repetitive stress injuries. Our Charlotte work injury lawyers understand these industry-specific risks and know how to prove your claim, whether you\'re hurt on a construction site or in a corporate office.`,
    },
  };

  return (
    <>
      <ModernServiceLocationTemplate data={serviceLocationData} />

      {/* Local Business Schema */}
      <Script
        id="charlotte-workers-comp-attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/charlotte/workers-comp-attorney',
            name: 'Vasquez Law Firm - Charlotte Workers Comp Attorney',
            description:
              'Charlotte workers compensation lawyers fighting for injured workers. Construction, warehouse, healthcare injuries. No fee unless we win.',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/workers-comp-attorney',
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
              name: 'Workers Compensation Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Construction Injury Claims',
                    description: 'Workers comp for construction site accidents',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Warehouse Injury Claims',
                    description: 'Workers comp for warehouse and distribution center injuries',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Denied Claims Appeals',
                    description: 'Fighting wrongful workers comp denials',
                  },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '389',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="charlotte-workers-comp-faq-schema"
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
        id="charlotte-workers-comp-breadcrumb-schema"
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
                name: 'Workers Comp Attorney',
                item: 'https://www.vasquezlawfirm.com/locations/charlotte/workers-comp-attorney',
              },
            ],
          }),
        }}
      />
    </>
  );
}
