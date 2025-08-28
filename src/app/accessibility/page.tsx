import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Vasquez Law Firm',
  description:
    'Vasquez Law Firm is committed to ensuring digital accessibility for people with disabilities. Learn about our accessibility efforts and how to contact us for assistance.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Accessibility Statement</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
              <p>
                Vasquez Law Firm, PLLC is committed to ensuring digital accessibility for people with 
                disabilities. We are continually improving the user experience for everyone and applying 
                the relevant accessibility standards to achieve equal access to our online content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Standards</h2>
              <p>
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. 
                These guidelines explain how to make web content more accessible for people with 
                disabilities and more user-friendly for everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Features</h2>
              <p>Our website includes the following accessibility features:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Alternative text for images</li>
                <li>Clear heading structure for easy navigation</li>
                <li>Sufficient color contrast for text and backgrounds</li>
                <li>Keyboard navigation support</li>
                <li>Form labels and instructions</li>
                <li>Responsive design for various devices and screen sizes</li>
                <li>Clear and consistent navigation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ongoing Efforts</h2>
              <p>
                We are actively working to increase the accessibility and usability of our website. 
                Our efforts include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Regular accessibility audits</li>
                <li>Staff training on accessibility best practices</li>
                <li>Integration of accessibility into our design and development processes</li>
                <li>Consultation with accessibility experts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browser Compatibility</h2>
              <p>
                Our website is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                <li>Screen magnification software</li>
                <li>Speech recognition software</li>
                <li>Keyboard navigation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Known Limitations</h2>
              <p>
                While we strive for accessibility, some areas of our website may have limitations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Some older PDF documents may not be fully accessible</li>
                <li>Third-party content or tools may have varying levels of accessibility</li>
                <li>Some interactive features may require JavaScript</li>
              </ul>
              <p className="mt-4">
                We are working to address these limitations and improve accessibility across all content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p>
                We welcome your feedback on the accessibility of our website. If you encounter any 
                accessibility barriers or need assistance accessing our content, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Phone:</strong> 1-844-YO-PELEO (1-844-967-3536)</p>
                <p><strong>Email:</strong> <a href="mailto:accessibility@vasquezlawfirm.com" className="text-primary hover:text-primary-600 underline">accessibility@vasquezlawfirm.com</a></p>
                <p><strong>Address:</strong> 612 S Brightleaf Blvd, Smithfield, NC 27577</p>
              </div>
              <p className="mt-4">
                Please provide specific details about the accessibility issue and any assistive 
                technology you were using. We will make every effort to respond to accessibility 
                feedback within 2 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Support</h2>
              <p>
                If you need assistance with any of our services due to a disability, our team is 
                ready to help. We can provide:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Documents in alternative formats</li>
                <li>Communication through your preferred method</li>
                <li>Additional time for appointments if needed</li>
                <li>Accessible meeting locations</li>
                <li>Sign language interpreters upon request</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
  );
}
