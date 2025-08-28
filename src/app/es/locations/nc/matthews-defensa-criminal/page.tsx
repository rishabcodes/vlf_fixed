import { Metadata } from 'next';

export const metadata: Metadata = {
  title: ` in Matthews Defensa Criminal | Vasquez Law Firm`,
  description: `Expert  in Matthews Defensa Criminal. Experienced legal representation.`,
};

export default function MatthewsDefensaCriminalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4"> in Matthews Defensa Criminal</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Matthews Defensa Criminal office. We provide expert services
        to the local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer comprehensive services tailored to your needs.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Local expertise in Matthews Defensa Criminal</li>
            <li>Experienced </li>
            <li>Personalized attention to your case</li>
            <li>Convenient location </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contacto Us Today</h2>
          <p>
            Don't wait - reach out to our Matthews Defensa Criminal office for immediate assistance.
          </p>
        </section>
      </div>
    </div>
  );
}
