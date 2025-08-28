import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
export const metadata: Metadata = {
  title:
    'EMERGENCY Immigration Detention & Bond Lawyers NC & FL | 24/7 ICE Response | Vasquez Law Firm',
  description:
    'URGENT: Immigration detention and bond hearing attorneys with 24/7 emergency response. Former ICE attorneys on staff. Get immediate help for detained family members. Call 1-844-YO-PELEO',
  keywords:
    'immigration detention lawyer, bond hearing attorney, ICE detention lawyer, emergency immigration help, removal proceedings attorney, immigration court lawyer, detained immigrant help',
  openGraph: {
    title: 'EMERGENCY Immigration Detention & Bond Lawyers | 24/7 Response - Vasquez Law Firm',
    description:
      'URGENT detention help with former ICE attorneys. 24/7 emergency response for detained family members.',
    images: [{ url: '/images/emergency-detention-bond-lawyers.jpg' }],
  },
};

export default function DetentionBondHearingsPage() {
  const services = [
    {
      title: 'Emergency Bond Hearings (Same Day)',
      description:
        'Immediate bond hearings to secure release from ICE detention facilities - available 24/7 for emergencies',
      icon: '🚨',
      features: [
        'Same-day emergency bond applications',
        'Custody redetermination hearings',
        'Reasonable bond amount arguments',
        'Alternative to detention programs',
        'Electronic monitoring arrangements',
        'Supervised release negotiations',
      ],
    },
    {
      title: 'ICE Detention Facility Visits',
      description:
        'Immediate attorney visits to detention facilities to meet with detained clients and assess cases',
      icon: '🏢',
      features: [
        'Facility visits within 24 hours',
        'Client consultation and case assessment',
        'Document collection assistance',
        'Family communication facilitation',
        'Medical care advocacy',
        'Transfer and facility condition issues',
      ],
    },
    {
      title: 'Bond Reduction Motions',
      description:
        'Strategic motions to reduce unreasonably high immigration bonds to affordable amounts',
      icon: '💰',
      features: [
        'Bond reduction motion preparation',
        'Financial hardship documentation',
        'Community ties evidence',
        'Flight risk mitigation arguments',
        'Character witness coordination',
        'Bond payment assistance programs',
      ],
    },
    {
      title: 'Removal Defense in Detention',
      description:
        'Complete removal defense for detained individuals fighting deportation proceedings',
      icon: '⚖️',
      features: [
        'Cancellation of removal applications',
        'Asylum claims from detention',
        'Withholding of removal cases',
        'Adjustment of status defense',
        'Appeals and motions practice',
        'Video conference hearing representation',
      ],
    },
    {
      title: 'Parole in Place Applications',
      description: 'Humanitarian parole applications for immediate release from detention',
      icon: '🏥',
      features: [
        'Medical parole applications',
        'Humanitarian emergency parole',
        'Family unity parole requests',
        'Mental health emergency releases',
        'Pregnancy and childbirth parole',
        'Urgent family circumstances',
      ],
    },
    {
      title: 'Habeas Corpus Petitions',
      description: 'Federal court petitions challenging unlawful detention and prolonged custody',
      icon: '📜',
      features: [
        'Federal habeas corpus petitions',
        'Prolonged detention challenges',
        'Due process violation claims',
        'Unlawful detention arguments',
        'Constitutional rights protection',
        'Emergency federal court relief',
      ],
    },
    {
      title: 'Family Communication & Support',
      description:
        'Facilitate communication between detained individuals and their families during proceedings',
      icon: '📞',
      features: [
        'Family notification services',
        'Regular case status updates',
        'Communication facilitation',
        'Document delivery services',
        'Financial support coordination',
        'Emergency family contact protocols',
      ],
    },
    {
      title: 'Post-Release Compliance',
      description: 'Assistance with post-release requirements and compliance obligations',
      icon: '✅',
      features: [
        'Check-in requirement compliance',
        'Electronic monitoring assistance',
        'Court appearance coordination',
        'Address change notifications',
        'Compliance violation defense',
        'Condition modification requests',
      ],
    },
    {
      title: 'Detention Appeals & Litigation',
      description: 'Appellate representation for detention and bond hearing decisions',
      icon: '📋',
      features: [
        'Board of Immigration Appeals (BIA)',
        'Federal court appeals',
        'Emergency stay applications',
        'Injunctive relief requests',
        'Class action litigation participation',
        'Policy challenge advocacy',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What should I do if ICE arrests my family member?',
      answer:
        'Contact us immediately at 1-844-YO-PELEO. Do not sign any documents. Exercise the right to remain silent and request an attorney. We provide 24/7 emergency response and can visit detention facilities within 24 hours to begin the bond process.',
    },
    {
      question: 'How quickly can you get someone out of immigration detention?',
      answer:
        'Bond hearings can often be scheduled within 24-72 hours for emergency cases. If granted bond, release typically occurs within 24 hours of payment. We work aggressively to secure the lowest possible bond amounts and immediate release.',
    },
    {
      question: 'How much does an immigration bond typically cost?',
      answer:
        'Immigration bonds typically range from $1,500 to $25,000 depending on the case. We file bond reduction motions to lower unreasonably high bonds and can connect families with bond payment assistance programs.',
    },
    {
      question: 'Can someone be held in immigration detention indefinitely?',
      answer:
        'Generally no, but prolonged detention can occur. We file habeas corpus petitions in federal court to challenge prolonged detention and fight for constitutional protections against indefinite custody.',
    },
    {
      question: 'What happens if the bond hearing is denied?',
      answer:
        'We can appeal bond denials to the Board of Immigration Appeals (BIA) and file habeas corpus petitions in federal court. We also explore parole in place applications and alternative detention programs.',
    },
    {
      question: 'Can you visit someone in any ICE detention facility?',
      answer:
        'Yes, we have experience with detention facilities throughout NC, FL, GA, SC, and other southeastern states. We can visit any ICE detention facility and coordinate legal representation regardless of location.',
    },
  ];

  const content = {
    introduction: `When ICE detains a family member, every hour counts. Our immigration detention attorneys provide 24/7 emergency response with former ICE trial attorneys on staff who understand exactly how the detention system works. We've secured the release of thousands of detained immigrants through bond hearings, parole applications, and federal court challenges.`,

    processTitle: 'Our Emergency Detention Response Process',
    process: [
      {
        step: '1',
        title: 'Emergency Contact & Assessment (24/7)',
        description:
          'Immediate response to detention emergencies with case assessment and action plan',
      },
      {
        step: '2',
        title: 'Detention Facility Visit (Within 24 Hours)',
        description:
          'Attorney visit to detention facility for client consultation and document gathering',
      },
      {
        step: '3',
        title: 'Emergency Bond Application Filing',
        description: 'Immediate bond hearing request with supporting evidence and documentation',
      },
      {
        step: '4',
        title: 'Bond Hearing Representation',
        description: 'Aggressive advocacy before immigration judges for reasonable bond amounts',
      },
      {
        step: '5',
        title: 'Release & Ongoing Defense',
        description: 'Immediate release coordination and continued removal defense representation',
      },
    ],

    urgencyTitle: 'FAMILY MEMBER DETAINED BY ICE? EVERY HOUR MATTERS!',
    urgencyMessage:
      'ICE detention can happen without warning. The longer someone remains in detention, the harder it becomes to build a defense. Our 24/7 emergency response team is standing by.',

    successStats: [
      { number: '7,000+', label: 'Detained Clients Released' },
      { number: '91%', label: 'Bond Hearing Success Rate' },
      { number: '24/7', label: 'Emergency Response Available' },
      { number: '24', label: 'Hours to Facility Visit' },
    ],

    whyChooseTitle: 'Why Choose Our Detention Defense Team?',
    whyChoosePoints: [
      'Former ICE trial attorneys who know detention procedures inside and out',
      '24/7 emergency response for ICE arrests and detention',
      '91% success rate in securing bond for detained clients',
      'Facility visits within 24 hours anywhere in the Southeast',
      'Bilingual staff fluent in Spanish for family communication',
      'Proven track record with federal habeas corpus petitions',
      'Connections with bond payment assistance programs',
      'Aggressive advocacy - we fight every detention case to win',
    ],

    detentionFacilities: {
      title: 'ICE Detention Facilities We Serve',
      facilities: [
        {
          name: 'Stewart Detention Center',
          location: 'Lumpkin, GA',
          capacity: '1,752 detainees',
          distance: '3 hours from Atlanta',
        },
        {
          name: 'Irwin County Detention Center',
          location: 'Ocilla, GA',
          capacity: '1,200 detainees',
          distance: '2.5 hours from Atlanta',
        },
        {
          name: 'Krome North Service Processing Center',
          location: 'Miami, FL',
          capacity: '650 detainees',
          distance: 'Miami-Dade County',
        },
        {
          name: 'Baker County Detention Center',
          location: 'Macclenny, FL',
          capacity: '750 detainees',
          distance: '45 minutes from Jacksonville',
        },
        {
          name: 'Glades County Detention Center',
          location: 'Moore Haven, FL',
          capacity: '600 detainees',
          distance: '2 hours from Fort Myers',
        },
        {
          name: 'Folkston ICE Processing Center',
          location: 'Folkston, GA',
          capacity: '900 detainees',
          distance: '1 hour from Jacksonville',
        },
      ],
    },
  };

  return (
    <StandardizedPracticeAreaTemplate
      title="EMERGENCY Immigration Detention & Bond Lawyers"
      description="Family member detained by ICE? Our former ICE attorneys provide 24/7 emergency response with 91% bond hearing success rate. Immediate facility visits and aggressive bond advocacy to secure release."
      services={services}
      faqs={faqs}
      overview={{
        content:
          "Our immigration detention and bond lawyers provide 24/7 emergency response for families with detained loved ones. With former ICE attorneys on staff and a 91% bond hearing success rate, we fight aggressively to secure your family member's release. We provide immediate facility visits, comprehensive bond hearing representation, and emergency motions to reunite families. Available 365 days a year including holidays and weekends.",
      }}
      additionalContent={
        <div className="space-y-12">
          {/* Emergency Protocol */}
          <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-red-400 mb-6 flex items-center gap-3">
              🚨 ICE DETENTION EMERGENCY PROTOCOL
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  If ICE Detains Your Family Member:
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Call 1-844-YO-PELEO immediately (available 24/7/365)</li>
                  <li>• Do NOT sign any ICE documents without speaking to us first</li>
                  <li>• Write down the alien registration number (A-number)</li>
                  <li>• Get the name and location of detention facility</li>
                  <li>• Do NOT make statements about immigration status</li>
                  <li>• We will visit the facility within 24 hours</li>
                </ul>
              </div>
              <div className="bg-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">Emergency Hotline</h3>
                <div className="space-y-3">
                  <p className="text-white">
                    <strong>24/7 Emergency Line:</strong>
                    <br />
                    <a href="tel:1-844-967-3536" className="text-2xl font-bold text-red-400">
                      1-844-YO-PELEO
                    </a>
                  </p>
                  <p className="text-gray-300 text-sm">
                    Available every day including holidays and weekends for detention emergencies
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Detention Facilities */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              ICE Detention Facilities We Serve
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.detentionFacilities.facilities.map((facility, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20"
                >
                  <h3
                className="text-lg font-bold text-primary mb-2">{facility.name}</h3>
                  <p className="text-gray-300 text-sm mb-1">{facility.location}</p>
                  <p className="text-gray-400 text-sm mb-1">{facility.capacity}</p>
                  <p className="text-gray-400 text-sm">{facility.distance}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                We provide representation at ALL ICE detention facilities nationwide. No matter
                where your family member is detained, we can help.
              </p>
            </div>
          </section>

          {/* Bond Process */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Immigration Bond Process</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">🏃‍♂️ Emergency Bond</h3>
                <p className="text-gray-300 mb-4">
                  Immediate bond hearing requests for urgent cases
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Filed within 24 hours of detention</li>
                  <li>• Medical emergency situations</li>
                  <li>• Primary breadwinner cases</li>
                  <li>• Childcare responsibility situations</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">⚖️ Standard Bond Hearing</h3>
                <p className="text-gray-300 mb-4">
                  Regular bond hearings scheduled through immigration court
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Scheduled within 1-2 weeks</li>
                  <li>• Complete evidence package</li>
                  <li>• Community ties documentation</li>
                  <li>• Financial ability assessment</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-3">📉 Bond Reduction</h3>
                <p className="text-gray-300 mb-4">
                  Motions to reduce unreasonably high bond amounts
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Financial hardship documentation</li>
                  <li>• Alternative security arrangements</li>
                  <li>• Payment plan negotiations</li>
                  <li>• Bond assistance program referrals</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Rights During Detention */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              Your Rights During ICE Detention
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Fundamental Rights:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Right to remain silent</li>
                    <li>• Right to an attorney (at your expense)</li>
                    <li>• Right to an interpreter</li>
                    <li>• Right to contact your consulate</li>
                    <li>• Right to a bond hearing (in most cases)</li>
                    <li>• Right to appeal detention decisions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">During Facility Custody:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Right to adequate medical care</li>
                    <li>• Right to communicate with family</li>
                    <li>• Right to practice your religion</li>
                    <li>• Right to be free from abuse</li>
                    <li>• Right to legal visits and calls</li>
                    <li>• Right to humane treatment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
      isSpanish={false}
    />
  );
}
