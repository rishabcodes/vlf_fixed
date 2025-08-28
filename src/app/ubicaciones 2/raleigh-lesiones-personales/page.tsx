import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
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
  title: 'Personal Injury en Raleigh, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'lesiones personales Raleigh, abogado Raleigh, lesiones personales NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Personal Injury en Raleigh, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Raleigh, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/raleigh-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Raleigh, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-lesiones-personales',
    },
  },
};
