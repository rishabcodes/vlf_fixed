// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, TrendingUp, Handshake, DollarSign, ClipboardCheck, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'E2 Investor Visa Services | Treaty Investor Visas | Vasquez Law Firm',
  description:
    'Expert E2 investor visa services for entrepreneurs and investors. Start or buy a US business with experienced immigration attorneys.',
  keywords:
    'E2 visa, investor visa, treaty investor, E2 investment amount, franchise E2, startup visa, business immigration',
};

const treatyCountries = [
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Canada',
  'Chile',
  'Colombia',
  'Czech Republic',
  'Denmark',
  'France',
  'Germany',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Mexico',
  'Netherlands',
  'Norway',
  'Pakistan',
  'Philippines',
  'Poland',
  'South Korea',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Turkey',
  'United Kingdom',
];

const e2Requirements = [
  {
    title: 'Nationality Requirement',
    icon: <Globe className="text-3xl text-blue-600" />,
    description: 'Must be a citizen of a treaty country with the United States',
    details: [
      'Treaty country citizenship required',
      'Dual nationals may qualify',
      'Company must be 50%+ owned by treaty nationals',
      'Check current treaty country list',
    ],
  },
  {
    title: 'Substantial Investment',
    icon: <DollarSign className="text-3xl text-blue-600" />,
    description: 'Investment must be substantial relative to the business',
    details: [
      'No fixed minimum amount',
      'Proportional to business type',
      'Investment level varies by business',
      'Must be at-risk capital',
    ],
  },
  {
    title: 'Active Business',
    icon: <TrendingUp className="text-3xl text-blue-600" />,
    description: 'Business must be real, operating, and viable',
    details: [
      'Not passive investments',
      'Must generate income',
      'Create US jobs',
      'Viable business plan required',
    ],
  },
  {
    title: 'Control & Direction',
    icon: <UserCheck className="text-3xl text-blue-600" />,
    description: 'Investor must develop and direct the enterprise',
    details: [
      'At least 50% ownership',
      'Operational control',
      'Management position',
      'Active involvement required',
    ],
  },
];

const businessTypes = [
  {
    title: 'Franchises',
    description: 'Established business models with proven success',
    examples: ['Restaurants', 'Retail stores', 'Service businesses', 'Hotels'],
  },
  {
    title: 'Startups',
    description: 'New ventures with growth potential',
    examples: ['Tech companies', 'E-commerce', 'Professional services', 'Manufacturing'],
  },
  {
    title: 'Existing Businesses',
    description: 'Purchase and operate established companies',
    examples: ['Acquisition targets', 'Management buyouts', 'Business expansions', 'Turnarounds'],
  },
];

const e2Process = [
  {
    step: '1',
    title: 'Business Selection & Planning',
    description: 'Identify suitable business opportunity and develop comprehensive business plan',
    timeline: '2-4 weeks',
  },
  {
    step: '2',
    title: 'Investment & Documentation',
    description: 'Make investment, secure premises, hire employees, and gather evidence',
    timeline: '4-8 weeks',
  },
  {
    step: '3',
    title: 'E2 Application Preparation',
    description: 'Compile comprehensive E2 visa application with supporting documents',
    timeline: '2-3 weeks',
  },
  {
    step: '4',
    title: 'Consular Processing',
    description: 'Submit application to US consulate and prepare for interview',
    timeline: '4-8 weeks',
  },
  {
    step: '5',
    title: 'Visa Approval & Entry',
    description: 'Receive E2 visa stamp and enter US to manage business',
    timeline: '1-2 weeks',
  },
];

export default function E2InvestorVisasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <TrendingUp className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">E2 Treaty Investor Visas</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Turn your entrepreneurial vision into reality in the United States. The E2 visa allows
              treaty country nationals to invest in and manage US businesses with renewable visa
              status.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300 inline-block"
            >
              Evaluate Your E2 Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Path to US Business Ownership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The E2 treaty investor visa provides a flexible immigration solution for entrepreneurs
              and investors seeking to develop and direct business enterprises in the United States.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <ClipboardCheck className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Renewable Indefinitely</h3>
              <p className="text-sm text-gray-600">No maximum stay limit</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Handshake className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Spouse Work Permit</h3>
              <p className="text-sm text-gray-600">Automatic work authorization</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Globe className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-sm text-gray-600">2-3 months typical</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <DollarSign className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Flexible Investment</h3>
              <p className="text-sm text-gray-600">No fixed minimum</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            E2 Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {e2Requirements.map((req, index) => (
              <div key={index}

                className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <div
                className="mr-4">{req.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{req.title}</h3>
                    <p className="text-gray-600 mb-3">{req.description}</p>
                    <ul className="space-y-2">
                      {req.details.map((detail, idx) => (
                        <li key={idx}

                className="flex items-start">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span
                className="text-sm text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treaty Countries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            E2 Treaty Countries
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <p className="text-gray-600 mb-6 text-center">
              Citizens of the following countries may be eligible for E2 investor visas:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {treatyCountries.map((country, index) => (
                <div key={index}

                className="text-center p-2 bg-gray-50 rounded">
                  <span
                className="text-sm text-gray-700">{country}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              * List subject to change. Consult with our attorneys for current treaty status.
            </p>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            E2 Business Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessTypes.map((type, index) => (
              <div
                key={index}

                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h3
                className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {type.examples.map((example, idx) => (
                    <li key={idx}

                className="text-sm text-gray-600">
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            E2 Visa Process Timeline
          </h2>
          <div className="max-w-4xl mx-auto">
            {e2Process.map((phase, index) => (
              <div key={index}

                className="flex items-start mb-8">
                <div
                className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                  {phase.step}
                </div>
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-bold text-gray-900">{phase.title}</h3>
                  <p className="text-gray-600 mt-1">{phase.description}</p>
                  <p className="text-sm text-blue-600 mt-1 font-semibold">{phase.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Guidelines Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            E2 Investment Guidelines
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Substantial Investment Analysis
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Small Businesses</h4>
                  <p className="text-gray-600">
                    Service businesses, small retail, consulting firms
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    Medium Enterprises
                  </h4>
                  <p className="text-gray-600">Restaurants, franchises, manufacturing startups</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Large Investments</h4>
                  <p className="text-gray-600">Hotels, tech companies, major retail operations</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                * Investment amounts are guidelines. Substantiality is determined relative to the
                business type.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our E2 Success Record
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600">E2 Visas Approved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">96%</div>
              <div className="text-gray-600">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">30+</div>
              <div className="text-gray-600">Treaty Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">Substantial</div>
              <div className="text-gray-600">Investments Facilitated</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Invest in Your American Dream?</h2>
          <p className="text-xl mb-8">
            Our E2 visa experts will guide you through business selection, investment structuring,
            and visa approval to ensure your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Schedule E2 Consultation
            </Link>
            <Link
              href="/practice-areas/immigration/business"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
            >
              Explore Other Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
