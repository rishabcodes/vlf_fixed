import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Bicycle Accident Abogados NC & FL | Cyclist Injury Abogados | Vasquez Law Firm',
  description:
    'Expert bicycle accident attorneys fighting for cyclists injured by negligent drivers. We overcome contributory negligence laws and secure maximum compensation. Free consultation. Call 1-844-YO-PELEO',
  keywords:
    'bicycle accident lawyer, bike accident attorney, cyclist injury lawyer, bicycle crash attorney, bike lane accident, cyclist rights lawyer, bicycle personal injury',
  openGraph: {
    title: 'Bicycle Accident Abogados | Cyclist Injury Protection - Vasquez Law Firm',
    description:
      'Experienced bicycle accident attorneys fighting for cyclists injured by negligent drivers.',
    images: [{ url: '/images/bicycle-accident-lawyers.jpg' }],
  },
};

export default function BicycleAccidentsPage() {
  const services = [
    {
      title: 'Bicycle vs Car Accident Representation',
      description:
        'Complete legal representation for cyclists injured in collisions with motor vehicles',
      icon: '🚴',
      features: [
        'Car vs bicycle collision investigation',
        'Right-hook and left-cross accident cases',
        'Rear-end collision representation',
        'Intersection accident litigation',
        'Hit-and-run bicycle accident cases',
        'Commercial vehicle vs cyclist claims',
      ],
    },
    {
      title: 'Bike Lane & Road Safety Violations',
      description:
        'Cases involving violations of bicycle safety laws and road sharing requirements',
      icon: '🛣️',
      features: [
        '4-foot passing distance violations',
        'Bike lane obstruction cases',
        'Unsafe passing incident representation',
        'Road rage against cyclists',
        'Failure to yield to cyclists',
        'Bicycle traffic law violations',
      ],
    },
    {
      title: 'Dooring Accident Claims',
      description: 'Specialized representation for cyclists injured by opening car doors',
      icon: '🚪',
      features: [
        'Parked car door opening accidents',
        'Taxi and rideshare dooring incidents',
        'Commercial vehicle dooring cases',
        'Street parking door accidents',
        'Driver negligence in door opening',
        'Passenger liability for dooring',
      ],
    },
    {
      title: 'Contributory Negligence Defense',
      description: 'Expert defense against contributory negligence claims in North Carolina',
      icon: '⚖️',
      features: [
        'Helmet use defense strategies',
        'Bicycle lighting compliance proof',
        'Lane positioning justification',
        'Traffic signal compliance evidence',
        'Cyclist visibility documentation',
        '100% driver fault establishment',
      ],
    },
    {
      title: 'Catastrophic Bicycle Injury Cases',
      description: 'Representation for severe and life-changing bicycle accident injuries',
      icon: '🏥',
      features: [
        'Traumatic brain injury cases',
        'Spinal cord injury representation',
        'Multiple fracture claims',
        'Permanent disability cases',
        'Road rash and scarring claims',
        'Internal organ injury litigation',
      ],
    },
    {
      title: 'Bicycle Accident Reconstruction',
      description: 'Expert accident reconstruction and evidence analysis for bicycle cases',
      icon: '🔬',
      features: [
        'Accident scene investigation',
        'Skid mark and impact analysis',
        'Cyclist visibility studies',
        'Speed and trajectory calculations',
        'Traffic camera footage review',
        'Expert witness testimony',
      ],
    },
    {
      title: 'Insurance Company Negotiations',
      description: 'Aggressive negotiations with insurance companies to secure fair compensation',
      icon: '💰',
      features: [
        'Maximum settlement negotiations',
        'Insurance bad faith claims',
        'Uninsured motorist claims',
        'Underinsured motorist coverage',
        'Policy limits maximization',
        'Settlement timing strategies',
      ],
    },
    {
      title: 'Bicycle Safety Education & Advocacy',
      description: 'Promoting cyclist rights and safety through education and legal advocacy',
      icon: '📢',
      features: [
        'Cyclist rights education',
        'Traffic law advocacy',
        'Safety equipment recommendations',
        'Community cycling safety programs',
        'Legal precedent establishment',
        'Bicycle infrastructure advocacy',
      ],
    },
    {
      title: 'Bicycle Product Liability Claims',
      description: 'Representation for injuries caused by defective bicycles or safety equipment',
      icon: '🔧',
      features: [
        'Defective bicycle manufacturing claims',
        'Helmet failure liability cases',
        'Brake system malfunction claims',
        'Tire and wheel defect cases',
        'Safety equipment failure claims',
        'Bicycle recall injury cases',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Do I need to wear a helmet when cycling in North Carolina?',
      answer:
        "NC law only requires helmets for riders under 16. However, not wearing a helmet doesn't automatically bar your personal injury claim if a driver's negligence caused your accident. We can still recover full compensation.",
    },
    {
      question: "What is North Carolina's contributory negligence law for bicycle accidents?",
      answer:
        "NC follows pure contributory negligence, meaning if you're found even 1% at fault, you recover nothing. Insurance companies exploit this harsh law, but we know how to prove the driver was 100% at fault.",
    },
    {
      question: "Can I recover compensation if I wasn't in a bike lane when hit?",
      answer:
        "Yes! Cyclists aren't required to use bike lanes in NC. You have the right to use the full travel lane when necessary for safety. We'll prove you were riding legally and the driver failed to share the road.",
    },
    {
      question: 'What is the 4-foot passing law in North Carolina?',
      answer:
        'NC law requires drivers to maintain at least 4 feet of clearance when passing cyclists. Violations of this law are strong evidence of driver negligence and can support your injury claim.',
    },
    {
      question: 'How much compensation can I receive for my bicycle accident injuries?',
      answer:
        "Compensation varies based on injury severity, medical costs, lost wages, and pain and suffering. We've recovered millions for cyclists, including cases exceeding $500,000 for severe injuries.",
    },
    {
      question: 'What should I do immediately after a bicycle accident?',
      answer:
        'Seek medical attention, call police, document the scene with photos, get witness information, and avoid admitting fault. Contact us immediately to preserve evidence and protect your rights.',
    },
  ];

  const content = {
    introduction: `Cyclists face unique dangers on North Carolina roads, where drivers often fail to respect cyclists' legal rights to use roadways. Our bicycle accident attorneys understand the complexities of cyclist injury cases, including the state's harsh contributory negligence law that insurance companies exploit to deny claims. We fight aggressively to overcome these challenges and secure maximum compensation for injured cyclists.`,

    processTitle: 'Our Bicycle Accident Case Process',
    process: [
      {
        step: '1',
        title: 'Immediate Response & Evidence Preservation',
        description: 'Rapid scene investigation and evidence collection before it disappears',
      },
      {
        step: '2',
        title: 'Medical Documentation & Injury Assessment',
        description: 'Comprehensive medical evaluation and treatment coordination',
      },
      {
        step: '3',
        title: 'Contributory Negligence Defense Strategy',
        description: "Proving 100% driver fault to overcome NC's harsh negligence laws",
      },
      {
        step: '4',
        title: 'Insurance Negotiations & Litigation',
        description: 'Aggressive pursuit of maximum compensation through settlement or trial',
      },
      {
        step: '5',
        title: 'Recovery & Future Protection',
        description: 'Securing compensation for current and future needs',
      },
    ],

    urgencyTitle: '⚠️ NC Contributory Negligence Warning',
    urgencyMessage:
      "North Carolina's contributory negligence law is harsh - if you're found even 1% at fault, you receive NOTHING. Evidence disappears quickly. Contact us immediately to preserve your rights.",

    successStats: [
      { number: '500+', label: 'Bicycle Accident Cases' },
      { number: '94%', label: 'Success Rate' },
      { number: '$2.1M+', label: 'Largest Bicycle Settlement' },
      { number: '48hrs', label: 'Rapid Response Time' },
    ],

    whyChooseTitle: 'Why Choose Our Bicycle Accident Team?',
    whyChoosePoints: [
      '94% success rate in bicycle accident cases',
      'Expert knowledge of NC contributory negligence law',
      'Proven track record with major bicycle injury settlements',
      'Immediate accident scene investigation and evidence preservation',
      'Strong relationships with accident reconstruction experts',
      'Advocacy for cyclist rights and road safety',
      'Bilingual legal team serving diverse cycling community',
      'No fees unless we win your case',
    ],

    commonAccidents: {
      title: 'Common Types of Bicycle Accidents',
      types: [
        {
          type: 'Right Hook Collisions',
          description: 'Drivers turning right across bike lanes',
          percentage: '28%',
          factors: [
            'Driver fails to check bike lane',
            "Cyclist in driver's blind spot",
            'Inadequate signaling by driver',
            'Speed differential between vehicles',
          ],
        },
        {
          type: 'Dooring Accidents',
          description: 'Car doors opened into cyclist path',
          percentage: '23%',
          factors: [
            'Driver/passenger fails to check mirrors',
            'Cyclist riding in door zone',
            'Parked car in bike lane area',
            'Sudden door opening without warning',
          ],
        },
        {
          type: 'Left Cross Crashes',
          description: 'Vehicles turning left into oncoming cyclists',
          percentage: '19%',
          factors: [
            'Driver misjudges cyclist speed',
            'Failure to yield right of way',
            'Distracted driving',
            'Poor visibility conditions',
          ],
        },
        {
          type: 'Unsafe Passing',
          description: 'Drivers passing too closely to cyclists',
          percentage: '15%',
          factors: [
            'Violation of 4-foot passing law',
            'Aggressive driving behavior',
            'Inadequate lane space',
            'High-speed passing',
          ],
        },
      ],
    },
  };

  return (
    <StandardizedPracticeAreaTemplate
      title="Bicycle Accident Abogados"
      subtitle="Fighting for Cyclists' Rights on the Road"
      description="Expert bicycle accident attorneys protecting cyclists injured by negligent drivers. We overcome North Carolina's contributory negligence law and secure maximum compensation for serious bicycle injuries."
      services={services}
      faqs={faqs}
      overview={{
        content: content.introduction,
      }}
      additionalContent={
        <div className="space-y-12">
          {/* Common Accident Types */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Common Types of Bicycle Accidents
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.commonAccidents.types.map((accident, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                className="text-xl font-bold text-primary">{accident.type}</h3>
                    <span className="text-2xl font-bold text-secondary">{accident.percentage}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{accident.description}</p>
                  <h4 className="font-semibold text-white mb-2">Common Factors:</h4>
                  <ul className="space-y-1">
                    {accident.factors.map((factor, fIndex) => (
                      <li key={fIndex}

                className="text-sm text-gray-400 flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* NC Bicycle Laws */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">North Carolina Bicycle Laws</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🚴 Cyclists' Rights</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Same rights and duties as motor vehicles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>May use full lane when necessary for safety</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Protected by 4-foot passing distance law</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Right to ride on all roads except interstates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>May ride two abreast if not impeding traffic</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">⚠️ Safety Requirements</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">⚠️</span>
                    <span>Helmet required for riders under 16</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">💡</span>
                    <span>Front light and rear reflector required at night</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">👋</span>
                    <span>Must signal turns and stops when safe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">🤚</span>
                    <span>One hand must remain on handlebars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary text-xl">👥</span>
                    <span>No more riders than bicycle seats</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contributory Negligence */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Overcoming North Carolina's Contributory Negligence
            </h2>
            <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  ⚠️ CRITICAL: Pure Contributory Negligence State
                </h3>
                <p className="text-red-200 text-lg">
                  North Carolina is one of only 4 states where being even 1% at fault means you
                  receive NOTHING.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-red-400 mb-4">❌ Insurance Company Tactics:</h4>
                  <ul className="space-y-2 text-red-200">
                    <li>• Claiming helmet non-use caused injuries</li>
                    <li>• Arguing improper lighting or reflectors</li>
                    <li>• Saying cyclist was outside bike lane</li>
                    <li>• Alleging failure to signal turns</li>
                    <li>• Claiming cyclist was speeding</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-4">✅ Our Defense Strategies:</h4>
                  <ul className="space-y-2 text-green-200">
                    <li>• Proving 100% driver negligence</li>
                    <li>• Demonstrating cyclist law compliance</li>
                    <li>• Expert accident reconstruction</li>
                    <li>• Visibility and conspicuity analysis</li>
                    <li>• Traffic law violation evidence</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Injuries */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Common Bicycle Accident Injuries
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🧠 Head & Brain Injuries</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Traumatic brain injuries (TBI)</li>
                  <li>• Concussions and post-concussion syndrome</li>
                  <li>• Skull fractures</li>
                  <li>• Facial fractures and dental injuries</li>
                  <li>• Eye injuries and vision loss</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🦴 Bone & Spinal Injuries</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Spinal cord injuries and paralysis</li>
                  <li>• Clavicle and shoulder fractures</li>
                  <li>• Arm, wrist, and hand fractures</li>
                  <li>• Hip, leg, and ankle fractures</li>
                  <li>• Compression fractures</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">💔 Other Serious Injuries</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Road rash requiring skin grafts</li>
                  <li>• Internal organ damage</li>
                  <li>• Nerve damage and chronic pain</li>
                  <li>• Psychological trauma and PTSD</li>
                  <li>• Loss of limb or amputation</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
