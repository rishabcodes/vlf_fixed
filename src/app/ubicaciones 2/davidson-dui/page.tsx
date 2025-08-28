import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonDuiPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Defensa DUI en Davidson, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa dui Davidson, abogado Davidson, defensa dui NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Defensa DUI en Davidson, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Davidson, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/davidson-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Davidson, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-dui',
    },
  },
};
