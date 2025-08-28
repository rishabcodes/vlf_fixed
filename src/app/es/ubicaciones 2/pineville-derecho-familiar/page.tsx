import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function PinevilleDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('pineville');
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
  title: 'Derecho Familiar en Pineville, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Pineville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Pineville, abogado Pineville, derecho familiar NC, abogado español Pineville, servicios legales Pineville',
  openGraph: {
    title: 'Derecho Familiar en Pineville, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Pineville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/pineville-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Pineville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/pineville-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/pineville-derecho-familiar'
      
    }
  }
};