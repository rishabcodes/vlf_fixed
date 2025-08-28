import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Compensación Laboral en Concord, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'compensación laboral Concord, abogado Concord, compensación laboral NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Compensación Laboral en Concord, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/concord-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Concord, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-compensacion-laboral'
      
    }
  }
};