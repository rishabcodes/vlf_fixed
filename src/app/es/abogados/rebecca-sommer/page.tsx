import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
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
    'Rebecca Sommer is an experienced criminal defense attorney who provides aggressive representation for clients facing criminal charges.',
  descriptionEs:
    'Rebecca Sommer es una abogada experimentada en defensa penal que proporciona representación agresiva para clientes que enfrentan cargos criminales.',
  slug: 'rebecca-sommer',
  photo: '/images/attorneys/rebecca-sommer.jpg',
  specialties: ['criminal defense', 'DWI defense', 'drug charges', 'federal criminal defense'],
});

export default function Page() {
  const attorney = getAttorneyBySlug('rebecca-sommer');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="rebecca-sommer" />
      <AttorneyPageTemplate attorney={attorney} language="es" />
    </>
  );
}
