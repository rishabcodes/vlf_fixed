import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'The Role Of Asylum In Immigration Law | Vasquez Law Firm',
  description: 'Página en español para The Role Of Asylum In Immigration Law',
};

export default function theroleofasyluminimmigrationlawPage() {
  componentLogger.info('the-role-of-asylum-in-immigration-lawPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">The Role Of Asylum In Immigration Law</h1>
        <p className="text-lg text-gray-600">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
