import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expungement Lawyer Raleigh NC | Record Clearing Attorney Charlotte | Criminal Expunction Orlando',
  description: 'Clear your criminal record in Raleigh, Charlotte, Smithfield NC & Orlando FL. Expungement attorneys for arrests, dismissals, convictions. Same-day filing. 919-569-5882',
  keywords: 'expungement lawyer Raleigh NC, expunction attorney Charlotte, record clearing Smithfield, criminal record expungement Orlando, NC expungement eligibility 2025, dismiss charges North Carolina, seal criminal record Florida, mugshot removal attorney, background check clearing lawyer, second chance expungement NC',
  openGraph: {
    title: 'Criminal Record Expungement Attorney | NC & FL Expunction | Vasquez Law',
    description: 'Clear your criminal record. New 2025 NC expungement laws. Former prosecutors helping you start fresh.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ExpungementExpunctionPage() {
  const services = [
    {
      title: 'NC Expungement Eligibility',
      description: 'Expanded 2025 eligibility rules',
      icon: '📋',
      features: [
        'Dismissed charges immediate filing',
        'Not guilty verdicts clearing',
        'Identity theft/mistaken ID',
        'Multiple dismissals allowed',
        'New misdemeanor eligibility',
        'Reduced waiting periods 2025',
      ],
    },
    {
      title: 'Conviction Expungements',
      description: 'Clear eligible convictions',
      icon: '⚖️',
      features: [
        'First offense misdemeanors',
        'Non-violent felony after 10 years',
        'Drug possession convictions',
        'Worthless check charges',
        'Breaking & entering under 18',
        'Gang offense relief 16-17',
      ],
    },
    {
      title: 'FL Record Sealing',
      description: 'Florida sealing and expungement',
      icon: '🔒',
      features: [
        'Withhold adjudication sealing',
        'Arrest record expungement',
        'Juvenile record sealing',
        'Victim of trafficking relief',
        'Lawful self-defense cases',
        'Early termination probation',
      ],
    },
    {
      title: 'Background Check Repair',
      description: 'Clean online presence',
      icon: '🔍',
      features: [
        'Mugshot website removal',
        'Google search cleanup',
        'Employment background fixes',
        'FBI database updates',
        'State repository corrections',
        'Private database disputes',
      ],
    },
    {
      title: 'Professional License Impact',
      description: 'Career protection services',
      icon: '💼',
      features: [
        'Nursing board petitions',
        'Teaching certificate restoration',
        'Real estate license issues',
        'Medical license protection',
        'Bar admission assistance',
        'Federal job clearances',
      ],
    },
    {
      title: 'Immigration Benefits',
      description: 'Clean record for immigration',
      icon: '✈️',
      features: [
        'Citizenship applications',
        'Green card renewals',
        'Visa applications improved',
        'DACA eligibility help',
        'Deportation defense support',
        'Travel restriction removal',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What can be expunged in North Carolina under the 2025 laws?',
      answer: 'NC dramatically expanded expungement eligibility in recent years. Dismissals and not guilty verdicts: immediate, no limit on number. First-time misdemeanors: 5 years wait (was 15). Non-violent felonies: 10 years. Multiple non-violent misdemeanors: 7 years. Traffic offenses excluded. Wake County and Mecklenburg County process faster than rural counties. Check eligibility free at our Raleigh, Charlotte, or Smithfield offices.',
    },
    {
      question: 'How long does expungement take in Raleigh, Charlotte, or Orlando?',
      answer: 'NC expungements: 6-12 months average. Wake County (Raleigh): 6-9 months. Mecklenburg County (Charlotte): 8-10 months. Johnston County (Smithfield): 4-6 months. Florida record sealing: 3-6 months in Orange County (Orlando). Dismissed charges process faster. SBI and FBI background checks required add time. We can expedite for employment needs.',
    },
    {
      question: 'How much does expungement cost in NC and FL?',
      answer: 'Court filing fees: NC charges $175 for expungement petitions. FL charges $75 for sealing/expungement. Additional costs: certified records ($25-50), fingerprinting ($38 NC, $25 FL), notary fees. Some counties waive fees for indigent petitioners. Vasquez Law offers flat-rate expungement services with payment plans available.',
    },
    {
      question: 'Will expungement remove my arrest from Google and mugshot websites?',
      answer: 'Court expungement doesn\'t automatically remove online records. Mugshot websites, news articles, and Google results remain unless separately addressed. We provide comprehensive cleanup: demand letters to websites, DMCA takedown notices, SEO suppression strategies, monitoring services. Most mugshot sites comply within 30 days of expungement order.',
    },
    {
      question: 'Can I get multiple charges expunged in North Carolina?',
      answer: 'Yes, recent NC law changes allow multiple expungements. All dismissals/acquittals: unlimited expungements. Multiple non-violent misdemeanors: can expunge if from same event or within 12-month period. Separate convictions: one felony OR one misdemeanor conviction expungement lifetime (with exceptions). Our attorneys in Raleigh and Charlotte maximize your eligibility.',
    },
    {
      question: 'Do I have to disclose expunged charges to employers in NC or FL?',
      answer: 'Generally no. After expungement, you can legally deny the arrest/charge occurred for most employment. Exceptions: law enforcement positions, working with children/elderly, professional licenses, federal security clearances. NC law protects against discrimination for expunged records. FL allows denial except for specific agencies. Always consult attorney for your situation.',
    },
  ];

  const content = {
    introduction: `A criminal record follows you forever, blocking employment, housing, education, and opportunities - until you take action to clear it. North Carolina's expanded 2025 expungement laws and Florida's sealing statutes offer second chances to move forward. Whether you need to expunge a dismissed charge in Wake County court, clear an old conviction in Charlotte, or seal a record in Orlando, our experienced attorneys navigate the complex expungement process to restore your reputation and future. Don't let past mistakes define your tomorrow when legal relief is available today.`,

    processTitle: 'Expungement Process Timeline',
    process: [
      {
        step: '1',
        title: 'Eligibility Review',
        description: 'Free record analysis and qualification check',
      },
      {
        step: '2',
        title: 'Records Collection',
        description: 'Obtain certified court documents',
      },
      {
        step: '3',
        title: 'Petition Preparation',
        description: 'Draft and notarize legal documents',
      },
      {
        step: '4',
        title: 'Filing & Service',
        description: 'Submit to court and notify agencies',
      },
      {
        step: '5',
        title: 'Order & Cleanup',
        description: 'Obtain order and remove online records',
      },
    ],

    urgencyTitle: '🚀 File Now - Laws May Change',
    urgencyMessage: 'Current expanded eligibility could be reversed. Employers checking records daily. Each day with a record costs opportunities.',

    whyChooseTitle: 'Why Choose Vasquez Law for Expungement',
    whyChoosePoints: [
      'Processed 5,000+ expungements in NC and FL',
      'Same-day eligibility determination',
      'Relationships with DA offices speeds approval',
      'Online record removal included',
      'Multiple office locations for convenience',
      'Bilingual services - Se habla español',
      'Flat fee pricing with payment plans',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">NC Expungement Eligibility Chart (2025 Laws)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Type of Record</th>
                <th className="py-3 px-4">Waiting Period</th>
                <th className="py-3 px-4">Eligibility Requirements</th>
                <th className="py-3 px-4">Limitations</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Dismissed/Not Guilty</td>
                <td className="py-3 px-4">Immediate</td>
                <td className="py-3 px-4">Any age, any charge</td>
                <td className="py-3 px-4">Unlimited number</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Identity Theft/Error</td>
                <td className="py-3 px-4">Immediate</td>
                <td className="py-3 px-4">Mistaken identity proof</td>
                <td className="py-3 px-4">No limitations</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">First Misdemeanor</td>
                <td className="py-3 px-4">5 years</td>
                <td className="py-3 px-4">No felonies, complete sentence</td>
                <td className="py-3 px-4">One conviction only</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Multiple Misdemeanors</td>
                <td className="py-3 px-4">7 years</td>
                <td className="py-3 px-4">Same session/12 months</td>
                <td className="py-3 px-4">Non-violent only</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Non-Violent Felony</td>
                <td className="py-3 px-4">10 years</td>
                <td className="py-3 px-4">No other felonies</td>
                <td className="py-3 px-4">Excludes A-E felonies</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Drug Possession</td>
                <td className="py-3 px-4">Varies</td>
                <td className="py-3 px-4">First offense, treatment</td>
                <td className="py-3 px-4">Not trafficking</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">County-Specific Processing Information</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Wake County (Raleigh)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>📍 Clerk of Court: 316 Fayetteville St</li>
              <li>⏱️ Processing: 6-9 months average</li>
              <li>📞 Records: 919-792-4000</li>
              <li>💡 Tip: File Tuesday-Thursday faster</li>
              <li>📋 Forms available online</li>
              <li>🏛️ DA review required</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Mecklenburg (Charlotte)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>📍 Courthouse: 832 E. 4th Street</li>
              <li>⏱️ Processing: 8-10 months</li>
              <li>📞 Records: 704-686-0400</li>
              <li>💡 Online filing available</li>
              <li>📋 E-filing speeds process</li>
              <li>🏛️ Busiest court in NC</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Orange County (Orlando)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>📍 Courthouse: 425 N. Orange Ave</li>
              <li>⏱️ Processing: 3-6 months</li>
              <li>📞 Records: 407-836-2000</li>
              <li>💡 FDLE approval needed</li>
              <li>📋 Certificate required first</li>
              <li>🏛️ Faster than NC courts</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">What Expungement Can Do For You</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3">✅ Benefits After Expungement</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Pass employment background checks</li>
                <li>• Qualify for professional licenses</li>
                <li>• Rent apartments without denials</li>
                <li>• Get student loans and grants</li>
                <li>• Own firearms (if eligible)</li>
                <li>• Serve on juries</li>
                <li>• Immigration benefits</li>
                <li>• Peace of mind restored</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">❌ Without Expungement</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Job applications rejected</li>
                <li>• Housing applications denied</li>
                <li>• Professional licenses blocked</li>
                <li>• Higher insurance rates</li>
                <li>• Immigration problems</li>
                <li>• Social stigma continues</li>
                <li>• Limited career growth</li>
                <li>• Lifetime consequences</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Online Record Removal Strategy</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <h3 className="text-xl font-bold text-white mb-4">Comprehensive Digital Cleanup</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Search Engine Removal</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Google de-indexing requests</li>
                <li>• Bing/Yahoo removal</li>
                <li>• SEO suppression tactics</li>
                <li>• Right to be forgotten claims</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Website Takedowns</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Mugshot site removal</li>
                <li>• News article updates</li>
                <li>• Social media cleanup</li>
                <li>• Data broker opt-outs</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">⚡ Most sites remove within 30 days of receiving expungement order</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Criminal Record Expungement Attorney NC & FL"
      subtitle="Clear Your Record, Restore Your Future"
      description="Expungement lawyers in Raleigh, Charlotte, Smithfield & Orlando. New 2025 NC laws expand eligibility. Free record review."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
