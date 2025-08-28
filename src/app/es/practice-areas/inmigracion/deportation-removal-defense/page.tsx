import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'Deportation & Removal Defense Abogados NC & FL | Emergency Help 24/7 | Vasquez Law Firm',
  description:
    'URGENT: Deportation defense attorneys with 24/7 emergency response. Former ICE attorneys on staff. Fight removal proceedings, get bond hearings, asylum protection. Call 1-844-YO-PELEO',
  keywords:
    'deportation defense lawyer, removal proceedings attorney, ICE detention lawyer, immigration court defense, emergency deportation help, bond hearing attorney, asylum lawyer, cancellation of removal',
  openGraph: {
    title: 'Emergency Deportation Defense Abogados | 24/7 Response - Vasquez Law Firm',
    description:
      'URGENT deportation defense with former ICE attorneys. Emergency response available 24/7.',
    images: [{ url: '/images/deportation-defense-emergency.jpg' }],
  },
};

export default function DeportationRemovalDefensePage() {
  const services = [
    {
      title: 'Emergency Bond Hearings',
      description:
        'Immediate detention release hearings to get you out of ICE custody while your case is pending',
      icon: '🚨',
      features: [
        'Same-day emergency bond applications',
        'Custody redetermination hearings',
        'Reasonable bond arguments',
        'Alternative to detention programs',
        'Electronic monitoring arrangements',
        'Supervised release negotiations',
      ],
    },
    {
      title: 'Cancellation of Removal',
      description:
        'Permanent relief from deportation for qualifying long-term residents with strong community ties',
      icon: '🛡️',
      features: [
        '10-year continuous residence cases',
        'Exceptional hardship documentation',
        'Good moral character evidence',
        'Family unity arguments',
        'Community ties presentation',
        'Medical hardship cases',
      ],
    },
    {
      title: 'Asylum Defense',
      description:
        'Protection from deportation for those facing persecution, torture, or death in their home country',
      icon: '🏛️',
      features: [
        'Political persecution claims',
        'Religious persecution cases',
        'Gender-based violence protection',
        'LGBTQ+ persecution defense',
        'Torture protection under CAT',
        'One-year filing deadline exceptions',
      ],
    },
    {
      title: 'Adjustment of Status Defense',
      description:
        'Defend your right to permanent residence through family or employment petitions',
      icon: '💚',
      features: [
        'Marriage-based adjustment defense',
        'Employment-based cases',
        'Waiver applications for inadmissibility',
        'Fraud allegations defense',
        'Medical examination issues',
        'Interview preparation and representation',
      ],
    },
    {
      title: 'Appeals to BIA & Federal Courts',
      description: 'Challenge unfavorable immigration court decisions through appellate courts',
      icon: '⚖️',
      features: [
        'Board of Inmigración Appeals (BIA)',
        'Federal Circuit Court appeals',
        'Motions to reopen and reconsider',
        'Habeas corpus petitions',
        'Stay of removal applications',
        'Emergency appellate relief',
      ],
    },
    {
      title: 'ICE Detention Defense',
      description: 'Comprehensive representation for detained individuals fighting removal',
      icon: '🔓',
      features: [
        'Detention facility visits',
        'Video conference hearings',
        'Family communication facilitation',
        'Document collection assistance',
        'Medical care advocacy',
        'Transfer and facility issues',
      ],
    },
    {
      title: 'Administrative Closure',
      description: 'Strategic case management to temporarily halt removal proceedings',
      icon: '⏸️',
      features: [
        'Joint motions for administrative closure',
        'Prosecutorial discretion requests',
        'Case prioritization arguments',
        'Pending petition strategies',
        'Hardship-based closures',
        'Family unity considerations',
      ],
    },
    {
      title: 'Withholding of Removal',
      description: 'Protection from return to countries where you face torture or persecution',
      icon: '🚫',
      features: [
        'Convention Against Torture claims',
        'Withholding under INA 241(b)(3)',
        'Country condition documentation',
        'Expert witness testimony',
        'Medical evidence presentation',
        'Government evidence challenges',
      ],
    },
    {
      title: 'Voluntary Departure',
      description: 'Strategic voluntary departure to preserve future immigration options',
      icon: '✈️',
      features: [
        'Pre-hearing voluntary departure',
        'Post-hearing departure options',
        'Bond posting assistance',
        'Extension applications',
        'Compliance monitoring',
        'Future petition preservation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What should I do if ICE arrests me or a family member?',
      answer:
        'Contact us immediately at 1-844-YO-PELEO. Do not sign any documents without an attorney. You have the right to remain silent and the right to an attorney. We provide 24/7 emergency response for ICE arrests and detention.',
    },
    {
      question: 'How long do I have to prepare for my immigration court hearing?',
      answer:
        "Court dates can be scheduled with very little notice, sometimes just weeks away. The earlier you hire an attorney, the better we can prepare your defense. Don't wait - contact us immediately after receiving a Notice to Appear.",
    },
    {
      question: 'Can I get out of ICE detention while my case is pending?',
      answer:
        'Many people are eligible for bond or release from ICE detention. We can file emergency bond motions and argue for reasonable bond amounts based on your ties to the community and lack of flight risk.',
    },
    {
      question: 'What is cancellation of removal and am I eligible?',
      answer:
        'Cancellation of removal provides permanent relief from deportation. Eligibility requires 10 years of continuous presence, good moral character, and that removal would cause exceptional hardship to qualifying family members.',
    },
    {
      question: 'Will hiring a lawyer make ICE target me more?',
      answer:
        'No. Having legal representation is your constitutional right and typically leads to better outcomes. Abogados can negotiate with ICE and prosecutors, often resulting in more favorable treatment and case resolution.',
    },
    {
      question: 'How much does deportation defense cost?',
      answer:
        'We offer payment plans and understand the financial stress of deportation proceedings. The cost of experienced legal representation is far less than the cost of losing your case and being separated from your family forever.',
    },
  ];

  const content = {
    introduction: `Facing deportation is one of the most terrifying experiences anyone can endure. The stakes couldn't be higher - your freedom, your family, and your future in America are all on the line. Our deportation defense attorneys have successfully defended thousands of clients in removal proceedings, with former ICE attorneys and immigration judges on our team who understand exactly how the government builds their cases.`,

    processTitle: 'Our Deportation Defense Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response & Assessment',
        description:
          'Immediate case evaluation and emergency relief filing within 24 hours of contact',
      },
      {
        step: '2',
        title: 'Bond Hearing & Release',
        description: 'Aggressive bond advocacy to secure release from ICE detention',
      },
      {
        step: '3',
        title: 'Defense Strategy Development',
        description:
          'Comprehensive legal research and evidence gathering for strongest possible defense',
      },
      {
        step: '4',
        title: 'Court Representation',
        description: 'Experienced courtroom advocacy before immigration judges nationwide',
      },
      {
        step: '5',
        title: 'Appeals & Post-Decision Relief',
        description: 'Appellate advocacy and post-decision options to protect your future',
      },
    ],

    urgencyTitle: 'ICE Arrest? Deportation Proceedings? Time is CRITICAL!',
    urgencyMessage:
      'Every hour counts in deportation cases. The government has unlimited resources and experienced attorneys. You need experienced deportation defense lawyers fighting for you immediately.',

    successStats: [
      { number: '15,000+', label: 'Deportation Cases Defended' },
      { number: '89%', label: 'Success Rate in Bond Hearings' },
      { number: '24/7', label: 'Emergency Response Available' },
      { number: '3', label: 'Former ICE Abogados on Staff' },
    ],

    whyChooseTitle: 'Why Choose Our Deportation Defense Team?',
    whyChoosePoints: [
      'Former ICE trial attorneys who know government strategies',
      'Former immigration judges who understand court procedures',
      '24/7 emergency response for ICE arrests and detention',
      'Fluent Spanish-speaking attorneys and staff',
      'Nationwide practice in all immigration courts',
      'Proven track record with 89% bond hearing success rate',
      'Aggressive advocacy - we fight every case to win',
      'Payment plans available for all deportation cases',
    ],

    emergencyInfo: {
      title: 'ICE Emergency Response Protocol',
      items: [
        'Call 1-844-YO-PELEO immediately - available 24/7/365',
        'Do NOT sign any documents without speaking to us first',
        'Exercise your right to remain silent until we arrive',
        'Do NOT make statements about your case to ICE officers',
        'We can visit you in detention within 24 hours anywhere in NC/FL',
        'Emergency bond hearings can often be scheduled within 72 hours',
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Emergency Deportation Defense Abogados"
      subtitle="Former ICE Abogados Fighting For Your Freedom"
      description="Facing deportation? Our team includes former ICE trial attorneys and immigration judges who know exactly how to defend against removal proceedings. We provide 24/7 emergency response for ICE arrests."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Emergency Alert Section */}
          <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-red-400 mb-6 flex items-center gap-3">
              🚨 ICE Emergency Response Protocol
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  If You or Family Member is Arrested by ICE:
                </h3>
                <ul className="space-y-2 text-gray-300">
                  {content.emergencyInfo.items.map((item, index) => (
                    <li key={index}

                className="flex items-start gap-2">
                      <span
                className="text-red-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">Emergency Contact</h3>
                <div className="space-y-3">
                  <p className="text-white">
                    <strong>24/7 Emergency Line:</strong>
                    <br />
                    <a href="tel:1-844-967-3536" className="text-2xl font-bold text-red-400">
                      1-844-YO-PELEO
                    </a>
                  </p>
                  <p className="text-gray-300 text-sm">
                    Available 365 days a year including holidays and weekends
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Court Locations */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-6">Inmigración Courts We Serve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  city: 'Charlotte, NC',
                  address: '6130 Tyvola Centre Dr',
                  judges: '12 Inmigración Judges',
                },
                { city: 'Orlando, FL', address: '1000 Legion Pl', judges: '8 Inmigración Judges' },
                { city: 'Miami, FL', address: '8855 SW 212th St', judges: '15 Inmigración Judges' },
                {
                  city: 'Atlanta, GA',
                  address: '180 Spring St SW',
                  judges: '20 Inmigración Judges',
                },
                {
                  city: 'Memphis, TN',
                  address: '842 Virginia Run Cv',
                  judges: '6 Inmigración Judges',
                },
                {
                  city: 'New Orleans, LA',
                  address: '600 S Maestri Pl',
                  judges: '4 Inmigración Judges',
                },
              ].map((court, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-lg font-bold text-primary mb-2">{court.city}</h3>
                  <p className="text-gray-300 text-sm mb-1">{court.address}</p>
                  <p className="text-gray-400 text-sm">{court.judges}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Types of Relief */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-6">Types of Relief From Removal</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Defensive Relief (In Removal Proceedings)
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Cancellation of Removal (10-year rule)</li>
                  <li>• Asylum (1-year filing deadline exceptions)</li>
                  <li>• Adjustment of Status through family/employment</li>
                  <li>• Withholding of Removal</li>
                  <li>• Protection under Convention Against Torture</li>
                  <li>• Registry (pre-1972 arrival)</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Strategic Options</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Voluntary Departure</li>
                  <li>• Administrative Closure</li>
                  <li>• Prosecutorial Discretion</li>
                  <li>• Appeals to BIA and Federal Courts</li>
                  <li>• Motions to Reopen/Reconsider</li>
                  <li>• Habeas Corpus Petitions</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
