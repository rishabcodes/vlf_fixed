import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CAT Protection Attorney | Convention Against Torture | NC & FL | Vasquez Law',
  description: 'Expert CAT protection lawyers. Withholding and deferral under Convention Against Torture. Immigration court defense. 919-569-5882',
  keywords: 'CAT protection attorney, Convention Against Torture lawyer, torture protection immigration, withholding of removal CAT, deferral of removal, immigration court defense, torture evidence attorney, Raleigh CAT lawyer, Charlotte torture protection, Orlando immigration defense',
  openGraph: {
    title: 'Convention Against Torture Attorney | CAT Protection | Vasquez Law',
    description: 'Protection from deportation to countries where torture is likely. CAT withholding and deferral of removal.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function CATProtectionPage() {
  const services = [
    {
      title: 'CAT Eligibility',
      description: 'Torture risk assessment',
      icon: '🛡️',
      features: [
        'More likely than not standard',
        'Government involvement analysis',
        'Acquiescence determinations',
        'Past torture documentation',
        'Future risk evaluation',
        'Country conditions research',
      ],
    },
    {
      title: 'Evidence Development',
      description: 'Proving torture likelihood',
      icon: '📋',
      features: [
        'Medical torture documentation',
        'Psychological evaluations',
        'Country expert reports',
        'Human rights reports',
        'State Department materials',
        'News and NGO documentation',
      ],
    },
    {
      title: 'Criminal Bar Issues',
      description: 'Overcoming disqualifications',
      icon: '⚖️',
      features: [
        'Aggravated felony cases',
        'Particularly serious crimes',
        'Security-related bars',
        'Deferral vs withholding',
        'Mandatory bars analysis',
        'Alternative relief options',
      ],
    },
    {
      title: 'Government Acquiescence',
      description: 'Proving state involvement',
      icon: '🏛️',
      features: [
        'Public official torture',
        'Willful blindness proof',
        'Inability to control',
        'Corruption evidence',
        'Police brutality cases',
        'Prison condition evidence',
      ],
    },
    {
      title: 'Court Proceedings',
      description: 'Immigration Judge hearings',
      icon: '⚖️',
      features: [
        'Individual hearing preparation',
        'Expert witness coordination',
        'Cross-examination defense',
        'Legal brief writing',
        'Credibility preparation',
        'Appeal strategies',
      ],
    },
    {
      title: 'Post-Grant Issues',
      description: 'Life under CAT protection',
      icon: '📄',
      features: [
        'Annual review preparation',
        'Travel document applications',
        'Employment authorization',
        'Family derivative petitions',
        'Status adjustment options',
        'Termination defense',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What qualifies for protection under the Convention Against Torture?',
      answer: 'Must prove more likely than not (over 50% chance) you will be tortured if returned to your country. Torture means severe pain or suffering, physical or mental, intentionally inflicted by or with consent/acquiescence of public official, for purposes like punishment, intimidation, discrimination, or obtaining confession. Not lawful sanctions. Government must be involved - purely private violence doesn\'t qualify. Past torture creates presumption of future torture.',
    },
    {
      question: 'What is the difference between CAT withholding and deferral of removal?',
      answer: 'CAT withholding: For those without serious criminal bars. More stable status, harder to terminate, includes work authorization, can lead to other immigration benefits. CAT deferral: For those with aggravated felonies, particularly serious crimes, or security bars who still face torture. Less stable, easier to terminate, reviewed more frequently, but still prevents deportation. Both prohibit return to country of torture but allow removal to safe third country.',
    },
    {
      question: 'How do I prove government acquiescence to torture?',
      answer: 'Three ways: (1) Direct participation - government officials conduct torture, (2) Willful acceptance - government aware of torture and breach duty to prevent it, (3) Willful blindness - government turns blind eye to torture by private actors. Evidence includes: country reports showing systematic torture, corruption preventing protection, police involvement in violence, inability or unwillingness to control private actors, past personal experience with authorities.',
    },
    {
      question: 'Can criminals get CAT protection?',
      answer: 'Yes, even those with aggravated felonies or particularly serious crimes can get CAT deferral of removal if they prove torture likelihood. No criminal bar to CAT protection - even murderers, drug traffickers, and terrorists can qualify if torture proven. However, get deferral not withholding, subject to detention, limited benefits, easier termination. Judge still weighs dangerousness but cannot deny if torture established.',
    },
    {
      question: 'What evidence is most important for CAT cases?',
      answer: 'Country condition evidence crucial: State Department Human Rights Reports, Amnesty International reports, Human Rights Watch documentation, UN reports on torture, medical documentation of past torture, psychological evaluations showing PTSD, expert witness testimony on country conditions, news articles showing systematic torture, personal testimony about past experiences, letters from family about current dangers. Need objective evidence beyond personal testimony.',
    },
    {
      question: 'How long does CAT protection last?',
      answer: 'CAT protection continues until conditions change in home country or you become removable to a safe third country. Withholding of removal: Reviewed if DHS shows conditions fundamentally changed. Deferral: Reviewed more frequently, sometimes annually for detained cases. Can be terminated if: country conditions improve significantly, third country accepts you, you commit new crimes (for withholding), you travel back voluntarily. Work authorization renewed annually.',
    },
  ];

  const content = {
    introduction: `When returning to your home country means facing torture, the Convention Against Torture provides a last line of defense against deportation. This protection applies even to those with serious criminal convictions or other bars to asylum. Our experienced CAT attorneys in Raleigh, Charlotte, Smithfield, and Orlando understand the high burden of proof required and work tirelessly to document government involvement in torture through country experts, medical evaluations, and comprehensive evidence packages. We've successfully protected clients from deportation to countries where they face persecution by police, military, gangs with government acquiescence, and prison systems that constitute torture.`,

    processTitle: 'CAT Protection Process',
    process: [
      {
        step: '1',
        title: 'Torture Assessment',
        description: 'Evaluate likelihood and government role',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Country conditions and personal proof',
      },
      {
        step: '3',
        title: 'Application Filing',
        description: 'I-589 with CAT claim',
      },
      {
        step: '4',
        title: 'Individual Hearing',
        description: 'Present torture evidence to judge',
      },
      {
        step: '5',
        title: 'Protection Grant',
        description: 'Withholding or deferral ordered',
      },
    ],

    urgencyTitle: '⚠️ Last Resort Protection - High Burden of Proof',
    urgencyMessage: 'Must prove over 50% chance of torture. Country evidence constantly changing. Witnesses and documents harder to obtain over time. Expert testimony expensive.',

    whyChooseTitle: 'Why Choose Vasquez Law for CAT Protection',
    whyChoosePoints: [
      'Successful CAT cases in multiple countries',
      'Country condition expert network',
      'Medical torture documentation experience',
      'Immigration court trial expertise',
      'Criminal immigration law knowledge',
      'Bilingual services - Se habla español',
      'Detained case experience',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Torture Recognized Under CAT</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Type of Torture</th>
                <th className="py-3 px-4">Examples</th>
                <th className="py-3 px-4">Government Role</th>
                <th className="py-3 px-4">Evidence Needed</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Police Brutality</td>
                <td className="py-3 px-4">Beatings, electric shock</td>
                <td className="py-3 px-4">Direct involvement</td>
                <td className="py-3 px-4">Medical records, reports</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Prison Conditions</td>
                <td className="py-3 px-4">Overcrowding, denial of medical</td>
                <td className="py-3 px-4">State custody</td>
                <td className="py-3 px-4">Prison reports, survivor testimony</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Gang Violence</td>
                <td className="py-3 px-4">Extortion, murder</td>
                <td className="py-3 px-4">Police complicity</td>
                <td className="py-3 px-4">Corruption evidence</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Gender-Based</td>
                <td className="py-3 px-4">FGM, honor killings</td>
                <td className="py-3 px-4">Failure to protect</td>
                <td className="py-3 px-4">Law enforcement inadequacy</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Mental Torture</td>
                <td className="py-3 px-4">Mock executions, threats</td>
                <td className="py-3 px-4">Psychological warfare</td>
                <td className="py-3 px-4">Psych evaluations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Country Conditions Evidence Sources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Government Reports</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ State Department Human Rights Reports</li>
              <li>✓ State Department Religious Freedom</li>
              <li>✓ CIA World Factbook</li>
              <li>✓ Congressional Research Service</li>
              <li>✓ UK Home Office Reports</li>
              <li>✓ Canadian IRB Reports</li>
              <li>✓ European asylum documentation</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">NGO & International</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Amnesty International</li>
              <li>✓ Human Rights Watch</li>
              <li>✓ Freedom House</li>
              <li>✓ UN Special Rapporteur reports</li>
              <li>✓ International Crisis Group</li>
              <li>✓ Physicians for Human Rights</li>
              <li>✓ Local human rights organizations</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Proving Government Acquiescence</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Three Levels of Government Involvement</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-red-400 font-bold mb-2">1. Direct Torture by Officials</h4>
              <p className="text-gray-300 text-sm">Police, military, intelligence services, prison guards directly inflicting torture. Easiest to prove with documentation of past incidents, medical evidence, witness statements.</p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">2. Consent or Acquiescence</h4>
              <p className="text-gray-300 text-sm">Government aware of torture by private actors and fails to intervene. Corruption, complicity, or inability to control. Need evidence of government knowledge and inaction.</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">3. Willful Blindness</h4>
              <p className="text-gray-300 text-sm">Government deliberately avoids learning about torture to maintain deniability. Pattern of ignoring reports, failing to investigate, no prosecution of torturers.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">CAT vs Other Forms of Protection</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Comparison of Relief Options</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-red-500/30">
                  <th className="py-2 px-3 text-red-400">Factor</th>
                  <th className="py-2 px-3">Asylum</th>
                  <th className="py-2 px-3">Withholding</th>
                  <th className="py-2 px-3">CAT</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Burden of Proof</td>
                  <td className="py-2 px-3">10% chance</td>
                  <td className="py-2 px-3">51% chance</td>
                  <td className="py-2 px-3">51% chance</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Criminal Bars</td>
                  <td className="py-2 px-3">Many bars</td>
                  <td className="py-2 px-3">Some bars</td>
                  <td className="py-2 px-3">No bars</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Protected Ground</td>
                  <td className="py-2 px-3">Required</td>
                  <td className="py-2 px-3">Required</td>
                  <td className="py-2 px-3">Not required</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Path to Green Card</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">No</td>
                  <td className="py-2 px-3">No</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Family Included</td>
                  <td className="py-2 px-3">Yes</td>
                  <td className="py-2 px-3">No</td>
                  <td className="py-2 px-3">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Convention Against Torture Attorney"
      subtitle="Protection from Deportation to Countries Where Torture is Likely"
      description="Expert CAT protection lawyers proving government-involved torture risks in Immigration Court."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
