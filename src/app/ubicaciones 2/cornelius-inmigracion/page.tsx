import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CorneliusInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('cornelius');
  const serviceData = getLocationServiceByKey('inmigracion');

  if (!cityData || !serviceData) {
    return <div>Page not found</div>;
  }

  return (
    <LocationServiceTemplate
      city={cityData.name}
      state={cityData.state}
      service={serviceData}
      nearestOffice={cityData.nearestOffice}
      language="es"
    />
  );
}

export const metadata = {
  title: 'Ley de Immigration en Cornelius, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Cornelius, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Cornelius, abogado Cornelius, ley de inmigración NC, abogado español Cornelius, servicios legales Cornelius',
  openGraph: {
    title: 'Ley de Immigration en Cornelius, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Cornelius, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cornelius-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Cornelius, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cornelius-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-inmigracion',
    },
  },
};
