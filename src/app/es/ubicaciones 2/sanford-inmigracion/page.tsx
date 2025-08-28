import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
  const serviceData = getLocationServiceByKey('inmigracion');
  
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
  title: 'Ley de Inmigración en Sanford, FL | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'ley de inmigración Sanford, abogado Sanford, ley de inmigración FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Ley de Inmigración en Sanford, FL | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/sanford-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Sanford, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-inmigracion'
      
    }
  }
};