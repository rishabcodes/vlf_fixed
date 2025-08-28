import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
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
  title: 'Derecho Familiar en Burlington, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'derecho familiar Burlington, abogado Burlington, derecho familiar NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Derecho Familiar en Burlington, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/burlington-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Burlington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-derecho-familiar'
      
    }
  }
};