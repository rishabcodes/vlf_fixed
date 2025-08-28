import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'K-1 Fiancé Visa Attorney | 90-Day Visa Lawyer | Vasquez Law Firm',
  description: 'Expert K-1 fiancé visa attorneys. Navigate the 90-day rule, ace your interview, avoid denials. 96% approval rate. Fast processing. Free consultation.',
  keywords: 'K-1 visa, fiancé visa, 90 day visa, K-1 attorney, fiancé visa lawyer, marriage visa',
};

export default function K1FianceVisaPage() {
  const services = [
    {
      title: 'K-1 Visa Application',
      description: 'Complete fiancé visa petition preparation and filing with USCIS',
      icon: '💑',
      features: [
        'I-129F petition preparation',
        'Evidence of genuine relationship',
        'Meeting requirement documentation',
        'Financial support affidavit (I-134)',
        'Criminal background clearance',
        'Medical examination coordination',
      ],
    },
    {
      title: 'Embassy Interview Prep',
      description: 'Comprehensive preparation for consular interview success',
      icon: '🎯',
      features: [
        'Mock interview sessions',
        'Document checklist review',
        'Red flag identification',
        'Relationship timeline preparation',
        'Common question coaching',
        'Embassy-specific guidance',
      ],
    },
    {
      title: 'Post-Arrival Services',
      description: 'Support after K-1 approval through green card process',
      icon: '✈️',
      features: [
        '90-day marriage deadline tracking',
        'Marriage certificate assistance',
        'I-485 adjustment of status filing',
        'Work permit (EAD) application',
        'Travel document (I-131) filing',
        'Green card interview preparation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the K-1 visa process take in 2025?',
      answer: 'Total timeline is 12-18 months: USCIS processing (9-12 months), embassy interview scheduling (2-3 months), visa issuance (1-2 weeks). Premium processing not available for K-1 visas. Current USCIS backlog affects timelines.',
    },
    {
      question: 'What is the 90-day rule for K-1 visa holders?',
      answer: 'You must marry your U.S. citizen fiancé within 90 days of entering the United States. This deadline is strict - no extensions allowed. After marriage, you can immediately file for adjustment of status (green card).',
    },
    {
      question: 'Can I work on a K-1 visa?',
      answer: 'K-1 visa alone doesn\'t authorize work. You can apply for employment authorization (EAD) upon arrival, but it takes 3-5 months. Most couples wait and apply for EAD with adjustment of status after marriage for faster processing.',
    },
    {
      question: 'What evidence proves a genuine relationship?',
      answer: 'Photos together, travel records, communication logs (texts, emails, calls), joint finances, engagement proof, affidavits from friends/family. Must also prove you met in person within 2 years before filing.',
    },
    {
      question: 'What are common K-1 visa denial reasons?',
      answer: 'Insufficient relationship evidence, failure to meet in-person requirement, previous immigration violations, criminal history, inadequate financial support, suspicion of marriage fraud, or incomplete documentation.',
    },
    {
      question: 'Can my children come with me on a K-1 visa?',
      answer: 'Yes, unmarried children under 21 can receive K-2 derivative visas. They must be listed on the I-129F petition. K-2 holders can also adjust status after you marry within the 90-day period.',
    },
  ];

  const content = {
    introduction: `The K-1 fiancé visa allows your foreign fiancé to enter the United States for marriage within 90 days. With increased scrutiny on marriage-based immigration in 2025, having experienced legal guidance is essential. Our attorneys have a 96% K-1 approval rate and deep expertise preparing couples for every step, from initial filing through green card approval.`,

    processTitle: 'K-1 Visa Process Timeline',
    process: [
      {
        step: '1',
        title: 'I-129F Petition Filing',
        description: 'Submit comprehensive petition package to USCIS (9-12 months)',
      },
      {
        step: '2',
        title: 'USCIS Approval',
        description: 'Receive approval and case transfer to National Visa Center',
      },
      {
        step: '3',
        title: 'Embassy Processing',
        description: 'Complete DS-160, medical exam, gather documents (2-3 months)',
      },
      {
        step: '4',
        title: 'Consular Interview',
        description: 'Attend embassy interview for visa approval',
      },
      {
        step: '5',
        title: 'Entry & Marriage',
        description: 'Enter U.S., marry within 90 days, file for green card',
      },
    ],

    urgencyTitle: '⏰ Time-Sensitive Requirements',
    urgencyMessage: 'Must prove in-person meeting within 2 years. 90-day marriage deadline is absolute. Missing deadlines can result in deportation and permanent bars.',

    successStats: [
      { number: '96%', label: 'Approval Rate' },
      { number: '1,200+', label: 'K-1 Visas' },
      { number: '12-18mo', label: 'Total Timeline' },
      { number: '90', label: 'Days to Marry' },
    ],

    whyChooseTitle: 'Why Choose Vasquez Law Firm for K-1 Visas',
    whyChoosePoints: [
      '96% K-1 approval rate with complex cases',
      'Embassy-specific interview preparation',
      'Expedited case strategies when available',
      'Overcome previous denials and red flags',
      'Document translation and authentication',
      'Direct attorney communication throughout',
      'Post-arrival green card services included',
      'Flat-fee pricing with no hidden costs',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      {/* K-1 Requirements Checklist */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">K-1 Visa Requirements Checklist</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">✅ Eligibility Requirements</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>U.S. citizen petitioner (not green card holder)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Both parties legally free to marry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Met in person within last 2 years</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Genuine intention to marry within 90 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Meet income requirements (100% poverty line)</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">📄 Required Documents</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Form I-129F with filing fee ($675)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Passport photos of both parties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Proof of U.S. citizenship</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Evidence of relationship and meetings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Divorce/death certificates if applicable</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Embassy Interview Tips */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Embassy Interview Success Tips</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4">✅ DO\'s for Interview</h3>
              <ul className="text-gray-300 space-y-3 text-sm">
                <li>• Bring organized, complete documentation</li>
                <li>• Answer questions honestly and directly</li>
                <li>• Know your relationship timeline by heart</li>
                <li>• Dress professionally and arrive early</li>
                <li>• Bring original documents plus copies</li>
                <li>• Practice common questions beforehand</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-4">❌ DON\'Ts for Interview</h3>
              <ul className="text-gray-300 space-y-3 text-sm">
                <li>• Don\'t memorize scripted answers</li>
                <li>• Don\'t argue with the consular officer</li>
                <li>• Don\'t bring fake or altered documents</li>
                <li>• Don\'t guess if you don\'t know something</li>
                <li>• Don\'t bring prohibited electronics</li>
                <li>• Don\'t discuss immigration intent beyond K-1</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vasquez Law */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Why Choose Vasquez Law for K-1 Visa</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">Our Experience</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Thousands of successful K-1 visas</li>
                <li>✓ Embassy interview preparation</li>
                <li>✓ Complex case expertise</li>
                <li>✓ Rapid response to RFEs</li>
                <li>✓ Multi-country experience</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">Full Service Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Complete I-129F preparation</li>
                <li>✓ Embassy guidance worldwide</li>
                <li>✓ Adjustment after marriage</li>
                <li>✓ Work permit assistance</li>
                <li>✓ Ongoing case monitoring</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-primary">
              💡 Contact us for a consultation to discuss your K-1 visa case and learn how we can help unite you with your fiancé.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="K-1 Fiancé Visa"
      subtitle="Unite with Your Fiancé in 90 Days"
      description="Expert K-1 visa attorneys guide you through the complex fiancé visa process. From I-129F filing to embassy interview to green card, we ensure success at every step."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
