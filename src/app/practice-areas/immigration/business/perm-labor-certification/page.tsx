// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { Handshake, FileText, AlertTriangle, BarChart3, Search, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PERM Labor Certification | Employment Green Card Process | Vasquez Law Firm',
  description:
    'Expert PERM labor certification services for employment-based green cards. Navigate the complex DOL recruitment process with experienced immigration attorneys.',
  keywords:
    'PERM labor certification, employment green card, EB2, EB3, prevailing wage, recruitment, I-140 petition, DOL',
};

const permProcess = [
  {
    step: '1',
    title: 'Prevailing Wage Determination',
    description: 'Obtain certified wage rate from Department of Labor for the position',
    timeline: '6-8 months',
    details: [
      'File ETA-9141 with DOL',
      'Specify job requirements',
      'Receive wage determination',
      'Valid for 1 year from certification',
    ],
  },
  {
    step: '2',
    title: 'Recruitment Process',
    description: 'Conduct mandatory recruitment to test the US labor market',
    timeline: '2-4 months',
    details: [
      '30-180 days before filing',
      'Newspaper advertisements (2 Sundays)',
      'Job order with State Workforce Agency',
      'Additional recruitment steps',
    ],
  },
  {
    step: '3',
    title: 'PERM Application Filing',
    description: 'File ETA-9089 with comprehensive recruitment documentation',
    timeline: '12-18 months',
    details: [
      'Must file within 180 days',
      'No qualified US workers found',
      'Complete recruitment report',
      'Possible audit response',
    ],
  },
  {
    step: '4',
    title: 'I-140 Petition',
    description: 'File immigrant petition with approved PERM certification',
    timeline: '8-12 months',
    details: [
      'File within 180 days of approval',
      'Premium processing available',
      'Concurrent filing possible',
      'Priority date established',
    ],
  },
];

const recruitmentRequirements = [
  {
    category: 'Mandatory Steps (All Cases)',
    requirements: [
      'Job order with State Workforce Agency (30 days)',
      'Newspaper advertisement (2 Sunday editions)',
      'Posted notice at worksite (10 consecutive days)',
    ],
  },
  {
    category: 'Professional Positions (Additional)',
    requirements: [
      'One professional journal advertisement',
      'Two additional recruitment steps from DOL list',
      'Campus recruitment (if applicable)',
      'Trade or professional organization posting',
    ],
  },
  {
    category: 'Documentation Requirements',
    requirements: [
      'Applications received and reviewed',
      'Reasons for rejection documented',
      'Interview summaries maintained',
      'Good faith recruitment effort proven',
    ],
  },
];

const auditConsiderations = [
  'Inconsistencies in job requirements',
  'Wage levels below market rate',
  'Unclear job duties or requirements',
  'Recruitment deficiencies',
  'Company layoffs in similar positions',
  'Timing issues with recruitment',
];

const eb2eb3Comparison = [
  {
    category: 'EB2 - Advanced Degree/Exceptional Ability',
    requirements: [
      "Master's degree or higher",
      "Bachelor's + 5 years progressive experience",
      'Exceptional ability in sciences/arts/business',
      'Job requires advanced degree or exceptional ability',
    ],
    benefits: [
      'Faster priority dates (typically)',
      'National Interest Waiver possibility',
      'Higher wage levels acceptable',
      'Advanced positions qualify',
    ],
  },
  {
    category: 'EB3 - Skilled Workers/Professionals',
    requirements: [
      "Bachelor's degree minimum",
      'At least 2 years training/experience',
      "Job requires bachelor's or equivalent",
      'Skilled worker position',
    ],
    benefits: [
      'Broader range of positions qualify',
      'Less stringent education requirements',
      'More flexible job descriptions',
      'Lower wage level requirements',
    ],
  },
];

const commonChallenges = [
  {
    title: 'Audit Response',
    description: 'Approximately 30% of PERM applications are audited',
    solutions: [
      'Comprehensive documentation prep',
      'Detailed recruitment records',
      'Expert legal response drafting',
      'Compliance verification',
    ],
  },
  {
    title: 'Qualified US Worker Applications',
    description: 'Handling applications from minimally qualified candidates',
    solutions: [
      'Careful job requirement drafting',
      'Detailed interview documentation',
      'Good faith recruitment demonstration',
      'Legitimate business reasons for rejection',
    ],
  },
  {
    title: 'Job Requirements Justification',
    description: 'Proving job requirements are necessary and normal',
    solutions: [
      'Industry standard analysis',
      'Business necessity documentation',
      'Competitive analysis',
      'Expert witness testimony',
    ],
  },
];

export default function PERMLaborCertificationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Handshake className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">PERM Labor Certification</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Navigate the complex PERM process with confidence. Our expert attorneys guide
              employers through every step of the labor certification process to secure green cards
              for valuable employees.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300 inline-block"
            >
              Start PERM Process
            </Link>
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">PERM Processing Alert</h3>
              <p className="text-yellow-700">
                Current PERM processing times are 12-18 months. Audit rates remain high at
                approximately 30%. Early preparation and expert guidance are essential for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Gateway to Employment-Based Green Cards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PERM labor certification is the first step in most employment-based immigration cases,
              requiring employers to demonstrate that no qualified US workers are available for the
              position.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">30%</div>
              <div className="text-gray-600">Audit Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">18</div>
              <div className="text-gray-600">Months Average Processing</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">Our Approval Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">PERMs Filed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            PERM Process Timeline
          </h2>
          <div className="max-w-5xl mx-auto">
            {permProcess.map((phase, index) => (
              <div key={index}

                className="flex mb-12">
                <div
                className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {phase.step}
                </div>
                <div className="ml-8 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                    <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-semibold">
                      {phase.timeline}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{phase.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.details.map((detail, idx) => (
                      <li key={idx}

                className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span
                className="text-gray-600 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recruitment Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recruitmentRequirements.map((req, index) => (
              <div key={index}

                className="bg-white rounded-lg p-6 shadow-md">
                <h3
                className="text-lg font-bold text-gray-900 mb-4">{req.category}</h3>
                <ul className="space-y-3">
                  {req.requirements.map((requirement, idx) => (
                    <li key={idx}

                className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      <span
                className="text-gray-600 text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EB2 vs EB3 Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            EB2 vs EB3 Classification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eb2eb3Comparison.map((category, index) => (
              <div key={index}

                className="bg-gray-50 rounded-lg p-6">
                <h3
                className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {category.requirements.map((req, idx) => (
                      <li key={idx}

                className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span
                className="text-gray-600 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {category.benefits.map((benefit, idx) => (
                      <li key={idx}

                className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <span
                className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Common PERM Challenges & Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commonChallenges.map((challenge, index) => (
              <div key={index}

                className="bg-white rounded-lg p-6 shadow-md">
                <h3
                className="text-lg font-bold text-gray-900 mb-3">{challenge.title}</h3>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <h4 className="font-semibold text-gray-900 mb-2">Our Solutions:</h4>
                <ul className="space-y-2">
                  {challenge.solutions.map((solution, idx) => (
                    <li key={idx}

                className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">→</span>
                      <span
                className="text-gray-600 text-sm">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Factors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            PERM Audit Risk Factors
          </h2>
          <div className="max-w-4xl mx-auto bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
            <div className="flex items-start mb-4">
              <AlertTriangle className="text-red-600 mt-1 mr-3 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-red-800">High Audit Risk Indicators</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditConsiderations.map((factor, index) => (
                <div key={index}

                className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">⚠</span>
                  <span
                className="text-red-700">{factor}</span>
                </div>
              ))}
            </div>
            <p className="text-red-700 mt-4 text-sm">
              Our experienced attorneys help minimize audit risk through strategic case preparation
              and comprehensive documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our PERM Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Search className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Case Assessment</h3>
              <p className="text-gray-600 text-sm">Evaluate PERM eligibility and strategy</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FileText className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Job Description</h3>
              <p className="text-gray-600 text-sm">Draft compliant job requirements</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Recruitment Management</h3>
              <p className="text-gray-600 text-sm">Handle entire recruitment process</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <BarChart3 className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Audit Response</h3>
              <p className="text-gray-600 text-sm">Expert handling of DOL audits</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Secure Green Cards for Your Valuable Employees
          </h2>
          <p className="text-xl mb-8">
            Don't navigate the complex PERM process alone. Our experienced attorneys will guide you
            through every step, from recruitment to approval, ensuring compliance and maximizing
            success rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Schedule PERM Consultation
            </Link>
            <Link
              href="/practice-areas/immigration/business"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
