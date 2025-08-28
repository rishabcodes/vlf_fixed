import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Crime Defense Attorney NC & FL | Drug Charges Lawyer | Vasquez Law',
  description: 'Aggressive drug crime defense. Possession, trafficking, manufacturing charges. Former prosecutors fighting for you.',
  keywords: 'drug crime attorney, drug possession lawyer, drug trafficking defense, drug charges',
};

export default function DrugCrimeCasesPage() {
  const services = [
    {
      title: 'Drug Possession',
      description: 'Simple possession to possession with intent',
      icon: '🚫',
      features: [
        'Marijuana possession',
        'Cocaine charges',
        'Heroin/fentanyl cases',
        'Prescription drugs',
        'Paraphernalia charges',
        'Constructive possession',
      ],
    },
    {
      title: 'Drug Trafficking',
      description: 'Serious felony trafficking charges',
      icon: '⚖️',
      features: [
        'Weight threshold defenses',
        'Interstate trafficking',
        'Conspiracy charges',
        'Federal prosecutions',
        'Mandatory minimums',
        'Asset forfeiture defense',
      ],
    },
    {
      title: 'Manufacturing/Distribution',
      description: 'Production and sales charges',
      icon: '🏭',
      features: [
        'Meth lab allegations',
        'Grow house operations',
        'Distribution networks',
        'School zone enhancements',
        'Maintaining dwelling',
        'Precursor violations',
      ],
    },
    {
      title: 'Constitutional Defenses',
      description: 'Challenging illegal police conduct',
      icon: '📜',
      features: [
        'Illegal searches',
        'Invalid traffic stops',
        'Warrant challenges',
        'Miranda violations',
        'Entrapment defense',
        'Chain of custody issues',
      ],
    },
    {
      title: 'Federal Drug Crimes',
      description: 'DEA and federal prosecutions',
      icon: '🇺🇸',
      features: [
        'Federal court defense',
        'Sentencing guidelines',
        'Safety valve eligibility',
        'Substantial assistance',
        '851 enhancements',
        'Supervised release issues',
      ],
    },
    {
      title: 'Alternative Programs',
      description: 'Avoiding conviction through treatment',
      icon: '🎯',
      features: [
        'Drug court eligibility',
        'Deferred prosecution',
        'First offender programs',
        'Treatment alternatives',
        'Conditional discharge',
        'Record expungement',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the penalties for drug possession in NC and FL?',
      answer: 'Varies by drug schedule and amount. NC: Class 1 misdemeanor for small amounts of marijuana to Class C felony for Schedule I. FL: First-degree misdemeanor to third-degree felony. Prior convictions increase penalties. Trafficking charges trigger mandatory minimums starting at 3 years.',
    },
    {
      question: 'Can police search my car for drugs during a traffic stop?',
      answer: 'Only with probable cause, consent, or incident to arrest. Odor of marijuana may provide probable cause in some jurisdictions. Never consent to searches. Make it clear you don\'t consent. We challenge illegal searches to suppress evidence.',
    },
    {
      question: 'What\'s the difference between possession and trafficking?',
      answer: 'Weight thresholds determine trafficking: NC - 10 lbs marijuana, 28g cocaine, 4g heroin. FL - 25 lbs marijuana, 28g cocaine, 4g heroin/fentanyl. Trafficking carries mandatory minimum sentences regardless of intent to sell. Possession with intent falls between simple possession and trafficking.',
    },
    {
      question: 'Can I get drug charges dismissed or reduced?',
      answer: 'Yes, through various strategies: suppressing illegally obtained evidence, challenging drug weight/testing, negotiating lesser charges, drug court programs, deferred prosecution, substantial assistance cooperation. First offenders have best options. We explore every avenue.',
    },
    {
      question: 'Will drug conviction affect my immigration status?',
      answer: 'Yes! Even minor drug convictions can trigger deportation, bar naturalization, or prevent re-entry. Any drug offense except single possession of 30g or less marijuana is deportable. Controlled substance violations are particularly serious for immigration. Careful plea negotiation crucial.',
    },
    {
      question: 'Should I cooperate with police in drug investigations?',
      answer: 'Never speak without an attorney. Anything you say will be used against you. Don\'t try to talk your way out. Cooperation discussions should only happen through counsel who can negotiate immunity or reduced charges. Substantial assistance must be done correctly.',
    },
  ];

  const content = {
    introduction: `Drug charges can destroy your future - from simple possession to major trafficking cases. North Carolina and Florida aggressively prosecute drug crimes with harsh mandatory sentences. Our former prosecutors know how the state builds these cases and how to tear them apart. We fight for dismissals, reductions, and alternative programs that protect your record and freedom.`,

    processTitle: 'Drug Crime Defense Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Immediate representation and bond',
      },
      {
        step: '2',
        title: 'Evidence Review',
        description: 'Analyze searches, testing, and procedures',
      },
      {
        step: '3',
        title: 'Motion Practice',
        description: 'Suppress illegally obtained evidence',
      },
      {
        step: '4',
        title: 'Negotiation',
        description: 'Plea bargaining or program eligibility',
      },
      {
        step: '5',
        title: 'Trial/Resolution',
        description: 'Aggressive trial defense or best outcome',
      },
    ],

    urgencyTitle: '🚨 Act Fast - Evidence Disappears',
    urgencyMessage: 'Video footage gets deleted. Witnesses scatter. Drug testing deadlines pass. Early intervention leads to better outcomes.',

    whyChooseTitle: 'Why Choose Vasquez Law for Drug Crimes',
    whyChoosePoints: [
      'Former prosecutors with inside knowledge',
      'Constitutional law expertise',
      'Federal and state court experience',
      'Suppression motion success record',
      'Drug court and diversion programs',
      'Immigration consequence awareness',
      'Aggressive trial attorneys',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Drug Schedules and Penalties</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Schedule</th>
                <th className="py-3 px-4">Common Drugs</th>
                <th className="py-3 px-4">NC Penalty</th>
                <th className="py-3 px-4">FL Penalty</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">I</td>
                <td className="py-3 px-4">Heroin, LSD, Ecstasy</td>
                <td className="py-3 px-4">Class I-C Felony</td>
                <td className="py-3 px-4">3rd Degree Felony</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">II</td>
                <td className="py-3 px-4">Cocaine, Meth, Fentanyl</td>
                <td className="py-3 px-4">Class H-C Felony</td>
                <td className="py-3 px-4">2nd-3rd Degree Felony</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">III-V</td>
                <td className="py-3 px-4">Xanax, Steroids, Codeine</td>
                <td className="py-3 px-4">Class I-H Felony</td>
                <td className="py-3 px-4">3rd Degree-Misdemeanor</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">VI</td>
                <td className="py-3 px-4">Marijuana (NC)</td>
                <td className="py-3 px-4">Class 3-1 Misdemeanor</td>
                <td className="py-3 px-4">Misdemeanor (&lt;20g)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Trafficking Thresholds & Mandatory Minimums</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">North Carolina</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Marijuana: 10-50 lbs = 25 months minimum</li>
              <li>• Cocaine: 28-200g = 35 months minimum</li>
              <li>• Heroin: 4-14g = 70 months minimum</li>
              <li>• Meth: 28-200g = 70 months minimum</li>
              <li>• Fentanyl: 4-14g = 70 months minimum</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Florida</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Cannabis: 25-2000 lbs = 3 years minimum</li>
              <li>• Cocaine: 28-200g = 3 years minimum</li>
              <li>• Heroin: 4-14g = 3 years minimum</li>
              <li>• Fentanyl: 4-14g = 3 years minimum</li>
              <li>• Meth: 14-28g = 3 years minimum</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Constitutional Defenses We Use</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">1.</span>
              <div>
                <h3 className="font-bold text-white">Fourth Amendment Violations</h3>
                <p className="text-gray-300 text-sm">Illegal searches, no probable cause, invalid warrants</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">2.</span>
              <div>
                <h3 className="font-bold text-white">Fifth Amendment Violations</h3>
                <p className="text-gray-300 text-sm">Miranda violations, coerced confessions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">3.</span>
              <div>
                <h3 className="font-bold text-white">Sixth Amendment Violations</h3>
                <p className="text-gray-300 text-sm">Denial of counsel, speedy trial violations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">4.</span>
              <div>
                <h3 className="font-bold text-white">Chain of Custody Issues</h3>
                <p className="text-gray-300 text-sm">Missing evidence, contamination, testing errors</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Drug Crime Defense"
      subtitle="Former Prosecutors Fighting Drug Charges"
      description="Aggressive defense against all drug charges from possession to trafficking. Protecting your freedom and future."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
