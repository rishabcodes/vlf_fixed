import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipment & Machinery Accident Attorney | Workers Comp | Vasquez Law Firm',
  description: 'Injured by workplace equipment? Forklift, crane, industrial machinery accidents. Get maximum workers comp benefits. Serving NC and FL.',
  keywords: 'equipment accident lawyer, machinery injury, forklift accident, crane accident, industrial equipment',
};

export default function EquipmentAccidentsPage() {
  const services = [
    {
      title: 'Forklift Accidents',
      description: 'Serious injuries from forklift operations and collisions',
      icon: '🚜',
      features: [
        'Operator error accidents',
        'Pedestrian strike injuries',
        'Tip-over accidents',
        'Loading dock falls',
        'Improper training claims',
        'Defective equipment cases',
      ],
    },
    {
      title: 'Industrial Machinery',
      description: 'Factory and manufacturing equipment injuries',
      icon: '⚙️',
      features: [
        'Press and stamping injuries',
        'Conveyor belt accidents',
        'Lathe and mill injuries',
        'Packaging equipment',
        'Assembly line machinery',
        'Robotic equipment injuries',
      ],
    },
    {
      title: 'Power Tool Injuries',
      description: 'Handheld and stationary power tool accidents',
      icon: '🔨',
      features: [
        'Saw injuries (circular, table, chain)',
        'Nail gun accidents',
        'Grinder injuries',
        'Drill accidents',
        'Pneumatic tool injuries',
        'Electrical tool shocks',
      ],
    },
    {
      title: 'Heavy Equipment',
      description: 'Construction and industrial heavy machinery',
      icon: '🏗️',
      features: [
        'Crane accidents',
        'Excavator injuries',
        'Bulldozer accidents',
        'Backhoe injuries',
        'Boom lift falls',
        'Scissor lift accidents',
      ],
    },
    {
      title: 'Agricultural Equipment',
      description: 'Farm machinery and equipment injuries',
      icon: '🚜',
      features: [
        'Tractor accidents',
        'Combine injuries',
        'PTO shaft entanglement',
        'Hay baler accidents',
        'Grain auger injuries',
        'Livestock equipment',
      ],
    },
    {
      title: 'Safety Violations',
      description: 'OSHA and safety standard violations',
      icon: '⚠️',
      features: [
        'Lockout/tagout failures',
        'Missing machine guards',
        'Inadequate training',
        'No safety equipment',
        'Improper maintenance',
        'Defective safety devices',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the most common equipment accident injuries?',
      answer: 'Crush injuries, amputations, lacerations, fractures, head trauma, and spinal injuries are most common. Equipment accidents often cause catastrophic injuries requiring extensive medical treatment, multiple surgeries, and permanent disability.',
    },
    {
      question: 'Who is liable for equipment accidents at work?',
      answer: 'Workers comp covers most equipment injuries regardless of fault. However, you may have additional claims against equipment manufacturers (product liability), maintenance companies, or third-party contractors who created unsafe conditions.',
    },
    {
      question: 'What if I wasn\'t properly trained on the equipment?',
      answer: 'Lack of training strengthens your case. Employers must provide adequate training under OSHA regulations. Inadequate training may support additional negligence claims and increase settlement values, especially if OSHA cites violations.',
    },
    {
      question: 'Can I sue if defective equipment caused my injury?',
      answer: 'Yes, product liability claims against manufacturers are separate from workers comp. Defective design, manufacturing defects, or inadequate warnings can support lawsuits for full damages including pain and suffering.',
    },
    {
      question: 'What compensation is available for equipment accidents?',
      answer: 'Workers comp provides medical treatment, disability benefits, and vocational rehabilitation. Third-party claims can add pain/suffering, full lost wages, and punitive damages. Catastrophic injuries may warrant million-dollar settlements.',
    },
    {
      question: 'How long do I have to report an equipment accident?',
      answer: 'Report immediately! North Carolina requires notice within 30 days (2 years to file claim). Florida requires 30-day notice (2 years to file). Immediate reporting preserves evidence and strengthens your claim.',
    },
  ];

  const content = {
    introduction: `Equipment and machinery accidents cause some of the most severe workplace injuries. From forklift collisions to industrial press injuries, these accidents often result in amputations, crush injuries, and permanent disability. Our attorneys understand the complex regulations governing equipment safety and fight for maximum compensation through both workers compensation and third-party liability claims.`,

    processTitle: 'Equipment Accident Claim Process',
    process: [
      {
        step: '1',
        title: 'Emergency Response',
        description: 'Immediate medical care and accident documentation',
      },
      {
        step: '2',
        title: 'Investigation',
        description: 'Preserve equipment, gather evidence, OSHA reports',
      },
      {
        step: '3',
        title: 'Claims Filing',
        description: 'Workers comp and identify third-party liability',
      },
      {
        step: '4',
        title: 'Expert Analysis',
        description: 'Equipment inspection, safety expert evaluation',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Negotiate settlements or trial for full compensation',
      },
    ],

    urgencyTitle: '⚠️ Critical: Preserve the Equipment',
    urgencyMessage: 'Equipment involved in accidents gets repaired, modified, or destroyed quickly. We need to inspect and document it immediately. Contact us now to preserve crucial evidence.',

    whyChooseTitle: 'Why Choose Vasquez Law for Equipment Accidents',
    whyChoosePoints: [
      'Engineering experts to prove equipment defects',
      'OSHA violation investigation experience',
      'Product liability claim expertise',
      'Catastrophic injury case experience',
      'Maximum recovery through multiple claims',
      'Relationships with equipment safety experts',
      'Bilingual team serving Hispanic workers',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Equipment Accident Statistics (2025)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-red-400 mb-2">600+</div>
            <div className="text-lg text-white mb-2">Annual Deaths</div>
            <p className="text-gray-400 text-sm">From equipment accidents in US workplaces</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-yellow-400 mb-2">75,000</div>
            <div className="text-lg text-white mb-2">Serious Injuries</div>
            <p className="text-gray-400 text-sm">Requiring hospitalization each year</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <div className="text-4xl font-bold text-green-400 mb-2">35%</div>
            <div className="text-lg text-white mb-2">Preventable</div>
            <p className="text-gray-400 text-sm">With proper training and safety measures</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Equipment Hazards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Mechanical Hazards</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Crushing between parts</li>
              <li>• Cutting or severing</li>
              <li>• Entanglement in moving parts</li>
              <li>• Impact from ejected parts</li>
              <li>• Puncture or stabbing</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Operational Hazards</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Inadequate training</li>
              <li>• Missing safety guards</li>
              <li>• Bypassed safety devices</li>
              <li>• Poor maintenance</li>
              <li>• Improper lockout/tagout</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Equipment & Machinery Accidents"
      subtitle="Fighting for Workers Injured by Dangerous Equipment"
      description="Equipment accidents cause devastating injuries. Our attorneys secure maximum compensation through workers comp and third-party claims against manufacturers and negligent parties."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
