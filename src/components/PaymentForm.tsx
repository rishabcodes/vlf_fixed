'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CreditCard, Building2, Loader2 } from 'lucide-react';

const paymentSchema = z.object({
  amount: z.string().refine(val => parseFloat(val) > 0, 'Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  clientName: z.string().min(1, 'Name is required'),
  clientEmail: z.string().email('Valid email required'),
  clientPhone: z.string().optional(),
  paymentType: z.enum(['card', 'ach']),
  trustAccount: z.boolean().default(false),

  // Card fields
  cardNumber: z.string().optional(),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, 'Format: MM/YY')
    .optional(),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, 'Invalid CVV')
    .optional(),

  // ACH fields
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  caseId?: string;
  defaultAmount?: number;
  defaultDescription?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export function PaymentForm({
  caseId,
  defaultAmount,
  defaultDescription,
  onSuccess,
  onError,
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: defaultAmount?.toString() || '',
      description: defaultDescription || '',
      paymentType: 'card',
      trustAccount: false,
    },
  });

  const paymentType = watch('paymentType');
  const trustAccount = watch('trustAccount');

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    setError(null);

    try {
      const paymentMethod =
        data.paymentType === 'card'
          ? {
              type: 'card' as const,
              cardNumber: data.cardNumber,
              expiryDate: data.expiryDate,
              cvv: data.cvv,
            }
          : {
              type: 'ach' as const,
              accountNumber: data.accountNumber,
              routingNumber: data.routingNumber,
            };

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'process',
          amount: parseFloat(data.amount),
          currency: 'USD',
          description: data.description,
          clientEmail: data.clientEmail,
          clientName: data.clientName,
          clientPhone: data.clientPhone,
          caseId,
          paymentMethod,
          options: {
            trustAccount: data.trustAccount,
          },
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        onSuccess?.(result.paymentId);
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment processing failed';
      setError(message);
      onError?.(message);
    } finally {
      setIsProcessing(false);
        }
};

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-green-900">Payment Successful!</h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for your payment. You will receive a receipt via email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit) className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Amount and Description */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount ($)
          </label>
          <input
            {...register('amount') type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="0.00"
          />
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            {...register('description') type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Legal services"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Client Information */}
      <div className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register('clientName') type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('clientEmail') type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.clientEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
              Phone (Optional)
            </label>
            <input
              {...register('clientPhone') type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Account Type */}
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex items-center">
          <input
            {...register('trustAccount') type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="trustAccount" className="ml-2 block text-sm text-gray-900">
            Deposit to Trust Account
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Trust accounts are used for retainers and client funds held in trust
        </p>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
            <input {...register('paymentType') type="radio" value="card" className="sr-only" />
            <div className="flex flex-1">
              <div className="flex flex-col">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span className="mt-1 block text-sm font-medium text-gray-900">
                  Credit/Debit Card
                </span>
              </div>
            </div>
            <div
              className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                paymentType === 'card' ? 'border-blue-500' : 'border-transparent'
              }`}
            />
          </label>

          <label className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
            <input {...register('paymentType') type="radio" value="ach" className="sr-only" />
            <div className="flex flex-1">
              <div className="flex flex-col">
                <Building2 className="h-5 w-5 text-gray-400" />
                <span className="mt-1 block text-sm font-medium text-gray-900">
                  Bank Account (ACH)
                </span>
              </div>
            </div>
            <div
              className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                paymentType === 'ach' ? 'border-blue-500' : 'border-transparent'
              }`}
            />
          </label>
        </div>
      </div>

      {/* Card Details */}
      {paymentType === 'card' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              {...register('cardNumber') type="text"
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                {...register('expiryDate') type="text"
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                {...register('cvv') type="text"
                placeholder="123"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ACH Details */}
      {paymentType === 'ach' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">
              Routing Number
            </label>
            <input
              {...register('routingNumber') type="text"
              placeholder="123456789"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.routingNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.routingNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              {...register('accountNumber') type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.accountNumber.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          `Pay $${watch('amount') || '0.00'}`
        )}
      </button>

      {/* Security Notice */}
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Your payment information is encrypted and processed securely.
              {trustAccount &&
                ' Funds will be held in our IOLTA trust account in compliance with legal ethics rules.'}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
