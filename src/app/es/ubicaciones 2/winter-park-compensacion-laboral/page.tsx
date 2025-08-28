import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
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
  title: 'Compensación Laboral en Winter Park, FL | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'compensación laboral Winter Park, abogado Winter Park, compensación laboral FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Compensación Laboral en Winter Park, FL | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winter-park-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Winter Park, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-compensacion-laboral'
      
    }
  }
};