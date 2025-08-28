import { Metadata } from 'next';
import { OptimizedAttorneyTemplate } from '@/components/attorneys/OptimizedAttorneyTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Rebecca Sommer',
  nameEs: 'Rebecca Sommer',
  title: 'Criminal Defense Attorney',
  titleEs: 'Abogada de Defensa Penal',
  description:
    "Rebecca Sommer is an experienced criminal defense attorney who provides aggressive representation for clients facing criminal charges. With expertise in DWI/DUI defense, drug charges, and federal criminal cases, she fights to protect her clients' rights and freedom.",
  descriptionEs:
    'Rebecca Sommer es una abogada experimentada en defensa penal que proporciona representación agresiva para clientes que enfrentan cargos criminales. Con experiencia en defensa de DWI/DUI, cargos de drogas y casos criminales federales, lucha para proteger los derechos y libertad de sus clientes.',
  slug: 'rebecca-sommer',
  photo: '/images/attorneys/rebecca-sommer.jpg',
  specialties: [
    'criminal defense',
    'DWI DUI defense',
    'drug charges',
    'federal criminal defense',
    'traffic violations',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('rebecca-sommer');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="rebecca-sommer" />
      <OptimizedAttorneyTemplate attorney={attorney} language="en" />
    </>
  );
}
