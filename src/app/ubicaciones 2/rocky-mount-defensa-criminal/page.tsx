import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountDefensaCriminalPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
  const serviceData = getLocationServiceByKey('defensa-criminal');

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
  title: 'Criminal Defense en Rocky Mount, NC | Vasquez Law Firm',
  description:
    'Servicios legales de defensa criminal en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'defensa criminal Rocky Mount, abogado Rocky Mount, defensa criminal NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Criminal Defense en Rocky Mount, NC | Vasquez Law Firm',
    description:
      'Servicios legales de defensa criminal en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-defensa-criminal',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/rocky-mount-defensa-criminal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Criminal Defense en Rocky Mount, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-defensa-criminal',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-criminal-defense',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-defensa-criminal',
    },
  },
};
