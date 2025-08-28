import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HuntersvilleDuiPage() {
  const cityData = getLocationServiceCityBySlug('huntersville');
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
  title: 'Defensa DUI en Huntersville, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords:
    'defensa dui Huntersville, abogado Huntersville, defensa dui NC, abogado español Huntersville, servicios legales Huntersville',
  openGraph: {
    title: 'Defensa DUI en Huntersville, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Huntersville, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/huntersville-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Huntersville, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/huntersville-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-dui',
    },
  },
};
