import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Probation Violation Attorney Raleigh NC | Charlotte Violation Lawyer | Orlando Probation Defense',
  description: 'Fighting probation violations in Raleigh, Charlotte, Smithfield NC & Orlando FL. Avoid jail, keep probation. Emergency hearings. Former prosecutors. 919-569-5882',
  keywords: 'probation violation lawyer Raleigh NC, Charlotte probation attorney, violation of probation Smithfield, Orlando VOP lawyer, failed drug test probation, missed appointments attorney, new arrest on probation, technical violation defense, absconding warrant lawyer, probation revocation hearing NC',
  openGraph: {
    title: 'Probation Violation Defense Attorney | NC & FL VOP Lawyer | Vasquez Law',
    description: "Don\'t go to jail for probation violation. Former prosecutors defending violations. Emergency representation.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ProbationViolationPage() {
  const services = [
    {
      title: 'Technical Violations',
      description: 'Non-criminal probation violations',
      icon: '📋',
      features: [
        'Missed appointments with PO',
        'Failed drug/alcohol tests',
        'Failure to pay fines/restitution',
        'Missed community service hours',
        'Curfew violations',
        'Travel without permission',
      ],
    },
    {
      title: 'New Criminal Charges',
      description: 'Arrests while on probation',
      icon: '🚔',
      features: [
        'New arrest allegations',
        'Pending charges defense',
        'Dual representation strategy',
        'Bond hearing coordination',
        'Consecutive sentence avoidance',
        'Plea negotiation impact',
      ],
    },
    {
      title: 'Absconding Defense',
      description: 'Failure to report charges',
      icon: '🏃',
      features: [
        'Warrant recall motions',
        'Voluntary surrender arrangement',
        'Address verification issues',
        'Medical emergency excuses',
        'Good cause explanations',
        'Reinstatement negotiations',
      ],
    },
    {
      title: 'Violation Hearings',
      description: 'Court representation',
      icon: '⚖️',
      features: [
        'Preliminary hearings',
        'Final revocation hearings',
        'Evidence challenges',
        'Witness cross-examination',
        'Mitigation presentations',
        'Alternative sanctions advocacy',
      ],
    },
    {
      title: 'Probation Modifications',
      description: 'Change probation terms',
      icon: '🔄',
      features: [
        'Early termination requests',
        'Unsupervised conversion',
        'Travel permission motions',
        'Treatment program changes',
        'Payment plan adjustments',
        'Special condition removal',
      ],
    },
    {
      title: 'Interstate Compact',
      description: 'Multi-state probation issues',
      icon: '🗺️',
      features: [
        'Transfer requests NC to FL',
        'Interstate violation defense',
        'Reporting state coordination',
        'Dual jurisdiction issues',
        'Transfer denial appeals',
        'Emergency travel permissions',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What happens at a probation violation hearing in Raleigh or Charlotte courts?',
      answer: 'NC has two-stage process: preliminary hearing determines probable cause, final hearing decides revocation. Lower burden of proof than trial - "greater weight of evidence" not "beyond reasonable doubt." No jury, judge decides. Can present evidence, call witnesses, testify. Wake County typically schedules within 7-90 days. Mecklenburg County backlogs mean longer waits. Can be held without bond pending hearing.',
    },
    {
      question: 'Can I go to jail for failing a drug test on probation in NC or FL?',
      answer: 'Yes, but not always. First positive rarely means immediate jail. NC uses graduated sanctions: warnings, increased testing, treatment programs before revocation. Multiple failures different story. FL stricter - can violate on first positive. Factors: type of drug (marijuana vs. hard drugs), prescription defenses, dilute samples, false positives. Quick entry into treatment shows good faith.',
    },
    {
      question: 'What are Quick Dips and CRVs in North Carolina probation?',
      answer: 'Quick Dips: 2-3 day jail sanctions for technical violations without court hearing. Max 6 per probation period. CRV (Confinement in Response to Violation): 90-day jail term for technical violations. Judge-ordered at hearing. Both alternatives to full revocation. Not available for new criminal offenses or absconding. Wake and Mecklenburg Counties use frequently to avoid prison.',
    },
    {
      question: 'How much jail time for probation violation in NC and FL?',
      answer: 'NC: Technical violations - up to 90 days CRV. New crimes or multiple violations - activate full suspended sentence. Misdemeanor probation: up to original max (usually 120 days-2 years). Felony: entire suspended prison term (years). FL: Judge can impose any/all suspended time. First violation often gets reinstated with additional conditions. Depends on original charge, violation type, criminal history.',
    },
    {
      question: 'Can I move to another state while on probation?',
      answer: 'Requires Interstate Compact approval - complex process taking 30-45 days. Must have: valid reason (job, family), receiving state acceptance, current compliance, fees paid. NC to FL common but strict requirements. Cannot move before approval or face absconding charges. Misdemeanor probation usually cannot transfer. We handle transfer requests and violations for clients moving between NC and FL.',
    },
    {
      question: 'What if I can\'t afford to pay fines and restitution on probation?',
      answer: 'Cannot revoke probation solely for inability to pay if making good faith effort. Must prove willful failure - you had money but chose not to pay. Document financial hardship: unemployment, medical bills, family support. Request payment plan modification or community service conversion. Courts in Raleigh and Charlotte often work with struggling probationers. Never ignore - communicate with PO.',
    },
  ];

  const content = {
    introduction: `A probation violation can send you to jail or prison faster than you realize, undoing years of compliance in a single moment. Whether you missed an appointment, failed a drug test, picked up new charges, or fell behind on payments, the consequences are severe and immediate. Our experienced probation violation attorneys in Raleigh, Charlotte, Smithfield, and Orlando understand that good people make mistakes and that life circumstances can derail compliance. We fight to keep you out of jail, preserve your probation, and get you back on track. Don\'t wait for a warrant - early intervention often makes the difference between freedom and incarceration.`,

    processTitle: 'Violation Defense Strategy',
    process: [
      {
        step: '1',
        title: 'Emergency Assessment',
        description: 'Evaluate violation severity and options',
      },
      {
        step: '2',
        title: 'PO Communication',
        description: 'Negotiate with probation officer',
      },
      {
        step: '3',
        title: 'Evidence Gathering',
        description: 'Document compliance and mitigation',
      },
      {
        step: '4',
        title: 'Hearing Preparation',
        description: 'Build defense and alternatives',
      },
      {
        step: '5',
        title: 'Court Advocacy',
        description: 'Fight for continued probation',
      },
    ],

    urgencyTitle: '⏰ Act Before Warrant Issues',
    urgencyMessage: 'Self-reporting shows good faith. Warrants mean jail. Violation hearings scheduled quickly. Each day matters.',

    whyChooseTitle: 'Why Choose Vasquez Law for Probation Violations',
    whyChoosePoints: [
      'Former probation prosecutors know the system',
      'Relationships with probation departments',
      'Emergency hearing availability',
      'Alternative sanction negotiations',
      'Treatment program connections',
      'Payment plan advocacy',
      'High success rate keeping clients on probation',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Probation Violations & Consequences</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Violation Type</th>
                <th className="py-3 px-4">First Offense</th>
                <th className="py-3 px-4">Multiple Violations</th>
                <th className="py-3 px-4">Defense Strategy</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Failed Drug Test</td>
                <td className="py-3 px-4">Warning/Treatment</td>
                <td className="py-3 px-4">Quick Dip/CRV</td>
                <td className="py-3 px-4">Enter treatment immediately</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Missed Appointments</td>
                <td className="py-3 px-4">Reset/Warning</td>
                <td className="py-3 px-4">Warrant/Arrest</td>
                <td className="py-3 px-4">Document excuse, self-report</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">New Arrest</td>
                <td className="py-3 px-4">Violation Hearing</td>
                <td className="py-3 px-4">Likely Revocation</td>
                <td className="py-3 px-4">Fight new charge first</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Payment Default</td>
                <td className="py-3 px-4">Payment Plan</td>
                <td className="py-3 px-4">Contempt/Violation</td>
                <td className="py-3 px-4">Prove inability to pay</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Absconding</td>
                <td className="py-3 px-4">Warrant/Arrest</td>
                <td className="py-3 px-4">Revocation Likely</td>
                <td className="py-3 px-4">Voluntary surrender quickly</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Positive Alcohol</td>
                <td className="py-3 px-4">Increased Testing</td>
                <td className="py-3 px-4">SCRAM/Jail</td>
                <td className="py-3 px-4">Treatment and monitoring</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Justice Reinvestment Act - Your Rights</h2>
        <div className="bg-blue-900/20 p-8 rounded-lg border border-blue-500/30">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Limits on Revocation for Technical Violations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Cannot Revoke For:</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• First or second drug positive</li>
                <li>• Missing appointments alone</li>
                <li>• Inability to pay fines</li>
                <li>• Failure to get employment</li>
                <li>• Positive alcohol (unless prohibited)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Can Revoke For:</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• New criminal offense conviction</li>
                <li>• Absconding supervision</li>
                <li>• Three technical violations</li>
                <li>• Refusing CRV period</li>
                <li>• Any felony probation violation</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">⚡ Maximum CRV period: 90 days for technical violations</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Probation Departments & Courts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Wake County (Raleigh)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>📍 Probation: 3301 Hammond Rd</li>
              <li>📞 919-792-6200</li>
              <li>⚖️ Court: 316 Fayetteville St</li>
              <li>📅 Violations: Tuesdays/Thursdays</li>
              <li>👥 High caseloads = delays</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Mecklenburg (Charlotte)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>📍 Probation: 700 E Trade St</li>
              <li>📞 704-686-0700</li>
              <li>⚖️ Court: 832 E 4th St</li>
              <li>📅 Violations: Daily calendar</li>
              <li>👥 Largest probation dept in NC</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Orange County (Orlando)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>📍 Probation: 100 E Columbia St</li>
              <li>📞 407-858-1300</li>
              <li>⚖️ Court: 425 N Orange Ave</li>
              <li>📅 VOP Court: Wednesdays</li>
              <li>👥 Alternative sanctions court</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Emergency Action Plan for Violations</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">If You've Violated Probation:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">1.</span>
              <div>
                <p className="text-white font-bold">Don\'t Panic or Run</p>
                <p className="text-gray-300 text-sm">Absconding makes everything worse. Face it head-on with legal help.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">2.</span>
              <div>
                <p className="text-white font-bold">Contact Attorney Before PO</p>
                <p className="text-gray-300 text-sm">Get legal advice before admitting violations. Some admissions can't be undone.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">3.</span>
              <div>
                <p className="text-white font-bold">Document Everything</p>
                <p className="text-gray-300 text-sm">Employment, treatment, compliance history, family obligations - all help at hearing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">4.</span>
              <div>
                <p className="text-white font-bold">Get Into Compliance Now</p>
                <p className="text-gray-300 text-sm">Start treatment, make payments, complete service - show good faith immediately.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">5.</span>
              <div>
                <p className="text-white font-bold">Prepare Support Network</p>
                <p className="text-gray-300 text-sm">Character letters, treatment providers, employers - all can testify for you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Probation Violation Defense Attorney NC & FL"
      subtitle="Don\'t Let a Violation Send You to Jail"
      description="Aggressive defense against probation violations in Raleigh, Charlotte, Smithfield & Orlando. Keep your freedom."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
