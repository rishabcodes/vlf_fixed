import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Theft Charges Abogado NC | Larceny & Shoplifting Defense | Vasquez Law Firm',
  description:
    'Facing theft charges in NC? Expert defense for shoplifting, larceny, embezzlement, robbery. Protect your record and future. No judgment, just defense. Free consultation.',
  keywords:
    'theft lawyer NC, larceny attorney North Carolina, shoplifting defense Raleigh, embezzlement lawyer Charlotte, robbery attorney Durham, burglary defense NC, identity theft lawyer, fraud attorney NC',
  openGraph: {
    title: 'Theft & Larceny Defense Abogado NC | Protect Your Future',
    description:
      'Charged with theft? Experienced defense attorneys for all theft crimes in NC. From shoplifting to felony larceny.',
    url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/theft',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/theft-defense-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Theft Defense Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theft & Larceny Defense Abogado NC | Protect Your Future',
    description: 'Charged with theft? Experienced defense attorneys for all theft crimes in NC.',
    images: ['/images/practice-areas/theft-defense-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/theft',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/theft',
      'es-ES': 'https://www.vasquezlawfirm.com/es/areas-de-practica/defensa-criminal/robo',
    },
  },
};

export default function TheftPage() {
  const services = [
    {
      title: 'Shoplifting Defense',
      description:
        'Retail theft charges can have lasting consequences. We fight to protect your record and negotiate alternatives.',
      features: [
        'Concealment cases',
        'Price tag switching',
        'Self-checkout errors',
        'First offender programs',
        'Civil demand defense',
        'Ban letter challenges',
      ],
    },
    {
      title: 'Larceny Charges',
      description:
        'From petty larceny to grand larceny, we provide aggressive defense against all theft allegations.',
      features: [
        'Employee theft',
        'Theft from employer',
        'Motor vehicle theft',
        'Theft of services',
        'Possession of stolen goods',
        'Felony larceny defense',
      ],
    },
    {
      title: 'Embezzlement',
      description:
        'White collar theft charges require sophisticated defense. We protect professionals and their careers.',
      features: [
        'Financial record analysis',
        'Accounting disputes',
        'Authority to access defense',
        'Restitution negotiations',
        'Professional license protection',
        'Federal embezzlement',
      ],
    },
    {
      title: 'Robbery & Burglary',
      description:
        'Violent theft charges mean serious time. We challenge every element to reduce or dismiss charges.',
      features: [
        'Armed robbery defense',
        'Common law robbery',
        'Breaking and entering',
        'Home invasion charges',
        'Commercial burglary',
        'Conspiracy defense',
      ],
    },
    {
      title: 'Identity Theft & Fraud',
      description:
        'Complex fraud cases require detailed defense strategies. We navigate both state and federal charges.',
      features: [
        'Credit card fraud',
        'Check fraud/forgery',
        'Identity theft defense',
        'Wire fraud charges',
        'Insurance fraud',
        'Government benefit fraud',
      ],
    },
    {
      title: 'Organized Retail Theft',
      description:
        'Enhanced penalties for organized theft require experienced defense to avoid felony convictions.',
      features: [
        'Multiple incident defense',
        'Conspiracy challenges',
        'Gang enhancement defense',
        'Interstate commerce issues',
        'RICO defense',
        'Asset forfeiture',
      ],
    },
  ];

  const faqs = [
    {
      question: "What's the difference between misdemeanor and felony larceny in NC?",
      answer:
        'In North Carolina, theft of property worth less than $1,000 is misdemeanor larceny. Theft over $1,000, theft of firearms, or theft from the person is felony larceny with much harsher penalties.',
    },
    {
      question: 'Can I go to jail for shoplifting?',
      answer:
        'Yes, even misdemeanor shoplifting can result in up to 120 days in jail. However, first offenders often qualify for deferred prosecution or community service alternatives we can negotiate.',
    },
    {
      question: "What about the store's civil demand letter?",
      answer:
        'Many stores send civil demand letters seeking hundreds of dollars beyond the criminal case. We advise on whether to pay these demands and can negotiate on your behalf.',
    },
    {
      question: 'Will theft charges affect my employment?',
      answer:
        'Theft convictions are particularly damaging for employment as they involve dishonesty. We fight to avoid convictions through dismissals, deferrals, or alternative charges.',
    },
    {
      question: 'What is "deferred prosecution" for shoplifting?',
      answer:
        'A program allowing first-time offenders to complete community service and/or classes to earn dismissal. We help clients qualify and successfully complete these programs.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina Theft Defense Abogados"
        subtitle="Everyone Deserves a Second Chance"
        description="Good people make mistakes. A theft charge doesn't define you. Our experienced attorneys provide judgment-free defense to protect your record, reputation, and future opportunities."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Theft Charge Classifications */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                North Carolina Theft Crime Classifications
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-primary/20">
                      <th className="px-4 py-3 text-left text-primary">Charge</th>
                      <th className="px-4 py-3 text-left text-primary">Value/Circumstances</th>
                      <th className="px-4 py-3 text-left text-primary">Classification</th>
                      <th className="px-4 py-3 text-left text-primary">Max Penalty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-gray-300">Concealment (Shoplifting)</td>
                      <td className="px-4 py-3 text-gray-300">Any value</td>
                      <td className="px-4 py-3 text-gray-300">Class 3 Misdemeanor</td>
                      <td className="px-4 py-3 text-gray-300">20 days jail</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300">Misdemeanor Larceny</td>
                      <td className="px-4 py-3 text-gray-300">Under $1,000</td>
                      <td className="px-4 py-3 text-gray-300">Class 1 Misdemeanor</td>
                      <td className="px-4 py-3 text-gray-300">120 days jail</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-4 py-3 text-gray-300">Felony Larceny</td>
                      <td className="px-4 py-3 text-gray-300">$1,000+</td>
                      <td className="px-4 py-3 text-gray-300">Class H Felony</td>
                      <td className="px-4 py-3 text-gray-300">39 months prison</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300">Larceny from Person</td>
                      <td className="px-4 py-3 text-gray-300">Any value</td>
                      <td className="px-4 py-3 text-gray-300">Class G Felony</td>
                      <td className="px-4 py-3 text-gray-300">47 months prison</td>
                    </tr>
                    <tr className="bg-red-900/20">
                      <td className="px-4 py-3 text-red-400">Robbery</td>
                      <td className="px-4 py-3 text-red-400">Force/threat</td>
                      <td className="px-4 py-3 text-red-400">Class D Felony</td>
                      <td className="px-4 py-3 text-red-400">204 months prison</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Defense Strategies */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Common Theft Defense Strategies
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Intent Challenges</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Mistake of fact</li>
                    <li>• Claim of right</li>
                    <li>• Lack of intent to steal</li>
                    <li>• Mental health issues</li>
                    <li>• Intoxication defense</li>
                    <li>• Accident/forgetfulness</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Evidence Issues</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Illegal detention</li>
                    <li>• False accusations</li>
                    <li>• Mistaken identity</li>
                    <li>• Value disputes</li>
                    <li>• Ownership questions</li>
                    <li>• Constitutional violations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* First Offender Options */}
            <section className="bg-green-900/20 border border-green-500/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                First Offender Programs & Alternatives
              </h2>
              <p className="text-gray-300 mb-6">
                First-time offenders often qualify for programs that avoid conviction:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-3">Deferred Prosecution</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Complete community service</li>
                    <li>• Attend theft awareness class</li>
                    <li>• Pay court costs</li>
                    <li>• Charges dismissed after completion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-3">Conditional Discharge</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Plead guilty but no conviction</li>
                    <li>• Complete probation terms</li>
                    <li>• Eligible for expungement</li>
                    <li>• Protects your record</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Collateral Consequences */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Why Theft Convictions Are Especially Damaging
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Employment Impact</h3>
                  <p className="text-sm text-gray-300">
                    Theft convictions are "crimes of dishonesty" that employers view as
                    disqualifying for any position involving money, property, or trust.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Professional Licenses</h3>
                  <p className="text-sm text-gray-300">
                    Nurses, teachers, real estate agents, and other professionals can lose licenses
                    over theft convictions, ending careers.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Inmigración</h3>
                  <p className="text-sm text-gray-300">
                    Theft crimes are "crimes involving moral turpitude" that can lead to deportation
                    or denial of citizenship.
                  </p>
                </div>
              </div>
            </section>

            {/* Retailer Tactics */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Know Your Rights: Retailer Detention & Civil Demands
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  What Stores Can and Cannot Do:
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Stores CAN:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Detain you for reasonable time</li>
                      <li>• Call police</li>
                      <li>• Ban you from property</li>
                      <li>• Send civil demand letters</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Stores CANNOT:</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Use excessive force</li>
                      <li>• Search you without consent</li>
                      <li>• Hold you indefinitely</li>
                      <li>• Threaten or coerce confession</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-yellow-400 mt-4">
                  ⚠️ Never sign anything or make statements without an attorney!
                </p>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="theft-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Theft & Larceny Defense Services - Vasquez Law Firm',
            description:
              'Experienced theft crime defense attorneys in North Carolina. We handle shoplifting, larceny, embezzlement, and all theft charges.',
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Defensa Criminal - Theft Crimes',
          }),
        }}
      />
    </>
  );
}
