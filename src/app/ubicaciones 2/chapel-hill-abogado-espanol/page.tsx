import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillAttorneyEspanolPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
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
  title: 'Attorney que Habla Español en Chapel Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de abogado que habla español en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'abogado que habla español Chapel Hill, abogado Chapel Hill, abogado que habla español NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Attorney que Habla Español en Chapel Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de abogado que habla español en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-abogado-espanol',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/chapel-hill-abogado-espanol-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Attorney que Habla Español en Chapel Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-abogado-espanol',
    },
  },
};
