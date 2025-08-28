import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Can A Lawyer Help Me If I Get A Dwi | Vasquez Law Firm',
  description: 'Página en español para Can A Lawyer Help Me If I Get A Dwi',
};

export default function canalawyerhelpmeifigetadwiPage() {
  componentLogger.info('can-a-lawyer-help-me-if-i-get-a-dwiPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Can A Lawyer Help Me If I Get A Dwi</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
