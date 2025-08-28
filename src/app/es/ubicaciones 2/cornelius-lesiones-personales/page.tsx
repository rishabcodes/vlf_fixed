import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CorneliusLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('cornelius');
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
  title: 'Lesiones Personales en Cornelius, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'lesiones personales Cornelius, abogado Cornelius, lesiones personales NC, abogado español Cornelius, servicios legales Cornelius',
  openGraph: {
    title: 'Lesiones Personales en Cornelius, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cornelius-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Cornelius, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cornelius-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-lesiones-personales'
      
    }
  }
};