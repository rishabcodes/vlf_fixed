import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function PinevilleLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('pineville');
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
  title: 'Personal Injury en Pineville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Pineville, abogado Pineville, lesiones personales NC, abogado español Pineville, servicios legales Pineville',
  openGraph: {
    title: 'Personal Injury en Pineville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Pineville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/pineville-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Pineville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/pineville-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-lesiones-personales',
    },
  },
};
