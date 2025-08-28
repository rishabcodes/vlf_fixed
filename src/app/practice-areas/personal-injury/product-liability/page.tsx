import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Liability Attorney NC & FL | Defective Product Lawyer | Vasquez Law',
  description: 'Injured by defective products? Design defects, manufacturing flaws, inadequate warnings. Maximum compensation. NC and FL.',
  keywords: 'product liability lawyer, defective product attorney, dangerous products, recall attorney',
};

export default function ProductLiabilityPage() {
  const services = [
    {
      title: 'Design Defects',
      description: 'Inherently dangerous product designs',
      icon: '⚠️',
      features: [
        'Vehicle design flaws',
        'Medical device defects',
        'Children\'s product dangers',
        'Appliance design failures',
        'Tool and equipment flaws',
        'Electronic device hazards',
      ],
    },
    {
      title: 'Manufacturing Defects',
      description: 'Production errors causing danger',
      icon: '🏭',
      features: [
        'Assembly line errors',
        'Quality control failures',
        'Contaminated products',
        'Component failures',
        'Material defects',
        'Batch production errors',
      ],
    },
    {
      title: 'Warning Failures',
      description: 'Inadequate instructions or warnings',
      icon: '📋',
      features: [
        'Missing safety warnings',
        'Inadequate instructions',
        'Hidden dangers',
        'Failure to warn of risks',
        'Misleading labeling',
        'Language barriers',
      ],
    },
    {
      title: 'Pharmaceutical/Medical',
      description: 'Drug and medical device injuries',
      icon: '💊',
      features: [
        'Dangerous drug side effects',
        'Medical implant failures',
        'Surgical device defects',
        'Contaminated medications',
        'Off-label promotion',
        'Clinical trial failures',
      ],
    },
    {
      title: 'Vehicle Defects',
      description: 'Automotive product failures',
      icon: '🚗',
      features: [
        'Airbag failures',
        'Brake system defects',
        'Tire blowouts',
        'Seatbelt failures',
        'Fuel system fires',
        'Rollover propensity',
      ],
    },
    {
      title: 'Consumer Products',
      description: 'Everyday product dangers',
      icon: '🏠',
      features: [
        'Appliance fires',
        'Furniture tip-overs',
        'Toy choking hazards',
        'Power tool injuries',
        'Exercise equipment',
        'Household chemicals',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What must I prove in a product liability case?',
      answer: 'You must show: (1) the product was defective, (2) the defect existed when it left manufacturer\'s control, (3) you used it as intended or reasonably foreseeable, and (4) the defect caused your injuries. We handle the complex proof required.',
    },
    {
      question: 'Who can be held liable for defective products?',
      answer: 'Any party in the distribution chain: manufacturers, component makers, assemblers, wholesalers, and retailers. We pursue all liable parties to maximize your recovery. Strict liability often applies - no need to prove negligence.',
    },
    {
      question: 'What if I threw away the defective product?',
      answer: 'Don\'t worry. We can often prove defects through other evidence: similar incidents, recalls, expert analysis, your injuries, photos, and witness testimony. However, always preserve the product if possible.',
    },
    {
      question: 'How long do I have to file a product liability claim?',
      answer: 'Generally 3 years from injury in North Carolina, 4 years in Florida. But there\'s also a "statute of repose" - NC has 12 years from initial purchase, FL has 12 years from delivery. Some exceptions apply. Act quickly.',
    },
    {
      question: 'What if I modified the product or misused it?',
      answer: 'Reasonable modifications or foreseeable misuse may not bar recovery. Products must be safe for reasonably anticipated uses. Comparative fault may reduce but not eliminate compensation. We analyze all defenses.',
    },
    {
      question: 'What damages can I recover in product liability?',
      answer: 'Medical expenses, lost wages, pain and suffering, disability, disfigurement, emotional distress, and sometimes punitive damages for egregious conduct. Wrongful death cases include family losses. We pursue maximum compensation.',
    },
  ];

  const content = {
    introduction: `Defective products injure thousands daily - from exploding batteries to contaminated food, faulty medical devices to dangerous vehicles. Manufacturers prioritize profits over safety, releasing products they know are dangerous. Our product liability attorneys hold corporations accountable, securing compensation for victims while forcing safety improvements that protect others.`,

    processTitle: 'Product Liability Case Process',
    process: [
      {
        step: '1',
        title: 'Product Preservation',
        description: 'Secure defective product and evidence',
      },
      {
        step: '2',
        title: 'Expert Analysis',
        description: 'Engineering and safety expert evaluation',
      },
      {
        step: '3',
        title: 'Discovery',
        description: 'Uncover corporate knowledge of dangers',
      },
      {
        step: '4',
        title: 'Multi-District Litigation',
        description: 'Join forces with other victims if applicable',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Settlement or trial for full compensation',
      },
    ],

    urgencyTitle: '⚠️ Preserve the Product!',
    urgencyMessage: 'The defective product is crucial evidence. Don\'t throw it away or let anyone take it. Store it safely and contact us immediately.',

    whyChooseTitle: 'Why Choose Vasquez Law for Product Liability',
    whyChoosePoints: [
      'Engineering and safety expert network',
      'Resources to fight major corporations',
      'Multi-district litigation experience',
      'Understanding of complex regulations',
      'Proven trial experience',
      'Maximum compensation focus',
      'No fees unless we win',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Product Defects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">Design Defects</h3>
            <p className="text-gray-300 text-sm mb-3">Entire product line is dangerous</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• SUV rollover tendency</li>
              <li>• Hip implant metal toxicity</li>
              <li>• Drug formulation errors</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Manufacturing</h3>
            <p className="text-gray-300 text-sm mb-3">Specific units are defective</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Contaminated medicine batch</li>
              <li>• Faulty airbag lot</li>
              <li>• Weak bicycle frame</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Marketing</h3>
            <p className="text-gray-300 text-sm mb-3">Inadequate warnings/instructions</p>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Drug interaction warnings</li>
              <li>• Assembly instructions</li>
              <li>• Age appropriateness</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Current Major Recalls (2025)</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <p className="text-gray-300 mb-6">If you\'ve been injured by these or other recalled products, contact us immediately:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Vehicle Recalls</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Airbag inflator ruptures</li>
                <li>• Electric vehicle battery fires</li>
                <li>• Brake system failures</li>
                <li>• Steering component defects</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Consumer Products</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Pressure cooker explosions</li>
                <li>• Exercise equipment injuries</li>
                <li>• Children\'s product hazards</li>
                <li>• Appliance fire risks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Product Liability Claims"
      subtitle="Holding Manufacturers Accountable"
      description="Injured by a defective product? We fight corporations that put profits over safety, securing maximum compensation for victims."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
