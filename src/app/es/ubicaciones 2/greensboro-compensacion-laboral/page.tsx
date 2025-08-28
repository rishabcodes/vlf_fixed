import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
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
  title: 'Compensación Laboral en Greensboro, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'compensación laboral Greensboro, abogado Greensboro, compensación laboral NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Compensación Laboral en Greensboro, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/greensboro-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Greensboro, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-compensacion-laboral'
      
    }
  }
};