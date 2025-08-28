import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Lesiones Personales en Kannapolis, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'lesiones personales Kannapolis, abogado Kannapolis, lesiones personales NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Lesiones Personales en Kannapolis, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kannapolis-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Kannapolis, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-lesiones-personales'
      
    }
  }
};