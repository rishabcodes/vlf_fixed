import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MooresvilleAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('mooresville');
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
  title: 'Attorney que Habla Español en Mooresville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'abogado que habla español Mooresville, abogado Mooresville, abogado que habla español NC, abogado español Mooresville, servicios legales Mooresville',
  openGraph: {
    title: 'Attorney que Habla Español en Mooresville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Mooresville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/mooresville-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Mooresville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mooresville-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-abogado-espanol',
    },
  },
};
