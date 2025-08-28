import { Metadata } from 'next';

import Script from 'next/script';
import ModernServiceLocationTemplate from '@/components/templates/ModernServiceLocationTemplate';
export const metadata: Metadata = {
  title: 'Charlotte Defensa Criminal Abogado - DWI, Drug Charges & More | Vasquez Law',
  description:
    'Aggressive Charlotte criminal defense attorneys. DWI/DUI, drug crimes, assault, theft charges. Former prosecutors fighting for you. 24/7 availability. Free consultation.',
  keywords:
    'Charlotte criminal defense lawyer, Charlotte criminal defense attorney, DWI lawyer Charlotte NC, drug charge attorney Charlotte, assault lawyer Charlotte, theft attorney Charlotte, Charlotte criminal law firm, best criminal lawyer Charlotte',
  openGraph: {
    title: 'Charlotte Defensa Criminal Abogado - YO PELEO POR TI™ | Vasquez Law',
    description:
      'Facing criminal charges in Charlotte? Former prosecutors now defending your freedom. Available 24/7. Aggressive defense for all criminal charges.',
    images: [{ url: '/images/offices/charlotte-criminal-defense-lawyer.jpg' }],
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vasquezlawfirm.com/locations/charlotte/criminal-defense-lawyer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Defensa Criminal Abogado - YO PELEO POR TI™',
    description:
      'Arrested in Charlotte? We fight for your freedom. 24/7 availability. Free consultation.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/locations/charlotte/criminal-defense-lawyer',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/locations/charlotte/criminal-defense-lawyer',
      'es-US': 'https://www.vasquezlawfirm.com/locations/charlotte/abogado-defensa-criminal',
    },
  },
};

export default function CharlotteCriminalDefenseAbogadoPage() {
  const serviceLocationData = {
    cityName: 'Charlotte',
    serviceName: 'Defensa Criminal',
    heroTitle: 'Charlotte Defensa Criminal Abogado',
    heroSubtitle: 'YO PELEO POR TI™',
    heroDescription:
      "Arrested in Charlotte? Don't face the system alone. Former prosecutors now fighting for YOUR freedom. Available 24/7. Military discipline meets courtroom excellence.",

    localStats: {
      stat1: { value: '2,000+', label: 'Charlotte Cases Defended' },
      stat2: { value: '24/7', label: 'Emergency Response' },
      stat3: { value: '95%', label: 'Charges Reduced/Dismissed' },
      stat4: { value: '15+', label: 'Years Experience' },
    },

    serviceDetails: {
      title: 'Charlotte Defensa Criminal Services',
      description: 'Aggressive defense for all criminal charges in Mecklenburg County courts',
      services: [
        {
          name: 'DWI/DUI Defense',
          description:
            'Challenging breathalyzers, field sobriety tests, and traffic stops. Protecting your license and freedom.',
          localInfo: 'Expert knowledge of CMPD DWI checkpoints and procedures',
        },
        {
          name: 'Drug Crime Defense',
          description:
            'Possession, trafficking, manufacturing charges. We challenge searches and protect your rights.',
          localInfo: 'Familiar with Charlotte drug enforcement tactics and local court attitudes',
        },
        {
          name: 'Assault & Violent Crimes',
          description:
            'Defending assault, battery, domestic violence charges. We fight for self-defense and dismissals.',
          localInfo: 'Regular practice in Mecklenburg County violent crime courts',
        },
        {
          name: 'Theft & Property Crimes',
          description:
            'Shoplifting, larceny, burglary, robbery charges. Protecting your record and future.',
          localInfo: 'Relationships with local prosecutors for favorable plea negotiations',
        },
        {
          name: 'Traffic Violations',
          description:
            'Speeding, reckless driving, license issues. Keep your record clean and insurance low.',
          localInfo: 'Knowledge of Charlotte traffic court procedures and officers',
        },
        {
          name: 'Federal Crimes',
          description:
            'White collar, conspiracy, federal drug charges. Experience in Western District of NC.',
          localInfo: 'Regular practice in Charlotte federal courthouse',
        },
      ],
    },

    localExpertise: {
      title: 'Why Charlotte Chooses Our Defensa Criminal Team',
      points: [
        'Former prosecutors who know how the other side thinks',
        'Regular practice in all Mecklenburg County criminal courts',
        'Relationships with local judges and prosecutors',
        'Understanding of CMPD arrest procedures and tactics',
        '24/7 availability for arrests and emergencies',
        "Bilingual defense for Charlotte's Hispanic community",
      ],
    },

    courtInfo: {
      title: 'Mecklenburg County Criminal Courts',
      name: 'Mecklenburg County Courthouse',
      address: '832 E 4th St, Charlotte, NC 28202',
      phone: '(704) 686-0700',
      hours: 'Monday-Friday: 8:00 AM - 5:00 PM',
      parkingInfo: 'Multiple parking decks nearby, arrive early for court',
      additionalInfo:
        'We appear daily in Charlotte criminal courts. Our familiarity with local judges, prosecutors, and procedures gives our clients a significant advantage in their defense.',
    },

    testimonials: [
      {
        text: 'Arrested for DWI in Uptown. They got it completely dismissed! Saved my career and license. Forever grateful!',
        author: 'Michael R.',
        location: 'South Park',
        rating: 5,
      },
      {
        text: 'Facing serious drug charges. They found problems with the search and got everything thrown out. True fighters!',
        author: 'Jessica L.',
        location: 'University City',
        rating: 5,
      },
      {
        text: 'Wrongly accused of assault. They proved my innocence and cleared my name. Best lawyers in Charlotte!',
        author: 'David K.',
        location: 'NoDa',
        rating: 5,
      },
    ],

    caseResults: [
      'DWI reduced to improper equipment - no conviction',
      'Drug trafficking charges dismissed - illegal search',
      'Assault charges dropped - self-defense proven',
      'Federal fraud case - probation instead of prison',
      'Multiple felonies reduced to misdemeanors',
    ],

    faqs: [
      {
        question: 'What should I do if arrested in Charlotte?',
        answer:
          'Stay silent! Don\'t answer questions without a lawyer. Be polite but firm: "I want my attorney." Call us immediately at 1-844-YO-PELEO. We\'re available 24/7 and can often get to the jail quickly to protect your rights.',
      },
      {
        question: 'How much does a Charlotte criminal defense lawyer cost?',
        answer:
          "We offer flat fees for most cases with payment plans available. Costs vary by charge severity and complexity. Initial consultations are always free. Don't let cost concerns prevent you from getting quality defense - your freedom is priceless.",
      },
      {
        question: 'Can you get my Charlotte charges dismissed?',
        answer:
          'Every case is different, but we have a 95% success rate in reducing or dismissing charges. We examine every detail - was the stop legal? Was evidence properly handled? Were your rights violated? We find ways to win.',
      },
      {
        question: 'Do I need a lawyer for Charlotte traffic court?',
        answer:
          'Yes! Even "minor" violations can impact your license, insurance, and CDL. We often get tickets dismissed or reduced to non-moving violations. The cost of representation is usually less than increased insurance premiums.',
      },
    ],

    officeInfo: {
      name: 'Charlotte Defensa Criminal Office',
      street: '5701 Executive Center Dr, Suite 103',
      city: 'Charlotte',
      state: 'NC',
      zip: '28212',
      phone: '1-844-YO-PELEO',
      localPhone: '(704) 500-2009',
      email: 'defense@vasquezlawfirm.com',
      hours: {
        weekdays: 'Monday-Friday: 8:00 AM - 5:00 PM',
        saturday: 'Saturday: By Appointment',
        sunday: 'Sunday: 24/7 Emergency Line',
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
      'All Mecklenburg County Jails',
      'Federal Detention Center',
    ],

    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8651648937!2d-80.8433!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEzJzM3LjYiTiA4MMKwNTAnMzUuOSJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus',

    // SEO-optimized content sections
    whyHireUs: {
      title: 'Why You Need a Charlotte Defensa Criminal Abogado',
      content: `Facing criminal charges in Charlotte is terrifying. Your freedom, career, and reputation are at stake. The Mecklenburg County District Abogado\'s office has unlimited resources to prosecute you. You need an equally aggressive defense. Our Charlotte criminal defense lawyers are former prosecutors who know their playbook. We\'ve defended over 2,000 Charlotte residents, achieving dismissals, acquittals, and reduced charges. Don\'t gamble with your future - get proven defenders who know Charlotte\'s courts inside and out.`,
    },

    localChallenges: {
      title: 'Charlotte Criminal Justice System Overview',
      content: `Charlotte-Mecklenburg Police Department makes over 40,000 arrests annually. The Mecklenburg County court system is one of North Carolina\'s busiest, with aggressive prosecution policies. DWI checkpoints are common on Independence, South Boulevard, and Providence Road. Drug enforcement focuses on I-77 and I-85 corridors. Our Charlotte criminal lawyers understand these local enforcement patterns and use this knowledge to build stronger defenses. Whether arrested in Uptown entertainment districts or suburban neighborhoods, we know how to navigate Charlotte\'s unique criminal justice landscape.`,
    },
  };

  return (
    <>
      <ModernServiceLocationTemplate data={serviceLocationData} />

      {/* Local Business Schema */}
      <Script
        id="charlotte-criminal-defense-lawyer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            '@id': 'https://www.vasquezlawfirm.com/locations/charlotte/criminal-defense-lawyer',
            name: 'Vasquez Law Firm - Charlotte Defensa Criminal Abogado',
            description:
              'Aggressive Charlotte criminal defense attorneys. DWI/DUI, drug crimes, assault, theft charges. Former prosecutors fighting for you.',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/criminal-defense-lawyer',
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
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '00:00',
                closes: '23:59',
                description: '24/7 Emergency Line',
              },
            ],
            priceRange: '$$',
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
              name: 'Defensa Criminal Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'DWI/DUI Defense',
                    description: 'Defense against drunk driving charges in Charlotte',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Drug Crime Defense',
                    description: 'Defense for drug possession and trafficking charges',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Assault Defense',
                    description: 'Defense against assault and violent crime charges',
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
        id="charlotte-criminal-attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Abogado',
            name: 'Defensa Criminal Team',
            url: 'https://www.vasquezlawfirm.com/locations/charlotte/criminal-defense-lawyer',
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
              'Defensa Criminal',
              'DWI Defense',
              'Drug Crimes',
              'Assault Defense',
              'Federal Crimes',
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="charlotte-criminal-defense-faq-schema"
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
