import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Legal Case Evaluation | Instant Analysis | Vasquez Law Firm',
  description: 'Get instant AI-powered evaluation of your legal case. Our advanced AI analyzes your situation and provides preliminary insights within minutes. Free and confidential.',
  keywords: 'AI case evaluation, instant legal analysis, automated case review, legal AI assessment, case strength evaluation',
  openGraph: {
    title: 'AI Legal Case Evaluation | Free Instant Analysis',
    description: 'Get AI-powered evaluation of your legal case in minutes. Confidential and free preliminary assessment.',
    images: ['/images/ai-evaluation-og.png'],
  },
};

export default function AIEvaluationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Case Evaluation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant insights about your legal case using our advanced AI technology. 
              Receive a preliminary assessment in minutes.
            </p>
          </div>

          {/* Redirect to existing AI consultation */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4">AI Case Analysis System</h2>
              <p className="text-gray-600 mb-8">
                Our AI evaluation system is integrated with our consultation platform. 
                Click below to start your free AI-powered case evaluation.
              </p>
              <a 
                href="/ai-consultation"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Start AI Evaluation
              </a>
              <p className="text-sm text-gray-500 mt-4">
                No registration required • 100% confidential • Results in minutes
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Analysis</h3>
              <p className="text-gray-600">Get preliminary case insights in minutes, not days</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Confidential</h3>
              <p className="text-gray-600">Your information is secure and protected</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Smart Insights</h3>
              <p className="text-gray-600">AI-powered analysis of case strengths and considerations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
