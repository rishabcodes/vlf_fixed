import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Division Lawyer Raleigh NC | Asset Division Attorney Charlotte | Equitable Distribution Orlando',
  description: 'Expert property division attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. Complex asset division, business valuation, debt allocation. 919-569-5882',
  keywords: 'property division lawyer Raleigh NC, equitable distribution attorney Charlotte, asset division Smithfield, marital property lawyer Orlando, business valuation divorce, retirement division QDRO, debt division attorney, separate property claims, hidden assets investigator, high net worth divorce NC',
  openGraph: {
    title: 'Property Division & Equitable Distribution Attorney | NC & FL Divorce | Vasquez Law',
    description: 'Protecting your assets in divorce. Business valuations, retirement division, complex property disputes.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function EquitableDistributionPropertyDebtDivisionPage() {
  const services = [
    {
      title: 'Asset Identification',
      description: 'Find and value all property',
      icon: '🔍',
      features: [
        'Marital vs separate property',
        'Hidden asset discovery',
        'Financial account tracing',
        'Business interest valuation',
        'Real estate appraisals',
        'Personal property inventory',
      ],
    },
    {
      title: 'Business Division',
      description: 'Complex business interests',
      icon: '🏢',
      features: [
        'Business valuation experts',
        'Buy-out negotiations',
        'Partnership interests',
        'Professional practices',
        'Stock options/RSUs',
        'Deferred compensation',
      ],
    },
    {
      title: 'Retirement Division',
      description: 'Pension and 401k splitting',
      icon: '💰',
      features: [
        'QDRO preparation',
        '401k/403b division',
        'Pension valuation',
        'Military retirement',
        'Government benefits',
        'Social Security planning',
      ],
    },
    {
      title: 'Real Estate Division',
      description: 'Homes and property',
      icon: '🏠',
      features: [
        'Marital home options',
        'Refinancing coordination',
        'Rental property division',
        'Vacation homes',
        'Investment properties',
        'Mortgage responsibility',
      ],
    },
    {
      title: 'Debt Allocation',
      description: 'Fair debt distribution',
      icon: '📊',
      features: [
        'Credit card division',
        'Mortgage assignments',
        'Student loan allocation',
        'Business debt separation',
        'Tax liability division',
        'Indemnification clauses',
      ],
    },
    {
      title: 'High Asset Division',
      description: 'Complex wealth cases',
      icon: '💎',
      features: [
        'Investment portfolios',
        'Trust interests',
        'Cryptocurrency assets',
        'Art/collectibles valuation',
        'International assets',
        'Tax optimization strategies',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How is property divided in North Carolina vs Florida divorces?',
      answer: 'NC uses "equitable distribution" - fair but not necessarily equal. Courts start with 50/50 presumption but adjust based on factors like misconduct, contributions, economic circumstances. FL also uses equitable distribution with similar 50/50 starting point. Both states divide only marital property (acquired during marriage), not separate property (pre-marital, inherited, gifted). Wake and Mecklenburg Counties tend toward equal division absent compelling factors.',
    },
    {
      question: 'What counts as marital vs separate property?',
      answer: 'Marital property: Everything acquired during marriage regardless of title - homes, cars, retirement earned during marriage, businesses started, debts incurred. Separate property: Pre-marital assets, inheritances, gifts to one spouse, personal injury awards. Complications: commingling (mixing separate with marital), appreciation of separate property, improvements using marital funds. Tracing source of funds critical.',
    },
    {
      question: 'How are retirement accounts divided in divorce?',
      answer: 'Retirement earned during marriage is marital property. Division requires Qualified Domestic Relations Order (QDRO) for 401k/403b/pensions. Process: Calculate marital portion (time married/total service), value account, draft QDRO, plan administrator approval, court entry. Military retirement special rules. Social Security not divided but considered. NC and FL follow "time rule" formula. Mistakes can cost thousands - proper QDRO essential.',
    },
    {
      question: 'What happens to the marital home in Raleigh, Charlotte, or Orlando divorces?',
      answer: 'Three main options: (1) Sell and split proceeds - most common, clean break. (2) One spouse keeps, buys out other\'s equity - requires refinancing to remove other from mortgage. (3) Continued co-ownership - rare, usually temporary for children\'s stability. Courts consider: children\'s needs, ability to maintain, mortgage qualification, other assets available. Wake County courts often order immediate sale in high-conflict cases.',
    },
    {
      question: 'How is debt divided in divorce?',
      answer: 'Debts incurred during marriage are marital regardless of whose name. Courts allocate based on: who benefited, ability to pay, asset distribution, fault (in NC). Credit cards, mortgages, car loans, student loans all divided. Warning: Creditors not bound by divorce decree - if spouse doesn\'t pay joint debt, creditor can pursue you. Indemnification clauses and refinancing protect. Bankruptcy implications considered.',
    },
    {
      question: 'Can I protect my business from division in divorce?',
      answer: 'Depends on timing and structure. If started before marriage and kept separate - may be separate property but appreciation during marriage may be marital. If started during marriage - presumed marital. Protection strategies: prenuptial agreements (before marriage), buy-sell agreements, keeping spouse uninvolved, maintaining separate accounts. Valuation fights common. NC and FL courts can award business to operator spouse with buyout to other.',
    },
  ];

  const content = {
    introduction: `Property division often determines your financial future after divorce. North Carolina and Florida follow equitable distribution laws, dividing marital assets and debts fairly - but not always equally. From the family home to retirement accounts, business interests to hidden assets, every dollar matters. Our experienced property division attorneys in Raleigh, Charlotte, Smithfield, and Orlando fight to protect what you've earned and ensure you receive your fair share. We combine aggressive advocacy with sophisticated financial analysis, working with forensic accountants, business valuators, and other experts to uncover assets and maximize your settlement.`,

    processTitle: 'Property Division Process',
    process: [
      {
        step: '1',
        title: 'Asset Discovery',
        description: 'Identify all property and debts',
      },
      {
        step: '2',
        title: 'Classification',
        description: 'Determine marital vs separate',
      },
      {
        step: '3',
        title: 'Valuation',
        description: 'Professional appraisals and analysis',
      },
      {
        step: '4',
        title: 'Negotiation',
        description: 'Propose fair distribution',
      },
      {
        step: '5',
        title: 'Implementation',
        description: 'Transfer titles and accounts',
      },
    ],

    urgencyTitle: '💰 Protect Assets Now',
    urgencyMessage: 'Assets can disappear. Values change daily. Separation date locks claims. Evidence preservation critical.',

    whyChooseTitle: 'Why Choose Vasquez Law for Property Division',
    whyChoosePoints: [
      'Forensic accountants on team',
      'Business valuation expertise',
      'Hidden asset investigators',
      'QDRO specialists for retirement',
      'Real estate professionals network',
      'Complex financial analysis',
      'Aggressive negotiators',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Property Division Factors</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Equal Division Factors</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Income and property brought to marriage</li>
              <li>• Duration of marriage</li>
              <li>• Age and health of parties</li>
              <li>• Contributions to marital property</li>
              <li>• Direct contributions to education</li>
              <li>• Earning capacity of each party</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Unequal Division Factors</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Marital misconduct/waste</li>
              <li>• Economic misconduct</li>
              <li>• Custody of children</li>
              <li>• Tax consequences</li>
              <li>• Liquidity of assets</li>
              <li>• Any other just factor</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Asset Values in NC & FL Divorces</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Asset Type</th>
                <th className="py-3 px-4">Valuation Method</th>
                <th className="py-3 px-4">Division Approach</th>
                <th className="py-3 px-4">Common Issues</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Marital Home</td>
                <td className="py-3 px-4">Appraisal/CMA</td>
                <td className="py-3 px-4">Sale or buyout</td>
                <td className="py-3 px-4">Mortgage qualification</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">401k/IRA</td>
                <td className="py-3 px-4">Current balance</td>
                <td className="py-3 px-4">QDRO division</td>
                <td className="py-3 px-4">Tax implications</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Business</td>
                <td className="py-3 px-4">Expert valuation</td>
                <td className="py-3 px-4">Buyout typical</td>
                <td className="py-3 px-4">Value disputes</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Vehicles</td>
                <td className="py-3 px-4">KBB/NADA</td>
                <td className="py-3 px-4">Each keeps one</td>
                <td className="py-3 px-4">Loan balances</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Stock Options</td>
                <td className="py-3 px-4">Black-Scholes</td>
                <td className="py-3 px-4">Formula division</td>
                <td className="py-3 px-4">Vesting schedules</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Protecting Your Assets - Strategic Tips</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">DO Immediately</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>✓ Inventory all assets/debts</li>
                <li>✓ Get account statements</li>
                <li>✓ Photograph valuables</li>
                <li>✓ Copy tax returns (3 years)</li>
                <li>✓ Secure separate property docs</li>
                <li>✓ Open individual accounts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">DON'T Do</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>✗ Hide or transfer assets</li>
                <li>✗ Destroy financial records</li>
                <li>✗ Max out credit cards</li>
                <li>✗ Empty joint accounts</li>
                <li>✗ Sell property without agreement</li>
                <li>✗ Change beneficiaries yet</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Property Division & Equitable Distribution Attorney NC & FL"
      subtitle="Protecting Your Financial Future in Divorce"
      description="Expert asset division lawyers in Raleigh, Charlotte, Smithfield & Orlando. Complex property disputes, business valuations, retirement division."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
