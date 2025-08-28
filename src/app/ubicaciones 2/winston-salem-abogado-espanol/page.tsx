import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
  const serviceData = getLocationServiceByKey('abogado-espanol');

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
  title: 'Attorney que Habla Español en Winston-Salem, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'abogado que habla español Winston-Salem, abogado Winston-Salem, abogado que habla español NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Attorney que Habla Español en Winston-Salem, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winston-salem-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Winston-Salem, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-abogado-espanol',
    },
  },
};
