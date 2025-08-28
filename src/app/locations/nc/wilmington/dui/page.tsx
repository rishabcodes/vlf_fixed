import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Dui - Wilmington | Vasquez Law Firm`,
  description: `Dui services in Wilmington. Experienced attorneys serving the local community.`,
};

export default function WilmingtonDuiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Dui in Wilmington</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Wilmington dui. We provide comprehensive legal services to the
        local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in dui.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>Get in touch with our Wilmington office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
