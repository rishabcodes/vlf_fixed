import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deportation Defense | Vasquez Law Firm',
  description: 'Página en español para deportation-defense',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Deportation Defense"
      description="Esta página necesita ser traducida al español."
    />
  );
}
