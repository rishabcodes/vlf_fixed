import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
  const serviceData = getLocationServiceByKey('bancarrota');
  
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
  title: 'Bancarrota en Sanford, FL | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'bancarrota Sanford, abogado Sanford, bancarrota FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Bancarrota en Sanford, FL | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/sanford-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Sanford, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-bancarrota'
      
    }
  }
};