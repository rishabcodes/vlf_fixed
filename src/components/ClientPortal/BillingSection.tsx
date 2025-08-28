'use client';

import React, { useState, useEffect } from 'react';
import { paymentLogger } from '@/lib/safe-logger';
// Removed unused framer-motion import
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  CreditCard,
  FileText,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Receipt,
} from 'lucide-react';
import { format } from 'date-fns';
// Removed unused next/link import

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  caseNumber: string;
  description: string;
  items: Array<{
    description: string;
    hours?: number;
    rate?: number;
    amount: number;
  }>;
}

interface TrustAccount {
  balance: number;
  lastUpdated: string;
  transactions: Array<{
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'deposit' | 'withdrawal';
    balance: number;
  }>;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function BillingSection({ clientData }: { clientData: ClientData }) {
  // Using clientData for future client-specific billing queries
  const router = useRouter();
  const clientId = clientData.id;
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [trustAccount, setTrustAccount] = useState<TrustAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const [invoicesRes, trustRes] = await Promise.all([
          fetch(`/api/client/billing/invoices?clientId=${clientId}`),
          fetch(`/api/client/billing/trust-account?clientId=${clientId}`),
        ]);

        const invoicesData = await invoicesRes.json();
        const trustData = await trustRes.json();

        setInvoices(invoicesData.invoices || []);
        setTrustAccount(trustData.trustAccount || null);
      } catch (error) {
        paymentLogger.error('Error fetching billing data:', error);
      } finally {
        setLoading(false);
          }
};

    fetchBillingData();
  }, [clientId]);

  const calculateTotals = () => {
    const totalBilled = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalPaid = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount, 0);
    const totalPending = invoices
      .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
      .reduce((sum, inv) => sum + inv.amount, 0);

    return { totalBilled, totalPaid, totalPending };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
        }
};

  const handlePayInvoice = async (invoice: Invoice) => {
    // Navigate to payment page
    router.push(`/payment?invoice=${invoice.id}&amount=${invoice.amount}`);
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/client/billing/invoices/${invoiceId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      paymentLogger.error('Error downloading invoice:', error);
        }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B1F2E]"></div>
      </div>
    );
  }

  const { totalBilled, totalPaid, totalPending } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Billing & Payments</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}

                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#6B1F2E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('invoices')}

                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'invoices'
                ? 'bg-[#6B1F2E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('trust')}

                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'trust'
                ? 'bg-[#6B1F2E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Trust Account
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Billing Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Billed</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Paid</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Outstanding</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${totalPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            </div>
            <div className="divide-y">
              {invoices.slice(0, 5).map(invoice => (
                <div key={invoice.id}

                className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p
                className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                          <p className="text-sm text-gray-600">{invoice.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm text-gray-600">
                          Due {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}
                      >
                        {invoice.status}
                      </span>
                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => handlePayInvoice(invoice)}

                className="px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setActiveTab('invoices')}

                className="text-[#6B1F2E] hover:text-[#8B2635] font-medium text-sm flex items-center gap-2"
              >
                View All Invoices
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/24</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">Default</span>
              </div>
            </div>
            <button className="mt-4 text-[#6B1F2E] hover:text-[#8B2635] font-medium text-sm">
              + Add Payment Method
            </button>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {invoices.map(invoice => (
            <div key={invoice.id}

                className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">{invoice.description}</p>
                  <p className="text-sm text-gray-500">Case: {invoice.caseNumber}</p>

                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Invoice Date</p>
                      <p className="font-medium text-gray-900">
                        {format(new Date(invoice.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Due Date</p>
                      <p className="font-medium text-gray-900">
                        {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-semibold text-gray-900 text-lg">
                        ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}

                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download Invoice"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  {invoice.status === 'pending' && (
                    <button
                      onClick={() => handlePayInvoice(invoice)}

                className="px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {invoices.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Invoices</h3>
              <p className="text-gray-600">You don't have any invoices yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'trust' && trustAccount && (
        <div className="space-y-6">
          {/* Trust Account Balance */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Trust Account Balance</h3>
                <p className="text-sm text-gray-600">
                  Last updated: {format(new Date(trustAccount.lastUpdated), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">
                  ${trustAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Compliance Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">IOLTA Compliance</p>
                  <p className="text-sm text-blue-700 mt-1">
                    This trust account is maintained in compliance with state bar regulations. Funds
                    are held separately from firm operating accounts and are only used for your
                    specific legal matters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            </div>
            <div className="divide-y">
              {trustAccount.transactions.map(transaction => (
                <div key={transaction.id}

                className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {transaction.type === 'deposit' ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(transaction.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'deposit' ? '+' : '-'}$
                        {Math.abs(transaction.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        Balance: $
                        {transaction.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
