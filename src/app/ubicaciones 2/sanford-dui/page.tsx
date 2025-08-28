import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordDuiPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
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
  title: 'Defensa DUI en Sanford, FL | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords:
    'defensa dui Sanford, abogado Sanford, defensa dui FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Defensa DUI en Sanford, FL | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Sanford, FL. Attorneys locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/sanford-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Sanford, FL',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-dui',
    },
  },
};
