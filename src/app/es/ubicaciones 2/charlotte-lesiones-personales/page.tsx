import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Lesiones Personales en Charlotte, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'lesiones personales Charlotte, abogado Charlotte, lesiones personales NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Lesiones Personales en Charlotte, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-lesiones-personales'
      
    }
  }
};