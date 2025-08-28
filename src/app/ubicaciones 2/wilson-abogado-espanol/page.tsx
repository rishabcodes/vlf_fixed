import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Attorney que Habla Español en Wilson, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Wilson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'abogado que habla español Wilson, abogado Wilson, abogado que habla español NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Attorney que Habla Español en Wilson, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Wilson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/wilson-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Wilson, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-abogado-espanol',
    },
  },
};
