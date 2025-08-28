import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Payment - Vasquez Law Firm',
  description: 'Make a secure payment to Vasquez Law Firm through our LawPay portal',
};

export default function PaymentPage() {
  // Server-side redirect to LawPay
  redirect('https://secure.lawpay.com/pages/vasquezlawfirm/operating1');
}
