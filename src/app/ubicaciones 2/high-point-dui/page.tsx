import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointDuiPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
  const serviceData = getLocationServiceByKey('dui');

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
  title: 'Defensa DUI en High Point, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa dui High Point, abogado High Point, defensa dui NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Defensa DUI en High Point, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en High Point, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/high-point-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en High Point, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-dui',
    },
  },
};
