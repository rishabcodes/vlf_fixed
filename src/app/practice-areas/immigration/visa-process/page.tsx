import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa Process Attorney NC & FL | Immigration Visa Lawyer | Vasquez Law',
  description: 'Navigate complex U.S. visa processes. Family, work, investor visas. Expert guidance from application to approval.',
  keywords: 'visa attorney, immigration visa lawyer, visa process, green card attorney',
};

export default function VisaProcessPage() {
  const services = [
    {
      title: 'Family-Based Visas',
      description: 'Reuniting families through immigration',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Immediate relative petitions',
        'Family preference categories',
        'K-1 fiancé visas',
        'K-3 spouse visas',
        'Adoption visas',
        'Consular processing',
      ],
    },
    {
      title: 'Employment Visas',
      description: 'Work authorization and professional visas',
      icon: '💼',
      features: [
        'H-1B specialty occupation',
        'L-1 intracompany transfer',
        'O-1 extraordinary ability',
        'E-2 treaty investor',
        'EB categories green cards',
        'PERM labor certification',
      ],
    },
    {
      title: 'Student & Exchange',
      description: 'Educational and cultural exchange visas',
      icon: '🎓',
      features: [
        'F-1 student visas',
        'M-1 vocational students',
        'J-1 exchange visitors',
        'Change of status',
        'OPT and CPT work',
        'Maintaining status',
      ],
    },
    {
      title: 'Investor Visas',
      description: 'Business and investment immigration',
      icon: '💰',
      features: [
        'E-2 treaty investor',
        'EB-5 investment green card',
        'L-1 business expansion',
        'E-1 treaty trader',
        'Business plan development',
        'Regional center options',
      ],
    },
    {
      title: 'Tourist & Temporary',
      description: 'Short-term visit visas',
      icon: '✈️',
      features: [
        'B-1 business visitors',
        'B-2 tourist visas',
        'Visa waiver program',
        'Extension of stay',
        'Change of status',
        'Visa denial appeals',
      ],
    },
    {
      title: 'Special Categories',
      description: 'Unique visa classifications',
      icon: '⭐',
      features: [
        'Religious worker visas',
        'Diplomatic visas',
        'Media and journalist',
        'Athletes and artists',
        'Treaty organization',
        'NATO personnel',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the visa process take?',
      answer: 'Processing times vary widely: tourist visas (weeks to months), family visas (months to years), employment visas (months), investment visas (6-12 months). Priority dates, country quotas, and USCIS backlogs affect timing. We provide realistic timelines and expedite when possible.',
    },
    {
      question: 'What is the difference between a visa and green card?',
      answer: 'A visa allows temporary stay for specific purposes (work, study, visit). A green card provides permanent residence with the right to live and work permanently in the U.S. Many start with temporary visas then apply for green cards.',
    },
    {
      question: 'Can I work while my visa is processing?',
      answer: 'Depends on your current status. Some visas allow work authorization during processing, others don\'t. Maintaining legal status is crucial. We help obtain work permits when eligible and ensure you don\'t violate status.',
    },
    {
      question: 'What happens if my visa is denied?',
      answer: 'Options include: filing a motion to reconsider, appealing the decision, reapplying with additional evidence, or pursuing alternative visa categories. Understanding denial reasons is crucial. We analyze denials and develop winning strategies.',
    },
    {
      question: 'Can my family come with me?',
      answer: 'Most work and student visas allow derivative visas for spouses and children under 21. Each visa type has specific rules about dependents\' rights to work or study. We ensure your entire family\'s immigration needs are addressed.',
    },
    {
      question: 'Do I need to hire an immigration attorney?',
      answer: 'While not required, immigration law is complex and constantly changing. Simple mistakes can cause years of delays or permanent bars. Our expertise prevents costly errors, expedites processing, and dramatically improves approval chances.',
    },
  ];

  const content = {
    introduction: `The U.S. visa process can be overwhelming - complex forms, strict deadlines, changing regulations, and high stakes. Whether you\'re reuniting with family, pursuing career opportunities, or investing in America\'s future, having experienced immigration attorneys guide you through every step makes the difference between approval and denial.`,

    processTitle: 'Visa Application Process',
    process: [
      {
        step: '1',
        title: 'Consultation',
        description: 'Assess eligibility and best visa options',
      },
      {
        step: '2',
        title: 'Preparation',
        description: 'Gather documents and complete forms',
      },
      {
        step: '3',
        title: 'Filing',
        description: 'Submit petition with supporting evidence',
      },
      {
        step: '4',
        title: 'Processing',
        description: 'Respond to RFEs and track progress',
      },
      {
        step: '5',
        title: 'Decision',
        description: 'Approval, interview prep, or appeal',
      },
    ],

    urgencyTitle: '⏰ Immigration Laws Change Constantly',
    urgencyMessage: 'Recent policy changes, court decisions, and processing delays affect visa applications daily. Don\'t risk your future on outdated information.',

    whyChooseTitle: 'Why Choose Vasquez Law for Your Visa',
    whyChoosePoints: [
      'Decades of immigration experience',
      'Former prosecutor insights',
      'Bilingual team and documents',
      'All visa types handled',
      'High approval success rate',
      'Emergency filing capability',
      'Multiple office locations',
      'Transparent flat fees',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Current Processing Times (2025)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Visa Type</th>
                <th className="py-3 px-4">USCIS Processing</th>
                <th className="py-3 px-4">Consular Wait</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Family Immediate Relative</td>
                <td className="py-3 px-4">8-14 months</td>
                <td className="py-3 px-4">2-6 months</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">H-1B Regular</td>
                <td className="py-3 px-4">4-6 months</td>
                <td className="py-3 px-4">1-3 months</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">L-1 Blanket</td>
                <td className="py-3 px-4">1-3 months</td>
                <td className="py-3 px-4">2-4 weeks</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">E-2 Investor</td>
                <td className="py-3 px-4">2-4 months</td>
                <td className="py-3 px-4">3-6 weeks</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">Student F-1</td>
                <td className="py-3 px-4">2-4 weeks</td>
                <td className="py-3 px-4">1-2 weeks</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 mt-4">*Premium processing available for some categories (15 days)</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Visa Requirements Checklist</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">All Applicants Need</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>✓ Valid passport</li>
              <li>✓ Completed forms</li>
              <li>✓ Photos meeting requirements</li>
              <li>✓ Application fees</li>
              <li>✓ Proof of ties to home country</li>
              <li>✓ Clean criminal record</li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-white mb-3">Category-Specific</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>✓ Job offer (employment)</li>
              <li>✓ Family relationship proof</li>
              <li>✓ Financial documentation</li>
              <li>✓ Educational credentials</li>
              <li>✓ Business plans (investor)</li>
              <li>✓ Medical examinations</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="U.S. Visa Process"
      subtitle="Your Path to America Starts Here"
      description="Expert guidance through every visa category. From tourist to immigrant visas, we make the complex simple."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
