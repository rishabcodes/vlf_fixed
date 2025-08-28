import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'William Vasquez Abogado | Vasquez Law Firm',
  description: 'Página en español para William Vasquez Abogado',
};

export default function williamvasquezabogadoPage() {
  componentLogger.info('william-vasquez-abogadoPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">William Vasquez Abogado</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
