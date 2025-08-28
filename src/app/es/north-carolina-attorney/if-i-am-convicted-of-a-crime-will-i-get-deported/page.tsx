import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'If I Am Convicted Of A Crime Will I Get Deported | Vasquez Law Firm',
  description: 'Página en español para If I Am Convicted Of A Crime Will I Get Deported',
};

export default function ifiamconvictedofacrimewilligetdeportedPage() {
  componentLogger.info('if-i-am-convicted-of-a-crime-will-i-get-deportedPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">If I Am Convicted Of A Crime Will I Get Deported</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
