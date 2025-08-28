import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Ubicacion Oficina Orlando Fl | Vasquez Law Firm',
  description: 'Page content for Ubicacion Oficina Orlando Fl',
};

export default function ubicacionoficinaorlandoflPage() {
  componentLogger.info('ubicacion-oficina-orlando-flPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Ubicacion Oficina Orlando Fl</h1>
        <p className="text-lg text-gray-600">
          This page is under development.
        </p>
      </div>
    </div>
  );
}
