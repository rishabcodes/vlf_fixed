import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Compensación Laboral en Charlotte, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'compensación laboral Charlotte, abogado Charlotte, compensación laboral NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Compensación Laboral en Charlotte, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-compensacion-laboral'
      
    }
  }
};