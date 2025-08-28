import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prosecutorial Discretion Attorney | ICE Discretion | NC & FL | Vasquez Law',
  description: 'Expert prosecutorial discretion lawyers. Administrative closure, deferred action, ICE priorities. Immigration defense. 919-569-5882',
  keywords: 'prosecutorial discretion attorney, ICE discretion lawyer, administrative closure immigration, deferred action attorney, Morton memo, enforcement priorities, immigration court closure, Raleigh ICE attorney, Charlotte prosecutorial discretion, Orlando immigration priorities',
  openGraph: {
    title: 'Prosecutorial Discretion Immigration Attorney | ICE Priorities | Vasquez Law',
    description: 'Stop deportation through prosecutorial discretion. Administrative closure and deferred action requests.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ProsecutorialDiscretionPage() {
  const services = [
    {
      title: 'ICE Priority Assessment',
      description: 'Enforcement priority analysis',
      icon: '🎯',
      features: [
        'Priority category evaluation',
        'Criminal history review',
        'Community ties assessment',
        'Military service consideration',
        'Family circumstances analysis',
        'Humanitarian factors review',
      ],
    },
    {
      title: 'Discretion Requests',
      description: 'Formal PD applications',
      icon: '📋',
      features: [
        'Pre-filing discretion requests',
        'Stay of removal petitions',
        'Deferred action applications',
        'Administrative closure motions',
        'Joint motions to dismiss',
        'Non-priority determinations',
      ],
    },
    {
      title: 'Evidence Packages',
      description: 'Compelling documentation',
      icon: '📁',
      features: [
        'Positive equity documentation',
        'Community support letters',
        'Medical condition evidence',
        'Educational achievements',
        'Employment history proof',
        'Tax compliance records',
      ],
    },
    {
      title: 'DHS Negotiations',
      description: 'Government attorney discussions',
      icon: '🤝',
      features: [
        'Trial attorney meetings',
        'OPLA negotiations',
        'ICE field office requests',
        'Stipulation agreements',
        'Case resolution options',
        'Alternative relief discussions',
      ],
    },
    {
      title: 'Special Populations',
      description: 'Protected categories',
      icon: '🛡️',
      features: [
        'DACA recipients',
        'Military members/veterans',
        'Crime victims/witnesses',
        'Pregnant women',
        'Primary caregivers',
        'Mental health cases',
      ],
    },
    {
      title: 'Post-Grant Monitoring',
      description: 'Maintaining discretion',
      icon: '📊',
      features: [
        'Check-in compliance',
        'Status maintenance',
        'Work permit renewals',
        'Address updates',
        'Criminal record monitoring',
        'Policy change tracking',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is prosecutorial discretion in immigration?',
      answer: 'ICE and DHS authority to decide whether to enforce immigration laws against specific individuals. Options include: not initiating removal proceedings, administrative closure of cases, deferred action (temporary protection), stays of removal, agreeing to relief, not appealing grants. Based on priorities: national security threats, serious criminals, recent border crossers are priorities. Long-term residents with equities, families, veterans are low priority. Not a legal status but practical protection.',
    },
    {
      question: 'Who qualifies for prosecutorial discretion in 2025?',
      answer: 'Positive factors: long-term presence (10+ years), USC/LPR immediate family, primary caregiver for USC/LPR, serious medical conditions, elderly individuals, crime victims or witnesses, military service members/veterans, students and young adults, no criminal history, tax compliance. Negative factors: serious criminal convictions, recent illegal entry, immigration fraud, public safety concerns, gang membership, prior deportations. Balance of factors determines eligibility.',
    },
    {
      question: 'How do I request prosecutorial discretion?',
      answer: 'Multiple avenues: (1) Before filing - request ICE not initiate proceedings, (2) After NTA issued - request from OPLA trial attorney, (3) In court - joint motion for administrative closure or dismissal, (4) Post-order - request stay of removal from ICE, (5) Detained cases - request from ICE ERO. Include: cover letter explaining equities, supporting documentation, criminal history explanation if applicable, evidence of rehabilitation, community support letters. No official form but comprehensive package essential.',
    },
    {
      question: 'What is the difference between administrative closure and dismissal?',
      answer: 'Administrative closure: case removed from active docket but not terminated, can be recalendared by either party, removal proceedings technically continue, no final order issued, allows time for other relief. Dismissal/Termination: ends removal proceedings completely, NTA terminated, must start new proceedings to deport, more permanent than closure, harder to obtain. Both require DHS agreement or judge\'s discretion. Closure more common when waiting for other petitions.',
    },
    {
      question: 'Can prosecutorial discretion lead to legal status?',
      answer: 'PD itself does not provide legal status - it\'s temporary forbearance from enforcement. However, it can: allow time to pursue other immigration benefits (family petitions, employment sponsorship), permit work authorization in some cases (deferred action), prevent accrual of unlawful presence, enable completion of education or military service, provide stability while legislation pending. Not a path to green card but can facilitate other paths. Subject to change with new administrations or policies.',
    },
    {
      question: 'What happens if priorities change or discretion is revoked?',
      answer: 'Prosecutorial discretion can be revoked if: commit new crimes, become enforcement priority, administration policy changes, violate terms of discretion, new negative information emerges. If revoked: removal proceedings restart if administratively closed, deportation can proceed if stayed, work authorization terminated, must seek other relief quickly. Best practice: maintain clean record, comply with all requirements, have backup plan, monitor policy changes, consider pursuing permanent relief while protected.',
    },
  ];

  const content = {
    introduction: `Not everyone in removal proceedings is an enforcement priority. Through prosecutorial discretion, ICE and DHS can choose to defer or decline enforcement against individuals who pose no threat and have strong ties to the United States. Our experienced immigration attorneys in Raleigh, Charlotte, Smithfield, and Orlando understand how to present compelling discretion requests that highlight positive equities, demonstrate community value, and align with current enforcement priorities. We work directly with ICE officials and government attorneys to secure administrative closure, deferred action, or case dismissal for deserving clients who should not be deported.`,

    processTitle: 'Prosecutorial Discretion Process',
    process: [
      {
        step: '1',
        title: 'Priority Assessment',
        description: 'Evaluate enforcement priority level',
      },
      {
        step: '2',
        title: 'Package Preparation',
        description: 'Compile positive equity evidence',
      },
      {
        step: '3',
        title: 'Request Submission',
        description: 'File with ICE/OPLA/Court',
      },
      {
        step: '4',
        title: 'Negotiation',
        description: 'Discuss with government attorney',
      },
      {
        step: '5',
        title: 'Decision',
        description: 'Discretion granted or denied',
      },
    ],

    urgencyTitle: '⚠️ Enforcement Priorities Change - Act Now',
    urgencyMessage: 'Administration policies shift regularly. Current low priorities may become high priorities. Build your case while favorable policies exist. Document equities now.',

    whyChooseTitle: 'Why Choose Vasquez Law for Prosecutorial Discretion',
    whyChoosePoints: [
      'Direct relationships with ICE officials',
      'OPLA negotiation experience',
      'Understanding of enforcement priorities',
      'Compelling equity presentations',
      'Administrative closure expertise',
      'Bilingual services - Se habla español',
      'Quick response to policy changes',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">2025 ICE Enforcement Priorities</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Priority Level</th>
                <th className="py-3 px-4">Categories</th>
                <th className="py-3 px-4">Discretion Likelihood</th>
                <th className="py-3 px-4">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Priority 1</td>
                <td className="py-3 px-4">National security, terrorism</td>
                <td className="py-3 px-4">Very unlikely</td>
                <td className="py-3 px-4">Seek other relief</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Priority 2</td>
                <td className="py-3 px-4">Serious criminals, gang members</td>
                <td className="py-3 px-4">Unlikely</td>
                <td className="py-3 px-4">Show rehabilitation</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Priority 3</td>
                <td className="py-3 px-4">Recent entrants (after 2020)</td>
                <td className="py-3 px-4">Possible with equities</td>
                <td className="py-3 px-4">Emphasize ties</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Non-Priority</td>
                <td className="py-3 px-4">Long residents, families</td>
                <td className="py-3 px-4">Likely</td>
                <td className="py-3 px-4">Request immediately</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Protected</td>
                <td className="py-3 px-4">Witnesses, victims, pregnant</td>
                <td className="py-3 px-4">Very likely</td>
                <td className="py-3 px-4">Document status</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Priorities subject to change with administration policies</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Positive Equities for Discretion</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Strong Positive Factors</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ USC/LPR spouse and children</li>
              <li>✓ 10+ years continuous presence</li>
              <li>✓ Military service or veteran status</li>
              <li>✓ Primary caregiver for disabled</li>
              <li>✓ Victim of crime or trafficking</li>
              <li>✓ Serious medical conditions</li>
              <li>✓ Young arrival (under 16)</li>
              <li>✓ Educational achievements</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Supporting Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Tax returns showing compliance</li>
              <li>✓ Property ownership documents</li>
              <li>✓ Employment verification letters</li>
              <li>✓ School enrollment for children</li>
              <li>✓ Medical records and prognosis</li>
              <li>✓ Community service records</li>
              <li>✓ Letters from employers/clergy</li>
              <li>✓ Military discharge papers</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Prosecutorial Discretion</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Available Options</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Deferred Action</h4>
              <p className="text-gray-300 text-sm">Formal decision not to pursue removal for specific period. May include work authorization. Renewable but not permanent.</p>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Administrative Closure</h4>
              <p className="text-gray-300 text-sm">Removes case from active court docket. No final order. Can pursue other relief. Either party can recalendar.</p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">Stay of Removal</h4>
              <p className="text-gray-300 text-sm">Temporary halt to deportation after final order. Usually short-term. Allows time to pursue other options.</p>
            </div>
            <div>
              <h4 className="text-purple-400 font-bold mb-2">Order of Supervision</h4>
              <p className="text-gray-300 text-sm">Alternative to detention. Regular check-ins with ICE. May include work authorization. For those with final orders.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Making Your Discretion Request</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Essential Components</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Request Letter Should Include</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Clear request for specific relief</li>
                <li>• Timeline of presence in US</li>
                <li>• Family relationships detailed</li>
                <li>• Employment and tax history</li>
                <li>• Community involvement</li>
                <li>• Explanation of any crimes</li>
                <li>• Hardship if deported</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Attach These Documents</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Birth certificates of children</li>
                <li>• Marriage certificate</li>
                <li>• Tax returns (5 years)</li>
                <li>• Employment letters</li>
                <li>• Medical documentation</li>
                <li>• Character references (10+)</li>
                <li>• Proof of rehabilitation</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ Submit complete package - supplements rarely accepted</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Prosecutorial Discretion Attorney"
      subtitle="Strategic Immigration Enforcement Relief"
      description="Expert attorneys securing prosecutorial discretion, administrative closure, and deferred action from ICE."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
