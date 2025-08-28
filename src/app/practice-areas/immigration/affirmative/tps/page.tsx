import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'TPS Lawyers | Temporary Protected Status Immigration Attorneys',
  description:
    'Expert TPS attorneys helping nationals from designated countries. Initial TPS registration, re-registration, travel documents, and paths to permanent status.',
  keywords:
    'TPS lawyer, temporary protected status, TPS countries, TPS renewal, TPS attorney, immigration protection',
};

export default function TPSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Temporary Protected Status (TPS)</h1>
            <p className="text-xl mb-8">Protection for Nationals of Designated Countries</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Check TPS Eligibility
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

      {/* Current TPS Countries */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Currently Designated TPS Countries
            </h2>
            <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-center">
              <p className="text-sm text-yellow-800">
                ⚠️ TPS designations change. This list is current as of 2024. Contact us for the
                latest information.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-3 text-blue-800">Americas</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    El Salvador
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Haiti
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Honduras
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Nicaragua
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Venezuela
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-3 text-blue-800">Africa</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Somalia
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    South Sudan
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Sudan
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Cameroon
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Ethiopia
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-3 text-blue-800">Asia & Others</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Afghanistan
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Burma (Myanmar)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Nepal
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Syria
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Ukraine
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TPS Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">TPS Benefits & Requirements</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">TPS Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Protection from removal/deportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Employment authorization (EAD)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Travel authorization available
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Cannot be detained by ICE
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Driver's license eligibility
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">General Requirements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    National of designated country
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Continuous physical presence
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Continuous residence in U.S.
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    No disqualifying crimes
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Not inadmissible bars
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-center text-blue-800 font-semibold">
                Each country has specific dates for physical presence and continuous residence
                requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TPS Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">TPS Application Process</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Initial Registration</h3>
                <p className="text-gray-600 mb-4">
                  For first-time TPS applicants during open registration period
                </p>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. Verify eligibility for your country</li>
                  <li>2. Gather required documents</li>
                  <li>3. File Form I-821 (TPS application)</li>
                  <li>4. File Form I-765 (work permit)</li>
                  <li>5. Complete biometrics</li>
                  <li>6. Await decision</li>
                </ol>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-800">Re-Registration</h3>
                <p className="text-gray-600 mb-4">For current TPS holders maintaining status</p>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. Monitor re-registration periods</li>
                  <li>2. File during designated window</li>
                  <li>3. Update any changed information</li>
                  <li>4. Renew employment authorization</li>
                  <li>5. Pay required fees</li>
                  <li>6. Maintain continuous TPS</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Authorization */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">TPS Travel Authorization</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-blue-800">Advance Parole for TPS</h3>
                  <p className="text-gray-600 mb-3">
                    TPS holders may apply for travel authorization for:
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Humanitarian reasons</li>
                    <li>• Educational purposes</li>
                    <li>• Employment needs</li>
                    <li>• Family emergencies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 text-red-800">Important Warnings</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Never travel without advance parole</li>
                    <li>• Consult attorney before traveling</li>
                    <li>• Some countries may be risky</li>
                    <li>• May affect future immigration options</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded">
                <p className="text-sm text-yellow-800 font-semibold text-center">
                  ⚠️ Traveling without advance parole will terminate your TPS!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paths Beyond TPS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Paths to Permanent Status from TPS
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Family-Based Petitions</h3>
                <p className="text-gray-600">
                  TPS holders with U.S. citizen or permanent resident family members may have paths
                  to green cards, especially with advance parole travel.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Employment-Based Options</h3>
                <p className="text-gray-600">
                  Long-term TPS holders with employer sponsors may qualify for employment-based
                  green cards.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Adjustment Through Travel</h3>
                <p className="text-gray-600">
                  Strategic use of advance parole may cure unlawful entry and open adjustment of
                  status options.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-blue-800">Legislative Solutions</h3>
                <p className="text-gray-600">
                  Proposed legislation may provide paths to permanent residence for long-term TPS
                  holders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country-Specific Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Country-Specific Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">El Salvador</h3>
                <p className="text-sm text-gray-600">
                  • Continuous residence: March 9, 2001
                  <br />
                  • Physical presence: March 9, 2001
                  <br />• One of the largest TPS populations
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">Venezuela</h3>
                <p className="text-sm text-gray-600">
                  • Continuous residence: March 8, 2021
                  <br />
                  • Physical presence: March 8, 2021
                  <br />• Recent designation
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">Haiti</h3>
                <p className="text-sm text-gray-600">
                  • Multiple registration periods
                  <br />
                  • Check specific requirements
                  <br />• Extended due to conditions
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">Ukraine</h3>
                <p className="text-sm text-gray-600">
                  • Continuous residence: April 11, 2022
                  <br />
                  • Physical presence: April 11, 2022
                  <br />• Due to ongoing conflict
                </p>
              </div>
            </div>
            <p className="text-center mt-6 text-gray-600">
              Contact us for specific requirements for your country
            </p>
          </div>
        </div>
      </section>

      {/* Important Deadlines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Don't Miss Critical Deadlines</h2>
            <div className="bg-red-50 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-red-800 text-center">
                TPS Deadlines Are Strict!
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Initial Registration:</strong> You must apply during the designated
                  registration period for your country. Missing this window may permanently bar you
                  from TPS.
                </p>
                <p className="text-gray-700">
                  <strong>Re-Registration:</strong> Current TPS holders must re-register during each
                  designated period. Failure to re-register will result in loss of TPS status.
                </p>
                <p className="text-gray-700">
                  <strong>Late Filing:</strong> Very limited exceptions exist for late initial
                  registration. Don't risk your eligibility - file on time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Your TPS Status</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you need initial registration, re-registration, or exploring paths beyond TPS,
            our experienced attorneys can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Get TPS Help Now
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
