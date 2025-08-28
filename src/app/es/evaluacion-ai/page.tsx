import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Evaluacion Ai | Vasquez Law Firm',
  description: 'Página en español para Evaluacion Ai',
};

export default function evaluacionaiPage() {
  componentLogger.info('evaluacion-aiPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Evaluacion Ai</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
