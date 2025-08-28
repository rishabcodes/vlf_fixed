import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Emergency Vehicle Accident Lawyer NC | Fire Truck, Ambulance & Police Car Accidents',
  description:
    'Injured in an accident with an ambulance, fire truck, or police car in North Carolina? Our emergency vehicle accident attorneys fight for maximum compensation.',
  keywords: [
    'emergency vehicle accident lawyer NC',
    'ambulance accident attorney North Carolina',
    'fire truck accident lawyer',
    'police car accident attorney',
    'emergency vehicle collision NC',
    'Charlotte emergency vehicle lawyer',
  ],
  openGraph: {
    title: 'NC Emergency Vehicle Accident Lawyer | Ambulance & Fire Truck Accidents',
    description:
      'Injured by an emergency vehicle? Get experienced legal representation for accidents involving ambulances, fire trucks, and police cars.',
    images: [
      {
        url: '/images/emergency-vehicle-accidents-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Emergency Vehicle Accident Attorney North Carolina',
      },
    ],
  },
};

export default function EmergencyVehicleAccidentsPage() {
  const services = [
    {
      title: 'Police Car Accidents',
      description: 'Collisions with law enforcement vehicles',
      icon: '🚔',
      features: [
        'High-speed pursuit crashes',
        'Intersection collisions',
        'Failure to yield accidents',
        'Distracted driving by officers',
        'Excessive speed claims',
        'Constitutional violations',
      ],
    },
    {
      title: 'Ambulance Accidents',
      description: 'EMS vehicle collision claims',
      icon: '🚑',
      features: [
        'Patient transport injuries',
        'Intersection crashes',
        'Equipment failure accidents',
        'Driver negligence',
        'Improper maintenance',
        'Private ambulance liability',
      ],
    },
    {
      title: 'Fire Truck Collisions',
      description: 'Fire department vehicle accidents',
      icon: '🚒',
      features: [
        'Size and weight injuries',
        'Blind spot accidents',
        'Emergency response crashes',
        'Equipment falling incidents',
        'Ladder truck accidents',
        'Water tanker collisions',
      ],
    },
    {
      title: 'Government Immunity',
      description: 'Overcoming sovereign immunity defenses',
      icon: '⚖️',
      features: [
        'Tort Claims Act navigation',
        'Notice requirements',
        'Immunity exceptions',
        'Gross negligence claims',
        'Constitutional violations',
        'Federal claims',
      ],
    },
    {
      title: 'Emergency Exceptions',
      description: 'When emergency vehicles are liable',
      icon: '⚠️',
      features: [
        'Reckless disregard',
        'No lights/sirens active',
        'Non-emergency situations',
        'Excessive speed for conditions',
        'Failure to clear intersections',
        'Impaired emergency drivers',
      ],
    },
    {
      title: 'Catastrophic Injuries',
      description: 'Severe injury compensation',
      icon: '🏥',
      features: [
        'Traumatic brain injuries',
        'Spinal cord damage',
        'Multiple trauma',
        'Burn injuries',
        'Wrongful death',
        'Permanent disability',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Can I sue if hit by a police car or ambulance?',
      answer: 'Yes, but it\'s complex. Emergency vehicles have limited immunity when responding to emergencies with lights/sirens. However, they\'re liable for gross negligence, reckless driving, or accidents during non-emergency situations. We navigate immunity laws to hold them accountable.',
    },
    {
      question: 'What if the emergency vehicle had lights and sirens on?',
      answer: 'Even with lights/sirens, emergency vehicles must drive with due regard for safety. They can\'t blindly speed through intersections or drive recklessly. If they showed reckless disregard for public safety, they\'re liable despite emergency status.',
    },
    {
      question: 'How long do I have to file a claim against a government vehicle?',
      answer: 'Much shorter than regular claims! In NC, you must file notice within 90 days for local government and 3 years for state. In FL, notice is required within 3 years but earlier is better. Missing deadlines bars your claim forever.',
    },
    {
      question: 'What damages can I recover from emergency vehicle accidents?',
      answer: 'Same as other accidents: medical bills, lost wages, pain and suffering, property damage. However, some states cap government liability. We maximize recovery within legal limits and explore all liable parties.',
    },
    {
      question: 'What if I was a patient in the ambulance during the crash?',
      answer: 'You have strong claims! As a patient, the ambulance company owes you the highest duty of care. You can claim for crash injuries plus any worsening of your original medical condition. Private ambulance companies have full liability.',
    },
    {
      question: 'Do different rules apply to volunteer firefighters?',
      answer: 'Yes, volunteer departments may have different immunity and insurance coverage. Some are covered by municipalities, others by separate entities. We investigate all coverage sources to maximize your recovery.',
    },
  ];

  const content = {
    introduction: `Emergency vehicles save lives, but when they cause accidents, victims face unique legal challenges. Government immunity laws, special notice requirements, and complex liability rules make these cases difficult. Our experienced attorneys know how to navigate sovereign immunity, meet strict deadlines, and hold emergency vehicles accountable when their negligence causes injuries.`,

    processTitle: 'Emergency Vehicle Claim Process',
    process: [
      {
        step: '1',
        title: 'Immediate Investigation',
        description: 'Document scene, preserve dispatch records',
      },
      {
        step: '2',
        title: 'Notice Filing',
        description: 'Meet strict government claim deadlines',
      },
      {
        step: '3',
        title: 'Immunity Analysis',
        description: 'Identify exceptions to sovereign immunity',
      },
      {
        step: '4',
        title: 'Evidence Gathering',
        description: 'Obtain dash cam, GPS, radio communications',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Navigate caps and pursue all liable parties',
      },
    ],

    urgencyTitle: '⏰ 90-Day Notice Deadline!',
    urgencyMessage: 'Government claims have extremely short notice requirements. Missing the deadline means losing your right to compensation forever. Contact us immediately.',

    whyChooseTitle: 'Why Choose Vasquez Law for Emergency Vehicle Accidents',
    whyChoosePoints: [
      'Government liability expertise',
      'Sovereign immunity navigation',
      'Strict deadline compliance',
      'Emergency response protocol knowledge',
      'Maximum recovery strategies',
      'Former government attorneys on team',
      'No fees unless we win',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">When Emergency Vehicles Are Liable</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Full Liability Situations</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Non-emergency driving</li>
              <li>• No lights or sirens active</li>
              <li>• Personal use of vehicle</li>
              <li>• Impaired driving</li>
              <li>• Intentional misconduct</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Limited Immunity Exceptions</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Gross negligence</li>
              <li>• Reckless disregard for safety</li>
              <li>• Constitutional violations</li>
              <li>• Failure to use due care</li>
              <li>• Violation of department policy</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Government Claim Requirements</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">North Carolina</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Local government: 90 days notice</li>
                <li>• State vehicles: 3 years to file</li>
                <li>• Industrial Commission for state</li>
                <li>• Damage caps may apply</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Florida</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Notice within 3 years</li>
                <li>• Sovereign immunity limits</li>
                <li>• $200k per person cap</li>
                <li>• $300k per incident cap</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Emergency Vehicle Accidents"
      subtitle="Fighting Government Immunity for Injured Victims"
      description="Hit by a police car, ambulance, or fire truck? We navigate complex immunity laws to get you compensation."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
