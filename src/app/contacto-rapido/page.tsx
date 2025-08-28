import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Contacto Rapido | Vasquez Law Firm',
  description: 'Page content for Contacto Rapido',
};

export default function contactorapidoPage() {
  componentLogger.info('contacto-rapidoPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contacto Rapido</h1>
        <p className="text-lg text-gray-600">
          This page is under development.
        </p>
      </div>
    </div>
  );
}
