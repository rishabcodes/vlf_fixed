import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Orlando Fl Workers Comp Lawyers | Vasquez Law Firm',
  description: 'Página en español para Orlando Fl Workers Comp Lawyers',
};

export default function orlandoflworkerscomplawyersPage() {
  componentLogger.info('orlando-fl-workers-comp-lawyersPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Orlando Fl Workers Comp Lawyers</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
