import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function OviedoAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('oviedo');
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
  title: 'Abogado que Habla Español en Oviedo, FL | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Oviedo, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'abogado que habla español Oviedo, abogado Oviedo, abogado que habla español FL, abogado español Oviedo, servicios legales Oviedo',
  openGraph: {
    title: 'Abogado que Habla Español en Oviedo, FL | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Oviedo, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/oviedo-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Oviedo, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/oviedo-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/oviedo-abogado-espanol'
      
    }
  }
};