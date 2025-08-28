import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeDuiPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
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
  title: 'Defensa DUI en Monroe, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa dui Monroe, abogado Monroe, defensa dui NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Defensa DUI en Monroe, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Monroe, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/monroe-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Monroe, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-dui',
    },
  },
};
