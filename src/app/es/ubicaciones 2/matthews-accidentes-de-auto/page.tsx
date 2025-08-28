import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MatthewsAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('matthews');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');
  
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
  title: 'Accidentes de Auto en Matthews, NC | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'accidentes de auto Matthews, abogado Matthews, accidentes de auto NC, abogado español Matthews, servicios legales Matthews',
  openGraph: {
    title: 'Accidentes de Auto en Matthews, NC | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Matthews, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/matthews-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Matthews, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/matthews-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/matthews-accidentes-de-auto'
      
    }
  }
};