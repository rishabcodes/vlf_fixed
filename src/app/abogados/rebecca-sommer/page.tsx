import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Rebecca Sommer | Vasquez Law Firm',
  description: 'Page content for Rebecca Sommer',
};

export default function rebeccasommerPage() {
  componentLogger.info('rebecca-sommerPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Rebecca Sommer</h1>
        <p className="text-lg text-gray-600">
          This page is under development.
        </p>
      </div>
    </div>
  );
}
