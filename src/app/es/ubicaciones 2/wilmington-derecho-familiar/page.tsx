import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilmingtonDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('wilmington');
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
  title: 'Derecho Familiar en Wilmington, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'derecho familiar Wilmington, abogado Wilmington, derecho familiar NC, abogado español Wilmington, servicios legales Wilmington',
  openGraph: {
    title: 'Derecho Familiar en Wilmington, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Wilmington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilmington-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Wilmington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilmington-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilmington-derecho-familiar'
      
    }
  }
};