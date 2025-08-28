import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Vasquez Law Firm',
  description: 'Terms of service for using the Vasquez Law Firm website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">Terms of Service</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the Vasquez Law Firm, PLLC website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              No Abogado-Client Relationship
            </h2>
            <p className="mb-4">
              The use of this website does not create an attorney-client relationship. An
              attorney-client relationship is only formed when you have signed an engagement
              agreement with Vasquez Law Firm, PLLC.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Legal Information Disclaimer
            </h2>
            <p className="mb-4">
              The information provided on this website is for general informational purposes only
              and should not be construed as legal advice. Laws change frequently and vary by
              jurisdiction. You should consult with a qualified attorney for advice regarding your
              specific legal matter.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Confidentiality Warning</h2>
            <p className="mb-4">
              Do not send confidential information through this website until an attorney-client
              relationship has been established. Information sent before establishing such a
              relationship is not protected by attorney-client privilege.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, and images, is the
              property of Vasquez Law Firm, PLLC and is protected by copyright and other
              intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Limitation of Liability</h2>
            <p className="mb-4">
              Vasquez Law Firm, PLLC shall not be liable for any damages arising from the use or
              inability to use this website or the information contained herein.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Contacto Information</h2>
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
