'use client';

import { useEffect, useState, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { formatCurrency, formatDate } from '@/lib/utils/format';

interface Invoice {
  id: string;
  invoiceNumber: string;
  caseId: string;
  caseTitle: string;
  amount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
}

interface InvoiceListProps {
  clientId: string;
}

export default function InvoiceList({ clientId }: InvoiceListProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');

  const fetchInvoices = useCallback(async () => {
    try {
      const params = new URLSearchParams({ clientId });
      if (filter !== 'all') {
        params.append('status', filter);
      }

      const response = await fetch(`/api/portal/invoices?${params}`);
      const data = await response.json();

      if (data.success) {
        setInvoices(data.invoices);
      }
    } catch (error) {
      logger.error('Failed to fetch invoices:', error);
    } finally {
      setIsLoading(false);
    }
  }, [clientId, filter]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const downloadInvoice = useCallback(async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/portal/invoices/${invoiceId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      if (a.parentNode) {
        a.parentNode.removeChild(a);
      }
    } catch (error) {
      logger.error('Failed to download invoice:', error);
    }
  }, []);

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      {/* Filters */}
      <div className="flex space-x-2">
        {(['all', 'pending', 'paid', 'overdue'] as const).map(filterOption => (
          <button
            key={filterOption}

                onClick={() => setFilter(filterOption)}

                className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === filterOption
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {filterOption === 'all'
              ? 'All Invoices'
              : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Invoice List */}
      {invoices.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No invoices found</p>
        </div>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black/5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map(invoice => (
                <tr key={invoice.id}

                className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div
                className="text-sm font-medium text-gray-900">
                        #{invoice.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        Issued {formatDate(invoice.issueDate)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.caseTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.total)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}

                className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => downloadInvoice(invoice.id)}

                className="text-gray-600 hover:text-gray-900"
                      >
                        Download
                      </button>
                      {invoice.status === 'sent' || invoice.status === 'overdue' ? (
                        <button className="text-green-600 hover:text-green-900">Pay</button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Invoice #{selectedInvoice.invoiceNumber}
                  </h2>
                  <p className="text-gray-600 mt-1">{selectedInvoice.caseTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}

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

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Invoice Date</h3>
                  <p className="mt-1">{formatDate(selectedInvoice.issueDate)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                  <p className="mt-1">{formatDate(selectedInvoice.dueDate)}</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden mb-6">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Qty
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm">{item.description}</td>
                        <td className="px-6 py-4 text-sm text-right">{item.quantity}</td>
                        <td className="px-6 py-4 text-sm text-right">
                          {formatCurrency(item.rate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-medium">
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3}

                className="px-6 py-4 text-sm text-right">
                        Subtotal
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium">
                        {formatCurrency(selectedInvoice.amount)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}

                className="px-6 py-4 text-sm text-right">
                        Tax
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium">
                        {formatCurrency(selectedInvoice.tax)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}

                className="px-6 py-4 text-sm text-right font-bold">
                        Total
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-bold">
                        {formatCurrency(selectedInvoice.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => downloadInvoice(selectedInvoice.id)}

                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Download PDF
                </button>
                {(selectedInvoice.status === 'sent' || selectedInvoice.status === 'overdue') && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Pay Invoice
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
