import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GastoniaLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('gastonia');
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
  title: 'Lesiones Personales en Gastonia, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Gastonia, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'lesiones personales Gastonia, abogado Gastonia, lesiones personales NC, abogado español Gastonia, servicios legales Gastonia',
  openGraph: {
    title: 'Lesiones Personales en Gastonia, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Gastonia, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/gastonia-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Gastonia, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/gastonia-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/gastonia-lesiones-personales'
      
    }
  }
};