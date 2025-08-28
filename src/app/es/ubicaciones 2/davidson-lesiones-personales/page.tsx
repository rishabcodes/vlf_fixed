import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Lesiones Personales en Davidson, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'lesiones personales Davidson, abogado Davidson, lesiones personales NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Lesiones Personales en Davidson, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/davidson-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Davidson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-lesiones-personales'
      
    }
  }
};