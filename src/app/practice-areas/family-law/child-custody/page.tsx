import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Child Custody Lawyer Raleigh NC | Charlotte Custody Attorney | Smithfield Family Law',
  description: 'Top-rated child custody attorneys in Raleigh, Charlotte, Smithfield NC & Orlando FL. Emergency custody, modifications, fathers rights. Free consultation 919-569-5882',
  keywords: 'child custody lawyer Raleigh NC, Charlotte custody attorney, Smithfield family lawyer, Orlando child custody, emergency custody NC, fathers rights attorney, joint custody lawyer, visitation rights NC, child custody modification, best custody lawyer near me',
  openGraph: {
    title: 'Child Custody Attorney Raleigh, Charlotte, Smithfield NC | Vasquez Law Firm',
    description: 'Award-winning custody lawyers fighting for parents in NC & FL. Same-day consultations. Se habla español.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ChildCustodyPage() {
  const services = [
    {
      title: 'Emergency Custody Orders',
      description: 'Immediate protection for children at risk',
      icon: '🚨',
      features: [
        'Same-day filing in Wake County',
        'Ex parte orders without notice',
        'Child endangerment situations',
        'Substance abuse concerns',
        'Domestic violence protection',
        '24/7 emergency availability',
      ],
    },
    {
      title: 'Custody Determination',
      description: 'Initial custody and visitation arrangements',
      icon: '⚖️',
      features: [
        'Joint vs sole custody strategy',
        'Best interests analysis NC law',
        'Parenting plan development',
        'Wake & Mecklenburg County courts',
        'Guardian ad litem coordination',
        'Custody evaluations management',
      ],
    },
    {
      title: "Father's Rights Protection",
      description: 'Equal parenting rights for fathers',
      icon: '👨‍👧‍👦',
      features: [
        'Legitimation proceedings NC',
        'Paternity establishment fast',
        'Equal custody time fights',
        'False allegation defense',
        'Military parent protections',
        'Unmarried fathers rights',
      ],
    },
    {
      title: 'Custody Modifications',
      description: 'Changing existing custody orders',
      icon: '🔄',
      features: [
        'Substantial change circumstances',
        'Relocation requests NC to FL',
        'Schedule adjustments post-COVID',
        'Teen preference considerations',
        'School district changes',
        'Work schedule accommodations',
      ],
    },
    {
      title: 'Interstate Custody (UCCJEA)',
      description: 'Multi-state custody jurisdiction',
      icon: '🗺️',
      features: [
        'NC-FL custody disputes',
        'Home state determination',
        'Emergency jurisdiction filing',
        'Registration foreign orders',
        'Parental kidnapping prevention',
        'Hague Convention cases',
      ],
    },
    {
      title: 'High-Conflict Custody',
      description: 'Complex custody litigation',
      icon: '🔥',
      features: [
        'Parental alienation cases',
        'Mental health evaluations',
        'Supervised visitation setup',
        'Drug testing protocols',
        'Custody trial preparation',
        'Appeal representation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do North Carolina courts decide child custody near Raleigh and Charlotte?',
      answer: 'NC courts use "best interests of the child" standard examining: parent-child relationships, stability, mental/physical health, domestic violence history, child preferences (if mature), work schedules, school proximity. Wake County and Mecklenburg County courts favor joint custody when appropriate. Judges in Smithfield, Raleigh, and Charlotte increasingly award 50/50 schedules to involved parents.',
    },
    {
      question: 'What\'s the difference between legal and physical custody in NC?',
      answer: 'Legal custody means decision-making authority for education, healthcare, religion. Physical custody determines where child lives. Most NC courts award joint legal custody but vary on physical. Common schedules: week-on/week-off (50/50), 2-2-5-5, or every other weekend plus midweek. Orange County and Durham County trending toward equal time. Orlando FL courts similar but use "time-sharing" terminology.',
    },
    {
      question: 'How much does a custody lawyer cost in Raleigh, Charlotte, or Smithfield NC?',
      answer: 'While attorney fees vary, custody cases involve court filing fees ($150-200 in NC), mediation costs ($100-300/hour), custody evaluations ($2,500-7,500), and guardian ad litem fees. Total case expenses depend on complexity and conflict level. Vasquez Law offers payment plans and free consultations to discuss your specific situation in our Raleigh, Charlotte, or Smithfield offices.',
    },
    {
      question: 'Can I get emergency custody in Wake County or Mecklenburg County?',
      answer: 'Yes, NC allows ex parte emergency custody orders when child faces immediate danger. Must show: risk of physical harm, sexual abuse, removal from state, or abandonment. Wake County courts hear emergency motions daily. Mecklenburg County has duty judges. We file same-day in Raleigh, Charlotte, and surrounding counties. Temporary order lasts 10 days until full hearing.',
    },
    {
      question: 'Do fathers have equal rights to custody in North Carolina?',
      answer: 'Absolutely. NC law prohibits gender discrimination in custody. Unmarried fathers must establish paternity first. Courts throughout Wake, Mecklenburg, and Johnston Counties increasingly award fathers equal or primary custody when in child\'s best interests. We\'ve won 50/50 custody for fathers in Raleigh, Durham, Charlotte, and Smithfield courts.',
    },
    {
      question: 'Can I move to Florida with my child from North Carolina?',
      answer: 'Relocation requires court approval or other parent\'s consent. NC courts consider: reason for move, impact on child, visitation alternatives, child\'s ties to NC, education quality. Orlando area popular for NC relocations. Courts may allow if: job opportunity, family support, better schools. We handle NC-FL relocations from both states.',
    },
  ];

  const content = {
    introduction: `When your children's future is at stake, you need experienced child custody attorneys who understand North Carolina and Florida family law. Whether you're facing an initial custody determination in Wake County court, fighting for father's rights in Charlotte, or seeking emergency protection in Smithfield, our team provides aggressive representation with compassionate support. We've helped thousands of parents throughout the Triangle, Charlotte metro, and Orlando secure favorable custody arrangements that protect their relationships with their children.`,

    processTitle: 'Child Custody Case Process',
    process: [
      {
        step: '1',
        title: 'Emergency Filing',
        description: 'Same-day custody petitions when needed',
      },
      {
        step: '2',
        title: 'Temporary Orders',
        description: 'Immediate custody pending final hearing',
      },
      {
        step: '3',
        title: 'Mediation',
        description: 'Required in NC counties before trial',
      },
      {
        step: '4',
        title: 'Discovery & Evaluation',
        description: 'Evidence gathering and assessments',
      },
      {
        step: '5',
        title: 'Trial or Settlement',
        description: 'Final custody determination',
      },
    ],

    urgencyTitle: '⚡ Act Fast - Children Can\'t Wait',
    urgencyMessage: 'Every day matters in custody cases. Status quo advantages, school enrollment deadlines, and evidence preservation critical. Free consultation today.',

    whyChooseTitle: 'Why Parents Choose Vasquez Law for Custody',
    whyChoosePoints: [
      'Top-rated family lawyers in Raleigh, Charlotte & Smithfield',
      '5,000+ custody cases won across NC and FL',
      'Former Wake County guardian ad litem on staff',
      'Same-day emergency custody filing available',
      'Fathers rights advocacy leaders in NC',
      'Bilingual team - Se habla español',
      'Payment plans and free consultations',
      'Offices in Raleigh, Charlotte, Smithfield NC & Orlando FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">North Carolina Custody Factors - County Variations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Factor</th>
                <th className="py-3 px-4">Wake County (Raleigh)</th>
                <th className="py-3 px-4">Mecklenburg (Charlotte)</th>
                <th className="py-3 px-4">Johnston (Smithfield)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Mediation Required</td>
                <td className="py-3 px-4">Yes - Custody Mediation Program</td>
                <td className="py-3 px-4">Yes - Mandatory orientation</td>
                <td className="py-3 px-4">Yes - Court mediation</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Average Timeline</td>
                <td className="py-3 px-4">6-9 months to trial</td>
                <td className="py-3 px-4">8-12 months to trial</td>
                <td className="py-3 px-4">4-6 months to trial</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">50/50 Custody Trend</td>
                <td className="py-3 px-4">Increasingly common</td>
                <td className="py-3 px-4">Preferred when feasible</td>
                <td className="py-3 px-4">Growing acceptance</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Guardian ad Litem</td>
                <td className="py-3 px-4">Often appointed</td>
                <td className="py-3 px-4">High-conflict cases</td>
                <td className="py-3 px-4">Upon request</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Popular Custody Schedules in NC & FL</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Equal Time (50/50)</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Week on/Week off - Most simple</li>
              <li>• 2-2-5-5 - Consistent weekdays</li>
              <li>• 2-2-3 - Frequent exchanges</li>
              <li>• 3-4-4-3 - Alternating long weekends</li>
              <li>• Best for: Cooperative parents nearby</li>
              <li>• Courts in Raleigh/Charlotte favor this</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Primary Custody Schedules</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Every other weekend + midweek dinner</li>
              <li>• 1st, 3rd, 5th weekends + Wednesday</li>
              <li>• Extended summer/holiday time</li>
              <li>• Graduated schedules for young children</li>
              <li>• Distance parenting plans</li>
              <li>• Common when parents live far apart</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Emergency Custody Grounds in North Carolina</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Immediate Action Required When:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>⚠️ Physical abuse or neglect</li>
              <li>⚠️ Sexual abuse allegations</li>
              <li>⚠️ Substance abuse affecting parenting</li>
              <li>⚠️ Mental health crisis</li>
              <li>⚠️ Domestic violence in home</li>
            </ul>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>⚠️ Threat to remove child from state</li>
              <li>⚠️ Abandonment or extended absence</li>
              <li>⚠️ Unsafe living conditions</li>
              <li>⚠️ Medical neglect</li>
              <li>⚠️ Criminal activity exposure</li>
            </ul>
          </div>
          <p className="text-yellow-400 mt-4 text-sm">Wake County: File at Family Court, 10th Floor. Mecklenburg: 832 E. 4th Street. Johnston: Smithfield Courthouse.</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Local Resources for Parents</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Raleigh/Wake County</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Wake County Courthouse - 316 Fayetteville St</li>
                <li>• Family Court - 10th Floor</li>
                <li>• Mediation Center - Suite 1004</li>
                <li>• Self-Help Center - Room 1101</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Charlotte/Mecklenburg</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Family Court - 832 E. 4th Street</li>
                <li>• Custody Mediation - Suite 300</li>
                <li>• Self-Service Center - 1st Floor</li>
                <li>• Law Library - Suite 260</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Smithfield/Johnston</h3>
              <ul className="text-gray-400 space-y-1 text-xs">
                <li>• Johnston County Courthouse</li>
                <li>• 207 E. Johnston Street</li>
                <li>• Family Court Division</li>
                <li>• Mediation Services Available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Child Custody Attorney Raleigh, Charlotte & Smithfield NC"
      subtitle="Fighting for Your Children Since 1993"
      description="Top-rated custody lawyers serving Wake, Mecklenburg, Johnston Counties and Orlando FL. Emergency custody, modifications, fathers rights."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
