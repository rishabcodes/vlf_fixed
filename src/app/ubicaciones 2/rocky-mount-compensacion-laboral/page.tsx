import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
  const serviceData = getLocationServiceByKey('compensacion-laboral');

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
  title: 'Workers Compensation en Rocky Mount, NC | Vasquez Law Firm',
  description:
    'Servicios legales de compensación laboral en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords:
    'compensación laboral Rocky Mount, abogado Rocky Mount, compensación laboral NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Workers Compensation en Rocky Mount, NC | Vasquez Law Firm',
    description:
      'Servicios legales de compensación laboral en Rocky Mount, NC. Attorneys locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-compensacion-laboral',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/rocky-mount-compensacion-laboral-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workers Compensation en Rocky Mount, NC',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-compensacion-laboral',
    },
  },
};
