import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('durham');
  const serviceData = getLocationServiceByKey('inmigracion');
  
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
  title: 'Ley de Inmigración en Durham, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'ley de inmigración Durham, abogado Durham, ley de inmigración NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Ley de Inmigración en Durham, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/durham-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Durham, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-inmigracion'
      
    }
  }
};