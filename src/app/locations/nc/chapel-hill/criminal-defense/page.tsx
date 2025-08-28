import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Criminal Defense - Chapel Hill | Vasquez Law Firm`,
  description: `Criminal Defense services in Chapel Hill. Experienced attorneys serving the local community.`,
};

export default function ChapelHillCriminalDefensePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Criminal Defense in Chapel Hill</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Chapel Hill criminal defense. We provide comprehensive legal
        services to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer expert legal representation in criminal defense.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>Get in touch with our Chapel Hill office today for a consultation.</p>
        </section>
      </div>
    </div>
  );
}
