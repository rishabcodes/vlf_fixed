import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Raleigh in Nc | Vasquez Law Firm`,
  description: `Expert raleigh in Nc. Experienced legal representation.`,
};

export default function NcRaleighPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Raleigh in Nc</h1>
      <p className="text-lg mb-6">
        Welcome to Vasquez Law Firm's Nc office. We provide expert raleigh services to the local
        community.
      </p>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <p>We offer comprehensive raleigh services tailored to your needs.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Local expertise in Nc</li>
            <li>Experienced raleigh</li>
            <li>Personalized attention to your case</li>
            <li>Convenient location </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contacto Us Today</h2>
          <p>Don't wait - reach out to our Nc office for immediate assistance.</p>
        </section>
      </div>
    </div>
  );
}
