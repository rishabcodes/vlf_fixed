'use client';

import { useSession } from 'next-auth/react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { useEffect, useState } from 'react';
import BillingSummary from '@/components/portal/billing-summary';
import InvoiceList from '@/components/portal/invoice-list';
import PaymentHistory from '@/components/portal/payment-history';
import PaymentPlans from '@/components/portal/payment-plans';

export default function BillingPage() {
  const { data: session } = useSession();
  const [billingSummary, setBillingSummary] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'invoices' | 'payments' | 'plans'>(
    'summary'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchBillingSummary();
    }
  }, [session]);

  const fetchBillingSummary = async () => {
    try {
      const response = await fetch('/api/portal/billing/summary');
      const data = await response.json();

      if (data.success) {
        setBillingSummary(data.summary);
      }
    } catch (error) {
      logger.error('Failed to fetch billing summary:', error);
    } finally {
      setIsLoading(false);
        }
};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600 mt-2">
          Manage your invoices, payments, and financial information
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {(['summary', 'invoices', 'payments', 'plans'] as const).map(tab => (
              <button
                key={tab}

                onClick={() => setActiveTab(tab)}

                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'plans' ? 'Payment Plans' : tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'summary' && billingSummary && <BillingSummary summary={billingSummary} />}
          {activeTab === 'invoices' && session?.user?.id && (
            <InvoiceList clientId={session.user.id} />
          )}
          {activeTab === 'payments' && session?.user?.id && (
            <PaymentHistory clientId={session.user.id} />
          )}
          {activeTab === 'plans' && session?.user?.id && (
            <PaymentPlans clientId={session.user.id} />
          )}
        </div>
      </div>
    </div>
  );
}
