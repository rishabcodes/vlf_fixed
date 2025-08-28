'use client';

import { useEffect, useState, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { formatCurrency, formatDate } from '@/lib/utils/format';

interface Payment {
  id: string;
  paymentNumber: string;
  invoiceId?: string;
  invoiceNumber?: string;
  amount: number;
  method: {
    type: 'card' | 'bank' | 'check' | 'cash';
    last4?: string;
  };
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  processedAt: string;
  description: string;
  caseTitle?: string;
}

interface PaymentHistoryProps {
  clientId: string;
}

export default function PaymentHistory({ clientId }: PaymentHistoryProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });

  const fetchPayments = useCallback(async () => {
    try {
      const params = new URLSearchParams({ clientId });
      if (dateRange.start) params.append('startDate', dateRange.start);
      if (dateRange.end) params.append('endDate', dateRange.end);

      const response = await fetch(`/api/portal/payments?${params}`);
      const data = await response.json();

      if (data.success) {
        setPayments(data.payments);
      }
    } catch (error) {
      logger.error('Failed to fetch payments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [clientId, dateRange]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const downloadReceipt = useCallback(async (paymentId: string) => {
    try {
      const response = await fetch(`/api/portal/payments/${paymentId}/receipt`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      if (a.parentNode) {
        a.parentNode.removeChild(a);
      }
    } catch (error) {
      logger.error('Failed to download receipt:', error);
    }
  }, []);

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
        }
};

  const getMethodIcon = (type: Payment['method']['type']) => {
    switch (type) {
      case 'card':
        return '💳';
      case 'bank':
        return '🏦';
      case 'check':
        return '📄';
      case 'cash':
        return '💵';
      default:
        return '💰';
        }
};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="date"
              id="start-date"
              value={dateRange.start}
              onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="date"
              id="end-date"
              value={dateRange.end}
              onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            onClick={() => setDateRange({ start: '', end: '' })}

                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Payments</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">{payments.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {formatCurrency(
              payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
            )}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-500">Last Payment</h3>
          <p className="mt-2 text-sm text-gray-900">
            {payments.length > 0 && payments[0] ? formatDate(payments[0].processedAt) : 'No payments'}
          </p>
        </div>
      </div>

      {/* Payment List */}
      {payments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No payments found</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {payments.map(payment => (
              <li key={payment.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-2xl">
                        {getMethodIcon(payment.method.type)}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                          <span
                            className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payment.status)}`}
                          >
                            {payment.status}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <span>Payment #{payment.paymentNumber}</span>
                          {payment.invoiceNumber && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Invoice #{payment.invoiceNumber}</span>
                            </>
                          )}
                          {payment.caseTitle && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{payment.caseTitle}</span>
                            </>
                          )}
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {formatDate(payment.processedAt)} • {payment.method.type}
                          {payment.method.last4 && ` ending in ${payment.method.last4}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      <button
                        onClick={() => downloadReceipt(payment.id)}

                className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
