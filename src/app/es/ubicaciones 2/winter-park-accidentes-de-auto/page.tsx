import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');
  
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
  title: 'Accidentes de Auto en Winter Park, FL | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'accidentes de auto Winter Park, abogado Winter Park, accidentes de auto FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Accidentes de Auto en Winter Park, FL | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winter-park-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Winter Park, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-accidentes-de-auto'
      
    }
  }
};