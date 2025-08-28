import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Construction Site Injury Lawyers NC & FL | Workers Comp | Vasquez Law Firm',
  description:
    'Expert construction accident attorneys in Raleigh, Charlotte, Smithfield & Orlando. Falls, equipment injuries, OSHA violations. Get maximum workers comp benefits.',
  keywords: [
    'construction accident lawyer',
    'construction site injury',
    'workers compensation',
    'scaffold falls',
    'equipment accidents',
    'OSHA violations',
  ],
};

export default function ConstructionSiteInjuriesPage() {
  const services = [
    {
      title: 'Falls from Heights',
      description: 'Scaffold, ladder, roof, and elevated surface fall injuries',
      icon: '🏗️',
      features: [
        'Scaffold collapse accidents',
        'Ladder fall injuries',
        'Roof and elevated work falls',
        'Unprotected edge accidents',
        'Floor opening falls',
        'Structural collapse injuries',
      ],
    },
    {
      title: 'Equipment & Machinery Accidents',
      description: 'Heavy equipment, power tools, and machinery injuries',
      icon: '⚙️',
      features: [
        'Crane and hoist accidents',
        'Forklift injuries',
        'Power tool accidents',
        'Excavator/backhoe injuries',
        'Defective equipment claims',
        'Inadequate training accidents',
      ],
    },
    {
      title: 'Struck-By & Caught-Between',
      description: 'Objects, vehicles, and equipment impact injuries',
      icon: '⚠️',
      features: [
        'Falling object injuries',
        'Vehicle strike accidents',
        'Caught in machinery',
        'Trench collapse injuries',
        'Wall/structure collapse',
        'Material handling accidents',
      ],
    },
    {
      title: 'Electrocution & Burns',
      description: 'Electrical hazards and burn injuries on construction sites',
      icon: '⚡',
      features: [
        'Power line contact',
        'Faulty wiring injuries',
        'Arc flash burns',
        'Chemical burns',
        'Welding accidents',
        'Fire and explosion injuries',
      ],
    },
    {
      title: 'OSHA Violation Claims',
      description: 'Safety standard violations leading to worker injuries',
      icon: '📋',
      features: [
        'Fall protection violations',
        'Hazard communication failures',
        'Scaffolding standard violations',
        'Respiratory protection issues',
        'Lockout/tagout violations',
        'Training requirement failures',
      ],
    },
    {
      title: 'Third-Party Liability',
      description: 'Claims beyond workers comp for construction accidents',
      icon: '⚖️',
      features: [
        'General contractor liability',
        'Subcontractor negligence',
        'Property owner responsibility',
        'Equipment manufacturer defects',
        'Architect/engineer errors',
        'Multiple defendant claims',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the "Fatal Four" construction site hazards?',
      answer: 'OSHA identifies the Fatal Four as: Falls (36.4% of construction deaths), Struck by Object (10.4%), Electrocution (8.6%), and Caught-in/Between (2.1%). These account for nearly 60% of construction worker deaths. Our attorneys have extensive experience with all Fatal Four injury types.',
    },
    {
      question: 'Can I sue beyond workers compensation for a construction injury?',
      answer: 'Yes, you may have third-party claims against general contractors, subcontractors, property owners, or equipment manufacturers. These claims can provide compensation beyond workers comp limits, including pain and suffering damages not available through workers comp alone.',
    },
    {
      question: 'What if my employer doesn\'t have workers compensation insurance?',
      answer: 'In North Carolina and Florida, construction employers must carry workers comp. If they don\'t, you can sue them directly for damages, potentially recovering more than workers comp would provide. You may also file with the state\'s uninsured employer fund.',
    },
    {
      question: 'How long do I have to report a construction site injury?',
      answer: 'In North Carolina, report within 30 days (2 years to file claim). In Florida, report within 30 days (2 years to file). Immediate reporting is best to preserve evidence and witness testimony. Late reporting can jeopardize your benefits.',
    },
    {
      question: 'What benefits can I receive for a construction injury?',
      answer: 'Workers comp covers: medical treatment, temporary disability (66.67% of average weekly wage), permanent disability ratings, vocational rehabilitation, and death benefits for families. Third-party claims can add pain/suffering and full wage loss recovery.',
    },
    {
      question: 'What if OSHA finds safety violations caused my injury?',
      answer: 'OSHA violations strengthen your case and may enable additional claims. While workers comp is no-fault, OSHA violations can support third-party negligence claims and may increase settlement values. We work with OSHA findings to maximize your recovery.',
    },
  ];

  const content = {
    introduction: `Construction sites are among the most dangerous workplaces in America. When safety protocols fail and workers get injured, the consequences can be devastating. Our construction accident attorneys fight for injured workers across North Carolina and Florida, securing maximum workers compensation benefits and pursuing third-party claims when negligence causes injuries. We understand construction site hazards, OSHA regulations, and how to prove liability in complex multi-party construction accidents.`,

    processTitle: 'Construction Injury Claim Process',
    process: [
      {
        step: '1',
        title: 'Immediate Medical Care',
        description: 'Get treatment and document all injuries thoroughly',
      },
      {
        step: '2',
        title: 'Report & Document',
        description: 'Report to employer, photograph scene, gather witness info',
      },
      {
        step: '3',
        title: 'OSHA Investigation',
        description: 'Cooperate with OSHA and preserve violation evidence',
      },
      {
        step: '4',
        title: 'File Claims',
        description: 'Submit workers comp and identify third-party claims',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Pursue all available compensation sources',
      },
    ],

    urgencyTitle: '⚠️ Act Fast - Evidence Disappears',
    urgencyMessage: 'Construction sites change daily. Equipment gets moved, witnesses leave for new jobs, and companies destroy records. Contact us immediately to preserve crucial evidence.',

    whyChooseTitle: 'Why Choose Vasquez Law for Construction Injuries',
    whyChoosePoints: [
      'Deep understanding of OSHA regulations and violations',
      'Relationships with construction safety experts',
      'Experience with multi-party construction litigation',
      'Bilingual team serving Hispanic construction workers',
      'Aggressive pursuit of third-party liability claims',
      'Maximum recovery beyond workers comp limits',
      'No fees unless we win your case',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      {/* Construction Injury Statistics */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Construction Industry Dangers (2025)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-red-400 mb-2">1 in 10</div>
            <div className="text-lg text-white mb-2">Construction Workers</div>
            <p className="text-gray-400 text-sm">Are injured on the job each year</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-yellow-400 mb-2">20%</div>
            <div className="text-lg text-white mb-2">Of All Work Deaths</div>
            <p className="text-gray-400 text-sm">Occur in construction despite being 4% of workforce</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-green-400 mb-2">$1.36B</div>
            <div className="text-lg text-white mb-2">Annual Cost</div>
            <p className="text-gray-400 text-sm">Fatal and nonfatal construction injuries in U.S.</p>
          </div>
        </div>
      </section>

      {/* Common OSHA Violations */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Top OSHA Violations We See</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Safety Violations</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Fall protection missing or inadequate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Scaffolding improperly erected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Ladder safety violations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Trenching/excavation hazards</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Training & Equipment</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Inadequate hazard communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Missing personal protective equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Improper equipment training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Electrical hazard violations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Options */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Your Recovery Options</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Workers Compensation</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Medical treatment coverage</li>
              <li>• Temporary disability benefits</li>
              <li>• Permanent disability ratings</li>
              <li>• Vocational rehabilitation</li>
              <li>• No need to prove fault</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Third-Party Claims</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Pain and suffering damages</li>
              <li>• Full wage loss recovery</li>
              <li>• Punitive damages possible</li>
              <li>• Claims against contractors/manufacturers</li>
              <li>• No workers comp limits</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Construction Site Injuries"
      subtitle="Fighting for Injured Construction Workers"
      description="Construction accidents can be catastrophic. Our experienced attorneys secure maximum workers compensation benefits and pursue third-party claims to get you full compensation for your injuries."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
