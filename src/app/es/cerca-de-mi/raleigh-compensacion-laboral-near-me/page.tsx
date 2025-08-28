import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Workers compensation Near Me in Raleigh | Vasquez Law Firm`,
  description: `Find the best workers compensation near you in Raleigh. Experienced legal representation.`,
};

export default function RaleighWorkerscompensationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Workers compensation Near Me in Raleigh</h1>
      <p className="text-lg mb-6">
        Looking for a workers compensation near you in Raleigh? Vasquez Law Firm provides
        experienced legal representation right in your neighborhood.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Local Legal Services</h2>
          <p>
            We understand the importance of having a lawyer who knows your community and local laws.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Local expertise in Raleigh</li>
            <li>Experienced workers compensation</li>
            <li>Personalized attention to your case</li>
            <li>Convenient location near you</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us Today</h2>
          <p>Don't wait - reach out to our Raleigh office for immediate assistance.</p>
        </section>
      </div>
    </div>
  );
}
