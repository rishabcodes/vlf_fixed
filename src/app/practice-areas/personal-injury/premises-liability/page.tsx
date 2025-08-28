import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premises Liability Attorney NC & FL | Property Injury Lawyer | Vasquez Law',
  description: "Injured on someone's property? Slip/fall, negligent security, dangerous conditions. Property owners held accountable.",
  keywords: 'premises liability lawyer, slip and fall attorney, property injury, negligent security',
};

export default function PremisesLiabilityPage() {
  const services = [
    {
      title: 'Retail & Commercial',
      description: 'Store and business property injuries',
      icon: '🏪',
      features: [
        'Grocery store accidents',
        'Department store falls',
        'Restaurant injuries',
        'Mall incidents',
        'Gas station hazards',
        'Office building accidents',
      ],
    },
    {
      title: 'Residential Properties',
      description: 'Apartment and rental injuries',
      icon: '🏠',
      features: [
        'Apartment complex falls',
        'Broken stairs/railings',
        'Pool accidents',
        'Balcony collapses',
        'Inadequate lighting',
        'Criminal attacks',
      ],
    },
    {
      title: 'Slip and Fall',
      description: 'Classic premises liability claims',
      icon: '⚠️',
      features: [
        'Wet floors',
        'Uneven surfaces',
        'Ice and snow',
        'Loose carpeting',
        'Missing handrails',
        'Poor lighting',
      ],
    },
    {
      title: 'Negligent Security',
      description: 'Criminal attack liability',
      icon: '🔒',
      features: [
        'Parking lot assaults',
        'Hotel room attacks',
        'ATM robberies',
        'Apartment crimes',
        'Bar/club violence',
        'Inadequate security',
      ],
    },
    {
      title: 'Construction Sites',
      description: 'Public hazard injuries',
      icon: '🚧',
      features: [
        'Sidewalk construction',
        'Open excavations',
        'Falling debris',
        'Equipment hazards',
        'Missing barriers',
        'Inadequate warnings',
      ],
    },
    {
      title: 'Government Property',
      description: 'Public building and park injuries',
      icon: '🏛️',
      features: [
        'Courthouse falls',
        'Park injuries',
        'School accidents',
        'Public building hazards',
        'Sidewalk defects',
        'Special notice requirements',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What must I prove in a premises liability case?',
      answer: 'You must show: (1) the property owner owed you a duty of care, (2) they breached that duty by allowing dangerous conditions, (3) they knew or should have known about the danger, and (4) the condition caused your injuries. We gather evidence to prove each element.',
    },
    {
      question: 'What if there was a "Wet Floor" sign?',
      answer: 'Warning signs don\'t automatically absolve liability. Signs must be adequate, visible, and properly placed. If the hazard could have been eliminated or better protected, owners remain liable. We examine whether warnings were sufficient for the specific danger.',
    },
    {
      question: 'How long do property owners have to fix hazards?',
      answer: 'Depends on the danger and discovery. Spilled liquid requires immediate action. Structural defects may allow "reasonable time" for repairs. We investigate when the owner knew or should have known, maintenance logs, and prior incidents to establish negligence.',
    },
    {
      question: 'What is my status - invitee, licensee, or trespasser?',
      answer: 'Your legal status determines the duty owed. Invitees (customers, guests) receive highest protection. Licensees (social guests) get warning of known dangers. Even trespassers are protected from intentional harm. We establish your status for maximum recovery.',
    },
    {
      question: 'Can I sue for criminal attacks on property?',
      answer: 'Yes, if the property owner failed to provide adequate security. We examine crime history, security measures, lighting, access control, and industry standards. Owners who ignore foreseeable criminal risks are liable for resulting attacks.',
    },
    {
      question: 'What damages can I recover?',
      answer: 'Medical expenses, lost wages, pain and suffering, permanent injury, scarring, disability, and sometimes punitive damages for gross negligence. Severe injuries often result in six or seven-figure settlements. We pursue every available damage.',
    },
  ];

  const content = {
    introduction: `Property owners have a legal duty to maintain safe premises for visitors. When they fail - through negligence, poor maintenance, or inadequate security - innocent people suffer serious injuries. From slip and falls in stores to criminal attacks in parking lots, we hold property owners accountable for the dangers they create or ignore.`,

    processTitle: 'Premises Liability Case Process',
    process: [
      {
        step: '1',
        title: 'Scene Documentation',
        description: 'Photograph hazards and preserve evidence',
      },
      {
        step: '2',
        title: 'Liability Investigation',
        description: 'Determine ownership and responsibility',
      },
      {
        step: '3',
        title: 'Notice Proof',
        description: 'Establish owner knowledge of danger',
      },
      {
        step: '4',
        title: 'Expert Analysis',
        description: 'Safety standards and code violations',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Negotiate or litigate for full damages',
      },
    ],

    urgencyTitle: '📸 Document Everything Now',
    urgencyMessage: 'Property owners fix hazards fast to avoid liability. Take photos immediately. Get witness information. Report to management. Evidence disappears quickly.',

    whyChooseTitle: 'Why Choose Vasquez Law for Premises Liability',
    whyChoosePoints: [
      'Immediate evidence preservation',
      'Property code violation expertise',
      'Security expert network',
      'Insurance company tactics knowledge',
      'Maximum compensation recovery',
      'No win, no fee guarantee',
      'Aggressive litigation when needed',
      'Offices in Smithfield, Raleigh, Charlotte, Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Property Hazards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Floor Hazards</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Spilled liquids</li>
              <li>• Torn carpeting</li>
              <li>• Uneven surfaces</li>
              <li>• Missing tiles</li>
              <li>• Slippery floors</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">Structural Defects</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Broken stairs</li>
              <li>• Missing handrails</li>
              <li>• Defective elevators</li>
              <li>• Ceiling collapses</li>
              <li>• Balcony failures</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Environmental</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Poor lighting</li>
              <li>• Ice accumulation</li>
              <li>• Falling objects</li>
              <li>• Toxic exposure</li>
              <li>• Animal attacks</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Property Owner Duties by State</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">North Carolina</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>✓ Reasonable care for lawful visitors</li>
                <li>✓ Inspect for hidden dangers</li>
                <li>✓ Warn of non-obvious hazards</li>
                <li>✓ Contributory negligence defense available</li>
                <li>✓ 3-year statute of limitations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Florida</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>✓ Duty to maintain safe premises</li>
                <li>✓ Regular inspection requirements</li>
                <li>✓ Actual or constructive notice needed</li>
                <li>✓ Comparative negligence applies</li>
                <li>✓ 4-year statute of limitations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Immediate Steps After Property Injury</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">1.</span>
              <div>
                <h3 className="font-bold text-white">Get Medical Attention</h3>
                <p className="text-gray-300 text-sm">Document injuries immediately</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">2.</span>
              <div>
                <h3 className="font-bold text-white">Report to Management</h3>
                <p className="text-gray-300 text-sm">Create official record of incident</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">3.</span>
              <div>
                <h3 className="font-bold text-white">Photograph Everything</h3>
                <p className="text-gray-300 text-sm">Hazard, injuries, surrounding area</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">4.</span>
              <div>
                <h3 className="font-bold text-white">Get Witness Information</h3>
                <p className="text-gray-300 text-sm">Names and contact details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">5.</span>
              <div>
                <h3 className="font-bold text-white">Contact Attorney</h3>
                <p className="text-gray-300 text-sm">Before giving statements to insurance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Premises Liability Claims"
      subtitle="Holding Property Owners Accountable"
      description="Injured on unsafe property? We fight for victims of slip and falls, negligent security, and dangerous conditions."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
