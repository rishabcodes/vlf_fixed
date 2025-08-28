import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
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
  title: 'Lesiones Personales en Sanford, FL | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'lesiones personales Sanford, abogado Sanford, lesiones personales FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Lesiones Personales en Sanford, FL | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/sanford-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Sanford, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-lesiones-personales'
      
    }
  }
};