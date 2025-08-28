import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Immigration - Rocky Mount | Vasquez Law Firm`,
  description: `Immigration services in Rocky Mount. Experienced attorneys serving the local community.`,
};

export default function RockyMountImmigrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Immigration in Rocky Mount</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Rocky Mount immigration. We provide comprehensive legal
        services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in immigration.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>Get in touch with our Rocky Mount office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
