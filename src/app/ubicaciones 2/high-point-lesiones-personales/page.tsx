import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
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
  title: 'Personal Injury en High Point, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales High Point, abogado High Point, lesiones personales NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Personal Injury en High Point, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-lesiones-personales',
    },
  },
};
