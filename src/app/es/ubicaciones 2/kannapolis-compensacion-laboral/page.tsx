import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Compensación Laboral en Kannapolis, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'compensación laboral Kannapolis, abogado Kannapolis, compensación laboral NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Compensación Laboral en Kannapolis, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kannapolis-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Kannapolis, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-compensacion-laboral'
      
    }
  }
};