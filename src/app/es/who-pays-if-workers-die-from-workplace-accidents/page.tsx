import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Who Pays If Workers Die From Workplace Accidents | Vasquez Law Firm',
  description: 'Página en español para Who Pays If Workers Die From Workplace Accidents',
};

export default function whopaysifworkersdiefromworkplaceaccidentsPage() {
  componentLogger.info('who-pays-if-workers-die-from-workplace-accidentsPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Who Pays If Workers Die From Workplace Accidents</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
