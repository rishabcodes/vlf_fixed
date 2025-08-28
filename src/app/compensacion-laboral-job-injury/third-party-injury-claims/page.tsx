import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Third Party Injury Claims | Vasquez Law Firm',
  description: 'Página en español para Third Party Injury Claims',
};

export default function thirdpartyinjuryclaimsPage() {
  componentLogger.info('third-party-injury-claimsPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Third Party Injury Claims</h1>
        <p className="text-lg text-gray-600">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
