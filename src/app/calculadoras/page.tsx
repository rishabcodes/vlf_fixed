import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Calculadoras | Vasquez Law Firm',
  description: 'Page content for Calculadoras',
};

export default function calculadorasPage() {
  componentLogger.info('calculadorasPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Calculadoras</h1>
        <p className="text-lg text-gray-600">
          This page is under development.
        </p>
      </div>
    </div>
  );
}
