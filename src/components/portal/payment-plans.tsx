'use client';

import { useEffect, useState, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { formatCurrency, formatDate } from '@/lib/utils/format';

interface PaymentPlan {
  id: string;
  name: string;
  totalAmount: number;
  remainingBalance: number;
  monthlyPayment: number;
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  status: 'active' | 'completed' | 'cancelled' | 'paused';
  paymentsMade: number;
  totalPayments: number;
  caseTitle: string;
  schedule: Array<{
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
  }>;
}

interface PaymentPlansProps {
  clientId: string;
}

export default function PaymentPlans({ clientId }: PaymentPlansProps) {
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);

  const fetchPaymentPlans = useCallback(async () => {
    try {
      const response = await fetch(`/api/portal/payment-plans?clientId=${clientId}`);
      const data = await response.json();

      if (data.success) {
        setPlans(data.plans);
      }
    } catch (error) {
      logger.error('Failed to fetch payment plans:', error);
    } finally {
      setIsLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchPaymentPlans();
  }, [fetchPaymentPlans]);

  const getStatusBadge = (status: PaymentPlan['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
        }
};

  const calculateProgress = (plan: PaymentPlan) => {
    return ((plan.totalAmount - plan.remainingBalance) / plan.totalAmount) * 100;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No payment plans found</p>
        <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
          Request a Payment Plan →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map(plan => (
          <div key={plan.id}

                className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3
                className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.caseTitle}</p>
              </div>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(plan.status)}`}
              >
                {plan.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Math.round(calculateProgress(plan))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress(plan)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatCurrency(plan.totalAmount - plan.remainingBalance)} paid</span>
                <span>{formatCurrency(plan.remainingBalance)} remaining</span>
              </div>
            </div>

            {/* Plan Details */}
            <dl className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Monthly Payment:</dt>
                <dd className="font-medium text-gray-900">{formatCurrency(plan.monthlyPayment)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Next Payment:</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(plan.nextPaymentAmount)} on {formatDate(plan.nextPaymentDate)}
                </dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Payments:</dt>
                <dd className="text-gray-900">
                  {plan.paymentsMade} of {plan.totalPayments}
                </dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">End Date:</dt>
                <dd className="text-gray-900">{formatDate(plan.endDate)}</dd>
              </div>
            </dl>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedPlan(plan)}

                className="flex-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View Schedule
              </button>
              {plan.status === 'active' && (
                <button className="flex-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700">
                  Make Payment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Schedule Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Schedule</h2>
                  <p className="text-gray-600 mt-1">
                    {selectedPlan.name} - {selectedPlan.caseTitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}

                className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="overflow-hidden shadow ring-1 ring-black/5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedPlan.schedule.map((payment, index) => (
                      <tr key={index}

                className={payment.status === 'overdue' ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(payment.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              payment.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : payment.status === 'overdue'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Total</td>
                      <td className="px-6 py-4 text-sm text-right font-bold text-gray-900">
                        {formatCurrency(selectedPlan.totalAmount)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedPlan(null)}

                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedPlan.status === 'active' && (
                  <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Make Next Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
