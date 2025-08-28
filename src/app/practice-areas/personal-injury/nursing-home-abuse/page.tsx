import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nursing Home Abuse Attorney NC & FL | Elder Neglect Lawyer | Vasquez Law',
  description: 'Elder abuse and neglect in nursing homes. Bedsores, falls, malnutrition, medication errors. Justice for vulnerable residents.',
  keywords: 'nursing home abuse lawyer, elder neglect attorney, bedsores, nursing home injury',
};

export default function NursingHomeAbusePage() {
  const services = [
    {
      title: 'Physical Abuse',
      description: 'Intentional harm to residents',
      icon: '⚠️',
      features: [
        'Hitting and striking',
        'Improper restraints',
        'Rough handling',
        'Sexual abuse',
        'Medication as punishment',
        'Unnecessary force',
      ],
    },
    {
      title: 'Neglect & Abandonment',
      description: 'Failure to provide basic care',
      icon: '🚨',
      features: [
        'Bedsores/pressure ulcers',
        'Malnutrition/dehydration',
        'Medication errors',
        'Fall injuries',
        'Hygiene neglect',
        'Medical care delays',
      ],
    },
    {
      title: 'Emotional Abuse',
      description: 'Psychological harm and trauma',
      icon: '💔',
      features: [
        'Verbal abuse',
        'Humiliation',
        'Isolation',
        'Threats and intimidation',
        'Ignoring residents',
        'Destroying property',
      ],
    },
    {
      title: 'Financial Exploitation',
      description: 'Theft and fraud against elders',
      icon: '💰',
      features: [
        'Stealing money/property',
        'Forging signatures',
        'Coercing changes to wills',
        'Identity theft',
        'Overcharging for services',
        'Misusing power of attorney',
      ],
    },
    {
      title: 'Medical Malpractice',
      description: 'Substandard medical care',
      icon: '⚕️',
      features: [
        'Medication errors',
        'Delayed treatment',
        'Misdiagnosis',
        'Improper wound care',
        'Infection control failures',
        'Emergency response delays',
      ],
    },
    {
      title: 'Wrongful Death',
      description: 'Fatal neglect or abuse',
      icon: '⚫',
      features: [
        'Preventable infections',
        'Fall-related deaths',
        'Medication overdoses',
        'Choking incidents',
        'Wandering/elopement',
        'Suicide from neglect',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are signs of nursing home abuse?',
      answer: 'Warning signs include: unexplained injuries, bedsores, weight loss, dehydration, poor hygiene, emotional withdrawal, fear of staff, missing belongings, unusual financial transactions. Any sudden change in physical or mental condition warrants investigation.',
    },
    {
      question: 'What are bedsores and why are they serious?',
      answer: 'Bedsores (pressure ulcers) develop when residents aren\'t moved regularly. They\'re never acceptable and indicate neglect. Stage 3-4 bedsores can cause infections, sepsis, and death. They\'re preventable with proper care and staffing.',
    },
    {
      question: 'How common is nursing home abuse?',
      answer: 'Studies show 1 in 3 nursing homes have been cited for violations causing harm. Up to 40% of residents experience abuse or neglect. Many cases go unreported due to fear, cognitive impairment, or family unawareness.',
    },
    {
      question: 'Can I sue if my loved one has dementia?',
      answer: 'Absolutely. Residents with dementia or Alzheimer\'s require specialized care and are especially vulnerable. Facilities accepting these residents must provide appropriate staffing, training, and security. Cognitive impairment doesn\'t excuse abuse.',
    },
    {
      question: 'What if the facility says injuries were unavoidable?',
      answer: 'Most injuries ARE avoidable with proper care. Falls can be prevented with supervision and assistive devices. Bedsores prevented with repositioning. Malnutrition prevented with feeding assistance. We prove negligence caused the harm.',
    },
    {
      question: 'What compensation is available?',
      answer: 'Medical expenses, pain and suffering, disability, scarring, emotional distress, and punitive damages for willful neglect. Wrongful death cases include funeral costs and family losses. Federal and state violations strengthen claims.',
    },
  ];

  const content = {
    introduction: `Our elderly deserve dignity, respect, and quality care in their final years. When nursing homes prioritize profits over people, residents suffer abuse, neglect, and preventable injuries. We fight for vulnerable elders who cannot fight for themselves, holding facilities accountable for the harm they cause through understaffing, inadequate training, and systemic failures.`,

    processTitle: 'Nursing Home Abuse Case Process',
    process: [
      {
        step: '1',
        title: 'Immediate Safety',
        description: 'Ensure resident protection first',
      },
      {
        step: '2',
        title: 'Documentation',
        description: 'Photos, medical records, incident reports',
      },
      {
        step: '3',
        title: 'Investigation',
        description: 'State surveys, violations, staffing records',
      },
      {
        step: '4',
        title: 'Expert Review',
        description: 'Medical and care standard evaluation',
      },
      {
        step: '5',
        title: 'Justice',
        description: 'Compensation and facility accountability',
      },
    ],

    urgencyTitle: '🚨 Act Immediately to Protect Your Loved One',
    urgencyMessage: 'Abuse continues until stopped. Document injuries now. Report to state agencies. Get your loved one safe. Evidence disappears and injuries worsen without action.',

    whyChooseTitle: 'Why Choose Vasquez Law for Nursing Home Cases',
    whyChoosePoints: [
      'Elder abuse focus and expertise',
      'Medical expert network',
      'Understanding of federal/state regulations',
      'Aggressive corporate accountability',
      'Compassionate family support',
      'No fees unless we win',
      'Fighting for systemic change',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Nursing Home Red Flags</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">Physical Signs</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Unexplained bruises</li>
              <li>• Bedsores/pressure ulcers</li>
              <li>• Fractures or sprains</li>
              <li>• Weight loss</li>
              <li>• Poor hygiene</li>
              <li>• Overmedication</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Behavioral Changes</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Withdrawal/depression</li>
              <li>• Fear of staff</li>
              <li>• Agitation increase</li>
              <li>• Refusing medications</li>
              <li>• Sleep disturbances</li>
              <li>• Unusual silence</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Facility Issues</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Understaffing</li>
              <li>• High turnover</li>
              <li>• Avoiding questions</li>
              <li>• Restricting visits</li>
              <li>• Missing belongings</li>
              <li>• Unsanitary conditions</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Federal & State Protections</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <h3 className="text-xl font-bold text-white mb-4">Nursing Home Reform Act Rights</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Right to dignity and respect</li>
              <li>✓ Freedom from abuse and neglect</li>
              <li>✓ Right to voice grievances</li>
              <li>✓ Participation in care planning</li>
              <li>✓ Privacy and confidentiality</li>
            </ul>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Access to medical records</li>
              <li>✓ Visitor access rights</li>
              <li>✓ Quality of life standards</li>
              <li>✓ Adequate staffing requirements</li>
              <li>✓ Right to refuse treatment</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Immediate Action Steps</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">1.</span>
              <div>
                <h3 className="font-bold text-white">Document Everything</h3>
                <p className="text-gray-300 text-sm">Photos of injuries, living conditions, medical records</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">2.</span>
              <div>
                <h3 className="font-bold text-white">Report to Authorities</h3>
                <p className="text-gray-300 text-sm">Adult Protective Services and state ombudsman</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">3.</span>
              <div>
                <h3 className="font-bold text-white">Get Medical Evaluation</h3>
                <p className="text-gray-300 text-sm">Independent doctor assessment of injuries</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">4.</span>
              <div>
                <h3 className="font-bold text-white">Consider Relocation</h3>
                <p className="text-gray-300 text-sm">Safety first - find alternative care</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">5.</span>
              <div>
                <h3 className="font-bold text-white">Contact Attorney</h3>
                <p className="text-gray-300 text-sm">Protect rights and pursue accountability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Violations We Pursue</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Care Failures</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Inadequate staffing levels</li>
              <li>• Untrained staff</li>
              <li>• Failure to prevent falls</li>
              <li>• Medication errors</li>
              <li>• Delayed medical care</li>
              <li>• Improper wound care</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Systemic Problems</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Corporate profit prioritization</li>
              <li>• Falsified records</li>
              <li>• Covering up incidents</li>
              <li>• Ignoring complaints</li>
              <li>• Retaliation against whistleblowers</li>
              <li>• Pattern of violations</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Nursing Home Abuse & Neglect"
      subtitle="Protecting Our Most Vulnerable"
      description="When nursing homes fail our elderly, we fight back. Justice for abuse, neglect, and preventable injuries."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
