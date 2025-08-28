import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traffic Ticket Lawyer Raleigh NC | Speeding Attorney Charlotte | CDL Violations Orlando',
  description: 'Fight traffic tickets in Raleigh, Charlotte, Smithfield NC & Orlando FL. Speeding, reckless driving, CDL violations. Keep license, avoid points. 919-569-5882',
  keywords: 'traffic ticket lawyer Raleigh NC, speeding ticket attorney Charlotte, reckless driving lawyer Smithfield, CDL violation attorney Orlando, DWI traffic lawyer, license suspension attorney, hit and run defense, racing ticket lawyer NC, prayer for judgment continued, traffic court Wake County',
  openGraph: {
    title: 'Traffic Violation Attorney | Speeding Tickets NC & FL | Vasquez Law',
    description: "Don't just pay that ticket. Fight to keep your license and insurance rates low. Former prosecutors.",
    type: 'website',
    locale: 'en_US',
  },
};

export default function TrafficOffensesTicketsPage() {
  const services = [
    {
      title: 'Speeding Violations',
      description: 'All speed-related charges',
      icon: '🚗',
      features: [
        'Speeding 15+ over limit',
        'Speeding in work zone',
        'Speeding in school zone',
        'Excessive speed 80+ mph',
        'Racing on highways',
        'Speed competition charges',
      ],
    },
    {
      title: 'Serious Traffic Crimes',
      description: 'Criminal traffic offenses',
      icon: '🚨',
      features: [
        'Reckless driving charges',
        'Hit and run accidents',
        'Driving while license revoked',
        'Fleeing to elude police',
        'Vehicular assault',
        'Death by vehicle charges',
      ],
    },
    {
      title: 'DWI/DUI Defense',
      description: 'Impaired driving charges',
      icon: '🍺',
      features: [
        'First offense DWI',
        'Aggravated DWI .15+',
        'Drug impaired driving',
        'Underage DWI zero tolerance',
        'Commercial DWI CDL',
        'Felony habitual DWI',
      ],
    },
    {
      title: 'CDL Violations',
      description: 'Commercial driver defense',
      icon: '🚛',
      features: [
        'DOT violations',
        'Logbook violations',
        'Overweight citations',
        'Equipment violations',
        'CDL disqualification defense',
        'Federal regulation violations',
      ],
    },
    {
      title: 'License Issues',
      description: 'Driver license problems',
      icon: '📄',
      features: [
        'License suspension hearings',
        'Restoration proceedings',
        'No operator license',
        'Expired license tickets',
        'DMV point reduction',
        'Limited driving privileges',
      ],
    },
    {
      title: 'Insurance & Points',
      description: 'Protect driving record',
      icon: '💰',
      features: [
        'Insurance point avoidance',
        'DMV point reduction',
        'Prayer for Judgment PJC',
        'Improper equipment reduction',
        'Safe driver discount protection',
        'SR-22 requirement help',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Should I just pay my speeding ticket in NC or FL?',
      answer: 'NO! Paying equals guilty plea with serious consequences. NC: Insurance rates increase 30-80% for 3 years. 3+ points triggers license suspension. FL: Points stay 3-5 years. Out-of-state tickets report to home state. Wake County and Mecklenburg County courts often reduce charges. We negotiate reductions to improper equipment (no points) or dismissals. One ticket can cost thousands in insurance - legal help saves money.',
    },
    {
      question: 'What is Prayer for Judgment Continued (PJC) in North Carolina?',
      answer: 'PJC is NC-specific where judge finds guilt but doesn\'t enter judgment. No DMV points, no insurance impact if used correctly. Limits: 1 per household per 3 years for insurance, 2 per 5 years for DMV. Cannot use for: CDL holders, speeds over 25 mph, DWI, passing school bus. Wake and Mecklenburg judges grant PJCs regularly but must be requested properly. FL has no equivalent - withhold of adjudication similar but different.',
    },
    {
      question: 'How many points before license suspension in NC and FL?',
      answer: 'NC: 12 points in 3 years = suspension. 8 points in 3 years after reinstatement = revocation. Points: Speeding 10 over (3), reckless driving (4), aggressive driving (5), DWI (12-immediate). FL: 12 points in 12 months (30 days), 18 in 18 months (3 months), 24 in 36 months (1 year). Both states have point reduction courses. Interstate compact means tickets follow you home.',
    },
    {
      question: 'Can I lose my CDL for a traffic ticket?',
      answer: 'Yes! CDL holders face stricter rules. Serious violations: speeding 15+, reckless driving, improper lane change. Two serious violations in 3 years = 60-day CDL disqualification. Three = 120 days. Any DWI, even in personal vehicle = 1-year CDL loss (lifetime if hauling hazmat). Railroad crossing violations, leaving accident scene also disqualify. No PJC or diversion for CDL holders. Must fight every ticket.',
    },
    {
      question: 'What happens if I miss traffic court in Raleigh, Charlotte, or Orlando?',
      answer: 'Failure to appear (FTA) triggers: arrest warrant, license suspension (indefinite in NC), additional criminal charge, bond forfeiture. NC: Can\'t renew license until resolved. FTA fee plus original fines doubled. FL: D-6 suspension, must pay reinstatement fee. We can calendar motions to recall FTA, lift suspension, reset court date. Act fast - longer you wait, harder to fix.',
    },
    {
      question: 'How much do traffic tickets increase insurance rates?',
      answer: 'Depends on violation and company. NC average increases: Speeding 10-15 over (30%), 16+ over (80%), reckless driving (90%), DWI (300%+). Increases last 3 years. Multiple tickets compound rates. One ticket can result in thousands in increased insurance over 3 years. Young drivers see higher increases. Some companies drop coverage entirely. Fighting tickets protects your rates.',
    },
  ];

  const content = {
    introduction: `Traffic tickets are more than just fines - they threaten your license, skyrocket insurance rates, and can even lead to criminal records that follow you forever. From simple speeding tickets on I-40 near Raleigh to serious charges like reckless driving in Charlotte or DWI in Orlando, every traffic citation deserves a strong defense. Our experienced traffic attorneys understand the DMV point systems, insurance implications, and court procedures in Wake, Mecklenburg, Johnston, and Orange Counties. We fight to keep your record clean, your license valid, and your insurance affordable. Don\'t just pay that ticket - protect your driving future with aggressive legal representation.`,

    processTitle: 'Traffic Ticket Defense Process',
    process: [
      {
        step: '1',
        title: 'Ticket Analysis',
        description: 'Review charges and consequences',
      },
      {
        step: '2',
        title: 'Court Representation',
        description: "Appear so you don't have to",
      },
      {
        step: '3',
        title: 'Negotiation',
        description: 'Reduce or dismiss charges',
      },
      {
        step: '4',
        title: 'Trial if Needed',
        description: "Fight tickets that can't be reduced",
      },
      {
        step: '5',
        title: 'Record Protection',
        description: 'Minimize points and insurance impact',
      },
    ],

    urgencyTitle: '⏰ Court Date Approaching Fast',
    urgencyMessage: 'Missing court = warrant and suspension. Insurance watching convictions. Limited time for reductions. CDL careers at risk.',

    whyChooseTitle: 'Why Choose Vasquez Law for Traffic Defense',
    whyChoosePoints: [
      'Handle cases without you missing work',
      'Former prosecutors know what works',
      'Relationships with local DAs and judges',
      'CDL and professional driver expertise',
      'Insurance point counseling included',
      'Flat fees - no surprises',
      'Payment plans available',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC & FL Point System Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Violation</th>
                <th className="py-3 px-4">NC DMV Points</th>
                <th className="py-3 px-4">NC Insurance</th>
                <th className="py-3 px-4">FL Points</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Speeding 1-10 over</td>
                <td className="py-3 px-4">2 points</td>
                <td className="py-3 px-4">1 point (30%)</td>
                <td className="py-3 px-4">3 points</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Speeding 11-15 over</td>
                <td className="py-3 px-4">3 points</td>
                <td className="py-3 px-4">2 points (45%)</td>
                <td className="py-3 px-4">4 points</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Speeding 16+ over</td>
                <td className="py-3 px-4">3 points</td>
                <td className="py-3 px-4">4 points (80%)</td>
                <td className="py-3 px-4">4 points</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Reckless Driving</td>
                <td className="py-3 px-4">4 points</td>
                <td className="py-3 px-4">4 points (80%)</td>
                <td className="py-3 px-4">4 points</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Following Too Close</td>
                <td className="py-3 px-4">4 points</td>
                <td className="py-3 px-4">2 points (45%)</td>
                <td className="py-3 px-4">3 points</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Run Red Light/Stop Sign</td>
                <td className="py-3 px-4">3 points</td>
                <td className="py-3 px-4">3 points (65%)</td>
                <td className="py-3 px-4">4 points</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Insurance percentages show average rate increase for 3 years</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Traffic Court Locations & Schedules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">North Carolina Courts</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-bold">Wake County (Raleigh)</h4>
                <ul className="text-gray-300 text-sm">
                  <li>📍 300 S. Salisbury St, Raleigh</li>
                  <li>⏰ Traffic Court: Mon-Fri 8:30am</li>
                  <li>📞 919-792-4000</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold">Mecklenburg (Charlotte)</h4>
                <ul className="text-gray-300 text-sm">
                  <li>📍 832 E. 4th Street, Charlotte</li>
                  <li>⏰ Traffic: Mon-Fri 8:30am, 1:30pm</li>
                  <li>📞 704-686-0400</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold">Johnston (Smithfield)</h4>
                <ul className="text-gray-300 text-sm">
                  <li>📍 207 E. Johnston St, Smithfield</li>
                  <li>⏰ Traffic: Thursdays 9:00am</li>
                  <li>📞 919-989-5160</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Florida Courts</h3>
            <div>
              <h4 className="text-white font-bold">Orange County (Orlando)</h4>
              <ul className="text-gray-300 text-sm">
                <li>📍 2000 E. Michigan St, Orlando</li>
                <li>⏰ Traffic: Mon-Fri 8:00am-4:00pm</li>
                <li>📞 407-836-7700</li>
                <li>💻 Online options available</li>
                <li>🎫 Red light cameras separate</li>
              </ul>
            </div>
            <p className="text-yellow-300 text-xs mt-3">⚡ FL allows online payment but convicts - always consult attorney first</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Ticket Reductions We Negotiate</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">Original Charge → Reduction</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>✓ Speeding 70/55 → Improper Equipment (0 points)</li>
                <li>✓ Speeding 84/70 → 9 over (PJC eligible)</li>
                <li>✓ Reckless Driving → Speeding 9 over</li>
                <li>✓ Following Too Close → Improper Equipment</li>
                <li>✓ No Insurance → Dismissed (with proof)</li>
                <li>✓ Expired License → Dismissed (if renewed)</li>
                <li>✓ Cell Phone Violation → Warning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Reduction Benefits</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• No DMV points</li>
                <li>• No insurance increase</li>
                <li>• No license suspension</li>
                <li>• Avoid criminal record</li>
                <li>• CDL protection</li>
                <li>• Employment protection</li>
                <li>• Lower or no fines</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">💡 Success rate: 85%+ for first offenses with clean records</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">CDL & Professional Driver Defense</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">CDL Holders Face Severe Consequences</h3>
          <div className="space-y-3">
            <div className="bg-black/30 p-4 rounded">
              <h4 className="text-white font-bold mb-2">Serious Traffic Violations (2 = 60-day CDL suspension)</h4>
              <ul className="text-gray-300 text-sm grid grid-cols-2 gap-2">
                <li>• Speeding 15+ mph over</li>
                <li>• Reckless driving</li>
                <li>• Improper lane change</li>
                <li>• Following too closely</li>
                <li>• Fatal accident violations</li>
                <li>• Driving CMV without CDL</li>
              </ul>
            </div>
            <div className="bg-black/30 p-4 rounded">
              <h4 className="text-white font-bold mb-2">Major Violations (1 = 1-year CDL suspension)</h4>
              <ul className="text-gray-300 text-sm">
                <li>• DWI/DUI (any vehicle)</li>
                <li>• Leaving accident scene</li>
                <li>• Using vehicle in felony</li>
                <li>• Driving CMV revoked</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ NO Prayer for Judgment or deferrals for CDL holders - must win or dismiss</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">What to Do When Pulled Over</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl font-bold">1.</span>
              <div>
                <h3 className="font-bold text-white">Pull Over Safely</h3>
                <p className="text-gray-300 text-sm">Signal, slow down gradually, stop in safe, well-lit area. Keep hands visible on wheel.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl font-bold">2.</span>
              <div>
                <h3 className="font-bold text-white">Be Polite but Protected</h3>
                <p className="text-gray-300 text-sm">Yes sir/ma'am. Provide license, registration. Don\'t admit guilt or speed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl font-bold">3.</span>
              <div>
                <h3 className="font-bold text-white">Document Everything</h3>
                <p className="text-gray-300 text-sm">Officer name/badge, time, location, weather, traffic conditions. Take photos if safe.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl font-bold">4.</span>
              <div>
                <h3 className="font-bold text-white">Don\'t Argue Roadside</h3>
                <p className="text-gray-300 text-sm">Sign ticket if required (not admission). Fight in court, not on roadside.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl font-bold">5.</span>
              <div>
                <h3 className="font-bold text-white">Call Attorney Immediately</h3>
                <p className="text-gray-300 text-sm">Don\'t pay online. Don\'t miss court. Get legal help before making any decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Traffic Violation & Ticket Defense Attorney NC & FL"
      subtitle="Don\'t Just Pay That Ticket - Fight It"
      description="Experienced traffic attorneys in Raleigh, Charlotte, Smithfield & Orlando. Keep your license, avoid points, protect insurance rates."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
