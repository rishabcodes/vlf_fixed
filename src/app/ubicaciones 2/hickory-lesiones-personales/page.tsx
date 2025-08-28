import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Personal Injury en Hickory, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Hickory, abogado Hickory, lesiones personales NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Personal Injury en Hickory, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Hickory, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/hickory-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Hickory, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-lesiones-personales',
    },
  },
};
