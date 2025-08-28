import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
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
  title: 'Ley de Immigration en Raleigh, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'ley de inmigración Raleigh, abogado Raleigh, ley de inmigración NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Ley de Immigration en Raleigh, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/raleigh-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Raleigh, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-inmigracion',
    },
  },
};
