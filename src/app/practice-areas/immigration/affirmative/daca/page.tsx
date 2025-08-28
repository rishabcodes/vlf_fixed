import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'DACA Lawyers | Deferred Action for Childhood Arrivals',
  description:
    'Expert DACA attorneys helping Dreamers. Initial DACA applications, renewals, advance parole, and path to permanent status. Protect your future in America.',
  keywords:
    'DACA lawyer, DACA renewal, Dreamers, deferred action, childhood arrivals, DACA attorney',
};

export default function DACAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">DACA Services</h1>
            <p className="text-xl mb-8">Protecting Dreamers and Their Future in America</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                DACA Consultation
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

      {/* DACA Status Update */}
      <section className="py-8 bg-yellow-50 border-b-4 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg font-semibold text-yellow-800">
              ⚠️ Important: DACA's legal status continues to evolve. Contact us for the latest
              updates and how they affect your case.
            </p>
          </div>
        </div>
      </section>

      {/* DACA Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Understanding DACA</h2>
            <p className="text-lg text-gray-600 mb-6">
              Deferred Action for Childhood Arrivals (DACA) provides temporary protection from
              deportation and work authorization for individuals who came to the United States as
              children.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">DACA Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Protection from deportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Work authorization (EAD)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Social Security number
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Driver's license eligibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Advance parole (travel permission)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Current Status</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Renewals continue to be processed
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    New initial applications on hold
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Court challenges ongoing
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Legislative solutions proposed
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Alternative options available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">DACA Eligibility Requirements</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg">Age Requirements</h3>
                  <p className="text-gray-600">
                    • Under 31 as of June 15, 2012
                    <br />• At least 15 years old when applying (unless in removal proceedings)
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg">Arrival & Presence</h3>
                  <p className="text-gray-600">
                    • Came to U.S. before 16th birthday
                    <br />
                    • Continuously resided since June 15, 2007
                    <br />• Present in U.S. on June 15, 2012
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg">Education Requirements</h3>
                  <p className="text-gray-600">
                    • Currently in school, OR
                    <br />
                    • Graduated/obtained GED, OR
                    <br />• Honorably discharged veteran
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg">Criminal History</h3>
                  <p className="text-gray-600">
                    • No felony convictions
                    <br />
                    • No significant misdemeanors
                    <br />
                    • No more than 3 misdemeanors
                    <br />• No threat to public safety
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our DACA Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">Initial DACA</h3>
                <p className="text-gray-600 text-sm mb-3">
                  For first-time applicants when program accepts new applications
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Eligibility assessment</li>
                  <li>• Document preparation</li>
                  <li>• Application filing</li>
                  <li>• Biometrics guidance</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">DACA Renewal</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Maintain your DACA status and work authorization
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Timely renewal filing</li>
                  <li>• Status monitoring</li>
                  <li>• EAD renewal</li>
                  <li>• Update information</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">✈️</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">Advance Parole</h3>
                <p className="text-gray-600 text-sm mb-3">Travel permission for DACA recipients</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Emergency travel</li>
                  <li>• Educational purposes</li>
                  <li>• Employment reasons</li>
                  <li>• Re-entry assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond DACA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Beyond DACA: Paths to Permanent Status
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Marriage to U.S. Citizen</h3>
                <p className="text-gray-600">
                  DACA recipients who marry U.S. citizens may be eligible for green cards,
                  especially if they entered with inspection or have advance parole.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Employment-Based Options</h3>
                <p className="text-gray-600">
                  Some DACA recipients may qualify for employment-based green cards through
                  sponsoring employers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Family Petitions</h3>
                <p className="text-gray-600">
                  U.S. citizen siblings or parents (once 21) can petition, though wait times vary by
                  country.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Other Relief Options</h3>
                <p className="text-gray-600">
                  Asylum, U visas, VAWA, or other forms of relief may be available depending on
                  individual circumstances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DACA Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">DACA Renewal Timeline</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    150
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Days Before Expiration</h3>
                    <p className="text-gray-600 text-sm">
                      Begin preparing renewal application and gathering updated documents
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    120
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Days Before Expiration</h3>
                    <p className="text-gray-600 text-sm">
                      File renewal application with USCIS (recommended window)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    30
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Days After Filing</h3>
                    <p className="text-gray-600 text-sm">Receive biometrics appointment notice</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    60
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Days for Processing</h3>
                    <p className="text-gray-600 text-sm">Average processing time (may vary)</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800 font-semibold">
                  ⚠️ Never let your DACA expire! File renewals 120-150 days before expiration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources and Support */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Resources for Dreamers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Educational Support</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Scholarship opportunities</li>
                  <li>• In-state tuition guidance</li>
                  <li>• Career counseling</li>
                  <li>• Professional licensing help</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Legal Support</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Know your rights training</li>
                  <li>• Emergency legal hotline</li>
                  <li>• Family preparedness plans</li>
                  <li>• Community resources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Supporting Dreamers Since 2012</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-blue-700 mb-2">2,000+</div>
                <p className="text-gray-600">DACA Cases</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-blue-700 mb-2">99%</div>
                <p className="text-gray-600">Approval Rate</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-blue-700 mb-2">24/7</div>
                <p className="text-gray-600">Emergency Support</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-blue-700 mb-2">Free</div>
                <p className="text-gray-600">Initial Consultations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Your DACA Status</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't risk losing your work authorization or protection. Our experienced DACA attorneys
            are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Schedule Consultation
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
