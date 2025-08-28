import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function FayettevilleCompensacionLaboralPage() {
  const cityData = getLocationServiceCityBySlug('fayetteville');
  const serviceData = getLocationServiceByKey('compensacion-laboral');
  
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
  title: 'Compensación Laboral en Fayetteville, NC | Vasquez Law Firm',
  description: 'Servicios legales de compensación laboral en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'compensación laboral Fayetteville, abogado Fayetteville, compensación laboral NC, abogado español Fayetteville, servicios legales Fayetteville',
  openGraph: {
    title: 'Compensación Laboral en Fayetteville, NC | Vasquez Law Firm',
    description: 'Servicios legales de compensación laboral en Fayetteville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-compensacion-laboral',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/fayetteville-compensacion-laboral-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Compensación Laboral en Fayetteville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-compensacion-laboral',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/fayetteville-workers-compensation',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/fayetteville-compensacion-laboral'
      
    }
  }
};