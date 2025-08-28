import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Lesiones Personales - Indian Trail | Vasquez Law Firm`,
  description: `Lesiones Personales services in Indian Trail. Experienced attorneys serving the local community.`,
};

export default function IndianTrailPersonalInjuryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Lesiones Personales in Indian Trail</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Indian Trail personal injury. We provide comprehensive legal
        services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in personal injury.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contacto Us</h2>
          <p>Get in touch with our Indian Trail office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
