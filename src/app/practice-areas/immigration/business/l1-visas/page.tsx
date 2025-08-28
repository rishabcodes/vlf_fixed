// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, Building } from 'lucide-react';
import { UserCog, Brain, TrendingUp, Handshake, Globe, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'L1 Visa Services | Intracompany Transfer Visas | Vasquez Law Firm',
  description:
    'Expert L1A and L1B visa services for multinational companies. Transfer executives, managers, and specialized knowledge employees to the US.',
  keywords:
    'L1 visa, L1A visa, L1B visa, intracompany transfer, blanket L, new office L1, multinational manager',
};

const l1Categories = [
  {
    title: 'L1A - Executives & Managers',
    icon: <UserCog className="text-4xl text-blue-600" />,
    description: 'For executives and managers being transferred to manage US operations.',
    requirements: [
      'Executive or managerial role',
      'Managing professional employees',
      'Authority over hiring/firing',
      'Discretionary decision-making',
    ],
    duration: 'Up to 7 years total',
  },
  {
    title: 'L1B - Specialized Knowledge',
    icon: <Brain className="text-4xl text-blue-600" />,
    description:
      'For employees with specialized knowledge of company products, processes, or procedures.',
    requirements: [
      'Advanced expertise in company operations',
      'Proprietary knowledge of products/services',
      'Special knowledge critical to operations',
      'Not readily available in US market',
    ],
    duration: 'Up to 5 years total',
  },
];

const l1Requirements = [
  {
    title: 'Company Requirements',
    items: [
      'Qualifying relationship between foreign and US entities',
      'Active business operations in both countries',
      'Employer-employee relationship',
      'Financial ability to support US operations',
    ],
  },
  {
    title: 'Employee Requirements',
    items: [
      'One year of continuous employment abroad in past 3 years',
      'Executive, managerial, or specialized knowledge role',
      'Coming to US in similar capacity',
      'Full-time employment with the company',
    ],
  },
  {
    title: 'US Office Requirements',
    items: [
      'Secured physical premises for operations',
      'Organizational structure supporting position',
      'Business plan for new offices',
      'Evidence of business viability',
    ],
  },
];

const l1Services = [
  {
    title: 'Individual L1 Petitions',
    description:
      'Comprehensive petition preparation for individual transfers with detailed documentation.',
    features: ['Document preparation', 'Legal strategy', 'RFE responses', 'Premium processing'],
  },
  {
    title: 'Blanket L Program',
    description: 'Streamlined process for qualified organizations to transfer multiple employees.',
    features: [
      'Blanket petition filing',
      'Individual certificates',
      'Faster processing',
      'Cost efficiency',
    ],
  },
  {
    title: 'New Office L1',
    description: 'Specialized service for establishing new US offices or subsidiaries.',
    features: [
      'Business plan development',
      'One-year initial approval',
      'Extension strategy',
      'Compliance guidance',
    ],
  },
  {
    title: 'L1 to Green Card',
    description: 'Strategic planning for permanent residence through EB1C or other categories.',
    features: [
      'EB1C eligibility assessment',
      'Concurrent filing',
      'Priority dates',
      'Family inclusion',
    ],
  },
];

export default function L1VisasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Globe className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">L1 Intracompany Transfer Visas</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Seamlessly transfer your key employees to the United States. Our expert attorneys help
              multinational companies build their US presence through strategic L1 visa solutions.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300 inline-block"
            >
              Discuss Your Transfer Needs
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Build Your US Presence with Key Personnel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The L1 visa enables multinational companies to transfer executives, managers, and
              specialized knowledge employees to the United States, facilitating business expansion
              and operational efficiency.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <TrendingUp className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Annual Cap</h3>
              <p className="text-gray-600">
                File L1 petitions year-round without lottery restrictions
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Handshake className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dual Intent Allowed</h3>
              <p className="text-gray-600">Pursue green card while maintaining L1 status</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Building className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Spouse Work Authorization</h3>
              <p className="text-gray-600">L2 spouses eligible for unrestricted employment</p>
            </div>
          </div>
        </div>
      </section>

      {/* L1 Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">L1 Visa Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {l1Categories.map((category, index) => (
              <div key={index}

                className="bg-gray-50 rounded-lg p-8">
                <div
                className="mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                <ul className="space-y-2 mb-4">
                  {category.requirements.map((req, idx) => (
                    <li key={idx}

                className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      <span
                className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-blue-600">{category.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            L1 Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {l1Requirements.map((req, index) => (
              <div key={index}

                className="bg-white rounded-lg p-6 shadow-md">
                <h3
                className="text-xl font-bold text-gray-900 mb-4">{req.title}</h3>
                <ul className="space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx}

                className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span
                className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our L1 Visa Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {l1Services.map((service, index) => (
              <div
                key={index}

                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h3
                className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx}

                className="flex items-center">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span
                className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            L1 Visa Process Timeline
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">Initial Assessment (1-2 days)</h3>
                  <p className="text-gray-600">
                    Evaluate eligibility and determine optimal L1 category
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">Document Collection (2-4 weeks)</h3>
                  <p className="text-gray-600">
                    Gather corporate documents, employment records, and supporting evidence
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">Petition Preparation (1-2 weeks)</h3>
                  <p className="text-gray-600">
                    Draft comprehensive petition with legal arguments and evidence
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">USCIS Filing (15 days with premium)</h3>
                  <p className="text-gray-600">
                    Submit petition with premium processing for expedited decision
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">Consular Processing (1-2 weeks)</h3>
                  <p className="text-gray-600">Schedule visa interview and obtain L1 visa stamp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">L1 Success Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">L1A Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">250+</div>
              <div className="text-gray-600">L1 Transfers Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">New Office L1s</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">15</div>
              <div className="text-gray-600">Blanket L Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Expand Your Business to the United States</h2>
          <p className="text-xl mb-8">
            Whether you're establishing a new office or transferring key personnel, our L1 visa
            experts will guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Start L1 Assessment
            </Link>
            <Link
              href="/practice-areas/immigration/business"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
            >
              View All Business Visas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
