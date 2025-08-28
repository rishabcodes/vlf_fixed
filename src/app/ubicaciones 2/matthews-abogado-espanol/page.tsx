import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
  const serviceData = getLocationServiceByKey('abogado-espanol');

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
  title: 'Attorney que Habla Español en Matthews, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'abogado que habla español Matthews, abogado Matthews, abogado que habla español NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Attorney que Habla Español en Matthews, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/matthews-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Matthews, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-abogado-espanol',
    },
  },
};
