import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Child Support Abogado NC | Support Modification Abogado | Vasquez Law Firm',
  description:
    "Need help with child support in NC? Experienced attorneys for support establishment, modification, enforcement. Protect your children's financial future. Free consultation.",
  keywords:
    'child support lawyer NC, child support attorney North Carolina, support modification Raleigh, child support enforcement Charlotte, support calculator NC, back child support Durham, support arrears attorney',
  openGraph: {
    title: 'Child Support Abogado NC | Fair Support for Your Children',
    description:
      "Expert child support attorneys in NC. We help establish, modify, and enforce support orders that protect your children's needs.",
    url: 'https://www.vasquezlawfirm.com/practice-areas/family-law/child-support',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/child-support-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Child Support Legal Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Support Abogado NC | Fair Support for Your Children',
    description:
      'Expert child support attorneys in NC. We help establish, modify, and enforce support orders.',
    images: ['/images/practice-areas/child-support-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/family-law/child-support',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/family-law/child-support',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/derecho-familiar/manutencion-infantil',
    },
  },
};

export default function ChildSupportPage() {
  const services = [
    {
      title: 'Support Establishment',
      description:
        'Setting initial child support orders that reflect true income and actual child expenses.',
      features: [
        'Income determination',
        'Expense documentation',
        'Healthcare cost allocation',
        'Daycare expense inclusion',
        'Extraordinary expense consideration',
        'Deviation arguments',
      ],
    },
    {
      title: 'Support Modification',
      description:
        'Life changes require support adjustments. We help modify orders when circumstances change substantially.',
      features: [
        'Job loss/income reduction',
        'Income increases',
        "Child's needs changes",
        'Healthcare changes',
        'Custody modifications',
        'Emancipation issues',
      ],
    },
    {
      title: 'Support Enforcement',
      description:
        "When the other parent won't pay, we use every legal tool to collect what your children deserve.",
      features: [
        'Wage garnishment',
        'Asset seizure',
        'License suspension',
        'Contempt proceedings',
        'Interstate enforcement',
        'Tax refund intercepts',
      ],
    },
    {
      title: 'High-Income Cases',
      description:
        'NC guidelines cap at $25,000/month income. We handle deviation arguments for high earners.',
      features: [
        'Above-guidelines calculations',
        'Private school expenses',
        'College savings requirements',
        'Lifestyle maintenance',
        'Travel/activity costs',
        'Trust fund considerations',
      ],
    },
    {
      title: 'Self-Employment Issues',
      description:
        'Business owners often underreport income. We uncover hidden assets and true earning capacity.',
      features: [
        'Business valuation',
        'Cash income discovery',
        'Personal expense analysis',
        'Lifestyle audits',
        'Tax return analysis',
        'Expert accountant testimony',
      ],
    },
    {
      title: 'Arrears & Back Support',
      description:
        'Past-due support accumulates quickly. We help collect arrears or negotiate manageable payment plans.',
      features: [
        'Interest calculations',
        'Lump sum negotiations',
        'Payment plan structuring',
        'Arrears forgiveness',
        'Statute of limitations',
        'Bankruptcy impacts',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How is child support calculated in North Carolina?',
      answer:
        "NC uses guidelines based on both parents' incomes, number of children, custody arrangement, and expenses like health insurance and daycare. We ensure all relevant factors are considered.",
    },
    {
      question: 'Can child support be modified?',
      answer:
        "Yes, if there's a substantial change in circumstances - typically 15% or more change in support amount. Changes include job loss, income changes, or custody modifications.",
    },
    {
      question: "What if the other parent won't pay?",
      answer:
        'NC has strong enforcement tools: wage garnishment, asset seizure, license suspension, passport denial, and even jail for contempt. We pursue all available remedies.',
    },
    {
      question: 'Does child support cover college expenses?',
      answer:
        'NC child support typically ends at 18 (or 20 if still in high school). College expenses require separate agreements unless included in original orders.',
    },
    {
      question: 'How does custody affect child support?',
      answer:
        'More overnights typically mean less support obligation. Joint physical custody can significantly reduce support amounts compared to primary custody arrangements.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina Child Support Abogados"
        subtitle="Ensuring Your Children Get the Support They Deserve"
        description="Children need financial stability. Whether establishing, modifying, or enforcing support orders, our experienced attorneys fight for fair support that meets your children's needs."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* NC Guidelines Calculator */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                North Carolina Child Support Guidelines
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Key Factors in Support Calculations:
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">
                      Income Considerations
                    </h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Gross income from all sources</li>
                      <li>• Bonuses and commissions</li>
                      <li>• Self-employment income</li>
                      <li>• Investment income</li>
                      <li>• Imputed income if unemployed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-2">Allowable Expenses</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Health insurance premiums</li>
                      <li>• Work-related daycare</li>
                      <li>• Extraordinary medical expenses</li>
                      <li>• Other child support obligations</li>
                      <li>• Court-ordered expenses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Support Amount Examples */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Typical Support Amounts in NC (2024 Guidelines)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-primary/20">
                      <th className="px-4 py-3 text-left text-primary">Combined Income</th>
                      <th className="px-4 py-3 text-left text-primary">1 Child</th>
                      <th className="px-4 py-3 text-left text-primary">2 Children</th>
                      <th className="px-4 py-3 text-left text-primary">3 Children</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-gray-300">$5,000/month</td>
                      <td className="px-4 py-3 text-gray-300">$690</td>
                      <td className="px-4 py-3 text-gray-300">$1,046</td>
                      <td className="px-4 py-3 text-gray-300">$1,305</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300">$10,000/month</td>
                      <td className="px-4 py-3 text-gray-300">$1,202</td>
                      <td className="px-4 py-3 text-gray-300">$1,824</td>
                      <td className="px-4 py-3 text-gray-300">$2,236</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300">$15,000/month</td>
                      <td className="px-4 py-3 text-gray-300">$1,590</td>
                      <td className="px-4 py-3 text-gray-300">$2,381</td>
                      <td className="px-4 py-3 text-gray-300">$2,874</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-gray-300">$25,000+/month</td>
                      <td className="px-4 py-3 text-gray-300" colSpan={3}>
                        Requires deviation above guidelines
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-400 mt-2">
                  * Amounts shown are total obligation split between parents based on income ratio
                </p>
              </div>
            </section>

            {/* Modification Standards */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                When Can Support Be Modified?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-3">Valid Reasons</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 15%+ change in support amount</li>
                    <li>• Job loss or significant income change</li>
                    <li>• Change in custody arrangement</li>
                    <li>• Child\'s needs substantially change</li>
                    <li>• Health insurance changes</li>
                    <li>• 3+ years since last review</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Invalid Reasons</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Voluntary income reduction</li>
                    <li>• Temporary financial issues</li>
                    <li>• Disagreement with spending</li>
                    <li>• New spouse\'s income</li>
                    <li>• Minor expense changes</li>
                    <li>• Wanting to punish ex</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Enforcement Options */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Child Support Enforcement Tools
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Administrative Enforcement
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <ul className="space-y-1">
                      <li>• Wage garnishment (automatic)</li>
                      <li>• Tax refund intercepts</li>
                      <li>• Bank account levies</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Driver\'s license suspension</li>
                      <li>• Professional license holds</li>
                      <li>• Passport denial</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Court Enforcement</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <ul className="space-y-1">
                      <li>• Contempt of court proceedings</li>
                      <li>• Jail time for willful non-payment</li>
                      <li>• Property liens and seizure</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Credit bureau reporting</li>
                      <li>• Work-release programs</li>
                      <li>• Electronic monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Special Circumstances */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Special Support Considerations
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-3">Special Needs Children</h3>
                  <p className="text-sm text-gray-300">
                    Support may continue past 18 and include therapy, medical equipment, specialized
                    care, and educational needs.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-3">Military Parents</h3>
                  <p className="text-sm text-gray-300">
                    BAH and other allowances count as income. Deployment doesn\'t excuse support
                    obligations.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-primary mb-3">Interstate Cases</h3>
                  <p className="text-sm text-gray-300">
                    UIFSA allows enforcement across state lines. We handle complex multi-state
                    support issues.
                  </p>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="child-support-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Child Support Legal Services - Vasquez Law Firm',
            description:
              "Experienced child support attorneys in North Carolina. We handle support establishment, modification, and enforcement to protect children's financial needs.",
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Derecho Familiar - Child Support',
          }),
        }}
      />
    </>
  );
}
