import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function FayettevilleDuiPage() {
  const cityData = getLocationServiceCityBySlug('fayetteville');
  const serviceData = getLocationServiceByKey('dui');
  
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
  title: 'Defensa DUI en Fayetteville, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'defensa dui Fayetteville, abogado Fayetteville, defensa dui NC, abogado español Fayetteville, servicios legales Fayetteville',
  openGraph: {
    title: 'Defensa DUI en Fayetteville, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/fayetteville-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Fayetteville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/fayetteville-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-dui'
      
    }
  }
};