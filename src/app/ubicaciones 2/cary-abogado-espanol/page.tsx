import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('cary');
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
  title: 'Attorney que Habla Español en Cary, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'abogado que habla español Cary, abogado Cary, abogado que habla español NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Attorney que Habla Español en Cary, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Cary, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/cary-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Cary, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-abogado-espanol',
    },
  },
};
