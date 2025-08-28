import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('durham');
  const serviceData = getLocationServiceByKey('derecho-familiar');
  
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
  title: 'Derecho Familiar en Durham, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'derecho familiar Durham, abogado Durham, derecho familiar NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Derecho Familiar en Durham, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/durham-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Durham, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-derecho-familiar'
      
    }
  }
};