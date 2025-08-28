import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title: 'Steps To Take If Your Workers Comp Claim Is Denied In North Carolina | Vasquez Law Firm',
  description: 'Página en español para Steps To Take If Your Workers Comp Claim Is Denied In North Carolina',
};

export default function stepstotakeifyourworkerscompclaimisdeniedinnorthcarolinaPage() {
  componentLogger.info('steps-to-take-if-your-workers-comp-claim-is-denied-in-north-carolinaPage.render', {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Steps To Take If Your Workers Comp Claim Is Denied In North Carolina</h1>
        <p className="text-lg text-gray-600">
          Esta página está en desarrollo.
        </p>
      </div>
    </div>
  );
}
