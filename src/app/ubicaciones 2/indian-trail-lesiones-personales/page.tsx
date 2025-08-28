import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
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
  title: 'Personal Injury en Indian Trail, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Indian Trail, abogado Indian Trail, lesiones personales NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Personal Injury en Indian Trail, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/indian-trail-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Indian Trail, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-lesiones-personales',
    },
  },
};
