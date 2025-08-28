import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Ley de Inmigración en Davidson, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'ley de inmigración Davidson, abogado Davidson, ley de inmigración NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Ley de Inmigración en Davidson, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/davidson-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Davidson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-inmigracion'
      
    }
  }
};