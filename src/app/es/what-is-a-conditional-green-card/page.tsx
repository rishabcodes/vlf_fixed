import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'What Is A Conditional Green Card | Vasquez Law Firm',
  description: 'Página en español para What Is A Conditional Green Card',
};

export default function whatisaconditionalgreencardPage() {
  componentLogger.info('what-is-a-conditional-green-cardPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">What Is A Conditional Green Card</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
