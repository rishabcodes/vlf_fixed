import { Metadata } from 'next';
import { OptimizedAttorneyTemplate } from '@/components/attorneys/OptimizedAttorneyTemplate';
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
    'Roselyn V. Torrellas is a passionate immigration attorney dedicated to protecting the rights of immigrants. She specializes in humanitarian immigration cases, including asylum, U-visas, and DACA applications.',
  descriptionEs:
    'Roselyn V. Torrellas es una abogada de inmigración apasionada dedicada a proteger los derechos de los inmigrantes. Se especializa en casos humanitarios de inmigración, incluyendo asilo, visas U, y aplicaciones de DACA.',
  slug: 'roselyn-v-torrellas',
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
  const attorney = getAttorneyBySlug('roselyn-v-torrellas');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="roselyn-v-torrellas" />
      <OptimizedAttorneyTemplate attorney={attorney} language="en" />
    </>
  );
}
