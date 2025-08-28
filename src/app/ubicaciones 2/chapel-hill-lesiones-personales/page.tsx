import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
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
  title: 'Personal Injury en Chapel Hill, NC | Vasquez Law Firm',
  description:
    'Servicios legales de lesiones personales en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'lesiones personales Chapel Hill, abogado Chapel Hill, lesiones personales NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Personal Injury en Chapel Hill, NC | Vasquez Law Firm',
    description:
      'Servicios legales de lesiones personales en Chapel Hill, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-lesiones-personales',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/chapel-hill-lesiones-personales-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Injury en Chapel Hill, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-lesiones-personales',
    },
  },
};
