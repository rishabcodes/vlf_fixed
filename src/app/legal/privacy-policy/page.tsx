import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vasquez Law Firm',
  description:
    'Privacy policy for Vasquez Law Firm, PLLC. Learn how we protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Information We Collect</h2>
            <p className="mb-4">
              At Vasquez Law Firm, PLLC, we collect information you provide directly to us, such as
              when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us through our website or phone</li>
              <li>Schedule a consultation</li>
              <li>Engage our legal services</li>
              <li>Subscribe to our newsletter</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide legal services and communicate with you</li>
              <li>Process your requests and transactions</li>
              <li>Send administrative information and updates</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Attorney-Client Privilege</h2>
            <p className="mb-4">
              Communications between you and our attorneys are protected by attorney-client
              privilege. We maintain strict confidentiality of all client information in accordance
              with professional ethics rules and applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please
              contact us at:
            </p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold">Vasquez Law Firm, PLLC</p>
              <p>Phone: 1-844-YO-PELEO (1-844-967-3536)</p>
              <p>Email: info@vasquezlawnc.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
