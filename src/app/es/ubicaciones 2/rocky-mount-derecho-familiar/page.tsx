import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
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
  title: 'Derecho Familiar en Rocky Mount, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'derecho familiar Rocky Mount, abogado Rocky Mount, derecho familiar NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Derecho Familiar en Rocky Mount, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/rocky-mount-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Rocky Mount, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-derecho-familiar'
      
    }
  }
};