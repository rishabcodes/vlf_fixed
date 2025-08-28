import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';

export const metadata: Metadata = {
  title:
    'Does Workers Compensation Insurance Automatically Cover Every Workplace Injury | Vasquez Law Firm',
  description:
    'Página en español para Does Workers Compensation Insurance Automatically Cover Every Workplace Injury',
};

export default function doesworkerscompensationinsuranceautomaticallycovereveryworkplaceinjuryPage() {
  componentLogger.info(
    'does-workers-compensation-insurance-automatically-cover-every-workplace-injuryPage.render',
    {}
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          Does Workers Compensation Insurance Automatically Cover Every Workplace Injury
        </h1>
        <p className="text-lg text-gray-600">Esta página está en desarrollo.</p>
      </div>
    </div>
  );
}
