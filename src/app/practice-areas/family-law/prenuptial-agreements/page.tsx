import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prenuptial Agreement Lawyer Raleigh NC | Prenup Attorney Charlotte | Orlando Premarital',
  description: 'Expert prenuptial agreement attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. Protect assets, avoid disputes. Postnups too. 919-569-5882',
  keywords: 'prenuptial agreement lawyer Raleigh NC, prenup attorney Charlotte, premarital agreement Smithfield, Orlando prenuptial lawyer, postnuptial agreement NC, marital contract attorney, asset protection marriage, prenup cost Wake County, uncontested prenup Florida, prenup enforcement attorney',
  openGraph: {
    title: 'Prenuptial Agreement Attorney | Prenups & Postnups | NC & FL | Vasquez Law',
    description: 'Protect your future with comprehensive prenuptial agreements. Asset protection, business interests, inheritance planning.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function PrenuptialAgreementsPage() {
  const services = [
    {
      title: 'Prenuptial Agreements',
      description: 'Before marriage protection',
      icon: '💍',
      features: [
        'Asset and debt division',
        'Business interest protection',
        'Inheritance preservation',
        'Alimony waiver provisions',
        'Property classification',
        'Financial disclosure review',
      ],
    },
    {
      title: 'Postnuptial Agreements',
      description: 'After marriage contracts',
      icon: '📝',
      features: [
        'Marital property agreements',
        'Reconciliation agreements',
        'Business startup protection',
        'Inheritance received',
        'Debt allocation plans',
        'Lifestyle clauses',
      ],
    },
    {
      title: 'High-Asset Protection',
      description: 'Complex wealth planning',
      icon: '💎',
      features: [
        'Business valuation clauses',
        'Stock options/RSUs',
        'Real estate portfolios',
        'Trust beneficiary rights',
        'Intellectual property',
        'Cryptocurrency assets',
      ],
    },
    {
      title: 'Second Marriage Planning',
      description: 'Blended family protection',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Children from prior marriage',
        'Estate plan coordination',
        'Life insurance requirements',
        'College funding agreements',
        'Retirement protection',
        'Survivor benefits',
      ],
    },
    {
      title: 'Agreement Enforcement',
      description: 'Upholding or challenging',
      icon: '⚖️',
      features: [
        'Validity challenges',
        'Unconscionability defense',
        'Disclosure violations',
        'Duress/coercion claims',
        'Amendment negotiations',
        'Sunset clause triggers',
      ],
    },
    {
      title: 'International Prenups',
      description: 'Cross-border marriages',
      icon: '🌍',
      features: [
        'Multi-jurisdiction clauses',
        'Foreign asset protection',
        'Immigration considerations',
        'Tax treaty planning',
        'Choice of law provisions',
        'Hague Convention compliance',
      ],
    },
  ];

  const faqs = [
    {
      question: 'Are prenuptial agreements enforceable in North Carolina and Florida?',
      answer: 'Yes, both NC and FL follow Uniform Premarital Agreement Act (UPAA). Requirements: written agreement, signed by both parties, full financial disclosure, voluntary execution, fair and reasonable terms. NC courts scrutinize alimony waivers more strictly. FL generally more prenup-friendly. Cannot include child custody/support provisions. Wake and Mecklenburg Counties enforce properly drafted agreements. Must be signed well before wedding (30+ days recommended) to avoid duress claims.',
    },
    {
      question: 'What can and cannot be included in a prenup?',
      answer: 'CAN INCLUDE: Property division, debt allocation, alimony/spousal support, inheritance protection, business interests, life insurance requirements, attorney fees for divorce, dispute resolution methods. CANNOT INCLUDE: Child custody decisions, child support amounts, illegal provisions, encouraging divorce, personal/lifestyle issues (generally), unconscionable terms leaving spouse destitute. NC and FL courts void provisions violating public policy. Financial matters strongest, personal matters weakest.',
    },
    {
      question: 'What factors affect the complexity of a prenuptial agreement?',
      answer: 'Several factors determine prenup complexity: asset diversity (real estate, businesses, investments), debt structures, inheritance expectations, business ownership percentages, retirement accounts, international assets, intellectual property, and previous marriages with children. More complex situations require detailed provisions and extensive documentation. Each party needs separate legal representation for the agreement to be enforceable. The investment in proper legal counsel protects your assets and ensures the agreement will stand up in court.',
    },
    {
      question: 'When should we start the prenuptial agreement process?',
      answer: 'Start 3-6 months before wedding, sign at least 30 days before ceremony. Timeline: Initial consultation (2-3 hours), financial disclosure exchange (2-4 weeks), first draft (1-2 weeks), negotiation (2-6 weeks), revisions (1-2 weeks), final signing (separate meetings). Rushed agreements risk invalidity. NC courts suspicious of last-minute prenups. FL similar but slightly more flexible. Never sign day before wedding.',
    },
    {
      question: 'Can a prenup be changed or cancelled after marriage?',
      answer: 'Yes, through: (1) Postnuptial agreement modifying terms - both parties must agree, consider new consideration required. (2) Written revocation signed by both. (3) Sunset clauses that expire agreement after certain years/events. (4) Court invalidation for fraud, duress, unconscionability, lack of disclosure. Cannot unilaterally cancel. Some couples update every 5-10 years as circumstances change. Birth of children often triggers modifications.',
    },
    {
      question: 'Do I need a prenup if I don\'t have significant assets?',
      answer: 'Consider prenup if: expecting inheritance, starting business, professional degree/license, significant student loans, children from prior relationship, family property/heirlooms, wide income disparity, one party staying home with children. Protects future assets and income, not just current. Clarifies financial expectations. Cheaper to negotiate when happy than fight when divorcing. Young professionals in Raleigh tech or Charlotte banking often benefit.',
    },
  ];

  const content = {
    introduction: `A well-crafted prenuptial agreement provides financial clarity and protection for both parties entering marriage, eliminating uncertainty and potential conflicts. Our experienced prenup attorneys in Raleigh, Charlotte, Smithfield, and Orlando help couples create fair, comprehensive agreements that protect assets, businesses, and inheritances while respecting the marriage partnership. Whether you're a business owner, professional, or have children from a prior relationship, we ensure your agreement meets all legal requirements for enforceability. We also draft postnuptial agreements for married couples and defend or challenge existing agreements in divorce proceedings. Protect your future while building your life together.`,

    processTitle: 'Prenup Process',
    process: [
      {
        step: '1',
        title: 'Initial Planning',
        description: 'Discuss goals and concerns',
      },
      {
        step: '2',
        title: 'Financial Disclosure',
        description: 'Exchange complete asset/debt info',
      },
      {
        step: '3',
        title: 'Draft Agreement',
        description: 'Create comprehensive document',
      },
      {
        step: '4',
        title: 'Negotiation',
        description: 'Refine terms with both attorneys',
      },
      {
        step: '5',
        title: 'Final Execution',
        description: 'Sign with proper formalities',
      },
    ],

    urgencyTitle: '⏰ Don\'t Wait - Timing Matters',
    urgencyMessage: 'Last-minute agreements risk invalidity. Full disclosure takes time. Negotiation requires clear heads. Wedding stress complicates decisions.',

    whyChooseTitle: 'Why Choose Vasquez Law for Prenuptial Agreements',
    whyChoosePoints: [
      'Certified family law specialists',
      'Both sides representation available',
      'High-asset and business expertise',
      'Collaborative approach to negotiation',
      'Enforcement and defense experience',
      'Discrete and professional service',
      'Fixed fees for uncontested agreements',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">What Makes a Prenup Enforceable?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">✅ Valid Agreement Requirements</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Written agreement (oral prenups invalid)</li>
              <li>• Signed by both parties voluntarily</li>
              <li>• Full financial disclosure provided</li>
              <li>• Each party had independent counsel</li>
              <li>• Sufficient time to review (30+ days)</li>
              <li>• Fair and reasonable when signed</li>
              <li>• Proper execution formalities</li>
              <li>• No fraud, duress, or coercion</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">❌ Common Invalidation Reasons</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Signed under pressure/duress</li>
              <li>• Hidden assets or income</li>
              <li>• No independent legal counsel</li>
              <li>• Unconscionable terms</li>
              <li>• Child support provisions included</li>
              <li>• Signed too close to wedding</li>
              <li>• Encourages divorce</li>
              <li>• Oral modifications claimed</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Prenup vs Postnup Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Factor</th>
                <th className="py-3 px-4">Prenuptial Agreement</th>
                <th className="py-3 px-4">Postnuptial Agreement</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Timing</td>
                <td className="py-3 px-4">Before marriage</td>
                <td className="py-3 px-4">During marriage</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Consideration</td>
                <td className="py-3 px-4">Marriage itself</td>
                <td className="py-3 px-4">Must provide new value</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Scrutiny Level</td>
                <td className="py-3 px-4">Moderate</td>
                <td className="py-3 px-4">Higher (fiduciary duty)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Common Uses</td>
                <td className="py-3 px-4">Asset protection, inheritance</td>
                <td className="py-3 px-4">Reconciliation, new assets</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Complexity</td>
                <td className="py-3 px-4">Varies by assets</td>
                <td className="py-3 px-4">Often more complex</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Enforceability</td>
                <td className="py-3 px-4">Generally strong</td>
                <td className="py-3 px-4">More challenges</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Prenup Provisions & Clauses</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Financial Provisions</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>📊 <strong>Property Classification:</strong> Separate vs marital</li>
                <li>📊 <strong>Business Protection:</strong> Ownership and growth</li>
                <li>📊 <strong>Debt Responsibility:</strong> Who pays what</li>
                <li>📊 <strong>Bank Accounts:</strong> Joint vs separate</li>
                <li>📊 <strong>Real Estate:</strong> Home ownership rights</li>
                <li>📊 <strong>Retirement:</strong> 401k, pension protection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">Support Provisions</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>💰 <strong>Alimony Waiver:</strong> Full or limited</li>
                <li>💰 <strong>Sunset Clause:</strong> Expires after X years</li>
                <li>💰 <strong>Escalator Clause:</strong> Increases with time</li>
                <li>💰 <strong>Infidelity Clause:</strong> Penalties for cheating</li>
                <li>💰 <strong>Life Insurance:</strong> Required coverage</li>
                <li>💰 <strong>Attorney Fees:</strong> Who pays in divorce</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">State-Specific Prenup Laws</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">North Carolina Prenup Law</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-bold">Key Requirements</h4>
                <ul className="text-gray-300 text-sm mt-1">
                  <li>• UPAA adopted with modifications</li>
                  <li>• Alimony waivers closely scrutinized</li>
                  <li>• Must not promote divorce</li>
                  <li>• Disclosure can be waived in writing</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold">Recent Trends</h4>
                <ul className="text-gray-300 text-sm mt-1">
                  <li>• Wake County enforces most agreements</li>
                  <li>• Mecklenburg requires detailed disclosure</li>
                  <li>• Lifestyle clauses generally unenforceable</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Florida Prenup Law</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-bold">Key Requirements</h4>
                <ul className="text-gray-300 text-sm mt-1">
                  <li>• UPAA adopted fully</li>
                  <li>• More prenup-friendly courts</li>
                  <li>• Temporary alimony still possible</li>
                  <li>• Electronic signatures valid</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold">Recent Changes</h4>
                <ul className="text-gray-300 text-sm mt-1">
                  <li>• 2023 alimony reform impacts</li>
                  <li>• Orange County quick enforcement</li>
                  <li>• Cryptocurrency provisions common</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Prenup Timeline & Checklist</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <h3 className="text-xl font-bold text-white mb-4">6 Months Before Wedding</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-blue-400 font-bold">3-6 Months Out</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>☐ Discuss prenup with partner</li>
                <li>☐ Each party consults attorney</li>
                <li>☐ Begin financial documentation</li>
                <li>☐ Outline key concerns/goals</li>
              </ul>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">2-3 Months Out</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>☐ Exchange financial disclosures</li>
                <li>☐ Review first draft</li>
                <li>☐ Begin negotiations</li>
                <li>☐ Discuss with financial advisors</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-green-400 font-bold">30-60 Days Out</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>☐ Finalize agreement terms</li>
                <li>☐ Sign final agreement</li>
                <li>☐ Store in safe place</li>
                <li>☐ Inform estate planner</li>
              </ul>
            </div>
          </div>
          <p className="text-red-400 mt-4">⚠️ Never sign within 2 weeks of wedding!</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Prenuptial Agreement Attorney NC & FL"
      subtitle="Protect Your Assets and Future with Comprehensive Prenups"
      description="Expert prenuptial agreement lawyers in Raleigh, Charlotte, Smithfield & Orlando. Fair agreements that protect both parties."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
