import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
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
  title: 'Compensación Laboral en Wilmington, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'compensación laboral Wilmington, abogado Wilmington, compensación laboral NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Compensación Laboral en Wilmington, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilmington-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Wilmington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-compensacion-laboral'
      
    }
  }
};