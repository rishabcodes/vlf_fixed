import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Family Immigration Lawyer | Family-Based Petitions & Visas',
  description:
    'Reunite with your family through immigration. We handle spouse visas, parent petitions, sibling petitions, K-1 fiancé visas, and family green cards.',
  keywords:
    'family immigration, family petition, spouse visa, K1 visa, parent petition, sibling petition, family green card',
};

export default function FamilyBasedImmigrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Family-Based Immigration</h1>
            <p className="text-xl mb-8">Bringing Families Together Through Legal Immigration</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Start Family Petition
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

      {/* Family Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Who Can You Petition For?</h2>

            <div className="space-y-8">
              {/* Immediate Relatives */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-800">
                  Immediate Relatives (No Wait Times)
                </h3>
                <p className="text-gray-600 mb-4">
                  U.S. citizens can petition for immediate relatives without numerical limits:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💑</div>
                    <h4 className="font-bold mb-2">Spouses</h4>
                    <p className="text-sm text-gray-600">Married couples with valid marriages</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">👶</div>
                    <h4 className="font-bold mb-2">Children Under 21</h4>
                    <p className="text-sm text-gray-600">
                      Unmarried biological or adopted children
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">👵</div>
                    <h4 className="font-bold mb-2">Parents</h4>
                    <p className="text-sm text-gray-600">If petitioner is 21 or older</p>
                  </div>
                </div>
              </div>

              {/* Family Preference */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-800">
                  Family Preference Categories
                </h3>
                <p className="text-gray-600 mb-4">Subject to annual limits and wait times:</p>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-bold">F1: Adult Children of U.S. Citizens</h4>
                    <p className="text-gray-600">
                      Unmarried sons and daughters (21+) of U.S. citizens
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-bold">F2A: Spouses/Children of Green Card Holders</h4>
                    <p className="text-gray-600">Spouses and unmarried children under 21</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-bold">F2B: Adult Children of Green Card Holders</h4>
                    <p className="text-gray-600">Unmarried sons and daughters (21+)</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-bold">F3: Married Children of U.S. Citizens</h4>
                    <p className="text-gray-600">Married sons and daughters of any age</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-bold">F4: Siblings of U.S. Citizens</h4>
                    <p className="text-gray-600">Brothers and sisters if petitioner is 21+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Special Family Immigration Programs
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">💍</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">K-1 Fiancé(e) Visa</h3>
                <p className="text-gray-600 mb-3">
                  For engaged couples planning to marry in the U.S.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Must marry within 90 days</li>
                  <li>• Includes K-2 for children</li>
                  <li>• Path to green card after marriage</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">K-3/K-4 Visa</h3>
                <p className="text-gray-600 mb-3">For spouses waiting abroad for immigrant visa</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Faster entry while I-130 pending</li>
                  <li>• K-4 for accompanying children</li>
                  <li>• Adjust status in the U.S.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">🎖️</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">V Visa</h3>
                <p className="text-gray-600 mb-3">For certain family members of LPRs</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Long-waiting spouses/children</li>
                  <li>• Work authorization included</li>
                  <li>• Special eligibility requirements</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl mb-3">👨‍👩‍👧</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">Adoption Immigration</h3>
                <p className="text-gray-600 mb-3">For internationally adopted children</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Hague & non-Hague adoptions</li>
                  <li>• Orphan petitions</li>
                  <li>• Citizenship for adoptees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Family Petition Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">File I-130 Petition</h3>
                  <p className="text-gray-600 text-sm">
                    Submit family relationship petition with supporting documents to USCIS.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">USCIS Processing</h3>
                  <p className="text-gray-600 text-sm">
                    Wait for petition approval (processing times vary by category).
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Priority Date</h3>
                  <p className="text-gray-600 text-sm">
                    Track visa availability based on priority date and category.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">NVC Processing</h3>
                  <p className="text-gray-600 text-sm">
                    Complete National Visa Center requirements and documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Interview & Approval</h3>
                  <p className="text-gray-600 text-sm">
                    Attend consular interview or adjust status in the U.S.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Challenges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Overcoming Common Challenges</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">Documentation Issues</h3>
                <p className="text-gray-600 text-sm">
                  We help obtain missing birth certificates, marriage records, and other vital
                  documents from any country.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">Prior Immigration Violations</h3>
                <p className="text-gray-600 text-sm">
                  We identify waivers and solutions for unlawful presence, misrepresentation, or
                  other issues.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">Public Charge Concerns</h3>
                <p className="text-gray-600 text-sm">
                  We prepare strong affidavits of support and overcome financial eligibility
                  requirements.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-3 text-blue-800">Long Wait Times</h3>
                <p className="text-gray-600 text-sm">
                  We explore all options to expedite cases and keep families together during
                  processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Reuniting Families Since 2005</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-blue-700 mb-2">10,000+</div>
                <p className="text-gray-600">Families Reunited</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-blue-700 mb-2">95%</div>
                <p className="text-gray-600">Approval Rate</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-blue-700 mb-2">50+</div>
                <p className="text-gray-600">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Reunite Your Family?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let immigration law keep you apart. Our experienced attorneys will guide you
            through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Start Your Petition
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
