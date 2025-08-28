import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HuntersvilleDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('huntersville');
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
  title: 'Derecho Familiar en Huntersville, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Huntersville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Huntersville, abogado Huntersville, derecho familiar NC, abogado español Huntersville, servicios legales Huntersville',
  openGraph: {
    title: 'Derecho Familiar en Huntersville, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Huntersville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/huntersville-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Huntersville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/huntersville-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/huntersville-derecho-familiar'
      
    }
  }
};