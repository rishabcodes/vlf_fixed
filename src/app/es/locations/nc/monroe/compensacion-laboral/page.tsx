import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Compensación Laboral - Monroe | Vasquez Law Firm`,
  description: `Compensación Laboral services in Monroe. Experienced attorneys serving the local community.`,
};

export default function MonroeWorkersCompensationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Compensación Laboral in Monroe</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Monroe workers compensation. We provide comprehensive legal
        services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in workers compensation.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contacto Us</h2>
          <p>Get in touch with our Monroe office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
