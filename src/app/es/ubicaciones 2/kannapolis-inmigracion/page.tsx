import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Ley de Inmigración en Kannapolis, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'ley de inmigración Kannapolis, abogado Kannapolis, ley de inmigración NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Ley de Inmigración en Kannapolis, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kannapolis-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Kannapolis, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-inmigracion'
      
    }
  }
};