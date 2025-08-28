import { Metadata } from 'next';
import { ModernPracticeAreaTemplate } from '@/components/templates/ModernPracticeAreaTemplate';
export const metadata: Metadata = {
  title:
    'Employment-Based Immigration Lawyers NC & FL | H-1B, PERM, EB-1/2/3 Experts | Vasquez Law Firm',
  description:
    'Expert employment immigration attorneys. H-1B, L-1, PERM labor certification, EB-1/2/3 green cards, TN visas. 92% approval rate. Business and worker representation. Call 1-844-YO-PELEO',
  keywords:
    'employment immigration lawyer, H-1B attorney, PERM labor certification lawyer, EB-1 attorney, EB-2 lawyer, EB-3 green card, L-1 visa lawyer, TN visa attorney, work visa lawyer',
  openGraph: {
    title: 'Employment Immigration Lawyers | H-1B, PERM, EB-1/2/3 Experts - Vasquez Law Firm',
    description:
      'Expert employment immigration attorneys with 92% approval rate. Complete business and worker representation.',
    images: [{ url: '/images/employment-immigration-lawyers.jpg' }],
  },
};

export default function EmploymentBasedImmigrationPage() {
  const services = [
    {
      title: 'H-1B Specialty Occupation Visas',
      description:
        'Complete H-1B visa assistance for specialty occupation workers and their employers',
      icon: '💼',
      features: [
        'H-1B petition preparation and filing',
        'Labor Condition Application (LCA) filing',
        'Specialty occupation documentation',
        'H-1B lottery registration assistance',
        'H-1B extension and renewal applications',
        'H-1B to green card transition planning',
      ],
    },
    {
      title: 'PERM Labor Certification',
      description:
        'Expert PERM labor certification process for employment-based green card applications',
      icon: '📋',
      features: [
        'PERM application preparation and strategy',
        'Prevailing wage determination requests',
        'Recruitment process management',
        'Job posting and advertising compliance',
        'DOL audit response and representation',
        'Alternative recruitment method approvals',
      ],
    },
    {
      title: 'EB-1 Extraordinary Ability',
      description:
        'EB-1A extraordinary ability and EB-1B outstanding researcher/professor petitions',
      icon: '🌟',
      features: [
        'EB-1A extraordinary ability petitions',
        'EB-1B outstanding researcher/professor cases',
        'Evidence portfolio development',
        'Expert witness testimony coordination',
        'Peer review letter procurement',
        'Priority date advantages utilization',
      ],
    },
    {
      title: 'EB-2 Advanced Degree Professionals',
      description:
        'EB-2 petitions for advanced degree professionals and National Interest Waiver cases',
      icon: '🎓',
      features: [
        'EB-2 advanced degree professional petitions',
        'National Interest Waiver (NIW) applications',
        'Advanced degree verification',
        'Exceptional ability documentation',
        'PERM labor certification alternatives',
        'Priority date optimization strategies',
      ],
    },
    {
      title: 'EB-3 Skilled Workers',
      description: 'EB-3 petitions for skilled workers, professionals, and other workers',
      icon: '🔧',
      features: [
        'EB-3 skilled worker petitions',
        'EB-3 professional worker applications',
        'EB-3 other worker (unskilled) cases',
        'Job requirement documentation',
        'Experience and education verification',
        'Schedule A occupation processing',
      ],
    },
    {
      title: 'L-1 Intracompany Transfers',
      description:
        'L-1A executive/managerial and L-1B specialized knowledge intracompany transfers',
      icon: '🌍',
      features: [
        'L-1A executive/managerial petitions',
        'L-1B specialized knowledge cases',
        'Qualifying relationship documentation',
        'New office L-1 petitions',
        'L-1 extension applications',
        'L-1 to green card pathway planning',
      ],
    },
    {
      title: 'TN NAFTA Professional Visas',
      description: 'TN visa applications for Canadian and Mexican professionals under NAFTA/USMCA',
      icon: '🇨🇦',
      features: [
        'TN visa application preparation',
        'Professional qualification verification',
        'NAFTA/USMCA compliance review',
        'TN renewal and extension applications',
        'Port of entry preparation',
        'TN to H-1B or green card transitions',
      ],
    },
    {
      title: 'O-1 Extraordinary Ability Visas',
      description:
        'O-1A and O-1B visas for individuals with extraordinary ability in arts, sciences, or business',
      icon: '🎨',
      features: [
        'O-1A extraordinary ability in sciences/business',
        'O-1B extraordinary ability in arts',
        'Evidence compilation and presentation',
        'Consultation letter procurement',
        'Peer recognition documentation',
        'O-1 extension and renewal applications',
      ],
    },
    {
      title: 'Business Immigration Compliance',
      description: 'I-9 compliance, E-Verify, and immigration document verification for employers',
      icon: '✅',
      features: [
        'I-9 form compliance training',
        'E-Verify system implementation',
        'Document verification procedures',
        'ICE audit defense and response',
        'Immigration policy development',
        'Employer liability protection',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is the difference between H-1B and L-1 visas?',
      answer:
        "H-1B is for specialty occupation workers hired from outside the company, requiring a bachelor's degree. L-1 is for intracompany transfers of executives, managers, or specialized knowledge employees who have worked for the company abroad for at least one year.",
    },
    {
      question: 'How long does the PERM labor certification process take?',
      answer:
        'PERM processing typically takes 6-12 months, but can take longer if selected for audit. The recruitment process adds 2-3 months before filing. We manage the entire timeline to minimize delays and ensure compliance.',
    },
    {
      question: 'Can I apply for a green card without PERM labor certification?',
      answer:
        "Yes, through EB-1 extraordinary ability, EB-1 multinational executive/manager, or EB-2 National Interest Waiver categories. These don't require PERM and often have faster processing times.",
    },
    {
      question: 'What happens if my H-1B petition is denied?',
      answer:
        "We can file appeals, motions to reopen/reconsider, or refiling strategies. We also explore alternative visa categories like L-1, O-1, or TN visas depending on your qualifications and employer's needs.",
    },
    {
      question: 'Can my spouse work on an H-1B dependent visa?',
      answer:
        'H-4 spouses can apply for work authorization if the H-1B holder has an approved I-140 petition or is in H-1B status beyond the 6-year limit due to green card processing. We assist with all H-4 EAD applications.',
    },
    {
      question: 'How do priority dates affect my green card timeline?',
      answer:
        'Priority dates determine when you can file for adjustment of status or immigrant visa processing. We monitor visa bulletin updates and advise on optimal timing for each step of the green card process.',
    },
  ];

  const content = {
    introduction: `Employment-based immigration opens doors to the American Dream for skilled workers and their employers. Our employment immigration attorneys have successfully navigated complex visa and green card processes for thousands of clients with a 92% approval rate, helping businesses attract global talent and workers achieve permanent residence.`,

    processTitle: 'Our Employment Immigration Process',
    process: [
      {
        step: '1',
        title: 'Strategy Consultation & Case Assessment',
        description:
          'Comprehensive evaluation of qualifications and optimal visa/green card pathway',
      },
      {
        step: '2',
        title: 'Documentation & Evidence Gathering',
        description: 'Expert preparation of petitions with compelling evidence packages',
      },
      {
        step: '3',
        title: 'Filing & Government Liaison',
        description: 'Strategic filing and ongoing communication with USCIS and DOL',
      },
      {
        step: '4',
        title: 'Response to Government Requests',
        description: 'Expert handling of RFEs, audits, and additional evidence requests',
      },
      {
        step: '5',
        title: 'Approval & Next Steps',
        description: 'Approval processing and planning for permanent residence or extensions',
      },
    ],

    urgencyTitle: 'H-1B Lottery Season? Priority Date Current?',
    urgencyMessage:
      'Employment immigration has strict deadlines and limited annual quotas. The H-1B lottery, PERM recruitment, and priority date movements require precise timing and expert guidance.',

    successStats: [
      { number: '15,000+', label: 'Employment Visas Approved' },
      { number: '92%', label: 'Overall Approval Rate' },
      { number: '500+', label: 'Businesses Served' },
      { number: '98%', label: 'PERM Success Rate' },
    ],

    whyChooseTitle: 'Why Choose Our Employment Immigration Team?',
    whyChoosePoints: [
      '92% approval rate across all employment visa categories',
      'Former DOL and USCIS officers with insider knowledge',
      'Comprehensive business immigration compliance services',
      'Proven track record with complex EB-1 and NIW cases',
      'Strategic timing expertise for maximum success',
      'Bilingual attorneys serving diverse client base',
      'Full-service approach from temporary visas to green cards',
      'Ongoing priority date tracking and case management',
    ],

    visaCategories: {
      title: 'Employment Visa Categories',
      categories: [
        {
          title: 'Temporary Work Visas',
          description: 'Non-immigrant visas for temporary employment',
          visas: [
            {
              name: 'H-1B',
              purpose: 'Specialty occupation workers',
              duration: '3 years (extendable to 6)',
            },
            {
              name: 'L-1',
              purpose: 'Intracompany transferees',
              duration: '1-3 years (varies by category)',
            },
            { name: 'TN', purpose: 'NAFTA professionals', duration: '3 years (renewable)' },
            { name: 'O-1', purpose: 'Extraordinary ability', duration: '3 years (renewable)' },
          ],
        },
        {
          title: 'Permanent Residence (Green Cards)',
          description: 'Immigrant visas leading to permanent residence',
          visas: [
            {
              name: 'EB-1',
              purpose: 'Priority workers (extraordinary ability)',
              duration: 'Permanent',
            },
            { name: 'EB-2', purpose: 'Advanced degree professionals', duration: 'Permanent' },
            { name: 'EB-3', purpose: 'Skilled workers and professionals', duration: 'Permanent' },
            { name: 'EB-4', purpose: 'Special immigrants', duration: 'Permanent' },
          ],
        },
      ],
    },
  };

  return (
    <ModernPracticeAreaTemplate
      title="Employment-Based Immigration Lawyers"
      subtitle="Your Gateway to Working in America"
      description="Secure your work visa or green card with expert immigration attorneys. We help businesses and workers navigate H-1B, PERM, EB-1/2/3, L-1, and all employment immigration needs with a 92% approval rate."
      services={services}
      faqs={faqs}
      content={
        <div className="space-y-12">
          {/* Visa Categories */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Employment Visa Categories</h2>
            <div className="space-y-8">
              {content.visaCategories.categories.map((category, index) => (
                <div
                  key={index}

                className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20"
                >
                  <h3
                className="text-2xl font-bold text-primary mb-4">{category.title}</h3>
                  <p className="text-gray-300 mb-6">{category.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.visas.map((visa, vIndex) => (
                      <div
                        key={vIndex}

                className="bg-white/5 rounded-lg p-4 border border-primary/10"
                      >
                        <h4
                className="font-bold text-white text-lg mb-2">{visa.name}</h4>
                        <p className="text-gray-300 text-sm mb-2">{visa.purpose}</p>
                        <p className="text-primary text-sm font-medium">
                          Duration: {visa.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Priority Dates */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">Understanding Priority Dates</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">What is a Priority Date?</h3>
                  <p className="text-gray-300 text-sm">
                    The priority date is established when your PERM labor certification or I-140
                    petition is filed. It determines your place in line for a green card.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Current vs. Retrogressed</h3>
                  <p className="text-gray-300 text-sm">
                    When your priority date is &ldquo;current,&rdquo; you can file for adjustment of
                    status. When retrogressed, you must wait for your date to become current again.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Monitoring Your Date</h3>
                  <p className="text-gray-300 text-sm">
                    We track the monthly Visa Bulletin updates and notify clients when their
                    priority dates become current for filing opportunities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PERM Process */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">
              PERM Labor Certification Process
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Step 1</div>
                  <h4 className="font-bold text-white mb-2">Prevailing Wage</h4>
                  <p className="text-gray-300 text-sm">
                    Obtain prevailing wage determination from DOL
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Step 2</div>
                  <h4 className="font-bold text-white mb-2">Recruitment</h4>
                  <p className="text-gray-300 text-sm">
                    Conduct required recruitment process to test labor market
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Step 3</div>
                  <h4 className="font-bold text-white mb-2">PERM Filing</h4>
                  <p className="text-gray-300 text-sm">
                    File PERM application with Department of Labor
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Step 4</div>
                  <h4 className="font-bold text-white mb-2">I-140 Petition</h4>
                  <p className="text-gray-300 text-sm">
                    File I-140 immigrant petition with approved PERM
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* H-1B Lottery Information */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8">H-1B Lottery System</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">📊 H-1B Cap Numbers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Regular Cap:</span>
                    <span className="text-white font-bold">65,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Master's Cap:</span>
                    <span className="text-white font-bold">20,000</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-primary/20 pt-3">
                    <span className="text-gray-300">Total Available:</span>
                    <span className="text-primary font-bold">85,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4">📅 H-1B Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Registration Period:</span>
                    <span className="text-white">March 1-18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Lottery Results:</span>
                    <span className="text-white">March 31</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Filing Period:</span>
                    <span className="text-white">April 1 - June 30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Start Date:</span>
                    <span className="text-white">October 1</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    />
  );
}
