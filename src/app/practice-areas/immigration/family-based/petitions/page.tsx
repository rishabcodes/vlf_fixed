import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: 'I-130 Family Petitions | Immigration Lawyer | Vasquez Law Firm',
  description: 'Expert I-130 family petition attorneys. Fast processing, 98% approval rate. Navigate 2025 USCIS changes with confidence. Free consultation.',
  keywords: 'I-130 petition, family immigration, USCIS form I-130, family visa petition, green card petition, immigration lawyer',
};

export default function FamilyPetitionsI130Page() {
  const services = [
    {
      title: 'Immediate Relative Petitions',
      description: 'Fast-track petitions for spouses, parents, and unmarried children under 21 of U.S. citizens',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'No visa number waiting period',
        'Priority processing available',
        'Concurrent filing with I-485',
        'Average processing: 8-14 months',
        'Work permit while waiting',
        'Travel document available',
      ],
    },
    {
      title: 'Family Preference Categories',
      description: 'Petitions for siblings, adult children, and relatives of permanent residents',
      icon: '📋',
      features: [
        'F1: Unmarried sons/daughters of citizens',
        'F2A: Spouses/children of green card holders',
        'F2B: Unmarried sons/daughters (21+) of LPRs',
        'F3: Married sons/daughters of citizens',
        'F4: Brothers/sisters of adult citizens',
        'Priority date tracking and monitoring',
      ],
    },
    {
      title: '2025 Policy Navigation',
      description: 'Expert guidance through new USCIS requirements effective August 2025',
      icon: '⚠️',
      features: [
        'Enhanced documentation requirements',
        'Avoid removal proceeding triggers',
        'Complete application preparation',
        'Evidence package optimization',
        'RFE prevention strategies',
        'Interview preparation and coaching',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the I-130 petition process take in 2025?',
      answer: 'Processing times vary: Immediate relatives (spouse, parents, children under 21) typically 8-14 months. Family preference categories can take 1-23 years depending on category and country. As of August 2025, USCIS has 2.4 million pending I-130s.',
    },
    {
      question: 'What documents do I need for an I-130 petition?',
      answer: 'Required: Form I-130, proof of petitioner\'s status (birth certificate/naturalization), proof of relationship (marriage/birth certificates), passport photos, filing fee ($625 as of 2025). Additional evidence varies by relationship type.',
    },
    {
      question: 'Can my relative work while the I-130 is pending?',
      answer: 'The I-130 alone doesn\'t provide work authorization. However, if filing concurrently with I-485 (adjustment of status), they can apply for employment authorization (EAD) which typically arrives in 3-5 months.',
    },
    {
      question: 'What are the new risks with the August 2025 USCIS policy?',
      answer: 'USCIS can now deny petitions without warning and place applicants in removal proceedings if they lack legal status. Complete, accurate documentation from the start is critical. Our 98% approval rate reflects our thorough preparation.',
    },
    {
      question: 'Can I petition for multiple family members?',
      answer: 'Yes, but you need a separate I-130 for each family member. Exception: When petitioning for your spouse, their children under 21 can be included as derivatives on the same petition.',
    },
    {
      question: 'What if my I-130 is denied?',
      answer: 'Options include: Filing a motion to reopen/reconsider, appealing to the Board of Immigration Appeals, or refiling with additional evidence. Under new 2025 rules, denial can trigger removal proceedings, making legal representation crucial.',
    },
  ];

  const content = {
    introduction: `The I-130 petition is your first step to bringing family members to the United States. With 2.4 million pending petitions and new USCIS policies creating unprecedented risks, having expert legal guidance is critical. Our immigration attorneys have a 98% approval rate and deep expertise navigating the complexities of family-based immigration, ensuring your petition is complete, accurate, and positioned for success from day one.`,

    processTitle: 'Our I-130 Petition Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Assessment',
        description: 'Comprehensive review of your eligibility and relationship documentation',
      },
      {
        step: '2',
        title: 'Document Preparation',
        description: 'Gathering and organizing all required evidence for a complete filing',
      },
      {
        step: '3',
        title: 'Strategic Filing',
        description: 'Submitting optimized petition package to prevent RFEs and delays',
      },
      {
        step: '4',
        title: 'USCIS Communication',
        description: 'Managing all correspondence and responding to any requests',
      },
      {
        step: '5',
        title: 'Approval & Next Steps',
        description: 'Guiding you through consular processing or adjustment of status',
      },
    ],

    urgencyTitle: '⚠️ Critical 2025 Policy Changes',
    urgencyMessage: 'New USCIS guidance allows denial without warning and immediate removal proceedings for those without status. One mistake can separate your family permanently. Protect your case with experienced counsel.',

    successStats: [
      { number: '98%', label: 'Approval Rate' },
      { number: '5,000+', label: 'Families United' },
      { number: '8-14mo', label: 'Avg. Processing' },
      { number: '24/7', label: 'Case Tracking' },
    ],

    whyChooseTitle: 'Why Choose Vasquez Law Firm for I-130 Petitions',
    whyChoosePoints: [
      '98% I-130 approval rate vs. 87% national average',
      'Same-day petition review and filing available',
      'Expertise with 2025 USCIS policy changes and requirements',
      'Prevent removal proceedings with complete documentation',
      'Bilingual team for document translation and support',
      'Direct attorney access throughout your case',
      'Concurrent I-485 filing to expedite green cards',
      'No hidden fees - transparent flat-rate pricing',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      {/* Current Processing Times */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Current I-130 Processing Times (August 2025)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">Immediate Relatives</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Spouse of U.S. Citizen</span>
                <span className="text-white font-semibold">8-14 months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Parent of U.S. Citizen</span>
                <span className="text-white font-semibold">10-15 months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Child under 21</span>
                <span className="text-white font-semibold">8-12 months</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-4">Family Preference Wait Times</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">F1 (Unmarried Sons/Daughters)</span>
                <span className="text-white font-semibold">7-8 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">F2A (Spouses of LPRs)</span>
                <span className="text-white font-semibold">2-3 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">F3 (Married Children)</span>
                <span className="text-white font-semibold">12-13 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">F4 (Siblings)</span>
                <span className="text-white font-semibold">13-23 years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Denial Reasons */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Avoid These Common Denial Reasons</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Documentation Issues</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Missing marriage certificates</li>
              <li>• Unverified translations</li>
              <li>• Expired documents</li>
              <li>• Inconsistent names/dates</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Eligibility Problems</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Prior immigration violations</li>
              <li>• Criminal history issues</li>
              <li>• Public charge concerns</li>
              <li>• Previous marriage not dissolved</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Filing Errors</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Incorrect form edition</li>
              <li>• Wrong filing address</li>
              <li>• Insufficient fees</li>
              <li>• Missing signatures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Professional Help Matters */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Why Professional Representation Matters</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">Without an Attorney</h3>
              <ul className="space-y-2 text-gray-300">
                <li>❌ 40% higher denial rate</li>
                <li>❌ Common mistakes cause delays</li>
                <li>❌ RFEs difficult to respond to</li>
                <li>❌ Risk of permanent bars</li>
                <li>❌ No advocate if issues arise</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary mb-4">With Vasquez Law</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ 98% approval rate</li>
                <li>✓ Complete accuracy guaranteed</li>
                <li>✓ Expert RFE responses</li>
                <li>✓ Protection from mistakes</li>
                <li>✓ Full support through approval</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-primary text-sm">
              💡 Contact us for a consultation to discuss your I-130 petition and ensure your family reunification success.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="I-130 Family Petitions"
      subtitle="Unite Your Family with Expert Immigration Counsel"
      description="Navigate the complex I-130 petition process with attorneys who have a 98% approval rate. We handle new 2025 USCIS requirements, prevent denials, and protect against removal proceedings."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
