import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Spanish Speaking Abogado - Kannapolis | Vasquez Law Firm`,
  description: `Spanish Speaking Abogado services in Kannapolis. Experienced attorneys serving the local community.`,
};

export default function KannapolisSpanishSpeakingAbogadoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Spanish Speaking Abogado in Kannapolis</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Kannapolis spanish speaking lawyer. We provide comprehensive
        legal services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in spanish speaking lawyer.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contacto Us</h2>
          <p>Get in touch with our Kannapolis office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
