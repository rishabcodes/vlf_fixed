import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Violencia Domestica | Vasquez Law Firm',
  description: 'Page content for Violencia Domestica',
};

export default function violenciadomesticaPage() {
  componentLogger.info('violencia-domesticaPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Violencia Domestica</h1>
        <p className="text-lg text-gray-600">
          This page is under development.
        </p>
      </div>
    </div>
  );
}
