import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountDuiPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
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
  title: 'Defensa DUI en Rocky Mount, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa dui en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa dui Rocky Mount, abogado Rocky Mount, defensa dui NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Defensa DUI en Rocky Mount, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa dui en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-dui',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/rocky-mount-dui-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Defensa DUI en Rocky Mount, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-dui',
    },
  },
};
