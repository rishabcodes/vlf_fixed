import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinterParkAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('winter-park');
  const serviceData = getLocationServiceByKey('abogado-espanol');
  
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
  title: 'Abogado que Habla Español en Winter Park, FL | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'abogado que habla español Winter Park, abogado Winter Park, abogado que habla español FL, abogado español Winter Park, servicios legales Winter Park',
  openGraph: {
    title: 'Abogado que Habla Español en Winter Park, FL | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Winter Park, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winter-park-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Winter Park, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winter-park-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winter-park-abogado-espanol'
      
    }
  }
};