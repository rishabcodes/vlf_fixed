import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Ley de Immigration en Charlotte, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Charlotte, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Charlotte, abogado Charlotte, ley de inmigración NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Ley de Immigration en Charlotte, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Charlotte, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/charlotte-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Charlotte, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-inmigracion',
    },
  },
};
