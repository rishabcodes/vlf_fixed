import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
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
  title: 'Bancarrota en Matthews, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'bancarrota Matthews, abogado Matthews, bancarrota NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Bancarrota en Matthews, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/matthews-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Matthews, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-bancarrota'
      
    }
  }
};