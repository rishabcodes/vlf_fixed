import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Immigration Appeals Lawyers | BIA & Federal Court Appeals',
  description:
    "Expert immigration appeals attorneys. We handle BIA appeals, federal court petitions, motions to reopen, and administrative appeals. Don't give up - appeal.",
  keywords:
    'immigration appeals, BIA appeal, federal court appeal, motion to reopen, immigration appeal lawyer, circuit court',
};

export default function AppealsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-900 to-red-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Immigration Appeals</h1>
            <p className="text-xl mb-8">Your Case Isn't Over - Fight Unfavorable Decisions</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Appeal Consultation
              </Link>
              <a
                href="tel:1-800-555-0199"
                className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                Call: 1-800-555-0199
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Appeal Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Types of Immigration Appeals We Handle
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-800">
                  Board of Immigration Appeals (BIA)
                </h3>
                <p className="text-gray-600 mb-4">
                  Appeal unfavorable immigration judge decisions to the BIA.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Removal order appeals
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Denied asylum/cancellation appeals
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Bond denial appeals
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    30-day deadline from decision
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-800">Federal Court Appeals</h3>
                <p className="text-gray-600 mb-4">
                  Challenge BIA decisions in U.S. Circuit Courts of Appeals.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Petition for review
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Constitutional challenges
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Due process violations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    30-day deadline from BIA order
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-800">
                  USCIS Administrative Appeals
                </h3>
                <p className="text-gray-600 mb-4">
                  Appeal denied applications to the Administrative Appeals Office.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    I-130/I-140 denials
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Waiver denials
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Revocations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    30-33 day deadlines
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-red-800">
                  Motions to Reopen/Reconsider
                </h3>
                <p className="text-gray-600 mb-4">
                  Request case reopening based on new evidence or legal errors.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    New evidence discovery
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Changed country conditions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Ineffective counsel claims
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    90-day deadline typically
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appeal Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Appeals Process</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Case Review & Analysis</h3>
                  <p className="text-gray-600">
                    We thoroughly review the record, identify legal errors, and assess appeal
                    viability.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Notice of Appeal Filing</h3>
                  <p className="text-gray-600">
                    File timely notice of appeal to preserve your rights and stop removal.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Brief Preparation</h3>
                  <p className="text-gray-600">
                    Draft comprehensive legal briefs citing relevant law and highlighting errors.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Oral Argument</h3>
                  <p className="text-gray-600">
                    Present compelling arguments before appellate judges when scheduled.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Decision & Next Steps</h3>
                  <p className="text-gray-600">
                    Receive decision and pursue further appeals or remand proceedings if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Grounds */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Common Grounds for Appeal</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-red-800">Legal Errors</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Incorrect application of law</li>
                  <li>• Failure to consider evidence</li>
                  <li>• Wrong legal standard applied</li>
                  <li>• Misinterpretation of statutes</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-red-800">Procedural Violations</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Due process violations</li>
                  <li>• Improper notice</li>
                  <li>• Biased judge</li>
                  <li>• Right to counsel violations</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-red-800">Factual Errors</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Clearly erroneous findings</li>
                  <li>• Ignored evidence</li>
                  <li>• Credibility errors</li>
                  <li>• Mischaracterized testimony</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-red-800">Constitutional Issues</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Equal protection violations</li>
                  <li>• Retroactive law application</li>
                  <li>• Ineffective assistance</li>
                  <li>• Jurisdictional defects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Critical */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-red-900">⏰ Time is Critical</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-xl text-gray-700 mb-6">
                Most immigration appeals have strict deadlines - typically 30 days from the decision
                date.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-red-100 p-4 rounded">
                  <div className="text-3xl font-bold text-red-700">30</div>
                  <p className="text-sm">Days for BIA Appeals</p>
                </div>
                <div className="bg-red-100 p-4 rounded">
                  <div className="text-3xl font-bold text-red-700">30</div>
                  <p className="text-sm">Days for Federal Court</p>
                </div>
                <div className="bg-red-100 p-4 rounded">
                  <div className="text-3xl font-bold text-red-700">90</div>
                  <p className="text-sm">Days for Motions</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-red-800">
                Missing the deadline means losing your right to appeal forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Our Appeals Success</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">1,200+</div>
                <p className="text-gray-600">Appeals Filed</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">78%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">15</div>
                <p className="text-gray-600">Circuit Courts</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-red-700 mb-2">24/7</div>
                <p className="text-gray-600">Deadline Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Accept Defeat</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            An unfavorable decision doesn't have to be final. Our appellate attorneys know how to
            win on appeal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-red-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Start Your Appeal
            </Link>
            <a
              href="tel:1-800-555-0199"
              className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Urgent: 1-800-555-0199
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
