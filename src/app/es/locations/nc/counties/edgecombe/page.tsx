import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edgecombe | Vasquez Law Firm',
  description: 'Página en español para edgecombe',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Edgecombe"
      description="Esta página necesita ser traducida al español."
    />
  );
}
