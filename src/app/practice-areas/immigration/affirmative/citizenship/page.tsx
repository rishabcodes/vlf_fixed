import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Citizenship & Naturalization Lawyers | Become a U.S. Citizen',
  description:
    'Expert naturalization attorneys helping you become a U.S. citizen. We handle N-400 applications, citizenship tests, oath ceremonies, and complex cases.',
  keywords:
    'citizenship lawyer, naturalization, N-400, citizenship test, become US citizen, naturalization attorney',
};

export default function CitizenshipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">U.S. Citizenship & Naturalization</h1>
            <p className="text-xl mb-8">Complete Your American Dream - Become a U.S. Citizen</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Start Your Journey
              </Link>
              <a
                href="tel:1-800-555-0199"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Call: 1-800-555-0199
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Citizenship Eligibility Requirements
            </h2>

            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Basic Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Age Requirement</h4>
                    <p className="text-gray-600">Be at least 18 years old at the time of filing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Green Card Status</h4>
                    <p className="text-gray-600">
                      Be a lawful permanent resident (green card holder)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Continuous Residence</h4>
                    <p className="text-gray-600">
                      5 years as LPR (or 3 years if married to U.S. citizen)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Physical Presence</h4>
                    <p className="text-gray-600">At least 30 months in U.S. during past 5 years</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Good Moral Character</h4>
                    <p className="text-gray-600">
                      Demonstrate good moral character for required period
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    6
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">English & Civics</h4>
                    <p className="text-gray-600">
                      Pass English and U.S. civics tests (with some exceptions)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Special Eligibility</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Military service members</li>
                  <li>• Spouses of U.S. citizens abroad</li>
                  <li>• Children of U.S. citizens</li>
                  <li>• Qualifying employees abroad</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Test Exceptions</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Age 50+ with 20 years LPR</li>
                  <li>• Age 55+ with 15 years LPR</li>
                  <li>• Medical disability exceptions</li>
                  <li>• Reasonable accommodations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Naturalization Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Naturalization Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Eligibility Review</h3>
                  <p className="text-gray-600">
                    We assess your eligibility and identify any potential issues or bars to
                    naturalization.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">N-400 Application</h3>
                  <p className="text-gray-600">
                    Prepare and file Form N-400 with supporting documents and evidence.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Biometrics Appointment</h3>
                  <p className="text-gray-600">
                    Attend fingerprinting appointment for FBI background check.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Interview Preparation</h3>
                  <p className="text-gray-600">
                    Comprehensive preparation for English and civics tests, plus interview
                    questions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Naturalization Interview</h3>
                  <p className="text-gray-600">
                    Attend interview, take tests, and answer questions under oath.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                  6
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Oath Ceremony</h3>
                  <p className="text-gray-600">
                    Take the Oath of Allegiance and receive your Certificate of Naturalization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citizenship Test Prep */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Citizenship Test Preparation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">English Test Components</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Speaking</h4>
                    <p className="text-sm text-gray-600">
                      Conversation with USCIS officer during interview
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Reading</h4>
                    <p className="text-sm text-gray-600">
                      Read one sentence about American history or civics
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Writing</h4>
                    <p className="text-sm text-gray-600">
                      Write one sentence when dictated by officer
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Civics Test Topics</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">American Government</h4>
                    <p className="text-sm text-gray-600">
                      Principles of democracy, system of government, rule of law
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">American History</h4>
                    <p className="text-sm text-gray-600">
                      Colonial period, independence, 1800s, recent history
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Geography & Symbols</h4>
                    <p className="text-sm text-gray-600">Geography, symbols, holidays</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-blue-800">
                We provide comprehensive test preparation materials and practice sessions
              </p>
              <p className="text-gray-600 mt-2">
                Study guides • Practice tests • Mock interviews • One-on-one tutoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Citizenship */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of U.S. Citizenship</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">🗳️</div>
                <h3 className="font-bold mb-2">Voting Rights</h3>
                <p className="text-sm text-gray-600">
                  Vote in federal elections and have a voice in democracy
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">📘</div>
                <h3 className="font-bold mb-2">U.S. Passport</h3>
                <p className="text-sm text-gray-600">
                  Travel with U.S. passport and government protection
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                <h3 className="font-bold mb-2">Family Petitions</h3>
                <p className="text-sm text-gray-600">
                  Sponsor more family members with shorter wait times
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">💼</div>
                <h3 className="font-bold mb-2">Federal Jobs</h3>
                <p className="text-sm text-gray-600">Eligible for federal government positions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-bold mb-2">No Deportation</h3>
                <p className="text-sm text-gray-600">Protection from removal proceedings</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-3xl mb-3">🏛️</div>
                <h3 className="font-bold mb-2">Civic Participation</h3>
                <p className="text-sm text-gray-600">Run for office and serve on juries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Overcoming Common Challenges</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Criminal History</h3>
                <p className="text-gray-600">
                  We analyze your criminal record and determine if you meet good moral character
                  requirements. Many convictions have exceptions or waiting periods.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Extended Trips Abroad</h3>
                <p className="text-gray-600">
                  We help document that you maintained continuous residence despite lengthy trips
                  and didn't abandon your permanent residence.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Tax Issues</h3>
                <p className="text-gray-600">
                  We work with tax professionals to resolve any outstanding tax obligations that
                  could affect your application.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Previous Denials</h3>
                <p className="text-gray-600">
                  We review prior applications to identify and address the reasons for denial in
                  your new application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Naturalization Success</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-blue-700 mb-2">3,000+</div>
                <p className="text-gray-600">Citizens Naturalized</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-blue-700 mb-2">99%</div>
                <p className="text-gray-600">Pass Rate</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-blue-700 mb-2">6-8</div>
                <p className="text-gray-600">Months Average</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-4xl font-bold text-blue-700 mb-2">50+</div>
                <p className="text-gray-600">Languages Supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Become a U.S. Citizen?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the final step in your American journey. Our experienced attorneys will guide you
            to citizenship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Start Your Application
            </Link>
            <a
              href="tel:1-800-555-0199"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Call: 1-800-555-0199
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
