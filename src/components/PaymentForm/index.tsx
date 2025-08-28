'use client';

import { useState } from 'react';
import { securityLogger } from '@/lib/safe-logger';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

const paymentSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least $1'),
  description: z.string().min(1, 'Description is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
  clientName: z.string().min(1, 'Name is required'),
  clientEmail: z.string().email('Invalid email'),
  trustAccount: z.boolean().optional(),
  saveCard: z.boolean().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  amount?: number;
  description?: string;
  caseId?: string;
  onSuccess?: (result: unknown) => void;
  onCancel?: () => void;
  gateway?: 'authorize.net' | 'lawpay';
}

export default function PaymentForm({
  amount,
  description,
  caseId,
  onSuccess,
  onCancel,
  gateway = 'authorize.net',
}: PaymentFormProps) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(gateway);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: amount || 0,
      description: description || '',
      clientName: user?.name || '',
      clientEmail: user?.email || '',
      trustAccount: false,
      saveCard: false,
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);

    try {
      const endpoint =
        selectedGateway === 'lawpay' ? '/api/payment/lawpay' : '/api/payment/authorize-net';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          caseId,
          paymentMethod: {
            type: 'card',
            cardNumber: data.cardNumber,
            expiryDate: data.expiryDate,
            cvv: data.cvv,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Payment processed successfully!');
        onSuccess?.(result);
      } else {
        toast.error(result.error || 'Payment failed');
      }
    } catch (error) {
      toast.error('An error occurred processing your payment');
      securityLogger.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Gateway Selection */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setSelectedGateway('authorize.net')}
            className={`p-3 border rounded-lg text-center transition-colors ${
              selectedGateway === 'authorize.net'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <span className="font-medium">Standard Payment</span>
            <span className="text-xs block text-gray-500 dark:text-gray-400">
              Credit/Debit Card
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedGateway('lawpay')}
            className={`p-3 border rounded-lg text-center transition-colors ${
              selectedGateway === 'lawpay'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <span className="font-medium">LawPay</span>
            <span className="text-xs block text-gray-500 dark:text-gray-400">Trust Compatible</span>
          </button>
        </div>
      </div>

      {/* Trust Account Option (LawPay only) */}
      {selectedGateway === 'lawpay' && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="trustAccount"
          />
          <label
            htmlFor="trustAccount"
            className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
          >
            Deposit to Trust Account
          </label>
        </div>
      )}

      {/* Amount and Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
          />
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <input
            type="text"
            placeholder="Legal services payment"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="clientName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="clientEmail"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
          />
          {errors.clientEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.clientEmail.message}</p>
          )}
        </div>
      </div>

      {/* Card Information */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Card Number
          </label>
          <input
            type="text"
            {...register('cardNumber')}
            maxLength={16}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Expiry Date
            </label>
            <input
              type="text"
              {...register('expiryDate')}
              maxLength={5}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              CVV
            </label>
            <input
              type="text"
              {...register('cvv')}
              maxLength={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              placeholder="123"
            />
            {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>}
          </div>
        </div>
      </div>

      {/* Save Card Option */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveCard"
        />
        <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
          Save card for future payments
        </label>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
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
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Secure Payment Processing
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p>
                Your payment information is encrypted and processed securely through our
                {selectedGateway === 'lawpay' ? ' LawPay ' : ' Authorize.Net '}
                gateway. We never store your full card details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isProcessing}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Pay $${watch('amount') || 0}`}
        </button>
      </div>
    </form>
  );
}
