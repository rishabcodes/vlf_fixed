import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motion to Reopen Attorney | Immigration Appeals | NC & FL | Vasquez Law',
  description: 'Expert motion to reopen lawyers. New evidence, changed circumstances, ineffective counsel. BIA and Immigration Court. 919-569-5882',
  keywords: 'motion to reopen attorney, immigration appeals lawyer, BIA motion reopen, new evidence immigration, changed country conditions, ineffective assistance counsel, immigration court reopen, Raleigh immigration appeals, Charlotte BIA attorney, Orlando motion reconsider',
  openGraph: {
    title: 'Motion to Reopen Immigration Attorney | BIA Appeals | Vasquez Law',
    description: 'Reopen your immigration case with new evidence or changed circumstances. Expert BIA and Immigration Court appeals.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function MotionsToReopenPage() {
  const services = [
    {
      title: 'New Evidence Cases',
      description: 'Previously unavailable proof',
      icon: '📄',
      features: [
        'Documents from home country',
        'Medical diagnoses',
        'Expert witness reports',
        'Government policy changes',
        'Family status changes',
        'Criminal case updates',
      ],
    },
    {
      title: 'Changed Circumstances',
      description: 'Country conditions & personal',
      icon: '🌍',
      features: [
        'Country condition changes',
        'New persecution risks',
        'Government regime changes',
        'Marriage to USC/LPR',
        'Birth of USC children',
        'Medical emergencies',
      ],
    },
    {
      title: 'Ineffective Counsel',
      description: 'Prior attorney failures',
      icon: '⚖️',
      features: [
        'Failure to file appeals',
        'Missing critical evidence',
        'Wrong legal arguments',
        'Conflict of interest',
        'Abandonment of case',
        'Bar complaint filing',
      ],
    },
    {
      title: 'In Absentia Orders',
      description: 'Failure to appear cases',
      icon: '🚫',
      features: [
        'No proper notice received',
        'Exceptional circumstances',
        'Address not updated',
        'Emergency prevented appearance',
        'Attorney failed to appear',
        'Court error in scheduling',
      ],
    },
    {
      title: 'BIA Appeals',
      description: 'Board of Immigration Appeals',
      icon: '📋',
      features: [
        '90-day deadline compliance',
        'Legal brief drafting',
        'Record compilation',
        'Oral argument requests',
        'Regulatory compliance',
        'Circuit court coordination',
      ],
    },
    {
      title: 'Joint Motions',
      description: 'Government agreement',
      icon: '🤝',
      features: [
        'DHS consent negotiation',
        'Prosecutorial discretion',
        'Administrative closure',
        'Stipulated remands',
        'Settlement agreements',
        'Status regularization',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the deadlines for filing a motion to reopen?',
      answer: 'Generally must file within 90 days of final removal order. Exceptions: no deadline for changed country conditions in asylum cases, no deadline for in absentia orders if no notice received, no deadline for battered spouses (VAWA), no deadline if government agrees (joint motion). BIA has different rules: 90 days for most cases, 180 days for in absentia. Only one motion to reopen allowed unless exceptions apply. File immediately - courts strictly enforce deadlines.',
    },
    {
      question: 'What qualifies as new evidence for a motion to reopen?',
      answer: 'Evidence must be: (1) Material - would likely change outcome, (2) Previously unavailable - not just undiscovered, (3) Not available at time of hearing despite due diligence. Examples: new country condition reports showing increased danger, medical diagnosis not previously available, marriage certificate to USC/LPR after proceedings, birth of USC children, criminal case dismissal or vacatur, new precedent decisions changing law. Cannot be evidence you chose not to present or forgot about.',
    },
    {
      question: 'How do I prove ineffective assistance of counsel?',
      answer: 'Lozada requirements: (1) Affidavit detailing agreement with counsel, what counsel did/didn\'t do, how it prejudiced case, (2) Inform former counsel of allegations and provide opportunity to respond, (3) File bar complaint or explain why not filed. Must show counsel\'s performance fell below reasonable standards AND different outcome likely with competent counsel. Common grounds: missed deadlines, failure to submit evidence, incorrect legal advice, not showing up to hearings.',
    },
    {
      question: 'Can I file multiple motions to reopen?',
      answer: 'Generally limited to ONE motion to reopen, but exceptions exist: (1) Changed country conditions for asylum - no numerical limit, (2) In absentia removal orders - can file based on lack of notice, (3) VAWA cases - special provisions, (4) Joint motions with government agreement, (5) Sua sponte reopening by court/BIA - no limit but rare. Strategic consideration: use your one motion wisely. Can sometimes file motion to reconsider separately if based on legal errors.',
    },
    {
      question: 'What happens if my motion to reopen is granted?',
      answer: 'Case returns to previous posture: If Immigration Court grants - new hearing scheduled, can present new evidence/arguments, previous order vacated, may get bond hearing. If BIA grants - usually remands to Immigration Court, sometimes decides case itself, can order specific proceedings. Not a guarantee of different outcome - must still win underlying case. Stay of removal not automatic - must request separately. Can pursue original or new forms of relief.',
    },
    {
      question: 'How long does a motion to reopen take to decide?',
      answer: 'Immigration Court: 3-6 months typically, expedited if detained. BIA: 6-12 months average, longer if complex. Emergency motions: can request expedited review for urgent circumstances. Factors affecting timing: court backlog, complexity of issues, need for response from DHS, whether briefing scheduled. During wait: removal order remains in effect unless stay granted, can be detained or removed, should request stay immediately.',
    },
  ];

  const content = {
    introduction: `A removal order doesn't have to be the final word. When new evidence emerges, circumstances change dramatically, or your previous attorney failed you, a motion to reopen can provide a second chance at relief. Our experienced immigration attorneys in Raleigh, Charlotte, Smithfield, and Orlando understand the strict requirements for reopening cases and work diligently to meet deadlines, compile compelling evidence, and present persuasive arguments to Immigration Judges and the Board of Immigration Appeals. Time is critical - most motions must be filed within 90 days, and courts rarely grant extensions.`,

    processTitle: 'Motion to Reopen Process',
    process: [
      {
        step: '1',
        title: 'Case Analysis',
        description: 'Review order and identify grounds',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Compile new/unavailable evidence',
      },
      {
        step: '3',
        title: 'Motion Drafting',
        description: 'Legal brief with exhibits',
      },
      {
        step: '4',
        title: 'Filing & Service',
        description: 'Submit to court/BIA and DHS',
      },
      {
        step: '5',
        title: 'Decision',
        description: 'Reopening granted or denied',
      },
    ],

    urgencyTitle: '⏰ Strict 90-Day Deadline - Act Immediately',
    urgencyMessage: 'Most motions must be filed within 90 days of final order. No extensions granted. Evidence gathering takes time. One motion limit for most cases.',

    whyChooseTitle: 'Why Choose Vasquez Law for Motions to Reopen',
    whyChoosePoints: [
      'High success rate on reopening motions',
      'BIA appeals expertise',
      'Emergency filing capability',
      'Ineffective counsel claim experience',
      'Country condition monitoring',
      'Bilingual services - Se habla español',
      'Former immigration prosecutor insights',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Grounds for Motion to Reopen</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Ground</th>
                <th className="py-3 px-4">Time Limit</th>
                <th className="py-3 px-4">Number Limit</th>
                <th className="py-3 px-4">Key Requirements</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">New Evidence</td>
                <td className="py-3 px-4">90 days</td>
                <td className="py-3 px-4">One motion</td>
                <td className="py-3 px-4">Material, unavailable before</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Changed Country</td>
                <td className="py-3 px-4">No limit</td>
                <td className="py-3 px-4">No limit</td>
                <td className="py-3 px-4">Asylum/CAT only</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">In Absentia</td>
                <td className="py-3 px-4">180 days*</td>
                <td className="py-3 px-4">One motion</td>
                <td className="py-3 px-4">No notice or exceptional</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Ineffective Counsel</td>
                <td className="py-3 px-4">90 days</td>
                <td className="py-3 px-4">One motion</td>
                <td className="py-3 px-4">Lozada compliance</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">VAWA</td>
                <td className="py-3 px-4">No limit</td>
                <td className="py-3 px-4">One motion</td>
                <td className="py-3 px-4">Abuse evidence</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Joint Motion</td>
                <td className="py-3 px-4">No limit</td>
                <td className="py-3 px-4">No limit</td>
                <td className="py-3 px-4">DHS agreement</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*No time limit if no notice received</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Evidence Requirements by Type</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Changed Country Conditions</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Recent State Department reports</li>
              <li>✓ News articles about changes</li>
              <li>✓ Expert witness affidavits</li>
              <li>✓ NGO reports on new risks</li>
              <li>✓ Personal threats received</li>
              <li>✓ Family member harm evidence</li>
              <li>✓ Government change documentation</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">New Personal Circumstances</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Marriage certificate to USC/LPR</li>
              <li>✓ Birth certificates of USC children</li>
              <li>✓ Medical diagnosis documents</li>
              <li>✓ Criminal case dismissals</li>
              <li>✓ Employment authorization</li>
              <li>✓ Property ownership proof</li>
              <li>✓ Community ties evidence</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Ineffective Assistance of Counsel (Lozada) Requirements</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Three Mandatory Steps</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">1️⃣</div>
              <div>
                <h4 className="text-blue-400 font-bold">Detailed Affidavit</h4>
                <p className="text-gray-300 text-sm">Set forth in detail: agreement with counsel, what counsel did or failed to do, how you were prejudiced</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">2️⃣</div>
              <div>
                <h4 className="text-green-400 font-bold">Notice to Former Counsel</h4>
                <p className="text-gray-300 text-sm">Inform counsel of allegations, provide opportunity to respond, include response if received</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">3️⃣</div>
              <div>
                <h4 className="text-yellow-400 font-bold">Bar Complaint</h4>
                <p className="text-gray-300 text-sm">File complaint with state bar or explain why not filed (counsel left jurisdiction, fear, etc.)</p>
              </div>
            </div>
          </div>
          <p className="text-red-400 mt-4">⚠️ Failure to comply with Lozada = motion denied</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Strategic Considerations</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Motion to Reopen vs. Motion to Reconsider</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Motion to Reopen</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Based on new facts/evidence</li>
                <li>• 90-day deadline usually</li>
                <li>• One motion limit typically</li>
                <li>• Must show evidence unavailable</li>
                <li>• Can present at new hearing</li>
                <li>• Stay not automatic</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Motion to Reconsider</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Based on legal/factual errors</li>
                <li>• 30-day deadline strict</li>
                <li>• One motion limit</li>
                <li>• Point to specific errors</li>
                <li>• No new evidence allowed</li>
                <li>• Rarely successful</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">💡 Can file both if grounds exist - different requirements</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Motion to Reopen Immigration Attorney"
      subtitle="Second Chances Through New Evidence and Changed Circumstances"
      description="Expert attorneys reopening immigration cases at the BIA and Immigration Court with compelling new evidence."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
