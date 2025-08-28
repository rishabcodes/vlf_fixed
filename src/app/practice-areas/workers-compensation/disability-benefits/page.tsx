import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Comp Disability Benefits Attorney NC & FL | Vasquez Law Firm',
  description: 'Maximize your disability benefits after workplace injury. TTD, TPD, PPD claims. Expert workers comp attorneys serving NC and FL.',
  keywords: 'disability benefits, workers compensation, TTD, TPD, PPD, temporary disability, permanent disability',
};

export default function DisabilityBenefitsPage() {
  const services = [
    {
      title: 'Temporary Total Disability (TTD)',
      description: 'Full wage replacement while unable to work',
      icon: '🏥',
      features: [
        '66.67% of average weekly wage',
        'Doctor authorization required',
        'Retroactive payment claims',
        'Light duty refusal rights',
        'Maximum benefit duration',
        'Back pay recovery',
      ],
    },
    {
      title: 'Temporary Partial Disability (TPD)',
      description: 'Benefits when working reduced hours or wages',
      icon: '💼',
      features: [
        'Wage differential calculations',
        'Light duty wage supplements',
        'Part-time work benefits',
        'Modified duty compensation',
        'Earnings documentation',
        'Maximum 500 weeks NC',
      ],
    },
    {
      title: 'Permanent Partial Disability (PPD)',
      description: 'Compensation for permanent impairment ratings',
      icon: '📊',
      features: [
        'Impairment rating disputes',
        'Scheduled member injuries',
        'Back/neck ratings',
        'Multiple body part claims',
        'Rating calculation errors',
        'Second opinion rights',
      ],
    },
    {
      title: 'Permanent Total Disability (PTD)',
      description: 'Lifetime benefits for total disability',
      icon: '♿',
      features: [
        'Lifetime benefit claims',
        'Vocational expert testimony',
        'Loss of wage earning capacity',
        'Multiple injury combinations',
        'Social Security coordination',
        'Cost of living adjustments',
      ],
    },
    {
      title: 'Vocational Rehabilitation',
      description: 'Job retraining and placement assistance',
      icon: '🎓',
      features: [
        'Job retraining programs',
        'Education benefits',
        'Job placement services',
        'Skills assessment',
        'Career counseling',
        'Tool/equipment provision',
      ],
    },
    {
      title: 'Settlement Negotiations',
      description: 'Maximizing lump sum settlements',
      icon: '💰',
      features: [
        'Clincher agreement review',
        'Future medical considerations',
        'Medicare Set-Asides',
        'Structured settlements',
        'Tax implications',
        'Settlement valuation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How much are disability benefits in workers comp?',
      answer: 'In North Carolina and Florida, temporary total disability pays approximately two-thirds of your average weekly wage, subject to state maximums. Current maximums are set annually by each state. Permanent disability varies based on impairment rating and body part affected.',
    },
    {
      question: 'How long can I receive temporary disability benefits?',
      answer: 'TTD continues until you reach Maximum Medical Improvement (MMI) or return to work. NC limits are 500 weeks for most injuries, 400 weeks for back injuries. Florida limits are 104 weeks (2 years) unless you\'re deemed catastrophically injured.',
    },
    {
      question: 'What is Maximum Medical Improvement (MMI)?',
      answer: 'MMI means your condition has stabilized and further improvement is unlikely. At MMI, temporary benefits end and permanent disability evaluation begins. You can challenge premature MMI determinations with second medical opinions.',
    },
    {
      question: 'Can I work while receiving disability benefits?',
      answer: 'Yes, with restrictions. Light duty or part-time work may qualify for TPD benefits covering wage differences. Report all earnings to avoid benefit suspension. We help structure work attempts to protect your benefits.',
    },
    {
      question: 'How are permanent disability ratings calculated?',
      answer: 'Doctors assign impairment ratings using AMA Guides. Ratings translate to weeks of compensation based on body part. Back injuries in NC: 300 weeks × rating percentage × comp rate. We ensure accurate ratings and maximum compensation.',
    },
    {
      question: 'Should I accept a lump sum settlement?',
      answer: 'Settlements provide immediate funds but end future benefits. Consider future medical needs, disability progression, and Medicare requirements. Never accept settlements without legal review - initial offers are typically significantly below fair value.',
    },
  ];

  const content = {
    introduction: `Workplace injuries can leave you unable to work and facing mounting bills. Understanding your disability benefit rights is crucial for financial survival. Our experienced attorneys maximize your workers compensation disability benefits, ensuring proper classification, accurate calculations, and full payment of all benefits owed. From temporary disability through permanent impairment ratings, we protect your income throughout recovery.`,

    processTitle: 'Disability Benefits Process',
    process: [
      {
        step: '1',
        title: 'Medical Authorization',
        description: 'Doctor certifies work restrictions or disability',
      },
      {
        step: '2',
        title: 'Benefit Calculation',
        description: 'Determine average weekly wage and comp rate',
      },
      {
        step: '3',
        title: 'Payment Initiation',
        description: 'Ensure timely benefit payments begin',
      },
      {
        step: '4',
        title: 'Ongoing Monitoring',
        description: 'Protect against improper termination',
      },
      {
        step: '5',
        title: 'Maximum Recovery',
        description: 'Permanent ratings or settlement negotiation',
      },
    ],

    urgencyTitle: '💸 Every Week Counts',
    urgencyMessage: 'Delayed or denied disability benefits compound financial hardship. Insurance companies profit from every week they don\'t pay. Get legal help immediately to start benefits flowing.',

    whyChooseTitle: 'Why Choose Vasquez Law for Disability Benefits',
    whyChoosePoints: [
      'Expert knowledge of disability benefit calculations',
      'Fighting improper benefit terminations',
      'Maximizing permanent disability ratings',
      'Coordinating with Social Security Disability',
      'Protecting against bad faith insurance tactics',
      'No fees unless we secure your benefits',
      'Bilingual team for Hispanic workers',
      'Offices in Raleigh, Charlotte, Smithfield, and Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Disability Benefit Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">North Carolina</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Benefit Rate:</span>
                <span className="text-white font-semibold">Two-thirds of wage</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Weekly Range:</span>
                <span className="text-white font-semibold">Minimum to Maximum</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">TTD Duration:</span>
                <span className="text-white font-semibold">500 weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Waiting Period:</span>
                <span className="text-white font-semibold">7 days</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">Florida</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Benefit Rate:</span>
                <span className="text-white font-semibold">Two-thirds of wage</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Weekly Range:</span>
                <span className="text-white font-semibold">Minimum to Maximum</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">TTD Duration:</span>
                <span className="text-white font-semibold">104 weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Waiting Period:</span>
                <span className="text-white font-semibold">7 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Benefit Mistakes to Avoid</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">Calculation Errors</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Wrong average weekly wage</li>
              <li>• Missing overtime/bonuses</li>
              <li>• Incorrect comp rate</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Documentation Issues</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Not reporting earnings</li>
              <li>• Missing work slips</li>
              <li>• No medical updates</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Settlement Pitfalls</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Accepting lowball offers</li>
              <li>• Ignoring future medical</li>
              <li>• No Medicare Set-Aside</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Workers Comp Disability Benefits"
      subtitle="Protecting Your Income After Injury"
      description="Workplace injuries shouldn't mean financial ruin. Our disability benefits attorneys ensure you receive every dollar owed while you recover."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
