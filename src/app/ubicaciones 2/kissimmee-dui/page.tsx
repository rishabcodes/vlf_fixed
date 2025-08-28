import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeDuiPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
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
  title: 'Defensa DUI en Kissimmee, FL | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'defensa dui Kissimmee, abogado Kissimmee, defensa dui FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Defensa DUI en Kissimmee, FL | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Kissimmee, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/kissimmee-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Kissimmee, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-dui',
    },
  },
};
