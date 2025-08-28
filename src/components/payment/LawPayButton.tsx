'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/safe-logger';
import { toast } from 'sonner';

interface LawPayButtonProps {
  amount: number;
  description: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  invoiceNumber?: string;
  trustAccount?: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function LawPayButton({
  amount,
  description,
  clientName,
  clientEmail,
  clientPhone,
  invoiceNumber,
  trustAccount = false,
  onSuccess: _onSuccess,
  onError,
  className,
  children = 'Pay Now',
}: LawPayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Create payment record in our database
      const response = await fetch('/api/payment/lawpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          clientName,
          clientEmail,
          clientPhone,
          invoiceNumber,
          trustAccount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }

      const data = await response.json();

      // Since we don't have full API access, we'll use LawPay's hosted payment page
      // You'll need to construct the payment URL based on LawPay's documentation
      const lawPayUrl = buildLawPayUrl({
        amount,
        description,
        clientName,
        clientEmail,
        paymentId: data.paymentId,
        publicKey: data.publicKey,
        trustAccount,
      });

      // Redirect to LawPay hosted payment page
      window.location.href = lawPayUrl;
    } catch (error) {
      logger.error('Payment initialization failed', { error });
      toast.error('Failed to process payment. Please try again.');
      onError?.(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsLoading(false);
        }
};

  return (
    <Button onClick={handlePayment} disabled={isLoading} className={className} size="lg">
      {isLoading ? 'Processing...' : children}
    </Button>
  );
}

// Build LawPay hosted payment URL
function buildLawPayUrl(params: {
  amount: number;
  description: string;
  clientName: string;
  clientEmail: string;
  paymentId: string;
  publicKey: string;
  trustAccount: boolean;
}): string {
  // This is a placeholder - you'll need to update with actual LawPay URL structure
  const baseUrl = 'https://secure.lawpay.com/pay';

  const queryParams = new URLSearchParams({
    key: params.publicKey,
    amount: (params.amount * 100).toString(), // Convert to cents
    description: params.description,
    name: params.clientName,
    email: params.clientEmail,
    account_type: params.trustAccount ? 'trust' : 'operating',
    reference: params.paymentId,
    return_url: `${window.location.origin}/payment/success`,
    cancel_url: `${window.location.origin}/payment/cancel`,
  });

  return `${baseUrl}?${queryParams.toString()}`;
}
