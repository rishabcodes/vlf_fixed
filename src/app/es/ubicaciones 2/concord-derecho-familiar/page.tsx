import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Derecho Familiar en Concord, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Concord, abogado Concord, derecho familiar NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Derecho Familiar en Concord, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/concord-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Concord, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-derecho-familiar'
      
    }
  }
};