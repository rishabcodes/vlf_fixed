import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
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
  title: 'Ley de Immigration en Winston-Salem, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'ley de inmigración Winston-Salem, abogado Winston-Salem, ley de inmigración NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Ley de Immigration en Winston-Salem, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winston-salem-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Winston-Salem, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-inmigracion',
    },
  },
};
