import { Suspense } from 'react';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function PaymentCancelContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>

        <p className="text-gray-600 mb-8">
          Your payment has been cancelled. No charges have been made to your account.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/contact">Contact Us for Assistance</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          If you experienced any issues or need help, please don't hesitate to contact us at{' '}
          <a href="tel:919-468-1600" className="text-primary hover:underline">
            (919) 468-1600
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCancelContent />
    </Suspense>
  );
}
