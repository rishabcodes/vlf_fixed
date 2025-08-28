import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Practice Areas Hub | Vasquez Law Firm',
  description: 'Página en español para Practice Areas Hub',
};

export default function practiceareashubPage() {
  componentLogger.info('practice-areas-hubPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Practice Areas Hub</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
