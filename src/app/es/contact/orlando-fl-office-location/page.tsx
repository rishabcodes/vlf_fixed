import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Orlando Fl Office Location | Vasquez Law Firm',
  description: 'Página en español para Orlando Fl Office Location',
};

export default function orlandoflofficelocationPage() {
  componentLogger.info('orlando-fl-office-locationPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Orlando Fl Office Location</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
