import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function FayettevilleLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('fayetteville');
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
  title: 'Personal Injury en Fayetteville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Fayetteville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'lesiones personales Fayetteville, abogado Fayetteville, lesiones personales NC, abogado español Fayetteville, servicios legales Fayetteville',
  openGraph: {
    title: 'Personal Injury en Fayetteville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Fayetteville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/fayetteville-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Fayetteville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/fayetteville-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-lesiones-personales',
    },
  },
};
