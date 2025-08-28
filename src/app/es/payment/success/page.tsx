import { Suspense } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function PaymentSuccessContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>

        <p className="text-gray-600 mb-8">
          Thank you for your payment. We have received your payment and will send you a confirmation
          email shortly.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Payment Reference:{' '}
            <span className="font-mono">
              {typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search).get('reference')
                : ''}
            </span>
          </p>

          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/contact">Contacto Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
