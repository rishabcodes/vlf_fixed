import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
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
  title: 'Derecho Familiar en Greensboro, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'derecho familiar Greensboro, abogado Greensboro, derecho familiar NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Derecho Familiar en Greensboro, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/greensboro-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Greensboro, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-derecho-familiar'
      
    }
  }
};