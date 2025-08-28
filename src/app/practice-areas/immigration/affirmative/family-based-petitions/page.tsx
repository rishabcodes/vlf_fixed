import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { FamilyBasedPetitionsClient } from './FamilyBasedPetitionsClient';
import { Users, Clock, Shield, Award, Heart, Globe, FileText, CheckCircle } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Family Immigration Lawyer NC | Family-Based Petitions & Green Cards',
  description:
    "Unite with loved ones through NC's top family immigration attorneys. I-130 petitions, K-1 fiancé visas, spouse green cards, parent & sibling petitions. 95% approval rate. Free consultation: 1-844-YO-PELEO",
  keywords:
    'family immigration lawyer NC, family petition attorney, I-130 petition, spouse visa NC, K1 fiancé visa, parent petition, sibling immigration, family green card lawyer, immediate relative petition, family preference visa NC',
  openGraph: {
    title: 'Family Immigration Lawyer NC | Family-Based Petitions & Green Cards',
    description:
      "Unite with loved ones through NC's top family immigration attorneys. I-130 petitions, K-1 fiancé visas, spouse green cards. 95% approval rate.",
    url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative/family-based-petitions',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/family-immigration-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Immigration Services - Reuniting Families Across Borders',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Immigration Lawyer NC | Expert Family Petition Services',
    description:
      'Unite with your loved ones through expert family immigration services. I-130 petitions, K-1 visas, and family green cards. 95% approval rate.',
    images: ['/images/practice-areas/family-immigration-hero.jpg'],
  },
  alternates: {
    canonical:
      'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative/family-based-petitions',
    languages: {
      'en-US':
        'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative/family-based-petitions',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/inmigracion/afirmativa/peticiones-familiares',
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

export default function FamilyBasedPetitionsPage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'family-based-petitions',
    service: 'immigration',
  };

  const services = [
    {
      title: 'Immediate Relative Petitions',
      description:
        'Fast-track family reunification for spouses, parents, and unmarried children under 21 of U.S. citizens. No annual limits or wait times.',
      features: [
        'Spouse petitions (marriage-based green cards)',
        'Parent petitions (for citizens 21+)',
        'Child petitions (under 21, unmarried)',
        'Stepchildren and adoptive relationships',
        'Same-sex marriage petitions',
        'Priority processing available',
      ],
    },
    {
      title: 'Family Preference Categories',
      description:
        'Navigate complex preference categories for extended family members. We manage your case through visa availability and priority dates.',
      features: [
        'F1: Adult children of U.S. citizens',
        'F2A: Spouses/children of green card holders',
        'F2B: Adult children of green card holders',
        'F3: Married children of U.S. citizens',
        'F4: Siblings of U.S. citizens',
        'Priority date monitoring',
      ],
    },
    {
      title: 'K-1 Fiancé(e) Visas',
      description:
        'Bring your fiancé(e) to the U.S. for marriage. Comprehensive support from petition through green card after marriage.',
      features: [
        'I-129F petition preparation',
        'Relationship evidence compilation',
        'Embassy interview preparation',
        'K-2 visas for children',
        '90-day entry and marriage timeline',
        'Adjustment of status after marriage',
      ],
    },
    {
      title: 'Consular Processing',
      description:
        'Expert guidance through embassy interviews and visa processing for family members abroad. We prepare you for success.',
      features: [
        'National Visa Center (NVC) navigation',
        'Document collection and translation',
        'Affidavit of Support (I-864) preparation',
        'Embassy interview coaching',
        'Administrative processing support',
        'Visa denial appeals',
      ],
    },
    {
      title: 'Adjustment of Status',
      description:
        'Help family members already in the U.S. obtain green cards without leaving. Strategic planning for maintaining legal status.',
      features: [
        'I-485 application preparation',
        'Work permit (EAD) applications',
        'Travel document (AP) processing',
        'Interview preparation',
        'RFE response assistance',
        'Status violation solutions',
      ],
    },
    {
      title: 'Complex Family Cases',
      description:
        'Solutions for challenging situations including prior denials, inadmissibility issues, and complicated family structures.',
      features: [
        'Waiver applications (I-601/I-601A)',
        'Prior removal/deportation cases',
        'Unlawful presence forgiveness',
        'Adam Walsh Act issues',
        'Adoption-based petitions',
        'DNA testing coordination',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the family petition process take?',
      answer:
        'Processing times vary significantly. Immediate relatives of U.S. citizens typically wait 12-18 months. Family preference categories can take 2-23 years depending on the category and country. We provide realistic timelines during your consultation.',
    },
    {
      question: 'Can I petition for multiple family members?',
      answer:
        'Yes! U.S. citizens and green card holders can file separate petitions for each eligible family member. Each petition requires its own application and fees. We offer package deals for multiple family petitions.',
    },
    {
      question: 'What if my family member entered illegally?',
      answer:
        "Illegal entry doesn't always prevent family immigration. Options may include waivers, consular processing, or adjustment through special programs. We analyze each case individually to find the best solution.",
    },
    {
      question: 'Can same-sex couples petition for immigration benefits?',
      answer:
        'Absolutely. Same-sex marriages are fully recognized for immigration purposes. We have extensive experience helping LGBTQ+ families navigate the immigration process with dignity and respect.',
    },
    {
      question: 'What happens if my petition is denied?',
      answer:
        "Don't lose hope. Denials can often be overcome through appeals, motions to reopen, or refiling with additional evidence. We analyze denial reasons and develop strategies to succeed on the next attempt.",
    },
    {
      question: 'Do I need a lawyer for family petitions?',
      answer:
        "While not required, having an experienced attorney significantly increases approval chances and prevents costly mistakes. We've seen too many families separated due to DIY errors. Our 95% approval rate speaks for itself.",
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          'family-based-petitions': 'Family-Based Petitions',
          affirmative: 'Affirmative Immigration',
          immigration: 'Immigration Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="Family-Based Immigration Petitions"
        subtitle="Reuniting Families Across Borders Since 2005"
        description="North Carolina's premier family immigration law firm with over 10,000 families reunited. From spouse visas to sibling petitions, we navigate every path to bring your loved ones home. Serving all 100 NC counties with bilingual support and a 95% approval rate."
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

            {/* Who Can You Petition Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-primary">Who Can You Petition For?</h2>

              {/* Immediate Relatives */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-green-400 flex items-center">
                  <CheckCircle className="mr-2 h-6 w-6" />
                  Immediate Relatives (No Wait Times)
                </h3>
                <p className="text-gray-300 mb-4">
                  U.S. citizens can petition for immediate relatives without annual limits:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-green-500/30 text-center">
                    <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-bold mb-1">Spouses</h4>
                    <p className="text-sm text-gray-400">Valid marriages worldwide</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-green-500/30 text-center">
                    <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-bold mb-1">Parents</h4>
                    <p className="text-sm text-gray-400">If you're 21 or older</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-green-500/30 text-center">
                    <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-bold mb-1">Children Under 21</h4>
                    <p className="text-sm text-gray-400">Unmarried biological/adopted</p>
                  </div>
                </div>
              </div>

              {/* Family Preference */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
                  <Clock className="mr-2 h-6 w-6" />
                  Family Preference Categories (Subject to Wait Times)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      code: 'F1',
                      title: 'Adult Children of Citizens',
                      desc: 'Unmarried sons/daughters 21+',
                      wait: '7-8 years',
                    },
                    {
                      code: 'F2A',
                      title: 'Spouses/Children of LPRs',
                      desc: 'Spouses & children under 21',
                      wait: '2-3 years',
                    },
                    {
                      code: 'F2B',
                      title: 'Adult Children of LPRs',
                      desc: 'Unmarried sons/daughters 21+',
                      wait: '7-8 years',
                    },
                    {
                      code: 'F3',
                      title: 'Married Children of Citizens',
                      desc: 'Married sons/daughters any age',
                      wait: '12-13 years',
                    },
                    {
                      code: 'F4',
                      title: 'Siblings of Citizens',
                      desc: 'Brothers/sisters if petitioner 21+',
                      wait: '13-23 years',
                    },
                  ].map((category, index) => (
                    <div
                      key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4
                className="font-bold text-blue-400">
                          {category.code}: {category.title}
                        </h4>
                        <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">
                          {category.wait}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{category.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Special Programs */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Special Family Immigration Programs
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
                    <Heart className="mr-2 h-6 w-6" />
                    K-1 Fiancé(e) Visa
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Bring your fiancé(e) to marry in the U.S.</li>
                    <li>• Must marry within 90 days of entry</li>
                    <li>• Includes K-2 visas for children</li>
                    <li>• Path to green card after marriage</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-900/20 to-orange-700/20 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <h3 className="text-xl font-bold text-orange-400 mb-3 flex items-center">
                    <Globe className="mr-2 h-6 w-6" />V Visa Program
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• For long-waiting family members</li>
                    <li>• Work authorization included</li>
                    <li>• Live in U.S. while waiting</li>
                    <li>• Special eligibility requirements</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Process Timeline */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">The Family Petition Process</h2>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Initial Consultation',
                    desc: 'Assess eligibility and choose the right petition type',
                    time: 'Week 1',
                  },
                  {
                    step: '2',
                    title: 'Document Collection',
                    desc: 'Gather relationship evidence, financial documents, and translations',
                    time: 'Weeks 2-4',
                  },
                  {
                    step: '3',
                    title: 'Petition Filing (I-130)',
                    desc: 'Submit petition with supporting evidence to USCIS',
                    time: 'Week 5',
                  },
                  {
                    step: '4',
                    title: 'USCIS Processing',
                    desc: 'Wait for petition approval and respond to any requests',
                    time: '6-12 months',
                  },
                  {
                    step: '5',
                    title: 'NVC Processing',
                    desc: 'Complete visa application and submit civil documents',
                    time: '2-4 months',
                  },
                  {
                    step: '6',
                    title: 'Interview & Approval',
                    desc: 'Attend interview at embassy or USCIS office',
                    time: '1-2 months',
                  },
                ].map((item, index) => (
                  <div key={index}

                className="flex items-start">
                    <div
                className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Success Metrics */}
            <section className="bg-gradient-to-r from-primary/20 to-primary-dark/20 backdrop-blur-sm rounded-lg p-8 border border-primary/30">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Our Family Immigration Success
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                  <p className="text-gray-300">Families Reunited</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">95%</div>
                  <p className="text-gray-300">Approval Rate</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <p className="text-gray-300">Countries Served</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-gray-300">Support Available</p>
                </div>
              </div>
            </section>

            {/* Common Challenges */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Overcoming Common Challenges</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Prior Immigration Violations',
                    solution:
                      'We prepare waivers and find creative solutions for unlawful presence, visa overstays, and prior removals.',
                    icon: Shield,
                    color: 'red',
                  },
                  {
                    title: 'Public Charge Issues',
                    solution:
                      'Strong affidavit of support preparation and co-sponsor coordination to meet financial requirements.',
                    icon: Award,
                    color: 'green',
                  },
                  {
                    title: 'Document Challenges',
                    solution:
                      'We obtain missing documents from any country and handle translations/authentications.',
                    icon: FileText,
                    color: 'blue',
                  },
                  {
                    title: 'Relationship Evidence',
                    solution:
                      'Strategic evidence compilation to prove bona fide relationships for skeptical officers.',
                    icon: Heart,
                    color: 'purple',
                  },
                ].map((challenge, index) => (
                  <div
                    key={index}

                className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-${challenge.color}-500/30`}
                  >
                    <h3
                      className={`text-xl font-bold text-${challenge.color}-400 mb-3 flex items-center`}
                    >
                      <challenge.icon className="mr-2 h-6 w-6" />
                      {challenge.title}
                    </h3>
                    <p className="text-gray-300">{challenge.solution}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary/20 to-primary-dark/20 backdrop-blur-sm rounded-lg p-8 border border-primary/30">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Don't Let Immigration Law Keep Your Family Apart
              </h2>
              <p className="text-lg text-center mb-6 max-w-2xl mx-auto">
                Every day matters when you're separated from loved ones. Our experienced team will
                expedite your case and fight for your family's future together.
              </p>
              <FamilyBasedPetitionsClient />
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
        id="family-based-petitions-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Family-Based Immigration Petitions - Vasquez Law Firm',
            description:
              'Expert family immigration services including I-130 petitions, K-1 fiancé visas, spouse green cards, and family preference categories. 95% approval rate.',
            provider: {
              '@type': 'Attorney',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Family Immigration Law',
            knowsAbout: [
              'I-130 Family Petitions',
              'K-1 Fiancé Visas',
              'Spouse Immigration',
              'Parent Petitions',
              'Sibling Immigration',
              'Family Preference Categories',
              'Immediate Relative Petitions',
              'Consular Processing',
              'Adjustment of Status',
            ],
          }),
        }}
      />
    </>
  );
}
