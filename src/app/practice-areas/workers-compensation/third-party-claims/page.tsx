import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Third Party Work Injury Claims Attorney | Beyond Workers Comp | Vasquez Law',
  description: 'Injured by third party at work? Get full compensation beyond workers comp limits. Product liability, premises liability, vehicle accidents.',
  keywords: 'third party liability, work injury lawsuit, product liability, beyond workers comp',
};

export default function ThirdPartyInjuryClaimsPage() {
  const services = [
    {
      title: 'Product Liability',
      description: 'Defective equipment and machinery claims',
      icon: '⚙️',
      features: [
        'Defective machinery design',
        'Manufacturing defects',
        'Missing safety guards',
        'Inadequate warnings',
        'Tool and equipment failures',
        'Vehicle defects',
      ],
    },
    {
      title: 'Premises Liability',
      description: 'Injuries on property not controlled by employer',
      icon: '🏢',
      features: [
        'Customer site accidents',
        'Delivery location hazards',
        'Property owner negligence',
        'Inadequate security',
        'Slip and fall hazards',
        'Building code violations',
      ],
    },
    {
      title: 'Vehicle Accidents',
      description: 'Work-related crashes with third-party drivers',
      icon: '🚗',
      features: [
        'Delivery driver accidents',
        'Commercial vehicle crashes',
        'Commute exceptions',
        'Company vehicle collisions',
        'Drunk driver claims',
        'Hit and run accidents',
      ],
    },
    {
      title: 'Contractor Liability',
      description: 'Multi-employer worksite accidents',
      icon: '🔨',
      features: [
        'General contractor negligence',
        'Subcontractor errors',
        'Site safety violations',
        'Coordination failures',
        'Equipment sharing accidents',
        'OSHA violations',
      ],
    },
    {
      title: 'Toxic Exposure',
      description: 'Chemical and hazardous material claims',
      icon: '☢️',
      features: [
        'Chemical manufacturer liability',
        'Asbestos exposure',
        'Toxic substance leaks',
        'Inadequate warnings',
        'MSDS violations',
        'Environmental hazards',
      ],
    },
    {
      title: 'Assault & Violence',
      description: 'Third-party criminal acts at work',
      icon: '🚫',
      features: [
        'Customer violence',
        'Inadequate security',
        'Negligent hiring',
        'Premises liability',
        'Assault by contractors',
        'Criminal acts coverage',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is a third-party work injury claim?',
      answer: 'When someone other than your employer or coworker causes your workplace injury, you may have a third-party claim. This is separate from workers comp and allows recovery of full damages including pain and suffering, full lost wages, and punitive damages.',
    },
    {
      question: 'Can I file both workers comp and a third-party lawsuit?',
      answer: 'Yes! You can receive workers comp benefits immediately while pursuing a third-party lawsuit. Workers comp provides quick medical and wage benefits, while the lawsuit seeks full compensation. The workers comp carrier may claim reimbursement from any settlement.',
    },
    {
      question: 'What damages can I recover in a third-party claim?',
      answer: 'Unlike workers comp, third-party claims allow full damages: 100% of lost wages (not just 2/3), pain and suffering, emotional distress, loss of enjoyment of life, punitive damages, and spouse\'s loss of consortium claims.',
    },
    {
      question: 'Who can be sued in a third-party work injury case?',
      answer: 'Product manufacturers, property owners, general contractors, subcontractors, drivers who hit you, equipment manufacturers, maintenance companies, security companies, and any other party whose negligence caused your injury (except your employer/coworkers).',
    },
    {
      question: 'How long do I have to file a third-party claim?',
      answer: 'Personal injury lawsuits typically have a 3-year statute of limitations in North Carolina and 4 years in Florida. Product liability may be different. Don\'t wait - evidence disappears and witnesses forget. Contact us immediately.',
    },
    {
      question: 'How does workers comp liens work with third-party settlements?',
      answer: 'Workers comp insurers have subrogation rights to recover what they paid from your third-party settlement. However, we negotiate reductions, ensure credit for attorney fees, and maximize what you keep. Never settle without addressing the lien.',
    },
  ];

  const content = {
    introduction: `Workers compensation limits your recovery to medical bills and partial wages. But when a third party causes your workplace injury, you can pursue full compensation through a separate lawsuit. Our attorneys identify all liable parties, coordinate with your workers comp claim, and fight for maximum recovery including pain and suffering damages not available through workers comp alone.`,

    processTitle: 'Third-Party Claim Process',
    process: [
      {
        step: '1',
        title: 'Liability Investigation',
        description: 'Identify all potentially liable third parties',
      },
      {
        step: '2',
        title: 'Evidence Preservation',
        description: 'Secure products, photos, witness statements',
      },
      {
        step: '3',
        title: 'Coordinate Benefits',
        description: 'Manage workers comp while pursuing lawsuit',
      },
      {
        step: '4',
        title: 'Build Case',
        description: 'Expert witnesses, discovery, depositions',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Negotiate settlement or trial verdict',
      },
    ],

    urgencyTitle: '🚨 Evidence Disappears Fast',
    urgencyMessage: 'Products get repaired, accident scenes change, surveillance gets deleted. The sooner we investigate, the stronger your third-party claim. Call immediately.',

    whyChooseTitle: 'Why Choose Vasquez Law for Third-Party Claims',
    whyChoosePoints: [
      'Identifying all sources of recovery beyond workers comp',
      'Product liability and engineering experts',
      'Coordinating workers comp and third-party claims',
      'Maximizing recovery while minimizing liens',
      'Trial experience for complex liability cases',
      'No fees unless we win your case',
      'Resources to fight large corporations',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Workers Comp vs. Third-Party Claims</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Benefit Type</th>
                <th className="py-3 px-4 text-yellow-400">Workers Comp Only</th>
                <th className="py-3 px-4 text-green-400">Third-Party Claim</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Medical Bills</td>
                <td className="py-3 px-4">✅ Covered</td>
                <td className="py-3 px-4">✅ Full coverage</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Lost Wages</td>
                <td className="py-3 px-4">⚠️ 66.67% only</td>
                <td className="py-3 px-4">✅ 100% recovery</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Pain & Suffering</td>
                <td className="py-3 px-4">❌ Not covered</td>
                <td className="py-3 px-4">✅ Full recovery</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Punitive Damages</td>
                <td className="py-3 px-4">❌ Not available</td>
                <td className="py-3 px-4">✅ Possible</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Spouse Claims</td>
                <td className="py-3 px-4">❌ No consortium</td>
                <td className="py-3 px-4">✅ Loss of consortium</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Fault Required</td>
                <td className="py-3 px-4">✅ No fault</td>
                <td className="py-3 px-4">⚠️ Must prove negligence</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Third-Party Scenarios</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Construction Sites</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• General contractor safety violations</li>
              <li>• Subcontractor negligence</li>
              <li>• Crane/equipment owner liability</li>
              <li>• Architect/engineer errors</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Delivery/Service</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Dog attacks during deliveries</li>
              <li>• Customer property hazards</li>
              <li>• Third-party driver accidents</li>
              <li>• Assault by customers</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Third-Party Work Injury Claims"
      subtitle="Full Compensation Beyond Workers Comp"
      description="When third parties cause workplace injuries, you deserve more than workers comp provides. We pursue full damages including pain and suffering while coordinating your benefits."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
