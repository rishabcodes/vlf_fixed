import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Uninsured Motorist Accident Lawyer NC | UM/UIM Claims Attorney',
  description:
    'Hit by an uninsured or underinsured driver in North Carolina? Our UM/UIM attorneys fight insurance companies for the compensation you deserve.',
  keywords: [
    'uninsured motorist lawyer NC',
    'underinsured motorist attorney North Carolina',
    'UM UIM claims lawyer',
    'uninsured driver accident NC',
    'underinsured motorist coverage',
    'Charlotte uninsured motorist attorney',
  ],
  openGraph: {
    title: 'NC Uninsured/Underinsured Motorist Claims Lawyer',
    description:
      "Hit by an uninsured driver? Don't let lack of insurance leave you without compensation. We fight for your UM/UIM benefits.",
    images: [
      {
        url: '/images/uninsured-motorist-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Uninsured Motorist Claims Attorney North Carolina',
      },
    ],
  },
};

export default function UninsuredMotoristPage() {
  const services = [
    {
      title: 'Uninsured Motorist (UM)',
      description: 'No insurance coverage claims',
      icon: '🚫',
      features: [
        'Hit and run accidents',
        'Phantom vehicle cases',
        'Stolen vehicle crashes',
        'Fake insurance policies',
        'Lapsed coverage accidents',
        'Excluded driver claims',
      ],
    },
    {
      title: 'Underinsured Motorist (UIM)',
      description: 'Insufficient insurance coverage',
      icon: '📉',
      features: [
        'Minimum liability limits',
        'Severe injury cases',
        'Multiple victim accidents',
        'Catastrophic damages',
        'Stacking coverage',
        'Excess liability claims',
      ],
    },
    {
      title: 'Coverage Disputes',
      description: 'Fighting insurance denials',
      icon: '⚖️',
      features: [
        'Policy interpretation',
        'Coverage denials',
        'Exclusion challenges',
        'Bad faith claims',
        'Stacking disputes',
        'Priority of coverage',
      ],
    },
    {
      title: 'Hit and Run Claims',
      description: 'Unknown driver accidents',
      icon: '🚗',
      features: [
        'Phantom vehicle proof',
        'Physical contact requirements',
        'Witness corroboration',
        'Police report requirements',
        'Notice deadlines',
        'Investigation assistance',
      ],
    },
    {
      title: 'Multiple Policies',
      description: 'Maximizing all coverage',
      icon: '📊',
      features: [
        'Household policies',
        'Multiple vehicle coverage',
        'Business auto policies',
        'Umbrella coverage',
        'Fleet policies',
        'Rental coverage',
      ],
    },
    {
      title: 'Catastrophic Injuries',
      description: 'Maximum recovery for severe cases',
      icon: '🏥',
      features: [
        'Traumatic brain injuries',
        'Spinal cord damage',
        'Multiple surgeries',
        'Permanent disability',
        'Wrongful death',
        'Future medical needs',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is UM/UIM coverage?',
      answer: 'Uninsured Motorist (UM) covers you when hit by drivers with no insurance. Underinsured Motorist (UIM) applies when the at-fault driver\'s insurance isn\'t enough for your damages. North Carolina requires UM coverage, and it\'s your own insurance that pays.',
    },
    {
      question: 'Can I use UM coverage for hit and run?',
      answer: 'Yes! Hit and run accidents are covered under UM. You must report to police within 24 hours and your insurance company within reasonable time. Physical contact with the phantom vehicle is usually required in NC unless witnessed.',
    },
    {
      question: 'How much UM/UIM coverage do I have?',
      answer: 'Check your policy declarations page. NC minimum is $30,000 per person/$60,000 per accident, but you may have more. We can stack multiple policies in your household for maximum recovery.',
    },
    {
      question: 'Will using UM/UIM raise my rates?',
      answer: 'No! Using UM/UIM coverage for accidents that aren\'t your fault shouldn\'t increase premiums. It\'s why you pay for this protection. Insurance companies cannot penalize you for claims against uninsured drivers.',
    },
    {
      question: 'Can I stack UM/UIM policies?',
      answer: 'Often yes! North Carolina allows interpolicy stacking - combining limits from multiple vehicles on the same policy. Intrapolicy stacking (different policies) depends on specific language. We maximize all available coverage.',
    },
    {
      question: 'Why is my insurance company fighting me?',
      answer: 'Your insurance becomes the adversary in UM/UIM claims, trying to minimize payouts. They use the same tactics as defending the uninsured driver. You need an attorney to level the playing field.',
    },
  ];

  const content = {
    introduction: `When irresponsible drivers without adequate insurance cause accidents, victims shouldn\'t suffer. Your Uninsured/Underinsured Motorist coverage exists for exactly these situations. However, your own insurance company often fights these claims aggressively. Our attorneys force insurers to honor their obligations and pay full compensation for your injuries.`,

    processTitle: 'UM/UIM Claim Process',
    process: [
      {
        step: '1',
        title: 'Coverage Review',
        description: 'Identify all available UM/UIM policies',
      },
      {
        step: '2',
        title: 'Claim Filing',
        description: 'Proper notice to all insurers',
      },
      {
        step: '3',
        title: 'Investigation',
        description: 'Prove liability and damages',
      },
      {
        step: '4',
        title: 'Negotiation',
        description: 'Fight for maximum settlement',
      },
      {
        step: '5',
        title: 'Arbitration/Trial',
        description: 'Force payment if necessary',
      },
    ],

    urgencyTitle: '⏰ Strict Notice Requirements',
    urgencyMessage: 'UM/UIM claims have specific notice deadlines and requirements. Missing them can void coverage. Contact us immediately after any uninsured driver accident.',

    whyChooseTitle: 'Why Choose Vasquez Law for UM/UIM Claims',
    whyChoosePoints: [
      'Insurance coverage expertise',
      'Policy stacking strategies',
      'Bad faith claim experience',
      'Arbitration and trial ready',
      'Maximum recovery focus',
      'Fighting your own insurer',
      'No recovery, no fee',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Uninsured Driver Crisis</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <div className="text-4xl font-bold text-red-400 mb-2">7.4%</div>
            <div className="text-lg text-white mb-2">Uninsured Drivers</div>
            <p className="text-gray-400 text-sm">1 in 13 NC drivers has no insurance</p>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <div className="text-4xl font-bold text-yellow-400 mb-2">40%</div>
            <div className="text-lg text-white mb-2">Minimum Limits Only</div>
            <p className="text-gray-400 text-sm">Inadequate for serious injuries</p>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <div className="text-4xl font-bold text-green-400 mb-2">$30k</div>
            <div className="text-lg text-white mb-2">NC Minimum</div>
            <p className="text-gray-400 text-sm">Won\'t cover most hospital stays</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Maximizing Your UM/UIM Recovery</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">1.</span>
              <div>
                <h3 className="font-bold text-white">Check All Household Vehicles</h3>
                <p className="text-gray-300 text-sm">Every vehicle policy may provide stackable coverage</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">2.</span>
              <div>
                <h3 className="font-bold text-white">Review Business Policies</h3>
                <p className="text-gray-300 text-sm">Business auto policies may provide additional coverage</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">3.</span>
              <div>
                <h3 className="font-bold text-white">Check Umbrella Coverage</h3>
                <p className="text-gray-300 text-sm">Excess liability policies often include UM/UIM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">4.</span>
              <div>
                <h3 className="font-bold text-white">Document Everything</h3>
                <p className="text-gray-300 text-sm">Your insurer will scrutinize every detail</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Uninsured/Underinsured Motorist Claims"
      subtitle="Protection When Irresponsible Drivers Strike"
      description="Hit by an uninsured driver? We fight your own insurance company to get the UM/UIM benefits you paid for and deserve."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
