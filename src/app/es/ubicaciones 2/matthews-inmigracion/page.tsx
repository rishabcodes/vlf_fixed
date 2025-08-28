import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
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
  title: 'Ley de Inmigración en Matthews, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'ley de inmigración Matthews, abogado Matthews, ley de inmigración NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Ley de Inmigración en Matthews, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/matthews-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Matthews, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-inmigracion'
      
    }
  }
};