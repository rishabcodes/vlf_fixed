import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Federal Defensa Criminal Abogado NC | FBI, DEA, ATF Cases | Vasquez Law Firm',
  description:
    'Facing federal charges? Board-certified federal defense attorneys handle FBI, DEA, ATF investigations. Federal court experience. Aggressive defense when it matters most.',
  keywords:
    'federal criminal defense lawyer NC, federal crimes attorney, FBI investigation lawyer, DEA defense attorney, white collar crime lawyer, federal drug charges, federal court attorney NC, tax fraud defense',
  openGraph: {
    title: 'Federal Defensa Criminal Abogado NC | When Stakes Are Highest',
    description:
      'Federal charges demand federal experience. Expert defense for FBI, DEA, ATF cases. Protecting you in federal court.',
    url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/federal-crimes',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/federal-crimes-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Federal Defensa Criminal Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Defensa Criminal Abogado NC | When Stakes Are Highest',
    description:
      'Federal charges demand federal experience. Expert defense for FBI, DEA, ATF cases.',
    images: ['/images/practice-areas/federal-crimes-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/federal-crimes',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/federal-crimes',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/defensa-criminal/crimenes-federales',
    },
  },
};

export default function FederalCrimesPage() {
  const services = [
    {
      title: 'Federal Drug Crimes',
      description:
        'DEA investigations and federal drug charges carry mandatory minimums. We fight for reduced sentences and alternatives.',
      features: [
        'Drug trafficking/distribution',
        'Conspiracy charges',
        'Continuing criminal enterprise',
        'International drug crimes',
        'Mandatory minimum challenges',
        'Safety valve eligibility',
      ],
    },
    {
      title: 'White Collar Crimes',
      description:
        'Complex financial crimes require sophisticated defense strategies to protect your freedom and career.',
      features: [
        'Wire/mail fraud',
        'Tax evasion/fraud',
        'Securities fraud',
        'Healthcare fraud',
        'Money laundering',
        'RICO violations',
      ],
    },
    {
      title: 'Federal Weapons Charges',
      description:
        "ATF charges and firearms violations carry severe penalties. We challenge every aspect of the government's case.",
      features: [
        'Felon in possession',
        'Federal gun trafficking',
        'Unlawful manufacturing',
        'Machine gun/silencer cases',
        'Straw purchase defense',
        '924(c) enhancements',
      ],
    },
    {
      title: 'Internet & Computer Crimes',
      description:
        'Digital evidence cases require technical expertise. We work with experts to challenge electronic evidence.',
      features: [
        'Child pornography defense',
        'Computer hacking charges',
        'Identity theft/fraud',
        'Dark web investigations',
        'Cryptocurrency crimes',
        'Online threats/harassment',
      ],
    },
    {
      title: 'Inmigración Crimes',
      description:
        'Federal immigration charges threaten freedom and status. We protect both your liberty and immigration rights.',
      features: [
        'Illegal reentry',
        'Document fraud',
        'Human trafficking',
        'Marriage fraud',
        'Visa violations',
        'Harboring charges',
      ],
    },
    {
      title: 'Federal Investigations',
      description:
        'Under investigation? Early intervention is critical. We protect you during questioning and grand jury proceedings.',
      features: [
        'Target letters',
        'Grand jury subpoenas',
        'Search warrant defense',
        'FBI/DEA interviews',
        'Proffer agreements',
        'Pre-indictment advocacy',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What makes federal charges different from state charges?',
      answer:
        'Federal charges involve federal agencies (FBI, DEA, ATF), federal prosecutors, federal judges, and federal sentencing guidelines. Stakes are higher with mandatory minimums and less flexibility.',
    },
    {
      question: 'I received a target letter. What should I do?',
      answer:
        "Do NOT ignore it or try to explain yourself. A target letter means you're under federal investigation. Contact us immediately - early intervention can prevent charges or reduce severity.",
    },
    {
      question: 'What are federal sentencing guidelines?',
      answer:
        'A complex point system that judges use to determine sentences. We work to lower your offense level and criminal history category to reduce potential prison time.',
    },
    {
      question: 'Can federal charges be dismissed?',
      answer:
        'Yes, through pretrial motions, constitutional challenges, or negotiations. Federal prosecutors have high conviction rates, but experienced defense can find weaknesses.',
    },
    {
      question: 'What is a federal plea agreement?',
      answer:
        'Most federal cases resolve through plea agreements. We negotiate for charge reductions, guideline departures, and cooperation credit while protecting your interests.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="Federal Defensa Criminal Abogados"
        subtitle="When You're Facing the Full Power of the Federal Government"
        description="Federal charges mean federal prison. With mandatory minimums and 85% time served, you need attorneys who understand federal court. We've defended clients against FBI, DEA, ATF, and IRS charges nationwide."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* Federal vs State Comparison */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Federal vs. State Court: Critical Differences
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-primary/20">
                      <th className="px-4 py-3 text-left text-primary">Aspect</th>
                      <th className="px-4 py-3 text-left text-primary">State Court</th>
                      <th className="px-4 py-3 text-left text-primary">Federal Court</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-gray-300 font-semibold">Investigation</td>
                      <td className="px-4 py-3 text-gray-300">Local police</td>
                      <td className="px-4 py-3 text-gray-300">FBI, DEA, ATF, IRS</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300 font-semibold">Prosecutors</td>
                      <td className="px-4 py-3 text-gray-300">District attorneys</td>
                      <td className="px-4 py-3 text-gray-300">US Abogados (DOJ)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300 font-semibold">Bail</td>
                      <td className="px-4 py-3 text-gray-300">Often available</td>
                      <td className="px-4 py-3 text-gray-300">Detention common</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300 font-semibold">Sentencing</td>
                      <td className="px-4 py-3 text-gray-300">Judge discretion</td>
                      <td className="px-4 py-3 text-gray-300">Guidelines + mandatories</td>
                    </tr>
                    <tr className="bg-red-900/20">
                      <td className="px-4 py-3 text-red-400 font-semibold">Time Served</td>
                      <td className="px-4 py-3 text-red-400">Often 50% or less</td>
                      <td className="px-4 py-3 text-red-400">85% minimum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Federal Sentencing Guidelines */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Understanding Federal Sentencing Guidelines
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <p className="text-gray-300 mb-4">
                  Federal sentences are calculated using a complex point system. We fight to reduce
                  your exposure at every level:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3">Offense Level Factors</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Base offense level</li>
                      <li>• Specific offense characteristics</li>
                      <li>• Victim-related adjustments</li>
                      <li>• Role in offense</li>
                      <li>• Obstruction of justice</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3">Potential Reductions</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Acceptance of responsibility (-3)</li>
                      <li>• Minor role (-2 to -4)</li>
                      <li>• Substantial assistance (5K1.1)</li>
                      <li>• Safety valve eligibility</li>
                      <li>• First offender status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Federal Charges */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Common Federal Charges & Penalties
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Drug Trafficking</h3>
                  <p className="text-sm text-gray-300 mb-2">21 USC § 841</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 5-40 years (meth/cocaine)</li>
                    <li>• 10 years-life (large amounts)</li>
                    <li>• Mandatory minimums apply</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Wire/Mail Fraud</h3>
                  <p className="text-sm text-gray-300 mb-2">18 USC § 1341/1343</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Up to 20 years per count</li>
                    <li>• 30 years if bank fraud</li>
                    <li>• Massive fines possible</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Felon w/ Firearm</h3>
                  <p className="text-sm text-gray-300 mb-2">18 USC § 922(g)</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Up to 10 years</li>
                    <li>• 15 year min if 3 priors</li>
                    <li>• ACCA enhancement risk</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Federal Investigation Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                The Federal Investigation Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">1.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Investigation Phase</h3>
                    <p className="text-gray-300">
                      Federal agencies investigate for months or years. You may not know you're
                      under investigation until it's too late.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">2.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Target Letter/Contact</h3>
                    <p className="text-gray-300">
                      First sign of trouble. This is your chance to intervene before charges. Never
                      talk without an attorney.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">3.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Grand Jury</h3>
                    <p className="text-gray-300">
                      Secret proceedings where prosecutors present evidence. We can sometimes
                      influence this process.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary text-2xl font-bold mr-4">4.</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Indictment & Arrest</h3>
                    <p className="text-gray-300">
                      If indicted, you'll be arrested. We can arrange voluntary surrender and fight
                      for pretrial release.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Federal Cases Are Different */}
            <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-red-400">
                ⚠️ Why Federal Cases Demand Specialized Defense
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-2">Higher Stakes</h3>
                  <ul className="space-y-1">
                    <li>• 97% conviction rate nationally</li>
                    <li>• Mandatory minimum sentences</li>
                    <li>• 85% time served requirement</li>
                    <li>• Limited parole/early release</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-2">Complex Process</h3>
                  <ul className="space-y-1">
                    <li>• Sentencing guidelines calculations</li>
                    <li>• Pretrial detention hearings</li>
                    <li>• Discovery obligations</li>
                    <li>• Plea agreement negotiations</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="federal-crimes-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Federal Defensa Criminal Services - Vasquez Law Firm',
            description:
              'Experienced federal criminal defense attorneys handling FBI, DEA, ATF cases in federal court. White collar crimes, drug trafficking, weapons charges.',
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'Country',
              name: 'United States',
            },
            serviceType: 'Federal Defensa Criminal',
          }),
        }}
      />
    </>
  );
}
