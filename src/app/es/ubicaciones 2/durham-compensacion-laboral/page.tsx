import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('durham');
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
  title: 'Compensación Laboral en Durham, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'compensación laboral Durham, abogado Durham, compensación laboral NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Compensación Laboral en Durham, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/durham-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Durham, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-compensacion-laboral'
      
    }
  }
};