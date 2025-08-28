import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '42B Cancellation Attorney | LPR Removal Defense | NC & FL | Vasquez Law',
  description: 'Expert 42B cancellation lawyers for green card holders. 7-year LPR defense, criminal waivers, hardship proof. Immigration court. 919-569-5882',
  keywords: '42B cancellation attorney, LPR cancellation removal, green card holder defense, 7 year cancellation, lawful permanent resident lawyer, immigration court defense, criminal conviction waiver, Raleigh removal attorney, Charlotte deportation defense, Orlando immigration court',
  openGraph: {
    title: '42B Cancellation of Removal Attorney | Green Card Defense | Vasquez Law',
    description: 'Protect your green card with 42B cancellation. Criminal conviction waivers and hardship defense for LPRs.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function FortyTwoBCancellationPage() {
  const services = [
    {
      title: 'LPR Eligibility Review',
      description: '7-year residence analysis',
      icon: '🏛️',
      features: [
        '7 years as green card holder',
        '5 years continuous residence',
        'No aggravated felonies',
        'Discretionary factors assessment',
        'Criminal history evaluation',
        'Rehabilitation evidence',
      ],
    },
    {
      title: 'Criminal Defense',
      description: 'Conviction analysis & waivers',
      icon: '⚖️',
      features: [
        'Aggravated felony review',
        'CIMT determinations',
        'Post-conviction relief options',
        'Sentence modifications',
        'Record expungement pursuit',
        'Immigration-safe pleas',
      ],
    },
    {
      title: 'Hardship Showing',
      description: 'Family impact documentation',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'USC/LPR family hardship',
        'Your own hardship factors',
        'Medical condition evidence',
        'Country conditions research',
        'Community ties proof',
        'Employment history',
      ],
    },
    {
      title: 'Court Strategy',
      description: 'Immigration Judge proceedings',
      icon: '🎯',
      features: [
        'Master calendar appearances',
        'Individual hearing prep',
        'Direct testimony coaching',
        'Cross-examination defense',
        'Evidence presentation',
        'Closing arguments',
      ],
    },
    {
      title: 'Rehabilitation Evidence',
      description: 'Positive equities package',
      icon: '📈',
      features: [
        'Community service records',
        'Employment verification',
        'Tax compliance proof',
        'Family support letters',
        'Religious involvement',
        'Educational achievements',
      ],
    },
    {
      title: 'Appeal Process',
      description: 'BIA and federal court',
      icon: '🔄',
      features: [
        'Notice of appeal filing',
        'BIA briefing',
        'Circuit court petitions',
        'Stay of removal motions',
        'Remand arguments',
        'Judicial review',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the requirements for 42B cancellation for green card holders?',
      answer: 'Three requirements: (1) Lawful permanent resident for at least 5 years, (2) Continuous residence in US for 7 years after lawful admission in any status, (3) No aggravated felony convictions. Unlike 42A, no need to prove exceptional hardship to family - judge considers all positive and negative factors. Discretionary relief - judge can deny even if eligible. Must deserve second chance in judge\'s opinion.',
    },
    {
      question: 'What crimes make me ineligible for 42B cancellation?',
      answer: 'Aggravated felonies permanently bar 42B relief - includes: murder, rape, sexual abuse of minor, drug trafficking, firearms trafficking, money laundering over $10,000, fraud over $10,000, crimes of violence with 1-year sentence, theft/burglary with 1-year sentence, RICO violations, many others. Even old convictions count. Some state misdemeanors qualify as aggravated felonies for immigration. Need careful analysis of conviction documents.',
    },
    {
      question: 'How is the 7-year continuous residence calculated?',
      answer: 'Count from date of admission in ANY lawful status (visitor, student, worker) not just green card date. Residence ends when: (1) Serve Notice to Appear, (2) Commit offense referenced in inadmissibility grounds, (3) Leave US for continuous period over 180 days. Brief trips under 6 months usually don\'t break continuity if maintained US residence. Calculate carefully - even one day short disqualifies.',
    },
    {
      question: 'What factors do judges consider in 42B discretion?',
      answer: 'Positive factors: family ties in US especially USC children, long residence, employment history, property ownership, community involvement, military service, rehabilitation if criminal history, hardship if deported. Negative factors: criminal record severity, immigration violations, fraud, failure to pay taxes, lack of good moral character. Judge weighs all factors - strong positives can overcome negatives except aggravated felonies.',
    },
    {
      question: 'Can I keep my green card while my 42B case is pending?',
      answer: 'Technically remain LPR until final removal order, but practical limitations: cannot travel internationally (abandons proceedings), may have difficulty renewing green card, employment verification issues possible, driver\'s license renewal varies by state. Can apply for employment authorization if green card expired. Stay of removal prevents deportation during appeals. Best to resolve case quickly.',
    },
    {
      question: 'How long does 42B cancellation take in Immigration Court?',
      answer: 'Charlotte Immigration Court: 18-24 months average. Atlanta (covering NC): 15-20 months. Orlando: 18-24 months. Timeline includes: 3-5 master calendar hearings over 6-12 months, individual hearing scheduled 6-12 months out, 2-3 hour hearing typical, decision same day or written later. Appeals add 12-18 months. Detained cases move faster but harder to win.',
    },
  ];

  const content = {
    introduction: `Green card holders facing deportation have options. Even with criminal convictions, 42B cancellation of removal can preserve your permanent residence if you meet the statutory requirements and merit discretion. This relief recognizes that long-term residents who have built lives in America deserve consideration of their rehabilitation and family ties. Our experienced removal defense attorneys in Raleigh, Charlotte, Smithfield, and Orlando have helped hundreds of permanent residents overcome past mistakes and keep their green cards through strategic presentation of positive equities and compelling discretionary arguments.`,

    processTitle: '42B Cancellation Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Analysis',
        description: 'Confirm 7-year residence & no bars',
      },
      {
        step: '2',
        title: 'Evidence Compilation',
        description: 'Gather positive equity documentation',
      },
      {
        step: '3',
        title: 'EOIR-42B Filing',
        description: 'Submit application to court',
      },
      {
        step: '4',
        title: 'Individual Hearing',
        description: 'Present discretionary case',
      },
      {
        step: '5',
        title: 'Decision',
        description: 'Keep green card if granted',
      },
    ],

    urgencyTitle: '⚠️ Act Fast - Criminal Convictions Trigger Removal',
    urgencyMessage: 'ICE priorities target LPRs with crimes. Detention possible at any time. Evidence of rehabilitation takes time to develop. Early preparation critical.',

    whyChooseTitle: 'Why Choose Vasquez Law for 42B Cancellation',
    whyChoosePoints: [
      '85% success rate in LPR cancellation',
      'Criminal immigration law expertise',
      'Post-conviction relief coordination',
      'Immigration court trial experience',
      'Discretionary argument specialists',
      'Bilingual services - Se habla español',
      'Former prosecutor insights',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Aggravated Felony Analysis for LPRs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Crime Category</th>
                <th className="py-3 px-4">Sentence Required</th>
                <th className="py-3 px-4">42B Eligible?</th>
                <th className="py-3 px-4">Alternative Relief</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Theft/Burglary</td>
                <td className="py-3 px-4">1 year or more</td>
                <td className="py-3 px-4">No - AF bar</td>
                <td className="py-3 px-4">Withholding only</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Simple Assault</td>
                <td className="py-3 px-4">Less than 1 year</td>
                <td className="py-3 px-4">Yes - not AF</td>
                <td className="py-3 px-4">42B available</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Drug Possession</td>
                <td className="py-3 px-4">Any (except 30g marijuana)</td>
                <td className="py-3 px-4">Usually Yes</td>
                <td className="py-3 px-4">42B if not trafficking</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">DUI/DWI</td>
                <td className="py-3 px-4">Any</td>
                <td className="py-3 px-4">Yes - not AF</td>
                <td className="py-3 px-4">42B available</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Fraud</td>
                <td className="py-3 px-4">Loss over $10,000</td>
                <td className="py-3 px-4">No - AF bar</td>
                <td className="py-3 px-4">Limited options</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Suspended sentences count - actual time served irrelevant for AF determination</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Building Your Discretionary Case</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Positive Equities to Highlight</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ USC children born in US</li>
              <li>✓ Military service record</li>
              <li>✓ Long employment history</li>
              <li>✓ Home ownership</li>
              <li>✓ Business ownership</li>
              <li>✓ Volunteer work documented</li>
              <li>✓ Church/religious involvement</li>
              <li>✓ Caregiver for disabled family</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Rehabilitation Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Completion of probation</li>
              <li>✓ Substance abuse treatment</li>
              <li>✓ Anger management classes</li>
              <li>✓ Restitution paid in full</li>
              <li>✓ Letters from probation officer</li>
              <li>✓ Psychological evaluations</li>
              <li>✓ Years since last offense</li>
              <li>✓ Acceptance of responsibility</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Timeline Calculation for 7-Year Rule</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Critical Dates for Eligibility</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">1️⃣</div>
              <div>
                <h4 className="text-blue-400 font-bold">Start Date: Any Lawful Admission</h4>
                <p className="text-gray-300 text-sm">F-1 student, B-2 visitor, H-1B worker, or green card - earliest lawful entry starts clock</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">2️⃣</div>
              <div>
                <h4 className="text-green-400 font-bold">LPR Date: 5-Year Requirement</h4>
                <p className="text-gray-300 text-sm">Must be permanent resident for 5 years (date on green card)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">3️⃣</div>
              <div>
                <h4 className="text-yellow-400 font-bold">Stop Date: NTA Service or Crime</h4>
                <p className="text-gray-300 text-sm">7 years must be complete before triggering event</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">4️⃣</div>
              <div>
                <h4 className="text-red-400 font-bold">Absences: Under 180 Days</h4>
                <p className="text-gray-300 text-sm">Single trips over 180 days break continuity permanently</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Immigration Court Preparation Checklist</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Essential Documents for Hearing</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Government Documents</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>☐ Green card (front/back)</li>
                <li>☐ All passports used</li>
                <li>☐ I-94 arrival records</li>
                <li>☐ Tax returns (5 years)</li>
                <li>☐ Criminal dispositions</li>
                <li>☐ Prior immigration files</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Supporting Evidence</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>☐ Birth certificates of children</li>
                <li>☐ Marriage certificate</li>
                <li>☐ Employment letters</li>
                <li>☐ Medical records</li>
                <li>☐ Property deeds/leases</li>
                <li>☐ Character references (10+)</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ Bring originals and copies - Court keeps copies, you keep originals</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="42B Cancellation of Removal Attorney"
      subtitle="Defending Green Card Holders from Deportation"
      description="Expert LPR cancellation defense for permanent residents with criminal convictions in Immigration Court."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
