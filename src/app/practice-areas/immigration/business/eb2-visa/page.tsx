import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EB-2 Visa Attorney NC & FL | NIW National Interest Waiver | Vasquez Law',
  description: 'EB-2 advanced degree professionals, exceptional ability, NIW self-petition. Skip labor certification with national interest waiver.',
  keywords: 'EB-2 visa attorney, national interest waiver, NIW attorney, advanced degree visa, exceptional ability',
};

export default function EB2AdvancedDegreeNIWPage() {
  const services = [
    {
      title: 'EB-2 NIW Self-Petition',
      description: 'National Interest Waiver without employer',
      icon: '🇺🇸',
      features: [
        'No employer sponsor needed',
        'No labor certification required',
        'Dhanasar three-prong test',
        'Substantial merit importance',
        'Well-positioned to advance',
        'Balance favors waiving PERM',
      ],
    },
    {
      title: 'EB-2A Advanced Degree',
      description: "Master's degree or Bachelor's plus 5 years",
      icon: '🎓',
      features: [
        'Master\'s or higher degree',
        'Bachelor\'s plus 5 years experience',
        'Professional position requirements',
        'Credential evaluations',
        'PERM labor certification',
        'Prevailing wage compliance',
      ],
    },
    {
      title: 'EB-2B Exceptional Ability',
      description: 'Sciences, arts, or business expertise',
      icon: '💼',
      features: [
        'Meet 3 of 6 criteria',
        'Degree in specialty',
        '10+ years experience',
        'Professional license',
        'High salary evidence',
        'Professional recognition',
      ],
    },
    {
      title: 'PERM Labor Certification',
      description: 'Required for non-NIW cases',
      icon: '📄',
      features: [
        'Recruitment process management',
        'Prevailing wage determination',
        'Job posting requirements',
        'Audit response preparation',
        'ETA-9089 filing',
        '6-12 month processing',
      ],
    },
    {
      title: 'Priority Date Strategy',
      description: 'Managing visa bulletin backlogs',
      icon: '📅',
      features: [
        'India/China backlog navigation',
        'Cross-chargeability options',
        'Priority date retention',
        'Upgrade from EB-3',
        'Concurrent I-140/I-485',
        'Final action vs filing dates',
      ],
    },
    {
      title: 'I-140 & I-485 Filing',
      description: 'Immigration petition and adjustment',
      icon: '📝',
      features: [
        'Premium processing strategy',
        'Concurrent filing when current',
        'Family derivative benefits',
        'Work permit applications',
        'Travel document processing',
        'Interview preparation',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is the National Interest Waiver (NIW)?',
      answer: 'NIW allows self-petition without employer sponsor or labor certification. Must prove: (1) endeavor has substantial merit and national importance, (2) you\'re well-positioned to advance it, (3) waiving requirements benefits the United States. Common for researchers, entrepreneurs, healthcare professionals.',
    },
    {
      question: 'How long is the EB-2 wait for India and China?',
      answer: 'As of 2025, India faces 10+ year wait, China 4-5 years due to per-country limits. Rest of world typically current or 1-2 years. NIW doesn\'t skip the line but allows self-petition. Consider EB-1 if qualified for faster processing.',
    },
    {
      question: 'Can I qualify for EB-2 without a Master\'s degree?',
      answer: 'Yes! Bachelor\'s plus 5 years progressive experience equals advanced degree. Or qualify through exceptional ability by meeting 3 of 6 criteria. Foreign degree equivalency evaluations accepted. Single-source evaluations combine education and experience.',
    },
    {
      question: 'What\'s the difference between EB-2 and EB-3?',
      answer: 'EB-2 requires advanced degree or exceptional ability; EB-3 needs bachelor\'s or 2 years experience. EB-2 generally has shorter wait times except for India/China. Can downgrade EB-2 to EB-3 when advantageous for priority dates. Both require PERM unless NIW.',
    },
    {
      question: 'How do I prove exceptional ability?',
      answer: 'Meet 3 of 6: degree relating to area, 10+ years experience, license to practice, salary showing exceptional ability, membership in professional associations, recognition for achievements. Similar to but less stringent than EB-1 extraordinary ability standard.',
    },
    {
      question: 'Can I change jobs with pending EB-2?',
      answer: 'After I-140 approval and I-485 pending 180+ days, you can change to same/similar job under AC21 portability. NIW self-petitioners have more flexibility. Employer-sponsored cases need new PERM if changing before I-485 filing unless keeping same priority date.',
    },
  ];

  const content = {
    introduction: `The EB-2 category serves advanced degree professionals and those with exceptional ability seeking permanent residence. Whether through employer sponsorship with labor certification or self-petitioning via National Interest Waiver, this pathway offers opportunities for skilled professionals to build their American future. Our strategic approach maximizes approval chances while navigating complex backlogs and requirements.`,

    processTitle: 'EB-2 Green Card Process',
    process: [
      {
        step: '1',
        title: 'Strategy Selection',
        description: 'NIW self-petition or employer sponsorship',
      },
      {
        step: '2',
        title: 'PERM/NIW Preparation',
        description: 'Labor certification or waiver evidence',
      },
      {
        step: '3',
        title: 'I-140 Petition',
        description: 'File immigrant petition with USCIS',
      },
      {
        step: '4',
        title: 'Priority Date Wait',
        description: 'Monitor visa bulletin for availability',
      },
      {
        step: '5',
        title: 'Green Card Filing',
        description: 'I-485 adjustment when current',
      },
    ],

    urgencyTitle: '⏳ Backlogs Growing - File Now',
    urgencyMessage: 'EB-2 wait times increasing, especially for India/China born. Earlier priority dates crucial. NIW standards tightening under recent decisions.',

    whyChooseTitle: 'Why Choose Vasquez Law for EB-2',
    whyChoosePoints: [
      'NIW expertise and high approval rates',
      'PERM labor certification specialists',
      'Strategic filing for backlogged countries',
      'Credential evaluation partnerships',
      'RFE response success record',
      'Priority date retention strategies',
      'AC21 portability guidance',
      'Offices throughout NC and FL',
    ],
  };

  const additionalContent = (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">EB-2 NIW Dhanasar Test</h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
          <p className="text-gray-300 mb-6">Your NIW petition must satisfy all three prongs:</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">1.</span>
              <div>
                <h3 className="font-bold text-white">Substantial Merit & National Importance</h3>
                <p className="text-gray-300 text-sm">Business, entrepreneurialism, science, technology, culture, health, education</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">2.</span>
              <div>
                <h3 className="font-bold text-white">Well-Positioned to Advance</h3>
                <p className="text-gray-300 text-sm">Education, skills, knowledge, record of success, future plans, progress to date</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl font-bold">3.</span>
              <div>
                <h3 className="font-bold text-white">Balance Favors Waiving Requirements</h3>
                <p className="text-gray-300 text-sm">National benefit outweighs labor certification protection purpose</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">Current EB-2 Priority Dates (2025)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-primary">Country</th>
                <th className="py-3 px-4">Final Action Date</th>
                <th className="py-3 px-4">Expected Wait</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">India</td>
                <td className="py-3 px-4">April 2012</td>
                <td className="py-3 px-4">10-12 years</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">China</td>
                <td className="py-3 px-4">June 2020</td>
                <td className="py-3 px-4">4-5 years</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4">All Others</td>
                <td className="py-3 px-4">Current</td>
                <td className="py-3 px-4">Immediate</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-primary mb-8">EB-2 Qualification Paths</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">Advanced Degree</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Master\'s or higher</li>
              <li>• Bachelor\'s + 5 years</li>
              <li>• Foreign equivalency</li>
              <li>• Progressive experience</li>
            </ul>
          </div>
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">Exceptional Ability</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Degree in field</li>
              <li>• 10+ years experience</li>
              <li>• License/certification</li>
              <li>• High salary</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">NIW Eligible</h3>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li>• Researchers/Scientists</li>
              <li>• Entrepreneurs</li>
              <li>• Healthcare professionals</li>
              <li>• STEM fields</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <StandardizedPracticeAreaTemplate
      title="EB-2 Advanced Degree & NIW"
      subtitle="Professional Excellence Path to Green Card"
      description="For advanced degree holders and exceptional ability professionals seeking permanent residence through employment or national interest."
      services={services}
      faqs={faqs}
      overview={{ content: content.introduction }}
      additionalContent={additionalContent}
    />
  );
}
