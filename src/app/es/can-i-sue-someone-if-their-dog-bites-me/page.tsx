import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Can I Sue Someone If Their Dog Bites Me | Vasquez Law Firm',
  description: 'Página en español para Can I Sue Someone If Their Dog Bites Me',
};

export default function canisuesomeoneiftheirdogbitesmePage() {
  componentLogger.info('can-i-sue-someone-if-their-dog-bites-mePage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Can I Sue Someone If Their Dog Bites Me</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
