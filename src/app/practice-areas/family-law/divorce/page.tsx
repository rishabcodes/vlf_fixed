import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Attorney NC & FL | Separation Lawyer | Vasquez Law Firm',
  description: 'Compassionate divorce representation. Uncontested, contested, high-asset divorces. Protecting your future and children.',
  keywords: 'divorce attorney, separation lawyer, divorce lawyer NC, divorce attorney FL',
};

export default function DivorcePage() {
  const services = [
    {
      title: 'Uncontested Divorce',
      description: 'Amicable resolution for agreeing parties',
      icon: '🤝',
      features: [
        'Separation agreement drafting',
        'Simple property division',
        'Joint custody arrangements',
        'Expedited processing',
        'Reduced emotional stress',
        'Lower overall expenses',
      ],
    },
    {
      title: 'Contested Divorce',
      description: 'Aggressive advocacy in disputes',
      icon: '⚖️',
      features: [
        'Complex litigation',
        'Discovery and depositions',
        'Temporary orders',
        'Trial representation',
        'Appeal handling',
        'Emergency motions',
      ],
    },
    {
      title: 'High-Asset Divorce',
      description: 'Complex financial situations',
      icon: '💰',
      features: [
        'Business valuations',
        'Hidden asset discovery',
        'Executive compensation',
        'Stock options/RSUs',
        'Multiple properties',
        'Retirement divisions',
      ],
    },
    {
      title: 'Separation Agreements',
      description: 'Comprehensive settlement documents',
      icon: '📝',
      features: [
        'Property distribution',
        'Debt allocation',
        'Spousal support terms',
        'Child custody/support',
        'Insurance provisions',
        'Tax considerations',
      ],
    },
    {
      title: 'Military Divorce',
      description: 'Special considerations for service members',
      icon: '🇺🇸',
      features: [
        'USFSPA division rules',
        'BAH and benefits',
        'Deployment considerations',
        'Military pension division',
        'SCRA protections',
        'Jurisdiction issues',
      ],
    },
    {
      title: 'Post-Divorce Modifications',
      description: 'Changing orders after divorce',
      icon: '🔄',
      features: [
        'Support modifications',
        'Custody changes',
        'Relocation requests',
        'Enforcement actions',
        'Contempt proceedings',
        'Agreement updates',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does divorce take in NC and FL?',
      answer: 'NC requires one year separation before filing absolute divorce, then 30-60 days for uncontested, 6-12 months if contested. FL has no separation requirement - 20 days minimum for simplified, 3-6 months uncontested, 6-18 months contested. Complex cases take longer.',
    },
    {
      question: 'What\'s the difference between separation and divorce?',
      answer: 'Separation is living apart with intent to end marriage - required in NC but not FL. Separation agreements settle property, support, and custody but you\'re still married. Absolute divorce legally ends the marriage, allowing remarriage. Separation agreements often become part of divorce decree.',
    },
    {
      question: 'How is property divided in divorce?',
      answer: 'NC uses equitable distribution - fair but not necessarily equal division of marital property. FL also uses equitable distribution starting with 50/50 presumption. Separate property (pre-marital, inherited, gifted) stays with owner. Factors include length of marriage, contributions, economic circumstances.',
    },
    {
      question: 'Can I get alimony?',
      answer: 'Depends on need and ability to pay. NC considers 16 factors including marital misconduct. FL considers standard of living, marriage length, age, health, finances. Permanent alimony rare now - usually rehabilitative (education/training) or durational (set period). High earner typically pays.',
    },
    {
      question: 'What if my spouse won\'t agree to divorce?',
      answer: 'You don\'t need spouse\'s consent. After meeting state requirements (NC: 1-year separation, FL: 20-day residency), file and serve papers. If they don\'t respond, get default judgment. If they contest, go to trial. Court will grant divorce regardless of their agreement.',
    },
    {
      question: 'How much will divorce cost?',
      answer: 'Varies greatly by complexity. Simple uncontested cases have lower legal expenses. Contested divorces with trials require more time and expertise. Factors affecting overall process: property complexity, custody disputes, spouse cooperation, need for experts. We offer payment plans and flat fees where possible.',
    },
  ];

  const content = {
    introduction: `Divorce marks both an ending and a beginning. Whether you\'re facing an amicable separation or contentious litigation, having experienced legal guidance protects your rights and future. We combine compassionate support with aggressive advocacy, helping you navigate North Carolina\'s and Florida\'s divorce laws while minimizing emotional and financial stress. Your new chapter starts with smart decisions today.`,

    processTitle: 'Divorce Process Steps',
    process: [
      {
        step: '1',
        title: 'Initial Consultation',
        description: 'Assess situation and options',
      },
      {
        step: '2',
        title: 'File/Respond',
        description: 'Initiate or answer divorce petition',
      },
      {
        step: '3',
        title: 'Discovery & Negotiation',
        description: 'Exchange information and negotiate',
      },
      {
        step: '4',
        title: 'Settlement or Trial',
        description: 'Resolve through agreement or court',
      },
      {
        step: '5',
        title: 'Final Decree',
        description: 'Court approval and implementation',
      },
    ],

    urgencyTitle: '⚠️ Protect Your Rights Now',
    urgencyMessage: 'Decisions made during separation affect your entire divorce. Asset dissipation, custody arrangements, and support obligations start immediately.',

    whyChooseTitle: 'Why Choose Vasquez Law for Divorce',
    whyChoosePoints: [
      'Compassionate yet aggressive representation',
      'Complex asset division expertise',
      'Child-focused custody strategies',
      'Mediation and litigation experience',
      'Military divorce specialists',
      'Bilingual services available',
      'Payment plans offered',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC vs FL Divorce Laws</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">North Carolina</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ 1 year separation required</li>
              <li>✓ 6 month residency requirement</li>
              <li>✓ Marital fault affects alimony</li>
              <li>✓ Equitable distribution standard</li>
              <li>✓ Absolute divorce + divorce from bed and board</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Florida</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ No separation requirement</li>
              <li>✓ 6 month residency requirement</li>
              <li>✓ No-fault divorce only</li>
              <li>✓ Equitable distribution (50/50 start)</li>
              <li>✓ Simplified and regular dissolution</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Types of Divorce Proceedings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Type</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Best For</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Simplified/Summary</td>
                <td className="py-3 px-4">30-60 days</td>
                <td className="py-3 px-4">No children, minimal assets, agreement</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Uncontested</td>
                <td className="py-3 px-4">2-4 months</td>
                <td className="py-3 px-4">Agreement on all issues</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Contested</td>
                <td className="py-3 px-4">6-18 months</td>
                <td className="py-3 px-4">Disputes requiring court intervention</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">High-Conflict</td>
                <td className="py-3 px-4">12-24+ months</td>
                <td className="py-3 px-4">Complex assets, custody battles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Protecting Yourself During Divorce</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">1.</span>
              <div>
                <h3 className="font-bold text-white">Document Everything</h3>
                <p className="text-gray-300 text-sm">Financial records, asset lists, communication, incidents</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">2.</span>
              <div>
                <h3 className="font-bold text-white">Separate Finances</h3>
                <p className="text-gray-300 text-sm">Open individual accounts, secure credit, protect assets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">3.</span>
              <div>
                <h3 className="font-bold text-white">Avoid Social Media</h3>
                <p className="text-gray-300 text-sm">Posts become evidence - stay private and professional</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">4.</span>
              <div>
                <h3 className="font-bold text-white">Focus on Children</h3>
                <p className="text-gray-300 text-sm">Their needs first - courts favor cooperative parents</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">5.</span>
              <div>
                <h3 className="font-bold text-white">Get Support</h3>
                <p className="text-gray-300 text-sm">Therapy, support groups, trusted friends help cope</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Divorce & Separation"
      subtitle="New Beginnings Start Here"
      description="Compassionate guidance through divorce. We protect your assets, children, and future while minimizing conflict."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
