import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Bankruptcy - Gastonia | Vasquez Law Firm`,
  description: `Bankruptcy services in Gastonia. Experienced attorneys serving the local community.`,
};

export default function GastoniaBankruptcyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Bankruptcy in Gastonia</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Gastonia bankruptcy. We provide comprehensive legal services
        to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in bankruptcy.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contacto Us</h2>
          <p>Get in touch with our Gastonia office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
