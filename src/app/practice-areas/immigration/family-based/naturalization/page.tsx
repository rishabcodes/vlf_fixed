import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Citizenship Attorney NC & FL | Naturalization Lawyer | Vasquez Law',
  description: 'Become a U.S. citizen through naturalization. N-400 applications, test preparation, oath ceremonies. Your American dream realized.',
  keywords: 'citizenship attorney, naturalization lawyer, N-400 application, citizenship test preparation',
};

export default function NaturalizationCitizenshipPage() {
  const services = [
    {
      title: 'N-400 Application',
      description: 'Complete naturalization filing',
      icon: '🇺🇸',
      features: [
        'Eligibility assessment',
        'Document preparation',
        'Form completion',
        'Fee waiver requests',
        'Military naturalization',
        'Expedited processing',
      ],
    },
    {
      title: 'Test Preparation',
      description: 'Civics and English exam readiness',
      icon: '📚',
      features: [
        '100 civics questions',
        'English proficiency',
        'Reading practice',
        'Writing exercises',
        'Speaking preparation',
        'Study materials provided',
      ],
    },
    {
      title: 'Interview Coaching',
      description: 'USCIS interview preparation',
      icon: '🎯',
      features: [
        'Mock interviews',
        'Document review',
        'Question preparation',
        'Oath explanation',
        'Red flag identification',
        'Confidence building',
      ],
    },
    {
      title: 'Disability Accommodations',
      description: 'Special provisions for limitations',
      icon: '♿',
      features: [
        'Medical disability exception',
        'Age-based waivers',
        'Language exceptions',
        'Reasonable accommodations',
        'N-648 medical certification',
        'Home interviews',
      ],
    },
    {
      title: 'Complex Cases',
      description: 'Overcoming naturalization barriers',
      icon: '🔧',
      features: [
        'Criminal history issues',
        'Tax compliance problems',
        'Selective service issues',
        'Travel/residence concerns',
        'Good moral character',
        'Prior denials',
      ],
    },
    {
      title: 'Derivative Citizenship',
      description: 'Automatic citizenship claims',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Child Citizenship Act',
        'Birth abroad to citizens',
        'Acquisition at birth',
        'Derivation through parents',
        'Certificate of citizenship',
        'Passport applications',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the requirements for naturalization?',
      answer: '18+ years old, green card for 5 years (3 if married to citizen), continuous residence, physical presence (30 months of 5 years), good moral character, English and civics knowledge, attachment to Constitution. Some requirements have exceptions for elderly or disabled.',
    },
    {
      question: 'How long does naturalization take?',
      answer: 'Currently 10-18 months from filing to oath ceremony. Processing times vary by field office. Charlotte: 11 months, Raleigh: 12 months, Orlando: 10 months (2025 estimates). Military naturalization often faster. Expedited processing available for urgent cases.',
    },
    {
      question: 'Can I lose my green card if naturalization is denied?',
      answer: 'Generally no, denial doesn\'t affect green card status. However, if denial reveals deportable offenses (crimes, fraud, abandonment), removal proceedings possible. Never apply without addressing potential issues. We screen thoroughly before filing.',
    },
    {
      question: 'What if I fail the citizenship test?',
      answer: 'You get a second chance! USCIS provides another interview 60-90 days later. Focus on failed portions. If you fail twice, reapply with new N-400. We provide intensive preparation to ensure first-time success.',
    },
    {
      question: 'Will my criminal record prevent citizenship?',
      answer: 'Depends on the crime. Aggravated felonies permanently bar naturalization. Other crimes create temporary bars (3-5 years) or require showing rehabilitation. DUIs, shoplifting, and minor offenses often overcome with proper presentation. Murder, drug trafficking permanent bars.',
    },
    {
      question: 'Can I travel abroad while N-400 is pending?',
      answer: 'Yes, but carefully! Trips under 6 months generally safe. Over 6 months can break continuous residence. Must maintain residence and return for biometrics and interview. We advise on safe travel to protect your case.',
    },
  ];

  const content = {
    introduction: `Becoming a U.S. citizen represents the culmination of your American journey. Naturalization provides security, voting rights, federal benefits, and the ability to petition family members. While the process seems straightforward, small mistakes can cause years of delay or permanent denial. Our experienced team ensures your path to citizenship is smooth, preparing you thoroughly for every step from application to oath ceremony.`,

    processTitle: 'Path to Citizenship',
    process: [
      {
        step: '1',
        title: 'Eligibility Review',
        description: 'Confirm all requirements met',
      },
      {
        step: '2',
        title: 'N-400 Filing',
        description: 'Submit application with supporting documents',
      },
      {
        step: '3',
        title: 'Biometrics',
        description: 'Fingerprints and background check',
      },
      {
        step: '4',
        title: 'Interview & Test',
        description: 'Civics and English examination',
      },
      {
        step: '5',
        title: 'Oath Ceremony',
        description: 'Take oath and receive certificate',
      },
    ],

    urgencyTitle: '🎯 Apply at Earliest Eligibility',
    urgencyMessage: 'Processing times increasing. New civics test implementation. File as soon as eligible to secure your citizenship rights.',

    whyChooseTitle: 'Why Choose Vasquez Law for Naturalization',
    whyChoosePoints: [
      '98% naturalization approval rate',
      'Comprehensive test preparation',
      'Complex case expertise',
      'Same-day certificate review',
      'Military naturalization experience',
      'Disability accommodation assistance',
      'Bilingual services',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Citizenship Test Components</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Civics Test</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• 100 possible questions</li>
              <li>• Asked up to 10 questions</li>
              <li>• Must answer 6 correctly</li>
              <li>• U.S. history and government</li>
              <li>• Geography and symbols</li>
              <li>• Rights and responsibilities</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">English Test</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Speaking: conversation with officer</li>
              <li>• Reading: one sentence correctly</li>
              <li>• Writing: one sentence correctly</li>
              <li>• Vocabulary focus areas provided</li>
              <li>• Three chances per component</li>
              <li>• Accommodations available</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Age-Based Test Exceptions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Age/Residence</th>
                <th className="py-3 px-4">English Requirement</th>
                <th className="py-3 px-4">Civics Requirement</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">50+ and 20 years LPR</td>
                <td className="py-3 px-4">Exempt (native language)</td>
                <td className="py-3 px-4">Required in native language</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">55+ and 15 years LPR</td>
                <td className="py-3 px-4">Exempt (native language)</td>
                <td className="py-3 px-4">Required in native language</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">65+ and 20 years LPR</td>
                <td className="py-3 px-4">Exempt (native language)</td>
                <td className="py-3 px-4">Simplified test (20 questions)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Medical Disability</td>
                <td className="py-3 px-4">N-648 waiver possible</td>
                <td className="py-3 px-4">N-648 waiver possible</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Benefits of U.S. Citizenship</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Rights Gained</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Vote in all elections</li>
                <li>✓ Run for public office</li>
                <li>✓ Serve on juries</li>
                <li>✓ Federal employment eligibility</li>
                <li>✓ U.S. passport</li>
                <li>✓ Consular protection abroad</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Immigration Benefits</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>✓ Cannot be deported</li>
                <li>✓ Faster family petitions</li>
                <li>✓ Sponsor parents immediately</li>
                <li>✓ No residence requirements</li>
                <li>✓ Transmit citizenship to children</li>
                <li>✓ Dual citizenship allowed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="U.S. Citizenship & Naturalization"
      subtitle="Your American Dream Fulfilled"
      description="Expert guidance through naturalization. From N-400 filing to oath ceremony, we ensure your success."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
