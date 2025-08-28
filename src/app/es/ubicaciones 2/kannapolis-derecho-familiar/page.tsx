import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Derecho Familiar en Kannapolis, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Kannapolis, abogado Kannapolis, derecho familiar NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Derecho Familiar en Kannapolis, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kannapolis-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Kannapolis, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-derecho-familiar'
      
    }
  }
};