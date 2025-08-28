import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GastoniaCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('gastonia');
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
  title: 'Compensación Laboral en Gastonia, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Gastonia, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'compensación laboral Gastonia, abogado Gastonia, compensación laboral NC, abogado español Gastonia, servicios legales Gastonia',
  openGraph: {
    title: 'Compensación Laboral en Gastonia, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Gastonia, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/gastonia-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Gastonia, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/gastonia-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-compensacion-laboral'
      
    }
  }
};