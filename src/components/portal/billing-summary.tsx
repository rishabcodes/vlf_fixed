'use client';

import { formatCurrency } from '@/lib/utils/format';
import Link from 'next/link';

interface BillingSummaryProps {
  summary: {
    totalBilled: number;
    totalPaid: number;
    outstandingBalance: number;
    lastPaymentDate?: string;
    lastPaymentAmount?: number;
    nextPaymentDue?: {
      date: string;
      amount: number;
    };
    recentInvoices: Array<{
      id: string;
      invoiceNumber: string;
      amount: number;
      dueDate: string;
      status: 'paid' | 'pending' | 'overdue';
    }>;
    paymentMethods: Array<{
      id: string;
      type: 'card' | 'bank';
      last4: string;
      isDefault: boolean;
    }>;
  };
}

export default function BillingSummary({ summary }: BillingSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Billed</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {formatCurrency(summary.totalBilled)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {formatCurrency(summary.totalPaid)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500">Outstanding Balance</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {formatCurrency(summary.outstandingBalance)}
          </p>
        </div>
      </div>

      {/* Next Payment Due */}
      {summary.nextPaymentDue && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-yellow-800">Next Payment Due</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>{formatCurrency(summary.nextPaymentDue.amount)} due on {new Date(summary.nextPaymentDue.date).toLocaleDateString()}</p>
              </div>
              <div className="mt-4">
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-800 bg-yellow-100 hover:bg-yellow-200">
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Invoices</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
              {summary.recentInvoices.map((invoice) => (
                <li key={invoice.id}

                className="px-4 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                className="text-sm font-medium text-gray-900">
                        Invoice #{invoice.invoiceNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 bg-gray-50">
              <Link href="/portal/billing?tab=invoices" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all invoices →
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
              {summary.paymentMethods.map((method) => (
                <li key={method.id}

                className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {method.type === 'card' ? (
                        <svg
                className="h-8 w-8 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      ) : (
                        <svg className="h-8 w-8 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {method.type === 'card' ? 'Card' : 'Bank Account'} ending in {method.last4}
                        </p>
                        {method.isDefault && (
                          <p className="text-sm text-gray-500">Default payment method</p>
                        )}
                      </div>
                    </div>
                    <button className="text-sm text-gray-400 hover:text-gray-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 bg-gray-50">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Add payment method →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
