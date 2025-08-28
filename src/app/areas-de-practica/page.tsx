import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Areas De Practica | Vasquez Law Firm',
  description: 'Page content for Areas De Practica',
};

export default function areasdepracticaPage() {
  componentLogger.info('areas-de-practicaPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Areas De Practica</h1>
        <p className="text-lg text-gray-600">
          This page is under development.
        </p>
      </div>
    </div>
  );
}
