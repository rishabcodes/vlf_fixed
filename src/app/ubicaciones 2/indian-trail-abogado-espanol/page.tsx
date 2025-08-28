import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function IndianTrailAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('indian-trail');
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
  title: 'Attorney que Habla Español en Indian Trail, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'abogado que habla español Indian Trail, abogado Indian Trail, abogado que habla español NC, abogado español Indian Trail, servicios legales Indian Trail',
  openGraph: {
    title: 'Attorney que Habla Español en Indian Trail, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Indian Trail, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/indian-trail-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Indian Trail, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/indian-trail-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/indian-trail-abogado-espanol',
    },
  },
};
