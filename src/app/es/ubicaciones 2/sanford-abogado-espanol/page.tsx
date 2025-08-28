import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
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
  title: 'Abogado que Habla Español en Sanford, FL | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'abogado que habla español Sanford, abogado Sanford, abogado que habla español FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Abogado que Habla Español en Sanford, FL | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/sanford-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Sanford, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-abogado-espanol'
      
    }
  }
};