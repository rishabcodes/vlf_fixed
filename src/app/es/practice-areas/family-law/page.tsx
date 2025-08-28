import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';
export const metadata: Metadata = {
  title:
    'Best Derecho Familiar Abogado in North Carolina | Divorce & Custody Abogados | Vasquez Law Firm',
  description:
    'Compassionate family law attorneys in NC with 60+ years experience. Divorce, child custody, support, adoption. Free consultation. Se habla español. Available 24/7.',
  keywords:
    'family law attorney NC, divorce lawyer North Carolina, child custody attorney, child support lawyer NC, adoption attorney, Raleigh family lawyer, Charlotte divorce attorney, Durham custody lawyer, alimony attorney NC, domestic violence lawyer',
  openGraph: {
    title:
      'Best Derecho Familiar Abogado in North Carolina | Divorce & Custody Abogados | Vasquez Law Firm',
    description:
      'Compassionate family law attorneys in NC with 60+ years experience. Divorce, child custody, support, adoption. Free consultation. Se habla español. Available 24/7.',
    url: `https://www.vasquezlawfirm.com/practice-areas/family-law`,
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/family-law-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Derecho Familiar Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Best Derecho Familiar Abogado in North Carolina | Divorce & Custody Abogados | Vasquez Law Firm',
    description:
      'Compassionate family law attorneys in NC with 60+ years experience. Divorce, child custody, support, adoption. Free consultation. Se habla español. Available 24/7.',
    images: ['/images/practice-areas/family-law-hero.jpg'],
  },
  alternates: {
    canonical: `https://www.vasquezlawfirm.com/practice-areas/family-law`,
    languages: {
      'en-US': `https://www.vasquezlawfirm.com/practice-areas/family-law`,
      'es-ES': `https://www.vasquezlawfirm.com/es/areas-de-practica/derecho-familiar`,
    },
  },
};

export default function FamilyLawPage() {
  const services = [
    {
      title: 'Divorce & Separation',
      description:
        'Compassionate guidance through divorce proceedings with focus on protecting your interests and minimizing conflict.',
      features: [
        'Uncontested & contested divorce',
        'Legal separation agreements',
        'Property division',
        'Spousal support/alimony',
        'Mediation services',
      ],
    },
    {
      title: 'Child Custody & Visitation',
      description:
        'Fighting for your parental rights and the best interests of your children in custody matters.',
      features: [
        'Joint & sole custody arrangements',
        'Visitation schedules',
        'Custody modifications',
        'Grandparent rights',
        'Interstate custody issues',
      ],
    },
    {
      title: 'Child Support',
      description:
        "Ensuring fair child support arrangements that meet your children's needs while protecting your financial stability.",
      features: [
        'Support calculations',
        'Modification requests',
        'Enforcement actions',
        'Arrears resolution',
        'Income withholding orders',
      ],
    },
    {
      title: 'Adoption',
      description:
        'Guiding families through the adoption process with care and attention to legal requirements.',
      features: [
        'Private adoptions',
        'Stepparent adoptions',
        'Adult adoptions',
        'Interstate adoptions',
        'Birth parent rights',
      ],
    },
    {
      title: 'Domestic Violence Protection',
      description:
        'Immediate legal protection for victims of domestic violence with 24/7 emergency assistance.',
      features: [
        'Restraining orders',
        'Emergency protective orders',
        'Safety planning',
        'Court representation',
        'Victim advocacy',
      ],
    },
    {
      title: 'Prenuptial & Postnuptial Agreements',
      description:
        'Protecting your assets and clarifying expectations with properly drafted marital agreements.',
      features: [
        'Asset protection',
        'Debt allocation',
        'Business interests',
        'Inheritance rights',
        'Agreement modifications',
      ],
    },
    {
      title: 'Property Division',
      description:
        'Fair and equitable division of marital assets and debts in divorce proceedings.',
      features: [
        'Marital vs. separate property',
        'Business valuations',
        'Retirement accounts',
        'Real estate division',
        'Debt allocation',
      ],
    },
    {
      title: 'Alimony & Spousal Support',
      description:
        'Negotiating fair spousal support arrangements based on North Carolina guidelines.',
      features: [
        'Temporary support',
        'Post-separation support',
        'Permanent alimony',
        'Support modifications',
        'Tax considerations',
      ],
    },
    {
      title: 'Paternity Actions',
      description:
        'Establishing or challenging paternity to protect parental rights and responsibilities.',
      features: [
        'Paternity testing',
        'Legitimation proceedings',
        "Father's rights",
        'Birth certificate amendments',
        'Support obligations',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How much does a family law attorney cost in North Carolina?',
      answer:
        'At Vasquez Law Firm, we offer free consultations and flexible payment plans. We understand family law matters can be financially stressful, so we work with you to find affordable solutions.',
    },
    {
      question: 'How long does divorce take in North Carolina?',
      answer:
        'North Carolina requires a one-year separation period before filing for divorce. Uncontested divorces can be finalized in 30-60 days after filing, while contested cases may take several months to over a year.',
    },
    {
      question: 'Do I need a lawyer for child custody?',
      answer:
        'While not legally required, having an experienced attorney is crucial for protecting your parental rights and ensuring the best outcome for your children. We help navigate complex custody laws and advocate for your interests.',
    },
    {
      question: 'What factors determine child custody in NC?',
      answer:
        "North Carolina courts consider the best interests of the child, including each parent's ability to provide care, the child's relationship with each parent, stability of home environment, and any history of abuse or neglect.",
    },
    {
      question: 'Can I modify child support or custody orders?',
      answer:
        "Yes, orders can be modified when there's a substantial change in circumstances. This might include job loss, relocation, changes in the child's needs, or significant income changes. We help file and argue modification requests.",
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina's Trusted Derecho Familiar Firm"
        subtitle="Protecting Families for Over 60 Years"
        description="When your family faces legal challenges, you need compassionate attorneys who understand both the law and the emotional complexities involved. Vasquez Law Firm has helped thousands of North Carolina families navigate divorce, custody, support, and adoption matters with dignity and respect."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Why Choose Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why Choose Vasquez Law Firm for Derecho Familiar?
              </h2>
              <p className="text-lg mb-6">
                Family law matters are deeply personal and emotionally challenging. Our bilingual
                attorneys combine legal expertise with genuine compassion to guide you through these
                difficult times. We're not just your lawyers – we're your advocates,
                counselors, and support system.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Compassionate Approach</h3>
                  <p className="text-gray-300">
                    We understand the emotional toll of family legal matters and provide supportive,
                    judgment-free representation focused on your well-being.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Children First</h3>
                  <p className="text-gray-300">
                    In custody and support matters, we always prioritize the best interests of
                    children while protecting your parental rights.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Cost-Effective Solutions</h3>
                  <p className="text-gray-300">
                    We explore mediation and collaborative options to minimize conflict and legal
                    costs whenever possible.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">24/7 Emergency Support</h3>
                  <p className="text-gray-300">
                    Domestic violence and urgent custody matters don't wait for business hours.
                    We're available when you need us most.
                  </p>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Derecho Familiar Process</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Free Consultation</h3>
                    <p className="text-gray-300">
                      Discuss your situation confidentially with an experienced family law attorney
                      who will explain your options and rights.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Strategic Planning</h3>
                    <p className="text-gray-300">
                      Develop a customized legal strategy focused on achieving your goals while
                      minimizing conflict and costs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Negotiation & Mediation
                    </h3>
                    <p className="text-gray-300">
                      Work toward amicable resolutions through skilled negotiation and mediation
                      when possible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Court Representation</h3>
                    <p className="text-gray-300">
                      When litigation is necessary, we provide strong courtroom advocacy to protect
                      your interests.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Success Stories */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Recent Derecho Familiar Victories
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Full Custody Secured</h3>
                  <p className="text-gray-300">
                    Helped a mother gain full custody after proving father's substance abuse
                    issues posed danger to children.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Support Reduced 60%</h3>
                  <p className="text-gray-300">
                    Successfully modified client's alimony obligation after job loss, saving
                    them $2,000/month.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Emergency Protection</h3>
                  <p className="text-gray-300">
                    Obtained immediate restraining order for domestic violence victim and secured
                    safe housing within 24 hours.
                  </p>
                </div>
              </div>
            </section>

            {/* Resources Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Derecho Familiar Resources</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  North Carolina Derecho Familiar Guidelines
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• One-year separation required before filing for divorce</li>
                  <li>• Child support calculated using NC Guidelines based on income</li>
                  <li>• Equitable distribution of marital property (not necessarily 50/50)</li>
                  <li>• Alimony determined by multiple factors including length of marriage</li>
                  <li>• Best interests of child standard for custody decisions</li>
                </ul>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data for SEO */}
      <Script
        id="family-law-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm - Derecho Familiar Services',
            description:
              'Compassionate family law attorneys in North Carolina specializing in divorce, child custody, support, and adoption.',
            url: 'https://www.vasquezlawfirm.com/practice-areas/family-law',
            telephone: '+1-844-967-3536',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '4426 Louisburg Road',
              addressLocality: 'Raleigh',
              addressRegion: 'NC',
              postalCode: '27616',
              addressCountry: 'US',
            },
            areaServed: 'North Carolina',
            serviceType: [
              'Divorce Law',
              'Child Custody',
              'Child Support',
              'Adoption',
              'Domestic Violence',
              'Derecho Familiar',
            ],
            priceRange: '$$',
          }),
        }}
      />
    </>
  );
}
