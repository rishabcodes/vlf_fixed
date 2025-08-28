import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Family Law - Indian Trail | Vasquez Law Firm`,
  description: `Family Law services in Indian Trail. Experienced attorneys serving the local community.`,
};

export default function IndianTrailFamilyLawPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Family Law in Indian Trail</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Indian Trail family law. We provide comprehensive legal
        services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in family law.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>Get in touch with our Indian Trail office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
