import AboutPageClient from '@/components/About/AboutPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de Vasquez Law Firm | Luchando por Ti Desde 2011',
  description:
    'Fundada en 2011, Vasquez Law Firm proporciona representación legal accesible y de alta calidad en Carolina del Norte y Florida. Conozca nuestra misión, valores y equipo.',
  keywords:
    'Vasquez Law Firm, acerca de nosotros, servicios legales, abogado de Carolina del Norte, abogado de Florida, derecho de inmigración, lesiones personales, defensa criminal',
  openGraph: {
    title: 'Acerca de Vasquez Law Firm | Luchando por Ti Desde 2011',
    description: 'Conozca nuestra misión, valores y equipo legal experimentado.',
    type: 'website',
    url: 'https://www.vasquezlawnc.com/es/acerca-de',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo de Vasquez Law Firm',
      },
    ],
  },
};

export default function AcercaDePage() {
  return <AboutPageClient language="es" />;
}
