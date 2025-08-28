import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
export const metadata: Metadata = {
  title: "Workplace Accident Lawyers NC & FL | Workers' Compensation Attorneys | Vasquez Law Firm",
  description:
    "Expert workplace accident attorneys fighting for injured workers' rights. We handle all types of on-the-job injuries, from construction accidents to office injuries. Maximum compensation for medical bills, lost wages, and permanent disability. Free consultation. Call 1-844-YO-PELEO",
  keywords:
    'workplace accident lawyer, work injury attorney, on-the-job accident lawyer, workplace injury compensation, workers comp attorney, occupational accident lawyer, job injury lawyer',
  openGraph: {
    title: 'Workplace Accident Lawyers | Work Injury Legal Experts - Vasquez Law Firm',
    description:
      "Experienced workplace accident attorneys securing maximum workers' compensation benefits for injured employees.",
    images: [{ url: '/images/workplace-accident-lawyers.jpg' }],
  },
};

export default function WorkplaceAccidentsPage() {
  const services = [
    {
      title: 'Construction Site Accidents',
      description:
        'Comprehensive representation for construction workers injured in falls, equipment accidents, and site hazards',
      icon: '🏗️',
      features: [
        'Falls from heights and scaffolding',
        'Crane and heavy equipment accidents',
        'Electrocution and electrical injuries',
        'Trench collapses and excavation accidents',
        'Struck-by object injuries',
        'Caught-in/between equipment accidents',
      ],
    },
    {
      title: 'Manufacturing & Industrial Injuries',
      description:
        'Legal assistance for factory workers injured by machinery, chemicals, and workplace hazards',
      icon: '🏭',
      features: [
        'Machine guarding failures',
        'Conveyor belt and press injuries',
        'Chemical exposure and burns',
        'Forklift and vehicle accidents',
        'Repetitive motion injuries',
        'Heat stress and exhaustion',
      ],
    },
    {
      title: 'Transportation & Delivery Accidents',
      description:
        'Representation for drivers and delivery workers injured in vehicle accidents and loading incidents',
      icon: '🚚',
      features: [
        'Commercial vehicle crashes',
        'Loading dock injuries',
        'Slip and fall during deliveries',
        'Dog bites and animal attacks',
        'Back injuries from lifting',
        'Third-party liability claims',
      ],
    },
    {
      title: 'Healthcare Worker Injuries',
      description:
        'Specialized representation for nurses, aides, and medical staff injured while caring for patients',
      icon: '🏥',
      features: [
        'Patient handling injuries',
        'Needlestick and sharps injuries',
        'Workplace violence incidents',
        'Slip and falls in hospitals',
        'Back injuries from lifting patients',
        'Infectious disease exposure',
      ],
    },
    {
      title: 'Office & Retail Worker Injuries',
      description:
        'Legal help for office employees and retail workers injured in workplace accidents',
      icon: '🏢',
      features: [
        'Slip and fall accidents',
        'Ergonomic and repetitive strain injuries',
        'Falling objects from shelves',
        'Workplace violence and robbery',
        'Lifting and stocking injuries',
        'Customer-related incidents',
      ],
    },
    {
      title: 'Agricultural & Farm Accidents',
      description:
        'Representation for farm workers injured by equipment, animals, and agricultural hazards',
      icon: '🌾',
      features: [
        'Tractor and machinery accidents',
        'Grain bin and silo injuries',
        'Animal-related injuries',
        'Pesticide and chemical exposure',
        'Heat-related illnesses',
        'Migrant worker protections',
      ],
    },
    {
      title: 'Restaurant & Hospitality Injuries',
      description: 'Legal assistance for food service and hospitality workers injured on the job',
      icon: '🍽️',
      features: [
        'Burns from cooking equipment',
        'Slip and falls on wet floors',
        'Cuts from knives and equipment',
        'Back injuries from lifting',
        'Repetitive motion injuries',
        'Chemical burns from cleaning',
      ],
    },
    {
      title: 'Warehouse & Distribution Center Injuries',
      description:
        'Expert representation for warehouse workers injured in high-risk distribution environments',
      icon: '📦',
      features: [
        'Forklift and pallet jack accidents',
        'Falls from ladders and platforms',
        'Struck by falling merchandise',
        'Conveyor system injuries',
        'Loading dock accidents',
        'Repetitive strain injuries',
      ],
    },
    {
      title: 'Emergency Response & Public Safety',
      description:
        'Specialized representation for first responders and public safety workers injured on duty',
      icon: '🚨',
      features: [
        'Firefighter burn injuries',
        'Police officer assault injuries',
        'EMS lifting and transport injuries',
        'Vehicle accident injuries',
        'Exposure to hazardous materials',
        'Presumptive coverage claims',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What should I do immediately after a workplace accident?',
      answer:
        'Report the injury to your supervisor immediately, seek medical attention (even for minor injuries), document everything with photos and written notes, get witness information, and contact an attorney before giving recorded statements. North Carolina requires reporting within 30 days, but do it immediately.',
    },
    {
      question: 'Can I see my own doctor for a workplace injury?',
      answer:
        'In North Carolina, your employer can direct your initial medical treatment. However, you may be able to change doctors after the initial visit. We help ensure you receive proper medical care from doctors who understand workplace injuries, not just company doctors.',
    },
    {
      question: 'What if my employer says the accident was my fault?',
      answer:
        "Workers' compensation is a no-fault system - you're entitled to benefits even if you made a mistake. The only exceptions are injuries from intoxication, intentional self-harm, or willful safety violations. We fight employer attempts to deny legitimate claims.",
    },
    {
      question: "Can I be fired for filing a workers' compensation claim?",
      answer:
        "It's illegal for employers to retaliate against you for filing a workers' comp claim. If you're fired, demoted, or harassed after filing, you may have additional legal claims. We protect your job rights while pursuing your injury benefits.",
    },
    {
      question: 'What benefits am I entitled to after a workplace accident?',
      answer:
        "You're entitled to medical treatment, temporary disability payments (2/3 of average weekly wage), permanent disability compensation, vocational rehabilitation, and death benefits for families. We ensure you receive all benefits available under the law.",
    },
    {
      question: "Should I accept the insurance company's settlement offer?",
      answer:
        'Never accept a settlement without legal review. Initial offers are often far below fair value and may waive future medical rights. We evaluate offers, negotiate maximum settlements, and ensure your future medical needs are protected.',
    },
  ];

  const content = {
    introduction: `Workplace accidents can happen in any industry, leaving workers with serious injuries, mounting medical bills, and uncertainty about their future. Our experienced workplace accident attorneys understand the physical, emotional, and financial challenges you face. We fight aggressively to secure maximum workers' compensation benefits while protecting your job and ensuring you receive the medical care you need to recover.`,

    processTitle: 'Our Workplace Accident Case Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response & Medical Care',
        description: 'Immediate assistance with medical treatment and claim filing',
      },
      {
        step: '2',
        title: 'Investigation & Documentation',
        description: 'Thorough investigation of accident causes and safety violations',
      },
      {
        step: '3',
        title: 'Claim Filing & Management',
        description: 'Proper filing and aggressive pursuit of all available benefits',
      },
      {
        step: '4',
        title: 'Negotiation & Appeals',
        description: 'Fighting denials and negotiating maximum settlements',
      },
      {
        step: '5',
        title: 'Return to Work Planning',
        description: 'Ensuring safe return or securing disability benefits',
      },
    ],

    urgencyTitle: "⚠️ Don't Delay - Evidence Disappears Fast!",
    urgencyMessage:
      'Accident scenes change, witnesses forget details, and surveillance footage gets deleted. North Carolina requires reporting within 30 days, but acting immediately protects your rights and strengthens your claim.',

    successStats: [
      { number: '3,500+', label: 'Workplace Injury Cases' },
      { number: '98%', label: 'Approval Rate' },
      { number: '$25M+', label: 'Benefits Secured' },
      { number: '24/7', label: 'Injury Hotline' },
    ],

    whyChooseTitle: 'Why Choose Our Workplace Accident Team?',
    whyChoosePoints: [
      "98% success rate in workers' compensation claims",
      'Over $25 million secured for injured workers',
      'Former insurance company attorneys on our team',
      'Direct relationships with occupational medicine specialists',
      'Aggressive pursuit of third-party liability claims',
      'Protection against employer retaliation',
      'No fees unless we win your case',
      'Bilingual team serving all communities',
    ],

    injuryTypes: {
      title: 'Common Workplace Injuries We Handle',
      types: [
        {
          type: 'Musculoskeletal Injuries',
          description: 'Most common workplace injuries',
          percentage: '35%',
          examples: [
            'Back injuries from lifting',
            'Rotator cuff and shoulder injuries',
            'Carpal tunnel syndrome',
            'Herniated discs',
            'Knee and joint injuries',
          ],
        },
        {
          type: 'Slip, Trip & Fall Injuries',
          description: 'Second leading cause of workplace injuries',
          percentage: '27%',
          examples: [
            'Wet or slippery surfaces',
            'Uneven flooring or obstacles',
            'Inadequate lighting',
            'Ladder and scaffold falls',
            'Stairway accidents',
          ],
        },
        {
          type: 'Struck By/Caught In Accidents',
          description: 'Often severe or fatal injuries',
          percentage: '22%',
          examples: [
            'Falling objects or tools',
            'Vehicle strikes',
            'Caught in machinery',
            'Crushed between objects',
            'Equipment malfunctions',
          ],
        },
        {
          type: 'Overexertion & Repetitive Motion',
          description: 'Develops over time',
          percentage: '16%',
          examples: [
            'Repetitive strain injuries',
            'Tendonitis',
            'Bursitis',
            'Trigger finger',
            'Chronic back pain',
          ],
        },
      ],
    },
  };

  return (
    <StandardizedPracticeAreaTemplate
      title="Workplace Accident Lawyers"
      subtitle="Maximum Benefits for Injured Workers"
      description="Expert workplace accident attorneys fighting for injured workers' rights. We handle all types of on-the-job injuries, secure maximum benefits, and protect your job while you recover. No fees unless we win."
      services={services}
      faqs={faqs}
      overview={{
        content: content.introduction,
      }}
      additionalContent={
        <div className="space-y-12">
          {/* Injury Statistics */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">{content.injuryTypes.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {content.injuryTypes.types.map((injury, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                className="text-xl font-bold text-primary">{injury.type}</h3>
                    <span className="text-2xl font-bold text-secondary">{injury.percentage}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{injury.description}</p>
                  <h4 className="font-semibold text-white mb-2">Common Examples:</h4>
                  <ul className="space-y-1">
                    {injury.examples.map((example, eIndex) => (
                      <li key={eIndex}

                className="text-sm text-gray-400 flex items-start gap-2">
                        <span
                className="text-primary mt-1">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Workers' Comp Benefits */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Workers' Compensation Benefits Available
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">💊 Medical Benefits</h3>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">
                    All reasonable and necessary medical treatment related to your workplace injury
                    is covered.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Doctor visits and specialist care</li>
                    <li>• Surgery and hospitalization</li>
                    <li>• Prescription medications</li>
                    <li>• Physical therapy and rehabilitation</li>
                    <li>• Medical equipment and prosthetics</li>
                    <li>• Future medical care</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">💰 Wage Replacement</h3>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">
                    Compensation for lost wages while you recover from your workplace injury.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Temporary Total Disability (TTD)</li>
                    <li>• Temporary Partial Disability (TPD)</li>
                    <li>• Permanent Partial Disability (PPD)</li>
                    <li>• Permanent Total Disability (PTD)</li>
                    <li>• Death benefits for families</li>
                    <li>• Vocational rehabilitation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Industry-Specific Risks */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Industry-Specific Workplace Hazards
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🏗️ Construction</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Falls from heights (39% of deaths)</li>
                  <li>• Electrocution hazards</li>
                  <li>• Struck by objects</li>
                  <li>• Caught-in/between</li>
                  <li>• "Fatal Four" accidents</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🏭 Manufacturing</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Machine entanglement</li>
                  <li>• Chemical exposure</li>
                  <li>• Repetitive motion injuries</li>
                  <li>• Forklift accidents</li>
                  <li>• Hearing loss</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">🏥 Healthcare</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Patient handling injuries</li>
                  <li>• Needlestick injuries</li>
                  <li>• Workplace violence</li>
                  <li>• Infectious diseases</li>
                  <li>• Slip and falls</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Claims */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Beyond Workers' Comp: Third-Party Claims
            </h2>
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Additional Compensation Sources
              </h3>
              <p className="text-gray-300 mb-6">
                While workers' compensation provides important benefits, you may have additional
                claims against third parties responsible for your injuries:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3">Third-Party Liability Claims:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Equipment manufacturers (defective machinery)</li>
                    <li>• Property owners (unsafe premises)</li>
                    <li>• Contractors and subcontractors</li>
                    <li>• Vehicle drivers (delivery/transport accidents)</li>
                    <li>• Product manufacturers (toxic exposure)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">Additional Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Pain and suffering damages</li>
                    <li>• Full wage loss (not just 2/3)</li>
                    <li>• Punitive damages</li>
                    <li>• Loss of enjoyment of life</li>
                    <li>• Spouse's loss of consortium</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Red Flags */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              ⚠️ Warning Signs Your Employer May Deny Your Claim
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400 mb-4">Employer Red Flags</h3>
                <ul className="text-red-200 text-sm space-y-2">
                  <li>• Pressuring you not to report</li>
                  <li>• Claiming accident was "off the clock"</li>
                  <li>• Demanding drug test immediately</li>
                  <li>• Blaming you for the accident</li>
                  <li>• No witness report taken</li>
                  <li>• Changing your job duties suddenly</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
                <h3 className="text-xl font-bold text-green-400 mb-4">Protect Yourself</h3>
                <ul className="text-green-200 text-sm space-y-2">
                  <li>• Report immediately in writing</li>
                  <li>• Take photos of everything</li>
                  <li>• Get witness contact info</li>
                  <li>• Keep copies of all documents</li>
                  <li>• Don't sign anything without review</li>
                  <li>• Call us before giving statements</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
