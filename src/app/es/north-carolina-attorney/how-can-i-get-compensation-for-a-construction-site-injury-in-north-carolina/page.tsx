import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'How Can I Get Compensation For A Construction Site Injury In North Carolina | Vasquez Law Firm',
  description: 'Página en español para How Can I Get Compensation For A Construction Site Injury In North Carolina',
};

export default function howcanigetcompensationforaconstructionsiteinjuryinnorthcarolinaPage() {
  componentLogger.info('how-can-i-get-compensation-for-a-construction-site-injury-in-north-carolinaPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">How Can I Get Compensation For A Construction Site Injury In North Carolina</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
