import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountBancarrotaPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
  const serviceData = getLocationServiceByKey('bancarrota');
  
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
  title: 'Bancarrota en Rocky Mount, NC | Vasquez Law Firm',
  description: 'Servicios legales de bancarrota en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'bancarrota Rocky Mount, abogado Rocky Mount, bancarrota NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Bancarrota en Rocky Mount, NC | Vasquez Law Firm',
    description: 'Servicios legales de bancarrota en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-bancarrota',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/rocky-mount-bancarrota-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Bancarrota en Rocky Mount, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-bancarrota',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-bankruptcy',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-bancarrota'
      
    }
  }
};