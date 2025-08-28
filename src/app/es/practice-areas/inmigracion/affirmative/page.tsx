import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
import { SmartBreadcrumbs } from '@/components/SEO/SmartBreadcrumbs';
import { InternalLinkingSection } from '@/components/SEO/InternalLinkingSection';
import { HowToSchema } from '@/components/SEO/HowToSchema';
import Link from 'next/link';
import { ChevronRight, Award, Users, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affirmative Inmigración Services NC | Family Petitions, Green Cards & Citizenship',
  description:
    "Build your American dream through NC's premier affirmative immigration team. Family petitions, green cards, citizenship, DACA, TPS. 95% approval rate. Se habla español. FREE consultation: 1-844-YO-PELEO",
  keywords:
    'affirmative immigration NC, family based immigration lawyer, green card attorney NC, citizenship lawyer, DACA renewal NC, TPS application, family petitions North Carolina, immigration benefits, naturalization attorney, work permits NC',
  openGraph: {
    title: 'Affirmative Inmigración Services NC | Family Petitions, Green Cards & Citizenship',
    description:
      "Build your American dream through NC's premier affirmative immigration team. Family petitions, green cards, citizenship, DACA, TPS. 95% approval rate. Se habla español. FREE consultation: 1-844-YO-PELEO",
    url: 'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/affirmative-immigration-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Affirmative Inmigración Services - Building Your American Dream',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affirmative Inmigración Services NC | Family Petitions, Green Cards & Citizenship',
    description:
      "Build your American dream through NC's premier affirmative immigration team. Family petitions, green cards, citizenship, DACA, TPS. 95% approval rate.",
    images: ['/images/practice-areas/affirmative-immigration-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/immigration/affirmative',
      'es-ES': 'https://www.vasquezlawfirm.com/es/areas-de-practica/inmigracion/afirmativa',
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

export default function AffirmativeInmigraciónPage() {
  const currentPage = {
    type: 'practice-area' as const,
    slug: 'affirmative-immigration',
    service: 'immigration',
  };

  const services = [
    {
      title: 'Family-Based Inmigración Petitions',
      description:
        'Unite with your loved ones through comprehensive family immigration services. We handle all family petition types with a 95% approval rate.',
      features: [
        'Immediate relative petitions (spouse, parents, children)',
        'Family preference categories (siblings, adult children)',
        'K-1 fiancé(e) visas',
        'Consular processing support',
        'I-130 petition preparation',
        'Document translation and authentication',
      ],
      link: '/areas-de-practica/immigration/affirmative/family-based-petitions',
    },
    {
      title: 'Green Card Applications',
      description:
        'Secure your permanent residency with expert guidance. From employment-based to family-based green cards, we navigate every pathway to success.',
      features: [
        'Employment-based green cards (EB-1, EB-2, EB-3)',
        'Family-based green cards',
        'Adjustment of status (I-485)',
        'Consular processing',
        'Work and travel permits',
        'Medical exam coordination',
      ],
      link: '/areas-de-practica/immigration/affirmative/green-cards',
    },
    {
      title: 'Citizenship & Naturalization',
      description:
        'Achieve your American dream by becoming a U.S. citizen. Comprehensive support from N-400 application through oath ceremony.',
      features: [
        'N-400 application preparation',
        'Citizenship test preparation',
        'English and civics support',
        'Disability accommodations',
        'Expedited processing when available',
        'Certificate replacements',
      ],
      link: '/areas-de-practica/immigration/affirmative/citizenship',
    },
    {
      title: 'DACA Services',
      description:
        'Protect your status and secure work authorization through DACA. Expert handling of initial applications and renewals.',
      features: [
        'Initial DACA applications',
        'DACA renewals',
        'Advance parole applications',
        'Work permit processing',
        'Status violation assessment',
        'Future pathway planning',
      ],
      link: '/areas-de-practica/immigration/affirmative/daca',
    },
    {
      title: 'Temporary Protected Status (TPS)',
      description:
        'Maintain legal status and work authorization through TPS. We handle applications and renewals for all designated countries.',
      features: [
        'Initial TPS registration',
        'TPS re-registration',
        'Work authorization',
        'Travel documents',
        'Country designation updates',
        'Status maintenance guidance',
      ],
      link: '/areas-de-practica/immigration/affirmative/tps',
    },
    {
      title: 'Work Permits & Employment Authorization',
      description:
        'Secure your right to work legally in the United States. Fast-track processing for employment authorization documents.',
      features: [
        'I-765 work permit applications',
        'Expedite requests',
        'Renewal applications',
        'Category eligibility assessment',
        'Supporting documentation',
        'Status maintenance',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is affirmative immigration?',
      answer:
        'Affirmative immigration involves proactively applying for immigration benefits like green cards, citizenship, or work permits when you are not in removal proceedings. These are positive applications to obtain or maintain legal status.',
    },
    {
      question: 'How long does the green card process take?',
      answer:
        'Processing times vary by category. Family-based green cards can take 8-33 months depending on the relationship. Employment-based cases typically take 12-24 months. We provide realistic timelines during your consultation.',
    },
    {
      question: 'Can I work while my application is pending?',
      answer:
        'In many cases, yes. Most green card applicants can apply for work authorization (EAD) while their case is pending. DACA and TPS beneficiaries also receive work permits. We help secure work authorization as quickly as possible.',
    },
    {
      question: 'Do you help with the citizenship test?',
      answer:
        'Yes! We provide comprehensive citizenship test preparation, including study materials, practice tests, and referrals to English/civics classes. We also help qualify for disability accommodations when needed.',
    },
    {
      question: 'What documents do I need to start my case?',
      answer:
        'Required documents vary by case type but typically include identification, immigration documents, and relationship/employment proof. During your free consultation, we provide a customized document checklist.',
    },
  ];

  return (
    <>
      <SmartBreadcrumbs
        customLabels={{
          affirmative: 'Affirmative Inmigración',
          immigration: 'Inmigración Law',
          'practice-areas': 'Practice Areas',
        }}
        showHome={true}
      />

      <ModernPracticeAreaTemplate
        title="Affirmative Inmigración Services"
        subtitle="Building Your American Dream, One Application at a Time"
        description="North Carolina's trusted affirmative immigration team with a 95% approval rate. From family petitions to citizenship, we guide you through every step of your immigration journey. Serving all 100 NC counties with bilingual support. Your future starts here."
        services={services.map(service => ({
          ...service,
          features: service.features || [],
        }))}
        faqs={faqs}
        content={
          <div className="space-y-12">
            <InternalLinkingSection
              currentPage={currentPage}
              variant="inline"
              maxLinks={5}

                className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-primary/20"
            />

            {/* Service Cards Grid */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-primary">
                Comprehensive Affirmative Inmigración Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Link key={index}
                    href={service.link || '#'}
                    className="group block">
                    <div
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                      <h3
                        className="text-xl font-bold text-primary mb-3 group-hover:text-primary-light transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                        <span className="text-sm font-semibold">Learn More</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why Choose Vasquez Law Firm for Affirmative Inmigración?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center">
                    <Award className="mr-2 h-6 w-6" />
                    95% Approval Rate
                  </h3>
                  <p className="text-gray-300">
                    Our meticulous preparation and expert knowledge result in one of the highest
                    approval rates in North Carolina for affirmative immigration cases.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center">
                    <Users className="mr-2 h-6 w-6" />
                    Bilingual Team
                  </h3>
                  <p className="text-gray-300">
                    Full legal services in English and Spanish. We ensure nothing gets lost in
                    translation when building your case.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center">
                    <Clock className="mr-2 h-6 w-6" />
                    Fast Processing
                  </h3>
                  <p className="text-gray-300">
                    We know every day matters. Our efficient systems and priority processing get
                    your applications filed quickly and accurately.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
                    <Shield className="mr-2 h-6 w-6" />
                    Comprehensive Support
                  </h3>
                  <p className="text-gray-300">
                    From initial consultation through final approval, we handle every aspect of your
                    case with attention to detail and personal care.
                  </p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Our Affirmative Inmigración Process
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Consultation & Assessment</h3>
                    <p className="text-gray-300">
                      We evaluate your eligibility and identify the best pathway for your
                      immigration goals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Document Preparation</h3>
                    <p className="text-gray-300">
                      Our team gathers and prepares all required documents, ensuring nothing is
                      missed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Application Filing</h3>
                    <p className="text-gray-300">
                      We file your applications with USCIS, using our expertise to avoid delays and
                      RFEs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Case Management & Updates</h3>
                    <p className="text-gray-300">
                      We monitor your case, respond to any requests, and keep you informed at every
                      step.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary/20 to-primary-dark/20 backdrop-blur-sm rounded-lg p-8 border border-primary/30">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Start Your Inmigración Journey Today
              </h2>
              <p className="text-lg text-center mb-6 max-w-2xl mx-auto">
                Don't wait to secure your future in America. Our experienced team is ready to guide
                you through every step of the affirmative immigration process.
              </p>
              <div className="text-center">
                <Link
                  href="/es/contacto"
                  className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Comience Su Consulta Gratis
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
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
        id="affirmative-immigration-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Affirmative Inmigración Services - Vasquez Law Firm',
            description:
              'Comprehensive affirmative immigration services including family petitions, green cards, citizenship, DACA, and TPS. 95% approval rate.',
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Affirmative Inmigración Services',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Inmigración Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Family-Based Inmigración Petitions',
                    description: 'I-130 petitions for family members',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Green Card Applications',
                    description: 'Permanent residency applications',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Citizenship & Naturalization',
                    description: 'N-400 applications and test preparation',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'DACA Services',
                    description: 'Initial applications and renewals',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'TPS Applications',
                    description: 'Temporary Protected Status registration',
                  },
                },
              ],
            },
          }),
        }}
      />

      <HowToSchema practiceArea="immigration" pageType="affirmative-immigration" />
    </>
  );
}
