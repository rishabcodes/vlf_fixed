// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
import { Metadata } from 'next';
import Link from 'next/link';
import { UserCheck, FileText, BarChart3, AlertTriangle, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'H1B Visa Services | Specialty Occupation Visas | Vasquez Law Firm',
  description:
    'Expert H1B visa services for professionals and employers. Navigate the complex H1B process with experienced immigration attorneys. High approval rates.',
  keywords:
    'H1B visa, specialty occupation, work visa, H1B lottery, H1B cap, prevailing wage, LCA, H1B transfer',
};

const h1bRequirements = [
  {
    title: 'Educational Requirements',
    items: [
      "Bachelor's degree or higher in a specific field",
      'Foreign degree with US equivalency evaluation',
      'Experience equivalent to degree (3:1 ratio)',
      'Professional licenses when required',
    ],
  },
  {
    title: 'Position Requirements',
    items: [
      'Specialty occupation requiring specialized knowledge',
      "Bachelor's degree as minimum requirement",
      'Complex duties requiring theoretical knowledge',
      'Industry standard educational requirements',
    ],
  },
  {
    title: 'Employer Requirements',
    items: [
      'Valid employer-employee relationship',
      'Ability to pay prevailing wage',
      'Legitimate business operations',
      'Compliance with labor regulations',
    ],
  },
];

const h1bProcess = [
  {
    step: '1',
    title: 'Labor Condition Application (LCA)',
    description:
      'File LCA with Department of Labor certifying prevailing wage and working conditions.',
    timeline: '7-10 days',
  },
  {
    step: '2',
    title: 'H1B Petition Preparation',
    description:
      'Compile comprehensive documentation including job description, educational credentials, and company information.',
    timeline: '2-3 weeks',
  },
  {
    step: '3',
    title: 'USCIS Filing',
    description:
      'Submit H1B petition during cap season (March) or anytime for cap-exempt employers.',
    timeline: 'April 1st filing',
  },
  {
    step: '4',
    title: 'Lottery Selection',
    description: 'USCIS conducts random selection for cap-subject petitions due to high demand.',
    timeline: 'Late March',
  },
  {
    step: '5',
    title: 'USCIS Processing',
    description: 'Adjudication of selected petitions with possible RFE responses.',
    timeline: '3-6 months',
  },
  {
    step: '6',
    title: 'Approval & Start Date',
    description: 'Begin employment on October 1st for cap-subject approvals.',
    timeline: 'October 1st',
  },
];

const services = [
  {
    title: 'H1B Cap Petitions',
    description: 'Strategic filing for the annual H1B lottery with maximum approval chances.',
    icon: <BarChart3 className="text-3xl text-blue-600" />,
  },
  {
    title: 'H1B Transfers',
    description: 'Seamless employer changes with immediate work authorization.',
    icon: <FileText className="text-3xl text-blue-600" />,
  },
  {
    title: 'H1B Extensions',
    description: 'Timely renewals beyond the initial 3-year period.',
    icon: <Clock className="text-3xl text-blue-600" />,
  },
  {
    title: 'Cap-Exempt H1B',
    description: 'Year-round filing for universities, research organizations, and nonprofits.',
    icon: <Shield className="text-3xl text-blue-600" />,
  },
];

export default function H1BVisasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <UserCheck className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">H1B Specialty Occupation Visas</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Navigate the complex H1B process with confidence. Our experienced attorneys have
              successfully filed hundreds of H1B petitions for professionals and employers across
              diverse industries.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300 inline-block"
            >
              Start Your H1B Journey
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
              <h3 className="text-lg font-semibold text-yellow-800">2025 H1B Cap Season Update</h3>
              <p className="text-yellow-700">
                Electronic registration for FY 2026 H1B cap opens in March 2025. Start preparing
                your petition now to ensure timely filing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Gateway to US Employment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The H1B visa enables US employers to hire foreign professionals in specialty
              occupations. With annual caps and intense competition, strategic planning and expert
              guidance are essential for success.
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">85,000</div>
              <div className="text-gray-600">Annual H1B Cap</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">300,000+</div>
              <div className="text-gray-600">Annual Applications</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">25-30%</div>
              <div className="text-gray-600">Selection Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">6 Years</div>
              <div className="text-gray-600">Maximum Duration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            H1B Visa Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h1bRequirements.map((req, index) => (
              <div key={index}

                className="bg-gray-50 rounded-lg p-6">
                <h3
                className="text-xl font-bold text-gray-900 mb-4">{req.title}</h3>
                <ul className="space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx}

                className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
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

      {/* Process Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            H1B Application Process Timeline
          </h2>
          <div className="max-w-4xl mx-auto">
            {h1bProcess.map((phase, index) => (
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

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our H1B Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}

                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-300"
              >
                <div
                className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Challenges Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Common H1B Challenges We Solve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">RFE Responses</h3>
              <p className="text-gray-600">
                Expert handling of Requests for Evidence with comprehensive documentation and legal
                arguments to secure approvals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Specialty Occupation Issues</h3>
              <p className="text-gray-600">
                Strategic positioning of roles to meet USCIS requirements for specialty occupation
                classification.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Wage Level Concerns</h3>
              <p className="text-gray-600">
                Proper wage level determination and justification to avoid denials based on
                entry-level wage issues.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Maintenance of Status</h3>
              <p className="text-gray-600">
                Ensuring continuous legal status during transitions, layoffs, or employer changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your H1B Visa?</h2>
          <p className="text-xl mb-8">
            Don't leave your H1B petition to chance. Our experienced attorneys will guide you
            through every step, maximizing your chances of approval.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
            >
              Schedule H1B Consultation
            </Link>
            <Link
              href="/practice-areas/immigration/business"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
            >
              Explore Other Visa Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
