import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Compensación Laboral en Davidson, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'compensación laboral Davidson, abogado Davidson, compensación laboral NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Compensación Laboral en Davidson, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/davidson-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Davidson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-compensacion-laboral'
      
    }
  }
};