// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, BarChart3, MapPin, Shield, Users, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EB5 Investment Immigration | Investor Green Card | Vasquez Law Firm',
  description:
    'Expert EB5 investment immigration services. Obtain US permanent residency through investment. Regional centers and direct investment options.',
  keywords:
    'EB5 visa, investment immigration, investor green card, regional center, TEA, targeted employment area, EB5 direct investment',
};

const eb5Options = [
  {
    title: 'Regional Center Program',
    icon: <MapPin className="text-4xl text-blue-600" />,
    investment: 'TEA Investment',
    description: 'Invest through USCIS-approved regional centers in targeted employment areas',
    benefits: [
      'Lower investment amount in TEAs',
      'Indirect job creation counts',
      'Passive investment allowed',
      'Professional management',
    ],
    considerations: [
      'Less control over investment',
      'Dependent on regional center success',
      'Due diligence critical',
      'Project viability varies',
    ],
  },
  {
    title: 'Direct Investment',
    icon: <Briefcase className="text-4xl text-blue-600" />,
    investment: 'Standard Investment',
    description: 'Create or invest in your own business enterprise',
    benefits: [
      'Full control of business',
      'Direct management role',
      'Choose any location',
      'Build your own venture',
    ],
    considerations: [
      'Higher investment required',
      'Must create 10 direct jobs',
      'Active management needed',
      'Higher risk and responsibility',
    ],
  },
];

const eb5Process = [
  {
    phase: 'Investment & I-526 Petition',
    steps: [
      'Select investment project or business',
      'Conduct due diligence',
      'Transfer investment funds',
      'File I-526 petition',
    ],
    timeline: '24-36 months processing',
  },
  {
    phase: 'Conditional Green Card',
    steps: [
      'Adjustment of status or consular processing',
      'Receive 2-year conditional green card',
      'Begin job creation period',
      'Monitor investment progress',
    ],
    timeline: '6-12 months',
  },
  {
    phase: 'Permanent Residency',
    steps: [
      'File I-829 petition',
      'Prove job creation',
      'Document sustained investment',
      'Receive permanent green card',
    ],
    timeline: '24-36 months',
  },
];

const jobCreationRequirements = [
  {
    title: 'Direct Jobs',
    description: 'W-2 employees working directly for the enterprise',
    applicable: 'Direct investment & some regional centers',
  },
  {
    title: 'Indirect Jobs',
    description: 'Jobs created in related businesses due to investment',
    applicable: 'Regional center projects only',
  },
  {
    title: 'Induced Jobs',
    description: 'Jobs from increased spending by direct/indirect employees',
    applicable: 'Regional center projects only',
  },
];

const dueDiligenceChecklist = [
  'Regional center track record and USCIS approval status',
  'Project financial projections and feasibility',
  'Job creation methodology and economics',
  'Exit strategy and capital return timeline',
  'Developer experience and project history',
  'Securities offering documents review',
  'Immigration attorney project assessment',
  'Third-party market studies',
];

export default function EB5InvestmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <DollarSign className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">EB5 Investment Immigration</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Secure permanent residency for you and your family through strategic investment in the
              US economy. Create jobs, build wealth, and achieve the American Dream.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300 inline-block"
            >
              Explore EB5 Options
            </Link>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Investment Path to US Permanent Residency
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The EB5 immigrant investor program provides a direct path to US permanent residency
              through job-creating investments, offering flexibility for investors and their
              families to live, work, and study anywhere in America.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Green Card for Family</h3>
              <p className="text-sm text-gray-600">Spouse and children under 21</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">No Sponsor Required</h3>
              <p className="text-sm text-gray-600">Self-petition process</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Live Anywhere</h3>
              <p className="text-sm text-gray-600">No location restrictions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <BarChart3 className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Path to Citizenship</h3>
              <p className="text-sm text-gray-600">Eligible after 5 years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            EB5 Investment Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eb5Options.map((option, index) => (
              <div key={index}

                className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div
                className="mr-4">{option.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{option.title}</h3>
                    <p className="text-blue-600 font-bold text-xl">{option.investment}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{option.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {option.benefits.map((benefit, idx) => (
                      <li key={idx}

                className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span
                className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Considerations:</h4>
                  <ul className="space-y-2">
                    {option.considerations.map((consideration, idx) => (
                      <li key={idx}

                className="flex items-start">
                        <span className="text-yellow-600 mr-2">!</span>
                        <span
                className="text-gray-600">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            EB5 Process Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eb5Process.map((phase, index) => (
              <div key={index}

                className="bg-white rounded-lg p-6 shadow-md">
                <h3
                className="text-xl font-bold text-gray-900 mb-4">{phase.phase}</h3>
                <ul className="space-y-2 mb-4">
                  {phase.steps.map((step, idx) => (
                    <li key={idx}

                className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span
                className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-blue-600">{phase.timeline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Creation Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Job Creation Requirements
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <p className="text-lg font-semibold text-blue-900">
                Each EB5 investment must create or preserve at least 10 full-time jobs for US
                workers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobCreationRequirements.map((req, index) => (
                <div key={index}

                className="bg-gray-50 rounded-lg p-6">
                  <h3
                className="font-bold text-gray-900 mb-2">{req.title}</h3>
                  <p className="text-gray-600 mb-3">{req.description}</p>
                  <p className="text-sm text-blue-600 font-semibold">{req.applicable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Due Diligence Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Due Diligence Checklist
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-md">
            <p className="text-gray-600 mb-6">
              Thorough due diligence is critical for EB5 success. Our attorneys guide you through:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dueDiligenceChecklist.map((item, index) => (
                <div key={index}

                className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">✓</span>
                  <span
                className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Source of Funds */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Source of Funds Documentation
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 text-center mb-8">
              Proving lawful source of investment funds is crucial for EB5 approval
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">Acceptable Sources</h3>
                <ul className="space-y-2">
                  {[
                    'Business ownership/sale',
                    'Employment income',
                    'Real estate transactions',
                    'Inheritance or gifts',
                    'Investment returns',
                    'Loan proceeds (secured)',
                  ].map((source, idx) => (
                    <li key={idx}

                className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span
                className="text-gray-600">{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">Documentation Required</h3>
                <ul className="space-y-2">
                  {[
                    'Tax returns (5+ years)',
                    'Bank statements',
                    'Business records',
                    'Property deeds',
                    'Gift affidavits',
                    'Loan documents',
                  ].map((doc, idx) => (
                    <li key={idx}

                className="flex items-center">
                      <span className="text-blue-600 mr-2">📄</span>
                      <span
                className="text-gray-600">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our EB5 Track Record
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">150+</div>
              <div className="text-gray-600">EB5 Petitions Filed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">94%</div>
              <div className="text-gray-600">I-526 Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600">Investments Facilitated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">25+</div>
              <div className="text-gray-600">Regional Centers Vetted</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Invest in Your Family's Future</h2>
          <p className="text-xl mb-8">
            Navigate the complex EB5 process with experienced attorneys who understand both
            immigration law and investment strategy. We guide you from project selection through
            permanent residency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Schedule EB5 Consultation
            </Link>
            <Link
              href="/practice-areas/immigration/business"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
            >
              View Other Visa Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
