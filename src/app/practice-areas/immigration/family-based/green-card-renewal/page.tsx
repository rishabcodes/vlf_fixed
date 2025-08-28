import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green Card Renewal Attorney | I-90 Replacement | NC & FL | Vasquez Law',
  description: 'Expert green card renewal and replacement lawyers. I-90 filing, expired cards, lost cards, name changes. Same-day filing. 919-569-5882',
  keywords: 'green card renewal attorney, I-90 application lawyer, expired green card, lost green card replacement, permanent resident card renewal, green card name change, 10 year renewal, immigration attorney Raleigh NC, Charlotte green card lawyer, Orlando I-90 attorney',
  openGraph: {
    title: 'Green Card Renewal & Replacement Attorney | I-90 Filing | Vasquez Law',
    description: 'Renew or replace your green card quickly. Expert I-90 preparation, biometrics scheduling, expedite requests.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function GreenCardRenewalPage() {
  const services = [
    {
      title: '10-Year Renewal',
      description: 'Standard expiration renewal',
      icon: '📅',
      features: [
        'I-90 online filing',
        'Biometrics scheduling',
        'Document preparation',
        'Status tracking',
        'Card production updates',
        'Travel document coordination',
      ],
    },
    {
      title: 'Lost/Stolen Card',
      description: 'Emergency replacement',
      icon: '🚨',
      features: [
        'Police report assistance',
        'Expedite request filing',
        'I-131A boarding foil',
        'Embassy coordination abroad',
        'Temporary evidence letter',
        'Same-day filing available',
      ],
    },
    {
      title: 'Name/Info Changes',
      description: 'Update card information',
      icon: '✏️',
      features: [
        'Marriage name change',
        'Divorce name restoration',
        'Court-ordered changes',
        'Gender marker updates',
        'DOB corrections',
        'Supporting documentation',
      ],
    },
    {
      title: 'Damaged Card',
      description: 'Replace unusable cards',
      icon: '🔧',
      features: [
        'Wear and tear replacement',
        'Chip malfunction issues',
        'Lamination damage',
        'Photo deterioration',
        'Unreadable text',
        'TSA rejection problems',
      ],
    },
    {
      title: '14-Year Card',
      description: 'Child turning 14',
      icon: '🎂',
      features: [
        'Automatic expiration',
        'New photo required',
        'Fingerprint enrollment',
        'School documentation',
        'Parental consent forms',
        'ID establishment',
      ],
    },
    {
      title: 'Travel Emergency',
      description: 'Urgent travel needs',
      icon: '✈️',
      features: [
        'I-131 re-entry permit',
        'Expedite processing',
        'Appointment scheduling',
        'Airline carrier letters',
        'Embassy assistance',
        '24-hour turnaround',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does green card renewal take in 2025?',
      answer: 'Current processing: 8-12 months standard, 4-6 months with biometrics reuse. USCIS Charlotte Field Office: 10-14 months. Raleigh: 9-12 months. Orlando: 8-11 months. Expedite available for emergencies: 2-4 weeks with proof of urgent travel, medical emergency, or severe financial loss. Can travel internationally with expired card + I-90 receipt for up to 12 months. Check case status online with receipt number.',
    },
    {
      question: 'When should I renew my green card?',
      answer: 'File I-90 within 6 months of expiration date. Card expires every 10 years for adults. Children who received cards before age 14 must renew within 30 days of 14th birthday. Conditional residents (2-year cards) cannot use I-90 - must file I-751 or I-829. Never let card expire if planning international travel. Expired card still proves permanent resident status but causes problems with employment, travel, licenses.',
    },
    {
      question: 'What documents do I need for green card renewal?',
      answer: 'Required: Copy of current/expired green card (front and back), government-issued ID, two passport photos. If applicable: marriage certificate for name change, court order for legal name change, police report if stolen, birth certificate for DOB corrections. Biometrics appointment required unless reused from prior application. No need to prove continued eligibility - status remains valid even with expired card.',
    },
    {
      question: 'Can I travel with an expired green card?',
      answer: 'Returning to US: Yes, if expired less than 12 months, bring I-90 receipt notice. Airlines may refuse boarding without valid card - get I-131A boarding foil from embassy. Leaving US: No legal requirement for valid card to exit, but destination country may require it. Best practice: File I-90 before traveling, carry receipt. For trips over 6 months, consider re-entry permit. Never stay outside US more than 180 days.',
    },
    {
      question: 'How much does green card renewal cost in 2025?',
      answer: 'USCIS fees: I-90 filing fee $540 + biometrics $85 = $625 total. Fee waivers available for low income. No fee if: USCIS error on card, card never received, automatic 14-year renewal. Additional costs: passport photos $15-30, mailing $20-50. Expedite service free but requires valid reason. Payment by check, money order, or credit card online. Fees increased January 2025.',
    },
    {
      question: 'What if my green card renewal is denied?',
      answer: 'Rare but possible reasons: abandonment of residence (outside US over 1 year), criminal convictions triggering removability, fraud in obtaining original card. If denied: receive written notice with reason, may file motion to reopen/reconsider within 30 days, consult attorney immediately as may face removal proceedings. Card errors: USCIS fixes free if their mistake. Most denials are for incomplete applications - respond to RFE quickly.',
    },
  ];

  const content = {
    introduction: `Your green card is essential for employment, travel, and proving your permanent resident status. Whether your card is expiring, lost, damaged, or needs updating, our experienced immigration attorneys ensure quick and accurate renewal or replacement. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we provide same-day filing services and expedite requests for urgent situations. Don't let an expired or missing green card disrupt your life - we handle the entire I-90 process, from filing through card production, while you continue with your daily activities.`,

    processTitle: 'Green Card Renewal Process',
    process: [
      {
        step: '1',
        title: 'Assessment',
        description: 'Determine renewal vs replacement needs',
      },
      {
        step: '2',
        title: 'I-90 Filing',
        description: 'Submit application with supporting docs',
      },
      {
        step: '3',
        title: 'Biometrics',
        description: 'Fingerprints and photo appointment',
      },
      {
        step: '4',
        title: 'Processing',
        description: 'USCIS review and adjudication',
      },
      {
        step: '5',
        title: 'Card Delivery',
        description: 'New card mailed to your address',
      },
    ],

    urgencyTitle: '⚠️ Don\'t Wait - Expired Cards Cause Problems',
    urgencyMessage: 'Cannot board international flights. Employment verification fails. Driver\'s license renewal denied. File within 6 months of expiration.',

    whyChooseTitle: 'Why Choose Vasquez Law for Green Card Renewal',
    whyChoosePoints: [
      'Same-day I-90 filing available',
      'Expedite requests for emergencies',
      'Biometrics appointment coordination',
      'Travel document assistance',
      'Name change expertise',
      'Bilingual services - Se habla español',
      'Fixed fees with payment plans',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">2025 USCIS Processing Times by Service Center</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Service Center</th>
                <th className="py-3 px-4">I-90 Processing</th>
                <th className="py-3 px-4">Biometrics Wait</th>
                <th className="py-3 px-4">Expedite Success Rate</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">National Benefits Center</td>
                <td className="py-3 px-4">8-10 months</td>
                <td className="py-3 px-4">4-6 weeks</td>
                <td className="py-3 px-4">65%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Potomac Service Center</td>
                <td className="py-3 px-4">10-12 months</td>
                <td className="py-3 px-4">6-8 weeks</td>
                <td className="py-3 px-4">55%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Charlotte Field Office</td>
                <td className="py-3 px-4">10-14 months</td>
                <td className="py-3 px-4">5-7 weeks</td>
                <td className="py-3 px-4">60%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Orlando Field Office</td>
                <td className="py-3 px-4">8-11 months</td>
                <td className="py-3 px-4">4-6 weeks</td>
                <td className="py-3 px-4">70%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-2">*Processing times as of January 2025, check USCIS website for current times</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Common Green Card Problems & Solutions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Travel Issues</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✈️ <strong>Expired card:</strong> Use I-90 receipt + expired card</li>
              <li>✈️ <strong>Lost abroad:</strong> Get I-131A from US embassy</li>
              <li>✈️ <strong>Airline refusal:</strong> Carrier documentation letter</li>
              <li>✈️ <strong>Extended trip:</strong> File for re-entry permit</li>
              <li>✈️ <strong>Name mismatch:</strong> Carry marriage certificate</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Employment Issues</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>💼 <strong>I-9 reverification:</strong> Use I-90 receipt</li>
              <li>💼 <strong>E-Verify mismatch:</strong> Temporary evidence letter</li>
              <li>💼 <strong>Security clearance:</strong> Expedite for job requirement</li>
              <li>💼 <strong>Professional license:</strong> Notarized affidavit</li>
              <li>💼 <strong>Real ID compliance:</strong> Passport alternative</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Expedite Request Requirements</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Valid Reasons for Expedited Processing</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-blue-400 font-bold mb-2">Automatic Approval</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Military deployment orders</li>
                  <li>• Medical emergency travel</li>
                  <li>• Death in immediate family</li>
                  <li>• Court order requirement</li>
                </ul>
              </div>
              <div>
                <h4 className="text-green-400 font-bold mb-2">Case-by-Case Review</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Job offer requiring travel</li>
                  <li>• Financial loss over $5,000</li>
                  <li>• Educational deadlines</li>
                  <li>• Urgent business travel</li>
                </ul>
              </div>
            </div>
            <p className="text-yellow-400 text-sm">📞 Call USCIS Contact Center: 1-800-375-5283 for expedite requests</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Don\'t Confuse: I-90 vs I-751 vs I-829</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Choose the Right Form</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-white pl-4">
              <h4 className="text-white font-bold">I-90: Standard Renewal/Replacement</h4>
              <p className="text-gray-300 text-sm">10-year cards, lost/damaged cards, name changes, turning 14</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">I-751: Remove Conditions (Marriage)</h4>
              <p className="text-gray-300 text-sm">2-year conditional cards from marriage - file 90 days before expiration</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-blue-400 font-bold">I-829: Remove Conditions (Investment)</h4>
              <p className="text-gray-300 text-sm">2-year conditional cards from EB-5 investment - file 90 days before</p>
            </div>
          </div>
          <p className="text-white mt-4">⚠️ Filing wrong form delays case by months - consult attorney if unsure</p>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Green Card Renewal & Replacement Attorney"
      subtitle="Fast I-90 Filing for Expired, Lost, or Damaged Cards"
      description="Expert green card renewal services with same-day filing and expedite options. Serving NC & FL."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
