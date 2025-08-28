import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
  const serviceData = getLocationServiceByKey('bancarrota');

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
  title: 'Bancarrota en Winston-Salem, NC | Vasquez Law Firm',
  description:
    'Servicios legales de bancarrota en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'bancarrota Winston-Salem, abogado Winston-Salem, bancarrota NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Bancarrota en Winston-Salem, NC | Vasquez Law Firm',
    description:
      'Servicios legales de bancarrota en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-bancarrota',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winston-salem-bancarrota-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bancarrota en Winston-Salem, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-bancarrota',
    },
  },
};
