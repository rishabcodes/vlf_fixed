import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'When Can Criminal Cases Affect A Person S Immigration Status | Vasquez Law Firm',
  description:
    'Página en español para When Can Criminal Cases Affect A Person S Immigration Status',
};

export default function whencancriminalcasesaffectapersonsimmigrationstatusPage() {
  componentLogger.info(
    'when-can-criminal-cases-affect-a-person-s-immigration-statusPage.render',
    {}
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          When Can Criminal Cases Affect A Person S Immigration Status
        </h1>
        <p className="text-lg text-gray-600">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
