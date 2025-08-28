import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkDuiPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
  const serviceData = getLocationServiceByKey('dui');
  
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
  title: 'Defensa DUI en Winter Park, FL | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'defensa dui Winter Park, abogado Winter Park, defensa dui FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Defensa DUI en Winter Park, FL | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winter-park-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Winter Park, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-dui'
      
    }
  }
};