import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Roselyn V. Torrellas',
  nameEs: 'Roselyn V. Torrellas',
  title: 'Immigration Attorney',
  titleEs: 'Abogada de Inmigración',
  description:
    'Roselyn V. Torrellas is a passionate immigration attorney dedicated to protecting the rights of immigrants, specializing in humanitarian immigration cases.',
  descriptionEs:
    'Roselyn V. Torrellas es una abogada de inmigración apasionada dedicada a proteger los derechos de los inmigrantes, especializada en casos de inmigración humanitaria.',
  slug: 'roselyn-torrellas',
  photo: '/images/attorneys/roselyn-torrellas.jpg',
  specialties: [
    'immigration law',
    'asylum',
    'U-visas',
    'DACA',
    'deportation defense',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('roselyn-torrellas');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="roselyn-torrellas" />
      <AttorneyPageTemplate attorney={attorney} language="es" />
    </>
  );
}
