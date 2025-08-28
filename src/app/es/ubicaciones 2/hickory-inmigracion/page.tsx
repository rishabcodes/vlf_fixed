import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Ley de Inmigración en Hickory, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'ley de inmigración Hickory, abogado Hickory, ley de inmigración NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Ley de Inmigración en Hickory, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/hickory-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Hickory, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-inmigracion'
      
    }
  }
};