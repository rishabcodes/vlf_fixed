import { Metadata } from 'next';

export const metadata: Metadata = {
  title: ` in Durham Inmigracion | Vasquez Law Firm`,
  description: `Expert  in Durham Inmigracion. Experienced legal representation.`,
};

export default function DurhamInmigracionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4"> in Durham Inmigracion</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Durham Inmigracion office. We provide expert services to the
        local community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer comprehensive services tailored to your needs.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Local expertise in Durham Inmigracion</li>
            <li>Experienced </li>
            <li>Personalized attention to your case</li>
            <li>Convenient location </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us Today</h2>
          <p>Don't wait - reach out to our Durham Inmigracion office for immediate assistance.</p>
        </section>
      </div>
    </div>
  );
}
