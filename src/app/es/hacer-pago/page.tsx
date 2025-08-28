import HacerPagoClient from './HacerPagoClient';

export default function HacerPagoPage() {
  return <HacerPagoClient />;
}

export const metadata = {
  title: 'Hacer un Pago | Portal Seguro | Vasquez Law Firm',
  description:
    'Pague su factura legal de manera segura en línea. Aceptamos tarjetas de crédito, transferencias bancarias y planes de pago. Portal protegido con encriptación SSL.',
  keywords:
    'pagar factura abogado, pago seguro online, portal de pagos legal, pagar honorarios abogado',
  openGraph: {
    title: 'Portal de Pagos Seguro | Vasquez Law Firm',
    description:
      'Pague su factura legal de manera rápida y segura. Múltiples métodos de pago disponibles.',
    url: 'https://www.vasquezlawnc.com/es/hacer-pago',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/secure-payment-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal de Pagos Seguro',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/hacer-pago',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/make-payment',
      'es-ES': 'https://www.vasquezlawnc.com/es/hacer-pago',
    },
  },
};
