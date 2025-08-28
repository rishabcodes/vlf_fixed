import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chowan | Vasquez Law Firm',
  description: 'Página en español para chowan',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Chowan"
      description="Esta página necesita ser traducida al español."
    />
  );
}
