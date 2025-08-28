import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CorneliusCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('cornelius');
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
  title: 'Compensación Laboral en Cornelius, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'compensación laboral Cornelius, abogado Cornelius, compensación laboral NC, abogado español Cornelius, servicios legales Cornelius',
  openGraph: {
    title: 'Compensación Laboral en Cornelius, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cornelius-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Cornelius, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cornelius-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-compensacion-laboral'
      
    }
  }
};