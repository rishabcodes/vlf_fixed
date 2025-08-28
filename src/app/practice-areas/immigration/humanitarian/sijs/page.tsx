import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIJS Attorney | Special Immigrant Juvenile Status | NC & FL | Vasquez Law',
  description: 'Expert SIJS lawyers for abused, abandoned, neglected children. State court orders, green cards for minors. Offices in NC & FL. 919-569-5882',
  keywords: 'SIJS attorney, special immigrant juvenile status lawyer, child green card, juvenile court immigration, abandoned child attorney, abuse neglect lawyer, unaccompanied minor attorney, immigration lawyer Raleigh NC, Charlotte SIJS lawyer, Orlando juvenile immigration',
  openGraph: {
    title: 'Special Immigrant Juvenile Status Attorney | Child Protection | Vasquez Law',
    description: 'Green cards for abused, abandoned, neglected children. State court orders and immigration relief.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function SpecialImmigrantJuvenileStatusPage() {
  const services = [
    {
      title: 'State Court Orders',
      description: 'Predicate findings required',
      icon: '⚖️',
      features: [
        'Custody proceedings',
        'Guardianship petitions',
        'Dependency declarations',
        'Special findings drafting',
        'Best interest determinations',
        'One or both parent findings',
      ],
    },
    {
      title: 'USCIS Petition',
      description: 'I-360 SIJS classification',
      icon: '📋',
      features: [
        'Age-out protection',
        'Consent determination',
        'Evidence compilation',
        'Translation services',
        'RFE responses',
        'Premium processing unavailable',
      ],
    },
    {
      title: 'Green Card Process',
      description: 'Adjustment of status',
      icon: '🎯',
      features: [
        'I-485 application',
        'Work permit included',
        'Travel document available',
        'Biometrics scheduling',
        'Interview preparation',
        'Priority date tracking',
      ],
    },
    {
      title: 'Unaccompanied Minors',
      description: 'Children without parents',
      icon: '👶',
      features: [
        'ORR custody cases',
        'Sponsor assessments',
        'Home studies',
        'Post-release services',
        'School enrollment',
        'Foster care coordination',
      ],
    },
    {
      title: 'Age-Out Protection',
      description: 'Turning 21 issues',
      icon: '⏰',
      features: [
        'File before 21st birthday',
        'CSPA calculations',
        'Priority preservation',
        'Expedite requests',
        'Court continuances',
        'Emergency filings',
      ],
    },
    {
      title: 'Complex Cases',
      description: 'Challenging situations',
      icon: '🔍',
      features: [
        'Criminal history issues',
        'Prior removal orders',
        'Gang allegations defense',
        'Trafficking victims',
        'Mental health needs',
        'Educational advocacy',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the requirements for Special Immigrant Juvenile Status?',
      answer: 'Three requirements: (1) Under 21 and unmarried when filing, (2) State juvenile court order declaring dependent or placing in custody/guardianship with specific findings, (3) Court must find reunification with one or both parents not viable due to abuse, abandonment, neglect, or similar basis under state law. Court must also find not in best interest to return to home country. Cannot be in federal custody. Must be present in US.',
    },
    {
      question: 'How long does the SIJS process take in 2025?',
      answer: 'State court: 2-6 months depending on county (Wake County 3-4 months, Mecklenburg 2-3 months, Orange County FL 4-5 months). I-360 SIJS petition: 6-12 months. Green card wait varies by country - Mexico/El Salvador/Guatemala/Honduras currently 2-3 years due to per-country limits. Other countries immediate. Total process: 3-4 years for backlogged countries, 18 months for others. Work permit available during wait.',
    },
    {
      question: 'Can I apply for SIJS if I\'m over 18?',
      answer: 'Yes, can apply until 21st birthday. Must obtain state court order before turning 21 - cannot age out once order issued. Some states limit juvenile court jurisdiction at 18, but NC allows up to 21 for certain proceedings. FL similar. May need guardianship instead of custody if over 18. Critical to file quickly as process takes months. Once I-360 filed before 21, protected from aging out.',
    },
    {
      question: 'What happens to my parents if I get SIJS?',
      answer: 'SIJS recipients can NEVER petition for parents - permanent bar even after becoming US citizen. Can petition for siblings and children only. Parents may have separate immigration options: their own asylum claim, U visa if crime victim, cancellation of removal if in proceedings, family petition through another child or relative. This limitation is the trade-off for SIJS benefits.',
    },
    {
      question: 'Do I need a lawyer for state court and immigration?',
      answer: 'Highly recommended to have both family law attorney for state court and immigration attorney for SIJS. Some attorneys handle both. State court must include specific language for immigration - regular custody orders insufficient. Immigration attorney ensures proper findings, files I-360 and adjustment. Vasquez Law coordinates both proceedings or works with your family attorney.',
    },
    {
      question: 'What if I have a criminal record or gang allegations?',
      answer: 'Juvenile delinquency usually not a bar unless tried as adult. Adult criminal convictions may disqualify depending on offense. Gang allegations increasingly scrutinized - need strong evidence to overcome. School disciplinary records reviewed. Social media checked. Drug use can be issue. Full disclosure to attorney essential. May need rehabilitation evidence, psychological evaluations, character letters.',
    },
  ];

  const content = {
    introduction: `Special Immigrant Juvenile Status provides a path to permanent residence for children who have been abused, abandoned, or neglected by one or both parents. This unique immigration relief requires coordination between state juvenile courts and federal immigration authorities. Our experienced SIJS attorneys in Raleigh, Charlotte, Smithfield, and Orlando guide vulnerable youth through both the state court proceedings and USCIS petitions. We understand the trauma these children have endured and work compassionately to secure their future in the United States. Time is critical - eligibility ends at age 21, and the process requires careful navigation of both family and immigration law.`,

    processTitle: 'SIJS Process Steps',
    process: [
      {
        step: '1',
        title: 'State Court Order',
        description: 'Obtain predicate findings',
      },
      {
        step: '2',
        title: 'I-360 Petition',
        description: 'File for SIJS classification',
      },
      {
        step: '3',
        title: 'USCIS Decision',
        description: 'Await approval',
      },
      {
        step: '4',
        title: 'Priority Date',
        description: 'Wait for visa availability',
      },
      {
        step: '5',
        title: 'Green Card',
        description: 'Adjust status or consular process',
      },
    ],

    urgencyTitle: '⏰ File Before 21st Birthday - No Extensions',
    urgencyMessage: 'Age-out is permanent disqualification. State court proceedings take months. Evidence gathering time-consuming. School records needed.',

    whyChooseTitle: 'Why Choose Vasquez Law for SIJS',
    whyChoosePoints: [
      'Dual expertise in family and immigration law',
      'Relationships with juvenile court judges',
      'Trauma-informed representation',
      'School advocacy included',
      'Bilingual services - Se habla español',
      'Foster care system experience',
      'Unaccompanied minor specialists',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">State Court Requirements by Jurisdiction</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">County/State</th>
                <th className="py-3 px-4">Age Limit</th>
                <th className="py-3 px-4">Court Type</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Special Requirements</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Wake County, NC</td>
                <td className="py-3 px-4">Up to 21</td>
                <td className="py-3 px-4">District Court</td>
                <td className="py-3 px-4">3-4 months</td>
                <td className="py-3 px-4">GAL often appointed</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Mecklenburg, NC</td>
                <td className="py-3 px-4">Up to 21</td>
                <td className="py-3 px-4">Family Court</td>
                <td className="py-3 px-4">2-3 months</td>
                <td className="py-3 px-4">Mediation required</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Orange County, FL</td>
                <td className="py-3 px-4">Up to 21</td>
                <td className="py-3 px-4">Circuit Court</td>
                <td className="py-3 px-4">4-5 months</td>
                <td className="py-3 px-4">Detailed findings</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Johnston, NC</td>
                <td className="py-3 px-4">Up to 21</td>
                <td className="py-3 px-4">District Court</td>
                <td className="py-3 px-4">3-4 months</td>
                <td className="py-3 px-4">Rural delays common</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Required State Court Findings</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Dependency/Custody Finding</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Declared dependent on juvenile court</li>
              <li>✓ OR legally committed to state agency</li>
              <li>✓ OR placed under custody of individual/entity</li>
              <li>✓ Must be court-appointed</li>
              <li>✓ Can be relative or non-relative</li>
              <li>✓ Guardianship qualifies</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Parental Reunification Finding</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Not viable with 1 or both parents</li>
              <li>✓ Due to abuse, abandonment, neglect</li>
              <li>✓ Or similar basis under state law</li>
              <li>✓ Not in best interest to return to country</li>
              <li>✓ Specific factual basis required</li>
              <li>✓ Cannot be conclusory statements</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">SIJS Green Card Wait Times (2025)</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Visa Bulletin Priority Dates</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-red-400 font-bold mb-2">Backlogged Countries</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>🇲🇽 Mexico: June 2022 (3-year wait)</li>
                <li>🇸🇻 El Salvador: June 2022</li>
                <li>🇬🇹 Guatemala: June 2022</li>
                <li>🇭🇳 Honduras: June 2022</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Current Countries</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ All other countries: Current</li>
                <li>✓ Immediate green card available</li>
                <li>✓ Including: Venezuela, Colombia</li>
                <li>✓ Brazil, Haiti, Nicaragua, etc.</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ Work permits available while waiting for green card</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common SIJS Challenges & Solutions</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Overcoming Obstacles</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-white pl-4">
              <h4 className="text-white font-bold">One Parent Abuse/Abandonment</h4>
              <p className="text-gray-300 text-sm">Only need finding as to one parent. Other parent can support petition. Common in domestic violence cases.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">Parents Outside US</h4>
              <p className="text-gray-300 text-sm">Can still qualify. Need evidence of abandonment: no support, no contact, left with relatives.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-blue-400 font-bold">Prior Immigration Violations</h4>
              <p className="text-gray-300 text-sm">SIJS waives many grounds of inadmissibility including unlawful presence, entries without inspection.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Special Immigrant Juvenile Status Attorney"
      subtitle="Green Cards for Abused, Abandoned & Neglected Children"
      description="Expert SIJS lawyers securing protection for vulnerable youth through state court and immigration proceedings."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
