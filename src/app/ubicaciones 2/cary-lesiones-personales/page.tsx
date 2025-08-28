import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('cary');
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
  title: 'Personal Injury en Cary, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'lesiones personales Cary, abogado Cary, lesiones personales NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Personal Injury en Cary, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-lesiones-personales',
    },
  },
};
