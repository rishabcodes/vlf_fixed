import { Metadata } from 'next';
import AttorneysPageWrapper from '@/components/AttorneysPageWrapper';

export const metadata: Metadata = {
  title: 'Nuestros Abogados - Bufete de Abogados Vasquez - YO PELEO POR TI™',
  description:
    'Conozca a nuestro equipo de abogados experimentados en inmigración, lesiones personales, compensación laboral, defensa criminal y derecho familiar. Más de 100 años de experiencia combinada.',
  keywords:
    'abogados, equipo legal, abogado inmigración, abogado lesiones personales, abogado defensa criminal, abogado derecho familiar, William Vasquez',
  openGraph: {
    title: 'Nuestros Abogados - Bufete de Abogados Vasquez',
    description:
      'Equipo legal experimentado luchando por sus derechos. Más de 100 años de experiencia combinada.',
    images: [{ url: '/images/BANNER_TRANS.PNG' }],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/abogados',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/attorneys',
      'es-ES': 'https://www.vasquezlawnc.com/es/abogados',
    },
  },
};

export default function AbogadosPage() {
  return (
    <AttorneysPageWrapper language="es" />
  );
}
