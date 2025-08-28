import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function FayettevilleInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('fayetteville');
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
  title: 'Ley de Inmigración en Fayetteville, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'ley de inmigración Fayetteville, abogado Fayetteville, ley de inmigración NC, abogado español Fayetteville, servicios legales Fayetteville',
  openGraph: {
    title: 'Ley de Inmigración en Fayetteville, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/fayetteville-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Fayetteville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/fayetteville-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-inmigracion'
      
    }
  }
};