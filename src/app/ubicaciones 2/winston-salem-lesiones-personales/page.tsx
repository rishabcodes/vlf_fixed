import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
  const serviceData = getLocationServiceByKey('lesiones-personales');

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
  title: 'Personal Injury en Winston-Salem, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Winston-Salem, abogado Winston-Salem, lesiones personales NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Personal Injury en Winston-Salem, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Winston-Salem, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/winston-salem-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Winston-Salem, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-lesiones-personales',
    },
  },
};
