import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
export const metadata: Metadata = {
  title: 'Pedestrian Accident Abogados NC & FL | Hit by Car Abogados | Vasquez Law Firm',
  description:
    'Expert pedestrian accident attorneys fighting for people hit by cars. We overcome contributory negligence laws and secure maximum compensation for serious injuries. Free consultation. Call 1-844-YO-PELEO',
  keywords:
    'pedestrian accident lawyer, hit by car attorney, crosswalk accident lawyer, pedestrian injury attorney, walking accident lawyer, pedestrian personal injury',
  openGraph: {
    title: 'Pedestrian Accident Abogados | Hit by Car Legal Experts - Vasquez Law Firm',
    description:
      'Experienced pedestrian accident attorneys fighting for maximum compensation after being hit by cars.',
    images: [{ url: '/images/pedestrian-accident-lawyers.jpg' }],
  },
};

export default function PedestrianAccidentsPage() {
  const services = [
    {
      title: 'Crosswalk Accident Cases',
      description:
        'Legal representation for pedestrians struck while legally crossing in crosswalks',
      icon: '🚸',
      features: [
        'Marked crosswalk accident claims',
        'Unmarked crosswalk collisions',
        'Traffic signal violation cases',
        'Right-of-way accident representation',
        'School zone pedestrian accidents',
        'Intersection collision litigation',
      ],
    },
    {
      title: 'Sidewalk & Walking Path Injuries',
      description: 'Cases involving pedestrians hit while walking on sidewalks or designated paths',
      icon: '🚶',
      features: [
        'Sidewalk accident representation',
        'Walking trail collision cases',
        'Parking lot pedestrian accidents',
        'Driveway and alley incidents',
        'Shopping center pedestrian injuries',
        'Residential area walking accidents',
      ],
    },
    {
      title: 'Distracted Driver Accidents',
      description:
        'Claims against drivers who strike pedestrians while texting, calling, or distracted',
      icon: '📱',
      features: [
        'Texting while driving accidents',
        'Cell phone distraction cases',
        'GPS navigation distraction claims',
        'Eating/drinking driver accidents',
        'Passenger distraction incidents',
        'In-vehicle technology accidents',
      ],
    },
    {
      title: 'Drunk Driver Pedestrian Crashes',
      description:
        'Aggressive pursuit of maximum damages against impaired drivers who hit pedestrians',
      icon: '🍺',
      features: [
        'DUI/DWI pedestrian collision claims',
        'Punitive damages pursuit',
        'Dram shop liability actions',
        'Social host liability cases',
        'Enhanced damages for impairment',
        'Criminal case coordination',
      ],
    },
    {
      title: 'School Zone & Child Pedestrian Accidents',
      description: 'Specialized representation for children struck by vehicles in school zones',
      icon: '🏫',
      features: [
        'School zone speed violation cases',
        'School bus stop accidents',
        'Playground area collisions',
        'Child crossing guard incidents',
        'After-school activity accidents',
        'Special damages for minor injuries',
      ],
    },
    {
      title: 'Hit-and-Run Pedestrian Cases',
      description: 'Investigation and recovery for pedestrians struck by fleeing drivers',
      icon: '🚨',
      features: [
        'Hit-and-run investigation assistance',
        'Uninsured motorist claim filing',
        'Surveillance footage analysis',
        'Witness testimony collection',
        'Police coordination and follow-up',
        'Maximum UM/UIM recovery',
      ],
    },
    {
      title: 'Poor Visibility Accident Claims',
      description:
        'Cases involving pedestrians struck due to inadequate lighting or visibility conditions',
      icon: '🌙',
      features: [
        'Night-time pedestrian accidents',
        'Poor street lighting claims',
        'Weather-related visibility crashes',
        'Dawn and dusk collision cases',
        'Construction zone visibility issues',
        'Inadequate signage accidents',
      ],
    },
    {
      title: 'Contributory Negligence Defense',
      description: "Expert defense against North Carolina's harsh contributory negligence law",
      icon: '⚖️',
      features: [
        'Jaywalking defense strategies',
        'Pedestrian clothing visibility arguments',
        'Crosswalk compliance proof',
        'Traffic signal adherence evidence',
        'Expert witness testimony',
        '100% driver fault establishment',
      ],
    },
    {
      title: 'Catastrophic Pedestrian Injuries',
      description:
        'Specialized representation for severe and life-changing pedestrian accident injuries',
      icon: '🏥',
      features: [
        'Traumatic brain injury cases',
        'Spinal cord injury representation',
        'Multiple fracture claims',
        'Internal organ damage cases',
        'Amputation and limb loss claims',
        'Wrongful death representation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What should I do immediately after being hit by a car as a pedestrian?',
      answer:
        'Seek immediate medical attention, call 911, document the scene with photos if possible, get witness information, and avoid admitting fault. Contact us as soon as possible to protect your rights and preserve evidence.',
    },
    {
      question: "Can I recover compensation if I wasn't in a crosswalk when hit?",
      answer:
        "Yes, you may still recover compensation even if you weren't in a crosswalk. While this complicates your case under NC's contributory negligence law, we can often prove the driver was still 100% at fault through distraction, speeding, or other negligence.",
    },
    {
      question:
        "How does North Carolina's contributory negligence law affect pedestrian accidents?",
      answer:
        "NC's harsh contributory negligence law means if you're found even 1% at fault, you receive nothing. Insurance companies exploit this by claiming pedestrians were jaywalking, not paying attention, or wearing dark clothing. We fight these tactics aggressively.",
    },
    {
      question: "What if the driver who hit me doesn't have insurance?",
      answer:
        "You can file an uninsured motorist claim with your own insurance company. NC requires UM coverage, and we'll help you recover the maximum amount available under any applicable policies.",
    },
    {
      question: 'How much compensation can I receive for my pedestrian accident injuries?',
      answer:
        'Compensation depends on injury severity, medical costs, lost wages, and other factors. Pedestrian accidents often result in serious injuries, leading to significant settlements for medical expenses, lost income, pain and suffering, and other damages.',
    },
    {
      question: 'How long do I have to file a pedestrian accident lawsuit in North Carolina?',
      answer:
        "North Carolina has a 3-year statute of limitations for personal injury claims. However, evidence disappears quickly in pedestrian accidents, so it's crucial to contact an attorney immediately after your accident.",
    },
  ];

  const content = {
    introduction: `Pedestrian accidents are among the most devastating traffic crashes, often resulting in severe injuries or death when a vulnerable person is struck by a vehicle. North Carolina's roads can be dangerous for walkers, especially with distracted driving on the rise. Our pedestrian accident attorneys understand the unique challenges these cases present and fight aggressively to overcome contributory negligence defenses while securing maximum compensation for your serious injuries.`,

    processTitle: 'Our Pedestrian Accident Case Process',
    process: [
      {
        step: '1',
        title: 'Immediate Emergency Response',
        description: 'Rapid accident scene investigation and medical care coordination',
      },
      {
        step: '2',
        title: 'Evidence Preservation & Investigation',
        description:
          'Comprehensive evidence collection including surveillance footage and witness statements',
      },
      {
        step: '3',
        title: 'Contributory Negligence Defense',
        description: "Proving 100% driver fault to overcome NC's harsh negligence laws",
      },
      {
        step: '4',
        title: 'Medical Documentation & Treatment',
        description: 'Ensuring proper medical care and thorough injury documentation',
      },
      {
        step: '5',
        title: 'Maximum Compensation Recovery',
        description: 'Aggressive pursuit of full damages through settlement or trial',
      },
    ],

    urgencyTitle: '⚠️ Evidence Disappears Quickly!',
    urgencyMessage:
      "Surveillance footage gets deleted, witnesses forget, and tire marks fade. North Carolina's contributory negligence law is harsh. Contact us immediately to preserve your rights.",

    successStats: [
      { number: '600+', label: 'Pedestrian Accident Cases' },
      { number: '94%', label: 'Success Rate' },
      { number: '$2.3M+', label: 'Largest Settlement' },
      { number: '15%', label: 'Of Traffic Deaths are Pedestrians' },
    ],

    whyChooseTitle: 'Why Choose Our Pedestrian Accident Team?',
    whyChoosePoints: [
      '94% success rate in pedestrian accident cases',
      'Expert knowledge of NC contributory negligence law',
      'Immediate accident scene investigation and evidence preservation',
      'Strong relationships with accident reconstruction experts',
      'Aggressive fight against unfair blame tactics',
      'Proven track record with catastrophic injury cases',
      'No fees unless we win your case',
      'Bilingual legal team serving diverse communities',
    ],

    accidentLocations: {
      title: 'Common Pedestrian Accident Locations',
      locations: [
        {
          location: 'Crosswalks & Intersections',
          description: 'Most common pedestrian accident sites',
          percentage: '75%',
          dangers: [
            'Drivers running red lights',
            'Failure to yield right of way',
            'Left and right turn collisions',
            'Distracted driving at intersections',
          ],
        },
        {
          location: 'Parking Lots & Driveways',
          description: 'Shopping centers and residential areas',
          percentage: '15%',
          dangers: [
            'Poor visibility around parked cars',
            'Drivers backing out of spaces',
            'Pedestrians between parked vehicles',
            'Loading zone and entrance accidents',
          ],
        },
        {
          location: 'Sidewalks & Walking Paths',
          description: 'Vehicles leaving roadway',
          percentage: '7%',
          dangers: [
            'Drunk or impaired drivers',
            'Medical emergency crashes',
            'Vehicle mechanical failures',
            'Distracted driving incidents',
          ],
        },
        {
          location: 'Roads Without Sidewalks',
          description: 'Rural and suburban streets',
          percentage: '3%',
          dangers: [
            'No designated walking space',
            'Poor visibility conditions',
            'High vehicle speeds',
            'Lack of street lighting',
          ],
        },
      ],
    },
  };

  return (
    <StandardizedPracticeAreaTemplate
      title="Pedestrian Accident Abogados"
      subtitle="Fighting for People Hit by Cars"
      description="Expert pedestrian accident attorneys protecting people injured by negligent drivers. We overcome North Carolina's contributory negligence law and secure maximum compensation for serious pedestrian injuries."
      services={services}
      faqs={faqs}
      overview={{
        content: content.introduction,
      }}
      additionalContent={
        <div className="space-y-12">
          {/* NC Pedestrian Statistics */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              North Carolina Pedestrian Accident Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">200+</div>
                <div className="text-gray-300">Pedestrian deaths annually in NC</div>
                <div className="text-sm text-gray-400 mt-2">15% of all traffic fatalities</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">3,000+</div>
                <div className="text-gray-300">Pedestrian injuries per year</div>
                <div className="text-sm text-gray-400 mt-2">Requiring medical treatment</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">75%</div>
                <div className="text-gray-300">Occur in urban areas</div>
                <div className="text-sm text-gray-400 mt-2">Charlotte, Raleigh metro areas</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">76%</div>
                <div className="text-gray-300">Happen after dark</div>
                <div className="text-sm text-gray-400 mt-2">Poor visibility factor</div>
              </div>
            </div>
          </section>

          {/* Accident Locations */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Common Pedestrian Accident Locations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.accidentLocations.locations.map((location, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                className="text-xl font-bold text-primary">{location.location}</h3>
                    <span className="text-2xl font-bold text-secondary">{location.percentage}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{location.description}</p>
                  <h4 className="font-semibold text-white mb-2">Common Dangers:</h4>
                  <ul className="space-y-1">
                    {location.dangers.map((danger, dIndex) => (
                      <li key={dIndex}

                className="text-sm text-gray-400 flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {danger}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
                    <li>• Claiming pedestrian was jaywalking</li>
                    <li>• Arguing pedestrian wasn't paying attention</li>
                    <li>• Alleging dark clothing reduced visibility</li>
                    <li>• Suggesting pedestrian was intoxicated</li>
                    <li>• Blaming pedestrian for being on phone</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-4">✅ Our Defense Strategies:</h4>
                  <ul className="space-y-2 text-green-200">
                    <li>• Proving 100% driver negligence</li>
                    <li>• Expert accident reconstruction</li>
                    <li>• Traffic violation evidence</li>
                    <li>• Distracted driving proof</li>
                    <li>• Speeding and reckless driving evidence</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Common Injuries */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Common Pedestrian Accident Injuries
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🧠 Head & Brain Injuries</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Traumatic brain injuries (TBI)</li>
                  <li>• Skull fractures and concussions</li>
                  <li>• Facial fractures and lacerations</li>
                  <li>• Eye injuries and vision loss</li>
                  <li>• Dental and jaw injuries</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🦴 Bone & Spinal Injuries</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Spinal cord injuries and paralysis</li>
                  <li>• Hip and pelvis fractures</li>
                  <li>• Leg and ankle fractures</li>
                  <li>• Arm and shoulder injuries</li>
                  <li>• Rib fractures and chest trauma</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">💔 Other Serious Injuries</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Internal organ damage</li>
                  <li>• Severe lacerations and road rash</li>
                  <li>• Amputation and limb loss</li>
                  <li>• PTSD and emotional trauma</li>
                  <li>• Wrongful death cases</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Safety Tips */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Pedestrian Safety in North Carolina
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">
                  ✅ Best Practices for Pedestrians
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Always use crosswalks when available</li>
                  <li>• Look both ways before crossing</li>
                  <li>• Make eye contact with drivers</li>
                  <li>• Wear bright or reflective clothing at night</li>
                  <li>• Stay off phones while crossing streets</li>
                  <li>• Walk facing traffic when no sidewalk exists</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">⚠️ Common Driver Violations</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Failure to yield to pedestrians in crosswalks</li>
                  <li>• Running red lights and stop signs</li>
                  <li>• Distracted driving (phones, texting)</li>
                  <li>• Speeding in school and residential zones</li>
                  <li>• Drunk or impaired driving</li>
                  <li>• Not stopping for school buses</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
