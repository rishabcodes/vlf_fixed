import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Humanitarian Parole Attorney | Emergency Immigration | NC & FL | Vasquez Law',
  description: 'Expert humanitarian parole lawyers for urgent medical, family emergencies. Cuban, Haitian, Ukrainian parole programs. Offices in NC & FL. 919-569-5882',
  keywords: 'humanitarian parole attorney, emergency parole immigration, medical parole lawyer, Cuban parole program, Haitian parole, Ukrainian U4U, advance parole, immigration attorney Raleigh NC, Charlotte parole lawyer, Orlando humanitarian attorney',
  openGraph: {
    title: 'Humanitarian Parole Immigration Attorney | Emergency Entry | Vasquez Law',
    description: 'Urgent humanitarian parole for medical emergencies, family crises. Process for Cuba, Haiti, Ukraine, Venezuela.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ParoleHumanitarianParolePage() {
  const services = [
    {
      title: 'Medical Emergency Parole',
      description: 'Life-threatening conditions',
      icon: '🏥',
      features: [
        'Urgent medical treatment',
        'Organ donation/transplant',
        'Specialized surgery needs',
        'Clinical trials access',
        'Doctor support letters',
        'Expedited processing',
      ],
    },
    {
      title: 'Family Crisis Parole',
      description: 'Death or critical illness',
      icon: '👨‍👩‍👧',
      features: [
        'Funeral attendance',
        'Dying relative visits',
        'Estate settlement needs',
        'Child custody emergencies',
        'Elder care situations',
        'DNA evidence collection',
      ],
    },
    {
      title: 'CHNV Parole Programs',
      description: 'Cuba, Haiti, Nicaragua, Venezuela',
      icon: '🌎',
      features: [
        'Monthly lottery system',
        'Supporter requirements',
        'Travel authorization',
        'Biographic data form',
        'CBP One app filing',
        '2-year parole period',
      ],
    },
    {
      title: 'Ukrainian U4U',
      description: 'Uniting for Ukraine',
      icon: '🇺🇦',
      features: [
        'Financial supporter filing',
        'Background checks',
        'Vaccination requirements',
        'Work authorization included',
        'Travel document assistance',
        'Extension possibilities',
      ],
    },
    {
      title: 'Advance Parole',
      description: 'Travel for pending cases',
      icon: '✈️',
      features: [
        'I-131 travel document',
        'Adjustment pending travel',
        'DACA advance parole',
        'Emergency travel needs',
        'Multiple entry permits',
        'Re-entry assistance',
      ],
    },
    {
      title: 'Significant Benefit',
      description: 'Public interest cases',
      icon: '⭐',
      features: [
        'Law enforcement assistance',
        'Expert witness testimony',
        'Cultural exchange programs',
        'Scientific research',
        'Government cooperation',
        'National interest cases',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What qualifies for humanitarian parole in 2025?',
      answer: 'Three categories: (1) Urgent humanitarian reasons - medical emergencies, dying family member, funeral attendance, vulnerable person protection. (2) Significant public benefit - law enforcement testimony, cultural programs. (3) Country-specific programs - CHNV (Cuba, Haiti, Nicaragua, Venezuela), U4U (Ukraine). Must show urgent need that cannot wait for visa. Financial support required. Not a path to green card but can adjust status if eligible.',
    },
    {
      question: 'How long does humanitarian parole processing take?',
      answer: 'Regular humanitarian parole: 90-120 days average, expedite to 30 days for true emergencies. CHNV programs: 1-4 months after selection in monthly lottery. Ukrainian U4U: 2-3 months. Medical emergencies: Can get response in 1-2 weeks with proper documentation. USCIS reviews urgency level. Government filing fees apply plus biometrics. Can request fee waiver. Multiple requests possible if denied.',
    },
    {
      question: 'What is the CHNV parole process for Cubans, Haitians, Nicaraguans, and Venezuelans?',
      answer: 'US-based supporter files I-134A Declaration of Financial Support online. Beneficiary registers for monthly lottery (30,000 selected). If selected, complete biographic info, CBP One app for appointment. Fly directly to US (no Mexico border crossing). Valid passport required. Parole for 2 years with work authorization. Can apply for asylum or other status. Supporter must show income 125% above poverty line.',
    },
    {
      question: 'Can humanitarian parole lead to permanent residence?',
      answer: 'Parole itself is temporary (usually 1-2 years) and not a path to green card. However, once in US can: apply for asylum if fear persecution, seek family-based petition if eligible relative, pursue employment sponsorship, apply for U visa if crime victim, seek Special Immigrant Juvenile Status if under 21. Many CHNV parolees apply for asylum. Must maintain legal status or depart when parole expires.',
    },
    {
      question: 'What evidence is needed for medical humanitarian parole?',
      answer: 'Required: diagnosis from foreign doctor, US doctor acceptance letter explaining why treatment unavailable abroad, treatment plan and timeline, treatment cost information and payment ability proof, doctor opinion on urgency. Supporting: medical records translated, prognosis without treatment, insurance or funding proof, return travel plans, ties to home country. Organ donation cases get priority. Experimental treatment harder to approve.',
    },
    {
      question: 'What happens if humanitarian parole is denied?',
      answer: 'No appeal rights for humanitarian parole denials, but can: refile with additional evidence addressing denial reasons, request reconsideration if new circumstances, try different legal pathway (visitor visa, immigrant petition), seek Congressional assistance for compelling cases. CHNV program: reregister for next month lottery if not selected. Common denial reasons: insufficient urgency, available visa options, inadequate financial support, security concerns.',
    },
  ];

  const content = {
    introduction: `Humanitarian parole provides a lifeline for individuals facing urgent circumstances requiring immediate entry to the United States. Whether seeking life-saving medical treatment, responding to family emergencies, or utilizing country-specific programs like CHNV or Uniting for Ukraine, our experienced attorneys navigate the complex parole process efficiently. With offices in Raleigh, Charlotte, Smithfield, and Orlando, we understand the urgency of these cases and work tirelessly to reunite families and save lives. Time is critical in humanitarian cases - we provide same-day filing and expedite requests to address your emergency needs.`,

    processTitle: 'Humanitarian Parole Process',
    process: [
      {
        step: '1',
        title: 'Emergency Assessment',
        description: 'Determine urgency and eligibility',
      },
      {
        step: '2',
        title: 'Evidence Collection',
        description: 'Gather medical/emergency documentation',
      },
      {
        step: '3',
        title: 'I-134 Support',
        description: 'Secure financial sponsor',
      },
      {
        step: '4',
        title: 'USCIS Filing',
        description: 'Submit with expedite request',
      },
      {
        step: '5',
        title: 'Travel Authorization',
        description: 'Parole granted for entry',
      },
    ],

    urgencyTitle: '🚨 Emergency Processing Available',
    urgencyMessage: 'Medical emergencies cannot wait. Family crises need immediate response. Program deadlines approaching. Lives depend on swift action.',

    whyChooseTitle: 'Why Choose Vasquez Law for Humanitarian Parole',
    whyChoosePoints: [
      'Same-day emergency filing capability',
      'Medical network for support letters',
      'CHNV program expertise',
      'Ukrainian U4U specialists',
      'Bilingual services - Se habla español',
      '24/7 emergency consultation',
      'Congressional liaison relationships',
      'Offices in Raleigh, Charlotte, Smithfield & Orlando',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">2025 Country-Specific Parole Programs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Program</th>
                <th className="py-3 px-4">Monthly Cap</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Work Auth</th>
                <th className="py-3 px-4">Requirements</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Cuban Parole</td>
                <td className="py-3 px-4">30,000 combined</td>
                <td className="py-3 px-4">2 years</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">Passport, sponsor</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Haitian Parole</td>
                <td className="py-3 px-4">CHNV total</td>
                <td className="py-3 px-4">2 years</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">Passport, sponsor</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Nicaragua</td>
                <td className="py-3 px-4">CHNV total</td>
                <td className="py-3 px-4">2 years</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">Passport, sponsor</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Venezuelan</td>
                <td className="py-3 px-4">CHNV total</td>
                <td className="py-3 px-4">2 years</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">Passport/expired OK</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Ukrainian U4U</td>
                <td className="py-3 px-4">No cap</td>
                <td className="py-3 px-4">2 years</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">As of Feb 11, 2022</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Afghan</td>
                <td className="py-3 px-4">Case-by-case</td>
                <td className="py-3 px-4">2 years</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">OAW referral</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Financial Sponsor Requirements (I-134A)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-4">Sponsor Eligibility</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ US citizen or lawful permanent resident</li>
              <li>✓ Income 125% above poverty guidelines</li>
              <li>✓ File separate I-134A per beneficiary</li>
              <li>✓ Pass security background check</li>
              <li>✓ Maintain support during parole</li>
              <li>✓ Can sponsor multiple if income sufficient</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">Income Requirements</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Must meet minimum income thresholds</li>
              <li>• Based on household size</li>
              <li>• 125% above federal poverty guidelines</li>
              <li>• Additional income for each person</li>
              <li>• Assets can supplement income</li>
              <li>• Joint sponsors allowed</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Medical Parole Evidence Checklist</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold text-white mb-4">Required Medical Documentation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-400 font-bold mb-2">From Foreign Country</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>☐ Current diagnosis and prognosis</li>
                <li>☐ Treatment unavailability letter</li>
                <li>☐ Medical records (translated)</li>
                <li>☐ Doctor's urgency statement</li>
                <li>☐ Life expectancy without treatment</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-bold mb-2">From US Provider</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>☐ Acceptance letter from hospital</li>
                <li>☐ Treatment plan and timeline</li>
                <li>☐ Treatment cost information</li>
                <li>☐ Why treatment unique to US</li>
                <li>☐ Success rate expectations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">After Parole Approval</h2>
        <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4">Important Next Steps</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-white pl-4">
              <h4 className="text-white font-bold">Upon Arrival</h4>
              <p className="text-gray-300 text-sm">Report to CBP, receive I-94 with parole stamp, apply for SSN, enroll in health insurance</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-yellow-400 font-bold">Work Authorization</h4>
              <p className="text-gray-300 text-sm">File I-765 for EAD if not included, Category (c)(11), Valid for parole period</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-green-400 font-bold">Status Options</h4>
              <p className="text-gray-300 text-sm">Apply for asylum, family petitions, employment sponsorship before expiration</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="Humanitarian Parole Immigration Attorney"
      subtitle="Emergency Entry for Urgent Medical and Family Needs"
      description="Expert humanitarian parole lawyers handling medical emergencies, CHNV programs, Ukrainian U4U."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
