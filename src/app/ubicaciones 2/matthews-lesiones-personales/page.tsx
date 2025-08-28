import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
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
  title: 'Personal Injury en Matthews, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'lesiones personales Matthews, abogado Matthews, lesiones personales NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Personal Injury en Matthews, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/matthews-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Matthews, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-lesiones-personales',
    },
  },
};
