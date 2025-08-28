import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Vasquez Law Firm',
  description:
    'Learn about how Vasquez Law Firm uses cookies and similar technologies on our website to enhance your browsing experience and provide our services.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <p className="text-sm text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
              <p>
                This Cookie Policy explains how Vasquez Law Firm, PLLC ("we," "us," or "our") uses 
                cookies and similar technologies on our website www.vasquezlawnc.com. By using our 
                website, you consent to the use of cookies in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. 
                They help websites remember information about your visit, such as your preferences and 
                settings, which can make your next visit easier and more useful.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function properly. They enable basic 
                functions like page navigation and access to secure areas of the website. The website 
                cannot function properly without these cookies.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytical/Performance Cookies</h3>
              <p className="mb-4">
                These cookies help us understand how visitors interact with our website by collecting 
                and reporting information anonymously. This helps us improve our website's performance 
                and user experience.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Functionality Cookies</h3>
              <p className="mb-4">
                These cookies enable the website to provide enhanced functionality and personalization, 
                such as remembering your language preference or region.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Marketing Cookies</h3>
              <p>
                These cookies track your online activity to help advertisers deliver more relevant 
                advertising or to limit how many times you see an ad. These cookies can share that 
                information with other organizations or advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p>
                We may use third-party services that set cookies on our behalf. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and improvement</li>
                <li><strong>Google Maps:</strong> For displaying our office locations</li>
                <li><strong>Social Media Platforms:</strong> For social media integration and sharing</li>
                <li><strong>Chat Services:</strong> For providing live chat support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Long Do Cookies Stay?</h2>
              <p>
                The length of time a cookie stays on your device depends on its type:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session cookies:</strong> These are temporary and expire when you close your browser</li>
                <li><strong>Persistent cookies:</strong> These remain on your device for a set period or until you delete them</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
              <p>
                You can control and manage cookies in various ways:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Browser Settings</h3>
              <p className="mb-4">
                Most browsers allow you to refuse or accept cookies. You can usually find these 
                settings in the "options" or "preferences" menu of your browser. Here are links to 
                cookie management information for common browsers:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 underline">Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 underline">Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 underline">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Opt-Out Links</h3>
              <p>
                You can opt out of certain third-party cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 underline">Google Analytics Opt-out</a></li>
                <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 underline">Digital Advertising Alliance Opt-out</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
              <p>
                Please note that if you disable or refuse cookies, some parts of our website may 
                become inaccessible or not function properly. You may not be able to use certain 
                features, such as remembering your language preference or staying logged in to 
                secure areas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for legal, operational, or regulatory reasons. We will post any changes on this page 
                with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p>
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> <a href="mailto:privacy@vasquezlawfirm.com" className="text-primary hover:text-primary-600 underline">privacy@vasquezlawfirm.com</a></p>
                <p><strong>Phone:</strong> 1-844-YO-PELEO (1-844-967-3536)</p>
                <p><strong>Address:</strong> 612 S Brightleaf Blvd, Smithfield, NC 27577</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Policies</h2>
              <p>
                For more information about how we handle your data, please see our{' '}
                <Link href="/privacy-policy" className="text-primary hover:text-primary-600 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
  );
}
