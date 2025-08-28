import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { GreenCardsClient } from './GreenCardsClient';
import { Shield, Award, Clock, Users, Globe, Briefcase, Heart, Star } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Green Card Attorney NC | Permanent Residency & Adjustment of Status',
  description:
    "Get your green card with NC's trusted immigration attorneys. Employment-based, family-based, adjustment of status, consular processing. 95% approval rate. Fast EAD/AP. Free consultation: 1-844-YO-PELEO",
  keywords:
    'green card lawyer NC, permanent residency attorney, adjustment of status, I-485 application, employment green card, family green card, EB1 EB2 EB3, consular processing, work permit EAD, advance parole NC',
  openGraph: {
    title: 'Green Card Attorney NC | Permanent Residency & Adjustment of Status',
    description:
      "Get your green card with NC's trusted immigration attorneys. Employment & family-based options, adjustment of status. 95% approval rate.",
    url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative/green-cards',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/green-card-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Green Card Services - Your Path to Permanent Residency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green Card Attorney NC | Expert Permanent Residency Services',
    description:
      'Secure your green card through family or employment. Expert guidance for adjustment of status and consular processing. 95% approval rate.',
    images: ['/images/practice-areas/green-card-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative/green-cards',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative/green-cards',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/inmigracion/afirmativa/tarjetas-verdes',
    },
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function GreenCardsPage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'green-cards',
    service: 'immigration',
  };

  const services = [
    {
      title: 'Family-Based Green Cards',
      description:
        'Secure permanent residency through family relationships. We handle immediate relative and family preference categories with expertise.',
      features: [
        'Spouse, parent, and child petitions',
        'Family preference categories (F1-F4)',
        'Adjustment of status (I-485)',
        'Consular processing abroad',
        'Work permits while waiting',
        'Waiver applications if needed',
      ],
    },
    {
      title: 'Employment-Based Green Cards',
      description:
        'Navigate complex employment immigration pathways. From extraordinary ability to skilled workers, we maximize your approval chances.',
      features: [
        'EB-1: Extraordinary ability/executives',
        'EB-2: Advanced degrees/exceptional ability',
        'EB-3: Skilled workers/professionals',
        'PERM labor certification',
        'National Interest Waiver (NIW)',
        'Physician National Interest Waiver',
      ],
    },
    {
      title: 'Adjustment of Status',
      description:
        'Get your green card without leaving the U.S. Strategic planning to maintain legal status throughout the process.',
      features: [
        'I-485 application preparation',
        'Concurrent filing strategies',
        'Work permit (EAD) applications',
        'Travel document (AP) processing',
        'Interview preparation and coaching',
        'RFE response assistance',
      ],
    },
    {
      title: 'Consular Processing',
      description:
        'Expert guidance for green card interviews at U.S. embassies worldwide. We prepare you for success from start to finish.',
      features: [
        'National Visa Center navigation',
        'DS-260 application assistance',
        'Document collection and translation',
        'Affidavit of Support preparation',
        'Embassy interview coaching',
        'Administrative processing support',
      ],
    },
    {
      title: 'Special Immigration Programs',
      description:
        'Explore unique pathways to permanent residency through special programs and humanitarian protections.',
      features: [
        'Diversity Visa (DV lottery) winners',
        'Asylum/refugee adjustment',
        'VAWA self-petitions',
        'U visa holders (crime victims)',
        'T visa holders (trafficking victims)',
        'Special Immigrant Juvenile Status',
      ],
    },
    {
      title: 'Green Card Renewal & Issues',
      description:
        "Maintain your permanent resident status and resolve complications. Don't risk losing your green card.",
      features: [
        'Green card renewal (I-90)',
        'Replace lost/stolen cards',
        'Remove conditions (I-751)',
        'Reentry permits for travel',
        'Abandonment prevention',
        'Citizenship eligibility assessment',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to get a green card?',
      answer:
        'Processing times vary greatly by category. Immediate relatives typically wait 12-18 months. Employment-based can take 1-3 years. Some family preference categories have 5-20 year waits. We provide realistic timelines based on your specific situation.',
    },
    {
      question: 'Can I work while waiting for my green card?',
      answer:
        'Yes! Most adjustment of status applicants can apply for a work permit (EAD) which typically arrives in 3-5 months. This allows unrestricted employment while your green card processes.',
    },
    {
      question: "What's the difference between adjustment of status and consular processing?",
      answer:
        'Adjustment of status allows you to get your green card while remaining in the U.S. Consular processing requires attending an interview at a U.S. embassy abroad. The best option depends on your current status and location.',
    },
    {
      question: 'Can I travel while my green card application is pending?',
      answer:
        'With advance parole (travel document), yes. However, leaving without it can abandon your application. Some visa holders can travel on their existing status. We carefully advise on safe travel options.',
    },
    {
      question: 'What if I have a criminal record or immigration violations?',
      answer:
        "Don't give up. Many issues can be overcome with proper legal strategy, waivers, or alternative pathways. We've successfully handled cases others said were impossible. Every situation deserves expert analysis.",
    },
    {
      question: 'How much does the green card process cost?',
      answer:
        'Government fees range from $1,225-$3,005 depending on the category. Attorney fees vary by complexity. We offer transparent flat fees and payment plans. The investment in professional help pays off with higher approval rates.',
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          'green-cards': 'Green Cards',
          affirmative: 'Affirmative Immigration',
          immigration: 'Immigration Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="Green Card & Permanent Residency Services"
        subtitle="Your Trusted Path to Permanent Residency in America"
        description="North Carolina's leading green card attorneys with a 95% approval rate. Whether through family, employment, or special programs, we navigate every pathway to permanent residency. From I-485 applications to consular processing, we're with you every step. Serving all 100 NC counties."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            <InternalLinkingSection
              currentPage={currentPage}
              variant="inline"
              maxLinks={5}

                className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-primary/20"
            />

            {/* Green Card Categories Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-primary">
                Green Card Categories & Processing Times
              </h2>

              {/* Family-Based Categories */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-green-400 flex items-center">
                  <Heart className="mr-2 h-6 w-6" />
                  Family-Based Green Cards
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      category: 'Immediate Relatives',
                      time: '12-18 months',
                      desc: 'Spouses, parents, children under 21 of U.S. citizens',
                    },
                    {
                      category: 'F1 - Unmarried Adult Children',
                      time: '7-8 years',
                      desc: 'Unmarried sons/daughters 21+ of citizens',
                    },
                    {
                      category: 'F2A - Spouses/Children of LPRs',
                      time: '2-3 years',
                      desc: 'Spouses and children under 21 of green card holders',
                    },
                    {
                      category: 'F2B - Unmarried Adult Children of LPRs',
                      time: '7-8 years',
                      desc: 'Unmarried sons/daughters 21+ of LPRs',
                    },
                    {
                      category: 'F3 - Married Children',
                      time: '12-13 years',
                      desc: 'Married children of U.S. citizens',
                    },
                    {
                      category: 'F4 - Siblings',
                      time: '13-23 years',
                      desc: 'Brothers/sisters of adult U.S. citizens',
                    },
                  ].map((cat, index) => (
                    <div
                      key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-green-500/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4
                className="font-bold text-green-400">{cat.category}</h4>
                        <span className="text-xs bg-green-500/20 px-2 py-1 rounded">
                          {cat.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employment-Based Categories */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
                  <Briefcase className="mr-2 h-6 w-6" />
                  Employment-Based Green Cards
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      category: 'EB-1',
                      time: '8-16 months',
                      desc: 'Extraordinary ability, executives, researchers',
                    },
                    {
                      category: 'EB-2',
                      time: '1-3 years*',
                      desc: 'Advanced degrees, exceptional ability, NIW',
                    },
                    {
                      category: 'EB-3',
                      time: '2-4 years*',
                      desc: 'Skilled workers, professionals, other workers',
                    },
                    {
                      category: 'EB-4',
                      time: '6-12 months',
                      desc: 'Special immigrants, religious workers',
                    },
                    { category: 'EB-5', time: '2-3 years', desc: 'Investors creating jobs' },
                  ].map((cat, index) => (
                    <div
                      key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4
                className="font-bold text-blue-400">{cat.category}</h4>
                        <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">{cat.time}</span>
                      </div>
                      <p className="text-sm text-gray-400">{cat.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Country of birth affects wait times, especially for India/China
                </p>
              </div>
            </section>

            {/* Process Comparison */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Adjustment of Status vs. Consular Processing
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                    <Shield className="mr-2 h-6 w-6" />
                    Adjustment of Status (In U.S.)
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Stay in U.S. during processing
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Get work permit in 3-5 months
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Travel with advance parole
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Interview at local USCIS office
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">!</span>
                      Must maintain legal status
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-900/20 to-orange-700/20 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
                    <Globe className="mr-2 h-6 w-6" />
                    Consular Processing (Abroad)
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      No U.S. status required
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Can process from any country
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      Often faster for some categories
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">!</span>
                      Must travel for interview
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">!</span>
                      Cannot work in U.S. while waiting
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Timeline Visualization */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Typical Green Card Timeline</h2>
              <div className="space-y-4">
                {[
                  {
                    phase: 'Petition Filing',
                    time: 'Month 1',
                    desc: 'I-130/I-140 filed with USCIS',
                    icon: '📄',
                  },
                  {
                    phase: 'Initial Approval',
                    time: 'Months 6-12',
                    desc: 'Petition approved by USCIS',
                    icon: '✅',
                  },
                  {
                    phase: 'Priority Date',
                    time: 'Varies',
                    desc: 'Wait for visa availability (if required)',
                    icon: '📅',
                  },
                  {
                    phase: 'Application',
                    time: 'When current',
                    desc: 'File I-485 or DS-260',
                    icon: '📋',
                  },
                  {
                    phase: 'Biometrics',
                    time: '1-2 months later',
                    desc: 'Fingerprints and background check',
                    icon: '🖐️',
                  },
                  {
                    phase: 'EAD/AP',
                    time: '3-5 months',
                    desc: 'Work permit and travel document',
                    icon: '💳',
                  },
                  {
                    phase: 'Interview',
                    time: '8-14 months',
                    desc: 'Final interview at USCIS/embassy',
                    icon: '🎤',
                  },
                  {
                    phase: 'Approval',
                    time: '2-4 weeks',
                    desc: 'Green card arrives by mail',
                    icon: '🎉',
                  },
                ].map((phase, index) => (
                  <div key={index}

                className="flex items-center">
                    <div
                className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                      {phase.icon}
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold">{phase.phase}</h3>
                        <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {phase.time}
                        </span>
                      </div>
                      <p className="text-gray-400 mt-1">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits of Having a Green Card */}
            <section className="bg-gradient-to-r from-green-900/20 to-green-700/20 backdrop-blur-sm rounded-lg p-8 border border-green-500/30">
              <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
                Benefits of Permanent Residency
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    benefit: 'Live Permanently',
                    desc: 'Reside anywhere in the U.S. without visa restrictions',
                    icon: '🏠',
                  },
                  {
                    benefit: 'Work Freedom',
                    desc: 'Work for any employer or start your own business',
                    icon: '💼',
                  },
                  {
                    benefit: 'Travel Freely',
                    desc: 'Come and go from the U.S. with reentry rights',
                    icon: '✈️',
                  },
                  {
                    benefit: 'Sponsor Family',
                    desc: 'Petition for spouse and unmarried children',
                    icon: '👨‍👩‍👧‍👦',
                  },
                  {
                    benefit: 'Path to Citizenship',
                    desc: 'Apply for naturalization after 3-5 years',
                    icon: '🇺🇸',
                  },
                  {
                    benefit: 'Benefits Access',
                    desc: 'Eligible for many government benefits',
                    icon: '🏛️',
                  },
                ].map((item, index) => (
                  <div key={index}

                className="text-center">
                    <div
                className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold mb-2 text-green-400">{item.benefit}</h3>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Success Metrics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-center text-primary">
                Our Green Card Success Record
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/30">
                  <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <p className="text-gray-300">Approval Rate</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/30">
                  <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <p className="text-gray-300">Green Cards Secured</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/30">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">3-5mo</div>
                  <p className="text-gray-300">Average EAD Time</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/30">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <p className="text-gray-300">Client Satisfaction</p>
                </div>
              </div>
            </section>

            {/* Common Obstacles */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Overcoming Common Green Card Obstacles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    obstacle: 'Unlawful Presence',
                    solution:
                      'We prepare strong I-601/I-601A waivers showing extreme hardship to qualifying relatives',
                  },
                  {
                    obstacle: 'Criminal History',
                    solution:
                      'Strategic case presentation and rehabilitation evidence to overcome admissibility issues',
                  },
                  {
                    obstacle: 'Public Charge',
                    solution:
                      'Comprehensive financial packages with affidavits of support and asset documentation',
                  },
                  {
                    obstacle: 'Prior Denials',
                    solution:
                      'Analyze denial reasons and build stronger cases addressing all concerns',
                  },
                ].map((item, index) => (
                  <div
                    key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30"
                  >
                    <h3
                className="text-xl font-bold text-red-400 mb-3">{item.obstacle}</h3>
                    <p className="text-gray-300">{item.solution}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary/20 to-primary-dark/20 backdrop-blur-sm rounded-lg p-8 border border-primary/30">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Start Your Green Card Journey Today
              </h2>
              <p className="text-lg text-center mb-6 max-w-2xl mx-auto">
                Don't navigate the complex green card process alone. With our 95% approval rate and
                comprehensive support, your American dream is within reach.
              </p>
              <GreenCardsClient />
            </section>

            <InternalLinkingSection
              currentPage={currentPage}
              variant="related"
              maxLinks={6}

                className="mt-12 pt-12 border-t border-gray-800"
            />
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="green-cards-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Green Card & Permanent Residency Services - Vasquez Law Firm',
            description:
              'Expert green card and permanent residency services including family-based, employment-based, adjustment of status, and consular processing. 95% approval rate.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Green Card Immigration Services',
            knowsAbout: [
              'Green Card Applications',
              'Permanent Residency',
              'Adjustment of Status',
              'Consular Processing',
              'Employment-Based Green Cards',
              'Family-Based Green Cards',
              'I-485 Applications',
              'Work Permits (EAD)',
              'Advance Parole',
              'Green Card Renewal',
            ],
          }),
        }}
      />
    </>
  );
}
