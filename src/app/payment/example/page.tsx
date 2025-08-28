'use client';

import { useState } from 'react';
import { LawPayButton } from '@/components/payment/LawPayButton';
import { toast } from 'sonner';

export default function PaymentExamplePage() {
  const [amount, setAmount] = useState(500);
  const [trustAccount, setTrustAccount] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">LawPay Payment Example</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
                step="0.01"
              />
            </div>

            <div>
              <label
                className="flex items-center">
                <input
                  type="checkbox"
                  checked={trustAccount}
                  onChange={e => setTrustAccount(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Use Trust Account</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Make Payment</h2>

          <LawPayButton
            amount={amount}
            description="Legal Services Payment"
            clientName="Test Client"
            clientEmail="test@example.com"
            clientPhone="919-555-0123"
            invoiceNumber={`INV-${Date.now()}`}
            trustAccount={trustAccount}
                onSuccess={() => {
              toast.success('Payment initiated successfully!');
            }}
            onError={error => {
              toast.error(`Payment failed: ${error}`);
            }}
            className="w-full"
          >
            Pay ${amount.toFixed(2)} with LawPay
          </LawPayButton>

          <p className="text-sm text-gray-500 mt-4">
            This will redirect you to LawPay's secure payment page.
          </p>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Integration Notes:</h3>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>This uses LawPay's hosted checkout page</li>
            <li>Webhooks handle payment confirmation</li>
            <li>No API key required for basic integration</li>
            <li>Trust and operating accounts supported</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
