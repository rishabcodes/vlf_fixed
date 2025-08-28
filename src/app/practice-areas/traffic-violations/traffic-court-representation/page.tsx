import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traffic Court Attorney NC & FL | Complete Representation | Vasquez Law',
  description: "Professional traffic court representation. We appear so you don\'t have to. All traffic violations defended.',
  keywords: 'traffic court lawyer, traffic ticket attorney, court representation',
};

export default function TrafficCourtRepresentationPage() {
  const services = [
    {
      title: 'Complete Court Handling',
      description: 'Full representation without you appearing',
      icon: '⚖️',
      features: [
        'Appear on your behalf',
        'Handle all proceedings',
        'Negotiate with prosecutors',
        'File necessary motions',
        'Request continuances',
        'Manage court deadlines',
      ],
    },
    {
      title: 'All Violation Types',
      description: 'Defense for any traffic charge',
      icon: '📋',
      features: [
        'Speeding tickets',
        'Reckless driving',
        'DWI/DUI charges',
        'License violations',
        'Equipment violations',
        'Commercial violations',
      ],
    },
    {
      title: 'Prosecutor Negotiation',
      description: 'Direct talks for best outcomes',
      icon: '🤝',
      features: [
        'Charge reductions',
        'Dismissal negotiations',
        'Alternative dispositions',
        'Deferred prosecution',
        'Diversion programs',
        'Fine minimization',
      ],
    },
    {
      title: 'Trial Representation',
      description: 'Full trial defense when needed',
      icon: '🏆',
      features: [
        'Jury trial experience',
        'Bench trial expertise',
        'Evidence challenges',
        'Witness examination',
        'Legal arguments',
        'Appeal preparation',
      ],
    },
    {
      title: 'Multiple Court Coverage',
      description: 'Representation across jurisdictions',
      icon: '🗺️',
      features: [
        'District courts',
        'Superior courts',
        'Municipal courts',
        'Out-of-state coordination',
        'Federal violations',
        'Administrative hearings',
      ],
    },
    {
      title: 'Record Protection',
      description: 'Minimizing long-term impact',
      icon: '🛡️',
      features: [
        'Point avoidance',
        'Insurance protection',
        'CDL preservation',
        'Criminal record prevention',
        'Employment protection',
        'Immigration safety',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Do I have to go to traffic court?',
      answer: 'In most cases, no! We appear on your behalf for traffic infractions and many misdemeanors. You save time, avoid missing work, and get professional representation. Some serious charges may require your appearance.',
    },
    {
      question: 'What happens at traffic court?',
      answer: 'Court starts with calendar call, then negotiations with prosecutors, followed by pleas or trials. Most cases resolve through negotiation. If trial needed, officer must appear and prove case. We handle everything professionally.',
    },
    {
      question: 'Can you get my ticket dismissed?',
      answer: 'Often yes! Dismissals possible through: officer no-shows, technical defects, constitutional violations, lack of evidence, or negotiated dismissals. If not dismissed, we usually negotiate significant reductions.',
    },
    {
      question: 'What if I already missed court?',
      answer: 'Don\'t panic! Failure to appear creates arrest warrant and license suspension, but we can often recall warrants, reopen cases, and resolve matters without arrest. Act quickly - delays make it harder.',
    },
    {
      question: 'Why hire an attorney for traffic court?',
      answer: 'Professional representation often leads to better outcomes - dismissals, reductions, or alternative dispositions. Attorneys know prosecutors, understand options, and navigate the system efficiently. One ticket\'s insurance increase can be devastating without proper defense.'
    },
    {
      question: 'What should I bring to court?',
      answer: 'If we\'re representing you, bring nothing - we handle everything! If you must appear, bring: citation, driving record, insurance proof, and any evidence (photos, witness info). Dress professionally and arrive early.',
    },
  ];

  const content = {
    introduction: `Traffic court can be intimidating, time-consuming, and costly if handled wrong. Our experienced traffic attorneys appear for you, negotiate with prosecutors, and fight for the best possible outcome. We know every court, every prosecutor, and every strategy to protect your record, license, and wallet. Let us handle the stress while you continue your life.`,

    processTitle: 'Court Representation Process',
    process: [
      {
        step: '1',
        title: 'Case Review',
        description: 'Analyze charges and evidence',
      },
      {
        step: '2',
        title: 'Court Preparation',
        description: 'File appearance and prepare defense',
      },
      {
        step: '3',
        title: 'Court Appearance',
        description: "We appear so you don\'t have to',
      },
      {
        step: '4',
        title: 'Resolution',
        description: 'Negotiate or try case for best outcome',
      },
      {
        step: '5',
        title: 'Follow-Up',
        description: 'Ensure compliance and record accuracy',
      },
    ],

    urgencyTitle: '📅 Court Dates Can\'t Be Ignored',
    urgencyMessage: 'Missing traffic court means automatic conviction, license suspension, and arrest warrant. Hire representation or appear yourself - but never ignore it.',

    whyChooseTitle: 'Why Choose Vasquez Law for Traffic Court',
    whyChoosePoints: [
      'Appear in court so you don\'t miss work',
      'Know every traffic court in NC and FL',
      'Relationships with prosecutors and judges',
      'Former prosecutors understand the system',
      'Thousands of successful cases',
      'Clear communication throughout process',
      'Handle everything from tickets to trials',
      'Bilingual representation available',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Traffic Court Process</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-2xl">1️⃣</span>
              <div>
                <h3 className="font-bold text-white mb-2">Calendar Call (9:00 AM typical)</h3>
                <p className="text-gray-300 text-sm">All cases called, attorneys announce representation</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">2️⃣</span>
              <div>
                <h3 className="font-bold text-white mb-2">Prosecutor Negotiations</h3>
                <p className="text-gray-300 text-sm">Attorneys meet with DA to discuss reductions/dismissals</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">3️⃣</span>
              <div>
                <h3 className="font-bold text-white mb-2">Plea or Trial Decision</h3>
                <p className="text-gray-300 text-sm">Accept negotiated deal or proceed to trial</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">4️⃣</span>
              <div>
                <h3 className="font-bold text-white mb-2">Resolution</h3>
                <p className="text-gray-300 text-sm">Enter plea, try case, or get continuance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Court Outcomes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Best Outcomes</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Dismissal - no conviction</li>
              <li>• Prayer for Judgment - no points</li>
              <li>• Improper Equipment - non-moving</li>
              <li>• Voluntary Dismissal - costs only</li>
              <li>• Deferred Prosecution - earn dismissal</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Negotiated Reductions</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Speed reduced to 9 over</li>
              <li>• Moving to non-moving violation</li>
              <li>• Criminal to infraction</li>
              <li>• Points to no-point violation</li>
              <li>• Fine reduction with guilty plea</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Why Professional Representation Matters</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Without Attorney</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>❌ Miss work for court</li>
                <li>❌ Don\'t know prosecutors</li>
                <li>❌ Unfamiliar with options</li>
                <li>❌ Accept bad deals</li>
                <li>❌ Make costly mistakes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">With Attorney</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>✅ Stay at work/home</li>
                <li>✅ Professional negotiations</li>
                <li>✅ Know all options</li>
                <li>✅ Get best outcomes</li>
                <li>✅ Protect your record</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Traffic Court Representation"
      subtitle="We Handle Court So You Don\'t Have To"
      description="Professional traffic court representation throughout NC and FL. We appear for you, negotiate the best outcome, and protect your record."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
