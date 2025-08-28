import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EB-3 Visa Attorney NC & FL | Skilled Worker Green Card | Vasquez Law',
  description: 'EB-3 employment-based green cards for skilled workers, professionals, and other workers. Labor certification expertise.',
  keywords: 'EB-3 visa attorney, skilled worker green card, employment based third preference, PERM labor certification',
};

export default function EB3VisaPage() {
  const services = [
    {
      title: 'Skilled Workers',
      description: 'Positions requiring 2+ years experience',
      icon: '🔧',
      features: [
        'Technical positions',
        'Construction trades',
        'Healthcare workers',
        'Manufacturing roles',
        'Culinary specialists',
        'Job experience documentation',
      ],
    },
    {
      title: 'Professionals',
      description: "Bachelor\'s degree required positions',
      icon: '🎓',
      features: [
        'Engineers',
        'Teachers',
        'Accountants',
        'IT professionals',
        'Business analysts',
        'Degree equivalency evaluations',
      ],
    },
    {
      title: 'Other Workers',
      description: 'Less than 2 years experience',
      icon: '👷',
      features: [
        'Unskilled positions',
        'Agricultural workers',
        'Hospitality staff',
        'General laborers',
        'Limited visa availability',
        'Longer wait times',
      ],
    },
    {
      title: 'PERM Labor Certification',
      description: 'Department of Labor process',
      icon: '📋',
      features: [
        'Prevailing wage determination',
        'Recruitment requirements',
        'Job posting compliance',
        'Audit response expertise',
        'ETA-9089 preparation',
        'Supervised recruitment',
      ],
    },
    {
      title: 'I-140 Petition',
      description: 'Immigration petition filing',
      icon: '📄',
      features: [
        'Employer documentation',
        'Ability to pay evidence',
        'Premium processing option',
        'Priority date retention',
        'Upgrade to EB-2 potential',
        'Concurrent filing possible',
      ],
    },
    {
      title: 'Adjustment/Consular',
      description: 'Final green card process',
      icon: '🌎',
      features: [
        'I-485 adjustment filing',
        'Consular processing abroad',
        'Work/travel permits',
        'Family derivatives',
        'Medical examinations',
        'Interview preparation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How long does the EB-3 process take?',
      answer: 'Timeline varies by country of birth and category. PERM: 6-12 months. I-140: 4-6 months (premium: 15 days). Priority dates - Rest of World: current to 1 year; India: 10+ years; China: 4-5 years. Other Workers category has longer waits across all countries.',
    },
    {
      question: 'What\'s the difference between EB-2 and EB-3?',
      answer: 'EB-2 requires Master\'s degree or Bachelor\'s plus 5 years progressive experience. EB-3 requires Bachelor\'s OR 2 years experience for skilled workers. EB-2 generally has shorter wait times, especially for India/China. Some EB-3 beneficiaries later upgrade to EB-2 if qualified.',
    },
    {
      question: 'Can I change jobs during EB-3 process?',
      answer: 'Depends on stage. During PERM/I-140: must stay with sponsoring employer. After I-485 pending 180+ days: can change to same/similar job using AC21 portability. New employer can take over process if I-140 approved. Priority date remains yours.',
    },
    {
      question: 'Does my employer have to pay EB-3 costs?',
      answer: 'Employer must pay PERM costs (advertising, attorney fees for PERM, PWD fees) and I-140 filing fees. Employee can pay premium processing and adjustment of status costs. Employer cannot require reimbursement if employee leaves.',
    },
    {
      question: 'What if my EB-3 employer goes out of business?',
      answer: 'If I-140 approved and valid for 180+ days, you keep priority date for future petitions. If I-485 pending 180+ days, can port to new employer. If PERM stage only, must restart with new employer. Document everything for USCIS.',
    },
    {
      question: 'Can I include my family in EB-3?',
      answer: 'Yes! Spouse and unmarried children under 21 can be derivatives. They get green cards when you do. Spouse gets work authorization. Children can age-out - file I-485 as soon as priority date current to protect them under CSPA.',
    },
  ];

  const content = {
    introduction: `The EB-3 visa provides a pathway to permanent residence for skilled workers, professionals, and other workers with permanent job offers. While wait times can be long, especially for certain countries, EB-3 remains accessible for those without advanced degrees. Our team guides employers and employees through the complex PERM labor certification process, ensuring compliance while maximizing approval chances.`,

    processTitle: 'EB-3 Green Card Process',
    process: [
      {
        step: '1',
        title: 'PERM Preparation',
        description: 'Prevailing wage and recruitment',
      },
      {
        step: '2',
        title: 'PERM Filing',
        description: 'DOL labor certification',
      },
      {
        step: '3',
        title: 'I-140 Petition',
        description: 'USCIS immigrant petition',
      },
      {
        step: '4',
        title: 'Priority Date Wait',
        description: 'Visa bulletin monitoring',
      },
      {
        step: '5',
        title: 'Green Card',
        description: 'Adjustment or consular processing',
      },
    ],

    urgencyTitle: '⏰ Start Early - Long Wait Times',
    urgencyMessage: 'EB-3 backlogs mean starting today could save years. PERM recruitment takes months. Priority dates retrogress unpredictably.',

    whyChooseTitle: 'Why Choose Vasquez Law for EB-3',
    whyChoosePoints: [
      'PERM audit response expertise',
      'Recruitment compliance specialists',
      'Priority date strategies',
      'Upgrade and porting options',
      'Multi-state employer representation',
      'Ability to pay documentation',
      'Family derivative protection',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">EB-3 Categories and Requirements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Category</th>
                <th className="py-3 px-4">Education/Experience</th>
                <th className="py-3 px-4">Examples</th>
                <th className="py-3 px-4">Wait Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">EB-3 Professional</td>
                <td className="py-3 px-4">U.S. Bachelor's or equivalent</td>
                <td className="py-3 px-4">Engineer, Teacher, Accountant</td>
                <td className="py-3 px-4">Varies by country</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">EB-3 Skilled</td>
                <td className="py-3 px-4">2+ years training/experience</td>
                <td className="py-3 px-4">Chef, Electrician, Nurse</td>
                <td className="py-3 px-4">Varies by country</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">EB-3 Other</td>
                <td className="py-3 px-4">Less than 2 years</td>
                <td className="py-3 px-4">Janitor, Farm Worker</td>
                <td className="py-3 px-4">Longer waits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">PERM Recruitment Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Professional Positions</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• State job order (30 days)</li>
              <li>• 2 Sunday newspaper ads</li>
              <li>• 3 additional recruitment steps</li>
              <li>• Internal job posting (10 days)</li>
              <li>• Recruitment report required</li>
              <li>• 30-day quiet period</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">Non-Professional</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• State job order (30 days)</li>
              <li>• 2 Sunday newspaper ads</li>
              <li>• No additional steps required</li>
              <li>• Internal posting optional</li>
              <li>• Simpler documentation</li>
              <li>• Same audit risk</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Current Priority Date Movement (2025)</h2>
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg border border-primary/30">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">EB-3 Professional/Skilled</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Rest of World: Current</li>
                <li>• China: 2020 dates processing</li>
                <li>• India: 2012 dates processing</li>
                <li>• Philippines: Current</li>
                <li>• Mexico: Current</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">EB-3 Other Workers</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• All countries: 2020 dates</li>
                <li>• Much slower movement</li>
                <li>• Limited visa numbers</li>
                <li>• Consider skilled category if possible</li>
                <li>• Monitor visa bulletin monthly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="EB-3 Employment-Based Green Card"
      subtitle="Skilled Workers & Professionals Path"
      description="Expert guidance through EB-3 immigration for workers, professionals, and employers. PERM to green card success."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
