import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voluntary Departure Attorney | Immigration Court | NC & FL | Vasquez Law',
  description: 'Expert voluntary departure lawyers. Avoid removal order consequences, preserve future immigration options. 919-569-5882',
  keywords: 'voluntary departure attorney, immigration court voluntary departure, avoid deportation order, self-deportation lawyer, removal proceedings attorney, immigration bond, Raleigh voluntary departure, Charlotte immigration court, Orlando removal defense',
  openGraph: {
    title: 'Voluntary Departure Immigration Attorney | Avoid Removal Order | Vasquez Law',
    description: 'Leave the US voluntarily to preserve future immigration options. Expert voluntary departure representation.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function VoluntaryDeparturePage() {
  const services = [
    {
      title: 'Pre-Hearing VD',
      description: 'Before final hearing',
      icon: '✈️',
      features: [
        'No bond requirement',
        '120 days to depart',
        'Withdraw other applications',
        'Admit removability',
        'Concede charges',
        'Immediate grant possible',
      ],
    },
    {
      title: 'Post-Hearing VD',
      description: 'At conclusion of case',
      icon: '⚖️',
      features: [
        'Bond requirement applies',
        '60 days to depart',
        'Good moral character proof',
        'Present for 1+ years',
        'No aggravated felonies',
        'Judge discretion required',
      ],
    },
    {
      title: 'Bond Assistance',
      description: 'Departure bond posting',
      icon: '💰',
      features: [
        'Bond amount negotiation',
        'Payment plan options',
        'Bond company referrals',
        'Breach consequences advice',
        'Refund procedures',
        'Alternative to cash bond',
      ],
    },
    {
      title: 'Travel Preparation',
      description: 'Departure logistics',
      icon: '📋',
      features: [
        'Travel document assistance',
        'Airline ticket coordination',
        'Property disposition',
        'Bank account closure',
        'School records transfer',
        'Medical records collection',
      ],
    },
    {
      title: 'Future Options',
      description: 'Preserving eligibility',
      icon: '🔄',
      features: [
        'Family petition filing',
        'Consular processing prep',
        'Waiver eligibility analysis',
        'Tourist visa possibilities',
        'Work visa options review',
        'No illegal reentry bar',
      ],
    },
    {
      title: 'Compliance Monitoring',
      description: 'Ensuring timely departure',
      icon: '📅',
      features: [
        'Deadline tracking',
        'Extension requests',
        'Departure verification',
        'ICE check-out process',
        'Evidence of departure',
        'Avoiding overstay penalties',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is voluntary departure and why is it better than removal?',
      answer: 'Voluntary departure allows you to leave US at own expense within specified time instead of being deported. Benefits: no formal removal order on record, avoid 10-year bar for removal orders, no criminal penalties for illegal reentry (felony if removed), can apply for visas from abroad, eligible for waivers sooner, maintain dignity of self-departure. Drawbacks: must leave by deadline or face severe consequences, cannot appeal if granted, must pay own travel costs.',
    },
    {
      question: 'What happens if I don\'t leave by the voluntary departure deadline?',
      answer: 'Severe consequences: voluntary departure automatically becomes removal order, subject to 10-year bar from reentry, significant civil penalty fines, ineligible for voluntary departure for 10 years, ineligible for cancellation/adjustment/change of status for 10 years, bond money forfeited if posted, subject to immediate detention and deportation. Never miss deadline - no excuses accepted except extraordinary circumstances like serious illness or disaster.',
    },
    {
      question: 'Can I get voluntary departure with criminal convictions?',
      answer: 'Depends on timing and type of crime. Pre-hearing voluntary departure: more lenient, minor crimes may be OK, judge has discretion. Post-hearing voluntary departure: cannot have aggravated felony, must show good moral character for 5 years, crimes of moral turpitude problematic. Any conviction affects discretion. DUI usually not a bar. Drug crimes very difficult. Domestic violence generally disqualifying. Need rehabilitation evidence if any crimes.',
    },
    {
      question: 'How much time do I get to leave the country?',
      answer: 'Pre-hearing (before merits hearing): up to 120 days, judge can grant less, no bond required. Post-hearing (at conclusion): maximum 60 days, judge often gives less (30-45 common), bond required with minimum amounts set by regulations. Extensions rare - only for exceptional circumstances like serious medical emergency, act of God preventing travel, government travel document delays. Must request before deadline expires. Plan to leave well before deadline.',
    },
    {
      question: 'Can I return to the US after voluntary departure?',
      answer: 'Much easier than after removal order. No automatic bars but: must qualify for visa or other entry, may need waiver if unlawful presence bars apply (3/10 year), criminal issues still affect admissibility, previous immigration violations considered. Options: family-based petitions with consular processing, employment visas if qualified, tourist/business visas possible, student visas for education. Timeline varies but no 10-year removal bar makes huge difference.',
    },
    {
      question: 'Should I accept voluntary departure or fight my case?',
      answer: 'Complex decision depending on: strength of defense case (asylum, cancellation, etc.), family ties and hardship, country conditions you\'d return to, criminal history impact, future immigration possibilities, financial resources for appeals. Accept VD if: weak case with likely loss, have path to return legally, want to preserve options, cannot afford prolonged fight. Fight if: strong case for relief, severe harm if return, no legal way back, willing to risk removal order.',
    },
  ];

  const content = {
    introduction: `When remaining in the United States is no longer possible, voluntary departure offers a dignified alternative to deportation that preserves future immigration opportunities. By choosing to leave voluntarily, you avoid the harsh penalties of a removal order, including criminal prosecution for reentry and the 10-year bar. Our experienced immigration attorneys in Raleigh, Charlotte, Smithfield, and Orlando help clients negotiate favorable voluntary departure terms, ensure compliance with deadlines, and plan for eventual legal return to the United States. This strategic decision can mean the difference between permanent exile and temporary separation from family.`,

    processTitle: 'Voluntary Departure Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Review',
        description: 'Assess qualifications and timing',
      },
      {
        step: '2',
        title: 'Strategic Decision',
        description: 'Compare VD to other options',
      },
      {
        step: '3',
        title: 'Request Filing',
        description: 'Submit to Immigration Judge',
      },
      {
        step: '4',
        title: 'Terms Negotiation',
        description: 'Time period and bond amount',
      },
      {
        step: '5',
        title: 'Departure Compliance',
        description: 'Leave within deadline',
      },
    ],

    urgencyTitle: '⏰ Strict Deadlines - No Second Chances',
    urgencyMessage: 'Missing departure deadline triggers automatic removal order. Severe penalties including 10-year bars. Must plan departure carefully. No extensions except extreme circumstances.',

    whyChooseTitle: 'Why Choose Vasquez Law for Voluntary Departure',
    whyChoosePoints: [
      'Strategic analysis of all options',
      'Favorable terms negotiation',
      'Bond reduction expertise',
      'Travel logistics assistance',
      'Future reentry planning',
      'Bilingual services - Se habla español',
      'Compliance monitoring support',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Voluntary Departure vs. Removal Order Consequences</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Consequence</th>
                <th className="py-3 px-4">Voluntary Departure</th>
                <th className="py-3 px-4">Removal Order</th>
                <th className="py-3 px-4">Impact</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Reentry Bar</td>
                <td className="py-3 px-4">No automatic bar</td>
                <td className="py-3 px-4">5/10/20 year or permanent</td>
                <td className="py-3 px-4">Critical difference</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Illegal Reentry</td>
                <td className="py-3 px-4">Misdemeanor</td>
                <td className="py-3 px-4">Felony (up to 20 years)</td>
                <td className="py-3 px-4">Criminal record</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Future Visas</td>
                <td className="py-3 px-4">Possible</td>
                <td className="py-3 px-4">Very difficult</td>
                <td className="py-3 px-4">Admissibility</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Waiver Eligibility</td>
                <td className="py-3 px-4">Available</td>
                <td className="py-3 px-4">Limited options</td>
                <td className="py-3 px-4">Family unity</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Record</td>
                <td className="py-3 px-4">No removal order</td>
                <td className="py-3 px-4">Permanent record</td>
                <td className="py-3 px-4">Immigration history</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Voluntary Departure Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Pre-Hearing (INA § 240B(a))</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Request before/during master calendar</li>
              <li>✓ Withdraw all applications for relief</li>
              <li>✓ Admit charges in NTA</li>
              <li>✓ Concede removability</li>
              <li>✓ Waive appeal rights</li>
              <li>✓ No bond requirement</li>
              <li>✓ Up to 120 days granted</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Post-Hearing (INA § 240B(b))</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Present for 1+ year</li>
              <li>✓ Good moral character (5 years)</li>
              <li>✓ No aggravated felony</li>
              <li>✓ Not terrorist/security risk</li>
              <li>✓ Post bond (minimum amount required)</li>
              <li>✓ Maximum 60 days to depart</li>
              <li>✓ Judge discretion required</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Departure Planning Checklist</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Essential Steps Before Leaving</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">Legal/Immigration</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>☐ Obtain certified copy of VD order</li>
                <li>☐ Get travel document/passport</li>
                <li>☐ File family petitions if eligible</li>
                <li>☐ Collect immigration records</li>
                <li>☐ Arrange ICE check-out if required</li>
                <li>☐ Document departure date</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">Personal/Financial</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>☐ Purchase airline ticket</li>
                <li>☐ Close bank accounts</li>
                <li>☐ Sell/store property</li>
                <li>☐ Transfer utilities</li>
                <li>☐ Collect medical records</li>
                <li>☐ Get school transcripts</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-400 mt-4">⚠️ Keep proof of timely departure - boarding passes, passport stamps</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Future Return Options After Voluntary Departure</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Pathways Back to the United States</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-white pl-4">
              <h4 className="text-white font-bold">Family-Based Immigration</h4>
              <p className="text-gray-300 text-sm">Immediate relative petitions (spouse, parent of USC over 21), family preference if LPR relative, consular processing required, may need unlawful presence waiver</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-blue-400 font-bold">Employment-Based</h4>
              <p className="text-gray-300 text-sm">H-1B, L-1, O-1 if qualified, employer sponsorship, professional skills required, clean background helps</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-green-400 font-bold">Nonimmigrant Visas</h4>
              <p className="text-gray-300 text-sm">Tourist/business (B-1/B-2), student (F-1), exchange visitor (J-1), must overcome presumption of immigrant intent</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">Waivers if Needed</h4>
              <p className="text-gray-300 text-sm">I-601 for unlawful presence, I-212 if prior order exists, criminal waivers if applicable, extreme hardship to qualifying relative</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Voluntary Departure Attorney"
      subtitle="Leave with Dignity, Preserve Your Future"
      description="Expert attorneys negotiating voluntary departure to avoid removal orders and preserve immigration options."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
