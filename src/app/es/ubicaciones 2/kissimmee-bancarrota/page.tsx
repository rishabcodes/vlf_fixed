import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KissimmeeBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('kissimmee');
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
  title: 'Bancarrota en Kissimmee, FL | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'bancarrota Kissimmee, abogado Kissimmee, bancarrota FL, abogado español Kissimmee, servicios legales Kissimmee',
  openGraph: {
    title: 'Bancarrota en Kissimmee, FL | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Kissimmee, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kissimmee-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Kissimmee, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kissimmee-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kissimmee-bancarrota'
      
    }
  }
};