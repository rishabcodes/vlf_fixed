import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Compensación Laboral en Wilson, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'compensación laboral Wilson, abogado Wilson, compensación laboral NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Compensación Laboral en Wilson, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilson-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Wilson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-compensacion-laboral'
      
    }
  }
};