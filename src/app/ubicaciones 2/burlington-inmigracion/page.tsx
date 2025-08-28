import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
  const serviceData = getLocationServiceByKey('inmigracion');

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
  title: 'Ley de Immigration en Burlington, NC | Vasquez Law Firm',
  description:
    'Servicios legales de ley de inmigración en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'ley de inmigración Burlington, abogado Burlington, ley de inmigración NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Ley de Immigration en Burlington, NC | Vasquez Law Firm',
    description:
      'Servicios legales de ley de inmigración en Burlington, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-inmigracion',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/burlington-inmigracion-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ley de Immigration en Burlington, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-inmigracion',
    },
  },
};
