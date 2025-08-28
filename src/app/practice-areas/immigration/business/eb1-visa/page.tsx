import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EB-1 Visa Attorney NC & FL | Extraordinary Ability Green Card | Vasquez Law',
  description: 'EB-1A extraordinary ability, EB-1B researchers, EB-1C executives. Priority green cards without labor certification.',
  keywords: 'EB-1 visa attorney, extraordinary ability green card, EB-1A, EB-1B, EB-1C, priority worker',
};

export default function EB1ExtraordinaryAbilityPage() {
  const services = [
    {
      title: 'EB-1A Extraordinary Ability',
      description: 'Self-petition for exceptional individuals',
      icon: '🌟',
      features: [
        'No employer sponsor required',
        'Sciences, arts, education, business',
        'National/international acclaim',
        'Evidence portfolio development',
        'Premium processing available',
        'Direct to green card',
      ],
    },
    {
      title: 'EB-1B Outstanding Professors',
      description: 'Academic and research excellence',
      icon: '🎓',
      features: [
        'University sponsorship',
        'Research institution positions',
        'International recognition proof',
        'Publication strategies',
        'Tenure track positions',
        'Private employer eligibility',
      ],
    },
    {
      title: 'EB-1C Multinational Executives',
      description: 'Managers and executives transfer',
      icon: '💼',
      features: [
        'L-1A to green card transition',
        'Executive/managerial roles',
        'One year abroad requirement',
        'Corporate structure analysis',
        'Subsidiary/branch qualification',
        'New office provisions',
      ],
    },
    {
      title: 'Evidence Development',
      description: 'Building winning EB-1 petitions',
      icon: '📚',
      features: [
        'Awards and recognitions',
        'Publication records',
        'Media coverage compilation',
        'Expert letters strategy',
        'Citation analysis',
        'Membership documentation',
      ],
    },
    {
      title: 'RFE Response',
      description: 'Overcoming USCIS challenges',
      icon: '📝',
      features: [
        'Request for Evidence analysis',
        'Additional documentation',
        'Legal arguments refinement',
        'Expert opinion letters',
        'Comparable evidence',
        'Appeal preparation',
      ],
    },
    {
      title: 'Concurrent Filing',
      description: 'Expedited family immigration',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'I-485 concurrent filing',
        'Family member inclusion',
        'Work permit processing',
        'Travel document applications',
        'Priority date retention',
        'Adjustment interviews',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What are the EB-1 eligibility criteria?',
      answer: 'EB-1A requires meeting 3 of 10 criteria showing extraordinary ability (awards, publications, media, memberships, judging, original contributions, authorship, exhibitions, leadership, high salary). EB-1B needs international recognition as outstanding professor/researcher. EB-1C requires executive/managerial role with qualifying multinational company.',
    },
    {
      question: 'How long does EB-1 processing take?',
      answer: 'Regular processing: 8-12 months. Premium processing: 15 calendar days for I-140 decision. I-485 adjustment: 8-14 months additional. Total timeline: 12-24 months for green card. Priority dates always current for EB-1, meaning no visa backlog.',
    },
    {
      question: 'Can I self-petition for EB-1?',
      answer: 'Yes, but only for EB-1A extraordinary ability. No employer sponsor needed. You petition on your own behalf demonstrating sustained national/international acclaim. EB-1B and EB-1C require employer sponsorship. Self-petitioners have more control over timing and process.',
    },
    {
      question: 'What if I don\'t have major awards?',
      answer: 'Major awards like Nobel Prize qualify alone, but not required. Meet 3 of 10 criteria instead: publications, media coverage, judging others\' work, original contributions, scholarly articles, memberships, exhibitions, leadership roles, high salary, commercial success. We build strong cases without major awards.',
    },
    {
      question: 'How is EB-1 different from EB-2/EB-3?',
      answer: 'EB-1 is fastest - no labor certification (PERM) required, saving 12-18 months. Priority dates always current. Higher evidence standard but faster processing. EB-2/EB-3 require PERM, face backlogs, take 2-5+ years total. EB-1 approved in 1-2 years.',
    },
    {
      question: 'What happens if EB-1 is denied?',
      answer: 'Options include: filing motion to reopen/reconsider, appealing to Administrative Appeals Office, refiling with stronger evidence, or pursuing EB-2/EB-3 alternatives. Denials often cite insufficient evidence - we analyze reasons and strengthen documentation for successful refiling.',
    },
  ];

  const content = {
    introduction: `The EB-1 visa category offers the fastest path to permanent residence for individuals at the pinnacle of their fields. Whether you're a renowned scientist, acclaimed artist, or multinational executive, this priority category bypasses labor certification requirements and lengthy backlogs. Our expertise in crafting compelling EB-1 petitions has helped hundreds achieve their American dream years faster than other employment categories.`,

    processTitle: 'EB-1 Application Process',
    process: [
      {
        step: '1',
        title: 'Eligibility Assessment',
        description: 'Evaluate credentials against criteria',
      },
      {
        step: '2',
        title: 'Evidence Collection',
        description: 'Compile comprehensive documentation',
      },
      {
        step: '3',
        title: 'Petition Preparation',
        description: 'Craft compelling I-140 petition',
      },
      {
        step: '4',
        title: 'USCIS Filing',
        description: 'Submit with premium processing option',
      },
      {
        step: '5',
        title: 'Green Card Process',
        description: 'I-485 adjustment or consular processing',
      },
    ],

    urgencyTitle: '⚡ Current Priority Dates Available',
    urgencyMessage: 'EB-1 has no visa backlog - file now for fastest green card processing. Recent USCIS policy changes affect evidence standards.',

    whyChooseTitle: 'Why Choose Vasquez Law for EB-1',
    whyChoosePoints: [
      'Highest EB-1 approval rates',
      'Former USCIS officer insights',
      'Evidence strategy expertise',
      'RFE response specialists',
      'Premium processing management',
      'Academic and business sectors',
      'Concurrent filing optimization',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">EB-1 Categories Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Category</th>
                <th className="py-3 px-4">Sponsor Required</th>
                <th className="py-3 px-4">Key Requirements</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">EB-1A Extraordinary</td>
                <td className="py-3 px-4">No (Self-petition)</td>
                <td className="py-3 px-4">3 of 10 criteria or major award</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">EB-1B Outstanding</td>
                <td className="py-3 px-4">Yes (Employer)</td>
                <td className="py-3 px-4">International recognition + job offer</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">EB-1C Executive</td>
                <td className="py-3 px-4">Yes (Company)</td>
                <td className="py-3 px-4">1 year abroad + executive role</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">EB-1A Evidence Criteria</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Primary Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Receipt of major international awards</li>
              <li>✓ Membership in exclusive associations</li>
              <li>✓ Published material about you</li>
              <li>✓ Judge of others in your field</li>
              <li>✓ Original scientific/artistic contributions</li>
            </ul>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Alternative Evidence</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✓ Scholarly articles in major publications</li>
              <li>✓ Work displayed at exhibitions</li>
              <li>✓ Leading/critical role in organizations</li>
              <li>✓ High salary relative to field</li>
              <li>✓ Commercial success in performing arts</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Current Processing Times (2025)</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">I-140 Regular Processing:</span>
              <span className="text-gray-300">8-12 months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">I-140 Premium Processing:</span>
              <span className="text-green-400">15 calendar days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">I-485 Adjustment:</span>
              <span className="text-gray-300">8-14 months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Consular Processing:</span>
              <span className="text-gray-300">4-8 months</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="EB-1 Priority Worker Visa"
      subtitle="Fastest Path to Green Card"
      description="For extraordinary individuals, outstanding researchers, and multinational executives seeking permanent residence."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
