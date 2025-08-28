// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Globe, TrendingUp, UserCheck, Handshake, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Business Immigration Services | Vasquez Law Firm PLLC',
  description:
    'Comprehensive business immigration services including H1B, L1, E2, EB5 visas, and PERM labor certification. Expert legal guidance for employers and foreign professionals.',
  keywords:
    'business immigration, H1B visa, L1 visa, E2 investor visa, EB5 investment, PERM labor certification, employment visas',
};

const businessVisaTypes = [
  {
    title: 'H1B Specialty Occupation Visas',
    description:
      'For professionals in specialty occupations requiring theoretical and practical application of specialized knowledge.',
    link: '/practice-areas/immigration/business/h1b-visas',
    icon: <UserCheck className="text-4xl text-blue-600" />,
    highlights: ['Tech professionals', 'Healthcare workers', 'Engineers', 'Financial analysts'],
  },
  {
    title: 'L1 Intracompany Transfer Visas',
    description:
      'For multinational companies transferring executives, managers, or specialized knowledge employees.',
    link: '/practice-areas/immigration/business/l1-visas',
    icon: <Globe className="text-4xl text-blue-600" />,
    highlights: [
      'L1A executives/managers',
      'L1B specialized knowledge',
      'Blanket L petitions',
      'New office petitions',
    ],
  },
  {
    title: 'E2 Treaty Investor Visas',
    description:
      'For nationals of treaty countries making substantial investments in US businesses.',
    link: '/practice-areas/immigration/business/e2-investor-visas',
    icon: <TrendingUp className="text-4xl text-blue-600" />,
    highlights: [
      'Business investors',
      'Startup founders',
      'Franchise owners',
      'Essential employees',
    ],
  },
  {
    title: 'EB5 Investment Immigration',
    description:
      'Path to permanent residency through significant investment and job creation in the US economy.',
    link: '/practice-areas/immigration/business/eb5-investment',
    icon: <Briefcase className="text-4xl text-blue-600" />,
    highlights: [
      'Direct investment',
      'Regional centers',
      'Job creation requirements',
      'Source of funds',
    ],
  },
  {
    title: 'PERM Labor Certification',
    description:
      'First step in employment-based green card process, certifying no qualified US workers are available.',
    link: '/practice-areas/immigration/business/perm-labor-certification',
    icon: <Handshake className="text-4xl text-blue-600" />,
    highlights: [
      'Prevailing wage determination',
      'Recruitment process',
      'EB2/EB3 categories',
      'Audit response',
    ],
  },
];

const employerServices = [
  {
    title: 'Compliance & Best Practices',
    description: 'Ensure your company meets all immigration compliance requirements.',
    features: ['I-9 compliance', 'E-Verify guidance', 'LCA compliance', 'Immigration policies'],
  },
  {
    title: 'Strategic Immigration Planning',
    description: 'Develop long-term immigration strategies for your workforce.',
    features: [
      'Workforce planning',
      'Succession planning',
      'Global mobility programs',
      'Cost optimization',
    ],
  },
  {
    title: 'Mergers & Acquisitions Support',
    description: 'Navigate immigration implications of corporate restructuring.',
    features: [
      'Due diligence',
      'Transfer strategies',
      'Compliance assessment',
      'Employee communications',
    ],
  },
];

export default function BusinessImmigrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Immigration Services</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Empowering businesses and professionals to achieve their American dream through expert
              immigration solutions tailored to your unique needs.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300 inline-block"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Business Immigration Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startups to Fortune 500 companies, we provide strategic immigration counsel to
              help businesses build and maintain their global workforce while ensuring full
              compliance with immigration laws.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">H1B Petitions Filed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">200+</div>
              <div className="text-gray-600">Corporate Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Business Visa Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessVisaTypes.map((visa, index) => (
              <div
                key={index}

                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <div
                className="mb-4">{visa.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{visa.title}</h3>
                <p className="text-gray-600 mb-4">{visa.description}</p>
                <ul className="mb-6">
                  {visa.highlights.map((highlight, idx) => (
                    <li key={idx}

                className="text-sm text-gray-600 mb-1">
                      • {highlight}
                    </li>
                  ))}
                </ul>
                <Link
                  href={visa.link}

                className="text-blue-600 font-semibold hover:text-blue-700 transition duration-300"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Employer Immigration Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employerServices.map((service, index) => (
              <div key={index}

                className="bg-white rounded-lg p-6 shadow-md">
                <h3
                className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx}

                className="flex items-start">
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

      {/* Industries We Serve */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Technology',
              'Healthcare',
              'Finance',
              'Manufacturing',
              'Energy',
              'Hospitality',
              'Education',
              'Retail',
            ].map((industry, index) => (
              <div key={index}

                className="text-center p-4 bg-gray-50 rounded-lg">
                <div
                className="font-semibold text-gray-900">{industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Global Workforce?</h2>
          <p className="text-xl mb-8">
            Let our experienced immigration attorneys help you navigate the complex world of
            business immigration with confidence and success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Schedule Consultation
            </Link>
            <Link
              href="tel:+17135281800"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
            >
              Call (713) 528-1800
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
