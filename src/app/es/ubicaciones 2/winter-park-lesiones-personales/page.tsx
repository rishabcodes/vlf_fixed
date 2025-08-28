import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
  const serviceData = getLocationServiceByKey('lesiones-personales');
  
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
  title: 'Lesiones Personales en Winter Park, FL | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'lesiones personales Winter Park, abogado Winter Park, lesiones personales FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Lesiones Personales en Winter Park, FL | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winter-park-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Winter Park, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-lesiones-personales'
      
    }
  }
};