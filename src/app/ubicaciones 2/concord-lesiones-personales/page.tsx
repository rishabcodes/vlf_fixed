import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Personal Injury en Concord, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Concord, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Concord, abogado Concord, lesiones personales NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Personal Injury en Concord, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Concord, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/concord-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Concord, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-lesiones-personales',
    },
  },
};
