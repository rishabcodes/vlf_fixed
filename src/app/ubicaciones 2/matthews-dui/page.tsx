import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsDuiPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
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
  title: 'Defensa DUI en Matthews, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa dui Matthews, abogado Matthews, defensa dui NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Defensa DUI en Matthews, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Matthews, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/matthews-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Matthews, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-dui',
    },
  },
};
