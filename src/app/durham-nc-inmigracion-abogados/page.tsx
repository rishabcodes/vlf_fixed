import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Durham Nc Immigration Lawyers | Vasquez Law Firm',
  description: 'Página en español para Durham Nc Immigration Lawyers',
};

export default function durhamncimmigrationlawyersPage() {
  componentLogger.info('durham-nc-immigration-lawyersPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Durham Nc Immigration Lawyers</h1>
        <p className="text-lg text-gray-600">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
