import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Disclaimer | Vasquez Law Firm',
  description:
    'Legal disclaimer and terms of use for Vasquez Law Firm website. Important information about attorney-client relationships and legal advice.',
  robots: 'noindex, follow',
};

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal Disclaimer</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Attorney-Client Relationship</h2>
              <p>
                The information contained on this website is for general information purposes only. 
                Nothing on this site should be taken as legal advice for any individual case or situation. 
                This information is not intended to create, and receipt or viewing does not constitute, 
                an attorney-client relationship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Legal Advice</h2>
              <p>
                The content on this website is provided for informational purposes only and should not 
                be construed as legal advice. The information may not apply to your specific situation 
                and may not be complete or up-to-date. You should contact an attorney to obtain advice 
                with respect to any particular legal matter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Confidentiality</h2>
              <p>
                Do not send any confidential or sensitive information through this website or via email 
                unless you have established an attorney-client relationship with Vasquez Law Firm, PLLC. 
                Any information sent before establishing such a relationship is not protected by 
                attorney-client privilege.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Results and Testimonials</h2>
              <p>
                Past results do not guarantee future outcomes. Each case is unique and must be evaluated 
                on its own merits. The outcome of a particular case cannot be based upon a lawyer's or 
                law firm's past results. Testimonials or endorsements do not constitute a guarantee, 
                warranty, or prediction regarding the outcome of your legal matter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jurisdiction</h2>
              <p>
                Vasquez Law Firm, PLLC is licensed to practice law in North Carolina and Florida. 
                We do not seek to represent anyone based solely on a visit to this website in a 
                jurisdiction where this website does not comply with all applicable laws and ethical rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">External Links</h2>
              <p>
                This website may contain links to external websites. Vasquez Law Firm, PLLC is not 
                responsible for the content, accuracy, or opinions expressed in such websites, and 
                such websites are not investigated, monitored, or checked for accuracy or completeness 
                by us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this legal disclaimer, please{' '}
                <Link href="/contact" className="text-primary hover:text-primary-600 underline">
                  contact us
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
  );
}
