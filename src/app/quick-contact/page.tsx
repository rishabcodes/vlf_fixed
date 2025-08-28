import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Contact | Get Help in 60 Seconds | Vasquez Law Firm',
  description: 'Need legal help fast? Send us a quick message and get a response within minutes. Available 24/7 for urgent legal matters.',
  keywords: 'quick contact lawyer, urgent legal help, fast attorney response, emergency legal contact',
  openGraph: {
    title: 'Quick Contact - Get Legal Help Fast',
    description: 'Send a quick message and get a response within minutes. 24/7 availability.',
  },
};

export default function QuickContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Contact
            </h1>
            <p className="text-xl text-gray-600">
              Get legal help in 60 seconds or less
            </p>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                  Legal Issue* (Select one)
                </label>
                <select
                  id="issue"
                  name="issue"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select your legal issue</option>
                  <option value="immigration">Immigration</option>
                  <option value="personal-injury">Personal Injury / Accident</option>
                  <option value="criminal">Criminal Defense</option>
                  <option value="workers-comp">Workers Compensation</option>
                  <option value="family">Family Law / Divorce</option>
                  <option value="traffic">Traffic Violations</option>
                  <option value="other">Other Legal Matter</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Brief Description* (Max 200 characters)
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={200}
                  rows={3}

                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Briefly describe your situation..."
                />
                <p className="text-xs text-gray-500 mt-1">Keep it short - we'll call for details</p>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Quick Message
              </button>
            </form>

            {/* Alternative Contact Options */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">Need immediate assistance?</p>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:1-844-967-3536"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href="/ai-consultation"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Live Chat
                </a>
              </div>
            </div>
          </div>

          {/* Response Time Promise */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-green-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Average response time: Under 5 minutes</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              During business hours (8:30 AM - 5:30 PM EST)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
