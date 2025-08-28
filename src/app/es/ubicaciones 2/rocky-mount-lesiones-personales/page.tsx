import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
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
  title: 'Lesiones Personales en Rocky Mount, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'lesiones personales Rocky Mount, abogado Rocky Mount, lesiones personales NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Lesiones Personales en Rocky Mount, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/rocky-mount-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Rocky Mount, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-lesiones-personales'
      
    }
  }
};