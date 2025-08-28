import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Denied Workers Comp Claims Attorney | Appeal Denials | Vasquez Law Firm',
  description: 'Workers compensation claim denied? Our attorneys overturn denials and secure benefits. Free consultation. Serving NC and FL.',
  keywords: 'denied workers comp claim, workers compensation appeal, claim denial lawyer, benefits denied',
};

export default function DeniedClaimsPage() {
  const services = [
    {
      title: 'Initial Denial Appeals',
      description: 'Fighting wrongful denials of legitimate workplace injury claims',
      icon: '❌',
      features: [
        'Form 61/63 denial appeals',
        'Compensability disputes',
        'Pre-existing condition arguments',
        'Causation challenges',
        'Employment relationship disputes',
        'Timely filing issues',
      ],
    },
    {
      title: 'Medical Treatment Denials',
      description: 'Securing approval for necessary medical care and procedures',
      icon: '🏥',
      features: [
        'Surgery authorization appeals',
        'Specialist referral denials',
        'Diagnostic test approvals',
        'Physical therapy extensions',
        'Medication denials',
        'Medical equipment disputes',
      ],
    },
    {
      title: 'Benefit Termination',
      description: 'Restoring wrongfully terminated disability benefits',
      icon: '💰',
      features: [
        'Temporary disability cuts',
        'Maximum medical improvement disputes',
        'Light duty work disputes',
        'Wage replacement issues',
        'Permanent disability denials',
        'Death benefit disputes',
      ],
    },
    {
      title: 'Bad Faith Insurance Tactics',
      description: 'Fighting insurance company delays and unfair practices',
      icon: '⚖️',
      features: [
        'Unreasonable delays',
        'Biased medical exams',
        'Surveillance misuse',
        'Doctor shopping',
        'Lowball settlements',
        'Communication failures',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Why was my workers compensation claim denied?',
      answer: 'Common denial reasons include: late reporting, disputes about whether injury occurred at work, pre-existing conditions, lack of medical evidence, or missed deadlines. Insurance companies often deny valid claims hoping workers won\'t appeal. We review denials and build strong appeals.',
    },
    {
      question: 'How long do I have to appeal a denied claim?',
      answer: 'In North Carolina, you typically have 2 years from denial to request a hearing. In Florida, you have 30 days to file a Petition for Benefits. Acting quickly preserves evidence and witness testimony. Contact us immediately after any denial.',
    },
    {
      question: 'Can I be fired for filing a workers comp claim?',
      answer: 'No, retaliation for filing workers comp is illegal. Employers cannot fire, demote, or discriminate against you for pursuing benefits. If retaliation occurs, you may have additional claims for wrongful termination and damages.',
    },
    {
      question: 'What if the insurance company\'s doctor says I can work?',
      answer: 'Insurance companies often use biased doctors to deny claims. You have the right to a second opinion. We work with independent medical experts who provide honest evaluations and testimony to counter insurance doctor opinions.',
    },
    {
      question: 'Should I accept the insurance company\'s settlement offer?',
      answer: 'Never accept a settlement without legal review. Initial offers are typically far below fair value. We evaluate settlement offers, calculate true claim value, and negotiate maximum compensation including future medical needs.',
    },
    {
      question: 'What if my employer says I wasn\'t really hurt?',
      answer: 'Employer disputes don\'t determine claim validity. We gather medical records, witness statements, and expert testimony to prove your injury and its connection to work. Video evidence and accident reports often contradict employer claims.',
    },
  ];

  const content = {
    introduction: `When insurance companies deny your workers compensation claim, they\'re betting you\'ll give up. Don\'t. Our attorneys have overturned thousands of wrongful denials, securing benefits for injured workers across North Carolina and Florida. We know every insurance company trick and exactly how to fight back. From initial denials to terminated benefits, we get you the compensation you deserve.`,

    processTitle: 'Denial Appeal Process',
    process: [
      {
        step: '1',
        title: 'Free Case Review',
        description: 'Analyze denial reasons and identify appeal strategies',
      },
      {
        step: '2',
        title: 'Evidence Gathering',
        description: 'Collect medical records, witness statements, expert opinions',
      },
      {
        step: '3',
        title: 'File Appeal',
        description: 'Submit comprehensive appeal with supporting documentation',
      },
      {
        step: '4',
        title: 'Hearing Preparation',
        description: 'Prepare testimony, evidence presentation, legal arguments',
      },
      {
        step: '5',
        title: 'Win Benefits',
        description: 'Secure approval and ongoing benefit payments',
      },
    ],

    urgencyTitle: '⏰ Strict Deadlines Apply',
    urgencyMessage: 'Missing appeal deadlines means losing benefits forever. Every day matters. Contact us immediately for free claim review.',

    whyChooseTitle: 'Why Choose Vasquez Law for Denied Claims',
    whyChoosePoints: [
      'Over 75% success rate overturning denials',
      'Former insurance company tactics knowledge',
      'Relationships with independent medical experts',
      'Aggressive litigation when needed',
      'No fees unless we win your appeal',
      'Emergency hearings for urgent medical needs',
      'Bilingual team for Hispanic workers',
      'Offices throughout North Carolina and Florida',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      {/* Common Denial Tactics */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Insurance Company Denial Tactics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Medical Denials</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• "Not work-related"</li>
              <li>• "Pre-existing condition"</li>
              <li>• "Degenerative changes"</li>
              <li>• "Treatment not necessary"</li>
              <li>• "Maximum improvement reached"</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Procedural Denials</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• "Late reporting"</li>
              <li>• "No witness"</li>
              <li>• "Incomplete forms"</li>
              <li>• "Not in course of employment"</li>
              <li>• "Horseplay/misconduct"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Your Rights After Denial</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <span>Request all claim documents and denial reasons in writing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <span>Get independent medical evaluation from your choice of doctor</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <span>Appeal through Industrial Commission or Division of Workers Comp</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <span>Continue medical treatment while appeal pending</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <span>Seek legal representation without upfront costs</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Denied Workers Comp Claims"
      subtitle="We Overturn Wrongful Denials"
      description="Insurance companies deny valid claims every day. Our attorneys know how to fight back, overturn denials, and secure the benefits you deserve."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
