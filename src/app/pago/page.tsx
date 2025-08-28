import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Pago - Vasquez Law Firm',
  description: 'Realice un pago seguro a Vasquez Law Firm a través de nuestro portal LawPay',
};

export default function PagoPage() {
  // Server-side redirect to LawPay
  redirect('https://secure.lawpay.com/pages/vasquezlawfirm/operating1');
}
