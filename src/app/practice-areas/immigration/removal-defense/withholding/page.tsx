import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Withholding of Removal Attorney | Immigration Defense | NC & FL | Vasquez Law',
  description: 'Expert withholding of removal lawyers. Higher burden than asylum but fewer bars. Protected grounds persecution defense. 919-569-5882',
  keywords: 'withholding of removal attorney, immigration persecution lawyer, INA 241(b)(3), more likely than not standard, protected grounds attorney, immigration court defense, removal defense lawyer, Raleigh withholding attorney, Charlotte persecution defense, Orlando immigration court',
  openGraph: {
    title: 'Withholding of Removal Attorney | Persecution Defense | Vasquez Law',
    description: 'Mandatory protection from removal when persecution is more likely than not. Expert immigration defense.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function WithholdingOfRemovalPage() {
  const services = [
    {
      title: 'Persecution Evidence',
      description: 'Proving 51% likelihood',
      icon: '⚖️',
      features: [
        'Past persecution documentation',
        'Future threat assessment',
        'Government involvement proof',
        'Pattern evidence compilation',
        'Country condition reports',
        'Expert witness coordination',
      ],
    },
    {
      title: 'Protected Grounds',
      description: 'Nexus to persecution',
      icon: '🛡️',
      features: [
        'Race-based persecution',
        'Religious persecution',
        'Nationality targeting',
        'Political opinion cases',
        'Social group membership',
        'Mixed motive analysis',
      ],
    },
    {
      title: 'Criminal Bars',
      description: 'Overcoming disqualifications',
      icon: '🚫',
      features: [
        'Particularly serious crime analysis',
        'Aggravated felony review',
        'Security risk assessment',
        'Persecutor bar examination',
        'Firm resettlement issues',
        'CAT alternative consideration',
      ],
    },
    {
      title: 'Court Proceedings',
      description: 'Immigration Judge hearings',
      icon: '⚖️',
      features: [
        'Individual hearing preparation',
        'Testimony coaching',
        'Cross-examination defense',
        'Legal brief writing',
        'Evidence presentation',
        'Credibility preparation',
      ],
    },
    {
      title: 'Comparison Analysis',
      description: 'Asylum vs Withholding',
      icon: '📊',
      features: [
        'Burden of proof differences',
        'Benefits comparison',
        'Bar analysis',
        'Strategic considerations',
        'Concurrent applications',
        'Alternative relief options',
      ],
    },
    {
      title: 'Post-Grant Status',
      description: 'Life with withholding',
      icon: '📄',
      features: [
        'Work authorization process',
        'No path to green card',
        'No family derivatives',
        'Travel restrictions',
        'Annual renewal requirements',
        'Changed conditions monitoring',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is withholding of removal and how does it differ from asylum?',
      answer: 'Withholding prevents removal to country where life or freedom threatened due to race, religion, nationality, political opinion, or social group membership. Key differences from asylum: Higher burden - must prove persecution more likely than not (51%+) vs reasonable possibility (10%) for asylum. Mandatory if proven - judge must grant vs discretionary for asylum. Fewer bars - one-year deadline doesn\'t apply, some criminal bars different. Limited benefits - no green card path, no family included, cannot travel and return.',
    },
    {
      question: 'What must I prove to win withholding of removal?',
      answer: 'Three elements required: (1) More likely than not you\'ll face persecution - over 50% chance, higher than asylum standard, (2) Persecution on account of protected ground - race, religion, nationality, political opinion, particular social group, (3) Government persecution or unwillingness/inability to protect. Evidence needed: past persecution creates presumption, country evidence showing systematic persecution, personal threats or targeting, similar situated person harm, expert testimony on country conditions.',
    },
    {
      question: 'What crimes bar me from withholding of removal?',
      answer: 'Withholding barred if: convicted of particularly serious crime (any aggravated felony with 5+ year sentence presumed PSC, other aggravated felonies case-by-case, non-aggravated felonies rarely PSC), persecuted others, serious nonpolitical crime outside US, danger to US security, terrorism-related inadmissibility. Compare to asylum: asylum has more bars including aggravated felonies generally, withholding available to some with serious crimes if persecution proven. If barred from withholding, only CAT protection possible.',
    },
    {
      question: 'Can I get withholding if I missed the one-year asylum deadline?',
      answer: 'Yes - major advantage of withholding. No filing deadline for withholding of removal, unlike asylum\'s strict one-year rule. Many applicants seek both: apply for asylum as primary relief (better benefits), include withholding as alternative if asylum barred. Common scenario: been in US many years, never filed asylum, now in removal proceedings - asylum time-barred but withholding available. Must still meet higher burden of proof for withholding.',
    },
    {
      question: 'What happens after withholding of removal is granted?',
      answer: 'Protected from removal to country of feared persecution but: no path to green card ever through withholding, cannot petition for family members, cannot travel internationally and return, can be removed to third country if one will accept, must renew work authorization annually, status can be terminated if country conditions fundamentally change. Essentially stuck in limbo - safe from persecution but without permanent solution or family unity.',
    },
    {
      question: 'Should I apply for asylum or withholding of removal?',
      answer: 'Apply for both if eligible. Strategy: asylum as primary (lower burden, better benefits, path to green card), withholding as backup (higher burden but fewer bars), CAT as last resort if criminal issues. File all on same I-589 form. Judge considers asylum first - if denied for discretion, crime, or deadline, then considers withholding. If strong persecution case but asylum bars exist, focus evidence on withholding standard. Attorney essential for strategic decisions.',
    },
  ];

  const content = {
    introduction: `When facing persecution in your home country but barred from asylum, withholding of removal provides mandatory protection for those who can meet the higher burden of proof. This relief prevents deportation to countries where your life or freedom would be threatened based on race, religion, nationality, political opinion, or membership in a particular social group. Our experienced immigration attorneys in Raleigh, Charlotte, Smithfield, and Orlando understand the complexities of proving persecution is more likely than not and work tirelessly to present compelling evidence that meets this demanding standard. While withholding doesn't offer a path to permanent residence, it provides crucial protection when return means persecution or death.`,

    processTitle: 'Withholding of Removal Process',
    process: [
      {
        step: '1',
        title: 'Case Assessment',
        description: 'Evaluate persecution likelihood',
      },
      {
        step: '2',
        title: 'Evidence Development',
        description: 'Document 51%+ probability',
      },
      {
        step: '3',
        title: 'I-589 Filing',
        description: 'Submit with asylum application',
      },
      {
        step: '4',
        title: 'Individual Hearing',
        description: 'Present persecution evidence',
      },
      {
        step: '5',
        title: 'Protection Grant',
        description: 'Withholding ordered if proven',
      },
    ],

    urgencyTitle: '⚠️ Higher Burden But Fewer Bars',
    urgencyMessage: 'Must prove more likely than not standard. No deadline but evidence deteriorates. Country conditions constantly changing. Expert testimony critical.',

    whyChooseTitle: 'Why Choose Vasquez Law for Withholding',
    whyChoosePoints: [
      'High success rate meeting 51% standard',
      'Country condition experts network',
      'Persecution evidence specialists',
      'Immigration court trial experience',
      'Strategic asylum/withholding applications',
      'Bilingual services - Se habla español',
      'Criminal immigration expertise',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Asylum vs. Withholding of Removal Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Factor</th>
                <th className="py-3 px-4">Asylum</th>
                <th className="py-3 px-4">Withholding</th>
                <th className="py-3 px-4">Strategic Impact</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Burden of Proof</td>
                <td className="py-3 px-4">10% chance (reasonable)</td>
                <td className="py-3 px-4">51% chance (more likely)</td>
                <td className="py-3 px-4">Harder to prove</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Filing Deadline</td>
                <td className="py-3 px-4">1 year strict</td>
                <td className="py-3 px-4">No deadline</td>
                <td className="py-3 px-4">Major advantage</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Green Card Path</td>
                <td className="py-3 px-4">Yes, after 1 year</td>
                <td className="py-3 px-4">Never</td>
                <td className="py-3 px-4">Critical limitation</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Family Included</td>
                <td className="py-3 px-4">Spouse/children</td>
                <td className="py-3 px-4">No derivatives</td>
                <td className="py-3 px-4">Family separation</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Criminal Bars</td>
                <td className="py-3 px-4">Many crimes bar</td>
                <td className="py-3 px-4">Only PSC bars</td>
                <td className="py-3 px-4">More forgiving</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Travel Ability</td>
                <td className="py-3 px-4">Refugee travel doc</td>
                <td className="py-3 px-4">Cannot travel</td>
                <td className="py-3 px-4">Stuck in US</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Discretionary</td>
                <td className="py-3 px-4">Judge discretion</td>
                <td className="py-3 px-4">Mandatory if proven</td>
                <td className="py-3 px-4">Must grant if eligible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Proving More Likely Than Not Persecution</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Strong Evidence Types</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Past persecution documentation</li>
              <li>✓ Medical evidence of torture</li>
              <li>✓ Death threats with proof</li>
              <li>✓ Family members harmed/killed</li>
              <li>✓ Arrest warrants/charges</li>
              <li>✓ Media coverage of targeting</li>
              <li>✓ Government statements against group</li>
              <li>✓ Pattern evidence of group persecution</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Country Condition Proof</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ State Department reports</li>
              <li>✓ Human rights organization reports</li>
              <li>✓ Expert witness testimony</li>
              <li>✓ Academic studies on persecution</li>
              <li>✓ UN refugee agency reports</li>
              <li>✓ News articles showing pattern</li>
              <li>✓ Statistical data on violence</li>
              <li>✓ Government inability to protect</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Particularly Serious Crime Analysis</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Criminal Bars to Withholding</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-red-400 font-bold mb-2">Automatic PSC (Particularly Serious Crime)</h4>
              <p className="text-gray-300 text-sm">Aggravated felony with aggregate sentence of 5+ years = presumed PSC. Very difficult to rebut presumption. Includes suspended sentences.</p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">Case-by-Case PSC Determination</h4>
              <p className="text-gray-300 text-sm">Other aggravated felonies: judge considers nature of conviction, circumstances, sentence imposed, danger to community. Drug trafficking usually PSC.</p>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Non-Aggravated Felonies</h4>
              <p className="text-gray-300 text-sm">Rarely found PSC. Must be serious felony with significant sentence. DUI, simple assault, minor drug possession generally not PSC.</p>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-2">If Barred from Withholding</h4>
              <p className="text-gray-300 text-sm">Only option is CAT protection - no criminal bars but must prove torture by government. Higher burden but last resort for serious criminals.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Life with Withholding of Removal</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Limitations and Realities</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">What You CAN Do</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Remain in US indefinitely</li>
                <li>✓ Work with authorization</li>
                <li>✓ Get driver's license</li>
                <li>✓ Access emergency medical care</li>
                <li>✓ Send children to school</li>
                <li>✓ Own property</li>
                <li>✓ Pay taxes</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">What You CANNOT Do</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✗ Get green card ever</li>
                <li>✗ Petition for family</li>
                <li>✗ Travel internationally</li>
                <li>✗ Vote in elections</li>
                <li>✗ Get federal benefits</li>
                <li>✗ Become US citizen</li>
                <li>✗ Feel fully secure</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ Permanent limbo status - safe but never settled</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Withholding of Removal Attorney"
      subtitle="Mandatory Protection When Persecution is More Likely Than Not"
      description="Expert attorneys proving the higher burden for withholding when asylum is barred but persecution is real."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
