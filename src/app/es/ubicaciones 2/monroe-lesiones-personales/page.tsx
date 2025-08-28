import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MonroeLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('monroe');
  const serviceData = getLocationServiceByKey('lesiones-personales');
  
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
  title: 'Lesiones Personales en Monroe, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Monroe, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'lesiones personales Monroe, abogado Monroe, lesiones personales NC, abogado español Monroe, servicios legales Monroe',
  openGraph: {
    title: 'Lesiones Personales en Monroe, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Monroe, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/monroe-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Monroe, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/monroe-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/monroe-lesiones-personales'
      
    }
  }
};