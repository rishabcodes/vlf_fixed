import { Metadata } from 'next';
import { LocationPageTemplateFixed } from '@/components/locations/LocationPageTemplateFixed';
export const metadata: Metadata = {
  title: `Charlotte NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Charlotte attorneys serving Mecklenburg County. Immigration law, criminal defense, personal injury, family law. Free consultation.`,
  keywords: `Charlotte immigration lawyer, Charlotte criminal defense attorney, Charlotte personal injury lawyer, Charlotte DWI lawyer, Mecklenburg County attorney`,
  openGraph: {
    title: `Charlotte Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Charlotte, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-charlotte.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
  alternates: {
    languages: {
      'en-US': `/locations/nc/charlotte`,
      'es-ES': `/es/ubicaciones/nc/charlotte`,
    },
  },
};
export default function CharlotteNCPage() {
  return (
    <LocationPageTemplateFixed
      city="Charlotte"
      state="NC"
      language="en"
      nearbyOffice={{
        name: 'Charlotte Office',
        address: '5701 Executive Center Dr, Ste 103, Charlotte, NC 28212',
        phone: '(704) 266-2998',
      }}
    />
  );
}
