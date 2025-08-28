import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Politica De Privacidad | Vasquez Law Firm',
  description: 'Página en español para Politica De Privacidad',
};

export default function politicadeprivacidadPage() {
  componentLogger.info('politica-de-privacidadPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Politica De Privacidad</h1>
        <p className="text-lg text-gray-600">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
