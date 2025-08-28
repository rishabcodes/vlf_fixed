import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Wrongful Death Lawyers NC & FL | Family Loss Attorneys | Vasquez Law Firm',
  description:
    'Compassionate wrongful death attorneys fighting for families who lost loved ones to negligence. We pursue maximum compensation for fatal accidents and malpractice. Free consultation. Call 1-844-YO-PELEO',
  keywords:
    'wrongful death lawyer, fatal accident attorney, wrongful death compensation, family loss attorney, fatal injury lawyer, wrongful death damages',
  openGraph: {
    title: 'Wrongful Death Lawyers | Compassionate Family Advocates - Vasquez Law Firm',
    description:
      'Compassionate wrongful death attorneys fighting for justice and maximum compensation for grieving families.',
    images: [
      {
        url: '/images/wrongful-death-lawyers.jpg',
        alt: 'Wrongful Death Lawyers',
      },
    ],
  },
};

export default function WrongfulDeathPage() {
  const services = [
    {
      title: 'Fatal Car Accident Claims',
      description:
        'Comprehensive representation for families who lost loved ones in motor vehicle crashes',
      icon: '🚗',
      features: [
        'Head-on collision fatal accidents',
        'Drunk driving death cases',
        'Commercial vehicle fatal crashes',
        'Hit-and-run fatality claims',
        'Intersection collision deaths',
        'Motorcycle and pedestrian fatalities',
      ],
    },
    {
      title: 'Medical Malpractice Deaths',
      description:
        'Legal action against healthcare providers whose negligence caused preventable deaths',
      icon: '🏥',
      features: [
        'Surgical error fatalities',
        'Medication error deaths',
        'Misdiagnosis and delayed diagnosis',
        'Hospital negligence cases',
        'Nursing home wrongful deaths',
        'Emergency room malpractice',
      ],
    },
    {
      title: 'Workplace Fatality Claims',
      description: 'Representation for families after work-related deaths and industrial accidents',
      icon: '🏗️',
      features: [
        'Construction site fatalities',
        'Industrial accident deaths',
        'Chemical exposure fatalities',
        'Equipment malfunction deaths',
        'Fall from height accidents',
        'Third-party liability claims',
      ],
    },
    {
      title: 'Product Liability Deaths',
      description: 'Claims against manufacturers of defective products that caused fatal injuries',
      icon: '⚠️',
      features: [
        'Defective vehicle part deaths',
        'Dangerous pharmaceutical fatalities',
        'Defective medical device deaths',
        'Consumer product fatalities',
        'Toxic product exposure deaths',
        'Failure to warn cases',
      ],
    },
    {
      title: 'Premises Liability Deaths',
      description: 'Legal action for deaths caused by dangerous property conditions',
      icon: '🏠',
      features: [
        'Slip and fall fatal accidents',
        'Swimming pool drowning deaths',
        'Building collapse fatalities',
        'Inadequate security deaths',
        'Fire and explosion fatalities',
        'Toxic exposure deaths',
      ],
    },
    {
      title: 'Nursing Home Wrongful Deaths',
      description:
        'Specialized representation for families after nursing home neglect and abuse deaths',
      icon: '👴',
      features: [
        'Neglect and abuse fatalities',
        'Medication error deaths',
        'Fall injury fatalities',
        'Malnutrition and dehydration',
        'Infection-related deaths',
        'Inadequate medical care',
      ],
    },
    {
      title: 'Criminal Act Fatalities',
      description: 'Civil claims for families after loved ones killed in violent crimes',
      icon: '🚨',
      features: [
        'Assault and battery deaths',
        'Negligent security fatalities',
        'Bar and club violence deaths',
        'Retail establishment crimes',
        'Apartment complex violence',
        'Third-party liability claims',
      ],
    },
    {
      title: 'Survival Action Claims',
      description: 'Recovery for pain and suffering endured before death',
      icon: '⏰',
      features: [
        'Pre-death pain and suffering',
        'Medical expenses before death',
        'Lost wages during final illness',
        'Conscious suffering damages',
        'Medical treatment costs',
        'End-of-life care expenses',
      ],
    },
    {
      title: 'Estate Administration Support',
      description: 'Assistance with estate matters and beneficiary representation',
      icon: '📋',
      features: [
        'Estate representative appointment',
        'Beneficiary rights protection',
        'Asset distribution coordination',
        'Insurance claim assistance',
        'Probate court representation',
        'Estate settlement support',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Who can file a wrongful death claim in North Carolina?',
      answer:
        "In NC, only the personal representative of the deceased's estate can file a wrongful death claim. This is typically the spouse, parent, or adult child. The compensation recovered is distributed to beneficiaries according to state law.",
    },
    {
      question: 'How long do I have to file a wrongful death lawsuit?',
      answer:
        "North Carolina has a 2-year statute of limitations for wrongful death claims from the date of death. However, certain circumstances may extend this deadline. It's crucial to contact an attorney immediately to protect your rights.",
    },
    {
      question: 'What compensation can be recovered in a wrongful death case?',
      answer:
        'NC law allows recovery for the "pecuniary value" of the deceased\'s life to beneficiaries, including lost income, benefits, services, protection, care, and assistance. Medical expenses and funeral costs may also be recoverable.',
    },
    {
      question: "Can we file a wrongful death claim if there's also a criminal case?",
      answer:
        'Yes, criminal and civil cases are separate. A criminal conviction is not required for a successful wrongful death claim, and the burden of proof is lower in civil court (preponderance of evidence vs. beyond reasonable doubt).',
    },
    {
      question: 'How much does it cost to hire a wrongful death attorney?',
      answer:
        'We work on a contingency fee basis, meaning you pay no attorney fees unless we recover compensation for your family. We advance all case expenses and only collect our fee from the settlement or verdict.',
    },
    {
      question: 'What if my loved one was partially at fault for the accident?',
      answer:
        'North Carolina follows contributory negligence law, which can bar recovery if the deceased was even partially at fault. However, we know how to investigate thoroughly and prove the defendant was 100% responsible for the death.',
    },
  ];

  const content = {
    introduction: `Losing a loved one is devastating. When that loss is caused by someone else's negligence or wrongful actions, the pain is compounded by feelings of injustice. Our compassionate wrongful death attorneys understand the profound grief your family is experiencing while fighting aggressively to hold responsible parties accountable and secure the compensation your family needs for the future.`,

    processTitle: 'Our Compassionate Legal Process',
    process: [
      {
        step: '1',
        title: 'Compassionate Consultation',
        description: 'Private, respectful meeting to understand your loss and legal options',
      },
      {
        step: '2',
        title: 'Thorough Investigation',
        description: 'Comprehensive investigation to determine all liable parties and causes',
      },
      {
        step: '3',
        title: 'Evidence Preservation',
        description: 'Securing crucial evidence before it disappears or is destroyed',
      },
      {
        step: '4',
        title: 'Expert Analysis',
        description: 'Working with medical, accident, and economic experts to build your case',
      },
      {
        step: '5',
        title: 'Aggressive Advocacy',
        description: 'Fighting for maximum compensation while you focus on healing',
      },
    ],

    urgencyTitle: '⏰ Time is Critical for Evidence Preservation',
    urgencyMessage:
      "Important evidence can disappear quickly after a fatal accident. Contact us immediately to protect your family's rights and preserve crucial evidence for your case.",

    successStats: [
      { number: '150+', label: 'Wrongful Death Cases' },
      { number: '89%', label: 'Success Rate' },
      { number: '$3.2M', label: 'Largest Settlement' },
      { number: '2 Years', label: 'Statute of Limitations' },
    ],

    whyChooseTitle: 'Why Choose Our Wrongful Death Team?',
    whyChoosePoints: [
      '89% success rate in wrongful death cases',
      'Compassionate representation during your most difficult time',
      'Thorough investigation with expert witnesses',
      'No fees unless we recover compensation for your family',
      'Proven track record with multi-million dollar settlements',
      'Bilingual legal team providing culturally sensitive support',
      'Comprehensive support through the entire legal process',
      'Strong relationships with medical and economic experts',
    ],

    damageTypes: {
      title: 'Types of Wrongful Death Compensation',
      categories: [
        {
          category: 'Economic Damages',
          description: 'Financial losses to the family',
          damages: [
            'Lost income and earning capacity',
            'Lost benefits and pension contributions',
            'Medical expenses before death',
            'Funeral and burial expenses',
            'Lost household services',
            'Loss of inheritance',
          ],
        },
        {
          category: 'Survival Action Damages',
          description: "Compensation for deceased's suffering",
          damages: [
            'Pain and suffering before death',
            'Medical treatment costs',
            'Lost wages during final illness',
            'Conscious suffering damages',
            'Property damage',
            'Other pre-death losses',
          ],
        },
        {
          category: 'Family Impact',
          description: 'Non-economic losses to beneficiaries',
          damages: [
            'Loss of love and companionship',
            'Loss of care and protection',
            'Loss of guidance and counsel',
            'Loss of training and education',
            'Grief and mental anguish',
            'Loss of consortium (spouse)',
          ],
        },
      ],
    },
  };

  return (
    <StandardizedPracticeAreaTemplate
      title="Wrongful Death Lawyers"
      subtitle="Compassionate Advocacy for Grieving Families"
      description="Compassionate wrongful death attorneys fighting for justice and maximum compensation when negligence takes the life of your loved one. We handle your case with respect while pursuing aggressive legal action."
      services={services}
      faqs={faqs}
      overview={{
        content: content.introduction,
      }}
      additionalContent={
        <div className="space-y-12">
          {/* Compassionate Support */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">We Understand Your Loss</h2>
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-lg p-8 border border-purple-500/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-purple-400 mb-4">
                    ❤️ Our Compassionate Approach
                  </h3>
                  <ul className="space-y-2 text-purple-200">
                    <li>• Respectful handling of your loved one's memory</li>
                    <li>• Minimal burden on grieving families</li>
                    <li>• Clear communication at every step</li>
                    <li>• Flexible meeting arrangements</li>
                    <li>• Emotional support resources</li>
                    <li>• Culturally sensitive representation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-400 mb-4">
                    ⚖️ Fighting for Justice
                  </h3>
                  <ul className="space-y-2 text-purple-200">
                    <li>• Maximum compensation for your family</li>
                    <li>• Holding negligent parties accountable</li>
                    <li>• Thorough investigation and evidence preservation</li>
                    <li>• Expert witness testimony</li>
                    <li>• Aggressive negotiations and litigation</li>
                    <li>• Contingency fee representation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Damage Types */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Types of Wrongful Death Compensation
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.damageTypes.categories.map((category, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-xl font-bold text-primary mb-3">{category.category}</h3>
                  <p className="text-gray-300 mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.damages.map((damage, dIndex) => (
                      <li key={dIndex}

                className="text-gray-300 text-sm flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {damage}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* NC Wrongful Death Law */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              North Carolina Wrongful Death Law
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">Who Can File</h3>
                <div className="space-y-3 text-gray-300">
                  <p>
                    In North Carolina, only the <strong>personal representative</strong> of the
                    deceased's estate can file a wrongful death claim.
                  </p>
                  <h4 className="font-bold text-white">Priority Order:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>1. Surviving spouse</li>
                    <li>2. Children of deceased</li>
                    <li>3. Parents of deceased</li>
                    <li>4. Other relatives per state law</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">Compensation Distribution</h3>
                <div className="space-y-3 text-gray-300">
                  <p>
                    Recovery is distributed to <strong>next of kin</strong> based on their financial
                    dependency on the deceased.
                  </p>
                  <h4 className="font-bold text-white">Distribution Formula:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Spouse and children (if both survive)</li>
                    <li>• Spouse only (if no children)</li>
                    <li>• Children only (if no spouse)</li>
                    <li>• Parents (if no spouse/children)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Causes */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Common Causes of Wrongful Death
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-primary mb-3">🚗 Motor Vehicle Accidents</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Car, truck, and motorcycle crashes</li>
                  <li>• Drunk driving fatalities</li>
                  <li>• Pedestrian and bicycle deaths</li>
                  <li>• Hit-and-run fatalities</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-primary mb-3">🏥 Medical Malpractice</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Surgical errors</li>
                  <li>• Medication mistakes</li>
                  <li>• Misdiagnosis/delayed diagnosis</li>
                  <li>• Hospital negligence</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-primary mb-3">🏗️ Workplace Accidents</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Construction site fatalities</li>
                  <li>• Industrial accidents</li>
                  <li>• Equipment malfunctions</li>
                  <li>• Chemical exposure deaths</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-primary mb-3">⚠️ Product Defects</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Defective vehicles/parts</li>
                  <li>• Dangerous pharmaceuticals</li>
                  <li>• Faulty medical devices</li>
                  <li>• Consumer product failures</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-primary mb-3">🏠 Premises Liability</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Slip and fall fatalities</li>
                  <li>• Swimming pool drownings</li>
                  <li>• Building collapses</li>
                  <li>• Inadequate security deaths</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-primary mb-3">👴 Nursing Home Neglect</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Neglect and abuse deaths</li>
                  <li>• Medication errors</li>
                  <li>• Fall injury fatalities</li>
                  <li>• Malnutrition/dehydration</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Support During Difficult Time */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Support During Your Difficult Time
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  💙 We're Here for Your Family
                </h3>
                <p className="text-gray-300">
                  We understand that no amount of money can bring back your loved one, but holding
                  responsible parties accountable and securing your family's financial future
                  is our mission.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3">What We Handle:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• All legal paperwork and court filings</li>
                    <li>• Communication with insurance companies</li>
                    <li>• Investigation and evidence gathering</li>
                    <li>• Expert witness coordination</li>
                    <li>• Settlement negotiations</li>
                    <li>• Trial representation if needed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">What You Can Focus On:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Grieving and healing with family</li>
                    <li>• Taking care of immediate needs</li>
                    <li>• Making arrangements for the future</li>
                    <li>• Seeking emotional support</li>
                    <li>• Honoring your loved one's memory</li>
                    <li>• Moving forward when you're ready</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
