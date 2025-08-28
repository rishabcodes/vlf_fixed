import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Drug Charges Abogado NC | Drug Crime Defense Abogado | Vasquez Law Firm',
  description:
    'Facing drug charges in NC? Experienced drug crime defense attorneys handle possession, trafficking, manufacturing cases. Protect your freedom and future. Free consultation.',
  keywords:
    'drug charges lawyer NC, drug crime attorney North Carolina, drug possession defense Raleigh, drug trafficking lawyer Charlotte, marijuana attorney Durham, cocaine charges lawyer, heroin defense attorney, prescription drug lawyer NC',
  openGraph: {
    title: 'Drug Charges Defense Abogado NC | Possession to Trafficking',
    description:
      'Facing drug charges? Expert criminal defense for all drug crimes in NC. From simple possession to trafficking. Free consultation.',
    url: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/drug-charges',
    siteName: 'Vasquez Law Firm, PLLC',
    images: [
      {
        url: '/images/practice-areas/drug-charges-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Drug Charges Defense Services in North Carolina',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drug Charges Defense Abogado NC | Possession to Trafficking',
    description:
      'Facing drug charges? Expert criminal defense for all drug crimes in NC. From simple possession to trafficking.',
    images: ['/images/practice-areas/drug-charges-hero.jpg'],
  },
  alternates: {
    canonical: 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/drug-charges',
    languages: {
      'en-US': 'https://www.vasquezlawfirm.com/practice-areas/criminal-defense/drug-charges',
      'es-ES':
        'https://www.vasquezlawfirm.com/es/areas-de-practica/defensa-criminal/cargos-de-drogas',
    },
  },
};

export default function DrugChargesPage() {
  const services = [
    {
      title: 'Drug Possession Defense',
      description:
        'From simple possession to possession with intent, we fight to protect your record and freedom.',
      features: [
        'Marijuana possession',
        'Cocaine charges',
        'Heroin/opioid cases',
        'Prescription drug crimes',
        'Methamphetamine charges',
        'Drug paraphernalia',
      ],
    },
    {
      title: 'Drug Trafficking Defense',
      description:
        'Trafficking charges mean mandatory minimums. We challenge every aspect to avoid harsh sentences.',
      features: [
        'Weight threshold challenges',
        'Conspiracy defense',
        'Federal trafficking cases',
        'Interstate commerce issues',
        'Asset forfeiture defense',
        'Sentencing mitigation',
      ],
    },
    {
      title: 'Manufacturing & Distribution',
      description:
        'Manufacturing and distribution charges carry severe penalties. We provide aggressive defense strategies.',
      features: [
        'Meth lab allegations',
        'Grow house operations',
        'Distribution networks',
        'School zone enhancements',
        'Precursor chemical cases',
        'Lab equipment charges',
      ],
    },
    {
      title: 'Search & Seizure Challenges',
      description:
        'Illegal searches void evidence. We scrutinize every detail of how police obtained evidence.',
      features: [
        'Traffic stop challenges',
        'Warrant defects',
        'Consent issues',
        'K-9 search problems',
        'Home search violations',
        'Constitutional violations',
      ],
    },
    {
      title: 'Federal Drug Crimes',
      description:
        'Federal charges mean federal time. Our attorneys handle cases in federal court.',
      features: [
        'DEA investigations',
        'Multi-state conspiracies',
        'RICO drug cases',
        'Money laundering defense',
        'Mandatory minimum fights',
        'Substantial assistance',
      ],
    },
    {
      title: 'First Offender Programs',
      description:
        'First-time offenders may qualify for diversion programs. We help you avoid conviction.',
      features: [
        'Drug court eligibility',
        'Deferred prosecution',
        'Conditional discharge',
        'Treatment programs',
        'Record expungement',
        'Future protection',
      ],
    },
  ];

  const faqs = [
    {
      question: "What's the difference between possession and trafficking?",
      answer:
        'In NC, trafficking is based on weight: 10 lbs of marijuana, 28g of cocaine, 4g of heroin triggers trafficking charges with mandatory prison time. Possession is any amount below trafficking thresholds.',
    },
    {
      question: 'Can drug charges be dismissed?',
      answer:
        'Yes. We often get dismissals based on illegal searches, lack of possession proof, entrapment, or lab testing errors. Every case has potential defenses we explore thoroughly.',
    },
    {
      question: 'Will I go to jail for first-time drug possession?',
      answer:
        'Not necessarily. First offenders often qualify for probation, drug court, or deferred prosecution. We fight for alternatives that protect your record and freedom.',
    },
    {
      question: "What about my driver's license?",
      answer:
        'Drug convictions trigger automatic license suspension in NC. We can help you get limited driving privileges and work toward full restoration.',
    },
    {
      question: 'Can police search my car for drugs?',
      answer:
        'Only with probable cause, consent, or during arrest. We challenge searches that violate your Fourth Amendment rights, potentially excluding all evidence found.',
    },
  ];

  return (
    <>
      <ModernPracticeAreaTemplate
        title="North Carolina Drug Charges Defense"
        subtitle="Protecting Your Freedom, Record & Future"
        description="Drug charges can destroy your life - but a charge isn't a conviction. Our experienced defense attorneys know how to challenge evidence, negotiate alternatives, and fight for your freedom."
        services={services}
        faqs={faqs}
        content={
          <div className="space-y-12">
            {/* NC Drug Penalties Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                North Carolina Drug Crime Penalties
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-primary/20">
                      <th className="px-4 py-3 text-left text-primary">Charge Level</th>
                      <th className="px-4 py-3 text-left text-primary">Examples</th>
                      <th className="px-4 py-3 text-left text-primary">Potential Sentence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-4 py-3 text-gray-300">Class 3 Misdemeanor</td>
                      <td className="px-4 py-3 text-gray-300">Marijuana possession (&lt;0.5 oz)</td>
                      <td className="px-4 py-3 text-gray-300">Up to 20 days jail</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300">Class 1 Misdemeanor</td>
                      <td className="px-4 py-3 text-gray-300">Marijuana possession (0.5-1.5 oz)</td>
                      <td className="px-4 py-3 text-gray-300">Up to 120 days jail</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300">Class I Felony</td>
                      <td className="px-4 py-3 text-gray-300">Cocaine/heroin possession</td>
                      <td className="px-4 py-3 text-gray-300">3-12 months prison</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-300">Class H Felony</td>
                      <td className="px-4 py-3 text-gray-300">Possession with intent</td>
                      <td className="px-4 py-3 text-gray-300">4-25 months prison</td>
                    </tr>
                    <tr className="bg-red-900/20">
                      <td className="px-4 py-3 text-red-400 font-bold">Trafficking</td>
                      <td className="px-4 py-3 text-red-400">Weight-based charges</td>
                      <td className="px-4 py-3 text-red-400">25-282 months mandatory</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Defense Strategies Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">How We Defend Drug Charges</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Constitutional Defenses</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Illegal search and seizure</li>
                    <li>• Miranda violations</li>
                    <li>• Unlawful traffic stops</li>
                    <li>• Invalid search warrants</li>
                    <li>• Coerced confessions</li>
                    <li>• Entrapment defense</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-primary mb-3">Evidence Challenges</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Chain of custody breaks</li>
                    <li>• Lab testing errors</li>
                    <li>• Weight discrepancies</li>
                    <li>• Substance misidentification</li>
                    <li>• Constructive possession</li>
                    <li>• Lack of knowledge</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Trafficking Thresholds Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                NC Drug Trafficking Thresholds & Mandatory Minimums
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Marijuana</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 10-50 lbs: 25-39 months</li>
                    <li>• 50-2,000 lbs: 35-51 months</li>
                    <li>• 2,000-10,000 lbs: 70-93 months</li>
                    <li>• 10,000+ lbs: 175-222 months</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Cocaine</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 28-200g: 35-51 months</li>
                    <li>• 200-400g: 70-93 months</li>
                    <li>• 400g+: 175-222 months</li>
                    <li>• Plus heavy fines</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-3">Heroin/Opioids</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 4-14g: 70-93 months</li>
                    <li>• 14-28g: 90-117 months</li>
                    <li>• 28g+: 225-282 months</li>
                    <li>• Fentanyl = harsher</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-red-400 mt-4 text-center font-semibold">
                ⚠️ These are MANDATORY MINIMUM sentences - judges cannot go below!
              </p>
            </section>

            {/* Collateral Consequences Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Hidden Consequences of Drug Convictions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Immediate Impact</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Driver\'s license suspension</li>
                    <li>• Student aid disqualification</li>
                    <li>• Public housing ban</li>
                    <li>• Professional license loss</li>
                    <li>• Inmigración consequences</li>
                    <li>• Child custody issues</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Long-Term Effects</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Employment barriers</li>
                    <li>• Housing discrimination</li>
                    <li>• Gun rights loss</li>
                    <li>• Voting restrictions (felonies)</li>
                    <li>• Security clearance denial</li>
                    <li>• Social stigma</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Alternative Programs Section */}
            <section className="bg-green-900/20 border border-green-500/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                Alternative Programs & First Offender Options
              </h2>
              <p className="text-gray-300 mb-4">
                Not everyone needs to go to jail. We help qualified clients access:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <ul className="space-y-2">
                  <li>• Drug Treatment Court</li>
                  <li>• Deferred Prosecution</li>
                  <li>• Conditional Discharge (90-96)</li>
                </ul>
                <ul className="space-y-2">
                  <li>• TASC Programs</li>
                  <li>• Veterans Treatment Court</li>
                  <li>• Mental Health Court</li>
                </ul>
              </div>
            </section>
          </div>
        }
      />

      {/* Structured Data */}
      <Script
        id="drug-charges-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Drug Charges Defense Services - Vasquez Law Firm',
            description:
              'Experienced drug crime defense attorneys in North Carolina. We handle all drug charges from possession to trafficking.',
            provider: {
              '@type': 'Abogado',
              name: 'Vasquez Law Firm, PLLC',
              url: 'https://www.vasquezlawfirm.com',
            },
            areaServed: {
              '@type': 'State',
              name: 'North Carolina',
            },
            serviceType: 'Defensa Criminal - Drug Crimes',
          }),
        }}
      />
    </>
  );
}
