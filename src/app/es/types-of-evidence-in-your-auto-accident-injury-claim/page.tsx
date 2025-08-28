import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Types Of Evidence In Your Auto Accident Injury Claim | Vasquez Law Firm',
  description: 'Página en español para Types Of Evidence In Your Auto Accident Injury Claim',
};

export default function typesofevidenceinyourautoaccidentinjuryclaimPage() {
  componentLogger.info('types-of-evidence-in-your-auto-accident-injury-claimPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Types Of Evidence In Your Auto Accident Injury Claim</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
