import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'T Visa Attorney | Human Trafficking Victims | NC & FL | Vasquez Law',
  description: 'Expert T visa lawyers for trafficking victims. Path to green card, family derivative benefits, work authorization. Offices in NC & FL. 919-569-5882',
  keywords: 'T visa attorney, human trafficking lawyer, T-1 visa immigration, trafficking victim attorney, T visa green card, forced labor attorney, sex trafficking lawyer, immigration lawyer Raleigh NC, Charlotte T visa attorney, Orlando trafficking victim lawyer',
  openGraph: {
    title: 'T Visa Immigration Attorney | Trafficking Victims Protection | Vasquez Law',
    description: 'Legal protection for human trafficking victims. T visa applications, law enforcement cooperation, path to permanent residence.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function TVisaPage() {
  const services = [
    {
      title: 'T-1 Principal Applicant',
      description: 'Direct trafficking victims',
      icon: '🛡️',
      features: [
        'Severe trafficking identification',
        'Physical presence proof',
        'Law enforcement cooperation',
        'Extreme hardship evidence',
        'Personal statement drafting',
        'Corroborating documentation',
      ],
    },
    {
      title: 'Family Derivatives',
      description: 'T-2, T-3, T-4, T-5 visas',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Spouse inclusion (T-2)',
        'Children under 21 (T-3)',
        'Parents if under 21 (T-4)',
        'Unmarried siblings under 18 (T-5)',
        'Danger assessment abroad',
        'Simultaneous filing available',
      ],
    },
    {
      title: 'Law Enforcement',
      description: 'Cooperation requirements',
      icon: '⚖️',
      features: [
        'I-914B certification',
        'FBI/DHS coordination',
        'Police report assistance',
        'Prosecutor liaison',
        'Continued presence requests',
        'Trauma exception cases',
      ],
    },
    {
      title: 'Benefits & Services',
      description: 'Victim assistance programs',
      icon: '🏥',
      features: [
        'Work authorization immediate',
        'Federal benefits eligible',
        'Medical assistance',
        'Housing programs access',
        'Job training referrals',
        'Mental health services',
      ],
    },
    {
      title: 'Green Card Process',
      description: 'Path to permanent residence',
      icon: '🎯',
      features: [
        'Eligible after 3 years',
        'Or case completion',
        'I-485 adjustment filing',
        'Good moral character',
        'Admissibility waivers',
        'Citizenship after 5 years',
      ],
    },
    {
      title: 'Complex Cases',
      description: 'Challenging situations',
      icon: '🔍',
      features: [
        'Minor trafficking victims',
        'Labor trafficking cases',
        'Domestic servitude',
        'Criminal record waivers',
        'Prior immigration violations',
        'Ongoing danger abroad',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What qualifies as severe human trafficking for T visa?',
      answer: 'Two forms qualify: (1) Sex trafficking - recruited, harbored, transported, obtained for commercial sex through force, fraud, coercion, or victim under 18. (2) Labor trafficking - recruited, harbored, transported for labor/services through force, fraud, coercion including involuntary servitude, peonage, debt bondage, slavery. Must be in US due to trafficking. Common scenarios: forced prostitution, domestic servitude, restaurant/agricultural labor, factory work under threat.',
    },
    {
      question: 'Do I have to cooperate with law enforcement for T visa?',
      answer: 'Generally yes, unless under 18 or unable due to trauma. Cooperation means: reporting to law enforcement (federal, state, or local), providing information about trafficking, assisting investigation/prosecution if requested. Not required to testify at trial. Can get I-914B certification from law enforcement but not mandatory. Trauma exception requires psychological evaluation. Continued presence allows temporary stay during investigation.',
    },
    {
      question: 'How long does the T visa process take in 2025?',
      answer: 'Current processing: 18-24 months for initial decision. Vermont Service Center handles all T visas. Biometrics: 1-2 months after filing. Work authorization comes with approval. Derivatives can file together or later. After approval: T visa valid for 4 years. Green card eligible after 3 years in T status or when case concluded. Total to green card: 4-5 years. U visa takes longer (5-6 years wait), but T visa has no numerical cap.',
    },
    {
      question: 'What benefits come with T visa status?',
      answer: 'Immediate benefits upon approval: 4-year visa with extensions possible, employment authorization document (EAD), federal public benefits same as refugees (TANF, Medicaid, Food Stamps, SSI), Office for Victims of Crime assistance, housing assistance programs, job training and education grants. Family members get same benefits except certain federal programs. Can travel internationally with advance parole. Path to green card and citizenship.',
    },
    {
      question: 'Can I get T visa with criminal record?',
      answer: 'Possibly. T visa has broad waiver availability for inadmissibility grounds if connected to trafficking or in national interest. Waivable: prostitution, unlawful presence, criminal convictions (except serious crimes), immigration fraud if coerced. Not waivable: nazi persecution, genocide, torture, extrajudicial killing. Must show crimes were result of trafficking. Need certified court records, police reports, explanation of coercion. Juvenile records generally not bars.',
    },
    {
      question: 'What\'s the difference between T visa and U visa?',
      answer: 'T visa: for trafficking victims only, must show extreme hardship if removed, no visa cap (unlimited), 18-24 month processing, derivatives include siblings/parents, federal benefits immediately. U visa: for victims of qualifying crimes (broader), must show substantial harm, capped at 10,000/year causing 5-6 year wait, 12-18 months for decision but long wait for visa number, derivatives only spouse/children/parents, limited benefits until approval.',
    },
  ];

  const content = {
    introduction: `Human trafficking victims deserve protection, not prosecution. The T visa provides immediate relief and a path to permanent residence for survivors of severe trafficking. Our experienced T visa attorneys understand the trauma you've endured and work compassionately to secure your safety and legal status. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we coordinate with law enforcement, provide comprehensive victim services referrals, and guide you from rescue through citizenship. You've survived the worst - now let us help you build a secure future in the United States free from fear and exploitation.`,

    processTitle: 'T Visa Application Process',
    process: [
      {
        step: '1',
        title: 'Safety Assessment',
        description: 'Ensure victim safety and stability',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Document trafficking and cooperation',
      },
      {
        step: '3',
        title: 'I-914 Filing',
        description: 'Submit T visa application',
      },
      {
        step: '4',
        title: 'USCIS Decision',
        description: 'Approval with benefits',
      },
      {
        step: '5',
        title: 'Green Card',
        description: 'Adjust after 3 years',
      },
    ],

    urgencyTitle: '🚨 Immediate Protection Available',
    urgencyMessage: 'Continued presence for ongoing cases. Federal benefits upon approval. Family members in danger need protection. Evidence disappears over time.',

    whyChooseTitle: 'Why Choose Vasquez Law for T Visa',
    whyChoosePoints: [
      'Trauma-informed legal representation',
      'Law enforcement liaison experience',
      'Victim services network connections',
      'Confidential and safe consultations',
      'Bilingual services - Se habla español',
      'No upfront fees for trafficking victims',
      'Comprehensive safety planning',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Trafficking Qualifying for T Visa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Type of Trafficking</th>
                <th className="py-3 px-4">Common Scenarios</th>
                <th className="py-3 px-4">Force/Fraud/Coercion</th>
                <th className="py-3 px-4">Industries</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Sex Trafficking</td>
                <td className="py-3 px-4">Prostitution, pornography</td>
                <td className="py-3 px-4">Threats, debt bondage</td>
                <td className="py-3 px-4">Massage parlors, online</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Labor Trafficking</td>
                <td className="py-3 px-4">Forced work, unpaid labor</td>
                <td className="py-3 px-4">Document confiscation</td>
                <td className="py-3 px-4">Agriculture, construction</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Domestic Servitude</td>
                <td className="py-3 px-4">Household workers trapped</td>
                <td className="py-3 px-4">Isolation, no pay</td>
                <td className="py-3 px-4">Private homes, diplomats</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Debt Bondage</td>
                <td className="py-3 px-4">Work to pay off debt</td>
                <td className="py-3 px-4">Inflated debts, fees</td>
                <td className="py-3 px-4">Restaurants, factories</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Child Trafficking</td>
                <td className="py-3 px-4">Minor exploitation</td>
                <td className="py-3 px-4">Age under 18 sufficient</td>
                <td className="py-3 px-4">All industries</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">T Visa Eligibility Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Must Prove All Elements</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Victim of severe trafficking</li>
              <li>✓ Physically present due to trafficking</li>
              <li>✓ Comply with law enforcement (or exception)</li>
              <li>✓ Would suffer extreme hardship if removed</li>
              <li>✓ Admissible or waiver granted</li>
              <li>✓ No participation in trafficking others</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Evidence to Submit</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Personal statement of trafficking</li>
              <li>✓ Law enforcement certification (if available)</li>
              <li>✓ Medical/psychological evaluations</li>
              <li>✓ Court documents if applicable</li>
              <li>✓ Witness affidavits</li>
              <li>✓ Country condition evidence</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">T Visa Timeline & Benefits</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">From Application to Citizenship</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">📋</div>
              <div>
                <h4 className="text-blue-400 font-bold">Months 0-18: Application</h4>
                <p className="text-gray-300 text-sm">File I-914, biometrics, await decision</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="text-green-400 font-bold">Year 2-4: T Status</h4>
                <p className="text-gray-300 text-sm">Work authorization, federal benefits, travel ability</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🎯</div>
              <div>
                <h4 className="text-yellow-400 font-bold">Year 3+: Green Card</h4>
                <p className="text-gray-300 text-sm">File I-485 adjustment of status</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🇺🇸</div>
              <div>
                <h4 className="text-purple-400 font-bold">Year 8+: Citizenship</h4>
                <p className="text-gray-300 text-sm">Naturalization after 5 years as LPR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Resources for Trafficking Victims</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Immediate Help Available</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Emergency Resources</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>📞 National Trafficking Hotline: 1-888-373-7888</li>
                <li>💬 Text "HELP" to 233733</li>
                <li>🆘 Call 911 for immediate danger</li>
                <li>🏥 Emergency medical care available</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Support Services</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Safe housing programs</li>
                <li>• Counseling and therapy</li>
                <li>• Job training assistance</li>
                <li>• Language interpretation</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ All services confidential - Your safety is the priority</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="T Visa Immigration Attorney"
      subtitle="Protection for Human Trafficking Victims"
      description="Expert T visa representation for trafficking survivors seeking safety and permanent residence in the United States."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
