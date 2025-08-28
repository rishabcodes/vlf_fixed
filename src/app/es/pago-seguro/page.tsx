import PagoSeguroClient from './PagoSeguroClient';

export default function PagoSeguroPage() {
  return <PagoSeguroClient />;
}

export const metadata = {
  title: 'Pago Seguro | Portal Protegido con SSL | Vasquez Law Firm',
  description:
    'Portal de pago 100% seguro con encriptación SSL de 256 bits. Cumplimiento PCI DSS Nivel 1. Procese sus pagos legales con total confianza y seguridad.',
  keywords:
    'pago seguro abogado, portal pago SSL, pago protegido, seguridad pci dss, pago legal seguro',
  openGraph: {
    title: 'Portal de Pago Seguro - Máxima Protección | Vasquez Law Firm',
    description:
      'Tecnología de seguridad bancaria para proteger sus pagos. Encriptación SSL y cumplimiento PCI DSS.',
    url: 'https://www.vasquezlawnc.com/es/pago-seguro',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/secure-payment-portal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal de Pago Seguro SSL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/pago-seguro',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/secure-payment',
      'es-ES': 'https://www.vasquezlawnc.com/es/pago-seguro',
    },
  },
};
