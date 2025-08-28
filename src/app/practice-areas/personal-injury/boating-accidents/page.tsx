import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NC Boating Accident Lawyer | Watercraft Injury Attorney | Vasquez Law Firm',
  description:
    'Injured in a boating or watercraft accident in North Carolina? Our experienced maritime attorneys fight for victims on NC lakes and coastal waters. Se habla español.',
  keywords: [
    'boating accident lawyer NC',
    'North Carolina watercraft accident attorney',
    'boat crash lawyer Lake Norman',
    'Jordan Lake boating accident attorney',
    'NC maritime injury lawyer',
    'jet ski accident lawyer North Carolina',
    'abogado accidente barco',
    'Outer Banks boating accident attorney',
    'NC boat accident compensation',
    'watercraft injury claim North Carolina',
  ],
  openGraph: {
    title: 'NC Boating Accident Lawyer | Watercraft Injury Attorney',
    description:
      'Fighting for boating accident victims on North Carolina waters. We overcome contributory negligence defenses and maritime law complexities. Free consultation.',
    images: [
      {
        url: '/images/boating-accident-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Boating Accident Attorney',
      },
    ],
  },
};

export default function BoatingAccidentsPage() {
  const services = [
    {
      title: 'Recreational Boating Accidents',
      description: 'Injuries on lakes, rivers, and coastal waters',
      icon: '⛵',
      features: [
        'Collision between vessels',
        'Wake and wave injuries',
        'Dock and marina accidents',
        'Swimming area violations',
        'Anchor and mooring accidents',
        'Capsizing and sinking',
      ],
    },
    {
      title: 'Jet Ski & PWC Accidents',
      description: 'Personal watercraft collision claims',
      icon: '🏄',
      features: [
        'High-speed collisions',
        'Reckless operation',
        'Passenger ejection injuries',
        'No-wake zone violations',
        'Rental company liability',
        'Inexperienced operators',
      ],
    },
    {
      title: 'Commercial Vessel Injuries',
      description: 'Tour boats, ferries, and charter accidents',
      icon: '🚢',
      features: [
        'Tour boat accidents',
        'Ferry injuries',
        'Fishing charter incidents',
        'Parasailing accidents',
        'Dinner cruise injuries',
        'Water taxi collisions',
      ],
    },
    {
      title: 'Drunk Boating (BUI)',
      description: 'Boating under influence accidents',
      icon: '🚫',
      features: [
        'Alcohol-related crashes',
        'Drug impairment cases',
        'Enhanced damages claims',
        'Criminal coordination',
        'Marina overservice',
        'Party boat liability',
      ],
    },
    {
      title: 'Equipment Failures',
      description: 'Mechanical and safety equipment defects',
      icon: '⚙️',
      features: [
        'Engine failure accidents',
        'Steering system defects',
        'Life jacket failures',
        'Fire suppression failures',
        'Navigation light defects',
        'Propeller injuries',
      ],
    },
    {
      title: 'Maritime Law Claims',
      description: 'Federal admiralty and maritime jurisdiction',
      icon: '⚖️',
      features: [
        'Jones Act claims',
        'Limitation of liability',
        'Maritime liens',
        'Salvage claims',
        'General maritime law',
        'Federal court filing',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Who is liable in a boating accident?',
      answer: 'Liability can fall on boat operators, boat owners, rental companies, marinas, manufacturers, or other boaters. Common causes include operator negligence, BUI, equipment failure, and violations of navigation rules. We investigate all potential defendants.',
    },
    {
      question: 'What if the boat operator was drunk?',
      answer: 'Boating Under the Influence (BUI) is illegal with BAC of .08% or higher. Drunk boating cases often result in enhanced damages and punitive awards. Criminal charges strengthen civil claims. We coordinate with prosecutors for maximum recovery.',
    },
    {
      question: 'Does boat insurance cover accidents?',
      answer: 'Most boat policies cover liability and property damage, but coverage varies widely. Many boaters are underinsured. We pursue all available insurance, including homeowners umbrella policies and marina liability coverage.',
    },
    {
      question: 'What are common boating accident injuries?',
      answer: 'Drowning and near-drowning, traumatic brain injuries from impacts, propeller lacerations, carbon monoxide poisoning, hypothermia, spinal injuries, and wrongful death. Water accidents often cause severe, life-changing injuries.',
    },
    {
      question: 'How long do I have to file a boating accident claim?',
      answer: 'Generally 3 years in North Carolina for personal injury. However, maritime law may apply different deadlines. If the accident involved government vessels or occurred in federal waters, shorter notice requirements may apply. Contact us immediately.',
    },
    {
      question: 'What if I was partially at fault?',
      answer: 'North Carolina\'s contributory negligence rule can bar recovery if you\'re even 1% at fault. However, maritime law may apply comparative fault instead. We analyze jurisdiction and applicable law to maximize your recovery options.',
    },
  ];

  const content = {
    introduction: `Boating accidents on North Carolina\'s lakes, rivers, and coastal waters cause devastating injuries and deaths each year. From Lake Norman to the Outer Banks, recreational boating, jet skis, and commercial vessels create unique dangers. Our maritime attorneys understand both state and federal laws governing waterway accidents and fight for maximum compensation for victims and families.`,

    processTitle: 'Boating Accident Case Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Medical care and accident documentation',
      },
      {
        step: '2',
        title: 'Investigation',
        description: 'Coast Guard reports, witness statements',
      },
      {
        step: '3',
        title: 'Liability Analysis',
        description: 'Determine applicable laws and defendants',
      },
      {
        step: '4',
        title: 'Insurance Claims',
        description: 'Pursue all available coverage sources',
      },
      {
        step: '5',
        title: 'Litigation',
        description: 'State or federal court proceedings',
      },
    ],

    urgencyTitle: '🚨 Preserve Evidence Immediately',
    urgencyMessage: 'Boats get repaired, witnesses scatter, and maritime evidence disappears quickly. Coast Guard reports and marina records have limited retention. Act now.',

    whyChooseTitle: 'Why Choose Vasquez Law for Boating Accidents',
    whyChoosePoints: [
      'Maritime law and admiralty jurisdiction knowledge',
      'Understanding of navigation rules and regulations',
      'Coast Guard investigation experience',
      'Relationships with marine experts',
      'Both state and federal court experience',
      'Maximum insurance recovery strategies',
      'Wrongful death and catastrophic injury experience',
      'Offices near major NC waterways',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Boating Accident Statistics (2025)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <div className="text-4xl font-bold text-blue-400 mb-2">180+</div>
            <div className="text-lg text-white mb-2">Annual Accidents</div>
            <p className="text-gray-400 text-sm">Reported boating accidents in NC waters</p>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <div className="text-4xl font-bold text-red-400 mb-2">25%</div>
            <div className="text-lg text-white mb-2">Involve Alcohol</div>
            <p className="text-gray-400 text-sm">BUI is leading cause of fatal accidents</p>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <div className="text-4xl font-bold text-yellow-400 mb-2">70%</div>
            <div className="text-lg text-white mb-2">Operator Error</div>
            <p className="text-gray-400 text-sm">Inexperience and negligence cause most</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Popular NC Waterways We Serve</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Lakes & Rivers</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Lake Norman (Charlotte area)</li>
              <li>• Jordan Lake (Raleigh area)</li>
              <li>• Falls Lake</li>
              <li>• Lake Gaston</li>
              <li>• Kerr Lake</li>
              <li>• Cape Fear River</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Coastal Waters</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Outer Banks</li>
              <li>• Pamlico Sound</li>
              <li>• Albemarle Sound</li>
              <li>• Intracoastal Waterway</li>
              <li>• Wrightsville Beach</li>
              <li>• Atlantic Ocean (3-mile limit)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Boating Accident Claims"
      subtitle="Maritime Injury Attorneys for NC Waters"
      description="Injured in a boating accident? We navigate complex maritime laws to secure maximum compensation for victims on North Carolina waters."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
