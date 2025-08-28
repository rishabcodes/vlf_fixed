import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alimony Attorney Raleigh NC | Spousal Support Lawyer Charlotte | Orlando Alimony',
  description: 'Expert alimony lawyers in Raleigh, Charlotte, Smithfield NC & Orlando FL. Get or defend spousal support. Modifications, enforcement. Free consultation 919-569-5882',
  keywords: 'alimony attorney Raleigh NC, spousal support lawyer Charlotte, alimony calculator North Carolina, Orlando alimony lawyer, post separation support NC, permanent alimony attorney, alimony modification lawyer, spousal support enforcement, temporary alimony Wake County, alimony tax changes 2025',
  openGraph: {
    title: 'Alimony & Spousal Support Attorney | NC & FL Family Law | Vasquez Law',
    description: 'Fighting for fair alimony awards and defending against unfair demands. Experienced spousal support attorneys.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function AlimonySpousalSupportPage() {
  const services = [
    {
      title: 'Post-Separation Support',
      description: 'Temporary support during separation',
      icon: '⏰',
      features: [
        'Immediate financial relief',
        'Emergency motion filing',
        'Retroactive to filing date',
        'Covers basic living expenses',
        'Health insurance continuation',
        'Attorney fee advances',
      ],
    },
    {
      title: 'Permanent Alimony',
      description: 'Long-term spousal support',
      icon: '💰',
      features: [
        'Duration based on marriage length',
        'Standard of living analysis',
        'Earning capacity evaluation',
        'Tax implications planning',
        'Lump sum vs periodic',
        'Security for payments',
      ],
    },
    {
      title: 'Alimony Modifications',
      description: 'Change existing orders',
      icon: '🔄',
      features: [
        'Job loss or income change',
        'Retirement modifications',
        'Cohabitation termination',
        'Remarriage termination',
        'Health/disability changes',
        'Cost of living adjustments',
      ],
    },
    {
      title: 'Alimony Defense',
      description: 'Fight unfair demands',
      icon: '🛡️',
      features: [
        'Marital misconduct defense',
        'Income/expense challenges',
        'Imputation of income',
        'Lifestyle analysis',
        'Asset dissipation claims',
        'Duration limitations',
      ],
    },
    {
      title: 'Enforcement Actions',
      description: 'Collect unpaid support',
      icon: '⚖️',
      features: [
        'Contempt proceedings',
        'Wage garnishment',
        'Asset attachment',
        'License suspension',
        'Credit bureau reporting',
        'Interstate enforcement',
      ],
    },
    {
      title: 'High-Asset Alimony',
      description: 'Complex financial cases',
      icon: '💎',
      features: [
        'Business valuation issues',
        'Stock options/RSUs',
        'Deferred compensation',
        'Trust income analysis',
        'Lifestyle documentation',
        'Forensic accounting',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How is alimony calculated in North Carolina vs Florida?',
      answer: 'NC has no formula - judges consider 16 factors including marriage length, income, contributions, misconduct. Typical range: 1/3 to 1/2 length of marriage. Wake and Mecklenburg Counties tend toward longer durations. FL uses guidelines: short marriage (<7 years) rarely gets alimony, moderate (7-17) may get up to duration, long (17+) may get permanent. Both states ended tax deduction for payer in 2019.',
    },
    {
      question: 'What disqualifies you from receiving alimony in NC?',
      answer: 'Illicit sexual behavior (adultery) bars alimony unless dependent spouse proves supporting spouse also committed it. Other marital misconduct affects amount, not eligibility. Cohabitation post-separation terminates alimony. Remarriage automatically ends it. FL doesn\'t bar for adultery but considers it. Drug/alcohol abuse, domestic violence, financial misconduct all impact awards in both states.',
    },
    {
      question: 'How long does alimony last in Raleigh, Charlotte, and Orlando?',
      answer: 'NC courts typically award: Short marriage (under 10 years): 1-5 years alimony. Medium (10-20 years): 5-10 years or half marriage length. Long (20+ years): May be indefinite/lifetime. Wake County averages 1/3 marriage duration. Mecklenburg slightly longer. Orlando follows FL law: rarely exceeds marriage length unless exceptional circumstances. Permanent alimony harder to get post-2023 FL reforms.',
    },
    {
      question: 'Can alimony be modified after divorce in NC and FL?',
      answer: 'Yes, if substantial change in circumstances. Common grounds: involuntary job loss (15%+ income drop), retirement at normal age, recipient cohabitation, serious illness/disability, remarriage (automatic termination). Cannot modify due to voluntary income reduction. NC requires showing changed circumstances unforeseen at time of order. FL similar but recent reforms make modifications easier for payors.',
    },
    {
      question: 'How much alimony will I pay/receive per month?',
      answer: 'Varies greatly based on individual circumstances. General approach: NC dependent spouse needs minus income = shortfall. Payor contributes 1/3 to 1/2 of shortfall typically. High earners in Charlotte banking or Raleigh tech may pay substantial monthly amounts. FL uses similar analysis. Courts ensure payor retains reasonable living standard while meeting dependent spouse needs.',
    },
    {
      question: 'What happens if my ex stops paying alimony?',
      answer: 'File motion for contempt immediately. NC courts can: garnish wages (substantial percentage allowed), seize bank accounts, attach property, suspend driver/professional licenses, report to credit bureaus, jail for willful contempt. Interest accrues on arrears. FL similar remedies plus can intercept tax refunds. Interstate enforcement available through UIFSA. Never agree to informal payment changes - get court orders.',
    },
  ];

  const content = {
    introduction: `Alimony can make or break your financial future after divorce. Whether you're seeking support to maintain your standard of living or defending against excessive demands, the stakes are high and the law is complex. Our experienced alimony attorneys in Raleigh, Charlotte, Smithfield, and Orlando understand both sides of spousal support cases. We fight aggressively to secure fair alimony awards for dependent spouses while protecting supporting spouses from unreasonable obligations. With deep knowledge of North Carolina's 16-factor test and Florida's reformed alimony laws, we craft strategies that protect your financial interests for years to come.`,

    processTitle: 'Alimony Case Process',
    process: [
      {
        step: '1',
        title: 'Financial Analysis',
        description: 'Document income, expenses, lifestyle',
      },
      {
        step: '2',
        title: 'Temporary Support',
        description: 'Secure immediate relief if needed',
      },
      {
        step: '3',
        title: 'Discovery & Valuation',
        description: 'Uncover all assets and income',
      },
      {
        step: '4',
        title: 'Negotiation',
        description: 'Settle terms outside court',
      },
      {
        step: '5',
        title: 'Trial or Agreement',
        description: 'Finalize alimony arrangement',
      },
    ],

    urgencyTitle: '💸 Act Now - Timing Affects Amount',
    urgencyMessage: 'Separation date locks in claims. Evidence disappears. Temporary support needed immediately. Tax implications change yearly.',

    whyChooseTitle: 'Why Choose Vasquez Law for Alimony Cases',
    whyChoosePoints: [
      'Certified family law specialists',
      'Forensic accountants on team',
      'Both payor and recipient representation',
      'Complex income analysis expertise',
      'Modification and enforcement success',
      'Aggressive negotiators and trial lawyers',
      'Payment plans for legal fees',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Alimony Factors - What Judges Consider</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Financial Factors</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Earnings and earning capacity</li>
              <li>✓ Ages and health conditions</li>
              <li>✓ Sources of income</li>
              <li>✓ Duration of marriage</li>
              <li>✓ Standard of living</li>
              <li>✓ Assets and debts</li>
              <li>✓ Property brought to marriage</li>
              <li>✓ Contribution to other's education</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Non-Financial Factors</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Marital misconduct</li>
              <li>✓ Homemaker contributions</li>
              <li>✓ Education levels</li>
              <li>✓ Custody of minor children</li>
              <li>✓ Tax consequences</li>
              <li>✓ Federal benefits impact</li>
              <li>✓ Any other relevant factor</li>
              <li>✓ Relative needs</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Alimony Duration Guidelines by County</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Marriage Length</th>
                <th className="py-3 px-4">Wake County (Raleigh)</th>
                <th className="py-3 px-4">Mecklenburg (Charlotte)</th>
                <th className="py-3 px-4">Orange County (Orlando)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">0-7 years</td>
                <td className="py-3 px-4">1-3 years typical</td>
                <td className="py-3 px-4">2-4 years typical</td>
                <td className="py-3 px-4">Rarely awarded</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">7-17 years</td>
                <td className="py-3 px-4">1/3 to 1/2 duration</td>
                <td className="py-3 px-4">1/2 duration common</td>
                <td className="py-3 px-4">Up to full duration</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">17-25 years</td>
                <td className="py-3 px-4">1/2 to indefinite</td>
                <td className="py-3 px-4">Often indefinite</td>
                <td className="py-3 px-4">Full duration likely</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">25+ years</td>
                <td className="py-3 px-4">Usually permanent</td>
                <td className="py-3 px-4">Permanent common</td>
                <td className="py-3 px-4">May be permanent</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Guidelines only - judges have discretion based on specific circumstances</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Monthly Alimony Calculator Estimate</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Rough Calculation Method (NC & FL)</h3>
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded">
              <h4 className="text-green-400 font-bold mb-2">Step 1: Calculate Need</h4>
              <p className="text-gray-300 text-sm">Reasonable monthly expenses - Dependent's income = Monthly need</p>
              <p className="text-gray-400 text-xs mt-1">Calculate actual financial need based on lifestyle</p>
            </div>
            <div className="bg-black/30 p-4 rounded">
              <h4 className="text-blue-400 font-bold mb-2">Step 2: Calculate Ability</h4>
              <p className="text-gray-300 text-sm">Payor's income - Payor's reasonable expenses = Ability to pay</p>
              <p className="text-gray-400 text-xs mt-1">Determine realistic payment capacity</p>
            </div>
            <div className="bg-black/30 p-4 rounded">
              <h4 className="text-yellow-400 font-bold mb-2">Step 3: Determine Award</h4>
              <p className="text-gray-300 text-sm">Typically 30-40% of difference or 1/3 to 1/2 of need</p>
              <p className="text-gray-400 text-xs mt-1">Final award depends on specific circumstances</p>
            </div>
          </div>
          <p className="text-red-400 mt-4 text-sm">⚠️ Actual awards vary significantly - consult attorney for accurate assessment</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Marital Misconduct Impact on Alimony</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">How Bad Behavior Affects Support</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">North Carolina</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>🚫 Adultery = Absolute bar to alimony</li>
                <li>⚠️ Abandonment = Reduces/eliminates</li>
                <li>⚠️ Cruel treatment = Increases award</li>
                <li>⚠️ Financial misconduct = Major factor</li>
                <li>⚠️ Substance abuse = Considered</li>
                <li>✓ Both parties' conduct matters</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Florida</h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>⚠️ Adultery = May reduce/deny</li>
                <li>⚠️ Economic impact considered</li>
                <li>⚠️ Depletion of assets = Factor</li>
                <li>⚠️ Domestic violence = Increases</li>
                <li>⚠️ Not absolute bar like NC</li>
                <li>✓ Overall fairness standard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Tax Changes & Alimony (2019-2025)</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <h3 className="text-xl font-bold text-white mb-4">Critical Tax Law Changes</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">Post-2018 Divorces</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>• Payor CANNOT deduct alimony payments</li>
                <li>• Recipient does NOT report as income</li>
                <li>• Dramatically affects negotiation amounts</li>
                <li>• Consider larger property division instead</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-green-400 font-bold">Pre-2019 Divorces</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>• Old rules still apply (deductible/taxable)</li>
                <li>• Modifications keep old tax treatment</li>
                <li>• Unless modification states otherwise</li>
                <li>• Strategic planning opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Alimony & Spousal Support Attorney NC & FL"
      subtitle="Fighting for Fair Support Awards and Defending Against Excessive Demands"
      description="Expert alimony lawyers in Raleigh, Charlotte, Smithfield & Orlando. Securing support for dependent spouses, protecting payors from unfair obligations."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
