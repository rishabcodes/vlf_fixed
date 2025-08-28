import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Criminal Defense | Vasquez Law Firm',
  description: 'Página en español para Criminal Defense',
};

export default function criminaldefensePage() {
  componentLogger.info('criminal-defensePage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Criminal Defense</h1>
        <p className="text-lg text-gray-600">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
