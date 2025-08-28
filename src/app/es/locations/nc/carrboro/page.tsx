import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrboro | Vasquez Law Firm',
  description: 'Página en español para carrboro',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Carrboro"
      description="Esta página necesita ser traducida al español."
    />
  );
}
